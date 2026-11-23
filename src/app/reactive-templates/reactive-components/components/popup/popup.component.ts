import { Component, forwardRef, inject, signal } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent, RowEmitEvent } from "../../row-base.component";
import { RowListComponent } from "../../row-list.component";
import { ActionRegistry, IAction } from "src/app/reactive-templates/services/action.registry";
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
  private closePromise?: Promise<void>;
  private resolveClose?: () => void;
  private confirmation?: "completed" | "cancelled";

  public execute(): Promise<void> {
    if (!this.closePromise) {
      this.confirmation = undefined;
      this.closePromise = new Promise<void>((resolve) => {
        this.resolveClose = resolve;
      });
    }
    this.isOpen.set(true);
    return this.closePromise;
  }

  public init(): void {
    if (this.initialised()) {
      return;
    }
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

  public override onEmittedValue(event: RowEmitEvent) {
    super.onEmittedValue(event);

    if (this.closePromise && event.emitValue === "completed") {
      this.confirmation = "completed";
    } else if (this.closePromise && event.emitValue === "cancelled") {
      this.confirmation = "cancelled";
    }

    if (
      ["completed", "uncompleted"].includes(event.emitValue) ||
      (this.closePromise && event.emitValue === "cancelled")
    ) {
      this.dismiss(event);
    }
  }

  public onDidDismiss(): void {
    this.isOpen.set(false);
    this.finishClose();
  }

  private finishClose(): void {
    const resolve = this.resolveClose;
    if (!resolve) {
      return;
    }
    this.resolveClose = undefined;
    this.closePromise = undefined;
    if (this.confirmation !== "completed" && this.confirmation !== "cancelled") {
      this.onEmittedValue({ emitValue: "cancelled", emitData: undefined });
    }
    resolve();
  }

  public override ngOnDestroy(): void {
    if (this.confirmation === "completed") {
      this.confirmation = undefined;
    }
    this.finishClose();
    if (this.actionRegistry.has(this.name()) && this.actionRegistry.get(this.name()) === this) {
      this.actionRegistry.unregister(this.name());
    }
    super.ngOnDestroy();
  }
}
