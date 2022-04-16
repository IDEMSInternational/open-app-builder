import { IDeploymentConfig } from "data-models";
import { DEFAULT_CONSTANTS } from "data-models";

const app_constants = DEFAULT_CONSTANTS;
/** Define default startup actions for plh app */
app_constants.APP_INITIALISATION_DEFAULTS.app_first_launch_actions = [
  {
    type: "run_survey",
    value: "plhIntroSplash",
  },
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
  // Legacy mapping to output to existing workspace
  app_data: {
    sheets_output_path: "packages/app-data/data",
    assets_output_path: "packages/app-data/assets",
  },
  translations: {
    translated_strings_path: "packages/app-data/translations/from_translators",
    source_strings_path: "packages/app-data/translations/to_translate",
  },
  workflows: ["default.workflows.ts"],
};
export default config;
