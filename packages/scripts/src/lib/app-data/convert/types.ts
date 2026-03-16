import type { FlowTypes } from "data-models";

export type IParsedWorkbookData = { [type in FlowTypes.FlowType]?: FlowTypes.FlowTypeWithData[] };

export type IFlowHashmapByType = {
  [type in FlowTypes.FlowType]?: { [flow_name: string]: FlowTypes.FlowTypeWithData };
};

export interface IConverterPaths {
  SHEETS_INPUT_FOLDER: string;
  SHEETS_CACHE_FOLDER: string;
  SHEETS_OUTPUT_FOLDER: string;
}
