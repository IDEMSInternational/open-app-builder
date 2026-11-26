import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PlhLessonCtaComponent } from "./lesson-cta.component";

@Pipe({ name: "plhAsset", standalone: false })
class MockPlhAssetPipe implements PipeTransform {
  transform(value: string) {
    return value;
  }
}

describe("LessonCtaComponent", () => {
  let component: PlhLessonCtaComponent;
  let fixture: ComponentFixture<PlhLessonCtaComponent>;

  function setParams(parameter_list: Record<string, string> = {}) {
    fixture.componentRef.setInput("row", {
      type: "plh_lesson_cta",
      name: "lesson_cta",
      parameter_list,
    });
    fixture.detectChanges();
  }

  function getBadgeText() {
    return (fixture.nativeElement as HTMLElement).querySelector(".badge-text");
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhLessonCtaComponent, MockPlhAssetPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhLessonCtaComponent);
    component = fixture.componentInstance;
    setParams();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show the badge when it has text", () => {
    setParams({ badge_text: "Continue" });
    expect(getBadgeText()?.textContent).toContain("Continue");
  });

  it("should not show the badge when its text is empty", () => {
    setParams({ badge_text: "" });
    expect(getBadgeText()).toBeNull();
  });
});
