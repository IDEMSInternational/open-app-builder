import boxen from "boxen";
import chalk from "chalk";
import { Command } from "commander";

import { _wait } from "../cli-utils";

/**
 * HACK - export error within a Logger const to allow easier mocking in tests
 * https://github.com/jasmine/jasmine/issues/1414
 *
 * NOTE - this logger is separate and distinct to the logger provided by the
 * getLogger() method
 */
export const Logger = {
  error: (opts: Partial<ILogOptions> = {}) => logError(opts),
  warning: (opts: Partial<ILogOptions> = {}) => logWarning(opts),
};

/** Display an output message in a blue box with 2 lines of text */
export function logOutput(opts: Partial<ILogOptions> = {}) {
  const { msg1, msg2 } = { ...defaultLog, ...opts };
  console.log(
    boxen(`${chalk.blueBright(msg1)}\n\n${chalk.cyanBright(msg2)}`, {
      padding: 1,
      borderColor: "blueBright",
    })
  );
}

/** Display an output message in a blue box with 2 lines of text */
export function logWarning(opts: Partial<ILogOptions> = {}) {
  const { msg1, msg2 } = { ...defaultLog, ...opts };
  console.log(
    boxen(`${chalk.yellowBright(msg1)}\n\n${chalk.yellow(msg2)}`, {
      padding: 1,
      borderColor: "yellowBright",
    })
  );
}

/** Record a 2-line error message in a box with additional optional logging and exit */
function logError(opts: Partial<ILogOptions> = {}) {
  const { msg1, msg2, error, logOnly } = { ...defaultLog, ...opts };
  console.log(
    boxen(`${chalk.red(msg1)}\n\n${chalk.yellow(msg2)}`, {
      padding: 1,
      borderColor: "red",
    })
  );
  if (error) {
    console.error(error);
  }
  if (!logOnly) {
    process.exit(1);
  }
}

export function logProgramHelp(program: Command) {
  console.log(chalk.yellow("No command specified. See help below:\n"));
  program.outputHelp();
  console.log("\n");
  process.exit(0);
}

interface ILogOptions {
  msg1: string;
  msg2: string;
  error?: Error; // Optional error object to log
  logOnly?: boolean; // specify to log and continue processing instead of exiting
}
const defaultLog: ILogOptions = { msg1: "", msg2: "", logOnly: false };
