import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReminderCrudPage } from './reminder-crud.page';

const routes: Routes = [
  {
    path: '',
    component: ReminderCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReminderCrudPageRoutingModule {}
