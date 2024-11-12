import { IDeploymentConfigJson } from "data-models";
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { Logger, PATHS } from "shared";
import type { IReportOutput } from "../report/report.types";
import chalk from "chalk";
import { ComponentOptimiser } from "./optimisers/components";

const APP_DIR = resolve(PATHS.ROOT_DIR, "src", "app");

export class AppDataOptimiser {
  private report: IReportOutput;
  constructor(private config: IDeploymentConfigJson) {}
  public async run() {
    this.report = await this.loadSummaryReport();
    await this.optimiseComponents();
  }

  private async loadSummaryReport() {
    const { _workspace_path } = this.config;
    const summaryReportPath = resolve(_workspace_path, "reports", "summary.json");
    if (!existsSync(summaryReportPath)) {
      Logger.error({
        msg1: "Cannot optimise build as no reports exist, please sync the deployment first",
        msg2: "yarn workflow sync",
      });
    }
    const report = await readFile(summaryReportPath, { encoding: "utf-8" });
    return JSON.parse(report) as IReportOutput;
  }

  /**
   * Create optimised `index.deployment.ts` file for shared components, exporting only
   * components that are used within sheets
   */
  private async optimiseComponents() {
    const { template_components } = this.report;
    // Read default index
    const componentsDir = resolve(APP_DIR, "shared", "components", "template", "components");
    const componentsIndex = await readFile(resolve(componentsDir, "index.ts"), {
      encoding: "utf8",
    });
    // Optimise
    const optimisedIndex = await new ComponentOptimiser(this.config).run(
      template_components,
      componentsIndex
    );
    // Write deployment index
    const outputPath = resolve(componentsDir, "index.deployment.ts");
    await writeFile(outputPath, optimisedIndex);
    console.log(chalk.gray(`Components optimisation written to\n${outputPath}`));
  }
}
