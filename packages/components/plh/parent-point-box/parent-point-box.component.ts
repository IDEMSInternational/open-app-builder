import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { FlowTypes, ITemplateRowProps } from "src/app/shared/components/template/models";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { AnimationOptions } from "ngx-lottie";
import { TemplateAssetService } from "src/app/shared/components/template/services/template-asset.service";

@Component({
  selector: "plh-parent-point-box",
  templateUrl: "./parent-point-box.component.html",
  styleUrls: ["./parent-point-box.component.scss"],
  standalone: false,
})
export class PlhParentPointBoxComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit
{
  @Input() template: FlowTypes.Template;
  @ViewChild("star", { static: false }) star: ElementRef;
  @ViewChild("item", { static: false }) item: ElementRef;
  icon_src: string | null;
  info_icon_src: string | null;
  lottie_src: string | null;
  video_src: string | null;
  windowWidth: number;
  text: string | null;
  wasClicked: boolean = false;
  _value: number | null = 0;
  animOptions: AnimationOptions;
  animCelebrationOptions: AnimationOptions;
  play_celebration: boolean;
  showCelebrationAnimation = false;
  @HostListener("window:resize", ["$event"]) onResize(event) {
    this.windowWidth = event.target.innerWidth - 10;
  }

  constructor(private templateAssetService: TemplateAssetService) {
    super();
  }

  ngOnInit() {
    this.getParams();
    if (this.lottie_src) {
      this.lottie_src = this.templateAssetService.getTranslatedAssetPath(this.lottie_src);
      this.animOptions = {
        path: this.lottie_src,
        name: this.text,
        autoplay: true,
        loop: true,
      };
    }
    const celebrationAnimationPath = this.templateAssetService.getTranslatedAssetPath(
      "/plh_lottie/habits/cascading_stars.json"
    );
    this.animCelebrationOptions = {
      path: celebrationAnimationPath,
      name: "celebration",
      autoplay: true,
      loop: false,
      rendererSettings: {
        // svg scaling options: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
        preserveAspectRatio: "xMinYMin slice",
      },
    };
  }

  getParams() {
    this.video_src = getStringParamFromTemplateRow(this._row, "video_src", null);
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", null);
    this.info_icon_src = getStringParamFromTemplateRow(this._row, "info_icon_src", null);
    this.lottie_src = getStringParamFromTemplateRow(this._row, "lottie_src", null);
    this.play_celebration = getBooleanParamFromTemplateRow(this._row, "play_celebration", true);
    this.text = getStringParamFromTemplateRow(this._row, "text", null);
    this.windowWidth = window.innerWidth - 10;
    if (!this._row.value) {
      this._row.value = 0;
    }
  }

  async clickPointItem() {
    if (this._row.disabled) {
      return;
    }
    this._row.value = parseInt(this._row.value as string) + 1;
    this._value = this._row.value;
    this.star.nativeElement.classList.add("on-add");
    if (this.play_celebration) {
      this.showCelebrationAnimation = true;
    }
    setTimeout((_) => {
      this.star.nativeElement.classList.remove("on-add");
      this.showCelebrationAnimation = false;
    }, 1000);
    if (!this.wasClicked) {
      this.item.nativeElement.classList.add("complete");
    }
    this.wasClicked = true;
    await this.setValue(this._value);
    await this.triggerActions("click");
  }

  async clickInfo(event) {
    event.stopPropagation();
    await this.triggerActions("info_click");
  }
}
