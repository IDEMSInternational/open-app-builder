import { ExcelToRapidproConverter } from "@idemsInternational/rapidpro-excel";
import { FlowTypes } from "data-models";

import { AbstractParser } from "../abstract.parser";

export class ConversationParser implements AbstractParser {
  public run(flow: FlowTypes.FlowTypeWithData) {
    const parser = new ExcelToRapidproConverter(flow.flow_name, flow.rows);
    const result = parser.run();
    // Manually include flow_type property for use with other methods
    if (result?.flows) {
      result["flow_type"] = "conversation";
    }
  }
  public postProcessFlows(flows: FlowTypes.FlowTypeWithData[]) {
    return flows;
  }
}
