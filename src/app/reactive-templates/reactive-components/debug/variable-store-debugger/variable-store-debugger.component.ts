import { Component, inject } from "@angular/core";
import { DebuggerBaseComponent } from "../debugger-base/debugger-base.component";
import {
  DebuggerInfoDirective,
  DebuggerTitleDirective,
} from "../debugger-base/debugger-slots.directive";
import { JsonPipe } from "@angular/common";
import { VariableStore } from "src/app/reactive-templates/stores/variable-store";

@Component({
  selector: "oab-variable-store-debugger",
  templateUrl: "./variable-store-debugger.component.html",
  styleUrls: ["./variable-store-debugger.component.scss"],
  imports: [DebuggerBaseComponent, DebuggerTitleDirective, DebuggerInfoDirective, JsonPipe],
})
export class VariableStoreDebuggerComponent {
  public variableStore = inject(VariableStore);
  public allVariables = this.variableStore.getAllSignal();
}
