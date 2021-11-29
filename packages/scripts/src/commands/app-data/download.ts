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
  const commonArgs = `--credentials-path "${CREDENTIALS_PATH}"`;
  // download sheets
  const sheetsOutput = path.resolve(_workspace_path, "app-data", "sheets");
  const sheetsCachePath = path.resolve(_workspace_path, "cache", "gdrive", "app_sheets");
  const gdriveToolsExec = `yarn workspace @IDEMSInternational/gdrive-tools start`;
  const sheetsArgs = `--folder-id ${sheets_folder_id} --output-path "${sheetsOutput}" --cache-path "${sheetsCachePath}"`;
  const sheetsDLCmd = `${gdriveToolsExec} download ${commonArgs} ${sheetsArgs}`;
  console.log(chalk.yellow("-----Sheets-----"));
  console.log(chalk.gray(sheetsDLCmd));
  spawnSync(sheetsDLCmd, { shell: true, stdio: "inherit" });
  // download assets
  const assetsOutput = path.resolve(_workspace_path, "app-data", "assets");
  const assetsCachePath = path.resolve(_workspace_path, "cache", "gdrive", "app_assets");
  const assetsArgs = `--folder-id ${assets_folder_id} --output-path "${assetsOutput}" --cache-path "${assetsCachePath}"`;
  const assetsDLCmd = `${gdriveToolsExec} download ${commonArgs} ${assetsArgs}`;
  console.log(chalk.yellow("-----Assets-----"));
  console.log(chalk.gray(assetsDLCmd));
  spawnSync(assetsDLCmd, { shell: true, stdio: "inherit" });
}
