import { FlowTypes } from "../../../../types";
import { DefaultParser } from "../default/default.parser";

export class TemplateParser extends DefaultParser {
  constructor() {
    super();
    this.groupSuffix = "";
  }
  postProcess(row: FlowTypes.TemplateRow) {
    // set all empty row and nested row types to 'set_variable' type
    if (!row.type) {
      row.type = "set_variable";
    }
    // TODO - confirm if handling the same and then remove from excel sheets
    if (row.type === ("template_group" as any)) {
      row.type = "template";
    }
    // when unique template name not specified assume namespacing with template value (flow_name)
    if (row.type === "template" && !row.name) {
      row.name = row.value;
    }
    // parse action list
    if (row.action_list) {
      row.action_list = row.action_list.map((actionString) =>
        this.parseActionString(actionString as any)
      )
      .filter((action) => action != null);
    }
    // convert boolean to strings (easier for future processing, as most update functions typically return strings)
    if (typeof row.hidden === "boolean") {
      row.hidden = `${row.hidden}`;
    }
    if (typeof row.value === "boolean") {
      row.value = `${row.value}`;
    }
    // handle nested rows in same way
    if (row.rows) {
      row.rows = row.rows.map((r) => this.postProcess(r));
    }
    return row;
  }

  /**
   * Convert action_list string to row action object, e.g.
   *
   * string: `"set_value | hide_intro | true"`
   *
   * parsed:
   * ```
   * {
   *    action_id: "set_value",
   *    args: ["hide_intro","true"]
   * }
   * ```
   */
  private parseActionString(actionString: string): FlowTypes.TemplateRowAction {
    const parts = actionString.split("|").map((s) => s.trim());
    const event_id = parts[0] as any;
    if (parts[1]) {
      const [action_id, ...args] = parts[1].split(":").map((s) => s.trim()) as any;
      return { event_id, action_id, args };
    } else {
      return null;
    }
  }
}
