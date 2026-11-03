import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { YoutubeComponent } from "./youtube.component";
import { TemplateTranslateService } from "../../services/template-translate.service";
import { MockTemplateTranslateService } from "../../services/template-translate.service.spec";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "",
  type: "youtube",
  value: "https://www.youtube.com/watch?v=YE7VzlLtp-4",
};

describe("YoutubeComponent", () => {
  let component: YoutubeComponent;
  let fixture: ComponentFixture<YoutubeComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [YoutubeComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TemplateTranslateService, useValue: new MockTemplateTranslateService() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(YoutubeComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  async function render(parameter_list: FlowTypes.TemplateRow["parameter_list"]) {
    fixture.componentRef.setInput("row", { ...MOCK_ROW, parameter_list });
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement.querySelector(".youtube-container") as HTMLElement;
  }

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("orientation", () => {
    it("defaults to landscape", async () => {
      const container = await render({});
      expect(component.params().orientation).toEqual("landscape");
      expect(container.getAttribute("data-orientation")).toEqual("landscape");
    });

    it("uses portrait when authored", async () => {
      const container = await render({ orientation: "portrait" });
      expect(component.params().orientation).toEqual("portrait");
      expect(container.getAttribute("data-orientation")).toEqual("portrait");
    });

    it("falls back to landscape for an invalid value", async () => {
      const container = await render({ orientation: "vertical" });
      expect(component.params().orientation).toEqual("landscape");
      expect(container.getAttribute("data-orientation")).toEqual("landscape");
    });
  });
});
