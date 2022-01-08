import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ContentReviewDebugPage } from "./pages/content-review-debug.page";

const routes: Routes = [
  {
    path: "",
    component: ContentReviewDebugPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentReviewRoutingModule {}
