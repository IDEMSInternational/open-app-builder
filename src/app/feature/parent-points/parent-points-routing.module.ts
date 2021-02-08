import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentPointsPage } from './parent-points.page';

const routes: Routes = [
  {
    path: '',
    component: ParentPointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentPointsPageRoutingModule {}
