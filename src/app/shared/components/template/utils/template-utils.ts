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
  const mergedHashmap = secondaryHashmap;
  Object.entries(primaryHashmap).forEach(([key, primaryRow]) => {
    const secondaryRow = secondaryHashmap[key];
    if (secondaryRow) {
      mergedHashmap[key] = { ...secondaryRow, ...primaryRow };
      if (mergedHashmap[key].rows) {
        mergedHashmap[key].rows = mergeNestedTemplateRows(primaryRow.rows, secondaryRow.rows);
      }
    } else {
      mergedHashmap[key] = primaryRow;
    }
  });
  return Object.values(mergedHashmap);
}
