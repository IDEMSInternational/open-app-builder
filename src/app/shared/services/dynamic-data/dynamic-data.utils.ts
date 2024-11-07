import type { FlowTypes } from "packages/data-models/flowTypes";
import { TemplatedData } from "packages/shared/src/models/templatedData/templatedData";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { isEqual } from "packages/shared/src/utils/object-utils";

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
