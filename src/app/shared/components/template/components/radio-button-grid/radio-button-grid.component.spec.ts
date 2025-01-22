import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TmplRadioButtonGridComponent } from "./radio-button-grid.component";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "radio_button_grid" };

describe("RadioButtonGridComponent", () => {
  let component: TmplRadioButtonGridComponent;
  let fixture: ComponentFixture<TmplRadioButtonGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmplRadioButtonGridComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplRadioButtonGridComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
