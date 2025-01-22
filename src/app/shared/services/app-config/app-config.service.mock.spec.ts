import { AppConfigService } from "./app-config.service";
import { IAppConfig } from "../../model";

import { MockDeploymentService } from "../deployment/deployment.service.mock.spec";
import { DeploymentService } from "../deployment/deployment.service";
import { Router } from "@angular/router";

/** Mock calls for field values from the template field service to return test data */
export class MockAppConfigService extends AppConfigService {
  constructor(mockAppConfig: Partial<IAppConfig> = {}) {
    super(
      new MockDeploymentService({ app_config: mockAppConfig }) as any as DeploymentService,
      { resetConfig: () => null } as any as Router
    );
  }
}
