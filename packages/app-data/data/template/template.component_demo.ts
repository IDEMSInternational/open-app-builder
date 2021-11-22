/* eslint-disable */
import { FlowTypes } from "data-models";
const template: FlowTypes.Template[] = [
  {
    flow_type: "template",
    flow_name: "comp_button_par_2",
    status: "released",
    flow_subtype: "component_demo",
    rows: [
      {
        type: "button",
        name: "button_default",
        value: "Default",
        _translations: {
          value: {},
        },
        _nested_name: "button_default",
      },
      {
        type: "button",
        name: "button_par_2_1",
        value: "Style parameter Information",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "information",
        },
        _nested_name: "button_par_2_1",
      },
      {
        type: "button",
        name: "button_par_2_2",
        value: "Style parameter Full",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "full",
        },
        _nested_name: "button_par_2_2",
      },
      {
        type: "button",
        name: "button_par_2_3",
        value: "Style parameter Standard",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "standard",
        },
        _nested_name: "button_par_2_3",
      },
      {
        type: "button",
        name: "button_par_2_4",
        value: "Style parameter Medium",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "medium",
        },
        _nested_name: "button_par_2_4",
      },
      {
        type: "button",
        name: "button_par_2_5",
        value: "Style parameter Short",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "short",
        },
        _nested_name: "button_par_2_5",
      },
      {
        type: "button",
        name: "button_par_2_6",
        value: "Style parameter Tall",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "tall",
        },
        _nested_name: "button_par_2_6",
      },
      {
        type: "button",
        name: "button_par_2_7",
        value: "Style parameter Medium Round",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "medium round",
        },
        _nested_name: "button_par_2_7",
      },
      {
        type: "button",
        name: "button_par_2_8",
        value: "Style parameter No shadow",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "no shadow",
        },
        _nested_name: "button_par_2_8",
      },
      {
        type: "button",
        name: "button_par_2_9",
        value: "Style parameter Flexible",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "flexible",
        },
        _nested_name: "button_par_2_9",
      },
      {
        type: "button",
        name: "button_par_2_10",
        value: "Style parameter Alternative",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "alternative",
        },
        _nested_name: "button_par_2_10",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/components_demo/component_button.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "comp_number_button_5",
    status: "released",
    flow_subtype: "component_demo",
    rows: [
      {
        type: "number_selector",
        name: "default",
        _nested_name: "default",
      },
      {
        type: "number_selector",
        name: "par_5_1",
        parameter_list: {
          category_list: "",
        },
        _nested_name: "par_5_1",
      },
      {
        name: "category_list",
        value: ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "80+"],
        type: "set_variable",
        _nested_name: "category_list",
      },
      {
        type: "number_selector",
        name: "par_5_2",
        parameter_list: {
          category_list: "@local.category_list",
        },
        _nested_name: "par_5_2",
        _dynamicFields: {
          parameter_list: {
            category_list: [
              {
                fullExpression: "@local.category_list",
                matchedExpression: "@local.category_list",
                type: "local",
                fieldName: "category_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.category_list": ["parameter_list.category_list"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/components_demo/component_number_selector.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "comp_round_button_3",
    status: "released",
    flow_subtype: "component_demo",
    rows: [
      {
        type: "round_button",
        name: "button_default",
        value: "Default",
        _translations: {
          value: {},
        },
        _nested_name: "button_default",
      },
      {
        type: "round_button",
        name: "button_par_3_1",
        value: "Style  parameter information",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "information",
        },
        _nested_name: "button_par_3_1",
      },
      {
        type: "round_button",
        name: "button_par_3_2",
        value: "Style parameter navigation",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "navigation",
        },
        _nested_name: "button_par_3_2",
      },
      {
        type: "round_button",
        name: "button_par_3_3",
        value: "Style parameter yellow",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "yellow",
        },
        _nested_name: "button_par_3_3",
      },
      {
        type: "round_button",
        name: "button_par_3_4",
        value: "Style parameter orange",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "orange",
        },
        _nested_name: "button_par_3_4",
      },
      {
        type: "round_button",
        name: "button_par_3_5",
        value: "Style parameter dark orange",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "dark_orange",
        },
        _nested_name: "button_par_3_5",
      },
      {
        type: "round_button",
        name: "button_par_3_6",
        value: "Style parameter home screen",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "home_screen",
        },
        _nested_name: "button_par_3_6",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/components_demo/component_round_button .xlsx",
  },
];
export default template;
