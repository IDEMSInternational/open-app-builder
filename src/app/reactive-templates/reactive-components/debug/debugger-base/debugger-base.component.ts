import { Component, signal } from "@angular/core";
import { Directive } from "@angular/core";

@Directive({
  selector: "oab-debugger-title",
  standalone: true,
})
export class DebuggerTitleDirective {}

@Directive({
  selector: "oab-debugger-info",
  standalone: true,
})
export class DebuggerInfoDirective {}

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
