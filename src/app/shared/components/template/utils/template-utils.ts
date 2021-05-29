import { FlowTypes } from "src/app/shared/model";
import { arrayToHashmap } from "src/app/shared/utils";

export function mergeTemplateRows(
  primaryRow?: FlowTypes.TemplateRow,
  secondaryRow?: FlowTypes.TemplateRow
) {
  let mergedRow = { ...secondaryRow };
  if (primaryRow) {
    // merge
    mergedRow = { ...secondaryRow, ...primaryRow };
    // remove overriden dynamic references
    // TODO - also remove _dynamicDependencies references (or recalc at end)
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
