import { async, ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplTileComponent } from "./tile-component.component";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "tile_component" };

describe("TmplTileComponent", () => {
  let component: TmplTileComponent;
  let fixture: ComponentFixture<TmplTileComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplTileComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplTileComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
