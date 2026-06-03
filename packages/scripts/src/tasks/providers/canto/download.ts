import { WorkflowRunner } from "../../../commands/workflow/run";
import fetch from "node-fetch";
import * as fs from "fs-extra";
import path from "path";
import {
  CantoResponseSearchUnderFolder,
  CantoResponseBatchContentDetails,
  CantoManifest,
  CantoManifestEntry,
} from "./types";
import { getFilePath, getOutputFolder } from "./utils";
import { ensureValidAccessToken } from "./authorize";

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

export { debugFunction };
