import fs from "fs-extra";

const remove = (options: { src: string }) => fs.removeSync(options.src);
const filter = (options: { src: string; target?: string }) => null;
const copy = (options: { src: string; target: string }) => null;

export default {
  remove,
  // filter, copy
};
