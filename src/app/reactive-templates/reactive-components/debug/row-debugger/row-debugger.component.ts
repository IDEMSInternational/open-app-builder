import { JsonPipe, NgComponentOutlet } from "@angular/common";
import { Component, computed, contentChild, inject, signal } from "@angular/core";
import { RowBaseComponent } from "../../row-base.component";
import { Parameter, Parameters } from "../../parameters";
import { DebugService } from "src/app/reactive-templates/services/debug.service";
import { RowContextDebuggerComponent } from "../row-context-debugger/row-context-debugger.component";
import { DebuggerBaseComponent } from "../debugger-base/debugger-base.component";
import {
  DebuggerInfoDirective,
  DebuggerTitleDirective,
} from "../debugger-base/debugger-slots.directive";

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
  private debug = inject(DebugService);
  private outlet = contentChild(NgComponentOutlet);
  private _showInfo = signal(false);

  public row = computed(() => {
    const instance = this.outlet()?.componentInstance as RowBaseComponent<any> | undefined;
    return instance;
  });

  public showInfo = computed(() => this.debug.showAllInfo() || this._showInfo());

  public params = computed(() => {
    const params = this.row()?.params as Parameters | undefined;
    if (!params) return {} as Record<string, unknown>;

    return (Object.values(params) as Parameter<any>[]).reduce<Record<string, unknown>>(
      (acc, param) => {
        acc[param.name] = param.value();
        return acc;
      },
      {}
    );
  });

  public toggleInfo() {
    this._showInfo.update((value) => !value);
  }
}
