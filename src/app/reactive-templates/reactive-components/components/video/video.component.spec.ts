import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { of } from "rxjs";
import { FlowTypes } from "packages/data-models";
import { TemplateAssetService } from "src/app/shared/components/template/services/template-asset.service";
import { TemplateMetadataService } from "src/app/shared/components/template/services/template-metadata.service";
import { ActionService } from "../../../services/action.service";
import { EvaluationService } from "../../../services/evaluation.service";
import { RowRegistry } from "../../../services/row.registry";
import { VariableStore } from "../../../stores/variable-store";
import { REACTIVE_COMPONENT_MAP } from "..";
import { VideoComponent } from "./video.component";

describe("VideoComponent", () => {
  let fixture: ComponentFixture<VideoComponent>;

  async function render(row: Partial<FlowTypes.TemplateRow>) {
    const storedValue = signal<any>(undefined);

    await TestBed.configureTestingModule({
      imports: [VideoComponent],
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
          provide: TemplateAssetService,
          useValue: { getTranslatedAssetSignal: (path: string) => signal(`assets/${path}`) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoComponent);
    fixture.componentRef.setInput("row", {
      _nested_name: "",
      name: "video",
      type: "video",
      value: "video.mp4",
      ...row,
    } as FlowTypes.TemplateRow);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it("is registered for video rows", () => {
    expect(REACTIVE_COMPONENT_MAP.video).toBe(VideoComponent);
  });

  it("renders the video with subtitles and style", async () => {
    await render({ parameter_list: { subtitles_src: "video.vtt", style: "left" } });
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector("video")?.getAttribute("src")).toBe("assets/video.mp4");
    expect(element.querySelector("track")?.getAttribute("src")).toBe("assets/video.vtt");
    expect(element.querySelector(".tmpl-video-container")?.classList).toContain("left");
  });

  it("renders no subtitle track without subtitles_src", async () => {
    await render({});

    expect(fixture.nativeElement.querySelector("video")).not.toBeNull();
    expect(fixture.nativeElement.querySelector("track")).toBeNull();
  });

  it("removes the video when its condition is false", async () => {
    await render({ condition: false });

    expect(fixture.nativeElement.querySelector("video")).toBeNull();
  });
});
