import { DB_TABLES, DB_VERSION } from "data-models/db.model";
import { SHEETS_CONTENT_LIST } from "../sheets";
const template = Object.values(SHEETS_CONTENT_LIST.template);

/** List of template flow subtypes to test */
const TEST_FLOW_SUBTYPES = ["debug","component_demo"];

/** List of additional template names to test */
const ADDITIONAL_TEMPLATE_NAMES = ["home_screen", "weekly_workshops"];

/** List of template names to skip */
const SKIPPED_TEMPLATE_NAMES = [];

/** Default time spent waiting to ensure page elements rendered fully */
const PAGE_WAIT_DEFAULT = 1000;

/** Default viewport height used for test, in pixels */
const PAGE_WIDTH_DEFAULT = 360;

/** Default viewport width used for test, in pixels */
const PAGE_HEIGHT_DEFAULT = 1280;

/** Custom wait times for pages that require longer loading */
const PAGE_WAIT_OVERRIDES = {
  example_lang_template_1: 2000,
  debug_advanced_dashed_box_1: 2000,
  home_screen: 2000,
  example_calc_2: 2000,
};

/** Custom overrides to set height for larger pages, in pixels */
const PAGE_HEIGHT_OVERRIDES = {
  example_lang_template_1: 3600,
};

/** Combined list of templates to test and map properties */
const VISUAL_TEST_TEMPLATE_LIST = template
  .filter((t) => {
    if (SKIPPED_TEMPLATE_NAMES.includes(t.flow_name)) return false;
    if (ADDITIONAL_TEMPLATE_NAMES.includes(t.flow_name)) return true;
    if (TEST_FLOW_SUBTYPES.includes(t.flow_subtype)) return true;
    return false;
  })
  .map((t) => ({
    name: t.flow_name,
    url: `template/${t.flow_name}`,
    selector: `plh-template-container[data-templatename="${t.flow_name}"]`,
    pageWait: PAGE_WAIT_OVERRIDES[t.flow_name] || PAGE_WAIT_DEFAULT,
    width: PAGE_WIDTH_DEFAULT,
    height: PAGE_HEIGHT_OVERRIDES[t.flow_name] || PAGE_HEIGHT_DEFAULT,
  }));

/** Main export for use in test runner */
export const VISUAL_TEST_CONFIG = {
  localStorageFields: { _app_language: "za_en", name: "test default user" },
  dexieConfig: {
    version: DB_VERSION,
    tableSchema: DB_TABLES,
    data: {
      user_meta: [{ key: "first_app_open", value: "2021-09-02" }],
    },
  },
  pageDefaults: {
    width: PAGE_WIDTH_DEFAULT,
    height: PAGE_HEIGHT_DEFAULT,
    // TODO - allow passing function to calculate resize
    // e.g. https://stackoverflow.com/questions/61886891/how-to-get-maximum-scroll-height-for-ion-content
  },
  pageList: VISUAL_TEST_TEMPLATE_LIST,
  appServerUrl: "http://localhost:4200",
} as const;
