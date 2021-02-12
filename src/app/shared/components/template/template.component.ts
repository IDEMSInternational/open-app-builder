import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'scripts/node_modules/rxjs';
import { FlowTypes } from '../../model';
import { TEMPLATE } from '../../services/data/data.service';

@Component({
  selector: 'plh-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent {

  _template: FlowTypes.Template;
  @Input() set template(value: FlowTypes.Template) {
    value._setLocalVariable = (name, value) => {
      this.localVariables = { ...this.localVariables, [name]: value };
    };
    this._template = value;
  };
  localVariables: { [name: string]: string } = {};

  constructor(private cdRef: ChangeDetectorRef) { }

  public keys(obj: any) {
    if (obj) {
      return Object.keys(obj);
    }
    return [];
  }

}

