import { HttpClient } from "@angular/common/http";
import { NgTemplateOutlet } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import type { FlowTypes } from "data-models";
import { lastValueFrom } from "rxjs";
import { SyncButtonsComponent } from "src/app/reactive-templates/reactive-components/debug/sync-buttons/sync-buttons.component";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { DevToolsService } from "../../services/dev-tools.service";
import { DebugFolderActionsComponent } from "../components/debug-folder-actions/debug-folder-actions.component";
import { DebugSheetRowComponent } from "../components/debug-sheet-row/debug-sheet-row.component";
import {
  buildFolderTree,
  DEBUG_SHEET_TYPES,
  getFolderSheetStates,
  IDebugSheetType,
  ITransientSheetEntry,
  sortSheets,
  toDebugSheets,
} from "../debug-sheets.utils";

/** Written by the beta workflow whenever flows are processed */
const SHEETS_CONTENTS_PATH = "assets/app_data/sheets/contents.json";

type ISheetContentsJson = { [flowType: string]: { [flow_name: string]: FlowTypes.FlowTypeBase } };

/**
 * Debug page listing all templates and data lists, as a searchable alphabetical list or a
 * folder tree built from each flow's `_source.path`. Flows linked to a transient sheet are
 * highlighted, and can be listed on their own
 */
@Component({
  templateUrl: "./debug.page.html",
  styleUrls: ["./debug.page.scss"],
  imports: [
    IonicModule,
    FormsModule,
    NgTemplateOutlet,
    SyncButtonsComponent,
    DebugSheetRowComponent,
    DebugFolderActionsComponent,
  ],
})
export class DebugPage {
  private appDataService = inject(AppDataService);
  private http = inject(HttpClient);
  private devTools = inject(DevToolsService);

  public filterTerm = signal("");
  public typeFilter = signal<IDebugSheetType | "all">("all");
  public view = signal<"alphabetical" | "folder">("alphabetical");
  public transientOnly = signal(false);

  private transientEntries = signal<ITransientSheetEntry[]>([]);
  /** contents.json as currently on disk, which may be newer than the copy built into the app */
  private liveContents = signal<ISheetContentsJson | undefined>(undefined);

  public allSheets = computed(() =>
    sortSheets(
      DEBUG_SHEET_TYPES.flatMap((type) =>
        toDebugSheets(type, this.listSheets(type), this.transientEntries())
      )
    )
  );
  public transientCount = computed(() => this.allSheets().filter((s) => s.isTransient).length);

  public filteredSheets = computed(() => {
    const term = this.filterTerm().toLowerCase();
    const type = this.typeFilter();
    const transientOnly = this.transientOnly();
    return this.allSheets().filter(
      (sheet) =>
        (type === "all" || sheet.flow_type === type) &&
        (!transientOnly || sheet.isTransient) &&
        (!term ||
          sheet.flow_name.toLowerCase().includes(term) ||
          !!sheet.path?.toLowerCase().includes(term))
    );
  });

  public folderTree = computed(() => buildFolderTree(this.filteredSheets()));
  /** From all sheets, so folder actions include flows hidden by the search or filters */
  public folderStates = computed(() => getFolderSheetStates(this.allSheets()));

  constructor() {
    this.loadTransientSheets();
    this.loadLiveContents();
  }

  private listSheets(type: IDebugSheetType) {
    const live = this.liveContents()?.[type];
    return live ? Object.values(live) : this.appDataService.listSheetsByType(type);
  }

  /**
   * contents.json is built into the app, so after a sync the page can reload before the app
   * has been rebuilt and show old paths. Read the file directly so the latest sync is shown
   */
  private async loadLiveContents() {
    try {
      const contents = await lastValueFrom(
        this.http.get<ISheetContentsJson>(SHEETS_CONTENTS_PATH, {
          params: { t: Date.now() },
        })
      );
      if (contents && typeof contents === "object") this.liveContents.set(contents);
    } catch {
      // Use the contents built into the app
    }
  }

  /** Processed flows are not linked to their transient sheet, so read the transient sheets list */
  private async loadTransientSheets() {
    this.transientEntries.set(await this.devTools.getTransientSheets());
  }
}
