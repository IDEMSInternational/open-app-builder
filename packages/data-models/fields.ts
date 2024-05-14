/**
 * Protected fields can be set by field service and will be prefixed with an underscore
 * They are used to store store computed or exported variables and are not user overridable
 */
export enum PROTECTED_FIELDS {
  APP_AUTH_USER = "app_auth_user",
  APP_FIRST_LAUNCH = "app_first_launch",
  APP_LANGUAGE = "app_language",
  APP_SKIN = "app_skin",
  APP_THEME = "app_theme",
  APP_VERSION = "app_version",
  CONTENT_VERSION = "content_version",
  DEPLOYMENT_NAME = "deployment_name",
  SERVER_SYNC_LATEST = "server_sync_latest",
}

export type IProtectedFieldName = keyof typeof PROTECTED_FIELDS;
