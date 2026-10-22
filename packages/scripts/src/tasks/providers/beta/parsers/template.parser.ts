import { FlowTypes } from "data-models";
import {
  assignDynamicDependencies,
  assignDynamicFields,
  assignNestedNames,
  assignRowNames,
  nestBeginEndRows,
  parseActionList,
  parseKeyValueList,
  parseListColumns,
  parseListRows,
  setDefaultValue,
} from "./transforms";

/**
 * Process an imported template flow before it is written to app_data
 * - Set rows without a type to `set_variable`
 * - Parse values of columns with names ending `_list` into arrays
 * - Parse the value of rows with names ending `_list` into arrays
 * - Convert `parameter_list` into key-value pairs
 * - Convert `action_list` into action objects
 * - Nest rows between `begin_` and `end_` rows
 * - Generate names for any rows without one
 * - Assign `_nested_name` path to all rows (ignoring display_group parents)
 * - Assign `_dynamicFields` and `_dynamicDependencies` for values evaluated at runtime
 */
export function parseTemplate(flow: FlowTypes.FlowTypeWithData): FlowTypes.FlowTypeWithData {
  // Transforms applied to each individual row
  let rows = (flow.rows || []).map((row: FlowTypes.TemplateRow) => {
    let parsed = setDefaultValue(row, "type", "set_variable");
    parsed = parseListColumns(parsed);
    parsed = parseListRows(parsed);
    parsed = parseKeyValueList(parsed, "parameter_list");
    parsed = parseActionList(parsed, "action_list");
    return parsed;
  });

  // Transforms applied to all rows together
  rows = nestBeginEndRows(rows, flow.flow_name);
  rows = assignRowNames(rows);
  rows = assignNestedNames(rows, ["display_group"]);
  rows = assignDynamicFields(rows);
  rows = assignDynamicDependencies(rows);

  return { ...flow, rows };
}
