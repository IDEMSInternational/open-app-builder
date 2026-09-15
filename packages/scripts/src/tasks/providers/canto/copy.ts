// Copy files from Canto folder structure into generic folder structure (matching those from gdrive)
// for consumption by the assets post-processor
import * as fs from "fs-extra";
import path from "path";
import type { IDownloadedAssetSource } from "../../../lib/app-data";
import type { CantoDownloadedFolder, CantoManifest } from "./types";
import { getManifestFileMap, getOutputFolder } from "./utils";
import { findMatchingRemotePacks } from "./remote-assets";

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

  const missingFiles: string[] = [];

  // Files are downloaded to the same variation folder structure that they are restructured into,
  // so the relative path of each file is preserved by the copy
  for (const [relativePath, file] of getManifestFileMap(manifest, folderConfig.id, {
    logWarnings: true,
  })) {
    const matchingPacks = findMatchingRemotePacks(file, remotePacks, { folderId: folderConfig.id });
    const srcPath = path.join(sourceFolder.path, relativePath);
    if (!(await fs.pathExists(srcPath))) {
      missingFiles.push(relativePath);
      continue;
    }
    // A file is copied into every remote pack it matches, and only falls back to core assets
    // when it matches none
    const outputFolders =
      matchingPacks.length > 0
        ? matchingPacks.map((pack) => remoteOutputFolders.get(pack.name)!)
        : [coreOutputFolder];
    for (const outputFolder of outputFolders) {
      await fs.copy(srcPath, path.join(outputFolder, relativePath));
    }

    for (const pack of matchingPacks) {
      remoteCopiedFiles.set(pack.name, remoteCopiedFiles.get(pack.name)! + 1);
    }
    if (matchingPacks.length === 0) {
      coreCopiedFiles++;
    }
  }

  // Restructuring an incomplete download would silently drop assets from the app, so fail instead.
  // Most likely cause is a download folder populated before language variation folders were used.
  if (missingFiles.length > 0) {
    throw new Error(
      [
        `${missingFiles.length} file(s) listed in the Canto manifest are missing from ${sourceFolder.path}`,
        `Run a full asset sync (without skipping download) to repopulate them:`,
        missingFiles.slice(0, 10).join("\n"),
        missingFiles.length > 10 ? `...and ${missingFiles.length - 10} more` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );
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

export { copyFiles };
