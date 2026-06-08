// Copy files from Canto folder structure into generic folder structure (matching those from gdrive)
// for consumption by the assets post-processor
import * as fs from "fs-extra";
import path from "path";
import { getJsonFromFile } from "../../../utils";
import type { IDownloadedAssetSource } from "../../../lib/app-data";
import type { CantoDownloadedFolder, CantoManifest } from "./types";
import { getFilePath, getOutputFolder } from "./utils";

const CUSTOM_FIELD_THEME = "app_theme";
const CUSTOM_FIELD_LANGUAGE = "app_language";

const ASSETS_GLOBAL_FOLDER_NAME = "global";
const DEFAULT_THEME_NAME = "theme_default";

// For each folder in the output, read the manifest file and use it to locate and copy to new folder structure
const copyFiles = (folders: CantoDownloadedFolder[]): IDownloadedAssetSource[] => {
  if (folders.length === 0) {
    return [];
  }
  const outputRoot = getOutputFolder("restructured");
  fs.emptyDirSync(outputRoot);
  return folders.map((folder) => copyFilesFromFolder(folder, outputRoot));
};

const copyFilesFromFolder = (
  sourceFolder: CantoDownloadedFolder,
  outputRoot: string
): IDownloadedAssetSource => {
  const { folderConfig } = sourceFolder;
  console.log("sourceFolder", sourceFolder.path);
  const manifest = getJsonFromFile<CantoManifest>(path.join(sourceFolder.path, "manifest.json"));
  if (!manifest) {
    throw new Error(`Canto manifest not found for source folder: ${sourceFolder.path}`);
  }
  const outputFolder = path.join(outputRoot, folderConfig.name);
  for (const file of manifest) {
    const langVariation = file.additional[CUSTOM_FIELD_LANGUAGE] || ASSETS_GLOBAL_FOLDER_NAME;
    const themeVariation = file.additional[CUSTOM_FIELD_THEME] || DEFAULT_THEME_NAME;
    const assetPathName = getFilePath(file, folderConfig.id);
    const srcPath = path.join(sourceFolder.path, assetPathName);
    const destDir = path.join(outputFolder, themeVariation, langVariation);
    const destPath = path.join(destDir, assetPathName);
    fs.ensureDirSync(path.dirname(destPath));
    fs.copyFileSync(srcPath, destPath);
  }
  return { path: outputFolder, name: folderConfig.name, remote: false };
};

export { copyFiles };
