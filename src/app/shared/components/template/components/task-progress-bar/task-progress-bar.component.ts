import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { TaskService } from "src/app/shared/services/task/task.service";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { IProgressStatus } from "src/app/shared/services/task/task.service";
import { Subscription, debounceTime } from "rxjs";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";

interface ITaskProgressBarParams {
  /**
   * TEMPLATE PARAMETER: task_group_data.
   * The name of the task group to track the progress of (through the completion of its subtasks)
   */
  dataListName: string;
  /**
   * TEMPLATE PARAMETER: completed_field.
   * The name of the field that stores the completion status of the task group
   */
  completedField: string;
  /**
   * TEMPLATE PARAMETER: progress_units_name.
   * The displayed name of the units of progress associated with
   * the constituent tasks of the task group.
   * Default "sections"
   */
  progressUnitsName: string;
  /**
   * TEMPLATE PARAMETER: show_text.
   * Show the text associated with progress bar, e.g. "8 sections"
   * Default false
   */
  showText: boolean;
  /**
   * TEMPLATE PARAMETER: completed_column_name.
   * The name of the column in the source data list that tracks the completed value of each subtask.
   * If there is no column with this name, the component will look for a column matching completed_field_column_name,
   * and use the corresponding app fields to track the completion status of subtasks.
   * Deafult "completed"
   * */
  completedColumnName: string;
  /**
   * TEMPLATE PARAMETER: completed_field_column_name.
   * The name of the column in the source data list which stores the name of the completed field of each subtask.
   * The app fields corresponding to the values in this column are used to evaluate the completion of subtasks iff the
   * completed_column_name column is not present. In this case, the task progress bar will not update without a page reload.
   * Deafult "completed_field"
   * */
  completedFieldColumnName: string;
}

@Component({
  selector: "plh-task-progress-bar",
  templateUrl: "./task-progress-bar.component.html",
  styleUrls: ["./task-progress-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TmplTaskProgressBarComponent
  extends TemplateBaseComponent
  implements OnInit, OnDestroy
{
  @Input() dataListName: string | null;
  @Input() completedField: string | null;
  @Input() highlighted: boolean | null;
  @Input() progressStatus: IProgressStatus;
  @Input() progressUnitsName: string;
  @Input() showText: boolean;
  @Output() progressStatusChange = new EventEmitter<IProgressStatus>();
  @Output() newlyCompleted = new EventEmitter<boolean>();
  params: Partial<ITaskProgressBarParams> = {};
  dataRows: any[];
  subtasksTotal: number;
  subtasksCompleted: number;
  standalone: boolean = false;
  useDynamicData: boolean;
  private dataQuery$: Subscription;

  constructor(
    private cdr: ChangeDetectorRef,
    private dynamicDataService: DynamicDataService,
    private taskService: TaskService
  ) {
    super();
  }

  async ngOnInit() {
    this.getParams();
    await this.getTaskGroupDataRows();
    this.checkAndSetUseDynamicData();
    if (this.useDynamicData) {
      this.subscribeToData();
    } else {
      this.evaluateTaskGroupData();
    }
  }

  getParams() {
    // If component is being explicitly instantiated from a template, get the params from the template row
    if (this._row) {
      this.standalone = true;
      this.params.dataListName = getStringParamFromTemplateRow(this._row, "task_group_data", null);
      this.params.completedField = getStringParamFromTemplateRow(
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
      this.params.completedColumnName = getStringParamFromTemplateRow(
        this._row,
        "completed_column_name",
        "completed"
      );
      this.params.completedFieldColumnName = getStringParamFromTemplateRow(
        this._row,
        "completed_field_column_name",
        "completed_field"
      );
    }
    // If component is being instantiated by a parent component (e.g. task-card), use Input() values for params.
    else {
      this.params.dataListName = this.dataListName;
      this.params.completedField = this.completedField;
      this.params.progressUnitsName = this.progressUnitsName;
      this.params.showText = this.showText;
      this.params.completedColumnName = "completed";
      this.params.completedFieldColumnName = "completed_field";
    }
  }

  get progressPercentage() {
    return (this.subtasksCompleted / this.subtasksTotal) * 100;
  }

  private async getTaskGroupDataRows() {
    await this.taskService.ready();
    this.dataRows = await this.taskService.getTaskGroupDataRows(this.params.dataListName);
  }

  private checkAndSetUseDynamicData() {
    this.useDynamicData = this.dataRows?.[0]?.hasOwnProperty(this.params.completedColumnName);
  }

  private async evaluateTaskGroupData() {
    const previousProgressStatus = this.progressStatus;
    const { subtasksTotal, subtasksCompleted, progressStatus, newlyCompleted } =
      await this.taskService.evaluateTaskGroupData(this.dataRows, {
        completedColumnName: this.params.completedColumnName,
        completedField: this.params.completedField,
        completedFieldColumnName: this.params.completedFieldColumnName,
        dataListName: this.params.dataListName,
        useDynamicData: this.useDynamicData,
      });
    this.progressStatus = progressStatus;
    this.subtasksCompleted = subtasksCompleted;
    this.subtasksTotal = subtasksTotal;

    if (previousProgressStatus !== this.progressStatus)
      this.progressStatusChange.emit(this.progressStatus);
    if (newlyCompleted) this.newlyCompleted.emit(true);

    this.cdr.markForCheck();
  }

  // Adapted from data-items component
  private async subscribeToData() {
    if (this.dataQuery$) {
      this.dataQuery$.unsubscribe();
    }
    if (this.params.dataListName) {
      await this.dynamicDataService.ready();
      const query = await this.dynamicDataService.query$("data_list", this.params.dataListName);
      this.dataQuery$ = query.pipe(debounceTime(50)).subscribe(async (data) => {
        this.dataRows = data;
        await this.evaluateTaskGroupData();
      });
    }
  }

  ngOnDestroy() {
    if (this.dataQuery$) {
      this.dataQuery$.unsubscribe();
    }
  }
}
