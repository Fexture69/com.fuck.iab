package com.fuck.iab.hooks

import org.luckypray.dexkit.DexKitBridge

object EntitlementHooks {
    private const val ADGUARD = "com.adguard.android"
    private const val LIFE360 = "com.life360.android.safetymapd"

    fun install(
        packageName: String,
        classLoader: ClassLoader,
        bridge: DexKitBridge,
        hooker: (java.lang.reflect.Method) -> Any?, // <--- Changed back to Unit
    ): Boolean {
        return try {
            when (packageName) {
                ADGUARD -> AdGuardEntitlement.install(hooker, classLoader, bridge)
                LIFE360 -> Life360Entitlement.install(hooker, classLoader)
                else -> false
            }
        } catch (t: Throwable) {
            HookLog.error("EntitlementHooks.install(" + packageName + ") failed", t)
            false
        }
    }
}