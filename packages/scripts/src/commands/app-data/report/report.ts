import chalk from "chalk";
import { IAssetEntryHashmap, IDeploymentConfigJson } from "data-models";
import { writeFile, ensureDir, emptyDir } from "fs-extra";
import { resolve, dirname } from "path";
import { logOutput } from "shared";

import { IReport } from "./report.types";
import { generateMarkdownTable } from "./report.utils";
import { FlowByTypeReport } from "./reporters/flows-by-type";
import { TemplateSummaryReport } from "./reporters/template-summary";
import { AssetsSummaryReport } from "./reporters/asset-summary";
import { IParsedWorkbookData } from "../convert/types";
import { readJson, writeJson } from "fs-extra";
import { ISheetContents } from "../postProcess/sheets";

/**
 * Create summary reports based on converted app data
 * Individual reports are created by child reporters, with outputs stored in both
 * json and markdown formats for easier interpretation
 *
 * Run on existing data via `yarn workflow sync_sheets --skip-download`
 **/
export class ReportGenerator {
  constructor(private deployment: IDeploymentConfigJson) {}

  public async process() {
    const workbookData = await this.loadSheetsData();
    const assetData = await this.loadAssetsData();

    const { template_actions, template_components } = await new TemplateSummaryReport().process(
      workbookData
    );
    const { flows_by_type } = await new FlowByTypeReport().process(workbookData);
    const { asset_summary } = await new AssetsSummaryReport().process(workbookData);
    const outputReports = { template_actions, template_components, asset_summary, flows_by_type };
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

  /**
   * Load workbook data output generated when processing sheets
   * Reads contents of all sheets populated to app-data folder
   **/
  private async loadSheetsData(): Promise<IParsedWorkbookData> {
    const { _workspace_path } = this.deployment;
    const sheetsDir = resolve(_workspace_path, "app_data", "sheets");
    const sheetsContents = resolve(sheetsDir, "contents.json");
    const contents = (await readJson(sheetsContents)) as ISheetContents;
    const workbookData: IParsedWorkbookData = {};
    for (const [flow_type, flow_data] of Object.entries(contents)) {
      workbookData[flow_type] = [];
      for (const flow of Object.values(flow_data)) {
        const { flow_name, flow_subtype } = flow;
        const jsonPath = resolve(sheetsDir, flow_type, flow_subtype || "", `${flow_name}.json`);
        const data = await readJson(jsonPath);
        workbookData[flow_type].push(data);
      }
    }
    await writeJson("workbook_data.json", workbookData);
    return workbookData;
  }

  private async loadAssetsData() {
    const { _workspace_path } = this.deployment;
    const assetsDir = resolve(_workspace_path, "app_data", "assets");
    const assetsContents = resolve(assetsDir, "contents.json");
    const contents = (await readJson(assetsContents)) as IAssetEntryHashmap;
    return contents;
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
