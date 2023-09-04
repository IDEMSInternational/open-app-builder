import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplDashedBoxComponent } from "./dashed-box.component";

describe("TmplDashedBoxComponent", () => {
  let component: TmplDashedBoxComponent;
  let fixture: ComponentFixture<TmplDashedBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TmplDashedBoxComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplDashedBoxComponent);
    component = fixture.componentInstance;
    component._row = { name: "", _nested_name: "", type: "dashed_box", value: "" };
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
