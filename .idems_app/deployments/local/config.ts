import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("local");

// NOTE - local deployment does not download from google drive but still uses
// folder IDs to mock download process
config.google_drive={assets_folder_id:'assets',sheets_folder_id:'sheets'}

config.app_data.output_path= "./app_data"

export default config;
