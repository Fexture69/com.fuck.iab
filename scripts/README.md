## Setup
```
npm install
```

## Build
```sh
# every per-app script, into the store the manager downloads from
npm run build:dist

# one script, for trying it out
npm run build -- com.kiloo.subwaysurf
```

`npm run build:all` compiles only the global script, which is the one packaged into the
apk. The per-app scripts live in `dist/`, which is committed: the manager downloads them
with **Update scripts**, so they are not shipped in the apk as well.

## Run
```
frida -U -f com.kiloo.subwaysurf -l dist/scripts/com.kiloo.subwaysurf.js
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
