import { IDeploymentConfig } from "data-models";

const config: IDeploymentConfig = {
  name: "local",
  app_data:{
    // NOTE - sheets will be copied directly to app only and ignored from git
    sheets_output_path:'src/assets/app_data/sheets'
  }
};
export default config;
