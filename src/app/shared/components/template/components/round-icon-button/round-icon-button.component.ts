import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { ITemplateRowProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";
import { TemplateBaseComponent } from "../base";
import { getBooleanParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "plh-round-button",
  templateUrl: "./round-icon-button.component.html",
  styleUrls: ["../button/button.component.scss", "./round-icon-button.component.scss"],
})
export class RoundIconButtonComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  @Input() parent: TemplateContainerComponent;
  @Input() template: FlowTypes.Template;
  icon_src: string;
  text: string;
  style: string;
  disabled: boolean = false;
  textAlign: string;
  buttonAlign: string;
  isHomeScreen: boolean = false;
  isCustomIcon: boolean = false;
  constructor() {
    super();
  }
  ngOnInit() {
    this.getParams();
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
