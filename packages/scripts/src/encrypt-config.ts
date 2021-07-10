import * as fs from "fs-extra";
import chalk from "chalk";
import NodeRSA from "node-rsa";
import { encryptFolder, promptOptions } from "./utils";
const PUBLIC_KEY_PATH = "config/public.key";

async function main() {
  if (!fs.existsSync(PUBLIC_KEY_PATH)) {
    const createKey = await promptOptions(
      ["Y", "N"],
      "A key is required to encrypt, would you like to create a new one?"
    );
    if (createKey === "Y") {
      const key = new NodeRSA({ b: 512 });
      fs.writeFileSync("config/public.key", key.exportKey("public"));
      fs.writeFileSync("config/private.key", key.exportKey("private"));
    } else {
      console.log(chalk.bgYellow.black(`(!) A key is required to encrypt the repo `));
    }
    process.exit();
  }
  encryptFolder("config", PUBLIC_KEY_PATH, ["public.key", "private.key"]);
}
main();
