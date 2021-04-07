import {
  AfterContentInit,
  Component,
  ElementRef,
  Host,
  Inject,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from "@angular/core";
import { getStringParamFromTemplateRow, getBooleanParamFromTemplateRow } from "../../../../utils";
import { TemplateBaseComponent } from "../base";
import { TmplDisplayGroupComponent } from "../layout/display_group";

@Component({
  selector: "plh-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class TmplButtonComponent extends TemplateBaseComponent implements OnInit, AfterContentInit {
  style: string = "primary";
  color: string | null;
  disabled: boolean = false;
  textAlign: string;
  buttonAlign: string;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", "passive");
    this.disabled = getBooleanParamFromTemplateRow(this._row, "disabled", false);
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", "center");
    this.buttonAlign = getStringParamFromTemplateRow(this._row, "button_align", "center");
  }
  ngAfterContentInit() {
    console.log(
      this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement
        .style
    );
  }
}
