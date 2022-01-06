import { FlowTypes } from "data-models";
import { extractDynamicFields } from "data-models";
import { DefaultParser } from "../default/default.parser";
import {
  arrayToHashmap,
  flattenJson,
  logWarning,
  parseAppDataCollectionString,
  parseAppDataListString,
} from "../../utils";

export class TemplateParser extends DefaultParser {
  constructor() {
    super();
    this.groupSuffix = "";
  }
  postProcess(row: FlowTypes.TemplateRow, nestedPath?: string) {
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
      if (row.type === "template") {
        row.name = row.value;
      } else {
        row.name = row.type;
      }
    }
    // track path to row when nested
    row._nested_name = nestedPath ? `${nestedPath}.${row.name}` : row.name;

    // convert any variables (local/global) list or collection strings (e.g. 'my_list_1')
    if (row.value && typeof row.value === "string") {
      if (row.name?.includes("_list") && row.value && typeof row.value === "string") {
        row.value = parseAppDataListString(row.value);
      }
      if (row.name?.includes("_collection") && row.value && typeof row.value === "string") {
        row.value = parseAppDataCollectionString(row.value);
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
      row._dynamicDependencies = this.extractDynamicDependencies(dynamicFields);
    }

    // handle nested rows in same way
    if (row.rows) {
      row.rows = row.rows.map((r) => this.postProcess(r, row._nested_name));
    }

    if (row.exclude_from_translation) {
      row.exclude_from_translation = this.parseExcludeFromTranslation(
        row.exclude_from_translation as any
      );
    }
    return row;
  }

  public postProcessFlows(flows: FlowTypes.FlowTypeWithData[]) {
    const flowsWithOverrides = this.assignTemplateOverrides(flows);
    return flowsWithOverrides;
  }

  /** Check all templates for specified overrides and link to override_target row where exists */
  private assignTemplateOverrides(flows: FlowTypes.FlowTypeWithData[]) {
    const flowsByName = arrayToHashmap(flows, "flow_name");
    for (const flow of flows) {
      const { override_target, override_condition, flow_name } = flow;
      if (override_target) {
        if (!flowsByName[override_target]) {
          logWarning({
            msg1: `Override target does not exist: ${override_target}`,
            msg2: flow_name,
          });
        } else {
          if (!flowsByName[override_target]._overrides) {
            flowsByName[override_target]._overrides = {};
          }
          flowsByName[override_target]._overrides[flow_name] = override_condition;
        }
      }
    }
    return Object.values(flowsByName);
  }

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

  private extractDynamicDependencies(dynamicFields: FlowTypes.TemplateRow["_dynamicFields"]) {
    const dynamicDependencies = {};
    const flatFields = flattenJson<FlowTypes.TemplateRowDynamicEvaluator[]>(dynamicFields);
    Object.entries(flatFields).forEach(([key, fields]) => {
      fields.forEach((field) => {
        const deps = dynamicDependencies[field.matchedExpression] || [];
        dynamicDependencies[field.matchedExpression] = [...deps, key];
      });
    });
    return dynamicDependencies;
  }

  /**
   *  HACK - refactor self-referencing actions so that the dynamic value can be updated at runtime
   *  TODO - will no longer be required if dynamic deps system updated to self populate in realtime (not template parser)
   */
  private hackUpdateActionSelfReferences(
    action_list: FlowTypes.TemplateRow["action_list"],
    rowName: string
  ) {
    return action_list.map((action) => {
      if (rowName && Array.isArray(action.args)) {
        action.args = action.args.map((arg) => {
          if (arg === `@local.${rowName}`) {
            arg = `this.value`;
          }
          return arg;
        });
      }
      return action;
    });
  }
}
