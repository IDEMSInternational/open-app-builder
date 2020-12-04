import chalk from "chalk";

import { loadConfig, promptOptions } from "./src/utils";
import { spawnSync } from "child_process";

/**
 * A list of script entrypoints, with value specified by their npm run name,
 * e.g. `version` -> `npm run version`
 */
const SCRIPT_NAMES = [
  {
    value: "sync-plh-content",
    name: "Sync Latest GDrive Content to App",
  },
  {
    value: "version",
    name: "Update App Version",
  },
  {
    value: "resize-android-assets",
    name: "Process Resources Folder Updates",
  },
];

/**
 * Default start script, simply shows a list of available scripts to the user
 * Accepts script name directly as an argument, e.g. `npm run start version`
 * will run the version script. Similarly when run from parent, can call direct:
 * `npm run scripts version`
 */
async function start() {
  loadConfig();
  const args = process.argv;
  const scriptToRun = args[2] ? args[2] : await promptOptions(SCRIPT_NAMES);
  spawnSync(`npm run ${scriptToRun}`, {
    stdio: ["inherit", "inherit", "inherit"],
    shell: true,
  });
}
start().catch((err) => {
  console.log(chalk.red(err));
  process.exit(1);
});
