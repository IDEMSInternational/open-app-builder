import { TestBed } from "@angular/core/testing";

import { LocalNotificationService } from "./local-notification.service";
import { AppConfigService } from "../app-config/app-config.service";
import { MockAppConfigService } from "../app-config/app-config.service.mock.spec";

describe("LocalNotificationService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: AppConfigService, useValue: new MockAppConfigService() }],
    })
  );

  it("should be created", () => {
    const service: LocalNotificationService = TestBed.get(LocalNotificationService);
    expect(service).toBeTruthy();
  });
});
