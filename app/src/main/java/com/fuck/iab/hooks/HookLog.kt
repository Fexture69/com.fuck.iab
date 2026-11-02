package com.fuck.iab.hooks

import android.util.Log

/**
 * FKIAB own log() is commented out throughout MainModule.kt and FakeBinder.kt,
 * which means a failing hook installs silently and nothing surfaces in logcat.
 *
 * This is the logging path the entitlement hooks use instead. Filter with:
 *
 *     adb logcat -s FKIAB-HOOK:V
 */
object HookLog {
    private const val TAG = "FKIAB-HOOK"

    fun info(msg: String) = Log.i(TAG, msg)
    fun warn(msg: String) = Log.w(TAG, msg)
    fun error(msg: String, t: Throwable? = null) {
        if (t != null) Log.e(TAG, msg, t) else Log.e(TAG, msg)
    }
}
