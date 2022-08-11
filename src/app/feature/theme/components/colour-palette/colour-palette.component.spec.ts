import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ColourPaletteComponent } from "./colour-palette.component";

describe("ColourPaletteComponent", () => {
  let component: ColourPaletteComponent;
  let fixture: ComponentFixture<ColourPaletteComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ColourPaletteComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(ColourPaletteComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
