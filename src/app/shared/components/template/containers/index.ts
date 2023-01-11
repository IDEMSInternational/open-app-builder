import { TemplateContainerComponent } from "../template-container.component";
import { TemplateDynamicComponent } from "./template-dynamic/template-dynamic.component";

/** Available template containers to handle template rendering strategy */
export const TEMLATE_CONTAINERS = {
  default: TemplateContainerComponent,
  dynamic: TemplateDynamicComponent,
} as const;
