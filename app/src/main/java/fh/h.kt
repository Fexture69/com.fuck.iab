package fh

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fuck.iab.Error__
import com.fuck.iab.__A_Z__
import com.fuck.iab._c
import com.fuck.iab._s_
import com.fuck.iab.Not_synced_yet
import com.fuck.iab.Scripts_cached_
import com.fuck.iab.Sync_failed_
import com.fuck.iab.Sync_result
import com.fuck.iab.Syncing_
import com.fuck.iab.logcat__v_tag__s_FKIAB_V_FRIDA_V
import com.fuck.iab.su
import io.github.libxposed.service.XposedService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.util.Locale

class h : ViewModel() {

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
        return synchronized(logsArray) {
            logsArray.clear()
        }
    }

    var scriptLoaded = false
    private val _scriptText = MutableStateFlow("")
    val scriptText = _scriptText.asStateFlow()
    fun setScriptText(text: String) {
        _scriptText.value = text
    }

    private val _saveRequest = Channel<String>(Channel.BUFFERED)
    val saveRequest = _saveRequest.receiveAsFlow()
    fun requestSave(text: String) {
        _saveRequest.trySend(text)
    }

    private val _syncStatus = MutableStateFlow("")
    val syncStatus = _syncStatus.asStateFlow()

    private val _syncRunning = MutableStateFlow(false)
    val syncRunning = _syncRunning.asStateFlow()

    private var serviceHandled = false

    /** Called once the manager app has a framework connection. */
    fun onServiceAvailable(service: XposedService) {
        if (serviceHandled) return
        serviceHandled = true

        viewModelScope.launch {
            val stale = withContext(Dispatchers.IO) {
                RemoteScriptSync.isStale(service)
            }

            if (stale) {
                sync(service)
            } else {
                refreshScriptStatus(service)
            }
        }
    }

    fun refreshScriptStatus(service: XposedService) {
        if (_syncRunning.value) return

        viewModelScope.launch {
            val count = withContext(Dispatchers.IO) {
                RemoteScriptSync.cachedCount(service)
            }

            if (_syncRunning.value) return@launch

            _syncStatus.value = if (count == 0) {
                Not_synced_yet()
            } else {
                String.format(Locale.US, Scripts_cached_(), count)
            }
        }
    }

    fun sync(service: XposedService) {
        if (_syncRunning.value) return

        _syncRunning.value = true
        _syncStatus.value = Syncing_()

        viewModelScope.launch {
            val result = withContext(Dispatchers.IO) {
                try {
                    Result.success(RemoteScriptSync.sync(service))
                } catch (e: Exception) {
                    Result.failure(e)
                }
            }

            _syncRunning.value = false

            _syncStatus.value = result.fold(
                onSuccess = {
                    String.format(Locale.US, Sync_result(), it.downloaded, it.removed, it.total)
                },
                onFailure = {
                    "${Sync_failed_()}${it.message ?: it.javaClass.simpleName}"
                }
            )
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


    override fun onCleared() {
        logcatJob?.cancel()
        super.onCleared()
    }
}