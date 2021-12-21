#!/usr/bin/env node
import chalk from "chalk";
import * as fs from "fs-extra";
import logUpdate from "log-update";
import path from "path";
import PQueue from "p-queue";
import { drive_v3 } from "googleapis";
import { GaxiosResponse, GaxiosOptions } from "gaxios";
import { Command } from "commander";
import { PATHS } from "../paths";
import {
  GDRIVE_OFFICE_MAPPING,
  MIMETYPE_EXTENSIONS,
  logError,
  listGdriveFolder,
  generateFolderFlatMapStats,
  ILocalFileWithStats,
  getGDriveFileById,
  logProgramHelp,
} from "../utils";
import { authorizeGDrive } from "./authorize";

const GOOGLE_FOLDER_MIMETYPE = "application/vnd.google-apps.folder";

/***************************************************************************************
 * CLI
 * @example download
 *************************************************************************************/
interface IProgramOptions {
  folderId: string;
  fileEntry64?: string;
  outputPath: string;
  cachePath: string;
  credentialsPath: string;
  authTokenPath: string;
  logName: string;
  contentsFileName: string;
  filterFunction64?: string;
}

const program = new Command("download");
export default program
  .description("Get active deployment")
  .requiredOption("-id --folder-id <string>", "Unique ID of folder to download (gdrive url suffix)")
  .option(
    "-f --file-entry-64 <base64>",
    "base64 encoded metadata of single file to download (read from cache entry). Default downloads all"
  )
  .requiredOption(
    "-o --output-path <string>",
    "Output path for downloaded files (default ./output)",
    PATHS.DEFAULT_OUTPUT_FOLDER
  )
  .requiredOption(
    "-cache --cache-path <string>",
    "Cache path for downloaded files (default ./cache)",
    PATHS.DEFAULT_CACHE_FOLDER
  )
  .requiredOption(
    "-c --credentials-path <string>",
    "Path to credentials JSON",
    PATHS.DEFAULT_CREDENTIALS
  )
  .requiredOption("-a --auth-token-path <string>", "Path to token JSON", PATHS.DEFAULT_TOKEN)
  .requiredOption(
    "-l --log-name <string>",
    "Name provided for logs (defaults action.log)",
    "actions.log"
  )
  .requiredOption(
    "-contents --contents-file-name <string>",
    "Specify name of summary contents file to generate. Default `_contents.json`",
    "_contents.json"
  )
  .option(
    "-filter --filter-function-64 <base64>",
    "Function applied to omit downloads based on file entry, encoded as base64. e.g. decoded: (entry)=>entry.folderPath.includes('temp/')"
  )
  .action(async (options: IProgramOptions) => {
    new GDriveDownloader(options).run();
  });

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    logProgramHelp(program);
  }
  program.parse(process.argv);
}

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

class GDriveDownloader {
  private drive: drive_v3.Drive;

  constructor(private options: IProgramOptions) {
    const { outputPath, cachePath } = this.options;
    // prepare folders
    fs.ensureDirSync(outputPath);
    fs.ensureDirSync(cachePath);
    fs.ensureDirSync(PATHS.LOGS_DIR);
    fs.emptyDirSync(outputPath);
    console.log(chalk.yellow("Downloading GDrive Data"));
  }

  public async run() {
    const { fileEntry64, folderId, authTokenPath, credentialsPath } = this.options;
    this.drive = await authorizeGDrive({ authTokenPath, credentialsPath });
    // Handle case of single or full download
    if (fileEntry64) {
      const cachedEntry: IGDriveFileWithFolder = JSON.parse(
        Buffer.from(fileEntry64, "base64").toString()
      );
      return this.processSingleFileDownload(cachedEntry);
    } else {
      return this.processFullFolderDownload(folderId);
    }
  }

