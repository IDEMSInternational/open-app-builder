import { CANTO_ACCESS_TOKEN_PATH } from "../../../paths";
import { differenceInCalendarDays } from "date-fns";
import { getJsonFromFile } from "../../../utils";
import * as fs from "fs-extra";
import path from "path";
import { WorkflowRunner } from "../../../commands/workflow/run";

interface CantoAuthResponse {
  access_token: string;
  expires_in: string;
  token_type: string;
  refresh_token: null | string;
}
interface AccessToken {
  accessToken: string;
  expiresAt: number;
}

const OAUTH_BASE_URL = "https://oauth.canto.com";

const ensureValidAccessToken = async () => {
  const accessTokenPath = getAccessTokenPath();
  let accessToken = getJsonFromFile(accessTokenPath) as AccessToken;
  // Re-authorize if existing token has a day or less before expiry (including a negative number)
  // NB: Canto access tokens are valid for 30 days
  if (!accessToken || differenceInCalendarDays(accessToken.expiresAt, Date.now()) <= 1) {
    accessToken = await authorize();
  }
  return accessToken.accessToken;
};

const authorize = async () => {
  const accessTokenPath = getAccessTokenPath();
  if (fs.existsSync(accessTokenPath)) {
    fs.removeSync(accessTokenPath);
  }
  const data = await getAccessToken();
  const accessTokenJson = {
    accessToken: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in) * 1000,
  };
  fs.ensureDirSync(path.dirname(accessTokenPath));
  fs.writeFileSync(accessTokenPath, JSON.stringify(accessTokenJson));
  return accessTokenJson;
};

const getAccessToken = async () => {
  const { config } = WorkflowRunner;
  const { appId, appSecret } = config.canto;
  const url = `${OAUTH_BASE_URL}/oauth/api/oauth2/compatible/token?app_id=${appId}&app_secret=${appSecret}&grant_type=client_credentials`;
  const response = await fetch(url, { method: "POST" });
  const data = await response.json();
  return data as CantoAuthResponse;
};

const getAccessTokenPath = () => {
  const { config } = WorkflowRunner;
  const { _workspace_path } = config;
  const { accessTokenPath } = config.canto;
  const resolvedAccessTokenPath = accessTokenPath
    ? path.resolve(_workspace_path, accessTokenPath)
    : CANTO_ACCESS_TOKEN_PATH;
  return resolvedAccessTokenPath;
};

export { authorize, ensureValidAccessToken };
