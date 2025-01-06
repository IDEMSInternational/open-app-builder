import { isObjectLiteral } from "packages/shared/src/utils/object-utils";
import { IActionHandler } from "../../../components/template/services/instance/template-action.registry";
import type { DynamicDataService } from "../dynamic-data.service";

import addDataAction, { IActionAddDataParams } from "./add_data.action";
import setDataAction, { IActionSetDataParams } from "./set_data.action";

interface IActionBaseParams {
  _list_id?: string;
  _index?: string | number;
}

export type IActionRemoveDataParams = {
  _list_id: string;
  _id: string;
};

type IActionResetDataParams = {
  _list_id: string;
};

// Use action factory to make it easier to apply common logic to action params and pass service
export class DynamicDataActionFactory {
  constructor(private service: DynamicDataService) {}

  public set_data: IActionHandler = async ({ params }: { params?: IActionSetDataParams }) => {
    const parsedParams = this.parseActionParams(params);
    return setDataAction(this.service, parsedParams);
  };

  public reset_data: IActionHandler = async ({ params }: { params?: IActionResetDataParams }) => {
    const { _list_id } = this.parseActionParams(params);
    return this.service.resetFlow("data_list", _list_id);
  };

  public remove_data: IActionHandler = async ({ params }: { params?: IActionRemoveDataParams }) => {
    const { _id, _list_id } = params;
    return this.service.remove("data_list", _list_id, [_id]);
  };

  public add_data: IActionHandler = async ({ params }: { params?: IActionAddDataParams }) => {
    const parsedParams = this.parseActionParams(params);
    return addDataAction(this.service, parsedParams);
  };

  /** Parse action parameters to ensure list id provided and  */
  private parseActionParams<T extends IActionBaseParams>(params: T) {
    if (isObjectLiteral(params)) {
      const parsed = hackParseTemplatedParams(params);
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
}

/**
 * Any params provided by templating system will already be partially parsed to replace dynamic references
 * such as @local or @field. This also converts @item references to `this.item`
 * Revert the item changes and also convert string parameter values to number where required
 *
 * TODO - this method should be removed and `items` made to update their own `this` context
 **/
function hackParseTemplatedParams<T extends IActionBaseParams>(params: T) {
  const parsed = {} as T;
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
