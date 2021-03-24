import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TileComponentComponent } from "./tile-component.component";

describe("TileComponentComponent", () => {
  let component: TileComponentComponent;
  let fixture: ComponentFixture<TileComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TileComponentComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
