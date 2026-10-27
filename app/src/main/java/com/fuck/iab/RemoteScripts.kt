package com.fuck.iab

import org.json.JSONArray
import org.json.JSONObject
import java.util.Locale

/**
 * The remote script store.
 *
 * Compiled scripts are published to the [BRANCH] branch of the module repository by
 * `scripts/publish.js`. The manager app downloads them into the module's shared data
 * directory and the module reads them from there, so a new script shows up without
 * building and installing a new APK.
 *
 * Names inside that directory must not contain path separators or dots, which is why
 * a package name is turned into a flat file name by [fileName].
 */
object RemoteScripts {

    const val REPOSITORY = "rushiranpise/com.fuck.iab"

    const val BRANCH = "scripts-dist"

    const val BASE_URL = "https://raw.githubusercontent.com/$REPOSITORY/$BRANCH/"

    const val MANIFEST_URL = "${BASE_URL}manifest.json"

    /** Stores which manifest version is cached locally. Never treated as a script. */
    const val INDEX_FILE = "rs_index"

    private const val FILE_PREFIX = "rs_"
    private const val SCRIPTS_PATH = "scripts/"
    private const val FORMAT = 1

    data class Entry(
        val packageName: String,
        val file: String,
        val sha256: String,
        val size: Long,
        val author: String?
    ) {
        val url: String get() = "$BASE_URL$SCRIPTS_PATH$file"
    }

    data class Index(
        val fetchedAt: Long,
        val total: Int,
        val source: String
    )

    fun parseManifest(text: String): List<Entry> {
        val json = JSONObject(text)

        val format = json.optInt("format", 0)
        if (format != FORMAT) {
            throw IllegalStateException("unsupported manifest format: $format")
        }

        val scripts: JSONArray = json.optJSONArray("scripts") ?: JSONArray()
        val entries = ArrayList<Entry>(scripts.length())

        for (i in 0 until scripts.length()) {
            val script = scripts.optJSONObject(i) ?: continue

            val packageName = script.optString("package")
            val file = script.optString("file")
            val sha256 = script.optString("sha256")

            if (packageName.isEmpty() || file.isEmpty() || sha256.isEmpty()) continue

            entries += Entry(
                packageName = packageName,
                file = file,
                sha256 = sha256.lowercase(Locale.US),
                size = script.optLong("size"),
                author = script.optString("author").ifEmpty { null }
            )
        }

        return entries
    }

    fun indexJson(fetchedAt: Long, total: Int): String {
        return JSONObject().apply {
            put("fetchedAt", fetchedAt)
            put("total", total)
            put("source", MANIFEST_URL)
        }.toString()
    }

    fun parseIndex(text: String?): Index? {
        if (text.isNullOrBlank()) return null

        return try {
            val json = JSONObject(text)
            Index(
                fetchedAt = json.optLong("fetchedAt"),
                total = json.optInt("total"),
                source = json.optString("source")
            )
        } catch (e: Exception) {
            null
        }
    }

    /** Flat file name of the cached copy of [packageName] in the shared data directory. */
    fun fileName(packageName: String): String {
        val safe = buildString(packageName.length) {
            packageName.forEach { append(if (it.isLetterOrDigit()) it else '_') }
        }

        return "$FILE_PREFIX${safe}_${String.format(Locale.US, "%08x", packageName.hashCode())}"
    }

    fun isScriptFile(name: String): Boolean {
        return name.startsWith(FILE_PREFIX) && name != INDEX_FILE
    }
}
