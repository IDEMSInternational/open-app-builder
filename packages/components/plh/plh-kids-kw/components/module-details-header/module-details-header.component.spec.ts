import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PlhModuleDetailsHeaderComponent } from "./module-details-header.component";

describe("ModuleDetailsHeaderComponent", () => {
  let component: PlhModuleDetailsHeaderComponent;
  let fixture: ComponentFixture<PlhModuleDetailsHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhModuleDetailsHeaderComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhModuleDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
