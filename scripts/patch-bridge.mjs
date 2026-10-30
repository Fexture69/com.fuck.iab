import { readFileSync, writeFileSync, existsSync } from "node:fs";

// 1. Patch android.js
const pAndroid = "node_modules/frida-java-bridge/lib/android.js";
if (existsSync(pAndroid)) {
  let s = readFileSync(pAndroid, "utf8");
  const hasCap = /['"]can_generate_breakpoint_events['"],?/.test(s);
  s = s.replace(/['"]can_generate_breakpoint_events['"],?/g, "");
  s = s.replace("if (globalThis.FRIDA_JAVA_BRIDGE_DISABLE_JVMTI === true) { return null; }", "");
  writeFileSync(pAndroid, s);
  console.log("[patch-bridge] Patched android.js for Android 17 compatibility.");
}

// 2. Patch class-model.js to use safe JNI reflection on Android 15/17
const pClassModel = "node_modules/frida-java-bridge/lib/class-model.js";
if (existsSync(pClassModel)) {
  let s = readFileSync(pClassModel, "utf8");
  
  s = s.replace(
    /\[\s*1,\s*\.\.\.artClassOffsets,/g,
    "[ 0, ...artClassOffsets,"
  );

  s = s.replace(
    'jobject (* to_reflected_field) (JNIEnv *, jclass, jfieldID, jboolean) = funcs[12];',
    'jobject (* to_reflected_field) (JNIEnv *, jclass, jfieldID, jboolean) = funcs[12];\n  jobject (* exception_occurred) (JNIEnv *) = funcs[15];\n  void (* exception_clear) (JNIEnv *) = funcs[17];'
  );

  const oldElseMethods = `elements = call_object_method (env, class_handle, java_api.clazz.get_declared_methods);
    n = get_array_length (env, elements);`;
  const newElseMethods = `jobject ex;
    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_methods);
    ex = exception_occurred (env);
    if (ex != NULL) { exception_clear (env); delete_local_ref (env, ex); elements = NULL; }
    if (elements != NULL) {
      n = get_array_length (env, elements);`;
  s = s.replace(oldElseMethods, newElseMethods);

  const oldElseFields = `elements = call_object_method (env, class_handle, java_api.clazz.get_declared_fields);
    n = get_array_length (env, elements);`;
  const newElseFields = `delete_local_ref (env, elements);
    }
    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_fields);
    ex = exception_occurred (env);
    if (ex != NULL) { exception_clear (env); delete_local_ref (env, ex); elements = NULL; }
    if (elements != NULL) {
      n = get_array_length (env, elements);`;
  s = s.replace(oldElseFields, newElseFields);

  const oldClose = `delete_local_ref (env, elements);
  }`;
  const newClose = `delete_local_ref (env, elements);
    }
  }`;
  s = s.replace(oldClose, newClose);

  writeFileSync(pClassModel, s);
  console.log("[patch-bridge] Patched class-model.js for safe reflection fallback.");
}
