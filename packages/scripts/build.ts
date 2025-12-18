import { spawnSync } from "child_process";
import { copyFileSync } from "fs";
import { resolve } from "path";
import * as tsup from "tsup";

import pkgJson from "./package.json";

/**
 * Compile Typescript to JS
 * Whilst this can be done automatically via tsup there seem to be some issues
 * with module formats, so just manually compile (for now)
 */
function compileScriptsTs() {
  return spawnSync("tsc --project tsconfig.build.json", { shell: true, stdio: "inherit" });
}

/**
 * Create a single bundle using esbuild
 * By default this will bundle all src code and node_modules into single file (with tree shaking)
 * This is required to allow execution of JS with references to workspace packages (e.g. shared),
 * which would otherwise be unresolved
 */
function createBuildBundle() {
  // Use tsup which wraps esbuild and adds enhancements such as cleaning dist folder
  const options: tsup.Options = {
    name: "scripts",
    splitting: false,
    sourcemap: true,
    clean: true,
    entry: ["build/commands/index.js"],
    format: ["cjs"],
    target: "node18",

    // NOTE - this is the default outDir, but important to ensure it sits
    // at the same level of nesting as 'src' so file paths relative to __dirname
    // still calculate correctly from compiled code (dist/index.js) as src (src/paths.ts)
    outDir: "dist",

    // This is additional tree-shaking via rollup on top of standard esbuild
    // It appears prone to memory leaks/issues so disabled for now
    treeshake: false,

    // HACK - by default tsup leaves all imports as node_modules import,
    // however as we want a single executable and to avoid esm/cjs issues
    // include all external dependencies inlined into build

    noExternal: Object.keys(pkgJson.dependencies),

    // Sharp is required by cordova-res, however used .node binary files depending on system
    // This isn't compatible with single-file bundling, so leave as external
    // https://github.com/evanw/esbuild/issues/1051

    // NOTE - this means the associated asset action will not work unless installed globally
    // TODO - test statement above and document

    // Additionally exclude pnpapi as directed by build warning output
    external: ["sharp", "pnpapi"],
  };

  // TODO - prod build changes
  let production = false;
  if (production) {
    options.sourcemap = false;
    options.minify = true;
  }

  return tsup.build(options);
}

/** Copy src package.json to dist folder for reference and versioning */
function copyPackageJson() {
  const src = resolve(__dirname, "package.json");
  const target = resolve(__dirname, "dist", "package.json");
  copyFileSync(src, target);
}

async function build() {
  compileScriptsTs();
  await createBuildBundle();
  copyPackageJson();
}
build();
