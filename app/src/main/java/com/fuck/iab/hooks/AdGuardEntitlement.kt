package com.fuck.iab.hooks

import org.luckypray.dexkit.DexKitBridge
import java.lang.reflect.Method

object AdGuardEntitlement {

    private val AN = arrayOf("premium", "license", "isPremium")

    fun install(
        hk: (Method) -> Unit,
        cl: ClassLoader,
        bridge: DexKitBridge,
    ): Boolean {
        val lic = resolve(cl, bridge) ?: return false
        val n = EntitlementUtil.hookBools(lic, hk)
        HookLog.info("AdGuard: " + n + " boolean methods")
        try {
            blockRb(cl.loadClass("H0.b"), hk)
        } catch (_: Throwable) {
        }
        return n > 0
    }

    private fun resolve(cl: ClassLoader, b: DexKitBridge): Class<*>? {
        try {
            val c = cl.loadClass("J0.a")
            HookLog.info("AdGuard: fast path " + c.name)
            return c
        } catch (_: Throwable) {
            HookLog.info("AdGuard: fast path missed")
        }
        return try {
            b.findClass { matcher { usingStrings(*AN) } }
                .asSequence()
                .mapNotNull { d -> runCatching { d.name }.getOrNull() }
                .mapNotNull { nm -> runCatching { cl.loadClass(nm) }.getOrNull() }
                .firstOrNull { hasBool(it) }
        } catch (_: Throwable) {
            null
        }
    }

    private fun hasBool(c: Class<*>): Boolean =
        c.declaredMethods.any {
            !it.isSynthetic && it.returnType == Boolean::class.javaPrimitiveType
        }

    private fun blockRb(plus: Class<*>, hk: (Method) -> Unit) {
        val rb = plus.declaredMethods.firstOrNull {
            it.name == "rb" && it.parameterCount == 1
        } ?: return
        hk(rb)
    }
}
