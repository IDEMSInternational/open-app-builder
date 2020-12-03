// NOTE - most of these types are duplicated in src/data, should eventually refactor to common libs

export interface IContentList {
  flow_type: IFlowType;
  module: string;
  flow_name: string;
  status: "draft" | "released" | "preview";
  [key: string]: any;
}

export type IFlowType = "completions" | "conversation" | "goals" | "reminders" | "tasks" | "tips";

/**
 * Content flows are the merged data from content list
 * and data corresponding to spreadsheet rows
 */
export interface IContentFlow extends IContentList {
  data: any[];
}
