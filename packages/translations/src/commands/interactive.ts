import inquirer from "inquirer";
import { Command } from "commander";
const program = new Command();

program
  .command("interactive")
  .description("Run with interactive prompts")
  .action(() => interactivePrompts())
  .parse(process.argv);

/** WiP - interactive client */
export function interactivePrompts() {
  inquirer
    .prompt([
      { message: "Here is a question", name: "command_option" },
      /* Pass your questions in here */
    ])
    .then((answers) => {
      console.log("your answer is", answers);
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("prompt could not be rendered");
        // Prompt couldn't be rendered in the current environment
      } else {
        console.error("error", error);
        // Something else went wrong
      }
    });
}
