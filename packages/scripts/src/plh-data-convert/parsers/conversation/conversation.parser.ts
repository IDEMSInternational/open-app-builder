import { ExcelToRapidproConverter } from "@IDEMSInternational/rapidpro-excel/src";
import { ExcelSheetModel, RapidProFlowExport } from "@IDEMSInternational/rapidpro-excel/types";
import { FlowTypes } from "data-models";

import { AbstractParser } from "../abstract.parser";

export class ConversationParser implements AbstractParser {
  public run(flow: FlowTypes.FlowTypeWithData): RapidProFlowExport.RootObject {
    const { flow_name, rows } = flow;
    const excelSheet: ExcelSheetModel = { flow_name, rows };
    const parser = new ExcelToRapidproConverter(excelSheet);
    return parser.run();
  }
}
