// Copy files from Canto folder structure into generic folder structure (matching those from gdrive)
// for consumption by the assets post-processor
import * as fs from "fs-extra";
import path from "path";
import { getJsonFromFile } from "../../../utils";
import type { IDownloadedAssetSource } from "../../../lib/app-data";
import { CantoManifest } from "./types";
import { getFilePath, getOutputFolder } from "./utils";

const CUSTOM_FIELD_THEME = "app_theme";
const CUSTOM_FIELD_LANGUAGE = "app_language";

const ASSETS_GLOBAL_FOLDER_NAME = "global";
const DEFAULT_THEME_NAME = "theme_default";

// For each folder in the output, read the manifest file and use it to locate and copy to new folder structure
const copyFiles = (folders: string[]): IDownloadedAssetSource[] => {
  if (folders.length === 0) {
    return [];
  }
  const outputFolder = getOutputFolder("restructured");
  fs.emptyDirSync(outputFolder);
  for (const folder of folders) {
    copyFilesFromFolder(folder, outputFolder);
  }
  return [{ path: outputFolder, name: "canto", remote: false }];
};

const copyFilesFromFolder = (sourceFolder: string, outputFolder: string) => {
  console.log("sourceFolder", sourceFolder);
  const manifest = getJsonFromFile<CantoManifest>(path.join(sourceFolder, "manifest.json"));
  if (!manifest) {
    throw new Error(`Canto manifest not found for source folder: ${sourceFolder}`);
  }
  const folderId = path.basename(sourceFolder);
  for (const file of manifest) {
    const langVariation = file.additional[CUSTOM_FIELD_LANGUAGE] || ASSETS_GLOBAL_FOLDER_NAME;
    const themeVariation = file.additional[CUSTOM_FIELD_THEME] || DEFAULT_THEME_NAME;
    const assetPathName = getFilePath(file, folderId);
    const srcPath = path.join(sourceFolder, assetPathName);
    const destDir = path.join(outputFolder, themeVariation, langVariation);
    const destPath = path.join(destDir, assetPathName);
    fs.ensureDirSync(path.dirname(destPath));
    fs.copyFileSync(srcPath, destPath);
  }
};

export { copyFiles };
