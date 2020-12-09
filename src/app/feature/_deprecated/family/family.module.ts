import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FamilyPageRoutingModule } from "./family-routing.module";

import { FamilyPage } from "./family.page";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FamilyPageRoutingModule, SharedModule],
  declarations: [FamilyPage],
})
export class FamilyPageModule {}
