package fh

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.core.widget.addTextChangedListener
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.fuck.iab.Not_connected_to_framework
import com.fuck.iab.R
import com.fuck.iab.Sync_scripts
import com.fuck.iab.script_hint
import kotlinx.coroutines.launch

// script fragment
class e : Fragment() {

    lateinit var scriptInput: EditText
    lateinit var saveButton: Button
    lateinit var syncButton: Button
    lateinit var syncStatus: TextView

    private val viewModel: h by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val v = inflater.inflate(
            R.layout.page_script,
            container,
            false
        )

        scriptInput = v.findViewById(R.id.scriptInput)
        scriptInput.hint = script_hint()
        scriptInput.setHorizontallyScrolling(true)
        saveButton = v.findViewById(R.id.saveButton)
        saveButton.setOnClickListener {
            viewModel.requestSave(scriptInput.text.toString())
        }

        syncStatus = v.findViewById(R.id.syncStatus)
        syncButton = v.findViewById(R.id.syncButton)
        syncButton.text = Sync_scripts()
        syncButton.setOnClickListener {
            val service = g.getService()

            if (service == null) {
                Toast.makeText(requireContext(), Not_connected_to_framework(), Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            viewModel.sync(service)
        }

        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.syncStatus.collect { status ->
                    syncStatus.text = status
                }
            }
        }

        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.syncRunning.collect { running ->
                    syncButton.isEnabled = !running
                }
            }
        }

        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.scriptText.collect { text ->
                    if (scriptInput.text.toString() != text) {
                        scriptInput.setText(text)
                        scriptInput.setSelection(text.length)
                    }
                }
            }
        }

        scriptInput.addTextChangedListener {
            viewModel.setScriptText(it.toString())
        }

        return v
    }
}