import { TestBed } from "@angular/core/testing";
import { FileManagerService } from "./file-manager.service";
import { ErrorHandlerService } from "../error-handler/error-handler.service";
import { MockErrorHandlerService } from "../error-handler/error-handler.service.mock.spec";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { DeploymentService } from "../deployment/deployment.service";
import { MockDeploymentService } from "../deployment/deployment.service.mock.spec";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/file-manager/file-manager.service.spec.ts
 */
describe("FileManagerService", () => {
  let service: FileManagerService;
  let registeredHandlers: any;

  beforeEach(() => {
    registeredHandlers = {};
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: ErrorHandlerService, useValue: new MockErrorHandlerService() },
        { provide: TemplateAssetService, useValue: {} },
        {
          provide: TemplateActionRegistry,
          useValue: { register: (handlers: any) => (registeredHandlers = handlers) },
        },
        { provide: DeploymentService, useValue: new MockDeploymentService() },
      ],
    });
    service = TestBed.inject(FileManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("handles save_to_device actions without params", async () => {
    const downloadTemplateAssetSpy = spyOn<any>(service, "downloadTemplateAsset").and.resolveTo();

    await registeredHandlers.save_to_device({
      trigger: "click",
      action_id: "save_to_device",
      args: ["assets/example.pdf"],
    });

    expect(downloadTemplateAssetSpy).toHaveBeenCalledOnceWith({
      relativePath: "assets/example.pdf",
      open: true,
    });
  });
});
