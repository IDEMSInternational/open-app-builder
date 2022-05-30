import { IDeploymentConfig } from "data-models";
import { DEFAULT_CONSTANTS } from "data-models";

const app_constants = DEFAULT_CONSTANTS;
/** Define default startup actions for plh app */
app_constants.APP_INITIALISATION_DEFAULTS.app_launch_actions = [
  {
    type: "template_popup",
    value: "splash_screens",
    first_launch_only: true,
    condition: null,
  },
  {
    type: "template_popup",
    value: "accept_terms",
    first_launch_only: false,
    condition: "terms_not_accepted"
  },
  {
    type: "template_popup",
    value: "language_select",
    first_launch_only: true,
    condition: null,
  },
  {
    type: "template_popup",
    value: "organisation_registration",
    first_launch_only: true,
    condition: null,
  },
  {
    type: "tour_start",
    value: "home_screen_tour_intro",
    first_launch_only: true,
    condition: null
  },
];

/**
 * The default config should ideally be a superset of any extended configs
 * to allow for easier post-processing
 */
const config: IDeploymentConfig = {
  name: "plh_global",
  app_constants: DEFAULT_CONSTANTS,
  google_drive: {
    sheets_folder_id: "1n221Zv9LYuwxmjhiboq8vhQg67_K9L5f",
    assets_folder_id: "1dp9QAQ84m8pm0IBQTSPXe1ramyynKPNn",
  },
  app_data: {},
  translations: {
    translated_strings_path: "packages/app-data/translations_source/from_translators",
    source_strings_path: "packages/app-data/translations_source/to_translate",
  },
  _version: 1.0,
};

config.app_constants.APP_LANGUAGES.default = "gb_en";
config.app_constants.APP_SIDEMENU_DEFAULTS.title = "ParentApp";
config.app_constants.APP_HEADER_DEFAULTS.title = "ParentApp";
config.app_constants.NOTIFICATION_DEFAULTS.title = "New message from PLH";
config.app_constants.NOTIFICATION_DEFAULTS.text = "You have a new message from ParentApp";

export default config;
