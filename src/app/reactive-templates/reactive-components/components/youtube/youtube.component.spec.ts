import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { FlowTypes } from "packages/data-models";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { TemplateMetadataService } from "src/app/shared/components/template/services/template-metadata.service";
import { REACTIVE_COMPONENT_MAP } from "..";
import { YoutubeComponent } from "./youtube.component";

const MOCK_ROW: FlowTypes.TemplateRow = {
  _nested_name: "youtube",
  name: "youtube",
  type: "youtube",
  value: "https://www.youtube.com/watch?v=YE7VzlLtp-4",
};

describe("Reactive YoutubeComponent", () => {
  it("is registered for reactive template rows", () => {
    expect(REACTIVE_COMPONENT_MAP.youtube).toBe(YoutubeComponent);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [YoutubeComponent],
      providers: [
        provideRouter([]),
        { provide: TemplateMetadataService, useValue: { templateName: () => undefined } },
        { provide: TemplateTranslateService, useValue: { app_language_code: "en" } },
      ],
    });
  });

  async function createComponent(parameter_list: FlowTypes.TemplateRow["parameter_list"] = {}) {
    const fixture = TestBed.createComponent(YoutubeComponent);
    fixture.componentRef.setInput("row", { ...MOCK_ROW, parameter_list });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  it("renders a YouTube embed using reactive row values", async () => {
    const fixture = await createComponent();
    const iframe = fixture.nativeElement.querySelector("iframe") as HTMLIFrameElement;
    const container = fixture.nativeElement.querySelector(".youtube-container") as HTMLElement;

    expect(iframe.src).toContain("https://www.youtube-nocookie.com/embed/YE7VzlLtp-4");
    expect(new URL(iframe.src).searchParams.get("hl")).toBe("en");
    expect(container.getAttribute("data-orientation")).toBe("landscape");
  });

  it("applies authored orientation and fullscreen parameters", async () => {
    const fixture = await createComponent({
      allow_fullscreen: "false",
      orientation: "portrait",
    });
    const iframe = fixture.nativeElement.querySelector("iframe") as HTMLIFrameElement;
    const container = fixture.nativeElement.querySelector(".youtube-container") as HTMLElement;

    expect(new URL(iframe.src).searchParams.get("fs")).toBe("0");
    expect(iframe.hasAttribute("allowfullscreen")).toBeFalse();
    expect(container.getAttribute("data-orientation")).toBe("portrait");
  });
});
