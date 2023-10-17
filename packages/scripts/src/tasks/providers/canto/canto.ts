import { WorkflowRunner } from "../../../commands/workflow/run";
import fetch from "node-fetch";
import * as fs from "fs-extra";
import path from "path";
import { CANTO_ACCESS_TOKEN_PATH } from "../../../paths";
import { differenceInCalendarDays } from "date-fns";
import {
  CantoResponseSearchUnderFolder,
  CantoResponseBatchContentDetails,
  CantoManifest,
  CantoManifestEntry,
} from "./types";
import { getJsonFromFile } from "../../../utils";
import { getFilePath, getOutputFolder } from "./utils";

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
interface CantoBatchManifestEntry {
  id: string;
  scheme: string;
}

const FOLDER_ID = "V0DQB";

const debugFunction = async () => {
  const { config } = WorkflowRunner;
  // const { sourceFolders } = config.canto
  const sourceFolders = [FOLDER_ID];

  console.log(sourceFolders);
  const outputFolders = [];
  for (const folderId of sourceFolders) {
    outputFolders.push(await downloadFilesFromCantoFolder(folderId));
  }
  return outputFolders;
};

const downloadFilesFromCantoFolder = async (folderId: string) => {
  const { results } = await searchUnderFolder(folderId);

  // Make a request for additional info for all files in batch
  const batchFiles = results.map((file) => {
    return { id: file.id, scheme: file.scheme };
  });
  const manifest = await batchGetContentDetails(batchFiles);
  for (const file of manifest) {
    await downloadFile(file, folderId);
  }
  const outputFolder = getOutputFolder("original");
  const fullPath = path.join(outputFolder, folderId, "manifest.json");
  fs.ensureDirSync(path.dirname(outputFolder));
  fs.writeFileSync(fullPath, JSON.stringify(manifest, null, 2));
  return path.join(outputFolder, folderId);
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

  console.log("query url:", url);
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  const data = await response.json();
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
  return data as CantoResponseSearchUnderFolder;
};

const batchGetContentDetails = async (batchFiles: CantoBatchManifestEntry[]) => {
  const response = (await queryCanto({
    queryType: "batch/content",
    method: "POST",
    body: batchFiles,
  })) as CantoResponseBatchContentDetails;
  return response.docResult as CantoManifest;
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

const downloadFile = async (fileEntry: CantoManifestEntry, folderId: string) => {
  const url = fileEntry.url.directUrlOriginal;
  const filePath = getFilePath(fileEntry, folderId);
  const response = await fetch(url);
  const buffer = await response.buffer();
  const outputFolder = getOutputFolder("original/" + folderId);
  const fullPath = outputFolder + "/" + filePath;
  fs.ensureDirSync(path.dirname(fullPath));
  fs.writeFileSync(fullPath, buffer);
};

export default { authorize, debugFunction };
