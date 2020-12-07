import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ModuleListComponent } from "./module-list";
import { ModuleListRoutingModule } from "./module-list-routing.module";
import { ModuleFocusSkinModule } from "./skins";

const Skins = [ModuleFocusSkinModule];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ModuleListRoutingModule, ...Skins],
  declarations: [ModuleListComponent],
  exports: [],
})
export class ModuleListModule {}
