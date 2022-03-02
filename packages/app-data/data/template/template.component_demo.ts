/* eslint-disable */
import { FlowTypes } from "data-models";
const template: FlowTypes.Template[] = [
  {
    flow_type: "template",
    flow_name: "comp_button",
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
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["example_text"],
            _raw: "click | go_to : example_text",
            _cleaned: "click | go_to : example_text",
          },
        ],
        _nested_name: "button_default",
      },
      {
        type: "title",
        name: "title_1",
        value: "Disabled parameter",
        _translations: {
          value: {},
        },
        _nested_name: "title_1",
      },
      {
        type: "button",
        name: "button_par_1_1",
        value: "Disabled parameter FALSE",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_text"],
            _raw: "click | pop_up : example_text",
            _cleaned: "click | pop_up : example_text",
          },
        ],
        parameter_list: {
          disabled: "false",
        },
        _nested_name: "button_par_1_1",
      },
      {
        type: "button",
        name: "button_par_1_2",
        value: "Disabled parameter TRUE",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_text"],
            _raw: "click | pop_up : example_text",
            _cleaned: "click | pop_up : example_text",
          },
        ],
        parameter_list: {
          disabled: "true",
        },
        _nested_name: "button_par_1_2",
      },
      {
        type: "title",
        name: "title_2",
        value: "Button colour",
        _translations: {
          value: {},
        },
        _nested_name: "title_2",
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
        value: "Style parameter Navigation",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "navigation",
        },
        _nested_name: "button_par_2_2",
      },
      {
        type: "title",
        name: "title_3",
        value: "Button width",
        _translations: {
          value: {},
        },
        _nested_name: "title_3",
      },
      {
        type: "button",
        name: "button_par_2_3",
        value: "Style parameter Full",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "full",
        },
        _nested_name: "button_par_2_3",
      },
      {
        type: "button",
        name: "button_par_2_4",
        value: "Style parameter Flexible",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "flexible",
        },
        _nested_name: "button_par_2_4",
      },
      {
        type: "title",
        name: "title_4",
        value: "Button height",
        _translations: {
          value: {},
        },
        _nested_name: "title_4",
      },
      {
        type: "button",
        name: "button_par_2_5",
        value: "Style parameter Medium",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "medium",
        },
        _nested_name: "button_par_2_5",
      },
      {
        type: "button",
        name: "button_par_2_6",
        value: "Style parameter Short",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "short",
        },
        _nested_name: "button_par_2_6",
      },
      {
        type: "button",
        name: "button_par_2_7",
        value: "Style parameter Tall",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "tall",
        },
        _nested_name: "button_par_2_7",
      },
      {
        type: "title",
        name: "title_5",
        value: "Button text colour",
        _translations: {
          value: {},
        },
        _nested_name: "title_5",
      },
      {
        type: "button",
        name: "button_par_2_8",
        value: "Style parameter Standard",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "standard",
        },
        _nested_name: "button_par_2_8",
      },
      {
        type: "button",
        name: "button_par_2_9",
        value: "Style parameter Alternative",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "alternative",
        },
        _nested_name: "button_par_2_9",
      },
      {
        type: "title",
        name: "title_6",
        value: "To be removed",
        _translations: {
          value: {},
        },
        _nested_name: "title_6",
      },
      {
        type: "button",
        name: "button_par_2_10",
        value: "Style parameter Medium Round",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "medium round",
        },
        _nested_name: "button_par_2_10",
      },
      {
        type: "button",
        name: "button_par_2_11",
        value: "Style parameter No shadow",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "no shadow",
        },
        _nested_name: "button_par_2_11",
      },
      {
        type: "title",
        name: "title_7",
        value: "Text alignment",
        _translations: {
          value: {},
        },
        _nested_name: "title_7",
      },
      {
        type: "button",
        name: "button_par_3_1",
        value: "Text align parameter left",
        _translations: {
          value: {},
        },
        parameter_list: {
          text_align: "left",
        },
        _nested_name: "button_par_3_1",
      },
      {
        type: "button",
        name: "button_par_3_2",
        value: "Text align parameter centre",
        _translations: {
          value: {},
        },
        parameter_list: {
          text_align: "centre",
        },
        _nested_name: "button_par_3_2",
      },
      {
        type: "button",
        name: "button_par_3_3",
        value: "Text align parameter right",
        _translations: {
          value: {},
        },
        parameter_list: {
          text_align: "right",
        },
        _nested_name: "button_par_3_3",
      },
      {
        type: "title",
        name: "title_8",
        value: "Button alignment",
        _translations: {
          value: {},
        },
        _nested_name: "title_8",
      },
      {
        type: "button",
        name: "button_par_4_1",
        value: "Button align parameter centre",
        _translations: {
          value: {},
        },
        parameter_list: {
          button_align: "centre",
          style: "flexible",
        },
        _nested_name: "button_par_4_1",
      },
      {
        type: "button",
        name: "button_par_4_2",
        value: "Button align parameter left",
        _translations: {
          value: {},
        },
        parameter_list: {
          button_align: "left",
          style: "flexible",
        },
        _nested_name: "button_par_4_2",
      },
      {
        type: "button",
        name: "button_par_4_3",
        value: "Button align parameter right",
        _translations: {
          value: {},
        },
        parameter_list: {
          button_align: "right",
          style: "flexible",
        },
        _nested_name: "button_par_4_3",
      },
    ],
    _xlsxPath: "quality_assurance/components_demo/component_button.xlsx",
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
        _nested_name: "button_default",
      },
      {
        type: "round_button",
        name: "button_par_3_1",
        parameter_list: {
          style: "information",
        },
        _nested_name: "button_par_3_1",
      },
      {
        type: "round_button",
        name: "button_par_3_2",
        parameter_list: {
          style: "navigation",
        },
        _nested_name: "button_par_3_2",
      },
      {
        type: "round_button",
        name: "button_par_3_3",
        parameter_list: {
          style: "yellow",
        },
        _nested_name: "button_par_3_3",
      },
      {
        type: "round_button",
        name: "button_par_3_4",
        parameter_list: {
          style: "orange",
        },
        _nested_name: "button_par_3_4",
      },
      {
        type: "round_button",
        name: "button_par_3_5",
        parameter_list: {
          style: "dark_orange",
        },
        _nested_name: "button_par_3_5",
      },
      {
        type: "round_button",
        name: "button_par_3_6",
        parameter_list: {
          style: "home_screen",
        },
        _nested_name: "button_par_3_6",
      },
      {
        type: "round_button",
        name: "button_par_3_7",
        parameter_list: {
          style: "orange home_screen",
        },
        _nested_name: "button_par_3_7",
      },
      {
        type: "round_button",
        name: "button_par_3_8",
        parameter_list: {
          style: "dark_orange",
        },
        _nested_name: "button_par_3_8",
      },
      {
        type: "round_button",
        name: "button_par_3_9",
        parameter_list: {
          style: "blue",
        },
        _nested_name: "button_par_3_9",
      },
      {
        type: "round_button",
        name: "button_par_3_10",
        parameter_list: {
          style: "dark_blue",
        },
        _nested_name: "button_par_3_10",
      },
    ],
    _xlsxPath: "quality_assurance/components_demo/component_round_button .xlsx",
  },
];
export default template;
