export interface IDeploymentConfig {
  /** Friendly name used to identify the deployment name */
  name: string;
  google_drive: {
    /** ID of folder containing app sheets, as seen in end of url */
    sheets_folder_id: string;
    /** ID of folder containing app assets, as seen in end of url */
    assets_folder_id: string;
    /** cache of downloaded gdrive files (default to ./cache/gdrive) */
    cache_path?: string;
    /** generated gdrive access token (defaults to shared config folder) */
    auth_token_path?: string;
  };
  app_data?: {
    /** processed sheets for use in app (defaults to ./app_data/sheets) */
    sheets_output_path?: string;
    /** partially compiled sheets for use in repopulation (defaults to ./cache/converted_sheets) */
    converted_cache_path?: string;
    /** processed assets for use in app (defaults to ./app_data/assets) */
    assets_output_path?: string;
  };
  translations?: {
    /** */
    translated_jsons_path?: string;
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
  },
  app_data: {
    sheets_output_path: "./app_data/sheets",
    converted_cache_path: "./cache/converted_sheets",
    assets_output_path: "./app_data/assets",
  },
  translations: {
    translated_jsons_path: "./app_data/translations/translated_jsons",
  },
};
