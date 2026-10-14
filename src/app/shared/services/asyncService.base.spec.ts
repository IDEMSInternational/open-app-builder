import { AsyncServiceBase } from "./asyncService.base";

class TestAsyncService extends AsyncServiceBase {
  public initCallCount = 0;

  constructor(private initImplementation: () => Promise<void> = async () => {}) {
    super("TestAsyncService");
    this.registerInitFunction(this.init, "defer");
  }

  private init = async () => {
    this.initCallCount++;
    await this.initImplementation();
  };
}

describe("AsyncServiceBase", () => {
  it("resolves ready() and marks service ready after successful init", async () => {
    const service = new TestAsyncService();
    expect(service.isReady()).toEqual(false);

    await service.ready();

    expect(service.isReady()).toEqual(true);
    expect(service.initError).toBeUndefined();
    expect(service.initCallCount).toEqual(1);
  });

  it("only calls the init function once across multiple ready() calls", async () => {
    const service = new TestAsyncService();

    await Promise.all([service.ready(), service.ready(), service.ready()]);

    expect(service.initCallCount).toEqual(1);
  });

  /**
   * A failed init must not leave the service permanently unready, as init is only ever attempted
   * once and dependent services would otherwise stall on the `ready()` timeout (default 60s)
   */
  it("resolves ready() without stalling when init fails", async () => {
    const initError = new Error("init failed");
    const service = new TestAsyncService(async () => {
      throw initError;
    });

    const startTime = performance.now();
    await service.ready();
    const elapsed = performance.now() - startTime;

    expect(elapsed).toBeLessThan(1000);
    expect(service.isReady()).toEqual(true);
    expect(service.initError).toBe(initError);
  });

  it("resolves subsequent ready() calls immediately after a failed init", async () => {
    const service = new TestAsyncService(async () => {
      throw new Error("init failed");
    });
    await service.ready();

    const startTime = performance.now();
    await service.ready();
    const elapsed = performance.now() - startTime;

    expect(elapsed).toBeLessThan(1000);
    expect(service.initCallCount).toEqual(1);
  });
});
