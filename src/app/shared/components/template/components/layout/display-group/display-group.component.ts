import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from "@angular/core";
import { TemplateBaseComponent } from "../../base";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../../utils";

interface IDisplayGroupParams {
  /** TEMPLATE PARAMETER: "variant" */
  variant: "box_gray" | "box_primary" | "box_secondary" | "box_white" | "dashed_box";
  /** TEMPLATE PARAMETER: "style". TODO: Various additional legacy styles, review and convert some to variants */
  style: "form" | "default" | string | null;
  /** TEMPLATE PARAMETER: "offset". Add a custom bottom margin */
  offset: number;
  /** TEMPLATE PARAMETER: "sticky". Set to "top" or "bottom" to make the display group a sticky inline header/footer */
  sticky: "top" | "bottom" | null;
}

@Component({
  selector: "plh-tmpl-display-group",
  templateUrl: "./display-group.component.html",
  styleUrls: ["../../tmpl-components-common.scss", "./display-group.component.scss"],
})
export class TmplDisplayGroupComponent
  extends TemplateBaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  params: Partial<IDisplayGroupParams> = {};
  bgColor: string;
  type: "form" | "dashed_box" | "default";

  @ViewChild("displayGroupWrapper") displayGroupWrapper: ElementRef;
  private resizeObserver: ResizeObserver;
  stickyHeight = signal<number>(0);

  ngOnInit() {
    this.getParams();
  }

  ngAfterViewInit() {
    if (this.params.sticky) {
      this.initResizeObserver();
    }
  }

  public clickDisplayGroup() {
    this.triggerActions("click");
  }

  private getParams() {
    this.params.style = getStringParamFromTemplateRow(this._row, "style", "row");
    this.params.offset = getNumberParamFromTemplateRow(this._row, "offset", 0);
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ")
      .concat(" " + this.params.style) as IDisplayGroupParams["variant"];
    this.params.sticky = getStringParamFromTemplateRow(
      this._row,
      "sticky",
      null
    ) as IDisplayGroupParams["sticky"];
    this.type = this.getTypeFromStyles();
  }

  private getTypeFromStyles() {
    if (this.params.style?.includes("form") || this.params.variant?.includes("form")) return "form";
    if (this.params.style?.includes("dashed_box") || this.params.variant?.includes("dashed_box"))
      return "dashed_box";
    return "default";
  }

  /** Observe the height of the display group wrapper element and update the stickyHeight property accordingly */
  private initResizeObserver() {
    if (this.displayGroupWrapper) {
      this.resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        this.stickyHeight.set(entry.contentRect.height);
      });

      this.resizeObserver.observe(this.displayGroupWrapper.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
