import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import introJs from "intro.js";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { FlowTypes } from "data-models";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";

@Injectable({
  providedIn: "root",
})
export class TourService {
  introJS = introJs();

  waitForRoutingDelay = 1000;
  public toursList: FlowTypes.FlowTypeBase[] = [];

  constructor(
    private router: Router,
    private templateFieldService: TemplateFieldService,
    private translateService: TemplateTranslateService,
    private appDataService: AppDataService
  ) {}
  async init() {
    this.toursList = this.appDataService.listSheetsByType("tour");
  }

  /**
   * Start the tour given by the named tour template. Will automatically handle any initial
   * and subsequent navigation events
   * @param tourName flow-name of tour, e.g. `test_tour`
   */
  async startTour(tourName: string) {
    let matchingTour = await this.appDataService.getSheet<FlowTypes.Tour>("tour", tourName);
    if (matchingTour && matchingTour.rows && matchingTour.rows.length > 0) {
      this.introJS.setOptions({
        tooltipClass: "tooltipClass",
        buttonClass: "buttonClass",
        nextLabel: this.translateService.translateValue("Next"),
        prevLabel: this.translateService.translateValue("Previous"),
        doneLabel: this.translateService.translateValue("Done"),
        steps: matchingTour.rows.map((row) => {
          // HACK - Ensure tour rows translated
          const translatedRow: FlowTypes.TourStep = this.translateService.translateRow(
            row as any
          ) as any;
          let elementSelector = translatedRow.element;
          if (
            translatedRow.template_component_name &&
            translatedRow.template_component_name.trim().length > 0
          ) {
            elementSelector = `[data-rowname="${translatedRow.template_component_name}"]`;
          }
          let stepTitle = this.hackReplaceGlobalInRowMessage(translatedRow.title);
          let stepContent = this.hackReplaceGlobalInRowMessage(translatedRow.message_text);
          // if using a template for the step content load using the custom template-container web-component
          if (translatedRow.message_template) {
            stepContent = `
              <web-template-container templatename=${translatedRow.message_template}></web-template-container>
            `;
          }
          return {
            intro: stepContent,
            title: stepTitle,
            element: elementSelector,
            elementSelector,
          };
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
  /**
   * Legacy hardcoded method to replace tour data manually
   * TODO - should be integrated with existing template parsing methods
   */
  hackReplaceGlobalInRowMessage(field: any) {
    const regExs = new RegExp(/([@]+[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    const globalVariables = field ? field.match(regExs) : field;
    const regExpImg = new RegExp(/<img .*?>/g);
    const imageTags = field ? field.match(regExpImg) : null;
    if (globalVariables) {
      for (let i of globalVariables) {
        const name = i.split(".");
        field = field.replace(i, this.templateFieldService.getGlobal(name[1]));
      }
    }
    if (imageTags) {
      console.error("Tour images not currently supported", imageTags);
      // TODO - use templateAssetService to convert (not currently implemented)
      // console.log('imageTags')
      // for (let i of imageTags) {
      //   const imgSrcExp = new RegExp(/src=".*?"/g);
      //   const src = i.match(imgSrcExp);
      //   const finallySrc = i.replace(
      //     src,
      //     `src="${src[0]
      //       .split("=")[1]
      //       .split("")
      //       .filter((v) => v !== '"')
      //       .join("")
      //       .replace("//", "/")}"`
      //   );
      //   field = field.replace(i, finallySrc);
      // }
    }
    return field;
  }
}
