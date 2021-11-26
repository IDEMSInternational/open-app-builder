import { IAppConfig } from "../types/deployment.type";

const config: IAppConfig = {
  name: "Example Config",
  github_repo: "",
  google_drive: {
    sheets_folder: "idems_app_sheets",
    assets_folder: "idems_app_assets",
  },
};
export default config;
