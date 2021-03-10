import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";


@Component({
  selector: 'plh-slider-new',
  templateUrl: './slider-new.component.html',
  styleUrls: ['./slider-new.component.scss'],
})
export class SliderNewComponent extends TemplateBaseComponent implements ITemplateRowProps, OnInit {

  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string };

  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;

  sliderRange;
  constructor() {
    super(); 
  }
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
