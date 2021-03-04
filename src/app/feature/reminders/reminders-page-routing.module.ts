import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RemindersPageComponent } from "./pages/reminders-page.component";

const routes: Routes = [
  {
    path: "",
    component: RemindersPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemindersPageRoutingModule {}
