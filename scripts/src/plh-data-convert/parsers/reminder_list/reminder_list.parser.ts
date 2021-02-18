import { FlowTypes } from "../../../../types";
import { DefaultParser } from "../default/default.parser";

export class ReminderListParser extends DefaultParser {
  constructor() {
    super();
  }
  postProcess(row: FlowTypes.Reminder_listRow) {
    // extract piped conditions
    const activationConditions = row.activation_condition_list as any[];
    row.activation_condition_list = activationConditions.map((c) => extractConditionList(c));
    const deactivationConditions = row.deactivation_condition_list as any[];
    row.deactivation_condition_list = deactivationConditions.map((c) => extractConditionList(c));
    return row;
  }
}

/**
 * Take an activation or deactivation criteria and format for use
 * @param c condition string formatted with pipe characters to separate action | value | timings
 * @example
 * ```
 * event_completed | first_app_launch | delay_1_day
 * ```
 */
function extractConditionList(c: string) {
  // some common authoring scenarios have been reduced to single keywords for ease-of-authoring
  // replace these with full specifications
  const shorthandReplacements = {
    sent: "reminder_action | sent",
    first_app_launch: "app_event | first_app_launch",
  };
  Object.entries(shorthandReplacements).forEach(
    ([original, replacement]) => (c = c.replace(original, replacement))
  );

  let [actionStr, value, timingStr] = c.split("|").map((s: string) => s.trim());

  const action = actionStr as FlowTypes.Reminder_conditionList["action"];
  let timing: FlowTypes.Reminder_conditionList["timing"] = null;
  if (timingStr) {
    const [comparison, quantity, unit] = timingStr.split("_").map((s: string) => s.trim());
    timing = { comparison, quantity: quantity ? Number(quantity) : null, unit } as any;
  }
  return { action, value, timing };
}
