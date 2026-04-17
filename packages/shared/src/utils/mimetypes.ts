const MIME_TYPES: Record<string, string> = {
  // Images
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".bmp": "image/bmp",
  ".ico": "image/x-icon",
  ".tiff": "image/tiff",
  ".tif": "image/tiff",
  ".avif": "image/avif",
  // Video
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".mkv": "video/x-matroska",
  // Audio
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".flac": "audio/flac",
  ".aac": "audio/aac",
  ".oga": "audio/ogg",
  ".wma": "audio/x-ms-wma",
  ".m4a": "audio/mp4",
  // Documents
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".csv": "text/csv",
  ".txt": "text/plain",
  ".rtf": "application/rtf",
  ".json": "application/json",
  ".xml": "application/xml",
  ".zip": "application/zip",
};

// Built once at module load — first extension per MIME type wins
const EXTENSIONS: Record<string, string> = Object.entries(MIME_TYPES).reduce<
  Record<string, string>
>((acc, [ext, mime]) => {
  if (!acc[mime]) acc[mime] = ext;
  return acc;
}, {});

/** Get the MIME type for a filename based on its extension. */
export function getMimeType(filename: string): string | null {
  const basename = filename.split("/").pop() ?? "";
  // remove any additional info stored after extension name
  const clean = basename.split(/[?#]/)[0];
  const dotIdx = clean.lastIndexOf(".");
  if (dotIdx === -1) return null;
  const ext = clean.slice(dotIdx).toLowerCase();
  return MIME_TYPES[ext] ?? null;
}

/** Get the preferred file extension for a given MIME type. */
export function getExtensionForMime(mime: string): string | null {
  return EXTENSIONS[mime.toLowerCase()] ?? null;
}

/** Check if a filename's extension matches the expected MIME type. */
export function isFilenameValidForMime(filename: string, mime: string): boolean {
  return getMimeType(filename) === mime.toLowerCase();
}
