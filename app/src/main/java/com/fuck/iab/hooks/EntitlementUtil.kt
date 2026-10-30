package com.fuck.iab.hooks

import java.lang.reflect.Method
import java.lang.reflect.Modifier

object EntitlementUtil {
    fun hookBools(start: Class<*>, hk: (Method) -> Any?): Int {
        var n = 0
        var c: Class<*>? = start
        val seen = HashSet<String>()
        while (c != null && c != Any::class.java) {
            for (m in c.declaredMethods) {
                if (m.isSynthetic || Modifier.isStatic(m.modifiers)) continue
                if (m.returnType != Boolean::class.javaPrimitiveType) continue
                if (!seen.add(m.parameterTypes.joinToString(",") { it.name })) continue
                try { hk(m); n++ } catch (_: Throwable) {}
            }
            c = c.superclass
        }
        return n
    }

    fun hookByName(clazz: Class<*>, name: String, hk: (Method) -> Any?): Int {
        var n = 0
        for (m in clazz.declaredMethods) {
            if (m.name != name || m.parameterCount != 0) continue
            if (m.isSynthetic || Modifier.isStatic(m.modifiers)) continue
            try { hk(m); n++ } catch (_: Throwable) {}
        }
        return n
    }

    fun hookPred(clazz: Class<*>, predicate: (Method) -> Boolean, hk: (Method) -> Any?): Int {
        var n = 0
        for (m in clazz.declaredMethods) {
            if (m.isSynthetic || Modifier.isStatic(m.modifiers)) continue
            if (!predicate(m)) continue
            try { hk(m); n++ } catch (_: Throwable) {}
        }
        return n
    }
}