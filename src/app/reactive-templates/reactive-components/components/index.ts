import { ButtonComponent } from "./button/button.component";
import { NestedTemplateComponent } from "./nested-template/nested-template.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { SetVariableComponent } from "./set-variable/set-variable.component";
import { TextBoxComponent } from "./text-box/text-box.component";
import { TextComponent } from "./text/text.component";
import { TitleComponent } from "./title/title.component";
import { ToggleBarComponent } from "./toggle-bar/toggle-bar";
import { QueryComponent } from "./query/query.component";
import { LoopComponent } from "./loop/loop.component";
import { ActionComponent } from "./action/action.component";
import { NavComponent } from "./nav/nav.component";
import { SetGlobalComponent } from "./set-global/set-global.component";
import { DisplayGroupComponent } from "./display-group/display-group.component";
import { UpdateComponent } from "./update/update.component";
import { AccordionComponent } from "./accordion/accordion.component";
import { AccordionSectionComponent } from "./accordion/accordion-section/accordion-section.component";

export const REACTIVE_COMPONENT_MAP = {
  accordion: AccordionComponent,
  accordion_section: AccordionSectionComponent,
  action: ActionComponent,
  button: ButtonComponent,
  display_group: DisplayGroupComponent,
  dropdown: DropdownComponent,
  loop: LoopComponent,
  nav: NavComponent,
  set_global: SetGlobalComponent,
  set_variable: SetVariableComponent,
  template: NestedTemplateComponent,
  text: TextComponent,
  text_box: TextBoxComponent,
  title: TitleComponent,
  toggle_bar: ToggleBarComponent,
  query: QueryComponent,
  update: UpdateComponent,
};
