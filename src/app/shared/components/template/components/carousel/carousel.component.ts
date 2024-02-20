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
  taskGroupsListName: string;

  constructor(private taskService: TaskService) {
    super();
  }

  async ngOnInit() {
    await this.getParams();
    // When using carousel within task group context, set initial slide based on highlighted task
    if (this.taskGroupsListName) {
      this.hackSetInitialSlide();
    }
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
    this.config.centeredSlides = getBooleanParamFromTemplateRow(this._row, "centred_slides", true);
    this.initialSlide = getNumberParamFromTemplateRow(this._row, "initial_slide_index", 0);
    this.taskGroupsListName = getStringParamFromTemplateRow(this._row, "task_group_data", null);
  }

  /** Event emitter called when swiper initialised */
  public handleSwiperInitialised(swiper: Swiper) {
    this.swiper = swiper;
    this.swiper.slideTo(this.initialSlide, 0, false);
  }

  /** Set initial slide based on highlighted task */
  private async hackSetInitialSlide() {
    const indexOfHighlightedTask = await this.taskService.getHighlightedTaskGroupIndex(
      this.taskGroupsListName
    );
    // if highlightes task is not in list, default to 0 for initial slide
    if (indexOfHighlightedTask === -1) {
      this.initialSlide = 0;
    } else {
      this.initialSlide = indexOfHighlightedTask;
    }
  }
}
