import type { IAppConfig } from "./appConfig";

export interface IDeploymentConfig {
  /** Friendly name used to identify the deployment name */
  name: string;

  google_drive: {
    /** ID of folder containing app sheets, as seen in end of url */
    sheets_folder_id: string;
    /** ID of folder containing app assets, as seen in end of url */
    assets_folder_id: string;
    /** generated gdrive access token. Default `packages/scripts/config/token.json` */
    auth_token_path?: string;
    /** filter function applied to sheets download that receives basic file info such as folder and id. Default `(gdriveEntry)=>true` */
    sheets_filter_function?: (gdriveEntry: IGdriveEntry) => boolean;
    /** filter function applied to assets download that receives basic file info such as folder and id. Default `(gdriveEntry)=>true` */
    assets_filter_function?: (gdriveEntry: IGdriveEntry) => boolean;
  };
  local_drive: {
    /** Location to sheets folder if working from local drive instead of google */
    sheets_path: string;
    /** Location to assets folder if working from local drive instead of google */
    assets_path: string;
  };
  android: {
    /** Location of source android assets (splash and launcher source images). */
    icon_asset_path?: string;
    splash_asset_path?: string;
    icon_asset_foreground_path?: string;
    icon_asset_background_path?: string;
  };
  /** Optional override of any provided constants from data-models/constants */
  app_config: IAppConfig;
  app_data: {
    /** Folder to populate processed content. Default `packages/app-data` */
    output_path: string;
    /** filter function that receives converted flows. Default `(flow)=>true`*/
    sheets_filter_function: (flow: IFlowTypeBase) => boolean;
    /** filter function that receives basic file info such as relativePath and size. Default `(fileEntry)=>true`*/
    assets_filter_function: (fileEntry: IContentsEntry) => boolean;
  };
  git: {
    /** Url of external git repo to store content */
    content_repo?: string;
    /** Current tag of content for release */
    content_tag_latest?: string;
  };
  translations: {
    /** List of all language codes to include. Default null (includes all) */
    filter_language_codes?: string[];
    /** generated output of list of strings to translate. Default `./app_data/translations_source/source_strings` */
    source_strings_path?: string;
    /** translated string for import. Default `./app_data/translations_source/translated_strings */
    translated_strings_path?: string;
  };
  workflows: {
    /** path to custom workflow files to include */
    custom_ts_files: string[];
    /** path for task working directory. Default `./tasks` */
    task_cache_path: string;
  };
  /** 3rd party integration for logging services */
  error_logging?: {
    /** sentry/glitchtip logging dsn */
    dsn: string;
  };
  /** track whether deployment processed from default config */
  _validated: boolean;
  /** version number added from scripts to recompile on core changes */
  _version: number;
  /** track parent config  */
  _parent_config?: Partial<IDeploymentConfig & { _workspace_path: string }>;
}

/** Full example of just all config once merged with defaults */
export const DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS: IDeploymentConfig = {
  name: "Full Config Example",
  google_drive: {
    assets_folder_id: "",
    sheets_folder_id: "",
    auth_token_path: "packages/scripts/config/token.json",
    sheets_filter_function: (gdriveEntry) => true,
    assets_filter_function: (gdriveEntry) => true,
  },
  android: {},
  app_config: {} as any, // populated by `getDefaultAppConstants()`,
  local_drive: {
    assets_path: "./assets",
    sheets_path: "./sheets",
  },
  app_data: {
    // TODO - change to local ./app-data folder once git repos in use
    output_path: "packages/app-data",
    sheets_filter_function: (flow) => true,
    assets_filter_function: (fileEntry) => true,
  },
  translations: {
    filter_language_codes: null,
    source_strings_path: "./app_data/translations_source/source_strings",
    translated_strings_path: "./app_data/translations_source/translated_strings",
  },
  workflows: {
    custom_ts_files: [],
    task_cache_path: "./tasks",
  },
  git: {},
  _validated: true,
  _parent_config: null,
  _version: 1.0,
};

/** Duplicate type defintion from scripts (TODO - find better way to share) */
interface IContentsEntry {
  relativePath: string;
  size_kb: number;
  modifiedTime: string;
  md5Checksum: string;
}

/** Duplicate type definition from gdrive-downloader (TODO - find better way to share) */
interface IGdriveEntry {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  folderPath: string;
  // only appears on xlsx uploaded files (not gsheet)
  fullFileExtension?: string;
  fileExtension?: string;
  md5Checksum?: string;
  size?: string;
}

/** Duplicate type defintion from data-models (TODO - find better way to share) */
interface IFlowTypeBase {
  flow_type: string;
  flow_name: string;
  flow_subtype?: string;
  status: "draft" | "released";
}

type IContentsEntryMinimal = Omit<IContentsEntry, "relativePath" | "modifiedTime">;

export interface IAssetEntry extends IContentsEntryMinimal {
  translations?: { [language_code: string]: IContentsEntryMinimal };
  themeVariations?: { [theme_name: string]: IContentsEntryMinimal };
}
export type IAssetEntryHashmap = { [assetPath: string]: IAssetEntry };
