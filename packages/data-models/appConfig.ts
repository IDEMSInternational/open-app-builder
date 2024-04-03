/// <reference lib="dom" />
import APP_CONFIG_GLOBALS from "./app-config/globals";
import clone from "clone";
import { IAppSkin } from "./skin.model";

/*********************************************************************************************
 * Values used throughout the app
 *
 * NOTE - this file should not be edited directly. All constants can be overridden
 * via the `app_config` field in deployment configs, or by the `appConfig` of an applied skin
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
  APP_AUTH_USER: `${FIELD_PREFIX}._app_auth_user`,
  APP_LANGUAGE: `${FIELD_PREFIX}._app_language`,
  APP_SKIN: `${FIELD_PREFIX}._app_skin`,
  APP_THEME: `${FIELD_PREFIX}._app_theme`,
  APP_VERSION: `${FIELD_PREFIX}._app_version`,
  CONTENT_VERSION: `${FIELD_PREFIX}._content_version`,
  DEPLOYMENT_NAME: `${FIELD_PREFIX}._deployment_name`,
  SERVER_SYNC_LATEST: `${FIELD_PREFIX}._server_sync_latest`,
};

const APP_LANGUAGES = {
  /** Language used during first load. If translations do not exist will default to source strings (gb_en) */
  default: "gb_en",
};

/** Specifies the skins available to the current app build.
 * "defaultSkinName": the name of the skin used by default for a given build
 * "available": an array of all skins that are available to the current build */
const APP_SKINS: { defaultSkinName: string; available: IAppSkin[] } = {
  defaultSkinName: "default",
  available: [{ name: "default" }],
};

/** Specifies the themes available to the current app build.
 * "defaultThemeName": the theme used by default for a given build
 * "available": an array of all skins that are available to the current build */
const APP_THEMES = {
  defaultThemeName: "default",
  available: ["default"],
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

export type IHeaderColourOptions = "primary" | "secondary" | "none";
export type IHeaderVariantOptions = "default" | "compact";

const APP_HEADER_DEFAULTS = {
  title: "App",
  collapse: false,
  colour: "primary" as IHeaderColourOptions,
  // The "compact" variant reduces the header height and removes the title
  variant: "default" as IHeaderVariantOptions,
  // default only show menu button on home screen
  should_show_menu_button: (location: Location) =>
    activeRoute(location) === APP_ROUTE_DEFAULTS.home_route,
  // default show back button on all screens except home screen
  should_show_back_button: (location: Location) =>
    activeRoute(location) !== APP_ROUTE_DEFAULTS.home_route,
  // on device minimize app when back button pressed from home screen
  should_minimize_app_on_back: (location: Location) =>
    activeRoute(location) === APP_ROUTE_DEFAULTS.home_route,
};

/** Utility function to return the active pathname without any sidebar routing e.g. /home(sidebar:alt)  */
const activeRoute = (location: Location) => {
  return location.pathname.replace(/\(.+\)/, "");
};

const APP_FOOTER_DEFAULTS: { templateName: string | null } = {
  templateName: null,
};

const APP_SIDEMENU_DEFAULTS = {
  enabled: true,
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
  sidebar_open_field: "_feedback_sidebar_open",
};

const APP_UPDATES = {
  /** Check for updates on init and enable in-app "app_update" template actions */
  enabled: false,
  /**
   * Template to be displayed after a flexible update has downloaded, prompting the user to install
   * the update and restart the app. It should include a button that triggers the "app_update | complete" action
   * If no template is provided provided, installation of the downloaded flexible update will be completed on next app init
   */
  completeUpdateTemplate: "app_update_complete",
  /** Track whether an update is available for download */
  app_update_available_field: "_app_update_available",
  /** Track whether an update has been downloaded and is available for install */
  app_update_downloaded_field: "_app_update_downloaded",
};

const ASSET_PACKS = {
  enabled: false,
  /** By convention, this should match the deployment name */
  bucketName: "",
  folderName: "asset_packs",
};

const TASKS = {
  enabled: false,
  // The name of the field that tracks the currently highlighted task group
  highlightedTaskField: "_task_highlighted_group_id",
  // The top-level list of task groups (e.g. modules), containing task groups that can be highlighted
  taskGroupsListName: "workshop_tasks",
};

const APP_CONFIG = {
  APP_FIELDS,
  APP_HEADER_DEFAULTS,
  APP_INITIALISATION_DEFAULTS,
  APP_AUTHENTICATION_DEFAULTS,
  APP_LANGUAGES,
  APP_ROUTE_DEFAULTS,
  APP_SIDEMENU_DEFAULTS,
  APP_FOOTER_DEFAULTS,
  APP_STRINGS,
  APP_SKINS,
  APP_THEMES,
  APP_UPDATES,
  ASSET_PACKS,
  DYNAMIC_PREFIXES,
  FEEDBACK_MODULE_DEFAULTS,
  FIELD_PREFIX,
  NOTIFICATIONS_SYNC_FREQUENCY_MS,
  NOTIFICATION_DEFAULTS,
  SERVER_SYNC_FREQUENCY_MS,
  TASKS,
};
// Export as a clone to avoid risk one import could alter another
export const getDefaultAppConfig = () => clone(APP_CONFIG);
export type IAppConfig = typeof APP_CONFIG;

/** A recursive version of Partial, making all properties, included nested ones, optional.
 * Copied from https://stackoverflow.com/a/47914631
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
export type IAppConfigOverride = RecursivePartial<IAppConfig>;
