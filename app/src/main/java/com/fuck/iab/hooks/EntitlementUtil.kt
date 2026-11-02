package com.fuck.iab.hooks

import java.lang.reflect.Method
import java.lang.reflect.Modifier

/**
 * Shared reflection helpers for the entitlement hooks.
 *
 * Extracted from the two hook classes so that the per-app code stays
 * small enough to review at a glance. Every hooker invocation is wrapped
 * in its own try/catch -- a failing method skips itself instead of
 * taking the whole install down with it.
 */
object EntitlementUtil {

    /** Forces every non-static boolean method on the hierarchy to true. */
    fun hookBools(start: Class<*>, hk: (Method) -> Unit): Int {
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

    /** Hooks every zero-arg overload of (name) on the class. */
    fun hookByName(clazz: Class<*>, name: String, hk: (Method) -> Unit): Int {
        var n = 0
        for (m in clazz.declaredMethods) {
            if (m.name != name || m.parameterCount != 0) continue
            if (m.isSynthetic || Modifier.isStatic(m.modifiers)) continue
            try { hk(m); n++ } catch (_: Throwable) {}
        }
        return n
    }

    /** Hooks every non-static method matching (`redicate). */
    fun hookPred(clazz: Class<*>, predicate: (Method) -> Boolean, hk: (Method) -> Unit): Int {
        var n = 0
        for (m in clazz.declaredMethods) {
            if (m.isSynthetic || Modifier.isStatic(m.modifiers)) continue
            if (!predicate(m)) continue
            try { hk(m); n++ } catch (_: Throwable) {}
        }
        return n
    }
}
