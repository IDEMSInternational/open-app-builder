#!/usr/bin/env node
import chalk from "chalk";
import { spawnSync } from "child_process";
import { Command } from "commander";
import path from "path";
import { CREDENTIALS_PATH } from "../../paths";
import { getActiveDeployment } from "../deployment/get";

const program = new Command("download");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program.description("Download app data").action(async () => {
  await appDataDownload();
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Read the default deployment json and retrieve parsed ts for the named active deployment
 */
export async function appDataDownload() {
  const activeDeployment = getActiveDeployment();
  const { _workspace_path } = activeDeployment;
  const { assets_folder_id, sheets_folder_id } = activeDeployment.google_drive;
  const cachePath = path.resolve(_workspace_path, "cache", "app-data");
  const commonArgs = `--cache-path ${cachePath} --credentials-path ${CREDENTIALS_PATH}`;
  // download sheets
  const sheetsOutput = path.resolve(_workspace_path, "app-data", "sheets");
  const gdriveToolsExec = `yarn workspace @IDEMSInternational/gdrive-tools start`;
  const sheetsArgs = `--folder-id ${sheets_folder_id} --output-path ${sheetsOutput} `;
  const sheetsDLCmd = `${gdriveToolsExec} download ${commonArgs} ${sheetsArgs}`;
  console.log(chalk.yellow("-----Sheets-----"));
  console.log(chalk.gray(sheetsDLCmd));
  spawnSync(sheetsDLCmd, { shell: true, stdio: "inherit" });
  // download assets
  const assetsOutput = path.resolve(_workspace_path, "app-data", "assets");
  const assetsArgs = `--folder-id ${assets_folder_id} --output-path ${assetsOutput}`;
  const assetsDLCmd = `${gdriveToolsExec} download ${commonArgs} ${assetsArgs}`;
  console.log(chalk.yellow("-----Assets-----"));
  console.log(chalk.gray(assetsDLCmd));
  spawnSync(assetsDLCmd, { shell: true, stdio: "inherit" });
}
