import { FlowTypes } from "packages/data-models";

export const MODULE_TASKS_DATA_LIST = "module_tasks";
export const COURSES_DATA_LIST = "courses";

export type IModuleTaskFilterFields = {
  child_age_tag: unknown;
  child_age: unknown;
  child_gender: unknown;
  user_gender: unknown;
  user_relationship: unknown;
};

export type IResolvedUpNextValue = {
  course_id?: string;
  course_title?: string;
  module_id?: string;
  module_title?: string;
};

export type IUpNextValue = IResolvedUpNextValue & {
  check_complete: boolean;
};

export type IUpNextResolution = {
  value: IResolvedUpNextValue;
  task: FlowTypes.Data_listRow;
};

/** Resolve up-next from module tasks, enrich with course title, ready for publishing. */
export function resolveUpNextValue(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields,
  courses: FlowTypes.Data_listRow[]
): IUpNextResolution | undefined {
  const resolution = resolveUpNext(tasks, fields);
  if (!resolution) {
    return undefined;
  }

  return {
    ...resolution,
    value: withCourseTitle(resolution.value, courses),
  };
}

export function toSettledValue(resolved?: IResolvedUpNextValue): IUpNextValue {
  if (!resolved) {
    return { check_complete: true };
  }

  return { ...resolved, check_complete: true };
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
    return resolveFromLastCompleted(tasks, fields, lastCompleted);
  }

  const firstItem = getFirstItem(tasks, fields);
  if (firstItem) {
    return { task: firstItem, value: toModuleTaskValue(firstItem) };
  }

  return undefined;
}

function resolveFromLastCompleted(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields,
  lastCompleted: FlowTypes.Data_listRow
): IUpNextResolution {
  const nextInModule = getNextInModule(tasks, fields, lastCompleted.tag_course);
  if (!nextInModule) {
    return { task: lastCompleted, value: { course_id: lastCompleted.tag_course } };
  }

  return {
    task: lastCompleted,
    value: {
      course_id: lastCompleted.tag_course,
      module_id: nextInModule.id,
      module_title: nextInModule.title,
    },
  };
}

function checkForInProgress(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields
): FlowTypes.Data_listRow | undefined {
  return pickTask(
    tasks,
    (task) => !!task.last_accessed_ts && !task.completed_ts && matchesModuleTaskLists(task, fields),
    sortByNumberDesc("last_accessed_ts")
  );
}

function checkForLastCompleted(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields
): FlowTypes.Data_listRow | undefined {
  return pickTask(
    tasks,
    (task) => !!task.completed_ts && matchesModuleTaskLists(task, fields),
    sortByNumberDesc("completed_ts")
  );
}

function getNextInModule(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields,
  courseId: unknown
): FlowTypes.Data_listRow | undefined {
  return pickIncompleteTask(tasks, fields, courseId);
}

function getFirstItem(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields
): FlowTypes.Data_listRow | undefined {
  return pickIncompleteTask(tasks, fields);
}

function pickIncompleteTask(
  tasks: FlowTypes.Data_listRow[],
  fields: IModuleTaskFilterFields,
  courseId?: unknown
): FlowTypes.Data_listRow | undefined {
  return pickTask(
    tasks,
    (task) =>
      !task.completed_ts &&
      matchesModuleTaskLists(task, fields) &&
      (courseId === undefined || task.tag_course == courseId),
    sortByNumberAsc("number")
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

function pickTask(
  tasks: FlowTypes.Data_listRow[],
  predicate: (task: FlowTypes.Data_listRow) => boolean,
  sort: (a: FlowTypes.Data_listRow, b: FlowTypes.Data_listRow) => number
): FlowTypes.Data_listRow | undefined {
  return tasks.filter(predicate).sort(sort)[0];
}

function sortByNumberDesc(field: string) {
  return (a: FlowTypes.Data_listRow, b: FlowTypes.Data_listRow) =>
    Number(b[field]) - Number(a[field]);
}

function sortByNumberAsc(field: string) {
  return (a: FlowTypes.Data_listRow, b: FlowTypes.Data_listRow) =>
    Number(a[field]) - Number(b[field]);
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

function listIncludesOrUnset(list: unknown, value: unknown): boolean {
  if (!list) return true;
  return Array.isArray(list) && list.includes(value);
}
