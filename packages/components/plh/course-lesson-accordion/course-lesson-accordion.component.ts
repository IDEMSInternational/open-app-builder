import { Component, computed, effect, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map, switchMap, tap } from "rxjs";
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
      map((row) => {
        const filterContext = this.resolveFilterContext();
        const filterExpression = this.buildModuleTasksFilterExpression(filterContext);
        this.debugLog("module_tasks filter context", {
          ...filterContext,
          filterExpression,
        });
        return {
          ...row,
          type: "data_items",
          name: row.name || "module_tasks",
          value: MODULE_TASKS_DATA_LIST,
          rows: [],
          parameter_list: {
            filter: filterExpression,
            sort: MODULE_TASKS_SORT,
          },
        };
      }),
      switchMap((row) =>
        this.dataItemsService.getItemsObservable(
          row,
          this.parentContainerComponentRef.templateRowMap
        )
      ),
      tap((itemRows) => {
        this.debugLog("module_tasks query result", {
          count: itemRows?.length || 0,
          firstIds: (itemRows || []).slice(0, 5).map((item: any) => item?.id),
        });
      }),
      switchMap(async (itemRows) => {
        const textContext = await this.resolveLabelTextContext();
        this.debugLog("sub-item label text context", textContext);
        return itemRows.map((item, index) => this.toCourseSubItemRow(item, index, textContext));
      })
    )
  );

  private buildModuleTasksFilterExpression(filterContext: {
    courseIdRaw: unknown;
    courseId: unknown;
    childAgeTag: unknown;
    childAge: unknown;
    childGender: unknown;
    userRelationship: unknown;
  }) {
    const { courseId, childAgeTag, childAge, childGender, userRelationship } = filterContext;

    return [
      // If course context is missing, do not filter everything out.
      `(${this.toJsLiteral(courseId)} == null || this.item.tag_course == ${this.toJsLiteral(courseId)})`,
      `(${this.toJsLiteral(childAgeTag)} == null || !this.item.tag_list || this.item.tag_list.includes(${this.toJsLiteral(childAgeTag)}))`,
      `(${this.toJsLiteral(childAge)} == null || !this.item.age_list || this.item.age_list.includes(${this.toJsLiteral(childAge)}))`,
      `(${this.toJsLiteral(childGender)} == null || !this.item.child_gender_list || this.item.child_gender_list.includes(${this.toJsLiteral(childGender)}))`,
      `(${this.toJsLiteral(userRelationship)} == null || !this.item.caregiver_relationship_list || this.item.caregiver_relationship_list.includes(${this.toJsLiteral(userRelationship)}))`,
    ].join(" && ");
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

  private toJsLiteral(value: unknown) {
    return JSON.stringify(value);
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
