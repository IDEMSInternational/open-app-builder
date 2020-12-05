import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ModulePage } from "./module-page";

const routes: Routes = [
  {
    path: "",
    component: ModulePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulePageRoutingModule {}
