import { Injectable } from "@angular/core";
import { TemplateVariablesService } from "../../services/template-variables.service";
import { FlowTypes } from "packages/data-models";
import { flattenJson } from "../../utils";
import { getNestedProperty, setNestedProperty } from "src/app/shared/utils";
import { addStringDelimiters } from "packages/shared/src/utils/delimiters";

type IDynamicHashmap = Record<string, { type: FlowTypes.IDynamicPrefix; fieldName: string }>;
export type IDataItemsEvalContext = {
  [prefix in FlowTypes.IDynamicPrefix]?: { [fieldName: string]: any };
};

@Injectable({ providedIn: "root" })
export class DataItemsService {
  constructor(private templateVariablesService: TemplateVariablesService) {}

  public async parseRow(row: FlowTypes.TemplateRow, templateRowMap = {}) {
    const parser = new DataItemsParser();
    const parsed = parser.parse(row);
    const evalContext: IDataItemsEvalContext = {};
    for (const { fieldName, type } of Object.values(parser.variables)) {
      const { parsedValue } = await this.templateVariablesService.getDynamicFieldValue(
        type,
        fieldName,
        templateRowMap
      );
      evalContext[type] ??= {};
      evalContext[type][fieldName] = parsedValue;
    }
    return { parsed, evalContext };
  }

  /** Copied from template-row service */
  public async parseDataList(dataList: { [id: string]: any }) {
    const parsed: { [id: string]: any } = {};
    for (const [listKey, listValue] of Object.entries(dataList)) {
      parsed[listKey] = listValue;
      for (const [itemKey, itemValue] of Object.entries(listValue)) {
        if (typeof itemValue === "string") {
          parsed[listKey][itemKey] =
            await this.templateVariablesService.evaluateConditionString(itemValue);
        }
      }
    }
    return parsed;
  }
}

// TODO - ideally full template parser should handle flattened
// TODO - compare full and matched expression to calc if further processing required

class DataItemsParser {
  public variables: IDynamicHashmap = {};

  public parse(row: FlowTypes.TemplateRow) {
    const parsed = JSON.parse(JSON.stringify(row)) as FlowTypes.TemplateRow;
    const { _dynamicFields, rows } = parsed;

    if (rows) {
      parsed.rows = rows.map((r) => this.parse(r));
    }

    if (_dynamicFields) {
      const flattened = flattenJson<FlowTypes.TemplateRowDynamicEvaluator[]>(_dynamicFields);
      for (const [key, evaluators] of Object.entries(flattened)) {
        const expressionVariables: { [prefix in FlowTypes.IDynamicPrefix]?: boolean } = {};
        for (const evaluator of evaluators) {
          const { fieldName, type } = evaluator;
          // mark fields that are being tracked
          expressionVariables[type] = true;
          this.variables[`${type}.${fieldName}`] = { type, fieldName };
        }

        const existing = getNestedProperty(parsed, key) as string;
        const delimited = addStringDelimiters(existing, Object.keys(expressionVariables));
        // add delimeters but remove initial curly braces and replace all curly braces for `[]`
        // so that can be directly evaluated in JS
        const replaced = delimtedToJS(delimited);
        setNestedProperty(key, replaced, parsed);
      }
      delete parsed._dynamicFields;
      delete parsed._dynamicDependencies;
    }

    return parsed;
  }
}

function delimtedToJS(v: string) {
  return (
    v
      .replace(/@/gi, "this.")
      // replace curly brackets for square
      .replace(/{/g, "[")
      .replace(/}/g, "]")
  );
  // if
}
