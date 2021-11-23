import { template } from "../data/template";

/** List of template flow subtypes to test */
const TEST_FLOW_SUBTYPES = ["debug"];

/** List of additional template names to test */
const ADDITIONAL_TEMPLATE_NAMES = ["home_screen", "weekly_workshops"];

/** List of template names to skip */
const SKIPPED_TEMPLATE_NAMES = [];

/** Combined list of templates to test */
export const VISUAL_TEST_TEMPLATE_LIST = template
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
  }));
