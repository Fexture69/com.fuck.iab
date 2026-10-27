// Builds scripts/libs/frida-java-bridge.js from the npm package.
//
// global.js imports it as a single-file ES module, and the file is not tracked in git,
// so every clean checkout (local or CI) has to generate it before the scripts build.
// An existing file is kept unless --force is passed.
import { build } from "esbuild";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, "libs", "frida-java-bridge.js");
const force = process.argv.includes("--force");

if (existsSync(OUTPUT) && !force) {
    console.log(`Keeping existing ${path.relative(process.cwd(), OUTPUT)} (pass --force to rebuild)`);
    process.exit(0);
}

mkdirSync(path.dirname(OUTPUT), { recursive: true });

await build({
    stdin: {
        contents: "export { default } from \"frida-java-bridge\";",
        resolveDir: __dirname,
        sourcefile: "frida-java-bridge.js",
        loader: "js"
    },
    bundle: true,
    format: "esm",
    platform: "neutral",
    target: "es2020",
    legalComments: "none",
    minify: true,
    outfile: OUTPUT
});

console.log(`Built ${path.relative(process.cwd(), OUTPUT)} (${statSync(OUTPUT).size} bytes)`);
