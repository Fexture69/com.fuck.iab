package com.fuck.iab

import android.util.Log
import android.app.Activity
import android.app.Application
import android.app.Instrumentation
import android.content.ComponentName
import android.content.Context
import android.content.Context.MODE_PRIVATE
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.os.Build
import android.os.Bundle
import android.os.IBinder
import android.widget.Toast
import com.fuck.iab.NativeBridge.startScript
import com.fuck.iab.hooks.EntitlementHooks
import io.github.libxposed.api.XposedInterface
import io.github.libxposed.api.XposedModule
import io.github.libxposed.api.XposedModuleInterface
import io.github.libxposed.api.XposedModuleInterface.ModuleLoadedParam
import io.github.libxposed.api.XposedModuleInterface.PackageLoadedParam
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch
import org.json.JSONObject
import org.luckypray.dexkit.DexKitBridge
import java.io.FileInputStream
import java.io.FileNotFoundException
import java.security.PublicKey
import java.util.concurrent.CountDownLatch
import java.util.zip.ZipFile
import kotlin.time.Duration.Companion.seconds

object NativeBridge {
    lateinit var dexKitBridge: DexKitBridge

    init {
        System.loadLibrary(nativehook())
    }

    @JvmStatic
    external fun startScript(packageName: String, scriptSource: String)

    private val payloadChannel = Channel<String>(capacity = Channel.UNLIMITED)

    val payloads = payloadChannel.receiveAsFlow()

    @JvmStatic
    fun onPayloadReceived(payload: String) {
        payloadChannel.trySend(payload)
    }
}

object AppScope : CoroutineScope {
    override val coroutineContext = SupervisorJob() + Dispatchers.Default
}

class MainModule : XposedModule() {

    val iabProviders = mapOf(
        com_android_vending() to com_google_android_finsky_billing_iab_InAppBillingService(),
        com_farsitel_bazaar() to com_farsitel_bazaar_inappbilling_service_InAppBillingService(),
        ir_mservices_market() to ir_mservices_market_service_InAppBillingService()
    )

    lateinit var app: Application
    val latch = CountDownLatch(1)
    var customScript = false
    var scriptAuthor: String? = null

    companion object {
        init {
            System.loadLibrary(dexkit())
        }
    }

    private fun log(text: String) {}

    override fun onModuleLoaded(param: ModuleLoadedParam) {}

