import fs from "fs-extra";

/** Split an array into an array of arrays of a given chunk size */
export function ArrayToChunks(array: any[], chunk_size: number) {
  return Array(Math.ceil(array.length / chunk_size))
    .fill(0)
    .map((_, index) => index * chunk_size)
    .map((begin) => array.slice(begin, begin + chunk_size));
}

export function listFolderNames(folderPath: string) {
  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((v) => v.isDirectory())
    .map((v) => v.name);
}
