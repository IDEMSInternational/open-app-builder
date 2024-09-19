import { DEPLOYMENT_CONFIG, DeploymentService } from "./deployment.service";
import { TestBed } from "@angular/core/testing";
import { DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS, IDeploymentRuntimeConfig } from "packages/data-models";

const mockConfig: IDeploymentRuntimeConfig = {
  ...DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS,
  name: "test",
};

export class MockDeploymentService implements Partial<DeploymentService> {
  public readonly config: IDeploymentRuntimeConfig;

  constructor(config: Partial<IDeploymentRuntimeConfig>) {
    this.config = { ...DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS, ...config };
  }
  public ready(): boolean {
    return true;
  }
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/deployment/deployment.service.spec.ts
 */
describe("Deployment Service", () => {
  let service: DeploymentService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: DEPLOYMENT_CONFIG, useValue: mockConfig }],
    });
    service = TestBed.inject(DeploymentService);
  });

  it("Loads deployment from injection token", async () => {
    expect(service.config.name).toEqual(mockConfig.name);
  });
});

// LEGACY - should be refactored to test json load during bootstrap

/**
 * 
// NOTE - prefer use of spy to `HttpTestingController` as allows to specify responses
// in advance of request (controller must be called after start of init but before complete)

import { asyncData, asyncError } from "src/test/utils";


  beforeEach(async () => {
    // NOTE - prefer use of spy to `HttpTestingController` as allows to specify responses
    // in advance of request (controller must be called after start of init but before complete)
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    service = new DeploymentService(httpClientSpy);
  });

  it("Loads deployment from assets json", async () => {
    httpClientSpy.get.and.returnValue(asyncData(mockConfig));
    await service.ready();
    expect(service.config().name).toEqual(mockConfig.name);
  });

   it("Handles missing deployment json", async () => {
    const errorResponse = new HttpErrorResponse({
      error: "test 404 error",
      status: 404,
      statusText: "Not Found",
    });
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
    await service.ready();
    expect(service.config().name).toEqual(DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS.name);
    // TODO - could also consider check that logger gets called
  });

 */
