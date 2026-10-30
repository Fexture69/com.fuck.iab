package com.fuck.iab.hooks

import java.lang.reflect.Method

object Life360Entitlement {
    private const val CF = "com.life360.model_store.base.localstore.CircleFeatures"
    private const val FS = "com.life360.inapppurchase.FeatureSetEntitlementManager"
    private const val PS = "com.life360.inapppurchase.PurchasedSkuInfo"
    private const val PM = "com.life360.inapppurchase.Premium"

    fun install(hk: (Method) -> Any?, cl: ClassLoader): Boolean {
        var n = 0
        n += isPremium(cl, hk)
        n += predicates(cl, hk)
        n += skuGetters(cl, hk)
        n += premiumGates(cl, hk)
        HookLog.info("Life360: installed " + n + " hooks")
        return n > 0
    }

    private fun isPremium(cl: ClassLoader, hk: (Method) -> Any?): Int {
        val c = load(cl, CF) ?: return 0
        return EntitlementUtil.hookPred(c, { m -> m.name == "isPremium" && m.returnType == Boolean::class.javaPrimitiveType }, hk)
    }

    private fun predicates(cl: ClassLoader, hk: (Method) -> Any?): Int {
        val c = load(cl, FS) ?: return 0
        return EntitlementUtil.hookPred(c, { m -> m.name.startsWith("is") && m.returnType == Boolean::class.javaPrimitiveType }, hk)
    }

    private fun skuGetters(cl: ClassLoader, hk: (Method) -> Any?): Int {
        val c = load(cl, PS) ?: return 0
        var n = 0
        n += EntitlementUtil.hookByName(c, "getSku", hk)
        n += EntitlementUtil.hookByName(c, "getProductId", hk)
        n += EntitlementUtil.hookByName(c, "getPeriod", hk)
        n += EntitlementUtil.hookByName(c, "getPaymentState", hk)
        return n
    }

    private fun premiumGates(cl: ClassLoader, hk: (Method) -> Any?): Int {
        val c = load(cl, PM) ?: return 0
        var n = 0
        n += EntitlementUtil.hookByName(c, "skuForCircle", hk)
        n += EntitlementUtil.hookByName(c, "trialForSku", hk)
        return n
    }

    private fun load(cl: ClassLoader, name: String): Class<*>? =
        try { cl.loadClass(name) } catch (_: Throwable) { HookLog.warn("Life360: " + name + " unavailable"); null }
}