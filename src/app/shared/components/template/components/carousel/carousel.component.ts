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
    this.getParams();
    await this.hackSetHighlightedTask();
  }

  getParams() {
    this.config.slidesPerView =
      getNumberParamFromTemplateRow(this._row, "slides_per_view", null) || "auto";
    this.config.spaceBetween = getNumberParamFromTemplateRow(this._row, "space_between", 10);
    this.config.loop = getBooleanParamFromTemplateRow(this._row, "loop", false);
    // "loopedSlides" is required in the Slider config iff "loop" is true
    if (this.config.loop) {
      this.config.loopedSlides = this._row.rows.length;
    }
    this.config.centeredSlides = getBooleanParamFromTemplateRow(this._row, "centred_slides", true);
    this.config.centeredSlidesBounds = !getBooleanParamFromTemplateRow(
      this._row,
      "centre_first_and_last",
      false
    );
    this.config.initialSlide = getNumberParamFromTemplateRow(this._row, "initial_slide_index", 0);
  }

  /** Event emitter called when swiper initialised */
  public handleSwiperInitialised(swiper: Swiper) {
    // setInterval(() => console.log("initial slide:", this.swiper.params.initialSlide), 10)
    console.log("swiper initialised");
    this.swiper = swiper;
    this.swiper.slideTo(this.config.initialSlide, 0, false);
    console.log("swiper params:", this.swiper.params);
    console.log("active index:", this.swiper.activeIndex);
    this.swiper.params.centeredSlidesBounds = true;
    this.swiper.update();

    setTimeout(() => {
      console.log("hi");
      this.swiper.slideTo(this.config.initialSlide, 0, false);
    }, 1000);
  }

  /** When using carousel within task_group context set additional highlighted slide from task data */
  private async hackSetHighlightedTask() {
    const taskGroupsList = getStringParamFromTemplateRow(this._row, "task_group_data", null);
    if (taskGroupsList) {
      const highlightedTaskGroup = this.taskService.getHighlightedTaskGroup();
      if (highlightedTaskGroup) {
        this.config.initialSlide = await this.taskService.getHighlightedTaskGroupIndex(
          highlightedTaskGroup,
          taskGroupsList
        );
        // If the Swiper instance has already been intialised, update it
        if (this.swiper) this.swiper.update();
      }
    }
  }
}
