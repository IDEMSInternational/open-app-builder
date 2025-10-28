import { ButtonComponent } from "./button/button.component";
import { NestedTemplateComponent } from "./nested-template/nested-template.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { SetVariableComponent } from "./set-variable/set-variable.component";
import { TextBoxComponent } from "./text-box/text-box.component";
import { TextComponent } from "./text/text.component";
import { TitleComponent } from "./title/title.component";
import { ToggleBarComponent } from "./toggle-bar/toggle-bar";
import { QueryComponent } from "./query/query.component";

export const REACTIVE_COMPONENT_MAP = {
  button: ButtonComponent,
  dropdown: DropdownComponent,
  set_variable: SetVariableComponent,
  template: NestedTemplateComponent,
  text: TextComponent,
  text_box: TextBoxComponent,
  title: TitleComponent,
  toggle_bar: ToggleBarComponent,
  query: QueryComponent,
};
