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
    if (row.rows) {
      row.rows = row.rows.map((r) => this.postProcess(r));
    }
    // parse action list
    if (row.action_list) {
      row.action_list = row.action_list.map((actionString) =>
        this.parseActionString(actionString as any)
      );
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
    const [action_id, ...args] = actionString.split("|").map((s) => s.trim()) as any;
    return { action_id, args };
  }
}
