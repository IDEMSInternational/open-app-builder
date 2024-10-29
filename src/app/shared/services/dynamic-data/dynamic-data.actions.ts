import { IActionHandler } from "../../components/template/services/instance/template-action.registry";
import type { DynamicDataService } from "./dynamic-data.service";
import { firstValueFrom } from "rxjs";
import { isObjectLiteral } from "packages/shared/src/utils/object-utils";
import { FlowTypes } from "packages/data-models";
import { MangoQuery } from "rxdb";
import { evaluateDynamicDataUpdate, isItemChanged } from "./dynamic-data.utils";

/** Metadata passed to set_data action to specify data for update **/
interface IActionSetDataParamsMeta {
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

class DynamicDataActionFactory {
  constructor(private service: DynamicDataService) {}

  /**
   * Similar syntax can be used for multiple items.
   *
   * or from outside a loop can specify
   * click | set_data | _list: @data.example_list, completed:true;
   */
  public set_data: IActionHandler = async ({ params }: { params?: IActionSetDataParams }) => {
    const { _list_id, _updates } = await this.parseParams(params);
    // Hack, no current method for bulk update so make successive (changes debounced in component)
    for (const { id, ...writeableProps } of _updates) {
      await this.service.update("data_list", _list_id, id, writeableProps);
    }
  };

  private async parseParams(params: IActionSetDataParams) {
    // util to log item params and add name prefix as part of thrown errors
    function throwParseError(msg: string) {
      console.error(params);
      throw new Error("[set_data] " + msg);
    }
    if (isObjectLiteral(params)) {
      let { _updates, _list_id } = params;

      // handle parse from item reference string
      if (_list_id) {
        if (!_updates) {
          _updates = await this.generateItemUpdates(params);
        }

        return { _updates, _list_id };
      }
    }

    // throw error if args not parsed correctly
    throwParseError("invalid params");
  }

  private async generateItemUpdates(params: IActionSetDataParams) {
    const { _id, _index, _list_id, _updates, ...writeableProps } = params;
    const query: MangoQuery = {};
    if (_id) {
      query.selector = { id: _id };
    }
    let ref = await this.service.query$<any>("data_list", _list_id, query);
    let items = await firstValueFrom(ref);
    // NOTE - RXDB doesn't support querying by index or pagination so still retrieve all and then reduce
    if (typeof _index === "number") {
      items = [items[_index]];
    }

    // Evaluate item updates for any `@item` self-references
    const evaluated = evaluateDynamicDataUpdate(items, writeableProps);

    // Filter to only include updates that will change original item
    return evaluated.filter((update, i) => isItemChanged(items[i], update));
  }
}

export default DynamicDataActionFactory;