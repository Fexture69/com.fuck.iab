/*
 * KeyMapper Premium Unlock - Frida script
 * Ported from the Morphe bytecode patch.
 *
 * Hooks:
 *   1. j05.p(CustomerInfo, t65):Z        -> always true
 *   2. j05.c(t65, q61):Object            -> returns vz5(Boolean.TRUE)
 *   3. z80.j(Object):hx5  (when called from j05.<init>)
 *                                        -> seeds premium entitlements
 *                                           {t65.l, t65.m} into v65, wrapped
 *                                           in vz5 then ax5
 *
 * Usage:
 *   frida -U -f <com.keymapper.app.package> -l keymapper_premium.js --no-pause
 */

Java.perform(function () {
    console.log("[*] KeyMapper Premium patch starting...");

    // ---------- Resolve obfuscated classes / fields ----------
    const j05         = Java.use("j05");
    const t65         = Java.use("t65");
    const vz5         = Java.use("vz5");
    const v65         = Java.use("v65");
    const ax5         = Java.use("ax5");
    const z80         = Java.use("z80");

    const HashSet     = Java.use("java.util.HashSet");
    const HashMap     = Java.use("java.util.HashMap");
    const BooleanCls  = Java.use("java.lang.Boolean");
    const ExceptionCls= Java.use("java.lang.Exception");
    const Log         = Java.use("android.util.Log");

    // ---------- Patch 1: EntitlementCheckFingerprint ----------
    // Lj05;->p(Lcom/revenuecat/purchases/CustomerInfo;Lt65;)Z
    j05.p.overload(
        "com.revenuecat.purchases.CustomerInfo",
        "t65"
    ).implementation = function (_customerInfo, _entitlement) {
        return true;
    };
    console.log("[+] Hooked j05.p  -> returns true (entitlement granted)");

    // ---------- Patch 2: CustomerInfoQueryFingerprint ----------
    // Lj05;->c(Lt65;Lq61;)Ljava/lang/Object;
    // Body replaced with: return new vz5(Boolean.TRUE);
    j05.c.overload("t65", "q61").implementation = function (_ent, _q61) {
        return vz5.$new(BooleanCls.TRUE.value);
    };
    console.log("[+] Hooked j05.c  -> returns vz5(Boolean.TRUE)");

    // ---------- Patch 3: PurchaseStateSeedFingerprint ----------
    // Injected at start of Lj05.<init>(Context, h81):
    //   HashSet{t65.l, t65.m} -> HashMap{} -> v65 -> vz5 -> ax5
    // Seeding happens via Lz80;->j(Object) which is called by the
    // original constructor.  We intercept that call when it comes from
    // Lj05.<init> and swap the argument with our premium seed.
    function buildPremiumSeed() {
        const set = HashSet.$new();
        set.add(t65.l.value);               // entitlement #1
        set.add(t65.m.value);               // entitlement #2

        const map   = HashMap.$new();
        const v65o  = v65.$new(set, map);   // v65(Set, Map)
        const vz5o  = vz5.$new(v65o);       // vz5(Object)
        return ax5.$new(vz5o);              // ax5(Object)
    }

    const originalZ80J = z80.j.overload("java.lang.Object");
    z80.j.overload("java.lang.Object").implementation = function (obj) {
        const stack = Log.getStackTraceString(ExceptionCls.$new());
        if (stack.indexOf("j05.<init>") !== -1) {
            obj = buildPremiumSeed();
        }
        return originalZ80J.call(z80, obj);
    };
    console.log("[+] Hooked z80.j  -> seeds premium state for j05.<init>");

    console.log("[*] KeyMapper Premium patch applied.");
});