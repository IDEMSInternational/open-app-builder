import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../../base";

@Component({
  selector: "plh-tmpl-accordion-section",
  templateUrl: "./accordion-section.component.html",
  styleUrls: ["./accordion-section.component.scss"],
})
export class AccordionSectionComponent extends TemplateBaseComponent implements OnInit {
  public completed: boolean;
  public percentComplete: number;
  public title: string;
  private launch_when_locked: boolean;
  public completedIcon: string;
  public inProgressIcon: string;
  public disabledIcon: string;

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
    this.completedIcon = getStringParamFromTemplateRow(this._row, "completed_icon_asset", null);
    this.inProgressIcon = getStringParamFromTemplateRow(this._row, "in_progress_icon_asset", null);
    this.disabledIcon = getStringParamFromTemplateRow(this._row, "disabled_icon_asset", null);
    this.percentComplete = this._row.value ? this._row.value : 0;
    this.updateStatus(this.percentComplete);
  }

  private updateStatus(value: number) {
    if (value === 100) {
      this.completed = true;
    } else if (value > 0) {
      this.completed = false;
    }
  }
}
