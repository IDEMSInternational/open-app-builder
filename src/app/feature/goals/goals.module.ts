import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { ChartsModule } from "ng2-charts";

import { GoalsPageRoutingModule } from "./goals-routing.module";
import { SharedPipesModule } from "src/app/shared/pipes";
import { MyGoalsComponent } from "./components/my-goals/my-goals.component";
import { GoalsPage } from "./components/goals.page";
import { TaskReminderItemComponent } from "./components/task-reminder-item/task-reminder-item.component";
import { AnimModalComponent } from './components/anim-modal/anim-modal.component';

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
    GoalsPageRoutingModule,
    LottieModule.forRoot({ player: lottiePlayerFactory, useCache: true }),
    ChartsModule,
    SharedPipesModule,
  ],
  declarations: [MyGoalsComponent, GoalsPage, TaskReminderItemComponent, AnimModalComponent],
})
export class GoalsPageModule {}
