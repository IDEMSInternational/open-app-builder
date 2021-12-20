/// <reference lib="dom" />

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
export const APP_STRINGS = {};

export const NOTIFICATION_DEFAULTS = {
  title: "Notification",
  text: "You have a new message from PLH",
  time: {
    hour: 12,
    minute: 0,
  },
};

/** How often to attempt to re-evaluate scheduled notifications - currently every minutes */
export const NOTIFICATIONS_SYNC_FREQUENCY_MS = 1000 * 60 * 3;

/** How often to attempt sync - currently every 15mins */
export const SERVER_SYNC_FREQUENCY_MS = 1000 * 60 * 15;

export const APP_ROUTE_DEFAULTS = {
  /** Default redirect form landing '/' route */
  home_path: "/template/home_screen",
  /** Redirect path if no other routes found */
  fallback_path: "/template/home_screen",
  /** Specific list of url redirects from within the app */
  redirects: [
    {
      path: "home",
      redirectTo: "/template/home_screen",
    },
    {
      path: "privacy",
      redirectTo: "/template/app_menu_privacy_policy",
    },
  ],
};

export const APP_HEADER_DEFAULTS = {
  title: "ParentApp",
  // default only show menu button on home screen
  should_show_menu_button: (location: Location) =>
    location.pathname == APP_ROUTE_DEFAULTS.home_path,
  // default show back button on all screens except home screen
  should_show_back_button: (location: Location) =>
    location.pathname !== APP_ROUTE_DEFAULTS.home_path,
};

export const APP_SIDEMENU_DEFAULTS = {
  title: "ParentApp",
  // name of template to display in sidebar
  template_name: "app_menu",
  // show the current version number in the menu
  should_show_version: true,
  // show the current env (e.g. dev/prod)
  should_show_env: false,
};

/** Define app-specific startup tasks and logic */
export const APP_INITIALISATION_DEFAULTS = {
  /** Define initial launch tasks to be performed before main content loaded */
  app_first_launch_actions: [
    {
      type: "template_popup",
      value: "accept_terms",
    },
    {
      type: "template_popup",
      value: "language_select",
    },
    {
      type: "template_popup",
      value: "organisation_registration",
    },
    {
      type: "tour_start",
      value: "intro_tour",
    },
  ] as const,
  // TODO - better if refactored to more general handler with condition to filter
  // for things such as app_first_launch, app_version_first_launch etc. and pass data fields
};
