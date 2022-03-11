import { FlowTypes } from "data-models";
import template_component_demo from "./template.component_demo";
import template_example_hardcoded from "./template.example_hardcoded";
import template_2 from "./template";
export const template: FlowTypes.Template[] = [].concat(
  template_component_demo,
  template_example_hardcoded,
  template_2
);
