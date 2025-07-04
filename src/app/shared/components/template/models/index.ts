import { FlowTypes } from "src/app/shared/model";
import { TemplateContainerComponent } from "../template-container.component";
import { VariableStore } from "../stores/variable-store";
import type { TemplateComponent } from "../template-component";
export { FlowTypes } from "src/app/shared/model";

/**
 * Properties passed to a template row instance
 * @param row specific data used in component rendering
 * @param parent reference to parent template container
 */
export interface ITemplateRowProps {
  row: FlowTypes.TemplateRow;
  /**
   * @deprecated
   * The `parent` refers to `<plh-template-container>` which is
   * 2 levels above base component. Prefer to use `parentContainerComponent` instead
   * if needing to access directly
   */
  parent: TemplateContainerComponent;
  variableStore: VariableStore; // Optional, used for variable management
  /**
   * Ref to parent TemplateContainerComponent class from hierarchy
   * ```html
   * <plh-container-component>
   *   <plh-template-component>
   *     <my-component />
   *   <plh-template-component>
   * </plh-container-component>
   * ```
   */
  parentContainerComponentRef?: TemplateContainerComponent;
  /**
   * Ref to parent TemplateContainerComponent class from hierarchy
   * ```html
   * <plh-template-component>
   *   <my-component />
   * <plh-template-component>
   * ```
   */
  parentTemplateComponentRef?: TemplateComponent;
}
