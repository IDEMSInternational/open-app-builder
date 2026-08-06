import { Capacitor } from "@capacitor/core";
import type { IAssetEntry } from "packages/data-models";
import { Migration } from "../../migration/migration.types";
import type { FileManagerService } from "../../file-manager/file-manager.service";
import type { DynamicDataService } from "../../dynamic-data/dynamic-data.service";
import {
  ASSET_CONTENTS_DATA_LIST,
  ASSET_PACKS_DATA_LIST,
  REMOTE_ASSET_STORAGE_FOLDER,
} from "../remote-asset.types";

export interface IRemoteAssetMigrationContext {
  fileManagerService: FileManagerService;
  dynamicDataService: DynamicDataService;
}

type IAssetContentsRow = IAssetEntry & { id: string };

/**
 * One-time cleanup of asset files downloaded before the `remote_assets` storage folder existed.
 *
 * Older builds saved pack files straight into the deployment's storage folder (`{deployment}/
 * images/asset.png`). They now live under `{deployment}/remote_assets/`, so the old files are
 * invisible to the resume gate and untouched by `reset`, which only clears `remote_assets` -
 * without this they would occupy device storage forever.
 *
 * Deletion is driven by what `_assets_contents` records this app having saved, rather than by
 * clearing the deployment folder of everything unrecognised. That folder is shared with other
 * features (the cached auth profile picture, say), and a migration owned by remote assets has no
 * business deciding what someone else's data is - so it only ever removes files it can point at a
 * record of downloading itself.
 *
 * Deliberately best-effort: a failure here leaves nothing broken, only some space unreclaimed, so
 * errors are swallowed rather than thrown. A throwing migration blocks app startup behind a
 * critical-error alert, which would be a wildly disproportionate outcome for a cache tidy-up.
 */
const migration: Migration<IRemoteAssetMigrationContext> = {
  id: "2026-08-05-remote-assets-storage-folder",
  preconditions: async () => Capacitor.isNativePlatform(),
  run: async ({ fileManagerService, dynamicDataService }) => {
    try {
      const rows = await dynamicDataService.snapshot<IAssetContentsRow>(
        "asset_pack",
        ASSET_CONTENTS_DATA_LIST
      );
      const { legacyFilePaths, updatedRows } = collectLegacyAssets(
        rows,
        fileManagerService.cacheName
      );
      if (!legacyFilePaths.length) {
        console.log("[REMOTE ASSETS] No legacy asset files to clean up");
        return;
      }
      console.log(
        `[REMOTE ASSETS] Removing ${legacyFilePaths.length} legacy asset file(s) from local storage`
      );

      for (const targetPath of legacyFilePaths) {
        try {
          await fileManagerService.deleteSavedFile(targetPath);
        } catch (error) {
          // Keep going: one undeletable file should not strand the rest
          console.error(`[REMOTE ASSETS] Failed to remove legacy asset file: ${targetPath}`, error);
        }
      }

      // Drop the references to the files just deleted, so nothing resolves to a missing file.
      // MUST be upsert (a full document replace), not update: `update` deep-merges its payload into
      // the stored doc, so the paths we removed from these rows would survive.
      await dynamicDataService.bulkUpsert<IAssetContentsRow>(
        "asset_pack",
        ASSET_CONTENTS_DATA_LIST,
        updatedRows
      );

      // Clear pack status so affected packs download again into the new folder. Every row has to
      // go: a stored file carries no record of which pack fetched it, so a legacy file cannot be
      // attributed to one pack. Packs already stored in the new folder are re-fetched needlessly,
      // but that is a one-off cost and far better than leaving a pack `completed` with no files.
      await dynamicDataService.resetFlow("data_list", ASSET_PACKS_DATA_LIST);
    } catch (error) {
      console.error("[REMOTE ASSETS] Legacy asset cleanup failed", error);
    }
  },
};

export default migration;

/**
 * Find every file the app recorded saving under the old flat layout, along with the contents rows
 * rewritten to no longer reference them.
 */
function collectLegacyAssets(rows: IAssetContentsRow[], cacheName: string) {
  const legacyFilePaths: string[] = [];
  const updatedRows: IAssetContentsRow[] = [];

  for (const row of rows) {
    // Deep clone so keys can be dropped without mutating the (immutable) stored row
    const updated = JSON.parse(JSON.stringify(row)) as IAssetContentsRow;
    let changed = false;

    const baseTargetPath = getLegacyTargetPath(updated.filePath, cacheName);
    if (baseTargetPath) {
      legacyFilePaths.push(baseTargetPath);
      delete updated.filePath;
      changed = true;
    }

    const { overrides } = updated;
    if (overrides) {
      for (const [themeName, languageOverrides] of Object.entries(overrides)) {
        for (const [languageCode, overrideEntry] of Object.entries(languageOverrides)) {
          const overrideTargetPath = getLegacyTargetPath(overrideEntry.filePath, cacheName);
          if (!overrideTargetPath) continue;
          legacyFilePaths.push(overrideTargetPath);
          // Removed outright rather than blanked, so lookup falls through to a lower-priority
          // override or the base asset instead of resolving to a file that is no longer there
          delete languageOverrides[languageCode];
          changed = true;
        }
        if (!Object.keys(languageOverrides).length) {
          delete overrides[themeName];
        }
      }
      if (!Object.keys(overrides).length) {
        delete updated.overrides;
      }
    }

    if (changed) updatedRows.push(updated);
  }

  return { legacyFilePaths, updatedRows };
}

/**
 * Local storage path a recorded filePath refers to, or undefined if it is not a legacy asset file.
 * Recognised by the deployment folder appearing in the path - which holds regardless of how a
 * platform spells the rest of it (e.g. iOS /private/var vs /var) - and excludes anything already
 * saved under the current `remote_assets` folder. Bundled paths and web CDN URLs never match.
 */
function getLegacyTargetPath(filePath: string | undefined, cacheName: string) {
  if (!filePath || !cacheName) return undefined;
  const deploymentFolder = `/${cacheName}/`;
  const index = filePath.indexOf(deploymentFolder);
  if (index === -1) return undefined;
  const targetPath = filePath.slice(index + deploymentFolder.length);
  if (!targetPath || targetPath.startsWith(`${REMOTE_ASSET_STORAGE_FOLDER}/`)) return undefined;
  return targetPath;
}
