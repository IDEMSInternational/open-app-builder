#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import fs, { moveSync, rmSync } from "fs-extra";
import { resolve } from "path";
import GitProvider from "../../tasks/providers/git";
import { DEPLOYMENTS_PATH } from "../../paths";
import { Logger, logOutput, logWarning, promptConfirmation, promptInput } from "../../utils";
import { loadDeploymentJson } from "./utils";
import { existsSync } from "fs";

const program = new Command("import");
interface IOptions {
  /** Url of remote repo to import */
  remoteRepo: string;
}

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program
  .description("Import remote git repo")
  .requiredOption("-r --remote-repo <string>")
  .action(async (options: IOptions) => {
    await importRepo(options.remoteRepo);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

export async function importRepo(remoteTarget: string) {
  // Clone to temp dir for analysis
  console.log(chalk.gray("Checking Repo..."));
  // const tmpDir = resolve(DEPLOYMENTS_PATH, );

  // Clone git repo to a temporary directory in the deployments folder to allow config check
  const tmpDir = createTempDeploymentName(remoteTarget);
  const git = GitProvider();

  console.log(chalk.gray(`Cloning ${remoteTarget}`));
  await git.cloneRepo(remoteTarget, tmpDir);

  const { name, valid, shouldContinue } = await validateImportDeployment(tmpDir);
  if (!shouldContinue) {
    rmSync(tmpDir, { recursive: true, force: true });
    process.exit(0);
  }
  const nameInput = await promptInput("Specify a name for the deployment", name);
  const deploymentName = nameInput.replace(/ /g, "_").toLowerCase();

  const targetDir = resolve(DEPLOYMENTS_PATH, deploymentName);
  if (fs.existsSync(targetDir)) {
    rmSync(tmpDir, { recursive: true, force: true });
    Logger.error({ msg1: "A folder for this deployment already exists", msg2: targetDir });
  }
  moveSync(tmpDir, targetDir);
  if (valid) {
    // remove processed config as will have paths from tmp dir (will reprocess next set)
    rmSync(resolve(targetDir, "config.json"));
    logOutput({ msg1: "Deployment imported successfully", msg2: targetDir });
  } else {
    logWarning({ msg1: "Deployment imported, please manually fix configuration", msg2: targetDir });
    process.exit(0);
  }
  return targetDir;
}

/** Create a temporary directory based on repo name (adding timestamp suffix if already exists) */
function createTempDeploymentName(remoteTarget: string) {
  const tmpName = remoteTarget.split("/").pop().split(".")[0];
  let tmpDir = resolve(DEPLOYMENTS_PATH, tmpName);
  if (existsSync(tmpDir)) {
    tmpDir = tmpDir += `-${new Date().getTime()}`;
  }
  return tmpDir;
}

/** Check if deployment config can be compiled */
async function validateImportDeployment(deploymentPath: string) {
  const deploymentJson = loadDeploymentJson(deploymentPath, { exitOnError: false });
  if (deploymentJson) {
    return { valid: true, name: deploymentJson.name, shouldContinue: true };
  } else {
    logWarning({ msg1: "The external repo does not appear to have a valid configuration" });
    const shouldContinue = await promptConfirmation("Would you like to import anyway?", false);
    // Although deployment may not be valid still pass back if user specified continue
    return { valid: false, name: "", shouldContinue };
  }
}
