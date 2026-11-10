import {
  GDRIVE_FILE_SCOPES,
  GDRIVE_READ_SCOPES,
  hasAuthTokenScopes,
} from "@idemsInternational/gdrive-tools";
import { IDeploymentConfigJson } from "../../../../commands/deployment/common";
import { AUTH_TOKEN_PATH } from "../../../../paths";
import { loadExternalConfig, readExternalSourcePath } from "../deploymentConfig";

/** Google drive auth token for a deployment, falling back to the shared scripts token */
export function getAuthTokenPath(deploymentConfig: IDeploymentConfigJson) {
  return deploymentConfig.google_drive?.auth_token_path || AUTH_TOKEN_PATH;
}

/** Whether google drive is authorized to create sheets without asking the user to sign in */
export async function canCreateFlowSheets() {
  return hasStoredAuth(GDRIVE_FILE_SCOPES);
}

/** Whether google drive is authorized to download sheets without asking the user to sign in */
export async function canDownloadSheets() {
  return hasStoredAuth(GDRIVE_READ_SCOPES);
}

async function hasStoredAuth(scopes: string[]) {
  const deploymentConfig = await loadExternalConfig(readExternalSourcePath());
  return hasAuthTokenScopes(getAuthTokenPath(deploymentConfig), scopes);
}
