import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { TmplRadioButtonGridComponent } from "./radio-button-grid.component";
import { FlowTypes } from "packages/data-models";
import { DataItemsService } from "../data-items/data-items.service";
import { PLHAssetPipe } from "../../pipes/plh-asset.pipe";
import { TemplateAssetService } from "../../services/template-asset.service";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "radio_button_grid" };

describe("RadioButtonGridComponent", () => {
  let component: TmplRadioButtonGridComponent;
  let fixture: ComponentFixture<TmplRadioButtonGridComponent>;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmplRadioButtonGridComponent, PLHAssetPipe],
      providers: [
        { provide: DataItemsService, useValue: {} },
        { provide: TemplateAssetService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplRadioButtonGridComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
