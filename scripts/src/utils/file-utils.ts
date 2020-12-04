import * as fs from "fs-extra";
import * as path from "path";
import NodeRSA from "node-rsa";

/** Split an array into an array of arrays of a given chunk size */
export function ArrayToChunks(array: any[], chunk_size: number) {
  return Array(Math.ceil(array.length / chunk_size))
    .fill(0)
    .map((_, index) => index * chunk_size)
    .map((begin) => array.slice(begin, begin + chunk_size));
}

/**
 * find files by a given extension recursively, returning full paths
 * @param ext - file extension (without '.'), e.g. 'xlsx' or 'json'
 */
export function recursiveFindByExtension(
  base: string,
  ext: string,
  files?: string[],
  result?: string[]
) {
  files = files || fs.readdirSync(base);
  result = result || [];
  for (const file of files) {
    const newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      const newFiles = fs.readdirSync(newbase);
      result = recursiveFindByExtension(newbase, ext, newFiles, result);
    } else {
      if (file.split(".").pop() === ext) {
        result.push(newbase);
      }
    }
  }
  return result;
}

/**
 * Take an array of json object and return grouped by specific key
 * @param json array of objects containing key field
 * @param key lookup field for grouping
 */
export function groupJsonByKey<T>(json: T[], key: string) {
  const byKey: { [keyValue: string]: T[] } = {};
  json.forEach((el) => {
    if (el.hasOwnProperty(key)) {
      const keyValue = el[key];
      if (!byKey.hasOwnProperty(keyValue)) {
        byKey[keyValue] = [];
      }
      byKey[keyValue].push(el);
    }
  });
  return byKey;
}

export function decryptFolder(folderPath: string, privateKeyPath: string) {
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

export function encryptFolder(
  folderPath: string,
  publicKeyPath: string,
  exclusions: string[] = []
) {
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
