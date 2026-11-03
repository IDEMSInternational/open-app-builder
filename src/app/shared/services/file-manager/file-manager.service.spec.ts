import { TestBed } from "@angular/core/testing";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { FileManagerService, normaliseFreeDiskSpaceBytes } from "./file-manager.service";
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

  /**
   * Driven against the real (web) Filesystem rather than a stub: Capacitor registers plugins behind
   * a Proxy, so `spyOn(Filesystem, ...)` does not take effect and would silently test nothing.
   */
  describe("getFreeDiskSpaceBytes", () => {
    it("reports unknown on web, where the app writes nothing to device storage", async () => {
      await expectAsync(service.getFreeDiskSpaceBytes()).toBeResolvedTo(undefined);
    });

    it("reports unknown rather than throwing when the plugin is unavailable", async () => {
      // Native is faked, so the plugin resolves to its web implementation, which throws
      spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
      spyOn(console, "warn");

      await expectAsync(service.getFreeDiskSpaceBytes()).toBeResolvedTo(undefined);
    });
  });

  /**
   * The readings themselves are checked here rather than through the service: Capacitor registers
   * plugins behind a Proxy, so `CommunityDevice.getInfo` cannot be stubbed to return one.
   */
  describe("normaliseFreeDiskSpaceBytes", () => {
    it("passes through a usable reading", () => {
      expect(normaliseFreeDiskSpaceBytes(1024)).toBe(1024);
    });

    it("reads 0 as unknown, not as a full disk", () => {
      // The plugin resolves 0 when the native read fails, so the two are indistinguishable
      expect(normaliseFreeDiskSpaceBytes(0)).toBeUndefined();
    });

    it("rejects readings that cannot be acted on", () => {
      expect(normaliseFreeDiskSpaceBytes(undefined)).toBeUndefined();
      expect(normaliseFreeDiskSpaceBytes(-1)).toBeUndefined();
      expect(normaliseFreeDiskSpaceBytes(NaN)).toBeUndefined();
      expect(normaliseFreeDiskSpaceBytes(Infinity)).toBeUndefined();
      expect(normaliseFreeDiskSpaceBytes("1024")).toBeUndefined();
    });
  });

  describe("deleteSavedFolder", () => {
    const TARGET_PATH = "remote_assets";

    beforeEach(() => {
      spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
    });

    it("deletes a folder that exists under the deployment's storage", async () => {
      const path = `${service.cacheName}/${TARGET_PATH}`;
      await Filesystem.mkdir({ path, directory: Directory.Data, recursive: true });

      await expectAsync(service.deleteSavedFolder(TARGET_PATH)).toBeResolvedTo(true);

      await expectAsync(service.getSavedFileInfo(TARGET_PATH)).toBeResolvedTo({ exists: false });
    });

    it("reports nothing deleted when the folder does not exist", async () => {
      // Expected, e.g. resetting before anything has been downloaded - not a failure
      await expectAsync(service.deleteSavedFolder(TARGET_PATH)).toBeResolvedTo(false);
    });

    it("rethrows when a folder that does exist cannot be deleted", async () => {
      // A real filesystem failure must reach the caller rather than looking like "nothing to do".
      // The folder is absent so rmdir genuinely fails; the existence check is what decides which.
      spyOn(service, "getSavedFileInfo").and.resolveTo({ exists: true });

      await expectAsync(service.deleteSavedFolder(TARGET_PATH)).toBeRejected();
    });
  });
});
