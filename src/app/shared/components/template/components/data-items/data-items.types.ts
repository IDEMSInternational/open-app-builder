import type { FlowTypes } from "packages/data-models";

/**
 * Parameter list passed to data_items row
 * TODO - should inherit from Items processor as parameter list is for operators
 * */
export interface IDataItemParameterList {
  /** dynamic expression to filter data by */
  filter?: string;
  /** field to sort by */
  sort?: string;
  /** max number of entries to return */
  limit?: number;

  // parameters without args
  shuffle?: undefined;
  reverse?: undefined;
}

/** Items track metadata relative to list, such as _index, _first and _last */
export type IItemWithMetadata = FlowTypes.TemplateRowItemEvalContextMetadata & Record<string, any>;

/** Processed rows keep reference to source item used to generate */
export interface ITemplateRowWithDataItemContext extends FlowTypes.TemplateRow {
  _item: IItemWithMetadata;
}
