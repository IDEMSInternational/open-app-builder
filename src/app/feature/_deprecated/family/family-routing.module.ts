import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FamilyPage } from "./family.page";

const routes: Routes = [
  {
    path: "",
    component: FamilyPage,
  },
  {
    path: "add-family-member",
    loadChildren: () =>
      import("./add-family-member/add-family-member.module").then(
        (m) => m.AddFamilyMemberPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyPageRoutingModule {}
