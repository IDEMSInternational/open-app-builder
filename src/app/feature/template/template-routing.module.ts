import { inject, NgModule } from "@angular/core";
import { CanDeactivateFn, Router, Routes, RouterModule } from "@angular/router";

import { TemplatePage } from "./template.page";

const canLeaveOnHistoryNavigation: CanDeactivateFn<TemplatePage> = (page) =>
  inject(Router).currentNavigation()?.trigger === "popstate" ? page.canLeave() : true;

const routes: Routes = [
  {
    path: ":templateName",
    component: TemplatePage,
    canDeactivate: [canLeaveOnHistoryNavigation],
  },
  {
    path: "",
    component: TemplatePage,
    canDeactivate: [canLeaveOnHistoryNavigation],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatePageRoutingModule {}
