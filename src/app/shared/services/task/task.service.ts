import { Injectable } from "@angular/core";
import { TemplateFieldService } from "../../components/template/services/template-field.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private templateFieldService: TemplateFieldService) {}

  public getHighlightedTask() {
    return this.templateFieldService.getField("highlighted_task");
  }

  public setHighlightedTask(taskId: string) {
    console.log("[SET HIGHLIGHTED TASK] - ", taskId);
    return this.templateFieldService.setField("highlighted_task", taskId);
  }

  /**
   * @returns a boolean value indicating whether or not the task with taskId is the highlighted task
   */
  public checkHighlightedTask(taskId: string) {
    return taskId === this.getHighlightedTask();
  }
}

export type IProgressStatus = "notStarted" | "inProgress" | "completed";
