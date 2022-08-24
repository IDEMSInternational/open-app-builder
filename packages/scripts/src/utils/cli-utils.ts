import * as inquirer from "inquirer";

/**
 * Provide an interactive list of cli options for a user to selet from
 * @returns value of chosen option
 * @param choices array of string/number options, or object with name
 * (what is displayed), and value (what is returned)
 * @param message main text that appears above options
 */
export async function promptOptions<T = any>(
  choices: string[] | { name: string; value: any }[] = [],
  message = "Select an option"
) {
  const res = await inquirer.prompt([{ type: "list", name: "selected", message, choices }]);
  return res.selected as T;
}
export async function promptInput(message: string) {
  const name = "inputValue";
  const res = await inquirer.prompt([{ type: "input", message, name }]);
  return res[name];
}
export function pad(str: string | number, chars: number) {
  str = `${str}`;
  const padChars = Math.max(chars - str.length + 1, 0);
  return str + new Array(padChars).join(" ");
}
/** helper function used for dev to wait a fixed amount of time */
export function _wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
