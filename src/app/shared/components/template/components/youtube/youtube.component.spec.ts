import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { YoutubeComponent } from "./youtube.component";
import { TemplateTranslateService } from "../../services/template-translate.service";
import { MockTemplateTranslateService } from "../../services/template-translate.service.spec";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "task_card" };

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

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
