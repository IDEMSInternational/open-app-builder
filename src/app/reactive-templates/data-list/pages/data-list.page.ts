import { Component, computed, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { map } from "rxjs";
import { FlowTypes } from "packages/data-models";
import { SheetLinkComponent } from "src/app/reactive-templates/reactive-components/debug/sheet-link/sheet-link.component";
import { AppDataService } from "src/app/shared/services/data/app-data.service";

/** Limit rendered rows so large lists don't slow the page down */
const MAX_ROWS = 500;

/**
 * View a data list as a table of the rows in its json (as loaded from app_data, before any
 * dynamic data changes), with a link to open or create its google sheet
 */
@Component({
  templateUrl: "./data-list.page.html",
  styleUrls: ["./data-list.page.scss"],
  imports: [IonicModule, FormsModule, RouterLink, SheetLinkComponent],
})
export class DataListPage {
  private appDataService = inject(AppDataService);
  private route = inject(ActivatedRoute);

  public dataListName = toSignal(
    this.route.paramMap.pipe(map((params) => params.get("dataListName") || undefined))
  );

  /** Contents entry, used to check the list exists without logging an error */
  public contents = computed(() => {
    const name = this.dataListName();
    if (!name) return undefined;
    return this.appDataService.listSheetsByType("data_list").find((f) => f.flow_name === name);
  });
  public flow = signal<FlowTypes.Data_list | undefined>(undefined);

  /** Sheet the list was synced from, as shown in the template debugger */
  public source = computed(() => this.flow()?._source || this.contents()?._source);
  public sourceUrl = computed(() => this.source()?.url);
  public rows = computed(() => this.flow()?.rows || []);
  public visibleRows = computed(() => this.rows().slice(0, MAX_ROWS));
  /** Columns in the order they first appear, excluding internal `_` fields */
  public columns = computed(() => {
    const columns = new Set<string>();
    for (const row of this.visibleRows()) {
      for (const key of Object.keys(row)) {
        if (!key.startsWith("_")) columns.add(key);
      }
    }
    return [...columns];
  });
  public hiddenRowCount = computed(() => Math.max(0, this.rows().length - MAX_ROWS));

  /** All data list names, shown when no list is selected */
  public filterTerm = signal("");
  private allDataLists = this.appDataService
    .listSheetsByType("data_list")
    .map((f) => f.flow_name)
    .sort();
  public filteredDataLists = computed(() => {
    const term = this.filterTerm().toLowerCase();
    return this.allDataLists.filter((name) => name.toLowerCase().includes(term));
  });

  constructor() {
    effect(async () => {
      const name = this.dataListName();
      this.flow.set(undefined);
      if (!name || !this.contents()) return;
      const flow = await this.appDataService.getSheet<FlowTypes.Data_list>("data_list", name);
      // Ignore a late response if the route changed while loading
      if (name === this.dataListName()) this.flow.set(flow || undefined);
    });
  }

  public formatCell(value: unknown) {
    if (value === undefined || value === null) return "";
    return typeof value === "object" ? JSON.stringify(value) : String(value);
  }
}
