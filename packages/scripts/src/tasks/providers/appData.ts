import { spawnSync } from "child_process";

// const qualityCheckAssets = () => {};

/**
 * TODO - main copy script should be refactored/replace by individual parts
 * (e.g. translations process, copy, rewrite, code tidy etc)
 */
const copy = () => {
  const scriptsExec = `yarn workspace scripts start`;
  let copyCmd = "app-data copy";
  // TODO - add asset dirs to cmds and pass correct variables

  spawnSync(`${scriptsExec} ${copyCmd}`, { stdio: "inherit", shell: true });
};

export default { copy };
