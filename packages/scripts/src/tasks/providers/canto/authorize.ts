import { CANTO_ACCESS_TOKEN_PATH } from "../../../paths";
import { getJsonFromFile } from "../../../utils";
import * as fs from "fs-extra";
import fetch from "node-fetch";
import path from "path";
import { WorkflowRunner } from "../../../commands/workflow/run";
import { getCantoConfig } from "./utils";

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
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const ensureValidAccessToken = async () => {
  const accessTokenPath = getAccessTokenPath();
  let accessToken = getJsonFromFile<AccessToken>(accessTokenPath);
  // Re-authorize if existing token has a day or less before expiry (including a negative number)
  // NB: Canto access tokens are valid for 30 days
  if (!isAccessToken(accessToken) || accessToken.expiresAt - Date.now() <= ONE_DAY_MS) {
    accessToken = await authorize();
  }
  return accessToken.accessToken;
};

function isAccessToken(value: unknown): value is AccessToken {
  if (!value || typeof value !== "object") {
    return false;
  }
  const token = value as Partial<AccessToken>;
  return (
    typeof token.expiresAt === "number" &&
    typeof token.accessToken === "string" &&
    token.accessToken.length > 0
  );
}

const authorize = async () => {
  const accessTokenPath = getAccessTokenPath();
  await fs.remove(accessTokenPath);
  const data = await getAccessToken();
  const accessTokenJson = {
    accessToken: data.access_token,
    expiresAt: Date.now() + Number(data.expires_in) * 1000,
  };
  await fs.outputJson(accessTokenPath, accessTokenJson);
  return accessTokenJson;
};

const getAccessToken = async () => {
  const { appId, appSecret } = getCantoConfig();
  const url = `${OAUTH_BASE_URL}/oauth/api/oauth2/compatible/token?app_id=${appId}&app_secret=${appSecret}&grant_type=client_credentials`;
  const response = await fetch(url, { method: "POST" });
  if (!response.ok) {
    throw new Error(`Canto authorization failed: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data as CantoAuthResponse;
};

const getAccessTokenPath = () => {
  const { config } = WorkflowRunner;
  const { _workspace_path } = config;
  const { accessTokenPath } = getCantoConfig();
  const resolvedAccessTokenPath = accessTokenPath
    ? path.resolve(_workspace_path, accessTokenPath)
    : CANTO_ACCESS_TOKEN_PATH;
  return resolvedAccessTokenPath;
};

export { authorize, ensureValidAccessToken };
