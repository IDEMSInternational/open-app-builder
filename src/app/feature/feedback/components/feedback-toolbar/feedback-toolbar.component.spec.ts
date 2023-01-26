import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FeedbackToolbarComponent } from "./feedback-toolbar.component";

describe("FeedbackToolbarComponent", () => {
  let component: FeedbackToolbarComponent;
  let fixture: ComponentFixture<FeedbackToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
