import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { TemplateComponentsModule } from "src/app/shared/components/template/template.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplateComponentsModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
