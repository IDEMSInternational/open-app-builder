import chalk from "chalk";
import fs from "fs-extra";
import NodeRSA from "node-rsa";
import path from "path";
import { logOutput, promptEditorInput } from "../../../utils";

/** Suffix added to all encrypted files to distinguish from originals */
const ENCRYPTED_SUFFIX = "crypt";

/**
 * Decrypt all `.crypt` files in an external source encrypted folder.
 * Adapted from `EncryptionProvider.decrypt`, but takes a folder path instead of a deployment name.
 * Decrypted files are written alongside the originals, where the source .gitignore excludes them
 */
export async function decryptExternalFolder(folderPath: string) {
  // Return if source does not use encryption
  if (!fs.existsSync(folderPath)) {
    return;
  }
  const filePaths = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((f) => f.isFile() && shouldDecryptFile(path.resolve(folderPath, f.name)))
    .map((f) => path.resolve(folderPath, f.name));

  if (filePaths.length === 0) {
    console.log(chalk.gray("Files already decrypted"));
    return;
  }

  const privateKey = await loadPrivateKey(folderPath);
  for (const filePath of filePaths) {
    const decryptedData = privateKey.decrypt(fs.readFileSync(filePath));
    const decryptedFilePath = filePath.replace(`.${ENCRYPTED_SUFFIX}`, "");
    fs.writeFileSync(decryptedFilePath, decryptedData);
    // keep same modified time so up-to-date files are not decrypted again
    const { atime, mtime } = fs.statSync(filePath);
    fs.utimesSync(decryptedFilePath, atime, mtime);
  }
  logOutput({ msg1: `${filePaths.length} files decrypted`, msg2: folderPath });
}

/**
 * Load private.key from the folder, creating it from the DEPLOYMENT_PRIVATE_KEY env var
 * or a user prompt if it does not exist
 */
async function loadPrivateKey(folderPath: string) {
  const privateKeyPath = path.resolve(folderPath, "private.key");
  if (!fs.existsSync(privateKeyPath)) {
    if (process.env.DEPLOYMENT_PRIVATE_KEY) {
      fs.writeFileSync(privateKeyPath, process.env.DEPLOYMENT_PRIVATE_KEY.trim());
      console.log(chalk.green("Private key created from environment variable"));
    } else {
      const privateKeyText: string = await promptEditorInput(
        `\n\nA private key is required to decrypt config.
    Paste private key contents into the editor, save and close\n\n`.replace(/  /g, "")
      );
      if (!privateKeyText) {
        throw new Error(`Private key required to decrypt: ${folderPath}`);
      }
      fs.writeFileSync(privateKeyPath, privateKeyText.trim());
    }
  }
  return new NodeRSA().importKey(fs.readFileSync(privateKeyPath), "private");
}

/** Decrypt `.crypt` files if decrypted version does not already exist with same mtime */
function shouldDecryptFile(filePath: string) {
  if (!filePath.endsWith(`.${ENCRYPTED_SUFFIX}`)) return false;
  const decryptedFilePath = filePath.replace(`.${ENCRYPTED_SUFFIX}`, "");
  if (!fs.existsSync(decryptedFilePath)) return true;
  return fs.statSync(decryptedFilePath).mtime.getTime() !== fs.statSync(filePath).mtime.getTime();
}
