import { spawnSync } from "child_process";
import { readFile, access } from "fs/promises";
import { resolve } from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const execPath = resolve(__dirname, "../dist/index.mjs");

const { version: scriptsVersion } = await readJson("../package.json");

/**
 * Ensure scripts are built, using package.json version from src and dist to
 * compare. Could be replaced in future with nx caching
 */
export async function ensureBuild() {
  const distPkgJsonPath = url.pathToFileURL(resolve(__dirname, "../dist/package.json"));
  let distVersion = "";
  try {
    await access(distPkgJsonPath);
    const distPkgJson = await readJson(distPkgJsonPath);
    distVersion = distPkgJson?.version;
  } catch (error) {
    // file does not exist
  }
  // skip build if workspace and dist package.json version numbers match
  if (scriptsVersion && scriptsVersion === distVersion) {
    return;
  }
  console.log(`\nBuilding scripts v${scriptsVersion}...\n`);
  spawnSync("yarn build", { cwd: resolve(__dirname, "../"), shell: true, stdio: "inherit" });
}

async function readJson(jsonPath) {
  const json = JSON.parse(await readFile(new URL(jsonPath, import.meta.url)));
  return json;
}

export async function runProgram(args = []) {
  process.title = `app-scripts-${scriptsVersion}`;
  // set env to force execution of cli
  process.env.NODE_ENV = "production";
  console.log(`[Scripts ${scriptsVersion}]`);

  await ensureBuild();
  const importPath = url.pathToFileURL(execPath);
  const imported = await import(importPath);
  await imported.default.program.parseAsync(args);
}
