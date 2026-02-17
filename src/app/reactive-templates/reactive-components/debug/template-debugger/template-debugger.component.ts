import { Component, input } from "@angular/core";
import { FlowTypes } from "src/app/shared/components/template/models";
import {
  DebuggerBaseComponent,
  DebuggerInfoDirective,
  DebuggerTitleDirective,
} from "../debugger-base/debugger-base.component";
import { VariableStoreDebuggerComponent } from "../variable-store-debugger/variable-store-debugger.component";

@Component({
  selector: "oab-template-debugger",
  templateUrl: "./template-debugger.component.html",
  styleUrls: ["./template-debugger.component.scss"],
  imports: [
    DebuggerBaseComponent,
    DebuggerInfoDirective,
    DebuggerTitleDirective,
    VariableStoreDebuggerComponent,
  ],
})
export class TemplateDebuggerComponent {
  public templateName = input.required<string>();
  public template = input<FlowTypes.Template | undefined>(undefined);
}
