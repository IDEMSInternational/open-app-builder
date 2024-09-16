/**
 * TODO
 * - Include sheet types/subtypes reporter
 * - Include asset references
 * - Better to name as manifest or report
 * - Document authors to gitignore outputs (if not wanted)
 *
 * Future
 * - Specific feature manifests that declare action/component namespaces
 * - possible recommendations/optimisations from manifest
 * - how to handle implicit deps (one component uses another)
 * - possibly will require runtime error/warning/prompt
 * - handle dynamic
 * - QA components/actions that don't exist
 * - possibly export list of COMPONENTS_AVAILABLE (or similar... or just use main list lookup)
 * - also consider asset manifest (but would need to ensure dynamic assets included, plus param list + template value)
 * - handle implicit components (check imports (?))
 */

import { IDeploymentConfigJson } from "data-models";
import { IParsedWorkbookData } from "../types";
import { TemplateSummaryReport } from "./reporters";
import { IManifestReport } from "./manifest.types";
import { resolve, dirname } from "path";
import { writeFile, ensureDir, emptyDir } from "fs-extra";
import { generateMarkdownTable } from "./manifest.utils";
import { logOutput } from "shared";
import chalk from "chalk";

// Testing notes
// yarn workflow sync_sheets --skip-download

/**
 *
 **/
export class ManifestGenerator {
  constructor(private deployment: IDeploymentConfigJson) {}

  public async process(data: IParsedWorkbookData) {
    const { template_actions, template_components } = await new TemplateSummaryReport().process(
      data
    );

    const outputReports = { template_actions, template_components };
    await this.writeOutputs(outputReports);
  }

  private async writeOutputs(reports: Record<string, IManifestReport>) {
    const outputDir = resolve(this.deployment._workspace_path, "reports");
    await ensureDir(dirname(outputDir));
    await emptyDir(outputDir);
    await this.writeOutputJson(reports, resolve(outputDir, "summary.json"));
    await this.writeOutputMarkdown(reports, resolve(outputDir, "summary.md"));
    logOutput({ msg1: "Reports Generated", msg2: outputDir });
    // repeat log in case boxed output broken
    console.log(chalk.gray(outputDir));
  }

  private async writeOutputJson(reports: Record<string, IManifestReport>, target: string) {
    const output: Record<string, any> = {};
    for (const [key, { data }] of Object.entries(reports)) {
      output[key] = data;
    }
    await writeFile(target, JSON.stringify(output, null, 2));
  }

  private async writeOutputMarkdown(reports: Record<string, IManifestReport>, target: string) {
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
