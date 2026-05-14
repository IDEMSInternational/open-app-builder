import { Component, computed, effect, forwardRef, input, signal, viewChild } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { RowListComponent } from "../reactive-components/row-list.component";
import { DebugService } from "../services/debug.service";
import { TemplateDebuggerComponent } from "../reactive-components/debug/template-debugger/template-debugger.component";

@Component({
  selector: "oab-reactive-template",
  templateUrl: "./reactive-template.component.html",
  styleUrls: ["./reactive-template.component.scss"],
  imports: [forwardRef(() => RowListComponent), TemplateDebuggerComponent],
})
export class ReactiveTemplateComponent {
  public templateName = input.required<string>();
  public namespace = input("");

  public template = signal<FlowTypes.Template | undefined>(undefined);
  public rows = computed(() => this.template()?.rows || []);

  private rowListComponent = viewChild.required(RowListComponent);

  public readonly initialised = computed(() => {
    return this.rowListComponent().initialised();
  });

  constructor(
    private templateService: TemplateService,
    public debug: DebugService
  ) {
    effect(async () => {
      if (this.templateName()) {
        const template = await this.templateService.getTemplateByName(this.templateName(), false);
        this.template.set(template);
      }
    });
  }
}
