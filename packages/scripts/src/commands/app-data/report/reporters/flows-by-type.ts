import { IParsedWorkbookData } from "../../types";
import { IReportTable } from "../report.types";

interface IReportData {
  type: string;
  subtype: string;
  total: number;
}

interface IFlowByTypeReport extends IReportTable {
  data: IReportData[];
}

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
    const summary: IReportData[] = Object.keys(countBySubtype)
      .sort()
      .map((key) => {
        const [type, subtype] = key.split(".");
        return { type, subtype: subtype || null, total: countBySubtype[key] };
      });

    const flows_by_type: IFlowByTypeReport = {
      type: "table",
      title: "Flows By Type",
      level: "info",
      data: summary,
    };

    return { flows_by_type };
  }
}
