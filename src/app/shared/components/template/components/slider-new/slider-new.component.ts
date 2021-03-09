import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ITemplateComponent } from "../tmpl.component";
import { FlowTypes } from "../../../../model";


@Component({
  selector: 'plh-slider-new',
  templateUrl: './slider-new.component.html',
  styleUrls: ['./slider-new.component.scss'],
})
export class SliderNewComponent implements ITemplateComponent, OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string };

  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;

  sliderRange;
  constructor() { }
  someKeyboardConfig: any = {
    behaviour: 'drag',
    connect: true,
    start: [0],
    tooltips: true,
    step: 1,
    pageSteps: 6,  // number of page steps, defaults to 10
    range: {
      min: 0,
      max: 51
    },
    pips: {
      mode: 'count',
      density: 1,
      values: 8,
      stepped: true,
    }
  };
  ngOnInit() {

  }

  start() {
    console.log(this.slider)
  }
}
