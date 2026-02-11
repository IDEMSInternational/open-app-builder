import { Component, computed, inject, input } from "@angular/core";
import { DebugService } from "src/app/reactive-templates/services/debug.service";
import { FlowTypes } from "src/app/shared/components/template/models";

@Component({
  selector: "oab-template-debugger",
  templateUrl: "./template-debugger.component.html",
  styleUrls: ["./template-debugger.component.scss"],
})
export class TemplateDebuggerComponent {
  public debug = inject(DebugService);

  public templateName = input.required<string>();
  public template = input<FlowTypes.Template | undefined>(undefined);
  public templateRows = computed(() => this.template()?.rows || []);
}
