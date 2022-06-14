import type { IAppConstants } from "./constants";

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
  /** Optional override of any provided constants from data-models/constants */
  app_constants: IAppConstants;
  app_data: {
    /** filter function that receives converted flows. Default `(flow)=>true`*/
    sheets_filter_function?: (flow: IFlowTypeBase) => boolean;
    /** filter function that receives basic file info such as relativePath and size. Default `(fileEntry)=>true`*/
    assets_filter_function?: (fileEntry: IContentsEntry) => boolean;
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
    custom_ts_files?: string[];
    /** path for task working directory. Default `./tasks` */
    task_cache_path?: string;
  };
  /** optional version number to force recompile */
  _version?: number;
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
  app_constants: {} as any, // populated by `getDefaultAppConstants()`
  app_data: {
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

/**  Subset of IContentsEntry (with additional translations) */
export interface IAssetEntry {
  size_kb: number;
  modifiedTime: string;
  md5Checksum: string;
  translations?: { [language_code: string]: IAssetEntry };
}
