import { FlowTypes } from "data-models";
import { booleanStringToBoolean, parseAppDataCollectionString } from "../utils";
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
export function parseAppDataActionString(actionString: string): FlowTypes.TemplateRowAction {
  const _raw = actionString;
  actionString = _handleTextExceptions(actionString);
  // ensure action starts with named trigger (default 'click')
  // TODO - CC 2021-05-17 - the list is growing long and non-specific, ideally should remove method
  // altogether and find better way to enforce action triggers
  const actionTriggers: { [trigger in FlowTypes.TemplateRowActionTrigger]: boolean } = {
    audio_end: true,
    audio_first_start: true,
    audio_pause: true,
    audio_play: true,
    changed: true,
    click: true,
    completed: true,
    uncompleted: true,
    nav_resume: true,
    sent: true,
    info_click: true,
  };
  if (!Object.keys(actionTriggers).find((t) => actionString.startsWith(t))) {
    actionString = `click | ${actionString}`;
  }
  const _cleaned = actionString;
  const parts = actionString.split("|").map((s) => s.trim());
  const trigger = parts[0] as any;
  const action: FlowTypes.TemplateRowAction = {
    trigger,
    action_id: null,
    args: [],
    _raw,
    _cleaned,
  };
  if (parts[1]) {
    // e.g `completed | emit:completed`
    let [action_id, ...args] = parts[1].split(":").map((s) => s.trim()) as any;
    action.action_id = action_id;
    action.args = args.map((arg) => booleanStringToBoolean(arg));
  }
  if (parts[2]) {
    // e.g. `click | pop_up:my_template | fullscreen:true`
    action.params = parseAppDataCollectionString(parts[2], ",");
  }
  return action;
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
