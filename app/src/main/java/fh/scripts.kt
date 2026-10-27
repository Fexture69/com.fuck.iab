package fh

import android.content.Context
import android.os.Bundle
import android.text.InputType
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.fuck.iab.R
import com.fuck.iab.ScriptInfo
import com.fuck.iab.ScriptStore
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton
import com.google.android.material.materialswitch.MaterialSwitch
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout
import kotlinx.coroutines.launch

// scripts screen: every known script, with a switch to enable or disable it per app
class scripts : Fragment() {

    private val viewModel: h by activityViewModels()
    private lateinit var adapter: ScriptAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val v = inflater.inflate(R.layout.page_scripts, container, false)

        val list = v.findViewById<RecyclerView>(R.id.scriptsList)
        val empty = v.findViewById<TextView>(R.id.scriptsEmpty)
        val newScript = v.findViewById<ExtendedFloatingActionButton>(R.id.newScriptButton)

        adapter = ScriptAdapter(requireContext()) { script ->
            startActivity(editor.intent(requireContext(), script.packageName))
        }

        list.layoutManager = LinearLayoutManager(requireContext())
        list.adapter = adapter

        newScript.setOnClickListener { askForPackage() }
        adapter.onEnabledChanged = { packageName, enabled -> viewModel.setEnabled(packageName, enabled) }

        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.state.collect { state ->
                    adapter.submitList(state.scripts)
                    empty.visibility = if (state.scripts.isEmpty()) View.VISIBLE else View.GONE
                }
            }
        }

        return v
    }

    override fun onResume() {
        super.onResume()
        // Picks up scripts saved in the editor.
        viewModel.refresh()
    }

    private fun askForPackage() {
        val input = TextInputLayout(requireContext())
        val edit = TextInputEditText(input.context)
        edit.hint = getString(R.string.scripts_new_hint)
        edit.inputType = InputType.TYPE_CLASS_TEXT
        input.addView(edit)

        MaterialAlertDialogBuilder(requireContext())
            .setTitle(R.string.scripts_new_title)
            .setMessage(R.string.scripts_new_note)
            .setView(input)
            .setNegativeButton(R.string.action_cancel, null)
            .setPositiveButton(R.string.action_add) { _, _ ->
                val packageName = edit.text?.toString()?.trim().orEmpty()

                if (packageName.isEmpty()) {
                    Toast.makeText(requireContext(), R.string.toast_package_required, Toast.LENGTH_SHORT).show()
                    return@setPositiveButton
                }

                startActivity(editor.intent(requireContext(), packageName))
            }
            .show()
    }
}

private class ScriptAdapter(
    private val context: Context,
    private val onClick: (ScriptInfo) -> Unit
) : ListAdapter<ScriptInfo, ScriptAdapter.Holder>(DIFF) {

    var onEnabledChanged: ((String, Boolean) -> Unit)? = null

    class Holder(view: View) : RecyclerView.ViewHolder(view) {
        val icon: ImageView = view.findViewById(R.id.scriptIcon)
        val label: TextView = view.findViewById(R.id.scriptLabel)
        val packageName: TextView = view.findViewById(R.id.scriptPackage)
        val meta: TextView = view.findViewById(R.id.scriptMeta)
        val switch: MaterialSwitch = view.findViewById(R.id.scriptSwitch)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val holder = Holder(LayoutInflater.from(parent.context).inflate(R.layout.item_script, parent, false))
        holder.switch.setOnCheckedChangeListener { button, isChecked ->
            val item = button.tag as? ScriptInfo ?: return@setOnCheckedChangeListener
            if (item.enabled != isChecked) onEnabledChanged?.invoke(item.packageName, isChecked)
        }
        return holder
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val item = getItem(position)

        holder.label.text = if (item.packageName == ScriptStore.ALL_APPS) {
            context.getString(R.string.scripts_all_apps)
        } else {
            ScriptStore.appLabel(context, item.packageName)
        }

        holder.packageName.text = item.packageName

        val parts = mutableListOf(sourceLabel(context, item.source))

        if (item.size > 0) parts += ScriptStore.sizeLabel(item.size)
        item.author?.let { parts += it }
        if (!item.installed && item.packageName != ScriptStore.ALL_APPS) {
            parts += context.getString(R.string.scripts_not_installed)
        }

        holder.meta.text = parts.joinToString(" · ")
        holder.icon.setImageDrawable(ScriptStore.appIcon(context, item.packageName) ?: context.getDrawable(R.drawable.ic_description))

        holder.switch.tag = item
        holder.switch.isChecked = item.enabled

        holder.itemView.setOnClickListener { onClick(item) }
    }

    companion object {
        private val DIFF = object : DiffUtil.ItemCallback<ScriptInfo>() {
            override fun areItemsTheSame(oldItem: ScriptInfo, newItem: ScriptInfo) =
                oldItem.packageName == newItem.packageName

            override fun areContentsTheSame(oldItem: ScriptInfo, newItem: ScriptInfo) = oldItem == newItem
        }
    }
}
