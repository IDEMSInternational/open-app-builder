import { FlowTypes } from "packages/data-models";
import { IActionHandler } from "../../components/template/services/instance/template-action.registry";
import type { DynamicDataService } from "./dynamic-data.service";
import { firstValueFrom } from "rxjs";

/**
 * Metadata passed to set_item action used to lookup correct DB row
 * Full payload can also include arbitrary key-value pairs (omitted for type-checking)
 **/
export interface IActionSetItemParams {
  /** ID of data_list for items */
  _list_id: string;
  /** ID of item to update */
  _id: string;
  /**
   * Index of item to update (only works when calling within a data_items loop)
   * TODO - might be better to remove altogether and extract from within template instead
   */
  _index?: number;
}

/** Metadata passed to set_items action **/
export interface IActionSetItemsParams {
  /** Reference to source data_list id. All rows in list will be updated */
  _list_id?: string;

  /** Parsed items to update (e.g. from data_items). All rows in list will be updated  */
  _items?: FlowTypes.Data_list;
}

class DynamicDataActionFactory {
  constructor(private service: DynamicDataService) {}

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
   * click | set_item | _list_id: example_list, _id: example_id, completed:true;
   *
   */
  public set_item: IActionHandler = async ({ params }) => {
    // parse args and separate data lookup metadata from writeable update data
    const { _list_id, _id, writeableProps } = this.parseSetItemParams(params);
    await this.service.update("data_list", _list_id, _id, writeableProps);
  };

  /**
   * Similar syntax can be used for multiple items.
   *
   * When populated from a `data_items` loop all currently rendered rows implied
   * click | set_items | completed:true;
   *
   * or from outside a loop can specify
   * click | set_items | _list: @data.example_list, completed:true;
   */
  public set_items: IActionHandler = async ({ params }) => {
    const { _list_id, _ids, writeableProps } = await this.parseSetItemsParams(params);
    // Hack, no current method for bulk update so make successive (changes debounced in component)
    for (const _id of _ids) {
      await this.service.update("data_list", _list_id, _id, writeableProps);
    }
  };

  private parseSetItemParams(params: IActionSetItemParams) {
    if (params && params.constructor === {}.constructor) {
      const { _id, _list_id, _index, ...writeableProps } = params;
      // ensure a list name row id included (index should have been already converted to id)
      if (_list_id && _id) {
        return { _id, _list_id, writeableProps };
      }
    }
    // throw error if args not parsed correctly
    console.error({ params });
    throw new Error("[set_item] invalid params");
  }

  private async parseSetItemsParams(params: IActionSetItemsParams) {
    // util to log item params and add name prefix as part of thrown errors
    function throwParseError(msg: string) {
      console.error(params);
      throw new Error("[set_items] " + msg);
    }
    if (params && params.constructor === {}.constructor) {
      const { _items, _list_id, ...writeableProps } = params;
      // handle parse from item reference string
      if (_list_id) {
        // TODO - consider refactoring service to take full list and do lookup there instead
        const ref = await this.service.query$<any>("data_list", _list_id);
        const data = await firstValueFrom(ref);
        const _ids = data.map((el) => el.id);
        return { _list_id, _ids, writeableProps };
      }
      // handle parse from processed item list (e.g. data_items loop)
      if (_items && _items.constructor === {}.constructor) {
        const { flow_name, rows } = _items;
        const _ids = rows.filter((r) => r.id).map((r) => r.id);
        return { _list_id: flow_name, _ids, writeableProps };
      }
    }

    // throw error if args not parsed correctly
    console.error({ params });
    throwParseError("invalid params");
  }
}

export default DynamicDataActionFactory;
