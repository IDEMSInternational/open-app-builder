import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FeedbackDebugPage } from "./pages/feedback-debug.page";

const routes: Routes = [
  {
    path: "",
    component: FeedbackDebugPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackRoutingModule {}
