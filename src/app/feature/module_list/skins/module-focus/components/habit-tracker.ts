import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
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
export class HabitTrackerComponent {
  constructor(private modalCtrl: ModalController) {}
  async addHabit() {
    const modal = await this.modalCtrl.create({
      component: HabitAddComponent,
      backdropDismiss: false,
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    console.log("habit dismissed");
  }
}
