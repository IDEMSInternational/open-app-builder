import { IDeploymentConfigJson } from "data-models";
import type { IReportOutput } from "../../report/report.types";

export class ComponentOptimiser {
  constructor(private config: IDeploymentConfigJson) {}

  /** Generate an optimised components index file based on components used within deployment */
  public async run(report: IReportOutput["template_components"], componentsIndex: string) {
    const { optimisation } = this.config;
    // Use default index if optimisation not enabled
    if (!optimisation.components?.enabled) return componentsIndex;
    // Ensure report data available for optimisation
    if (!report.data) return componentsIndex;

    let optimisedIndex = componentsIndex;

    // Merge list of all components used with deployment-specified implicit components
    const { implicit = [] } = optimisation.components;
    const usedComponentSelectors = report.data.map((el) => el.type).concat(implicit);
    const mergedComponentSelectors = this.hackAddCommonImplicitDependencies(usedComponentSelectors);
    const unusedComponents: Record<string, string> = {};

    // Extract the section of the index.ts file between tags
    // `optimise:components:start` and `optimise:components:end`
    const sectionRegex = /optimise:components:start \*\/([\s\S]*)\/* optimise:components:end/;
    const sectionText = sectionRegex.exec(componentsIndex)?.[1];
    // Extract all `selector: componentName` pairs from mapping
    const keyValueRegex = /([a-z0-9_]*): ([a-z0-9_]*)/gi;
    for (const match of sectionText?.matchAll(keyValueRegex)) {
      const [, selector, componentName] = match;
      if (!mergedComponentSelectors.includes(selector)) {
        unusedComponents[selector] = componentName;
      }
    }

    // Update index to comment out all references to unused component
    for (const componentName of Object.values(unusedComponents)) {
      const regex = new RegExp(`(.*${componentName}.*)`, "g");
      for (const match of componentsIndex.matchAll(regex)) {
        optimisedIndex = optimisedIndex.replace(match[1], `// ${match[1]}`);
      }
    }
    return optimisedIndex;
  }

  private hackAddCommonImplicitDependencies(usedComponentSelectors: string[]) {
    if (usedComponentSelectors.includes("display_group")) {
      usedComponentSelectors.push("form");
      usedComponentSelectors.push("advanced_dashed_box");
    }
    return usedComponentSelectors;
  }
}
