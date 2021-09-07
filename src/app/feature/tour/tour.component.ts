import { Component } from "@angular/core";
import { TourService } from "src/app/shared/services/tour/tour.service";

@Component({
  template: ` <ion-content class="ion-padding">
    <h3>Start a tour</h3>
    <ion-list>
      <ion-item *ngFor="let tourName of tourNames" (click)="startTour(tourName)">
        {{ tourName }}
      </ion-item>
    </ion-list>
  </ion-content>`,
})
export class TourComponent {
  tourNames: string[] = [];

  constructor(private tourService: TourService) {
    this.tourNames = this.tourService.listTourNames();
  }

  public startTour(tourName: string): void {
    this.tourService.startTour(tourName);
  }
}
