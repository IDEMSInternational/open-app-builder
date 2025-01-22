import { TestBed } from "@angular/core/testing";

import { SeoService } from "./seo.service";
import { DeploymentService } from "../deployment/deployment.service";
import { MockDeploymentService } from "../deployment/deployment.service.mock.spec";

describe("SeoService", () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DeploymentService, useValue: new MockDeploymentService() }],
    });
    service = TestBed.inject(SeoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
