import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FlowTypes } from "scripts/types";
import { HABIT_LIST } from "src/app/shared/services/data/data.service";
import { TaskActionService } from "src/app/shared/services/task/task-action.service";
import { TaskService } from "src/app/shared/services/task/task.service";
import { generateTimestamp } from "src/app/shared/utils";

@Component({
  selector: "plh-habit-add",
  template: ` <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button (click)="modalCtrl.dismiss()"
            ><ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon
          ></ion-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding background-primary-lighter">
      <h3>What have you done today?</h3>
      <div class="habit-cards-container">
        <div
          *ngFor="let habit of habits; index as i"
          class="habit-card"
          (click)="selectHabit(habit)"
          [class.complete]="habit._complete"
        >
          <div class="habit-image-container">
            <img class="habit-image" [src]="habit.main_image_asset" />
          </div>
          <div class="habit-title">{{ habit.title }}</div>
        </div>
      </div>
    </ion-content>`,
  styles: [
    `
      h3 {
        color: var(--ion-color-primary);
      }
      .habit-cards-container {
        display: flex;
        flex-wrap: wrap;
      }
      .habit-image-container {
        flex: 1;
        overflow: hidden;
        text-align: center;
      }
      .habit-image {
        height: 100%;
      }
      .habit-title {
        color: var(--ion-color-primary);
        font-weight: bold;
        font-size: small;
        text-align: center;
      }
      .habit-card {
        background: rgba(0, 0, 0, 0.15);
        opacity: 0.9;
        border-radius: 20px;
        padding: 5px 10px;
        height: 110px;
        width: 110px;
        margin: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: background-color 0.5s ease;
      }
      .habit-card.complete {
        background: white;
        opacity: 1;
        transition: ;
      }
      .habit-history-button {
        margin-top: 2em;
      }
    `,
  ],
})
export class HabitAddComponent implements OnInit {
  habits = HABIT_LIST[0].rows;
  constructor(
    public modalCtrl: ModalController,
    private taskService: TaskService,
    private taskActionService: TaskActionService
  ) {}

  async ngOnInit() {
    await this.evaluateCompletedHabits();
  }

  async selectHabit(habit: FlowTypes.Habit_listRow) {
    const { task_id, id, _complete } = habit;
    if (!_complete) {
      // TODO - ideally habit tasks will be refactor to start flow from service and automate completion tracking,
      // (uncomment line below to enable) but for nowlog task completion manually

      // this.taskService.startTask(task_id);
      await this.taskActionService.recordTaskAction({
        task_id,
        type: "completed",
        meta: { habit_id: id },
      });
      // TODO - add more efficient bindings for evaluating tasks
      await this.evaluateCompletedHabits();
    }
  }

  /**
   * Check what habits have been marked as completed in the current calendar day
   * and marke as completed in the list
   */
  private async evaluateCompletedHabits() {
    const timestamp = generateTimestamp();
    const todayString = timestamp.substring(0, 12);
    const completedTasks = await this.taskActionService.table
      .where("_created")
      .startsWith(todayString)
      .toArray();
    const uniqueTaskIds = [...new Set(completedTasks.map((t) => t.task_id))];
    this.habits = this.habits.map((h) => ({ ...h, _complete: uniqueTaskIds.includes(h.task_id) }));
  }
}
