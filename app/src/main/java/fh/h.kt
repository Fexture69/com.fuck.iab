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
import io.github.libxposed.service.XposedService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
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
        val scripts = ScriptStore.inventory(context, service)

        return Loaded(
            scripts = scripts,
            apps = if (service != null) ScriptStore.hookedApps(context, service, scripts) else emptyList(),
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
        super.onCleared()
    }
}
