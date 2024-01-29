import { TestBed } from "@angular/core/testing";

import { AppConfigService } from "./app-config.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { IAppConfig } from "../../model";

/** Mock calls for field values from the template field service to return test data */
export class MockAppConfigService implements Partial<AppConfigService> {
  appConfig$ = new BehaviorSubject<IAppConfig>(undefined as any);

  // allow additional specs implementing service to provide their own partial appConfig
  constructor(mockAppConfig: Partial<IAppConfig> = {}) {
    this.appConfig$.next(mockAppConfig as any);
  }

  public ready(timeoutValue?: number) {
    return true;
  }
}

describe("AppConfigService", () => {
  let service: AppConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppConfigService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
