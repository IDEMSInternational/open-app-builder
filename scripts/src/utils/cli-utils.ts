import * as inquirer from "inquirer";
import chalk from "chalk";
import * as fs from "fs-extra";
import * as dotenv from "dotenv";

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
 * Load the local `.env` file into the environment, populating a default if not provided
 * and notifying the user if configuration parameters are missing
 */
export function populateEnv() {
  const DOTENV_PATH = "./config/.env";
  if (!fs.existsSync(DOTENV_PATH)) {
    fs.copyFileSync("./.env.sample", DOTENV_PATH);
    process.exit(0);
  } else {
    const e = dotenv.parse(fs.readFileSync(DOTENV_PATH));
    Object.entries(e).forEach(([key, value]) => {
      if (!value) {
        console.log(chalk.bgYellow.black(`[${key}] not specified in scripts/config/.env`));
      }
    });
    return e;
  }
}
