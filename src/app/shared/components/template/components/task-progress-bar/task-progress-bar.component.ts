import { Component, Input, OnInit } from "@angular/core";
import { TaskService } from "src/app/shared/services/task/task.service";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { TemplateFieldService } from "../../services/template-field.service";

@Component({
  selector: "plh-task-progress-bar",
  templateUrl: "./task-progress-bar.component.html",
  styleUrls: ["./task-progress-bar.component.scss"],
})
export class TmplTaskProgressBarComponent extends TemplateBaseComponent implements OnInit {
  @Input() taskGroupId: string | null;
  @Input() highlighted: boolean | null;
  subtasksTotal: number;
  subtasksCompleted: number;
  completed: boolean;
  showText = true;
  sectionsName = "sections";

  constructor(
    private taskService: TaskService,
    private templateFieldService: TemplateFieldService
  ) {
    super();
  }

  ngOnInit() {
    this.getParams();
    // this.getTaskGroupData(this.taskGroupId)
    this.highlighted = this.taskService.checkHighlightedTask(this.taskGroupId);
    this.hackExampleData();
  }

  getParams() {
    if (this._row) {
      this.taskGroupId = getStringParamFromTemplateRow(this._row, "taskGroupId", null);
    }
  }

  get progressPercentage() {
    return (this.subtasksCompleted / this.subtasksTotal) * 100;
  }

  // Unfinished code for getting data relating to a given task group
  // getTaskGroupData(taskGroupId: string) {
  //   const subtasks = this.taskService.getTasksInGroup(taskGroupId)
  //   // better to just get data list instead?
  //   const subtasks = getDataList(`tasks_${taskGroupId}`)
  //   this.subtasksTotal = subtasks.length
  //   let subtasksCompleted = 0
  //   for (const subtask in subtasks) {
  //     if (this.templateFieldService.getField(`${subtask}_completed`)) {
  //       subtasksCompleted++
  //     }
  //   }
  //   this.subtasksCompleted = subtasksCompleted
  //   this.completed = this.templateFieldService.getField(`${taskGroupId}_completed`)
  // }

  hackExampleData() {
    this.subtasksTotal = 10;
    this.subtasksCompleted = 4;
  }
}
