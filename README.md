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

## Features

- Support for restoring previously purchased items.
- Custom Frida Scripts.
- Scripts are updated without a new apk release.

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

Every build ships the compiled scripts as a fallback, and the module also reads them from
its shared data directory. The manager app fetches the published scripts and writes them
there, so a script added after the apk was built is picked up anyway.

- Open the module app and use **Sync scripts** in the Script tab.
- The app syncs by itself only once, when nothing has been downloaded yet. After that it
  fetches only when you use **Refresh scripts**.
- Downloads need a connection to the Xposed framework, since the files live in the
  module's shared data directory.
- Restart the app or game to run a script that was just updated.

Scripts are published from `scripts/` with `npm run build:dist && npm run publish`, which
pushes them to the `scripts-dist` branch of this repository. See
[scripts/README.md](scripts/README.md) for the details.

### Contributing Custom Scripts

Want to add support for another game or app? Feel free to open a pull request with a custom script.

Scripts should only focus on bypassing purchase checks.

Please include:
- The package name of the app/game
- The custom script
- A brief description of what it does

## Telegram Channel

Join the FKIAB Telegram channel to get notified as soon as a new release is available: [t.me/fkiab](https://t.me/+j3i-S8nMy_o0MThk)

## Disclaimer

This project is provided for educational and research purposes only. Use it responsibly and only on applications and environments you own or have permission to test. The authors and contributors are not responsible for any misuse, damage, or violations caused by using this project. Please respect developers, software licenses, and platform rules.

---

**Feel free to open an issue if you have any problems or suggestions.**
