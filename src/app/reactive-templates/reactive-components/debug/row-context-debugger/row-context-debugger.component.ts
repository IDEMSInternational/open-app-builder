import { Component, computed, inject, input, signal } from "@angular/core";
import { ContextCreatorService } from "src/app/reactive-templates/services/context-creator.service";
import { EvaluationService } from "src/app/reactive-templates/services/evaluation.service";
import { RowBaseComponent } from "../../row-base.component";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "oab-row-context-debugger",
  templateUrl: "./row-context-debugger.component.html",
  styleUrls: ["./row-context-debugger.component.scss"],
  imports: [JsonPipe],
})
export class RowContextDebuggerComponent {
  private evaluationService = inject(EvaluationService);
  private contextCreator = inject(ContextCreatorService);

  public row = input.required<RowBaseComponent<any>>();
  public dependencies = computed(() => {
    const row = this.row();
    return row ? this.evaluationService.getDependencies(row.expression(), row.namespace()) : [];
  });
  public context = computed(() => {
    return this.contextCreator.createContext(this.dependencies());
  });

  public show = signal(false);

  public toggle() {
    this.show.update((value) => !value);
  }
}
