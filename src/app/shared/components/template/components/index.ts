import { FlowTypes, ITemplateRowProps } from "../models";
import { TemplateContainerComponent } from "../template-container.component";
import { Type } from "@angular/core";

/***************************************************************************************
 * Template Components
 **************************************************************************************/

import { AnimatedSectionComponent } from "./layout/animated_section";
import { AnimatedSectionGroupComponent } from "./layout/animated_section_group";
import { NavGroupComponent } from "./layout/nav_group";
import { TmplAudioComponent } from "./audio/audio.component";
import { TemplateBaseComponent } from "./base";
import { TemplateDebuggerComponent } from "./debugger";
import { TmplButtonComponent } from "./button/button.component";
import { TmplDisplayGroupComponent } from "./layout/display_group";
import { TmplImageComponent } from "./image";
import { TmplTextComponent } from "./text";
import { TmplTimerComponent } from "./timer/timer.component";
import { TmplTitleComponent } from "./title";
import { TmplVideoComponent } from "./video";
import { TmplNumberComponent } from "./number-selector/number-selector.component";
import { RoundIconButtonComponent } from "./round-icon-button/round-icon-button.component";
import { TmplSliderComponent } from "./slider/slider.component";
import { TmplRadioGroupComponent } from "./radio-group/radio-group.component";
import { TmplTileComponent } from "./tile-component/tile-component.component";
import { TmplSimpleCheckboxComponent } from "./simple-checkbox/simple-checkbox.component";
import { TmplAnimationComponent } from "./animation";
import { TmplTextBoxComponent } from "./text-box/text-box.component";
import { TmplComboBoxComponent } from "./combo-box/combo-box.component";

/** All components should be exported as a single array for easy module import */
export const TEMPLATE_COMPONENTS = [
  TemplateBaseComponent,
  TemplateDebuggerComponent,
  TmplTextComponent,
  AnimatedSectionGroupComponent,
  TmplTitleComponent,
  TmplDisplayGroupComponent,
  TmplAudioComponent,
  TmplButtonComponent,
  TmplImageComponent,
  TmplVideoComponent,
  AnimatedSectionComponent,
  TmplTimerComponent,
  TmplSliderComponent,
  TmplNumberComponent,
  NavGroupComponent,
  TmplButtonComponent,
  RoundIconButtonComponent,
  TmplRadioGroupComponent,
  TmplTileComponent,
  TmplSimpleCheckboxComponent,
  TmplAnimationComponent,
  TmplTextBoxComponent,
  TmplComboBoxComponent,
];

/***************************************************************************************
 * Template component mapping
 **************************************************************************************/

export const TEMPLATE_COMPONENT_MAPPING: Record<
  FlowTypes.TemplateRowType,
  Type<ITemplateRowProps>
> = {
  text: TmplTextComponent,
  title: TmplTitleComponent,
  subtitle: TmplTextComponent,
  animated_section_group: AnimatedSectionGroupComponent,
  animated_section: AnimatedSectionComponent,
  display_group: TmplDisplayGroupComponent,
  audio: TmplAudioComponent,
  button: TmplButtonComponent,
  image: TmplImageComponent,
  // set variable and nested properties are handled by parent
  set_variable: null as any,
  nested_properties: null as any,
  set_global: null as any,
  set_field: null as any,
  set_local: null as any,
  combo_box: TmplComboBoxComponent,
  set_default: null as any,
  text_box: TmplTextBoxComponent,
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
  radio_group: TmplRadioGroupComponent,
  tile_component: TmplTileComponent,
  simple_checkbox: TmplSimpleCheckboxComponent,
  css_anim: TmplAnimationComponent,
};
