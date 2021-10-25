import { ExcelToRapidproConverter } from "@IDEMSInternational/rapidpro-excel/src";
import { FlowTypes } from "data-models";

import { AbstractParser } from "../abstract.parser";

export class ConversationParser implements AbstractParser {
  public run(flow: FlowTypes.FlowTypeWithData) {
    const parser = new ExcelToRapidproConverter(flow.flow_name, flow.rows);
    return parser.run();
  }
}
