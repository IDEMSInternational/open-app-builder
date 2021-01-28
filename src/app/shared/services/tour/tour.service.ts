import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'scripts/node_modules/rxjs';

export interface TourStep {
  route?: string;
  selector?: string;
  instructions?: string;
  preStepClick?: {
    selector: string;
    continueDelay: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TourService {

  public tourShowing = false;
  public currentStep$ = new BehaviorSubject(null);
  steps: TourStep[];
  currentStepIndex = 0;

  constructor(private router: Router) { }

  setSteps(steps: TourStep[]) {
    this.steps = steps;
  }

  start() {
    this.goToStep(this.steps[0]);
  }

  getCurrentStepIndex(): number {
    return this.currentStepIndex;
  }

  getNumberOfSteps(): number {
    return this.steps.length;
  }

  next() {
    this.currentStepIndex++;
    if (this.currentStepIndex >= this.steps.length) {
      this.finishTour();
    } else {
      this.goToStep(this.steps[this.currentStepIndex]);
    }
  }

  previous() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.goToStep(this.steps[this.currentStepIndex]);
    }
  }

  wait(delay = 3000) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  async goToStep(step: TourStep) {
    this.currentStep$.next(step);
    if (step.route && step.route !== this.router.url) {
      await this.router.navigateByUrl(step.route);
    }
    await this.wait(200);
    if (step.preStepClick) {
      const clickElem: HTMLElement = document.querySelector(step.preStepClick.selector);
      clickElem.click();
      await this.wait(step.preStepClick.continueDelay);
    }
    if (step.selector) {
      const elem: HTMLElement = document.querySelector(step.selector);
      if (elem) {
        this.tourShowing = true;
        document.getElementById("tourControlsCard").style.display = "block";
        const overlayElement = document.getElementById("tourOverlay");
        overlayElement.style.display = "block";
        overlayElement.style.opacity = "1";
        const padding = 20;
        overlayElement.style.padding = padding + "px";
        const elemRect = elem.getBoundingClientRect();
        overlayElement.style.left = (elemRect.left - padding / 2) + "px";
        overlayElement.style.top = (elemRect.top - padding / 2) + "px";
        overlayElement.style.width = elemRect.width + "px";
        overlayElement.style.height = elemRect.height + "px";
      }
    }
  }

  finishTour() {
    this.tourShowing = false;
    document.getElementById("tourControlsCard").style.display = "none";
    const overlayElement = document.getElementById("tourOverlay");
    overlayElement.style.opacity = "0";
    setTimeout(() => {
      overlayElement.style.display = "none";
    }, 1000);
    this.currentStep$.next(null);
  }
}
