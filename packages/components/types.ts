// Re-export list of common component names from src template components for use in component manifest types
import type { ICommonComponentName } from "../../src/app/shared/components/template/components";
export type { ICommonComponentName } from "../../src/app/shared/components/template/components";

/**
 * Manifest declaration of external dependencies required by components, used for build optimisation
 * Can include additional (implicit) components, angular assets and template modules
 *
 * Types inferred from provided component list
 * @example
 * ```ts
 * const components_list = {button:ButtonComponent,...}
 * type componentName = keyof typeof components_list
 * const components_manifest:IComponentManifest<componentName> = {button:{...}}
 * ```
 **/
export type IComponentManifest<
  ComponentNameType extends string = string,
  ImplicitComponentNameType extends string = ICommonComponentName,
> = {
  [key in ComponentNameType]?: {
    /** Name of module required by component and imported into template module */
    module?: string;
    /** Name of assets output required by component and included in angular.json */
    assets?: string;
    /** Name of known implicit dependencies of component that must be included with component */
    implicit?: ImplicitComponentNameType[];
  };
};
