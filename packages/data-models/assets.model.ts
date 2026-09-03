// TODO - can likely refactor to here instead and refactor other imports
import type { IContentsEntry } from "shared";

/** Extend to include fields for front-end features */
interface IAssetContentsEntry extends IContentsEntry {
  /**
   * Stores one of the following:
   * 1. For core assets: Specific path to file when not the same as relativePath, e.g. asset overrides
   * 2. For remote assets, on native devices: The path to the local file in native storage
   * 3. For remote assets, on web: The public URL for the remotely hosted file (in supabase storage)
   * */
  filePath?: string;
}

export type IAssetContentsEntryMinimal = Omit<IAssetContentsEntry, "relativePath" | "modifiedTime">;

export interface IAssetOverrideProps {
  themeName: string;
  languageCode: string;
}

export interface IAssetEntry extends IAssetContentsEntryMinimal {
  /** id field is required to convert asset contents to and from data_list format */
  id?: string;
  /** Used to indicate that the asset pack contains only overrides for the associated file, not the default asset file */
  overridesOnly?: boolean;
  overrides?: {
    [themeName: IAssetOverrideProps["themeName"]]: {
      [languageCode: IAssetOverrideProps["languageCode"]]: IAssetContentsEntryMinimal;
    };
  };
}
export type IAssetEntryHashmap = { [assetPath: string]: IAssetEntry };

/**
 * Filename of a pack's archive at a given manifest version, e.g. `my_pack.a1b2c3.zip`.
 *
 * Lives here because the build writes the file and the app fetches it, and a difference between
 * the two names is a silent whole-pack fault: every install would 404 and quietly fall back to
 * hundreds of individual requests, with nothing failing loudly enough to notice.
 *
 * The version belongs in the object key rather than in a cache-busting query parameter. Archive
 * entries are only checked against the manifest that asked for them, so a stale archive served
 * from a fixed key would install outdated bytes and have them recorded at the *new* version -
 * permanently wrong, and undetectable - and a query parameter cannot be relied on to defeat every
 * cache in the path. Keyed on the version, a stale archive is simply never requested: the app
 * derives this filename from the version its manifest carries, so it can only ask for the archive
 * built from that same manifest, and otherwise gets a 404 and takes the checksum-gated per-file
 * path.
 */
export function getAssetPackArchiveFileName(assetPackName: string, version: string) {
  return `${assetPackName}.${version}.zip`;
}
