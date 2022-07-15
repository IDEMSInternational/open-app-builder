import * as fs from "fs-extra";
import * as path from "path";
import { createHash, randomUUID } from "crypto";
import { logWarning } from "./logging.utils";
import { tmpdir } from "os";

/**
 * Retrieve a nested property from a json object
 * using a single path string accessor
 * (modified from https://gist.github.com/jasonrhodes/2321581)
 *
 * @returns value if exists, or null otherwise
 *
 * @example
 * const obj = {"a":{"b":{"c":1}}}
 * getNestedProperty(obj,'a.b.c')  // returns 1
 * getNestedProperty(obj,'a.b.c.d')  // returns null
 *
 * @param obj data object to iterate over
 * @param path nested path, such as data.subfield1.deeperfield2
 */
export function getNestedProperty(obj: any, path: string) {
  return path.split(".").reduce((prev, current) => {
    return prev ? prev[current] : null;
  }, obj);
}

/** Set a nested json property namespaced as parent.child1.subchild1 */
export function setNestedProperty<T>(path: string, value: any, obj: T = {} as any) {
  let childKeys = path.split(".");
  const currentKey = childKeys[0];
  if (childKeys.length > 1) {
    const nestedValue = setNestedProperty(childKeys.slice(1).join("."), value);
    obj[currentKey] = { ...obj[currentKey], ...(nestedValue as any) };
  } else {
    obj[currentKey] = value;
  }
  return obj as T;
}

/**
 * find files by a given extension recursively, returning full paths
 * @param ext - file extension (without '.'), e.g. 'xlsx' or 'json' (leave blank for all files)
 */
export function recursiveFindByExtension(
  base: string,
  ext?: string,
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
      if (ext) {
        if (file.split(".").pop() === ext) {
          result.push(newbase);
        }
      } else {
        result.push(newbase);
      }
    }
  }
  return result;
}

/**
 * Create a nested json representing nested folder structure of a given folder path.
 * Includes optional stats output that records file size and md5 checksum data
 * 
 * @param includeStats include basic stats such as size within nested structure.
 * If ommitted will just mark files as `TRUE`
 * 
 * @returns Example file: i18n/flags/gb.svg
 * ```
 * "i18n": {
    "flags": {
      "gb.svg": {
        "size": 538,
        "checksum": "d3ddd6025a06a78535b0d432d14905bf",
        "filepath": "i18n/flags/gb.svg"
 * ```
 */
export function generateFolderTreeMap(folderPath: string, includeStats = true) {
  const allFiles = recursiveFindByExtension(folderPath);
  // const relativeFiles = allFiles.map(filepath => path.relative(folderPath, filepath))
  let treeMap = {};
  for (const filePath of allFiles) {
    const relativeDirname = path.relative(folderPath, path.dirname(filePath));
    const jsonDirname = relativeDirname.split(path.sep).join(".");
    const siblingJson = getNestedProperty(treeMap, jsonDirname) || {};
    if (includeStats) {
      // generate size and md5 checksum stats
      const { size } = fs.statSync(filePath);
      const checksum = getFileMD5Checksum(filePath);
      const filepath = path.relative(folderPath, filePath).split(path.sep).join("/");
      siblingJson[path.basename(filePath)] = { size, checksum, filepath };
    } else {
      siblingJson[path.basename(filePath)] = fs.statSync(filePath);
    }
    treeMap = setNestedProperty(jsonDirname, siblingJson, treeMap);
  }
  return treeMap;
}

/**
 * Create a flat json representing nested folder structure of a given folder path.
 * Includes optional stats output that records file size and md5 checksum data
 * 
 * @param includeStats include basic stats such as size within nested structure.
 * If ommitted will just mark files as `TRUE`
 * @param filterFn optional filter function to be applied to relative paths for inclusion
 * 
 * @returns Example file: i18n/flags/gb.svg
 * ```
 * "i18n/flags/gb.svg": {
    "size": 538,
    "checksum": "d3ddd6025a06a78535b0d432d14905bf"
  },
 * ```
 */
