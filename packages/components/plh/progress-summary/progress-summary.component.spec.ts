import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { TemplateAssetService } from "src/app/shared/components/template/services/template-asset.service";

import { PlhProgressSummaryCelebrationComponent } from "./celebration/celebration.component";
import { PlhProgressSummaryComponent } from "./progress-summary.component";
import { MAX_COMPLETED_COUNT } from "./progress-summary.logic";

/**
 * Call standalone tests via:
 * yarn ng test --include ../packages/components/plh/progress-summary/progress-summary.component.spec.ts
 */
describe("PlhProgressSummaryComponent", () => {
  let component: PlhProgressSummaryComponent;
  let fixture: ComponentFixture<PlhProgressSummaryComponent>;
  let element: HTMLElement;

  function setRow(value: any, parameter_list: Record<string, any> = {}) {
    component.row = {
      name: "progress_summary",
      _nested_name: "progress_summary",
      type: "plh_progress_summary",
      value,
      parameter_list,
    } as any;
    fixture.detectChanges();
  }

  function stepStatuses() {
    return Array.from(element.querySelectorAll(".step-row")).map((row) =>
      Array.from(row.querySelectorAll(".step-cell")).map((cell) =>
        ["completed", "current", "empty"].find((status) => cell.classList.contains(status))
      )
    );
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhProgressSummaryComponent, PlhProgressSummaryCelebrationComponent],
      imports: [IonicModule.forRoot(), TemplatePipesModule],
      providers: [
        {
          provide: TemplateAssetService,
          useValue: { getTranslatedAssetSignal: (path: string) => () => path },
        },
      ],
      // Allow the nested ion-icon to be rendered without declaring it
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhProgressSummaryComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  it("shows one empty row when nothing is completed", () => {
    setRow(0);
    expect(stepStatuses()).toEqual([["empty", "empty", "empty", "empty", "empty"]]);
    expect(element.querySelectorAll("ion-icon").length).toBe(0);
  });

  it("highlights only the most recent completed step", () => {
    setRow(12);
    expect(stepStatuses()).toEqual([
      ["completed", "completed", "completed", "completed", "completed"],
      ["completed", "completed", "completed", "completed", "completed"],
      ["completed", "current", "empty", "empty", "empty"],
    ]);
    expect(element.querySelectorAll("ion-icon").length).toBe(12);
  });

  it("reads the count from a field value stored as text", () => {
    setRow("5");
    expect(stepStatuses().length).toBe(2);
    expect(element.querySelectorAll(".step-cell.current").length).toBe(1);
  });

  it("labels the steps with the completed count", () => {
    setRow(12);
    const steps = element.querySelector(".step-rows");
    expect(steps?.getAttribute("role")).toBe("img");
    expect(steps?.getAttribute("aria-label")).toBe("12");
  });

  it("caps the number of steps drawn", () => {
    setRow("1762300800000");
    expect(element.querySelectorAll(".step-cell.completed, .step-cell.current").length).toBe(
      MAX_COMPLETED_COUNT
    );
  });

  it("updates when the value changes", () => {
    setRow(2);
    expect(element.querySelectorAll(".step-cell.completed, .step-cell.current").length).toBe(2);
    setRow(3);
    expect(element.querySelectorAll(".step-cell.completed, .step-cell.current").length).toBe(3);
  });

  it("shows the title, text and image when set", () => {
    setRow(2, {
      title: "That is 2 check-ins!",
      text: "Keep going",
      image_asset: "images/icons/star_yellow.svg",
    });
    expect(element.querySelector(".title")?.textContent).toBe("That is 2 check-ins!");
    expect(element.querySelector(".text")?.textContent).toBe("Keep going");
    expect(element.querySelector(".badge img")).toBeTruthy();
  });

  it("celebrates the image once a step is completed", () => {
    setRow(0, { image_asset: "images/icons/star_yellow.svg" });
    expect(element.querySelector(".badge.play")).toBeNull();
    expect(element.querySelectorAll(".badge .spark").length).toBe(0);

    setRow(1, { image_asset: "images/icons/star_yellow.svg" });
    expect(element.querySelector(".badge.play img")).toBeTruthy();
    expect(element.querySelector(".badge .burst")).toBeTruthy();
    expect(element.querySelectorAll(".badge .spark").length).toBe(8);
  });

  it("hides the title, text and image when not set", () => {
    setRow(2);
    expect(element.querySelector(".title")).toBeNull();
    expect(element.querySelector(".text")).toBeNull();
    expect(element.querySelector(".badge")).toBeNull();
  });
});
