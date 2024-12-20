import type { IContentsEntry } from "shared";
import type { IGdriveEntry } from "../@idemsInternational/gdrive-tools";
import type { IAppConfig, IAppConfigOverride } from "./appConfig";

/** Update version to force recompile next time deployment set (e.g. after default config update) */
export const DEPLOYMENT_CONFIG_VERSION = 20241215.1;

/** Configuration settings available to runtime application */
export interface IDeploymentRuntimeConfig {
  /** version of open-app-builder used to compile, read from builder repo package.json */
  _app_builder_version: string;
  /** tag of content version provided by content git repo*/
  _content_version: string;

  api: {
    /** Specify whether to enable communication with backend API (default true)*/
    enabled: boolean;
    /** Name of target db for api operations. Default `plh` */
    db_name?: string;
    /**
     * Target endpoint for api. Default `https://apps-server.idems.international/api`
     * Will be replaced when running locally as per `src\app\shared\services\server\interceptors.ts`
     * */
    endpoint?: string;
  };
  analytics: {
    enabled: boolean;
    provider: "matomo";
    endpoint: string;
    siteId: number;
  };
  /** Optional override of any provided constants from data-models/constants */
  app_config: IAppConfigOverride;
  /** 3rd party integration for logging services */
  error_logging?: {
    /** sentry/glitchtip logging dsn */
    dsn: string;
  };
  /** Enable auth actions by specifying auth provider */
  auth: {
    /** provider to use with authentication actions. actions will be disabled if no provider specified */
    provider?: "firebase" | "supabase";
    /** prevent user accessing app pages without being logged in */
    enforceLogin?: boolean;
    /** template to display when enforceLogin enabled */
    signInTemplate?: string;
  };
  /**
   * Specify if using firebase for auth and crashlytics.
   * Requires firebase config available through encrypted config */
  firebase: {
    /** Project config as specified in firebase console (recommend loading from encrypted environment) */
    config?: {
      apiKey: string;
      authDomain: string;
      databaseURL: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId: string;
    };
    crashlytics: {
      /** Enables app crash reports to firebase crashlytics */
      enabled: boolean;
    };
  };
  /** Friendly name used to identify the deployment name */
  name: string;
  /** 3rd party integration for remote asset storage and sync */
  supabase: {
    enabled: boolean;
    url?: string;
    publicApiKey?: string;
  };
  web: {
    /** Relative path of custom favicon asset to load from app_data assets */
    favicon_asset?: string;
  };
}

/** Deployment settings not available at runtime  */
interface IDeploymentCoreConfig {
  google_drive: {
    /** @deprecated Use `sheets_folder_ids` array instead */
    sheets_folder_id?: string;
    /** IDs of folders containing app sheets, as seen in end of url */
    sheets_folder_ids?: string[];
    /** @deprecated Use `assets_folder_ids` array instead */
    assets_folder_id?: string;
    /** IDs of folders containing app assets, as seen in end of url */
    assets_folder_ids?: string[];
    /** generated gdrive access token. Default `packages/scripts/config/token.json` */
    auth_token_path?: string;
    /** filter function applied to sheets download that receives basic file info such as folder and id. Default `(gdriveEntry)=>true` */
    sheets_filter_function?: (gdriveEntry: IGdriveEntry) => boolean;
    /** filter function applied to assets download that receives basic file info such as folder and id. Default `(gdriveEntry)=>true` */
    assets_filter_function?: (gdriveEntry: IGdriveEntry) => boolean;
  };
  local_drive: {
    /** Location to sheets folder if working from local drive instead of google */
    sheets_path: string;
    /** Location to assets folder if working from local drive instead of google */
    assets_path: string;
  };
  android: {
    /** Play store unique app identifier, e.g. international.idems.example_app" */
    app_id?: string;
    /** Play store app name, e.g. "Example App" */
    app_name?: string;
    /** Location of source android assets (splash and launcher source images). */
    icon_asset_path?: string;
    splash_asset_path?: string;
    icon_asset_foreground_path?: string;
    icon_asset_background_path?: string;
    /** Support pinch-zoom within app. Default `false` */
    zoom_enabled?: boolean;
  };
  app_data: {
    /** Folder to populate processed content. Default `./app_data` */
    output_path: string;
    /** filter function that receives converted flows. Default `(flow)=>true`*/
    sheets_filter_function: (flow: IFlowTypeBase) => boolean;
    /** filter function that receives basic file info such as relativePath and size. Default `(fileEntry)=>true`*/
    assets_filter_function: (fileEntry: IContentsEntry) => boolean;
  };
  git: {
    /** Url of external git repo to store content */
    content_repo?: string;
    /** Current tag of content for release */
    content_tag_latest?: string;
  };
  ios: {
    /** App Store unique app identifier, e.g. "international.idems.example_app" */
    app_id?: string;
    /** App Store app name, e.g. "Example App" */
    app_name?: string;
    /** Support pinch-zoom within app. Default `false` */
    zoom_enabled?: boolean;
  };
  optimisation: {
    components?: {
      enabled?: boolean;
      implicit?: string[];
    };
  };
  translations: {
    /** List of all language codes to include. Default null (includes all) */
    filter_language_codes?: string[];
    /** generated output of list of strings to translate. Default `./app_data/translations_source/source_strings` */
    source_strings_path?: string;
    /** translated string for import. Default `./app_data/translations_source/translated_strings */
    translated_strings_path?: string;
  };
  workflows: {
    /** path to custom workflow files to include */
    custom_ts_files: string[];
    /** path for task working directory. Default `./tasks` */
    task_cache_path: string;
  };
  /** track whether deployment processed from default config */
  _validated: boolean;
  /** version number added from scripts to recompile on core changes */
  _version: number;
  /** track parent config  */
  _parent_config?: Partial<IDeploymentConfig & { _workspace_path: string }>;
}

