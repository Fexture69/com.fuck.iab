[![Telegram Channel](https://img.shields.io/badge/Telegram-Channel-blue.svg?logo=telegram)](https://t.me/+j3i-S8nMy_o0MThk)
[![Latest Release](https://img.shields.io/github/v/release/Xposed-Modules-Repo/com.fuck.iab?display_name=release&label=Latest%20Release&color=%23ff9000
)](https://github.com/Xposed-Modules-Repo/com.fuck.iab/releases/latest)

# FKIAB

An Xposed module for hooking and customizing in-app billing functionality.

## Showcase

https://github.com/user-attachments/assets/baa25c2c-baaf-4e84-86e8-51e9f4545a4a

## Compatibility
- [x] Google Play Store
- [x] Bazaar (Iranian App Market)
- [x] Myket (Iranian App Market)
- [ ] Samsung
- [ ] Amazon
- [ ] Huawei

The module declares those three stores in `META-INF/xposed/scope.list`, so the manager can
offer them as its scope. Any other app can still be added to the scope by hand.

## Features

- Support for restoring previously purchased items.
- Custom Frida Scripts, delivered remotely: no new apk is needed for a script change.
- Manager app with a per-app switch, a script editor and live module state.

## Manager app

The module ships a manager app with three screens:

- **Home**: Xposed status, the last sync time, how many apps are hooked, how many scripts are
  installed and enabled, the apps in the module scope with their script source, and a live line
  per running app (`running · pid 1234`, `running an old build`). The module version sits under
  the title on every screen.
- **Scripts**: search and source filters, a switch to enable or disable the script of an app,
  how many apps a script covers, and a detail sheet with its source, size, author, checksum
  and when it was downloaded. Tapping opens the editor; the button at the bottom creates a
  script for an app you pick from a list; the toolbar action refreshes from the store.
- **Settings**: light/dark/system theme, and the log screen.

The log screen reads the module's own log with `su logcat`, so it needs root. Without it the
screen says so instead of failing quietly.

A script switched off in **Scripts** is skipped for that app, and a user copy saved in the
editor wins over the one from the store. Scripts are read when an app starts, so restart the
app or game to pick up a change.

## Custom Frida Scripts

Some apps aren't supported by the module because they either verify purchase signatures locally or validate them through their own servers. These apps require custom scripts to bypass their specific verification methods.

```
scripts/src/
├── global.js
├── com.kiloo.subwaysurf.js
└── com.PoxelStudios.DudeTheftAuto.js
```

`global.js` is loaded for every app, before anything else. If a matching `<package_name>.js` file also exists, it runs right after the global script.

### Custom Script Examples

- Subway Surfers `com.kiloo.subwaysurf`

<img width="270" height="362" alt="ss0" src="https://github.com/user-attachments/assets/8b527efd-b4d9-47e8-a213-e09ef9f937c1" />

- Ultimate USB `com.mixapplications.ultimateusb`

- Bike Race `com.topfreegames.bikeracefreeworld`

### Remote Scripts

Nothing is baked into the apk. The module reads the script for an app from the framework's
shared data directory, which the manager app fills from the published store, so a new or
fixed script reaches an installed module without a release.

- The store lives on the `scripts-dist` branch of
  [Xposed-Modules-Repo/com.fuck.iab](https://github.com/Xposed-Modules-Repo/com.fuck.iab),
  and the app downloads `manifest.json` plus every script listed in it.
- In the app, open **Scripts** and use the refresh action in the toolbar. It also syncs by
  itself when the cached copy is older than 12 hours.
- Downloads need a connection to the Xposed framework, because the files live in the module's
  shared data directory.
- Restart the app or game to run a script that was just updated.
- A fresh install has no scripts at all until the store has been synced once.

Scripts are published from `scripts/` with `npm run build:dist && npm run publish`, or
automatically by `.github/workflows/publish-scripts.yml` when a push to `dev` or `main`
touches `scripts/**`. See [scripts/README.md](scripts/README.md) for the details.

### Contributing Custom Scripts

Want to add support for another game or app? Feel free to open a pull request with a custom script.

Scripts should only focus on bypassing purchase checks.

Please include:
- The package name of the app/game
- The custom script
- A brief description of what it does

## Building

`.github/workflows/build.yml` builds and signs both a debug and a release apk for
`arm64-v8a` and `armeabi-v7a`, and a `v*` tag publishes a release. Locally, the native part
needs the diet frida-gum devkit, see [build-frida-gum.sh](build-frida-gum.sh).

## Telegram Channel

Join the FKIAB Telegram channel to get notified as soon as a new release is available: [t.me/fkiab](https://t.me/+j3i-S8nMy_o0MThk)

## Disclaimer

This project is provided for educational and research purposes only. Use it responsibly and only on applications and environments you own or have permission to test. The authors and contributors are not responsible for any misuse, damage, or violations caused by using this project. Please respect developers, software licenses, and platform rules.

---

**Feel free to open an issue if you have any problems or suggestions.**
