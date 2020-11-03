import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateReminderComponent } from './create-reminder/create-reminder.component';

import { RemindersPage } from './reminders.page';

const routes: Routes = [
  {
    path: '',
    component: RemindersPage
  },
  {
    path: 'create',
    component: CreateReminderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemindersPageRoutingModule {}
