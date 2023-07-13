import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TmplRadioButtonGridComponent } from "./radio-button-grid.component";

describe("RadioButtonGridComponent", () => {
  let component: TmplRadioButtonGridComponent;
  let fixture: ComponentFixture<TmplRadioButtonGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmplRadioButtonGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplRadioButtonGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
