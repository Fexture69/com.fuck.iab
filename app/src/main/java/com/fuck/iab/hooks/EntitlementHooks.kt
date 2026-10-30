package com.fuck.iab.hooks

import org.luckypray.dexkit.DexKitBridge

/**
 * Dispatcher for app-level entitlement hooks.
 *
 * FQIAB billing layer (FakeBinder) is already correct: it persists fake
 * purchases and replays them from getPurchases. Apps that cache their
 * entitlement locally on first launch never re-query billing, so they keep
 * returning the stale not-purchased verdict. These hooks bypass that cache.
 *
 * Called from MainModule.packageLoaded() inside the Application.onCreate
 * intercept, after hookPurchaseVerificationMethods and before the latch is
 * awaited. Any later and the app has already computed its entitlement.
 *
 * Package-gated: packageLoaded() runs for every app in the module scope.
 */
object EntitlementHooks {

    private const val ADGUARD = "com.adguard.android"
    private const val LIFE360 = "com.life360.android.safetymapd"

    /**
     * @param packageName the app being loaded
     * @param classLoader the app ClassLoader from PackageLoadedParam
     * @param bridge      the DexKitBridge already built for this APK
     * @param hooker      callback that installs a hook on one Method; MainModule
     *                    supplies a lambda closing over its own hook() method
     * @return true if any hooks were installed
     */
    fun install(
        packageName: String,
        classLoader: ClassLoader,
        bridge: DexKitBridge,
        hooker: (java.lang.reflect.Method) -> Unit,
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
