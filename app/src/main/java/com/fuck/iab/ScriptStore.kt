package com.fuck.iab

import android.content.Context
import android.content.res.Configuration
import android.graphics.drawable.Drawable
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.content.edit
import io.github.libxposed.service.XposedService
import org.json.JSONObject
import java.io.FileInputStream
import java.io.FileOutputStream
import java.util.Locale

/** Where the script that is currently used for a package comes from. */
enum class ScriptSource { USER, REMOTE, BAKED }

data class ScriptInfo(
    val packageName: String,
    val source: ScriptSource,
    val author: String?,
    val size: Int,
    val enabled: Boolean,
    val installed: Boolean,
    val hasUserScript: Boolean
)

/** A package the module is scoped to, with the state of its script if it has one. */
data class HookedApp(
    val packageName: String,
    val label: String,
    val script: ScriptInfo?
)

/** Files in the module's shared data directory, which is how the module and this app talk. */
object RemoteFiles {

    fun list(service: XposedService): Set<String> {
        return try {
            service.listRemoteFiles().toSet()
        } catch (e: Exception) {
            emptySet()
        }
    }

    fun read(service: XposedService, name: String): String? {
        return try {
            val pfd = service.openRemoteFile(name)
            FileInputStream(pfd.fileDescriptor).use { it.readBytes().toString(Charsets.UTF_8) }
        } catch (e: Exception) {
            null
        }
    }

    /** @return true when the file was stored, so callers never claim a write that failed. */
    fun write(service: XposedService, name: String, text: String): Boolean {
        return try {
            val pfd = service.openRemoteFile(name)
            FileOutputStream(pfd.fileDescriptor).use { out ->
                out.channel.truncate(0)
                out.write(text.toByteArray(Charsets.UTF_8))
            }
            true
        } catch (e: Exception) {
            false
        }
    }

    fun delete(service: XposedService, name: String): Boolean {
        return try {
            service.deleteRemoteFile(name)
        } catch (e: Exception) {
            false
        }
    }
}

/** App side knowledge about scripts: what exists, what is enabled and what an editor shows. */
object ScriptStore {

    /** The all-apps script, matching assets/scripts/global.js. */
    const val ALL_APPS = "global"

    private const val SETTINGS_GROUP = "ui"
    private const val THEME_KEY = "theme"
    private const val USER_INDEX_KEY = "user_scripts"

    const val THEME_SYSTEM = 0
    const val THEME_LIGHT = 1
    const val THEME_DARK = 2

    // ---- theme -----------------------------------------------------------------

    fun theme(context: Context): Int {
        return context.getSharedPreferences(SETTINGS_GROUP, Context.MODE_PRIVATE).getInt(THEME_KEY, THEME_SYSTEM)
    }

    @JvmStatic
    fun applyTheme(context: Context) {
        AppCompatDelegate.setDefaultNightMode(
            when (theme(context)) {
                THEME_LIGHT -> AppCompatDelegate.MODE_NIGHT_NO
                THEME_DARK -> AppCompatDelegate.MODE_NIGHT_YES
                else -> AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM
            }
        )
    }

    fun setTheme(context: Context, mode: Int) {
        context.getSharedPreferences(SETTINGS_GROUP, Context.MODE_PRIVATE).edit { putInt(THEME_KEY, mode) }
        applyTheme(context)
    }

    fun isNight(context: Context): Boolean {
        return (context.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) ==
                Configuration.UI_MODE_NIGHT_YES
    }

    // ---- inventory -------------------------------------------------------------

    fun inventory(context: Context, service: XposedService?): List<ScriptInfo> {
        val files = if (service != null) RemoteFiles.list(service) else emptySet()
        val remote = if (service != null) remoteEntries(service) else emptyList()
        val remoteByPackage = remote.associateBy { it.packageName }
        val disabled = if (service != null) disabledApps(service) else emptySet()

        val baked = bakedInfo(context)
        val users = userEntries(context, files)

        val names = sortedSetOf<String>()
        names += ALL_APPS
        names += baked.keys
        names += users.keys
        names += remoteByPackage.keys

        return names.map { packageName ->
            val user = users[packageName]
            val synced = remoteByPackage[packageName]
            val builtIn = baked[packageName]

            val source: ScriptSource
            val size: Int
            val author: String?

            when {
                user != null -> {
                    val text = if (service != null) RemoteFiles.read(service, user) else null
                    source = ScriptSource.USER
                    size = text?.toByteArray(Charsets.UTF_8)?.size ?: 0
                    author = text?.let { authorOf(it) }
                }

                synced != null -> {
                    source = ScriptSource.REMOTE
                    size = synced.size.toInt()
                    author = synced.author
                }

                builtIn != null -> {
                    source = ScriptSource.BAKED
                    size = builtIn.first
                    author = builtIn.second
                }

                else -> {
                    source = ScriptSource.BAKED
                    size = 0
                    author = null
                }
            }

            ScriptInfo(
                packageName = packageName,
                source = source,
                author = author,
                size = size,
                enabled = !disabled.contains(packageName),
                installed = isInstalled(context, packageName),
                hasUserScript = user != null
            )
        }
    }

