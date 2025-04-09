import { Component, signal } from "@angular/core";
import { SharedDataService } from "../../shared-data.service";
import { IonicModule } from "@ionic/angular";
import { TemplateComponentsModule } from "src/app/shared/components/template/template.module";
import { FlowTypes } from "packages/data-models";

@Component({
  selector: "plh-shared-data-debug",
  templateUrl: "./shared-data-debug.page.html",
  styleUrls: ["./shared-data-debug.page.scss"],
  standalone: true,
  imports: [IonicModule, TemplateComponentsModule],
})
export class SharedDataDebugPage {
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

  constructor(private service: SharedDataService) {}
}
