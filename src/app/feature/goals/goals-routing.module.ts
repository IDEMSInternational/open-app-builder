import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GoalsPage } from "./components/goals.page";

const routes: Routes = [
  {
    path: "",
    component: GoalsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsPageRoutingModule {}