    private fun remoteEntries(service: XposedService): List<RemoteScripts.Entry> {
        return RemoteScripts.parseIndex(RemoteFiles.read(service, RemoteScripts.INDEX_FILE))?.entries
            ?: emptyList()
    }

    fun bakedPackages(context: Context): Set<String> = bakedInfo(context).keys

    private fun bakedInfo(context: Context): Map<String, Pair<Int, String?>> {
        val result = sortedMapOf<String, Pair<Int, String?>>()

        try {
            java.util.zip.ZipFile(context.applicationInfo.sourceDir).use { zip ->
                val entries = zip.entries()
                while (entries.hasMoreElements()) {
                    val entry = entries.nextElement()
                    val name = entry.name
                    if (!entry.isDirectory && name.startsWith("assets/scripts/") && name.endsWith(".js")) {
                        val packageName = name.removePrefix("assets/scripts/").removeSuffix(".js")
                        val text = zip.getInputStream(entry).bufferedReader(Charsets.UTF_8).use { it.readText() }
                        result[packageName] = text.toByteArray(Charsets.UTF_8).size to authorOf(text)
                    }
                }
            }
        } catch (e: Exception) {
            // An unreadable apk just means no built-in scripts are listed.
        }

        return result
    }

    fun authorOf(script: String): String? {
        val firstLine = script.lineSequence().firstOrNull() ?: return null
        if (!firstLine.startsWith("// author: ")) return null
        return firstLine.removePrefix("// author: ").trim().ifEmpty { null }
    }

    // ---- content ---------------------------------------------------------------

    /** The script the module would run for [packageName]: user copy, then store, then built-in. */
    fun readScript(context: Context, service: XposedService?, packageName: String): Pair<ScriptSource, String>? {
        if (service != null) {
            val user = readUserScript(context, service, packageName)
            if (!user.isNullOrBlank()) return ScriptSource.USER to user
        }

        if (packageName != ALL_APPS && service != null) {
            if (RemoteFiles.list(service).contains(RemoteScripts.fileName(packageName))) {
                val synced = RemoteFiles.read(service, RemoteScripts.fileName(packageName))
                if (!synced.isNullOrBlank()) return ScriptSource.REMOTE to synced
            }
        }

        val builtIn = bakedText(context, packageName)
        if (!builtIn.isNullOrBlank()) return ScriptSource.BAKED to builtIn

        return null
    }

    fun bakedText(context: Context, packageName: String): String? {
        return try {
            java.util.zip.ZipFile(context.applicationInfo.sourceDir).use { zip ->
                val entry = zip.getEntry("assets/scripts/$packageName.js") ?: return null
                zip.getInputStream(entry).bufferedReader(Charsets.UTF_8).use { it.readText() }
            }
        } catch (e: Exception) {
            null
        }
    }

    // ---- user scripts ----------------------------------------------------------

    /** The file that holds the user copy of [packageName] in the shared directory. */
    fun userFile(packageName: String): String {
        return if (packageName == ALL_APPS) userScriptName() else RemoteScripts.userFileName(packageName)
    }

    /** File the module reads as the all-apps user script. */
    fun userScriptName(): String = user_script_js()

    fun readUserScript(context: Context, service: XposedService, packageName: String): String? {
        val file = userFile(packageName)
        if (!RemoteFiles.list(service).contains(file)) return null
        return RemoteFiles.read(service, file)
    }

