import { FlowTypes } from "../../../../types";
import { DefaultParser } from "../default/default.parser";
import { parsePLHString } from "../utils";

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
   * string: `"click | set_value | hide_intro:true"`
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
    const _raw = actionString;
    actionString = _handleTextExceptions(actionString);
    // ensure action starts with named trigger (default 'click')
    const actionTriggers: FlowTypes.TemplateRowAction["trigger"][] = [
      "click",
      "completed",
      "uncompleted",
    ];
    if (!actionTriggers.find((t) => actionString.startsWith(t))) {
      actionString = `click | ${actionString}`;
    }
    const _cleaned = actionString;
    // This was causing an error
    // const _parsed = parsePLHString(actionString);
    const parts = actionString.split("|").map((s) => s.trim());
    const trigger = parts[0] as any;
    if (parts[1]) {
      const [action_id, ...args] = parts[1].split(":").map((s) => s.trim()) as any;
      return { trigger, action_id, args, _raw, _cleaned };
    } else {
      return { trigger, action_id: null, args: [], _raw, _cleaned };
    }
    /* let [[trigger], [action_id, ...args]] = _parsed as any[];
    // when responding to actions the action_id is actually the emitted name, so move to args
    if (trigger === "respond_to_action") {
      args.unshift(action_id);
      action_id = "emit";
    }
    return { trigger, action_id, args, _raw, _cleaned }; */
    
  }
}

/**
 * some common authoring scenarios have been reduced to single keywords for ease-of-authoring
 * replace these with full specifications
 */
function _handleTextExceptions(text: string) {
  // a maximum of 1 replacement will be made, so order in terms of specifivity
  const shorthandReplacements = {
    exit: "emit | exit",
    mark_as_complete: "emit | complete",
    mark_as_skipped: "emit | skipped",
  };
  Object.entries(shorthandReplacements).some(([original, replacement]) => {
    // use a regular expression to prevent matching words that have additional content before
    // e.g. app_launch should not match on first_app_launch (start of string regex)
    const regex = new RegExp(`^${original}`);
    text = text.replace(regex, replacement);
    // if a match has been found return a true value so that future matches are not made
    // (e.g. prevent app_launch match running after first_launch match)
    return regex.test(text);
  });
  return text;
}
