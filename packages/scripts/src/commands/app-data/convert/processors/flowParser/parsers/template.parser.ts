import { FlowTypes } from "data-models";
import { extractDynamicFields } from "data-models";
import { DefaultParser } from "./default.parser";
import {
  assignFlowOverrides,
  extractDynamicDependencies,
  parseAppDataCollectionString,
  parseAppDataListString,
} from "../../../utils";

export class TemplateParser extends DefaultParser {
  public override postProcessRow(row: FlowTypes.TemplateRow, rowNumber = 1, nestedPath?: string) {
    // remove empty rows
    if (Object.keys(row).length === 0) {
      return;
    }
    // set all empty row and nested row types to 'set_variable' type
    if (!row.type) {
      row.type = "set_variable";
    }
    // TODO - confirm if handling the same and then remove from excel sheets
    if (row.type === ("template_group" as any)) {
      row.type = "template";
    }
    // when unique name not specified assume namespacing with template value (flow_name)
    // or the row type for non-templates
    if (!row.name) {
      row.name = this.generateRowName(row, rowNumber);
    }

    // Ensure nested item or data_items rows also have unique names
    if (row.type === "data_items" || row.type === "items") {
      if (row.rows) {
        row.rows = this.generateItemRowNames(row.rows);
      }
    }

    // track path to row when nested
    row._nested_name = nestedPath ? `${nestedPath}.${row.name}` : row.name;
    // convert any variables (local/global) list or collection strings (e.g. 'my_list_1')
    // in similar way to how top-level properties get converted by default parser
    if (row.value && typeof row.value === "string") {
      if (row.name?.endsWith("_list") || row.name?.includes("_list_")) {
        row.value = this.parseTemplateList(row.value);
      }
      if (row.name?.endsWith("_collection") || row.name?.includes("_collection_")) {
        if (row.value && typeof row.value === "string") {
          // TODO - verify if case used and whether it might be better to use a different
          // column to store parsed object literal in value (would require type defs update)
          row.value = parseAppDataCollectionString(row.value) as any;
        }
      }
    }
    if (row.parameter_list) {
      row.parameter_list = this.parseParameterList(row.parameter_list as any);
    }
    if (row.action_list) {
      row.action_list = this.hackUpdateActionSelfReferences(row.action_list, row.name);
    }
    // extract dynamic fields for runtime evaluation
    const dynamicFields = extractDynamicFields(row);
    if (dynamicFields) {
      row._dynamicFields = dynamicFields;
      row._dynamicDependencies = extractDynamicDependencies(dynamicFields);
    }

    // handle nested rows in same way
    if (row.rows) {
      row.rows = row.rows.map((r, i) => this.postProcessRow(r, i + 1, row._nested_name));
    }

    if (row.exclude_from_translation) {
      row.exclude_from_translation = this.parseExcludeFromTranslation(
        row.exclude_from_translation as any
      );
    }

    const errors = this.qualityControlCheck(row);
    if (errors.length > 0) {
      throw JSON.stringify(errors, null, 2);
    }
    return row;
  }

  public override postProcessFlow(flow: FlowTypes.FlowTypeWithData): FlowTypes.FlowTypeWithData {
    const hoisted = this.hackHoistDisplayGroupVariables(flow);
    return hoisted;
  }

  public override postProcessFlows(flows: FlowTypes.FlowTypeWithData[]) {
    const flowsWithOverrides = assignFlowOverrides(flows);
    return flowsWithOverrides;
  }

