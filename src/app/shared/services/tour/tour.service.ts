import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import introJs from 'intro.js';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  introJS = introJs();

  constructor(private router: Router) {
    this.introJS.setOptions({
      steps: [
        {
          intro: "Intro text",
          title: "Title"
        },
        {
          intro: "Text",
          element: "#main-content > plh-module-list > div > div > plh-module-focus-skin > div > div > div > ion-button"
        },
        {
          intro: "More text"
        }
      ] as any
    });
  }

  async startTour() {

    await this.router.navigateByUrl("/module_list");
    setTimeout(() => {
      this.introJS.start();
    }, 500);
  }
}
