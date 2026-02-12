import { JsonPipe } from "@angular/common";
import { Component, computed, inject, input, signal } from "@angular/core";
import { DebugService } from "src/app/reactive-templates/services/debug.service";
import { VariableStore } from "src/app/reactive-templates/stores/variable-store";
import { FlowTypes } from "src/app/shared/components/template/models";

@Component({
  selector: "oab-template-debugger",
  templateUrl: "./template-debugger.component.html",
  styleUrls: ["./template-debugger.component.scss"],
  imports: [JsonPipe],
})
export class TemplateDebuggerComponent {
  public debug = inject(DebugService);
  public variableStore = inject(VariableStore);

  public templateName = input.required<string>();
  public template = input<FlowTypes.Template | undefined>(undefined);
  public templateRows = computed(() => this.template()?.rows || []);

  private _showVariableStore = signal(false);
  public showVariableStore = this._showVariableStore.asReadonly();

  public toggleVariableStore() {
    this._showVariableStore.update((value) => !value);
  }
}
