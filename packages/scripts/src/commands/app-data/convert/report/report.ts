/**
 *
 * Potential Reports
 * - Referenced assets (incl. param list, template value and data _asset columns)
 * - Unused templates
 * - Recommended Optimisations
 *
 */

import chalk from "chalk";
import { IDeploymentConfigJson } from "data-models";
import { writeFile, ensureDir, emptyDir } from "fs-extra";
import { resolve, dirname } from "path";
import { logOutput } from "shared";

import { IParsedWorkbookData } from "../types";
import { IReport } from "./report.types";
import { generateMarkdownTable } from "./report.utils";
import { FlowByTypeReport } from "./reporters/flows-by-type";
import { TemplateSummaryReport } from "./reporters/template-summary";

/**
 * Create summary reports based on converted app data
 * Individual reports are created by child reporters, with outputs stored in both
 * json and markdown formats for easier interpretation
 *
 * Run on existing data via `yarn workflow sync_sheets --skip-download`
 **/
export class ReportGenerator {
  constructor(private deployment: IDeploymentConfigJson) {}

  public async process(data: IParsedWorkbookData) {
    const { template_actions, template_components } = await new TemplateSummaryReport().process(
      data
    );
    const { flows_by_type } = await new FlowByTypeReport().process(data);
    const outputReports = { template_actions, template_components, flows_by_type };
    await this.writeOutputs(outputReports);
  }

  private async writeOutputs(reports: Record<string, IReport>) {
    const outputDir = resolve(this.deployment._workspace_path, "reports");
    await ensureDir(dirname(outputDir));
    await emptyDir(outputDir);
    await this.writeOutputJson(reports, resolve(outputDir, "summary.json"));
    await this.writeOutputMarkdown(reports, resolve(outputDir, "summary.md"));
    logOutput({ msg1: "Reports Generated", msg2: outputDir });
    // repeat log in case boxed output broken
    console.log(chalk.gray(outputDir));
  }

  private async writeOutputJson(reports: Record<string, IReport>, target: string) {
    const output: Record<string, any> = {};
    for (const [key, { data }] of Object.entries(reports)) {
      output[key] = data;
    }
    await writeFile(target, JSON.stringify(output, null, 2));
  }

  private async writeOutputMarkdown(reports: Record<string, IReport>, target: string) {
    const contents = ["# Summary"];
    for (const report of Object.values(reports)) {
      if (report.type === "table") {
        contents.push("");
        contents.push(`## ${report.title}`);
        const mdTable = generateMarkdownTable(report.data);
        contents.push(mdTable);
      }
    }
    await writeFile(target, contents.join("\n"));
  }
}
