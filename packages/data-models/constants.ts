/*********************************************************************************************
 *  Constants used to generate types
 *
 * These are usually best-kept independent of types files to allow direct import
 * (typings can get confused depending on compiler if exported multiple times)
 ********************************************************************************************/

export const DYNAMIC_PREFIXES = [
  "local",
  "field",
  "fields",
  "global",
  "data",
  "campaign",
  "calc",
  "item",
  "raw",
] as const;

/**
 * All localstorage fields will be prefixed with this
 * TODO - this has not been consistently applied so refactoring required
 * */
export const FIELD_PREFIX = "rp-contact-field";

/**
 * Fieldnames hardcoded into the app
 * TODO - these have not been consistently applied so refactoring required
 * */
export const APP_FIELDS = {
  SERVER_SYNC_LATEST: `${FIELD_PREFIX}._server_sync_latest`,
  APP_LANGUAGE: `${FIELD_PREFIX}._app_language`,
};

/**
 * Some specific strings are currently hardcoded into the app
 * TODO - not all strings included, should add to when required
 */
export const APP_STRINGS = {
  NOTIFICATION_DEFAULT_TITLE: "Notification",
  NOTIFICATION_DEFAULT_TEXT: "You have a new message from PLH",
};
