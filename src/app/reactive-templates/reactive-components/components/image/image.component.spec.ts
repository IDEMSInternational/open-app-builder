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
import { REACTIVE_COMPONENT_MAP } from "../index";
import { ImageComponent } from "./image.component";

describe("ImageComponent", () => {
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async () => {
    const storedValue = signal<any>(undefined);

    await TestBed.configureTestingModule({
      imports: [ImageComponent],
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
        {
          provide: TemplateMetadataService,
          useValue: { templateName: signal("template") },
        },
        {
          provide: TemplateAssetService,
          useValue: { getTranslatedAssetSignal: (path: string) => signal(path) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageComponent);
    fixture.componentRef.setInput("row", {
      _nested_name: "",
      name: "image",
      type: "image",
      value: "image.png",
      parameter_list: { style: "no-padding" },
    } satisfies FlowTypes.TemplateRow);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it("renders a translated image and its style parameter", () => {
    expect(REACTIVE_COMPONENT_MAP.image).toBe(ImageComponent);
    const image = fixture.nativeElement.querySelector("img");
    const container = fixture.nativeElement.querySelector(".tmpl-image-container");

    expect(image.getAttribute("src")).toBe("image.png");
    expect(container.getAttribute("data-param-style")).toBe("no-padding");
  });

  it("updates the image when its reactive value changes", async () => {
    await fixture.componentInstance.setExpression("updated.png");
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("img").getAttribute("src")).toBe("updated.png");
  });
});
