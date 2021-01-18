import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AnimModalComponent } from "./anim-modal/anim-modal.component";
import { TasksService } from "../services/tasks.service";

@Component({
  selector: "plh-goals",
  templateUrl: "./goals.page.html",
  styleUrls: ["./goals.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GoalsPage implements OnInit {
  dataLoaded = false;
  constructor(private modalController: ModalController, public tasksService: TasksService) {}

  ngOnInit() {
    this.openRewardModal("neighbour-jumping")
  }

  trackById(index: number, item: { id: string; [key: string]: any }) {
    return item.id;
  }

  async openRewardModal(id: string) {
    const modal = await this.modalController.create({
      cssClass: "anim-slide-up-modal",
      component: AnimModalComponent,
      componentProps: {
        id,
        title: "Congratulations!",
        autoCloseMs: 30000,
      },
    });
    modal.present();
  }
}

/*
  <ion-button (click)="openRewardModal('trophy')">Open Reward Modal (Trophy)</ion-button>
  <ion-button (click)="openRewardModal('fireworks')">Open Reward Modal (Fireworks)</ion-button>
  <ion-button (click)="openRewardModal('waving')">Open Reward Modal (Waving Blob)</ion-button>
*/
