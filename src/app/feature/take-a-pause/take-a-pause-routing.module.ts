import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakeAPausePage } from './take-a-pause.page';

const routes: Routes = [
  {
    path: '',
    component: TakeAPausePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeAPausePageRoutingModule {}
