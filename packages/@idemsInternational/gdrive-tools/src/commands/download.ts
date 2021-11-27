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
  ArrayToChunks,
  logError,
  listGdriveFolder,
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
import { HttpErrorResponse } from "@angular/common/http";
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
    fs.emptyDirSync(outputPath);
    fs.ensureDirSync(cachePath);
    fs.ensureDirSync(PATHS.LOGS_DIR);
    console.log(chalk.yellow("Downloading GDrive Data"));
  }

  public async run() {
    const { outputPath, filename, folderId, authTokenPath, credentialsPath } = this.options;

    this.drive = await authorizeGDrive({ authTokenPath, credentialsPath });
    if (filename) {
      this.handleSingleDownload();
    } else {
      console.log(chalk.yellow("Retrieving list of files"));

      await this.listGdriveFilesRecursively(folderId);

      // fs.writeFileSync(`${PATHS.LOGS_DIR}/excelFiles.json`, JSON.stringify(excelFiles, null, 2));
      // await this.downloadGdriveFiles(excelFiles);
    }
  }

  private async handleSingleDownload() {
    const { filename } = this.options;
    console.log(chalk.magenta("Only downloading files matching name ", filename));
    const excelFilesFromCache: IGDriveFileWithFolder[] = JSON.parse(
      fs.readFileSync(`${PATHS.LOGS_DIR}/excelFiles.json`).toString()
    );
    const matchingFilesFromCache = excelFilesFromCache.filter(
      (file) => file.name.toLowerCase().indexOf(filename.toLowerCase()) > -1
    );
    if (matchingFilesFromCache.length === 0) {
      // we've never downloaded this file before so don't know the location. Require sync all
      console.log(chalk.red("File not found, full sync required"));
      const { filename, ...opts } = this.options;
      return new GDriveDownloader(opts).run();
    }
    console.log(
      chalk.green("Matching files\n", matchingFilesFromCache.map((file) => file.name).join("\n"))
    );
    await this.downloadGdriveFiles(matchingFilesFromCache, true);
  }

  private async downloadGdriveFiles(files: IGDriveFileWithFolder[], ignoreCache = false) {
    console.log(
      "download files",
      files.map((f) => f.name)
    );
    // sort by path to make logging clearer
    files = files
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .sort((a, b) => (a.folderPath > b.folderPath ? 1 : -1));

    const total = files.length;
    let i = 0;
    // split into chunks to that downloads can be processed in parallel
    // without running out of memory if too many
    const chunks = ArrayToChunks(files, Math.ceil(total / 10));
    const promises = chunks.map(async (chunk) => {
      // process in series within a chunk
      for (const file of chunk) {
        await this.processGdriveFileExport(file, ignoreCache);
        i++;
      }
    });
    await Promise.all(promises);
  }

  /**
   * Prepare for file export. Check local cache to see if file already exists, if not
   * download/export from google to cache and copy over
   */
  private async processGdriveFileExport(file: IGDriveFileWithFolder, ignoreCache = false) {
    const { cachePath, outputPath } = this.options;
    // setup output folders, paths, and variables
    const { folderPath, modifiedTime } = file;
    let targetFilename = file.name;
    // assign correct file extension if exporting

    if (GDRIVE_OFFICE_MAPPING[file.mimeType]) {
      targetFilename += `.${MIMETYPE_EXTENSIONS[file.mimeType]}`;
    }
    // run a regex test for anything ending .abc(d)
    // gdrive keeps duplicate open office formats of gsheets without extension
    // if uploaded as excel files, so these will be omitted (duplicate of converted export)
    const hasExtension = /\.([a-z0-9]){3,4}$/gi.test(targetFilename);
    if (!hasExtension) {
      return;
    }
    // drive folderpaths prefix with '/' when existing so resolve as string
    const cacheTargetPath = path.resolve(`${cachePath}${folderPath}`, targetFilename);
    const outputTargetPath = path.resolve(`${outputPath}${folderPath}`, targetFilename);

    const logName = path.relative(cachePath, cacheTargetPath);

    // Check if file already exists in previous cache folder and copy if unchanged
    // (md5hash/filesizes not supported for gsheets so can't use)

    const shouldDownload = ignoreCache;

    if (ignoreCache) {
      console.log(chalk.cyan(`[Ignoring Cache - Downloading] ${logName}`));
      await exportGdriveFile(cacheTargetPath, file);
    }
    // Compare server and local, handle accordingly
    else if (fs.existsSync(cacheTargetPath)) {
      const localModified = fs.statSync(cacheTargetPath).mtime.toISOString();
      if (modifiedTime === localModified) {
        // Unchanged file (skip)
        console.log(chalk.gray(`[-] ${logName}`));
      } else {
        // Modified file (export)
        console.log(chalk.cyan(`[M] ${logName}`));
        await exportGdriveFile(cacheTargetPath, file);
      }
    } else {
      // New file (export)
      console.log(chalk.blue(`[N] ${logName}`));
      await exportGdriveFile(cacheTargetPath, file);
    }

    fs.ensureDirSync(path.dirname(cacheTargetPath));
    fs.ensureDirSync(path.dirname(outputTargetPath));

    fs.copyFileSync(cacheTargetPath, outputTargetPath);
    // assign the same modified time to the file as google drive file
    // for use in future comparisons and copy as requried
    const mTime = new Date(file.modifiedTime);
    fs.utimesSync(cacheTargetPath, mTime, mTime);
    fs.utimesSync(outputTargetPath, mTime, mTime);
    console.log({ outputTargetPath, cacheTargetPath });
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
          const subfolderPath = `${folderPath}/${subfolder.name}`;
          listRecursively(subfolder.id, subfolderPath);
        }
      });
    };

    // Start queue, handle logging and wait for complete
    queue.add(() => listRecursively(baseFolderId));
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
}

