import { Component, computed, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { debounceTime, Subscription } from "rxjs";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  course_id: coerce.string(""),
  course_data: coerce.string(""),
  lesson_data: coerce.string(""),
  lessons_title: coerce.string("Lessons"),
  locked: coerce.boolean(false),
  locked_image_asset: coerce.string(""),
}));

@Component({
  selector: "plh-course-accordion",
  templateUrl: "./course-accordion.component.html",
  styleUrls: ["./course-accordion.component.scss"],
  standalone: false,
})
export class PlhCourseAccordionComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements OnInit, OnDestroy
{
  private courseDataQuery$: Subscription;
  private lessonDataQuery$: Subscription;

  public courseDataRows = signal<any[]>([]);
  /** The raw lesson data rows, will include lessons for all courses */
  public rawLessonDataRows = signal<any[]>([]);
  /** The lesson data rows for the current course */
  public lessonDataRows = computed(() =>
    this.rawLessonDataRows().filter((row) => row.course_id === this.params().courseId)
  );

  public courseRow = computed(() =>
    this.courseDataRows().find((row) => row.id === this.params().courseId)
  );
  public courseTitle = computed(() => this.courseRow()?.title);

  public lessonTotal = computed(() => this.lessonDataRows().length);
  public lessonCompleted = computed(
    () => this.lessonDataRows().filter((row) => row.completed).length
  );
  public progressPercent = computed(() => {
    return Math.round((this.lessonCompleted() / this.lessonTotal()) * 100);
  });

  constructor(
    public templateTranslateService: TemplateTranslateService,
    private dynamicDataService: DynamicDataService
  ) {
    super();
  }

  ngOnInit() {
    if (!this.params().courseData || !this.params().lessonData) {
      return console.error("[COURSE ACCORDION] - Course and lesson data are required");
    }
    this.subscribeToCourseData();
    this.subscribeToLessonData();
  }

  private async subscribeToCourseData() {
    this.courseDataQuery$?.unsubscribe();
    this.courseDataQuery$ = await this.subscribeToData(
      this.params().courseData,
      this.courseDataRows
    );
  }

  private async subscribeToLessonData() {
    this.lessonDataQuery$?.unsubscribe();
    this.lessonDataQuery$ = await this.subscribeToData(
      this.params().lessonData,
      this.rawLessonDataRows
    );
  }

  private async subscribeToData(
    dataListName: string,
    target: WritableSignal<any[]>
  ): Promise<Subscription | undefined> {
    if (dataListName) {
      await this.dynamicDataService.ready();
      const query = this.dynamicDataService.query$("data_list", dataListName);
      return query.pipe(debounceTime(50)).subscribe((data) => {
        target.set(data);
      });
    }
  }

  ngOnDestroy() {
    this.courseDataQuery$?.unsubscribe();
    this.lessonDataQuery$?.unsubscribe();
  }
}
