import * as fs from "fs-extra";
import path from "path";
import { drive_v3 } from "googleapis";
import { GaxiosResponse, GaxiosOptions } from "gaxios";
import chalk from "chalk";
import { authorizeGDrive } from "./auth";
import { GDRIVE_OFFICE_MAPPING, MIMETYPE_EXTENSIONS } from "./mimetypes";
import { ArrayToChunks } from "../utils/file-utils";

// constants
const GOOGLE_FOLDER_MIMETYPE = "application/vnd.google-apps.folder";
const GOOGLE_DRIVE_TARGET_FOLDER = "PLH Teens app Excel Sheets";
const OUTPUT_FOLDER = path.join(__dirname, "output");
const CACHE_FOLDER = path.join(__dirname, "cache");
const LOGS_DIR = path.join(__dirname, "logs", "gdrive-download");
// prepare folders
fs.ensureDirSync(OUTPUT_FOLDER);
fs.ensureDirSync(CACHE_FOLDER);
fs.emptyDirSync(OUTPUT_FOLDER);
fs.ensureDirSync(LOGS_DIR);
// global vars
let drive: drive_v3.Drive;

async function main() {
  console.log(chalk.yellow("Downloading GDrive Data"));
  try {
    drive = await authorizeGDrive();
    const { id, name } = await getPLHFolder();
    console.log(chalk.white("Checking folders for files"));
    const files = await listGdriveFilesRecursively(id, name);
    fs.writeFileSync(`${LOGS_DIR}/files.json`, JSON.stringify(files, null, 2));
    console.log(chalk.white("Downloading files"));
    await downloadGdriveFiles(files);
  } catch (ex) {
    console.error("GDrive download error", ex);
    process.exit(1);
  }
}
main().then(() => console.log(chalk.green("GDrive Data Downloaded")));

/**
 * Lists the names and IDs primary PLH folder
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function getPLHFolder(): Promise<drive_v3.Schema$File> {
  const res = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name contains '${GOOGLE_DRIVE_TARGET_FOLDER}'`,
    pageSize: 1,
    fields: "nextPageToken, files(id, name)",
  });
  const files = res.data.files;
  if (files.length > 0) {
    return files[0];
  } else {
    console.log(chalk.red("No PLH Excel folder founds"));
    process.exit(1);
  }
}

async function downloadGdriveFiles(files: IGDriveFileWithFolder[]) {
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
      await processGdriveFileExport(file);
      i++;
    }
  });
  await Promise.all(promises);
}

/**
 * Prepare for file export. Check local cache to see if file already exists, if not
 * download/export from google to cache and copy over
 */
async function processGdriveFileExport(file: IGDriveFileWithFolder) {
  // setup output folders, paths, and variables
  const { folderPath, modifiedTime } = file;
  let filepath = `${folderPath}/${file.name}`;
  // assign correct file extension if exporting
  if (GDRIVE_OFFICE_MAPPING[file.mimeType]) {
    filepath += `.${MIMETYPE_EXTENSIONS[file.mimeType]}`;
  }
  const cachePath = `${CACHE_FOLDER}/${filepath}`;
  fs.ensureDirSync(path.dirname(cachePath));
  // run a regex test for anything ending .abc(d)
  // gdrive keeps duplicate open office formats of gsheets without extension
  // if uploaded as excel files, so these will be omitted (duplicate of converted export)
  const hasExtension = /\.([a-z0-9]){3,4}$/gi.test(cachePath);
  if (!hasExtension) {
    return;
  }
  // Check if file already exists in previous cache folder and copy if unchanged
  // (md5hash/filesizes not supported for gsheets so can't use)

  if (fs.existsSync(cachePath)) {
    const localModified = fs.statSync(cachePath).mtime.toISOString();
    if (modifiedTime === localModified) {
      // Unchanged file (skip)
      console.log(chalk.gray(`[-] ${filepath}`));
    } else {
      // Modified file (export)
      console.log(chalk.cyan(`[M] ${filepath}`));
      await exportGdriveFile(cachePath, file);
    }
  } else {
    // New file (export)
    console.log(chalk.blue(`[N] ${filepath}`));
    await exportGdriveFile(cachePath, file);
  }
  // copy downloaded file back from cache to output file
  const outputPath = `${OUTPUT_FOLDER}/${filepath}`;
  fs.ensureDirSync(path.dirname(outputPath));
  fs.copyFileSync(cachePath, outputPath);
  // assign the same modified time to the file as google drive file
  // for use in future comparisons and copy as requried
  const mTime = new Date(file.modifiedTime);
  fs.utimesSync(cachePath, mTime, mTime);
  fs.utimesSync(outputPath, mTime, mTime);
}

