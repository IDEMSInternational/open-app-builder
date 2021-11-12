import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
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
        [src]="'plh_images/icons/tick.svg' | plhAssetTranslated"
      />
      <img
        *ngIf="_row.disabled"
        [src]="'plh_images/icons/temporarily_disabled.svg' | plhAssetTranslated"
      />
      <img
        *ngIf="!completed && !_row.disabled && percentComplete == 0"
        [src]="'plh_images/icons/in_progress.svg' | plhAssetTranslated"
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
      <div
        class="accordion-section-content"
        [ngClass]="{
          openSection: _row.parameter_list.state === 'open'
        }"
      >
        <plh-template-component
          style="z-index: 2"
          *ngFor="let childRow of _row.rows; trackBy: trackByRow"
          [row]="childRow"
          [parent]="parent"
        >
        </plh-template-component>
      </div>
    </div>
  </div>`,
  styleUrls: ["./accordion.scss", "../tmpl-components-common.scss"],
})
export class AccordionSectionComponent extends TemplateBaseComponent implements OnInit {
  public completed: boolean;
  public percentComplete: number;
  public title: string;
  private launch_when_locked: boolean;

  @Input() id: string;
  /** Emit output event so parent can respond to open/close events (e.g. close other sections when new section opened) */
  @Output() toggleState = new EventEmitter<string>();

  ngOnInit() {
    this.getParams();
  }

  public toggleOpen() {
    if (!this._row.disabled) {
      this.toggleState.emit(this.id);
    } else if (this._row.disabled && this.launch_when_locked) {
      this.triggerActions("click");
    }
  }

  private getParams() {
    this.completed = getStringParamFromTemplateRow(this._row, "completed", "false") === "true";
    this.title = getStringParamFromTemplateRow(this._row, "title", null);
    this.launch_when_locked = getBooleanParamFromTemplateRow(
      this._row,
      "launch_when_locked",
      false
    );
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
