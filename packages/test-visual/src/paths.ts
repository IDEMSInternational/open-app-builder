import path from "path";

const SRC_FOLDER_PATH = path.resolve(__dirname, "../../../");

/** output path for generated screenshots */
export const SCREENSHOTS_PATH = path.resolve(__dirname, "../output");

export const CACHED_RELEASES_PATH = path.resolve(__dirname, "../cache/releases");
export const CACHED_SCREENSHOTS_PATH = path.resolve(__dirname, "../cache/screenshots");

/** path to src dexie installation to use during db seed methods */
export const DEXIE_SRC_PATH = path.resolve(SRC_FOLDER_PATH, "node_modules/dexie/dist/dexie.js");
