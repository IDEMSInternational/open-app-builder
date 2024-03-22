import boxen from "boxen";
import chalk from "chalk";
import { Command } from "commander";
import * as fs from "fs-extra";
import inquirer from "inquirer";
import { MAIN_PACKAGE_PATH } from "../paths";
import { ActiveDeployment } from "./deployment/get";
import { readFileSync, writeFileSync } from "fs";
import { Logger } from "shared";

interface IProgramOptions {
  /** Set package.json version  */
  package?: boolean;
  /** Set content version  */
  content?: boolean;
  /** Automatically increment version patch number */
  autoPatch?: boolean;
}

let options: IProgramOptions = {};

/***************************************************************************************
 * CLI
 * @example yarn scripts version --package 1.0.6
 *************************************************************************************/
const program = new Command("version");
export default program
  .description("Set app version")
  .argument("[version]", "version number to apply")
  .option("-p, --package", "apply versioning to package.json")
  .option("-c, --content", "apply versioning to deployment content")
  .option("-ap, --auto-patch", "automatically increment patch version number")
  .action(async (version: string | undefined, opts: IProgramOptions) => {
    options = opts;
    await setVersion(version);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

async function setVersion(version: string | undefined) {
  if (!options.package && !options.content) {
    console.log(chalk.yellow(`Specify what to version, e.g. --package or --content`));
    process.exit(1);
  }
  if (options.package) await setPackageVersion(version);
  if (options.content) await setContentVersion(version);
}

/** Update root package.json version, ensuring increment  */
async function setPackageVersion(version?: string) {
  const previousVersion = fs.readJSONSync(MAIN_PACKAGE_PATH).version;
  if (!version) {
    version = await getNextVersion(previousVersion);
  }
  // additional increment check in case version supplied directly (non prompt)
  ensureVersionIncremented(previousVersion, version);
  updatePackageJson(version);
}

async function setContentVersion(version: string) {
  const { git, _config_ts_path } = ActiveDeployment.get({ skipRecompileCheck: false });
  const previousVersion = git.content_tag_latest || "0.0.0";
  if (!version) {
    version = await getNextVersion(previousVersion);
  }
  ensureVersionIncremented(previousVersion, version);
  updateConfigTS(_config_ts_path, version);
}

/**
 * Determine next version number. Automatically updates previous version if option set,
 * otherwise prompts user input
 */
async function getNextVersion(previousVersion: string = "0.0.0") {
  if (options.autoPatch) {
    const [major, minor, patch] = previousVersion.split(".");
    const patchNext = parseInt(patch, 10) + 1;
    console.log(`Auto Version: ${previousVersion} -> ${major}.${minor}.${patchNext}`);
    return `${major}.${minor}.${patchNext}`;
  } else {
    return promptVersion(previousVersion);
  }
}

async function promptVersion(previousVersion: string) {
  const message = `Specify a version number (current: ${previousVersion})`;
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

async function updatePackageJson(newVersion: string) {
  const packageJson = fs.readJSONSync(MAIN_PACKAGE_PATH);
  packageJson.version = newVersion;
  fs.writeJSONSync(MAIN_PACKAGE_PATH, packageJson, { spaces: 2 });
}

async function updateConfigTS(tsPath: string, newVersion: string) {
  const configStr = readFileSync(tsPath, { encoding: "utf-8" });
  // Avoid replacing config if not defined by user (prone to error)
  if (!configStr.includes("content_tag_latest")) {
    console.log(tsPath);
    Logger.error({
      msg1: "Existing content version not detected, Please update config.ts with:",
      msg2: `git.content_tag_latest = ${newVersion}`,
    });
  }
  // use regex to capture content_tag both inline and nested. E.g.
  // `git: {config_tag_latest: "1.2.3"}` or `git.config_tag_latest = "1.2.3"`
  // and keep existing formatting (just replace matched version code between quotation marks)
  const regex = /(content_tag_latest.*)['"](.*)['"]/g;
  const replaced = configStr.replace(regex, "$1" + '"' + newVersion + '"');
  writeFileSync(tsPath, replaced);
  // TODO - recompile config
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
