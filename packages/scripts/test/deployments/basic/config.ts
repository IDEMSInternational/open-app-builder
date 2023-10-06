import { generateDeploymentConfig } from "scripts";

const config = generateDeploymentConfig("basic");

config.google_drive = {
  sheets_folder_id: "",
  assets_folder_id: "",
};

config.app_data.output_path = "./relative_folder";

export default config;
