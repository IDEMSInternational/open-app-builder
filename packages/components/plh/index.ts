import { NgModule, Type } from "@angular/core";

import type { ITemplateRowProps } from "src/app/shared/components/template/models";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { LottieModule } from "ngx-lottie";
import { PlhParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";
import { PlhParentPointBoxComponent } from "./parent-point-box/parent-point-box.component";
import { PlhBottomNavigationBarComponent } from "./bottom-navigation-bar/bottom-navigation-bar.component";

@NgModule({
  imports: [CommonModule, IonicModule, TemplatePipesModule, LottieModule],
  exports: [PlhParentPointCounterComponent, PlhParentPointBoxComponent, PlhBottomNavigationBarComponent],
  declarations: [PlhParentPointCounterComponent, PlhParentPointBoxComponent, PlhBottomNavigationBarComponent],
  providers: [],
})
export class PlhComponentsModule {}

export const PLH_COMPONENT_MAPPING: Record<string, Type<ITemplateRowProps>> = {
  bottom_nav: PlhBottomNavigationBarComponent,
  parent_point_counter: PlhParentPointCounterComponent,
  parent_point_box: PlhParentPointBoxComponent,
};
