package fh

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.fuck.iab.Error__
import com.fuck.iab.HookedApp
import com.fuck.iab.R
import com.fuck.iab.ScriptInfo
import com.fuck.iab.ScriptStore
import com.fuck.iab.__A_Z__
import com.fuck.iab._c
import com.fuck.iab._s_
import com.fuck.iab.logcat__v_tag__s_FKIAB_V_FRIDA_V
import com.fuck.iab.su
import io.github.libxposed.service.HookedTarget
import io.github.libxposed.service.HotReloadResult
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
import kotlinx.coroutines.withTimeoutOrNull
import java.text.DateFormat
import java.util.Date

/** Everything the screens show about the module and its scripts. */
data class UiState(
    val connected: Boolean = false,
    val framework: String = "",
    val scripts: List<ScriptInfo> = emptyList(),
    val hookedApps: List<HookedApp> = emptyList(),
    val syncing: Boolean = false,
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

    private val _log_init = Channel<Unit>(Channel.BUFFERED)
    val logInit = _log_init.receiveAsFlow()
    fun logInit() {
        _log_init.trySend(Unit)
    }

    private var logcatJob: Job? = null

    fun startLogcatStreaming() {
        if (logcatJob != null) {
            return
        }

        logcatJob = viewModelScope.launch(Dispatchers.IO) {
            try {
                val process = Runtime.getRuntime().exec(
                    arrayOf(
                        su(),
                        _c(),
                        logcat__v_tag__s_FKIAB_V_FRIDA_V()
                    )
                )
                val reader = process.inputStream.bufferedReader()
                while (isActive) {
                    val line = reader.readLine() ?: break

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
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    addLog("${Error__()}${e.message}\n")
                }
            }
        }
    }

    // ---- module and script state ----------------------------------------------

    private val _state = MutableStateFlow(UiState())
    val state = _state.asStateFlow()

    private var currentService: XposedService? = null
    private var autoSynced = false

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
            _state.update { it.copy(scripts = emptyList(), hookedApps = emptyList(), cached = 0) }
            return
        }

        viewModelScope.launch {
            val stale = withContext(Dispatchers.IO) { RemoteScriptSync.isStale(service) }

            if (stale && !autoSynced) {
                autoSynced = true
                sync()
            } else {
                refresh()
            }
        }
    }

    /** Reloads the whole picture: scripts, scope and the processes the module is loaded in. */
    fun refresh() {
        val service = currentService

        viewModelScope.launch {
            val loaded = withContext(Dispatchers.IO) { load(service) }

            _state.update {
                it.copy(
                    scripts = loaded.scripts,
                    hookedApps = loaded.apps,
                    cached = loaded.cached,
                    lastSync = loaded.lastSync
                )
            }
        }
    }

    private class Loaded(
        val scripts: List<ScriptInfo>,
        val apps: List<HookedApp>,
        val cached: Int,
        val lastSync: Long
    )

    private fun load(service: XposedService?): Loaded {
        val context = getApplication<Application>()

        // Right after the service binds again the framework can answer with an empty scope
        // for a moment, which would read as "no apps in scope". Ask once more before believing it.
        var scope = if (service != null) ScriptStore.scope(service) else emptyList()
        if (service != null && scope.isEmpty()) {
            Thread.sleep(SCOPE_RETRY_MS)
            scope = ScriptStore.scope(service)
        }

        val scripts = ScriptStore.inventory(context, service, scope.toSet())

        return Loaded(
            scripts = scripts,
            apps = if (service != null) ScriptStore.hookedApps(context, service, scripts, scope) else emptyList(),
            cached = if (service != null) RemoteScriptSync.cachedCount(service) else 0,
            lastSync = if (service != null) RemoteScriptSync.lastSync(service) else 0
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
                refreshRunning()
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

    /**
     * Asks the framework to reload the module in the processes that are still running an
     * old build of it. The result arrives through the service callback.
     */
    fun hotReload(packageName: String) {
        val service = currentService ?: return

        viewModelScope.launch {
            val app = getApplication<Application>()

            val targets = withContext(Dispatchers.IO) {
                try {
                    service.runningTargets.filter { target ->
                        target.processName?.substringBefore(':') == packageName &&
                            target.state == HookedTarget.State.STALE
                    }
                } catch (e: Exception) {
                    emptyList()
                }
            }

            if (targets.isEmpty()) {
                _messages.trySend(app.getString(R.string.hot_reload_none))
                return@launch
            }

            val results = Channel<String>(Channel.UNLIMITED)

            val callback = XposedService.HotReloadCallback { target, result ->
                val label = target.processName ?: packageName

                results.trySend(
                    when (result.status()) {
                        HotReloadResult.Status.SUCCEEDED -> app.getString(R.string.hot_reload_ok, label)
                        HotReloadResult.Status.UNSUPPORTED -> app.getString(R.string.hot_reload_unsupported, label)
                        HotReloadResult.Status.IN_PROGRESS -> app.getString(R.string.hot_reload_progress, label)
                        HotReloadResult.Status.PROCESS_DIED -> app.getString(R.string.hot_reload_died, label)
                        else -> result.message()?.let { app.getString(R.string.hot_reload_failed, label, it) }
                            ?: app.getString(R.string.hot_reload_failed_unknown, label)
                    }
                )
            }

            withContext(Dispatchers.IO) {
                targets.forEach { target ->
                    try {
                        service.hotReloadModule(target, null, callback)
                    } catch (e: Exception) {
                        results.trySend(
                            app.getString(
                                R.string.hot_reload_failed,
                                target.processName ?: packageName,
                                e.message ?: e.javaClass.simpleName
                            )
                        )
                    }
                }
            }

            val collected = mutableListOf<String>()

            withTimeoutOrNull(HOT_RELOAD_TIMEOUT_MS) {
                repeat(targets.size) { collected += results.receive() }
            }

            _messages.trySend(
                collected.joinToString("; ").ifEmpty { app.getString(R.string.hot_reload_timeout) }
            )

            refreshRunning()
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
        const val HOT_RELOAD_TIMEOUT_MS = 15000L
        const val SCOPE_RETRY_MS = 400L
    }
}
