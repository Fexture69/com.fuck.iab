package fh

import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.pm.PackageInfoCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import androidx.viewpager2.adapter.FragmentStateAdapter
import androidx.viewpager2.widget.ViewPager2
import com.fuck.iab.R
import com.google.android.material.appbar.MaterialToolbar
import com.google.android.material.bottomnavigation.BottomNavigationView
import io.github.libxposed.service.XposedService
import kotlinx.coroutines.launch

// main activity: home, scripts and settings behind a bottom navigation bar
class c : AppCompatActivity(), g.ServiceStateListener {

    private lateinit var viewPager: ViewPager2
    private lateinit var bottomNav: BottomNavigationView
    private lateinit var toolbar: MaterialToolbar

    private val viewModel: h by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val root = findViewById<View>(R.id.root)
        applySystemBarIcons(this, root)
        root.post {
            val rootWindowInsets = ViewCompat.getRootWindowInsets(root) ?: return@post
            val systemBars = rootWindowInsets.getInsets(WindowInsetsCompat.Type.systemBars())
            root.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
        }

        toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.subtitle = versionLabel()

        viewPager = findViewById(R.id.viewPager)
        bottomNav = findViewById(R.id.bottomNav)

        viewPager.adapter = ScreensAdapter(this)
        viewPager.offscreenPageLimit = PAGE_COUNT

        bottomNav.setOnItemSelectedListener { item ->
            viewPager.setCurrentItem(pageOf(item.itemId), true)
            true
        }

        viewPager.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                val itemId = itemOf(position)
                if (bottomNav.selectedItemId != itemId) {
                    bottomNav.selectedItemId = itemId
                }

                titleFor(position)
                invalidateOptionsMenu()
                viewModel.setHomeVisible(position == PAGE_HOME)
            }
        })

        titleFor(PAGE_HOME)
        viewModel.setHomeVisible(true)

        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.messages.collect { message ->
                    Toast.makeText(this@c, message, Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onPrepareOptionsMenu(menu: Menu): Boolean {
        // Refreshing the installed scripts belongs to the scripts screen.
        menu.findItem(R.id.action_refresh)?.isVisible = viewPager.currentItem == PAGE_SCRIPTS
        return super.onPrepareOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == R.id.action_refresh) {
            viewModel.sync(manual = true)
            return true
        }

        return super.onOptionsItemSelected(item)
    }

    /** "version 1.6.4 (38)", taken from the installed package. */
    private fun versionLabel(): String {
        return try {
            val info = packageManager.getPackageInfo(packageName, 0)
            getString(
                R.string.app_version,
                info.versionName ?: "?",
                PackageInfoCompat.getLongVersionCode(info)
            )
        } catch (e: Exception) {
            ""
        }
    }

    private fun titleFor(position: Int) {
        supportActionBar?.setTitle(
            when (position) {
                PAGE_SCRIPTS -> R.string.nav_scripts
                PAGE_SETTINGS -> R.string.nav_settings
                else -> R.string.app_name
            }
        )
    }

    private fun pageOf(itemId: Int): Int {
        return when (itemId) {
            R.id.nav_scripts -> PAGE_SCRIPTS
            R.id.nav_settings -> PAGE_SETTINGS
            else -> PAGE_HOME
        }
    }

    private fun itemOf(position: Int): Int {
        return when (position) {
            PAGE_SCRIPTS -> R.id.nav_scripts
            PAGE_SETTINGS -> R.id.nav_settings
            else -> R.id.nav_home
        }
    }

    override fun onStart() {
        super.onStart()
        g.addServiceStateListener(this, true)
    }

    override fun onStop() {
        g.removeServiceStateListener(this)
        viewModel.setHomeVisible(false)
        super.onStop()
    }

    override fun onServiceStateChanged(service: XposedService?) {
        viewModel.attachService(service)
    }

    private class ScreensAdapter(activity: FragmentActivity) : FragmentStateAdapter(activity) {

        override fun getItemCount() = PAGE_COUNT

        override fun createFragment(position: Int): Fragment {
            return when (position) {
                PAGE_SCRIPTS -> scripts()
                PAGE_SETTINGS -> settings()
                else -> home()
            }
        }
    }

    companion object {
        const val PAGE_HOME = 0
        const val PAGE_SCRIPTS = 1
        const val PAGE_SETTINGS = 2

        private const val PAGE_COUNT = 3
    }
}
