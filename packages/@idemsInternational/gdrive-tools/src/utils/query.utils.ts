import { drive_v3 } from "googleapis";
import { logError } from ".";

/** Gets the name and id of a google drive folder */
export async function getGDriveFolderByName(
  drive: drive_v3.Drive,
  folder_name: string
): Promise<drive_v3.Schema$File> {
  const res = await drive.files.list({
    q: `mimeType='application/vnd.google-apps.folder' and name contains '${folder_name}'`,
    pageSize: 1,
    fields: "nextPageToken, files(id, name)",
  });
  const files = res.data.files;
  if (files.length > 0) {
    return files[0];
  } else {
    logError({
      msg1: `Google sheets folder not found, perhaps it has been removed?`,
      msg2: folder_name,
    });
  }
}

export async function getGDriveFolderById(
  drive: drive_v3.Drive,
  folder_id: string
): Promise<drive_v3.Schema$File> {
  const res = await drive.files
    .get({
      fileId: folder_id,
    })
    .catch((err) => {
      logError({
        msg1: `Google Drive folder not found\nhttps://drive.google.com/drive/folders/${folder_id}`,
        msg2: `Ensure the folder exists and you have access permission`,
        logOnly: true,
      });
      process.exit(1);
    });
  return res.data;
}

/** Query Gdrive list api to retrieve all non-deleted folders and files from a given folder id */
export async function listGdriveFolder(drive: drive_v3.Drive, folderId: string) {
  const res = await drive.files
    .list({
      q: `'${folderId}' in parents and trashed=false`,
      // TODO - handle case where files exceed pageSize
      pageSize: 1000,
      // list of possible file fields: https://developers.google.com/drive/api/v3/reference/files#resource
      fields:
        "nextPageToken, files(id, name, mimeType, modifiedTime, md5Checksum, size, fileExtension, fullFileExtension)",
    })
    .catch((error) => {
      const errData = (error as any)?.response?.data?.error;
      logError({
        msg1: `File list failed for folder: '${folderId}'`,
        msg2: `query: '${folderId}' in parents and trashed=false`,
        error: errData,
      });
      process.exit(1);
    });
  return res.data.files || [];
}
