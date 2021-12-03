export interface IDeploymentConfig {
  name: string;
  github_repo: string;
  google_drive: {
    /** ID of folder containing app sheets, as seen in end of url */
    sheets_folder_id: string;
    /** ID of folder containing app assets, as seen in end of url */
    assets_folder_id: string;
    /** Where to store cache of download files (default to ./cache/gdrive) */
    cache_path?: string;
    /** Where to store generated gdrive access token (defaults to shared config folder) */
    auth_token_path?: string;
  };
}
