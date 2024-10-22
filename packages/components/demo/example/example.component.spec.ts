import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplExampleComponent } from "./example.component";

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
