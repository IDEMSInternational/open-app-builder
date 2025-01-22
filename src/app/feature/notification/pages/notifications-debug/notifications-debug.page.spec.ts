import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NotificationsDebugPage } from "./notifications-debug.page";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";

describe("NotificationsDebugPage", () => {
  let component: NotificationsDebugPage;
  let fixture: ComponentFixture<NotificationsDebugPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsDebugPage],
      providers: [
        { provide: LocalNotificationService, useValue: {} },
        { provide: DBSyncService, useValue: {} },
      ],
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
