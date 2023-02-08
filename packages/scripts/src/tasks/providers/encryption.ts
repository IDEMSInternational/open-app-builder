import chalk from "chalk";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs-extra";
import NodeRSA from "node-rsa";
import { basename, resolve } from "path";
import { WorkflowRunner } from "../../commands/workflow/run";
import { Logger, logOutput, promptConfirmation } from "../../utils";

const ENCRYPTED_SUFFIX = "crypt";
const ENCRYPTED_FOLDER_NAME = "encrypted";
const IGNORE_LIST = ["*.crypt", ".gitignore", "public.key"];

class EncryptionProvider {
  private publicKeyPath: string;
  private privateKeyPath: string;
  private publicKey: NodeRSA;

  public async encrypt() {
    const { _workspace_path } = WorkflowRunner.config;
    const folderPath = resolve(_workspace_path, ENCRYPTED_FOLDER_NAME);
    await this.setupEncryptionFolders(folderPath);
    // Get list of files requiring encryption
    let filesToEncrypt = [];
    const fileNames = readdirSync(folderPath, { withFileTypes: true })
      .filter((f) => f.isFile())
      .map((f) => f.name);
    for (const filename of fileNames) {
      const filePath = resolve(folderPath, filename);
      if (this.shouldEncryptFile(filePath)) {
        filesToEncrypt.push(filePath);
      }
    }
    // Handle encryption
    for (const filePath of filesToEncrypt) {
      this.encryptFile(filePath);
    }
    if (filesToEncrypt.length > 0) {
      logOutput({ msg1: `${filesToEncrypt.length} files encrypted`, msg2: folderPath });
    } else {
      console.log(chalk.gray("Files already encrypted"));
    }
  }

  public async decrypt(folderPath: string) {
    await this.setupEncryptionFolders(folderPath);
  }

  private encryptFile(filePath: string) {
    if (!this.publicKey) {
      const publicKeyData = readFileSync(this.publicKeyPath);
      this.publicKey = new NodeRSA().importKey(publicKeyData, "public");
    }
    const decryptedData = readFileSync(filePath);
    const encryptedData = this.publicKey.encrypt(decryptedData);
    writeFileSync(`${filePath}.${ENCRYPTED_SUFFIX}`, encryptedData);
  }

  private async setupEncryptionFolders(folderPath: string) {
    if (!existsSync(folderPath)) {
      if (!existsSync(folderPath)) {
        const shouldCreate = await promptConfirmation(
          "No encrypted folder exists\nWould you like to create one?"
        );
        if (shouldCreate) {
          this.createEncryptionFolder(folderPath);
          generateEncryptionKeys(folderPath);
        } else {
          process.exit(0);
        }
      }
    }
    this.privateKeyPath = resolve(folderPath, "private.key");
    if (!existsSync(this.privateKeyPath)) {
      const shouldCreate = await promptConfirmation(
        "No encryption key found\nWould you like to create one?"
      );
      if (shouldCreate) {
        generateEncryptionKeys(folderPath);
      } else {
        process.exit(0);
      }
    }
    this.publicKeyPath = resolve(folderPath, "public.key");
    if (!existsSync(this.publicKeyPath)) {
      // TODO - handle case where private key exists but public missing (regenerate?)
      Logger.error({ msg1: "Public key not found, cannot continue", msg2: this.publicKeyPath });
    }
  }

  private shouldEncryptFile(filePath: string) {
    const filename = basename(filePath);
    if (IGNORE_LIST.includes(filename)) return false;
    if (filename === "private.key") return false;
    if (filename.endsWith(`.${ENCRYPTED_SUFFIX}`)) return false;
    // Check if encrypted version already exists and up-to-date
    const encryptedFilePath = `${filePath}.${ENCRYPTED_SUFFIX}`;
    if (existsSync(encryptedFilePath)) {
      return statSync(encryptedFilePath).mtime.getTime() === statSync(filePath).mtime.getTime();
    }
    return true;
  }

  private createEncryptionFolder(folderPath: string) {
    mkdirSync(folderPath);
    const gitIgnorePath = resolve(folderPath, ".gitignore");
    const gitignoreTemplate = `
      *.*
      ${IGNORE_LIST.map((name) => `!${name}`).join("\n")}
      `
      .replace(/ /g, "")
      .trim();
    writeFileSync(gitIgnorePath, gitignoreTemplate);
  }
}

/*************************************************************************
 * Utils
 *************************************************************************/

function generateEncryptionKeys(folderPath: string) {
  const key = new NodeRSA({ b: 512 });
  const publicKeyPath = resolve(folderPath, "public.key");
  const privateKeyPath = resolve(folderPath, "private.key");
  writeFileSync(publicKeyPath, key.exportKey("public"));
  writeFileSync(privateKeyPath, key.exportKey("private"));
  logOutput({
    msg1: "New encryption key created\nYou should keep a backup of this and only share with trusted collaborators",
    msg2: privateKeyPath,
  });
}
export default new EncryptionProvider();
