import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TmplOdkFormComponent } from "./odk-form.component";

describe("OdkFormComponent", () => {
  let component: TmplOdkFormComponent;
  let fixture: ComponentFixture<TmplOdkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmplOdkFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplOdkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
