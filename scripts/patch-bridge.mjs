// Makes FRIDA_JAVA_BRIDGE_DISABLE_JVMTI real by patching the installed bridge.
// Upstream frida-java-bridge has no runtime switch for JVMTI; tryGetEnvJvmti()
// calls EnsurePluginLoaded unconditionally, which is the ART abort path on
// Android 15+. Returning null here falls through to the pre-JVMTI
// art_api.available branch in lib/class-model.js.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const p = "node_modules/frida-java-bridge/lib/android.js";

if (!existsSync(p)) {
  console.error("[patch-bridge] run npm install first");
  process.exit(1);
}

let s = readFileSync(p, "utf8");

if (s.includes("FRIDA_JAVA_BRIDGE_DISABLE_JVMTI === true")) {
  console.log("[patch-bridge] already applied");
  process.exit(0);
}

const a = "function tryGetEnvJvmti (vm, runtime) { let env = null;";
const b =
  "function tryGetEnvJvmti (vm, runtime) { " +
  "if (globalThis.FRIDA_JAVA_BRIDGE_DISABLE_JVMTI === true) { return null; } " +
  "let env = null;";

if (!s.includes(a)) {
  console.error("[patch-bridge] anchor missing - bridge version changed");
  process.exit(1);
}

writeFileSync(p, s.replace(a, b));
console.log("[patch-bridge] tryGetEnvJvmti now honors FRIDA_JAVA_BRIDGE_DISABLE_JVMTI");