import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplTileComponent } from "./tile-component.component";

describe("TmplTileComponent", () => {
  let component: TmplTileComponent;
  let fixture: ComponentFixture<TmplTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TmplTileComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
