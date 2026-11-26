import {
  getAssetPackArchiveFileName,
  type FlowTypes,
  type IAssetEntry,
  type IAssetEntryHashmap,
} from "data-models";
import { pathExists, readdir, readJson, stat } from "fs-extra";
import { resolve } from "path";
import { logWarning } from "shared";
import { convertAssetPackRowsToHashmap } from "../postProcess/asset-processors";

export interface IAssetPackStorage {
  packName: string;
  /** Size of the zip the app downloads. Undefined if no archive has been generated */
  archiveBytes?: number;
  /** Size in KB of each file the pack saves to a device, keyed by file path */
  fileSizesKB: Record<string, number>;
}

export interface IAssetStorageData {
  bundled: IAssetEntryHashmap;
  /** Combined size in KB of the sheets and translations bundled in the app */
  contentKB: number;
  packs: IAssetPackStorage[];
}

/**
 * Load asset entries from both the core `assets` folder and any `remote_assets` pack subfolders,
 * merging them into a single hashmap for reporting.
 *
 * Remote packs deliberately have no `contents.json`, so their entries come from each pack's
 * AssetPack manifest (`<packName>.json`) instead. Everything is keyed by asset path, matching how
 * the app merges every pack into a single `_assets_contents` list at runtime.
 */
export async function loadAssetEntries(appDataDir: string): Promise<IAssetEntryHashmap> {
  const core = (await readJson(
    resolve(appDataDir, "assets", "contents.json")
  )) as IAssetEntryHashmap;

  const remoteAssetsDir = resolve(appDataDir, "remote_assets");
  const remote: IAssetEntryHashmap = {};
  for (const packName of await listAssetPackFolders(remoteAssetsDir)) {
    const manifestPath = resolve(remoteAssetsDir, packName, `${packName}.json`);
    try {
      const manifest = (await readJson(manifestPath)) as FlowTypes.AssetPack;
      Object.assign(remote, convertAssetPackRowsToHashmap(manifest.rows));
    } catch (error) {
      // Skip the pack rather than failing the whole report
      logWarning({
        msg1: `Skipping asset pack "${packName}"`,
        msg2: `Could not read remote_assets/${packName}/${packName}.json\n${error.message}`,
      });
    }
  }

  return { ...core, ...remote };
}

/** Load the size of bundled content and assets, and the sizes of each asset pack */
export async function loadAssetStorageData(appDataDir: string): Promise<IAssetStorageData> {
  const bundled = (await readJson(
    resolve(appDataDir, "assets", "contents.json")
  )) as IAssetEntryHashmap;
  const contentKB =
    (await getFolderSizeKB(resolve(appDataDir, "sheets"))) +
    (await getFolderSizeKB(resolve(appDataDir, "translations")));

  const remoteAssetsDir = resolve(appDataDir, "remote_assets");
  const packs: IAssetPackStorage[] = [];
  for (const packName of await listAssetPackFolders(remoteAssetsDir)) {
    const packDir = resolve(remoteAssetsDir, packName);
    // Unreadable manifests are reported by `loadAssetEntries`
    const manifest: FlowTypes.AssetPack | undefined = await readJson(
      resolve(packDir, `${packName}.json`)
    ).catch(() => undefined);
    if (!manifest) continue;

    const archivePath = resolve(packDir, getAssetPackArchiveFileName(packName, manifest.version));
    const archiveBytes = (await pathExists(archivePath))
      ? (await stat(archivePath)).size
      : undefined;
    packs.push({ packName, archiveBytes, fileSizesKB: getPackFileSizesKB(manifest) });
  }
  return { bundled, contentKB, packs };
}

async function getFolderSizeKB(folder: string): Promise<number> {
  if (!(await pathExists(folder))) return 0;
  let sizeKB = 0;
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const entryPath = resolve(folder, entry.name);
    sizeKB += entry.isDirectory()
      ? await getFolderSizeKB(entryPath)
      : (await stat(entryPath)).size / 1024;
  }
  return sizeKB;
}

async function listAssetPackFolders(remoteAssetsDir: string) {
  if (!(await pathExists(remoteAssetsDir))) return [];
  return (await readdir(remoteAssetsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function getPackFileSizesKB(manifest: FlowTypes.AssetPack) {
  const fileSizesKB: Record<string, number> = {};
  for (const row of (manifest.rows || []) as IAssetEntry[]) {
    if (row.id && !row.overridesOnly) {
      fileSizesKB[row.id] = row.size_kb;
    }
    for (const languageOverrides of Object.values(row.overrides || {})) {
      for (const { filePath, size_kb } of Object.values(languageOverrides || {})) {
        if (filePath) fileSizesKB[filePath] = size_kb;
      }
    }
  }
  return fileSizesKB;
}
