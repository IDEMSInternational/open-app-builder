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
import { TmplRadioButtonGridComponent } from "./radio-button-grid/radio-button-grid.component";
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
import { TmplDataItemsComponent } from "./data-items/data-items.component";

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
  TmplRadioButtonGridComponent,
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
  TmplDataItemsComponent,
];

/***************************************************************************************
 * Template component mapping
 **************************************************************************************/
/* eslint sort-keys: "error" */
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
  parent_point_box: TmplParentPointBoxComponent,
  parent_point_counter: TmplParentPointCounterComponent,
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
