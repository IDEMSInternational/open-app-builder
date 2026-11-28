import { authorizeGDriveFiles } from "@idemsInternational/gdrive-tools";
import { FlowTypes } from "data-models";
import { Readable } from "stream";
import * as xlsx from "xlsx";
import { CREDENTIALS_PATH } from "../../../../paths";
import { logWarning } from "../../../../utils";
import { SheetConvertor } from "./sheetConvertor";

const XLSX_MIMETYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const GOOGLE_SHEET_MIMETYPE = "application/vnd.google-apps.spreadsheet";
const GOOGLE_FOLDER_MIMETYPE = "application/vnd.google-apps.folder";

export type IDrive = Awaited<ReturnType<typeof authorizeGDriveFiles>>["drive"];

/** Google drive client with permission to create files (`drive.file` scope) */
export async function authorizeDriveFiles(authTokenPath: string) {
  const { drive } = await authorizeGDriveFiles({
    credentialsPath: CREDENTIALS_PATH,
    authTokenPath,
  });
  return drive;
}

/**
 * Create a google sheet from flows, with a `==content_list==` tab listing the flows and a tab
 * of rows per flow
 * @returns url of the new sheet
 */
export async function uploadFlowsSheet(
  drive: IDrive,
  flows: FlowTypes.FlowTypeWithData[],
  options: { name: string; folderId: string }
) {
  const workbook = SheetConvertor.flowToSheet(flows);
  const xlsxData: Buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
  const file = await drive.files.create({
    requestBody: {
      name: options.name,
      mimeType: GOOGLE_SHEET_MIMETYPE,
      parents: [options.folderId],
    },
    media: { mimeType: XLSX_MIMETYPE, body: Readable.from(xlsxData) },
    fields: "id",
    supportsAllDrives: true,
  });
  return `https://docs.google.com/spreadsheets/d/${file.data.id}`;
}

/**
 * Create a google drive folder, in My Drive if it cannot be created in the parent folder
 * (the `drive.file` scope can only add to folders the user has given the app access to)
 * @returns id and url of the new folder
 */
export async function createDriveFolder(drive: IDrive, name: string, parentId?: string) {
  const create = (parents?: string[]) =>
    drive.files.create({
      requestBody: { name, mimeType: GOOGLE_FOLDER_MIMETYPE, parents },
      fields: "id",
      supportsAllDrives: true,
    });
  let folder: Awaited<ReturnType<typeof create>>;
  try {
    folder = await create(parentId ? [parentId] : undefined);
  } catch (error) {
    if (!parentId) throw error;
    logWarning({
      msg1: `Could not create folder in ${parentId}, creating in My Drive instead`,
      msg2: (error as Error).message,
    });
    folder = await create();
  }
  const id = folder.data.id as string;
  return { id, url: `https://drive.google.com/drive/folders/${id}` };
}

/**
 * Move a google drive file or folder (with its contents) to the bin, so it can be restored for
 * 30 days
 * @returns false if it could not be binned (e.g. no permission). A file that no longer exists
 * counts as binned
 */
export async function binDriveFile(drive: IDrive, fileId: string, url: string) {
  try {
    await drive.files.update({
      fileId,
      requestBody: { trashed: true },
      supportsAllDrives: true,
    });
    return true;
  } catch (error) {
    const { code, message } = error as { code?: number; message?: string };
    // Already deleted, so nothing to do
    if (code === 404) return true;
    logWarning({ msg1: `Could not delete, unlinking only: ${url}`, msg2: message });
    return false;
  }
}
