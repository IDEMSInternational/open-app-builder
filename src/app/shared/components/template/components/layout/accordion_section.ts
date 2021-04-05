import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Input,
} from "@angular/core";
import { BehaviorSubject } from "scripts/node_modules/rxjs";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-accordion-section",
  template: `<div class="accordion-wrapper">
    <div
      [ngClass]="{
        completed: status === 'completed',
        disabled: status === 'disabled',
        inProgress: status === 'inProgress'
      }"
      class="accordion-status"
      [ngSwitch]="status"
    >
      <img *ngSwitchCase="'completed'" src="/assets/plh_assets/plh_images/icons/tick_white.svg" />
      <img *ngSwitchCase="'disabled'" src="/assets/plh_assets/plh_images/icons/lock.svg" />
    </div>
    <div
      class="accordion-section"
      [ngClass]="{
        openSection: _row.parameter_list.state === 'open',
        completed: status === 'completed'
      }"
      [class.open-section]="_row.parameter_list.state === 'open'"
    >
      <div #progress class="progress"></div>
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
export class AccordionSectionComponent
  extends TemplateBaseComponent
  implements OnInit, AfterViewInit {
  private progressBar: HTMLElement;
  public status: string;
  public title: string;
  public progressValue$: BehaviorSubject<number> = new BehaviorSubject(0);

  @Input() id: string;
  @Output() toggleState = new EventEmitter<string>();

  @ViewChild("progress") progress: ElementRef;

  ngOnInit() {
    this.getParams();
  }

  ngAfterViewInit() {
    this.progressBar = this.progress.nativeElement;
    this.progressValue$.subscribe((value) => {
      this.updateStatus(value);
      this.updateProgressBar(value);
    });
  }

  public toggleOpen() {
    if (this.status !== "disabled") {
      this.toggleState.emit(this.id);
    }
  }

  private getParams() {
    this.status = getStringParamFromTemplateRow(this._row, "status", null);
    this.title = getStringParamFromTemplateRow(this._row, "title", null);
    this.progressValue$.next(this._row.value);
  }

  private updateProgressBar(value: number) {
    this.progressBar.style.width = `${value}%`;
  }

  private updateStatus(value: number) {
    if (value === 100) {
      this.status = "completed";
    } else if (value > 0) {
      this.status = "inProgress";
    }
  }
}
