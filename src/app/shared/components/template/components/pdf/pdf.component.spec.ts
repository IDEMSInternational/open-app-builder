import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplPdfComponent } from "./pdf.component";
import { FlowTypes } from "packages/data-models";
import { PDFViewerService } from "./pdf.service";
import { signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";

class MockPDFViewerService {
  private initialised$ = new BehaviorSubject(true);

  public ready() {
    // Mock the ready method
    return Promise.resolve(true);
  }
  public isCompatible = signal(false);
}

const MOCK_ROW: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "",
  type: "pdf",
  parameter_list: {},
};

describe("PdfComponent", () => {
  let component: TmplPdfComponent;
  let fixture: ComponentFixture<TmplPdfComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplPdfComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: PDFViewerService, useClass: MockPDFViewerService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplPdfComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("row", MOCK_ROW);
    fixture.detectChanges();
    await fixture.whenStable();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
