import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { IconBannerComponent } from "./icon-banner.component";

describe("IconBannerComponent", () => {
  let component: IconBannerComponent;
  let fixture: ComponentFixture<IconBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconBannerComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(IconBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
