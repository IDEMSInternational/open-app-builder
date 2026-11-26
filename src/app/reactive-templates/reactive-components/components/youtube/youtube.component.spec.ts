import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { of } from "rxjs";
import { FlowTypes } from "packages/data-models";
import { TemplateMetadataService } from "src/app/shared/components/template/services/template-metadata.service";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { ActionService } from "../../../services/action.service";
import { EvaluationService } from "../../../services/evaluation.service";
import { RowRegistry } from "../../../services/row.registry";
import { VariableStore } from "../../../stores/variable-store";
import { REACTIVE_COMPONENT_MAP } from "..";
import { YoutubeComponent } from "./youtube.component";

const VIDEO_URL = "https://www.youtube.com/watch?v=YE7VzlLtp-4";

describe("Reactive YoutubeComponent", () => {
  let fixture: ComponentFixture<YoutubeComponent>;

  async function render(parameter_list: FlowTypes.TemplateRow["parameter_list"] = {}) {
    const storedValue = signal<any>(undefined);

    await TestBed.configureTestingModule({
      imports: [YoutubeComponent],
      providers: [
        provideRouter([]),
        {
          provide: VariableStore,
          useValue: {
            asSignal: () => storedValue,
            set: (_ref: unknown, value: unknown) => storedValue.set(value),
            watchMultiple: () => of({}),
            watchMultipleWithDescendants: () => of({}),
          },
        },
        {
          provide: EvaluationService,
          useValue: {
            evaluateExpression: (expression: unknown) => expression,
            getDependencies: () => [],
            hasDynamicIndexer: () => false,
          },
        },
        { provide: ActionService, useValue: { handleActions: () => Promise.resolve() } },
        {
          provide: RowRegistry,
          useValue: { has: () => false, register: () => {}, unregister: () => {} },
        },
        { provide: TemplateMetadataService, useValue: { templateName: signal("template") } },
        {
          provide: TemplateTranslateService,
          useValue: { appLanguage: signal("gb_en"), app_language_code: "en" },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(YoutubeComponent);
    fixture.componentRef.setInput("row", {
      _nested_name: "youtube",
      name: "youtube",
      type: "youtube",
      value: VIDEO_URL,
      parameter_list,
    } as FlowTypes.TemplateRow);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  const iframe = () => fixture.nativeElement.querySelector("iframe") as HTMLIFrameElement;
  const container = () => fixture.nativeElement.querySelector(".youtube-container") as HTMLElement;

  it("is registered for reactive template rows", () => {
    expect(REACTIVE_COMPONENT_MAP.youtube).toBe(YoutubeComponent);
  });

  it("renders a YouTube embed with the app language", async () => {
    await render();

    expect(iframe().src).toContain("https://www.youtube-nocookie.com/embed/YE7VzlLtp-4");
    expect(new URL(iframe().src).searchParams.get("hl")).toBe("en");
    expect(container().getAttribute("data-orientation")).toBe("landscape");
  });

  it("applies authored orientation and fullscreen parameters", async () => {
    await render({ allow_fullscreen: "false", orientation: "portrait" });

    expect(new URL(iframe().src).searchParams.get("fs")).toBe("0");
    expect(iframe().hasAttribute("allowfullscreen")).toBeFalse();
    expect(container().getAttribute("data-orientation")).toBe("portrait");
  });

  it("reads allow_fullscreen regardless of case", async () => {
    await render({ allow_fullscreen: "TRUE" });

    expect(new URL(iframe().src).searchParams.get("fs")).toBe("1");
  });

  it("falls back to landscape for an invalid orientation", async () => {
    await render({ orientation: "vertical" });

    expect(container().getAttribute("data-orientation")).toBe("landscape");
  });

  it("does not report an invalid value before the row is evaluated", async () => {
    const error = spyOn(console, "error");
    await render();

    expect(error).not.toHaveBeenCalled();
  });
});
