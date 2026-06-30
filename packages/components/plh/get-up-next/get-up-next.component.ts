import { ChangeDetectionStrategy, Component, computed, effect, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FlowTypes } from "packages/data-models";
import { isEqual } from "packages/shared/src/utils/object-utils";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";

const MODULE_TASKS_DATA_LIST = "module_tasks";

type IModuleTaskFilterFields = {
  child_age_tag: unknown;
  child_age: unknown;
  child_gender: unknown;
  user_gender: unknown;
  user_relationship: unknown;
};

type IUpNextValue = {
  module_id: string;
  module_title: string;
  course_id: string;
};

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({}));

@Component({
  selector: "plh-get-up-next",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PlhGetUpNextComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  private dynamicDataService = inject(DynamicDataService);
  private templateFieldService = inject(TemplateFieldService);

  private moduleTasks = toSignal(
    this.dynamicDataService.query$<FlowTypes.Data_listRow>("data_list", MODULE_TASKS_DATA_LIST),
    { initialValue: [] as FlowTypes.Data_listRow[] }
  );

  /** Contact fields referenced by module task checks. */
  private filterFields = computed<IModuleTaskFilterFields>(() => ({
    child_age_tag: this.templateFieldService.getField("child_age_tag", false),
    child_age: this.templateFieldService.getField("child_age", false),
    child_gender: this.templateFieldService.getField("child_gender", false),
    user_gender: this.templateFieldService.getField("user_gender", false),
    user_relationship: this.templateFieldService.getField("user_relationship", false),
  }));

  /** Resolved module task for "up next", if any check finds a match. */
  upNextTask = computed(() => resolveUpNextTask(this.moduleTasks(), this.filterFields()));

  constructor() {
    super();
    this.shouldShow.set(false);
    effect(() => {
      const nextTask = this.upNextTask();
      if (!this.parent) return;

      if (nextTask) {
        const value = toUpNextValue(nextTask);
        if (!isEqual(value, this._row?.value)) {
          void this.setValue(value);
        }
        return;
      }

      console.log("no in progress ATM");
    });
  }
}

function resolveUpNextTask(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields
): FlowTypes.Data_listRow | undefined {
  return checkForInProgress(tasks, fields);
  // Add further checks here when no in-progress task is found.
}

function checkForInProgress(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields
): FlowTypes.Data_listRow | undefined {
  return tasks
    .filter((task) => matchesInProgressModuleTask(task, fields))
    .sort((a, b) => Number(b.last_accessed_ts) - Number(a.last_accessed_ts))[0];
}

function matchesInProgressModuleTask(
  task: FlowTypes.Data_listRow,
  fields: IModuleTaskFilterFields
): boolean {
  if (!task.last_accessed_ts || task.completed_ts) {
    return false;
  }

  return (
    listIncludesOrUnset(task.tag_list, fields.child_age_tag) &&
    listIncludesOrUnset(task.age_list, fields.child_age) &&
    listIncludesOrUnset(task.child_gender_list, fields.child_gender) &&
    listIncludesOrUnset(task.user_gender_list, fields.user_gender) &&
    listIncludesOrUnset(task.caregiver_relationship_list, fields.user_relationship)
  );
}

function toUpNextValue(row: FlowTypes.Data_listRow): IUpNextValue {
  return {
    module_id: row.id,
    module_title: row.title,
    course_id: row.tag_course,
  };
}

/** Pass when the list is unset; otherwise require the value to be included. */
function listIncludesOrUnset(list: unknown, value: unknown): boolean {
  if (!list) return true;
  return Array.isArray(list) && list.includes(value);
}
