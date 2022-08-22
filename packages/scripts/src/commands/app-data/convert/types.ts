import type { FlowTypes } from "data-models";

export type IParsedWorkbookData = { [type in FlowTypes.FlowType]?: FlowTypes.FlowTypeWithData[] };
