import { MangoQuery, RxSchema } from "rxdb";
import { DynamicDataService } from "../dynamic-data.service";
import { firstValueFrom } from "rxjs";
import { FlowTypes } from "packages/data-models";
import {
  coerceDataUpdateTypes,
  evaluateDynamicDataUpdate,
  isItemChanged,
} from "../dynamic-data.utils";

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

export default async (service: DynamicDataService, params: IActionSetDataParams) => {
  const { _list_id, _updates } = params;
  // if called from set_item will already include list of updates to apply
  // apply individually using update op
  if (_updates) {
    for (const { id, ...writeableProps } of params._updates) {
      console.log("[Set Data]", _list_id, params._updates);
      await service.update("data_list", _list_id, id, writeableProps);
    }
  }
  // if called directly generate a full list of updates required for the
  // target items in the list and apply as bulkUpsert
  else {
    const generatedUpdates = await generateUpdateList(service, params);
    console.log("[Set Data]", _list_id, generatedUpdates);
    await service.bulkUpsert("data_list", _list_id, generatedUpdates);
  }
};

async function generateUpdateList(service: DynamicDataService, params: IActionSetDataParams) {
  // remove metadata from rest of update
  const { _id, _index, _list_id, _updates, ...update } = params;
  const query: MangoQuery = {};
  if (_id) {
    query.selector = { id: _id };
  }
  let ref = service.query$<any>("data_list", _list_id, query);
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

  // Compare updates and filter out any that will leave original unchanged
  // Merge update with original to return full document for bulkUpsert op
  const docsForUpsert = coerced
    .map((update, i) => ({ update, item: items[i] }))
    .filter(({ item, update }) => isItemChanged(item, update))
    .map(({ item, update }) => ({ ...item, ...update }));

  return docsForUpsert;
}

function removeUpdateMetadata(update: Record<string, any>) {
  for (const key of Object.keys(update)) {
    if (key.startsWith("_")) delete update[key];
  }
  return update;
}
