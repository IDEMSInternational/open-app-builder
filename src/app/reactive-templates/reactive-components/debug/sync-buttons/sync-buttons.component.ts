import { Component, computed, inject, signal } from "@angular/core";
import { DevToolsService } from "../../../services/dev-tools.service";

type ISyncAction = "translations" | "files" | "sync_fixed" | "sync_transient" | "remove_transient";

/**
 * Buttons to run beta sync workflow commands via the local dev server, reloading the page
 * afterwards so the updated app_data is shown. Only shown when running locally
 */
@Component({
  selector: "oab-sync-buttons",
  template: `
    <fieldset class="sync-group">
      <legend>Sync</legend>
      @if (devTools.isAvailable) {
        @for (button of buttons; track button.action) {
          <button
            class="sheet-button"
            (click)="button.run()"
            [disabled]="busy()"
            [title]="button.title"
          >
            {{ running() === button.action ? "Processing…" : button.label }}
          </button>
        }
        <button
          class="sheet-button remove"
          (click)="removeTransientSheets()"
          [disabled]="busy()"
          title="Delete all transient sheets from google drive and unlink their flows (beta remove_transient_sheet ALL)"
        >
          {{ running() === "remove_transient" ? "Processing…" : "Remove transient sheets" }}
        </button>
        @if (status()) {
          <span class="sheet-status">{{ status() }}</span>
        }
      } @else {
        <span class="sheet-status">
          Available when running the app locally with: yarn workflow beta dev_server
        </span>
      }
    </fieldset>
  `,
  styleUrls: ["../sheet-link/sheet-link.component.scss", "./sync-buttons.component.scss"],
})
export class SyncButtonsComponent {
  public devTools = inject(DevToolsService);

  public status = signal("");
  /** Action currently running, shown as "Processing…" on its button */
  public running = signal<ISyncAction | undefined>(undefined);
  public busy = computed(() => this.running() !== undefined);
  /** Set when the page is about to reload, so the button stays as "Processing…" until then */
  private reloading = false;

  public buttons: { action: ISyncAction; label: string; title: string; run: () => void }[] = [
    {
      action: "translations",
      label: "Translations",
      title:
        "Re-process all flows from the external deployment with the latest translations (beta sync_translations)",
      run: () => this.syncTranslations(),
    },
    {
      action: "files",
      label: "Files",
      title:
        "Process flow jsons that changed in the external deployment app_data/sheets folder (beta sync_flow_files)",
      run: () => this.syncFiles(),
    },
    {
      action: "sync_fixed",
      label: "Fixed sheets",
      title: "Sync sheets from the deployment google drive folders (beta sync_fixed_sheets)",
      run: () => this.syncFixedSheets(),
    },
    {
      action: "sync_transient",
      label: "Transient sheets",
      title: "Sync sheets created with Create spreadsheet (beta sync_transient_sheets)",
      run: () => this.syncTransientSheets(),
    },
  ];

  public syncTranslations() {
    return this.run("translations", "Syncing translations…", async () => {
      const { flows } = await this.devTools.syncTranslations();
      this.reload(`Translations synced (${flows} flows)`);
    });
  }

  public syncFiles() {
    return this.run("files", "Syncing files…", async () => {
      const { files, changed, removed, flows } = await this.devTools.syncFlowFiles();
      if (flows === 0) {
        this.status.set(`Files synced (${files}), no changes`);
        return;
      }
      this.reload(`Files synced (${files}), ${changed} changed, ${removed} removed`);
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
      const { sheets, updated, added } = await this.devTools.syncTransientSheets();
      if (updated === 0) {
        this.status.set(`Transient sheets synced (${sheets}), no changes`);
        return;
      }
      const addedText = added > 0 ? `, ${added} new flows added` : "";
      this.reload(`Transient sheets synced (${sheets}), ${updated} flows updated${addedText}`);
    });
  }

  public removeTransientSheets() {
    if (this.busy()) return;
    const confirmed = window.confirm(
      "Delete all transient sheets from google drive (moved to the bin) and unlink their flows?"
    );
    if (!confirmed) return;
    return this.run("remove_transient", "Removing transient sheets…", async () => {
      const { removed, deleted, failed } = await this.devTools.removeTransientSheet("ALL");
      if (removed.length === 0) {
        this.status.set("No transient sheets to remove");
        return;
      }
      const failedText = failed.length > 0 ? `, ${failed.length} could not be deleted` : "";
      this.reload(
        `Removed ${removed.length} transient flows, ${deleted} sheets deleted${failedText}`
      );
    });
  }

  private async run(action: ISyncAction, status: string, fn: () => Promise<void>) {
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
