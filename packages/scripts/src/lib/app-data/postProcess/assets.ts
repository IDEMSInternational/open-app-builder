import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";
import {
  generateFolderFlatMap,
  logOutput,
  logWarning,
  createTempDir,
  IContentsEntryHashmap,
  replicateDir,
  sortJsonKeys,
  copyFileWithTimestamp,
} from "../../../utils";
import { ActiveDeployment } from "../../../commands/deployment/get";
import type { IAssetEntryHashmap, IAssetEntry, IAssetSource } from "data-models";
import type { FlowTypes } from "data-models";
import { resolve } from "path";
import {
  assetsQualityCheck,
  checkTotalAssetSize,
  filterAppAssets,
  handleAssetOverrides,
} from "./asset-processors";

/** Unique value to be used internally as name for core asset pack */
const CORE_ASSETS_PACK = Symbol("CORE_ASSETS");

/**
 * Mirrors the structure of the IAssetSource type in the deployment config,
 * with a property to track the local path to the downloaded assets instead of the gdrive id
 * */
export interface IDownloadedAssetSource extends Omit<IAssetSource, "id"> {
  /** Local path to the downloaded assets */
  path: string;
}

interface IAssetPostProcessorOptions {
  sources: IDownloadedAssetSource[];
}

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
export class AssetsPostProcessor {
  private activeDeployment = ActiveDeployment.get();
  constructor(private options: IAssetPostProcessorOptions) {}

  public run() {
    const { app_data } = this.activeDeployment;

    const sources = this.prepareAssetSources();

    const appAssetsFolder = path.resolve(app_data.output_path, "assets");
    fs.ensureDirSync(appAssetsFolder);

    // Map to track assets by their output destination
    // Core assets use special symbol as key, remote assets use their pack name
    // Use a Map to allow merging multiple input sources into the same output pack
    const assetsByPack = new Map<string | symbol, IContentsEntryHashmap>();
    // Helper to track which remote packs we are currently processing (for cleanup)
    const currentRemotePacks = new Set<string>();

    for (const source of sources) {
      const sourceAssets = generateFolderFlatMap(source.path, { includeLocalPath: true });
      const sourceAssetsFiltered = filterAppAssets(sourceAssets, this.activeDeployment);

      // If remote is true, use the name as the pack name. Otherwise treat as core assets
      const packName = source.remote && source.name ? source.name : CORE_ASSETS_PACK;

      if (packName !== CORE_ASSETS_PACK) {
        currentRemotePacks.add(packName);
      }

      // Initialize map entry if needed
      if (!assetsByPack.has(packName)) {
        assetsByPack.set(packName, {});
      }

      // Merge assets into the appropriate pack (core or remote)
      const packAssets = assetsByPack.get(packName)!;
      Object.assign(packAssets, sourceAssetsFiltered);
    }

    // Process and write all asset packs
    for (const [packName, assets] of assetsByPack.entries()) {
      if (packName === CORE_ASSETS_PACK) {
        // Core assets
        this.processAndWriteAssets(assets, appAssetsFolder);
      } else {
        // Remote assets
        const remoteAssetsFolder = path.resolve(
          app_data.output_path,
          "remote_assets",
          packName as string
        );
        // Delete any existing folder to ensure clean state
        if (fs.existsSync(remoteAssetsFolder)) {
          fs.removeSync(remoteAssetsFolder);
        }
        fs.ensureDirSync(remoteAssetsFolder);
        this.processAndWriteAssets(assets, remoteAssetsFolder, packName as string);
      }
    }

    // Clean up old asset pack folders that are no longer in the config
    this.cleanupOldRemoteAssetFolders(app_data.output_path, currentRemotePacks);

    console.log(chalk.green("Asset Process Complete"));
  }

  private prepareAssetSources(): IDownloadedAssetSource[] {
    const sources = [...this.options.sources];
    // Include parent config in list of source assets
    // TODO - may want to reconsider this functionality in the future given ability to use
    // multiple input sources instead
    if (this.activeDeployment._parent_config) {
      const parentAssetsFolder = path.resolve(
        this.activeDeployment._parent_config._workspace_path,
        "app_data",
        "assets"
      );
      fs.ensureDirSync(parentAssetsFolder);
      sources.unshift({ path: parentAssetsFolder, name: "", remote: false });
    }
    return sources;
  }

  /**
   * Process assets and write them to the target folder
   * Handles asset overrides, copying files, and writing contents files
   * @param assetPackName If provided, writes AssetPack format manifest instead of contents.json
   */
  private processAndWriteAssets(
    assetsHashmap: IContentsEntryHashmap,
    targetFolder: string,
    assetPackName?: string
  ) {
    // Copy all assets to staging directory, preserving timestamps
    const stagingDir = createTempDir();
    for (const entry of Object.values(assetsHashmap)) {
      const targetPath = resolve(stagingDir, entry.relativePath);
      copyFileWithTimestamp(entry.localPath, targetPath, entry.modifiedTime);
    }

    // Run quality checks on staging directory
    assetsQualityCheck(stagingDir);

    // Process asset overrides to generate the standard app data structure (the core assets contents.json format)
    const { tracked: contentsData, untracked: untrackedData } = handleAssetOverrides(assetsHashmap);

    // Copy staging directory to target folder
    replicateDir(stagingDir, targetFolder);
    fs.removeSync(stagingDir);

    // Always write standard contents files (contents.json)
    this.writeAssetsContentsFile(targetFolder, contentsData);

    // For remote assets, write the asset pack manifest
    if (assetPackName) {
      this.writeRemoteAssetsManifest(targetFolder, assetPackName, contentsData, untrackedData);
    }
    // For core assets, check total asset size and write the untracked assets file
    else {
      checkTotalAssetSize({ tracked: contentsData, untracked: untrackedData });
      this.writeUntrackedAssetsFile(targetFolder, untrackedData);
    }
  }

