// Copy files from Canto folder structure into generic folder structure (matching those from gdrive)
// for consumption by the assets post-processor
import * as fs from "fs-extra";
import path from "path";
import { getJsonFromFile } from "../../../utils";
import type { IDownloadedAssetSource } from "../../../lib/app-data";
import type { CantoDownloadedFolder, CantoManifest } from "./types";
import { getFilePath, getOutputFolder } from "./utils";
import { WorkflowRunner } from "../../../commands/workflow/run";
import { DEFAULT_APP_LANGUAGE_CODE } from "data-models";
import {
  CANTO_CUSTOM_FIELD_LANGUAGE_LABEL,
  CANTO_CUSTOM_FIELD_THEME,
  DEFAULT_CANTO_LANGUAGE_CODES,
} from "./constants";

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
  console.log(`Restructuring Canto files for "${folderConfig.name}"`);
  const manifest = getJsonFromFile<CantoManifest>(path.join(sourceFolder.path, "manifest.json"));
  if (!manifest) {
    throw new Error(`Canto manifest not found for source folder: ${sourceFolder.path}`);
  }
  const outputFolder = path.join(outputRoot, folderConfig.name);
  let copiedFiles = 0;
  for (const file of manifest) {
    const langVariation = getLanguageVariation(file) || ASSETS_GLOBAL_FOLDER_NAME;
    const themeVariation = file.additional[CANTO_CUSTOM_FIELD_THEME] || DEFAULT_THEME_NAME;
    const assetPathName = getFilePath(file, folderConfig.id);
    const srcPath = path.join(sourceFolder.path, assetPathName);
    const destDir = path.join(outputFolder, themeVariation, langVariation);
    const destPath = path.join(destDir, assetPathName);
    fs.ensureDirSync(path.dirname(destPath));
    fs.copyFileSync(srcPath, destPath);
    copiedFiles++;
  }
  console.log(`Restructured ${copiedFiles} files to ${outputFolder}`);
  return { path: outputFolder, name: folderConfig.name, remote: false };
};

function getLanguageVariation(file: CantoManifest[0]) {
  const defaultLanguage =
    WorkflowRunner.config.app_config.APP_LANGUAGES?.default || DEFAULT_APP_LANGUAGE_CODE;
  const languageLabels = file.additional[CANTO_CUSTOM_FIELD_LANGUAGE_LABEL];
  const languageLabel = Array.isArray(languageLabels) ? languageLabels[0] : languageLabels;
  const languageMappings = {
    ...DEFAULT_CANTO_LANGUAGE_CODES,
    ...WorkflowRunner.config.canto?.languageMappings,
  };
  const languageCode = languageLabel ? languageMappings[languageLabel] || languageLabel : undefined;
  return languageCode === defaultLanguage ? undefined : languageCode;
}

export { copyFiles };
