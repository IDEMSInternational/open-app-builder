import * as fs from "fs-extra";
import inquirer from "inquirer";
import simpleGit from "simple-git";

const PACKAGE_PATH = "package.json";
const APP_BUILD_GRADLE = "android/app/build.gradle";

/**
 * Set a consistent version number by incrementing the current
 * package.json version and also assigning to android version codes
 */
async function createNewVersion() {
  const oldVersion = fs.readJSONSync(PACKAGE_PATH).version;
  const newVersion = await promptNewVersion(oldVersion);
  updatePackageJson(newVersion);
  updateGradleBuild(newVersion);
  // commitWithTag(newVersion);
}

if (syncOnlyMode()) {
  const currentVersion = fs.readJSONSync(PACKAGE_PATH).version;
  updateGradleBuild(currentVersion);
} else {
  createNewVersion();
}

function syncOnlyMode() {
  let myArgs = process.argv.slice(2);
  return myArgs.indexOf("--sync-only") > -1;
}

function updateGradleBuild(newVersionName: string) {
  let gradleBuildFile = fs.readFileSync(APP_BUILD_GRADLE, {
    encoding: "utf-8",
  });
  const newVersionCode = _generateVersionCode(newVersionName);
  gradleBuildFile = gradleBuildFile.replace(/versionCode [0-9]+/g, `versionCode ${newVersionCode}`);
  gradleBuildFile = gradleBuildFile.replace(
    /versionName "[0-9]+\.[0-9]+\.[0-9]+"/g,
    `versionName "${newVersionName}"`
  );
  fs.writeFileSync(APP_BUILD_GRADLE, gradleBuildFile, { encoding: "utf-8" });
}

async function updatePackageJson(newVersion: string) {
  const packageJson = fs.readJSONSync(PACKAGE_PATH);
  packageJson.version = newVersion;
  fs.writeJSONSync(PACKAGE_PATH, packageJson, { spaces: 2 });
}

async function promptNewVersion(currentVersion: string) {
  const { version } = await inquirer.prompt([
    {
      message: `Specify a version number (current: ${currentVersion})`,
      name: "version",
      validate: (v) => (v > currentVersion ? true : "Version number must be increased"),
    },
  ]);
  return version;
}

async function commitWithTag(newVersionName: string) {
  const git = simpleGit();
  await git.add([PACKAGE_PATH, APP_BUILD_GRADLE]);
  await git.commit("New release version " + newVersionName);
  await git.addTag("v" + newVersionName);
}

// 2.4.1 => 2004001
function _generateVersionCode(versionName: string) {
  const v = versionName.split(".");
  return `${Number(v[0]) * 1000000 + Number(v[1]) * 1000 + Number(v[2])}`;
}