    override fun onPackageLoaded(param: PackageLoadedParam) {
        if (!param.isFirstPackage) return

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            packageLoaded(param.packageName, param.applicationInfo, param.defaultClassLoader)
        }
    }

    override fun onPackageReady(param: XposedModuleInterface.PackageReadyParam) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            packageLoaded(param.packageName, param.applicationInfo, param.classLoader)
        }
    }

    override fun onSystemServerStarting(param: XposedModuleInterface.SystemServerStartingParam) {}

    private fun packageLoaded(
        packageName: String,
        applicationInfo: ApplicationInfo,
        classLoader: ClassLoader
    ) {
        Log.e("FKIAB", "packageLoaded: $packageName (appClass=${applicationInfo.className})")
        try {
            if (iabProviders.containsKey(packageName)) {
                val bridge = DexKitBridge.create(applicationInfo.sourceDir)
                val clazz = bridge.findClass {
                    matcher {
                        className = iabProviders[packageName]!!
                    }
                }.singleOrNull() ?: return
                hook(clazz.getInstance(classLoader).getMethod(onBind(), Intent::class.java)).intercept { chain ->
                    FakeBinder((chain.thisObject as? Context)?.applicationContext!!, packageName == com_android_vending(), chain.proceed() as IBinder, ::log)
                }
            } else {
                val applicationClassName = applicationInfo.className ?: android_app_Application()
                val applicationClass = classLoader.loadClass(applicationClassName)
                val onCreate = applicationClass.getMethod(onCreate())

                Log.e("FKIAB", "Hooking onCreate on $applicationClassName")
                hook(onCreate).intercept { chain ->
                    Log.e("FKIAB", "Application.onCreate intercepted for $packageName")
                    app = chain.thisObject as Application

                    val bridge = DexKitBridge.create(applicationInfo.sourceDir)
                    NativeBridge.dexKitBridge = bridge
                    
                    hookOnServiceConnected(classLoader, bridge)
                    hookPurchaseVerificationMethods(classLoader, bridge)

                    val global = readScriptForPackage(global())

                    val script = if (global != null) {
                        val apps = readScriptForPackage(packageName)
                        val (author, appScript) = if (apps == null || apps == "") {
                            null to ""
                        } else {
                            customScript = true
                            extractAuthor(apps)
                        }
                        scriptAuthor = author
                        val userScript = readUserScript()
                        var combined = global.replace(APP_SCRIPT_GOES_HERE(), appScript)
                        combined = combined.replace(USER_SCRIPT_GOES_HERE(), userScript ?: "")
                        combined.ifEmpty { null }
                    } else null

                    Log.e("FKIAB", "Final script ready: ")
                    if (script != null) {
                        try {
                            Log.e("FKIAB", "Calling NativeBridge.startScript for ")
                            startScript(packageName, script)
                            Log.e("FKIAB", "NativeBridge.startScript invoked successfully")
                        } catch (e: Throwable) {
                            Log.e("FKIAB", "startScript error: ", e)
                        }
                        return@intercept chain.proceed()
                    } else {
                        Log.e("FKIAB", "script was null, running fallback")
                        if (packageName == "com.adguard.android" || packageName == "com.life360.android.safetymapd") {
                            EntitlementHooks.install(packageName, classLoader, bridge) { method ->
                                val rt = method.returnType
                                if (rt == String::class.java) {
                                    val name = method.name
                                    when (name) {
                                        "getProductId" -> hook(method).intercept { "premium_4999_yearly_1" }
                                        else -> hook(method).intercept { "9" }
                                    }
                                } else if (rt == Integer::class.javaPrimitiveType || rt == java.lang.Integer::class.java) {
                                    hook(method).intercept { 0x7fffffff }
                                } else if (rt == java.lang.Long.TYPE || rt == java.lang.Long::class.java) {
                                    hook(method).intercept { 0x7fffffffffffffffL }
                                } else if (rt == Boolean::class.javaPrimitiveType || rt == java.lang.Boolean::class.java) {
                                    hook(method).intercept { true }
                                } else if (rt.isEnum) {
                                    hook(method).intercept { rt.enumConstants?.firstOrNull { it.toString() == "ANNUAL" || it.toString() == "PAID" } ?: rt.enumConstants?.firstOrNull() }
                                } else if (rt == java.lang.Void.TYPE) {
                                    hook(method).intercept { null }
                                } else {
                                    hook(method).intercept { null }
                                }
                                null
                            }
                        }
                        return@intercept chain.proceed()
                    }
                }

                val method = Instrumentation::class.java.getDeclaredMethod(
                    callActivityOnCreate(),
                    Activity::class.java,
                    Bundle::class.java
                )

                hook(method).intercept { chain ->
                    val activity = chain.getArg(0) as? Activity
                    val intent = activity?.intent

                    val isLauncher = intent != null &&
                            intent.action == Intent.ACTION_MAIN &&
                            intent.hasCategory(Intent.CATEGORY_LAUNCHER)

                    if (activity != null && isLauncher && customScript) {
                        if (scriptAuthor != null && scriptAuthor != "") {
                            Toast.makeText(activity, "${Custom_script_by_()}$scriptAuthor", Toast.LENGTH_SHORT).show()
                        } else {
                            Toast.makeText(activity, Custom_script_loaded(), Toast.LENGTH_SHORT).show()
                        }
                    }

                    chain.proceed()
                }
            }
        } catch (e: Throwable) {
            Log.e("FKIAB", "Exception in packageLoaded: ", e)
        }
    }

    private fun hookOnServiceConnected(classLoader: ClassLoader, bridge: DexKitBridge) {
        try {
            val classes = bridge.findClass {
                matcher {
                    addInterface(android_content_ServiceConnection())
                }
            }

            classes.forEach { clazz ->
                clazz.methods.forEach {
                    if (it.name != onServiceConnected()) return@forEach

                    val onServiceConnectedMethod = it.getMethodInstance(classLoader)
                    hook(onServiceConnectedMethod).intercept { chain ->
                        val componentName = chain.args.getOrNull(0) as? ComponentName ?: return@intercept chain.proceed()
                        val realBinder = chain.args.getOrNull(1) as? IBinder ?: return@intercept chain.proceed()

                        if (iabProviders[componentName.packageName] == componentName.className) {
                            val isGoogle = componentName.packageName == com_android_vending()
                            return@intercept chain.proceed(arrayOf(chain.args[0], FakeBinder(app, isGoogle, realBinder, ::log)))
                        }
                        return@intercept chain.proceed()
                    }
                }
            }
        } catch (e: Exception) {}
    }

    private fun hookPurchaseVerificationMethods(classLoader: ClassLoader, bridge: DexKitBridge) {
        var methods = bridge.findMethod {
            matcher {
                returnType = boolean()
                usingStrings(
                    Purchase_verification_failed(),
                    Base64_decoding_failed()
                )
            }
        }
        for (m in methods) {
            try {
                val method = m.getMethodInstance(classLoader)
                hook(method).intercept { true }
            } catch (e: Exception) {}
        }

        methods = bridge.findMethod {
            matcher {
                returnType = boolean()
                paramTypes(PublicKey::class.java, String::class.java, String::class.java)
                invokeMethods {
                    add {
                        name = getInstance()
                        paramTypes(String::class.java)
                    }
                }
            }
        }
        for (m in methods) {
            try {
                val method = m.getMethodInstance(classLoader)
                hook(method).intercept { true }
            } catch (e: Exception) {}
        }

        methods = bridge.findMethod {
            matcher {
                returnType = java_lang_Boolean()
                paramTypes(PublicKey::class.java, String::class.java, String::class.java)
                invokeMethods {
                    add {
                        name = getInstance()
                        paramTypes(String::class.java)
                    }
                }
            }
        }
        for (m in methods) {
            try {
                val method = m.getMethodInstance(classLoader)
                hook(method).intercept { java.lang.Boolean.TRUE }
            } catch (e: Throwable) {}
        }

        try {
            hook(
                Class.forName(ir_cafebazaar_poolakey_security_PurchaseVerifier()).getDeclaredMethod(
                    verify(),
                    PublicKey::class.java,
                    String::class.java,
                    String::class.java
                )
            ).intercept { chain -> true }
        } catch (e: Exception) {}

        try {
            val m = bridge.findMethod {
                matcher {
                    name = getError()
                    returnType = java_lang_Exception()
                    paramCount = 0
                    declaredClass = com_ea_nimble_mtx_googleplay_GooglePlayTransaction()
                }
            }.singleOrNull()
            if (m != null) {
                val method = m.getMethodInstance(classLoader)
                hook(method).intercept { chain -> null }
            }
        } catch (e: Exception) {}

        try {
            val m = bridge.findMethod {
                matcher {
                    name = getConfigValueAsString()
                    returnType = java_lang_String()
                    paramTypes(java_lang_String())
                    declaredClass = com_ea_nimble_NimbleApplicationConfiguration()
                }
            }.singleOrNull()
            if (m != null) {
                val method = m.getMethodInstance(classLoader)
                hook(method).intercept { chain ->
                    if (chain.args[0] == com_ea_nimble_mtx_enableVerification()) {
                        return@intercept _false()
                    } else if (chain.args[0] == com_ea_nimble_mtx_reportingEnabled()) {
                        return@intercept _false()
                    } else {
                        chain.proceed()
                    }
                }
            }
        } catch (e: Exception) {}

        try {
            val m = bridge.findMethod {
                matcher {
                    name = UnitySendMessage()
                    returnType = void()
                    paramTypes(java_lang_String(), java_lang_String(), java_lang_String())
                    declaredClass = com_unity3d_player_UnityPlayer()
                }
            }.singleOrNull()
            if (m != null) {
                val method = m.getMethodInstance(classLoader)
                hook(method).intercept { chain ->
                    val arg1 = chain.args[0] as String
                    val arg2 = chain.args[1] as String
                    val arg3 = chain.args[2] as String

                    if (arg1 == Appsflyer() && arg2 == didReceivePurchaseRevenueValidationInfo()) {
                        val json = JSONObject(arg3)
                        val success = json.getString(success())
                        val token = json.getString(token())

                        if (success == _false()) {
                            val prefs = app.getSharedPreferences(fuck_iab(), MODE_PRIVATE)
                            val value = prefs.getString(token, "")
                            if (value == "") return@intercept chain.proceed()

                            val json = try { JSONObject(value!!) } catch (_: Exception) { return@intercept chain.proceed() }

                            val map = HashMap<String, Any>()
                            val map2 = HashMap<String, Any>()
                            map[token()] = token
                            map[success()] = _true()

                            map2[productId()] = json.getString(productId())
                            map2[purchaseState()] = json.getInt(purchaseState())
                            map2[kind()] = inapp()
                            map2[purchaseTimeMillis()] = try { json.getLong(purchaseTime()).toString() } catch (e: Exception) { System.currentTimeMillis().toString() }
                            map2[consumptionState()] = 0
                            map2[developerPayload()] = try { json.getString(developerPayload()) } catch (e: Exception) { developerPayload() }
                            map2[orderId()] = json.getString(orderId())
                            map2[purchaseType()] = 0
                            map2[acknowledgementState()] = 1
                            map2[purchaseToken()] = token
                            map2[quantity()] = 1
                            map2[obfuscatedExternalAccountId()] = obfuscatedExternalAccountId()
                            map2[obfuscatedExternalProfileId()] = obfuscatedExternalProfileId()
                            map2[regionCode()] = regionCode()
                            map[productPurchase()] = map2

                            return@intercept chain.proceed(arrayOf(arg1, arg2, JSONObject(map).toString()))
                        }
                    }
                    chain.proceed()
                }
            }
        } catch (e: Throwable) {
            Log.e("FKIAB", "Exception in packageLoaded: ", e)
        }
    }

    private fun isScriptDisabled(packageName: String): Boolean {
        if (frameworkProperties.and(XposedInterface.PROP_CAP_REMOTE) == 0L) return false
        return try {
            val disabled = getRemotePreferences(fuck_iab())
                .getStringSet(RemoteScripts.DISABLED_SCRIPTS_KEY, emptySet()) ?: return false
            disabled.contains(packageName) || disabled.contains(global())
        } catch (e: Exception) {
            false
        }
    }

    private fun readUserScriptForPackage(packageName: String): String? {
        if (frameworkProperties.and(XposedInterface.PROP_CAP_REMOTE) == 0L) return null
        val name = RemoteScripts.userFileName(packageName)
        return try {
            if (listRemoteFiles().none { it == name }) return null
            val pfd = openRemoteFile(name)
            FileInputStream(pfd.fileDescriptor).use { it.readBytes().toString(Charsets.UTF_8) }
                .takeIf { it.isNotBlank() }
        } catch (e: Exception) {
            null
        }
    }

    private fun readRemoteScriptForPackage(packageName: String): String? {
        if (frameworkProperties.and(XposedInterface.PROP_CAP_REMOTE) == 0L) return null
        val name = RemoteScripts.fileName(packageName)
        return try {
            if (listRemoteFiles().none { it == name }) return null
            val pfd = openRemoteFile(name)
            FileInputStream(pfd.fileDescriptor).use { it.readBytes().toString(Charsets.UTF_8) }
                .takeIf { it.isNotBlank() }
        } catch (e: Exception) {
            null
        }
    }

    private fun readAssetScriptForPackage(packageName: String): String? {
        val apkPath = this.moduleApplicationInfo.sourceDir
        return try {
            ZipFile(apkPath).use { zip ->
                val entry = zip.getEntry("${assets_scripts_()}$packageName${_js()}") ?: return null
                zip.getInputStream(entry).bufferedReader(Charsets.UTF_8).use { it.readText() }
            }
        } catch (e: Exception) { null }
    }

    private fun readScriptForPackage(packageName: String): String? {
        Log.e("FKIAB", "readScriptForPackage called for $packageName")
        if (isScriptDisabled(packageName)) {
            Log.e("FKIAB", "isScriptDisabled returned true for $packageName")
            return null
        }
        val user = readUserScriptForPackage(packageName)
        if (user != null) {
            Log.e("FKIAB", "readUserScriptForPackage found script for $packageName")
            return user
        }
        val remote = readRemoteScriptForPackage(packageName)
        if (remote != null) {
            Log.e("FKIAB", "readRemoteScriptForPackage found script for $packageName")
            return remote
        }
        val asset = readAssetScriptForPackage(packageName)
        Log.e("FKIAB", "readAssetScriptForPackage for $packageName: ${asset != null}")
        return asset
    }

    private fun readUserScript(): String? {
        return try {
            val pfd = openRemoteFile(user_script_js())
            FileInputStream(pfd.fileDescriptor).use { it.readBytes().toString(Charsets.UTF_8) }
        } catch (e: FileNotFoundException) { null } catch (e: Exception) { null }
    }

    fun extractAuthor(content: String): Pair<String, String> {
        val prefix = ___author__()
        val newlineIndex = content.indexOf('\n')
        val firstLine = if (newlineIndex == -1) content else content.substring(0, newlineIndex)

        return if (firstLine.startsWith(prefix)) {
            val author = firstLine.removePrefix(prefix).trimEnd('\r').trim()
            val rest = if (newlineIndex == -1) "" else content.substring(newlineIndex + 1)
            author to rest
        } else {
            "" to content
        }
    }
}