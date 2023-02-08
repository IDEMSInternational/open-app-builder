import chalk from "chalk";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  utimesSync,
  writeFileSync,
} from "fs-extra";
import NodeRSA from "node-rsa";
import { basename, resolve } from "path";
import { logOutput, promptConfirmation, promptEditorInput } from "../../utils";

/** Suffix added to all encrypted files to distinguish from originals */
const ENCRYPTED_SUFFIX = "crypt";

/** Expressions to populate to gitignore when creating new encryption folder */
const GIT_IGNORE_LIST = ["*.crypt", ".gitignore", "public.key"];

class EncryptionProvider {
  private publicKeyPath: string;
  private publicKey: NodeRSA;
  private privateKeyPath: string;
  private privateKey: NodeRSA;

  /** Check folder files and process any files requiring encryption */
  public async encrypt(folderPath: string) {
    await this.setupEncryptionFolders(folderPath, "encrypt");
    let counter = 0;
    const files = this.listEncryptionFolderFiles(folderPath);
    for (const { filePath } of files) {
      if (this.shouldEncryptFile(filePath)) {
        this.encryptFile(filePath);
        counter++;
      }
    }
    if (counter > 0) {
      logOutput({ msg1: `${counter} files encrypted`, msg2: folderPath });
    } else {
      console.log(chalk.gray("Files already encrypted"));
    }
  }

  /** Check folder files and process any files requiring decryption */
  public async decrypt(folderPath: string) {
    await this.setupEncryptionFolders(folderPath, "decrypt");
    let counter = 0;
    const files = this.listEncryptionFolderFiles(folderPath);
    for (const { filePath } of files) {
      if (this.shouldDecryptFile(filePath)) {
        this.decryptFile(filePath);
        counter++;
      }
    }
    if (counter > 0) {
      logOutput({ msg1: `${counter} files decrypted`, msg2: folderPath });
    } else {
      console.log(chalk.gray("Files already decrypted"));
    }
  }

  private listEncryptionFolderFiles(folderPath: string) {
    return readdirSync(folderPath, { withFileTypes: true })
      .filter((f) => f.isFile())
      .map((f) => ({ fileName: f.name, filePath: resolve(folderPath, f.name) }));
  }

  private encryptFile(filePath: string) {
    if (!this.publicKey) {
      const publicKeyData = readFileSync(this.publicKeyPath);
      this.publicKey = new NodeRSA().importKey(publicKeyData, "public");
    }
    const decryptedData = readFileSync(filePath);
    const encryptedData = this.publicKey.encrypt(decryptedData);
    const encryptedFilePath = `${filePath}.${ENCRYPTED_SUFFIX}`;
    writeFileSync(encryptedFilePath, encryptedData);
    replicateFileTimes(filePath, encryptedFilePath);
  }

  private decryptFile(filePath: string) {
    if (!this.privateKey) {
      const privateKeyData = readFileSync(this.privateKeyPath);
      this.privateKey = new NodeRSA().importKey(privateKeyData, "private");
    }
    const encryptedData = readFileSync(filePath);
    const decryptedData = this.privateKey.decrypt(encryptedData);
    const decryptedFilePath = filePath.replace(`.${ENCRYPTED_SUFFIX}`, "");
    writeFileSync(decryptedFilePath, decryptedData);
    replicateFileTimes(filePath, decryptedFilePath);
  }

  /**
   * Ensure /encryption folder exists for deployment with private encryption key
   * Prompts user to create if not existing
   * */
  private async setupEncryptionFolders(folderPath: string, operation: "encrypt" | "decrypt") {
    // Check encryption folder
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
    // Check private key (required for decryption)
    this.privateKeyPath = resolve(folderPath, "private.key");
    if (!existsSync(this.privateKeyPath) && operation === "decrypt") {
      await this.promptPrivateKeyInput();
    }
    // Check public key (required for encryption)
    this.publicKeyPath = resolve(folderPath, "public.key");
    if (!existsSync(this.publicKeyPath) && operation === "encrypt") {
      const shouldCreate = await promptConfirmation(
        "No encryption key found\nWould you like to create one?"
      );
      if (shouldCreate) {
        generateEncryptionKeys(folderPath);
      } else {
        process.exit(0);
      }
    }
  }

  /**
   * Encrypt files if encrypted version does not already exist with same mtime
   * Only processes files not already encrypted, and not intended as public from gitignore
   **/
  private shouldEncryptFile(filePath: string) {
    const filename = basename(filePath);
    if (GIT_IGNORE_LIST.includes(filename)) return false;
    if (filename === "private.key") return false;
    if (filename.endsWith(`.${ENCRYPTED_SUFFIX}`)) return false;
    // Check if encrypted version already exists and up-to-date
    const encryptedFilePath = `${filePath}.${ENCRYPTED_SUFFIX}`;
    if (!existsSync(encryptedFilePath)) return true;
    return statSync(encryptedFilePath).mtime.getTime() !== statSync(filePath).mtime.getTime();
  }

  /**
   * Decrypt files if decrypted does not already exist with same mtime
   * Only processes files ending `.crypt`
   * */
  private shouldDecryptFile(filePath: string) {
    const filename = basename(filePath);
    if (!filename.endsWith(`.${ENCRYPTED_SUFFIX}`)) return false;
    const decryptedFilePath = filePath.replace(`.${ENCRYPTED_SUFFIX}`, "");
    if (!existsSync(decryptedFilePath)) return true;
    return statSync(decryptedFilePath).mtime.getTime() !== statSync(filePath).mtime.getTime();
  }

  private createEncryptionFolder(folderPath: string) {
    mkdirSync(folderPath);
    const gitIgnorePath = resolve(folderPath, ".gitignore");
    const gitignoreTemplate = `
      *.*
      ${GIT_IGNORE_LIST.map((name) => `!${name}`).join("\n")}
      `
      .replace(/ /g, "")
      .trim();
    writeFileSync(gitIgnorePath, gitignoreTemplate);
  }

  /** Prompt user to input their private key via a text editor and save */
  private async promptPrivateKeyInput() {
    const privateKeyText: string = await promptEditorInput(
      `\n\nA private key is required to decrypt config.
    Paste private key contents into the editor, save and close\n\n`.replace(/  /g, "")
    );
    if (!privateKeyText) process.exit(0);
    writeFileSync(this.privateKeyPath, privateKeyText.trim());
  }
}

/*************************************************************************
 * Utils
 *************************************************************************/

function replicateFileTimes(source: string, target: string) {
  const { atime, mtime } = statSync(source);
  utimesSync(target, atime, mtime);
}

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
