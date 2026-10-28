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
script no longer needs a new apk release. `frida-java-bridge` is imported straight from
`node_modules`, so `npm install` is all the setup a build needs.

```
npm run build:dist    # compile into scripts/dist and write dist/manifest.json
npm run publish       # push scripts/dist to the scripts-dist branch
```

`SCRIPTS_REMOTE` and `SCRIPTS_BRANCH` override the defaults (`origin`, `scripts-dist`).
The manifest URL is built from `RemoteScripts.BASE_URL` in the app, so both places have
to agree when the repository or branch changes. raw.githubusercontent.com caches files
for a few minutes, so a fresh publish may take a moment to show up.
