import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { SwiperOptions } from "swiper";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
} from "src/app/shared/utils";

@Component({
  selector: "plh-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TmplCarouselComponent extends TemplateBaseComponent implements OnInit {
  config: SwiperOptions = {};

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.config.slidesPerView =
      getNumberParamFromTemplateRow(this._row, "slidesPerView", null) || "auto";
    this.config.spaceBetween = getNumberParamFromTemplateRow(this._row, "spaceBetween", 10);
    this.config.loop = getBooleanParamFromTemplateRow(this._row, "loop", false);
    // "loopedSlides" is required in the Slider config iff "loop" is true
    if (this.config.loop) {
      this.config.loopedSlides = this._row.rows.length;
    }
  }
}
