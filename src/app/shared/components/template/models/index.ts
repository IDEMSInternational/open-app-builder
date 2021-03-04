import { FlowTypes } from "scripts/types";
import { TemplateContainerComponent } from "../template-container.component";
export { FlowTypes } from "scripts/types";

// export interface ITemplateComponent {
//   row?: FlowTypes.TemplateRow;
//   rows?: FlowTypes.TemplateRow[];
//   localVariables?: { [name: string]: any };
//   parent?: { name: string; component: ITemplateComponent };
// }

/**
 * Properties passed to a template container instance
 * @param name - flow_name of template to lookup
 * @param parent - reference to parent template (when nested)
 */
export interface ITemplateContainerProps {
  name: string;
  parent?: { name: string; component?: any };
}

export interface ITemplateRowProps {
  /** specific data used in component rendering */
  row: FlowTypes.TemplateRow;
  /** compiled list of variables used across all template rows */
  localVariables: { [name: string]: any };
  /** reference to parent template container */
  parent: { name: string; component: TemplateContainerComponent };
}
