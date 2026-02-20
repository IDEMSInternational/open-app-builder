import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PlhCourseSubItemComponent } from "./course-sub-item.component";

describe("PlhCourseSubItemComponent", () => {
  let component: PlhCourseSubItemComponent;
  let fixture: ComponentFixture<PlhCourseSubItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhCourseSubItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhCourseSubItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
