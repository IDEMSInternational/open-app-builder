import { TestBed } from "@angular/core/testing";
import type { ConnectionStatus, NetworkPlugin } from "@capacitor/network";
import { NETWORK_PLUGIN, NetworkService } from "./network.service";

describe("NetworkService", () => {
  let service: NetworkService;
  let mockNetworkPlugin: jasmine.SpyObj<NetworkPlugin>;
  let networkStatusChangeListener: (status: ConnectionStatus) => void;
  let removeListenerSpy: jasmine.Spy;

  const disconnectedStatus: ConnectionStatus = {
    connected: false,
    connectionType: "none",
  };
  const connectedStatus: ConnectionStatus = {
    connected: true,
    connectionType: "wifi",
  };

  beforeEach(() => {
    removeListenerSpy = jasmine.createSpy("removeNetworkStatusListener");
    mockNetworkPlugin = jasmine.createSpyObj<NetworkPlugin>("NetworkPlugin", [
      "getStatus",
      "addListener",
      "removeAllListeners",
    ]);
    mockNetworkPlugin.getStatus.and.resolveTo(disconnectedStatus);
    mockNetworkPlugin.addListener.and.callFake(async (_eventName, listener) => {
      networkStatusChangeListener = listener;
      return { remove: removeListenerSpy };
    });

    TestBed.configureTestingModule({
      providers: [NetworkService, { provide: NETWORK_PLUGIN, useValue: mockNetworkPlugin }],
    });
    service = TestBed.inject(NetworkService);
  });

  async function waitForInitialise() {
    while (!mockNetworkPlugin.addListener.calls.any()) {
      await Promise.resolve();
    }
  }

  it("initialises connection status from Capacitor Network", async () => {
    await waitForInitialise();

    expect(service.connectionStatus()).toEqual(disconnectedStatus);
    expect(service.isConnected()).toBeFalse();
    expect(service.isOffline()).toBeTrue();
  });

  it("updates connection signals when network status changes", async () => {
    await waitForInitialise();

    networkStatusChangeListener(connectedStatus);

    expect(service.connectionStatus()).toEqual(connectedStatus);
    expect(service.isConnected()).toBeTrue();
    expect(service.isOffline()).toBeFalse();
  });

  it("waits until connected", async () => {
    await waitForInitialise();
    const waitPromise = service.waitUntilConnected();

    networkStatusChangeListener(connectedStatus);

    await expectAsync(waitPromise).toBeResolved();
  });

  it("rejects connection wait when aborted", async () => {
    await waitForInitialise();
    const abortController = new AbortController();
    const waitPromise = service.waitUntilConnected(abortController.signal);

    abortController.abort();

    await expectAsync(waitPromise).toBeRejectedWith(
      jasmine.objectContaining({ name: "AbortError" })
    );
  });

  it("removes the Capacitor listener on destroy", async () => {
    await waitForInitialise();

    service.ngOnDestroy();

    expect(removeListenerSpy).toHaveBeenCalled();
  });
});
