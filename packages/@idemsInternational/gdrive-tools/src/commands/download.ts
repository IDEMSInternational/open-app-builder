#!/usr/bin/env node
import chalk from "chalk";
import * as fs from "fs-extra";
import logUpdate from "log-update";
import path from "path";
import PQueue from "p-queue";
import { drive_v3 } from "googleapis";
import { GaxiosResponse, GaxiosOptions } from "gaxios";

import {
  GDRIVE_OFFICE_MAPPING,
  MIMETYPE_EXTENSIONS,
  logError,
  listGdriveFolder,
  generateFolderFlatMapStats,
  ILocalFileWithStats,
} from "../utils";

const GOOGLE_FOLDER_MIMETYPE = "application/vnd.google-apps.folder";

/***************************************************************************************
 * CLI
 * @example download
 *************************************************************************************/
interface IProgramOptions {
  folderId: string;
  filename?: string;
  outputPath: string;
  cachePath: string;
  credentialsPath: string;
  authTokenPath: string;
}

import { Command } from "commander";
import { authorizeGDrive } from "./authorize";
import { PATHS } from "../paths";
const program = new Command("download");
export default program
  .description("Get active deployment")
  .requiredOption("-id --folder-id <string>", "Unique ID of folder to download (gdrive url suffix)")
  .option("-f --filename", "name of single file to download (default downloads all)")
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

  .action(async (options: IProgramOptions) => {
    // console.table(options);
    new GDriveDownloader(options).run();
  });

// Run if called directly from Node
if (require.main === module) {
  if (!process.argv.slice(2).length) {
    console.log(chalk.yellow("No command specified. See help below:"));
    program.outputHelp();
    process.exit(0);
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
    const { filename, folderId, authTokenPath, credentialsPath } = this.options;

    this.drive = await authorizeGDrive({ authTokenPath, credentialsPath });
    if (filename) {
      this.handleSingleDownload();
    } else {
      console.log(chalk.yellow("Retrieving list of files"));
      const files = await this.listGdriveFilesRecursively(folderId);
      fs.writeFileSync(`${PATHS.LOGS_DIR}/files.json`, JSON.stringify(files, null, 2));
      await this.syncServerFilesToLocal(files);
      console.log(chalk.green("Download Complete"));
    }
  }

  private async handleSingleDownload() {
    // const { filename } = this.options;
    // console.log(chalk.magenta("Only downloading files matching name ", filename));
    // const excelFilesFromCache: IGDriveFileWithFolder[] = JSON.parse(
    //   fs.readFileSync(`${PATHS.LOGS_DIR}/excelFiles.json`).toString()
    // );
    // const matchingFilesFromCache = excelFilesFromCache.filter(
    //   (file) => file.name.toLowerCase().indexOf(filename.toLowerCase()) > -1
    // );
    // if (matchingFilesFromCache.length === 0) {
    //   // we've never downloaded this file before so don't know the location. Require sync all
    //   console.log(chalk.red("File not found, full sync required"));
    //   const { filename, ...opts } = this.options;
    //   return new GDriveDownloader(opts).run();
    // }
    // console.log(
    //   chalk.green("Matching files\n", matchingFilesFromCache.map((file) => file.name).join("\n"))
    // );
    // await this.downloadGdriveFiles(matchingFilesFromCache, true);
  }

  /**
   *
   */
  private async syncServerFilesToLocal(files: IGDriveFileWithFolder[]) {
    // generate list of files to download
    const comparison = this.compareServerAndLocalFiles(files);
    const fileDownloads = [...comparison.new, ...comparison.updated];
    const { cachePath } = this.options;
    // Handle download of files to cache
    const queue = new PQueue({ autoStart: false });
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
      logUpdate(chalk.blue(`${total - queue.pending}/${total} downloaded`));
    });
    logUpdate.done();
    queue.start(), await queue.onIdle();
  }

  /**
   * Compare list of server files with local cache to determine new/updated/same/deleted
   */
  private compareServerAndLocalFiles(serverFiles: IGDriveFileWithFolder[]) {
    const { cachePath } = this.options;
    const output: IFileCompareOutput = { new: [], updated: [], same: [], deleted: [], ignored: [] };

    // generate hashmaps for easier lookup and compare of server and local files
    const localFilesHashmap = generateFolderFlatMapStats(cachePath);
    const serverFilesHashmap: { [relative_path: string]: IGDriveFileWithFolder } = {};

    // Compare server with local
    for (const serverFile of serverFiles) {
      (() => {
        const { folderPath, mimeType } = serverFile;
        let targetFilename = serverFile.name;
        // assign correct file extension if exporting
        if (GDRIVE_OFFICE_MAPPING[mimeType]) {
          targetFilename += `.${MIMETYPE_EXTENSIONS[mimeType]}`;
        }

        // run a regex test for anything ending .abc(d)
        // gdrive keeps duplicate open office formats of gsheets without extension
        // if uploaded as excel files, so these will be omitted (duplicate of converted export)
        const hasExtension = /\.([a-z0-9]){3,4}$/gi.test(targetFilename);
        if (!hasExtension) {
          output.ignored.push(serverFile);
          return;
        }
        // add to hashmap for use in local-server comparison
        const cacheRelativePath = folderPath ? `${folderPath}/${targetFilename}` : targetFilename;
        serverFilesHashmap[cacheRelativePath] = serverFile;

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
    // compare local with server to check for delete
    Object.keys(localFilesHashmap).forEach((relativePath) => {
      if (!serverFilesHashmap[relativePath]) output.deleted.push({ folderPath: relativePath });
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

function handleFileDownloadError(err: Error, file: IGDriveFileWithFolder, localTargetPath: string) {
  fs.removeSync(localTargetPath);
  let response = (err as any).response;
  const msg2 = response?.statusText || err.message || "";
  logError({
    msg1: `failed to download file: ${file.folderPath}/${file.name}`,
    msg2,
    logOnly: true,
  });
}

interface IGDriveFileWithFolder extends drive_v3.Schema$File {
  /** list of parent folders to file */
  folderPath: string;
}
interface IFileCompareOutput {
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

interface IFileCompareItem {
  file: IGDriveFileWithFolder;
  cacheTargetPath: "";
}
