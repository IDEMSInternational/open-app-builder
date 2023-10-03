#!/usr/bin/env node

import { Command } from "commander";
import { PATHS } from "../paths";
import { GDriveDownloader, IDownloadOptions } from "../lib/download";

/***************************************************************************************
 * CLI
 * @example download
 *************************************************************************************/

interface IProgramOptions {
  folderId: string;
  outputPath: string;
  credentialsPath: string;
  authTokenPath: string;
  logName: string;
  filterFunction64?: string;
}

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
  .action(async (options: IProgramOptions) => {
    const { filterFunction64, ...keptOptions } = options;
    const downloadOptions: IDownloadOptions = { ...keptOptions };
    if (filterFunction64) {
      downloadOptions.filterFn = convertBase64Function(filterFunction64);
    }
    return new GDriveDownloader(downloadOptions).downloadFolder(options.folderId);
  });

function convertBase64Function(filterFunction64?: string) {
  // convert string filter function to function if included
  return filterFunction64
    ? new Function(`return ${Buffer.from(filterFunction64, "base64").toString()}`)()
    : null;
}
