import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplSharedDataComponent } from "./shared-data.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedDataService } from "src/app/feature/shared-data/shared-data.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";

describe("SharedDataComponent", () => {
  let component: TmplSharedDataComponent;
  let fixture: ComponentFixture<TmplSharedDataComponent>;

  beforeEach(waitForAsync(() => {
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
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplSharedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
