import { NgModule, Type } from "@angular/core";

import type { ITemplateRowProps } from "src/app/shared/components/template/models";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { LottieModule } from "ngx-lottie";
import { PlhParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";
import { PlhParentPointBoxComponent } from "./parent-point-box/parent-point-box.component";
import { PlhModuleListItemComponent } from "./plh-kids-kw/components/module-list-item/module-list-item.component";
import { RouterModule } from "@angular/router";
import { PlhModuleDetailsHeaderComponent } from "./plh-kids-kw/components/module-details-header/module-details-header.component";

@NgModule({
  imports: [CommonModule, IonicModule, TemplatePipesModule, LottieModule, RouterModule],
  exports: [
    PlhParentPointCounterComponent,
    PlhParentPointBoxComponent,
    PlhModuleListItemComponent,
    PlhModuleDetailsHeaderComponent,
  ],
  declarations: [
    PlhParentPointCounterComponent,
    PlhParentPointBoxComponent,
    PlhModuleListItemComponent,
    PlhModuleDetailsHeaderComponent,
  ],
  providers: [],
})
export class PlhComponentsModule {}

export const PLH_COMPONENT_MAPPING: Record<string, Type<ITemplateRowProps>> = {
  parent_point_counter: PlhParentPointCounterComponent,
  parent_point_box: PlhParentPointBoxComponent,
  plh_module_details_header: PlhModuleDetailsHeaderComponent,
  plh_module_list_item: PlhModuleListItemComponent,
};
