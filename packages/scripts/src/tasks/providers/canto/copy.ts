// Copy files from Canto folder structure into generic folder structure (matching those from gdrive)
// for consumption by the assets post-processor
import * as fs from "fs-extra";
import path from "path";
import { getJsonFromFile } from "../../../utils";
import { CantoManifest } from "./types";
import { getFilePath, getOutputFolder } from "./utils";

const FOLDER_ID = "V0DQB";
const CUSTOM_FIELD_THEME = "app_theme";
const CUSTOM_FIELD_LANGUAGE = "app_language";

const ASSETS_GLOBAL_FOLDER_NAME = "global";
const DEFAULT_THEME_NAME = "theme_default";

// For each folder in the output, read the manifest file and use it to locate and copy to new folder structure
const copyFiles = (folders: string[]) => {
  const outputFolders = [];
  for (const folder of folders) {
    outputFolders.push(copyFilesFromFolder(folder));
  }
  return outputFolders as string[];
};

const copyFilesFromFolder = (sourceFolder: string) => {
  console.log("sourceFolder", sourceFolder);
  const manifest = getJsonFromFile(path.join(sourceFolder, "manifest.json")) as CantoManifest;
  const outputFolder = getOutputFolder("restructured");
  for (const file of manifest) {
    const langVariation = file.additional[CUSTOM_FIELD_LANGUAGE] || ASSETS_GLOBAL_FOLDER_NAME;
    const themeVariation = file.additional[CUSTOM_FIELD_THEME] || DEFAULT_THEME_NAME;
    const assetPathName = getFilePath(file, FOLDER_ID);
    const srcPath = path.join(sourceFolder, assetPathName);
    const destDir = path.join(outputFolder, themeVariation, langVariation);
    fs.ensureDirSync(path.dirname(destDir));
    fs.copyFileSync(srcPath, path.join(destDir, assetPathName));
    return destDir;
  }
};

export { copyFiles };
