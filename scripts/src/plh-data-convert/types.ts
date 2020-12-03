// NOTE - most of these types are duplicated in src/data, should eventually refactor to common libs

export interface IContentList {
  Flow_Type: IFlowType;
  Module: string;
  Flow_Name: string;
  status: "draft" | "released" | "preview";
  [key: string]: any;
}

export type IFlowType = "Completions" | "Conversation" | "Goals" | "Reminders" | "Tasks" | "Tips";

/**
 * Content flows are the merged data from content list
 * and data corresponding to spreadsheet rows
 */
export interface IContentFlow extends IContentList {
  data: any[];
}
