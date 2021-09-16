import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import introJs, { Step as IntroJSStep, Options as IntroJSOptions } from "intro.js";
import { TOUR } from "../data/data.service";
import { TemplateService } from "../../components/template/services/template.service";
import { TemplateTranslateService } from "../../components/template/services/template-translate.service";
import { FlowTypes } from "packages/data-models/dist";
import { _wait } from "../../utils";

@Injectable({
  providedIn: "root",
})
export class TourService {
  tourRows: FlowTypes.TourStep[];
  tourSteps: IntroJSStep[];
  tourName: string;
  tourStarted = false;

  /** Minimum amount of time to wait between route transition before continuing tour */
  routeChangeDelay = 500;

  constructor(
    private router: Router,
    private templateService: TemplateService,
    private translateService: TemplateTranslateService
  ) {}

  listTourNames(): string[] {
    return TOUR.map((t) => t.flow_name);
  }

  /**
   * Start the tour given by the named tour template. Will automatically handle any initial
   * and subsequent navigation events
   * @param tourName flow-name of tour, e.g. `test_tour`
   */
  async startTour(tourName: string, initialStepIndex = 0) {
    this.tourStarted = false;
    let matchingTour = TOUR.find((t) => t.flow_name === tourName);

    if (matchingTour && matchingTour.rows?.length > 0) {
      this.tourRows = matchingTour.rows;
      this.tourSteps = matchingTour.rows.map((row) => this.prepareTourStepRow(row));
      this.tourName = tourName;
      const initialTourRow = this.tourRows[initialStepIndex];

      // handle initial nav and el lookup before tour start
      const requiredRouteChange = this.checkRouteChangeRequired(initialTourRow);
      if (requiredRouteChange) {
        this.router.navigateByUrl(requiredRouteChange);
        await _wait(this.routeChangeDelay);
      }
      const targetElementSelector = this.getTargetStepElementSelector(initialTourRow);
      if (targetElementSelector) {
        await this._waitForElement(targetElementSelector);
      }

      const introJS = introJs();

      introJS.setOptions({
        tooltipClass: "tooltip_visible",
        buttonClass: "introjs-tooltip-button",
        nextLabel: this.translateService.translateValue("Next"),
        prevLabel: this.translateService.translateValue("Previous"),
        steps: this.tourSteps,
      });

      introJS.onbeforechange(() => this.handleBeforeTourStepChange(introJS));

      // for some weird reason stepNumber indexes are 1 more than regular index
      introJS.goToStepNumber(initialStepIndex + 1);
      this.tourStarted = true;
      introJS.start();

      // attach to window for easier logging
      window["tour"] = introJS;
    }
  }

  /**
   * IntroJS has a callback before it starts a tour step.
   * Check if step ready for display (on correct page and target element visible),
   * and if not provide methods to wait. Note - as the callback does not handle async code,
   * include sync methods to hide/show tooltips whilst waiting
   * https://github.com/usablica/intro.js/issues/791
   * https://github.com/usablica/intro.js/pull/1368
   */
  private async handleBeforeTourStepChange(introJS: introJs.IntroJs) {
    // HACK - intro.js calls logic for step 0 before any others, prevent start at another step
    // use tourStarted variable to ignore case
    if (!this.tourStarted) return;

    // currentStep refers to the step about to be rendered
    const stepIndex = introJS.currentStep();
    const tourRow = this.tourRows[stepIndex];

    // handle route changes
    const requiredRouteChange = this.checkRouteChangeRequired(tourRow);
    if (requiredRouteChange) {
      this.tourStarted = false;
      // HACK - tours don't handle page transition very well so end this tour
      // and start a new one from the navigated page. Use various timeouts
      // to ensure other callbacks have had a chance to fire before destruction
      await _wait(200);
      introJS.exit();
      await _wait(200);
      return this.startTour(this.tourName, stepIndex);
    }

    // handle target element
    // NOTE - Not currently triggered as row already processed, but could be used
    // in future if suport for async callback added, manually implemented or refresh triggered
    const targetElementSelector = this.getTargetStepElementSelector(tourRow);
    if (targetElementSelector) {
      const foundTargetElement = await this._waitForElement(targetElementSelector);
      if (foundTargetElement && introJS["_introItems"][stepIndex]) {
        if (!foundTargetElement.classList.contains("introjs-showElement")) {
          console.warn("force introjs to select different element", foundTargetElement);
          introJS["_introItems"][stepIndex].element = foundTargetElement;
          const tooltipPosition = this.calcTooltipPosition(foundTargetElement);
          introJS["_introItems"][stepIndex].position = tooltipPosition;
          introJS.goToStep(stepIndex + 1);
        }
      }
    }

    // ensure tooltip back as visible
    introJS.setOptions({ tooltipClass: "tooltip_visible" });
  }

