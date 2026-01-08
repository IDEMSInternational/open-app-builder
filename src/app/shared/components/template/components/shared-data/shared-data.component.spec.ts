import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplSharedDataComponent } from "./shared-data.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedDataService } from "src/app/feature/shared-data/shared-data.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "shared_data" };

describe("SharedDataComponent", () => {
  let component: TmplSharedDataComponent;
  let fixture: ComponentFixture<TmplSharedDataComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplSharedDataComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        {
          provide: SharedDataService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: { provider: { authUser: () => undefined } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplSharedDataComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
