import { TestBed } from "@angular/core/testing";

import { AppConfigService } from "./app-config.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { IAppConfig } from "../../model";
import { signal, WritableSignal } from "@angular/core";
import { DeploymentService } from "../deployment/deployment.service";
import { IAppConfigOverride, IDeploymentRuntimeConfig } from "packages/data-models";
import { deepMergeObjects } from "../../utils";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { MockDeploymentService } from "../deployment/deployment.service.spec";

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

const MOCK_DEPLOYMENT_CONFIG: Partial<IDeploymentRuntimeConfig> = {
  app_config: { APP_FOOTER_DEFAULTS: { templateName: "mock_footer" } },
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/app-config/app-config.service.spec.ts
 */
describe("AppConfigService", () => {
  let service: AppConfigService;
  let appConfigSetSpy: jasmine.Spy<WritableSignal<IAppConfig>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DeploymentService, useValue: new MockDeploymentService(MOCK_DEPLOYMENT_CONFIG) },
      ],
    });
    service = TestBed.inject(AppConfigService);
    appConfigSetSpy = spyOn(service.appConfig, "set").and.callThrough();
  });

  it("applies default config overrides on init", () => {
    expect(service.appConfig().APP_HEADER_DEFAULTS.title).toEqual("App");
  });

  it("applies deployment-specific config overrides on init", () => {
    expect(service.appConfig().APP_FOOTER_DEFAULTS.templateName).toEqual("mock_footer");
  });

  it("applies skin-level overrides to app config", () => {
    service.setAppConfig({ APP_HEADER_DEFAULTS: { title: "updated" } }, "skin");
    expect(service.appConfig().APP_HEADER_DEFAULTS.title).toEqual("updated");
    // also ensure doesn't unset default deployment
    expect(service.appConfig().APP_FOOTER_DEFAULTS.templateName).toEqual("mock_footer");
  });

  it("emits partial changes on app config update", async () => {
    firstValueFrom(service.changes$).then((v) => {
      expect(v).toEqual({ APP_HEADER_DEFAULTS: { title: "partial changes" } });
    });
    service.setAppConfig({ APP_HEADER_DEFAULTS: { title: "partial changes" } }, "skin");
    expect(appConfigSetSpy).toHaveBeenCalledTimes(1);
  });

  it("ignores lower-order updates when higher order exists", async () => {
    service.setAppConfig({ APP_FOOTER_DEFAULTS: { templateName: "template_footer" } }, "template");
    expect(service.appConfig().APP_FOOTER_DEFAULTS.templateName).toEqual("template_footer");
    service.setAppConfig({ APP_FOOTER_DEFAULTS: { templateName: "skin_footer" } }, "skin");
    expect(service.appConfig().APP_FOOTER_DEFAULTS.templateName).toEqual("template_footer");
    // the second service set should not trigger any changes to appConfig signal (or observable)
    expect(appConfigSetSpy).toHaveBeenCalledTimes(1);
  });

  it("reverts to initial config values when template override removed", async () => {
    service.setAppConfig({ APP_FOOTER_DEFAULTS: { templateName: "template_footer" } }, "template");
    expect(service.appConfig().APP_FOOTER_DEFAULTS.templateName).toEqual("template_footer");
    service.setAppConfig({}, "template");
    expect(service.appConfig().APP_FOOTER_DEFAULTS.templateName).toEqual("mock_footer");
  });
});
