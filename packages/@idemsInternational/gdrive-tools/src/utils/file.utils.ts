import path from "path";
import fs from "fs-extra";
import { createHash } from "crypto";

/************************************************************************
 * Helper functions for working with local files
 * NOTE - most are duplicates of scripts/file.utils from IDEMS App repo
 ************************************************************************/

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
export function generateFolderFlatMapStats(
  folderPath: string,
  filterFn = (relativePath: string) => true
) {
  const allFiles = recursiveFindByExtension(folderPath);
  // const relativeFiles = allFiles.map(filepath => path.relative(folderPath, filepath))
  let flatMap: { [relative_path: string]: ILocalFileWithStats } = {};
  for (const filePath of allFiles) {
    const relativePath = path.relative(folderPath, filePath).split(path.sep).join("/");
    const shouldInclude = filterFn(relativePath);
    if (shouldInclude) {
      // generate size and md5 checksum stats
      const { size, mtime } = fs.statSync(filePath);
      const checksum = getFileMD5Checksum(filePath);
      flatMap[relativePath] = { size, checksum, mtime };
    }
  }
  return flatMap;
}
export interface ILocalFileWithStats {
  size: number;
  checksum: string;
  mtime: Date;
}

export function getFileMD5Checksum(filePath: string) {
  const hash = createHash("md5", {});
  const fileBuffer = fs.readFileSync(filePath);
  hash.update(fileBuffer);
  const checksum = hash.digest("hex");
  return checksum;
}

/**
 * Recursively remove any empty folders
 * (duplicate from scripts file-utils)
 */
export const cleanupEmptyFolders = (folder: string) => {
  if (!fs.existsSync(folder)) return;
  if (!fs.statSync(folder).isDirectory()) return;
  let files = fs.readdirSync(folder);

  if (files.length > 0) {
    files.forEach((file) => cleanupEmptyFolders(path.join(folder, file)));
    // Re-evaluate files; after deleting subfolders we may have an empty parent
    // folder now.
    files = fs.readdirSync(folder);
  }

  if (files.length === 0) {
    fs.rmdirSync(folder);
  }
};
