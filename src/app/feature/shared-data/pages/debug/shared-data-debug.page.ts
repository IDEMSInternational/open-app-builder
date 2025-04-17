import { Component, computed, OnInit, signal, viewChild } from "@angular/core";
import { SharedDataService } from "../../shared-data.service";
import { AlertController, IonicModule } from "@ionic/angular";
import { TemplateComponentsModule } from "src/app/shared/components/template/template.module";
import { FlowTypes } from "packages/data-models";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { ISharedDataCollection } from "../../types";
import { JsonPipe } from "@angular/common";
import { ROW_TEMPLATES } from "./row-templates";

@Component({
  templateUrl: "./shared-data-debug.page.html",
  styleUrls: ["./shared-data-debug.page.scss"],
  standalone: true,
  imports: [IonicModule, TemplateComponentsModule, JsonPipe],
})
export class SharedDataDebugPage implements OnInit {
  /** Row to test authored shared_data colleciton query */
  public templateRowMultiple = signal<FlowTypes.TemplateRow>(ROW_TEMPLATES.shared_data_base);

  /** Row to test authored shared_data single value query */
  public templateRowSingle = computed(() => {
    const id = this.selectedId();
    if (id) {
      return { ...ROW_TEMPLATES.shared_data_base, value: id };
    }
  });

  public selectedId = signal<string | undefined>(undefined);

  public sharedDataSingle = signal<ISharedDataCollection | undefined>(undefined);
  public sharedDataMultiple = signal<ISharedDataCollection[]>([]);

  /** Reformat collection data into entries for easier table display */
  public displayTableData = computed(() => {
    const collection = this.sharedDataSingle();
    if (collection && collection.data) {
      const { data, ...meta } = collection;
      return {
        meta: Object.entries(meta).map(([key, value]) => ({ key, value })),
        data: Object.entries(data).map(([key, value]) => ({ key, value })),
      };
    }
  });

  constructor(
    public service: SharedDataService,
    public authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await Promise.allSettled([this.service.ready(), this.authService.ready()]);
  }

  public update(key: string, value: string) {
    if (value === "") {
      value = undefined;
    }
    const id = this.selectedId();
    this.service.updateSharedData(id, key, value);
  }

  public async createSharedData() {
    const { id } = await this.service.createSharedCollection();
    this.selectedId.set(id);
  }

  public async promptCollectionDelete(id: string) {
    const actionSheet = await this.alertCtrl.create({
      header: "Shared Data Delete",
      message:
        "Are you sure you want to delete this collection? Deleted collections cannot be recovered",
      buttons: [
        { text: "Yes, Delete", role: "destructive" },
        { text: "No, Cancel", role: "cancel" },
      ],
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    if (role === "destructive") {
      this.service.deleteSharedCollection(id);
    }
  }
}
