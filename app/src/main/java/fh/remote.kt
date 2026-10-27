package fh

import com.fuck.iab.RemoteScripts
import io.github.libxposed.service.XposedService
import java.io.FileInputStream
import java.io.FileOutputStream
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL
import java.security.MessageDigest
import java.util.Locale

/**
 * Downloads the published scripts into the module's shared data directory, where the
 * module reads them in the hooked apps. Only runs while the manager app has a service
 * connection, so nothing is fetched from inside a hooked app.
 *
 * All calls block, so they belong on a background dispatcher.
 */
object RemoteScriptSync {

    private const val TIMEOUT_MS = 20000

    /** How long a cached index is trusted before the manager app syncs on its own. */
    const val FRESH_MS = 12 * 60 * 60 * 1000L

    data class Result(val downloaded: Int, val removed: Int, val total: Int)

    fun sync(service: XposedService): Result {
        val manifest = RemoteScripts.parseManifest(String(download(RemoteScripts.MANIFEST_URL), Charsets.UTF_8))

        if (manifest.isEmpty()) {
            throw IllegalStateException("published manifest lists no scripts")
        }

        val present = service.listRemoteFiles().toSet()
        val wanted = HashSet<String>(manifest.size)
        var downloaded = 0

        for (entry in manifest) {
            val name = RemoteScripts.fileName(entry.packageName)
            wanted += name

            val cached = if (present.contains(name)) read(service, name) else null
            if (cached != null && cached.isNotEmpty() && sha256(cached) == entry.sha256) continue

            val bytes = download(entry.url)

            if (sha256(bytes) != entry.sha256) {
                throw IOException("checksum mismatch for ${entry.packageName}")
            }

            write(service, name, bytes)
            downloaded++
        }

        var removed = 0
        for (name in present) {
            if (!RemoteScripts.isScriptFile(name) || wanted.contains(name)) continue
            if (service.deleteRemoteFile(name)) removed++
        }

        write(
            service,
            RemoteScripts.INDEX_FILE,
            RemoteScripts.indexJson(System.currentTimeMillis(), manifest.size).toByteArray(Charsets.UTF_8)
        )

        return Result(downloaded, removed, manifest.size)
    }

    /** Number of scripts currently cached in the shared data directory. */
    fun cachedCount(service: XposedService): Int {
        return try {
            service.listRemoteFiles().count { RemoteScripts.isScriptFile(it) }
        } catch (e: Exception) {
            0
        }
    }

    /** Time of the last successful sync, or 0 when nothing has been synced yet. */
    fun lastSync(service: XposedService): Long {
        return try {
            val bytes = read(service, RemoteScripts.INDEX_FILE) ?: return 0
            RemoteScripts.parseIndex(String(bytes, Charsets.UTF_8))?.fetchedAt ?: 0
        } catch (e: Exception) {
            0
        }
    }

    fun isStale(service: XposedService): Boolean {
        val last = lastSync(service)
        return last == 0L || System.currentTimeMillis() - last > FRESH_MS
    }

    private fun download(url: String): ByteArray {
        val connection = (URL(url).openConnection() as HttpURLConnection).apply {
            connectTimeout = TIMEOUT_MS
            readTimeout = TIMEOUT_MS
            requestMethod = "GET"
            instanceFollowRedirects = true
            setRequestProperty("User-Agent", "FKIAB")
            setRequestProperty("Cache-Control", "no-cache")
        }

        try {
            val code = connection.responseCode
            if (code != HttpURLConnection.HTTP_OK) {
                throw IOException("HTTP $code for $url")
            }

            return connection.inputStream.use { it.readBytes() }
        } finally {
            connection.disconnect()
        }
    }

    private fun read(service: XposedService, name: String): ByteArray? {
        return try {
            val pfd = service.openRemoteFile(name)
            FileInputStream(pfd.fileDescriptor).use { it.readBytes() }
        } catch (e: Exception) {
            null
        }
    }

    private fun write(service: XposedService, name: String, bytes: ByteArray) {
        val pfd = service.openRemoteFile(name)
        FileOutputStream(pfd.fileDescriptor).use { out ->
            out.channel.truncate(0)
            out.write(bytes)
        }
    }

    private fun sha256(bytes: ByteArray): String {
        return MessageDigest.getInstance("SHA-256")
            .digest(bytes)
            .joinToString("") { String.format(Locale.US, "%02x", it) }
    }
}
