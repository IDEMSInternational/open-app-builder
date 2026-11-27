import { ComponentFixture, TestBed } from "@angular/core/testing";
import { signal, WritableSignal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EMPTY } from "rxjs";
import { TemplateAssetService } from "src/app/shared/components/template/services/template-asset.service";
import { TemplateMetadataService } from "src/app/shared/components/template/services/template-metadata.service";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { ActionService } from "../../../services/action.service";
import { DebugService } from "../../../services/debug.service";
import { EvaluationService } from "../../../services/evaluation.service";
import { NamespaceService } from "../../../services/namespace.service";
import { RowRegistry } from "../../../services/row.registry";
import { VariableStore } from "../../../stores/variable-store";
import { REACTIVE_COMPONENT_MAP } from "..";
import { TextBubbleComponent } from "./text-bubble.component";

describe("TextBubbleComponent", () => {
  let fixture: ComponentFixture<TextBubbleComponent>;
  const values = new Map<string, WritableSignal<any>>();

  beforeEach(async () => {
    values.clear();
    await TestBed.configureTestingModule({
      imports: [TextBubbleComponent],
      providers: [
        {
          provide: VariableStore,
          useValue: {
            asSignal: ({ name }: { name: string }) => {
              if (!values.has(name)) values.set(name, signal(undefined));
              return values.get(name);
            },
            set: ({ name }: { name: string }, value: unknown) => values.get(name)?.set(value),
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
        {
          provide: ActionService,
          useValue: { handleActions: () => undefined },
        },
        {
          provide: RowRegistry,
          useValue: { has: () => false, register: () => undefined, unregister: () => undefined },
        },
        {
          provide: Router,
          useValue: { url: "/", events: EMPTY },
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: TemplateMetadataService,
          useValue: { templateName: signal("test-template") },
        },
        {
          provide: TemplateTranslateService,
          useValue: { languageDirection: signal("rtl") },
        },
        {
          provide: TemplateAssetService,
          useValue: { getTranslatedAssetSignal: (path: string) => signal(`assets/${path}`) },
        },
        {
          provide: DebugService,
          useValue: { isEnabled: () => false },
        },
        NamespaceService,
      ],
    }).compileComponents();

    await render();
  });

  async function render(parameterList: Record<string, unknown> = {}) {
    fixture = TestBed.createComponent(TextBubbleComponent);
    fixture.componentRef.setInput("row", {
      type: "text_bubble",
      name: "bubble",
      value: "Hello **world**",
      condition: null,
      parameter_list: {
        speaker_name: "Alex",
        speaker_position: "right",
        speaker_image_asset: "speaker.png",
        variant: "gray, primary",
        ...parameterList,
      },
      rows: [
        {
          type: "text",
          name: "child",
          value: "Child text",
          condition: null,
          parameter_list: {},
          rows: [],
        },
      ],
    } as any);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it("renders evaluated text, child rows, speaker details, and variants", () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector(".text-bubble-container")?.getAttribute("data-position")).toBe(
      "right"
    );
    expect(host.querySelector(".text-bubble-container")?.getAttribute("data-variant")).toBe(
      "gray primary"
    );
    expect(
      host.querySelector(".text-bubble-container")?.getAttribute("data-language-direction")
    ).toBe("rtl");
    expect(host.querySelector(".speaker-name")?.textContent).toBe("Alex");
    expect(host.querySelector(".speaker-image")?.getAttribute("src")).toBe("assets/speaker.png");
    expect(host.querySelector(".text-bubble-content")?.innerHTML).toContain(
      "<p>Hello <strong>world</strong></p>"
    );
    expect(host.textContent).toContain("Child text");
  });

  it("ignores a variant that evaluates to undefined", async () => {
    await render({ variant: undefined });

    expect(
      (fixture.nativeElement as HTMLElement)
        .querySelector(".text-bubble-container")
        ?.getAttribute("data-variant")
    ).toBe("");
  });

  it("registers for reactive template rows", () => {
    expect(REACTIVE_COMPONENT_MAP.text_bubble).toBe(TextBubbleComponent);
  });
});
