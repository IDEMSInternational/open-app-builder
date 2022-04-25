import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplButtonComponent } from "./button.component";

describe("TmplButtonComponent", () => {
  let component: TmplButtonComponent;
  let fixture: ComponentFixture<TmplButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TmplButtonComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
