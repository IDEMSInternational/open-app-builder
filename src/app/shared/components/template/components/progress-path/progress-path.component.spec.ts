import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplProgressPathComponent } from "./progress-path.component";
import { TemplateTranslateService } from "../../services/template-translate.service";
import { FilterDisplayComponentPipe } from "../../pipes/filter-display-component.pipe";
import { FlowTypes } from "packages/data-models";
import { DataItemsService } from "../data-items/data-items.service";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "progress_path" };

describe("TmplProgressPathComponent", () => {
  let component: TmplProgressPathComponent;
  let fixture: ComponentFixture<TmplProgressPathComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplProgressPathComponent, FilterDisplayComponentPipe],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TemplateTranslateService, useValue: {} },
        { provide: DataItemsService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplProgressPathComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
