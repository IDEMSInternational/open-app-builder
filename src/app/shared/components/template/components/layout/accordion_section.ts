import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-accordion-section",
  template: `<div class="accordion-wrapper" [class.opened]="isOpened">
    <div
      [ngClass]="{
        completed: status === 'completed',
        uncopleted: status === 'uncompleted',
        disabled: status === 'disabled'
      }"
      class="accordion-status"
      [ngSwitch]="status"
    >
      <img *ngSwitchCase="'completed'" src="/assets/plh_assets/plh_images/icons/tick.svg" />
      <img *ngSwitchCase="'disabled'" src="/assets/plh_assets/plh_images/icons/lock.svg" />
    </div>
    <div class="accordion-section">
      <div #progress class="progress">
        <plh-template-component
          (click)="toggleOpen($event)"
          *ngFor="let childRow of _row.rows"
          [row]="childRow"
          [parent]="parent"
        >
        </plh-template-component>
      </div>
    </div>
  </div>`,
  styleUrls: ["./accordion.scss"],
})
export class AccordionSectionComponent
  extends TemplateBaseComponent
  implements OnInit, AfterViewInit {
  public status: string;
  public isOpened: boolean;
  private progressBar: HTMLElement;
  private progressValue: number;

  @ViewChild("progress") progress: ElementRef;

  ngOnInit() {
    this.getParams();
  }

  ngAfterViewInit() {
    this.progressBar = this.progress.nativeElement;
    this.progressBar.style.background = `linear-gradient(to right, var(--ion-color-tertiary) ${this.progressValue}%, #ffff 0%)`;
  }

  toggleOpen(e) {
    if (e.target.localName === "p" && this.status !== "disabled") {
      this.isOpened = !this.isOpened;
    }
  }

  getParams() {
    this.isOpened = getStringParamFromTemplateRow(this._row, "state", null) === "open";
    this.status = getStringParamFromTemplateRow(this._row, "status", "disabled");
    this.progressValue = this._row.value;
  }
}
