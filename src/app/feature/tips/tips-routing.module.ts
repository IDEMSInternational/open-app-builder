import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TipsComponent } from "./tips";

const routes: Routes = [
  {
    path: "",
    component: TipsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipsRoutingModule {}
