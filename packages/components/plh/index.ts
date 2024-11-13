import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { LottieModule } from "ngx-lottie";
import { PlhParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";
import { PlhParentPointBoxComponent } from "./parent-point-box/parent-point-box.component";

@NgModule({
  imports: [CommonModule, IonicModule, TemplatePipesModule, LottieModule],
  exports: [PlhParentPointCounterComponent, PlhParentPointBoxComponent],
  declarations: [PlhParentPointCounterComponent, PlhParentPointBoxComponent],
  providers: [],
})
export class PlhComponentsModule {}

export const PLH_COMPONENT_MAPPING = {
  parent_point_counter: PlhParentPointCounterComponent,
  parent_point_box: PlhParentPointBoxComponent,
};

export type PLHComponentName = keyof typeof PLH_COMPONENT_MAPPING;