export function generateFolderFlatMap(
  folderPath: string,
  includeStats = true,
  filterFn = (relativePath: string) => true
) {
  const allFiles = recursiveFindByExtension(folderPath);
  // const relativeFiles = allFiles.map(filepath => path.relative(folderPath, filepath))
  let flatMap: {
    [relativePath: string]: boolean | IContentsEntry;
  } = {};
  for (const filePath of allFiles) {
    const relativePath = path.relative(folderPath, filePath).split(path.sep).join("/");
    const shouldInclude = filterFn(relativePath);
    if (shouldInclude) {
      if (includeStats) {
        // generate size and md5 checksum stats
        const { size, mtime } = fs.statSync(filePath);
        const modifiedTime = mtime.toISOString();
        // write size in kb to 1 dpclear
        const size_kb = Math.round(size / 102.4) / 10;
        const md5Checksum = getFileMD5Checksum(filePath);
        const entry: IContentsEntry = { relativePath, size_kb, md5Checksum, modifiedTime };
        flatMap[relativePath] = entry;
      } else {
        flatMap[relativePath] = true;
      }
    }
  }
  return flatMap;
}

export interface IContentsEntry {
  relativePath: string;
  size_kb: number;
  modifiedTime: string;
  md5Checksum: string;
}

export function getFileMD5Checksum(filePath: string) {
  const hash = createHash("md5", {});
  const fileBuffer = fs.readFileSync(filePath);
  hash.update(fileBuffer);
  const checksum = hash.digest("hex");
  return checksum;
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

export function listFolderNames(folderPath: string) {
  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((v) => v.isDirectory())
    .map((v) => v.name);
}

/**
 * Function to simplify process of converting .json files to .ts, with addtional export
 * and index file options
 */
export function convertJsonToTs(
  filepaths: string[],
  config: {
    indexFile?: {
      /** Provide a specific const name for index file to export as, e.g. export const index = [...] */
      namedExport?: string;
      /** Specify type definition for individual files, e.g. `string[] => export const index:string[] = [...] */
      namedExportType?: string;
    };
    /** Specify type definition for individual files, e.g. `any` => export const data:any = [...] */
    defaultExportType?: string;
    outputDir?: string;
    /** TODO */
    _wip_importStatements?: string[];
  }
) {
  let { defaultExportType, indexFile, _wip_importStatements, outputDir } = config;
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
    let defaultExportName = "data";
    if (defaultExportType) {
      defaultExportName += `:${defaultExportType}`;
    }
    const defaultExportData = JSON.stringify(jsonData, null, 2);
    const tsData = `const ${defaultExportName} = ${defaultExportData}; export default data`;
    fs.writeFileSync(path.resolve(outputDir, filename), tsData);
    if (indexFilePath) {
      const importName = path.basename(filename, ".ts");
      if (indexFile.namedExport) {
        fs.appendFileSync(indexFilePath, `import ${importName} from "./${importName}";\r\n`);
      } else {
        fs.appendFileSync(indexFilePath, `export * from "./${importName}";\r\n`);
      }
    }
  }
  // Create single export, e.g. ```export const NAMED_EXPORT = {import_1,import_2}```
  if (indexFilePath && indexFile.namedExport) {
    const namedExports = filepaths.map((filepath) => path.basename(filepath, ".json")).join(",");
    let exportName = indexFile.namedExport;
    if (indexFile.namedExportType) {
      exportName += `:${indexFile.namedExportType}`;
    }
    fs.appendFileSync(indexFilePath, `export const ${exportName} = { ${namedExports} }`);
  }
}

/**
 * Deep merge two objects.
 * Copied from https://stackoverflow.com/a/34749873/5693245
 * @param target
 * @param ...sources
 */
export function deepMergeObjects(target: any, ...sources: any) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMergeObjects(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMergeObjects(target, ...sources);
}

