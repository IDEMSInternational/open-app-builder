import { async, ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplButtonComponent } from "./button.component";
import { TemplateTranslateService } from "../../services/template-translate.service";
import { MockTemplateTranslateService } from "../../services/template-translate.service.spec";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "button" };

describe("TmplButtonComponent", () => {
  let component: TmplButtonComponent;
  let fixture: ComponentFixture<TmplButtonComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplButtonComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TemplateTranslateService, useValue: new MockTemplateTranslateService() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplButtonComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
