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
import { TEMPLATE_COMPONENT_MANIFEST } from "../../../../../../src/app/shared/components/template/components/manifest";

const APP_DIR = resolve(PATHS.ROOT_DIR, "src", "app");

export class AppDataOptimiser {
  private report: IReportOutput;

  private buildConfig = ANGULAR_JSON_TEMPLATE.projects.app.architect.build;

  constructor(private deploymentConfig: IDeploymentConfigJson) {}

  public async run() {
    this.report = await this.loadSummaryReport();
    // apply any configured optimisations
    const { components } = this.deploymentConfig.optimisation;
    if (components) {
      await this.optimiseComponents();
      await this.writeAngularJson();
    }
  }

  /** Load data from generated reports */
  private async loadSummaryReport() {
    const { _workspace_path } = this.deploymentConfig;
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
   * Create optimised template component `index.deployment.ts` and `template.module.ts` files,
   * declaring only components used and modules required by those components
   */
  private async optimiseComponents() {
    const templatesDir = resolve(APP_DIR, "shared", "components", "template");

    // Read default component indexTs and moduleTs files
    const indexTsPath = resolve(templatesDir, "components", "index.ts");
    const indexTs = await readFile(indexTsPath, { encoding: "utf8" });
    const moduleTsPath = resolve(templatesDir, "template.module.ts");
    const moduleTs = await readFile(moduleTsPath, { encoding: "utf8" });

    // Optimise components
    const angularBuildOptions = this.buildConfig.options;
    const optimiser = new ComponentOptimiser({
      angularBuildOptions,
      config: this.deploymentConfig.optimisation,
      indexTs,
      manifest: TEMPLATE_COMPONENT_MANIFEST,
      moduleTs,
      reportData: this.report.template_components.data,
    });
    const optimised = optimiser.run();

    // Write optimised outputs to file for override during production build
    const indexTsTarget = resolve(templatesDir, "components", "index.deployment.ts");
    await writeFile(indexTsTarget, optimised.indexTs);
    const moduleTsTarget = resolve(templatesDir, "template.module.deployment.ts");
    await writeFile(moduleTsTarget, optimised.moduleTs);

    const outputMsg = `Components optimisation written to\n${indexTsTarget}\n${moduleTsTarget}`;
    console.log(chalk.gray(outputMsg));

    // Update angular build options with optimisations and file replacement (written to file later)
    const indexReplacement = {
      replace: "src/app/shared/components/template/components/index.ts",
      with: "src/app/shared/components/template/components/index.deployment.ts",
    };
    const moduleReplacement = {
      replace: "src/app/shared/components/template/template.module.ts",
      with: "src/app/shared/components/template/template.module.deployment.ts",
    };
    this.buildConfig.configurations.production.fileReplacements.push(indexReplacement);
    this.buildConfig.configurations.production.fileReplacements.push(moduleReplacement);
    this.buildConfig.options = optimised.angularBuildOptions;
  }

  private async writeAngularJson() {
    const outputPath = resolve(ROOT_DIR, "angular.json");
    const mergedConfig = setNestedProperty(
      "projects.app.architect.build",
      this.buildConfig,
      ANGULAR_JSON_TEMPLATE
    );
    // format with prettier prior to write to reduce git diff
    const formattedText = await format(JSON.stringify(mergedConfig), {
      parser: "json",
      printWidth: 100,
      endOfLine: "crlf",
      trailingComma: "es5",
    });
    await writeFile(outputPath, formattedText);
  }
}