  /**
   * Lookup the tour step pending activation and check whether additional actions will need
   * to be taken to require a route change or wait for target element to be available
   * @returns summary of actions required (requiredRouteChange and requiredElWait)
   */
  private checkRouteChangeRequired(tourRow: FlowTypes.TourStep) {
    // compare routes without an starting ('/') as these are usually not included in sheet but are in router
    // if changing route can assume will also need to wait for el
    const currentRoute = this.router.url.replace(/^\//g, "");
    const nextRoute = tourRow.route?.replace(/^\//g, "");
    if (nextRoute && currentRoute !== nextRoute) {
      return nextRoute;
    }
  }

  /**
   * Determine whether the tooltip should be placed above or below a component
   * based on measurement of the available viewport and target element
   * Will place below if element in top half of the screen and above if element in bottom half
   */
  private calcTooltipPosition(el: Element) {
    const { top, bottom } = el.getBoundingClientRect();
    const elMidpointY = (top + bottom) / 2;
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewMidpointY = viewHeight / 2;
    const position: IntroJSOptions["tooltipPosition"] =
      elMidpointY < viewMidpointY ? "bottom" : "top";
    return position;
  }

  /** Convert TourStep row into intro-js compatible step */
  private prepareTourStepRow(row: FlowTypes.TourStep) {
    const elementSelector = this.getTargetStepElementSelector(row);
    // HACK - Ensure tour rows translated
    const translatedRow: FlowTypes.TourStep = this.translateService.translateRow(row as any) as any;
    let stepTitle = this.hackReplaceGlobalInRowMessage(translatedRow.title);
    let stepContent = this.hackReplaceGlobalInRowMessage(translatedRow.message_text);

    // if using a template for the step content load using the custom template-container web-component
    if (translatedRow.message_template) {
      stepContent = `
          <web-template-container templatename=${translatedRow.message_template}></web-template-container>
        `;
    }
    const step: IntroJSStep = {
      intro: stepContent,
      title: stepTitle,
      element: elementSelector,
      position: "auto",
    };
    return step;
  }

  /** assign selector that will be used to select element ahead of render */
  private getTargetStepElementSelector(row: FlowTypes.TourStep) {
    const { template_component_name, element } = row;
    let elementSelector: string;
    if (template_component_name) {
      elementSelector = `[data-rowname="${template_component_name}"]`;
    }
    if (element) {
      elementSelector = element;
    }
    return elementSelector;
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
        field = field.replace(i, this.templateService.getGlobal(name[1]));
      }
    }
    if (imageTags) {
      for (let i of imageTags) {
        const imgSrcExp = new RegExp(/src=".*?"/g);
        const src = i.match(imgSrcExp);
        const finallySrc = i.replace(
          src,
          `src="/assets/plh_assets/${src[0]
            .split("=")[1]
            .split("")
            .filter((v) => v !== '"')
            .join("")
            .replace("//", "/")}"`
        );
        field = field.replace(i, finallySrc);
      }
    }
    return field;
  }

  /**
   * Wait for a given element selector to exist in the DOM. If not found will retry after
   * a given amount of time, with a maximum timeout before returning null
   *
   * @param selector element query selector, e.g. `#someId` or `data-attr=['some_attr']`
   * @param timeout amount of time (ms) to spend waiting to find element
   * @param retryTime amount of time (ms) to wait between attempts to search for element
   * @returns element if found, null if not
   */
  private async _waitForElement(
    selector: string,
    timeout = 3000,
    retryTime = 200
  ): Promise<HTMLElement> {
    const matchingElements = document.querySelectorAll<HTMLElement>(selector);

    if (matchingElements.length > 0) {
      let matchingEl = matchingElements[0];
      // if duplicate elements found in dom, attempt to resolve to visible via offsetParent property
      // https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
      if (matchingElements.length > 1) {
        matchingElements.forEach((el) => {
          if (el.offsetParent) {
            matchingEl = el;
          }
        });
        console.warn("Multiple tour elemements resolved", { matchingElements, matchingEl });
      }
      return new Promise((resolve) => {
        // element found but request animation frame so that element has chance to finish rendering
        window.requestAnimationFrame(() => {
          resolve(matchingEl);
        });
      });
    } else {
      if (timeout > 0) {
        console.warn(`Cannot find element, retry in ${retryTime}`, selector);
        await _wait(retryTime);
        return this._waitForElement(selector, timeout - retryTime, retryTime);
      } else {
        console.warn("Element never found", selector);
      }
      return null;
    }
  }
}
