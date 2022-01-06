import boxen from "boxen";
import chalk from "chalk";
import { Command } from "commander";

/** Record a 2-line error message in a box with additional optional logging and exit */
export function logError(opts: Partial<ILogErrorOptions> = {}) {
  const { msg1, msg2, error, logOnly } = { ...logErrorDefaultOptions, ...opts };
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

export function logProgramHelp(program: Command) {
  console.log(chalk.yellow("No command specified. See help below:\n"));
  program.outputHelp();
  console.log("\n");
  process.exit(0);
}

interface ILogErrorOptions {
  msg1: string;
  msg2: string;
  error?: Error; // Optional error object to log
  logOnly?: boolean; // specify to log and continue processing instead of exiting
}
const logErrorDefaultOptions: ILogErrorOptions = { msg1: "", msg2: "", logOnly: false };
