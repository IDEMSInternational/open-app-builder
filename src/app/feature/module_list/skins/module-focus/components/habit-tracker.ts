import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FlowTypes } from "scripts/types";
import { HABIT_LIST } from "src/app/shared/services/data/data.service";
import { TaskActionService } from "src/app/shared/services/task/task-action.service";
import { arrayToHashmap } from "src/app/shared/utils";
import { HabitAddComponent } from "./habit-add";

@Component({
  selector: "plh-habit-tracker",
  template: `
    <div class="main-container">
      <div class="small-title">Habit Tracker</div>
      <div class="habit-list">
        <ion-button class="add-button" fill="outline" (click)="addHabit()">
          <ion-icon slot="icon-only" name="add"></ion-icon>
        </ion-button>
        <div class="habit-history-container">
          <div *ngFor="let habit of habitHistory" class="habit-history-item">
            <img class="habit-history-icon" [src]="habit.icon_asset" />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .small-title {
        color: var(--ion-color-primary);
        font-weight: bold;
        font-size: small;
      }
      .main-container {
        background: white;
        width: 100%;
        padding: 10px;
      }
      .habit-list {
        display: flex;
        align-items: center;
        overflow: auto;
      }
      .habit-history-container {
        flex: 1;
        overflow: auto;
        overflow-y: hidden;
        white-space: nowrap;
      }
      .habit-history-item {
        margin-left: 5px;
        width: 50px;
        height: 50px;
        display: inline-block;
      }
      .habit-history-icon {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      ion-button {
        --button-size: 40px;
        height: var(--button-size);
        width: var(--button-size);
        font-size: calc(var(--button-size) / 2);
        --border-radius: calc(var(--button-size) / 2);
        --padding-start: 0;
        --padding-end: 0;
      }
      ion-button.add-button {
        --border-style: dotted;
        font-size: calc(var(--button-size) / 4);
      }
    `,
  ],
})
export class HabitTrackerComponent implements OnInit {
  habitHistory: (FlowTypes.Habit_listRow & { _created: string })[] = [];
  constructor(private modalCtrl: ModalController, private taskActionService: TaskActionService) {}

  async ngOnInit() {
    await this.loadHabitHistory();
  }
  /** Load a modal to view the habit add modal. On close refresh data */
  async addHabit() {
    const modal = await this.modalCtrl.create({
      component: HabitAddComponent,
      backdropDismiss: false,
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    await this.loadHabitHistory();
  }

  /**
   * Look up all completed tasks and find those which correspond to the task
   * launched from a habit. Return as an array of habit instances
   */
  private async loadHabitHistory() {
    const history = [];
    const habitListByTaskID = arrayToHashmap(HABIT_LIST[0].rows, "task_id");
    const completedTasks = await this.taskActionService.table
      .orderBy("_created")
      .reverse()
      .toArray();
    completedTasks.forEach((t) => {
      if (t._completed && habitListByTaskID.hasOwnProperty(t.task_id)) {
        history.push({ ...habitListByTaskID[t.task_id], _created: t._created });
      }
    });
    this.habitHistory = history;
  }
}
