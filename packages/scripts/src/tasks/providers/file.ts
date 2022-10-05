import fs from "fs-extra";

const remove = (options: { src: string }) => fs.removeSync(options.src);
const filter = (options: { src: string; target?: string }) => null;
const copy = (options: { src: string; target: string; copyOptions?: fs.CopyOptionsSync }) =>
  fs.copySync(options.src, options.target, options.copyOptions || {});

export default {
  remove,
  copy,
  // filter, copy
};
