import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ITransientSheetEntry, parseTransientSheetsList } from "../debug/debug-sheets.utils";

/** Must match `DEV_SERVER_DEFAULT_PORT` in packages/scripts/src/tasks/providers/beta/devServer.ts */
const DEV_SERVER_URL = "http://127.0.0.1:3010";
const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1", "[::1]"];
/**
 * Written by `beta open_sheet`, with the transient sheets folder and the flows linked to
 * transient sheets (`{ folder, sheets }`). Only exists once a sheet has been created
 */
const TRANSIENT_SHEETS_LIST_PATH = "assets/app_data/transient_sheets.json";

export interface IOpenSheetResult {
  flow_name: string;
  url: string;
  created: boolean;
}

export interface ICreateSheetResult extends IOpenSheetResult {
  /** All flows in the sheet, when created with several flows */
  flow_names?: string[];
}

export interface ISyncTransientSheetsResult {
  sheets: number;
  flows: number;
  /** Flow jsons updated in the external deployment `app_data/sheets` folder */
  updated: number;
  /** Flows added to a sheet's content list, now listed as transient sheets */
  added: number;
}

export interface IRemoveTransientSheetResult {
  removed: string[];
  deleted: number;
  /** Urls of sheets that could not be deleted, although their flows were unlinked */
  failed: string[];
}

export interface ISyncFlowFilesResult {
  /** Flow jsons in the external deployment sheets folder */
  files: number;
  changed: number;
  removed: number;
  /** Flows processed, which is all flows if any file was removed */
  flows: number;
}

export interface ISyncTranslationsResult {
  flows: number;
}

/**
 * Calls the local dev server started by `yarn workflow beta dev_server`, so debug tools can run
 * beta workflow commands. Only available in non-production builds served from this machine
 */
@Injectable({ providedIn: "root" })
export class DevToolsService {
  public readonly isAvailable =
    !environment.production && LOCAL_HOSTNAMES.includes(window.location.hostname);

  /**
   * Flows linked to transient sheets, from the transient sheets list in the app assets.
   * Processed flows are not linked to their transient sheet, so this is used to find it
   */
  public async getTransientSheets(): Promise<ITransientSheetEntry[]> {
    try {
      const res = await fetch(`${TRANSIENT_SHEETS_LIST_PATH}?t=${Date.now()}`);
      return res.ok ? parseTransientSheetsList(await res.json()) : [];
    } catch {
      // No transient sheets created
      return [];
    }
  }

  /** Url of the transient sheet a flow is linked to, if any */
  public async getTransientSheetUrl(flowType: string, flowName: string) {
    const entries = await this.getTransientSheets();
    return entries.find((e) => e.flow_type === flowType && e.flow_name === flowName)?.url;
  }

  /** Open the sheet for a flow, creating a new sheet if the flow has no `_source` */
  public openSheet(flowName: string, flowType?: string) {
    return this.post<IOpenSheetResult>("/sheets/open", {
      flow_name: flowName,
      flow_type: flowType,
    });
  }

  /**
   * Create one sheet with all the given flows, recorded as the sheet of `folder` so the flows
   * are removed together (see `removeFolderSheet`)
   */
  public createFolderSheet(flows: { flow_name: string; flow_type: string }[], folder: string) {
    return this.post<ICreateSheetResult>("/sheets/create", { flows, sheet_name: folder, folder });
  }

  /** Delete the sheet created for a folder and unlink all its flows */
  public removeFolderSheet(folder: string) {
    return this.post<IRemoveTransientSheetResult>("/sheets/remove_transient", { folder });
  }

  /** Sync sheets from the deployment google drive folders (`beta sync_fixed_sheets`) */
  public syncFixedSheets() {
    return this.post<{ ok: boolean }>("/sheets/sync_fixed");
  }

  /** Sync sheets created from flows (`beta sync_transient_sheets`) */
  public syncTransientSheets() {
    return this.post<ISyncTransientSheetsResult>("/sheets/sync_transient");
  }

  /**
   * Delete the transient sheet of a flow (or `ALL`) from google drive and unlink the flow
   * (`beta remove_transient_sheet`)
   */
  public removeTransientSheet(flowName: string, flowType?: string) {
    return this.post<IRemoveTransientSheetResult>("/sheets/remove_transient", {
      flow_name: flowName,
      flow_type: flowType,
    });
  }

  /** Process flow jsons changed in the local external deployment (`beta sync_flow_files`) */
  public syncFlowFiles() {
    return this.post<ISyncFlowFilesResult>("/flows/sync");
  }

  /** Re-process all flows with the latest translations (`beta sync_translations`) */
  public syncTranslations() {
    return this.post<ISyncTranslationsResult>("/translations/sync");
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
