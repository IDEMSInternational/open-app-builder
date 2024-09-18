import { IParsedWorkbookData } from "../../types";
import { IReport } from "../report.types";

/** Generate a list of all flows by type and subtype */
export class FlowByTypeReport {
  public async process(data: IParsedWorkbookData) {
    const countBySubtype = {};
    Object.values(data).forEach((flows) => {
      flows.forEach((flow) => {
        let type = flow.flow_type;
        if (flow.flow_subtype) type += `.${flow.flow_subtype}`;
        if (!countBySubtype[type]) countBySubtype[type] = 0;
        countBySubtype[type]++;
      });
    });
    const summary = Object.keys(countBySubtype)
      .sort()
      .map((key) => {
        const [type, subtype] = key.split(".");
        return { type, subtype: subtype || null, total: countBySubtype[key] };
      });

    const reports: Record<"flows_by_type", IReport> = {
      flows_by_type: {
        type: "table",
        title: "Flows By Type",
        level: "info",
        data: summary,
      },
    };

    return reports;
  }
}
