import { FlowTypes } from "data-models";
import {
  assignDynamicDependencies,
  assignDynamicFields,
  assignNestedNames,
  assignRowNames,
  assignTranslatedFields,
  getFlowLanguage,
  isTrue,
  nestBeginEndRows,
  parseActionList,
  parseKeyValueList,
  parseListColumns,
  parseListRows,
  setDefaultValue,
} from "./transforms";
import { FlowParser, IFlowParserOptions } from "./flow.parser";

/**
 * Process an imported template flow before it is written to app_data
 * - Remove language suffixes from column names and record them in `_translatedFields`, along
 *   with `value` of rows where `include_in_translation` is TRUE and any translations
 *   (see `assignTranslatedFields`)
 * - Set rows without a type to `set_variable`
 * - Parse values of columns with names ending `_list` into arrays
 * - Parse the value of rows with names ending `_list` into arrays
 * - Convert `parameter_list` into key-value pairs
 * - Convert `action_list` into action objects
 * - Nest rows between `begin_` and `end_` rows
 * - Generate names for any rows without one
 * - Assign `_nested_name` path to all rows (ignoring display_group parents)
 * - Assign `_dynamicFields` and `_dynamicDependencies` for values evaluated at runtime
 * - Update `_source` (see `FlowParser`)
 */
export class TemplateParser extends FlowParser {
  protected parseRows(
    templateRows: FlowTypes.TemplateRow[],
    flow: FlowTypes.FlowTypeWithData,
    options: IFlowParserOptions
  ) {
    const language = getFlowLanguage(flow);
    const { translations } = options;
    // Transforms applied to each individual row
    let rows = templateRows.map((row) => {
      let parsed = assignTranslatedFields(row, language, {
        translations,
        context: "template",
        // As extracted for translation (see `extractTranslationEntries`)
        translatableFields: isTrue((row as any).include_in_translation) ? ["value"] : [],
      });
      parsed = setDefaultValue(parsed, "type", "set_variable");
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
    return rows;
  }
}

export function parseTemplate(flow: FlowTypes.FlowTypeWithData, options?: IFlowParserOptions) {
  return new TemplateParser().parse(flow, options);
}
