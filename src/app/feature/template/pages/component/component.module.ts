import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TemplateComponentsModule } from "src/app/shared/components/template/template.module";
import { ComponentPage } from "./component.page";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ComponentPage,
  },
  {
    path: ":componentName",
    component: ComponentPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TemplateComponentsModule,
  ],
  exports: [RouterModule],
  declarations: [ComponentPage],
})
export class TemplateComponentModule {}
