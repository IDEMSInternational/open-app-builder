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
      mergedRow = { ...secondaryRow, ...primaryRow };
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
