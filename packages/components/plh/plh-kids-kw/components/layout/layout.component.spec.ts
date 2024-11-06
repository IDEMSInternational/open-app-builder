import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PlhKidsKuwaitLayoutComponent } from "./layout.component";

describe("LayoutComponent", () => {
  let component: PlhKidsKuwaitLayoutComponent;
  let fixture: ComponentFixture<PlhKidsKuwaitLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhKidsKuwaitLayoutComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhKidsKuwaitLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
