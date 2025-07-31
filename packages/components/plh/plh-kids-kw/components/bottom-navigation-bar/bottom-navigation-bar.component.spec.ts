import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PlhBottomNavigationBarComponent } from "./bottom-navigation-bar.component";

describe("PlhBottomNavigationBarComponent", () => {
  let component: PlhBottomNavigationBarComponent;
  let fixture: ComponentFixture<PlhBottomNavigationBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhBottomNavigationBarComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhBottomNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
