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
  @Output() progressStatusChange = new EventEmitter<IProgressStatus>();
  subtasksTotal: number;
  subtasksCompleted: number;
  showText = true;
  sectionsName = "sections";

  constructor(
    private taskService: TaskService,
    private templateFieldService: TemplateFieldService,
    private appDataService: AppDataService
  ) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.getTaskGroupData();
  }

  getParams() {
    if (this._row) {
      this.taskGroupDataList = getStringParamFromTemplateRow(
        this._row,
        "task_group_data_list",
        null
      );
      this.taskGroupCompletedField = getStringParamFromTemplateRow(
        this._row,
        "completed_field",
        null
      );
    }
  }

  get progressPercentage() {
    return (this.subtasksCompleted / this.subtasksTotal) * 100;
  }

  async getTaskGroupData() {
    const dataList = await this.appDataService.getSheet("data_list", this.taskGroupDataList);
    const subtasks = dataList.rows;
    console.log(this.taskGroupDataList, subtasks);
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
        this.setTaskGroupCompletedStatus(this.taskGroupCompletedField, true);
      }
    } else {
      this.setTaskGroupCompletedStatus(this.taskGroupCompletedField, false);
      if (this.subtasksCompleted) {
        this.progressStatus = "inProgress";
        this.progressStatusChange.emit(this.progressStatus);
      }
    }
  }

  setTaskGroupCompletedStatus(taskGroupCompletedField: string, isCompleted: boolean) {
    console.log(`Setting ${taskGroupCompletedField} to ${isCompleted}`);
    return this.templateFieldService.setField(taskGroupCompletedField, `${isCompleted}`);
  }
}
