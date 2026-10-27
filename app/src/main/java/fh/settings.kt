package fh

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.fuck.iab.R
import com.fuck.iab.RemoteScripts
import com.fuck.iab.ScriptStore
import com.google.android.material.button.MaterialButton
import com.google.android.material.button.MaterialButtonToggleGroup
import java.text.DateFormat
import java.util.Date
import kotlinx.coroutines.launch

// settings screen: appearance, logs and what the module can see
class settings : Fragment() {

    private val viewModel: h by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val v = inflater.inflate(R.layout.page_settings, container, false)

        val themeGroup = v.findViewById<MaterialButtonToggleGroup>(R.id.themeGroup)
        val themeSystem = v.findViewById<MaterialButton>(R.id.themeSystem)
        val themeLight = v.findViewById<MaterialButton>(R.id.themeLight)
        val themeDark = v.findViewById<MaterialButton>(R.id.themeDark)

        when (ScriptStore.theme(requireContext())) {
            ScriptStore.THEME_LIGHT -> themeLight.isChecked = true
            ScriptStore.THEME_DARK -> themeDark.isChecked = true
            else -> themeSystem.isChecked = true
        }

        themeGroup.addOnButtonCheckedListener { _, checkedId, isChecked ->
            if (!isChecked) return@addOnButtonCheckedListener

            val mode = when (checkedId) {
                R.id.themeLight -> ScriptStore.THEME_LIGHT
                R.id.themeDark -> ScriptStore.THEME_DARK
                else -> ScriptStore.THEME_SYSTEM
            }

            ScriptStore.setTheme(requireContext(), mode)
        }

        v.findViewById<View>(R.id.logsRow).setOnClickListener {
            startActivity(Intent(requireContext(), logs::class.java))
        }

        v.findViewById<MaterialButton>(R.id.syncNowButton).setOnClickListener {
            viewModel.sync()
        }

        v.findViewById<TextView>(R.id.settingStore).text = RemoteScripts.BASE_URL

        val framework = v.findViewById<TextView>(R.id.settingFramework)
        val scope = v.findViewById<TextView>(R.id.settingScope)
        val cached = v.findViewById<TextView>(R.id.settingCached)
        val lastSync = v.findViewById<TextView>(R.id.settingLastSync)

        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.state.collect { state ->
                    framework.text = if (state.connected) state.framework else getString(R.string.home_not_connected)
                    scope.text = state.scope.toString()
                    cached.text = state.cached.toString()
                    lastSync.text = if (state.lastSync == 0L) {
                        getString(R.string.home_never)
                    } else {
                        DateFormat.getDateTimeInstance().format(Date(state.lastSync))
                    }
                }
            }
        }

        return v
    }
}
