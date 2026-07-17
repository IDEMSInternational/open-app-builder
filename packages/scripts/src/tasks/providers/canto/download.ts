import fetch from "node-fetch";
import * as fs from "fs-extra";
import path from "path";
import PQueue from "p-queue";
import type {
  CantoResponseSearchUnderFolder,
  CantoManifest,
  CantoManifestEntry,
  CantoFolderListingEntry,
  CantoDownloadedFolder,
  CantoSourceFolder,
  CantoSourceFolderFileList,
} from "./types";
import { getCantoConfig, getFilePath, getOutputFolder } from "./utils";
import { ensureValidAccessToken } from "./authorize";
import { cleanupEmptyFolders, generateFolderFlatMap } from "../../../utils";

interface CantoQueryParams {
  tags?: string;
  sortBy?: string;
  scheme?: string;
  start?: number;
  limit?: number;
}
type CantoQueryType = "search" | "folder" | "album";

interface ICantoSyncActions {
  new: CantoManifestEntry[];
  updated: CantoManifestEntry[];
  same: CantoManifestEntry[];
  deleted: { relativePath: string }[];
  summary: {
    new: number;
    updated: number;
    same: number;
    deleted: number;
  };
}

const DOWNLOAD_CONCURRENCY = 5;
const FOLDER_LIST_PAGE_SIZE = 1000;
const MANIFEST_FILENAME = "manifest.json";

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
  console.log(`Creating Canto manifest for "${folderConfig.name}"`);
  const manifest = results.map(toManifestEntry);
  const outputFolder = getOutputFolder(path.join("original", folderConfig.name));
  const fullPath = path.join(outputFolder, "manifest.json");
  await fs.outputJson(fullPath, manifest, { spaces: 2 });
  console.log(`Created manifest with ${manifest.length} files for "${folderConfig.name}"`);
  return { path: outputFolder, folderConfig };
};

const toManifestEntry = (file: CantoFolderListingEntry): CantoManifestEntry => ({
  id: file.id,
  name: file.name,
  scheme: file.scheme,
  md5: file.md5,
  additional: file.additional,
  relatedAlbums: file.relatedAlbums?.map((album) => ({
    id: album.id,
    idPath: album.idPath,
    name: album.name,
    namePath: album.namePath,
    scheme: album.scheme,
  })),
  url: {
    directUrlOriginal: file.url.directUrlOriginal,
  },
});

const downloadFiles = async (downloadedFolders?: CantoDownloadedFolder[]) => {
  downloadedFolders ??= await createManifests();
  for (const downloadedFolder of downloadedFolders) {
    await downloadFilesFromManifest(downloadedFolder);
  }
  return downloadedFolders;
};

const getDownloadedFolders = () => {
  const { sourceFolders } = getCantoConfig();
  return sourceFolders.map((sourceFolder) => ({
    path: getOutputFolder(path.join("original", sourceFolder.name)),
    folderConfig: sourceFolder,
  }));
};

const downloadFilesFromManifest = async (downloadedFolder: CantoDownloadedFolder) => {
  const { path: outputPath, folderConfig } = downloadedFolder;
  const manifestPath = path.join(outputPath, MANIFEST_FILENAME);
  const manifest = (await fs.readJson(manifestPath)) as CantoManifest;
  const actions = prepareSyncActions(manifest, outputPath, folderConfig.id);
  console.log(actions.summary);

  for (const { relativePath } of actions.deleted) {
    await fs.remove(path.join(outputPath, relativePath));
  }

  const fileDownloads = [...actions.new, ...actions.updated];
  console.log(
    `Downloading ${fileDownloads.length} files from "${folderConfig.name}" (${actions.summary.same} unchanged)`
  );
  const queue = new PQueue({ concurrency: DOWNLOAD_CONCURRENCY });
  await queue.addAll(fileDownloads.map((file) => () => downloadFile(file, downloadedFolder)));
  cleanupEmptyFolders(outputPath);
  console.log(`Downloaded files to ${outputPath}`);
};

