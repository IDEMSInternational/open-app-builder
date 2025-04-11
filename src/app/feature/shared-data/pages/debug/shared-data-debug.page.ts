import { Component, computed, OnInit, signal, viewChild } from "@angular/core";
import { SharedDataService } from "../../shared-data.service";
import { IonicModule } from "@ionic/angular";
import { TemplateComponentsModule } from "src/app/shared/components/template/template.module";
import { FlowTypes } from "packages/data-models";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { ISharedDataCollection, ISharedDataCollectionMetadata } from "../../types";
import { JsonPipe } from "@angular/common";
import { ROW_TEMPLATES } from "./row-templates";
import { TmplSharedDataComponent } from "src/app/shared/components/template/components/shared-data/shared-data.component";

@Component({
  selector: "plh-shared-data-debug",
  templateUrl: "./shared-data-debug.page.html",
  styleUrls: ["./shared-data-debug.page.scss"],
  standalone: true,
  imports: [IonicModule, TemplateComponentsModule, JsonPipe],
})
export class SharedDataDebugPage implements OnInit {
  private sharedDataRow = viewChild.required<TmplSharedDataComponent>("sharedDataRow");

  /** Compute list of all shared data collections by reading from the share_data template row */
  public sharedDataCollections = computed(() => this.sharedDataRow().data());

  public sharedDataSelected = signal<string | undefined>(undefined);

  /** Identify and track data from the selected data collection */
  public selectedDataCollection = computed<ISharedDataCollection | undefined>(() => {
    const id = this.sharedDataSelected();
    if (id) {
      return this.sharedDataCollections().find((v) => v.id === id);
    }
  });

  public collectionMeta = computed(() => {
    const collection = this.selectedDataCollection();
    if (collection) {
      const { _created_at, _created_by, _updated_at, id } = collection;
      const meta: ISharedDataCollectionMetadata = { _created_at, _created_by, _updated_at, id };
      return Object.entries(meta).map(([key, value]) => ({ key, value }));
    }
  });

  public collectionData = computed(() => {
    const collection = this.selectedDataCollection();
    if (collection) {
      const { _created_at, _created_by, _updated_at, id, ...rest } = collection;
      const meta: ISharedDataCollectionMetadata = { _created_at, _created_by, _updated_at, id };
      return Object.entries(rest).map(([key, value]) => ({ key, value }));
    }
  });

  /** Row to test authored share_data row type */
  public debugRow = signal<FlowTypes.TemplateRow>(ROW_TEMPLATES.share_data_base);

  constructor(
    public service: SharedDataService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    await Promise.allSettled([this.service.ready(), this.authService.ready()]);
  }

  public update(key: string, value: string) {
    if (value === "") {
      value = undefined;
    }
    const { id } = this.selectedDataCollection();
    this.service.update(id, key, value);
  }

  public async createSharedData() {
    await this.service.createSharedCollection();
  }
}
