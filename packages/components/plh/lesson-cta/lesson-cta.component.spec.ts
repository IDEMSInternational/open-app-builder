import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PlhLessonCtaComponent } from "./lesson-cta.component";

describe("LessonCtaComponent", () => {
  let component: PlhLessonCtaComponent;
  let fixture: ComponentFixture<PlhLessonCtaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhLessonCtaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhLessonCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
