import { FlowTypes } from "scripts/types";
import { TemplateContainerComponent } from "../template-container.component";
export { FlowTypes } from "scripts/types";

/**
 * Properties passed to a template container instance
 * @param name - flow_name of template to lookup
 * @param parent - reference to parent template (when nested)
 */
export interface ITemplateContainerProps {
  name: string;
  parent?: { name: string; component?: any };
  row?: FlowTypes.TemplateRow;
}

/**
 * Properties passed to a template row instance
 * @param row specific data used in component rendering
 * @param localVariables compiled list of variables used across all template rows
 * @param parent reference to parent template container
 */
export interface ITemplateRowProps {
  row: FlowTypes.TemplateRow;
  parent: TemplateContainerComponent;
}
