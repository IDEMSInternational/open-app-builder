import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplExampleComponent } from "./example.component";

/**
 * Call standalone tests via:
 * yarn ng test --include packages/components/demo/example/example.component.spec.ts
 *
 * TODO: pass a mock value for `_row` so that we can test against how the component would normally be mounted
 */
describe("TmplExampleComponent", () => {
  let component: TmplExampleComponent;
  let fixture: ComponentFixture<TmplExampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TmplExampleComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
