import { NgModule, Type } from "@angular/core";

import type { ITemplateRowProps } from "src/app/shared/components/template/models";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes/template-pipes.module";
import { PlhParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";

@NgModule({
  imports: [CommonModule, IonicModule, TemplatePipesModule],
  exports: [PlhParentPointCounterComponent],
  declarations: [PlhParentPointCounterComponent],
  providers: [],
})
export class PlhComponentsModule {}

export const PLH_COMPONENT_MAPPING: Record<string, Type<ITemplateRowProps>> = {
  parent_point_counter: PlhParentPointCounterComponent,
};
