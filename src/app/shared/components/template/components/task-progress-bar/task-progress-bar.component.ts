import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Signal,
  signal,
} from "@angular/core";
import { TaskService } from "src/app/shared/services/task/task.service";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { IProgressStatus } from "src/app/shared/services/task/task.service";
import { Subscription, debounceTime } from "rxjs";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { ITEM_PIPE_OPERATOR_NAMES } from "../../processors/itemPipe";
import { ItemProcessor } from "../../processors/item";
import { filterObjectByKeys } from "packages/shared/src/utils/object-utils";
import { FlowTypes } from "packages/data-models";

interface ITaskProgressBarParams {
  /**
   * TEMPLATE PARAMETER: "progress_percent".
   * Set the progress of the bar to a specific value. If provided, this will override any calculations (the task features will not be used).
   * Default null.
   */
  progressPercent?: number;
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
   * Default "completed"
   * */
  completedColumnName: string;
  /**
   * TEMPLATE PARAMETER: completed_field_column_name.
   * The name of the column in the source data list which stores the name of the completed field of each subtask.
   * The app fields corresponding to the values in this column are used to evaluate the completion of subtasks iff the
   * completed_column_name column is not present. In this case, the task progress bar will not update without a page reload.
   * Default "completed_field"
   * */
  completedFieldColumnName: string;
  /** TEMPLATE PARAMETER: "variant". Default "bar". */
  variant: "bar" | "wheel";
  /* TEMPLATE PARAMETER: "wheel_title". The wheel title that appears at the bottom */
  title?: string;
}

