import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplIconBannerComponent } from "./icon-banner.component";

describe("TmplIconBannerComponent", () => {
  let component: TmplIconBannerComponent;
  let fixture: ComponentFixture<TmplIconBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TmplIconBannerComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplIconBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
