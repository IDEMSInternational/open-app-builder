import * as fs from "fs-extra";
import inquirer from "inquirer";

const PACKAGE_PATH = "package.json";
const APP_BUILD_GRADLE = "android/app/build.gradle";

/**
 * Set a consistent version number by incrementing the current
 * package.json version and also assigning to android version codes
 */
async function main() {
  const oldVersion = fs.readJSONSync(PACKAGE_PATH).version;
  const newVersion = await promptNewVersion(oldVersion);
  updatePackageJson(newVersion);
  updateGradleBuild(oldVersion, newVersion);
}
main();

function updateGradleBuild(oldVersionName: string, newVersionName: string) {
  let gradleBuildFile = fs.readFileSync(APP_BUILD_GRADLE, {
    encoding: "utf-8",
  });
  const oldVersionCode = _generateVersionCode(oldVersionName);
  const newVersionCode = _generateVersionCode(newVersionName);
  gradleBuildFile = gradleBuildFile.replace(
    `versionCode ${oldVersionCode}`,
    `versionCode ${newVersionCode}`
  );
  gradleBuildFile = gradleBuildFile.replace(
    `versionName "${oldVersionName}"`,
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
      validate: (v) =>
        v > currentVersion ? true : "Version number must be increased",
    },
  ]);
  return version;
}

// 2.4.1 => 2004001
function _generateVersionCode(versionName: string) {
  const v = versionName.split(".");
  return `${Number(v[0]) * 1000000 + Number(v[1]) * 1000 + Number(v[2])}`;
}