/** Duplicate type defintion from data-models (TODO - find better way to share) */
interface IFlowTypeBase {
  flow_type: string;
  flow_name: string;
  flow_subtype?: string;
  status: "draft" | "released";
}

export type IDeploymentConfig = IDeploymentCoreConfig & IDeploymentRuntimeConfig;

/**
 * Generated config includes placeholders for all app_config entries to allow specific
 * overrides for deeply nested properties, e.g. `app_config.NOTIFICATION_DEFAULTS.time.hour`
 */
export type IDeploymentConfigGenerated = IDeploymentConfig & { app_config: IAppConfig };

/** Deployment with additional metadata when set as active deployment */
export interface IDeploymentConfigJson extends IDeploymentConfig {
  _workspace_path: string;
  _config_ts_path: string;
  _config_version: number;
}

export const DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS: IDeploymentRuntimeConfig = {
  _content_version: "",
  _app_builder_version: "",
  name: "",
  api: {
    enabled: true,
    db_name: "plh",
    endpoint: "https://apps-server.idems.international/api",
  },
  analytics: {
    enabled: true,
    provider: "matomo",
    siteId: 1,
    endpoint: "https://apps-server.idems.international/analytics",
  },
  app_config: {},
  auth: {},
  firebase: {
    config: null,
    crashlytics: { enabled: true },
  },
  supabase: {
    enabled: false,
  },
  web: {},
};

/** Full example of just all config once merged with defaults */
export const DEPLOYMENT_CONFIG_DEFAULTS: IDeploymentConfig = {
  ...DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS,
  // NOTE - app_config will be populated during config generation
  app_config: {} as any,
  name: "",
  google_drive: {
    assets_folder_id: "",
    sheets_folder_id: "",
    auth_token_path: "packages/scripts/config/token.json",
    sheets_filter_function: (gdriveEntry) => true,
    assets_filter_function: (gdriveEntry) => true,
  },
  android: {},
  local_drive: {
    assets_path: "./assets",
    sheets_path: "./sheets",
  },
  app_data: {
    output_path: "./app_data",
    sheets_filter_function: (flow) => true,
    assets_filter_function: (fileEntry) => true,
  },
  ios: {},
  optimisation: {},
  translations: {
    filter_language_codes: null,
    source_strings_path: "./app_data/translations_source/source_strings",
    translated_strings_path: "./app_data/translations_source/translated_strings",
  },
  workflows: {
    custom_ts_files: [],
    task_cache_path: "./tasks",
  },
  git: {},
  _validated: true,
  _parent_config: null,
  _version: 1.0,
};
