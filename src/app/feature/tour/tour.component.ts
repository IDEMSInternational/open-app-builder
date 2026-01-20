import { Component } from "@angular/core";
import { TourService } from "./tour.service";

@Component({
  template: ` <ion-content class="ion-padding">
    <h3>Start a tour</h3>
    <ion-list>
      @for (tour of tourService.toursList; track tour) {
        <ion-item (click)="tourService.startTour(tour.flow_name)">
          {{ tour.flow_name }}
        </ion-item>
      }
    </ion-list>
  </ion-content>`,
  standalone: false,
})
export class TourComponent {
  constructor(public tourService: TourService) {}
}
