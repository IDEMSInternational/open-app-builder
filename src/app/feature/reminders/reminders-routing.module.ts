import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemindersPage } from './reminders.page';

const routes: Routes = [
  {
    path: '',
    component: RemindersPage
  },
  {
    path: 'reminder-crud',
    loadChildren: () => import('./reminder-crud/reminder-crud.module').then( m => m.ReminderCrudPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemindersPageRoutingModule {}
