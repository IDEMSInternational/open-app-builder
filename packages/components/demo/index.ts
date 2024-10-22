import { NgModule, Type } from "@angular/core";

import { TmplExampleComponent } from "./example/example.component";
import type { ITemplateRowProps } from "src/app/shared/components/template/models";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [TmplExampleComponent],
  declarations: [TmplExampleComponent],
})
export class DemoComponentsModule {}

export const DEMO_COMPONENT_MAPPING: Record<string, Type<ITemplateRowProps>> = {
  example: TmplExampleComponent,
};
