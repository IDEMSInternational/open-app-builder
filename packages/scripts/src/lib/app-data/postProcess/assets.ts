import * as path from "path";
import * as fs from "fs-extra";
import chalk from "chalk";
import {
  generateFolderFlatMap,
  Logger,
  IContentsEntry,
  logOutput,
  logWarning,
  createTempDir,
  IContentsEntryHashmap,
  kbToMB,
  setNestedProperty,
  replicateDir,
  sortJsonKeys,
  getNestedProperty,
  copyFileWithTimestamp,
} from "../../../utils";
import { ActiveDeployment } from "../../../commands/deployment/get";
import type { IAssetEntryHashmap, IAssetContentsEntryMinimal, IAssetEntry } from "data-models";
import type { FlowTypes } from "data-models";
import { resolve } from "path";

/**
 * Legacy folder used to differentiate language assets
 * Any assets placed in this folder will be treated as parent-level
 */
const ASSETS_GLOBAL_FOLDER_NAME = "global";

/** Approximate size of core build as populated to www folder (excluding assets) */
const APP_CORE_BUILD_KB = 7 * 1024;
/** Approximate size of core assets as populated to www folder (excluding assets/app_data) */
const APP_CORE_ASSETS_KB = 5 * 1024;
const APP_CORE_SIZE_KB = {
  total: APP_CORE_BUILD_KB + APP_CORE_ASSETS_KB,
};

interface IAssetFolderMetadata {
  /** Whether this folder contains remote assets (asset pack) */
  remote?: boolean;
  /** Name of the folder (used for remote asset pack output directory) */
  folderName?: string;
}

interface IAssetPostProcessorOptions {
  sourceAssetsFolders: string[];
  /** Map of source folder path to metadata (remote flag and folder name) */
  folderMetadata?: Map<string, IAssetFolderMetadata>;
}

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
export class AssetsPostProcessor {
  private activeDeployment = ActiveDeployment.get();
  constructor(private options: IAssetPostProcessorOptions) {}

  public run() {
    const { app_data } = this.activeDeployment;
    const { sourceAssetsFolders, folderMetadata = new Map() } = this.options;
    const { _parent_config } = this.activeDeployment;
    const appAssetsFolder = path.resolve(app_data.output_path, "assets");
    fs.ensureDirSync(appAssetsFolder);

    // Include parent config in list of source assets
    // TODO - may want to reconsider this functionality in the future given ability to use
    // multiple input sources instead
    if (_parent_config) {
      const parentAssetsFolder = path.resolve(_parent_config._workspace_path, "app_data", "assets");
      fs.ensureDirSync(parentAssetsFolder);
      sourceAssetsFolders.unshift(parentAssetsFolder);
    }

    // Separate core assets and remote assets for separate processing
    const coreAssetsHashmap: IContentsEntryHashmap = {};
    const remoteAssetsBySourceFolder = new Map<string, IContentsEntryHashmap>();

    for (const sourceAssetsFolder of sourceAssetsFolders) {
      const sourceAssets = generateFolderFlatMap(sourceAssetsFolder, { includeLocalPath: true });
      const sourceAssetsFiltered = this.filterAppAssets(sourceAssets);
      const sourceMetadata = folderMetadata.get(sourceAssetsFolder);
      const isSourceRemote = sourceMetadata?.remote === true;

      if (isSourceRemote) {
        // Track remote assets by source folder
        if (!remoteAssetsBySourceFolder.has(sourceAssetsFolder)) {
          remoteAssetsBySourceFolder.set(sourceAssetsFolder, {});
        }
        const remoteAssets = remoteAssetsBySourceFolder.get(sourceAssetsFolder)!;
        Object.assign(remoteAssets, sourceAssetsFiltered);
      } else {
        // Core assets - merge into coreAssetsHashmap (later folders can overwrite earlier ones)
        Object.assign(coreAssetsHashmap, sourceAssetsFiltered);
      }
    }

    // Process and write core assets
    if (Object.keys(coreAssetsHashmap).length > 0) {
      this.processAndWriteAssets(coreAssetsHashmap, appAssetsFolder);
    }

    // Process and write remote assets (one folder per asset pack)
    const currentRemoteAssetFolders = new Set<string>();
    for (const [sourceFolder, remoteAssets] of remoteAssetsBySourceFolder.entries()) {
      const metadata = folderMetadata.get(sourceFolder);
      if (!metadata?.folderName) continue;

      const remoteAssetsFolder = path.resolve(
        app_data.output_path,
        "remote_assets",
        metadata.folderName
      );
      // Delete any existing folder to ensure clean state
      if (fs.existsSync(remoteAssetsFolder)) {
        fs.removeSync(remoteAssetsFolder);
      }
      fs.ensureDirSync(remoteAssetsFolder);
      this.processAndWriteAssets(remoteAssets, remoteAssetsFolder, metadata.folderName);
      currentRemoteAssetFolders.add(metadata.folderName);
    }

    // Clean up old asset pack folders that are no longer in the config
    this.cleanupOldRemoteAssetFolders(app_data.output_path, currentRemoteAssetFolders);

    console.log(chalk.green("Asset Process Complete"));
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
    this.assetsQualityCheck(stagingDir);

    // Process asset overrides
    const assetsByType = this.handleAssetOverrides(assetsHashmap);

    // Check total asset size (only for core assets)
    if (!assetPackName) {
      this.checkTotalAssetSize(assetsByType);
    }

    // Copy staging directory to target folder
    replicateDir(stagingDir, targetFolder);
    fs.removeSync(stagingDir);

    // Write manifest files
    if (assetPackName) {
      // Write AssetPack format manifest for remote asset packs
      this.writeAssetPackManifest(
        targetFolder,
        assetsByType.tracked,
        assetsByType.untracked,
        assetPackName
      );
    } else {
      // Write contents.json for core assets
      this.writeAssetsContentsFiles(targetFolder, assetsByType.tracked, assetsByType.untracked);
    }
  }

