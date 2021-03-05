import { FlowTypes, ITemplateRowProps } from "../models";
import { TemplateContainerComponent } from "../template-container.component";
import { Type } from "@angular/core";

/***************************************************************************************
 * Template Components
 **************************************************************************************/

import { AnimatedSectionComponent } from "./animated_section";
import { AnimatedSectionGroupComponent } from "./animated_section_group";
import { NavGroupComponent } from "./nav_group";
import { TmplAudioComponent } from "./audio";
import { TemplateBaseComponent } from "./base";
import { TmplButtonComponent } from "./button";
import { TmplDisplayGroupComponent } from "./display_group";
import { TmplImageComponent } from "./image";
import { TmplSliderComponent } from "./slider";
import { TmplTextComponent } from "./text";
import { TmplTimerComponent } from "./timer";
import { TmplTitleComponent } from "./title";
import { TmplVideoComponent } from "./video";

/** All components should be exported as a single array for easy module import */
export const TEMPLATE_COMPONENTS = [
  AnimatedSectionComponent,
  AnimatedSectionGroupComponent,
  NavGroupComponent,
  TmplAudioComponent,
  TemplateBaseComponent,
  TmplButtonComponent,
  TmplDisplayGroupComponent,
  TmplImageComponent,
  TmplSliderComponent,
  TmplTextComponent,
  TmplTimerComponent,
  TmplTitleComponent,
  TmplVideoComponent,
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
  // TODO - handle display_theme and other properties that should be inherited to child components
  display_theme: null as any,
  template: TemplateContainerComponent as any,
  video: TmplVideoComponent,
  slider: TmplSliderComponent,
  timer: TmplTimerComponent,
  nav_group: NavGroupComponent,
  nav_section: AnimatedSectionComponent,
};
