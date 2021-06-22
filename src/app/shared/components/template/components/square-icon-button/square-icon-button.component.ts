import { AfterViewInit, Component, ElementRef, OnInit } from "@angular/core";
import {
  getStringParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
} from "src/app/shared/utils";
import { ITemplateRowProps } from "../../models";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-square-icon-button",
  templateUrl: "./square-icon-button.component.html",
  styleUrls: ["./square-icon-button.component.scss"],
})
export class SquareIconButtonComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit, AfterViewInit {
  icon_src: string;
  style: string;
  disabled: boolean = false;
  isCustomIcon: boolean = false;

  constructor(private elRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  ngAfterViewInit() {
    const el = this.elRef.nativeElement.closest(".display-group");
    if (el && el.classList.value.includes("navigation")) {
      this.elRef.nativeElement.parentElement.parentElement.style.setProperty("flex", "0");
    }
  }

  onClick(event: Event) {
    this.triggerActions("click");
    event.stopPropagation();
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", "information");
    this.disabled = getBooleanParamFromTemplateRow(this._row, "disabled", false);
    if (this._row.disabled) {
      this.disabled = true;
    }
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", "");
    this.isCustomIcon = this.icon_src.includes("/");
  }
}
