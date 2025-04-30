import { FlowTypes } from "packages/data-models";

const shared_data_base: Omit<
  FlowTypes.TemplateRow,
  "_nested_name" | "name" | "action_list" | "rows"
> = {
  type: "shared_data",
  value: "",
};

export const ROW_TEMPLATES = {
  shared_data_base: shared_data_base as FlowTypes.TemplateRow,
};
