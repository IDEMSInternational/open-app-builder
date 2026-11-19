import { Component, computed, inject, input, signal } from "@angular/core";
import { Router } from "@angular/router";
import { FlowTypes } from "packages/data-models";
import { DevToolsService } from "src/app/reactive-templates/services/dev-tools.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { IDebugSheet, IDebugSheetType } from "../../debug-sheets.utils";

/** Base route to view each flow type */
const SHEET_ROUTES: Record<IDebugSheetType, string> = {
  template: "/template",
  data_list: "/data_list",
};

type IRowAction = "create" | "destroy";

/**
 * A flow on the debug page, with buttons to view it in a new tab, open or create its
 * spreadsheet, and delete its transient sheet. Clicking the row expands it to show the
 * `_debug` information of the processed flow
 */
@Component({
  selector: "oab-debug-sheet-row",
  templateUrl: "./debug-sheet-row.component.html",
  styleUrls: ["./debug-sheet-row.component.scss"],
})
export class DebugSheetRowComponent {
  private appDataService = inject(AppDataService);
  private router = inject(Router);
  public devTools = inject(DevToolsService);

  public sheet = input.required<IDebugSheet>();

  /** Url of a sheet created in this session, as contents are not reloaded */
  private createdUrl = signal<string | undefined>(undefined);
  public url = computed(() => this.createdUrl() || this.sheet().url);
  public isTransient = computed(() => this.sheet().isTransient || !!this.createdUrl());
  public goHref = computed(() => {
    const { flow_type, flow_name } = this.sheet();
    return this.router.serializeUrl(
      this.router.createUrlTree([SHEET_ROUTES[flow_type], flow_name])
    );
  });

  public expanded = signal(false);
  /** Processed flow json, loaded when first expanded */
  public flow = signal<FlowTypes.FlowTypeWithData | undefined>(undefined);
  public loading = signal(false);

  public status = signal("");
  public running = signal<IRowAction | undefined>(undefined);
  private reloading = false;

  public toggleExpanded() {
    this.expanded.update((expanded) => !expanded);
    if (this.expanded() && !this.flow()) this.loadFlow();
  }

  public createSheet(event: Event) {
    event.stopPropagation();
    const { flow_type, flow_name } = this.sheet();
    return this.run("create", "Creating sheet…", async () => {
      const result = await this.devTools.openSheet(flow_name, flow_type);
      this.createdUrl.set(result.url);
      this.status.set(result.created ? "Sheet created and opened" : "Sheet opened");
    });
  }

  public destroySheet(event: Event) {
    event.stopPropagation();
    const { flow_type, flow_name } = this.sheet();
    const confirmed = window.confirm(
      `Delete the transient sheet for "${flow_name}" from google drive (moved to the bin) and unlink it?`
    );
    if (!confirmed) return;
    return this.run("destroy", "Removing sheet…", async () => {
      const { failed } = await this.devTools.removeTransientSheet(flow_name, flow_type);
      // Reload so the app loads the unlinked contents
      this.reloading = true;
      this.status.set(
        failed.length > 0 ? "Unlinked, but the sheet could not be deleted" : "Sheet deleted"
      );
      window.location.reload();
    });
  }

  /** Stop clicks on links and buttons from toggling the row */
  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  private async loadFlow() {
    const { flow_type, flow_name } = this.sheet();
    this.loading.set(true);
    try {
      // Skip overrides, so the flow itself is shown
      const flow = await this.appDataService.getSheet(flow_type, flow_name, true);
      this.flow.set(flow || undefined);
    } finally {
      this.loading.set(false);
    }
  }

  private async run(action: IRowAction, status: string, fn: () => Promise<void>) {
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
}
