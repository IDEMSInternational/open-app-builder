import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplDrawerComponent } from "./drawer.component";
import { FilterDisplayComponentPipe } from "../../pipes/filter-display-component.pipe";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "drawer" };

describe("DrawerComponent", () => {
  let component: TmplDrawerComponent;
  let fixture: ComponentFixture<TmplDrawerComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplDrawerComponent, FilterDisplayComponentPipe],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplDrawerComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
