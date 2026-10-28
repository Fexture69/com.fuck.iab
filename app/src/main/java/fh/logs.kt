package fh

import android.os.Bundle
import android.view.View
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import com.fuck.iab.R
import com.google.android.material.appbar.MaterialToolbar
import kotlinx.coroutines.launch

// logs screen, opened from settings
class logs : AppCompatActivity() {

    private val viewModel: h by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_logs)

        val root = findViewById<View>(R.id.logsRoot)
        applySystemBarIcons(this, root)
        root.post {
            val rootWindowInsets = ViewCompat.getRootWindowInsets(root) ?: return@post
            val systemBars = rootWindowInsets.getInsets(WindowInsetsCompat.Type.systemBars())
            root.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
        }

        findViewById<MaterialToolbar>(R.id.logsToolbar).setNavigationOnClickListener { finish() }

        if (savedInstanceState == null) {
            supportFragmentManager.beginTransaction()
                .replace(R.id.logsContainer, f())
                .commit()
        }

        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.logInit.collect {
                    viewModel.startLogcatStreaming()
                }
            }
        }
    }
}
