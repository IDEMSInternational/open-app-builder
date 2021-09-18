import path from "path";
import fs from "fs-extra";

export const paths = {
  SRC_FOLDER: path.resolve(__dirname, "../../../"),
  /** output path for generated screenshots */
  SCREENSHOTS_FOLDER: path.resolve(__dirname, "../output/screenshots"),
  CACHED_RELEASES: path.resolve(__dirname, "../cache/releases"),
  CACHED_SCREENSHOTS_FOLDER: path.resolve(__dirname, "../cache/screenshots"),
};

Object.values(paths).forEach((p) => {
  fs.ensureDirSync(p);
});

/** path to src dexie installation to use during db seed methods */
export const DEXIE_SRC_PATH = path.resolve(paths.SRC_FOLDER, "node_modules/dexie/dist/dexie.js");
