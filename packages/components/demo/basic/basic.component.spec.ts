import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { DemoBasicComponent } from "./basic.component";

/**
 * Call standalone tests via:
 * yarn ng test --include packages/components/demo/example/example.component.spec.ts
 *
 * TODO: pass a mock value for `_row` so that we can test against how the component would normally be mounted
 */
describe("TmplExampleComponent", () => {
  let component: DemoBasicComponent;
  let fixture: ComponentFixture<DemoBasicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoBasicComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
