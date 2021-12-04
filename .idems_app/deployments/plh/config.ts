import { IDeploymentConfig } from "../../core/models";

const config: IDeploymentConfig = {
  name: "PLH",
  google_drive: {
    sheets_folder_id: "1u3n4dI5pWvEIbuO7MXctku5ZYmKtgqPi",
    assets_folder_id: "1dp9QAQ84m8pm0IBQTSPXe1ramyynKPNn",
  },
  // Legacy mapping to output to existing workspace
  app_data: {
    sheets_output_path: "packages/app-data/data",
    assets_output_path: "packages/app-data/assets",
    sheets_filter_function: (flow) => !["conversation"].includes(flow.flow_subtype),
  },
};
export default config;
