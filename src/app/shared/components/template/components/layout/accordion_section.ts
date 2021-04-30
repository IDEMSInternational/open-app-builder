import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-accordion-section",
  template: `<div class="accordion-wrapper">
    <div
      [ngClass]="{
        completed: completed && !_row.disabled,
        disabled: _row.disabled,
        inProgress: !completed && !_row.disabled && percentComplete > 0,
        notStarted: !completed && !_row.disabled && percentComplete == 0
      }"
      class="accordion-status"
    >
      <img
        *ngIf="completed && !_row.disabled"
        class="tick-icon"
        src="/assets/icon/accordion/tick_light.svg"
      />
      <img *ngIf="_row.disabled" src="/assets/plh_assets/plh_images/icons/lock.svg" />
      <img
        *ngIf="!completed && !_row.disabled && percentComplete == 0"
        src="/assets/plh_assets/plh_images/icons/unlock.svg"
      />
    </div>
    <div
      class="accordion-section"
      [ngClass]="{
        openSection: _row.parameter_list.state === 'open',
        disabled: _row.disabled,
        completed: completed,
        inProgress: !completed && !_row.disabled
      }"
    >
      <div class="progress" [ngStyle]="{ width: percentComplete + '%' }"></div>
      <h2 (click)="toggleOpen()">{{ title }}</h2>
      <plh-template-component
        style="z-index: 2"
        *ngFor="let childRow of _row.rows"
        [row]="childRow"
        [parent]="parent"
      >
      </plh-template-component>
    </div>
  </div>`,
  styleUrls: ["./accordion.scss", "../tmpl-components-common.scss"],
})
export class AccordionSectionComponent extends TemplateBaseComponent implements OnInit {
  public completed: boolean;
  public percentComplete: number;
  public title: string;

  @Input() id: string;
  @Output() toggleState = new EventEmitter<string>();

  ngOnInit() {
    this.getParams();
  }

  public toggleOpen() {
    console.log("ROW??", this._row);
    if (!this._row.disabled) {
      this.toggleState.emit(this.id);
    }
  }

  private getParams() {
    this.completed = getStringParamFromTemplateRow(this._row, "completed", "false") === "true";
    this.title = getStringParamFromTemplateRow(this._row, "title", null);
    this.percentComplete = this._row.value ? this._row.value : 0;
    this.updateStatus(this.percentComplete);
  }

  private updateStatus(value: number) {
    if (value == 100) {
      this.completed = true;
    } else if (value > 0) {
      this.completed = false;
    }
  }
}
