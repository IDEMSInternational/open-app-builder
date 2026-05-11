import { JsonPipe, NgComponentOutlet } from "@angular/common";
import { Component, computed, contentChild } from "@angular/core";
import { RowBaseComponent } from "../../row-base.component";
import { RowContextDebuggerComponent } from "../row-context-debugger/row-context-debugger.component";
import {
  DebuggerBaseComponent,
  DebuggerTitleDirective,
  DebuggerInfoDirective,
} from "../debugger-base/debugger-base.component";

@Component({
  selector: "oab-row-debugger",
  templateUrl: "./row-debugger.component.html",
  styleUrls: ["./row-debugger.component.scss"],
  imports: [
    JsonPipe,
    RowContextDebuggerComponent,
    DebuggerBaseComponent,
    DebuggerTitleDirective,
    DebuggerInfoDirective,
  ],
})
export class RowDebuggerComponent {
  private outlet = contentChild(NgComponentOutlet);

  public row = computed(() => {
    const instance = this.outlet()?.componentInstance as RowBaseComponent | undefined;
    return instance;
  });

  public params = computed(() => this.row()?.params() ?? {});
}
