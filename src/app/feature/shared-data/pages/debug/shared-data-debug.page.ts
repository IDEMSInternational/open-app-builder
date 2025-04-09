import { Component, computed, OnInit, signal } from "@angular/core";
import { SharedDataService } from "../../shared-data.service";
import { IonicModule } from "@ionic/angular";
import { TemplateComponentsModule } from "src/app/shared/components/template/template.module";
import { FlowTypes } from "packages/data-models";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { ISharedDataCollection } from "../../types";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "plh-shared-data-debug",
  templateUrl: "./shared-data-debug.page.html",
  styleUrls: ["./shared-data-debug.page.scss"],
  standalone: true,
  imports: [IonicModule, TemplateComponentsModule, JsonPipe],
})
export class SharedDataDebugPage implements OnInit {
  public selectedDataCollection = signal<ISharedDataCollection | undefined>(undefined);

  public selectedDataTable = computed(() => {
    const collection = this.selectedDataCollection();
    if (collection) {
      const { _created_at, _created_by, _updated_at, data, id } = collection;
    }
  });

  public debugRowSingle = signal<FlowTypes.TemplateRow>({
    _nested_name: "",
    name: "",
    type: "share_data",
    value: "debug_group_1",
  });

  public debugRowMultiple = signal<FlowTypes.TemplateRow>({
    _nested_name: "",
    name: "",
    type: "share_data",
    value: undefined,
  });

  constructor(
    private service: SharedDataService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    await Promise.allSettled([this.service.ready(), this.authService.ready()]);
  }

  public createSharedData(id: string) {
    this.service.create(id, { isPublic: true });
  }
}
