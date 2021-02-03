import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TourService } from "src/app/shared/services/tour/tour.service";

@Component({
    template: '<h1>Starting tour</h1>'
})
export class TourComponent {

    constructor(private tourService: TourService, private activatedRoute: ActivatedRoute) {
        const tourName = activatedRoute.snapshot.params["tourName"];
        this.tourService.startTour(tourName);
    }

}