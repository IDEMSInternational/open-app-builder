import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { HABIT_LIST } from "src/app/shared/services/data/data.service";

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
    <ion-content color="primary">
      <div class="main-container-overlay ion-padding">
        <div class="habit-cards-container">
          <div
            *ngFor="let habit of habits; index as i"
            class="habit-card"
            (click)="toggleHabit(i)"
            [class.complete]="habit._complete"
          >
            <img class="habit-image" [src]="habit.main_image" />
            <div class="habit-title">{{ habit.title }}</div>
          </div>
        </div>
      </div>
    </ion-content>`,
  styles: [
    `
      /* copied css, should probably be moved somewhere else  */
      .main-container-overlay {
        background: rgba(255, 255, 255, 0.85);
        height: 100%;
      }
      .habit-cards-container {
        display: flex;
        flex-wrap: wrap;
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
        padding: 10px;
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
    `,
  ],
})
export class HabitAddComponent {
  habits = HABIT_LIST[0].rows;
  constructor(public modalCtrl: ModalController) {
    console.log("habit", this.habits);
  }

  toggleHabit(index: number) {
    this.habits[index]._complete = this.habits[index]._complete ? false : true;
  }
}
