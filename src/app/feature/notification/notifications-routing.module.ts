import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NotificationsDebugPage } from "../notifications/pages/notifications-debug/notifications-debug.page";

const routes: Routes = [
  {
    path: "",
    component: NotificationsDebugPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
