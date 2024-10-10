import { FlowTypes } from "src/app/shared/model";
import { arrayToHashmap } from "src/app/shared/utils";

/**
 * Take 2 template rows and perform a deep merge, including deep merge of nested row.rows
 * and removal of dynamic references on overwrite
 */
export function mergeTemplateRows(
  primaryRow?: FlowTypes.TemplateRow,
  secondaryRow?: FlowTypes.TemplateRow
) {
  let mergedRow = { ...secondaryRow };
  const dynamicFields = mergedRow._dynamicFields || {};
  Object.keys(primaryRow || {}).forEach((field) => {
    // merge primary rows on top of base merge (secondary)
    mergedRow[field] = primaryRow[field];
    // remove any old dynamic references
    if (dynamicFields[field]) {
      delete dynamicFields[field];
    }
    // add any new dynamic references
    // NOTE - this will currently not work as parent dynamic could refer to parent template variables
    // (e.g. @local) and not @global or @fields. Assume now static
    // TODO - could try add @parent dynamic type to track parent local or try find way set_dynamic child on update

    // if (primaryRow?._dynamicFields?.[field]) {
    //   dynamicFields[field] = primaryRow._dynamicFields[field];
    // }

    // assign back any dynamic references
    if (Object.keys(dynamicFields).length > 0) {
      mergedRow._dynamicFields = dynamicFields;
    }
    mergedRow._dynamicDependencies = extractDynamicDependencies(mergedRow._dynamicFields);
  });
  // deep merge nested rows
  if (mergedRow.rows) {
    mergedRow.rows = mergeTemplateNestedRows(primaryRow?.rows, secondaryRow.rows);
  }
  return mergedRow;
}

/**
 * Given two sets of template rows, perform a deep merge on them and any nested child rows
 */
function mergeTemplateNestedRows(
  primary: FlowTypes.TemplateRow[] = [],
  secondary: FlowTypes.TemplateRow[] = []
): FlowTypes.TemplateRow[] {
  const primaryHashmap = arrayToHashmap(primary, "name");
  const secondaryHashmap = arrayToHashmap(secondary, "name");
  const merged = [];
  // make sure all secondary rows exist are overridden
  secondary.forEach((secondaryRow) => {
    const primaryRow = primaryHashmap[secondaryRow.name];
    const mergedRow = mergeTemplateRows(primaryRow, secondaryRow);
    merged.push(mergedRow);
  });
  // make sure all primary rows exist
  Object.keys(primaryHashmap).forEach((name) => {
    if (!secondaryHashmap[name]) {
      merged.push(primaryHashmap[name]);
    }
  });
  return merged;
}

// TODO - combine with scripts methods
function extractDynamicDependencies(dynamicFields: FlowTypes.TemplateRow["_dynamicFields"] = {}) {
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
export function flattenJson<T>(json: any, tree = {}, nestedPath?: string): { [key: string]: T } {
  Object.entries<T>(json).forEach(([key, value]) => {
    const nestedName = nestedPath ? `${nestedPath}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      tree = { ...tree, ...flattenJson(value, tree, nestedName) };
    } else {
      tree[nestedName] = value;
    }
  });
  return tree;
}

/**
 * Take an object and return an array via the object.values method.
 * Provide additional check in case already is array (return array), or is not an object
 * (return empty array)
 */
export function objectToArray(obj: any) {
  if (Array.isArray(obj)) return obj;
  if (obj) {
    if (typeof obj === "object") {
      return Object.values(obj);
    }
  }
  return [];
}
