import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FlowTypes, ITemplateContainerProps } from "../../../models";
import { TemplateContainerComponent } from "../../../template-container.component";
import {
  IScreenOrientation,
  ScreenOrientationService,
} from "src/app/shared/services/screen-orientation/screen-orientation.service";
import { TemplateService } from "../../../services/template.service";

@Component({
  templateUrl: "./popup.component.html",
  styleUrl: "./popup.component.scss",
})
/**
 * When opening a template as a popup, provide a minimal interface and load
 * the template directly as a regular template-container element
 */
export class TemplatePopupComponent implements OnInit {
  @Input() props: ITemplatePopupComponentProps;
  private templateOrientation: IScreenOrientation | undefined;

  constructor(
    private modalCtrl: ModalController,
    private screenOrientationService: ScreenOrientationService,
    private templateService: TemplateService
  ) {}

  async ngOnInit() {
    // HACK - handle template metadata for fullscreen pop-ups within component.
    // The template metadata service currently only handles top-level templates
    if (this.props.fullscreen) {
      await this.handletemplateMetadata();
    }
  }

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
    if (this.props.fullscreen) {
      this.screenOrientationService.setOrientation("unlock");
    }
  }

  private async handletemplateMetadata() {
    const { templatename } = this.props;
    if (!templatename) return;

    const templateParameterList = await this.templateService.getTemplateMetadata(templatename);
    this.templateOrientation = templateParameterList?.orientation;

    await this.setScreenOrientation();
  }

  private async setScreenOrientation() {
    if (this.templateOrientation) {
      await this.screenOrientationService.setOrientation(this.templateOrientation);
    }
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
  /** Pass text only to render that text in a popup, bypassing any templates */
  popupText?: string;
}
