import chalk from "chalk";
import boxen from "boxen";

/** Display an output message in a box with 2 lines of text */
export function outputCompleteMessage(text1: string, text2 = "") {
  console.log(
    boxen(
      `
  ${chalk.blueBright(text1)}
          
  ${chalk.cyanBright(text2)}
          `,
      { padding: 1, borderColor: "blueBright" }
    )
  );
}

export function outputErrorMessage(text1: string, text2 = "") {
  console.log(
    boxen(
      `
  ${chalk.red(text1)}
          
  ${chalk.redBright(text2)}
          `,
      { padding: 1, borderColor: "redBright" }
    )
  );
}
