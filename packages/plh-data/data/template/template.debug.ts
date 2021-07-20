/* eslint-disable */
import { FlowTypes } from "../../model/flowTypes";
const template: FlowTypes.Template[] = [
  {
    flow_type: "template",
    flow_name: "debug_advanced_dashed_box_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "advanced_dashed_box",
        name: "dashed_box_test",
        exclude_from_translation: true,
        rows: [
          {
            type: "subtitle",
            value:
              "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
            parameter_list: {
              style: "emphasised center",
            },
            exclude_from_translation: true,
            name: "subtitle",
            _nested_name: "dashed_box_test.subtitle",
          },
          {
            type: "display_group",
            name: "display_group",
            exclude_from_translation: true,
            rows: [
              {
                type: "button",
                value: "test",
                exclude_from_translation: true,
                name: "button",
                _nested_name: "dashed_box_test.display_group.button",
              },
            ],
            _nested_name: "dashed_box_test.display_group",
          },
        ],
        _nested_name: "dashed_box_test",
      },
      {
        exclude_from_translation: true,
        type: "set_variable",
        name: "set_variable",
        _nested_name: "set_variable",
      },
      {
        exclude_from_translation: true,
        type: "set_variable",
        name: "set_variable",
        _nested_name: "set_variable",
      },
      {
        type: "display_group",
        name: "display_group",
        parameter_list: {
          style: "dashed_box",
        },
        exclude_from_translation: true,
        rows: [
          {
            type: "subtitle",
            value: "Every time you do a relax, tap the ParentPoint and celebrate your success!",
            parameter_list: {
              style: "emphasised center",
              text_align: "center",
            },
            exclude_from_translation: true,
            name: "subtitle",
            _nested_name: "display_group.subtitle",
          },
          {
            type: "parent_point_box",
            name: "points_example_1",
            value: 3,
            parameter_list: {
              lottie_src: "lottie_animations/parent_centre.json",
              text: "text two",
            },
            exclude_from_translation: true,
            _nested_name: "display_group.points_example_1",
          },
        ],
        _nested_name: "display_group",
      },
      {
        exclude_from_translation: true,
        type: "set_variable",
        name: "set_variable",
        _nested_name: "set_variable",
      },
      {
        type: "display_group",
        name: "display_group",
        parameter_list: {
          style: "dashed_box",
        },
        exclude_from_translation: true,
        rows: [
          {
            type: "subtitle",
            value: "small text here",
            parameter_list: {
              style: "emphasised center",
            },
            exclude_from_translation: true,
            name: "subtitle",
            _nested_name: "display_group.subtitle",
          },
          {
            type: "parent_point_box",
            name: "points_example_1",
            value: 3,
            parameter_list: {
              lottie_src: "lottie_animations/parent_centre.json",
              text: "text two",
            },
            exclude_from_translation: true,
            _nested_name: "display_group.points_example_1",
          },
        ],
        _nested_name: "display_group",
      },
      {
        type: "display_group",
        name: "display_group",
        exclude_from_translation: true,
        rows: [
          {
            type: "subtitle",
            value: "Every time you do a relax, tap the ParentPoint and celebrate your success!",
            parameter_list: {
              style: "emphasised center",
              text_align: "center",
            },
            exclude_from_translation: true,
            name: "subtitle",
            _nested_name: "display_group.subtitle",
          },
          {
            type: "parent_point_box",
            name: "points_example_1",
            value: 3,
            parameter_list: {
              lottie_src: "lottie_animations/parent_centre.json",
              text: "text two",
            },
            exclude_from_translation: true,
            _nested_name: "display_group.points_example_1",
          },
        ],
        _nested_name: "display_group",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_advanced_dashed_box.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_advanced_dashed_box_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "advanced_dashed_box",
        name: "dashed_box",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "dashed_box",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_advanced_dashed_box.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_first_step_nav_group",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "progress_bar_value",
        exclude_from_translation: true,
        name: "progress_bar_value",
        _nested_name: "progress_bar_value",
      },
      {
        type: "progress_bar_num_items",
        exclude_from_translation: true,
        name: "progress_bar_num_items",
        _nested_name: "progress_bar_num_items",
      },
      {
        type: "progress_bar",
        name: "@local.progress_bar_value",
        exclude_from_translation: true,
        parameter_list: {
          num_items: "@local.progress_bar_num_items",
        },
        _nested_name: "@local.progress_bar_value",
        _dynamicFields: {
          name: [
            {
              fullExpression: "@local.progress_bar_value",
              matchedExpression: "@local.progress_bar_value",
              type: "local",
              fieldName: "progress_bar_value",
            },
          ],
          parameter_list: {
            num_items: [
              {
                fullExpression: "@local.progress_bar_num_items",
                matchedExpression: "@local.progress_bar_num_items",
                type: "local",
                fieldName: "progress_bar_num_items",
              },
            ],
          },
          _nested_name: [
            {
              fullExpression: "@local.progress_bar_value",
              matchedExpression: "@local.progress_bar_value",
              type: "local",
              fieldName: "progress_bar_value",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.progress_bar_value": ["name", "_nested_name"],
          "@local.progress_bar_num_items": ["parameter_list.num_items"],
        },
      },
      {
        type: "progress_field_name",
        exclude_from_translation: true,
        name: "progress_field_name",
        _nested_name: "progress_field_name",
      },
      {
        type: "nav_group",
        name: "nav_template_list",
        value: ["debug_first_step_1", "debug_first_step_2", "debug_first_step_3"],
        action_list: [
          {
            trigger: "completed",
            action_id: "emit",
            args: ["completed"],
            _raw: "completed | emit:completed",
            _cleaned: "completed | emit:completed",
          },
          {
            trigger: "uncompleted",
            action_id: "emit",
            args: ["uncompleted"],
            _raw: "uncompleted | emit:uncompleted",
            _cleaned: "uncompleted | emit:uncompleted",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          progress_field: "@local.progress_field_name",
        },
        _nested_name: "nav_template_list",
        _dynamicFields: {
          parameter_list: {
            progress_field: [
              {
                fullExpression: "@local.progress_field_name",
                matchedExpression: "@local.progress_field_name",
                type: "local",
                fieldName: "progress_field_name",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.progress_field_name": ["parameter_list.progress_field"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_stepper_first_step.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_first_step_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Step 1",
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "This is the first step in the nav_group",
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "template",
        name: "nav_buttons",
        value: "nav_buttons",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "nav_buttons",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_stepper_first_step.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_first_step_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Step 2",
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "This is the second step in the nav_group",
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "template",
        name: "nav_buttons",
        value: "nav_buttons",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "nav_buttons",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_stepper_first_step.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_first_step_3",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Step 3",
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "This is the third step in the nav_group",
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "template",
        name: "nav_buttons",
        value: "nav_buttons",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "nav_buttons",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_stepper_first_step.xlsx",
  },
];
export default template;
