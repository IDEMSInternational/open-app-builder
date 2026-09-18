import type { FlowTypes, IAssetEntryHashmap } from "data-models";
import { pathExists, readdir, readJson } from "fs-extra";
import { resolve } from "path";
import { logWarning } from "shared";
import { convertAssetPackRowsToHashmap } from "../postProcess/asset-processors";

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
  if (!(await pathExists(remoteAssetsDir))) return core;

  const packFolders = (await readdir(remoteAssetsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const remote: IAssetEntryHashmap = {};
  for (const packName of packFolders) {
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
