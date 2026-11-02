# FKIAB entitlement hooks — Xposed port

Replaces the Frida scripts for AdGuard and Life360 with libxposed 102 hooks.
The Frida path cannot run on Android 15+: `Java.perform()` aborts inside ART
before any callback fires, on every bridge version, with an empty callback.
See frida/frida#3783 (open, unfixed). LSPosed instrumentation does not do the
debuggable class walk, so the same hooks run from this side.

`build-frida-gum.sh` does not change this — it builds the Gum C core for
embedding, not a patched frida-java-bridge. The abort is one layer above Gum.

## Wiring into MainModule.kt

In `packageLoaded()`, inside the Application.onCreate intercept, after
`hookPurchaseVerificationMethods(classLoader, bridge)` and before
`val global = readScriptForPackage(global())`, insert:

```kotlin
EntitlementHooks.install(packageName, classLoader, bridge) { method ->
    hook(method).intercept { true }
}
