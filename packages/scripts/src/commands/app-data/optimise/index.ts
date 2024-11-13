import chalk from "chalk";
import { IDeploymentConfigJson } from "data-models";
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { format } from "prettier";
import { Logger, PATHS, ROOT_DIR, setNestedProperty } from "shared";
import ANGULAR_JSON_TEMPLATE from "../../../../../../angular.json";
import type { IReportOutput } from "../report/report.types";

import { ComponentOptimiser } from "./optimisers/components";

const APP_DIR = resolve(PATHS.ROOT_DIR, "src", "app");

export class AppDataOptimiser {
  private report: IReportOutput;

  private buildConfig = ANGULAR_JSON_TEMPLATE.projects.app.architect.build;

  constructor(private config: IDeploymentConfigJson) {}

  public async run() {
    this.report = await this.loadSummaryReport();
    // apply any configured optimisations
    const { components } = this.config.optimisation;
    if (components) {
      await this.optimiseComponents();
    }
    // ensure write of updated angular json regardless of any optimisations
    // to make available to deployment
    await this.writeAngularJson();
  }

  /** Load data from generated reports */
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
    // Read default index
    const componentsDir = resolve(APP_DIR, "shared", "components", "template", "components");
    const componentsIndex = await readFile(resolve(componentsDir, "index.ts"), {
      encoding: "utf8",
    });
    // Optimise
    const res = new ComponentOptimiser(this.config).run({
      reportData: this.report.template_components.data,
      componentsIndex,
      angularBuildOptions: this.buildConfig.options,
    });
    const { optimisedIndex, optimisedBuildOptions } = res;

    // Update angular build options with optimisations and file replacement
    this.buildConfig.options = optimisedBuildOptions;

    // Update angular file replacements to include deployment-specific
    const deploymentIndexReplacement = {
      replace: "src/app/shared/components/template/components/index.ts",
      with: "src/app/shared/components/template/components/index.deployment.ts",
    };
    this.buildConfig.configurations.production.fileReplacements.push(deploymentIndexReplacement);

    // Write deployment index
    const outputPath = resolve(componentsDir, "index.deployment.ts");
    await writeFile(outputPath, optimisedIndex);
    console.log(chalk.gray(`Components optimisation written to\n${outputPath}`));
  }

  private async writeAngularJson() {
    const outputPath = resolve(ROOT_DIR, "angular.json");
    const mergedConfig = setNestedProperty(
      "projects.app.architect.build",
      this.buildConfig,
      ANGULAR_JSON_TEMPLATE
    );
    const formattedText = await format(JSON.stringify(mergedConfig), {
      parser: "json",
      printWidth: 100,
      endOfLine: "crlf",
      trailingComma: "es5",
    });
    await writeFile(outputPath, formattedText);
  }
}
