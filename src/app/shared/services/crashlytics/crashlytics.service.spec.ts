import { TestBed } from "@angular/core/testing";

import { CrashlyticsService } from "./crashlytics.service";
import { DeploymentService } from "../deployment/deployment.service";
import { MockDeploymentService } from "../deployment/deployment.service.spec";

describe("CrashlyticsService", () => {
  let service: CrashlyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DeploymentService, useValue: new MockDeploymentService({}) }],
    });
    service = TestBed.inject(CrashlyticsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
