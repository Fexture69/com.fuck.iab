/*
 * com.adguard.android-hook.js  (IAB/FKIAB-compatible)
 * Source: github.com/rushiranpise/com.fuck.iab
 *
 * Runs in the FKIAB session, immediately AFTER global.js (the repository's setup
 * script). It binds the JavaScript bridge `Java` (the IAB JavaBridge) and uses the
 * IAB helper `findClass()` to resolve the (obfuscated) license-checker class, then
 * forces every boolean state-validation method to return TRUE on every call.
 *
 * Load order (FKIAB):
 *   1. global.js          — sets up Java/il2cpp bridges + helpers (Java, findClass, ...)
 *   2. com.adguard.android-hook.js  — this script
 *
 * Load order (standalone fallback, no global.js):
 *   frida -U -l com.adguard.android-hook.js com.adguard.android
 *
 * Configuration (edit for your target):
 *   TARGET_CLASS — the (possibly obfuscated) gate class, e.g. "J0.a" (AdGuard) or
 *                  "com.adguard.android.LicenseChecker" (non-obfuscated release).
 */
import "frida-il2cpp-bridge";
import JavaBridge from "../libs/frida-java-bridge.js";
export const Java = JavaBridge;

globalThis.FRIDA_JAVA_BRIDGE_DISABLE_JVMTI = true;

const TARGET_CLASS = "J0.a";        // AdGuard's obfuscated LicenseChecker (rename for your target)
const TARGET_METHOD = null;         // e.g. "isLicensed" — null means "first boolean method"

// ---- IAB helper (self-contained so the script works standalone too) ----
function findClass(name) {
  for (const loader of Java.enumerateClassLoadersSync()) {
    try { return Java.ClassFactory.get(loader).use(name); } catch (e) { /* skip */ }
  }
  return null;
}

function printMethods(clazz) {
  try {
    const ms = clazz.class.getDeclaredMethods();
    console.log("    [debug] methods(" + clazz.$className + "): " + ms.length);
  } catch (e) { /* no-op */ }
}

Java.perform(function () {
    console.log("[*] FKIAB boolean-state bypass (target: " + TARGET_CLASS + ")");

    const GateClass = findClass(TARGET_CLASS);
    if (!GateClass) {
        console.log("[-] Gate class not found at runtime: " + TARGET_CLASS);
        return;
    }

    printMethods(GateClass);   // optional: dump class methods for visibility

    // Locate the boolean state-verification method.
    const methods = GateClass.class.getDeclaredMethods();
    let targetMethod = null;
    for (let i = 0; i < methods.length; i++) {
        const m = methods[i];
        if (m.getReturnType().getName() === "boolean") {
            if (TARGET_METHOD) {
                if (m.getName() === TARGET_METHOD) { targetMethod = m; break; }
            } else {
                targetMethod = m;        // first boolean method
                break;
            }
        }
    }

    if (!targetMethod) {
        console.log("[-] No boolean method found in " + TARGET_CLASS);
        return;
    }

    // Install the hook on every overload of the target method.
    const overloads = GateClass[targetMethod.getName()].overloads;
    for (let i = 0; i < overloads.length; i++) {
        const overload = overloads[i];
        overload.implementation = function () {
            console.log("[+] Forced " + TARGET_CLASS + "#" + targetMethod.getName() + "() -> true");
            return true;   // ignore the original body entirely
        };
    }

    console.log("[+] Hooked boolean state method: " + TARGET_CLASS + "#" + targetMethod.getName());
});
