import { FlowTypes } from "data-models";
import { sortJsonKeys } from "shared/src/utils";

import { IParsedWorkbookData } from "../../convert/types";
import { IReportTable } from "../report.types";

interface IReportData {
  type: string;
  count: number;
}

interface ITemplateSummaryReport extends IReportTable {
  data: IReportData[];
}

interface ITemplateSummary {
  components: Record<string, { count: number }>;
  actions: Record<string, { count: number }>;
}

/**
 * Generate a list of all components and action types used within templates
 * This will later be used to develop a list of features required
 */
export class TemplateSummaryReport {
  private summary: ITemplateSummary = { actions: {}, components: {} };

  public async process(data: IParsedWorkbookData) {
    // TODO - could also consider components or actions referenced from data_lists
    for (const flow of data.template || []) {
      for (const row of flow.rows) {
        const { action_list = [], type } = row as FlowTypes.TemplateRow;
        for (const action of action_list) {
          let { action_id, args } = action;
          // HACK -include emit type actions
          if (action_id === "emit") {
            action_id += `: ${args[0]}`;
          }
          this.summary.actions[action_id] ??= { count: 0 };
          this.summary.actions[action_id].count++;
        }
        this.summary.components[type] ??= { count: 0 };
        this.summary.components[type].count++;
      }
    }

    const template_components: ITemplateSummaryReport = {
      type: "table",
      title: "Components",
      display: "collapse_closed",
      data: this.getReportData(this.summary.components),
    };
    const template_actions: ITemplateSummaryReport = {
      type: "table",
      title: "Actions",
      display: "collapse_closed",
      data: this.getReportData(this.summary.actions),
    };

    return { template_components, template_actions };
  }

  /** Convert type records to array for report */
  private getReportData(data: Record<string, { count: number }>): IReportData[] {
    const sorted = sortJsonKeys(data);
    return Object.entries(sorted).map(([type, { count }]) => ({ type, count }));
  }
}
