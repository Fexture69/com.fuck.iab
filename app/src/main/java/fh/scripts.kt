package fh

import android.app.Dialog
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.widget.doAfterTextChanged
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
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

/** An app the new script dialog can offer. */
data class AppChoice(val label: String, val packageName: String)

// scripts screen: every known script, with a switch to enable or disable it per app
class scripts : Fragment() {

    private val viewModel: h by activityViewModels()
    private lateinit var adapter: ScriptAdapter
    private var dialog: Dialog? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val v = inflater.inflate(R.layout.page_scripts, container, false)

        val list = v.findViewById<RecyclerView>(R.id.scriptsList)
        val empty = v.findViewById<TextView>(R.id.scriptsEmpty)
        val newScript = v.findViewById<ExtendedFloatingActionButton>(R.id.newScriptButton)

        adapter = ScriptAdapter(requireContext()) { script -> openEditor(script.packageName) }
        adapter.onEnabledChanged = { packageName, enabled -> viewModel.setEnabled(packageName, enabled) }

        list.layoutManager = LinearLayoutManager(requireContext())
        list.adapter = adapter

        newScript.setOnClickListener { pickPackage() }

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

    override fun onDestroyView() {
        dialog?.dismiss()
        dialog = null
        super.onDestroyView()
    }

    private fun openEditor(packageName: String) {
        startActivity(editor.intent(requireContext(), packageName))
    }

    /** Asks which app the new script is for, instead of making the user type a package name. */
    private fun pickPackage() {
        val view = layoutInflater.inflate(R.layout.dialog_new_script, null)
        val input = view.findViewById<TextInputEditText>(R.id.searchInput)
        val list = view.findViewById<RecyclerView>(R.id.choiceList)
        val empty = view.findViewById<TextView>(R.id.choiceEmpty)

        val choices = ChoiceAdapter(requireContext()) { packageName ->
            dialog?.dismiss()
            openEditor(packageName)
        }

        list.layoutManager = LinearLayoutManager(requireContext())
        list.adapter = choices

        dialog = MaterialAlertDialogBuilder(requireContext())
            .setTitle(R.string.scripts_new_title)
            .setView(view)
            .setNegativeButton(R.string.action_cancel, null)
            .create()

        val context = requireContext().applicationContext

        viewLifecycleOwner.lifecycleScope.launch {
            val all = withContext(Dispatchers.IO) { candidates(context) }

            fun show(query: String) {
                val needle = query.trim()

                val filtered = if (needle.isEmpty()) {
                    all
                } else {
                    all.filter { it.label.contains(needle, true) || it.packageName.contains(needle, true) }
                }

                choices.submitList(filtered)
                empty.visibility = if (filtered.isEmpty()) View.VISIBLE else View.GONE
            }

            show("")
            input.doAfterTextChanged { show(it?.toString().orEmpty()) }
        }

        dialog?.show()
    }

    private fun candidates(context: Context): List<AppChoice> {
        val state = viewModel.state.value
        val packages = LinkedHashSet<String>()

        // Apps in scope and apps that already have a script come first.
        state.hookedApps.forEach { packages += it.packageName }
        state.scripts.forEach { packages += it.packageName }
        packages += ScriptStore.installedApps(context)
        packages -= ScriptStore.ALL_APPS

        return packages
            .map { AppChoice(ScriptStore.appLabel(context, it), it) }
            .sortedBy { it.label.lowercase() }
    }
}

private class ChoiceAdapter(
    private val context: Context,
    private val onClick: (String) -> Unit
) : ListAdapter<AppChoice, ChoiceAdapter.Holder>(DIFF) {

    class Holder(view: View) : RecyclerView.ViewHolder(view) {
        val icon: ImageView = view.findViewById(R.id.choiceIcon)
        val label: TextView = view.findViewById(R.id.choiceLabel)
        val packageName: TextView = view.findViewById(R.id.choicePackage)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        return Holder(LayoutInflater.from(parent.context).inflate(R.layout.item_choice, parent, false))
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val item = getItem(position)

        holder.label.text = item.label
        holder.packageName.text = item.packageName
        holder.icon.setImageDrawable(
            ScriptStore.appIcon(context, item.packageName) ?: context.getDrawable(R.drawable.ic_extension)
        )
        holder.itemView.setOnClickListener { onClick(item.packageName) }
    }

    companion object {
        private val DIFF = object : DiffUtil.ItemCallback<AppChoice>() {
            override fun areItemsTheSame(oldItem: AppChoice, newItem: AppChoice) =
                oldItem.packageName == newItem.packageName

            override fun areContentsTheSame(oldItem: AppChoice, newItem: AppChoice) = oldItem == newItem
        }
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
        holder.icon.setImageDrawable(
            ScriptStore.appIcon(context, item.packageName) ?: context.getDrawable(R.drawable.ic_description)
        )

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
