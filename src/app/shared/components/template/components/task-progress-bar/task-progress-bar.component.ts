import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TaskService } from "src/app/shared/services/task/task.service";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { TemplateFieldService } from "../../services/template-field.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";

@Component({
  selector: "plh-task-progress-bar",
  templateUrl: "./task-progress-bar.component.html",
  styleUrls: ["./task-progress-bar.component.scss"],
})
export class TmplTaskProgressBarComponent extends TemplateBaseComponent implements OnInit {
  @Input() taskGroupId: string | null;
  @Input() highlighted: boolean | null;
  @Input() completed: boolean | null;
  @Output() completedChange = new EventEmitter<boolean>();
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
    // this.highlighted = this.taskService.checkHighlightedTask(this.taskGroupId);
    // this.hackExampleData();
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
      this.completed = true;
      this.completedChange.emit(this.completed);
      // Check whether task group has already been completed
      if (this.templateFieldService.getField(`${taskGroupId}_completed`) !== true) {
        // If not, set completed field to "true" and emit "completed"
        this.setTaskGroupCompleted(taskGroupId);
        // TODO? Alternatively, leave setting the field to the template, and just emit "completed", i.e.
        // this.triggerActions("completed")
        // Currently the task-progress-bar cannot trigger actions, since it is only instantiated inside
        // the task-card so has now "_row"
      }
    }
  }

  setTaskGroupCompleted(taskGroupId: string) {
    const completedField = `${taskGroupId}_completed`;
    console.log(`Setting ${completedField} to true`);
    return this.templateFieldService.setField(completedField, "true");
  }

  hackExampleData() {
    this.subtasksTotal = 10;
    this.subtasksCompleted = 4;
  }
}
