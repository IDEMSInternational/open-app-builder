import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import introJs from 'intro.js';
import { TOUR } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  introJS = introJs();

  constructor(private router: Router) {

  }

  async startTour(tourName = "test_tour") {
    let matchingTour = TOUR.find((t) => t.flow_name === tourName);

    if (matchingTour && matchingTour.rows && matchingTour.rows.length > 0) {
      this.introJS.setOptions({
        steps: matchingTour.rows.map((row) => ({
          intro: row.message_text,
          title: row.title,
          element: row.element,
        })),
        hidePrev: true
      });
      this.introJS.onafterchange(() => {
        setTimeout(() => this.introJS.refresh(), 500);
      });
      this.introJS.onbeforechange((elem) => {
        this.introJS.currentStep();
        const stepNumber = this.introJS.currentStep()
        const currentRow = matchingTour.rows[stepNumber];
        if (currentRow.route) {
          this.router.navigateByUrl(currentRow.route);
        }
      });
      const startRoute = matchingTour.rows[0].route ? matchingTour.rows[0].route : "module_list";
      await this.router.navigateByUrl(startRoute);
      this.introJS.start();
    }
  }
}
