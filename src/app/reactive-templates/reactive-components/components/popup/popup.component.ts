import { Component, forwardRef, inject, signal } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { RowListComponent } from "../../row-list.component";
import {
  ActionRegistry,
  IAction,
  IActionParameter,
} from "src/app/reactive-templates/services/action.registry";
import { NestedTemplateComponent } from "../nested-template/nested-template.component";

const parameters = () =>
  defineParameters({
    showCloseButton: new Parameter("show_close_button", true, "script"),
    fullscreen: new Parameter("fullscreen", false, "script"),
  });

@Component({
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.scss"],
  imports: [
    forwardRef(() => RowListComponent),
    IonicModule,
    NgTemplateOutlet,
    NestedTemplateComponent,
  ],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
/**
 * When opening a template as a popup, provide a minimal interface and load
 * the template directly as a regular template-container element
 */
export class PopupComponent
  extends RowBaseComponent<ReturnType<typeof parameters>>
  implements IAction
{
  private readonly actionRegistry = inject(ActionRegistry);

  public isOpen = signal(false);

  public execute(params?: IActionParameter[]): Promise<void> {
    // todo: show modal.
    this.isOpen.set(true);
    return Promise.resolve();
  }

  public init(): void {
    super.init();

    this.actionRegistry.register(this);
  }

  public dismissOnBackdrop(e: Event) {
    const el = e.target as HTMLElement;
    if (el.classList.contains("popup-backdrop")) {
      this.dismiss();
    }
  }

  public dismiss(value?: { emitValue: string; emitData: any }) {
    this.isOpen.set(false);
  }

  public onEmittedValue(event: { emitValue: string; emitData: any }) {
    super.onEmittedValue(event);

    if (["completed", "uncompleted"].includes(event.emitValue)) {
      this.dismiss(event);
    }
  }
}
