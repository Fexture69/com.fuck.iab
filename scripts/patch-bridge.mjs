// Makes FRIDA_JAVA_BRIDGE_DISABLE_JVMTI real by patching the installed bridge.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const p = "node_modules/frida-java-bridge/lib/android.js";

if (!existsSync(p)) {
  console.error("[patch-bridge] run npm install first");
  process.exit(1);
}

let s = readFileSync(p, "utf8");

if (s.includes("FRIDA_JAVA_BRIDGE_DISABLE_JVMTI")) {
  console.log("[patch-bridge] already applied");
  process.exit(0);
}

// Use a regex to ignore formatting/newlines in the bridge source
const regex = /function tryGetEnvJvmti\s*\(\s*vm\s*,\s*runtime\s*\)\s*\{/;
const b = "function tryGetEnvJvmti (vm, runtime) { if (globalThis.FRIDA_JAVA_BRIDGE_DISABLE_JVMTI === true) return null;";

if (!regex.test(s)) {
  console.error("[patch-bridge] anchor missing - bridge version changed drastically");
  process.exit(1);
}

s = s.replace(regex, b);
writeFileSync(p, s);
console.log("[patch-bridge] tryGetEnvJvmti now honors FRIDA_JAVA_BRIDGE_DISABLE_JVMTI");