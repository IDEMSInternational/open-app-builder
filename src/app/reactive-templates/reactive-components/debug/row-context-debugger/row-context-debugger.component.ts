import { Component, computed, inject, input } from "@angular/core";
import { ContextCreatorService } from "src/app/reactive-templates/services/context-creator.service";
import { EvaluationService } from "src/app/reactive-templates/services/evaluation.service";
import { VariableStore } from "src/app/reactive-templates/stores/variable-store";
import { RowBaseComponent } from "../../row-base.component";
import { JsonPipe } from "@angular/common";
import { DebuggerBaseComponent } from "../debugger-base/debugger-base.component";
import {
  DebuggerInfoDirective,
  DebuggerTitleDirective,
} from "../debugger-base/debugger-slots.directive";

@Component({
  selector: "oab-row-context-debugger",
  templateUrl: "./row-context-debugger.component.html",
  styleUrls: ["./row-context-debugger.component.scss"],
  imports: [JsonPipe, DebuggerBaseComponent, DebuggerTitleDirective, DebuggerInfoDirective],
})
export class RowContextDebuggerComponent {
  private evaluationService = inject(EvaluationService);
  private contextCreator = inject(ContextCreatorService);
  private variableStore = inject(VariableStore);

  public row = input.required<RowBaseComponent<any>>();

  public dependencies = computed(() => {
    const row = this.row();
    return row ? this.evaluationService.getDependencies(row.expression(), row.namespace()) : [];
  });

  private dependencyValues = this.variableStore.watchMultipleSignal(this.dependencies);

  public context = computed(() => {
    this.dependencyValues();
    return this.contextCreator.createContext(this.dependencies());
  });
}
