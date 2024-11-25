import { FlowTypes } from "src/app/shared/model";
import { TemplateContainerComponent } from "../template-container.component";
import { InputSignal } from "@angular/core";
export { FlowTypes } from "src/app/shared/model";

/**
 * Properties passed to a template container instance
 * @param templateName - flow_name of template to lookup
 * @param name - unique name for the template, in cases where multiple child templates of the same type may exist (e.g. multiple buttons)
 * @param row - reference to the full row if template instantiated from a parent
 * @param parent - reference to parent template (when nested)
 */
export interface ITemplateContainerProps {
  templatename: string | InputSignal<string>;
  name: string;
  parent?: { name: string; component?: any };
  row?: FlowTypes.TemplateRow;
}

/**
 * Properties passed to a template row instance
 * @param row specific data used in component rendering
 * @param parent reference to parent template container
 */
export interface ITemplateRowProps {
  row: FlowTypes.TemplateRow;
  parent: TemplateContainerComponent;
}
