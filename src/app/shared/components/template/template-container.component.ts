import { ChangeDetectorRef, Component, Input, NgZone, SimpleChanges } from '@angular/core';
import { FlowTypes } from '../../model';

@Component({
  selector: 'plh-template-container',
  templateUrl: './template-container.component.html',
  styleUrls: ['./template-container.component.scss'],
})
export class TemplateContainerComponent {

  _template: FlowTypes.Template;
  @Input() set template(value: FlowTypes.Template) {
    value._setLocalVariable = (name, value) => {
      this.localVariables = { ...this.localVariables, [name]: value };
    };
    this._template = value;
  };
  localVariables: { [name: string]: string } = {};

  constructor(private cdRef: ChangeDetectorRef, private zone: NgZone) { }

  public keys(obj: any) {
    if (obj) {
      return Object.keys(obj);
    }
    return [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Container on changes ", changes);
  }

  ngAfterViewChecked() {
    this.zone.runOutsideAngular(() => {
      console.log("ngAfterViewChecked on template container");
    });
  }

}

