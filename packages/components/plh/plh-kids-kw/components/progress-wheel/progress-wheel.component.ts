import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { getStringParamFromTemplateRow, getNumberParamFromTemplateRow } from "src/app/shared/utils";

interface IProgressWheelParams {
  /* TEMPLATE PARAMETER: task_total. The sum total of all tasks to be tracked */
  taskTotal: number;
  /* TEMPLATE PARAMETER: title. The wheel title that appears at the bottom */
  title?: string;
  /* TEMPLATE PARAMETER: task_progress. The number of tasks marked as completed tasks */
  taskProgress: number;
}

@Component({
  selector: "plh-progress-wheel",
  templateUrl: "./progress-wheel.component.html",
  styleUrls: ["./progress-wheel.component.scss"],
})
export class PlhProgressWheelComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IProgressWheelParams> = {};

  ngOnInit() {
    this.getParams();
  }

  radius = 16; // Radius of the circle
  circumference = 2 * Math.PI * this.radius; // Circumference of the circle
  percentage: number;

  // Calculate stroke offset based on progress
  getStrokeOffset(): number {
    this.percentage =
      this.params.taskProgress < this.params.taskTotal
        ? this.params.taskProgress / this.params.taskTotal
        : 100;
    return this.circumference * (1 - this.percentage);
  }

  private getParams() {
    this.params.title = getStringParamFromTemplateRow(this._row, "title", null);
    this.params.taskTotal = getNumberParamFromTemplateRow(this._row, "task_total", null);
    this.params.taskProgress = getNumberParamFromTemplateRow(this._row, "task_progress", null);
  }
}
