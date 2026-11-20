import { Component, inject, input, signal } from "@angular/core";
import { DevToolsService } from "src/app/reactive-templates/services/dev-tools.service";
import { IDebugFolderSheetState } from "../../debug-sheets.utils";

type IFolderAction = "create" | "remove";

/**
 * Buttons on a debug page folder, to create one spreadsheet with all the flows directly in the
 * folder (not its subfolders), and to open or delete that sheet. Flows in a folder sheet are
 * removed together from here, rather than from their rows
 */
@Component({
  selector: "oab-debug-folder-actions",
  template: `
    @if (state().url; as url) {
      <a
        class="action"
        [href]="url"
        target="_blank"
        rel="noopener"
        title="Open the folder spreadsheet"
        (click)="stopPropagation($event)"
        >Open</a
      >
      @if (devTools.isAvailable) {
        <button
          class="action destroy"
          [disabled]="!!running()"
          title="Delete the folder spreadsheet from google drive and unlink all its flows (beta remove_transient_sheet --folder)"
          (click)="removeSheet($event)"
        >
          {{ running() === "remove" ? "Processing…" : "Destroy" }}
        </button>
      }
    } @else if (state().canCreate && devTools.isAvailable) {
      <button
        class="action"
        [disabled]="!!running()"
        [title]="
          'Create one transient spreadsheet with the ' +
          state().flows.length +
          ' flows in this folder (not subfolders)'
        "
        (click)="createSheet($event)"
      >
        {{ running() === "create" ? "Processing…" : "Create" }}
      </button>
    }
    @if (status()) {
      <span class="status">{{ status() }}</span>
    }
  `,
  styleUrls: ["../debug-sheet-row/debug-sheet-row.component.scss"],
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-left: auto;
      border: none;
      font-weight: normal;
    }
    .status {
      flex-basis: auto;
    }
  `,
})
export class DebugFolderActionsComponent {
  public devTools = inject(DevToolsService);

  /** Folder path, relative to the external deployment sheets folder */
  public folder = input.required<string>();
  public state = input.required<IDebugFolderSheetState>();

  public status = signal("");
  public running = signal<IFolderAction | undefined>(undefined);
  private reloading = false;

  public createSheet(event: Event) {
    this.stopPropagation(event);
    const flows = this.state().flows.map(({ flow_name, flow_type }) => ({ flow_name, flow_type }));
    return this.run("create", "Creating sheet…", async () => {
      await this.devTools.createFolderSheet(flows, this.folder());
      this.reload(`Sheet created with ${flows.length} flows`);
    });
  }

  public removeSheet(event: Event) {
    this.stopPropagation(event);
    const confirmed = window.confirm(
      `Delete the spreadsheet for "${this.folder()}" from google drive (moved to the bin) and unlink all its flows?`
    );
    if (!confirmed) return;
    return this.run("remove", "Removing sheet…", async () => {
      const { failed } = await this.devTools.removeFolderSheet(this.folder());
      this.reload(
        failed.length > 0 ? "Unlinked, but the sheet could not be deleted" : "Sheet deleted"
      );
    });
  }

  /** Stop clicks from toggling the folder open or closed */
  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  private async run(action: IFolderAction, status: string, fn: () => Promise<void>) {
    if (this.running()) return;
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

  /** Reload so the app loads the updated contents of every flow in the folder */
  private reload(status: string) {
    this.reloading = true;
    this.status.set(`${status}, reloading…`);
    window.location.reload();
  }
}
