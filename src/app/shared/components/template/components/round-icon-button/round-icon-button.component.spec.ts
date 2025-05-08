import { async, ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { RoundIconButtonComponent } from "./round-icon-button.component";
import { PLHAssetPipe } from "../../pipes/plh-asset.pipe";
import { FlowTypes } from "packages/data-models";
import { TemplateAssetService } from "../../services/template-asset.service";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "round_icon_button" };

describe("RoundIconButtonComponent", () => {
  let component: RoundIconButtonComponent;
  let fixture: ComponentFixture<RoundIconButtonComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [RoundIconButtonComponent, PLHAssetPipe],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: TemplateAssetService, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(RoundIconButtonComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
