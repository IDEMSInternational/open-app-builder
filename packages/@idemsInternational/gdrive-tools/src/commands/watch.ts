#!/usr/bin/env node
import { Command } from "commander";
import { GDriveWatcher, IWatchOptions } from "../lib/watch";

import { PATHS } from "../paths";

/***************************************************************************************
 * WiP Methods to enable streaming of live changes from google drive
 *
 * @example `yarn workspace @idemsInternational/gdrive-tools start watch --folder-id FOLDER_ID`
 *
 * Known Issues
 * - First change fast to detect with both apis, subsequent much slower. Activity API tends not
 * to pick up subsequent edits, changes API does with delay or manual page refresh
 * (maybe just large shared folders?)
 * - This can also be seen for the specific file api, so any methods that rely on reading file info
 * will have same difficulties
 * - Changes api webhook requires server, attempt to use localTunnel however unstable.
 * Manual testing via ngrok shows working, but same lag issues as polling method
 * - Only activity api supports filtered query, but not very responsive (at least for shared drives)
 * - Whilst the revisions API does pick up newer changes it returns chronologically not ideal
 *
 * TODOs
 * - Decide if limitations worth pursuing further
 * (might be better to rely on desktop app/alt storage sources, if inconsistent could be frustrating)
 * - Add file update handling
 * - Add bindings for workflow methods
 * - Remove localtunnel if no longer required
 * - If using tunnel add express api or similar to listen on proxied port and respond
 *
 *
 *************************************************************************************/

const program = new Command("watch");
export default program
  .description("Watch a folder for changes")
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

  .action(async (options: IWatchOptions) => new GDriveWatcher(options).start());
