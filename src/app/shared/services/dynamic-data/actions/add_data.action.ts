import { generateUUID } from "src/app/shared/utils";
import { coerceDataUpdateTypes, evaluateDynamicDataUpdate } from "../dynamic-data.utils";
import { DynamicDataService } from "../dynamic-data.service";

export type IActionAddDataParams = {
  _list_id: string;
} & Record<string, any>;

export default async (service: DynamicDataService, params: IActionAddDataParams) => {
  const { _list_id, ...data } = await parseParams(params);
  // assign a row_index to push user_generated docs to bottom of list
  data.row_index = await service.getCount("data_list", _list_id);
  // generate a unique id for the entry
  data.id = generateUUID();
  // add metadata to track user created
  data._user_created = true;
  // HACK - use the same dynamic data evaluator as set_data action
  // This requires passing an item list, so just create an ad-hoc list with a single item
  // TODO - add support for evaluating @list reference to parent list
  const [evaluated] = evaluateDynamicDataUpdate([{ id: data.id }], data);
  const schema = service.getSchema("data_list", _list_id);
  const [coerced] = coerceDataUpdateTypes(schema?.jsonSchema?.properties, [evaluated]);
  return service.insert("data_list", _list_id, coerced);
};

async function parseParams(params) {
  return params;
}