// if (process.argv[1] && process.argv[1].indexOf("sync-single") < 0) {
//   gdriveDownload().then(() => console.log(chalk.green("GDrive Data Downloaded")));
// }

async function exportGdriveFile(localPath: string, file: IGDriveFileWithFolder) {
  console.log("exporting", file.name);
  return new Promise<void>((resolve, reject) => {
    // Handle the export/download
    fs.createFileSync(localPath);
    const dest = fs.createWriteStream(localPath);
    // assign mimetype for conversion from google file formats to office format
    const mimeType = GDRIVE_OFFICE_MAPPING[file.mimeType] || file.mimeType;
    dest.on("close", () => {
      resolve();
    });
    const params = { fileId: file.id, mimeType, alt: "media" };
    const options: GaxiosOptions = { responseType: "stream", timeout: 30000 };
    // export gsheet/doc to office format
    if (GDRIVE_OFFICE_MAPPING[file.mimeType]) {
      this.drive.files.export(params, options, (err, res: GaxiosResponse) => {
        if (err) handleFileDownloadError(err, file);
        else res.data.pipe(dest);
      });
    }
    // download other files without conversion
    else {
      this.drive.files.get(params, options, (err, res: GaxiosResponse<any>) => {
        if (err) handleFileDownloadError(err, file);
        else res.data.pipe(dest);
      });
    }
  });
}

function handleFileDownloadError(err: Error, file: IGDriveFileWithFolder) {
  console.error();
  let response: HttpErrorResponse = (err as any).response;
  const msg2 = err.message || response.statusText;
  logError({ msg1: `failed to download file: ${file.name}`, msg2 });
  process.exit(1);
}

/** Pad a string with extra spaces (if shorter than specified length) */
function pad(str: string | number, length: number) {
  return `${str}`.length >= length ? str : pad(` ${str}`, length);
}

interface IGDriveFileWithFolder extends drive_v3.Schema$File {
  /** list of parent folders to file */
  folderPath: string;
}

// Download app data assets
//   console.log("downloading assets");
//   const assetFiles = await listGdriveFilesRecursively(assets_folderId);
//   fs.writeFileSync(`${LOGS_DIR}/assetFiles.json`, JSON.stringify(assetFiles, null, 2));
//   await downloadGdriveFiles(assetFiles);
