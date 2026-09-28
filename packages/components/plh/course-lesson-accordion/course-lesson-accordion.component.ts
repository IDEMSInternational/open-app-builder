import { Component, computed, effect, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map, switchMap } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";
import { DataItemsService } from "src/app/shared/components/template/components/data-items/data-items.service";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { TemplateVariablesService } from "src/app/shared/components/template/services/template-variables.service";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { parseBoolean } from "src/app/shared/utils";

const MODULE_TASKS_DATA_LIST = "module_tasks";
const MODULE_TASKS_SORT = "number";
const COURSE_LESSON_DEBUG = true;

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  completed: coerce.boolean(false),
  image_asset: coerce.string(""),
  image_alignment: coerce.allowedValues(["", "bottom", "center", "centre"], "bottom"),
  locked: coerce.boolean(false),
  open: coerce.boolean(false),
  title: coerce.string(""),
  sub_items_name: coerce.string(""),
  course_id: coerce.string(""),
  completed_text: coerce.string("Completed"),
  locked_text: coerce.string("Locked"),
}));

@Component({
  selector: "plh-course-lesson-accordion",
  templateUrl: "./course-lesson-accordion.component.html",
  styleUrls: ["./course-lesson-accordion.component.scss"],
  standalone: false,
})
export class PlhCourseLessonAccordionComponent extends TemplateBaseComponentWithParams(
  AuthorSchema
) {
  public rawSubItemDataRows = signal<any[]>([]);
  public subItemDataRows = computed(() => this.dataItemRows() || []);
  public subItemsTotal = computed(() => this.subItemDataRows()?.length);
  public subItemsCompleted = computed(
    () =>
      this.subItemDataRows()?.filter((row) => parseBoolean(row.parameter_list?.completed))
        ?.length ?? 0
  );
  public progressPercent = computed(() => {
    const total = this.subItemsTotal();
    if (!total) return 0;
    return Math.round((this.subItemsCompleted() / total) * 100);
  });

  public state = computed<"locked" | "completed" | "default">(() => {
    const p = this.params();
    if (p.locked) return "locked";
    if (p.completed) return "completed";
    return "default";
  });

  public isOpen = signal(true);

  constructor(
    public templateTranslateService: TemplateTranslateService,
    private dataItemsService: DataItemsService,
    private templateVariablesService: TemplateVariablesService,
    private templateFieldService: TemplateFieldService
  ) {
    super();
    effect(() => {
      const open = this.params().open;
      if (this._lastOpenFromParams !== open) {
        this._lastOpenFromParams = open;
        this.isOpen.set(open);
      }
    });
  }

  private _lastOpenFromParams: boolean | undefined;

  toggleOpen(): void {
    if (!this.params().locked) {
      this.isOpen.update((open) => !open);
    }
  }

  private dataItemRows = toSignal(
    toObservable(this.rowSignal).pipe(
      filter((row) => row !== undefined),
      map((row) => ({
        ...row,
        type: "data_items",
        name: row.name || "module_tasks",
        value: MODULE_TASKS_DATA_LIST,
        rows: [],
        parameter_list: {},
      })),
      switchMap((row) =>
        this.dataItemsService.getItemsObservable(
          row,
          this.parentContainerComponentRef.templateRowMap
        )
      ),
      map((itemRows) => {
        const filterContext = this.resolveFilterContext();
        const filteredItems = this.filterModuleTasks(itemRows, filterContext);
        const sortedItems = this.sortModuleTasks(filteredItems);
        this.debugLog("module_tasks query result", {
          ...filterContext,
          count: sortedItems.length,
          firstIds: sortedItems.slice(0, 5).map((item: any) => item?.id),
        });
        return sortedItems;
      }),
      switchMap(async (itemRows) => {
        const textContext = await this.resolveLabelTextContext();
        this.debugLog("sub-item label text context", textContext);
        return itemRows.map((item, index) => this.toCourseSubItemRow(item, index, textContext));
      })
    )
  );

  private filterModuleTasks(
    items: any[],
    filterContext: ReturnType<PlhCourseLessonAccordionComponent["resolveFilterContext"]>
  ) {
    const { courseId, childAgeTag, childAge, childGender, userRelationship } = filterContext;

    return items.filter((item) => {
      if (courseId != null && item.tag_course !== courseId) {
        return false;
      }
      if (childAgeTag != null && item.tag_list && !item.tag_list.includes(childAgeTag)) {
        return false;
      }
      if (childAge != null && item.age_list && !item.age_list.includes(childAge)) {
        return false;
      }
      if (
        childGender != null &&
        item.child_gender_list &&
        !item.child_gender_list.includes(childGender)
      ) {
        return false;
      }
      if (
        userRelationship != null &&
        item.caregiver_relationship_list &&
        !item.caregiver_relationship_list.includes(userRelationship)
      ) {
        return false;
      }
      return true;
    });
  }

  private sortModuleTasks(items: any[]) {
    return [...items].sort((a, b) => (a[MODULE_TASKS_SORT] > b[MODULE_TASKS_SORT] ? 1 : -1));
  }

  private resolveFilterContext() {
    const courseIdRaw = this.params().courseId || this.rowSignal()?.parameter_list?.course_id;
    const courseId = this.resolveCourseId(courseIdRaw);

    return {
      courseIdRaw,
      courseId,
      childAgeTag: this.templateFieldService.getField("child_age_tag"),
      childAge: this.templateFieldService.getField("child_age"),
      childGender: this.templateFieldService.getField("child_gender"),
      userRelationship: this.templateFieldService.getField("user_relationship"),
    };
  }

  private resolveCourseId(courseIdRaw: unknown) {
    if (typeof courseIdRaw !== "string") return courseIdRaw;

    const localMatch = courseIdRaw.match(/^@local\.([a-zA-Z0-9_]+)$/);
    if (localMatch) {
      const localFieldName = localMatch[1];
      const localValue = this.rowSignal()?._evalContext?.local?.[localFieldName];
      if (localValue !== undefined) return localValue;
      return this.parentContainerComponentRef?.templateRowMap?.[localFieldName]?.value;
    }

    return courseIdRaw;
  }

  private async resolveLabelTextContext() {
    let completedText = await this.resolveDynamicString(this.params().completedText, "Completed");
    let lockedText = await this.resolveDynamicString(this.params().lockedText, "Locked");

    // If parameter parsing/evaluation falls back to defaults, use globals directly.
    if (completedText === "Completed") {
      const globalCompletedText = this.templateFieldService.getGlobal("completed_text");
      if (typeof globalCompletedText === "string" && globalCompletedText.trim() !== "") {
        completedText = globalCompletedText;
      }
    }

    if (lockedText === "Locked") {
      const globalLockedText = this.templateFieldService.getGlobal("locked_text");
      if (typeof globalLockedText === "string" && globalLockedText.trim() !== "") {
        lockedText = globalLockedText;
      }
    }

    return { completedText, lockedText };
  }

  private async resolveDynamicString(value: unknown, fallback: string) {
    if (typeof value !== "string" || value.trim() === "") {
      return fallback;
    }
    try {
      const evaluated = await this.templateVariablesService.evaluateConditionString(value);
      if (typeof evaluated === "string" && evaluated.startsWith("@")) {
        return fallback;
      }
      return typeof evaluated === "string" && evaluated.trim() !== "" ? evaluated : fallback;
    } catch {
      return fallback;
    }
  }

  private toCourseSubItemRow(
    item: any,
    index: number,
    textContext: { completedText: string; lockedText: string }
  ) {
    const courseId = this.resolveCourseId(
      this.params().courseId || this.rowSignal()?.parameter_list?.course_id
    );
    const isCompleted = !!item?.completed_ts || !!item?.completed;
    const itemId = item?.id || index;
    const templateName = isCompleted
      ? `module_landing_${itemId}`
      : `stack_module_${itemId}_start_at_id`;
    const { completedText, lockedText } = textContext;

    return {
      type: "plh_course_sub_item",
      name: `module_task_${itemId}`,
      _nested_name: `${this.rowSignal()?._nested_name || "plh_course_lesson_accordion"}.module_task_${itemId}`,
      value: item?.title || "",
      parameter_list: {
        title: item?.title || "",
        completed: isCompleted,
        locked: this.params().locked,
        completed_text: completedText,
        locked_text: lockedText,
        highlighted: !!item?.started_ts,
      },
      action_list: isCompleted
        ? [
            {
              trigger: "click",
              action_id: "go_to",
              args: [templateName],
              _raw: `click | go_to: ${templateName}`,
            },
            {
              trigger: "click",
              action_id: "set_field",
              args: ["last_opened", courseId],
              _raw: `click | set_field: last_opened : ${courseId}`,
            },
          ]
        : [
            {
              trigger: "click",
              action_id: "set_field",
              args: ["current_start_article_id", "uncomplete"],
              _raw: "click | set_field: current_start_article_id: uncomplete",
            },
            {
              trigger: "click",
              action_id: "nav_stack",
              args: ["open"],
              params: {
                template: templateName,
                header: false,
              },
              _raw: `click | nav_stack: open | template: ${templateName}, header: false`,
            },
            {
              trigger: "click",
              action_id: "set_field",
              args: ["last_opened", courseId],
              _raw: `click | set_field: last_opened : ${courseId}`,
            },
          ],
    };
  }

  private debugLog(message: string, details: Record<string, unknown> = {}) {
    if (!COURSE_LESSON_DEBUG) return;
    console.debug(`[CourseLessonAccordion] ${message}`, {
      timestamp: new Date().toISOString(),
      ...details,
    });
  }
}
