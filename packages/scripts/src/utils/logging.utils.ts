import boxen from "boxen";
import chalk from "chalk";

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

/** Display an output message in a blue box with 2 lines of text */
export function logWarning(opts: Partial<ILogOptions> = {}) {
  const { msg1, msg2 } = { ...defaultLog, ...opts };
  console.log(
    boxen(
      `
      ${chalk.yellowBright(msg1)}
              
      ${chalk.yellow(msg2)}
              `,
      { padding: 1, borderColor: "yellowBright" }
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
