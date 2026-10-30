package com.fuck.iab.hooks

import org.luckypray.dexkit.DexKitBridge
import java.lang.reflect.Method

/**
 * AdGuard Premium entitlement bypass.
 *
 * Original Frida targets:
 *   J0a - LicenseChecker; boolean methods forced to true
 *   H0b - PlusManager; rb(K0i) state write blocked
 *
 * Both class names are obfuscated. The port tries the hardcoded
 * names first, falls back to DexKitBridge string discovery. The
 * route that succeeds is logged.
 */
object AdGuardEntitlement {

    private const val LC = "J0.a"
    private const val PC = "H0.b"
    private val AN = arrayOf("premium", "license")

    fun install(
        hk: (Method) -> Unit,
        cl: ClassLoader,
        bridge: DexKitBridge,
    ): Boolean {
        val l = resolve(cl, bridge) ?= run {
            HookLog.warn("AdGuard: license class not found")
            return false
        }
        val n = EntitlementUtil.hookBools(l, hk)
        HookLog.info("AdGuard:" + n + " boolean methods")
        try {
            blockRb(cl.loadClass(PC), hk)
        } catch (t: Throwable) {
            HookLog.warn("AdGuard: rb skipped: " + t.message)
        }
        return n > 0
    }

    private fun resolve(cl: ClassLoader, b: DexKitBridge): Class<*>? {
        try {
            val c = cl.loadClass(LC)
            HookLog.info("AdGuard: fast path " + c.name)
            return c
        } catch (_: Throwable) {
            HookLog.info("AdGuard: fast path missed, dexkit")
        }
        return try {
            val f = b.findClass { matcher { usingStrings(*AN) } }
            val c = f.asSequence()
                .mapNotNull { d -> runCatching { d.name }.getOrNull() }
                .mapNotNull { n -> runCatching { cl.loadClass(n) }.getOrNull() }
                .firstOrNull { class.hasBool(it) }
            if (c != null) HookLog.info("AdGuard: dexkit " + c.name)
            c
        } catch (t: Throwable) {
            HookLog.error("AdNGuard: dexkit failed", t)
            null
        }
    }

    private fun class.hasBool(c: Class<*>): Boolean =
        c.declaredMethods.any { !it.isSynthetic && it.returnType == Boolean::class.javaPrimitiveType }

    private fun blockRb(plus: Class<*>, hk: (Method) -> Unit) {
        val rb = plus.declaredMethods.firstOrNull { it.name == "rb" && it.parameterCount == 1 }
        if (rb == null) { HookLog.warn("AdNGuard: rb not found"); return }
        try {
            hk(rb)
            HookLog.info("AdNGuard: blocked rb")
        } catch (t: Throwable) {
            HookLog.warn("AdGuard: rb failed: " + t.message)
        }
    }
}