async function exportGdriveFile(localPath: string, file: IGDriveFileWithFolder) {
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
      drive.files.export(params, options, (err, res: GaxiosResponse) => {
        if (err) handleErr(err);
        else res.data.pipe(dest);
      });
    }
    // download other files without conversion
    else {
      drive.files.get(params, options, (err, res: GaxiosResponse<any>) => {
        if (err) handleErr(err);
        else res.data.pipe(dest);
      });
    }
  });
}

/**
 * List all the files in a google drive folder recursively
 * @param drive - google-api drive object
 * @param folderId google-api folder id
 * @param folderPath used to recursively track nested folder names
 * @param files used to recursively track existing files and combine with new
 */
async function listGdriveFilesRecursively(
  folderId: string,
  folderPath = "",
  files: IGDriveFileWithFolder[] = []
) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    // TODO - handle case where files exceed pageSize
    pageSize: 1000,
    // list of possible file fields: https://developers.google.com/drive/api/v3/reference/files#resource
    fields:
      "nextPageToken, files(id, name, mimeType, modifiedTime, md5Checksum, size, fileExtension, fullFileExtension)",
  });
  const folderFiles = res.data.files.filter((file) => file.mimeType !== GOOGLE_FOLDER_MIMETYPE);
  folderFiles.forEach((f) => {
    files.push({ ...f, folderPath });
  });
  console.log(chalk.blue(`${pad(folderFiles.length, 3)} |`), chalk.blue(folderPath));
  const subFolders = res.data.files.filter((file) => file.mimeType === GOOGLE_FOLDER_MIMETYPE);
  for (let folder of subFolders) {
    const subfolderPath = `${folderPath}/${folder.name}`;
    const subfolderFiles = await listGdriveFilesRecursively(folder.id, subfolderPath);
    subfolderFiles.forEach((f) => {
      files.push({ ...f, folderPath: subfolderPath });
    });
  }
  return files;
}

function handleErr(err: Error) {
  console.error(err);
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

/***************************************************************************************************
 * Deprecated - 2020-12-01
 * (pending confirmation whether can be removed or not)
 ***************************************************************************************************/
// function getFileNameWithExtension(file: drive_v3.Schema$File) {
//   if (mimeTypeToExtension[file.mimeType]) {
//     return file.name + "." + mimeTypeToExtension[file.mimeType];
//   } else {
//     return file.name;
//   }
// }
// function getFilesInFolder(
//   drive: drive_v3.Drive,
//   folderId: string
// ): Promise<drive_v3.Schema$File[]> {
//   return new Promise((resolve, reject) => {
//     drive.files.list(
//       {
//         q: `'${folderId}' in parents and trashed=false and name != 'Old' and mimeType != 'application/vnd.google-apps.folder'`,
//         pageSize: 100,
//         fields: "nextPageToken, files(id, name)",
//       },
//       (err, res) => {
//         if (err) {
//           console.log("The API returned an error: " + err);
//           reject(err);
//         }
//         const files = res.data.files;
//         resolve(files);
//       }
//     );
//   });
// }

// async function getFilesRecursively(
//   drive: drive_v3.Drive,
//   folderId: string,
//   relPath: string
// ): Promise<{ file: drive_v3.Schema$File; relPath: string }[]> {
//   const res = await drive.files.list({
//     q: `'${folderId}' in parents and trashed=false`,
//     pageSize: 100,
//     fields: "nextPageToken, files(id, name, mimeType)",
//   });
//   const files = res.data.files.map((file) => ({ file: file, relPath: relPath }));
//   const subFolders = res.data.files.filter((file) => file.mimeType === GOOGLE_FOLDER_MIMETYPE);
//   const subFolderRequests = subFolders.map((file) =>
//     getFilesRecursively(drive, file.id, path.join(relPath, file.name))
//   );
//   const subFolderFiles = await Promise.all(subFolderRequests);
//   const flattened = subFolderFiles.reduce((acc, val) => acc.concat(val), []);
//   return files.concat(flattened);
// }
