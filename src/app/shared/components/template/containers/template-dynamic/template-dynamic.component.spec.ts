import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TemplateDynamicComponent } from "./template-dynamic.component";

describe("TemplateDynamicComponent", () => {
  let component: TemplateDynamicComponent;
  let fixture: ComponentFixture<TemplateDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateDynamicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
