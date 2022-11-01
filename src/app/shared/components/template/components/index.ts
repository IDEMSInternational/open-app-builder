import { FlowTypes, ITemplateRowProps } from "../models";
import { TemplateContainerComponent } from "../template-container.component";
import { Type } from "@angular/core";

/***************************************************************************************
 * Template Components
 **************************************************************************************/

import { AnimatedSectionComponent } from "./layout/animated_section";
import { AccordionSectionComponent } from "./layout/accordion_section";
import { TmplAdvancedDashedBoxComponent } from "./layout/advanced-dashed-box/advanced-dashed-box.component";
import { AnimatedSectionGroupComponent } from "./layout/animated_section_group";
import { FormComponent } from "./layout/form";
import { WorkshopsComponent } from "./layout/workshops_accordion";
import { NavGroupComponent } from "./layout/nav_group";
import { TmplAudioComponent } from "./audio/audio.component";
import { TemplateBaseComponent } from "./base";
import { TemplateDebuggerComponent } from "./debugger";
import { TmplButtonComponent } from "./button/button.component";
import { TmplDisplayGroupComponent } from "./layout/display_group";
import { TmplImageComponent } from "./image";
import { TmplHelpIconComponent } from "./help-icon";
import { TmplTextComponent } from "./text";
import { TmplParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";
import { TmplTimerComponent } from "./timer/timer.component";
import { TmplTitleComponent } from "./title";
import { TmplSubtitleComponent } from "./subtitle";
import { TmplToggleBarComponent } from "./toggle-bar/toggle-bar";
import { TmplVideoComponent } from "./video";
import { TmplNumberComponent } from "./number-selector/number-selector.component";
import { RoundIconButtonComponent } from "./round-icon-button/round-icon-button.component";
import { SquareIconButtonComponent } from "./square-icon-button/square-icon-button.component";
import { TmplSliderComponent } from "./slider/slider.component";
import { TmplRadioGroupComponent } from "./radio-group/radio-group.component";
import { TmplTileComponent } from "./tile-component/tile-component.component";
import { TmplSimpleCheckboxComponent } from "./simple-checkbox/simple-checkbox.component";
import { TmplTextBoxComponent } from "./text-box/text-box.component";
import { TmplTextAreaComponent } from "./text-area/text-area.component";
import { TmplComboBoxComponent } from "./combo-box/combo-box.component";
import { ComboBoxModalComponent } from "./combo-box/combo-box-modal/combo-box-modal.component";
import { TemplatePopupComponent } from "./layout/popup";
import { TmplIconBannerComponent } from "./icon-banner/icon-banner.component";
import { TmplDashedBoxComponent } from "./dashed-box/dashed-box.component";
import { TmplParentPointBoxComponent } from "./points-item/points-item.component";
import { TmplLottieAnimation } from "./lottie-animation";
import { PLHDebugToggleComponent } from "../../debug-toggle";
import { SelectTextComponent } from "./select-text/select-text.component";
import { TemplateHTMLComponent } from "./html/html.component";
import { TmplAccordionComponent } from "./accordion/accordion.component";
import { TmplLatexComponent } from "./latex/latex.component";
import { TmplAnimatedSlidesComponent } from "./animated-slides/animated-slides.component";
import { TmplTaskCardComponent } from "./task-card/task-card.component";
import { TmplTaskProgressBarComponent } from "./task-progress-bar/task-progress-bar.component";
import { TmplQRCodeComponent } from "./qr-code/qr-code.component";
import { TmplNavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { TmplCarouselComponent } from "./carousel/carousel.component";
import { TmplDrawerComponent } from "./drawer/drawer.component";

/** All components should be exported as a single array for easy module import */
export const TEMPLATE_COMPONENTS = [
  TemplateBaseComponent,
  TemplateDebuggerComponent,
  TemplatePopupComponent,
  TmplTextComponent,
  TmplParentPointCounterComponent,
  AnimatedSectionGroupComponent,
  WorkshopsComponent,
  TmplTitleComponent,
  TmplSubtitleComponent,
  TmplToggleBarComponent,
  TmplDisplayGroupComponent,
  TmplAudioComponent,
  TmplButtonComponent,
  TmplImageComponent,
  TmplHelpIconComponent,
  TmplVideoComponent,
  AnimatedSectionComponent,
  AccordionSectionComponent,
  TmplAdvancedDashedBoxComponent,
  FormComponent,
  TmplTimerComponent,
  TmplSliderComponent,
  TmplNumberComponent,
  NavGroupComponent,
  TmplButtonComponent,
  RoundIconButtonComponent,
  SquareIconButtonComponent,
  TmplRadioGroupComponent,
  TmplTileComponent,
  TmplSimpleCheckboxComponent,
  TmplTextBoxComponent,
  TmplTextAreaComponent,
  TmplComboBoxComponent,
  ComboBoxModalComponent,
  TmplIconBannerComponent,
  TmplDashedBoxComponent,
  TmplParentPointBoxComponent,
  TmplLottieAnimation,
  SelectTextComponent,
  TemplateHTMLComponent,
  TmplAccordionComponent,
  TmplLatexComponent,
  TmplAnimatedSlidesComponent,
  TmplTaskCardComponent,
  TmplTaskProgressBarComponent,
  TmplQRCodeComponent,
  TmplNavigationBarComponent,
  TmplCarouselComponent,
  TmplDrawerComponent,
];

/***************************************************************************************
 * Template component mapping
 **************************************************************************************/

export const TEMPLATE_COMPONENT_MAPPING: Record<
  FlowTypes.TemplateRowType,
  Type<ITemplateRowProps>
> = {
  accordion: TmplAccordionComponent,
  text: TmplTextComponent,
  title: TmplTitleComponent,
  subtitle: TmplSubtitleComponent,
  toggle_bar: TmplToggleBarComponent,
  animated_section_group: AnimatedSectionGroupComponent,
  workshops_accordion: WorkshopsComponent,
  accordion_section: AccordionSectionComponent,
  advanced_dashed_box: TmplAdvancedDashedBoxComponent,
  form: FormComponent,
  animated_section: AnimatedSectionComponent,
  display_group: TmplDisplayGroupComponent,
  audio: TmplAudioComponent,
  button: TmplButtonComponent,
  image: TmplImageComponent,
  help_icon: TmplHelpIconComponent,
  parent_point_counter: TmplParentPointCounterComponent,
  // set variable and nested properties are handled by parent
  set_variable: null as any,
  nested_properties: null as any,
  set_field: null as any,
  set_local: null as any,
  combo_box: TmplComboBoxComponent,
  set_default: null as any,
  update_action_list: null as any,
  text_box: TmplTextBoxComponent,
  text_area: TmplTextAreaComponent,
  // TODO - handle display_theme and other properties that should be inherited to child components
  display_theme: null as any,
  template: TemplateContainerComponent as any,
  video: TmplVideoComponent,
  slider: TmplSliderComponent,
  timer: TmplTimerComponent,
  nav_group: NavGroupComponent,
  nav_section: AnimatedSectionComponent,
  number_selector: TmplNumberComponent,
  round_button: RoundIconButtonComponent,
  square_button: SquareIconButtonComponent,
  radio_group: TmplRadioGroupComponent,
  tile_component: TmplTileComponent,
  simple_checkbox: TmplSimpleCheckboxComponent,
  icon_banner: TmplIconBannerComponent,
  dashed_box: TmplDashedBoxComponent,
  parent_point_box: TmplParentPointBoxComponent,
  lottie_animation: TmplLottieAnimation,
  debug_toggle: PLHDebugToggleComponent as any,
  items: null,
  select_text: SelectTextComponent,
  html: TemplateHTMLComponent,
  latex: TmplLatexComponent,
  animated_slides: TmplAnimatedSlidesComponent,
  task_card: TmplTaskCardComponent,
  task_progress_bar: TmplTaskProgressBarComponent,
  qr_code: TmplQRCodeComponent,
  navigation_bar: TmplNavigationBarComponent,
  carousel: TmplCarouselComponent,
  drawer: TmplDrawerComponent,
};
