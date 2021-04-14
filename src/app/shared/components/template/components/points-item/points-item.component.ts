import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { FlowTypes, ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-points-item",
  templateUrl: "./points-item.component.html",
  styleUrls: ["./points-item.component.scss"],
})
export class TmplParentPointBoxComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  @ViewChild("star", { static: false }) star: ElementRef;
  @ViewChild("item", { static: false }) item: ElementRef;
  icon_src: string | null;
  text: string | null;
  assetsPrefix = "/assets/plh_assets/";
  icon_result: string;
  wasClicked: boolean = false;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", null);
    this.text = getStringParamFromTemplateRow(this._row, "text", null);
    this.icon_result = this.getPathImg();
    if (!this._row.value) this._row.value = 0;
  }

  getPathImg(): string {
    const src = this.assetsPrefix + this.icon_src;
    return src.replace("//", "/");
  }

  clickPointItem() {
    if (this._row.disabled) {
      return;
    }
    this.triggerActions("click");
    this._row.value += 1;
    this.star.nativeElement.classList.add("on-add");
    setTimeout((_) => {
      this.star.nativeElement.classList.remove("on-add");
    }, 1000);
    if (!this.wasClicked) {
      this.item.nativeElement.classList.add("complete");
    }
    this.wasClicked = true;
  }
}
