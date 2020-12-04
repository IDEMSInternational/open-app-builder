import * as fs from "fs-extra";
import chalk from "chalk";
import { decryptFolder, encryptFolder } from "./utils";
const PRIVATE_KEY_PATH = "config/private.key";

async function main() {
  const missingMsg =
    "(!) Key required to decrypt environment variables, ask for access from development team ";
  if (!fs.existsSync(PRIVATE_KEY_PATH)) {
    console.log(chalk.bgYellow.black(missingMsg));
    process.exit();
  }
  decryptFolder("config", PRIVATE_KEY_PATH);
}
main();
