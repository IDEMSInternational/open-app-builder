#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import NodeRSA from "node-rsa";
import { promptOptions } from "../../utils";
import { PUBLIC_KEY_PATH } from "../../paths";
import { Command } from "commander";

const program = new Command("download");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program.description("Encrypt Config Files").action(async () => {
  encryptConfig();
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
async function encryptConfig() {
  {
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
}

function encryptFolder(folderPath: string, publicKeyPath: string, exclusions: string[] = []) {
  const publicKeyData = fs.readFileSync(publicKeyPath);
  const key = new NodeRSA().importKey(publicKeyData, "public");
  fs.readdirSync(folderPath).forEach((filename) => {
    if (!exclusions.includes(filename) && path.extname(filename) !== ".enc") {
      const decryptedData = fs.readFileSync(`${folderPath}/${filename}`);
      const encryptedData = key.encrypt(decryptedData);
      fs.writeFileSync(`${folderPath}/${filename}.enc`, encryptedData);
    }
  });
}
