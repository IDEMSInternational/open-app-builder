import { FlowTypes } from "data-models";

import { IParsedWorkbookData } from "../../types";
import { sortJsonByKey } from "../manifest.utils";
import { IManifestReport } from "../manifest.types";

interface ITemplateSummary {
  components: Record<string, { count: number }>;
  actions: Record<string, { count: number }>;
}

/**
 * Generates a list of all components and action types used within templates
 * This will later be used to develop a list of features required
 *
 * TODO
 * - consider check for template references for unused templates (would need to include data refs)
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

    const reports: Record<"template_components" | "template_actions", IManifestReport> = {
      template_components: {
        type: "table",
        title: "Components",
        level: "info",
        data: this.getReportData(this.summary.components),
      },
      template_actions: {
        type: "table",
        title: "Actions",
        level: "info",
        data: this.getReportData(this.summary.actions),
      },
    };

    return reports;
  }

  /** Convert type records to array for report */
  private getReportData(data: Record<string, { count: number }>) {
    const sorted = sortJsonByKey(data);
    return Object.entries(sorted).map(([type, { count }]) => ({ type, count }));
  }
}
