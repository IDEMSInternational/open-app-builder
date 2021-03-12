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
import { TmplButtonComponent } from "./button";
import { TmplDisplayGroupComponent } from "./layout/display_group";
import { TmplImageComponent } from "./image";
import { TmplTextComponent } from "./text";
import { TmplTimerComponent } from "./timer/timer.component";
import { TmplTitleComponent } from "./title";
import { TmplVideoComponent } from "./video";
import { TmplNumberComponent } from "./number-selector/number-selector.component";
import { SliderNewComponent } from "./slider-new/slider-new.component";
import { RoundIconButtonComponent } from "./round-icon-button/round-icon-button.component";
import { TmplSliderComponent } from "./slider/slider.component";

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
  SliderNewComponent,
  NavGroupComponent,
  TmplButtonComponent,
  RoundIconButtonComponent,
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
  slider_new: SliderNewComponent,
};
