/// <reference lib="dom" />
import APP_CONFIG_GLOBALS from "./app-config/globals";
import clone from "clone";
import { type RecursivePartial } from "shared/src/types";
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

const APP_LANGUAGES = {
  /** Language used during first load. If translations do not exist will default to source strings (gb_en) */
  default: "gb_en",
};

export interface ILanguageMeta {
  rtl?: boolean;
}
const APP_LANGUAGES_META: { [languageCode: string]: ILanguageMeta } = {
  en_rtl: {
    rtl: true,
  },
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

export type IHeaderFooterBackgroundOptions = "primary" | "secondary" | "none";
/** The "compact" variant reduces the header height and removes the title */
export type IHeaderVariantOptions = "default" | "compact";

interface IAppConfigHeader {
  back_button: {
    hidden?: boolean;
  };
  collapse: boolean;
  colour: IHeaderFooterBackgroundOptions;
  hidden?: boolean;
  menu_button: {
    hidden?: boolean;
  };
  template: string | null;
  title: string;
  variant: IHeaderVariantOptions;
}

const APP_HEADER_DEFAULTS: IAppConfigHeader = {
  back_button: {},
  collapse: false,
  colour: "primary",
  menu_button: {},
  template: null,
  title: "App",
  variant: "default",
};

/**
 * Utility function to return the active pathname without any sidebar routing e.g. /home(sidebar:alt)
 * or basename when deployed to subfolder path, e.g. /my-repo/template/home (provided by <base href='' /> in head)
 * */
const activeRoute = (location: Location) => {
  const baseHref = document.querySelector("base")?.getAttribute("href");
  const path = location.pathname.replace(baseHref, "/").replace(/\(.+\)/, "");
  return path;
};

const APP_FOOTER_DEFAULTS = {
  templateName: null as string | null,
  background: "primary" as IHeaderFooterBackgroundOptions,
};

const LAYOUT = {
  page_padding: "24px",
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

/**
 * @deprecated 0.18.0
 * Use `deployment.auth` to configure auth
 */
const APP_AUTHENTICATION_DEFAULTS = {};

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
  APP_HEADER_DEFAULTS,
  APP_INITIALISATION_DEFAULTS,
  APP_AUTHENTICATION_DEFAULTS,
  APP_LANGUAGES,
  APP_LANGUAGES_META,
  APP_ROUTE_DEFAULTS,
  APP_SIDEMENU_DEFAULTS,
  APP_FOOTER_DEFAULTS,
  APP_STRINGS,
  APP_SKINS,
  APP_THEMES,
  APP_UPDATES,
  ASSET_PACKS,
  FEEDBACK_MODULE_DEFAULTS,
  LAYOUT,
  NOTIFICATIONS_SYNC_FREQUENCY_MS,
  NOTIFICATION_DEFAULTS,
  SERVER_SYNC_FREQUENCY_MS,
  TASKS,
};

/**
 * Get full app config populated with default values
 * Returned as an editable clone so that changes will not impact original
 */
export const getDefaultAppConfig = (): IAppConfig => clone(APP_CONFIG);

export type IAppConfig = typeof APP_CONFIG;

/** Config overrides support deep-nested partials, merged with defaults at runtime */
export type IAppConfigOverride = RecursivePartial<IAppConfig>;
