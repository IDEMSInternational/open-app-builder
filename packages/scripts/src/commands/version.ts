import boxen from "boxen";
import chalk from "chalk";
import { Command } from "commander";
import * as fs from "fs-extra";
import inquirer from "inquirer";
import { APP_BUILD_GRADLE_PATH, MAIN_PACKAGE_PATH } from "../paths";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
const program = new Command("version");
export default program
  .description("Set app version")
  .argument("[newVersion]", "newVersion")
  .action(async (newVersion: string | undefined) => {
    await version(newVersion);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

/**
 * Set a consistent version number by incrementing the current
 * package.json version and also assigning to android version codes
 */
async function version(newVersion?: string) {
  const currentVersion = fs.readJSONSync(MAIN_PACKAGE_PATH).version;
  if (!newVersion) newVersion = await promptNewVersion(currentVersion);
  if (!isNextVersionValid(currentVersion, newVersion)) {
    const heading = chalk.yellow(
      `Version number must be increased\n${currentVersion} -> ${newVersion}`
    );
    console.log(boxen(heading, { padding: 1, borderColor: "red" }));
    process.exit(1);
  }
  updatePackageJson(newVersion);
  updateGradleBuild(newVersion);
}

function updateGradleBuild(newVersionName: string) {
  let gradleBuildFile = fs.readFileSync(APP_BUILD_GRADLE_PATH, {
    encoding: "utf-8",
  });
  const newVersionCode = _generateVersionCode(newVersionName);
  gradleBuildFile = gradleBuildFile.replace(/versionCode .*$/gm, `versionCode ${newVersionCode}`);
  gradleBuildFile = gradleBuildFile.replace(/versionName .*$/gm, `versionName "${newVersionName}"`);
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
      validate: (v) =>
        isNextVersionValid(currentVersion, version) ? true : "Version number must be increased",
    },
  ]);
  return version;
}

function isNextVersionValid(currentVersion: string, newVersion: string) {
  const nextCode = Number(_generateVersionCode(newVersion));
  const currentCode = Number(_generateVersionCode(currentVersion));
  return nextCode > currentCode;
}

// 2.4.1 =>   2004001
// 2.40.1 =>  2040001
function _generateVersionCode(versionName: string) {
  const v = versionName.split(".");
  return `${Number(v[0]) * 1000000 + Number(v[1] || 0) * 1000 + Number(v[2] || 0)}`;
}