  private writeRemoteAssetsManifest(
    targetFolder: string,
    assetPackName: string,
    contentsData: IAssetEntryHashmap,
    untrackedData: IAssetEntryHashmap
  ) {
    const assetPackManifest = this.createAssetPackManifest(
      contentsData,
      untrackedData,
      assetPackName
    );
    const manifestPath = path.resolve(targetFolder, `${assetPackName}.json`);
    fs.writeFileSync(manifestPath, JSON.stringify(sortJsonKeys(assetPackManifest), null, 2));
  }

  /**
   * Create AssetPack format manifest for remote asset packs
   * @param assetEntries Tracked asset entries
   * @param missingEntries Untracked asset entries (treated as overridesOnly)
   * @param assetPackName Name of the asset pack (used as flow_name and for prefixing paths)
   */
  private createAssetPackManifest(
    assetEntries: IAssetEntryHashmap,
    missingEntries: IAssetEntryHashmap,
    assetPackName: string
  ): FlowTypes.AssetPack {
    // Convert hashmap to array
    const rows: FlowTypes.Data_listRow<IAssetEntry>[] = [
      ...this.convertAssetEntriesToRows(assetEntries, false),
      ...this.convertAssetEntriesToRows(missingEntries, true),
    ];

    // Create AssetPack format manifest
    return {
      flow_type: "asset_pack",
      flow_name: assetPackName,
      rows,
    };
  }

  /**
   * Convert asset entries hashmap to array of rows
   * @param entries Asset entries hashmap
   * @param overridesOnly Whether these entries are overridesOnly
   */
  private convertAssetEntriesToRows(
    entries: IAssetEntryHashmap,
    overridesOnly: boolean
  ): FlowTypes.Data_listRow<IAssetEntry>[] {
    return Object.entries(entries).map(([assetPath, entry]) => {
      // For overridesOnly entries, use values from first override
      let md5Checksum = entry.md5Checksum;
      let size_kb = entry.size_kb;
      if (overridesOnly && entry.overrides) {
        const firstTheme = Object.keys(entry.overrides)[0];
        const firstLang = firstTheme ? Object.keys(entry.overrides[firstTheme])[0] : undefined;
        const firstOverride =
          firstTheme && firstLang ? entry.overrides[firstTheme][firstLang] : undefined;

        if (firstOverride) {
          md5Checksum = firstOverride.md5Checksum;
          size_kb = firstOverride.size_kb;
        }
      }

      const row: FlowTypes.Data_listRow<IAssetEntry> = {
        id: assetPath,
        md5Checksum,
        size_kb,
        ...(overridesOnly && { overridesOnly: true }),
        ...(entry.filePath && { filePath: entry.filePath }),
        ...(entry.overrides && { overrides: entry.overrides }),
      };

      return row;
    });
  }

  /**
   * Write asset contents file to the target folder
   * @param targetFolder Target folder to write files to
   * @param assetEntries Tracked asset entries to write
   */
  private writeAssetsContentsFile(targetFolder: string, assetEntries: IAssetEntryHashmap) {
    if (fs.existsSync(targetFolder)) {
      const contentsTarget = path.resolve(targetFolder, "contents.json");
      fs.writeFileSync(contentsTarget, JSON.stringify(sortJsonKeys(assetEntries), null, 2));
    }
  }

  /**
   * Write untracked assets file to the target folder
   * @param targetFolder Target folder to write files to
   * @param missingEntries Untracked asset entries
   */
  private writeUntrackedAssetsFile(targetFolder: string, missingEntries: IAssetEntryHashmap) {
    if (fs.existsSync(targetFolder)) {
      // Write untracked file if there are untracked entries
      const missingTarget = path.resolve(targetFolder, "untracked-assets.json");
      if (fs.existsSync(missingTarget)) fs.removeSync(missingTarget);
      if (Object.keys(missingEntries).length > 0) {
        logWarning({
          msg1: "Assets override found without corresponding entry",
          msg2: Object.keys(missingEntries).join("\n"),
        });
        fs.writeFileSync(missingTarget, JSON.stringify(sortJsonKeys(missingEntries), null, 2));
      }
    }
  }

  /**
   * Clean up old remote asset pack folders that are no longer in the config
   */
  private cleanupOldRemoteAssetFolders(outputPath: string, currentFolders: Set<string>) {
    const remoteAssetsBasePath = path.resolve(outputPath, "remote_assets");
    if (!fs.existsSync(remoteAssetsBasePath)) {
      return;
    }

    const existingFolders = fs
      .readdirSync(remoteAssetsBasePath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const folderName of existingFolders) {
      if (!currentFolders.has(folderName)) {
        const oldFolderPath = path.resolve(remoteAssetsBasePath, folderName);
        fs.removeSync(oldFolderPath);
        logOutput({
          msg1: "Removed unused asset pack",
          msg2: `remote_assets/${folderName}`,
        });
      }
    }
  }
}
