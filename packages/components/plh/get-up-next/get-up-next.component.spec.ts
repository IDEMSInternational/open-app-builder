import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";

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

  function createComponent(tasks: Record<string, unknown>[] = []) {
    mockDynamicDataService.query$.and.returnValue(of(tasks));
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

  it("should subscribe to the module_tasks data list", () => {
    expect(mockDynamicDataService.query$).toHaveBeenCalledWith("data_list", "module_tasks");
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

  it("should set the component value from the first matching task", async () => {
    spyOn(component, "setValue").and.resolveTo();

    createComponent([
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
    ]);

    await fixture.whenStable();

    expect(component.setValue).toHaveBeenCalledWith({
      module_id: "newer",
      module_title: "Newer module",
      course_id: "course_b",
    });
  });

  it("should log when no matching tasks are in progress", () => {
    spyOn(console, "log");

    createComponent([]);

    expect(console.log).toHaveBeenCalledWith("no in progress ATM");
  });
});
