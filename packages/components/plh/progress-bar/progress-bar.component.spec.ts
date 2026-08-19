import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PlhProgressBarComponent } from "./progress-bar.component";

/**
 * Call standalone tests via:
 * yarn ng test --include packages/components/plh/progress-bar/progress-bar.component.spec.ts
 */
describe("PlhProgressBarComponent", () => {
  let component: PlhProgressBarComponent;
  let fixture: ComponentFixture<PlhProgressBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhProgressBarComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhProgressBarComponent);
    component = fixture.componentInstance;
    component.parentContainerComponentRef = {
      handleActions: jasmine.createSpy("handleActions").and.resolveTo(undefined),
    } as any;
    component.row = {
      name: "progress_bar",
      _nested_name: "progress_bar",
      type: "plh_progress_bar",
      value: 0,
      action_list: [],
      parameter_list: {},
    } as any;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
