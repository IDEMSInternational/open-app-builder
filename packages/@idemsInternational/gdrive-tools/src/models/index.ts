import * as z from "zod";
import {  getRelativeLocalPath } from "../utils";

/** Zod schema used to validate and transform api file entry metadata */
export const GDRIVE_FILE_ENTRY_SCHEMA = z
  .object({
    id: z.string(),
    name: z.string(),
    mimeType: z.string(),
    modifiedTime: z.string(),
    folderPath: z.string(),
    lastModifyingUser: z.object({ displayName: z.string() }),
    fileExtension: z.string().optional()
  })
  .transform((data) => ({
    ...data,
    // Assign additional relativePath to entires
    relativePath: getRelativeLocalPath(data),
  }));

/** Zod schema used to validate array of api file entry metadata */
export const GDRIVE_FILE_ENTRY_ARRAY_SCHEMA = z.array(GDRIVE_FILE_ENTRY_SCHEMA);

/** File entry format from gdrive-downloader */
export type IGdriveEntry = z.infer<typeof GDRIVE_FILE_ENTRY_SCHEMA>;



