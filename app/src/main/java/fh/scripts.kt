package fh

import android.app.Dialog
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.view.isVisible
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
import com.fuck.iab.ScriptDetails
import com.fuck.iab.ScriptInfo
import com.fuck.iab.ScriptSource
import com.fuck.iab.ScriptStore
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.google.android.material.button.MaterialButton
import com.google.android.material.chip.ChipGroup
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton
import com.google.android.material.materialswitch.MaterialSwitch
import com.google.android.material.textfield.TextInputEditText
import java.text.DateFormat
import java.util.Date
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

/** An app the new script dialog can offer. */
data class AppChoice(val label: String, val packageName: String)

// scripts screen: every known script, with a switch to enable or disable it per app
class scripts : Fragment() {

    private val viewModel: h by activityViewModels()
    private lateinit var adapter: ScriptAdapter
    private var pickerDialog: Dialog? = null
    private var sheet: BottomSheetDialog? = null

    private var query: String = ""
    private var filter: ScriptSource? = null
    private var all: List<ScriptInfo> = emptyList()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val v = inflater.inflate(R.layout.page_scripts, container, false)

        val list = v.findViewById<RecyclerView>(R.id.scriptsList)
        val empty = v.findViewById<TextView>(R.id.scriptsEmpty)
        val newScript = v.findViewById<ExtendedFloatingActionButton>(R.id.newScriptButton)
        val search = v.findViewById<TextInputEditText>(R.id.searchInput)

        adapter = ScriptAdapter(requireContext()) { script -> showDetails(script) }
        adapter.onEnabledChanged = { packageName, enabled -> viewModel.setEnabled(packageName, enabled) }

        list.layoutManager = LinearLayoutManager(requireContext())
        list.adapter = adapter

        newScript.setOnClickListener { pickPackage() }

        search.doAfterTextChanged {
            query = it?.toString().orEmpty()
            applyFilters(empty)
        }

        v.findViewById<ChipGroup>(R.id.filterGroup)
            .setOnCheckedStateChangeListener { _, checkedIds ->
                filter = when (checkedIds.firstOrNull()) {
                    R.id.filterStore -> ScriptSource.REMOTE
                    R.id.filterBaked -> ScriptSource.BAKED
                    R.id.filterUser -> ScriptSource.USER
                    else -> null
                }

                applyFilters(empty)
            }

        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.state.collect { state ->
                    all = state.scripts
                    applyFilters(empty)
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
        pickerDialog?.dismiss()
        pickerDialog = null
        sheet?.dismiss()
        sheet = null
        super.onDestroyView()
    }

    private fun applyFilters(empty: TextView) {
        val needle = query.trim()

        val visible = all.filter { script ->
            val matchesFilter = filter == null || script.source == filter
            val matchesQuery = needle.isEmpty() ||
                    script.packageName.contains(needle, true) ||
                    ScriptStore.appLabel(requireContext(), script.packageName).contains(needle, true)

            matchesFilter && matchesQuery
        }

        adapter.submitList(visible)
        empty.setText(if (all.isEmpty()) R.string.scripts_empty else R.string.scripts_nothing_matches)
        empty.isVisible = visible.isEmpty()
    }

    private fun openEditor(packageName: String) {
        startActivity(editor.intent(requireContext(), packageName))
    }

    // ---- detail sheet ----------------------------------------------------------

    private fun showDetails(script: ScriptInfo) {
        val view = layoutInflater.inflate(R.layout.sheet_script_details, null)
        val context = requireContext()

        view.findViewById<ImageView>(R.id.detailIcon).setImageDrawable(
            ScriptStore.appIcon(context, script.packageName) ?: context.getDrawable(R.drawable.ic_description)
        )
        view.findViewById<TextView>(R.id.detailLabel).text = ScriptStore.appLabel(context, script.packageName)
        view.findViewById<TextView>(R.id.detailPackage).text = script.packageName

        val sheetDialog = BottomSheetDialog(context)
        sheetDialog.setContentView(view)
        sheet = sheetDialog

        view.findViewById<MaterialButton>(R.id.detailEdit).setOnClickListener {
            sheetDialog.dismiss()
            openEditor(script.packageName)
        }

        sheetDialog.show()

        val service = g.getService()

        viewLifecycleOwner.lifecycleScope.launch {
            val details = withContext(Dispatchers.IO) {
                ScriptStore.details(context, service, script.packageName)
            }

            bindDetails(view, details)
        }
    }

