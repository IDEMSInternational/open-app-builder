import { IAuthorizeOptions, authorizeGDrive } from "../lib/authorize";
require("dotenv").config();

/***************************************************************************************
 * CLI
 * @example gdrive-tools download -id 1bNvUKN47YZAbMnRA1ThzSLGxLTd0mfDb
 *************************************************************************************/

import { Command } from "commander";
import { PATHS } from "../paths";
const program = new Command("authorize");
export default program
  .description("Authorize Google Drive API")
  .requiredOption(
    "-c --credentials-path <string>",
    "Path to credentials JSON",
    PATHS.DEFAULT_CREDENTIALS
  )
  .requiredOption("-a --auth-token-path <string>", "Path to token JSON", PATHS.DEFAULT_TOKEN)
  .action(async (opts: IAuthorizeOptions) => {
    authorizeGDrive(opts);
  });
