import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { ChartsModule } from "ng2-charts";

import { RemindersPageRoutingModule } from "./reminders-routing.module";
import { RemindersPage } from "./components/reminders.page";
import { EditReminderComponent } from "./components/edit-reminder/edit-reminder.component";
import { SharedPipesModule } from "src/app/shared/pipes";
import { MyGoalsComponent } from "./components/my-goals/my-goals.component";

// Note we need a separate function as it's required
// by the AOT compiler.
export function lottiePlayerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RemindersPageRoutingModule,
    LottieModule.forRoot({ player: lottiePlayerFactory, useCache: true }),
    ChartsModule,
    SharedPipesModule,
  ],
  declarations: [RemindersPage, EditReminderComponent, MyGoalsComponent],
})
export class RemindersPageModule {}
