import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PlhActivityCheckInComponent } from "./activity-check-in.component";

describe("ActivityCheckInComponent", () => {
  let component: PlhActivityCheckInComponent;
  let fixture: ComponentFixture<PlhActivityCheckInComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhActivityCheckInComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhActivityCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
