import { FlowDebugLog, IFlowDebugReference } from "../flowDebugLog";

/** Row types whose `value` is the name of another flow, and the `_debug` list it is added to */
const REFERENCE_ROW_TYPES: Record<string, IFlowDebugReference> = {
  template: "nested_templates",
  begin_template: "nested_templates",
  nav: "navigation",
  begin_nav: "navigation",
};

/** Actions whose first arg is the name of a template navigated to */
const NAVIGATION_ACTIONS = ["go_to"];

interface IReferenceRow {
  type?: string;
  value?: unknown;
  action_list?: unknown;
  rows?: unknown[];
}

/**
 * Record the nested templates and navigation of a template in its `_debug`:
 * - `nested_templates`: `value` of `template` and `begin_template` rows
 * - `navigation`: `value` of `nav` and `begin_nav` rows, and the template of any `go_to` action
 *   in an `action_list`, whatever its trigger (e.g. `click | go_to: home`)
 *
 * Includes rows nested within other rows, and dynamic values as authored (e.g. `@local.name`).
 * Action lists can be parsed (see `parseActionList`) or authored strings
 */
export function recordTemplateReferences(rows: IReferenceRow[], log: FlowDebugLog) {
  for (const row of rows) {
    const reference = typeof row.type === "string" ? REFERENCE_ROW_TYPES[row.type] : undefined;
    const value = toName(row.value);
    if (reference && value) log.reference(reference, value);
    for (const target of getNavigationTargets(row.action_list)) {
      log.reference("navigation", target);
    }
    if (Array.isArray(row.rows)) recordTemplateReferences(row.rows as IReferenceRow[], log);
  }
}

/** Templates navigated to by `go_to` actions in an action list */
function getNavigationTargets(actionList: unknown): string[] {
  // A single string is a reference to a list (e.g. `@item.action_list`), so not checked
  if (!Array.isArray(actionList)) return [];
  const targets: string[] = [];
  for (const action of actionList) {
    if (typeof action === "string") {
      // Authored string, e.g. `click | go_to: home`
      const match = action.match(/\|\s*([\w-]+)\s*:\s*([^|;]+)/);
      const name = toName(match?.[2]);
      if (match && NAVIGATION_ACTIONS.includes(match[1]) && name) targets.push(name);
    } else if (action && typeof action === "object") {
      const { action_id, args } = action as { action_id?: string; args?: unknown[] };
      const name = toName(Array.isArray(args) ? args[0] : undefined);
      if (action_id && NAVIGATION_ACTIONS.includes(action_id) && name) targets.push(name);
    }
  }
  return targets;
}

function toName(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}
