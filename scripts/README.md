## Setup
```
npm install
```

## Build
```
npm run build:all
npm run build -- com.kiloo.subwaysurf
```
Those write into `../app/src/main/assets/scripts`, which is only useful for running a script
by hand. The apk itself carries no scripts.

## Run
```
frida -U -f com.kiloo.subwaysurf -l ../app/src/main/assets/scripts/com.kiloo.subwaysurf.js
```

## Remote scripts

Installed modules pull scripts from the `scripts-dist` branch, so adding or fixing a script
does not need a new apk release.

```
npm run vendor        # create libs/frida-java-bridge.js if it is missing
npm run build:dist    # compile into scripts/dist and write dist/manifest.json
npm run publish       # push scripts/dist to the scripts-dist branch
```

`scripts/libs/frida-java-bridge.js` is gitignored and `global.js` imports it, so a clean
checkout has to generate it first. `npm run vendor` builds it from the npm package and keeps
an existing file; `node vendor.js --force` rebuilds it.

`SCRIPTS_REMOTE` (a remote name, default `origin`) and `SCRIPTS_BRANCH` (default
`scripts-dist`) choose where a publish goes. The app reads from `RemoteScripts.BASE_URL`,
which points at `Xposed-Modules-Repo/com.fuck.iab`, so that is where the store has to be
published - from a remote with write access to it:

```
git remote add og https://github.com/Xposed-Modules-Repo/com.fuck.iab.git
SCRIPTS_REMOTE=og npm run publish
```

A push to `dev` or `main` that touches `scripts/**` publishes automatically through
`.github/workflows/publish-scripts.yml`, using whichever repository the workflow runs in.
raw.githubusercontent.com caches files for a few minutes, so a fresh publish may take a
moment to show up.
