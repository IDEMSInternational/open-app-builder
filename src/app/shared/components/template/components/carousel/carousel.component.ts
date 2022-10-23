import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { SwiperOptions } from "swiper";
import { getNumberParamFromTemplateRow } from "src/app/shared/utils";

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
    this.config.slidesPerView = getNumberParamFromTemplateRow(this._row, "slidesPerView", 2.5);
    this.config.spaceBetween = getNumberParamFromTemplateRow(this._row, "spaceBetween", 10);
  }
}
