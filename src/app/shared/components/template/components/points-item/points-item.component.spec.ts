import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PointsItemComponent } from "./points-item.component";

describe("PointsItemComponent", () => {
  let component: PointsItemComponent;
  let fixture: ComponentFixture<PointsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PointsItemComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PointsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
