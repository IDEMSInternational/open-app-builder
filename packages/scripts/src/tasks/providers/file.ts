import fs from "fs-extra";
import { replicateDir } from "../../utils";

const remove = (options: { src: string }) => fs.removeSync(options.src);
const filter = (options: { src: string; target?: string }) => null;
const replicate = replicateDir;
const copy = fs.copySync;

export default {
  remove,
  copy,
};
