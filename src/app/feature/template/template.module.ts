import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TemplatePageRoutingModule } from "./template-routing.module";

import { TemplatePage } from "./template.page";
import { TemplateComponentsModule } from "src/app/shared/components/template/template.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplatePageRoutingModule,
    TemplateComponentsModule,
  ],
  declarations: [TemplatePage],
})
export class TemplatePageModule {}
