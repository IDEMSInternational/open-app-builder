import { Component, OnInit } from '@angular/core';
import { TourService, TourStep } from '../../services/tour/tour.service';

@Component({
  selector: 'plh-tour-overlay',
  templateUrl: './tour-overlay.component.html',
  styleUrls: ['./tour-overlay.component.scss'],
})
export class TourOverlayComponent implements OnInit {

  currentStep: TourStep;

  constructor(public tourService: TourService) {
    this.tourService.currentStep$.subscribe((step) => {
      this.currentStep = step;
    });
  }

  ngOnInit() {}

}
