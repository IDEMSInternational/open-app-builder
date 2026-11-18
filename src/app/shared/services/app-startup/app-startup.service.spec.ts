import { TestBed } from "@angular/core/testing";
import { AppStartupService } from "./app-startup.service";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/app-startup/app-startup.service.spec.ts
 */
describe("AppStartupService", () => {
  let service: AppStartupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStartupService);
  });

  it("should not be complete initially", () => {
    expect(service.isComplete).toBeFalse();
  });

  it("should resolve whenComplete only once startup is marked complete", async () => {
    let resolved = false;
    const whenComplete = service.whenComplete().then(() => (resolved = true));
    await Promise.resolve();
    expect(resolved).toBeFalse();

    service.markComplete();
    await whenComplete;
    expect(resolved).toBeTrue();
    expect(service.isComplete).toBeTrue();
  });

  it("should resolve whenComplete immediately once startup is complete", async () => {
    service.markComplete();
    await expectAsync(service.whenComplete()).toBeResolvedTo(true);
  });
});
