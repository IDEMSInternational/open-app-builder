import { Component } from "@angular/core";
import { TourService } from "./tour.service";

@Component({
  template: ` <ion-content class="ion-padding">
    <h3>Start a tour</h3>
    <ion-list>
      <ion-item
        *ngFor="let tour of tourService.toursList"
        (click)="tourService.startTour(tour.flow_name)"
      >
        {{ tour.flow_name }}
      </ion-item>
    </ion-list>
  </ion-content>`,
})
export class TourComponent {
  constructor(public tourService: TourService) {}
}
