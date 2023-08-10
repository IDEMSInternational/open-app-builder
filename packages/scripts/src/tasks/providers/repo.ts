import { spawnSync } from "child_process";
import { ROOT_DIR } from "../../paths";

const runTSCodeFormatter = (folderPath: string) => {
  const cmd = `npx prettier --config ${ROOT_DIR}/.prettierrc --write ${folderPath}/**/*.ts --loglevel error`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
};

export default { runTSCodeFormatter };
