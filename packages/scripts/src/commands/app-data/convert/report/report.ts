/**
 * TODO
 * - Report referenced assets
 * - Handle test fail trying to run from app data converter spec
 * - Add spec to app data converter that it generates reports (just folder)
 *
 * Future
 * - possible recommendations/optimisations from reports
 * - possibly will require runtime error/warning/prompt
 * - handle dynamic
 * - QA components/actions that don't exist
 * - possibly export list of COMPONENTS_AVAILABLE (or similar... or just use main list lookup)
 * - also consider asset report (but would need to ensure dynamic assets included, plus param list + template value)
 * - handle implicit components (check imports (?))
 */

import { IDeploymentConfigJson } from "data-models";
import { IParsedWorkbookData } from "../types";
import { TemplateSummaryReport } from "./reporters";
import { IReport } from "./report.types";
import { resolve, dirname } from "path";
import { writeFile, ensureDir, emptyDir } from "fs-extra";
import { generateMarkdownTable } from "./report.utils";
import { logOutput } from "shared";
import chalk from "chalk";
import { FlowByTypeReport } from "./reporters/flows-by-type";

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
