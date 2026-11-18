import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PlhProgressBarComponent } from "./progress-bar.component";

/**
 * Call standalone tests via:
 * yarn ng test --include packages/components/plh/progress-bar/progress-bar.component.spec.ts
 */
describe("PlhProgressBarComponent", () => {
  let component: PlhProgressBarComponent;
  let fixture: ComponentFixture<PlhProgressBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhProgressBarComponent],
      imports: [IonicModule.forRoot()],
      // Allow the nested ion-icon to be rendered without declaring it
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhProgressBarComponent);
    component = fixture.componentInstance;
    component.parentContainerComponentRef = {
      handleActions: jasmine.createSpy("handleActions").and.resolveTo(undefined),
    } as any;
    component.row = {
      name: "progress_bar",
      _nested_name: "progress_bar",
      type: "plh_progress_bar",
      value: 0,
      action_list: [],
      parameter_list: {},
    } as any;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  function setRow(value: number, parameter_list: Record<string, any>) {
    component.row = { ...component.row, value, parameter_list } as any;
    fixture.detectChanges();
  }

  function getPercentage(): HTMLElement | null {
    return fixture.nativeElement.querySelector(".progress-percentage");
  }

  it("reserves the percentage width while progress is 0", () => {
    setRow(0, { title: "Title", show_percentage: true });
    const percentage = getPercentage();
    expect(percentage).toBeTruthy();
    expect(percentage.classList).toContain("hidden");
  });

  it("shows the percentage once progress starts", () => {
    setRow(40, { title: "Title", show_percentage: true });
    const percentage = getPercentage();
    expect(percentage.classList).not.toContain("hidden");
    expect(percentage.textContent.trim()).toBe("40%");
  });

  it("does not render the percentage when show_percentage is off", () => {
    setRow(40, { title: "Title" });
    expect(getPercentage()).toBeNull();
  });
});
