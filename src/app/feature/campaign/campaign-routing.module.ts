import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CampaignDebugPage } from "./pages/campaign-debug/campaign-debug.page";

const routes: Routes = [
  {
    path: "",
    component: CampaignDebugPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignPageRoutingModule {}
