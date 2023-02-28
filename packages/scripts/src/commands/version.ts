import * as fs from "fs-extra";
import { Command } from "commander";
import inquirer from "inquirer";
import { APP_BUILD_GRADLE_PATH, MAIN_PACKAGE_PATH, SRC_ENV_DIR } from "../paths";
import { resolve } from "path";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {}
const program = new Command("version");
export default program.description("Set app version").action(async (options: IProgramOptions) => {
  await version(options);
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

/**
 * Set a consistent version number by incrementing the current
 * package.json version and also assigning to android version codes
 */
async function version(options: IProgramOptions) {
  const oldVersionName = fs.readJSONSync(MAIN_PACKAGE_PATH).version;
  const newVersionName = await promptNewVersion(oldVersionName);
  const newVersionCode = _generateVersionCode(newVersionName);
  updatePackageJson(newVersionName);
  updateGradleBuild(newVersionName, newVersionCode);
  updateEnvVersion(newVersionName, newVersionCode);
}

function updateGradleBuild(versionName: string, versionCode: number) {
  let gradleBuildFile = fs.readFileSync(APP_BUILD_GRADLE_PATH, {
    encoding: "utf-8",
  });
  gradleBuildFile = gradleBuildFile.replace(/versionCode [0-9]+/g, `versionCode ${versionCode}`);
  gradleBuildFile = gradleBuildFile.replace(
    /versionName "[0-9]+\.[0-9]+\.[0-9]+"/g,
    `versionName "${versionName}"`
  );
  fs.writeFileSync(APP_BUILD_GRADLE_PATH, gradleBuildFile, { encoding: "utf-8" });
}

async function updatePackageJson(newVersion: string) {
  const packageJson = fs.readJSONSync(MAIN_PACKAGE_PATH);
  packageJson.version = newVersion;
  fs.writeJSONSync(MAIN_PACKAGE_PATH, packageJson, { spaces: 2 });
}

async function promptNewVersion(currentVersion: string) {
  const { version } = await inquirer.prompt([
    {
      message: `Specify a version number (current: ${currentVersion})`,
      name: "version",
      validate: (v) => {
        const nextCode = Number(_generateVersionCode(v));
        const currentCode = Number(_generateVersionCode(currentVersion));
        return nextCode > currentCode ? true : "Version number must be increased";
      },
    },
  ]);
  return version;
}

/** Write version name and code as export to src/environments/version.ts */
function updateEnvVersion(name: string, code: number) {
  const versionTSPath = resolve(SRC_ENV_DIR, "version.ts");
  const versionTSContents = `export const APP_VERSION = { name: "${name}", code: ${code} }\n`;
  fs.writeFileSync(versionTSPath, versionTSContents);
}

// 2.4.1 =>   2004001
// 2.40.1 =>  2040001
function _generateVersionCode(versionName: string) {
  const v = versionName.split(".");
  return Number(v[0]) * 1000000 + Number(v[1]) * 1000 + Number(v[2]);
}
