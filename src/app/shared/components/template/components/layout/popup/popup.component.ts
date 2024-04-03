import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FlowTypes, ITemplateContainerProps } from "../../../models";
import { TemplateContainerComponent } from "../../../template-container.component";

@Component({
  templateUrl: "./popup.component.html",
  styleUrl: "./popup.component.scss",
})
/**
 * When opening a template as a popup, provide a minimal interface and load
 * the template directly as a regular template-container element
 */
export class TemplatePopupComponent {
  @Input() props: ITemplatePopupComponentProps;

  constructor(private modalCtrl: ModalController) {}

  /**
   * When templates emit completed/uncompleted value from standalone popup close the popup
   * NOTE - we do not want to respond to non-standalone templates as this is done through template nav-actions
   * */
  handleEmittedValue(value: { emit_value: string; emit_data: any }) {
    const { emit_value } = value;
    if (this.props.dismissOnEmit) {
      if (["completed", "uncompleted"].includes(emit_value)) {
        this.dismiss(value);
      }
    }
  }

  dismissOnBackdrop(e: MouseEvent) {
    const el = e.target as HTMLElement;
    if (el.classList.contains("popup-backdrop")) {
      this.dismiss();
    }
  }

  dismiss(value?: { emit_value: string; emit_data: any }) {
    this.modalCtrl.dismiss(value);
  }
}

export interface ITemplatePopupComponentProps extends ITemplateContainerProps {
  name: string;
  templatename: string;
  parent?: TemplateContainerComponent;
  row?: FlowTypes.TemplateRow;
  showCloseButton?: boolean;
  /** Dismiss popup when completed or uncompleted is emitted from child template */
  dismissOnEmit?: boolean;
  /** Wait for template to be self-dismissed before returning (default: True) */
  waitForDismiss?: boolean;
  /** Display fullscreen overlayed on top of all other app content */
  fullscreen?: boolean;
}
