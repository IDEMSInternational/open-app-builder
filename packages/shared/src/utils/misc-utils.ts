import { spawnSync } from "child_process";
import { ROOT_DIR } from "../paths";

/**
 * Run prettier to automatically format code in given folder path
 * NOTE - by default will only format .ts files
 */
export function runPrettierCodeTidy(folderPath: string) {
  const cmd = `npx prettier --config ${ROOT_DIR}/.prettierrc --write ${folderPath}/**/*.ts --loglevel error`;
  return spawnSync(cmd, { stdio: ["inherit", "inherit", "inherit"], shell: true });
}
