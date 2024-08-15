import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { TmplMapComponent } from "./map.component";

describe("MapComponent", () => {
  let component: TmplMapComponent;
  let fixture: ComponentFixture<TmplMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TmplMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
