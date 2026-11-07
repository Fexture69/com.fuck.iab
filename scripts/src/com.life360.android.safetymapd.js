// author: Fexture69
// Reflection-based Life360 premium bypass. The Premium class is not obfuscated,
// so hooking by method name survives changes in parameter/return signatures.
setTimeout(function () {
    let attempts = 0;

    function install() {
        let Premium;
        try {
            Premium = Java.use("com.life360.inapppurchase.Premium");
        } catch (e) {
            console.log("[-] Premium not loaded yet: " + e);
            return false;
        }

        function enumValue(className, constantName) {
            const values = Java.use(className).values();
            for (let i = 0; i < values.length; i++) {
                if (values[i].name().toString() === constantName) {
                    return values[i];
                }
            }
            return null;
        }

        function hookByName(name, fake) {
            let count = 0;
            const methods = Premium.class.getDeclaredMethods();

            for (let i = 0; i < methods.length; i++) {
                const m = methods[i];
                if (m.getName() !== name) {
                    continue;
                }

                const params = m.getParameterTypes();
                const types = [];
                for (let j = 0; j < params.length; j++) {
                    types.push(params[j].getName());
                }

                try {
                    const overload = Premium[name].overload.apply(Premium[name], types);
                    const original = overload;

                    overload.implementation = function () {
                        try {
                            return fake.apply(this, arguments);
                        } catch (e) {
                            console.log("[-] " + name + ": " + e + ", using real method");
                            return original.apply(this, arguments);
                        }
                    };
                    count++;
                } catch (e) {
                    console.log("[-] " + name + " overload failed: " + e);
                }
            }

            if (count > 0) {
                console.log("[+] Hooked " + name + " (" + count + " overloads)");
            } else {
                console.log("[-] " + name + " not found");
            }
            return count;
        }

        hookByName("skuForCircle", function () {
            return "9";
        });

        hookByName("paymentStateForCircle", function () {
            const paid = enumValue("com.life360.inapppurchase.PaymentState", "PAID");
            if (paid == null) {
                throw new Error("PaymentState.PAID not found");
            }
            return paid;
        });

        hookByName("membershipTierExperience", function () {
            const tier = enumValue("com.life360.inapppurchase.MembershipTierExperience", "TRIPLE_TIER");
            if (tier == null) {
                throw new Error("MembershipTierExperience.TRIPLE_TIER not found");
            }
            return tier;
        });

        hookByName("trialForSku", function () {
            return Java.use("java.lang.Integer").$new(7);
        });

        console.log("[*] Life360 hooks installed");
        return true;
    }

    function boot() {
        attempts++;
        let ok = false;
        try {
            Java.perform(function () {
                ok = install();
            });
        } catch (e) {
            console.log("[-] Java.perform failed: " + e);
        }

        if (!ok && attempts < 5) {
            setTimeout(boot, 3000);
        } else if (!ok) {
            console.log("[-] Life360 Premium class could not be loaded");
        }
    }

    setTimeout(boot, 5000);
}, 0);
