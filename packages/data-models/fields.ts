/**
 * Protected fields can be set by field service and will be prefixed with an underscore
 * They are used to store store computed or exported variables and are not user overridable
 */
enum PROTECTED_FIELDS {
  APP_FIRST_LAUNCH = "app_first_launch",
  APP_LANGUAGE = "app_language",
  APP_LANGUAGE_DIRECTION = "app_language_direction",
  APP_SKIN = "app_skin",
  APP_THEME = "app_theme",
  /** Track whether an update is available for download */
  APP_UPDATE_AVAILABLE = "app_update_available",
  /** Track whether an update has been downloaded and is available for install */
  APP_UPDATE_DOWNLOADED = "app_update_downloaded",
  APP_USER_ID = "app_user_id",
  APP_VERSION = "app_version",
  AUTH_USER_DISPLAY_NAME = "auth_user_display_name",
  AUTH_USER_ID = "auth_user_id",
  AUTH_USER_PROFILE_IMAGE_URL = "auth_user_profile_image_url",
  CONTENT_VERSION = "content_version",
  DEPLOYMENT_NAME = "deployment_name",
  FEEDBACK_SELECTED_TEXT = "feedback_selected_text",
  FEEDBACK_SIDEBAR_OPEN = "feedback_sidebar_open",
  SERVER_SYNC_LATEST = "server_sync_latest",
}

/** Whenever retrieving a protected field make sure to include underscore prefix */
export const getProtectedFieldName = (key: IProtectedFieldName) => `_${PROTECTED_FIELDS[key]}`;

export type IProtectedFieldName = keyof typeof PROTECTED_FIELDS;

/** A list of protected fields that should not be synced to the server */
export const EXCLUDED_FIELDS: IProtectedFieldName[] = [
  "AUTH_USER_DISPLAY_NAME",
  "AUTH_USER_PROFILE_IMAGE_URL",
];
