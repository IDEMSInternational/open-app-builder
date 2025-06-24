import { FlowTypes } from "src/app/shared/model";
import { TemplateContainerComponent } from "../template-container.component";
import { VariableStore } from "../stores/variable-store";
export { FlowTypes } from "src/app/shared/model";

/**
 * Properties passed to a template row instance
 * @param row specific data used in component rendering
 * @param parent reference to parent template container
 */
export interface ITemplateRowProps {
  row: FlowTypes.TemplateRow;
  parent: TemplateContainerComponent;
  variableStore: VariableStore; // Optional, used for variable management
}
