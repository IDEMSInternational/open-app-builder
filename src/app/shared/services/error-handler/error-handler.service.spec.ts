import { TestBed } from "@angular/core/testing";

import { ErrorHandlerService } from "./error-handler.service";
import { FirebaseService } from "../firebase/firebase.service";
import { DeploymentService } from "../deployment/deployment.service";
import { MockDeploymentService } from "../deployment/deployment.service.spec";

describe("ErrorHandlerService", () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FirebaseService,
          useValue: {},
        },
        { provide: DeploymentService, useValue: new MockDeploymentService({}) },
      ],
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
