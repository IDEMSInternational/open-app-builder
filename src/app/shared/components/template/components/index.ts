/* eslint sort-keys: "error"  */
import { Type } from "@angular/core";
import { FlowTypes, ITemplateRowProps } from "../models";
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
import { TmplDrawerComponent } from "./drawer/drawer.component";
import { TmplHelpIconComponent } from "./help-icon";
import { TmplIconBannerComponent } from "./icon-banner/icon-banner.component";
import { TmplImageComponent } from "./image";
import { TmplLatexComponent } from "./latex/latex.component";
import { TmplLottieAnimation } from "./lottie-animation";
import { TmplNavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { TmplNumberComponent } from "./number-selector/number-selector.component";
import { TmplOdkFormComponent } from "./odk-form/odk-form.component";
import { TmplParentPointBoxComponent } from "./points-item/points-item.component";
import { TmplParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";
import { TmplPdfComponent } from "./pdf/pdf.component";
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
import { TmplTextComponent } from "./text";
import { TmplTileComponent } from "./tile-component/tile-component.component";
import { TmplTitleComponent } from "./title";
import { TmplTimerComponent } from "./timer/timer.component";
import { TmplToggleBarComponent } from "./toggle-bar/toggle-bar";
import { TmplVideoComponent } from "./video";

import { WorkshopsComponent } from "./layout/workshops_accordion";

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
  TmplDrawerComponent,
  TmplHelpIconComponent,
  TmplIconBannerComponent,
  TmplImageComponent,
  TmplLatexComponent,
  TmplLottieAnimation,
  TmplNavigationBarComponent,
  TmplNumberComponent,
  TmplOdkFormComponent,
  TmplParentPointBoxComponent,
  TmplParentPointCounterComponent,
  TmplPdfComponent,
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
 * Template component mapping
 **************************************************************************************/
export const TEMPLATE_COMPONENT_MAPPING: Record<
  FlowTypes.TemplateRowType,
  Type<ITemplateRowProps>
> = {
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
  data_items: TmplDataItemsComponent,
  debug_toggle: PLHDebugToggleComponent as any,
  display_grid: TmplDisplayGridComponent,
  display_group: TmplDisplayGroupComponent,
  display_theme: null as any,
  drawer: TmplDrawerComponent,
  form: FormComponent,
  help_icon: TmplHelpIconComponent,
  html: TemplateHTMLComponent,
  icon_banner: TmplIconBannerComponent,
  image: TmplImageComponent,
  items: null,
  latex: TmplLatexComponent,
  lottie_animation: TmplLottieAnimation,
  nav_group: NavGroupComponent,
  nav_section: AnimatedSectionComponent,
  navigation_bar: TmplNavigationBarComponent,
  nested_properties: null as any,
  number_selector: TmplNumberComponent,
  odk_form: TmplOdkFormComponent,
  parent_point_box: TmplParentPointBoxComponent,
  parent_point_counter: TmplParentPointCounterComponent,
  pdf: TmplPdfComponent,
  qr_code: TmplQRCodeComponent,
  radio_button_grid: TmplRadioButtonGridComponent,
  radio_group: TmplRadioGroupComponent,
  round_button: RoundIconButtonComponent,
  select_text: SelectTextComponent,
  set_default: null as any,
  set_field: null as any,
  set_local: null as any,
  set_variable: null as any,
  simple_checkbox: TmplSimpleCheckboxComponent,
  slider: TmplSliderComponent,
  square_button: SquareIconButtonComponent,
  subtitle: TmplSubtitleComponent,
  task_card: TmplTaskCardComponent,
  task_progress_bar: TmplTaskProgressBarComponent,
  template: TemplateContainerComponent as any,
  text: TmplTextComponent,
  text_area: TmplTextAreaComponent,
  text_box: TmplTextBoxComponent,
  tile_component: TmplTileComponent,
  timer: TmplTimerComponent,
  title: TmplTitleComponent,
  toggle_bar: TmplToggleBarComponent,
  update_action_list: null as any,
  video: TmplVideoComponent,
  workshops_accordion: WorkshopsComponent,
};
