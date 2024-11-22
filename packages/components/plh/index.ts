import { NgModule, Type } from "@angular/core";

import type { ITemplateRowProps } from "src/app/shared/components/template/models";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { LottieModule } from "ngx-lottie";
import { PlhParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";
import { PlhParentPointBoxComponent } from "./parent-point-box/parent-point-box.component";
import { PlhModuleDetailsHeaderComponent } from "./plh-kids-kw/components/module-details-header/module-details-header.component";

@NgModule({
  imports: [CommonModule, IonicModule, TemplatePipesModule, LottieModule],
  exports: [
    PlhParentPointCounterComponent,
    PlhParentPointBoxComponent,
    PlhModuleDetailsHeaderComponent,
  ],
  declarations: [
    PlhParentPointCounterComponent,
    PlhParentPointBoxComponent,
    PlhModuleDetailsHeaderComponent,
  ],
  providers: [],
})
export class PlhComponentsModule {}

export const PLH_COMPONENT_MAPPING: Record<string, Type<ITemplateRowProps>> = {
  parent_point_counter: PlhParentPointCounterComponent,
  parent_point_box: PlhParentPointBoxComponent,
  plh_module_details_header: PlhModuleDetailsHeaderComponent,
};
