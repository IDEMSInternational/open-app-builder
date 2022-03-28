/* eslint-disable */
import { FlowTypes } from "data-models";
const template: FlowTypes.Template[] = [
  {
    flow_type: "template",
    flow_name: "comp_text",
    status: "released",
    flow_subtype: "component_demo",
    rows: [
      {
        type: "text",
        name: "text_default",
        value: "Default",
        _translations: {
          value: {},
        },
        _nested_name: "text_default",
      },
      {
        type: "title",
        name: "title_1",
        value: "Text alignment",
        _translations: {
          value: {},
        },
        _nested_name: "title_1",
      },
      {
        type: "text",
        name: "text_align_1",
        value: "Left aligned text",
        _translations: {
          value: {},
        },
        parameter_list: {
          text_align: "left",
        },
        _nested_name: "text_align_1",
      },
      {
        type: "text",
        name: "text_align_2",
        value: "Centered text",
        _translations: {
          value: {},
        },
        parameter_list: {
          text_align: "center",
        },
        _nested_name: "text_align_2",
      },
      {
        type: "text",
        name: "text_align_3",
        value: "Right aligned text",
        _translations: {
          value: {},
        },
        parameter_list: {
          text_align: "right",
        },
        _nested_name: "text_align_3",
      },
      {
        type: "title",
        name: "title_2",
        value: "Formatting",
        _translations: {
          value: {},
        },
        _nested_name: "title_2",
      },
      {
        type: "text",
        name: "text_formatting_1",
        value: "Standard text",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "standard",
        },
        _nested_name: "text_formatting_1",
      },
      {
        type: "text",
        name: "text_formatting_2",
        value: "Contextual text",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "contextual",
        },
        _nested_name: "text_formatting_2",
      },
      {
        type: "text",
        name: "text_formatting_3",
        value: "Emphasised text",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "emphasised",
        },
        _nested_name: "text_formatting_3",
      },
      {
        type: "text",
        name: "text_formatting_4",
        value: "Alternative text",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "alternative",
        },
        _nested_name: "text_formatting_4",
      },
      {
        type: "title",
        name: "title_3",
        value: "To be removed",
        _translations: {
          value: {},
        },
        _nested_name: "title_3",
      },
      {
        type: "text",
        name: "text_size_1",
        value: "Small text",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "small",
        },
        _nested_name: "text_size_1",
      },
      {
        type: "text",
        name: "text_size_2",
        value: "Medium text",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "medium",
        },
        _nested_name: "text_size_2",
      },
      {
        type: "text",
        name: "text_size_3",
        value: "Large text",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "large",
        },
        _nested_name: "text_size_3",
      },
      {
        type: "text",
        name: "text_position_1",
        value: "Left aligned text",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "left",
        },
        _nested_name: "text_position_1",
      },
      {
        type: "text",
        name: "text_position_2",
        value: "Centered text",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "center",
        },
        _nested_name: "text_position_2",
      },
      {
        type: "text",
        name: "text_position_3",
        value: "Right aligned text",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "right",
        },
        _nested_name: "text_position_3",
      },
    ],
    _xlsxPath: "quality_assurance/components_demo/component_text.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "comp_round_button",
    status: "released",
    flow_subtype: "component_demo",
    rows: [
      {
        type: "round_button",
        name: "round_button_default",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["example_text"],
            _raw: "click | go_to: example_text",
            _cleaned: "click | go_to: example_text",
          },
        ],
        _nested_name: "round_button_default",
      },
      {
        type: "title",
        name: "title_2",
        value: "Round button with icon",
        _translations: {
          value: {},
        },
        _nested_name: "title_2",
      },
      {
        type: "round_button",
        name: "round_button_par_2_1",
        parameter_list: {
          icon_src: "",
        },
        _nested_name: "round_button_par_2_1",
      },
      {
        type: "round_button",
        name: "round_button_par_2_2",
        parameter_list: {
          icon_src: "plh_images/icons/play.svg",
        },
        _nested_name: "round_button_par_2_2",
      },
      {
        type: "title",
        name: "title_3",
        value: "Round button colour",
        _translations: {
          value: {},
        },
        _nested_name: "title_3",
      },
      {
        type: "round_button",
        name: "round_button_par_3_1",
        parameter_list: {
          style: "information",
        },
        _nested_name: "round_button_par_3_1",
      },
      {
        type: "round_button",
        name: "round_button_par_3_2",
        parameter_list: {
          style: "navigation",
        },
        _nested_name: "round_button_par_3_2",
      },
      {
        type: "round_button",
        name: "round_button_par_3_3",
        parameter_list: {
          style: "yellow",
        },
        _nested_name: "round_button_par_3_3",
      },
      {
        type: "round_button",
        name: "round_button_par_3_4",
        parameter_list: {
          style: "orange",
        },
        _nested_name: "round_button_par_3_4",
      },
      {
        type: "round_button",
        name: "round_button_par_3_5",
        parameter_list: {
          style: "dark_orange",
        },
        _nested_name: "round_button_par_3_5",
      },
      {
        type: "title",
        name: "title_4",
        value: "Round button positioning",
        _translations: {
          value: {},
        },
        _nested_name: "title_4",
      },
      {
        type: "round_button",
        name: "round_button_par_4_1",
        value: "Style parameter home screen",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "home_screen",
        },
        _nested_name: "round_button_par_4_1",
      },
      {
        type: "title",
        name: "title_5",
        value: "To be removed",
        _translations: {
          value: {},
        },
        _nested_name: "title_5",
      },
      {
        type: "round_button",
        name: "round_button_par_5_1",
        value: "Button align parameter centre",
        _translations: {
          value: {},
        },
        parameter_list: {
          button_align: "centre",
          style: "flexible",
        },
        _nested_name: "round_button_par_5_1",
      },
      {
        type: "round_button",
        name: "round_button_par_5_2",
        value: "Button align parameter left",
        _translations: {
          value: {},
        },
        parameter_list: {
          button_align: "left",
          style: "flexible",
        },
        _nested_name: "round_button_par_5_2",
      },
      {
        type: "round_button",
        name: "round_button_par_5_3",
        value: "Button align parameter right",
        _translations: {
          value: {},
        },
        parameter_list: {
          button_align: "right",
          style: "flexible",
        },
        _nested_name: "round_button_par_5_3",
      },
      {
        type: "title",
        name: "title_6",
        value: "Button text",
        _translations: {
          value: {},
        },
        _nested_name: "title_6",
      },
      {
        type: "round_button",
        name: "round_button_par_6_1",
        value: "Text parameter empty string",
        _translations: {
          value: {},
        },
        parameter_list: {
          text: "",
        },
        _nested_name: "round_button_par_6_1",
      },
      {
        type: "round_button",
        name: "round_button_par_6_2",
        value: "Text parameter string",
        _translations: {
          value: {},
        },
        parameter_list: {
          text: "any string as a button text",
        },
        _nested_name: "round_button_par_6_2",
      },
      {
        type: "title",
        name: "title_7",
        value: "To be removed",
        _translations: {
          value: {},
        },
        _nested_name: "title_7",
      },
      {
        type: "round_button",
        name: "round_button_par_7_1",
        value: "Starting seconds parameter 0",
        _translations: {
          value: {},
        },
        parameter_list: {
          "starting seconds": "",
        },
        _nested_name: "round_button_par_7_1",
      },
      {
        type: "round_button",
        name: "round_button_par_7_2",
        value: "Starting seconds parameter 5",
        _translations: {
          value: {},
        },
        parameter_list: {
          "starting seconds": "5",
        },
        _nested_name: "round_button_par_7_2",
      },
      {
        type: "title",
        name: "title_8",
        value: "To be removed",
        _translations: {
          value: {},
        },
        _nested_name: "title_8",
      },
      {
        type: "round_button",
        name: "round_button_par_8_1",
        value: 'Ping parameter "',
        _translations: {
          value: {},
        },
        parameter_list: {
          Ping: "''",
        },
        _nested_name: "round_button_par_8_1",
      },
    ],
    _xlsxPath: "quality_assurance/components_demo/component_round_button .xlsx",
  },
  {
    flow_type: "template",
    flow_name: "comp_square_button",
    status: "released",
    flow_subtype: "component_demo",
    rows: [
      {
        type: "square_button",
        name: "button_default",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["example_text"],
            _raw: "click | go_to: example_text",
            _cleaned: "click | go_to: example_text",
          },
        ],
        _nested_name: "button_default",
      },
      {
        type: "title",
        name: "title_2",
        value: "Square button with icon",
        _translations: {
          value: {},
        },
        _nested_name: "title_2",
      },
      {
        type: "square_button",
        name: "square_button_par_2_1",
        parameter_list: {
          icon_src: "",
        },
        _nested_name: "square_button_par_2_1",
      },
      {
        type: "square_button",
        name: "square_button_par_2_2",
        parameter_list: {
          icon_src: "plh_images/icons/play.svg",
        },
        _nested_name: "square_button_par_2_2",
      },
      {
        type: "square_button",
        name: "square_button_par_2_3",
        parameter_list: {
          icon_src: "body-outline",
        },
        _nested_name: "square_button_par_2_3",
      },
      {
        type: "title",
        name: "title_3",
        value: "Square button colour",
        _translations: {
          value: {},
        },
        _nested_name: "title_3",
      },
      {
        type: "square_button",
        name: "square_button_par_3_1",
        parameter_list: {
          style: "information",
        },
        _nested_name: "square_button_par_3_1",
      },
      {
        type: "square_button",
        name: "square_button_par_3_2",
        parameter_list: {
          style: "navigation",
        },
        _nested_name: "square_button_par_3_2",
      },
      {
        type: "title",
        name: "title_4",
        value: "To be removed",
        _translations: {
          value: {},
        },
        _nested_name: "title_4",
      },
      {
        type: "square_button",
        name: "square_button_par_4_1",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_text"],
            _raw: "click | pop_up: example_text",
            _cleaned: "click | pop_up: example_text",
          },
        ],
        parameter_list: {
          disabled: "false",
        },
        _nested_name: "square_button_par_4_1",
      },
      {
        type: "square_button",
        name: "square_button_par_4_2",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_text"],
            _raw: "click | pop_up: example_text",
            _cleaned: "click | pop_up: example_text",
          },
        ],
        parameter_list: {
          disabled: "true",
        },
        _nested_name: "square_button_par_4_2",
      },
    ],
    _xlsxPath: "quality_assurance/components_demo/component_square_button.xlsx",
  },
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
            _raw: "click | go_to: example_text",
            _cleaned: "click | go_to: example_text",
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
            _raw: "click | pop_up: example_text",
            _cleaned: "click | pop_up: example_text",
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
            _raw: "click | pop_up: example_text",
            _cleaned: "click | pop_up: example_text",
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
];
export default template;
