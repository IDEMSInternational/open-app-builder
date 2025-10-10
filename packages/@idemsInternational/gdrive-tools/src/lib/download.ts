#!/usr/bin/env node
import chalk from "chalk";
import * as fs from "fs-extra";
import logUpdate from "log-update";
import path from "path";
import PQueue from "p-queue";
import { drive_v3 } from "googleapis";
import { GaxiosResponse, GaxiosOptions, GaxiosError } from "gaxios";
import { PATHS } from "../paths";
import {
  GDRIVE_OFFICE_MAPPING,
  MIMETYPE_EXTENSIONS,
  logError,
  listGdriveFolder,
  generateFolderFlatMapStats,
  ILocalFileWithStats,
  cleanupEmptyFolders,
  getRelativeLocalPath,
} from "../utils";
import { authorizeGDrive } from "./authorize";
import { GDRIVE_FILE_ENTRY_ARRAY_SCHEMA, IGdriveEntry } from "../models";

const GOOGLE_FOLDER_MIMETYPE = "application/vnd.google-apps.folder";

/** File to store file metadata returned by google drive api */
const METADATA_FILENAME = "_metadata.json";

export interface IDownloadOptions {
  folderId: string;
  outputPath: string;
  credentialsPath: string;
  authTokenPath: string;
  logName: string;
  filterFn?: (entry: IGdriveEntry) => boolean;
}

export class GDriveDownloader {
  private drive: drive_v3.Drive;
  private contentsPath: string;
  private contentsData: IGdriveEntry[] = [];

  constructor(private options: IDownloadOptions) {
    const { outputPath } = this.options;
    this.contentsPath = path.resolve(outputPath, METADATA_FILENAME);
    // prepare folders
    fs.ensureDirSync(outputPath);
    fs.ensureDirSync(PATHS.LOGS_DIR);
    this.loadCacheContents();
  }

  /** Process entire folder download */
  public async downloadFolder(folderId: string) {
    await this.setupGdrive();
    console.log(chalk.yellow("Retrieving list of files"));
    const serverFiles = await this.listGdriveFilesRecursively(folderId);
    if (Object.keys(serverFiles).length === 0) {
      logError({
        msg1: "No drive files found. Please ensure that you have access to folder",
        msg2: `https://drive.google.com/drive/folders/${folderId}`,
        logOnly: true,
      });
    }
    return this.processDownloads(serverFiles);
  }

  /**
   * Process updates for a single file - used during watch mode
   * NOTE - file must already exist in cache to know nested folder structure to output file to
   */
  public async updateFileEntry(serverEntry: drive_v3.Schema$File) {
    await this.setupGdrive();
    const cachedEntry = this.getCachedEntry(serverEntry);
    if (!cachedEntry) {
      console.log(chalk.red("Full sync required before updating file", serverEntry.name));
      return;
    }
    const { viewedByMeTime } = serverEntry;
    // HACK - gdrive ignores updates in quick succession, so ensure change detection whenever
    // viewedByMeTime changes (e.g. gsheet page reload)
    if (viewedByMeTime) {
      cachedEntry.modifiedTime = viewedByMeTime;
    }
    // we still call the main method used to download entire folder, just passing individual server file
    const actions = { ...SYNC_ACTIONS_EMPTY };
    actions.updated.push(cachedEntry);
    await this.processSyncActions(actions);
    this.updateCacheContentsFile(cachedEntry);
  }

  public getCachedEntry(serverEntry: drive_v3.Schema$File) {
    return this.contentsData.find((cached) => cached.id === serverEntry.id);
  }

  private async setupGdrive() {
    const { authTokenPath, credentialsPath } = this.options;
    const { drive } = await authorizeGDrive({ authTokenPath, credentialsPath });
    this.drive = drive;
  }

  private loadCacheContents() {
    if (!fs.existsSync(this.contentsPath)) {
      fs.writeJSONSync(this.contentsPath, []);
    }
    this.contentsData = fs.readJSONSync(this.contentsPath);
  }

  /** Download a full folder */
  private async processDownloads(files: IGdriveEntry[]) {
    // Generate list of files to download
    const actions = this.prepareSyncActionsList(files);
    await this.processSyncActions(actions);
    this.writeCacheContentsFile(files);
    console.log(chalk.green("Download Complete"));
  }

  /** Keep a local reference of all files in cache */
  private writeCacheContentsFile(files: IGdriveEntry[]) {
    const { outputPath } = this.options;
    // also add a relativePath for full path to local file
    const filtered = files
      // only include files downloaded in contents
      .filter((f) => fs.existsSync(path.resolve(outputPath, f.relativePath)))
      .sort((a, b) => (a.relativePath > b.relativePath ? 1 : -1));
    const contents = JSON.stringify(filtered, null, 2);
    const contentsPath = path.resolve(outputPath, METADATA_FILENAME);
    fs.writeFileSync(contentsPath, contents);
  }
  private updateCacheContentsFile(file: IGdriveEntry) {
    const { outputPath } = this.options;
    const contentsPath = path.resolve(outputPath, METADATA_FILENAME);
    const contents: IGdriveEntry[] = fs.readJSONSync(contentsPath);
    const updateIndex = contents.findIndex((entry) => entry.id === file.id);
    if (updateIndex > -1) {
      contents[updateIndex] = file;
    }
    return this.writeCacheContentsFile(contents);
  }

