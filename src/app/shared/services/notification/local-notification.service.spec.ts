import { TestBed } from "@angular/core/testing";

import { LocalNotificationService } from "./local-notification.service";

describe("LocalNotificationService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: LocalNotificationService = TestBed.get(
      LocalNotificationService
    );
    expect(service).toBeTruthy();
  });
});
