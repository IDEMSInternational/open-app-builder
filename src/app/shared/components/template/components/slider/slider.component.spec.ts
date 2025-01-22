import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { NouisliderModule } from "ng2-nouislider";

import { TmplSliderComponent } from "./slider.component";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "round_icon_button" };

describe("SliderComponent", () => {
  let component: TmplSliderComponent;
  let fixture: ComponentFixture<TmplSliderComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplSliderComponent],
      imports: [IonicModule.forRoot(), NouisliderModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplSliderComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
