import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TmplDataItemsComponent } from "./data-items.component";

describe("DataItemsComponent", () => {
  let component: TmplDataItemsComponent;
  let fixture: ComponentFixture<TmplDataItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmplDataItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplDataItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
