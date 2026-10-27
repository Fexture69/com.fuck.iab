package fh

import android.content.Context
import android.graphics.drawable.Drawable
import android.os.Bundle
import android.util.LruCache
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.fuck.iab.HookedApp
import com.fuck.iab.R
import com.fuck.iab.RunningProcess
import com.fuck.iab.RunningState
import com.fuck.iab.ScriptInfo
import com.fuck.iab.ScriptSource
import com.fuck.iab.ScriptStore
import kotlinx.coroutines.launch

// home screen: module state, counters and the apps in scope
class home : Fragment() {

    private val viewModel: h by activityViewModels()
    private lateinit var adapter: AppAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val v = inflater.inflate(R.layout.page_home, container, false)

        val serviceStatus = v.findViewById<TextView>(R.id.serviceStatus)
        val syncStatus = v.findViewById<TextView>(R.id.syncStatus)
        val hookedCount = v.findViewById<TextView>(R.id.hookedCount)
        val hookedLabel = v.findViewById<TextView>(R.id.hookedLabel)
        val installedCount = v.findViewById<TextView>(R.id.installedCount)
        val enabledCount = v.findViewById<TextView>(R.id.enabledCount)
        val hookedEmpty = v.findViewById<TextView>(R.id.hookedEmpty)
        val hookedList = v.findViewById<RecyclerView>(R.id.hookedList)

        adapter = AppAdapter(requireContext())
        hookedList.layoutManager = LinearLayoutManager(requireContext())
        hookedList.adapter = adapter

        viewLifecycleOwner.lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.state.collect { state ->
                    serviceStatus.text = getString(
                        if (state.connected) R.string.home_status_active else R.string.home_status_inactive
                    )

                    syncStatus.text = viewModel.syncStatusLabel()
                    hookedCount.text = state.scope.toString()

                    val running = state.hookedApps.count { it.isRunning }
                    hookedLabel.text = if (running > 0) {
                        getString(R.string.home_hooked_running, running)
                    } else {
                        getString(R.string.home_hooked)
                    }

                    installedCount.text = state.scripts.size.toString()
                    enabledCount.text = state.enabled.toString()
                    hookedEmpty.isVisible = state.hookedApps.isEmpty()
                    adapter.submitList(state.hookedApps)
                }
            }
        }

        return v
    }

    override fun onResume() {
        super.onResume()
        viewModel.refresh()
    }
}

private class AppAdapter(private val context: Context) : ListAdapter<HookedApp, AppAdapter.Holder>(DIFF) {

    private val icons = LruCache<String, Drawable>(64)

    class Holder(view: View) : RecyclerView.ViewHolder(view) {
        val icon: ImageView = view.findViewById(R.id.appIcon)
        val label: TextView = view.findViewById(R.id.appLabel)
        val packageName: TextView = view.findViewById(R.id.appPackage)
        val running: TextView = view.findViewById(R.id.appRunning)
        val state: TextView = view.findViewById(R.id.appState)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        return Holder(LayoutInflater.from(parent.context).inflate(R.layout.item_app, parent, false))
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val app = getItem(position)

        holder.label.text = app.label
        holder.packageName.text = app.packageName
        holder.state.text = stateLabel(app.script)

        val running = runningLabel(app.running)
        holder.running.text = running
        holder.running.isVisible = running != null

        holder.icon.setImageDrawable(iconFor(app.packageName))
    }

    private fun stateLabel(script: ScriptInfo?): String {
        if (script == null) return context.getString(R.string.home_script_none)
        if (!script.enabled) return context.getString(R.string.home_script_disabled)
        return sourceLabel(context, script.source)
    }

    /** "running · pid 1234", or null when the module is not loaded in that app. */
    private fun runningLabel(processes: List<RunningProcess>): String? {
        val first = processes.firstOrNull() ?: return null

        val state = when (first.state) {
            RunningState.CURRENT -> R.string.home_running
            RunningState.STALE -> R.string.home_running_stale
            RunningState.RELOADING -> R.string.home_running_reloading
            RunningState.FAILED -> R.string.home_running_failed
        }

        val detail = if (processes.size == 1) {
            context.getString(R.string.home_running_pid, first.pid)
        } else {
            context.getString(R.string.home_running_processes, processes.size)
        }

        return context.getString(state) + " · " + detail
    }

    private fun iconFor(packageName: String): Drawable? {
        icons.get(packageName)?.let { return it }

        val drawable = ScriptStore.appIcon(context, packageName) ?: return null
        icons.put(packageName, drawable)
        return drawable
    }

    companion object {
        private val DIFF = object : DiffUtil.ItemCallback<HookedApp>() {
            override fun areItemsTheSame(oldItem: HookedApp, newItem: HookedApp) =
                oldItem.packageName == newItem.packageName

            override fun areContentsTheSame(oldItem: HookedApp, newItem: HookedApp) = oldItem == newItem
        }
    }
}

fun sourceLabel(context: Context, source: ScriptSource): String {
    return when (source) {
        ScriptSource.USER -> context.getString(R.string.source_user)
        ScriptSource.REMOTE -> context.getString(R.string.source_remote)
        ScriptSource.BAKED -> context.getString(R.string.source_baked)
    }
}
