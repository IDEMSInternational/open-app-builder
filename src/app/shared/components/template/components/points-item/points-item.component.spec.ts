import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplParentPointBoxComponent } from "./points-item.component";

describe("TmplParentPointBoxComponent", () => {
  let component: TmplParentPointBoxComponent;
  let fixture: ComponentFixture<TmplParentPointBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TmplParentPointBoxComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplParentPointBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
