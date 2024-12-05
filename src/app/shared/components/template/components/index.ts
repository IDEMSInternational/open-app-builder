/* eslint sort-keys: "error"  */
import { FlowTypes } from "../models";
import { TemplateContainerComponent } from "../template-container.component";

/***************************************************************************************
 * Template Components
 **************************************************************************************/
import { AccordionSectionComponent } from "./layout/accordion-section/accordion-section.component";
import { AnimatedSectionComponent } from "./layout/animated_section";
import { AnimatedSectionGroupComponent } from "./layout/animated_section_group";
import { ComboBoxModalComponent } from "./combo-box/combo-box-modal/combo-box-modal.component";
import { FormComponent } from "./layout/form";
import { NavGroupComponent } from "./layout/nav_group";
import { PLHDebugToggleComponent } from "../../debug-toggle";
import { RoundIconButtonComponent } from "./round-icon-button/round-icon-button.component";
import { SelectTextComponent } from "./select-text/select-text.component";
import { SquareIconButtonComponent } from "./square-icon-button/square-icon-button.component";
import { TemplateBaseComponent } from "./base";
import { TemplateDebuggerComponent } from "./debugger";
import { TemplateHTMLComponent } from "./html/html.component";
import { TemplatePopupComponent } from "./layout/popup/popup.component";
import { TmplAccordionComponent } from "./accordion/accordion.component";
import { TmplAdvancedDashedBoxComponent } from "./layout/advanced-dashed-box/advanced-dashed-box.component";
import { TmplAnimatedSlidesComponent } from "./animated-slides/animated-slides.component";
import { TmplAudioComponent } from "./audio/audio.component";
import { TmplButtonComponent } from "./button/button.component";
import { TmplCarouselComponent } from "./carousel/carousel.component";
import { TmplComboBoxComponent } from "./combo-box/combo-box.component";
import { TmplDashedBoxComponent } from "./dashed-box/dashed-box.component";
import { TmplDataItemsComponent } from "./data-items/data-items.component";
import { TmplDisplayGridComponent } from "./layout/display-grid/display-grid.component";
import { TmplDisplayGroupComponent } from "./layout/display-group/display-group.component";
import { TmplDisplayGroupStickyComponent } from "./layout/display-group/sticky/display-group-sticky.component";
import { TmplDrawerComponent } from "./drawer/drawer.component";
import { TmplHelpIconComponent } from "./help-icon";
import { TmplIconBannerComponent } from "./icon-banner/icon-banner.component";
import { TmplImageComponent } from "./image";
import { TmplLatexComponent } from "./latex/latex.component";
import { TmplLottieAnimation } from "./lottie-animation";
import { TmplNavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { TmplNumberComponent } from "./number-selector/number-selector.component";
import { TmplOdkFormComponent } from "./odk-form/odk-form.component";
import { TmplPdfComponent } from "./pdf/pdf.component";
import { TmplProgressPathComponent } from "./progress-path/progress-path.component";
import { TmplQRCodeComponent } from "./qr-code/qr-code.component";
import { TmplRadioButtonGridComponent } from "./radio-button-grid/radio-button-grid.component";
import { TmplRadioGroupComponent } from "./radio-group/radio-group.component";
import { TmplSimpleCheckboxComponent } from "./simple-checkbox/simple-checkbox.component";
import { TmplSliderComponent } from "./slider/slider.component";
import { TmplSubtitleComponent } from "./subtitle";
import { TmplTaskCardComponent } from "./task-card/task-card.component";
import { TmplTaskProgressBarComponent } from "./task-progress-bar/task-progress-bar.component";
import { TmplTextAreaComponent } from "./text-area/text-area.component";
import { TmplTextBoxComponent } from "./text-box/text-box.component";
import { TmplTextComponent } from "./text/text.component";
import { TmplTextBubbleComponent } from "./text-bubble/text-bubble.component";
import { TmplTileComponent } from "./tile-component/tile-component.component";
import { TmplTitleComponent } from "./title/title.component";
import { TmplTimerComponent } from "./timer/timer.component";
import { TmplToggleBarComponent } from "./toggle-bar/toggle-bar";
import { TmplVideoComponent } from "./video";
import { WorkshopsComponent } from "./layout/workshops_accordion";
import { YoutubeComponent } from "./youtube/youtube.component";

import { DEMO_COMPONENT_MAPPING } from "components/demo";
import { PLH_COMPONENT_MAPPING } from "components/plh";

/** All components should be exported as a single array for easy module import */
export const TEMPLATE_COMPONENTS = [
  // no prefix
  AccordionSectionComponent,
  AnimatedSectionComponent,
  AnimatedSectionGroupComponent,
  ComboBoxModalComponent,
  FormComponent,
  NavGroupComponent,
  RoundIconButtonComponent,
  SelectTextComponent,
  SquareIconButtonComponent,
  TemplateBaseComponent,
  TemplateDebuggerComponent,
  TemplateHTMLComponent,
  TemplatePopupComponent,
  // tmpl prefix
  TmplAccordionComponent,
  TmplAdvancedDashedBoxComponent,
  TmplAnimatedSlidesComponent,
  TmplAudioComponent,
  TmplButtonComponent,
  TmplCarouselComponent,
  TmplComboBoxComponent,
  TmplDashedBoxComponent,
  TmplDataItemsComponent,
  TmplDisplayGridComponent,
  TmplDisplayGroupComponent,
  TmplDisplayGroupStickyComponent,
  TmplDrawerComponent,
  TmplHelpIconComponent,
  TmplIconBannerComponent,
  TmplImageComponent,
  TmplLatexComponent,
  TmplLottieAnimation,
  TmplNavigationBarComponent,
  TmplNumberComponent,
  TmplOdkFormComponent,
  TmplPdfComponent,
  TmplProgressPathComponent,
  TmplQRCodeComponent,
  TmplRadioButtonGridComponent,
  TmplRadioGroupComponent,
  TmplSimpleCheckboxComponent,
  TmplSliderComponent,
  TmplSubtitleComponent,
  TmplTaskCardComponent,
  TmplTaskProgressBarComponent,
  TmplTextAreaComponent,
  TmplTextBoxComponent,
  TmplTextBubbleComponent,
  TmplTextComponent,
  TmplTileComponent,
  TmplTimerComponent,
  TmplTitleComponent,
  TmplToggleBarComponent,
  TmplVideoComponent,
  // no prefix
  WorkshopsComponent,
];

/***************************************************************************************
 * Template core component mapping
 * These components are used within the core system and are not removed from build
 **************************************************************************************/
const CORE_COMPONENT_MAPPING: Record<FlowTypes.TemplateRowCoreType, any> = {
  data_items: TmplDataItemsComponent,
  template: TemplateContainerComponent,
  text: TmplTextComponent, // used in various child component dynamic rows
  title: TmplTitleComponent, // used in not-found default fallback
};

/***************************************************************************************
 * Template common component mapping
 * These components are available on-demand and can be removed from build via
 * deployment config optimisation
 **************************************************************************************/
const COMMON_COMPONENT_MAPPING = {
  /* optimise:components:start */
  accordion: TmplAccordionComponent,
  accordion_section: AccordionSectionComponent,
  advanced_dashed_box: TmplAdvancedDashedBoxComponent,
  animated_section: AnimatedSectionComponent,
  animated_section_group: AnimatedSectionGroupComponent,
  animated_slides: TmplAnimatedSlidesComponent,
  audio: TmplAudioComponent,
  button: TmplButtonComponent,
  carousel: TmplCarouselComponent,
  combo_box: TmplComboBoxComponent,
  dashed_box: TmplDashedBoxComponent,
  debug_toggle: PLHDebugToggleComponent,
  display_grid: TmplDisplayGridComponent,
  display_group: TmplDisplayGroupComponent,
  display_group_sticky: TmplDisplayGroupStickyComponent,
  drawer: TmplDrawerComponent,
  form: FormComponent,
  help_icon: TmplHelpIconComponent,
  html: TemplateHTMLComponent,
  icon_banner: TmplIconBannerComponent,
  image: TmplImageComponent,
  latex: TmplLatexComponent,
  lottie_animation: TmplLottieAnimation,
  nav_group: NavGroupComponent,
  nav_section: AnimatedSectionComponent,
  navigation_bar: TmplNavigationBarComponent,
  number_selector: TmplNumberComponent,
  odk_form: TmplOdkFormComponent,
  pdf: TmplPdfComponent,
  progress_path: TmplProgressPathComponent,
  qr_code: TmplQRCodeComponent,
  radio_button_grid: TmplRadioButtonGridComponent,
  radio_group: TmplRadioGroupComponent,
  round_button: RoundIconButtonComponent,
  select_text: SelectTextComponent,
  simple_checkbox: TmplSimpleCheckboxComponent,
  slider: TmplSliderComponent,
  square_button: SquareIconButtonComponent,
  subtitle: TmplSubtitleComponent,
  task_card: TmplTaskCardComponent,
  task_progress_bar: TmplTaskProgressBarComponent,
  text_area: TmplTextAreaComponent,
  text_box: TmplTextBoxComponent,
  text_bubble: TmplTextBubbleComponent,
  tile_component: TmplTileComponent,
  timer: TmplTimerComponent,
  toggle_bar: TmplToggleBarComponent,
  video: TmplVideoComponent,
  workshops_accordion: WorkshopsComponent,
  youtube: YoutubeComponent,
  /* optimise:components:end */
};

/** Utility type of all named components from common mapping */
export type ICommonComponentName = keyof typeof COMMON_COMPONENT_MAPPING;

export const TEMPLATE_COMPONENT_MAPPING = {
  ...COMMON_COMPONENT_MAPPING,
  ...DEMO_COMPONENT_MAPPING,
  ...PLH_COMPONENT_MAPPING,
  ...CORE_COMPONENT_MAPPING,
};
