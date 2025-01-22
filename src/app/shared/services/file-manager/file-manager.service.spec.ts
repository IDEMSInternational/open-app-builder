import { TestBed } from "@angular/core/testing";
import { FileManagerService } from "./file-manager.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ErrorHandlerService } from "../error-handler/error-handler.service";
import { MockErrorHandlerService } from "../error-handler/error-handler.service.mock.spec";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { DeploymentService } from "../deployment/deployment.service";
import { MockDeploymentService } from "../deployment/deployment.service.spec";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/file-manager/file-manager.service.spec.ts
 */
describe("FileManagerService", () => {
  let service: FileManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ErrorHandlerService, useValue: new MockErrorHandlerService() },
        { provide: TemplateAssetService, useValue: {} },
        { provide: DeploymentService, useValue: new MockDeploymentService({}) },
      ],
    });
    service = TestBed.inject(FileManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
