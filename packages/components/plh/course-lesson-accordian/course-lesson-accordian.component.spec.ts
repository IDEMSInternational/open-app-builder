import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PlhCourseLessonAccordianComponent } from "./course-lesson-accordian.component";

describe("CourseLessonAccordianComponent", () => {
  let component: PlhCourseLessonAccordianComponent;
  let fixture: ComponentFixture<PlhCourseLessonAccordianComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhCourseLessonAccordianComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhCourseLessonAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
