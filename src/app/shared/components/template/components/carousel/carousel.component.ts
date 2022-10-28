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
  initialSlide: number;

  constructor(private taskService: TaskService) {
    super();
  }

  async ngOnInit() {
    await this.getParams();
    await this.hackSetHighlightedTask();
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
    this.initialSlide = getNumberParamFromTemplateRow(this._row, "initial_slide_index", 0);
  }

  /** Event emitter called when swiper initialised */
  public handleSwiperInitialised(swiper: Swiper) {
    this.swiper = swiper;
    this.swiper.slideTo(this.initialSlide, 0, false);
  }

  /** When using carousel within task_group context set additional highlighted slide from task data */
  private async hackSetHighlightedTask() {
    const taskGroupsList = getStringParamFromTemplateRow(this._row, "task_group_data", null);
    if (taskGroupsList) {
      const highlightedTaskGroup = this.taskService.getHighlightedTaskGroup();
      if (highlightedTaskGroup) {
        this.initialSlide = await this.taskService.getHighlightedTaskGroupIndex(
          highlightedTaskGroup,
          taskGroupsList
        );
      }
    }
  }
}
