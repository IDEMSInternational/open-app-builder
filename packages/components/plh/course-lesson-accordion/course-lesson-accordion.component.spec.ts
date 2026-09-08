import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PlhCourseLessonAccordionComponent } from "./course-lesson-accordion.component";

describe("PlhCourseLessonAccordionComponent", () => {
  let component: PlhCourseLessonAccordionComponent;
  let fixture: ComponentFixture<PlhCourseLessonAccordionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhCourseLessonAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhCourseLessonAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
