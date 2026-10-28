package fh

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.fuck.iab.HookedApp
import com.fuck.iab.R
import com.fuck.iab.ScriptInfo
import com.fuck.iab.ScriptStore
import com.fuck.iab.__A_Z__
import com.fuck.iab._c
import com.fuck.iab._s_
import com.fuck.iab.logcat__v_tag__s_FKIAB_V_FRIDA_V
import com.fuck.iab.su
import io.github.libxposed.service.XposedService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.text.DateFormat
import java.util.Date

/** Everything the screens show about the module and its scripts. */
data class UiState(
    val connected: Boolean = false,
    val framework: String = "",
    val scripts: List<ScriptInfo> = emptyList(),
    val hookedApps: List<HookedApp> = emptyList(),
    val syncing: Boolean = false,
    /** True when the framework did not report the scope and the last known one is shown. */
    val scopeUnconfirmed: Boolean = false,
    val syncStatus: String = "",
    val lastSync: Long = 0L,
    val cached: Int = 0
) {
    val enabled: Int get() = scripts.count { it.enabled }
    val scope: Int get() = hookedApps.size
}

class h(application: Application) : AndroidViewModel(application) {

    private val logsArray = ArrayDeque<String>()
    private val _logs = Channel<String>(100)
    val logs = _logs.receiveAsFlow()

    fun addLog(text: String) {
        synchronized(logsArray) {
            logsArray.addLast(text)

            while (logsArray.size > 5000) {
                logsArray.removeFirst()
            }
        }

        _logs.trySend(text)
    }

    fun getLogs(): String {
        return synchronized(logsArray) {
            logsArray.joinToString("")
        }
    }

    fun clearLogs() {
        synchronized(logsArray) {
            logsArray.clear()
        }
    }

    /** Set from the toolbar toggle, read by the log page when it scrolls. */
    var autoScroll = true

    private val _cleared = Channel<Unit>(Channel.BUFFERED)

    /** Tells the log page to drop the text it has on screen, not just the buffer. */
    val cleared = _cleared.receiveAsFlow()

    fun clearLogView() {
        clearLogs()
        _cleared.trySend(Unit)
    }

    private var logcatJob: Job? = null

    /**
     * Streams the module's own log. The lines come from the hooked apps, so they are read with
     * `su logcat`, and every way that can fail gets an explanation rather than a raw error.
     */
    fun startLogcatStreaming() {
        if (logcatJob != null) {
            return
        }

        logcatJob = viewModelScope.launch(Dispatchers.IO) {
            val app = getApplication<Application>()

            val process = try {
                Runtime.getRuntime().exec(
                    arrayOf(
                        su(),
                        _c(),
                        logcat__v_tag__s_FKIAB_V_FRIDA_V()
                    )
                )
            } catch (e: Exception) {
                // No su on the device at all, which is the usual case on an unrooted phone.
                withContext(Dispatchers.Main) { addLog(app.getString(R.string.logs_no_su) + "\n") }
                return@launch
            }

            try {
                val reader = process.inputStream.bufferedReader()
                var line = reader.readLine()

                if (line == null) {
                    val code = try {
                        process.waitFor()
                    } catch (e: Exception) {
                        -1
                    }

                    withContext(Dispatchers.Main) {
                        addLog(
                            app.getString(
                                if (code != 0) R.string.logs_root_denied else R.string.logs_no_output
                            ) + "\n"
                        )
                    }

                    return@launch
                }

                while (isActive) {
                    val index = line.indexOf(": ")

                    val clean = if (index != -1) {
                        line.substring(0, index)
                            .replace(Regex(__A_Z__()), "")
                            .trim() +
                                _s_() +
                                line.substring(index + 2)
                    } else {
                        line
                    }

                    withContext(Dispatchers.Main) {
                        addLog(clean + "\n")
                    }

                    line = reader.readLine() ?: break
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    addLog(app.getString(R.string.logs_stream_failed, e.message ?: e.javaClass.simpleName) + "\n")
                }
            }
        }
    }

    /** Starts the stream again, for after root has been granted. */
    fun retryLogcatStreaming() {
        logcatJob?.cancel()
        logcatJob = null
        clearLogView()
        startLogcatStreaming()
    }

    // ---- module and script state ----------------------------------------------

    private val _state = MutableStateFlow(UiState())
    val state = _state.asStateFlow()

    private var currentService: XposedService? = null
    private var autoSynced = false
    private var lastScope: List<String> = emptyList()

    /** Called when the framework connection comes up or goes away. */
    fun attachService(service: XposedService?) {
        currentService = service

        _state.update {
            it.copy(
                connected = service != null,
                framework = service?.let { s -> "${s.frameworkName} ${s.frameworkVersionCode}" } ?: ""
            )
        }

        if (service == null) {
            autoSynced = false
            // The scripts are not cleared here. Without the service the list can only be built
            // from user copies, and replacing it with that would hide every downloaded script
            // until the framework binds again.
            _state.update { it.copy(hookedApps = emptyList()) }
            return
        }

        viewModelScope.launch {
            // Only the first run, with nothing cached yet, fetches on its own. After that the
            // store is only pulled when the refresh action is used.
            val firstRun = withContext(Dispatchers.IO) { RemoteScriptSync.lastSync(service) == 0L }

            if (firstRun && !autoSynced) {
                autoSynced = true
                sync()
            } else {
                refresh()
            }
        }
    }