@Component({
  selector: "plh-task-progress-bar",
  templateUrl: "./task-progress-bar.component.html",
  styleUrls: ["./task-progress-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TmplTaskProgressBarComponent
  extends TemplateBaseComponent
  implements OnInit, OnDestroy
{
  public params: Signal<ITaskProgressBarParams> = computed(() => {
    this.inputProgressPercent(); // reactive dependency when used from parent
    return this.getParams(
      this.inputParameterList ?? (this._row != null ? this.parameterList() : undefined)
    );
  });

  @Input() dataListName: string | null;
  @Input() completedField: string | null;
  @Input() completedColumnName: string;
  @Input() highlighted: boolean | null;
  @Input() progressStatus: IProgressStatus;
  @Input() progressUnitsName: string;
  @Input() showText: boolean;
  /** When set by a parent, overrides any calculated progress (e.g. [inputProgressPercent]="progressPercent()"). */
  inputProgressPercent = input<number | null>(null);
  // Pass whole parameter list from parent component to extract any item row operations
  @Input() inputParameterList: any;
  @Output() progressStatusChange = new EventEmitter<IProgressStatus>();
  @Output() newlyCompleted = new EventEmitter<boolean>();

  dataRows = signal<any[]>([]);

  processedDataRows = computed(() => {
    const processedDataRows = this.processDataRows(this.dataRows());
    return processedDataRows;
  });

  progressPercentage = computed(() => {
    // If progress percent is authored explicitly, use it. Otherwise, calculate based on proportion of subtasks completed.
    if (this.params().progressPercent || this.params().progressPercent === 0) {
      return this.params().progressPercent;
    } else {
      const completed = this.subtasksCompleted();
      const total = this.subtasksTotal();
      if (completed === 0 || total === 0) {
        return 0;
      }
      return Math.round((completed / total) * 100);
    }
  });

  subtasksTotal = signal<number>(0);
  subtasksCompleted = signal<number>(0);
  standalone: boolean = false;
  useDynamicData: boolean;
  private dataQuery$: Subscription;
  itemRowOperations: Partial<Pick<{ [param: string]: string }, string>>;
  itemProcessor: ItemProcessor;

  /** Progress wheel variables */
  radius = 16; // Radius of the circle
  circumference = 2 * Math.PI * this.radius; // Circumference of the circle

  constructor(
    private cdr: ChangeDetectorRef,
    private dynamicDataService: DynamicDataService,
    private taskService: TaskService
  ) {
    super();
  }

  async ngOnInit() {
    const params = this.getParams();
    if (params.dataListName) {
      await this.initialiseTaskGroupData();
    }
  }

  private async initialiseTaskGroupData() {
    await this.getTaskGroupDataRows();
    this.checkAndSetUseDynamicData();
    if (this.useDynamicData) {
      this.subscribeToData();
    } else {
      this.evaluateTaskGroupData();
    }
  }

  getParams(authorParams?: FlowTypes.TemplateRow["parameter_list"]): ITaskProgressBarParams {
    // If component is being explicitly instantiated from a template, get the params from the template row
    if (this._row) {
      this.standalone = true;
      this.configureItemProcessor(this._row.parameter_list);
      return {
        dataListName: getStringParamFromTemplateRow(this._row, "task_group_data", null),
        completedField: getStringParamFromTemplateRow(this._row, "completed_field", null),
        progressUnitsName: getStringParamFromTemplateRow(
          this._row,
          "progress_units_name",
          "sections"
        ),
        showText: getBooleanParamFromTemplateRow(this._row, "show_text", false),
        completedColumnName: getStringParamFromTemplateRow(
          this._row,
          "completed_column_name",
          "completed"
        ),
        completedFieldColumnName: getStringParamFromTemplateRow(
          this._row,
          "completed_field_column_name",
          "completed_field"
        ),
        variant: getStringParamFromTemplateRow(this._row, "variant", "bar")
          .split(",")
          .join(" ") as ITaskProgressBarParams["variant"],
        title: getStringParamFromTemplateRow(this._row, "wheel_title", null),
        progressPercent: getNumberParamFromTemplateRow(this._row, "progress_percent", null),
      };
    }
    // If component is being instantiated by a parent component (e.g. task-card), use Input() values for params.
    else {
      this.configureItemProcessor(this.inputParameterList ?? {});
      return {
        dataListName: this.dataListName,
        completedField: this.completedField,
        progressUnitsName: this.progressUnitsName,
        showText: this.showText,
        completedColumnName: this.completedColumnName || "completed",
        completedFieldColumnName: "completed_field",
        variant: "bar",
        progressPercent: this.inputProgressPercent() ?? null,
      };
    }
  }

  /** Calculate stroke offset for progress circle based on completion percentage */
  getStrokeOffset(): number {
    return this.circumference * (1 - this.progressPercentage() / 100);
  }

  // Apply any item row operations, e.g. filter, if supplied to component via parameter list
  private processDataRows(dataRows: any[]) {
    if (this.itemProcessor) {
      return this.itemProcessor.pipeData(dataRows, this.itemRowOperations);
    }
    return dataRows;
  }

  private configureItemProcessor(parameterList: any) {
    const rawItemRowOperations = filterObjectByKeys(parameterList, ITEM_PIPE_OPERATOR_NAMES as any);
    if (Object.keys(rawItemRowOperations).length > 0) {
      this.itemRowOperations = this.hackParseItemRowOperationParams(rawItemRowOperations);
      this.itemProcessor = new ItemProcessor();
    }
  }

  // HACK: use `@task_item` reference in item row operations to prevent evaluation up to this point.
  // Replace with `this.item` before passing to item processor for evaluation
  private hackParseItemRowOperationParams(itemRowOperations: any) {
    for (const [name, arg] of Object.entries(itemRowOperations)) {
      if (arg && typeof arg === "string") {
        itemRowOperations[name] = arg.replaceAll("@task_item", "this.item");
      }
    }
    return itemRowOperations;
  }

  private async getTaskGroupDataRows() {
    await this.taskService.ready();
    this.dataRows.set(await this.taskService.getTaskGroupDataRows(this.params().dataListName));
  }

  private checkAndSetUseDynamicData() {
    this.useDynamicData = this.dataRows()?.[0]?.hasOwnProperty(this.params().completedColumnName);
  }

  private async evaluateTaskGroupData() {
    const previousProgressStatus = this.progressStatus;
    const { subtasksTotal, subtasksCompleted, progressStatus, newlyCompleted } =
      await this.taskService.evaluateTaskGroupData(this.processedDataRows(), {
        completedColumnName: this.params().completedColumnName,
        completedField: this.params().completedField,
        completedFieldColumnName: this.params().completedFieldColumnName,
        dataListName: this.params().dataListName,
        useDynamicData: this.useDynamicData,
      });
    this.progressStatus = progressStatus;
    this.subtasksCompleted.set(subtasksCompleted);
    this.subtasksTotal.set(subtasksTotal);

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
    if (this.params().dataListName) {
      await this.dynamicDataService.ready();
      const query = this.dynamicDataService.query$("data_list", this.params().dataListName);
      this.dataQuery$ = query.pipe(debounceTime(50)).subscribe(async (data) => {
        this.dataRows.set(data);
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
