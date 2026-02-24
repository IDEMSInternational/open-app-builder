import { Component, computed, effect, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, filter, switchMap } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";
import { DataItemsService } from "src/app/shared/components/template/components/data-items/data-items.service";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { parseBoolean } from "src/app/shared/utils";

const COURSE_SUB_ITEM_ROW_TYPE = "plh_course_sub_item";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  completed: coerce.boolean(false),
  image_asset: coerce.string(""),
  locked: coerce.boolean(false),
  open: coerce.boolean(false),
  title: coerce.string(""),
  sub_items_name: coerce.string("Lessons"),
}));

@Component({
  selector: "plh-course-accordion",
  templateUrl: "./course-accordion.component.html",
  styleUrls: ["./course-accordion.component.scss"],
  standalone: false,
})
export class PlhCourseAccordionComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  /** The raw sub-item data rows, will include sub-items for all courses */
  public rawSubItemDataRows = signal<any[]>([]);
  /** The sub-item data rows for the current course */
  public subItemDataRows = computed(() =>
    this.dataItemRows()?.filter((row) => row.type === COURSE_SUB_ITEM_ROW_TYPE)
  );
  public subItemsTotal = computed(() => this.subItemDataRows()?.length);
  public subItemsCompleted = computed(
    () =>
      this.subItemDataRows()?.filter((row) => parseBoolean(row.parameter_list?.completed))
        ?.length ?? 0
  );
  public progressPercent = computed(() => {
    return Math.round((this.subItemsCompleted() / this.subItemsTotal()) * 100);
  });

  /** Mutually exclusive state: locked > completed > default */
  public state = computed<"locked" | "completed" | "default">(() => {
    const p = this.params();
    if (p.locked) return "locked";
    if (p.completed) return "completed";
    return "default";
  });

  public isOpen = signal(true);

  constructor(
    public templateTranslateService: TemplateTranslateService,
    private dataItemsService: DataItemsService
  ) {
    super();
    /** Effect to update the open state when the open parameter changes */
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
    toObservable(this.rows).pipe(
      map((rows) => rows.find((r) => r.type === "data_items")),
      filter((row) => row !== undefined),
      switchMap((row) =>
        this.dataItemsService.getItemsObservable(
          row,
          this.parentContainerComponentRef.templateRowMap
        )
      )
    )
  );
}
