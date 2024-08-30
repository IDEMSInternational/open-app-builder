import { IActionHandler } from "../../components/template/services/instance/template-action.registry";
import type { DynamicDataService } from "./dynamic-data.service";

export type IActionSetItemArgs = [IActionSetItemParams];

export type IActionSetItemsArgs = [IActionSetItemsParams];

/**
 * Metadata passed to set_item action used to lookup correct DB row
 * Full payload can also include arbitrary key-value pairs (omitted for type-checking)
 **/
export interface IActionSetItemParams {
  /** ID of data_list for items */
  _list: string;
  /** ID of item to update */
  _id: string;
  /**
   * Index of item to update (only works when calling within a data_items loop)
   * TODO - might be better to remove altogether and extract from within template instead
   */
  _index?: number;
}

/**
 * Metadata passed to set_items action used to lookup correct DB row
 * Full payload can also include arbitrary key-value pairs (omitted for type-checking)
 **/
export interface IActionSetItemsParams {
  _list: string;
  _ids: string[];
}

const actions = (service: DynamicDataService) => {
  /**
   * Write properties on data_list row items,
   *
   * When populated from a `data_items` loop current list row implied (can override)
   *
   * click | set_item | completed:true;
   * click | set_item | _id: another_item_id, completed:true;
   *
   * It is also possible to specify a different row by index in `data_items` loops
   * click | set_item | _index: @item._index + 1, completed:true;
   *
   * Or from outside a loop
   * click | set_item | _list: example_list, _id: example_id, completed:true;
   *
   */
  const set_item: IActionHandler = async ({ args }) => {
    // parse args and separate data lookup metadata from writeable update data
    const { _list, _id, _index, ...writeableProps } = parseSetItemArgs(args);
    await service.update("data_list", _list, _id, writeableProps);
  };

  /**
   * Similar syntax can be used for multiple items.
   *
   * When populated from a `data_items` loop all currently rendered rows implied
   * click | set_items | completed:true;
   *
   * or from outside a loop can specify
   * click | set_items | _list: "example_list", _ids: "example_id_1; example_id_2", completed:true;
   */
  const set_items: IActionHandler = async ({ args }) => {
    const { _list, _ids, ...writeableProps } = parseSetItemsArgs(args);
    // Hack, no current method for bulk update so make successive (changes debounced in component)
    for (const _id of _ids) {
      await service.update("data_list", _list, _id, writeableProps);
    }
  };

  return { set_item, set_items };
};

function parseSetItemArgs(args: any[] = []) {
  if (Array.isArray(args)) {
    const [params] = args as IActionSetItemArgs;
    // ensure a list name row id included (index should have been already converted to id)
    if (params._list && params._id) {
      return params;
    }
  }
  // throw error if args not parsed correctly
  console.error({ args });
  throw new Error("[set_item] invalid args");
}

function parseSetItemsArgs(args: any[] = []) {
  if (Array.isArray(args)) {
    const [params] = args as IActionSetItemsArgs;
    // ensure a list name provided and either _ids or _indexes included
    if (params._list && Array.isArray(params._ids) && params._ids.length > 0) {
      // TODO - check from frontend if params need conversion
      // TODO - maybe better to use _id_list property?
      return params;
    }
  }
  // throw error if args not parsed correctly
  console.error({ args });
  throw new Error("[set_items] invalid args");
}

export default actions;