const prepareSyncActions = (
  manifest: CantoManifest,
  outputPath: string,
  folderId: string
): ICantoSyncActions => {
  const localFiles = generateFolderFlatMap(outputPath, {
    filterFn: (relativePath) => relativePath !== MANIFEST_FILENAME,
  });
  const actions: ICantoSyncActions = {
    new: [],
    updated: [],
    same: [],
    deleted: [],
    summary: { new: 0, updated: 0, same: 0, deleted: 0 },
  };
  const manifestPaths = new Set<string>();

  for (const file of manifest) {
    const relativePath = getFilePath(file, folderId);
    manifestPaths.add(relativePath);
    const localFile = localFiles[relativePath];

    if (!localFile) {
      actions.new.push(file);
    } else if (file.md5 && localFile.md5Checksum === file.md5) {
      actions.same.push(file);
    } else {
      actions.updated.push(file);
    }
  }

  for (const relativePath of Object.keys(localFiles)) {
    if (!manifestPaths.has(relativePath)) {
      actions.deleted.push({ relativePath });
    }
  }

  actions.summary = {
    new: actions.new.length,
    updated: actions.updated.length,
    same: actions.same.length,
    deleted: actions.deleted.length,
  };
  return actions;
};

/**
 * Build a query to Canto's API
 * @param queryType "search" | "folder" | "album"
 * @param folderId The ID of a folder *or* album
 * @param queryParams Query params, e.g. { tags: debug }
 * @returns JSON parsed response
 */
const queryCanto = async (opts: {
  folderId?: string;
  method?: string;
  queryParams?: CantoQueryParams;
  queryType: CantoQueryType;
}) => {
  const { folderId, queryParams, queryType } = opts;
  const method = opts.method || "GET";
  const accessToken = await ensureValidAccessToken();
  const { url: baseUrl } = getCantoConfig();
  const params = queryParams ? stringifyQueryParams(queryParams) : "";
  const url = `${baseUrl.replace(/\/$/, "")}/api/v1/${queryType}${
    folderId ? "/" + folderId : ""
  }${params ? "?" + params : ""}`;
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Canto ${queryType} request failed: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

const stringifyQueryParams = (queryParams: CantoQueryParams) => {
  return new URLSearchParams(
    Object.entries(queryParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  ).toString();
};

const searchUnderFolder = async (
  folderId: string,
  includeSubfolders: boolean = false,
  params: CantoQueryParams = undefined
): Promise<CantoResponseSearchUnderFolder> => {
  // To exclude subfolders and albums from results, specify "scheme"
  if (!includeSubfolders) {
    params = { ...params, scheme: "image|video|audio|document|other" };
  }

  const allResults: CantoResponseSearchUnderFolder["results"] = [];
  let start = 0;
  let found: number | undefined;
  let page = 1;

  while (true) {
    const data = (await queryCanto({
      queryType: "folder",
      folderId,
      queryParams: { ...params, start, limit: FOLDER_LIST_PAGE_SIZE },
    })) as CantoResponseSearchUnderFolder;

    const { results } = data;
    found ??= data.found;
    allResults.push(...results);

    const totalPages =
      found !== undefined ? Math.max(1, Math.ceil(found / FOLDER_LIST_PAGE_SIZE)) : undefined;
    console.log(
      `Fetched page ${page}${totalPages !== undefined ? `/${totalPages}` : ""} (${results.length} files, ${allResults.length} total)`
    );

    if (results.length < FOLDER_LIST_PAGE_SIZE) {
      break;
    }
    if (found !== undefined && allResults.length >= found) {
      break;
    }

    start += FOLDER_LIST_PAGE_SIZE;
    page++;
  }

  return { results: allResults, found };
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
  await fs.outputFile(fullPath, buffer);
};

export { createManifests, downloadFiles, getDownloadedFolders, listFiles };
