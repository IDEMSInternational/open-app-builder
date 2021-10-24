import { ConversationParser as RapidproParser } from "@IDEMSInternational/rapidpro-excel/src";
import { ExcelSheetModel, RapidProFlowExport } from "@IDEMSInternational/rapidpro-excel/types";
import { FlowTypes } from "data-models";

import { AbstractParser } from "../abstract.parser";

export class ConversationParser implements AbstractParser {
  rapidproParser = new RapidproParser("app");

  public run(flow: FlowTypes.FlowTypeWithData): RapidProFlowExport.RootObject {
    const { flow_name, rows } = flow;
    const model: ExcelSheetModel = { flow_name, flow_type: "conversation", rows };
    return this.rapidproParser.run(model);
  }
}
