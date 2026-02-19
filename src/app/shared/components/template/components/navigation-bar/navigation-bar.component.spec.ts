import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { signal } from "@angular/core";

import { TmplNavigationBarComponent } from "./navigation-bar.component";
import { FlowTypes } from "packages/data-models";
import { TemplateMetadataService } from "../../services/template-metadata.service";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "navigation_bar" };

describe("NavigationBarComponent", () => {
  let component: TmplNavigationBarComponent;
  let fixture: ComponentFixture<TmplNavigationBarComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplNavigationBarComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: TemplateMetadataService,
          useValue: {
            templateName: signal(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplNavigationBarComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
