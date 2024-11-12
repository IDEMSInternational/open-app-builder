import { IDeploymentConfigJson } from "data-models";
import type { IReportOutput } from "../../report/report.types";
import { IAngularBuildOptions, ICommonComponentName } from "../optimise.types";

/** Partial hashmap of named common components with their corresponding component class name */
type ICommonComponentMapping = { [name in ICommonComponentName]?: string };

export class ComponentOptimiser {
  constructor(private config: IDeploymentConfigJson) {}

  /**
   * Generate an optimised components index file based on components used within deployment
   * @param angularJson parsed angular.json file for entry modification
   * @param componentsIndex parsed template components index file for modification
   * @param reportComponents parsed report template_components result
   * */
  public async run(params: {
    angularBuildOptions: IAngularBuildOptions;
    componentsIndex: string;
    reportData: IReportOutput["template_components"]["data"];
  }) {
    const { angularBuildOptions, componentsIndex, reportData } = params;

    const unusedComponents = this.listUnusedComponents(reportData, componentsIndex);
    const optimisedIndex = this.optimiseComponentsIndex(unusedComponents, componentsIndex);
    const optimisedBuildOptions = this.optimiseBuildOptions(unusedComponents, angularBuildOptions);

    return { optimisedIndex, optimisedBuildOptions };
  }

  /**
   * Compare list of components named in report against all common components as extracted
   * from the template components index.ts file, and return list of unused component mappings
   */
  private listUnusedComponents(
    reportData: IReportOutput["template_components"]["data"],
    componentsIndex: string
  ) {
    const { optimisation } = this.config;

    // Merge list of all components used with deployment-specified implicit components
    const { implicit = [] } = optimisation.components;
    const usedComponentSelectors = reportData.map((el) => el.type).concat(implicit);

    const mergedComponentSelectors = this.hackAddCommonImplicitDependencies(usedComponentSelectors);
    const unusedComponents: ICommonComponentMapping = {};
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
    return unusedComponents;
  }

  /** Revert specific changes made to angular.json for component support if not in use */
  private optimiseBuildOptions(
    unusedComponents: ICommonComponentMapping,
    buildOptions: IAngularBuildOptions
  ) {
    // remove comp-pdf assets
    if (unusedComponents.pdf) {
      buildOptions.assets = buildOptions.assets.filter((v) => v.output !== "/assets/comp-pdf");
    }
    return buildOptions;
  }

  /** Update components index file to comment out references to components not in use */
  private optimiseComponentsIndex(
    unusedComponents: ICommonComponentMapping,
    componentsIndex: string
  ) {
    for (const componentName of Object.values(unusedComponents)) {
      const regex = new RegExp(`(.*${componentName}.*)`, "g");
      for (const match of componentsIndex.matchAll(regex)) {
        componentsIndex = componentsIndex.replace(match[1], `// ${match[1]}`);
      }
    }
    return componentsIndex;
  }

  private hackAddCommonImplicitDependencies(usedComponentSelectors: string[]) {
    if (usedComponentSelectors.includes("display_group")) {
      usedComponentSelectors.push("form");
      usedComponentSelectors.push("advanced_dashed_box");
    }
    return usedComponentSelectors;
  }
}
