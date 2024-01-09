import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { TaskService } from "src/app/shared/services/task/task.service";
import {
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { TemplateFieldService } from "../../services/template-field.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { IProgressStatus } from "src/app/shared/services/task/task.service";
import { CampaignService } from "src/app/feature/campaign/campaign.service";
import { Subscription, debounceTime } from "rxjs";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";

interface ITaskProgressBarParams {
  /**
   * TEMPLATE PARAMETER: task_group_data.
   * The name of the task group to track the progress of (through the completion of its subtasks)
   */
  taskGroupDataList: string;
  /**
   * TEMPLATE PARAMETER: completed_field.
   * The name of the field that stores the completion status of the task group
   */
  taskGroupCompletedField: string;
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
   * TEMPLATE PARAMETER: variant.
   * A list of named style variants of the component, separated by spaces or commas.
   * */
  variant: "green" | "secondary";
  /**
   * TEMPLATE PARAMETER: dynamic.
   * Specify whether to use the dynamic data feature:
   * Should be true if the task_group_data has a "completed" column,
   * else should be false if the task_group_data has a "completed_field" column
   * */
  useDynamicData: boolean;
}

@Component({
  selector: "plh-task-progress-bar",
  templateUrl: "./task-progress-bar.component.html",
  styleUrls: ["./task-progress-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TmplTaskProgressBarComponent extends TemplateBaseComponent implements OnInit {
  @Input() taskGroupDataList: string | null;
  @Input() taskGroupCompletedField: string | null;
  @Input() highlighted: boolean | null;
  @Input() progressStatus: IProgressStatus;
  @Input() progressUnitsName: string;
  @Input() showText: boolean;
  @Output() progressStatusChange = new EventEmitter<IProgressStatus>();
  @Output() newlyCompleted = new EventEmitter<boolean>();
  params: Partial<ITaskProgressBarParams> = {};
  subtasksTotal: number;
  subtasksCompleted: number;
  private dataQuery$: Subscription;

  constructor(
    private taskService: TaskService,
    private templateFieldService: TemplateFieldService,
    private appDataService: AppDataService,
    private campaignService: CampaignService,
    private cdr: ChangeDetectorRef,
    private dynamicDataService: DynamicDataService
  ) {
    super();
  }

  async ngOnInit() {
    this.getParams();
    if (this.params.useDynamicData) {
      this.subscribeToData();
    } else {
      const taskGroupDataRows = await this.getTaskGroupDataRows();
      this.evaluateTaskGroupData(taskGroupDataRows);
    }
  }

  getParams() {
    // If component is being explicitly instantiated from a template, get the params from the template row
    if (this._row) {
      this.params.taskGroupDataList = getStringParamFromTemplateRow(
        this._row,
        "task_group_data",
        null
      );
      this.params.taskGroupCompletedField = getStringParamFromTemplateRow(
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
      this.params.useDynamicData = getBooleanParamFromTemplateRow(this._row, "dynamic", false);
      this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
        .split(",")
        .join(" ") as ITaskProgressBarParams["variant"];
    }
    // If component is being instantiated by a parent component (e.g. task-card), use Input() values for params.
    else {
      this.params.taskGroupDataList = this.taskGroupDataList;
      this.params.taskGroupCompletedField = this.taskGroupCompletedField;
      this.params.progressUnitsName = this.progressUnitsName;
      this.params.showText = this.showText;
    }
  }

  get progressPercentage() {
    return (this.subtasksCompleted / this.subtasksTotal) * 100;
  }

  async getTaskGroupDataRows() {
    const dataList = await this.appDataService.getSheet("data_list", this.params.taskGroupDataList);
    return dataList?.rows;
  }

  /**
   * Fetch the completion status for each subtask of the task group
   * and calculate the task group's completion percentage to display.
   * Task group data lists can store their completion status in one of two ways:
   * 1. A "completed_field" column, referencing a field that stores the completion status
   * 2. A "completed" column, with values updated dynamically
   * @param dataRows The data rows of the task group
   */
  async evaluateTaskGroupData(dataRows: any[]) {
    const subtasks = dataRows || [];
    this.subtasksTotal = subtasks.length;
    this.subtasksCompleted = subtasks.filter((task) => {
      if (this.params.useDynamicData) {
        return task.completed;
      } else {
        return this.templateFieldService.getField(task.completed_field);
      }
    }).length;
    if (this.subtasksCompleted === this.subtasksTotal) {
      this.progressStatus = "completed";
      this.progressStatusChange.emit(this.progressStatus);
      // Check whether task group has already been completed
      if (this.templateFieldService.getField(this.params.taskGroupCompletedField) !== true) {
        // If not, set completed field to "true"
        await this.setTaskGroupCompletedStatus(true);
        this.newlyCompleted.emit(true);
      }
    } else {
      await this.setTaskGroupCompletedStatus(false);
      if (this.subtasksCompleted) {
        this.progressStatus = "inProgress";
        this.progressStatusChange.emit(this.progressStatus);
      }
    }
    const { previousHighlightedTaskGroup, newHighlightedTaskGroup } =
      this.taskService.evaluateHighlightedTaskGroup();
    // HACK - reschedule campaign notifications when the highlighted task group has changed,
    // in order to handle any that are conditional on the highlighted task group
    if (previousHighlightedTaskGroup !== newHighlightedTaskGroup) {
      this.campaignService.scheduleCampaignNotifications();
    }
    this.cdr.markForCheck();
  }

  async setTaskGroupCompletedStatus(isCompleted: boolean) {
    console.log(`Setting ${this.params.taskGroupCompletedField} to ${isCompleted}`);
    await this.templateFieldService.setField(this.params.taskGroupCompletedField, `${isCompleted}`);
  }

  // Adapted from data-items component
  private async subscribeToData() {
    if (this.dataQuery$) {
      this.dataQuery$.unsubscribe();
    }
    if (this.params.taskGroupDataList) {
      await this.dynamicDataService.ready();
      const query = await this.dynamicDataService.query$(
        "data_list",
        this.params.taskGroupDataList
      );
      this.dataQuery$ = query.pipe(debounceTime(50)).subscribe(async (data) => {
        await this.evaluateTaskGroupData(data);
      });
    }
  }
}
