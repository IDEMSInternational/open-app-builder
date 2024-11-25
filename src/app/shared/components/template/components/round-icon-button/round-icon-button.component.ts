import { AfterViewInit, Component, ElementRef, Input, OnInit } from "@angular/core";
import { FlowTypes } from "data-models";
import { TemplateBaseComponent } from "../base";
import { getBooleanParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-round-button",
  templateUrl: "./round-icon-button.component.html",
  styleUrls: ["../button/button.component.scss", "./round-icon-button.component.scss"],
})
export class RoundIconButtonComponent
  extends TemplateBaseComponent
  implements OnInit, AfterViewInit
{
  @Input() template: FlowTypes.Template;
  icon_src: string;
  text: string;
  style: string;
  disabled: boolean = false;
  textAlign: string;
  buttonAlign: string;
  isHomeScreen: boolean = false;
  isCustomIcon: boolean = false;
  constructor(private elRef: ElementRef) {
    super();
  }
  ngOnInit() {
    this.getParams();
  }

  ngAfterViewInit() {
    const el = this.elRef.nativeElement.closest(".display-group-wrapper");
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
    this.text = getStringParamFromTemplateRow(this._row, "text", "");
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", "");
    this.buttonAlign = getStringParamFromTemplateRow(this._row, "button_align", "center");
    this.isHomeScreen = this.style.includes("home_screen");
    this.isCustomIcon = this.icon_src.includes("/");
  }
}
