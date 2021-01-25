import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitIdeasPage } from './habit-ideas.page';

const routes: Routes = [
  {
    path: ':flowName',
    component: HabitIdeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitIdeasPageRoutingModule {}
