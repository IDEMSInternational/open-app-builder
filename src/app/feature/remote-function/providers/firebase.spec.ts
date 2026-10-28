import { Injector, runInInjectionContext } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { GetTokenResult } from "@capacitor-firebase/app-check";
import { CallByNameResult } from "@capacitor-firebase/functions";

import { FirebaseFunctionProvider } from "./firebase";
import { RemoteFunctionInvokeParams } from "./base";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { MockDeploymentService } from "src/app/shared/services/deployment/deployment.service.mock.spec";

const MOCK_TOKEN: GetTokenResult = { token: "mock-token", expireTimeMillis: 0 };
const MOCK_FUNCTION_RESULT: CallByNameResult = { data: { result: "ok" } };

/**
 * Stubs the native plugin calls so behaviour of the provider itself can be asserted.
 * Individual specs override the `*Handler` properties to simulate failure or hanging calls
 */
class TestFirebaseFunctionProvider extends FirebaseFunctionProvider {
  public setupCallCount = 0;
  public tokenCallCount = 0;
  public tokenForceRefreshCalls: boolean[] = [];

  /** Kept short so the timeout path can be asserted without waiting on the production value */
  public override appCheckTokenTimeoutMs = 20;

  public setupHandler: () => Promise<void> = async () => {};
  public tokenHandler: () => Promise<GetTokenResult> = async () => MOCK_TOKEN;
  public functionHandler: () => Promise<CallByNameResult> = async () => MOCK_FUNCTION_RESULT;

  protected override async setupAppCheck() {
    this.setupCallCount++;
    return this.setupHandler();
  }

  protected override async getAppCheckToken(forceRefresh: boolean) {
    this.tokenCallCount++;
    this.tokenForceRefreshCalls.push(forceRefresh);
    return this.tokenHandler();
  }

  protected override async callFunction(name: string, params: RemoteFunctionInvokeParams) {
    return this.functionHandler();
  }
}

/** Promise that never settles, to simulate a hanging native call (e.g. iOS App Attest) */
const neverResolves = () => new Promise<never>(() => {});

/** Allow any pending (deliberately un-awaited) background work to settle */
const flushPending = () => new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/feature/remote-function/providers/firebase.spec.ts
 */
describe("FirebaseFunctionProvider", () => {
  let provider: TestFirebaseFunctionProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DeploymentService, useValue: new MockDeploymentService() }],
    });
    const injector = TestBed.inject(Injector);
    provider = runInInjectionContext(
      injector,
      () => new TestFirebaseFunctionProvider(injector)
    ) as TestFirebaseFunctionProvider;
  });

  it("registers the appCheck provider once, regardless of how many times initialise is called", async () => {
    await Promise.all([provider.initialise(), provider.initialise(), provider.initialise()]);
    expect(provider.setupCallCount).toEqual(1);
  });

  it("invokes a function without waiting for the appCheck token", async () => {
    // Simulate iOS App Attest hanging indefinitely
    provider.tokenHandler = neverResolves;

    const { data, error } = await provider.invoke("testFunction", {});

    expect(error).toBeUndefined();
    expect(data).toEqual(MOCK_FUNCTION_RESULT);
  });

  it("still invokes a function when appCheck setup fails, and does not retry setup", async () => {
    provider.setupHandler = async () => {
      throw new Error("appCheck unavailable");
    };

    const first = await provider.invoke("testFunction", {});
    const second = await provider.invoke("testFunction", {});

    expect(first.data).toEqual(MOCK_FUNCTION_RESULT);
    expect(second.data).toEqual(MOCK_FUNCTION_RESULT);
    expect(provider.setupCallCount).toEqual(1);
    expect(provider.appCheckTokenError()).toEqual("appCheck unavailable");
    // No token should be requested if the provider was never registered
    expect(provider.tokenCallCount).toEqual(0);
  });

  it("populates the token signal from the background fetch triggered on initialise", async () => {
    await provider.initialise();
    // Background fetch is deliberately not awaited by initialise
    await flushPending();

    expect(provider.appCheckToken()).toEqual(MOCK_TOKEN);
    expect(provider.appCheckTokenError()).toBeUndefined();
    expect(provider.tokenForceRefreshCalls).toEqual([false]);
  });

  it("reports token failure without rejecting", async () => {
    provider.tokenHandler = async () => {
      throw new Error("no attestation");
    };

    await provider.refreshAppCheckToken();

    expect(provider.appCheckToken()).toBeUndefined();
    expect(provider.appCheckTokenError()).toEqual("no attestation");
  });

  it("reports a timeout when token retrieval hangs", async () => {
    provider.tokenHandler = neverResolves;

    await provider.refreshAppCheckToken();

    expect(provider.appCheckToken()).toBeUndefined();
    expect(provider.appCheckTokenError()).toContain("Timed out");
  });

  /**
   * Token requests cannot be cancelled, so a slow background fetch can settle long after a newer
   * explicit refresh has already reported a result
   */
  it("ignores a stale token result that settles after a newer request", async () => {
    let failBackgroundFetch: (error: Error) => void;
    provider.tokenHandler = () => new Promise((_, reject) => (failBackgroundFetch = reject));
    await provider.initialise();

    // Explicit refresh supersedes the still-pending background fetch, and succeeds
    provider.tokenHandler = async () => MOCK_TOKEN;
    await provider.refreshAppCheckToken();

    // Background fetch now fails, and must not clobber the newer result
    failBackgroundFetch(new Error("late failure"));
    await flushPending();

    expect(provider.appCheckToken()).toEqual(MOCK_TOKEN);
    expect(provider.appCheckTokenError()).toBeUndefined();
  });

  /** As above, but with the outcomes reversed - a stale success must not overwrite a newer failure */
  it("ignores a stale token success that settles after a newer request has failed", async () => {
    let completeBackgroundFetch: (token: GetTokenResult) => void;
    provider.tokenHandler = () => new Promise((resolve) => (completeBackgroundFetch = resolve));
    await provider.initialise();

    // Explicit refresh supersedes the still-pending background fetch, and fails
    provider.tokenHandler = async () => {
      throw new Error("no attestation");
    };
    await provider.refreshAppCheckToken();

    // Background fetch now succeeds, and must not clobber the newer result
    completeBackgroundFetch(MOCK_TOKEN);
    await flushPending();

    expect(provider.appCheckToken()).toBeUndefined();
    expect(provider.appCheckTokenError()).toEqual("no attestation");
  });

  it("does not attempt a token refresh when appCheck setup failed", async () => {
    provider.setupHandler = async () => {
      throw new Error("appCheck unavailable");
    };

    await provider.refreshAppCheckToken();

    expect(provider.tokenCallCount).toEqual(0);
    // Original setup error preserved rather than replaced by a token error
    expect(provider.appCheckTokenError()).toEqual("appCheck unavailable");
  });

  it("requests a forced refresh from the debug page, without joining a hung background fetch", async () => {
    provider.tokenHandler = neverResolves;
    await provider.initialise();
    // Background fetch is now hanging. An explicit refresh must issue its own request
    provider.tokenHandler = async () => MOCK_TOKEN;

    await provider.refreshAppCheckToken();

    expect(provider.appCheckToken()).toEqual(MOCK_TOKEN);
    expect(provider.tokenForceRefreshCalls).toEqual([false, true]);
  });
});
