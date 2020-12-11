import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared.module";

// components

import { TipsModuleFocusSkin } from "./module-focus.skin";

const components = [];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, SharedModule],
  exports: [TipsModuleFocusSkin],
  declarations: [TipsModuleFocusSkin, ...components],
})
export class TipsModuleFocusSkinModule {}
