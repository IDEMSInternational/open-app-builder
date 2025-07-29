import { NestedTemplateComponent } from "./nested-template/nested-template.component";
import { SetVariableComponent } from "./set-variable/set-variable.component";
import { TextBoxComponent } from "./text-box/text-box.component";
import { TextComponent } from "./text/text.component";

export const REACTIVE_COMPONENT_MAP = {
  set_variable: SetVariableComponent,
  template: NestedTemplateComponent,
  text: TextComponent,
  text_box: TextBoxComponent,
};
