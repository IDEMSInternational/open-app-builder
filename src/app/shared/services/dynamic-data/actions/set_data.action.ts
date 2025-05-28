import { MangoQuery, RxSchema } from "rxdb";
import { DynamicDataService } from "../dynamic-data.service";
import { firstValueFrom } from "rxjs";
import { FlowTypes } from "packages/data-models";
import {
  coerceDataUpdateTypes,
  evaluateDynamicDataUpdate,
  isItemChanged,
} from "../dynamic-data.utils";
import { deepMergeObjects } from "../../../utils";

interface IActionSetDataOperatorParams {
  // TODO - ideally use same itemPipe operators
  // (although filter will need to be updated to include dynamic context)
  _filter?: string;
  _limit?: number;
  _reverse?: boolean;
  _sort?: string;
}

/** Metadata passed to set_data action to specify data for update **/
interface IActionSetDataParamsMeta extends IActionSetDataOperatorParams {
  /** Reference to source data_list id. All rows in list will be updated */
  _list_id?: string;

  /** ID of data_list row for single update */
  _id?: string;

  /** Index of data_list row for single update */
  _index?: number;

  /** List of compiled data updates if computed outside of action (e.g. data_items)  */
  _updates?: FlowTypes.Data_listRow[];
}

/** Key-value pairs to update. These support reference to self `@item` context */
export type IActionSetDataParams = IActionSetDataParamsMeta & Record<string, any>;

/**
 * Given a list of updates, merge them by ID and return a map of ID to update object.
 * For example:
 * [
 *   { id: "123", user: { name: "Jasper" } },
 *   { id: "123", user: { age: 9 } },
 *   { id: "123", status: "active" },
 *   { id: "123", status: "inactive" }
 * ]
 * becomes:
 * {
 *   "123": {
 *     user: { name: "Jasper", age: 9 },  // Nested objects are merged
 *     status: "inactive"                  // Last update wins
 *   }
 * }
 *
 * If multiple updates target the same property:
 * - For nested objects, the properties are merged
 * - For primitive values (strings, numbers, etc), the last update wins
 *
 * @param updates - List of updates to merge
 * @returns Map of ID to update object
 */
function mergeUpdatesById(updates: FlowTypes.Data_listRow[]): Record<string, any> {
  return updates.reduce(
    (idUpdates, update) => {
      const { id, ...writeableProps } = update;
      if (!idUpdates[id]) {
        idUpdates[id] = {};
      }
      idUpdates[id] = deepMergeObjects({}, idUpdates[id], writeableProps);
      return idUpdates;
    },
    {} as Record<string, any>
  );
}

/**
 * HACK: No current method to bulk update, so process in batches.
 * Updates within each batch are processed concurrently, but batches are processed sequentially
 * to avoid overwhelming the system.
 *
 * For example, with batchSize=2:
 * Updates for IDs [1,2,3,4,5] would be processed as:
 * - First batch: [1,2] in parallel
 * - Second batch: [3,4] in parallel
 * - Third batch: [5] in parallel
 *
 * @param service Service to use for updates
 * @param listId ID of the list being updated
 * @param updatesByID Map where each key is an ID and value is the data to update for that ID
 * @param batchSize Number of updates to process in parallel (default: 10)
 */
async function hackProcessUpdatesInBatches(
  service: DynamicDataService,
  listId: string,
  updatesByID: Record<string, any>,
  batchSize: number = 10
) {
  const updateEntries = Object.entries(updatesByID);
  for (let i = 0; i < updateEntries.length; i += batchSize) {
    const batch = updateEntries.slice(i, i + batchSize);
    await Promise.all(
      batch.map(([id, updateData]) => service.update("data_list", listId, id, updateData))
    );
  }
}

export default async (service: DynamicDataService, params: IActionSetDataParams) => {
  // if called from set_item will already include list of updates to apply, if not generate
  if (!params._updates) {
    params._updates = await generateUpdateList(service, params);
  }
  const { _list_id, _updates } = params;
  console.log("[Set Data]", _list_id, _updates);

  // First merge all updates for each ID
  const mergedUpdates = mergeUpdatesById(_updates);

  // Then process the merged updates in batches
  await hackProcessUpdatesInBatches(service, _list_id, mergedUpdates);
};

async function generateUpdateList(service: DynamicDataService, params: IActionSetDataParams) {
  // remove metadata from rest of update
  const { _id, _index, _list_id, _updates, ...update } = params;
  const query: MangoQuery = {};
  if (_id) {
    query.selector = { id: _id };
  }
  let ref = await service.query$<any>("data_list", _list_id, query);
  let items = await firstValueFrom(ref);
  if (items.length === 0) {
    const msg = `[Update Fail] no doc exists\ndata_list: ${_list_id}\n_id: ${_id}`;
    throw new Error(msg);
  }
  // NOTE - RXDB doesn't support querying by index or pagination so still retrieve all and then reduce
  if (typeof _index === "number") {
    const targetItem = items[_index];
    if (!targetItem) {
      const msg = `[Update Fail] no doc exists\ndata_list: ${_list_id}\n_index: ${_index}`;
      throw new Error(msg);
    }
    items = [items[_index]];
  }
  // Coerce updates to correct data types (inline parameter_list values parsed as strings)
  const schema = await service.getSchema("data_list", _list_id);

  return parseUpdateData(schema, update, items, _list_id);
}

function parseUpdateData(
  schema: RxSchema<any>,
  updateData: Record<string, any>,
  items: FlowTypes.Data_listRow[],
  _list_id: string
) {
  const cleanedUpdate = removeUpdateMetadata(updateData);

  // Evaluate item updates for any `@item` self-references
  const evaluated = evaluateDynamicDataUpdate(items, cleanedUpdate);

  // Coerce updates to correct data types (inline parameter_list values parsed as strings)
  const coerced = coerceDataUpdateTypes(schema?.jsonSchema?.properties, evaluated);

  // Filter to only include updates that will change original item
  return coerced.filter((el, i) => isItemChanged(items[i], el));
}

function removeUpdateMetadata(update: Record<string, any>) {
  for (const key of Object.keys(update)) {
    if (key.startsWith("_")) delete update[key];
  }
  return update;
}
