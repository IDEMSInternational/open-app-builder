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
const COURSES_DATA_LIST = "courses";

type IModuleTaskFilterFields = {
  child_age_tag: unknown;
  child_age: unknown;
  child_gender: unknown;
  user_gender: unknown;
  user_relationship: unknown;
};

type IResolvedUpNextValue = {
  course_id?: string;
  course_title?: string;
  module_id?: string;
  module_title?: string;
};

type IUpNextValue = IResolvedUpNextValue & {
  check_complete: boolean;
};

type IUpNextResolution = {
  value: IResolvedUpNextValue;
  task: FlowTypes.Data_listRow;
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

  private courses = toSignal(
    this.dynamicDataService.query$<FlowTypes.Data_listRow>("data_list", COURSES_DATA_LIST),
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

  upNext = computed(() => resolveUpNext(this.moduleTasks(), this.filterFields()));

  upNextValue = computed(() => {
    const upNext = this.upNext();
    if (!upNext) return undefined;
    return withCourseTitle(upNext.value, this.courses());
  });

  upNextTask = computed(() => this.upNext()?.task);

  constructor() {
    super();
    this.shouldShow.set(false);
    effect((onCleanup) => {
      this.moduleTasks();
      this.filterFields();
      this.courses();
      const resolved = this.upNextValue();

      if (!this.parent) return;

      let cancelled = false;
      onCleanup(() => {
        cancelled = true;
      });

      void this.setValueIfChanged({ check_complete: false });

      queueMicrotask(() => {
        if (cancelled) return;

        if (!resolved) {
          console.log("no in progress ATM");
        }

        void this.setValueIfChanged(toSettledValue(resolved));
      });
    });
  }

  private setValueIfChanged(value: IUpNextValue) {
    if (!isEqual(value, this._row?.value)) {
      void this.setValue(value);
    }
  }
}

function resolveUpNext(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields
): IUpNextResolution | undefined {
  const inProgress = checkForInProgress(tasks, fields);
  if (inProgress) {
    return { task: inProgress, value: toModuleTaskValue(inProgress) };
  }

  const lastCompleted = checkForLastCompleted(tasks, fields);
  if (lastCompleted) {
    const nextInModule = getNextInModule(tasks, fields, lastCompleted.tag_course);
    if (nextInModule) {
      return {
        task: lastCompleted,
        value: {
          course_id: lastCompleted.tag_course,
          module_id: nextInModule.id,
          module_title: nextInModule.title,
        },
      };
    }

    return { task: lastCompleted, value: { course_id: lastCompleted.tag_course } };
  }

  const firstItem = getFirstItem(tasks, fields);
  if (firstItem) {
    return { task: firstItem, value: toModuleTaskValue(firstItem) };
  }

  return undefined;
}

function checkForInProgress(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields
): FlowTypes.Data_listRow | undefined {
  return pickTask(
    tasks,
    (task) => !!task.last_accessed_ts && !task.completed_ts && matchesModuleTaskLists(task, fields),
    (a, b) => Number(b.last_accessed_ts) - Number(a.last_accessed_ts)
  );
}

function checkForLastCompleted(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields
): FlowTypes.Data_listRow | undefined {
  return pickTask(
    tasks,
    (task) => !!task.completed_ts && matchesModuleTaskLists(task, fields),
    (a, b) => Number(b.completed_ts) - Number(a.completed_ts)
  );
}

function getNextInModule(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields,
  courseId: unknown
): FlowTypes.Data_listRow | undefined {
  return pickTask(
    tasks,
    (task) =>
      !task.completed_ts && task.tag_course == courseId && matchesModuleTaskLists(task, fields),
    (a, b) => Number(a.number) - Number(b.number)
  );
}

function getFirstItem(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields
): FlowTypes.Data_listRow | undefined {
  return pickTask(
    tasks,
    (task) => !task.completed_ts && matchesModuleTaskLists(task, fields),
    (a, b) => Number(a.number) - Number(b.number)
  );
}

function toModuleTaskValue(row: FlowTypes.Data_listRow): IResolvedUpNextValue {
  return {
    module_id: row.id,
    module_title: row.title,
    course_id: row.tag_course,
  };
}

function withCourseTitle(
  value: IResolvedUpNextValue,
  courses: FlowTypes.Data_listRow[]
): IResolvedUpNextValue {
  if (!value.course_id) {
    return value;
  }

  const course = courses.find((row) => row.id === value.course_id);
  if (!course?.title) {
    return value;
  }

  return { ...value, course_title: course.title };
}

function toSettledValue(resolved?: IResolvedUpNextValue): IUpNextValue {
  if (!resolved) {
    return { check_complete: true };
  }

  return { ...resolved, check_complete: true };
}

function pickTask(
  tasks: FlowTypes.Data_listRow[],
  predicate: (task: FlowTypes.Data_listRow) => boolean,
  sort: (a: FlowTypes.Data_listRow, b: FlowTypes.Data_listRow) => number
): FlowTypes.Data_listRow | undefined {
  const matches = tasks.filter(predicate).sort(sort);
  return matches[0];
}

function matchesModuleTaskLists(
  task: FlowTypes.Data_listRow,
  fields: IModuleTaskFilterFields
): boolean {
  return (
    listIncludesOrUnset(task.tag_list, fields.child_age_tag) &&
    listIncludesOrUnset(task.age_list, fields.child_age) &&
    listIncludesOrUnset(task.child_gender_list, fields.child_gender) &&
    listIncludesOrUnset(task.user_gender_list, fields.user_gender) &&
    listIncludesOrUnset(task.caregiver_relationship_list, fields.user_relationship)
  );
}

/** Pass when the list is unset; otherwise require the value to be included. */
function listIncludesOrUnset(list: unknown, value: unknown): boolean {
  if (!list) return true;
  return Array.isArray(list) && list.includes(value);
}
