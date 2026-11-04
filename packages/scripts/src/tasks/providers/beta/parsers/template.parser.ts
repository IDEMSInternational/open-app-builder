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
  updateElement,
} from "./transforms";
import { IFlowParserOptions, localFlowSource } from "./data_list.parser";

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
 * - Replace `_source` with the local folder unless `fixed` is set
 */
export function parseTemplate(
  flow: FlowTypes.FlowTypeWithData,
  options: IFlowParserOptions = {}
): FlowTypes.FlowTypeWithData {
  const { fixed = false, folder } = options;
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

  const parsedFlow = fixed ? flow : updateElement(flow, "_source", localFlowSource(folder));
  return { ...parsedFlow, rows };
}
