import { extractDynamicFields, FlowTypes } from "data-models";
import { extractDynamicDependencies } from "../../../../../lib/app-data/convert/utils";

/**
 * Assign `_dynamicFields` to all rows (including nested rows) with values that require
 * evaluation at runtime, e.g. `@local.some_value`. Nested rows manage their own dynamic fields.
 * Expects rows to already be nested and named, as generated names can also be dynamic
 */
export function assignDynamicFields(rows: FlowTypes.TemplateRow[]): FlowTypes.TemplateRow[] {
  return rows.map((row) => {
    const { _dynamicFields, ...rest } = row;
    const dynamicFields = extractDynamicFields(rest);
    const parsed: FlowTypes.TemplateRow = dynamicFields
      ? { ...rest, _dynamicFields: dynamicFields }
      : rest;
    if (Array.isArray(parsed.rows)) {
      parsed.rows = assignDynamicFields(parsed.rows);
    }
    return parsed;
  });
}

/**
 * Assign `_dynamicDependencies` to all rows (including nested rows) with `_dynamicFields`,
 * listing the row fields that depend on each dynamic expression.
 * Expects `_dynamicFields` to already be assigned (see `assignDynamicFields`)
 */
export function assignDynamicDependencies(rows: FlowTypes.TemplateRow[]): FlowTypes.TemplateRow[] {
  return rows.map((row) => {
    const parsed: FlowTypes.TemplateRow = row._dynamicFields
      ? { ...row, _dynamicDependencies: extractDynamicDependencies(row._dynamicFields) }
      : { ...row };
    if (Array.isArray(parsed.rows)) {
      parsed.rows = assignDynamicDependencies(parsed.rows);
    }
    return parsed;
  });
}
