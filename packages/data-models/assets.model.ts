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
