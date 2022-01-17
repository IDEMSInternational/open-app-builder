/**
 * A list of mimetypes for converting from google drive formats to ms office
 * https://developers.google.com/drive/api/v3/ref-export-formats
 */
export const GDRIVE_OFFICE_MAPPING = {
  "application/vnd.google-apps.spreadsheet":
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.google-apps.document":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.google-apps.presentation":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

export const MIMETYPE_EXTENSIONS = {
  "application/vnd.google-apps.spreadsheet": "xlsx",
  "application/vnd.google-apps.document": "docx",
  "application/vnd.google-apps.presentation": "pptx",
};
