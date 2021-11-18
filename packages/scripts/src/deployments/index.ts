/**
 * Return deployment configuration for the current specified deployment
 * TODO - add support for setting/getting different deployments
 */
export function getActiveDeployment(): IDeploymentConfig {
  return defaultConfig;
}

/** WiP - TODO */
export function setActiveDeployment() {
  // check config, create if not exist
  // clear cache folders
  // prompt data sync
}

/** WiP - TODO */
export function createDeployment(name: string) {}

/** WiP - TODO */
export function deleteDeployment(name: string) {}

interface IDeploymentConfig {
  name: string;
  GOOGLE_DRIVE: {
    /** Folder name to search for google drive sheets */
    SHEETS_FOLDER: string;
    /** Folder name to search for google drive assets */
    ASSETS_FOLDER: string;
  };
}

const defaultConfig: IDeploymentConfig = {
  name: "plh",
  GOOGLE_DRIVE: {
    SHEETS_FOLDER: "plh_sheets_beta",
    ASSETS_FOLDER: "plh_assets",
  },
};
