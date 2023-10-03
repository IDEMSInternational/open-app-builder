import { WorkflowRunner } from "../../commands/workflow/run";
import fetch from "node-fetch";
import * as fs from "fs-extra";
import path from "path";
import { CANTO_ACCESS_TOKEN_PATH } from "../../paths";
import { differenceInCalendarDays } from "date-fns";

const OAUTH_BASE_URL = "https://oauth.canto.com";

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
interface CantoQueryParams {
  tags?: string;
  sortBy?: string;
  scheme?: string;
}
type CantoQueryType = "search" | "folder" | "album" | "batch/content";

const debugFunction = async () => {
  const response = await searchUnderFolder("V0DQB");
  const { results } = response;
  // for (const file of results) {
  //   console.log("tags", file.tag)
  //   await downloadFileFromUrl(file.url.directUrlOriginal, file.name)
  // }
  const batchManifest = results.map((file) => {
    return { id: file.id, scheme: file.scheme };
  });
  const response2 = await queryCanto({
    queryType: "batch/content",
    method: "POST",
    body: batchManifest,
  });
  console.log("response2:", response2);
};

/**
 * Build a query to Canto's API
 * @param queryType "search" | "folder" | "album" | "batch/content"
 * @param folderId The ID of a folder *or* album
 * @param queryParams Query params, e.g. { tags: debug }
 * @returns JSON parsed response
 */
const queryCanto = async (opts: {
  body?: any;
  folderId?: string;
  method?: string;
  queryParams?: CantoQueryParams;
  queryType: CantoQueryType;
}) => {
  const { body, folderId, queryParams, queryType } = opts;
  // Alternative: const method = opts.method === "batch/content" ? "POST" : "GET"
  const method = opts.method || "GET";
  const accessToken = await ensureValidAccessToken();
  const { config } = WorkflowRunner;
  const { url: baseUrl } = config.canto;
  const params = queryParams ? new URLSearchParams({ ...queryParams }) : "";
  console.log("params:", params.toString());
  const url = `${baseUrl}/api/v1/${queryType}${folderId ? "/" + folderId : ""}${
    params ? "?" + params : ""
  }`;

  const options = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  console.log("body:", body);
  console.log("method:", method);
  console.log("url:", url);
  const data = await response.json();
  console.log(data);
  return data;
};

const searchUnderFolder = async (
  folderId: string,
  includeSubfolders: boolean = false,
  params: CantoQueryParams = undefined
) => {
  // To exclude subfolders and albums from results, specify "scheme"
  if (!includeSubfolders) {
    params = { ...params, scheme: "image|video|audio|document|other" };
  }
  const data = await queryCanto({ queryType: "folder", folderId, queryParams: params });
  return data;
};

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
  fs.writeFileSync(accessTokenPath, JSON.stringify(accessTokenJson));
  return accessTokenJson;
};

const getAccessToken = async () => {
  const { config } = WorkflowRunner;
  const { appId, appSecret } = config.canto;
  const url = `${OAUTH_BASE_URL}/oauth/api/oauth2/compatible/token?app_id=${appId}&app_secret=${appSecret}&grant_type=client_credentials`;
  const response = await fetch(url, { method: "POST" });
  const data = await response.json();
  console.log(data);
  return data as CantoAuthResponse;
};

const getAccessTokenPath = () => {
  const { config } = WorkflowRunner;
  const { _workspace_path } = config;
  const { auth_token_path } = config.google_drive;
  const accessTokenPath = auth_token_path
    ? path.resolve(_workspace_path, auth_token_path)
    : CANTO_ACCESS_TOKEN_PATH;
  return accessTokenPath;
};

const getOutputFolder = (folderId: string) => {
  const { _workspace_path } = WorkflowRunner.config;
  return path.resolve(_workspace_path, "tasks", "canto", "outputs", folderId);
};

const getJsonFromFile = (filepath: string) => {
  try {
    const jsonString = fs.readFileSync(filepath).toString();
    return JSON.parse(jsonString);
  } catch (ex) {
    console.log("Failed to parse JSON for file ", filepath);
    return null;
  }
};

const downloadFileFromUrl = async (url: string, filePath: string) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  const outputFolder = getOutputFolder("assets");
  fs.ensureDirSync(outputFolder);
  fs.writeFileSync(outputFolder + "/" + filePath, buffer);
};

export default { authorize, debugFunction };
