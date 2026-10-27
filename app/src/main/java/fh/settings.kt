package fh

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.fuck.iab.R
import com.fuck.iab.ScriptStore
import com.google.android.material.button.MaterialButton
import com.google.android.material.button.MaterialButtonToggleGroup

// settings screen: appearance and logs
class settings : Fragment() {

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

        return v
    }
}
