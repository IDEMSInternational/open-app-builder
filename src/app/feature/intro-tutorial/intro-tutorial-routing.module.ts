import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IntroTutorialPage } from "./intro-tutorial.page";

const routes: Routes = [
  {
    path: "",
    component: IntroTutorialPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyPageRoutingModule {}
