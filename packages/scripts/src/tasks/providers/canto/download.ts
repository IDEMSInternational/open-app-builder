import fetch from "node-fetch";
import * as fs from "fs-extra";
import path from "path";
import type {
  CantoResponseSearchUnderFolder,
  CantoResponseBatchContentDetails,
  CantoManifest,
  CantoManifestEntry,
  CantoDownloadedFolder,
  CantoSourceFolder,
  CantoSourceFolderFileList,
} from "./types";
import { getCantoConfig, getFilePath, getOutputFolder } from "./utils";
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

const listFiles = async () => {
  const { sourceFolders } = getCantoConfig();

  const folderFileLists: CantoSourceFolderFileList[] = [];
  for (const sourceFolder of sourceFolders) {
    folderFileLists.push(await listFilesFromCantoFolder(sourceFolder));
  }
  return folderFileLists;
};

const listFilesFromCantoFolder = async (
  sourceFolder: CantoSourceFolder
): Promise<CantoSourceFolderFileList> => {
  const { id: folderId } = sourceFolder;
  console.log(`Checking Canto folder "${sourceFolder.name}"`);
  const { results } = await searchUnderFolder(folderId);
  const outputFolder = getOutputFolder(path.join("search", sourceFolder.name));
  await fs.outputJson(
    path.join(outputFolder, "folder.json"),
    { folderConfig: sourceFolder, results },
    { spaces: 2 }
  );
  console.log(`Found ${results.length} files in "${sourceFolder.name}"`);
  return { folderConfig: sourceFolder, results };
};

const createManifests = async (folderFileLists?: CantoSourceFolderFileList[]) => {
  folderFileLists ??= await listFiles();
  const downloadedFolders: CantoDownloadedFolder[] = [];
  for (const folderFileList of folderFileLists) {
    downloadedFolders.push(await createManifestForCantoFolder(folderFileList));
  }
  return downloadedFolders;
};

const createManifestForCantoFolder = async (folderFileList: CantoSourceFolderFileList) => {
  const { folderConfig, results } = folderFileList;
  // Make a request for additional info for all files in batch
  const batchFiles = results.map((file) => {
    return { id: file.id, scheme: file.scheme };
  });
  console.log(`Creating Canto manifest for "${folderConfig.name}"`);
  const manifest = batchFiles.length === 0 ? [] : await batchGetContentDetails(batchFiles);
  const outputFolder = getOutputFolder(path.join("original", folderConfig.name));
  const fullPath = path.join(outputFolder, "manifest.json");
  await fs.outputJson(fullPath, manifest, { spaces: 2 });
  console.log(`Created manifest with ${manifest.length} files for "${folderConfig.name}"`);
  return { path: outputFolder, folderConfig };
};

const downloadFiles = async (downloadedFolders?: CantoDownloadedFolder[]) => {
  downloadedFolders ??= await createManifests();
  for (const downloadedFolder of downloadedFolders) {
    await downloadFilesFromManifest(downloadedFolder);
  }
  return downloadedFolders;
};

const downloadFilesFromManifest = async (downloadedFolder: CantoDownloadedFolder) => {
  const manifestPath = path.join(downloadedFolder.path, "manifest.json");
  const manifest = fs.readJsonSync(manifestPath) as CantoManifest;
  console.log(`Downloading ${manifest.length} files from "${downloadedFolder.folderConfig.name}"`);
  for (const file of manifest) {
    await downloadFile(file, downloadedFolder);
  }
  console.log(`Downloaded files to ${downloadedFolder.path}`);
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
  const { url: baseUrl } = getCantoConfig();
  const params = queryParams ? new URLSearchParams({ ...queryParams }).toString() : "";
  const url = `${baseUrl.replace(/\/$/, "")}/api/v1/${queryType}${
    folderId ? "/" + folderId : ""
  }${params ? "?" + params : ""}`;
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Canto ${queryType} request failed: ${response.status} ${response.statusText}`);
  }
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

const downloadFile = async (
  fileEntry: CantoManifestEntry,
  downloadedFolder: CantoDownloadedFolder
) => {
  const url = fileEntry.url.directUrlOriginal;
  const filePath = getFilePath(fileEntry, downloadedFolder.folderConfig.id);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Canto file download failed for "${fileEntry.name}": ${response.status} ${response.statusText}`
    );
  }
  const buffer = await response.buffer();
  const fullPath = path.join(downloadedFolder.path, filePath);
  fs.ensureDirSync(path.dirname(fullPath));
  fs.writeFileSync(fullPath, buffer);
};

export { createManifests, downloadFiles, listFiles };
