import { Component, signal } from "@angular/core";

@Component({
  selector: "oab-debugger-base",
  templateUrl: "./debugger-base.component.html",
  styleUrls: ["./debugger-base.component.scss"],
})
export class DebuggerBaseComponent {
  public expanded = signal(false);

  public toggle() {
    this.expanded.update((value) => !value);
  }
}
