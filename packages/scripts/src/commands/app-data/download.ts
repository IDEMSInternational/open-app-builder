#!/usr/bin/env node
import chalk from "chalk";
import { spawnSync } from "child_process";
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { CREDENTIALS_PATH, AUTH_TOKEN_PATH } from "../../paths";
import { logWarning, promptOptions } from "../../utils";
import { getActiveDeployment } from "../deployment/get";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  sheetname?: string;
  authorize?: boolean;
}
const program = new Command("download");
export default program
  .description("Download app data")
  .option(
    "-s --sheetname <string>",
    "name of single google sheet to download (default downloads all)"
  )
  .option("-a --authorize", "generate auth token for download")
  .action(async (options: IProgramOptions) => {
    if (options.sheetname) {
    }
    await appDataDownload(options);
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Read the default deployment json and retrieve parsed ts for the named active deployment
 */
async function appDataDownload(options: IProgramOptions) {
  const activeDeployment = getActiveDeployment();
  const { _workspace_path } = activeDeployment;
  const {
    assets_folder_id,
    sheets_folder_id,
    auth_token_path,
    assets_filter_function,
    sheets_filter_function,
  } = activeDeployment.google_drive;
  // setup paths for args
  const gdriveToolsExec = `yarn workspace @idemsInternational/gdrive-tools start`;
  const authTokenPath = auth_token_path
    ? path.resolve(_workspace_path, auth_token_path)
    : AUTH_TOKEN_PATH;
  const sheetsOutput = path.resolve(_workspace_path, "app_data", "sheets");
  const assetsOutput = path.resolve(_workspace_path, "app_data", "assets");
  const sheetsFilter = Buffer.from(sheets_filter_function.toString()).toString("base64");
  const assetsFilter = Buffer.from(assets_filter_function.toString()).toString("base64");

  let commonArgs = `--credentials-path "${CREDENTIALS_PATH}" --auth-token-path "${authTokenPath}"`;
  // handle re-auth
  if (options.authorize) {
    if (fs.existsSync(authTokenPath)) fs.removeSync(authTokenPath);
    const authCmd = `${gdriveToolsExec} authorize ${commonArgs}`;
    spawnSync(authCmd, { stdio: "inherit", shell: true });
    return;
  }
  // handle single file download
  if (options.sheetname) {
    const cachedEntry = await getFileCacheEntry(options.sheetname, sheetsOutput);
    if (cachedEntry) {
      const args = `--folder-id ${sheets_folder_id} --output-path "${sheetsOutput}" --filter-function-64 "${sheetsFilter}"`;
      const singleDLCmd = `${gdriveToolsExec} download ${commonArgs} ${args}`;
      return spawnSync(singleDLCmd, { shell: true, stdio: "inherit" });
    } else {
      logWarning({
        msg1: "Could not find a matching sheet in cache, performing full sync",
        msg2: options.sheetname,
      });
    }
  }
  // handle full sheets/assets sync
  // download sheets
  const sheetsArgs = `--folder-id ${sheets_folder_id} --output-path "${sheetsOutput}" --log-name sheets.log --filter-function-64 "${sheetsFilter}"`;
  const sheetsDLCmd = `${gdriveToolsExec} download ${commonArgs} ${sheetsArgs}`;
  console.log(chalk.yellow("-----Sheets-----"));
  console.log(chalk.gray(sheetsDLCmd));
  const { status: sheetsDlStatus } = spawnSync(sheetsDLCmd, { shell: true, stdio: "inherit" });
  // pass any null exit code back up
  if (sheetsDlStatus === 1) {
    process.exit(1);
  }

  // download assets
  const assetsArgs = `--folder-id ${assets_folder_id} --output-path "${assetsOutput}" --log-name assets.log --filter-function-64 "${assetsFilter}"`;
  const assetsDLCmd = `${gdriveToolsExec} download ${commonArgs} ${assetsArgs}`;
  console.log(chalk.yellow("-----Assets-----"));
  console.log(chalk.gray(assetsDLCmd));
  const { status: assetDlStatus } = spawnSync(assetsDLCmd, { shell: true, stdio: "inherit" });
  // pass any null exit code back up
  if (assetDlStatus === 1) {
    process.exit(1);
  }
}

/**
 * Use local cache contents to lookup all sheets by name and return entry of matching
 * In case where multiple exist with same name give user prompt to select
 * In case where non exist return null
 */
async function getFileCacheEntry(sheetname: string, cachePath: string) {
  const cacheContents = path.resolve(cachePath, "_contents.json");
  if (fs.existsSync(cacheContents)) {
    const contentsJson = fs.readJsonSync(cacheContents);
    let matching = contentsJson.filter((entry) => entry.name === `${sheetname}.xlsx`);
    // Handle no sheets with name
    if (matching.length === 0) {
      return null;
    }
    // Handle multiple sheets same name
    if (matching.length > 1) {
      const options = matching.map((match) => ({
        name: `${match.folderPath ? match.folderPath + " / " : ""}${match.name}`,
        value: match,
      }));
      const message = `Multiple sheets with the name "${sheetname}" found, select correct folder version`;
      matching = await promptOptions(options, message);
    }
    return matching;
  }
}
