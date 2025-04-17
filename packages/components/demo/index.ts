import { Type } from "@angular/core";

import { DemoBasicComponent } from "./basic/basic.component";
import type { ITemplateRowProps } from "src/app/shared/components/template/models";

export { DemoBasicComponent };

export const DEMO_COMPONENTS = [DemoBasicComponent];

export const DEMO_COMPONENT_MAPPING: Record<string, Type<ITemplateRowProps>> = {
  demo_basic: DemoBasicComponent,
};
