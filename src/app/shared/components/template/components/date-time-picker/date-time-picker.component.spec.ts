import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplDateTimePickerComponent } from "./date-time-picker.component";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "test_date_picker1",
  type: "date-time-picker",
};

describe("DateTimePickerComponent", () => {
  let component: TmplDateTimePickerComponent;
  let fixture: ComponentFixture<TmplDateTimePickerComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplDateTimePickerComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplDateTimePickerComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    component = fixture.componentInstance;
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
