const { spawnSync } = require("child_process");
const { existsSync } = require("fs");

const { resolve } = require("path");
const scriptsVersion = require("../package.json").version;
const execPath = resolve(__dirname, "../dist/index.js");

/**
 * Ensure scripts are built, using package.json version from src and dist to
 * compare. Could be replaced in future with nx caching
 */
exports.ensureBuild = () => {
  // skip build if workspace and dist package.json version numbers match
  if (existsSync(execPath)) {
    const srcPackageJsonPath = resolve(__dirname, "../package.json");
    const distPackageJsonPath = resolve(__dirname, "../dist/package.json");
    if (existsSync(srcPackageJsonPath) && existsSync(distPackageJsonPath)) {
      const srcVersion = require(srcPackageJsonPath).version;
      const distVersion = require(distPackageJsonPath).version;
      if (srcVersion === distVersion) {
        return;
      }
    }
  }
  console.log(`\nBuilding scripts v${scriptsVersion}...\n`);
  spawnSync("yarn build", { cwd: resolve(__dirname, "../"), shell: true, stdio: "inherit" });
};
