import chalk from "chalk";
import * as inquirer from "inquirer";

import { ITemplateMeta, TEMPLATES } from "../templates";

async function run() {
  // TODO - prompt template selection
  const { selected } = await inquirer.prompt([
    {
      type: "list",
      name: "selected",
      message: "What action would you like to setup?",
      choices: TEMPLATES.map((value) => ({ value, name: value.name })),
    },
  ]);
  console.log("SELECTED", selected);
  //
  for (const template of TEMPLATES) {
    const processedTemplate = await handleTemplateInputs(template);
    // replace any input values in template %{VAR_NAME} syntax

    console.log(processedTemplate);
  }
}

function processTemplate() {}

async function handleTemplateInputs(template: ITemplateMeta) {
  const userInputs: Record<string, any> = {};
  console.log(chalk.blue("\nPlease provide the following inputs"));
  // Record user input values
  for (const { name, description, defaultValue, required } of template.inputs || []) {
    console.log("");
    const message = `${chalk.yellow(name)}\n${chalk.gray(description)}\n`;
    const res = await inquirer.prompt([{ type: "input", name, message, default: defaultValue }]);
    const value = res[name];
    if (!value && required) {
      throw new Error("Input required");
    }
    userInputs[name] = value;
  }
  // Replace template values
  let replacedYaml = template.yaml;
  for (const [key, value] of Object.entries(userInputs)) {
    const exp = new RegExp(`%{${key}}`, "g");
    replacedYaml = replacedYaml.replace(exp, value);
  }
  return replacedYaml;
}

run();
