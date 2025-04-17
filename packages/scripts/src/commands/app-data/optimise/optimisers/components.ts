import type { IDeploymentConfigJson } from "data-models";
import type { IReportOutput } from "../../report/report.types";
import type {
  IAngularBuildOptions,
  ICommonComponentName,
  IComponentManifest,
} from "../optimise.types";

/** Partial hashmap of named common components with their corresponding component class name */
type ICommonComponentMapping = { [name in ICommonComponentName]?: any };

// Optimisation input parameters
export interface IComponentOptimisationParams {
  /** parsed angular.json file for entry modification */
  angularBuildOptions: IAngularBuildOptions;
  /** parsed template components index file for modification */
  indexTs: string;
  /** Manifest of component dependencies */
  manifest: IComponentManifest<string, string>;
  /** parsed template components module file for modification */
  moduleTs: string;
  /** parsed report template_components result */
  reportData: IReportOutput["template_components"]["data"];
  /** deployment optimisation config */
  config: IDeploymentConfigJson["optimisation"];
}

// Optimised output is same as input but without reportData and config */
type IComponentOptimisationOutput = Omit<
  IComponentOptimisationParams,
  "reportData" | "config" | "manifest"
>;

export class ComponentOptimiser {
  /** List of all used components as [authored_name]: true */
  private usedComponents: ICommonComponentMapping = {};
  /** List of all unused components as [authored_name]: [code_component_name] */
  private unusedComponents: ICommonComponentMapping = {};

  private output: IComponentOptimisationOutput;

  constructor(private params: IComponentOptimisationParams) {}

  public run() {
    // copy input data to output object for overwrite
    const { angularBuildOptions, indexTs, moduleTs, reportData } = this.params;
    this.output = { angularBuildOptions, indexTs, moduleTs };

    // setup lists of used and unused components
    this.usedComponents = this.listUsedComponents(reportData);
    this.unusedComponents = this.listUnusedComponents(indexTs);

    // handle optimisation and return optimised output
    for (const [componentName, importName] of Object.entries(this.unusedComponents)) {
      this.optimiseUnusedComponent(componentName as any, importName);
    }
    return this.output;
  }

  /** Generate a list of all used components */
  private listUsedComponents(reportData: IReportOutput["template_components"]["data"]) {
    const { implicit = [] } = this.params.config.components;
    // create a mapping of all used component names (generated from report and implicit config)
    // additionally include any known implicit dependencies
    const usedComponentMapping: ICommonComponentMapping = {};
    const usedComponentNames = reportData.map((el) => el.type).concat(implicit);
    for (const componentName of usedComponentNames) {
      usedComponentMapping[componentName] = true;
      // Add additional implicit components from known manifest
      for (const implicitName of this.params.manifest[componentName]?.implicit || []) {
        usedComponentMapping[implicitName] = true;
      }
    }
    return usedComponentMapping;
  }

  /**
   * Compare list of components named in report against all common components as extracted
   * from the template components index.ts file, and return list of unused component mappings
   */
  private listUnusedComponents(indexTs: string) {
    const unusedComponents: ICommonComponentMapping = {};
    // Extract the section of the index.ts file between tags
    // `optimise:components:start` and `optimise:components:end`
    const sectionRegex = /optimise:components:start \*\/([\s\S]*)\/* optimise:components:end/;
    const sectionText = sectionRegex.exec(indexTs)?.[1];
    // Extract all `selector: componentName` pairs from mapping
    const keyValueRegex = /([a-z0-9_]*): ([a-z0-9_]*)/gi;
    for (const match of sectionText?.matchAll(keyValueRegex)) {
      const [, selector, componentName] = match;
      if (!this.usedComponents[selector]) {
        unusedComponents[selector] = componentName;
      }
    }
    return unusedComponents;
  }

  /**
   * Handle component optimisation, removing unused component references from
   * component index.ts and handling manifest knock-ons to remove imported modules
   * or angular build assets as required
   */
  private optimiseUnusedComponent(componentName: ICommonComponentName, importName: string) {
    let { angularBuildOptions, indexTs, moduleTs } = this.output;

    // comment out references to component import from component index
    indexTs = this.commentOutLinesContainingString(indexTs, importName);

    // handle knock-ons
    const manifest = this.params.manifest[componentName];
    if (manifest) {
      const { assets, module } = manifest;
      // remove angular.json build assets
      if (assets) {
        angularBuildOptions.assets = this.output.angularBuildOptions.assets.filter(
          (v) => v.output !== assets
        );
      }
      // remove module import refs
      // TODO - handle (future) case if module used by multiple components
      if (module) {
        moduleTs = this.commentOutLinesContainingString(moduleTs, module);
      }
    }
    // update output
    this.output = { angularBuildOptions, indexTs, moduleTs };
  }

  /** Take a multi-line source text and comment out any lines containing a given value */
  private commentOutLinesContainingString(sourceText: string, value: string) {
    // create regex expression with capture group to match entire line containing value
    const regex = new RegExp(`(.*${value}.*)`, "g");
    for (const match of sourceText.matchAll(regex)) {
      // replace matched line with commented out version
      sourceText = sourceText.replace(match[1], `// ${match[1]}`);
    }
    return sourceText;
  }
}
