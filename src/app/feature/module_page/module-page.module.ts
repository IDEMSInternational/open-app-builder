import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ModulePageRoutingModule } from "./module-page-routing.module";

import { ModulePageComponent } from "./module-page";
import { ModuleFocusSkin } from "./skins";
import { ModulePageFlowComponentsModule } from "./flow-components/flow-component";

const skins = [ModuleFocusSkin];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulePageRoutingModule,
    ModulePageFlowComponentsModule,
  ],
  declarations: [ModulePageComponent, ...skins],
})
export class ModulePageModule {}
