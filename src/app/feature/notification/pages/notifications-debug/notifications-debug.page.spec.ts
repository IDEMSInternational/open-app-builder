import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NotificationsDebugPage } from "./notifications-debug.page";

describe("NotificationsDebugPage", () => {
  let component: NotificationsDebugPage;
  let fixture: ComponentFixture<NotificationsDebugPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsDebugPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsDebugPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
