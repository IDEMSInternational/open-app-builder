import type { FlowTypes } from "data-models";

export type IParsedWorkbookData = { [type in FlowTypes.FlowType]?: FlowTypes.FlowTypeWithData[] };

export interface IGDriveContentsEntry {
  id: string;
  name: string;
  // full relative path including parent folders and extension
  relativePath: string;
  mimeType: string;
  modifiedTime: string;
  folderPath: string;
  // only appears on xlsx uploaded files (not gsheet)
  fullFileExtension?: string;
  fileExtension?: string;
  md5Checksum?: string;
  size?: string;
  // populated during processing
  xlsxPath?: string;
}

export interface IConverterPaths {
  SHEETS_INPUT_FOLDER: string;
  SHEETS_CACHE_FOLDER: string;
  SHEETS_OUTPUT_FOLDER: string;
}
