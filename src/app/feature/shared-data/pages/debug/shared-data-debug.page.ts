import { Component, effect, signal } from "@angular/core";
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
  public debugRow = signal<FlowTypes.TemplateRow>({
    _nested_name: "",
    name: "",
    type: "share_data",
    value: "debug",
  });

  constructor(private service: SharedDataService) {
    effect(async () => {
      await this.service.ready();

      service.query$("debug");
    });
  }
}
