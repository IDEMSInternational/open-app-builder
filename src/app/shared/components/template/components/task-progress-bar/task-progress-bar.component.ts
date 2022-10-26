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
  @Input() taskGroupId: string | null;
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
    this.getTaskGroupData(this.taskGroupId);
  }

  getParams() {
    if (this._row) {
      this.taskGroupId = getStringParamFromTemplateRow(this._row, "taskGroupId", null);
    }
  }

  get progressPercentage() {
    return (this.subtasksCompleted / this.subtasksTotal) * 100;
  }

  async getTaskGroupData(taskGroupId: string) {
    const dataList = await this.appDataService.getSheet("data_list", `${taskGroupId}_tasks`);
    const subtasks = dataList.rows;
    this.subtasksTotal = subtasks.length;
    this.subtasksCompleted = subtasks.filter((task) =>
      this.templateFieldService.getField(task.completed_field)
    ).length;
    if (this.subtasksCompleted === this.subtasksTotal) {
      this.progressStatus = "completed";
      this.progressStatusChange.emit(this.progressStatus);
      // Check whether task group has already been completed
      if (this.templateFieldService.getField(`${taskGroupId}_completed`) !== true) {
        // If not, set completed field to "true"
        this.setTaskGroupCompletedStatus(taskGroupId, true);
      }
    } else {
      this.setTaskGroupCompletedStatus(taskGroupId, false);
      if (this.subtasksCompleted) {
        this.progressStatus = "inProgress";
        this.progressStatusChange.emit(this.progressStatus);
      }
    }
  }

  setTaskGroupCompletedStatus(taskGroupId: string, completed: boolean) {
    const completedField = `${taskGroupId}_completed`;
    console.log(`Setting ${completedField} to ${completed}`);
    return this.templateFieldService.setField(completedField, `${completed}`);
  }
}
