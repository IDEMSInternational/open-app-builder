import { IActionHandler } from "../../components/template/services/instance/template-action.registry";
import type { DynamicDataService } from "./dynamic-data.service";
import { firstValueFrom } from "rxjs";
import { isObjectLiteral } from "packages/shared/src/utils/object-utils";
import { FlowTypes } from "packages/data-models";
import { MangoQuery } from "rxdb";
import {
  coerceDataUpdateTypes,
  evaluateDynamicDataUpdate,
  isItemChanged,
} from "./dynamic-data.utils";
import { generateUUID } from "../../utils";

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

export type IActionRemoveDataParams = {
  _list_id: string;
  _id: string;
};

class DynamicDataActionFactory {
  constructor(private service: DynamicDataService) {}

  /**
   * Similar syntax can be used for multiple items.
   *
   * or from outside a loop can specify
   * click | set_data | _list: @data.example_list, completed:true;
   */
  public set_data: IActionHandler = async ({ params }: { params?: IActionSetDataParams }) => {
    const parsed = await this.parseParams(params);
    // if called from set_item will already include list of updates to apply, if not generate
    if (!parsed._updates) {
      parsed._updates = await this.generateUpdateList(parsed);
    }
    const { _list_id, _updates } = parsed;
    // Hack, no current method for bulk update so make successive (changes debounced in component)
    for (const { id, ...writeableProps } of _updates) {
      await this.service.update("data_list", _list_id, id, writeableProps);
    }
  };

  public reset_data: IActionHandler = async ({ params }: { params?: IActionSetDataParams }) => {
    const { _list_id } = await this.parseParams(params);
    return this.service.resetFlow("data_list", _list_id);
  };

  public remove_data: IActionHandler = async ({ params }: { params?: IActionRemoveDataParams }) => {
    const { _id, _list_id } = params;
    return this.service.remove("data_list", _list_id, [_id]);
  };

  public add_data: IActionHandler = async ({ params }: { params?: IActionSetDataParams }) => {
    const { _list_id, ...data } = await this.parseParams(params);
    // assign a row_index to push user_generated docs to bottom of list
    let row_index = await this.service.getCount("data_list", _list_id);
    data.id = generateUUID();
    // add metadata to track user created
    data._user_created = true;
    data.row_index = row_index;
    // HACK - use the same dynamic data evaluator as set_data action
    // This requires passing an item list, so just create an ad-hoc list with a single item
    const [evaluated] = evaluateDynamicDataUpdate([{ id: data.id }], data);
    // TODO - add support for evaluating @list statements
    const schema = this.service.getSchema("data_list", _list_id);
    const [coerced] = coerceDataUpdateTypes(schema?.jsonSchema?.properties, [evaluated]);
    return this.service.insert("data_list", _list_id, coerced);
  };

  /** Parse action parameters to generate a list of updates to apply */
  private async parseParams(params: IActionSetDataParams) {
    if (isObjectLiteral(params)) {
      const parsed = this.hackParseTemplatedParams(params);
      if (!parsed._list_id) {
        console.error(params);
        throw new Error("[Data Actions] could not parse list id");
      }
      return parsed;
    }

    // throw error if args not parsed correctly
    console.error(params);
    throw new Error("[set_data] could not parse params");
  }

  private async generateUpdateList(params: IActionSetDataParams) {
    // remove metadata from rest of update
    const { _id, _index, _list_id, _updates, ...update } = params;
    const query: MangoQuery = {};
    if (_id) {
      query.selector = { id: _id };
    }
    let ref = await this.service.query$<any>("data_list", _list_id, query);
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

    return this.parseUpdateData(update, items, _list_id);
  }

  private parseUpdateData(
    updateData: Record<string, any>,
    items: FlowTypes.Data_listRow[],
    _list_id: string
  ) {
    const cleanedUpdate = this.removeUpdateMetadata(updateData);

    // Evaluate item updates for any `@item` self-references
    const evaluated = evaluateDynamicDataUpdate(items, cleanedUpdate);

    // Coerce updates to correct data types (inline parameter_list values parsed as strings)
    const schema = this.service.getSchema("data_list", _list_id);
    const coerced = coerceDataUpdateTypes(schema?.jsonSchema?.properties, evaluated);

    // Filter to only include updates that will change original item
    return coerced.filter((el, i) => isItemChanged(items[i], el));
  }

  private applyUpdateOperations(params: IActionSetDataParams) {
    // TODO - decide when to evaluate... e.g. filter: @item.id > @local.value
    const { _filter, _reverse, _sort, _limit } = params;
    const parsedOps: IActionSetDataOperatorParams = {};
    for (const [operator, arg] of Object.entries({ _filter, _reverse, _sort, _limit })) {
      if (arg !== undefined) {
        let parsedArg = "";
        // TODO - understand if dynamic or numeric string...
        // TODO - better to convert these params in parser not at runtime!!! (same for _index previously)
        // using some sort of parseNumericalString or similar regex lookup... same for boolean strings and other similar
        if (operator === "_limit" && typeof parsedArg === "string") {
        }
      }
    }
  }

  private removeUpdateMetadata(update: Record<string, any>) {
    for (const key of Object.keys(update)) {
      if (key.startsWith("_")) delete update[key];
    }
    return update;
  }

  /**
   * Any params provided by templating system will already be partially parsed to replace dynamic references
   * such as @local or @field. This also converts @item references to `this.item`
   * Revert the item changes and also convert string parameter values to number where required
   *
   * TODO - this method should be removed and `items` made to update their own `this` context
   **/
  private hackParseTemplatedParams(params: IActionSetDataParams) {
    const parsed: IActionSetDataParams = {};
    // HACK - un-parse @item references that the templating system converts to `this.item`
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string") {
        parsed[key] = value.replace(/this\.item/g, "@item");
      } else {
        parsed[key] = value;
      }
    }
    // convert _index param which may be passed as string from template if defined inline
    // NOTE - RXDB will automatically cast all other string values to correct type due to inferred schema
    if (typeof params._index === "string") {
      parsed._index = Number(params._index);
    }
    return parsed;
  }
}

export default DynamicDataActionFactory;
