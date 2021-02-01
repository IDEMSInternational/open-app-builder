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

    if (matchingTour) {
      this.introJS.setOptions({
        steps: matchingTour.rows.map((row) => ({
          intro: row.message_text,
          title: row.title,
          element: row.element,
          onbeforechange: () => {
            this.router.navigateByUrl(row.route);
          }
        }))
      });
      this.introJS.onbeforechange
      await this.router.navigateByUrl("/module_list");
      this.introJS.start();
    }
  }
}