  /**
   * Write AssetPack format manifest for remote asset packs
   * @param targetFolder Target folder to write manifest to
   * @param assetEntries Tracked asset entries
   * @param missingEntries Untracked asset entries (treated as overridesOnly)
   * @param assetPackName Name of the asset pack (used as flow_name and for prefixing paths)
   */
  private writeAssetPackManifest(
    targetFolder: string,
    assetEntries: IAssetEntryHashmap,
    missingEntries: IAssetEntryHashmap,
    assetPackName: string
  ) {
    if (!fs.existsSync(targetFolder)) {
      return;
    }

    // Convert hashmap to array
    const rows: FlowTypes.Data_listRow<IAssetEntry>[] = [
      ...this.convertAssetEntriesToRows(assetEntries, false),
      ...this.convertAssetEntriesToRows(missingEntries, true),
    ];

    // Create AssetPack format manifest
    const assetPack: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: assetPackName,
      rows: rows,
    };

    // Write manifest file with asset pack name
    const manifestPath = path.resolve(targetFolder, `${assetPackName}.json`);
    fs.writeFileSync(manifestPath, JSON.stringify(sortJsonKeys(assetPack), null, 2));
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
   * Write asset contents files to the target folder
   * @param targetFolder Target folder to write files to
   * @param assetEntries Tracked asset entries to write
   * @param missingEntries Untracked asset entries (only written if entries exist)
   */
  private writeAssetsContentsFiles(
    targetFolder: string,
    assetEntries: IAssetEntryHashmap,
    missingEntries: IAssetEntryHashmap
  ) {
    if (fs.existsSync(targetFolder)) {
      const contentsTarget = path.resolve(targetFolder, "contents.json");
      fs.writeFileSync(contentsTarget, JSON.stringify(sortJsonKeys(assetEntries), null, 2));

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

  /**
   * Take a list of all potential app assets and return a list of only those that match
   * both app asset filter functions and language code filter functions
   */
  private filterAppAssets(sourceAssets: { [relativePath: string]: IContentsEntry }) {
    const filtered: typeof sourceAssets = {};
    const { assets_filter_function } = this.activeDeployment.app_data;
    const { filter_language_codes } = this.activeDeployment.translations;
    // themes are defined in runtime app config which may not be available during scripts
    const filter_theme_names = this.activeDeployment.app_config.APP_THEMES?.available || [];

    // remove contents file from gdrive download
    delete sourceAssets["_contents.json"];

    // individual file filter function - includes global filter as well as language and theme filters
    function shouldInclude(entry: IContentsEntry) {
      const assetPaths = entry.relativePath.split("/");
      const assetLang = assetPaths.find((p) => (isCountryLanguageCode(p) ? p : false));
      let assetTheme = assetPaths.find((p) => isThemeAssetsFolderName(p));
      if (assetTheme) {
        assetTheme = assetTheme.replace("theme_", "");
      }
      // filter based on language, theme or function
      if (assetLang && filter_language_codes && !filter_language_codes.includes(assetLang))
        return false;
      if (assetTheme && !filter_theme_names.includes(assetTheme)) return false;
      if (assets_filter_function && !assets_filter_function(entry)) return false;
      // exclude metadata file populated by gdrive downloader
      if (entry.relativePath === "_metadata.json") return false;

      return true;
    }
    // process files
    Object.entries(sourceAssets).forEach(([name, entry]) => {
      if (shouldInclude(entry)) {
        filtered[name] = entry;
      }
    });
    return filtered;
  }

  private assetsQualityCheck(sourceFolder: string) {
    // TODO - add any relevant checks
    // (previously checked asset folder names but no longer relevant)
  }

  private checkTotalAssetSize(sourceAssets: IAssetEntriesByType) {
    let totalSize = APP_CORE_SIZE_KB.total;
    let themeAndLanguageSizes = {
      app_core: APP_CORE_SIZE_KB,
      theme_default: { total: 0, global: 0 },
    };
    Object.values(sourceAssets.tracked).forEach((entry) => {
      totalSize += entry.size_kb;
      themeAndLanguageSizes.theme_default.total += entry.size_kb;
      themeAndLanguageSizes.theme_default.global += entry.size_kb;
      if (entry.overrides) {
        Object.entries(entry.overrides).forEach(([themeName, languageEntries]) => {
          Object.entries(languageEntries).forEach(([languageCode, languageEntry]) => {
            const assetSize = languageEntry.size_kb;
            totalSize += assetSize;
            themeAndLanguageSizes[themeName] ??= {};
            themeAndLanguageSizes[themeName].total ??= 0;
            themeAndLanguageSizes[themeName].total += assetSize;
            themeAndLanguageSizes[themeName][languageCode] ??= 0;
            themeAndLanguageSizes[themeName][languageCode] += assetSize;
          });
        });
      }
    });

    const themeLangSizesMBSummary = Object.entries(themeAndLanguageSizes)
      .map(([themeName, themeEntry]) => {
        const languageBreakdown = Object.entries(themeEntry)
          .map(([language, size]) => `${language}: ${kbToMB(size)} MB`)
          .join("\n    ");
        return `${themeName}:\n  ${languageBreakdown}`;
      })
      .join("\n");
    const totalSizeMB = kbToMB(totalSize);
    const maxWarningSize = 150;
    if (totalSizeMB > maxWarningSize) {
      logWarning({
        msg1: `Asset files too large`,
        msg2: `All assets should combine to be less than ${maxWarningSize}MB`,
      });
    }

    logOutput({
      msg1: "Assets Summary",
      msg2: `Total size: ${totalSizeMB} MB\n\nBreakdown by theme and language:\n${themeLangSizesMBSummary}`,
    });
  }

  /**
   * Make a list of any source assets that have language-code or theme overrides,
   * and any language assets that are missing corresponding globals.
   * Flatten override files to sit alongside their target assets
   */
  private handleAssetOverrides(sourceAssets: IContentsEntryHashmap) {
    const entries: IAssetEntriesByType = {
      tracked: {},
      untracked: {},
    };
    // split assets to separate global, translated and theme assets
    Object.entries(sourceAssets).forEach(([relativePath, entry]) => {
      const assetEntry = this.contentsToAssetEntry(entry);
      const pathSegments = relativePath.split("/");

      let themeVariation = pathSegments.find((segment) => isThemeAssetsFolderName(segment));
      let langVariation = pathSegments.find((segment) => isCountryLanguageCode(segment));
      let assetPathName = relativePath;

      let overridePath = "";

      // Remove additional nesting for default lang and theme folders
      assetPathName = assetPathName
        .replace(`${ASSETS_GLOBAL_FOLDER_NAME}/`, "")
        .replace(`theme_default/`, "");

      // If using overrides ensure both theme and language provided, and place in corresponding folder
      if (themeVariation || langVariation) {
        themeVariation ??= "theme_default";
        langVariation ??= ASSETS_GLOBAL_FOLDER_NAME;
        // Replace override segments to leave named asset segment path
        assetPathName = assetPathName
          .replace(`${themeVariation}/`, "")
          .replace(`${langVariation}/`, "");

        overridePath = `overrides.${themeVariation}.${langVariation}`;
      }

      // Provide explicit path to file when not same as entry name (e.g. overrides)
      if (entry.relativePath !== assetPathName) {
        assetEntry.filePath = relativePath;
      }
      if (getNestedProperty(entries.tracked[assetPathName], overridePath)) {
        Logger.error({
          msg1: "Duplicate overrides detected",
          msg2: `${assetPathName} [${themeVariation}] [${langVariation}]`,
          logOnly: true,
        });
      }

      // Merge overrides or top-level asset data into main entries
      entries.tracked[assetPathName] = setNestedProperty(
        overridePath,
        assetEntry,
        entries.tracked[assetPathName]
      );
    });

    // Check for assets which have no default version, and move them to "untracked"
    Object.entries(entries.tracked).forEach(([assetPathName, assetEntry]) => {
      if (assetEntry.overrides && !assetEntry.md5Checksum) {
        entries.untracked[assetPathName] = assetEntry;
        delete entries.tracked[assetPathName];
      }
    });
    return entries;
  }

  /** Strip additional fields from contents entry to provide cleaner asset entry */
  private contentsToAssetEntry(entry: IContentsEntry): IAssetContentsEntryMinimal {
    const { md5Checksum, size_kb } = entry;
    return { size_kb, md5Checksum };
  }
}

/**
 * Check whether a string matches the expected format for the
 * name of a folder containing theme-specific assets.
 * Currently expects name to begin 'theme_'
 */
function isThemeAssetsFolderName(str: string) {
  return str.startsWith("theme_");
}

/**
 * Simple regex to try and match standard country-language format
 * Currently restricted to any codes in the format `ab_ab` or `ab_abc`
 */
function isCountryLanguageCode(str: string) {
  const regex = /^[a-z]{2}_[a-z]{2,3}$/gi;
  return regex.test(str);
}

interface IAssetEntriesByType {
  /** Assets that have a global in the default theme, including their respective overrides */
  tracked: IAssetEntryHashmap;
  /** Assets that appear in translation or theme folders but have no corresponding global in the default theme */
  untracked: IAssetEntryHashmap;
}
