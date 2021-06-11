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
function flattenJson<T>(json: any, tree = {}, nestedPath?: string): { [key: string]: T } {
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
 * Radio group and other value lists are often formatted with both name and text properties,
 * which are (currently) separated out at runtime. This function takes the value_list
 * string array and formats into an object array
 * @param items
 * ```
 * [name:name_var_1 | text:Option 1, name:name_var_2 | text: Option 2]
 * ```
 * @returns
 * ```
 * [{name:"name_var_1", text:"Option 1"}, {name:"name_var_2", text: "Option 2"}]
 * ```
 */
export function parseValueListItems(items: string[]): any[] {
  return items.map((item) => {
    const props = {};
    item
      .split("|")
      .map((i) => i.trim())
      .forEach((i) => {
        const [key, value] = i.split(":").map((v) => v.trim());
        props[key] = value;
      });
    return props;
  });
}

/**
 * Ensure local assets have correct path name to local asset folder
 * @example getImageAssetPath("images/my_icon.svg") => "assets/plh_assets/images/my_icon"
 * TODO - share base folder / conversion method as util with scripts default.parser.ts
 */
export function getImageAssetPath(value: string) {
  const ASSETS_BASE = "assets/plh_assets";
  // ensure starts either "assets/plh_assets" or "/assets/plh_assets"
  const regex = /^(\/)?assets\/plh_assets/gi;
  let transformed = value;
  if (!regex.test(transformed)) {
    transformed = `${ASSETS_BASE}/${transformed}`.replace("//", "/");
  }
  // remove duplicate path if exist (TODO - CC 2021-05-13 possibly no longer required)
  if (transformed.includes(`${ASSETS_BASE}/${ASSETS_BASE}`)) {
    transformed = transformed.replace(`${ASSETS_BASE}/${ASSETS_BASE}`, ASSETS_BASE);
  }
  return transformed;
}
