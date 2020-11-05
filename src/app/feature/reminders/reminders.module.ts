import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RemindersPageRoutingModule } from "./reminders-routing.module";

import { RemindersPage } from "./components/reminders.page";

import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { EditReminderComponent } from "./components/edit-reminder/edit-reminder.component";
import { SharedPipesModule } from "src/app/shared/pipes";

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
    SharedPipesModule,
  ],
  declarations: [RemindersPage, EditReminderComponent],
})
export class RemindersPageModule {}
