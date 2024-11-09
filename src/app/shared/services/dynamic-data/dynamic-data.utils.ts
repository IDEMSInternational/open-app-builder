import type { FlowTypes } from "packages/data-models/flowTypes";
import { TemplatedData } from "packages/shared/src/models/templatedData/templatedData";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { isEqual, isObjectLiteral } from "packages/shared/src/utils/object-utils";
import { JsonSchema, JsonSchemaTypes } from "rxdb";
import { booleanStringToBoolean } from "../../utils";

/**
 * Given an update to apply to a list of items check whether the update self-references
 * `@item.some_field` within any part of the update, and if so evaluated for each
 * individual item context. Return list of updates to apply, evaluated for item context
 */
export function evaluateDynamicDataUpdate(
  items: FlowTypes.Data_listRow[],
  update: Record<string, any>
) {
  if (hasDynamicDataItemReferences(update)) {
    const evaluator = new AppDataEvaluator();
    return items.map((item) => {
      evaluator.setExecutionContext({ item });
      const evaluated = evaluator.evaluate(update);
      // ensure target item id also included in update
      return { ...evaluated, id: item.id };
    });
  } else {
    return items.map((item) => {
      return { ...update, id: item.id };
    });
  }
}

/** Check whether the update does include any `@item` references */
function hasDynamicDataItemReferences(data: any) {
  const contextVariables = new TemplatedData().listContextVariables(data, ["item"]);
  return contextVariables.item;
}

/**
 * Compare an item with update snapshot and determine whether the update contains
 * any changes. As updates are partials only compare properties in update against item equivalent
 */
export function isItemChanged(
  item: FlowTypes.Data_listRow,
  update: Partial<FlowTypes.Data_listRow>
) {
  const isChanged = Object.entries(update).find(([key, value]) => !isEqual(item[key], value));
  return isChanged ? true : false;
}

/**
 * Use rxdb schema to cast data updates to the correct data types
 * Used to convert parameter_list values stored as strings to number or boolean where required
 * */
export function coerceDataUpdateTypes(schemaProperties: Record<string, JsonSchema>, data: any[]) {
  // create a general mapping to convert any listed schema property from a string value
  // to the correct schema value type
  const propertyMapping: Record<string, (v: string) => any> = {};
  for (const [key, { type }] of Object.entries(schemaProperties)) {
    // do not map metadata fields (can't be set by user input)
    if (!key.startsWith("_")) {
      propertyMapping[key] = typeMappings[type as JsonSchemaTypes];
    }
  }
  // coerce data values using mapping
  const coerced = [];
  for (const el of data) {
    if (isObjectLiteral(el)) {
      for (const [key, value] of Object.entries(el)) {
        // only map values if they are strings and have a defined mapping function
        if (propertyMapping[key] && typeof value === "string") {
          el[key] = propertyMapping[key](value);
        }
      }
    }
    coerced.push(el);
  }
  return coerced;
}

/**
 * Mapping functions used to coerce string values to RXDB schema types
 * This is a subset of mappings that could alternatively be provided by
 * https://ajv.js.org/coercion.html
 * **/
const typeMappings: Record<JsonSchemaTypes, (v: string) => any | undefined> = {
  // do not attempt to coerce arrays (data_list does not store array values)
  array: undefined,
  // convert boolean string to boolean
  boolean: (v) => booleanStringToBoolean(v),
  // convert string integer to integer
  integer: (v) => parseInt(v, 10),
  // do not attempt to coerce null schema
  null: undefined,
  // convert string number to number
  number: (v) => Number(v),
  // do not attempt to coerce objects (data_list does not store object values)
  object: undefined,
  // as incoming values will be formatted as strings do not provide any additional mapping
  string: undefined,
};
