#!/usr/bin/env node
import { spawnSync } from "child_process";
import { Command } from "commander";

const program = new Command("sync");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  sheetname?: string;
}
export default program
  .description("Sync app data")
  .option(
    "-s --sheetname <string>",
    "name of single google sheet to download (default downloads all)"
  )
  .action(async (options: IProgramOptions) => {
    await syncAppData(options);
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
  spawnSync(`${scriptsExec} ${downloadCmd}`, { stdio: "inherit", shell: true });
  // Copy
  let copyCmd = "app-data copy";
  if (options.sheetname) {
    copyCmd += ` --skip-assets`;
  }
  spawnSync(`${scriptsExec} ${copyCmd}`, { stdio: "inherit", shell: true });
}
