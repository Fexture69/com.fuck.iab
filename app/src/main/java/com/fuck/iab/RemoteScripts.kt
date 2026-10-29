package com.fuck.iab

import java.util.Locale

/**
 * Names of the files the module keeps in its shared data directory.
 *
 * A script written in the manager app is stored there as a user copy, and the module reads it
 * before the script compiled into the APK.
 */
object RemoteScripts {

    /** Package names whose scripts must not run, stored in the module preferences. */
    const val DISABLED_SCRIPTS_KEY = "disabled_scripts"

    private const val USER_PREFIX = "us_"

    /** Flat file name of the user copy of [packageName], which overrides the bundled one. */
    fun userFileName(packageName: String): String = flatName(USER_PREFIX, packageName)

    private fun flatName(prefix: String, packageName: String): String {
        val safe = buildString(packageName.length) {
            packageName.forEach { append(if (it.isLetterOrDigit()) it else '_') }
        }

        return "$prefix${safe}_${String.format(Locale.US, "%08x", packageName.hashCode())}"
    }
}
