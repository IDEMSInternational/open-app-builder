import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ToolboxPageRoutingModule } from "./toolbox-routing.module";

import { ToolboxPage } from "./toolbox.page";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ToolboxPageRoutingModule, SharedModule],
  declarations: [ToolboxPage],
})
export class ToolboxPageModule {}
