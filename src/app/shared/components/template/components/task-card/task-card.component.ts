import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/shared/services/task/task.service";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { IProgressStatus } from "src/app/shared/services/task/task.service";
import { TemplateFieldService } from "../../services/template-field.service";

interface ITaskCardParams {
  /**
   * The ID of an individual task. A task card can display *either* an individual task,
   * *or* a task group: either a task_id or a task_group_id should be provided.
   */
  task_id: string;
  /**
   * The ID of a task group, used to track whether it is the highlighted task group.
   * If provided, the task card will display a progress bar for the task group
   * **/
  task_group_id: string;
  /**
   * The name of the data_list containing the elements of the task group,
   * used to track completion progress of the task group
   * **/
  task_group_data: string;
  /**
   * The name of the field that tracks the completion of the task. Can be omitted when displaying a task group,
   * as their completion is calculated by the completion of their constituent tasks
   */
  completed_field: string;
  /** The title to display on the task card */
  title: string;
  /**
   * The subtitle to display on the task card, typically a short description.
   * Optional
   */
  subtitle: string;
  /**
   * The image to display on the task card.
   * Optional
   */
  image: string;
  /** Legacy, use variant instead */
  style: string;
  /**
   * A list of named style variants of the component, separated by spaces or commas.
   * Default "landscape"
   * */
  variant: "background-secondary" | "background-primary" | "button" | "landscape" | "portrait" | "";
  /**
   * The icon to display in the "badge" added to the task card
   * when its associated task/task group has been completed
   */
  completed_icon: string;
  /**
   * The icon to display in the "badge" added to the task card
   * when its associated task/task group is in progress
   */
  in_progress_icon: string;
  /**
   * Text to display in the "badge" added to the task card
   * when its associated task group is the highlighted task group.
   * Default "Active"
   */
  highlighted_text: string;
  /**
   * The displayed name of the units of progress associated with
   * the constituent tasks of the task group.
   * Default "sections"
   */
  progress_units_name: string;
  /**
   * Show the text associated with progress bar,
   * e.g. "8 sections"
   * Default true
   */
  show_progress_text: boolean;
}

@Component({
  selector: "plh-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TmplTaskCardComponent extends TemplateBaseComponent implements OnInit {
  /** Authoring parameters */
  public parameter_list: ITaskCardParams;

  style: string;
  highlighted: boolean;
  highlightedText: string;
  progressUnitsName: string;
  showProgressText: boolean;
  progressStatus: IProgressStatus = "notStarted";
  taskGroupId: string | null;
  taskGroupDataList: string | null;
  completedField: string | null;
  taskId: string | null;
  title: string | null;
  subtitle: string | null;
  image: string | null;
  completedIcon: string;
  inProgressIcon: string;
  isButton: boolean;
  variant: ITaskCardParams["variant"];

  constructor(
    private taskService: TaskService,
    private templateFieldService: TemplateFieldService
  ) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.highlighted =
      this.taskGroupId && !this.taskId
        ? this.taskService.checkHighlightedTaskGroup(this.taskGroupId)
        : false;
    this.checkProgressStatus();
  }

  getParams() {
    this.taskGroupId = getStringParamFromTemplateRow(this._row, "task_group_id", null);
    this.taskGroupDataList = getStringParamFromTemplateRow(this._row, "task_group_data", null);
    this.completedField = getStringParamFromTemplateRow(this._row, "completed_field", null);
    this.taskId = getStringParamFromTemplateRow(this._row, "task_id", null);
    this.title = getStringParamFromTemplateRow(this._row, "title", null);
    this.subtitle = getStringParamFromTemplateRow(this._row, "subtitle", null);
    this.image = getStringParamFromTemplateRow(this._row, "image", null);

    // Use "variant" param to determine styles, including support for legacy "style" param
    this.style = getStringParamFromTemplateRow(this._row, "style", "landscape");
    this.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ") as ITaskCardParams["variant"];
    this.isButton = this.style.includes("button") || this.variant.includes("button");

    this.completedIcon = getStringParamFromTemplateRow(this._row, "completed_icon", null);
    this.inProgressIcon = getStringParamFromTemplateRow(this._row, "in_progress_icon", null);
    this.highlightedText = getStringParamFromTemplateRow(this._row, "highlighted_text", "Active");
    this.progressUnitsName = getStringParamFromTemplateRow(
      this._row,
      "progress_units_name",
      "sections"
    );
    this.showProgressText = getBooleanParamFromTemplateRow(this._row, "show_progress_text", true);
  }

  checkProgressStatus() {
    if (this.taskId) {
      if (this.completedField && this.templateFieldService.getField(this.completedField))
        this.progressStatus = "completed";
    }
  }

  handleNewlyCompleted(isNewlyCompleted: boolean) {
    if (isNewlyCompleted) {
      this.triggerActions("completed");
    }
  }
}
