import * as inquirer from "inquirer";
import { decryptFolder } from "./file-utils";

/**
 * Provide an interactive list of cli options for a user to selet from
 * @returns value of chosen option
 * @param choices array of string/number options, or object with name
 * (what is displayed), and value (what is returned)
 * @param message main text that appears above options
 */
export async function promptOptions(
  choices: string[] | { name: string; value: string }[] = [],
  message = "Select an option"
) {
  const res = await inquirer.prompt([{ type: "list", name: "selected", message, choices }]);
  return res.selected;
}

/**
 * Decrypt any files encrypted in the config folder for use by other scripts
 */
export function loadConfig() {
  decryptFolder("config", "config/private.key");
  /** Not currently required, but if we want to also load into env we could do so here */
  // const DOTENV_PATH = "config/.env";
  // const e = dotenv.parse(fs.readFileSync(DOTENV_PATH));
  // return e;
}
