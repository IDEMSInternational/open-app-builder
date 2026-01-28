/**
 * Protected fields can be set by field service and will be prefixed with an underscore
 * They are used to store store computed or exported variables and are not user overridable
 */
enum PROTECTED_FIELDS {
  /** Runtime environment, `production` or `development` */
  APP_ENVIRONMENT = "app_environment",
  APP_FIRST_LAUNCH = "app_first_launch",
  /** Location hostname of app, e.g. `localhost`, `example.web.app` */
  APP_HOSTNAME = "app_hostname",
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
  AUTH_USER_ID = "auth_user_id",
  CONTENT_VERSION = "content_version",
  DEPLOYMENT_NAME = "deployment_name",
  FEEDBACK_SELECTED_TEXT = "feedback_selected_text",
  FEEDBACK_SIDEBAR_OPEN = "feedback_sidebar_open",
  /**
   * Response to notification permission request. For values see
   * https://capacitorjs.com/docs/plugins/web#aliases
   **/
  NOTIFICATION_PERMISSION_STATUS = "notification_permission_status",
  MIGRATION_HISTORY = "MIGRATION_HISTORY",
  OPERATING_SYSTEM = "operating_system",
  PLATFORM = "platform",
  SERVER_SYNC_LATEST = "server_sync_latest",
}

/** Private fields are protected and will not be synced to the server */
enum PRIVATE_FIELDS {
  AUTH_USER_NAME = "auth_user_name",
  AUTH_USER_FAMILY_NAME = "auth_user_family_name",
  AUTH_USER_GIVEN_NAME = "auth_user_given_name",
  AUTH_USER_PICTURE = "auth_user_picture",
}

const PRIVATE_FIELDS_INVERSE_MAPPING = Object.fromEntries(
  Object.entries(PRIVATE_FIELDS).map(([k, v]) => [v, k])
);

/** Check whether a string represents the value from a private field, e.g. 'auth_user_name' */
export const isPrivateFieldName = (key: string) => key in PRIVATE_FIELDS_INVERSE_MAPPING;

/** Whenever retrieving a protected field make sure to include underscore prefix */
export const getProtectedFieldName = (key: IProtectedFieldName) => {
  const mappedName = PRIVATE_FIELDS[key] || PROTECTED_FIELDS[key];
  return `_${mappedName}`;
};

export type IProtectedFieldName = keyof typeof PROTECTED_FIELDS | keyof typeof PRIVATE_FIELDS;
