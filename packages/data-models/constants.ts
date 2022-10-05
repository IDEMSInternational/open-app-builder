/// <reference lib="dom" />
import APP_CONFIG_GLOBALS from "./app-config/globals";
import clone from "clone";
/*********************************************************************************************
 *  Constants used throughout the app
 *
 * NOTE - this file should not be edited directly. All constants can be overridden
 * via the `app_constants` field in deployment configs
 *
 * NOTE - as these are merged when setting deployment, avoid `_path` suffix as that has
 * special use case for relative paths
 ********************************************************************************************/

const DYNAMIC_PREFIXES = [
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
const FIELD_PREFIX = "rp-contact-field";

/**
 * Fieldnames hardcoded into the app
 * TODO - these have not been consistently applied so refactoring required
 * */
const APP_FIELDS = {
  SERVER_SYNC_LATEST: `${FIELD_PREFIX}._server_sync_latest`,
  APP_LANGUAGE: `${FIELD_PREFIX}._app_language`,
  DEPLOYMENT_NAME: `${FIELD_PREFIX}._deployment_name`,
  APP_VERSION: `${FIELD_PREFIX}._app_version`,
  APP_AUTH_USER: `${FIELD_PREFIX}._app_auth_user`,
  APP_SKIN: `${FIELD_PREFIX}._app_skin`,
  APP_THEME: `${FIELD_PREFIX}._app_theme`,
};

const APP_LANGUAGES = {
  /** Language used during first load. If translations do not exist will default to source strings (gb_en) */
  default: "gb_en",
};

/**
 * WiP - App strings will be defined from global config
 * Temporarily just re-export to allow override from deployment in same way as rest of constants
 * */
const APP_STRINGS = APP_CONFIG_GLOBALS;

const NOTIFICATION_DEFAULTS = {
  title: APP_STRINGS.notification_default_title,
  text: APP_STRINGS.notification_default_text,
  time: {
    hour: 12,
    minute: 0,
  },
};

/** How often to attempt to re-evaluate scheduled notifications - currently every minutes */
const NOTIFICATIONS_SYNC_FREQUENCY_MS = 1000 * 60 * 3;

/** How often to attempt sync - currently every 5mins */
const SERVER_SYNC_FREQUENCY_MS = 1000 * 60 * 5;

const APP_ROUTE_DEFAULTS = {
  /** Default redirect form landing '/' route */
  home_route: "/template/home_screen",
  /** Redirect path if no other routes found */
  fallback_route: "/template/home_screen",
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

const APP_HEADER_DEFAULTS = {
  title: "App",
  // default only show menu button on home screen
  should_show_menu_button: (location: Location) =>
    location.pathname == APP_ROUTE_DEFAULTS.home_route,
  // default show back button on all screens except home screen
  should_show_back_button: (location: Location) =>
    location.pathname !== APP_ROUTE_DEFAULTS.home_route,
  // on device minimize app when back button pressed from home screen
  should_minimize_app_on_back: (location: Location) =>
    location.pathname == APP_ROUTE_DEFAULTS.home_route,
};

const APP_SIDEMENU_DEFAULTS = {
  title: "App",
  // name of template to display in sidebar
  template_name: "app_menu",
  // show the current version number in the menu
  should_show_version: true,
  // show the current deployment name (e.g. Default)
  should_show_deployment_name: false,
};

const APP_AUTHENTICATION_DEFAULTS = {
  enforceLogin: false,
  signInTemplate: "sign_in",
};

type IAppLaunchAction = {
  type: "template_popup" | "tour_start";
  value: string;
};
/** Define app-specific startup tasks and logic */
const APP_INITIALISATION_DEFAULTS = {
  /** Define initial launch tasks to be performed before main content loaded */
  app_first_launch_actions: [] as IAppLaunchAction[],

  // TODO - better if refactored to more general handler with condition to filter
  // for things such as app_first_launch, app_version_first_launch etc. and pass data fields
};

const FEEDBACK_MODULE_DEFAULTS = {
  /** Buttons that will be made available during feedback mode when context events triggered (e.g. right-click) */
  buttons: [
    {
      id: "feedback-addFeedback",
      menuButtonText: APP_STRINGS.feedback_add_button_text,
      appearInMenus: ["rightClick", "longPress", "textSelect"] as any[],
      displayedTemplate: "feature_feedback_default",
    },
    {
      id: "feedback-suggestChange",
      menuButtonText: APP_STRINGS.feedback_suggest_change_text,
      appearInMenus: ["textSelect"] as any[],
      displayedTemplate: "feature_feedback_text_select",
    },
  ],
  /** Field to populate with selected text for use in templates */
  selected_text_field: "_feedback_selected_text",
};

const APP_CONSTANTS = {
  APP_FIELDS,
  APP_HEADER_DEFAULTS,
  APP_INITIALISATION_DEFAULTS,
  APP_AUTHENTICATION_DEFAULTS,
  APP_LANGUAGES,
  APP_ROUTE_DEFAULTS,
  APP_SIDEMENU_DEFAULTS,
  APP_STRINGS,
  DYNAMIC_PREFIXES,
  FEEDBACK_MODULE_DEFAULTS,
  FIELD_PREFIX,
  NOTIFICATIONS_SYNC_FREQUENCY_MS,
  NOTIFICATION_DEFAULTS,
  SERVER_SYNC_FREQUENCY_MS,
};
// Export as a clone to avoid risk one import could alter another
export const getDefaultAppConstants = () => clone(APP_CONSTANTS);
export type IAppConstants = typeof APP_CONSTANTS;
