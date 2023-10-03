#!/usr/bin/env node

import { Command } from "commander";
import { PATHS } from "../paths";
import { GDriveDownloader, IDownloadOptions } from "../lib/download";

/***************************************************************************************
 * CLI
 * @example download
 *************************************************************************************/

const program = new Command("download");
export default program
  .description("Get active deployment")
  .requiredOption("-id --folder-id <string>", "Unique ID of folder to download (gdrive url suffix)")
  .requiredOption(
    "-o --output-path <string>",
    "Output path for downloaded files (default ./output)",
    PATHS.DEFAULT_OUTPUT_FOLDER
  )
  .requiredOption(
    "-c --credentials-path <string>",
    "Path to credentials JSON",
    PATHS.DEFAULT_CREDENTIALS
  )
  .requiredOption("-a --auth-token-path <string>", "Path to token JSON", PATHS.DEFAULT_TOKEN)
  .requiredOption(
    "-l --log-name <string>",
    "Name provided for logs (defaults action.log)",
    "actions.log"
  )
  .option(
    "-filter --filter-function-64 <base64>",
    "Function applied to omit downloads based on file entry, encoded as base64. e.g. decoded: (entry)=>entry.folderPath.includes('temp/')"
  )
  .action(async (options: IDownloadOptions) => {
    return new GDriveDownloader(options).downloadFolder(options.folderId);
  });
