import { Inject, Injectable, InjectionToken, OnDestroy, computed, signal } from "@angular/core";
import type { PluginListenerHandle } from "@capacitor/core";
import { Network } from "@capacitor/network";
import type { ConnectionStatus, NetworkPlugin } from "@capacitor/network";

/** Allows tests to provide a mock Network plugin while production uses Capacitor Network. */
export const NETWORK_PLUGIN = new InjectionToken<NetworkPlugin>("NETWORK_PLUGIN", {
  providedIn: "root",
  factory: () => Network,
});

@Injectable({
  providedIn: "root",
})
/** App-wide wrapper for Capacitor Network status, exposed as Angular signals. */
export class NetworkService implements OnDestroy {
  private connectionStatusSignal = signal<ConnectionStatus>(this.getFallbackConnectionStatus());
  public connectionStatus = this.connectionStatusSignal.asReadonly();
  public isConnected = computed(() => this.connectionStatus().connected);
  public isOffline = computed(() => !this.isConnected());

  private networkStatusListener: PluginListenerHandle | null = null;
  private statusChangeCallbacks = new Set<(status: ConnectionStatus) => void>();

  constructor(@Inject(NETWORK_PLUGIN) private networkPlugin: NetworkPlugin) {
    void this.initialise();
  }

  public waitUntilConnected(signal?: AbortSignal) {
    if (signal?.aborted) {
      return Promise.reject(this.createAbortError());
    }
    if (this.isConnected()) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      let removeStatusChangeCallback = () => {};
      const handleAbort = () => {
        removeStatusChangeCallback();
        reject(this.createAbortError());
      };
      removeStatusChangeCallback = this.onStatusChange((status) => {
        if (!status.connected) return;
        removeStatusChangeCallback();
        signal?.removeEventListener("abort", handleAbort);
        resolve();
      });
      signal?.addEventListener("abort", handleAbort, { once: true });
    });
  }

  public onStatusChange(callback: (status: ConnectionStatus) => void): () => void {
    this.statusChangeCallbacks.add(callback);
    return () => {
      this.statusChangeCallbacks.delete(callback);
    };
  }

  private async initialise() {
    try {
      this.setConnectionStatus(await this.networkPlugin.getStatus());
      this.networkStatusListener = await this.networkPlugin.addListener(
        "networkStatusChange",
        (status) => {
          this.setConnectionStatus(status);
        }
      );
    } catch (error) {
      console.error("[Network] Error initialising network status listener", error);
    }
  }

  private setConnectionStatus(status: ConnectionStatus) {
    this.connectionStatusSignal.set(status);
    for (const callback of this.statusChangeCallbacks) {
      callback(status);
    }
  }

  private createAbortError() {
    const error = new Error("Network wait cancelled");
    error.name = "AbortError";
    return error;
  }

  /**
   * Provides a synchronous initial value until Capacitor Network resolves.
   * On native this is only a WebView fallback; `Network.getStatus()` should replace it shortly after startup.
   */
  private getFallbackConnectionStatus(): ConnectionStatus {
    const connected = typeof navigator === "undefined" ? true : navigator.onLine !== false;
    return {
      connected,
      connectionType: connected ? "unknown" : "none",
    };
  }

  ngOnDestroy() {
    void this.networkStatusListener?.remove();
    this.statusChangeCallbacks.clear();
  }
}
