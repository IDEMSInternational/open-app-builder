import * as inquirer from "inquirer";

const isCI = process.env.CI ? true : false;

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
export async function promptInput(message: string, defaultValue?: string) {
  if (isCI && defaultValue) return defaultValue;
  const name = "inputValue";
  const res = await inquirer.prompt([{ type: "input", message, name, default: defaultValue }]);
  return res[name];
}
export async function promptEditorInput(message: string) {
  const name = "inputValue";
  const res = await inquirer.prompt([{ type: "editor", message, name }]);
  return res[name];
}
export async function promptConfirmation(message: string, defaultValue = true) {
  if (isCI) return true;
  const name = "confirm";
  const res = await inquirer.prompt([{ type: "confirm", name, message, default: defaultValue }]);
  return res[name] as boolean;
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
