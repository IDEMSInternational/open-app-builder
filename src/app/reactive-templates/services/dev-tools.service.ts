import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

/** Must match `DEV_SERVER_DEFAULT_PORT` in packages/scripts/src/tasks/providers/beta/devServer.ts */
const DEV_SERVER_URL = "http://127.0.0.1:3010";
const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1", "[::1]"];

export interface IOpenSheetResult {
  flow_name: string;
  url: string;
  created: boolean;
}

export interface ISyncTransientSheetsResult {
  sheets: number;
  flows: number;
  updated: number;
}

/**
 * Calls the local dev server started by `yarn workflow beta dev_server`, so debug tools can run
 * beta workflow commands. Only available in non-production builds served from this machine
 */
@Injectable({ providedIn: "root" })
export class DevToolsService {
  public readonly isAvailable =
    !environment.production && LOCAL_HOSTNAMES.includes(window.location.hostname);

  /** Open the sheet for a flow, creating a new sheet if the flow has no `_source` */
  public openSheet(flowName: string, flowType?: string) {
    return this.post<IOpenSheetResult>("/sheets/open", {
      flow_name: flowName,
      flow_type: flowType,
    });
  }

  /** Sync sheets from the deployment google drive folders (`beta sync_fixed_sheets`) */
  public syncFixedSheets() {
    return this.post<{ ok: boolean }>("/sheets/sync_fixed");
  }

  /** Sync sheets created from flows (`beta sync_transient_sheets`) */
  public syncTransientSheets() {
    return this.post<ISyncTransientSheetsResult>("/sheets/sync_transient");
  }

  private async post<T>(endpoint: string, data: Record<string, unknown> = {}): Promise<T> {
    if (!this.isAvailable) {
      throw new Error("Dev tools are only available when running the app locally");
    }
    let res: Response;
    try {
      res = await fetch(`${DEV_SERVER_URL}${endpoint}`, {
        method: "POST",
        // A json body makes the browser check the server's allowed origins before sending
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      throw new Error("Dev server not running. Start it with: yarn workflow beta dev_server");
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(body.error || `Dev server error: ${res.status}`);
    }
    return body as T;
  }
}
