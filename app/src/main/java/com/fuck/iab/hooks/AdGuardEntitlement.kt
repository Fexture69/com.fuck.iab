package com.fuck.iab.hooks

import org.luckypray.dexkit.DexKitBridge
import java.lang.reflect.Method

object AdGuardEntitlement {
    private val AN = arrayOf("premium", "license", "isPremium", "purchase", "valid", "check", "state")

    fun install(
        hk: (Method) -> Any?,
        cl: ClassLoader,
        bridge: DexKitBridge,
    ): Boolean {
        var lic = resolveFast(cl)
        var n = 0

        if (lic != null) {
            n = EntitlementUtil.hookBools(lic, hk)
            HookLog.info("AdGuard: fast path " + lic.name + " -> " + n + " methods")
        }

        if (n == 0) {
            HookLog.info("AdGuard: fast path yielded 0, trying dexkit")
            lic = resolveDexKit(cl, bridge)
            if (lic != null) {
                n = EntitlementUtil.hookBools(lic, hk)
                HookLog.info("AdGuard: dexkit " + lic.name + " -> " + n + " methods")
            }
        }

        if (n == 0) {
            HookLog.warn("AdGuard: failed to find boolean methods")
        }

        try {
            blockRb(cl.loadClass("H0.b"), hk)
        } catch (_: Throwable) {
            HookLog.warn("AdGuard: H0.b not found, rb hook skipped")
        }

        return n > 0
    }

    private fun resolveFast(cl: ClassLoader): Class<*>? {
        return try {
            val c = cl.loadClass("J0.a")
            dumpClass(c)
            c
        } catch (_: Throwable) {
            null
        }
    }

    private fun dumpClass(c: Class<*>) {
        var curr: Class<*>? = c
        while (curr != null && curr != Any::class.java) {
            for (m in curr.declaredMethods) {
                HookLog.info("AdGuard dump: " + curr.name + " -> " + m.returnType.name + " " + m.name + "(" + m.parameterTypes.joinToString { it.name } + ")")
            }
            curr = curr.superclass
        }
    }

    private fun resolveDexKit(cl: ClassLoader, b: DexKitBridge): Class<*>? {
        return try {
            val f = b.findClass { matcher { usingStrings(*AN) } }
            f.asSequence()
                .mapNotNull { d -> runCatching { d.name }.getOrNull() }
                .mapNotNull { nm -> runCatching { cl.loadClass(nm) }.getOrNull() }
                .firstOrNull { hasBool(it) }
        } catch (_: Throwable) {
            null
        }
    }

    private fun hasBool(c: Class<*>): Boolean {
        var curr: Class<*>? = c
        while (curr != null && curr != Any::class.java) {
            if (curr.declaredMethods.any { !it.isSynthetic && it.returnType == Boolean::class.javaPrimitiveType }) return true
            curr = curr.superclass
        }
        return false
    }

    private fun blockRb(plus: Class<*>, hk: (Method) -> Any?) {
        val rb = plus.declaredMethods.firstOrNull { it.name == "rb" && it.parameterCount == 1 } ?: return
        hk(rb)
        HookLog.info("AdGuard: blocked rb")
    }
}