    /** Reloads the whole picture: scripts, scope and the processes the module is loaded in. */
    fun refresh() {
        val service = currentService ?: return

        viewModelScope.launch {
            val loaded = withContext(Dispatchers.IO) { load(service) }

            _state.update {
                it.copy(
                    scripts = loaded.scripts,
                    hookedApps = loaded.apps,
                    cached = loaded.cached,
                    lastSync = loaded.lastSync,
                    scopeUnconfirmed = !loaded.scopeConfirmed
                )
            }
        }
    }

    private class Loaded(
        val scripts: List<ScriptInfo>,
        val apps: List<HookedApp>,
        val cached: Int,
        val lastSync: Long,
        val scopeConfirmed: Boolean
    )

    /**
     * Reads the module scope. The framework sometimes answers with an empty scope - often right
     * after the service binds again - while the module is plainly loaded in running apps, so the
     * last known list is used as a fallback and reported as unconfirmed, rather than as no apps.
     */
    private fun resolveScope(context: Application, service: XposedService?): Pair<List<String>, Boolean> {
        if (service == null) return emptyList<String>() to false

        var scope = ScriptStore.scope(service)

        if (scope.isEmpty()) {
            Thread.sleep(SCOPE_RETRY_MS)
            scope = ScriptStore.scope(service)
        }

        if (scope.isNotEmpty()) {
            ScriptStore.saveScope(context, scope)
            return scope to true
        }

        val cached = ScriptStore.savedScope(context)
        return cached to cached.isNotEmpty()
    }

    private fun load(service: XposedService?): Loaded {
        val context = getApplication<Application>()

        val (scope, scopeConfirmed) = resolveScope(context, service)
        val scripts = ScriptStore.inventory(context, service, scope.toSet())

        return Loaded(
            scripts = scripts,
            apps = if (service != null) ScriptStore.hookedApps(context, service, scripts, scope) else emptyList(),
            cached = if (service != null) RemoteScriptSync.cachedCount(service) else 0,
            lastSync = if (service != null) RemoteScriptSync.lastSync(service) else 0,
            scopeConfirmed = scopeConfirmed && service != null
        )
    }

    private val _messages = Channel<String>(Channel.BUFFERED)

    /** One shot results for the screens to show, currently the manual sync outcome. */
    val messages = _messages.receiveAsFlow()

    /** Pulls the published scripts, then reloads what the screens show. */
    fun sync(manual: Boolean = false) {
        val service = currentService ?: return
        if (_state.value.syncing) return

        _state.update { it.copy(syncing = true, syncStatus = getApplication<Application>().getString(R.string.syncing)) }

        viewModelScope.launch {
            val result = withContext(Dispatchers.IO) {
                try {
                    Result.success(RemoteScriptSync.sync(service))
                } catch (e: Exception) {
                    Result.failure(e)
                }
            }

            val status = result.fold(
                onSuccess = {
                    getApplication<Application>().getString(R.string.sync_result, it.downloaded, it.removed, it.total)
                },
                onFailure = {
                    getApplication<Application>().getString(R.string.sync_failed, it.message ?: it.javaClass.simpleName)
                }
            )

            _state.update { it.copy(syncing = false, syncStatus = status) }

            if (manual) _messages.trySend(status)

            refresh()
        }
    }

    private var runningPoll: Job? = null

    /**
     * The running indicator only matters while home is on screen, so polling follows
     * the visible page instead of running in the background.
     */
    fun setHomeVisible(visible: Boolean) {
        if (!visible) {
            runningPoll?.cancel()
            runningPoll = null
            return
        }

        if (runningPoll != null) return

        runningPoll = viewModelScope.launch {
            while (isActive) {
                // While the framework is not reporting the scope, keep asking for the whole
                // picture so the hooked apps come back on their own once it answers again.
                if (_state.value.scopeUnconfirmed) refresh() else refreshRunning()

                delay(RUNNING_POLL_MS)
            }
        }
    }

    /** Cheap refresh of just the running processes, for the live indicator on home. */
    fun refreshRunning() {
        val service = currentService ?: return

        viewModelScope.launch {
            val running = withContext(Dispatchers.IO) {
                try {
                    ScriptStore.runningProcesses(service)
                } catch (e: Exception) {
                    emptyMap()
                }
            }

            _state.update { state ->
                if (state.hookedApps.isEmpty()) {
                    state
                } else {
                    state.copy(
                        hookedApps = state.hookedApps.map { app ->
                            app.copy(running = running[app.packageName].orEmpty())
                        }
                    )
                }
            }
        }
    }

    fun setEnabled(packageName: String, enabled: Boolean) {
        val service = currentService ?: return

        viewModelScope.launch {
            withContext(Dispatchers.IO) { ScriptStore.setEnabled(service, packageName, enabled) }
            refresh()
        }
    }

    /** Result of the last sync in this process, or when the cached copy was fetched. */
    fun syncStatusLabel(): String {
        val state = _state.value

        if (state.syncStatus.isNotEmpty()) return state.syncStatus

        if (state.lastSync == 0L) {
            return getApplication<Application>().getString(R.string.sync_never)
        }

        val when_ = DateFormat.getDateTimeInstance().format(Date(state.lastSync))
        return getApplication<Application>().getString(R.string.sync_last, when_)
    }

    override fun onCleared() {
        logcatJob?.cancel()
        runningPoll?.cancel()
        super.onCleared()
    }

    private companion object {
        const val RUNNING_POLL_MS = 5000L
        const val SCOPE_RETRY_MS = 400L
    }
}
