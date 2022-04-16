#!/usr/bin/env node
import { spawnSync } from "child_process";
import { Command } from "commander";
import fs from "fs-extra";
import { logWarning } from "../../utils";
import { getActiveDeployment } from "../deployment/get";

const program = new Command("sync");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  sheetname?: string;
  clean?: boolean;
}
export default program
  .description("Sync app data")
  .option(
    "-s --sheetname <string>",
    "name of single google sheet to download (default downloads all)"
  )
  .option("-c --clean", "clear all cached data for a clean sync")
  .action(async (options: IProgramOptions) => {
    // await syncAppData(options);
    logWarning({
      msg1: "NOTE - Script has been renamed and will be deprecated",
      msg2: `"yarn scripts app-data sync" -> "yarn workflow sync"`,
    });
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
/**
 * Read the default deployment json and retrieve parsed ts for the named active deployment
 */
async function syncAppData(options: IProgramOptions) {
  const scriptsExec = `yarn workspace scripts start`;
  // Download
  let downloadCmd = "app-data download";
  if (options.sheetname) {
    downloadCmd += ` --sheetname ${options.sheetname}`;
  }
  if (options.clean) {
    cleanFolders();
  }
  const { status } = spawnSync(`${scriptsExec} ${downloadCmd}`, {
    stdio: "inherit",
    shell: true,
  });
  if (status === 1) {
    process.exit(1);
  }

  // Convert
  let convertCmd = "app-data convert";
  spawnSync(`${scriptsExec} ${convertCmd}`, { stdio: "inherit", shell: true });
  // Translate
  let translateCmd = "app-data translate";
  spawnSync(`${scriptsExec} ${translateCmd}`, { stdio: "inherit", shell: true });
  // Copy
  let copyCmd = "app-data copy";

  spawnSync(`${scriptsExec} ${copyCmd}`, { stdio: "inherit", shell: true });
}

function cleanFolders() {
  const { google_drive, app_data, translations } = getActiveDeployment();
  const targetFolders: string[] = [
    google_drive.cache_path,
    app_data.converter_cache_path,
    translations.output_cache_path,
  ];
  for (const targetFolder of targetFolders) {
    if (fs.existsSync(targetFolder)) {
      fs.emptyDirSync(targetFolder);
    }
  }
}
