#!/usr/bin/env node
import fs from "fs-extra";
import { Logger, logOutput } from "../../utils";
import { CONFIG_FOLDER_PATH, PRIVATE_KEY_PATH } from "../../paths";
import { Command } from "commander";
import NodeRSA from "node-rsa";

const program = new Command("decrypt");

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
export default program.description("Decrypt Config Files").action(async () => {
  decryptConfig();
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
async function decryptConfig() {
  if (!fs.existsSync(PRIVATE_KEY_PATH)) {
    Logger.error({
      msg1: "Private decrypt key not found, ask for one from the dev team and copy to path",
      msg2: PRIVATE_KEY_PATH,
    });
  }
  decryptFolder(CONFIG_FOLDER_PATH, PRIVATE_KEY_PATH);
  logOutput({ msg1: "Config decrypted and ready to use", msg2: CONFIG_FOLDER_PATH });
}

function decryptFolder(folderPath: string, privateKeyPath: string) {
  const privateKeyData = fs.readFileSync(privateKeyPath);
  const key = new NodeRSA().importKey(privateKeyData, "private");
  for (const filePath of fs.readdirSync(folderPath)) {
    if (filePath.endsWith(".enc")) {
      const encryptedData = fs.readFileSync(`${folderPath}/${filePath}`);
      const decryptedData = key.decrypt(encryptedData);
      fs.writeFileSync(`${folderPath}/${filePath.replace(".enc", "")}`, decryptedData);
    }
  }
}
