import { FlowTypes } from "src/app/shared/model";
import { arrayToHashmap } from "src/app/shared/utils";

/**
 *
 * @param primary
 * @param secondary
 * @returns
 */
export function mergeNestedTemplates(
  primary: FlowTypes.TemplateRow,
  secondary: FlowTypes.TemplateRow
) {
  const merge = { ...secondary, ...primary };
  if (merge.rows) {
    merge.rows = mergeNestedTemplateRows(primary.rows, secondary.rows);
  }
  return merge;
}

/**
 * Given two sets of template rows, perform a deep merge on them and any nested child rows
 */
function mergeNestedTemplateRows(
  primary: FlowTypes.TemplateRow[] = [],
  secondary: FlowTypes.TemplateRow[] = []
): FlowTypes.TemplateRow[] {
  const primaryHashmap = arrayToHashmap(primary, "name");
  const secondaryHashmap = arrayToHashmap(secondary, "name");
  const merged = [];
  // make sure all secondary rows exist are overridden
  secondary.forEach((secondaryRow) => {
    const primaryRow = primaryHashmap[secondaryRow.name];
    let mergedRow = { ...secondaryRow };
    if (primaryRow) {
      // merge
      mergedRow = { ...secondaryRow, ...primaryRow };
      // remove overriden dynamic references
      // TODO - also remove _dynamicDependencies references
      // TODO - merge with processRowOverrideMethod
      Object.keys(primaryRow).forEach((field) => {
        if (mergedRow._dynamicFields?.[field]) {
          delete mergedRow._dynamicFields[field];
          if (Object.keys(mergedRow._dynamicFields).length === 0) {
            delete mergedRow._dynamicFields;
          }
        }
      });
    }
    if (mergedRow.rows) {
      mergedRow.rows = mergeNestedTemplateRows(primaryRow?.rows, secondaryRow.rows);
    }
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

const ASSETS_BASE = "assets/plh_assets";
/**
 * Ensure local assets have correct path name to local asset folder
 * @example getImageAssetPath("images/my_icon.svg") => "assets/plh_assets/images/my_icon"
 * TODO - share base folder / conversion method as util with scripts default.parser.ts
 */
export function getImageAssetPath(value: string) {
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
