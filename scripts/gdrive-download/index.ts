import fs from 'fs';
import path from 'path';
import { drive_v3 } from 'googleapis';
import { authorizeGDrive } from './auth';
import { Readable } from 'stream';
import rimraf from "rimraf";
import ncp from "ncp";

async function createFolderIfNotExists(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
        return fs.promises.mkdir(folderPath);
    }
    return;
}

async function main() {
    try {
        const drive = await authorizeGDrive();
        const folderId = await getPLHFolderId(drive);
        const outputFolder = path.join(__dirname, "../plh-spreadsheet/input");
        rimraf.sync(outputFolder);
        await downloadFilesRecursively(drive, folderId, outputFolder);
        const gdriveAssets = path.join(outputFolder, "assets");
        if (fs.existsSync(gdriveAssets)) {
            ncp(gdriveAssets,
                path.join(__dirname, "../../src/assets"),
                (err) => {
                    console.log("Copied assets folder");
                });
        } else {
            console.log("Copying assets folder");
        }

    } catch (ex) {
        console.log("GDrive download error", ex);
    }
}
main();

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function getPLHFolderId(drive: drive_v3.Drive): Promise<string> {
    const res = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder' and name contains 'PLH' and name contains 'Excel'",
        pageSize: 1,
        fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    if (files.length > 0) {
        console.log("Using folder ", files[0].name, " with id ", files[0].id);
        return files[0].id;
    } else {
        console.log('No PLH Excel folder founds');
    }
}

function getFilesInFolder(drive: drive_v3.Drive, folderId: string): Promise<drive_v3.Schema$File[]> {
    return new Promise((resolve, reject) => {
        drive.files.list({
            q: `'${folderId}' in parents and trashed=false and name != 'Old' and mimeType != 'application/vnd.google-apps.folder'`,
            pageSize: 100,
            fields: 'nextPageToken, files(id, name)',
        }, (err, res) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                reject(err);
            };
            const files = res.data.files;
            resolve(files);
        });
    });
}

const exportMimeTypeMapping = {
    "application/vnd.google-apps.spreadsheet": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.google-apps.document": "application/vnd.openxmlformats-officedocument.wordprocessing",
    "application/vnd.google-apps.presentation": "application/vnd.openxmlformats-officedocument.presentationml.presentation"
}

const mimeTypeToExtension = {
    "application/vnd.google-apps.spreadsheet": "xlsx",
    "application/vnd.google-apps.document": "docx",
    "application/vnd.google-apps.presentation": "pptx"
};

async function downloadSingleFile(drive: drive_v3.Drive, file: drive_v3.Schema$File, outputPath: string) {
    let readStream: Readable;
    if (exportMimeTypeMapping[file.mimeType]) {
        try {
            const res = await drive.files.export({
                fileId: file.id,
                mimeType: exportMimeTypeMapping[file.mimeType],
                alt: 'media'
            }, {
                responseType: "stream"
            });
            readStream = res.data as any;
        } catch (ex) {
            console.log("Error with Export API ", ex);
        }
    } else {
        try {
            const res = await drive.files.get({
                fileId: file.id,
                alt: 'media'
            }, {
                responseType: "stream"
            });
            readStream = res.data as any;
        } catch (ex) {
            console.log("ERROR FILE", file);
            console.log("Error with Get API ", ex.message);
        }
    }
    if (readStream) {
        const dest = fs.createWriteStream(outputPath);
        let progress = 0;
        readStream
            .on('end', () => {
                if (process.stdout.isTTY) {
                    process.stdout.clearLine(0);
                    process.stdout.cursorTo(0);
                }
                console.log('Done downloading file to ' + outputPath);
            })
            .on('error', err => {
                console.error('Error downloading file ' + file.name);
            })
            .on('data', d => {
                progress += d.length;
                if (process.stdout.isTTY) {
                    process.stdout.clearLine(0);
                    process.stdout.cursorTo(0);
                    process.stdout.write(`Downloading to ${outputPath} - ${progress} bytes`);
                }
            })
            .pipe(dest);
    } else {
        console.log("No data from response :(");
    }

}

function getFileNameWithExtension(file: drive_v3.Schema$File) {
    if (mimeTypeToExtension[file.mimeType]) {
        return file.name + "." + mimeTypeToExtension[file.mimeType];
    } else {
        return file.name;
    }
}

async function downloadFilesRecursively(drive: drive_v3.Drive, folderId: string, outputPath: string): Promise<any> {
    await createFolderIfNotExists(outputPath);

    const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false and name != 'Old'`,
        pageSize: 100,
        fields: 'nextPageToken, files(id, name, mimeType)',
    });
    const files = res.data.files.filter((file) => file.mimeType !== 'application/vnd.google-apps.folder');
    await Promise.all(files.map((file) => {
        return downloadSingleFile(drive, file, path.join(outputPath, getFileNameWithExtension(file)));
    }));
    const subFolders = res.data.files
        .filter((file) => file.mimeType === 'application/vnd.google-apps.folder');
    const subFolderRequests = subFolders
        .map((file) => downloadFilesRecursively(drive, file.id, path.join(outputPath, file.name)));
    return Promise.all(subFolderRequests);
}

async function getFilesRecursively(drive: drive_v3.Drive, folderId: string, relPath: string): Promise<{ file: drive_v3.Schema$File, relPath: string }[]> {
    const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        pageSize: 100,
        fields: 'nextPageToken, files(id, name, mimeType)',
    });
    const files = res.data.files.map((file) => ({ file: file, relPath: relPath }));
    const subFolders = res.data.files
        .filter((file) => file.mimeType === 'application/vnd.google-apps.folder');
    const subFolderRequests = subFolders
        .map((file) => getFilesRecursively(drive, file.id, path.join(relPath, file.name)));
    const subFolderFiles = await Promise.all(subFolderRequests);
    const flattened = subFolderFiles.reduce((acc, val) => acc.concat(val), [])
    return files.concat(flattened);
}