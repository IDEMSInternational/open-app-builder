import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TourService } from "src/app/shared/services/tour/tour.service";

@Component({
  template: ` <ion-content class="ion-padding">
    <h3>Start a tour</h3>
    <ion-list>
      <ion-item *ngFor="let tourName of tourNames" [routerLink]="[tourName]">
        {{ tourName }}
      </ion-item>
    </ion-list>
  </ion-content>`,
})
export class TourComponent {
  tourNames: string[] = [];

  constructor(private tourService: TourService, private activatedRoute: ActivatedRoute) {
    this.tourNames = this.tourService.listTourNames();
    const tourName = activatedRoute.snapshot.params["tourName"];
    if (tourName) {
      this.tourService.startTour(tourName);
    }
  }
}
