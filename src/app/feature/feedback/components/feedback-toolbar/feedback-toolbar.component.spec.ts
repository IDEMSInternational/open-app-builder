import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FeedbackToolbarComponent } from "./feedback-toolbar.component";
import { PopoverController } from "@ionic/angular";

describe("FeedbackToolbarComponent", () => {
  let component: FeedbackToolbarComponent;
  let fixture: ComponentFixture<FeedbackToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackToolbarComponent],
      providers: [{ provide: PopoverController, useValue: {} }],
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
