import { Component } from "@angular/core";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-template-group",
  template: `<div class="template">
    <plh-template-container [name]="_row.value"></plh-template-container>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplTemplateGroupComponent extends TemplateBaseComponent {
  // TODO - handle overriding default values
}
