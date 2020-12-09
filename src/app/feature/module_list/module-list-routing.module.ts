import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ModuleListComponent } from "./module-list";

const routes: Routes = [
  {
    path: "",
    component: ModuleListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleListRoutingModule {}
