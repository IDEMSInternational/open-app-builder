import { Component, inject, Input, OnDestroy, OnInit, viewChild } from "@angular/core";
import { IonModalToken, ModalController } from "@ionic/angular";
import { FlowTypes } from "../../../models";
import { TemplateContainerComponent } from "../../../template-container.component";
import { TemplateLifecycleService } from "../../../services/template-lifecycle.service";
import { TemplateTranslateService } from "../../../services/template-translate.service";
import { TemplateAssetService } from "../../../services/template-asset.service";

@Component({
  templateUrl: "./popup.component.html",
  styleUrl: "./popup.component.scss",
  standalone: false,
})
/**
 * When opening a template as a popup, provide a minimal interface and load
 * the template directly as a regular template-container element
 */
export class TemplatePopupComponent implements OnInit, OnDestroy {
  @Input() props: ITemplatePopupComponentProps;
  // queried by reference: this component and the container import each other
  private container = viewChild<TemplateContainerComponent>("container");
  // not `modal`, which Ionic sets on modal components
  private ionModal = inject(IonModalToken, { optional: true });
  private lifecycleService = inject(TemplateLifecycleService);

  /**
   * Inline styles for an optional background image. It covers the popup content, or the whole screen
   * (the backdrop) for a fullscreen popup, whose content is inset by the popup container padding
   */
  public contentStyles: Record<string, string> = {};
  public backdropStyles: Record<string, string> = {};

  constructor(
    private modalCtrl: ModalController,
    // HACK: Since pop-ups can be launched outside of main app container (e.g. as part of launch actions),
    // handle RTL language support directly in this component
    public templateTranslateService: TemplateTranslateService,
    private templateAssetService: TemplateAssetService
  ) {}

  ngOnInit() {
    this.setBackgroundImageStyles();
    if (this.isTopLevel()) this.lifecycleService.addOverlay(this.container, this.ionModal);
  }

  ngOnDestroy() {
    if (this.isTopLevel()) this.lifecycleService.removeOverlay(this.container);
  }

  /** Fullscreen pop-ups opened by `TemplateService.runStandaloneTemplate` get `nav_enter` */
  private isTopLevel() {
    return this.props.standalone && this.props.fullscreen;
  }

  private setBackgroundImageStyles() {
    const backgroundImageStyles = this.getBackgroundImageStyles();
    if (this.props.fullscreen) {
      this.backdropStyles = backgroundImageStyles;
      // The content fills the screen with its own background colour, which would hide the image. The backdrop
      // of a fullscreen popup is already painted with the same colour
      if (this.props.backgroundImageAsset) {
        this.contentStyles = { background: "transparent" };
      }
    } else {
      this.contentStyles = backgroundImageStyles;
    }
  }

  /**
   * Cover the whole popup with the background image, whatever the height of the template inside.
   * Set inline so that variant styles that use the `background` shorthand (e.g. plh_completion) keep their
   * colour but cannot reset the image size or position
   */
  private getBackgroundImageStyles(): Record<string, string> {
    const { backgroundImageAsset, backgroundImagePosition } = this.props;
    if (!backgroundImageAsset) return {};
    const url = this.templateAssetService.getTranslatedAssetPath(backgroundImageAsset);
    return {
      backgroundImage: `url("${url}")`,
      backgroundSize: "cover",
      // Default matches display group background images
      backgroundPosition: backgroundImagePosition || "top",
      backgroundRepeat: "no-repeat",
    };
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
    // Fullscreen popups have no visible backdrop (it is painted with the popup background), but on wide
    // screens the backdrop still shows either side of the content, so clicks there should not dismiss
    if (this.props.fullscreen) return;
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
  /** Opened by `TemplateService.runStandaloneTemplate`, outside any template */
  standalone?: boolean;
  /** Pass text only to render that text in a popup, bypassing any templates */
  popupText?: string;
  /** Template Parameter: "variant". Defines style and use of pop up */
  variant?: string;
  /**
   * Template Parameter: "background_image_asset". Image that covers the whole popup content behind the
   * template. Action params are comma-separated, e.g.
   * `click | pop_up: my_template | variant: plh_completion, background_image_asset: images/bg.svg`
   */
  backgroundImageAsset?: string;
  /**
   * Template Parameter: "background_image_position". Which part of the background image stays visible when
   * it is cropped to fit, as a CSS background-position, e.g. `center`, `bottom` (default: `top`)
   */
  backgroundImagePosition?: string;
}
