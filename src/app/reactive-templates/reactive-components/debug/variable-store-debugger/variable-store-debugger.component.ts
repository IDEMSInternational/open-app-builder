import { Component, inject } from "@angular/core";
import {
  DebuggerBaseComponent,
  DebuggerTitleDirective,
  DebuggerInfoDirective,
} from "../debugger-base/debugger-base.component";
import { JsonPipe } from "@angular/common";
import { LocalVariableStore } from "src/app/reactive-templates/stores/local-variable-store";

@Component({
  selector: "oab-variable-store-debugger",
  templateUrl: "./variable-store-debugger.component.html",
  styleUrls: ["./variable-store-debugger.component.scss"],
  imports: [DebuggerBaseComponent, DebuggerTitleDirective, DebuggerInfoDirective, JsonPipe],
})
export class VariableStoreDebuggerComponent {
  public variableStore = inject(LocalVariableStore);
  public allVariables = this.variableStore.getAllSignal();
}
