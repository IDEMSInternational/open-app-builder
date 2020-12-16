import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TipsComponent } from "./tips";
import { TipsRoutingModule } from "./tips-routing.module";
import { TipsModuleFocusSkinModule } from "./skins/module-focus/module-focus.skin.module";

const Skins = [TipsModuleFocusSkinModule];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TipsRoutingModule, ...Skins],
  declarations: [TipsComponent],
  exports: [],
})
export class TipsModule {}