  /**
   * Sync a single file, bypassing cache
   * Note - requires a previous cache entry so that the full folder subpath of the file is
   * known (otherwise would need recursive parents search)
   */
  private async processSingleFileDownload(cachedEntry: IGDriveFileWithFolder) {
    const serverEntry = await getGDriveFileById(this.drive, cachedEntry.id);
    const newEntry = { ...cachedEntry, ...serverEntry };
    await this.processSyncActions({ ...SYNC_ACTIONS_EMPTY, new: [newEntry] });
    this.updateCacheContentsFile(newEntry);
    console.log(chalk.green("Download Complete"));
  }
  /** Download a full folder */
  private async processFullFolderDownload(folderId: string) {
    console.log(chalk.yellow("Retrieving list of files"));
    const files = await this.listGdriveFilesRecursively(folderId);
    // Generate list of files to download
    const actions = this.prepareSyncActionsList(files);
    await this.processSyncActions(actions);
    this.writeCacheContentsFile(files);

    console.log(chalk.green("Download Complete"));
  }

  private writeCacheContentsFile(files: IGDriveFileWithFolder[]) {
    const { cachePath } = this.options;
    // also add a relativePath for full path to local file
    const filesWithRelativePath = files.map((f) => ({
      ...f,
      relativePath: getRelativeLocalPath(f),
    }));
    const contents = JSON.stringify(filesWithRelativePath, null, 2);
    const contentsPath = path.resolve(cachePath, this.options.contentsFileName);
    fs.writeFileSync(contentsPath, contents);
  }
  private updateCacheContentsFile(file: IGDriveFileWithFolder) {
    const { cachePath } = this.options;
    const contentsPath = path.resolve(cachePath, this.options.contentsFileName);
    const contents: IGDriveFileWithFolder[] = fs.readJSONSync(contentsPath);
    const updateIndex = contents.findIndex((entry) => entry.id === file.id);
    console.log("update contents", contents[updateIndex], file);
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
    const { cachePath } = this.options;
    // Handle Deleted
    for (const { folderPath } of actions.deleted) {
      fs.removeSync(path.resolve(cachePath, folderPath));
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
        const cacheTargetPath = path.resolve(cachePath, folderPath, targetFilename);
        fs.ensureDirSync(path.dirname(cacheTargetPath));
        await this.downloadGdriveFile(cacheTargetPath, file);
      });
    }
    const total = fileDownloads.length;
    queue.on("next", () => {
      logUpdate(chalk.blue(`${total - queue.pending + queue.size}/${total} downloaded`));
    });
    logUpdate.done();
    queue.start();
    await queue.onIdle();
    // Update logs
    const actionsLogPath = path.resolve(PATHS.LOGS_DIR, `${this.options.logName}.json`);
    console.log(chalk.gray(actionsLogPath));
    fs.writeFileSync(actionsLogPath, JSON.stringify(actions, null, 2));
  }

  /**
   * Compare list of server files with local cache to determine new/updated/same/deleted
   */
  private prepareSyncActionsList(serverFiles: IGDriveFileWithFolder[]) {
    const { cachePath, filterFunction64, contentsFileName } = this.options;
    const output: ISyncActions = { new: [], updated: [], same: [], deleted: [], ignored: [] };

    // generate hashmaps for easier lookup and compare of server and local files
    const localFilesHashmap = generateFolderFlatMapStats(cachePath);
    const serverFilesHashmap: { [relative_path: string]: IGDriveFileWithFolder } = {};

    // convert string filter function to function if included
    const filterFn: Function = filterFunction64
      ? new Function(`return ${Buffer.from(filterFunction64, "base64").toString()}`)()
      : null;

    // Compare server with local
    for (const serverFile of serverFiles) {
      (() => {
        // add to hashmap for use in local-server comparison
        const cacheRelativePath = getRelativeLocalPath(serverFile);
        serverFilesHashmap[cacheRelativePath] = serverFile;

        // run a regex test for anything ending .abc(d)
        // gdrive keeps duplicate open office formats of gsheets without extension
        // if uploaded as excel files, so these will be omitted (duplicate of converted export)
        const hasExtension = /\.([a-z0-9]){3,4}$/gi.test(cacheRelativePath);
        if (!hasExtension) {
          output.ignored.push(serverFile);
          return;
        }
        if (filterFn) {
          const included = filterFn(serverFile);
          if (!included) {
            output.ignored.push(serverFile);
            return;
          }
        }

        const cacheFile = localFilesHashmap[cacheRelativePath];
        if (cacheFile) {
          // compare with modified times instead of checksums
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
      if (!serverFilesHashmap[relativePath] && path.basename(relativePath) !== contentsFileName) {
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
   * Compare google drive server and local files, using md5 checksums if exist or modified
   * times if not (google sheets/docs don't retain md5 checksum)
   */
  private isServerFileSameAsLocalFile(
    serverFile: IGDriveFileWithFolder,
    localFile: ILocalFileWithStats
  ) {
    if (serverFile.md5Checksum) {
      return serverFile.md5Checksum === localFile.checksum;
    } else {
      return serverFile.modifiedTime === localFile.mtime.toISOString();
    }
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
    const allFiles: IGDriveFileWithFolder[] = [];
    const [startTime] = process.hrtime();
    // Define recursive function
    const listRecursively = (folderId: string, folderPath = "") => {
      queue.add(async () => {
        const folderContents = await listGdriveFolder(this.drive, folderId);
        const folderFiles = folderContents.filter(
          (file) => file.mimeType !== GOOGLE_FOLDER_MIMETYPE
        );
        folderFiles.forEach((f) => {
          allFiles.push({ ...f, folderPath });
        });
        const subFolders = folderContents.filter(
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
  private downloadGdriveFile(localTargetPath: string, file: IGDriveFileWithFolder) {
    return new Promise<void>((resolve, reject) => {
      // Handle the export/download
      fs.createFileSync(localTargetPath);
      const dest = fs.createWriteStream(localTargetPath);
      // assign mimetype for conversion from google file formats to office format
      const mimeType = GDRIVE_OFFICE_MAPPING[file.mimeType] || file.mimeType;
      dest.on("close", () => {
        // assign the same modified time to the file as google drive file
        const mtime = new Date(file.modifiedTime);
        fs.utimesSync(localTargetPath, mtime, mtime);
        resolve();
      });
      const params = { fileId: file.id, mimeType, alt: "media" };
      const options: GaxiosOptions = { responseType: "stream", timeout: 30000 };
      // export gsheet/doc to office format
      if (GDRIVE_OFFICE_MAPPING[file.mimeType]) {
        this.drive.files.export(params, options, (err, res: GaxiosResponse) => {
          if (err) handleFileDownloadError(err, file, localTargetPath);
          else res.data.pipe(dest);
        });
      }
      // download other files without conversion
      else {
        this.drive.files.get(params, options, (err, res: GaxiosResponse<any>) => {
          if (err) handleFileDownloadError(err, file, localTargetPath);
          else res.data.pipe(dest);
        });
      }
    });
  }
}

/**
 * Gdrive file meta only includes extensions if a native file type (not gsheet, gdoc etc.),
 * It also separates out relative parent folder path with file name prefix.
 * Generate a path that combines the relative path with file name and extension
 */
function getRelativeLocalPath(entry: IGDriveFileWithFolder) {
  const { folderPath, mimeType } = entry;
  let targetFilename = entry.name;
  // assign correct file extension if exporting
  if (GDRIVE_OFFICE_MAPPING[mimeType]) {
    targetFilename += `.${MIMETYPE_EXTENSIONS[mimeType]}`;
  }
  // add to hashmap for use in local-server comparison
  return folderPath ? `${folderPath}/${targetFilename}` : targetFilename;
}

function handleFileDownloadError(err: Error, file: IGDriveFileWithFolder, localTargetPath: string) {
  fs.removeSync(localTargetPath);
  let response = (err as any).response;
  const msg2 = response?.statusText || err.message || "";

  // 403 usually critical (e.g. reached max limit)
  if (response.status === 403 && response?.statusText === "Forbidden") {
    logError({
      msg1: "Access to resource has been blocked, see more info at link below",
      logOnly: true,
    });
    console.log(chalk.yellow(response.request.responseURL));
    // prevent further processing
    process.exit(1);
  }
  // Otherwise just log for now
  else {
    logError({
      msg1: `failed to download file: ${file.folderPath}/${file.name}`,
      msg2,
      logOnly: true,
    });
  }
}

interface IGDriveFileWithFolder extends drive_v3.Schema$File {
  /** list of parent folders to file */
  folderPath: string;
}
interface ISyncActions {
  new: IGDriveFileWithFolder[];
  deleted: { folderPath: string }[];
  updated: IGDriveFileWithFolder[];
  same: IGDriveFileWithFolder[];
  ignored: IGDriveFileWithFolder[];
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

interface IFileCompareItem {
  file: IGDriveFileWithFolder;
  cacheTargetPath: "";
}
