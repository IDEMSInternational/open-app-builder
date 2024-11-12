import chalk from "chalk";
import { IDeploymentConfigJson } from "data-models";
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { deepMergeObjects, Logger, PATHS, ROOT_DIR, setNestedProperty } from "shared";
import ANGULAR_JSON_TEMPLATE from "../../../../../../angular.base.json";
import type { IReportOutput } from "../report/report.types";

import { ComponentOptimiser } from "./optimisers/components";
import { IAngularBuildOptions } from "./optimise.types";

const APP_DIR = resolve(PATHS.ROOT_DIR, "src", "app");

export class AppDataOptimiser {
  private report: IReportOutput;
  private angularBuildOptions = this.getAngularJsonBuildOptions();

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

  /** Retrieve base angular build options and return as new object */
  private getAngularJsonBuildOptions(): IAngularBuildOptions {
    return deepMergeObjects({}, ANGULAR_JSON_TEMPLATE.projects.app.architect.build.options);
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
    const res = await new ComponentOptimiser(this.config).run({
      reportData: this.report.template_components.data,
      componentsIndex,
      angularBuildOptions: this.angularBuildOptions,
    });
    const { optimisedIndex, optimisedBuildOptions } = res;
    // Update angular build options with optimisations and file replacement
    this.angularBuildOptions = optimisedBuildOptions;
    // add component index override
    this.angularBuildOptions.fileReplacements.push({
      replace: "src/shared/components/template/components/index.ts",
      with: "src/shared/components/template/components/index.deployment.ts",
    });
    // Write deployment index
    const outputPath = resolve(componentsDir, "index.deployment.ts");
    await writeFile(outputPath, optimisedIndex);
    console.log(chalk.gray(`Components optimisation written to\n${outputPath}`));
  }

  private async writeAngularJson() {
    const outputPath = resolve(ROOT_DIR, "angular.json");
    const mergedConfig = setNestedProperty(
      "projects.app.architect.build.options",
      this.angularBuildOptions,
      ANGULAR_JSON_TEMPLATE
    );
    await writeFile(outputPath, JSON.stringify(mergedConfig, null, 2));
  }
}