  /**
   * Ensure any local variables defined with `_list` in their name are correctly
   * parsed into list format
   */
  private parseTemplateList(value: any) {
    // Assume all falsy values indicate an empty array
    if (!value) return [];

    // Assume any non-string values already parsed
    if (typeof value !== "string") return value;

    // HACK - use list separator to infer whether an actual list or not
    // E.g. avoid parsing reference `my_list : @local.some_other_list`
    // TODO - make clear to authors new convention
    if (!value.includes(";")) return value;

    // HACK - assume any list with | characters designed as parameter list
    const isCollectionList = value.includes("|");

    // convert to array
    let parsed: any[] = parseAppDataListString(value);

    // map array elements if collection list
    if (isCollectionList) {
      parsed = parsed.map((el: string) => parseAppDataCollectionString(el, "|"));
    }
    return parsed;
  }

  /** Convert parameter list string array (as provided by default parser) to key-value pairs */
  private parseParameterList(parameterList: string[]) {
    const parameterObj: FlowTypes.TemplateRow["parameter_list"] = {};
    parameterList.forEach((p) => {
      let [key, value] = p.split(":").map((str) => str.trim()) as any[];
      // if a single word is specified, e.g. 'box_display', assume setting param to true
      if (value === undefined) {
        value = "true";
      }
      parameterObj[key] = value;
    });
    return parameterObj;
  }

  private parseExcludeFromTranslation(value: boolean) {
    const result = value;
    return result;
  }

  /**
   *  HACK - refactor self-referencing actions so that the dynamic value can be updated at runtime
   *  TODO - will no longer be required if dynamic deps system updated to self populate in realtime (not template parser)
   */
  private hackUpdateActionSelfReferences(
    action_list: FlowTypes.TemplateRow["action_list"],
    rowName: string
  ) {
    // Ignore case where action list not array, such as when dynamic reference to @item.action_list
    if (!Array.isArray(action_list)) {
      return action_list;
    }
    return action_list.map((action) => {
      if (rowName) {
        if (Array.isArray(action.args)) {
          action.args = action.args.map((arg) => {
            if (arg === `@local.${rowName}`) {
              arg = `this.value`;
            }
            return arg;
          });
        }
        if (action.params) {
          for (const [key, value] of Object.entries(action.params)) {
            if (typeof value === "string" && value === `@local.${rowName}`) {
              action.params[key] = "this.value";
            }
          }
        }
      }
      return action;
    });
  }

  /**
   * Ensure any child rows of items or data_items have a name that will generate
   * uniquely with reference to item id
   */
  private generateItemRowNames(rows: FlowTypes.TemplateRow[]) {
    return rows.map((row, i) => {
      if (!row.name) {
        row.name = this.generateRowName(row, i + 1);
        row.name = `${row.name}_@item.id`;
      }
      return row;
    });
  }

  /** Automatically generate a row name when not provided by author */
  private generateRowName(row: FlowTypes.TemplateRow, rowNumber: Number) {
    switch (row.type) {
      // template row name assigned to target template name
      case "template":
        return row.value as string;
      // default use combination of row type and row number
      default:
        return `${row.type}_${rowNumber}`;
    }
  }

  /**
   * Automatically hoist any variables defined as direct child within display-group to top level
   * See https://github.com/IDEMSInternational/open-app-builder/issues/2989
   *
   * NOTE - in future more consistent handling would involve hoisting all variables declared within
   * UI components to nearest boundary. Default boundary is top-level of template, although
   * sub-boundaries would exist for nested templates or data_items loops
   * */
  private hackHoistDisplayGroupVariables(flow: FlowTypes.FlowTypeWithData) {
    const hoisted: FlowTypes.TemplateRow[] = [];
    flow.rows = flow.rows.map((row) => {
      if (row.type === "display_group" && Array.isArray(row.rows)) {
        const innerRows = row.rows as FlowTypes.TemplateRow[];
        hoisted.push(...innerRows.filter((r) => r.type === "set_variable"));
        row.rows = innerRows.filter((r) => r.type !== "set_variable");
      }
      return row;
    });
    flow.rows = [...hoisted, ...flow.rows];
    return flow;
  }

  private qualityControlCheck(row: FlowTypes.TemplateRow) {
    const errors: string[] = [];

    return errors;
  }
}