    private fun bindDetails(view: View, details: ScriptDetails) {
        val context = requireContext()
        val dateFormat = DateFormat.getDateTimeInstance()

        val note = when (details.source) {
            ScriptSource.USER -> R.string.detail_user_note
            ScriptSource.REMOTE -> R.string.detail_store_note
            ScriptSource.BAKED -> R.string.detail_baked_note
        }

        val sourceText = getString(note) + " · " + sourceLabel(context, details.source)

        view.findViewById<TextView>(R.id.detailSourceNote).text = sourceText
        view.findViewById<TextView>(R.id.detailSource).text = sourceLabel(context, details.source)
        view.findViewById<TextView>(R.id.detailSize).text = ScriptStore.sizeLabel(details.size)

        view.findViewById<TextView>(R.id.detailAuthor).text = details.author ?: "-"
        view.findViewById<View>(R.id.detailAuthorRow).isVisible = details.author != null

        view.findViewById<TextView>(R.id.detailFile).text = details.file ?: "-"
        view.findViewById<View>(R.id.detailFileRow).isVisible = details.file != null

        view.findViewById<TextView>(R.id.detailPublished).text = details.publishedAt?.let {
            dateFormat.format(Date(it))
        } ?: "-"
        view.findViewById<View>(R.id.detailPublishedRow).isVisible = details.publishedAt != null

        view.findViewById<TextView>(R.id.detailSynced).text = details.syncedAt?.let {
            dateFormat.format(Date(it))
        } ?: "-"
        view.findViewById<View>(R.id.detailSyncedRow).isVisible = details.syncedAt != null

        val status = buildList {
            add(getString(if (details.enabled) R.string.status_enabled else R.string.status_disabled))
            add(getString(if (details.installed) R.string.status_installed else R.string.status_not_installed))
            if (details.hasUserScript) add(getString(R.string.source_user))
        }
        view.findViewById<TextView>(R.id.detailStatus).text = status.joinToString(" · ")

        view.findViewById<TextView>(R.id.detailChecksum).text = details.sha256 ?: "-"

        val checksumNote = view.findViewById<TextView>(R.id.detailChecksumNote)
        checksumNote.isVisible = details.matchesManifest != null
        checksumNote.setText(
            if (details.matchesManifest == true) R.string.detail_matches else R.string.detail_differs
        )
    }

    // ---- new script picker -----------------------------------------------------

    /** Asks which app the new script is for, instead of making the user type a package name. */
    private fun pickPackage() {
        val view = layoutInflater.inflate(R.layout.dialog_new_script, null)
        val input = view.findViewById<TextInputEditText>(R.id.searchInput)
        val list = view.findViewById<RecyclerView>(R.id.choiceList)
        val empty = view.findViewById<TextView>(R.id.choiceEmpty)

        val choices = ChoiceAdapter(requireContext()) { packageName ->
            pickerDialog?.dismiss()
            openEditor(packageName)
        }

        list.layoutManager = LinearLayoutManager(requireContext())
        list.adapter = choices

        pickerDialog = MaterialAlertDialogBuilder(requireContext())
            .setTitle(R.string.scripts_new_title)
            .setView(view)
            .setNegativeButton(R.string.action_cancel, null)
            .create()

        val context = requireContext().applicationContext

        viewLifecycleOwner.lifecycleScope.launch {
            val candidates = withContext(Dispatchers.IO) { candidates(context) }

            fun show(needle: String) {
                val trimmed = needle.trim()

                val filtered = if (trimmed.isEmpty()) {
                    candidates
                } else {
                    candidates.filter {
                        it.label.contains(trimmed, true) || it.packageName.contains(trimmed, true)
                    }
                }

                choices.submitList(filtered)
                empty.isVisible = filtered.isEmpty()
            }

            show("")
            input.doAfterTextChanged { show(it?.toString().orEmpty()) }
        }

        pickerDialog?.show()
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
