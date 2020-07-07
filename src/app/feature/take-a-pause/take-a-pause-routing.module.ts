import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakeAPausePage } from './take-a-pause.page';
import { StressedAnimComponent } from './stressed-anim/stressed-anim.component';

const routes: Routes = [
  {
    path: '',
    component: TakeAPausePage
  },
  {
    path: 'stressed',
    component: StressedAnimComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeAPausePageRoutingModule {}
