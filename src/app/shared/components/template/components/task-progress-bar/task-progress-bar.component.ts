import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TaskService } from "src/app/shared/services/task/task.service";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { TemplateFieldService } from "../../services/template-field.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { IProgressStatus } from "src/app/shared/services/task/task.service";

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
  @Output() progressStatusChange = new EventEmitter<IProgressStatus>();
  @Output() newlyCompleted = new EventEmitter<boolean>();
  subtasksTotal: number;
  subtasksCompleted: number;
  showText = true;

  constructor(
    private taskService: TaskService,
    private templateFieldService: TemplateFieldService,
    private appDataService: AppDataService
  ) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.evaluateTaskGroupData();
  }

  getParams() {
    if (this._row) {
      this.taskGroupDataList = getStringParamFromTemplateRow(this._row, "task_group_data", null);
      this.taskGroupCompletedField = getStringParamFromTemplateRow(
        this._row,
        "completed_field",
        null
      );
      this.progressUnitsName = getStringParamFromTemplateRow(
        this._row,
        "progress_units_name",
        "sections"
      );
    }
  }

  get progressPercentage() {
    return (this.subtasksCompleted / this.subtasksTotal) * 100;
  }

  async evaluateTaskGroupData() {
    const dataList = await this.appDataService.getSheet("data_list", this.taskGroupDataList);
    const subtasks = dataList?.rows || [];
    this.subtasksTotal = subtasks.length;
    this.subtasksCompleted = subtasks.filter((task) =>
      this.templateFieldService.getField(task.completed_field)
    ).length;
    if (this.subtasksCompleted === this.subtasksTotal) {
      this.progressStatus = "completed";
      this.progressStatusChange.emit(this.progressStatus);
      // Check whether task group has already been completed
      if (this.templateFieldService.getField(this.taskGroupCompletedField) !== true) {
        // If not, set completed field to "true"
        await this.setTaskGroupCompletedStatus(this.taskGroupCompletedField, true);
        this.newlyCompleted.emit(true);
      }
    } else {
      await this.setTaskGroupCompletedStatus(this.taskGroupCompletedField, false);
      if (this.subtasksCompleted) {
        this.progressStatus = "inProgress";
        this.progressStatusChange.emit(this.progressStatus);
      }
    }
    this.taskService.evaluateHighlightedTaskGroup();
  }

  async setTaskGroupCompletedStatus(taskGroupCompletedField: string, isCompleted: boolean) {
    console.log(`Setting ${taskGroupCompletedField} to ${isCompleted}`);
    await this.templateFieldService.setField(taskGroupCompletedField, `${isCompleted}`);
  }
}
