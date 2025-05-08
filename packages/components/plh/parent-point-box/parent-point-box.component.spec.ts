import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PlhParentPointBoxComponent } from "./parent-point-box.component";

describe("TmplParentPointBoxComponent", () => {
  let component: PlhParentPointBoxComponent;
  let fixture: ComponentFixture<PlhParentPointBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhParentPointBoxComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhParentPointBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
