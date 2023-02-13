import fs from "fs-extra";
import chokidar from "chokidar";
import { generateFolderFlatMap } from "../../utils";
import { resolve } from "path";

const remove = (options: { src: string }) => fs.removeSync(options.src);
const filter = (options: { src: string; target?: string }) => null;
const copy = (options: { src: string; target: string; copyOptions?: fs.CopyOptionsSync }) =>
  fs.copySync(options.src, options.target, options.copyOptions || {});

/** Create an _contents.json file of folder contents */
const writeFolderContents = (options: { src: string }) => {
  const contents = generateFolderFlatMap(options.src, { filterFn: (p) => p !== "_contents.json" });
  const targetFile = resolve(options.src, "_contents.json");
  fs.writeJSONSync(targetFile, contents);
};

const watchFolder = (options: { src: string | string[]; onUpdate: (path: string) => void }) => {
  const watcher = chokidar
    .watch(options.src, {
      ignoreInitial: false,
      awaitWriteFinish: true,
    })
    .on("change", (path, stats) => {
      options.onUpdate(path);
    });

  console.log("watching for changes to files...", options.src);
  process.on("SIGINT", () => watcher.close().then(() => process.exit(0)));
};

export default {
  remove,
  copy,
  watchFolder,
  writeFolderContents,
  // filter, copy
};
