import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LottieModule } from "ngx-lottie";
import { ChartsModule } from "ng2-charts";

import { GoalsPageRoutingModule } from "./goals-routing.module";
import { SharedPipesModule } from "src/app/shared/pipes";
import { GoalsPage } from "./components/goals.page";
import { TaskReminderItemComponent } from "./components/task-reminder-item/task-reminder-item.component";
import { AnimModalComponent } from "./components/anim-modal/anim-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GoalsPageRoutingModule,
    LottieModule,
    ChartsModule,
    SharedPipesModule,
  ],
  declarations: [GoalsPage, TaskReminderItemComponent, AnimModalComponent],
  exports: [TaskReminderItemComponent]
})
export class GoalsPageModule {}
