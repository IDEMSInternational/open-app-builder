import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplPdfComponent } from "./pdf.component";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "pdf" };

describe("PdfComponent", () => {
  let component: TmplPdfComponent;
  let fixture: ComponentFixture<TmplPdfComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplPdfComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplPdfComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
