import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CampaignDebugPage } from "./pages/campaign-debug/campaign-debug.page";
import { NotificationsDebugPage } from "./pages/notifications-debug/notifications-debug.page";

const routes: Routes = [
  {
    path: "",
    component: CampaignDebugPage,
  },
  {
    path: "notifications",
    component: NotificationsDebugPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignPageRoutingModule {}
