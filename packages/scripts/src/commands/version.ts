import boxen from "boxen";
import chalk from "chalk";
import { Command } from "commander";
import * as fs from "fs-extra";
import inquirer from "inquirer";
import { APP_BUILD_GRADLE_PATH, MAIN_PACKAGE_PATH } from "../paths";

interface IProgramOptions {
  /** Set package.json version  */
  package?: boolean;
  /** Set android version  */
  android?: boolean;
}

/***************************************************************************************
 * CLI
 * @example yarn worksapce scripts run version --package --android 1.0.6
 *************************************************************************************/
const program = new Command("version");
export default program
  .description("Set app version")
  .argument("[version]", "version number to apply")
  .option("-p, --package", "apply versioning to package.json")
  .option("-a, --android", "apply versioning to android build")
  .action(async (version: string | undefined, options: IProgramOptions) => {
    await setVersion(version, options);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

async function setVersion(version: string | undefined, options: IProgramOptions) {
  if (!options.package && !options.android) {
    console.log(chalk.yellow(`Specify what to version, e.g. --android --package`));
    process.exit(1);
  }
  if (options.package) await setPackageVersion(version);
  if (options.android) await setAndroidBuildVersion(version);
}

/** Update root package.json version, ensuring increment  */
async function setPackageVersion(version?: string) {
  const previousVersion = fs.readJSONSync(MAIN_PACKAGE_PATH).version;
  if (!version) {
    version = await promptVersion("Package", previousVersion);
  }
  // additional increment check in case version supplied directly (non prompt)
  ensureVersionIncremented(previousVersion, version);
  updatePackageJson(version);
}

async function setAndroidBuildVersion(version?: string) {
  const previousVersion = getGradleBuildVersion();
  if (!version) {
    version = await promptVersion("Android", previousVersion);
  }
  // additional increment check in case version supplied directly (non prompt)
  ensureVersionIncremented(previousVersion, version);
  updateGradleBuild(version);
}

async function promptVersion(prefix: string, previousVersion: string) {
  const message = `[${prefix}] Specify a version number (current: ${previousVersion})`;
  const { input } = await inquirer.prompt([
    {
      message,
      name: "input",
      validate: (v: string) =>
        isVersionIncremented(previousVersion, v) ? true : "Version number must be increased",
    },
  ]);
  return input;
}

function getGradleBuildVersion() {
  const gradleBuildFile = fs.readFileSync(APP_BUILD_GRADLE_PATH, {
    encoding: "utf-8",
  });
  const match = gradleBuildFile.match(/versionName .*$/gm);
  const code = match?.[0].replace("versionName", "").replace(/[^0-9.]/g, "");
  return code || "0.0.0";
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
function ensureVersionIncremented(previousVersion: string, nextVersion: string) {
  if (previousVersion && nextVersion && isVersionIncremented(previousVersion, nextVersion)) {
    return true;
  }
  const heading = chalk.yellow(
    `Version number must be increased\n${previousVersion} -> ${nextVersion}`
  );
  console.log(boxen(heading, { padding: 1, borderColor: "red" }));
  process.exit(1);
}

function isVersionIncremented(previousVersion: string, nextVersion: string) {
  const nextCode = Number(_generateVersionCode(nextVersion));
  const currentCode = Number(_generateVersionCode(previousVersion));
  return nextCode > currentCode;
}

// 2.4.1 =>   2004001
// 2.40.1 =>  2040001
function _generateVersionCode(versionName: string) {
  const v = versionName.split(".");
  return `${Number(v[0]) * 1000000 + Number(v[1] || 0) * 1000 + Number(v[2] || 0)}`;
}
