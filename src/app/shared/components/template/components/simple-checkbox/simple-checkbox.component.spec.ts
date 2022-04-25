import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplSimpleCheckboxComponent } from "./simple-checkbox.component";

describe("TmplSimpleCheckboxComponent", () => {
  let component: TmplSimpleCheckboxComponent;
  let fixture: ComponentFixture<TmplSimpleCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TmplSimpleCheckboxComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplSimpleCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
