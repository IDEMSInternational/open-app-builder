import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TemplateTestingPage } from "./template-testing.page";

const routes: Routes = [
  {
    path: ":templateName",
    component: TemplateTestingPage,
  },
  {
    path: "",
    component: TemplateTestingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateTestingPageRoutingModule {}
