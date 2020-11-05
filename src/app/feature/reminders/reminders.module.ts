import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonReorder } from '@ionic/angular';

import { RemindersPageRoutingModule } from './reminders-routing.module';

import { RemindersPage } from './reminders.page';

import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { CreateReminderComponent } from './create-reminder/create-reminder.component';

// Note we need a separate function as it's required
// by the AOT compiler.
export function lottiePlayerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemindersPageRoutingModule,
    LottieModule.forRoot({ player: lottiePlayerFactory, useCache: true }),
  ],
  declarations: [RemindersPage, CreateReminderComponent]
})
export class RemindersPageModule {}
