import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ModulePage } from "./module-page";
import { ModulePageRoutingModule } from "./module-page-routing.module";
import { ModuleFocusSkinModule } from "./skins";

const Skins = [ModuleFocusSkinModule];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ModulePageRoutingModule, ...Skins],
  declarations: [ModulePage],
  exports: [],
})
export class ModulePageModule {}
