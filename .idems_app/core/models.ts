export interface IDeploymentConfig {
  /** Friendly name used to identify the deployment name */
  name: string;
  google_drive: {
    /** ID of folder containing app sheets, as seen in end of url */
    sheets_folder_id: string;
    /** ID of folder containing app assets, as seen in end of url */
    assets_folder_id: string;
    /** cache of downloaded gdrive files. Default `./cache/gdrive` */
    cache_path?: string;
    /** generated gdrive access token. Default `packages/scripts/config/token.json` */
    auth_token_path?: string;
    /** filter function applied to sheets download that receives basic file info such as folder and id. Default `(gdriveEntry)=>true` */
    sheets_filter_function?: (gdriveEntry: IGdriveEntry) => boolean;
    /** filter function applied to assets download that receives basic file info such as folder and id. Default `(gdriveEntry)=>true` */
    assets_filter_function?: (gdriveEntry: IGdriveEntry) => boolean;
  };
  app_data?: {
    /** processed sheets for use in app. Default `./app_data/sheets` */
    sheets_output_path?: string;
    /** partially compiled sheets for use in repopulation. Default `./cache/converter` */
    converter_cache_path?: string;
    /** processed assets for use in app. Defaults `./app_data/assets` */
    assets_output_path?: string;
    /** filter function that receives converted flows. Default `(flow)=>true`*/
    sheets_filter_function?: (flow: IFlowTypeBase) => boolean;
    /** filter function that receives basic file info such as relativePath and size. Default `(fileEntry)=>true`*/
    assets_filter_function?: (fileEntry: IContentsEntry) => boolean;
  };
  translations?: {
    /** generated output of list of strings to translate. Default `./app_data/translations/source_strings` */
    source_strings_path?: string;
    /** translated string for import. Default `./app_data/translations/translated_strings */
    translated_strings_path?: string;
    /** generated output cache. Default `./cache/translations` */
    output_cache_path?: string;
  };
}

/** Minimal example of just required config */
export const DEPLOYMENT_CONFIG_EXAMPLE_MIN: IDeploymentConfig = {
  name: "Minimal Config Example",
  google_drive: { assets_folder_id: "", sheets_folder_id: "" },
};

/** Full example of just all config once merged with defaults */
export const DEPLOYMENT_CONFIG_EXAMPLE_DEFAULTS: IDeploymentConfig = {
  name: "Full Config Example",
  google_drive: {
    assets_folder_id: "",
    sheets_folder_id: "",
    auth_token_path: "packages/scripts/config/token.json",
    cache_path: "./cache/gdrive",
    sheets_filter_function: (gdriveEntry) => true,
    assets_filter_function: (gdriveEntry) => true,
  },
  app_data: {
    sheets_output_path: "./app_data/sheets",
    converter_cache_path: "./cache/converter",
    assets_output_path: "./app_data/assets",
    sheets_filter_function: (flow) => true,
    assets_filter_function: (fileEntry) => true,
  },
  translations: {
    source_strings_path: "./app_data/translations/source_strings",
    translated_strings_path: "./app_data/translations/translated_strings",
    output_cache_path: "./cache/translations",
  },
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