  /**
   * Download all files from google drive server to local, checking via cache
   * for files that already exist, or have been modified/deleted etc.
   */
  private async processSyncActions(actions: ISyncActions) {
    const { outputPath } = this.options;
    // Handle Deleted
    for (const { folderPath } of actions.deleted) {
      fs.removeSync(path.resolve(outputPath, folderPath));
    }
    // Handle New and Updated
    const fileDownloads = [...actions.new, ...actions.updated];
    // Create a queue, rate-limit to 20 reqs per second
    // This is to try and keep within an overall allowance of 20,000 reqs per 100 second across all users
    const queue = new PQueue({
      autoStart: false,
      interval: 1000 * 1,
      intervalCap: 20,
    });
    for (const file of fileDownloads) {
      queue.add(async () => {
        const { folderPath } = file;
        let targetFilename = file.name;
        // assign correct file extension if exporting
        if (GDRIVE_OFFICE_MAPPING[file.mimeType]) {
          targetFilename += `.${MIMETYPE_EXTENSIONS[file.mimeType]}`;
        }
        const cacheTargetPath = path.resolve(outputPath, folderPath, targetFilename);
        fs.ensureDirSync(path.dirname(cacheTargetPath));
        await this.downloadGdriveFile(cacheTargetPath, file);
      });
    }
    const total = fileDownloads.length;
    queue.on("next", () => {
      logUpdate(chalk.blue(`${total - queue.size - queue.pending}/${total} downloaded`));
    });
    logUpdate.done();
    queue.start();
    await queue.onIdle();
    // Remove empty folders left after deletions
    cleanupEmptyFolders(this.options.outputPath);
    // Update logs
    const actionsLogPath = path.resolve(PATHS.LOGS_DIR, `${this.options.logName}.json`);
    console.log(chalk.gray(actionsLogPath));
    fs.writeFileSync(actionsLogPath, JSON.stringify(actions, null, 2));
  }

  /**
   * Compare list of server files with local cache to determine new/updated/same/deleted
   */
  private prepareSyncActionsList(serverFiles: IGdriveEntry[]) {
    const { outputPath, filterFn } = this.options;
    const output: ISyncActions = { new: [], updated: [], same: [], deleted: [], ignored: [] };

    // generate hashmaps for easier lookup and compare of server and local files
    const localFilesHashmap = generateFolderFlatMapStats(outputPath);
    const serverFilesHashmap = Object.fromEntries(serverFiles.map(v=>([v.relativePath,v])))
    // Compare server with local
    for (const serverFile of serverFiles) {
      (() => {
        // add to hashmap for use in local-server comparison
        const cacheRelativePath = getRelativeLocalPath(serverFile);
        serverFilesHashmap[cacheRelativePath] = serverFile;
        const cacheFile = localFilesHashmap[cacheRelativePath];

        // run a regex test for anything ending .abc(d)
        // gdrive keeps duplicate open office formats of gsheets without extension
        // if uploaded as excel files, so these will be omitted (duplicate of converted export)
        const hasExtension = /\.([a-z0-9]){3,4}$/gi.test(cacheRelativePath);
        if (!hasExtension) {
          output.ignored.push(serverFile);
          return;
        }
        // Apply any server filter functions, removing files that already exist and ignoring
        // files that do not
        if (filterFn) {
          const included = filterFn(serverFile as IGdriveEntry);
          if (!included) {
            if (cacheFile) {
              output.deleted.push({ folderPath: cacheRelativePath });
              return;
            } else {
              output.ignored.push(serverFile);
              return;
            }
          }
        }

        if (cacheFile) {
          const isSame = this.isServerFileSameAsLocalFile(serverFile, cacheFile);

          if (isSame) {
            output.same.push(serverFile);
          } else {
            output.updated.push(serverFile);
          }
        } else {
          output.new.push(serverFile);
        }
      })();
    }
    // compare local with server, mark for delete files no longer on server (except local contents file)
    Object.keys(localFilesHashmap).forEach((relativePath) => {
      if (!serverFilesHashmap[relativePath] && path.basename(relativePath) !== METADATA_FILENAME) {
        output.deleted.push({ folderPath: relativePath });
      }
    });
    // generate summary
    const summary = {} as any;
    Object.entries(output).forEach(([key, value]) => (summary[key] = value.length));
    output.summary = summary;
    console.log(summary);
    return output;
  }

  /**
   * Compare google drive server and local files, using modified
   * times as google-native formats (sheets/docs) don't retain md5 checksum
   */
  private isServerFileSameAsLocalFile(serverFile: IGdriveEntry, localFile: ILocalFileWithStats) {
    return serverFile.modifiedTime === localFile.mtime.toISOString();
  }

