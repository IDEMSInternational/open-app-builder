import { DeploymentService } from "./deployment.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS, IDeploymentRuntimeConfig } from "packages/data-models";
import { asyncData, asyncError } from "src/test/utils";

const mockConfig: IDeploymentRuntimeConfig = {
  ...DEPLOYMENT_RUNTIME_CONFIG_DEFAULTS,
  name: "test",
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/deployment/deployment.service.spec.ts
 */
describe("Deployment Service", () => {
  let service: DeploymentService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

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
});
