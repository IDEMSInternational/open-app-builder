// Copy files from Canto folder structure into generic folder structure (matching those from gdrive)
// for consumption by the assets post-processor
import * as fs from "fs-extra";
import path from "path";
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
import { findMatchingRemotePack, getCantoCustomFieldValue } from "./remote-assets";

const DEFAULT_THEME_NAME = "theme_default";

// For each folder in the output, read the manifest file and use it to locate and copy to new folder structure
const copyFiles = async (folders: CantoDownloadedFolder[]): Promise<IDownloadedAssetSource[]> => {
  if (folders.length === 0) {
    return [];
  }
  const outputRoot = getOutputFolder("restructured");
  await fs.emptyDir(outputRoot);
  const copiedFolders: IDownloadedAssetSource[] = [];
  for (const folder of folders) {
    copiedFolders.push(...(await copyFilesFromFolder(folder, outputRoot)));
  }
  return copiedFolders;
};

const copyFilesFromFolder = async (
  sourceFolder: CantoDownloadedFolder,
  outputRoot: string
): Promise<IDownloadedAssetSource[]> => {
  const { folderConfig } = sourceFolder;
  const remotePacks = folderConfig.remote_assets ?? [];
  console.log(`Restructuring Canto files for "${folderConfig.name}"`);
  const manifestPath = path.join(sourceFolder.path, "manifest.json");
  const manifest = (await fs.readJson(manifestPath)) as CantoManifest;
  if (!manifest) {
    throw new Error(`Canto manifest not found for source folder: ${sourceFolder.path}`);
  }

  const coreOutputFolder = path.join(outputRoot, folderConfig.name);
  const remoteOutputFolders = new Map(
    remotePacks.map((pack) => [pack.name, path.join(outputRoot, pack.name)])
  );
  let coreCopiedFiles = 0;
  const remoteCopiedFiles = new Map(remotePacks.map((pack) => [pack.name, 0]));

  for (const file of manifest) {
    const matchingPack = findMatchingRemotePack(file, remotePacks, { folderId: folderConfig.id });
    const outputFolder = matchingPack
      ? remoteOutputFolders.get(matchingPack.name)!
      : coreOutputFolder;
    const destPath = path.join(outputFolder, getRestructuredRelativePath(file, folderConfig.id));
    const srcPath = path.join(sourceFolder.path, getFilePath(file, folderConfig.id));
    await fs.copy(srcPath, destPath);

    if (matchingPack) {
      remoteCopiedFiles.set(matchingPack.name, remoteCopiedFiles.get(matchingPack.name)! + 1);
    } else {
      coreCopiedFiles++;
    }
  }

  const sources: IDownloadedAssetSource[] = [
    { path: coreOutputFolder, name: folderConfig.name, remote: false },
  ];
  for (const packName of remoteOutputFolders.keys()) {
    const copiedFiles = remoteCopiedFiles.get(packName) ?? 0;
    console.log(
      `Restructured ${copiedFiles} remote assets to ${remoteOutputFolders.get(packName)}`
    );
    sources.push({
      path: remoteOutputFolders.get(packName)!,
      name: packName,
      remote: true,
    });
  }
  console.log(`Restructured ${coreCopiedFiles} core assets to ${coreOutputFolder}`);
  return sources;
};

function getRestructuredRelativePath(file: CantoManifest[0], cantoFolderId: string) {
  const langVariation = getLanguageVariation(file);
  const themeVariation = getThemeVariation(file);
  const assetPathName = getFilePath(file, cantoFolderId);
  return [themeVariation, langVariation, assetPathName].filter(Boolean).join("/");
}

function getThemeVariation(file: CantoManifest[0]) {
  const theme = getCantoCustomFieldValue(file, CANTO_CUSTOM_FIELD_THEME);
  return theme === DEFAULT_THEME_NAME ? undefined : theme;
}

function getLanguageVariation(file: CantoManifest[0]) {
  const defaultLanguage =
    WorkflowRunner.config.app_config.APP_LANGUAGES?.default || DEFAULT_APP_LANGUAGE_CODE;
  const languageLabel = getCantoCustomFieldValue(file, CANTO_CUSTOM_FIELD_LANGUAGE_LABEL);
  const languageMappings = {
    ...DEFAULT_CANTO_LANGUAGE_CODES,
    ...WorkflowRunner.config.canto?.languageMappings,
  };
  const languageCode = languageLabel ? languageMappings[languageLabel] || languageLabel : undefined;
  return languageCode === defaultLanguage ? undefined : languageCode;
}

export { copyFiles, getRestructuredRelativePath };
