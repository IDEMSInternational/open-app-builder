import * as fs from "fs-extra";

/** Split an array into an array of arrays of a given chunk size */
export const ArrayToChunks = (array: any[], chunk_size: number) =>
  Array(Math.ceil(array.length / chunk_size))
    .fill(0)
    .map((_, index) => index * chunk_size)
    .map((begin) => array.slice(begin, begin + chunk_size));
