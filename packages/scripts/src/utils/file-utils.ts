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
 * @param defaultGroup optional group to assign any values that do not have the defined key
 */
export function groupJsonByKey<T>(json: T[], key: string, defaultGroup?: string) {
  const byKey: { [keyValue: string]: T[] } = {};
  json.forEach((el) => {
    if (el.hasOwnProperty(key)) {
      const keyValue = el[key];
      if (!byKey.hasOwnProperty(keyValue)) {
        byKey[keyValue] = [];
      }
      byKey[keyValue].push(el);
    } else {
      if (defaultGroup) {
        if (!byKey.hasOwnProperty(defaultGroup)) {
          byKey[defaultGroup] = [];
        }
        byKey[defaultGroup].push(el);
      }
    }
  });
  return byKey;
}

/** Similar function as above, but allow to group based on concatenation of multiple key values */
export function groupJsonByMultipleKeys<T>(json: T[], keys: string[], joinCharacter = ".") {
  const byKey: { [keyValue: string]: T[] } = {};
  json.forEach((el) => {
    const keyValue = keys
      .map((key) => el[key])
      .filter((v) => (v === undefined ? false : true))
      .join(joinCharacter);
    if (!byKey.hasOwnProperty(keyValue)) {
      byKey[keyValue] = [];
    }
    byKey[keyValue].push(el);
  });
  return byKey;
}

/**
 * Convert an object array into a json object, with keys corresponding to array entries
 * @param keyfield any unique field which all array objects contain to use as hash keys (e.g. 'id')
 */
export function arrayToHashmap<T>(arr: T[], keyfield: string): { [key: string]: T } {
  const hashmap: { [key: string]: T } = {};
  for (const el of arr) {
    if (el.hasOwnProperty(keyfield)) {
      hashmap[el[keyfield]] = el;
    }
  }
  return hashmap;
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

/**
 * WiP function to simplify process of converting .json files to .ts, with addtional export
 * and index file options
 */
export function convertJsonToTs(
  filepaths: string[],
  config: {
    indexFile?: { namedExport?: string };
    exportDataType?: string;
    outputDir?: string;
    importStatements?: string[];
  }
) {
  let { exportDataType, indexFile, importStatements, outputDir } = config;
  if (outputDir) {
    fs.ensureDirSync(outputDir);
    fs.emptyDirSync(outputDir);
  }
  const indexFilePath = outputDir && indexFile ? path.resolve(outputDir, "index.ts") : null;
  if (indexFilePath) {
    fs.createFileSync(indexFilePath);
  }
  for (const filepath of filepaths) {
    outputDir = outputDir || path.dirname(filepath);
    const filename = path.basename(filepath).replace(".json", ".ts");
    const jsonData = fs.readJSONSync(filepath);
    const tsData = `export default ${JSON.stringify(jsonData, null, 2)}`;
    fs.writeFileSync(path.resolve(outputDir, filename), tsData);
    if (indexFilePath) {
      const importName = path.basename(filename, ".ts");
      if (indexFile.namedExport) {
        fs.appendFileSync(indexFilePath, `import * as ${importName} from "./${importName}";\r\n`);
      } else {
        fs.appendFileSync(indexFilePath, `export * from "./${importName}";\r\n`);
      }
    }
  }
  // Create single export, e.g. ```export const NAMED_EXPORT = {import_1,import_2}```
  if (indexFilePath && indexFile.namedExport) {
    const namedExports = filepaths.map((filepath) => path.basename(filepath, ".json")).join(",");
    fs.appendFileSync(indexFilePath, `export const ${indexFile.namedExport} = { ${namedExports} }`);
  }
}