    /** @return false when the script could not be stored in the shared directory. */
    fun saveUserScript(context: Context, service: XposedService, packageName: String, text: String): Boolean {
        if (!RemoteFiles.write(service, userFile(packageName), text)) return false

        if (packageName != ALL_APPS) {
            val index = readUserIndex(context).toMutableMap()
            index[packageName] = userFile(packageName)
            writeUserIndex(context, index)
        }

        return true
    }

    fun revertUserScript(context: Context, service: XposedService, packageName: String) {
        RemoteFiles.delete(service, userFile(packageName))
        if (packageName != ALL_APPS) {
            val index = readUserIndex(context).toMutableMap()
            index.remove(packageName)
            writeUserIndex(context, index)
        }
    }

    private fun readUserIndex(context: Context): Map<String, String> {
        val text = context.getSharedPreferences(SETTINGS_GROUP, Context.MODE_PRIVATE)
            .getString(USER_INDEX_KEY, null) ?: return emptyMap()

        return try {
            val json = JSONObject(text)
            json.keys().asSequence().associateWith { json.optString(it) }
        } catch (e: Exception) {
            emptyMap()
        }
    }

    private fun writeUserIndex(context: Context, index: Map<String, String>) {
        val json = JSONObject()
        index.forEach { (packageName, file) -> json.put(packageName, file) }
        context.getSharedPreferences(SETTINGS_GROUP, Context.MODE_PRIVATE)
            .edit { putString(USER_INDEX_KEY, json.toString()) }
    }

    /** User scripts whose package is not in any other list, so they stay visible. */
    private fun userEntries(context: Context, files: Set<String>): Map<String, String> {
        val result = sortedMapOf<String, String>()

        for ((packageName, file) in readUserIndex(context)) {
            if (!files.contains(file)) continue
            result[packageName] = file
        }

        // The all-apps user script has a fixed name and is not part of the index.
        if (files.contains(userScriptName())) {
            result[ALL_APPS] = userScriptName()
        }

        return result
    }

    // ---- enable or disable -----------------------------------------------------

    fun disabledApps(service: XposedService): Set<String> {
        return try {
            service.getRemotePreferences(fuck_iab()).getStringSet(RemoteScripts.DISABLED_SCRIPTS_KEY, emptySet())
                ?.toSet() ?: emptySet()
        } catch (e: Exception) {
            emptySet()
        }
    }

    fun setEnabled(service: XposedService, packageName: String, enabled: Boolean) {
        val prefs = service.getRemotePreferences(fuck_iab())
        val disabled = prefs.getStringSet(RemoteScripts.DISABLED_SCRIPTS_KEY, emptySet())?.toMutableSet()
            ?: mutableSetOf()

        if (enabled) disabled.remove(packageName) else disabled.add(packageName)

        // Committed, because the module reads this from the hooked app's process.
        prefs.edit(commit = true) { putStringSet(RemoteScripts.DISABLED_SCRIPTS_KEY, disabled) }
    }

    // ---- hooked apps -----------------------------------------------------------

    fun scope(service: XposedService): List<String> {
        return try {
            service.scope
        } catch (e: Exception) {
            emptyList()
        }
    }

    fun hookedApps(context: Context, service: XposedService, scripts: List<ScriptInfo>): List<HookedApp> {
        val byPackage = scripts.associateBy { it.packageName }

        return scope(service)
            .map { packageName -> HookedApp(packageName, appLabel(context, packageName), byPackage[packageName]) }
            .sortedBy { it.label.lowercase(Locale.US) }
    }

    // ---- app info --------------------------------------------------------------

    fun isInstalled(context: Context, packageName: String): Boolean {
        if (packageName == ALL_APPS) return true
        return try {
            context.packageManager.getApplicationInfo(packageName, 0)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun appLabel(context: Context, packageName: String): String {
        if (packageName == ALL_APPS) return context.getString(R.string.scripts_all_apps)

        return try {
            context.packageManager.getApplicationLabel(
                context.packageManager.getApplicationInfo(packageName, 0)
            ).toString()
        } catch (e: Exception) {
            packageName
        }
    }

    fun appIcon(context: Context, packageName: String): Drawable? {
        return try {
            context.packageManager.getApplicationIcon(packageName)
        } catch (e: Exception) {
            null
        }
    }

    fun sizeLabel(bytes: Int): String {
        return if (bytes >= 1024) {
            String.format(Locale.US, "%.0f KB", bytes / 1024f)
        } else {
            "$bytes B"
        }
    }
}
