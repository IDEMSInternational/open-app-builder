import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { SwiperOptions, Swiper } from "swiper";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TaskService } from "src/app/shared/services/task/task.service";

@Component({
  selector: "plh-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TmplCarouselComponent extends TemplateBaseComponent implements OnInit {
  config: SwiperOptions = {};
  swiper: Swiper;
  taskGroupsList: string;
  initialSlide: number;

  constructor(private taskService: TaskService) {
    super();
  }

  async ngOnInit() {
    await this.getParams();
  }

  async getParams() {
    this.config.slidesPerView =
      getNumberParamFromTemplateRow(this._row, "slides_per_view", null) || "auto";
    this.config.spaceBetween = getNumberParamFromTemplateRow(this._row, "space_between", 10);
    this.config.loop = getBooleanParamFromTemplateRow(this._row, "loop", false);
    // "loopedSlides" is required in the Slider config iff "loop" is true
    if (this.config.loop) {
      this.config.loopedSlides = this._row.rows.length;
    }
    this.config.centeredSlides = getBooleanParamFromTemplateRow(this._row, "centered_slides", true);
    this.taskGroupsList = getStringParamFromTemplateRow(this._row, "task_groups_data", null);
    if (this.taskGroupsList) {
      const indexOfHighlightedTask = await this.taskService.getHighlightedTaskGroupIndex(
        this.taskGroupsList
      );
      this.initialSlide = indexOfHighlightedTask;
    } else {
      this.initialSlide = getNumberParamFromTemplateRow(this._row, "initial_slide_index", 0);
    }
  }

  initialiseSwiper(swiper: Swiper) {
    this.swiper = swiper;
    this.swiper.slideTo(this.initialSlide, 0, false);
  }
}
