import { template } from "../data/template";

/** List of template flow subtypes to test */
const TEST_FLOW_SUBTYPES = ["debug"];

/** Combined list of templates to test */
export const VISUAL_TEST_TEMPLATE_LIST = template
  .filter((t) => TEST_FLOW_SUBTYPES.includes(t.flow_subtype))
  .map((t) => ({
    name: t.flow_name,
    url: `template/${t.flow_name}`,
    selector: `plh-template-container[data-templatename="${t.flow_name}"]`,
  }));
