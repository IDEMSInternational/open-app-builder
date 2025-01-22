import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { DeploymentService } from "../deployment/deployment.service";
import { MockDeploymentService } from "../deployment/deployment.service.mock.spec";
import { TemplateService } from "../../components/template/services/template.service";
import { ServerService } from "../server/server.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DeploymentService, useValue: new MockDeploymentService() },
        { provide: TemplateService, useValue: {} },
        { provide: ServerService, useValue: {} },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
