#!/usr/bin/env node
import { Command } from "commander";
import { logWarning } from "../../utils";

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
