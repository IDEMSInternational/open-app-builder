import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { canLeaveReactiveTemplatePage } from "src/app/reactive-templates/services/navigation-service";

import { TemplatePage } from "./template.page";

const routes: Routes = [
  {
    path: ":templateName",
    component: TemplatePage,
    canDeactivate: [canLeaveReactiveTemplatePage],
  },
  {
    path: "",
    component: TemplatePage,
    canDeactivate: [canLeaveReactiveTemplatePage],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatePageRoutingModule {}