  /**
   * List all the files in a google drive folder recursively
   *
   * NOTE - as drive api only allows search for a single folder at a time need to run
   * recursively for any subfolders found
   * https://issuetracker.google.com/issues?q=status:open%20componentid:191650%2B%20ancestors
   * @param baseFolderId google-api folder id
   */
  private async listGdriveFilesRecursively(baseFolderId: string) {
    // Create queue for processing requests in parallel
    const queue = new PQueue({ autoStart: false, concurrency: 10 });
    const allFolders = [];
    const allFiles: IGdriveEntry[] = [];
    const [startTime] = process.hrtime();
    // Define recursive function
    const listRecursively = (folderId: string, folderPath = "") => {
      queue.add(async () => {
        const folderContents: drive_v3.Schema$File[] = await listGdriveFolder(this.drive, folderId);
        // include folderPath with each entry and validate using zod schema
        const folderContentsWithFolderPath = folderContents.map((v) => ({ ...v, folderPath }));
        const parsedContents = GDRIVE_FILE_ENTRY_ARRAY_SCHEMA.parse(folderContentsWithFolderPath);
        const folderFiles = parsedContents.filter(
          (file) => file.mimeType !== GOOGLE_FOLDER_MIMETYPE
        );
        allFiles.push(...folderFiles);
        const subFolders = parsedContents.filter(
          (file) => file.mimeType === GOOGLE_FOLDER_MIMETYPE
        );
        for (let subfolder of subFolders) {
          allFolders.push(subfolder);
          const subfolderPath = folderPath ? `${folderPath}/${subfolder.name}` : subfolder.name;
          listRecursively(subfolder.id, subfolderPath);
        }
      });
    };
    // Start queue, handle logging and wait for complete
    queue.add(() => listRecursively(baseFolderId, ``));
    queue.on("next", (e) => {
      logUpdate(chalk.blue(`Scanning: ${allFolders.length + 1} folders, ${allFiles.length} files`));
    });
    queue.start();
    await queue.onIdle();
    logUpdate.done();
    const [endTime] = process.hrtime();
    console.log(chalk.blue(`Scan complete in ${endTime - startTime}s`));
    return allFiles;
  }

  /** Export a file from google drive, converting from drive files types to office where required */
  private downloadGdriveFile(localTargetPath: string, metadata: IGdriveEntry) {
    return new Promise<void>((resolve, reject) => {
      const { modifiedTime, id, mimeType } = metadata;
      // Handle the export/download
      fs.createFileSync(localTargetPath);
      const dest = fs.createWriteStream(localTargetPath);
      dest.on("close", () => {
        // assign the same modified time to the file as google drive file
        const mtime = new Date(modifiedTime);
        fs.utimesSync(localTargetPath, mtime, mtime);
        resolve();
      });
      const params = { fileId: id, mimeType, alt: "media" };
      const options: GaxiosOptions = { responseType: "stream", timeout: 30000 };
      // export gsheet/doc to office format
      if (GDRIVE_OFFICE_MAPPING[mimeType]) {
        params.mimeType = GDRIVE_OFFICE_MAPPING[mimeType];
        this.drive.files.export(params, options, (err, res: GaxiosResponse) => {
          if (err) handleFileDownloadError(err, metadata, localTargetPath);
          else res.data.pipe(dest);
        });
      }
      // download other files without conversion
      else {
        this.drive.files.get(params, options, (err, res: GaxiosResponse<any>) => {
          if (err) handleFileDownloadError(err, metadata, localTargetPath);
          else res.data.pipe(dest);
        });
      }
    });
  }
}

function handleFileDownloadError(err: Error, metadata: IGdriveEntry, localTargetPath: string) {
  console.error(err);
  fs.removeSync(localTargetPath);

  // 403 usually critical (e.g. reached max limit)
  if (err instanceof GaxiosError) {
    logError({
      msg1: `Access to resource has been blocked ${metadata.relativePath}`,
      msg2: err.message,
      logOnly: true,
    });
    console.log(chalk.yellow(err.response.request.responseURL));
    // prevent further processing
    process.exit(1);
  }

  // Otherwise just log for now
  else {
    let response = (err as any).response;
    const msg2 = err.message || response?.statusText || "";
    logError({
      msg1: `failed to download file: ${metadata.folderPath}/${metadata.name}`,
      msg2,
      logOnly: true,
    });
  }
}

interface ISyncActions {
  new: IGdriveEntry[];
  deleted: { folderPath: string }[];
  updated: IGdriveEntry[];
  same: IGdriveEntry[];
  ignored: IGdriveEntry[];
  summary?: {
    new: number;
    updated: number;
    same: number;
    ignored: number;
  };
}
const SYNC_ACTIONS_EMPTY: ISyncActions = {
  new: [],
  deleted: [],
  updated: [],
  same: [],
  ignored: [],
};
