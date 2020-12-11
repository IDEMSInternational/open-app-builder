import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ModulePageComponent } from "./module-page";

const routes: Routes = [
  {
    path: "",
    component: ModulePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulePageRoutingModule {}
