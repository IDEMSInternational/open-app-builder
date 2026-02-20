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

const COURSE_SUB_ITEM_ROW_TYPE = "plh_course_sub_item";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  title: coerce.string(""),
  locked: coerce.boolean(false),
  image_asset: coerce.string(""),
}));

@Component({
  selector: "plh-course-accordion",
  templateUrl: "./course-accordion.component.html",
  styleUrls: ["./course-accordion.component.scss"],
  standalone: false,
})
export class PlhCourseAccordionComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  /** The raw lesson data rows, will include lessons for all courses */
  public rawLessonDataRows = signal<any[]>([]);
  /** The lesson data rows for the current course */
  public lessonDataRows = computed(() =>
    this.dataItemRows()?.filter((row) => row.type === COURSE_SUB_ITEM_ROW_TYPE)
  );
  public lessonTotal = computed(() => this.lessonDataRows()?.length);
  public lessonCompleted = computed(
    () => this.lessonDataRows()?.filter((row) => row.parameter_list?.completed).length
  );
  public progressPercent = computed(() => {
    return Math.round((this.lessonCompleted() / this.lessonTotal()) * 100);
  });

  public isOpen = signal(true);

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

  constructor(
    public templateTranslateService: TemplateTranslateService,
    private dataItemsService: DataItemsService
  ) {
    super();

    effect(() => {
      console.log("rows", this.rows());
      console.log("dataItemRows", this.dataItemRows());
    });
  }
}
