import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/shared/services/task/task.service";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { IProgressStatus } from "src/app/shared/services/task/task.service";

@Component({
  selector: "plh-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TmplTaskCardComponent extends TemplateBaseComponent implements OnInit {
  style: string;
  orientation: "landscape" | "portrait";
  highlighted: boolean = true;
  highlightedText = "Active";
  progressStatus: IProgressStatus = "notStarted";
  taskGroupId: string | null;
  taskGroupDataList: string | null;
  taskGroupCompletedField: string | null;
  taskId: string | null;
  title: string | null;
  subtitle: string | null;
  image: string | null;
  completedIcon: string;
  inProgressIcon: string;

  constructor(private taskService: TaskService) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.highlighted = this.taskService.checkHighlightedTask(this.taskId || this.taskGroupId);
  }

  getParams() {
    this.taskGroupId = getStringParamFromTemplateRow(this._row, "task_group_id", null);
    this.taskGroupDataList = getStringParamFromTemplateRow(this._row, "task_group_data", null);
    this.taskGroupCompletedField = getStringParamFromTemplateRow(
      this._row,
      "completed_field",
      null
    );
    this.taskId = getStringParamFromTemplateRow(this._row, "task_id", null);
    this.title = getStringParamFromTemplateRow(this._row, "title", null);
    this.subtitle = getStringParamFromTemplateRow(this._row, "subtitle", null);
    this.image = getStringParamFromTemplateRow(this._row, "image", null);
    this.style = getStringParamFromTemplateRow(this._row, "style", "landscape");
    this.completedIcon = getStringParamFromTemplateRow(this._row, "completed_icon", null);
    this.inProgressIcon = getStringParamFromTemplateRow(this._row, "in_progress_icon", null);
  }
}
