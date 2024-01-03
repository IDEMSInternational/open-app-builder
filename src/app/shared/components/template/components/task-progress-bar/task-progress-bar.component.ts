import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TaskService } from "src/app/shared/services/task/task.service";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { TemplateFieldService } from "../../services/template-field.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { IProgressStatus } from "src/app/shared/services/task/task.service";
import { CampaignService } from "src/app/feature/campaign/campaign.service";

interface ITaskProgressBarParams {
  /** The name of the task group for which to track the completion of its subtasks */
  taskGroupDataList: string;
  /** The name of the field that stores the completion status of the task group */
  taskGroupCompletedField: string;
  /**
   * The displayed name of the units of progress associated with
   * the constituent tasks of the task group.
   * Default "sections"
   */
  progressUnitsName: string;
  /**
   * Show the text associated with progress bar, e.g. "8 sections"
   * Default true
   */
  showText: boolean;
  /** A list of named style variants of the component, separated by spaces or commas. */
  variant: "green" | "secondary";
}

@Component({
  selector: "plh-task-progress-bar",
  templateUrl: "./task-progress-bar.component.html",
  styleUrls: ["./task-progress-bar.component.scss"],
})
export class TmplTaskProgressBarComponent extends TemplateBaseComponent implements OnInit {
  @Input() taskGroupDataList: string | null;
  @Input() taskGroupCompletedField: string | null;
  @Input() highlighted: boolean | null;
  @Input() progressStatus: IProgressStatus;
  @Input() progressUnitsName: string;
  @Input() showText: boolean;
  @Output() progressStatusChange = new EventEmitter<IProgressStatus>();
  @Output() newlyCompleted = new EventEmitter<boolean>();
  params: Partial<ITaskProgressBarParams> = {};
  subtasksTotal: number;
  subtasksCompleted: number;

  constructor(
    private taskService: TaskService,
    private templateFieldService: TemplateFieldService,
    private appDataService: AppDataService,
    private campaignService: CampaignService
  ) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.evaluateTaskGroupData();
  }

  getParams() {
    // If component is being explicitly instantiated from a template, get the params from the template row
    if (this._row) {
      this.params.taskGroupDataList = getStringParamFromTemplateRow(
        this._row,
        "task_group_data",
        null
      );
      this.params.taskGroupCompletedField = getStringParamFromTemplateRow(
        this._row,
        "completed_field",
        null
      );
      this.params.progressUnitsName = getStringParamFromTemplateRow(
        this._row,
        "progress_units_name",
        "sections"
      );
      this.params.showText = getBooleanParamFromTemplateRow(this._row, "show_text", false);
      this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
        .split(",")
        .join(" ") as ITaskProgressBarParams["variant"];
    }
    // If component is being instantiated by a parent component (e.g. task-card), use Input() values for params.
    else {
      this.params.taskGroupDataList = this.taskGroupDataList;
      this.params.taskGroupCompletedField = this.taskGroupCompletedField;
      this.params.progressUnitsName = this.progressUnitsName;
      this.params.showText = this.showText;
    }
  }

  get progressPercentage() {
    return (this.subtasksCompleted / this.subtasksTotal) * 100;
  }

  async evaluateTaskGroupData() {
    const dataList = await this.appDataService.getSheet("data_list", this.params.taskGroupDataList);
    const subtasks = dataList?.rows || [];
    this.subtasksTotal = subtasks.length;
    this.subtasksCompleted = subtasks.filter((task) =>
      this.templateFieldService.getField(task.completed_field)
    ).length;
    if (this.subtasksCompleted === this.subtasksTotal) {
      this.progressStatus = "completed";
      this.progressStatusChange.emit(this.progressStatus);
      // Check whether task group has already been completed
      if (this.templateFieldService.getField(this.params.taskGroupCompletedField) !== true) {
        // If not, set completed field to "true"
        await this.setTaskGroupCompletedStatus(this.params.taskGroupCompletedField, true);
        this.newlyCompleted.emit(true);
      }
    } else {
      await this.setTaskGroupCompletedStatus(this.params.taskGroupCompletedField, false);
      if (this.subtasksCompleted) {
        this.progressStatus = "inProgress";
        this.progressStatusChange.emit(this.progressStatus);
      }
    }
    const { previousHighlightedTaskGroup, newHighlightedTaskGroup } =
      this.taskService.evaluateHighlightedTaskGroup();
    // HACK - reschedule campaign notifications when the highlighted task group has changed,
    // in order to handle any that are conditional on the highlighted task group
    if (previousHighlightedTaskGroup !== newHighlightedTaskGroup) {
      this.campaignService.scheduleCampaignNotifications();
    }
  }

  async setTaskGroupCompletedStatus(taskGroupCompletedField: string, isCompleted: boolean) {
    console.log(`Setting ${taskGroupCompletedField} to ${isCompleted}`);
    await this.templateFieldService.setField(taskGroupCompletedField, `${isCompleted}`);
  }
}
