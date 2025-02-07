import { TestBed } from "@angular/core/testing";

import { AppUpdateService } from "./app-update.service";
import { AppConfigService } from "../app-config/app-config.service";
import { MockAppConfigService } from "../app-config/app-config.service.mock.spec";
import { TemplateNavService } from "../../components/template/services/template-nav.service";
import { MockSyncServiceBase } from "../syncService.base.mock.spec";

describe("AppUpdateService", () => {
  let service: AppUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppConfigService,
          useValue: new MockAppConfigService({
            APP_UPDATES: { enabled: true, completeUpdateTemplate: "" },
          }),
        },
        { provide: TemplateNavService, useValue: new MockSyncServiceBase() },
      ],
    });
    service = TestBed.inject(AppUpdateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
