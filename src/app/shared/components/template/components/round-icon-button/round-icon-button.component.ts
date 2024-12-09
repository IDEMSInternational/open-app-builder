import { AfterViewInit, Component, ElementRef, Input, OnInit } from "@angular/core";
import { FlowTypes } from "data-models";
import { ITemplateRowProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";
import { TemplateBaseComponent } from "../base";
import { getBooleanParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

interface IRoundButtonParams {
  /** TEMPLATE_PARAMETER: 'icon_src' */
  buttonAlign: string;
  /** TEMPLATE_PARAMETER: 'icon_src' */
  disabled: boolean;
  /** TEMPLATE_PARAMETER: 'icon_src' */
  icon_src: string;
  /** TEMPLATE_PARAMETER: 'icon_src' */
  style: string;
  /** TEMPLATE_PARAMETER: 'icon_src' */
  text: string;
  /** TEMPLATE_PARAMETER: 'style'. Legacy, use 'variant' instead */
  textAlign: string;
  /** TEMPLATE_PARAMETER: 'variant' */
  variant:
    | "no-background"
    | "module"
    | "category"
    | "navigation"
    | "information"
    | "module"
    | "home_screen"
    | "orange"
    | "dark_orange"
    | "yellow"
    | "standard"
    | "alternative";
}

@Component({
  selector: "plh-round-button",
  templateUrl: "./round-icon-button.component.html",
  styleUrls: ["../button/button.component.scss", "./round-icon-button.component.scss"],
})
export class RoundIconButtonComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit, AfterViewInit
{
  @Input() parent: TemplateContainerComponent;
  @Input() template: FlowTypes.Template;
  params: Partial<IRoundButtonParams> = {};
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
    this.params.style = getStringParamFromTemplateRow(this._row, "style", "");
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ")
      .concat(" ") as IRoundButtonParams["variant"];
    this.params.disabled = getBooleanParamFromTemplateRow(this._row, "disabled", false);
    if (this._row.disabled) {
      this.params.disabled = true;
    }
    this.params.text = getStringParamFromTemplateRow(this._row, "text", "");
    this.params.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", "");
    this.params.buttonAlign = getStringParamFromTemplateRow(this._row, "button_align", "center");
    this.isHomeScreen = this.params.style.includes("home_screen");
    this.isCustomIcon = this.params.icon_src.includes("/");
  }
}
