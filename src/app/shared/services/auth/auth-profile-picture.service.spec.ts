import { TestBed } from "@angular/core/testing";
import { Capacitor } from "@capacitor/core";
import { AuthProfilePictureService } from "./auth-profile-picture.service";
import { SystemVariableService } from "../system-variable/system-variable.service";
import { FileManagerService } from "../file-manager/file-manager.service";

/** Flush microtasks after fire-and-forget setFromRemoteUrl calls */
const flushAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("AuthProfilePictureService", () => {
  let service: AuthProfilePictureService;
  let systemVariableService: jasmine.SpyObj<SystemVariableService>;

  beforeEach(() => {
    systemVariableService = jasmine.createSpyObj("SystemVariableService", ["set", "remove"]);

    TestBed.configureTestingModule({
      providers: [
        AuthProfilePictureService,
        { provide: SystemVariableService, useValue: systemVariableService },
        { provide: FileManagerService, useValue: {} },
      ],
    });
    service = TestBed.inject(AuthProfilePictureService);
  });

  it("should cache via FileManager on native and store src in AUTH_USER_PICTURE", async () => {
    spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
    spyOn(service as any, "cacheViaFileManager").and.resolveTo({
      src: "capacitor://localhost/_capacitor_file_/profile.jpg",
      revoke: () => {},
    });

    service.setFromRemoteUrl("https://lh3.googleusercontent.com/a/example=s96-c");
    await flushAsync();

    expect((service as any).cacheViaFileManager).toHaveBeenCalledWith(
      "https://lh3.googleusercontent.com/a/example=s96-c"
    );
    expect(systemVariableService.set).toHaveBeenCalledWith(
      "AUTH_USER_PICTURE",
      "capacitor://localhost/_capacitor_file_/profile.jpg"
    );
  });

  it("should cache via Image element on web", async () => {
    spyOn(Capacitor, "isNativePlatform").and.returnValue(false);
    const cached = {
      src: "blob:http://localhost/cached-picture",
      revoke: jasmine.createSpy("revoke"),
    };
    spyOn(service as any, "cacheViaImageElement").and.resolveTo(cached);

    service.setFromRemoteUrl("https://lh3.googleusercontent.com/a/example=s96-c");
    await flushAsync();

    expect((service as any).cacheViaImageElement).toHaveBeenCalledWith(
      "https://lh3.googleusercontent.com/a/example=s96-c"
    );
    expect(systemVariableService.set).toHaveBeenCalledWith(
      "AUTH_USER_PICTURE",
      "blob:http://localhost/cached-picture"
    );
  });

  it("should dedupe concurrent requests for the same URL", async () => {
    spyOn(Capacitor, "isNativePlatform").and.returnValue(false);
    let resolveCache: (value: { src: string; revoke: () => void }) => void;
    const cachePromise = new Promise<{ src: string; revoke: () => void }>((resolve) => {
      resolveCache = resolve;
    });
    spyOn(service as any, "cacheViaImageElement").and.returnValue(cachePromise);

    const url = "https://lh3.googleusercontent.com/a/example=s96-c";
    service.setFromRemoteUrl(url);
    service.setFromRemoteUrl(url);

    resolveCache!({ src: "blob:http://localhost/shared", revoke: () => {} });
    await flushAsync();

    expect((service as any).cacheViaImageElement).toHaveBeenCalledTimes(1);
    expect(systemVariableService.set).toHaveBeenCalledTimes(1);
  });

  it("should not throw when caching fails", async () => {
    spyOn(Capacitor, "isNativePlatform").and.returnValue(false);
    spyOn(service as any, "cacheViaImageElement").and.rejectWith(new Error("Network error"));

    expect(() => service.setFromRemoteUrl("https://example.com/photo.jpg")).not.toThrow();
    await flushAsync();

    expect(systemVariableService.set).toHaveBeenCalledWith("AUTH_USER_PICTURE", "");
  });

  it("should clear AUTH_USER_PICTURE when remote URL is empty", async () => {
    service.setFromRemoteUrl("");
    await flushAsync();

    expect(systemVariableService.set).toHaveBeenCalledWith("AUTH_USER_PICTURE", "");
  });

  it("should remove AUTH_USER_PICTURE on clear", () => {
    service.clear();

    expect(systemVariableService.remove).toHaveBeenCalledWith("AUTH_USER_PICTURE");
  });

  it("should not throw when clear fails during revoke", () => {
    (service as any).revoke = () => {
      throw new Error("Revoke failed");
    };

    expect(() => service.clear()).not.toThrow();
    expect(systemVariableService.remove).toHaveBeenCalledWith("AUTH_USER_PICTURE");
  });
});
