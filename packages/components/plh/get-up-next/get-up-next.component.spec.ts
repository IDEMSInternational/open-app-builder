import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PlhGetUpNextComponent } from "./get-up-next.component";

describe("PlhGetUpNextComponent", () => {
  let component: PlhGetUpNextComponent;
  let fixture: ComponentFixture<PlhGetUpNextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PlhGetUpNextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlhGetUpNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not render visible UI", () => {
    expect(component.shouldShow()).toBe(false);
  });
});
