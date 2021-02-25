import { Component, Input, OnInit } from '@angular/core';
import { FlowTypes } from '../../../../model';
import { ITemplateComponent } from '../tmpl.component';

@Component({
  selector: 'plh-tmpl-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements ITemplateComponent, OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string};

  constructor() {}

  ngOnInit() {}
}
