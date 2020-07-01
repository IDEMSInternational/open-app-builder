import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakeAPausePage } from './take-a-pause.page';
import { PauseThinkComponent } from './pause-think/pause-think.component';

const routes: Routes = [
  {
    path: '',
    component: TakeAPausePage
  },
  {
    path: 'thinking',
    component: PauseThinkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeAPausePageRoutingModule {}
