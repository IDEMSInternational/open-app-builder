import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ExistingCommentsComponent } from "./components/existing-comments/existing-comments.component";

const routes: Routes = [
  {
    path: "",
    component: ExistingCommentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentReviewRoutingModule {}
