import { NgModule, Type } from "@angular/core";

import { DemoBasicComponent } from "./basic/basic.component";
import type { ITemplateRowProps } from "src/app/shared/components/template/models";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [DemoBasicComponent],
  declarations: [DemoBasicComponent],
})
export class DemoComponentsModule {}

export const DEMO_COMPONENT_MAPPING: Record<string, Type<ITemplateRowProps>> = {
  demo_basic: DemoBasicComponent,
};
