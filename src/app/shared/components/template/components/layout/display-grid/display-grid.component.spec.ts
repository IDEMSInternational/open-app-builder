import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TmplDisplayGridComponent } from "./display-grid.component";

describe("RadioButtonGridComponent", () => {
  let component: TmplDisplayGridComponent;
  let fixture: ComponentFixture<TmplDisplayGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmplDisplayGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplDisplayGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
