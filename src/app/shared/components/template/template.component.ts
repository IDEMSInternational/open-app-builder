import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlowTypes } from '../../model';
import { TEMPLATE } from '../../services/data/data.service';

@Component({
  selector: 'plh-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnChanges {

  @Input() template: FlowTypes.Template;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.template) {
      this.onTemplateChange();
    }
  }

  private onTemplateChange() {
    console.log("Template input is ", this.template);
    // this.initializeLocalVariables();
  }

  private initializeLocalVariables() {
    if (!this.template._local_variables) {
      this.template._local_variables = {};
    }
    if (this.template.rows) {
      for (let row of this.template.rows) {
        if (row.name && row.type === "set_variable") {
          this.template._local_variables[row.name] = row.value;
        }
      }
    }
  }

  /* private doRequiredExtension() {
    if (this.template.rows.find((r) => r.type === "template_group")) {
      const newRows = [];
      for (let oldRow of this.template.rows) {
        if (oldRow.type === "template_group") {
          const superTemplate = TEMPLATE.find((t) => t.flow_name === oldRow.name);
          if (superTemplate) {
            const overrideRowMap: Record<string, FlowTypes.TemplateRow> = {};
            for (let row of oldRow.rows) {
              overrideRowMap[row.name] = row;
            }
            superTemplate.rows.forEach((row) => {
              if (overrideRowMap[row.name]) {
                for (let prop of Object.keys(overrideRowMap[row.name])) {
                  row[prop] = overrideRowMap[row.name][prop];
                }
              }
              newRows.push(row);
            });
          }
        } else {
          newRows.push(oldRow);
        }
      }
      this.template.rows = newRows;
      console.log("Extension and our new rows are ", this.template.rows);
    }
  } */

  public keys(obj: any) {
    if (obj) {
      return Object.keys(obj);
    }
    return [];
  }

}

