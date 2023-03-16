import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TmplRadioGroupGridComponent } from "./radio-group-grid.component";

describe("RadioGroupGridComponent", () => {
  let component: TmplRadioGroupGridComponent;
  let fixture: ComponentFixture<TmplRadioGroupGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmplRadioGroupGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplRadioGroupGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
