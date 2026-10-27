## Setup
```
npm install
```

## Build
```
npm run build:all
npm run build -- com.kiloo.subwaysurf
```

## Run
```
frida -U -f com.kiloo.subwaysurf -l ../app/src/main/assets/scripts/com.kiloo.subwaysurf.js
```

## Remote scripts

Installed modules pull scripts from the `scripts-dist` branch, so adding or fixing a
script no longer needs a new apk release. `scripts/libs/frida-java-bridge.js` has to be
in place before building, same as for the apk.

```
npm run build:dist    # compile into scripts/dist and write dist/manifest.json
npm run publish       # push scripts/dist to the scripts-dist branch
```

`SCRIPTS_REMOTE` and `SCRIPTS_BRANCH` override the defaults (`origin`, `scripts-dist`).
The manifest URL is built from `RemoteScripts.BASE_URL` in the app, so both places have
to agree when the repository or branch changes. raw.githubusercontent.com caches files
for a few minutes, so a fresh publish may take a moment to show up.
