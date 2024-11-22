import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { LottieModule } from "ngx-lottie";
import { PlhParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";
import { PlhParentPointBoxComponent } from "./parent-point-box/parent-point-box.component";
import { PlhModuleListItemComponent } from "./plh-kids-kw/components/module-list-item/module-list-item.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, IonicModule, TemplatePipesModule, LottieModule, RouterModule],
  exports: [PlhParentPointCounterComponent, PlhParentPointBoxComponent, PlhModuleListItemComponent],
  declarations: [
    PlhParentPointCounterComponent,
    PlhParentPointBoxComponent,
    PlhModuleListItemComponent,
  ],
  providers: [],
})
export class PlhComponentsModule {}

export const PLH_COMPONENT_MAPPING = {
  parent_point_counter: PlhParentPointCounterComponent,
  parent_point_box: PlhParentPointBoxComponent,
  plh_module_list_item: PlhModuleListItemComponent,
};

export type PLHComponentName = keyof typeof PLH_COMPONENT_MAPPING;
