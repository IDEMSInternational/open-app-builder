import { generateDeploymentConfig } from "scripts";

const config = generateDeploymentConfig("debug_gdrive_multiple");

config.google_drive = {
  sheets_folder_ids: ["15pDlhePVpTt0XeVsqBrWYToDCK5j-T9F","1kaOxdi3OSNylOmS3YTzLwFnGgTZX9DrM"],
  assets_folder_ids: ["1xy5z6PQmsrgwLpCCs6HCCUY1-u2H5KYR","1nlRfAkYfqxM-z_FAzt1WXyES_DyFTlmi"],
};

config.app_data.output_path = "./app_data";


// Override any app constants here
config.app_config.APP_HEADER_DEFAULTS.title = "Debug Data Sources";
config.app_config.APP_SIDEMENU_DEFAULTS.title = "Debug Data Sources";

export default config;
