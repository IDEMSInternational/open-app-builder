import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReminderCrudPageRoutingModule } from './reminder-crud-routing.module';

import { ReminderCrudPage } from './reminder-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReminderCrudPageRoutingModule
  ],
  declarations: [ReminderCrudPage]
})
export class ReminderCrudPageModule {}
