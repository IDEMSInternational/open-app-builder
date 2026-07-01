import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { of, BehaviorSubject } from "rxjs";

import { PlhGetUpNextComponent } from "./get-up-next.component";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { MockTemplateFieldService } from "src/app/shared/components/template/services/template-field.service.spec";

describe("PlhGetUpNextComponent", () => {
  let component: PlhGetUpNextComponent;
  let fixture: ComponentFixture<PlhGetUpNextComponent>;
  let mockDynamicDataService: jasmine.SpyObj<DynamicDataService>;
  let mockTemplateFieldService: MockTemplateFieldService;

  const defaultFields = {
    child_age_tag: "age_5_9",
    child_age: "7",
    child_gender: "female",
    user_gender: "female",
    user_relationship: "mother",
  };

  async function flushSettledValue() {
    await fixture.whenStable();
    await Promise.resolve();
  }

  function expectSettledValue(value: Record<string, unknown>) {
    expect(component.setValue).toHaveBeenCalledWith({ check_complete: false });
    expect(component.setValue).toHaveBeenCalledWith({ check_complete: true, ...value });
  }

  function createComponent(
    tasks: Record<string, unknown>[] = [],
    courses: Record<string, unknown>[] = []
  ) {
    mockDynamicDataService.query$.and.callFake((_flowType: string, listName: string) => {
      if (listName === "module_tasks") return of(tasks);
      if (listName === "courses") return of(courses);
      return of([]);
    });
    fixture = TestBed.createComponent(PlhGetUpNextComponent);
    component = fixture.componentInstance;
    component.parent = {
      handleActions: jasmine.createSpy("handleActions").and.resolveTo(undefined),
    } as any;
    component.row = {
      name: "get_up_next",
      _nested_name: "get_up_next",
      type: "plh_get_up_next",
      value: null,
    } as any;
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(() => {
    mockDynamicDataService = jasmine.createSpyObj("DynamicDataService", ["query$"]);
    mockDynamicDataService.query$.and.returnValue(of([]));
    mockTemplateFieldService = new MockTemplateFieldService(defaultFields);

    TestBed.configureTestingModule({
      declarations: [PlhGetUpNextComponent],
      providers: [
        { provide: DynamicDataService, useValue: mockDynamicDataService },
        { provide: TemplateFieldService, useValue: mockTemplateFieldService },
      ],
    }).compileComponents();

    createComponent();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not render visible UI", () => {
    expect(component.shouldShow()).toBe(false);
  });

  it("should subscribe to the module_tasks and courses data lists", () => {
    expect(mockDynamicDataService.query$).toHaveBeenCalledWith("data_list", "module_tasks");
    expect(mockDynamicDataService.query$).toHaveBeenCalledWith("data_list", "courses");
  });

  it("should return the most recently accessed in-progress task from checkForInProgress", () => {
    createComponent([
      {
        id: "completed",
        last_accessed_ts: 3,
        completed_ts: 1,
        tag_list: ["age_5_9"],
      },
      {
        id: "not_started",
        tag_list: ["age_5_9"],
      },
      {
        id: "older",
        last_accessed_ts: 1,
        tag_list: ["age_5_9"],
      },
      {
        id: "newer",
        last_accessed_ts: 2,
        tag_list: ["age_5_9"],
      },
      {
        id: "wrong_tag",
        last_accessed_ts: 4,
        tag_list: ["age_10_14"],
      },
    ]);

    expect(component.upNextTask()?.id).toBe("newer");
  });

  it("should allow tasks when optional list fields are empty", () => {
    createComponent([
      {
        id: "matches",
        last_accessed_ts: 1,
      },
    ]);

    expect(component.upNextTask()?.id).toBe("matches");
  });

  it("should return the most recently completed task when none are in progress", () => {
    createComponent([
      {
        id: "older_completed",
        completed_ts: 1,
        tag_list: ["age_5_9"],
      },
      {
        id: "newer_completed",
        completed_ts: 2,
        tag_list: ["age_5_9"],
      },
      {
        id: "not_started",
        tag_list: ["age_5_9"],
      },
    ]);

    expect(component.upNextTask()?.id).toBe("newer_completed");
  });

  it("should prefer an in-progress task over a completed task", () => {
    createComponent([
      {
        id: "completed",
        completed_ts: 99,
        tag_list: ["age_5_9"],
      },
      {
        id: "in_progress",
        last_accessed_ts: 1,
        tag_list: ["age_5_9"],
      },
    ]);

    expect(component.upNextTask()?.id).toBe("in_progress");
  });

  it("should set the component value from the first in-progress task", async () => {
    spyOn(component, "setValue").and.resolveTo();

    createComponent(
      [
        {
          id: "older",
          title: "Older module",
          tag_course: "course_a",
          last_accessed_ts: 1,
          tag_list: ["age_5_9"],
        },
        {
          id: "newer",
          title: "Newer module",
          tag_course: "course_b",
          last_accessed_ts: 2,
          tag_list: ["age_5_9"],
        },
      ],
      [{ id: "course_b", title: "Course B" }]
    );

    await flushSettledValue();

    expectSettledValue({
      module_id: "newer",
      module_title: "Newer module",
      course_id: "course_b",
      course_title: "Course B",
    });
  });

  it("should fall through to getFirstItem when the last completed course has no following module", async () => {
    spyOn(component, "setValue").and.resolveTo();

    createComponent(
      [
        {
          id: "i_calm_c",
          title: "Mantener la calma cuando hay estrés",
          tag_course: "relation_c",
          number: 3,
          completed_ts: 100,
          tag_list: ["age_5_9"],
        },
        {
          id: "first_mood",
          title: "First mood module",
          tag_course: "mood_c",
          number: 1,
          tag_list: ["age_5_9"],
        },
      ],
      [
        { id: "relation_c", title: "Mejorar la relación con mi niña o niño" },
        { id: "mood_c", title: "Mood course" },
      ]
    );

    await flushSettledValue();

    expect(component.upNextTask()?.id).toBe("first_mood");
    expectSettledValue({
      course_id: "mood_c",
      course_title: "Mood course",
      module_id: "first_mood",
      module_title: "First mood module",
    });
  });

  it("should settle with no up-next when all modules are complete", async () => {
    spyOn(component, "setValue").and.resolveTo();

    createComponent(
      [
        {
          id: "older_completed",
          title: "Older module",
          tag_course: "course_a",
          completed_ts: 1,
          tag_list: ["age_5_9"],
        },
        {
          id: "newer_completed",
          title: "Newer module",
          tag_course: "course_b",
          completed_ts: 2,
          tag_list: ["age_5_9"],
        },
      ],
      [{ id: "course_b", title: "Course B" }]
    );

    await flushSettledValue();

    expectSettledValue({});
  });

  it("should set course_id and the next incomplete module in the same course after last completed", async () => {
    spyOn(component, "setValue").and.resolveTo();

    createComponent(
      [
        {
          id: "older_completed",
          title: "Older module",
          tag_course: "course_b",
          completed_ts: 1,
          tag_list: ["age_5_9"],
        },
        {
          id: "newer_completed",
          title: "Newer module",
          tag_course: "course_b",
          completed_ts: 2,
          tag_list: ["age_5_9"],
        },
        {
          id: "next_module",
          title: "Next module",
          tag_course: "course_b",
          number: 2,
          tag_list: ["age_5_9"],
        },
        {
          id: "later_module",
          title: "Later module",
          tag_course: "course_b",
          number: 3,
          tag_list: ["age_5_9"],
        },
        {
          id: "other_course",
          title: "Other course module",
          tag_course: "course_a",
          number: 1,
          tag_list: ["age_5_9"],
        },
      ],
      [{ id: "course_b", title: "Course B" }]
    );

    await flushSettledValue();

    expectSettledValue({
      course_id: "course_b",
      course_title: "Course B",
      module_id: "next_module",
      module_title: "Next module",
    });
  });

  it("should return the first incomplete task by number when no other checks match", async () => {
    spyOn(component, "setValue").and.resolveTo();

    createComponent(
      [
        {
          id: "second",
          title: "Second module",
          tag_course: "course_a",
          number: 2,
          tag_list: ["age_5_9"],
        },
        {
          id: "first",
          title: "First module",
          tag_course: "course_a",
          number: 1,
          tag_list: ["age_5_9"],
        },
      ],
      [{ id: "course_a", title: "Course A" }]
    );

    await flushSettledValue();

    expect(component.upNextTask()?.id).toBe("first");
    expectSettledValue({
      module_id: "first",
      module_title: "First module",
      course_id: "course_a",
      course_title: "Course A",
    });
  });

  it("should reset check_complete while re-evaluating and settle on true", async () => {
    const moduleTasks$ = new BehaviorSubject<Record<string, unknown>[]>([
      {
        id: "first",
        title: "First module",
        tag_course: "course_a",
        last_accessed_ts: 1,
      },
    ]);
    const courses$ = new BehaviorSubject<Record<string, unknown>[]>([
      { id: "course_a", title: "Course A" },
    ]);

    mockDynamicDataService.query$.and.callFake((_flowType: string, listName: string) => {
      if (listName === "module_tasks") return moduleTasks$.asObservable();
      if (listName === "courses") return courses$.asObservable();
      return of([]);
    });

    fixture = TestBed.createComponent(PlhGetUpNextComponent);
    component = fixture.componentInstance;
    component.parent = {
      handleActions: jasmine.createSpy("handleActions").and.resolveTo(undefined),
    } as any;
    component.row = {
      name: "get_up_next",
      _nested_name: "get_up_next",
      type: "plh_get_up_next",
      value: null,
    } as any;
    spyOn(component, "setValue").and.resolveTo();
    fixture.detectChanges();
    await flushSettledValue();

    moduleTasks$.next([
      {
        id: "updated",
        title: "Updated module",
        tag_course: "course_b",
        last_accessed_ts: 2,
      },
    ]);
    courses$.next([{ id: "course_b", title: "Course B" }]);
    await flushSettledValue();

    const calls = (component.setValue as jasmine.Spy).calls.allArgs();
    expect(calls.filter(([value]) => value.check_complete === false).length).toBeGreaterThan(1);
    expect(component.setValue).toHaveBeenCalledWith({
      check_complete: true,
      module_id: "updated",
      module_title: "Updated module",
      course_id: "course_b",
      course_title: "Course B",
    });
  });

  it("should log and settle with check_complete when no matching tasks are found", async () => {
    spyOn(console, "log");
    spyOn(component, "setValue").and.resolveTo();

    createComponent([]);

    await flushSettledValue();

    expect(console.log).toHaveBeenCalledWith("no in progress ATM");
    expectSettledValue({});
  });
});
