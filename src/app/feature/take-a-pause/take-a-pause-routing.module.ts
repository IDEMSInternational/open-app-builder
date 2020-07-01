import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakeAPausePage } from './take-a-pause.page';
import { ListeningAnimComponent } from './listening-anim/listening-anim.component';

const routes: Routes = [
  {
    path: '',
    component: TakeAPausePage
  },
  {
    path: 'listening',
    component: ListeningAnimComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeAPausePageRoutingModule {}
