import boxen from "boxen";
import chalk from "chalk";
import * as inquirer from "inquirer";

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
export async function promptInput(message: string) {
  const name = "inputValue";
  const res = await inquirer.prompt([{ type: "input", message, name }]);
  return res[name];
}

/** Record a 2-line error message in a box with additional optional logging and exit */
export function logError(opts: Partial<ILogOptions> = {}) {
  const { msg1, msg2, error, logOnly } = { ...defaultLog, ...opts };
  console.log(
    boxen(
      `
  ${chalk.red(msg1)}
        
  ${chalk.yellow(msg2)}
        
        `,
      { padding: 1, borderColor: "red" }
    )
  );
  if (error) {
    console.error(error);
  }
  if (!logOnly) {
    process.exit(1);
  }
}

/** Display an output message in a blue box with 2 lines of text */
export function logOutput(opts: Partial<ILogOptions> = {}) {
  const { msg1, msg2 } = { ...defaultLog, ...opts };
  console.log(
    boxen(
      `
  ${chalk.blueBright(msg1)}
          
  ${chalk.cyanBright(msg2)}
          `,
      { padding: 1, borderColor: "blueBright" }
    )
  );
}

interface ILogOptions {
  msg1: string;
  msg2: string;
  error?: Error; // Optional error object to log
  logOnly?: boolean; // specify to log and continue processing instead of exiting
}
const defaultLog: ILogOptions = { msg1: "", msg2: "", logOnly: false };
