import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FlowTypes } from "../../../models";
import { TemplateContainerComponent } from "../../../template-container.component";
import { TemplateTranslateService } from "../../../services/template-translate.service";

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

  constructor(
    private modalCtrl: ModalController,
    // HACK: Since pop-ups can be launched outside of main app container (e.g. as part of launch actions),
    // handle RTL language support directly in this component
    public templateTranslateService: TemplateTranslateService
  ) {}

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

/** Required inputs to pass on to TemplateContainer component */
interface IContainerProps {
  name: string;
  templatename: string;
  row?: FlowTypes.TemplateRow;
  parent?: TemplateContainerComponent;
}

export interface ITemplatePopupComponentProps extends IContainerProps {
  showCloseButton?: boolean;
  /** Dismiss popup when completed or uncompleted is emitted from child template */
  dismissOnEmit?: boolean;
  /** Wait for template to be self-dismissed before returning (default: True) */
  waitForDismiss?: boolean;
  /** Display fullscreen overlayed on top of all other app content */
  fullscreen?: boolean;
  /** Pass text only to render that text in a popup, bypassing any templates */
  popupText?: string;
  /** Template Parameter: "variant". Defines style and use of pop up */
  variant?: string;
}
