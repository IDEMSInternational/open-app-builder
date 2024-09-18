import { TestBed } from "@angular/core/testing";

import { AppConfigService } from "./app-config.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { IAppConfig } from "../../model";
import { signal } from "@angular/core";
import { DeploymentService } from "../deployment/deployment.service";
import { IAppConfigOverride } from "packages/data-models";
import { deepMergeObjects } from "../../utils";

/** Mock calls for field values from the template field service to return test data */
export class MockAppConfigService implements Partial<AppConfigService> {
  appConfig = signal<IAppConfig>(undefined as any);
  appConfig$ = new BehaviorSubject<IAppConfig>(undefined as any);

  // allow additional specs implementing service to provide their own partial appConfig
  constructor(private mockAppConfig: Partial<IAppConfig> = {}) {
    this.setAppConfig();
  }

  public ready(timeoutValue?: number) {
    return true;
  }

  public setAppConfig(overrides: IAppConfigOverride = {}) {
    // merge onto empty object to avoid shared references across tests
    const mergedConfig = deepMergeObjects({}, this.mockAppConfig, overrides) as IAppConfig;
    this.appConfig$.next(mergedConfig);
    this.appConfig.set(mergedConfig);
  }
}

describe("AppConfigService", () => {
  let service: AppConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DeploymentService, useValue: { config: {} } }],
    });
    service = TestBed.inject(AppConfigService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
