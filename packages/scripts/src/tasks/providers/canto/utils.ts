import path from "path";
import { CantoManifest, CantoManifestEntry } from "./types";
import { WorkflowRunner } from "../../../commands/workflow/run";
import { DEFAULT_APP_LANGUAGE_CODE } from "data-models";
import { logWarning } from "../../../utils";
import {
  CANTO_CUSTOM_FIELD_LANGUAGE_LABEL,
  CANTO_CUSTOM_FIELD_THEME,
  DEFAULT_CANTO_LANGUAGE_CODES,
  DEFAULT_THEME_NAME,
} from "./constants";
import { getCantoCustomFieldValue, getCantoCustomFieldValues } from "./remote-assets";

export function getCantoConfig() {
  const { canto } = WorkflowRunner.config;
  if (!canto) {
    throw new Error("Canto configuration is missing in deployment config.");
  }
  return canto;
}

/**
 * Path of a file relative to the deployment's Canto source folder, as determined by the
 * albums the file belongs to (i.e. excluding any theme or language variation folders)
 */
export function getAssetPathName(fileEntry: CantoManifestEntry, cantoFolderID: string) {
  // File may appear in multiple albums, so find the path that includes the deployment's source folder ID
  const albumDetails = fileEntry.relatedAlbums?.find((album) =>
    album.idPath?.split("/").includes(cantoFolderID)
  );
  if (!albumDetails) {
    throw new Error(
      `Canto album path not found for file "${fileEntry.name}" in "${cantoFolderID}"`
    );
  }
  const { idPath, namePath } = albumDetails;
  if (!idPath || !namePath) {
    throw new Error(`Canto album path metadata missing for file "${fileEntry.name}"`);
  }
  // Paths below the configured source folder become the relative asset path.
  const idPathSegments = idPath.split("/");
  const namePathSegments = namePath.split("/");
  const folderIndex = idPathSegments.indexOf(cantoFolderID);
  if (folderIndex === -1) {
    throw new Error(
      `Canto folder "${cantoFolderID}" not found in album path for file "${fileEntry.name}"`
    );
  }
  const relativePathSegments = namePathSegments.slice(folderIndex + 1);
  // Use posix paths so keys match generateFolderFlatMap on all platforms (Windows uses `\` in path.join).
  return path.posix.join(...relativePathSegments, fileEntry.name);
}

/**
 * Local path of a file relative to its source folder root, including any theme and language
 * variation folders (matching the folder structure produced by gdrive, for consumption by the
 * assets post-processor).
 *
 * Canto stores variations as custom fields rather than folders, so all variants of an asset share
 * a single album path and filename. The variation folders must therefore be included as soon as
 * files are written to disk, as otherwise variants would overwrite each other on download.
 */
export function getLocalFilePath(fileEntry: CantoManifestEntry, cantoFolderID: string) {
  const variationFolders = [getThemeVariation(fileEntry), getLanguageVariation(fileEntry)].filter(
    Boolean
  );
  return path.posix.join(...variationFolders, getAssetPathName(fileEntry, cantoFolderID));
}

/** Theme variation folder for a file, omitted for files belonging to the default theme */
export function getThemeVariation(fileEntry: CantoManifestEntry) {
  const theme = getCantoCustomFieldValue(fileEntry, CANTO_CUSTOM_FIELD_THEME);
  return theme === DEFAULT_THEME_NAME ? undefined : theme;
}

/** Language variation folder for a file, omitted for files in the deployment's default language */
export function getLanguageVariation(fileEntry: CantoManifestEntry) {
  const defaultLanguage =
    WorkflowRunner.config.app_config?.APP_LANGUAGES?.default || DEFAULT_APP_LANGUAGE_CODE;
  const languageCodes = getLanguageCodes(fileEntry);
  // Files assigned multiple languages, one of which is the default, are used as the default asset
  if (languageCodes.length === 0 || languageCodes.includes(defaultLanguage)) {
    return undefined;
  }
  return languageCodes[0];
}

/** App language codes assigned to a file, converted from their Canto language labels */
function getLanguageCodes(fileEntry: CantoManifestEntry) {
  const languageMappings = {
    ...DEFAULT_CANTO_LANGUAGE_CODES,
    ...WorkflowRunner.config.canto?.languageMappings,
  };
  return getCantoCustomFieldValues(fileEntry, CANTO_CUSTOM_FIELD_LANGUAGE_LABEL).map(
    (languageLabel) => languageMappings[languageLabel] || languageLabel
  );
}

/**
 * Non-default languages assigned to a file that will not be populated, as a file can only be
 * stored at a single language path. Files that include the default language are excluded, as those
 * are intentionally shared between languages rather than language variations.
 */
function getAdditionalLanguageVariations(fileEntry: CantoManifestEntry) {
  const languageVariation = getLanguageVariation(fileEntry);
  if (!languageVariation) {
    return [];
  }
  return getLanguageCodes(fileEntry).filter((languageCode) => languageCode !== languageVariation);
}

/**
 * Map local file paths to the manifest entry they should be populated from. Used by both the
 * download and restructure steps, so that they always operate on the same set of files.
 *
 * Multiple entries can resolve to the same path if the same filename has been uploaded more than
 * once to a Canto album (with matching theme and language fields), in which case a single entry is
 * chosen deterministically to avoid the file alternating between syncs.
 *
 * @param options.logWarnings Report entries that cannot be fully represented on disk. Enabled by
 * the restructure step only, as it always follows download, so warnings appear once per sync.
 */
export function getManifestFileMap(
  manifest: CantoManifest,
  cantoFolderID: string,
  options: { logWarnings?: boolean } = {}
) {
  const fileMap = new Map<string, CantoManifestEntry>();
  const duplicates: string[] = [];
  const unusedLanguages: string[] = [];
  for (const file of manifest) {
    const localPath = getLocalFilePath(file, cantoFolderID);
    const additionalLanguages = getAdditionalLanguageVariations(file);
    if (additionalLanguages.length > 0) {
      unusedLanguages.push(`${localPath} (also assigned ${additionalLanguages.join(", ")})`);
    }
    const existing = fileMap.get(localPath);
    if (existing) {
      const conflictingIds = [existing.id, file.id].sort();
      const isSameContent = existing.md5 && existing.md5 === file.md5;
      duplicates.push(
        `${localPath} [${conflictingIds.join(", ")}]${isSameContent ? "" : " (differing content)"}`
      );
      // Retain the first id alphabetically, so that the same entry is used on every sync
      if (conflictingIds[0] === existing.id) continue;
    }
    fileMap.set(localPath, file);
  }
  if (options.logWarnings) {
    if (duplicates.length > 0) {
      logWarning({
        msg1: `${duplicates.length} Canto asset(s) appear multiple times at the same path`,
        msg2: `Only one version of each will be used:\n${duplicates.join("\n")}`,
      });
    }
    if (unusedLanguages.length > 0) {
      logWarning({
        msg1: `${unusedLanguages.length} Canto asset(s) are assigned multiple non-default languages`,
        msg2: `Only the first language will be populated:\n${unusedLanguages.join("\n")}`,
      });
    }
  }
  return fileMap;
}

export function getOutputFolder(folderId?: string) {
  const { _workspace_path } = WorkflowRunner.config;
  return path.resolve(_workspace_path, "tasks", "canto", "outputs", folderId || "");
}
