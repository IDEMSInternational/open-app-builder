import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import introJs from "intro.js";
import { TOUR } from "../data/data.service";

@Injectable({
  providedIn: "root",
})
export class TourService {
  introJS = introJs();

  waitForRoutingDelay = 1000;

  constructor(private router: Router) {}

  listTourNames(): string[] {
    return TOUR.map((t) => t.flow_name);
  }

  async startTour(tourName = "test_tour") {
    let matchingTour = TOUR.find((t) => t.flow_name === tourName);

    if (matchingTour && matchingTour.rows && matchingTour.rows.length > 0) {
      this.introJS.setOptions({
        steps: matchingTour.rows.map((row) => {
          let elementSelector = row.element;
          if (row.template_component_name && row.template_component_name.trim().length > 0) {
            elementSelector = `[data-rowname="${row.template_component_name}"]`;
          }
          return {
            intro: row.message_text,
            title: row.title,
            element: elementSelector,
            elementSelector: elementSelector,
          } as any;
        }),
        hidePrev: true,
      });
      this.introJS.onbeforechange((elem) => {
        this.introJS.currentStep();
        const stepNumber = this.introJS.currentStep();
        const currentRow = matchingTour.rows[stepNumber];

        /* If route changes then navigate, then after delay, actually change intro.js step */
        if (currentRow.route) {
          const currentPath = this.router.url.replace(/^\//g, "");
          const stepPath = currentRow.route.replace(/^\//g, "");
          if (currentPath !== stepPath) {
            this.router.navigateByUrl(currentRow.route).then(() => {
              setTimeout(() => {
                // Workaround to make sure element highlights work on new route
                this.revaluateIntroElements();
                setTimeout(() => {
                  this.introJS.goToStepNumber(stepNumber + 1);
                }, this.waitForRoutingDelay / 2);
              }, this.waitForRoutingDelay / 2);
            });
            return false;
          }
        }
      });
      this.introJS.onafterchange((elem) => {
        this.introJS.refresh();
        setTimeout(() => {
          this.introJS.refresh();
        }, this.waitForRoutingDelay);
      });
      const startRoute = matchingTour.rows[0].route ? matchingTour.rows[0].route : "/";
      await this.router.navigateByUrl(startRoute);
      setTimeout(() => {
        this.introJS.start();
      }, this.waitForRoutingDelay);
    }
  }

  revaluateIntroElements() {
    // Workaround from here:
    // https://github.com/usablica/intro.js/issues/717#issuecomment-646445169
    this.introJS["_options"].steps.forEach((step, key) => {
      if (step.elementSelector) {
        const el = document.querySelector(step.elementSelector);
        if (el !== null) {
          this.introJS["_introItems"][key].element = el;
        }
        this.introJS["_introItems"][key].position = step.position ? step.position : "bottom";
      }
    });
  }
}