function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/** Search a folder for a file ending _contents and return parsed json  */
export function readContentsFile(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    logWarning({ msg1: "Folder path does not exist", msg2: folderPath });
    return [];
  }
  const contentsFilePath = fs.readdirSync(folderPath).find((f) => f.endsWith("_contents.json"));
  if (!contentsFilePath) {
    logWarning({ msg1: "Contents file not found in folder", msg2: folderPath });
    return [];
  }
  const contentsJson = fs.readJsonSync(path.resolve(folderPath, contentsFilePath));
  return contentsJson as IContentsEntry[];
}

/**
 * Search a folder for a file ending _contents, parse json and convert to hashmap
 * Requires one of hashKey or hashKeyfn
 * @param options.hashkey named key to use for hashmap entries
 * @param options.hashKeyFn function to generate hahamap key from entry
 */
export function readContentsFileAsHashmap(
  folderPath: string,
  options: { hashKey?: string; hashKeyFn?: (entry: any) => string }
) {
  const contentsJson = readContentsFile(folderPath);
  const hashmap = {};
  const { hashKey, hashKeyFn } = options;
  for (const entry of contentsJson) {
    if (hashKey) {
      if (entry.hasOwnProperty(hashKey)) {
        const entryKey = entry[hashKey];
        if (entryKey) {
          hashmap[entryKey] = entry;
        }
      }
    }
    if (hashKeyFn) {
      const entryKey = hashKeyFn(entry);
      if (entryKey) {
        hashmap[entryKey] = entry;
      }
    }
  }
  return hashmap;
}

/**
 * Copy all files from src dir to target, and remove target files that no longer exist in src
 * Ignores unchanged files based on md5 hash and preserves src file stats
 * @param filter_fn optional filter function applied to src folder files
 * */
export function replicateDir(
  src: string,
  target: string,
  filter_fn?: (entry: IContentsEntry) => boolean
) {
  fs.ensureDirSync(src);
  fs.ensureDirSync(target);
  const srcFiles = generateFolderFlatMap(src, true);
  const targetFiles = generateFolderFlatMap(target, true);

  // omit src files via filter
  if (filter_fn) {
    Object.entries(srcFiles).forEach(([key, entry]) => {
      if (!filter_fn(entry as IContentsEntry)) {
        delete srcFiles[key];
      }
    });
  }

  const ops = { copy: [], delete: [], ignore: [] };
  // remove target files that no longer exist in src
  Object.keys(targetFiles).forEach((filepath) => {
    if (!srcFiles.hasOwnProperty(filepath)) {
      ops.delete.push(filepath);
    }
  });
  // copy new and modified files from src
  Object.entries(srcFiles).forEach(([filepath, entry]) => {
    if (targetFiles.hasOwnProperty(filepath)) {
      const srcFile = entry as IContentsEntry;
      const targetFile = targetFiles[filepath] as IContentsEntry;
      if (srcFile.md5Checksum !== targetFile.md5Checksum) {
        ops.copy.push(entry);
      } else {
        ops.ignore.push(filepath);
      }
    } else {
      ops.copy.push(entry);
    }
  });

  // process operations
  ops.delete.forEach((filepath) => {
    const targetPath = path.resolve(target, filepath);
    fs.removeSync(targetPath);
  });
  ops.copy.forEach((entry) => {
    const { relativePath, modifiedTime } = entry as IContentsEntry;
    const srcPath = path.resolve(src, relativePath);
    const targetPath = path.resolve(target, relativePath);
    const mtime = new Date(modifiedTime);
    fs.ensureDirSync(path.dirname(targetPath));
    fs.copyFileSync(srcPath, targetPath);
    fs.utimesSync(targetPath, mtime, mtime);
  });
  return ops;
}

/** Create a randomly-named temporary folder within the os temp directory */
export function createTemporaryFolder() {
  const folderName = randomUUID();
  const folderPath = path.resolve(tmpdir(), folderName);
  fs.ensureDirSync(folderPath);
  return folderPath;
}
