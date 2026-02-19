import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { LessonButtonComponent } from "./lesson-button.component";

describe("LessonButtonComponent", () => {
  let component: LessonButtonComponent;
  let fixture: ComponentFixture<LessonButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LessonButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
