import { NgModule, Type } from "@angular/core";

import type { ITemplateRowProps } from "src/app/shared/components/template/models";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { PlhBottomNavigationBarComponent } from "./bottom-navigation-bar/bottom-navigation-bar.component";

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [PlhBottomNavigationBarComponent],
  declarations: [PlhBottomNavigationBarComponent],
})
export class PlhComponentsModule {}

export const PLH_COMPONENT_MAPPING: Record<string, Type<ITemplateRowProps>> = {
  plh_bottom_nav: PlhBottomNavigationBarComponent,
};
