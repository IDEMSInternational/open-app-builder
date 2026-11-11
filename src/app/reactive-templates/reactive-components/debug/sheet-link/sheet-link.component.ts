import { Component, computed, inject, input, signal } from "@angular/core";
import { DevToolsService } from "../../../services/dev-tools.service";

/**
 * Debug link to a flow's google sheet. Opens `sourceUrl` if the flow has one, otherwise (when
 * running locally) creates a sheet from the flow json via the local dev server.
 * When running locally, also shows buttons to sync the fixed sheets (deployment google drive folders) and the transient sheets
 * created from flows, reloading the page afterwards so the updated content is shown
 */
@Component({
  selector: "oab-sheet-link",
  template: `
    @if (url(); as url) {
      <a class="sheet-button" [href]="url" target="_blank" rel="noopener">Open spreadsheet</a>
    } @else if (devTools.isAvailable) {
      <button class="sheet-button" (click)="createSheet()" [disabled]="busy()">
        {{ running() === "create" ? "Processing…" : "Create spreadsheet" }}
      </button>
    }
    @if (devTools.isAvailable) {
      <button
        class="sheet-button"
        (click)="syncFixedSheets()"
        [disabled]="busy()"
        title="Sync sheets from the deployment google drive folders (beta sync_fixed_sheets)"
      >
        {{ running() === "sync_fixed" ? "Processing…" : "Sync fixed sheets" }}
      </button>
      <button
        class="sheet-button"
        (click)="syncTransientSheets()"
        [disabled]="busy()"
        title="Sync sheets created with Create spreadsheet (beta sync_transient_sheets)"
      >
        {{ running() === "sync_transient" ? "Processing…" : "Sync transient sheets" }}
      </button>
    }
    @if (status()) {
      <span class="sheet-status">{{ status() }}</span>
    }
  `,
  styleUrls: ["./sheet-link.component.scss"],
})
export class SheetLinkComponent {
  public flowType = input.required<string>();
  public flowName = input.required<string>();
  public sourceUrl = input<string | undefined>(undefined);

  public devTools = inject(DevToolsService);

  /** Url of a sheet created in this session, as the loaded flow is not reloaded */
  private createdUrl = signal<string | undefined>(undefined);
  public url = computed(() => this.sourceUrl() || this.createdUrl());
  public status = signal("");
  /** Action currently running, shown as "Processing…" on its button */
  public running = signal<"create" | "sync_fixed" | "sync_transient" | undefined>(undefined);
  public busy = computed(() => this.running() !== undefined);
  /** Set when the page is about to reload, so the button stays as "Processing…" until then */
  private reloading = false;

  public createSheet() {
    return this.run("create", "Creating sheet…", async () => {
      const result = await this.devTools.openSheet(this.flowName(), this.flowType());
      this.createdUrl.set(result.url);
      this.status.set(result.created ? "Sheet created and opened" : "Sheet opened");
    });
  }

  public syncFixedSheets() {
    return this.run("sync_fixed", "Syncing fixed sheets…", async () => {
      await this.devTools.syncFixedSheets();
      this.reload("Fixed sheets synced");
    });
  }

  public syncTransientSheets() {
    return this.run("sync_transient", "Syncing transient sheets…", async () => {
      const { sheets, updated } = await this.devTools.syncTransientSheets();
      if (updated === 0) {
        this.status.set(`Transient sheets synced (${sheets}), no changes`);
        return;
      }
      this.reload(`Transient sheets synced (${sheets}), ${updated} flows updated`);
    });
  }

  private async run(
    action: "create" | "sync_fixed" | "sync_transient",
    status: string,
    fn: () => Promise<void>
  ) {
    if (this.busy()) return;
    this.running.set(action);
    this.status.set(status);
    try {
      await fn();
    } catch (error) {
      this.status.set((error as Error).message);
    } finally {
      if (!this.reloading) this.running.set(undefined);
    }
  }

  /** Reload so the app loads the updated app_data, as loaded flows are cached */
  private reload(status: string) {
    this.reloading = true;
    this.status.set(`${status}, reloading…`);
    window.location.reload();
  }
}
