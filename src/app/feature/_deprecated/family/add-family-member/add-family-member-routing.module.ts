import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFamilyMemberPage } from './add-family-member.page';

const routes: Routes = [
  {
    path: '',
    component: AddFamilyMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFamilyMemberPageRoutingModule {}
