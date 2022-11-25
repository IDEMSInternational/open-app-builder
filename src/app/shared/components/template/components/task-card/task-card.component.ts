import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/shared/services/task/task.service";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { IProgressStatus } from "src/app/shared/services/task/task.service";
import { TemplateFieldService } from "../../services/template-field.service";

@Component({
  selector: "plh-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TmplTaskCardComponent extends TemplateBaseComponent implements OnInit {
  style: string;
  highlighted: boolean;
  highlightedText: string;
  progressUnitsName: string;
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
    this.style = getStringParamFromTemplateRow(this._row, "style", "landscape");
    this.isButton = this.style.includes("button");
    this.completedIcon = getStringParamFromTemplateRow(this._row, "completed_icon", null);
    this.inProgressIcon = getStringParamFromTemplateRow(this._row, "in_progress_icon", null);
    this.highlightedText = getStringParamFromTemplateRow(this._row, "highlighted_text", "Active");
    this.progressUnitsName = getStringParamFromTemplateRow(
      this._row,
      "progress_units_name",
      "sections"
    );
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
