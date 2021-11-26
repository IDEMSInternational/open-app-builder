export interface IAppConfig {
  name: string;
  github_repo: string;
  google_drive: {
    sheets_folder: string;
    assets_folder: string;
  };
}
