import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PlhCourseAccordionComponent } from "./course-accordion.component";

describe("CourseAccordionComponent", () => {
  let component: PlhCourseAccordionComponent;
  let fixture: ComponentFixture<PlhCourseAccordionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhCourseAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhCourseAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
