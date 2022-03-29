/* eslint-disable */
import { FlowTypes } from "data-models";
const template: FlowTypes.Template[] = [
  {
    flow_type: "template",
    flow_name: "home_screen",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Welcome!",
        _translations: {
          value: {},
        },
        _nested_name: "title",
      },
      {
        type: "image",
        name: "main_image",
        value: "EFM00Logo.svg",
        _translations: {
          value: {},
        },
        _nested_name: "main_image",
      },
      {
        type: "button",
        name: "button_activities",
        value: "Activities",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["efm_activities"],
            _raw: "click | go_to: efm_activities",
            _cleaned: "click | go_to: efm_activities",
          },
        ],
        _nested_name: "button_activities",
      },
      {
        type: "button",
        name: "button_storybooks",
        value: "Storybooks",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["efm_storybooks"],
            _raw: "click | go_to: efm_storybooks",
            _cleaned: "click | go_to: efm_storybooks",
          },
        ],
        _nested_name: "button_storybooks",
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "app_menu",
    status: "released",
    rows: [
      {
        type: "button",
        name: "button_reset",
        value: "Reset app",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "reset_app",
            args: [],
            _raw: "click | reset_app",
            _cleaned: "click | reset_app",
          },
        ],
        _nested_name: "button_reset",
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_activities",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Activities",
        _translations: {
          value: {},
        },
        _nested_name: "title",
      },
      {
        type: "button",
        name: "button_chapter1",
        value: "Chapter 1 — I Can Hear You!",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["efm_chapter1_acts"],
            _raw: "click | go_to: efm_chapter1_acts",
            _cleaned: "click | go_to: efm_chapter1_acts",
          },
        ],
        _nested_name: "button_chapter1",
      },
      {
        type: "button",
        name: "button_chapter2",
        value: "Chapter 2 — I Can Count to 5!",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["efm_chapter2_acts"],
            _raw: "click | go_to: efm_chapter2_acts",
            _cleaned: "click | go_to: efm_chapter2_acts",
          },
        ],
        _nested_name: "button_chapter2",
      },
      {
        type: "button",
        name: "button_chapter3",
        value: "Chapter 3 — I Can Count to 10!",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["efm_chapter3_acts"],
            _raw: "click | go_to: efm_chapter3_acts",
            _cleaned: "click | go_to: efm_chapter3_acts",
          },
        ],
        _nested_name: "button_chapter3",
      },
      {
        type: "button",
        name: "button_chapter4",
        value: "Chapter 4 — I Can Count To 20!",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["efm_chapter4_acts"],
            _raw: "click | go_to: efm_chapter4_acts",
            _cleaned: "click | go_to: efm_chapter4_acts",
          },
        ],
        _nested_name: "button_chapter4",
      },
      {
        type: "button",
        name: "button_chapter5",
        value: "Chapter 5 — I Can Count To 100!",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["efm_chapter5_acts"],
            _raw: "click | go_to: efm_chapter5_acts",
            _cleaned: "click | go_to: efm_chapter5_acts",
          },
        ],
        _nested_name: "button_chapter5",
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_activity_template",
    status: "released",
    rows: [
      {
        name: "efm_activity",
        value: "@@fields.current_activity",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "efm_activity",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@@fields.current_activity",
              matchedExpression: "@fields.current_activity",
              type: "fields",
              fieldName: "current_activity",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.current_activity": ["value"],
        },
      },
      {
        name: "efm_activity_name",
        value: "@local.efm_activity.title",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "efm_activity_name",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.efm_activity.title",
              matchedExpression: "@local.efm_activity.title",
              type: "local",
              fieldName: "efm_activity",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.efm_activity.title": ["value"],
        },
      },
      {
        name: "efm_activity_type_name",
        value: "@local.efm_activity.type_name",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "efm_activity_type_name",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.efm_activity.type_name",
              matchedExpression: "@local.efm_activity.type_name",
              type: "local",
              fieldName: "efm_activity",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.efm_activity.type_name": ["value"],
        },
      },
      {
        name: "template_text",
        value: "_template",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "template_text",
      },
      {
        name: "efm_activity_body_template",
        value: "@local.efm_activity.id@local.template_text",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "efm_activity_body_template",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.efm_activity.id@local.template_text",
              matchedExpression: "@local.efm_activity.id",
              type: "local",
              fieldName: "efm_activity",
            },
            {
              fullExpression: "@local.efm_activity.id@local.template_text",
              matchedExpression: "@local.template_text",
              type: "local",
              fieldName: "template_text",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.efm_activity.id": ["value"],
          "@local.template_text": ["value"],
        },
      },
      {
        name: "next_activity",
        value: "@local.efm_activity.next_act",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "next_activity",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.efm_activity.next_act",
              matchedExpression: "@local.efm_activity.next_act",
              type: "local",
              fieldName: "efm_activity",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.efm_activity.next_act": ["value"],
        },
      },
      {
        name: "prev_activity",
        value: "@local.efm_activity.prev_act",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "prev_activity",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.efm_activity.prev_act",
              matchedExpression: "@local.efm_activity.prev_act",
              type: "local",
              fieldName: "efm_activity",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.efm_activity.prev_act": ["value"],
        },
      },
      {
        type: "text",
        name: "title",
        value: "– @local.efm_activity_name –",
        _translations: {
          value: {},
        },
        parameter_list: {
          text_align: "center",
          style: "large emphasised",
        },
        _nested_name: "title",
        _dynamicFields: {
          value: [
            {
              fullExpression: "– @local.efm_activity_name –",
              matchedExpression: "@local.efm_activity_name",
              type: "local",
              fieldName: "efm_activity_name",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.efm_activity_name": ["value"],
        },
      },
      {
        type: "text",
        name: "subtitle",
        value: "@local.efm_activity_type_name",
        _translations: {
          value: {},
        },
        parameter_list: {
          text_align: "center",
          style: "small",
        },
        style_list: ["margin-top: -25px"],
        _nested_name: "subtitle",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.efm_activity_type_name",
              matchedExpression: "@local.efm_activity_type_name",
              type: "local",
              fieldName: "efm_activity_type_name",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.efm_activity_type_name": ["value"],
        },
      },
      {
        type: "display_group",
        name: "buttons",
        rows: [
          {
            type: "button",
            name: "prev_button",
            value: "Previous",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "@local.prev_activity"],
                _raw: "click | set_field:current_activity:@local.prev_activity",
                _cleaned: "click | set_field:current_activity:@local.prev_activity",
              },
              {
                trigger: "click",
                action_id: "emit",
                args: ["force_reload"],
                _raw: "click | emit:force_reload",
                _cleaned: "click | emit:force_reload",
              },
            ],
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            style_list: ["flex:100"],
            _nested_name: "buttons.prev_button",
            _dynamicFields: {
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "@local.prev_activity",
                        matchedExpression: "@local.prev_activity",
                        type: "local",
                        fieldName: "prev_activity",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity:@local.prev_activity",
                      matchedExpression: "@local.prev_activity",
                      type: "local",
                      fieldName: "prev_activity",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity:@local.prev_activity",
                      matchedExpression: "@local.prev_activity",
                      type: "local",
                      fieldName: "prev_activity",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@local.prev_activity": [
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
            },
          },
          {
            type: "text",
            name: "spacer",
            parameter_list: {
              text_align: "center",
              style: "small",
            },
            style_list: ["flex: 250"],
            _nested_name: "buttons.spacer",
          },
          {
            type: "button",
            name: "next_button",
            value: "Next",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "@local.next_activity"],
                _raw: "click | set_field:current_activity:@local.next_activity",
                _cleaned: "click | set_field:current_activity:@local.next_activity",
              },
              {
                trigger: "click",
                action_id: "emit",
                args: ["force_reload"],
                _raw: "click | emit:force_reload",
                _cleaned: "click | emit:force_reload",
              },
            ],
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            style_list: ["flex: 100"],
            _nested_name: "buttons.next_button",
            _dynamicFields: {
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "@local.next_activity",
                        matchedExpression: "@local.next_activity",
                        type: "local",
                        fieldName: "next_activity",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity:@local.next_activity",
                      matchedExpression: "@local.next_activity",
                      type: "local",
                      fieldName: "next_activity",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity:@local.next_activity",
                      matchedExpression: "@local.next_activity",
                      type: "local",
                      fieldName: "next_activity",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@local.next_activity": [
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
            },
          },
        ],
        _nested_name: "buttons",
      },
      {
        type: "template",
        name: "activity_body",
        value: "@local.efm_activity_body_template",
        rows: [],
        _nested_name: "activity_body",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.efm_activity_body_template",
              matchedExpression: "@local.efm_activity_body_template",
              type: "local",
              fieldName: "efm_activity_body_template",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.efm_activity_body_template": ["value"],
        },
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_activity_body_template",
    status: "released",
    rows: [
      {
        name: "activity_text_style",
        value: "@global.efm_act_text_style;",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style;",
              matchedExpression: "@global.efm_act_text_style",
              type: "global",
              fieldName: "efm_act_text_style",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.efm_act_text_style": ["value"],
        },
      },
      {
        name: "activity_text_parskip",
        value: "@global.efm_parskip_fix;",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_parskip",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_parskip_fix;",
              matchedExpression: "@global.efm_parskip_fix",
              type: "global",
              fieldName: "efm_parskip_fix",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["value"],
        },
      },
      {
        name: "image_top_1",
        type: "set_variable",
        _nested_name: "image_top_1",
      },
      {
        name: "image_top_1_max_width",
        type: "set_variable",
        _nested_name: "image_top_1_max_width",
      },
      {
        name: "text_top_1",
        type: "set_variable",
        _nested_name: "text_top_1",
      },
      {
        name: "image_middle_1",
        type: "set_variable",
        _nested_name: "image_middle_1",
      },
      {
        name: "image_middle_1_max_width",
        type: "set_variable",
        _nested_name: "image_middle_1_max_width",
      },
      {
        name: "ttext_top_2",
        type: "set_variable",
        _nested_name: "ttext_top_2",
      },
      {
        name: "image_upside_1_left",
        type: "set_variable",
        _nested_name: "image_upside_1_left",
      },
      {
        name: "image_upside_1_left_flex",
        value: 0,
        type: "set_variable",
        _nested_name: "image_upside_1_left_flex",
      },
      {
        name: "image_upside_1_left_max_width",
        type: "set_variable",
        _nested_name: "image_upside_1_left_max_width",
      },
      {
        name: "text_upside_1",
        type: "set_variable",
        _nested_name: "text_upside_1",
      },
      {
        name: "image_upside_1_right",
        type: "set_variable",
        _nested_name: "image_upside_1_right",
      },
      {
        name: "image_upside_1_right_flex",
        value: 0,
        type: "set_variable",
        _nested_name: "image_upside_1_right_flex",
      },
      {
        name: "image_upside_1_right_max_width",
        type: "set_variable",
        _nested_name: "image_upside_1_right_max_width",
      },
      {
        name: "image_side_1_left",
        type: "set_variable",
        _nested_name: "image_side_1_left",
      },
      {
        name: "image_side_1_left_flex",
        value: 0,
        type: "set_variable",
        _nested_name: "image_side_1_left_flex",
      },
      {
        name: "image_side_1_left_max_width",
        type: "set_variable",
        _nested_name: "image_side_1_left_max_width",
      },
      {
        name: "text_side_1",
        type: "set_variable",
        _nested_name: "text_side_1",
      },
      {
        name: "image_side_1_right",
        type: "set_variable",
        _nested_name: "image_side_1_right",
      },
      {
        name: "image_side_1_right_flex",
        value: 0,
        type: "set_variable",
        _nested_name: "image_side_1_right_flex",
      },
      {
        name: "image_side_1_right_max_width",
        type: "set_variable",
        _nested_name: "image_side_1_right_max_width",
      },
      {
        name: "image_downside_1_left",
        type: "set_variable",
        _nested_name: "image_downside_1_left",
      },
      {
        name: "image_downside_1_left_flex",
        value: 0,
        type: "set_variable",
        _nested_name: "image_downside_1_left_flex",
      },
      {
        name: "image_downside_1_left_max_width",
        type: "set_variable",
        _nested_name: "image_downside_1_left_max_width",
      },
      {
        name: "text_downside_1",
        type: "set_variable",
        _nested_name: "text_downside_1",
      },
      {
        name: "image_downside_1_right",
        type: "set_variable",
        _nested_name: "image_downside_1_right",
      },
      {
        name: "image_downside_1_right_flex",
        value: 0,
        type: "set_variable",
        _nested_name: "image_downside_1_right_flex",
      },
      {
        name: "image_side_1_right_max_widthdown",
        type: "set_variable",
        _nested_name: "image_side_1_right_max_widthdown",
      },
      {
        name: "text_bottom_1",
        type: "set_variable",
        _nested_name: "text_bottom_1",
      },
      {
        name: "image_bottom_1",
        type: "set_variable",
        _nested_name: "image_bottom_1",
      },
      {
        name: "image_bottom_1_max_width",
        type: "set_variable",
        _nested_name: "image_bottom_1_max_width",
      },
      {
        name: "text_bottom_2",
        type: "set_variable",
        _nested_name: "text_bottom_2",
      },
      {
        type: "display_group",
        name: "top_group",
        parameter_list: {
          style: "column",
        },
        style_list: ["@local.activity_text_parskip"],
        rows: [
          {
            type: "image",
            name: "image1",
            value: "@local.image_top_1",
            _translations: {
              value: {},
            },
            condition: "@local.image_top_1_max_width",
            style_list: ["max-width: @local.image_top_1_max_width"],
            _nested_name: "top_group.image1",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.image_top_1",
                  matchedExpression: "@local.image_top_1",
                  type: "local",
                  fieldName: "image_top_1",
                },
              ],
              condition: [
                {
                  fullExpression: "@local.image_top_1_max_width",
                  matchedExpression: "@local.image_top_1_max_width",
                  type: "local",
                  fieldName: "image_top_1_max_width",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "max-width: @local.image_top_1_max_width",
                    matchedExpression: "@local.image_top_1_max_width",
                    type: "local",
                    fieldName: "image_top_1_max_width",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.image_top_1": ["value"],
              "@local.image_top_1_max_width": ["condition", "style_list.0"],
            },
          },
          {
            type: "text",
            name: "text1",
            value: "@local.text_top_1",
            _translations: {
              value: {},
            },
            condition: "@local.text_top_1",
            style_list: ["@local.activity_text_style", "@local.activity_text_parskip"],
            _nested_name: "top_group.text1",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.text_top_1",
                  matchedExpression: "@local.text_top_1",
                  type: "local",
                  fieldName: "text_top_1",
                },
              ],
              condition: [
                {
                  fullExpression: "@local.text_top_1",
                  matchedExpression: "@local.text_top_1",
                  type: "local",
                  fieldName: "text_top_1",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "@local.activity_text_style",
                    matchedExpression: "@local.activity_text_style",
                    type: "local",
                    fieldName: "activity_text_style",
                  },
                ],
                "1": [
                  {
                    fullExpression: "@local.activity_text_parskip",
                    matchedExpression: "@local.activity_text_parskip",
                    type: "local",
                    fieldName: "activity_text_parskip",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.text_top_1": ["value", "condition"],
              "@local.activity_text_style": ["style_list.0"],
              "@local.activity_text_parskip": ["style_list.1"],
            },
          },
          {
            type: "image",
            name: "image2",
            value: "@local.image_middle_1",
            _translations: {
              value: {},
            },
            condition: "@local.image_middle_1_max_width",
            style_list: ["max-width: @local.image_middle_1_max_width"],
            _nested_name: "top_group.image2",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.image_middle_1",
                  matchedExpression: "@local.image_middle_1",
                  type: "local",
                  fieldName: "image_middle_1",
                },
              ],
              condition: [
                {
                  fullExpression: "@local.image_middle_1_max_width",
                  matchedExpression: "@local.image_middle_1_max_width",
                  type: "local",
                  fieldName: "image_middle_1_max_width",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "max-width: @local.image_middle_1_max_width",
                    matchedExpression: "@local.image_middle_1_max_width",
                    type: "local",
                    fieldName: "image_middle_1_max_width",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.image_middle_1": ["value"],
              "@local.image_middle_1_max_width": ["condition", "style_list.0"],
            },
          },
          {
            type: "text",
            name: "text1a",
            value: "@local.text_top_2",
            _translations: {
              value: {},
            },
            condition: "@local.text_top_2",
            style_list: ["@local.activity_text_style", "@local.activity_text_parskip"],
            _nested_name: "top_group.text1a",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.text_top_2",
                  matchedExpression: "@local.text_top_2",
                  type: "local",
                  fieldName: "text_top_2",
                },
              ],
              condition: [
                {
                  fullExpression: "@local.text_top_2",
                  matchedExpression: "@local.text_top_2",
                  type: "local",
                  fieldName: "text_top_2",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "@local.activity_text_style",
                    matchedExpression: "@local.activity_text_style",
                    type: "local",
                    fieldName: "activity_text_style",
                  },
                ],
                "1": [
                  {
                    fullExpression: "@local.activity_text_parskip",
                    matchedExpression: "@local.activity_text_parskip",
                    type: "local",
                    fieldName: "activity_text_parskip",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.text_top_2": ["value", "condition"],
              "@local.activity_text_style": ["style_list.0"],
              "@local.activity_text_parskip": ["style_list.1"],
            },
          },
        ],
        _nested_name: "top_group",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@local.activity_text_parskip",
                matchedExpression: "@local.activity_text_parskip",
                type: "local",
                fieldName: "activity_text_parskip",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.activity_text_parskip": ["style_list.0"],
        },
      },
      {
        type: "display_group",
        name: "above_middle_group",
        condition: "@local.text_upside_1",
        style_list: ["@local.activity_text_parskip"],
        rows: [
          {
            type: "image",
            name: "image3a",
            value: "@local.image_upside_1_left",
            _translations: {
              value: {},
            },
            condition: "@local.image_upside_1_left",
            style_list: [
              "flex: @local.image_upside_1_left_flex",
              "max-width: @local.image_upside_1_left_max_width",
            ],
            _nested_name: "above_middle_group.image3a",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.image_upside_1_left",
                  matchedExpression: "@local.image_upside_1_left",
                  type: "local",
                  fieldName: "image_upside_1_left",
                },
              ],
              condition: [
                {
                  fullExpression: "@local.image_upside_1_left",
                  matchedExpression: "@local.image_upside_1_left",
                  type: "local",
                  fieldName: "image_upside_1_left",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "flex: @local.image_upside_1_left_flex",
                    matchedExpression: "@local.image_upside_1_left_flex",
                    type: "local",
                    fieldName: "image_upside_1_left_flex",
                  },
                ],
                "1": [
                  {
                    fullExpression: "max-width: @local.image_upside_1_left_max_width",
                    matchedExpression: "@local.image_upside_1_left_max_width",
                    type: "local",
                    fieldName: "image_upside_1_left_max_width",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.image_upside_1_left": ["value", "condition"],
              "@local.image_upside_1_left_flex": ["style_list.0"],
              "@local.image_upside_1_left_max_width": ["style_list.1"],
            },
          },
          {
            type: "text",
            name: "text2a",
            value: "@local.text_upside_1",
            _translations: {
              value: {},
            },
            style_list: ["flex: 100", "@local.activity_text_style"],
            _nested_name: "above_middle_group.text2a",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.text_upside_1",
                  matchedExpression: "@local.text_upside_1",
                  type: "local",
                  fieldName: "text_upside_1",
                },
              ],
              style_list: {
                "1": [
                  {
                    fullExpression: "@local.activity_text_style",
                    matchedExpression: "@local.activity_text_style",
                    type: "local",
                    fieldName: "activity_text_style",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.text_upside_1": ["value"],
              "@local.activity_text_style": ["style_list.1"],
            },
          },
          {
            type: "image",
            name: "image4a",
            value: "@local.image_upside_1_right",
            _translations: {
              value: {},
            },
            condition: "@local.image_upside_1_right",
            style_list: [
              "flex: @local.image_upside_1_right_flex",
              "max-width: @local.image_upside_1_right_max_width",
            ],
            _nested_name: "above_middle_group.image4a",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.image_upside_1_right",
                  matchedExpression: "@local.image_upside_1_right",
                  type: "local",
                  fieldName: "image_upside_1_right",
                },
              ],
              condition: [
                {
                  fullExpression: "@local.image_upside_1_right",
                  matchedExpression: "@local.image_upside_1_right",
                  type: "local",
                  fieldName: "image_upside_1_right",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "flex: @local.image_upside_1_right_flex",
                    matchedExpression: "@local.image_upside_1_right_flex",
                    type: "local",
                    fieldName: "image_upside_1_right_flex",
                  },
                ],
                "1": [
                  {
                    fullExpression: "max-width: @local.image_upside_1_right_max_width",
                    matchedExpression: "@local.image_upside_1_right_max_width",
                    type: "local",
                    fieldName: "image_upside_1_right_max_width",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.image_upside_1_right": ["value", "condition"],
              "@local.image_upside_1_right_flex": ["style_list.0"],
              "@local.image_upside_1_right_max_width": ["style_list.1"],
            },
          },
        ],
        _nested_name: "above_middle_group",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "@local.text_upside_1",
              matchedExpression: "@local.text_upside_1",
              type: "local",
              fieldName: "text_upside_1",
            },
          ],
          style_list: {
            "0": [
              {
                fullExpression: "@local.activity_text_parskip",
                matchedExpression: "@local.activity_text_parskip",
                type: "local",
                fieldName: "activity_text_parskip",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.text_upside_1": ["condition"],
          "@local.activity_text_parskip": ["style_list.0"],
        },
      },
      {
        type: "display_group",
        name: "middle_group",
        condition: "@local.text_side_1",
        style_list: ["@local.activity_text_parskip"],
        rows: [
          {
            type: "image",
            name: "image3",
            value: "@local.image_side_1_left",
            _translations: {
              value: {},
            },
            condition: "@local.image_side_1_left",
            style_list: [
              "flex: @local.image_side_1_left_flex",
              "max-width: @local.image_side_1_left_max_width",
            ],
            _nested_name: "middle_group.image3",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.image_side_1_left",
                  matchedExpression: "@local.image_side_1_left",
                  type: "local",
                  fieldName: "image_side_1_left",
                },
              ],
              condition: [
                {
                  fullExpression: "@local.image_side_1_left",
                  matchedExpression: "@local.image_side_1_left",
                  type: "local",
                  fieldName: "image_side_1_left",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "flex: @local.image_side_1_left_flex",
                    matchedExpression: "@local.image_side_1_left_flex",
                    type: "local",
                    fieldName: "image_side_1_left_flex",
                  },
                ],
                "1": [
                  {
                    fullExpression: "max-width: @local.image_side_1_left_max_width",
                    matchedExpression: "@local.image_side_1_left_max_width",
                    type: "local",
                    fieldName: "image_side_1_left_max_width",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.image_side_1_left": ["value", "condition"],
              "@local.image_side_1_left_flex": ["style_list.0"],
              "@local.image_side_1_left_max_width": ["style_list.1"],
            },
          },
          {
            type: "text",
            name: "text2",
            value: "@local.text_side_1",
            _translations: {
              value: {},
            },
            style_list: ["flex: 100", "@local.activity_text_style"],
            _nested_name: "middle_group.text2",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.text_side_1",
                  matchedExpression: "@local.text_side_1",
                  type: "local",
                  fieldName: "text_side_1",
                },
              ],
              style_list: {
                "1": [
                  {
                    fullExpression: "@local.activity_text_style",
                    matchedExpression: "@local.activity_text_style",
                    type: "local",
                    fieldName: "activity_text_style",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.text_side_1": ["value"],
              "@local.activity_text_style": ["style_list.1"],
            },
          },
          {
            type: "image",
            name: "image4",
            value: "@local.image_side_1_right",
            _translations: {
              value: {},
            },
            condition: "@local.image_side_1_right",
            style_list: [
              "flex: @local.image_side_1_right_flex",
              "max-width: @local.image_side_1_right_max_width",
            ],
            _nested_name: "middle_group.image4",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.image_side_1_right",
                  matchedExpression: "@local.image_side_1_right",
                  type: "local",
                  fieldName: "image_side_1_right",
                },
              ],
              condition: [
                {
                  fullExpression: "@local.image_side_1_right",
                  matchedExpression: "@local.image_side_1_right",
                  type: "local",
                  fieldName: "image_side_1_right",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "flex: @local.image_side_1_right_flex",
                    matchedExpression: "@local.image_side_1_right_flex",
                    type: "local",
                    fieldName: "image_side_1_right_flex",
                  },
                ],
                "1": [
                  {
                    fullExpression: "max-width: @local.image_side_1_right_max_width",
                    matchedExpression: "@local.image_side_1_right_max_width",
                    type: "local",
                    fieldName: "image_side_1_right_max_width",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.image_side_1_right": ["value", "condition"],
              "@local.image_side_1_right_flex": ["style_list.0"],
              "@local.image_side_1_right_max_width": ["style_list.1"],
            },
          },
        ],
        _nested_name: "middle_group",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "@local.text_side_1",
              matchedExpression: "@local.text_side_1",
              type: "local",
              fieldName: "text_side_1",
            },
          ],
          style_list: {
            "0": [
              {
                fullExpression: "@local.activity_text_parskip",
                matchedExpression: "@local.activity_text_parskip",
                type: "local",
                fieldName: "activity_text_parskip",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.text_side_1": ["condition"],
          "@local.activity_text_parskip": ["style_list.0"],
        },
      },
      {
        type: "display_group",
        name: "below_middle_group",
        condition: "@local.text_downside_1",
        style_list: ["@local.activity_text_parskip"],
        rows: [
          {
            type: "image",
            name: "image3b",
            value: "@local.image_downside_1_left",
            _translations: {
              value: {},
            },
            condition: "@local.image_downside_1_left",
            style_list: [
              "flex: @local.image_downside_1_left_flex",
              "max-width: @local.image_downside_1_left_max_width",
            ],
            _nested_name: "below_middle_group.image3b",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.image_downside_1_left",
                  matchedExpression: "@local.image_downside_1_left",
                  type: "local",
                  fieldName: "image_downside_1_left",
                },
              ],
              condition: [
                {
                  fullExpression: "@local.image_downside_1_left",
                  matchedExpression: "@local.image_downside_1_left",
                  type: "local",
                  fieldName: "image_downside_1_left",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "flex: @local.image_downside_1_left_flex",
                    matchedExpression: "@local.image_downside_1_left_flex",
                    type: "local",
                    fieldName: "image_downside_1_left_flex",
                  },
                ],
                "1": [
                  {
                    fullExpression: "max-width: @local.image_downside_1_left_max_width",
                    matchedExpression: "@local.image_downside_1_left_max_width",
                    type: "local",
                    fieldName: "image_downside_1_left_max_width",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.image_downside_1_left": ["value", "condition"],
              "@local.image_downside_1_left_flex": ["style_list.0"],
              "@local.image_downside_1_left_max_width": ["style_list.1"],
            },
          },
          {
            type: "text",
            name: "text2b",
            value: "@local.text_downside_1",
            _translations: {
              value: {},
            },
            style_list: ["flex: 100", "@local.activity_text_style"],
            _nested_name: "below_middle_group.text2b",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.text_downside_1",
                  matchedExpression: "@local.text_downside_1",
                  type: "local",
                  fieldName: "text_downside_1",
                },
              ],
              style_list: {
                "1": [
                  {
                    fullExpression: "@local.activity_text_style",
                    matchedExpression: "@local.activity_text_style",
                    type: "local",
                    fieldName: "activity_text_style",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.text_downside_1": ["value"],
              "@local.activity_text_style": ["style_list.1"],
            },
          },
          {
            type: "image",
            name: "image4b",
            value: "@local.image_downside_1_right",
            _translations: {
              value: {},
            },
            condition: "@local.image_downside_1_right",
            style_list: [
              "flex: @local.image_downside_1_right_flex",
              "max-width: @local.image_downside_1_right_max_width",
            ],
            _nested_name: "below_middle_group.image4b",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.image_downside_1_right",
                  matchedExpression: "@local.image_downside_1_right",
                  type: "local",
                  fieldName: "image_downside_1_right",
                },
              ],
              condition: [
                {
                  fullExpression: "@local.image_downside_1_right",
                  matchedExpression: "@local.image_downside_1_right",
                  type: "local",
                  fieldName: "image_downside_1_right",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "flex: @local.image_downside_1_right_flex",
                    matchedExpression: "@local.image_downside_1_right_flex",
                    type: "local",
                    fieldName: "image_downside_1_right_flex",
                  },
                ],
                "1": [
                  {
                    fullExpression: "max-width: @local.image_downside_1_right_max_width",
                    matchedExpression: "@local.image_downside_1_right_max_width",
                    type: "local",
                    fieldName: "image_downside_1_right_max_width",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.image_downside_1_right": ["value", "condition"],
              "@local.image_downside_1_right_flex": ["style_list.0"],
              "@local.image_downside_1_right_max_width": ["style_list.1"],
            },
          },
        ],
        _nested_name: "below_middle_group",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "@local.text_downside_1",
              matchedExpression: "@local.text_downside_1",
              type: "local",
              fieldName: "text_downside_1",
            },
          ],
          style_list: {
            "0": [
              {
                fullExpression: "@local.activity_text_parskip",
                matchedExpression: "@local.activity_text_parskip",
                type: "local",
                fieldName: "activity_text_parskip",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.text_downside_1": ["condition"],
          "@local.activity_text_parskip": ["style_list.0"],
        },
      },
      {
        type: "text",
        name: "text3",
        value: "@local.text_bottom_1",
        _translations: {
          value: {},
        },
        condition: "@local.text_bottom_1",
        style_list: ["@local.activity_text_style", "@local.activity_text_parskip"],
        _nested_name: "text3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.text_bottom_1",
              matchedExpression: "@local.text_bottom_1",
              type: "local",
              fieldName: "text_bottom_1",
            },
          ],
          condition: [
            {
              fullExpression: "@local.text_bottom_1",
              matchedExpression: "@local.text_bottom_1",
              type: "local",
              fieldName: "text_bottom_1",
            },
          ],
          style_list: {
            "0": [
              {
                fullExpression: "@local.activity_text_style",
                matchedExpression: "@local.activity_text_style",
                type: "local",
                fieldName: "activity_text_style",
              },
            ],
            "1": [
              {
                fullExpression: "@local.activity_text_parskip",
                matchedExpression: "@local.activity_text_parskip",
                type: "local",
                fieldName: "activity_text_parskip",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.text_bottom_1": ["value", "condition"],
          "@local.activity_text_style": ["style_list.0"],
          "@local.activity_text_parskip": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "bottom_group",
        condition: "@local.image_bottom_1",
        parameter_list: {
          style: "column",
        },
        style_list: ["@local.activity_text_parskip"],
        rows: [
          {
            type: "image",
            name: "image5",
            value: "@local.image_bottom_1",
            _translations: {
              value: {},
            },
            style_list: ["max-width: @local.image_bottom_1_max_width"],
            _nested_name: "bottom_group.image5",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.image_bottom_1",
                  matchedExpression: "@local.image_bottom_1",
                  type: "local",
                  fieldName: "image_bottom_1",
                },
              ],
              style_list: {
                "0": [
                  {
                    fullExpression: "max-width: @local.image_bottom_1_max_width",
                    matchedExpression: "@local.image_bottom_1_max_width",
                    type: "local",
                    fieldName: "image_bottom_1_max_width",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.image_bottom_1": ["value"],
              "@local.image_bottom_1_max_width": ["style_list.0"],
            },
          },
        ],
        _nested_name: "bottom_group",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "@local.image_bottom_1",
              matchedExpression: "@local.image_bottom_1",
              type: "local",
              fieldName: "image_bottom_1",
            },
          ],
          style_list: {
            "0": [
              {
                fullExpression: "@local.activity_text_parskip",
                matchedExpression: "@local.activity_text_parskip",
                type: "local",
                fieldName: "activity_text_parskip",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.image_bottom_1": ["condition"],
          "@local.activity_text_parskip": ["style_list.0"],
        },
      },
      {
        type: "text",
        name: "text4",
        value: "@local.text_bottom_2",
        _translations: {
          value: {},
        },
        condition: "@local.text_bottom_2",
        style_list: ["@local.activity_text_style", "@local.activity_text_parskip"],
        _nested_name: "text4",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.text_bottom_2",
              matchedExpression: "@local.text_bottom_2",
              type: "local",
              fieldName: "text_bottom_2",
            },
          ],
          condition: [
            {
              fullExpression: "@local.text_bottom_2",
              matchedExpression: "@local.text_bottom_2",
              type: "local",
              fieldName: "text_bottom_2",
            },
          ],
          style_list: {
            "0": [
              {
                fullExpression: "@local.activity_text_style",
                matchedExpression: "@local.activity_text_style",
                type: "local",
                fieldName: "activity_text_style",
              },
            ],
            "1": [
              {
                fullExpression: "@local.activity_text_parskip",
                matchedExpression: "@local.activity_text_parskip",
                type: "local",
                fieldName: "activity_text_parskip",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.text_bottom_2": ["value", "condition"],
          "@local.activity_text_style": ["style_list.0"],
          "@local.activity_text_parskip": ["style_list.1"],
        },
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_chapter1_acts",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Chapter 1 — I Can Hear You!",
        _translations: {
          value: {},
        },
        _nested_name: "title",
      },
      {
        type: "items",
        name: "activity_buttons",
        value: "@data.efm_act",
        rows: [
          {
            type: "button",
            name: "button_activities",
            value: "@item.id   @item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "data.efm_act.@item.id"],
                _raw: "click | set_field:current_activity: data.efm_act.@item.id",
                _cleaned: "click | set_field:current_activity: data.efm_act.@item.id",
              },
              {
                trigger: "click",
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
              },
            ],
            condition: false,
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            _nested_name: "activity_buttons.button_activities",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.id   @item.title",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
                {
                  fullExpression: "@item.id   @item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "data.efm_act.@item.id",
                        matchedExpression: "@item.id",
                        type: "item",
                        fieldName: "id",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@item.id": [
                "value",
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
              "@item.title": ["value"],
            },
          },
          {
            type: "button",
            name: "button_activities",
            value: "@item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "data.efm_act.@item.id"],
                _raw: "click | set_field:current_activity: data.efm_act.@item.id",
                _cleaned: "click | set_field:current_activity: data.efm_act.@item.id",
              },
              {
                trigger: "click",
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
              },
            ],
            condition: '@item.chapter=="1"',
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            _nested_name: "activity_buttons.button_activities",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "data.efm_act.@item.id",
                        matchedExpression: "@item.id",
                        type: "item",
                        fieldName: "id",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
              },
              condition: [
                {
                  fullExpression: '@item.chapter=="1"',
                  matchedExpression: "@item.chapter",
                  type: "item",
                  fieldName: "chapter",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.title": ["value"],
              "@item.id": ["action_list.0.args.1", "action_list.0._raw", "action_list.0._cleaned"],
              "@item.chapter": ["condition"],
            },
          },
        ],
        _nested_name: "activity_buttons",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.efm_act",
              matchedExpression: "@data.efm_act",
              type: "data",
              fieldName: "efm_act",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.efm_act": ["value"],
        },
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_chapter2_acts",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Chapter 2 — I Can Count to 5!",
        _translations: {
          value: {},
        },
        _nested_name: "title",
      },
      {
        type: "items",
        name: "activity_buttons",
        value: "@data.efm_act",
        rows: [
          {
            type: "button",
            name: "button_activities",
            value: "@item.id   @item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "data.efm_act.@item.id"],
                _raw: "click | set_field:current_activity: data.efm_act.@item.id",
                _cleaned: "click | set_field:current_activity: data.efm_act.@item.id",
              },
              {
                trigger: "click",
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
              },
            ],
            condition: false,
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            _nested_name: "activity_buttons.button_activities",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.id   @item.title",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
                {
                  fullExpression: "@item.id   @item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "data.efm_act.@item.id",
                        matchedExpression: "@item.id",
                        type: "item",
                        fieldName: "id",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@item.id": [
                "value",
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
              "@item.title": ["value"],
            },
          },
          {
            type: "button",
            name: "button_activities",
            value: "@item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "data.efm_act.@item.id"],
                _raw: "click | set_field:current_activity: data.efm_act.@item.id",
                _cleaned: "click | set_field:current_activity: data.efm_act.@item.id",
              },
              {
                trigger: "click",
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
              },
            ],
            condition: '@item.chapter=="2"',
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            _nested_name: "activity_buttons.button_activities",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "data.efm_act.@item.id",
                        matchedExpression: "@item.id",
                        type: "item",
                        fieldName: "id",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
              },
              condition: [
                {
                  fullExpression: '@item.chapter=="2"',
                  matchedExpression: "@item.chapter",
                  type: "item",
                  fieldName: "chapter",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.title": ["value"],
              "@item.id": ["action_list.0.args.1", "action_list.0._raw", "action_list.0._cleaned"],
              "@item.chapter": ["condition"],
            },
          },
        ],
        _nested_name: "activity_buttons",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.efm_act",
              matchedExpression: "@data.efm_act",
              type: "data",
              fieldName: "efm_act",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.efm_act": ["value"],
        },
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_chapter3_acts",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Chapter 3 — I Can Count to 10!",
        _translations: {
          value: {},
        },
        _nested_name: "title",
      },
      {
        type: "items",
        name: "activity_buttons",
        value: "@data.efm_act",
        rows: [
          {
            type: "button",
            name: "button_activities",
            value: "@item.id   @item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "data.efm_act.@item.id"],
                _raw: "click | set_field:current_activity: data.efm_act.@item.id",
                _cleaned: "click | set_field:current_activity: data.efm_act.@item.id",
              },
              {
                trigger: "click",
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
              },
            ],
            condition: false,
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            _nested_name: "activity_buttons.button_activities",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.id   @item.title",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
                {
                  fullExpression: "@item.id   @item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "data.efm_act.@item.id",
                        matchedExpression: "@item.id",
                        type: "item",
                        fieldName: "id",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@item.id": [
                "value",
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
              "@item.title": ["value"],
            },
          },
          {
            type: "button",
            name: "button_activities",
            value: "@item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "data.efm_act.@item.id"],
                _raw: "click | set_field:current_activity: data.efm_act.@item.id",
                _cleaned: "click | set_field:current_activity: data.efm_act.@item.id",
              },
              {
                trigger: "click",
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
              },
            ],
            condition: '@item.chapter=="3"',
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            _nested_name: "activity_buttons.button_activities",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "data.efm_act.@item.id",
                        matchedExpression: "@item.id",
                        type: "item",
                        fieldName: "id",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
              },
              condition: [
                {
                  fullExpression: '@item.chapter=="3"',
                  matchedExpression: "@item.chapter",
                  type: "item",
                  fieldName: "chapter",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.title": ["value"],
              "@item.id": ["action_list.0.args.1", "action_list.0._raw", "action_list.0._cleaned"],
              "@item.chapter": ["condition"],
            },
          },
        ],
        _nested_name: "activity_buttons",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.efm_act",
              matchedExpression: "@data.efm_act",
              type: "data",
              fieldName: "efm_act",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.efm_act": ["value"],
        },
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_chapter4_acts",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Chapter 4 — I Can Count to 20!",
        _translations: {
          value: {},
        },
        _nested_name: "title",
      },
      {
        type: "items",
        name: "activity_buttons",
        value: "@data.efm_act",
        rows: [
          {
            type: "button",
            name: "button_activities",
            value: "@item.id   @item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "data.efm_act.@item.id"],
                _raw: "click | set_field:current_activity: data.efm_act.@item.id",
                _cleaned: "click | set_field:current_activity: data.efm_act.@item.id",
              },
              {
                trigger: "click",
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
              },
            ],
            condition: false,
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            _nested_name: "activity_buttons.button_activities",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.id   @item.title",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
                {
                  fullExpression: "@item.id   @item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "data.efm_act.@item.id",
                        matchedExpression: "@item.id",
                        type: "item",
                        fieldName: "id",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@item.id": [
                "value",
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
              "@item.title": ["value"],
            },
          },
          {
            type: "button",
            name: "button_activities",
            value: "@item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "data.efm_act.@item.id"],
                _raw: "click | set_field:current_activity: data.efm_act.@item.id",
                _cleaned: "click | set_field:current_activity: data.efm_act.@item.id",
              },
              {
                trigger: "click",
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
              },
            ],
            condition: '@item.chapter=="4"',
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            _nested_name: "activity_buttons.button_activities",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "data.efm_act.@item.id",
                        matchedExpression: "@item.id",
                        type: "item",
                        fieldName: "id",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
              },
              condition: [
                {
                  fullExpression: '@item.chapter=="4"',
                  matchedExpression: "@item.chapter",
                  type: "item",
                  fieldName: "chapter",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.title": ["value"],
              "@item.id": ["action_list.0.args.1", "action_list.0._raw", "action_list.0._cleaned"],
              "@item.chapter": ["condition"],
            },
          },
        ],
        _nested_name: "activity_buttons",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.efm_act",
              matchedExpression: "@data.efm_act",
              type: "data",
              fieldName: "efm_act",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.efm_act": ["value"],
        },
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_chapter5_acts",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Chapter 5 — I Can Count to 100!",
        _translations: {
          value: {},
        },
        _nested_name: "title",
      },
      {
        type: "items",
        name: "activity_buttons",
        value: "@data.efm_act",
        rows: [
          {
            type: "button",
            name: "button_activities",
            value: "@item.id   @item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "data.efm_act.@item.id"],
                _raw: "click | set_field:current_activity: data.efm_act.@item.id",
                _cleaned: "click | set_field:current_activity: data.efm_act.@item.id",
              },
              {
                trigger: "click",
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
              },
            ],
            condition: false,
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            _nested_name: "activity_buttons.button_activities",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.id   @item.title",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
                {
                  fullExpression: "@item.id   @item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "data.efm_act.@item.id",
                        matchedExpression: "@item.id",
                        type: "item",
                        fieldName: "id",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@item.id": [
                "value",
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
              "@item.title": ["value"],
            },
          },
          {
            type: "button",
            name: "button_activities",
            value: "@item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "set_field",
                args: ["current_activity", "data.efm_act.@item.id"],
                _raw: "click | set_field:current_activity: data.efm_act.@item.id",
                _cleaned: "click | set_field:current_activity: data.efm_act.@item.id",
              },
              {
                trigger: "click",
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
              },
            ],
            condition: '@item.chapter=="5"',
            parameter_list: {
              style: "short",
              text_align: "center",
            },
            _nested_name: "activity_buttons.button_activities",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "data.efm_act.@item.id",
                        matchedExpression: "@item.id",
                        type: "item",
                        fieldName: "id",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | set_field:current_activity: data.efm_act.@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
              },
              condition: [
                {
                  fullExpression: '@item.chapter=="5"',
                  matchedExpression: "@item.chapter",
                  type: "item",
                  fieldName: "chapter",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.title": ["value"],
              "@item.id": ["action_list.0.args.1", "action_list.0._raw", "action_list.0._cleaned"],
              "@item.chapter": ["condition"],
            },
          },
        ],
        _nested_name: "activity_buttons",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.efm_act",
              matchedExpression: "@data.efm_act",
              type: "data",
              fieldName: "efm_act",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.efm_act": ["value"],
        },
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_storybooks",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "Storybooks",
        _translations: {
          value: {},
        },
        _nested_name: "title_1",
      },
      {
        type: "button",
        name: "book1",
        value: "A Very Tall Man",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["efm_sb_book_A_Very_Tall_Man"],
            _raw: "click | go_to: efm_sb_book_A_Very_Tall_Man",
            _cleaned: "click | go_to: efm_sb_book_A_Very_Tall_Man",
          },
        ],
        _nested_name: "book1",
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_sb_cover",
    status: "released",
    rows: [
      {
        name: "book_cover",
        type: "set_variable",
        _nested_name: "book_cover",
      },
      {
        name: "book_title",
        type: "set_variable",
        _nested_name: "book_title",
      },
      {
        name: "book_author",
        type: "set_variable",
        _nested_name: "book_author",
      },
      {
        name: "book_illustrator",
        type: "set_variable",
        _nested_name: "book_illustrator",
      },
      {
        type: "image",
        name: "cover_1",
        value: "@local.book_cover",
        _translations: {
          value: {},
        },
        _nested_name: "cover_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.book_cover",
              matchedExpression: "@local.book_cover",
              type: "local",
              fieldName: "book_cover",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.book_cover": ["value"],
        },
      },
      {
        type: "text",
        name: "title_1",
        value: "@local.book_title",
        _translations: {
          value: {},
        },
        parameter_list: {
          style: "large emphasised",
        },
        _nested_name: "title_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.book_title",
              matchedExpression: "@local.book_title",
              type: "local",
              fieldName: "book_title",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.book_title": ["value"],
        },
      },
      {
        type: "text",
        name: "author_1",
        value: "Written: @local.book_author",
        _translations: {
          value: {},
        },
        condition: "@local.book_author",
        style_list: ["margin-top: -20px"],
        _nested_name: "author_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Written: @local.book_author",
              matchedExpression: "@local.book_author",
              type: "local",
              fieldName: "book_author",
            },
          ],
          condition: [
            {
              fullExpression: "@local.book_author",
              matchedExpression: "@local.book_author",
              type: "local",
              fieldName: "book_author",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.book_author": ["value", "condition"],
        },
      },
      {
        type: "text",
        name: "illustrator_1",
        value: "Illustrated: @local.book_illustrator",
        _translations: {
          value: {},
        },
        condition: "@local.book_illustrator",
        style_list: ["margin-top: -20px"],
        _nested_name: "illustrator_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Illustrated: @local.book_illustrator",
              matchedExpression: "@local.book_illustrator",
              type: "local",
              fieldName: "book_illustrator",
            },
          ],
          condition: [
            {
              fullExpression: "@local.book_illustrator",
              matchedExpression: "@local.book_illustrator",
              type: "local",
              fieldName: "book_illustrator",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.book_illustrator": ["value", "condition"],
        },
      },
      {
        type: "image",
        name: "page_end",
        value: "EFMStorybooks/EFM-SB-0-PageDivider.svg",
        _translations: {
          value: {},
        },
        style_list: ["margin-top: -1px"],
        _nested_name: "page_end",
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_sb_intro",
    status: "released",
    rows: [
      {
        name: "sb_level",
        type: "set_variable",
        _nested_name: "sb_level",
      },
      {
        name: "intro_math",
        type: "set_variable",
        _nested_name: "intro_math",
      },
      {
        type: "text",
        name: "intro_header",
        value: "**Adult Readers**",
        _translations: {
          value: {},
        },
        style_list: ["margin-top: -7px"],
        _nested_name: "intro_header",
      },
      {
        type: "text",
        name: "intro_part1_basic",
        value:
          '**Before Talking** Talk with your child before they can talk or even understand the words. Point at, name, and describe things you see, such as shapes, colors, comparisons, and quantities. As your child begins to understand words, ask about a thing and have your child point at it. For example, "Where is the ball?" If your child can\'t find the thing, point to it for them. \n\n**Early Talking** As your child begins to understand and say words, mix in simple questions. Freely help with answers as needed. If you point and say "Is this red?" and they don\'t know, supply the answer. If you say "Count the blocks." and your child does not know how, point and count the blocks with them "one, two, three."',
        _translations: {
          value: {},
        },
        condition: '@local.sb_level=="basic"',
        style_list: ["margin-top: -10px"],
        _nested_name: "intro_part1_basic",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.sb_level=="basic"',
              matchedExpression: "@local.sb_level",
              type: "local",
              fieldName: "sb_level",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.sb_level": ["condition"],
        },
      },
      {
        type: "text",
        name: "intro_part1_advanced",
        value:
          "**3 Levels of Discussion** Pick an appropriate level for your child. Allow time for thought when asking questions or making comments. Help with the answer when your child stumbles, and follow up correct answers with questions or comments that are small expansions on the child's answer.\n\n**Level 1** Ask simple direct questions. Ask and point at what you see on the page. Where is the toy? What are they doing? What is its name? What color is it? How many balls are there?\n**Level 2** Ask general or open questions about this point in the story. What do you see happening here? What is this group of things?\n**Level 3** Ask about the story line. What has happened? What will happen next? Have you had experiences or seen things similar to this? How does she feel when this happens?",
        _translations: {
          value: {},
        },
        condition: '@local.sb_level=="advanced"',
        style_list: ["margin-top: -20px"],
        _nested_name: "intro_part1_advanced",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.sb_level=="advanced"',
              matchedExpression: "@local.sb_level",
              type: "local",
              fieldName: "sb_level",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.sb_level": ["condition"],
        },
      },
      {
        type: "text",
        name: "intro_math",
        value: "@local.intro_math",
        _translations: {
          value: {},
        },
        condition: "@local.intro_math",
        style_list: ["margin-top: -20px"],
        _nested_name: "intro_math",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.intro_math",
              matchedExpression: "@local.intro_math",
              type: "local",
              fieldName: "intro_math",
            },
          ],
          condition: [
            {
              fullExpression: "@local.intro_math",
              matchedExpression: "@local.intro_math",
              type: "local",
              fieldName: "intro_math",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.intro_math": ["value", "condition"],
        },
      },
      {
        type: "text",
        name: "intro_part3",
        value:
          "**Read, Talk, and Have Fun!** The supplied questions and comments are just the beginning. \n\n1. For the first reading, read the red questions and comments. \n2. For the second reading, read the blue questions and comments. \n3. For the third reading, read the green questions and comments. \n\nAfter that, follow your child's interests and let your discussions go in fun directions.",
        _translations: {
          value: {},
        },
        style_list: ["margin-top: -20px"],
        _nested_name: "intro_part3",
      },
      {
        type: "image",
        name: "page_end",
        value: "EFMStorybooks/EFM-SB-0-PageDivider.svg",
        _translations: {
          value: {},
        },
        style_list: ["margin-top: -4px"],
        _nested_name: "page_end",
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_sb_page",
    status: "released",
    rows: [
      {
        name: "page_no",
        type: "set_variable",
        _nested_name: "page_no",
      },
      {
        name: "illustration",
        type: "set_variable",
        _nested_name: "illustration",
      },
      {
        name: "story_text",
        type: "set_variable",
        _nested_name: "story_text",
      },
      {
        name: "annotation_1",
        type: "set_variable",
        _nested_name: "annotation_1",
      },
      {
        name: "annotation_2",
        type: "set_variable",
        _nested_name: "annotation_2",
      },
      {
        name: "annotation_3",
        type: "set_variable",
        _nested_name: "annotation_3",
      },
      {
        type: "image",
        name: "page 1",
        value: "@local.illustration",
        _translations: {
          value: {},
        },
        condition: "@local.illustration",
        _nested_name: "page 1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.illustration",
              matchedExpression: "@local.illustration",
              type: "local",
              fieldName: "illustration",
            },
          ],
          condition: [
            {
              fullExpression: "@local.illustration",
              matchedExpression: "@local.illustration",
              type: "local",
              fieldName: "illustration",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.illustration": ["value", "condition"],
        },
      },
      {
        type: "text",
        name: "story_1",
        value: "@local.story_text",
        _translations: {
          value: {},
        },
        condition: "@local.story_text",
        parameter_list: {
          style: "large emphasised",
        },
        _nested_name: "story_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.story_text",
              matchedExpression: "@local.story_text",
              type: "local",
              fieldName: "story_text",
            },
          ],
          condition: [
            {
              fullExpression: "@local.story_text",
              matchedExpression: "@local.story_text",
              type: "local",
              fieldName: "story_text",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.story_text": ["value", "condition"],
        },
      },
      {
        type: "text",
        name: "anno_1",
        value: "1. @local.annotation_1",
        _translations: {
          value: {},
        },
        condition: "@local.annotation_1",
        style_list: ["margin-top: -20px"],
        _nested_name: "anno_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "1. @local.annotation_1",
              matchedExpression: "@local.annotation_1",
              type: "local",
              fieldName: "annotation_1",
            },
          ],
          condition: [
            {
              fullExpression: "@local.annotation_1",
              matchedExpression: "@local.annotation_1",
              type: "local",
              fieldName: "annotation_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.annotation_1": ["value", "condition"],
        },
      },
      {
        type: "text",
        name: "anno_2",
        value: "2. @local.annotation_2",
        _translations: {
          value: {},
        },
        condition: "@local.annotation_2",
        style_list: ["margin-top: -30px"],
        _nested_name: "anno_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "2. @local.annotation_2",
              matchedExpression: "@local.annotation_2",
              type: "local",
              fieldName: "annotation_2",
            },
          ],
          condition: [
            {
              fullExpression: "@local.annotation_2",
              matchedExpression: "@local.annotation_2",
              type: "local",
              fieldName: "annotation_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.annotation_2": ["value", "condition"],
        },
      },
      {
        type: "text",
        name: "anno_3",
        value: "3. @local.annotation_3",
        _translations: {
          value: {},
        },
        condition: "@local.annotation_3",
        style_list: ["margin-top: -30px"],
        _nested_name: "anno_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "3. @local.annotation_3",
              matchedExpression: "@local.annotation_3",
              type: "local",
              fieldName: "annotation_3",
            },
          ],
          condition: [
            {
              fullExpression: "@local.annotation_3",
              matchedExpression: "@local.annotation_3",
              type: "local",
              fieldName: "annotation_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.annotation_3": ["value", "condition"],
        },
      },
      {
        type: "image",
        name: "page_end",
        value: "EFMStorybooks/EFM-SB-0-PageDivider.svg",
        _translations: {
          value: {},
        },
        style_list: ["margin-top: -7px"],
        _nested_name: "page_end",
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_sb_last_page",
    status: "released",
    rows: [
      {
        name: "page_image",
        type: "set_variable",
        _nested_name: "page_image",
      },
      {
        type: "image",
        name: "page_1",
        value: "@local.page_image",
        _translations: {
          value: {},
        },
        _nested_name: "page_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.page_image",
              matchedExpression: "@local.page_image",
              type: "local",
              fieldName: "page_image",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.page_image": ["value"],
        },
      },
    ],
    _xlsxPath: "EFM_high_level_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_sb_book_A_Very_Tall_Man",
    status: "released",
    rows: [
      {
        type: "template",
        name: "cover_1",
        value: "efm_sb_cover",
        rows: [
          {
            name: "book_cover",
            value: "EFMStorybooks/EFM-SB-AVTM-1.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "cover_1.book_cover",
          },
          {
            name: "book_title",
            value: "A Very Tall Man",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "cover_1.book_title",
          },
          {
            name: "book_author",
            value: "Cornelius Wambi Gulere",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "cover_1.book_author",
          },
          {
            name: "book_illustrator",
            value: "Catherine Groenewald",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "cover_1.book_illustrator",
          },
        ],
        _nested_name: "cover_1",
      },
      {
        type: "template",
        name: "book_intro",
        value: "efm_sb_intro",
        rows: [
          {
            name: "sb_level",
            value: "basic",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "book_intro.sb_level",
          },
          {
            name: "intro_math",
            value:
              "**Math Themes and Words** This story looks at counting to 5, descriptions, and comparisons. Practice describing words: too, very, short, tall, long, low, high, big, small; color names; and comparison words: shorter, taller, longer, lower, higher, bigger, smaller",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "book_intro.intro_math",
          },
        ],
        _nested_name: "book_intro",
      },
      {
        type: "template",
        name: "page_1",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 1,
            type: "set_variable",
            _nested_name: "page_1.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-1.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_1.illustration",
          },
          {
            name: "story_text",
            value: "His hoe was too short.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_1.story_text",
          },
          {
            name: "annotation_1",
            value:
              "Point out the vivid colors -- the yellow sun, the blue sky, the green bushes, and the red shoes.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_1.annotation_1",
          },
          {
            name: "annotation_2",
            value: "Count the two bushes and the two red shoes with your child.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_1.annotation_2",
          },
          {
            name: "annotation_3",
            value: "Point out how uncomfortable the man looks bending over so far to hoe.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_1.annotation_3",
          },
        ],
        _nested_name: "page_1",
      },
      {
        type: "template",
        name: "page_2",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 2,
            type: "set_variable",
            _nested_name: "page_2.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-2.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_2.illustration",
          },
          {
            name: "story_text",
            value: "His doorway was too low.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_2.story_text",
          },
          {
            name: "annotation_1",
            value: "Comment that the doorway is too low -- the man is taller than the door.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_2.annotation_1",
          },
          {
            name: "annotation_2",
            value:
              "Look how much the man stoops down to talk to the boy -- he is much taller than the boy, and the boy is much shorter than the man!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_2.annotation_2",
          },
          {
            name: "annotation_3",
            value: "Count the bushes together.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_2.annotation_3",
          },
        ],
        _nested_name: "page_2",
      },
      {
        type: "template",
        name: "page_3",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 3,
            type: "set_variable",
            _nested_name: "page_3.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-3.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_3.illustration",
          },
          {
            name: "story_text",
            value: "His bed was too short.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_3.story_text",
          },
          {
            name: "annotation_1",
            value: "The man's legs stick far out of the bed. He is much longer than his bed.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_3.annotation_1",
          },
          {
            name: "annotation_2",
            value: "Point to the bird and the boy and how puzzled they look by the short bed.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_3.annotation_2",
          },
          {
            name: "annotation_3",
            value: "Count together the toes on each of the man's feet.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_3.annotation_3",
          },
        ],
        _nested_name: "page_3",
      },
      {
        type: "template",
        name: "page_4",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 4,
            type: "set_variable",
            _nested_name: "page_4.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-4.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_4.illustration",
          },
          {
            name: "story_text",
            value: "His bicycle was too short.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_4.story_text",
          },
          {
            name: "annotation_1",
            value: "The tall man is much too big for his bicycle. Look how far his leg sticks out!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_4.annotation_1",
          },
          {
            name: "annotation_2",
            value: "Point out that the bird has changed color from yellow to orange!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_4.annotation_2",
          },
          {
            name: "annotation_3",
            value: "Where is the boy in this picture?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_4.annotation_3",
          },
        ],
        _nested_name: "page_4",
      },
      {
        type: "template",
        name: "page_5",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 5,
            type: "set_variable",
            _nested_name: "page_5.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-5.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_5.illustration",
          },
          {
            name: "story_text",
            value:
              "This man was too tall!\n\nWhat can he do to solve his problem and fit into his world?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_5.story_text",
          },
          {
            name: "annotation_1",
            value: "Maybe the man is not too tall -- maybe he just needs to solve his problems!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_5.annotation_1",
          },
          {
            name: "annotation_2",
            value: "The man has a problem and he is feeling sad about it.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_5.annotation_2",
          },
          {
            name: "annotation_3",
            value: "Notice that this man is much taller than the other people.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_5.annotation_3",
          },
        ],
        _nested_name: "page_5",
      },
      {
        type: "template",
        name: "page_6",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 6,
            type: "set_variable",
            _nested_name: "page_6.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-6.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_6.illustration",
          },
          {
            name: "story_text",
            value: "He made a very long handle.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_6.story_text",
          },
          {
            name: "annotation_1",
            value: "He solved his problem with the hoe! He made his hoe bigger!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_6.annotation_1",
          },
          {
            name: "annotation_2",
            value: "Which one is bigger, the hoe or the man?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_6.annotation_2",
          },
          {
            name: "annotation_3",
            value: "Do you see the man's red shoes? They disappeared!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_6.annotation_3",
          },
        ],
        _nested_name: "page_6",
      },
      {
        type: "template",
        name: "page_7",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 7,
            type: "set_variable",
            _nested_name: "page_7.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-7.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_7.illustration",
          },
          {
            name: "story_text",
            value: "He made very high door frames.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_7.story_text",
          },
          {
            name: "annotation_1",
            value: "Which is higher -- the door or the man?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_7.annotation_1",
          },
          {
            name: "annotation_2",
            value: "The sun in the sky is round. Point to round things where you are.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_7.annotation_2",
          },
          {
            name: "annotation_3",
            value: "Which is longer and which is shorter -- the man's legs or his upper body?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_7.annotation_3",
          },
        ],
        _nested_name: "page_7",
      },
      {
        type: "template",
        name: "page_8",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 8,
            type: "set_variable",
            _nested_name: "page_8.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-8.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_8.illustration",
          },
          {
            name: "story_text",
            value: "He made a very long bed.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_8.story_text",
          },
          {
            name: "annotation_1",
            value: "We can't see the man's feet now. His bed is longer than he is.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_8.annotation_1",
          },
          {
            name: "annotation_2",
            value: "The man looks very comfortable and happy in his big bed.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_8.annotation_2",
          },
          {
            name: "annotation_3",
            value: "Look at how small the boy looks next to the bed!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_8.annotation_3",
          },
        ],
        _nested_name: "page_8",
      },
      {
        type: "template",
        name: "page_9",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 9,
            type: "set_variable",
            _nested_name: "page_9.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-9.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_9.illustration",
          },
          {
            name: "story_text",
            value: "He bought a very high bicycle.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_9.story_text",
          },
          {
            name: "annotation_1",
            value: "Notice that the boy and the bird are inside the basket now.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_9.annotation_1",
          },
          {
            name: "annotation_2",
            value: "Everyone looks very happy now that the man's things are the right size.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_9.annotation_2",
          },
          {
            name: "annotation_3",
            value: "Point to and name the many different colors on this page.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_9.annotation_3",
          },
        ],
        _nested_name: "page_9",
      },
      {
        type: "template",
        name: "page_10",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 10,
            type: "set_variable",
            _nested_name: "page_10.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-10.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_10.illustration",
          },
          {
            name: "story_text",
            value: "He sat on a very high chair. He ate with a very long fork.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_10.story_text",
          },
          {
            name: "annotation_1",
            value:
              "Count out with your child many of the things in the picture -- such as fingers, legs, steps, and tines.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_10.annotation_1",
          },
          {
            name: "annotation_2",
            value: "Look at how high the boy's chair is! Would you be scared sitting so high?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_10.annotation_2",
          },
          {
            name: "annotation_3",
            value:
              "Now that all his things are the right size for him, the man is not too tall at all!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_10.annotation_3",
          },
        ],
        _nested_name: "page_10",
      },
      {
        type: "template",
        name: "page_11",
        value: "efm_sb_page",
        rows: [
          {
            name: "page_no",
            value: 11,
            type: "set_variable",
            _nested_name: "page_11.page_no",
          },
          {
            name: "illustration",
            value: "EFMStorybooks/EFM-SB-AVTM-11.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_11.illustration",
          },
          {
            name: "story_text",
            value:
              "He left his house and moved to a big house in the forest, where lived for many years.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_11.story_text",
          },
          {
            name: "annotation_1",
            value: "Count the pineapples, bags, and trees with your child.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_11.annotation_1",
          },
          {
            name: "annotation_2",
            value: "Count the rungs on the ladder with your child.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_11.annotation_2",
          },
          {
            name: "annotation_3",
            value: "Notice that the bird is yellow again!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "page_11.annotation_3",
          },
        ],
        _nested_name: "page_11",
      },
      {
        type: "template",
        name: "back_1",
        value: "efm_sb_last_page",
        rows: [
          {
            name: "page_image",
            value: "EFMStorybooks/EFM-SB-AVTM-Back.png",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "back_1.page_image",
          },
        ],
        _nested_name: "back_1",
      },
    ],
    _xlsxPath: "EFM_storybooks_beginning.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_430a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These teaching methods provide structured strategies for learning single-digit multiplication. As your child practices these strategies they will be learning important numerical relationships, and they will also eventually memorize these facts. Your child should already be good with doubling and skip counting by any number.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_430b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "By now, your child is so familiar with addition that it’s no surprise that 2 + 3 is the same as 3 + 2. Although not as obvious, the same is true for multiplication. This illustration makes it easy to see that two rows of three is the same as three rows of two – you just change your point of view! It doesn’t matter which order you multiply two numbers – you get the same answer either way!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM380MultiplyingCommutes.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "240px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "In addition to being cool in a nerdy way, it also means that your child needs to master only about half as many multiplication facts – once your child knows 3 x 4, they also know 4 x 3.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_430c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Skip counting is great for getting better at addition and subtraction. It also is a big help in getting started with multiplication.\n\nAlthough skip counting is not the fastest way to find a result, it is reliable and your child should use it as long as they need to. Suppose your child needs to find 7 x 3. Skip count by 3’s seven times or skip count by 7’s three times to get 21.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_430d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "**Multiplying by 5 and 10**\n\nThese facts are quickly learned, provide a backbone for other multiplication facts, and they help with understanding two-digit place value.\n\n**Squares**\n\nJust as addition twins are favorite math facts for addition, squares are often favorites for multiplication. Learning these provides another foundation for learning other multiplication facts.\n\n**Doubling**\n\nUse this strategy for multiplying by even numbers. For example, the result of 6 x 7 is the double of 3 x 7. So, 6 x 7 is the double of 21, which is 42.\n\n**One More or One Less**\n\nThis strategy is effective for the remaining multiplication facts. For example, 9 x 7 is one 7 less than 10 x 7 = 70. So it is 70 - 7 = 63. This can be done for all the 9’s. Similarly, 3 x 7 is one more 7 than doubling 7, so it is 7 + 14 = 21. This can be done for all the 3’s.\n\n**Multiplying by 9**\n\nAlthough multiplying by 9 is covered by the last strategy, they are fun to learn in their own right. If you write out the multiples of 9 in order, you’ll see that the tens digit is always one less than the number you are multiplying by and the ones digit plus the tens digit always adds up to 9!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_440a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Each player has a sheet of paper with 7 rows and 3 columns. The columns are marked “10’s,” “1’s,” and “Running Total.” Each player’s running total starts at 0. Roll a die or pick a random playing card from 1 to 9. Each player chooses to use this number in their 1’s or 10’s column for the current row. For example, if it is a 4, this can become 4 or 40. The chosen number is added to the running total. A player that goes over the target of 100 “goes bust” and loses. If neither player goes bust, the one closer to 100 wins. \n\nThere are many options for this game:\n\n* Use a different target number.\n* Use fewer or more rows.\n* Don’t go bust if you go over the target. The closer player on either side wins.\n* Use a fourth column of 100’s to practice 3-digit numbers.\n* Practice subtraction by starting at the target number and subtract down to 0.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_440b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Have a paper with a number line from 0 to 99 to share. On a turn, a player uses two random cards from 0 to 9, choosing the order of these two digits, to generate a number from 00 to 99, and then puts that number on their side of the number line. The first player to get four numbers in a region without any of the opponent’s numbers in between wins. The game can also be played from 000 to 999 if you like.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_440c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "There are two versions of this. The first is the same as the Sum Groups puzzle in Chapter 3, only now the target sums can be bigger.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM440BondedGroups.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "The other version uses a 4 by 4 board with a target number, say 20. As in Sum Groups, the board is filled with pairs and triples of numbers that add up to the target. However, now there will be one square not involved in any of those groups. The challenge is to find that number.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_440d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Create these by taking a simple addition or subtraction equation and leaving out some of the digits. For example, the following two problems are turned into Missing Number puzzles by leaving out a couple digits.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM440MissingNumbers.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "After getting comfortable with these, your child may enjoy doing some Letter Substitution puzzles that are described on a later Adding and Subtracting page in this chapter.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_450a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Make a set of multiplication cards to practice these math facts while playing matching games your family played earlier: Chapter 1 - Go Fish, Memory Challenge; Chapter 2 - Bingo; Chapter 3 - Hot Potato; and Chapter 4 - Gin Rummy.\n\nHand draw four cards to go with each math fact - 1) the expression 2) groups of objects, 3) an array, and 4) the prime factorization. If you make these the size of playing cards (2½” by 3½”), use a template from the Printables file if you like. \n\nTake 3 x 4 for example. The four cards would be:",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM450MultiplicationCards1.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_top_2",
            value:
              "You have several options for these cards. One option is to include 3 x 4 and not include 4 x 3. While this means you make about half as many cards, it has the drawback that seeing 3 groups of 4 is different from seeing 4 groups of 3.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_2",
          },
          {
            name: "text_upside_1",
            value:
              "For array cards, put the skip counting numbers along one or both of the sides to help your child practice skip counting.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_upside_1",
          },
          {
            name: "image_upside_1_right",
            value: "EFM450MultiplicationCards2.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_right",
          },
          {
            name: "image_upside_1_right_flex",
            value: 80,
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_right_flex",
          },
          {
            name: "image_upside_1_right_max_width",
            value: "135px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_right_max_width",
          },
          {
            name: "image_side_1_left",
            value: "EFM450MultiplicationCards3.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 80,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "135px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "For expression cards, replace each number with the prime factorization symbol for the number. This makes it easier to see how the prime factorizations fit together when multiplying two numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_450b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Start with a blank multiplication table that has 4 product rows and 4 product columns. There are also groups of four missing numbers at the top and left sides – these will have some of the numbers from 2 to 9, and these numbers can be duplicated.\n\nFill in the table out of sight of your child, and then flip over or cover all the numbers. Your child can ask to reveal, one at a time, up to 10 of the 16 product entries. The goal is to figure out the entries for the top and left sides before running out of turns.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM450RevealingProducts.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "240px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Imagine that all the cards were flipped over in this example. If your child chose to flip over the card that happened to have the 63 under it, then they would know it came from a  7 and a 9. Flipping over any other card in the same row or column as the 63 would indicate where the 7 and 9 are. Suppose the second card they flipped over was where the 56 is. Not only would they know that the third column was for 7, they would also know that the second row was for 9 and the third row was for 8.\n\nLarger sizes also work. For example, a table with 5 blank rows and columns that allows for up to 12 flips will work well.\n\nPick numbers for the top and left sides that you want your child to practice with.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_460a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Have a board of numbers from 1 to 30. There are two kinds of tokens – a single token reserved for “the last move,” and a pile of other tokens. \n\nThe first player gets to pick any number and cover it with the last move token. After that, a player replaces the last move token with the other type of token and moves the last move token to any number that is a factor or multiple of the number from the last move. The losing player is the one forced to cover the number 1. \n\nAs children get better at this game, they will discover rules they need to follow governing reasonable first moves. The most basic rule is that the first move cannot be on a prime number in the upper half of the numbers.\n\nAdjust the range of numbers for the skill level of the players - you can use 1 to 24, 1 to 48, or even 1 to 60.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_460b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Start with any number, say 20. Let your child decide whether to go first or second. During their turn, a player may subtract any divisor of the current number from the number. The player forced to 0 loses.\n\nAfter your child becomes familiar with the game, encourage them to look for the remarkably simple strategy for playing it - once they discover it, see if they can explain why it works.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_460c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Children have fun putting in X’s and watching the primes fall through the sieve. This activity creates opportunities for discovering many interesting properties of divisibility and primes.\n\nStart with a number line numbered from 1 to 25 - or a larger range if space and patience allows.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM460SieveOfEratosthenes.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "420px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Write the number 2 below itself. On the line even with this 2, put X’s below each multiple of 2.\n \nNow, pull down the lowest number with no X’s below it (3 in this case) and put it on the next line. Write the 3 and put X’s on that line for all its multiples. Keep pulling down numbers and marking their multiples. When you are finished, you will have pulled down all the primes. Remember that 1 is a unit and not a prime!\n\nHere are some good questions to discuss with your child as they play with this sieve:\n\n* Why are the numbers pulled down primes?\n* What is the last prime whose multiples you need to cross out? Why were the other primes not useful?\n* For all the primes that were useful, which of their multiples produced new restrictions and which were not useful?\n* If you had a number, say 53, which prime numbers would you need to divide it by to confirm that it’s a prime?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_470a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Have a collection of numbered cards from 1 to 25, or whatever range your child is comfortable with. A card is selected at random and used as everyone’s target number. The card is returned to the deck. Each player is dealt five cards to be used, in any order and with any operations, to get as close as possible to the target number. The closest player wins the round.\n\nA different way to score gives a player twice as many points as the number of cards they use to reach the target; a player receives 5 points for hitting the target with help; and a player receives 6 points for helping someone hit the target.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_470b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Near the end of Chapter 4, the Sum Difference activity had one person think of two numbers and then challenge the other person to find the numbers by telling them the sum and difference of the numbers. Secret Ops uses the same idea, only now the challenger can use any two operations, such as multiplying and subtracting.\n\nFor example, the challenger might say “Which two numbers have a product of 12 and a difference of 4?” You can extend this to three numbers, if you like - “Which three numbers have a product of 12 and a sum of 8?”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_470c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These puzzles are very easy for an adult to create. Take any equation, such as 9 = (2 + 7) x (5 - 2 x 2) and remove the parentheses. The challenge for your child is how to take 2 + 7 x 5 - 2 x 2 and add parentheses to it so that the result is 9.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_470d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use the lever principle to practice multiplication and addition. The principle states that the force exerted by a mass on one side of a lever is equal to the mass times its distance from the pivot point, the fulcrum. The forces on one side from several masses add up to give the total force. The total forces on the two sides must be equal for the lever to be in balance.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM470LeverBalance.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "You have a 3-unit weight and a 5-unit weight to put on opposite sides of the fulcrum. Where should they be put to balance? The answer to this can be distances 5 and 3, but it can also be 10 and 6, or even larger answers like 15 and 9.\n\nIf you have a 3-unit and a 5-unit weight to put on one side of a lever, which weights can you put at which distances on the other side? What if the two weights are on different sides of the lever? This question continues the questions on the Make It Count page at the end of Chapter 4.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_480a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Remove the picture cards from a deck and split it evenly between two players. To give more focused practice, remove the A’s and 10’s as well.\n\nEach player turns over two cards, multiplies them, and the player with the larger product wins those four cards. If the products are equal, two more cards are turned over and the winner gets to keep all eight cards. The player with the most cards after playing for a set time is the winner.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_480b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Start by identifying a group of numbers to use for the round. It can be odd numbers, or multiples of 3 together with numbers that have a 3 in them, or any group that provides good practice. \n\nTwo or more players take turns saying the numbers starting at 1. When a player has a number in the group, they must say “beep.” If they fail to say beep, or say beep for a wrong number, they’re out. The last player in wins!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_480c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a deck of cards with Q’s (as 0’s), A’s (as 1’s), and 2-9, or use four sets of Number Cards from 0 to 9. Use a 4 by 5 grid on a paper with 20 spaces randomly filled out with multiples of 5 and 10. Have a set of tokens for each player. Select a random card and put your token on that number times 5 or 10 - your choice. Once occupied, the other player cannot move there. The first player to get 3 in a row wins. \n\nThe numbers 5 and 10 can be replaced by other pairs such as 2 and 4, or 3 and 6. These pairings help with practicing doubling strategies for multiplication. For example, if the player does not know 6 x 7, they can double 3 x 7.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_480d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Filling in a standard multiplication table is boring, and children quickly realize they can fill it out using addition rather than multiplication. To really practice multiplication, as well as practicing problem solving and factoring, create a mixed-up multiplication table for your child.\n\nMake these tables by moving the rows and columns around, and leaving out most of the headings and  entries in the middle. Here is an example using headings of 2 through 9:",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM480TurningTheTables.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Solve this by starting with the distinctive entries. The 20 forces its row to be multiplying by 4, and then the 36 makes its column be 9. The 49 forces its column and row to be multiplying by 7. The 9 forces its column and row to be multiplying by 3. Now the 12 must be in the column for 4. Continue the detective work in this way and fill in the entries as the headings are discovered.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_490a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "The area of a rectangle is its length times its width. That dry statement can be made tangible to your child in at least two ways. The first is to show a rectangle broken into a collection of squares.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM490RectangleArea.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "220px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "The second is to use number shapes to show how a quantity, such as 12, can be placed into an array - 3 by 4, 2 by 6, or 1 by 12. Playing with rectangle areas gives us a fun arena in which to play around with multiplication and factoring!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_490b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Start with a large collection of small objects, such as raisins. For each number, investigate which rectangles you can make with that many objects. 1 can only be made with a 1 by 1 rectangle, and 1 is called a unit. The numbers, such as 5, that only have 1 by 5 and 5 by 1 rectangles, are called primes. Numbers that are not a unit or prime are called composite - they are called that because they are composed of primes being multiplied together, such as 12 = 2 x 2 x 3.\n\nThe dimensions of each rectangle are made of values that evenly divide the number and multiply together to give the number. Making rectangles is a direct way to experience divisibility. Numbers such as 16 are called squares because one of their rectangles is a square – one rectangle for 16 is the 4 by 4 square.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_490c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Each player gets a piece of graph paper. For a player’s turn, use two playing cards from 1 to 10 to determine the dimensions of a rectangle. If a player’s paper has room, the rectangle may be placed anywhere its interior does not overlap with an existing rectangle. Once placed, its interior is lightly shaded and its area and dimensions are written on it. If there is no room, the turn is skipped. The player with the largest total wins. For a normal piece of graph paper, this can be a long game – reduce the time by using half the paper or limiting the number of turns.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_490d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "A rectangle, 4 by 4 or larger, with numbers in some of its squares,  is to be divided into smaller rectangles. Each number must end up  in a separate rectangle whose area is that number. \n\nOut of the sight of your child, create these puzzles by first filling in the big rectangle with smaller rectangles. Next, place the area in each rectangle. Lastly, give your child the big rectangle with only the numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM490DivideUpTheBox.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "180px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "To solve, look first at areas that are prime numbers. Also, sometimes an area is boxed in – in this puzzle the upper “4” must relate to the upper left 2 by 2 square. Next, the upper right corner must be used in a vertical 3 by 1 rectangle. Keep going!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_500a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Just as 4 x 2 is a quick way to write 2 + 2 + 2 + 2, so 2^4 is a quick way to write 2 x 2 x 2 x 2. It’s much easier to say and understand the phrase “two to the fourth,” than to say “two times two times … “ There are two special names associated with powers. The second power, 4^2 for example, can be said *four squared*, and the third power, 4^3 for example, can be said *four cubed*.\n\nWhen two powers of the same number are multiplied, a simple rule governs how to simplify the result - the powers add up. For example, if you do 4^2 x 4^3= (4 x 4) x (4 x 4 x 4) = 4^5, we have two fours multiplied by three fours, so the result is five fours being multiplied. Note that this rule of adding exponents only works when it is the same number being taken to a power.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_500b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Because powers add up when powers are being multiplied, any of our old games and puzzles involving addition can be used to practice multiplying numbers that are powers. Some examples of this are: Chapter 3 - Shape Sums and Sum Groups; Chapter 4 - Enclosed Sums, SumTriangles, and Fix It.\n\nHere are two examples used in Chapter 3 for Shape Sums.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM500SimpleShapeSums.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Here are the same two examples for Shape Products where we use multiplication combining the circles instead of addition.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
          {
            name: "image_bottom_1",
            value: "EFM500SimpleShapeProducts.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1",
          },
          {
            name: "image_bottom_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1_max_width",
          },
          {
            name: "text_bottom_2",
            value:
              "With practice, this becomes routine and just as easy as the original addition problems.\n\nIf your child is enjoying these problems and wants some extra challenge, start involving more than one number being raised to a power. For example, if you multiply (4^2x 3^3) x (4^5x3^2) you can apply our rule separately to the powers of 4 and the powers of 3 and get the result 4^7x3^5.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_2",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_500c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "An excellent thing to practice when you are travelling and have time on your hands is to recite the prime factorizations for the numbers in order. This also provides practice with talking about powers. Knowing prime factorizations with ease will be helpful in many things to come, such as working with fractions. Have fun with this and don’t push your child beyond their comfort level.\n\nIt goes like this: 1 is a unit, 2 is a prime, 3 is a prime, 4 is 2 squared, 5 is a prime, 6 is 2 x 3, 7 is a prime, 8 is 2 cubed, 9 is 3 squared, 10 is 2 x 5, 11 is a prime, 12 is 2 squared x 3, 13 is a prime, 14 is 2 x 7, 15 is 3 x 5, and 16 is 2 to the fourth. If your child stumbles, help them figure it out rather than simply reminding them of the answer.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_510a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Factor trees are an extension of Shape Products from the previous Feel the Power page. The goal in creating a factor tree is to reduce a number to its prime factors. Many things can be learned about a number in the process of constructing a factor tree.\n\nStart with a number, say 54. This can be broken down several ways. One way is  9 x 6, another is 18 x 3, and yet another is 3 x 3 x 6. Each of these produces a different start to a factor tree.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM510FactorTrees.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "380px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Each of these trees ultimately produces the same primes on its leaves. In each case we end up with 2 x 3 x 3 x 3, but look at the different ways of getting there!\n\nAfter doing some examples like these, your child may naturally start asking some questions.\n\nWhy do some trees have more levels than others? Why are some trees broader than others? Why do the leaves always stop at primes? Why do the leaves always have the same list of primes, perhaps with rearrangement?\n\nThis last question is a really big question. It is so big it is called the Fundamental Theorem of Arithmetic. It says that each number has exactly one way of being expressed as a product of primes!\n\nYou may ask: Why is that so important? It says that primes are the multiplicative building blocks of numbers, and once you have found one way to build a number, that is the only way. If you know that 54 = 2 x 3 x 3 x 3, then there is no way, using whole numbers, to write 54 = 5 x ___ . The uniqueness of prime factorizations is at the heart of a lot of beautiful number theory.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_510b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These puzzles are the multiplicative version of the Addition Pyramids seen in Chapter 4. You are supplied with a target number and a pyramid of numbers. The challenge is to find a path of connected numbers down the pyramid so the product of the selected numbers is the target.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM510ProductPyramid.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "The target is 36 in this pyramid and the red lines indicate the path that works. Your child may notice that these puzzles are much easier if they start by doing the prime factorization of the target. Because 36 = 2 x 2 x 3 x 3, they know they must pick up those prime factors along the path and this helps guide the search. Having the adult know about prime factorizations also makes it much easier to create these puzzles.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_520a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a deck of cards with Q’s (as 0’s), A’s (as 1’s), and 2-9’s. Set the  target number at 100. Four random cards are chosen and used to make a pair of 2-digit numbers, a shared resource. \n\nEach player is dealt 14 random cards face up. Players alternate turns. During a turn, a player uses two cards to replace two of the four cards, and the resulting pair of numbers must add up to the target. A player passes if that is not possible. The first player to run out of cards wins. If both players become stuck, the player with fewer cards wins.\n\nSome options are to change the target number and to give players fewer or more than 14 cards. Another option is to use subtraction together with a smaller target number.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_520b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Choose a target number, say 100. Each player picks up five random cards from 0 to 9. Two 2-digit numbers are made out of these numbers, the fifth card is unused. The two numbers are added and the player closest to the target wins a point for that round. The highest number of points after a fixed number of rounds wins.\n\nOne option is to use three-digit numbers, a target number of 1000, and each player receives seven cards. Another option is to use subtraction with a smaller target number.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_520c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Once your child becomes comfortable with the Missing Number puzzles from a few pages earlier in this chapter, they can start these puzzles. In these, one or more of the digits are replaced by letters. The three rules for letters are: \n\n* A given letter is always the same digit\n* The leftmost digit of a number is never 0\n* Different letters must be different digits\n\nCreate these puzzles by taking an addition or subtraction problem and replacing one or more of the digits, as in the following examples:",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM520LetterSubstitution1.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "The puzzles can also be created to make interesting problem-solving challenges for your child. Note that the values of the letters do not carry over from puzzle to puzzle.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
          {
            name: "image_bottom_1",
            value: "EFM520LetterSubstitution2.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1",
          },
          {
            name: "image_bottom_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_530a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Imagine a billiard table that has a pocket in each of the four corners. When a ball bounces off the side of the table, it bounces away at the same angle it came in at. This investigation looks at the question: If we shoot a ball at a 45 degree angle from one corner, where will it end up? The answer depends on the size of the table. This is what happens on a 3 by 4 table.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM530BilliardBallBouncing.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "After playing with several of these, challenge your child to predict what the answer is in advance. Starting in the bottom left corner, which corner will be hit first and how many bounces will it take?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_530b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Suppose you have an 8 by 8 chessboard and you have a collection of 1 by 2 tiles. Finding a way to exactly cover the chessboard with 32 of these 1 by 2 tiles is simple enough. \n\nLet’s start playing around with removing squares from the chessboard. If you remove one corner of the chessboard, you know immediately that you can no longer cover the chessboard with tiles because the tiles will cover an even number of squares, and there are now 63 squares. Okay, remove two corners to make an even number of remaining squares - can you cover it now? The answer depends on which two corners you remove. Why? What if you no longer restrict yourself to removing corners, what happens?\n\nOne important lesson in dealing with questions like these is to learn from playing with smaller problems. Try these questions on a 4 by 4 or 6 by 6 board first.\n\nIf your child is enjoying these questions, start branching out to using other shapes to fill the board. Play around with filling it with 1 by 3 tiles or with 3 squares in an L shape. What patterns and rules do you discover with these? What other shapes might be interesting to play with?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_530c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "In which ways can you fill a square with other squares, where the other squares need not all be the same size? However, the side length of each square must be some whole number multiple of a fixed length. The question to investigate is: What are all the numbers of squares that are possible? If you know a number is possible, is there an easy way to describe how to do it?\n\nLet your child play with it over many days and don’t be in a hurry to get to the answer. Here is a diagram showing how 6 is possible.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM530SquaresInSquares.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "200px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "If your child enjoys exploring that question, explore variations on this theme. Suppose you only allow squares of certain sizes - such as 1 by 1, 2 by 2, and 3 by 3. Another direction to look at is  filling other figures with figures that have the same shape. For example, ask the same question for regular triangles (triangles with all their sides the same length). Some figures are interesting to investigate in this way, and some are not interesting at all - which ones?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_540a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value: "Use a shared piece of paper filled out as follows:",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM540ProductGame.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "The first player moves a token onto any number from 1 to 9 in the 1-9 squares. The second player puts another token on one of the 1-9 squares and claims the product in the 6 by 6 grid. From then on, each player chooses to move either of the two tokens and claims the product (if they can). The first player to claim 3 squares in a row wins.\n\nMix up the product numbers to give your child better practice identifying the products. See the Chapter 5 Bonus Material for designs of larger boards with larger ranges.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_540b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These puzzles have islands (circles and squares) connected by bridges (lines). If there are two circles on either side of a square, then the square holds the product of the two circles. The challenge is to fill in the missing numbers.\n\nMake these puzzles by filling in the circles, then filling in the squares, and finally removing some of the numbers before giving it to your child.\n\nIn addition to practicing multiplication, these puzzles can be structured to practice common factors as well. In the first puzzle, the only number, other than 1, that divides 14 and 21 is 7, so that is the number in the bottom circle.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM540IslandHoppingWithProducts.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "400px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_540c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "This game is lightly inspired by checkers. Each player has 10 counters. The counters are numbered from 1 to 10, with the “10” counter marked with 10 and 11. The counters start on the end rows of a 100-chart - one player on squares 1 to 10 and the other on squares 91 to 100.\n\nInitially, counters can only move “forward” one row onto any multiple of the number(s) on the marker they choose – for the player starting on 1 to 10, forward means larger numbers, and for the player starting on 91 to 100, forward means smaller numbers. Once a counter has made it all the way across the board, it becomes a king and can then move forward or backward one row after that. An opponent's piece is taken by landing on it. A player’s piece cannot double up with another of the same player’s pieces. You win by taking all your opponent’s pieces. \n\nFor younger players, shorten the board to use the first 6 rows – the numbers from 1 to 60. A child who does not know all the multiples yet can use skip counting to figure out the moves.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_550a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use three dice and an 8 by 8 board of numbers from 1 to 64. A player rolls the dice and uses addition, subtraction, multiplication, and division to make any unmarked number on the board. The player marks this square and receives one point for the square plus one more point for each marked square that it touches, including diagonally. If a player cannot make a play, any other player who finds a play can claim that score. Play five or more rounds, with the largest score winning.\n\nSome game options are to use a fourth die, and to use a smaller or larger board.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_550b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "You are given some weights and a design for a mobile that has some attach points. The challenge is to put at most one weight per attach point so the mobile will balance along every arm. Assume the wires are weightless. Each arm in the mobile is a lever that needs balancing, so these puzzles are an extension of the Lever Balance puzzle given earlier in this chapter - practice those puzzles before starting these.\n\nStart with the simplest mobiles, which are just levers in the air. Here is a solution for putting the weights from 1 to 4 on this mobile to balance it.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM550Mobile1.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "This works because 2 x 4 + 1 x 2 = 4 x 1 + 3 x 2.\n\nHere is a more complicated mobile. Use the total of the weights below it to balance each side of the top wire (1 + 3) x 3 = (4 + 2) x 2.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
          {
            name: "image_bottom_1",
            value: "EFM550Mobile2.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1",
          },
          {
            name: "image_bottom_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1_max_width",
          },
          {
            name: "text_bottom_2",
            value:
              "Go to the Chapter 5 Bonus Material for more examples and a longer discussion of mobiles.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_2",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_550c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "The premise is that you have a calculator that is badly broken and you are challenged to produce some result on the calculator. This is easy to play orally whenever you have a spare moment. Here are some examples to get you started..\n\nSuppose you had a calculator with +, -, x, and /, but only one working number key, the 4. Could you get the result 21? If so, what is the fewest number of steps you would need? Suppose you could use 4 at most four times - which numbers could you produce? Suppose you had to use the 4 exactly four times. Play around with having other single keys and creating other results.\n\nSuppose your calculator could only add 4 or 7. Which numbers could you produce? Suppose it had 4 or 7, but now it can add and subtract. Which numbers could you produce? This is the same activity we’ve seen in other settings.\n\nSuppose you only had a 1 key and could only add or double. For example, 2 x (2 x 1) + 1 is 5. What other numbers can you create?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_560a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a board with a 4 by 6 grid of numbers from 1 to 24. On a turn, a player chooses a number that is uncovered and has at least one factor uncovered – the player gets the selected number and the other player gets any or all of the uncovered factors (their choice as to how many). Play alternates until there are no legal numbers left. The players add up their numbers and the higher sum wins.\n\nThis can also be played as a solitaire puzzle, sometimes called Taxman. In this version, the one player selects each number and the taxman gets all the available factors. Play continues until the player no longer has a legal move - at that point, the taxman receives the remaining numbers. The goal is to have as large a sum as possible - bigger than the taxman when that’s possible.\n\nMake the range of numbers suit the ability of the players - it could be 1 to 12 or as high as 1 to 60.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_560b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Players start the game by secretly picking 5 distinct numbers larger than 20 and not bigger than 120. After they are selected, they are written where all can see them.\n\nUsing Number Cards or some other device, a random number from 1 to 20 is created. That number is repeatedly doubled until either someone’s number is hit for the first time or the number becomes bigger than 120. The first player to have all five numbers hit is the winner. \n\nAfter your child has played a few times, they will begin developing strategies for selecting their five numbers. A simple strategy is that it is a bad idea to pick a number, such as 46, that is not a power of 2 times some number between 1 and 20 - it will never get hit. Some numbers with lots of factors of 2, such as 32, are more likely to be hit because more starting numbers can get to them..\n\nThere are many other options to play with. You can triple the number each time instead of doubling it. You can double it and add one each time. For younger players, select numbers above 10 and not above 60, and select a random number from 1 to 10.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_560c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Have two sets of cards, say from 1 to 25. Play the standard game of war with these, only now the winner is the card that has more factors. For example, 12 beats 16 because 12 has 6 factors (1, 2, 3, 4, 6, and 12) while 16 has 5 factors (1, 2, 4, 8, and 16). The holder of the winning card must be able to correctly list the factors to win the cards - otherwise, the cards get shuffled back into each player’s draw pile. As with standard War, when there is a tie, then next cards are turned over and the winner receives all the cards.\n\nThere are several possible variations for you to play around with. You can play that the smaller number of factors wins. You can count the total of just the prime factors rather than all the factors. You can play that prime powers (numbers that are a power of a prime) beat other numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_570a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Each player starts with a 4 by 4 grid of numbers that are possible multiplication products - these numbers can either be randomly assigned or carefully chosen by the player.\n\nTo start, two cards are dealt and put face up on the table. If either player has the product of those two numbers, they cover it. From then on, the players take turns taking the top card from the draw pile and choosing which of the two cards to replace. All players who have a match with the product cover it. The first player to get 4 in a row wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_570b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a 100-chart with the 36 squares on the four edges colored gray. Use playing cards with picture cards removed or use Number Cards from 1 to 10. \n\nOn a turn, if you pick a 1 you can claim any odd number; if you pick any other number, you can claim any multiple of it. If you claim a number, your opponent cannot claim it. The aim is to make a path from one edge to the opposite edge, in either direction. You do not need to claim the squares in the order of your path. \n\nYou can either play that diagonal connections are okay or not okay. Another option is to include picture cards – if you get one of these, you can put in a blocked square that cannot be included in either person’s path.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_5_570c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "This multiplication puzzle is either 3 by 3 involving each of the numbers 1 to 6 exactly once, or 4 by 4 involving the numbers 1 to 8 exactly once. The challenge is to fill in some of the squares, two numbers for each row and each column, so that the product of a row is the number marked to the far left and the product of the column is the number marked above the column. Some rows or columns may not be marked - if so, there is no constraint on the product of those rows or columns.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM570CrossProducts3By3.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Solve this puzzle by finding columns and rows where you can identify the two numbers. The 30 column must have 5 and 6, and the 10 row must have 2 and 5. Next, the 12 column must have 3 and 4 and the 4 row must have 1 and 4. The rest follows quickly.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
          {
            name: "image_bottom_1",
            value: "EFM570CrossProducts4By4.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1",
          },
          {
            name: "image_bottom_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1_max_width",
          },
          {
            name: "text_bottom_2",
            value:
              "As is often the case with these puzzles, the adult can make them by filling in the numbers on the inside of the puzzle first, writing down the products, and then removing all the interior numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_2",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter5_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_290a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use compensation for sums between 11 and 18 to make them much easier. Suppose you’re adding 7 + 8. One person puts up 7 fingers and the other person puts up 8 fingers. Then, one person gives away as many fingers as are needed to put up 10 fingers on the other person’s hands. In this example, 7 + 8 could turn into 5 + 10 (giving away 2) or 10 + 5 (giving away 3). \n\nBe dramatic and give away the fingers by having one person’s hand bang into the other person’s hand and having the fingers transfer “magically.”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_290b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM290FingersFor8Plus3.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 70,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "Use “counting on” to make addition easy. Suppose you’re adding 8 + 3. For ease, pick the larger number being added to start the counting on. Have your child make a closed fist and say “8.” Then, lift one more finger each time as your child counts out loud “9, 10, 11.” When 3 fingers are raised, the counting stops. At that point, you  have that 8 plus 3 is 11.\n\nWith practice and further ideas, your child will memorize these math facts. However, there is no hurry for memorization and it can wait until more experience with the quantities and relationships between the numbers has been gained.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_290c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Subtraction can be thought of as “take away” or “difference,” and both models are essential to a complete understanding. Have your child practice both ways of thinking of subtraction using these finger subtraction methods. We’ll look at 11 - 3.\n\nWe’ll look at 11 - 3.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_side_1_left",
            value: "EFM290FingersFor8-3.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 70,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "100px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "Take Away: Start with a closed fist and say “11.” Then, lifting one more finger each time, count “10, 9, 8.” When your child sees 3 fingers raised, the counting should stop. At that point you have that taking 3 away from 11 leaves 8.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "text_downside_1",
            value:
              "Difference: This uses counting on, much as we did for Easy Way Finger Addition. What we are doing is finding out which number we need to add to 3 to get 11. Have your child make a closed fist and say “3.” Then, lifting one more finger each time, count “4, 5, 6, 7, 8, 9, 10, 11.” When your child says 11, there are 8 fingers raised - the difference between 3 and 11 is 8!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_downside_1",
          },
          {
            name: "image_downside_1_right",
            value: "EFM290Fingers11-3.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_downside_1_right",
          },
          {
            name: "image_downside_1_right_flex",
            value: 70,
            type: "set_variable",
            _nested_name: "activity_body.image_downside_1_right_flex",
          },
          {
            name: "image_downside_1_right_max_width",
            value: "140px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_downside_1_right_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_300a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These puzzles have shapes connected by lines. Each enclosed region has a number that is the sum of the shapes that border it. While circles may have any value, a non-circle must have the same value as any figure of the same shape. The puzzle is to figure out the numbers not supplied.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM300RegionSums.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Create these puzzles by making a diagram of circles and maybe some squares. Next, fill in all the figures with numbers and fill in the bounded regions with the sum of the figures that surround them. Finally, remove some of the numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_300b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Ready for some fun risk? During a turn, roll a die as many times as you want. When a roll is not 1, you add that roll to your turn’s total. If it is 1, you lose everything for that turn and the turn is over. A player may choose to stop before rolling a 1, keep the turn’s points so far, and add them to the player’s running total. The first player to reach the target number, say 30, wins.\n\nA two dice variation has these rules: If neither die shows a 1, the sum is added to the turn’s running total. If exactly one of the dice shows a 1, then nothing more is added to the running total and the turn ends. If two 1’s are rolled, the turn’s total becomes 0 and the turn ends.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_300c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use 5 dice and 4 rolls. On the first roll, choose to save from 0 to 5 of the dice. Once a die is saved it cannot be changed. Similarly with the remaining dice on rolls two and three. On the final roll, all dice are saved. Any score less than or equal to 20 counts, any score over 20 gives the player 0.\n \nThe target score of 20, the number of dice, and the number of rolls, can all be changed to suit younger or older players. For example, you could play this with a target of 12 and 3 dice.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_300d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These puzzles show how compensation creates easier problems. The challenge is to find a path that connects all the islands with the same answer. Two islands can only connect if their problem’s numbers differ by 1. Only some of the islands will be on the path.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM300IslandHoppingCompensation.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Make these puzzles by starting with about ten empty circles with some connections. Identify a path from one edge of the islands to the other. Along that path, put in problems whose numbers differ from each other by one. In the nearby islands, put problems with small changes that have different answers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_310a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Evenly split a shuffled deck of playing cards with the face cards removed. If you like, use dominoes instead. Both players turn over their top two cards and add them. The player with the larger sum wins all four cards. If the sums are equal, the next two pairs of cards are added and the winner gets all eight cards. Play this with a single pass through the deck or multiple passes. Either way, the winner is the player who has the most cards. \n\nFor variety, play this using the difference of the two cards. Or, you can add three cards at a time. Another option is to assign one person to be Odd and the other Even. For this, each player turns over a card and the evenness or oddness of the sum determines who gets the cards.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_310b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Agree on a target sum, say 10. Remove the face cards and deal seven cards to each player. The remaining cards become a draw pile, and its top card is flipped over to start the discard pile. The goal is to hold seven cards that are broken into separate groups of one or more cards that add up to the target. During a turn, the player has the choice of picking up the top card of the discard pile or the unseen card at the top of the draw pile. That player then discards a card. When a player successfully fills their whole hand, the player lays down the hand and says “Gin!”\n\nTaking the difference with pairs of cards can be used instead of addition. In that case, deal an even number of cards to each player.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_310c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "The DiffTriangles puzzles have triangles and squares that share sides. A triangle always has exactly two squares on its sides, and the remaining side has either a triangle or is empty. A triangle’s number is the difference of the two adjoining squares. The challenge is to supply the missing numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM310DiffTriangles.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "SumTriangles puzzles use addition in place of subtraction. The value of a triangle is the sum of its two or three square neighbors.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
          {
            name: "image_bottom_1",
            value: "EFM310SumTriangles.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1",
          },
          {
            name: "image_bottom_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1_max_width",
          },
          {
            name: "text_bottom_2",
            value:
              "Making puzzles without loops is easy. Draw an alternating sequence of squares and triangles, and then put in numbers starting at one end working your way to the far end. When you are done, remove some of the numbers. Look at the Bonus Material for ideas on how to make these puzzles with loops.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_2",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_320a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "The ease of practicing math facts using flash cards makes them tempting. However, they are often abused by well-meaning helpers and can contribute to math hatred. Beyond the psychological damage that occurs with overly-enthusiastic drill, using flash cards misses out on learning important relationships between numbers. Feel free to use flash cards to give focused practice for a small handful of facts, but please keep the practice very relaxed. \n\nThis page has methods that practice structural insights until the facts become automatic.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_320b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "To do the activities on this page your child should know how to mentally do the following:\n\n* add and subtract 0, 1, 2 (and perhaps 3)\n* do adding twins and near twins\n* know the number bonds for 10\n* add 10 to single-digit numbers. \n\nIf your child is weak with any of these skills, this is the time to practice those skills some more.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_320c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Compensation is a powerful technique for making mental math easier. When adding two numbers, you can get the same sum by shifting over part of one number to the other. Adding 8 or 9 is easy using compensation. For example, add 6 + 9 by shifting 1 from the 6 to the 9, which gives 5 + 10. Similarly, 4 + 8 becomes 2 + 10.\n\nUse compensation from twins and near twins for what remains:  3 + 5, 3 + 6, 4 + 7, and 5 + 7.  For example, 5 + 7 is the same as 6 + 6.\n\nSome math facts can be done several ways. Challenge your child to find more than one way to do a problem. For example, 5 + 7 can become 6 + 6, but it can also become 2 + 10. This kind of math play will lead to lasting insights.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_320d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Before starting these subtraction activities, practice any of the following skills that happen to be weak for your child:\n\n* add and subtract 0, 1, 2 (and perhaps 3)\n* subtract numbers 1 or 2 apart\n* know  the number bonds for 10 and how they make subtracting from 10 easy\n* subtract 10 from numbers from 11 to 19.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_320e_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "For problems with numbers larger than 10, such as 13 - 8, break them into two differences. The distance from 13 to 8 is the distance from 13 to 10 plus the distance from 10 to 8. So, 13 - 8 becomes (13 - 10) + (10 - 8) = 3 + 2 = 5.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_320f_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Compensation for subtraction means adding or subtracting the same amount for both numbers to maintain their distance. Use compensation on 13 - 8 by adding 2 to both numbers to turn the problem into 15 - 10. Single-digit problems can also be done this way. For example, 3 can be added to both numbers in 7 - 3 to make it 10 - 6.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_325a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Start by laying out all the playing cards from 1 to 5 in a 4 by 5 grid. Start the running total at 0 and choose a target number, say 25. Players take turns choosing and turning over one of the numbers and adding that number to the running total. The last player to pick a number that does not run over the target number wins. \n\nReplace using 1 to 5 with any set of five numbers you want practice adding. To practice subtraction, start at the target number, subtract the selected numbers, and don’t allow going below 0.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_325b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a set of dominoes that either go from 1 to 6 or 1 to 9. Each player starts with 5 random dominoes without letting the other player see them. The aim of the game is to be the first player to get rid of all their dominoes. \n\nTo start, a random domino is placed face up in the middle. After that, a player must match the top domino in the middle. Matching means that the two numbers on the top domino can be combined with any operation – add, subtract, or even multiply if you want – to make the same result as some, possibly different, operation acting on the two numbers of one of your dominoes. For example, if [1,5] is on top, then it matches [2,4] because 1+5 = 2+4, and it also matches [2,2] because 5-1 = 2x2. The matching domino is placed on top of the previous top. If you can’t make a match, you must pick up a new domino from the pile.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_325c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use number cards 1 to 13. To start, each player is dealt 6 cards face up. There is a draw pile with one card turned over to start a discard pile. \n\nDuring a turn, a player takes the top discard card or the unknown card at the top of the draw pile. The chosen card must replace a card they already have, and the replaced card is discarded. The goal for each player is to create a 6-card pyramid where each card is the sum of the two below it. The first player to achieve this wins. \n\nExperiment with smaller or larger ranges of cards to accommodate the skills of younger or older players.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_325d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a deck of cards with numbers from 1 (Ace) to 10. On a shared piece of paper, draw 20 boxes or simple houses numbered from 0 to 19. Each player has 7 tokens distinct from the other player’s 7 tokens. \n\nDuring a turn, a player selects two random cards, and can choose to add, subtract, or multiply them to put their token in a house with fewer than three of the opponent’s tokens. If the house contains one or two of the opponent’s tokens, those tokens are given back to the opponent and the player says “Get out of my house.” The first player to put all their tokens in houses wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_330a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Your child has already practiced skip counting, probably by 2’s, 5’s, and 10’s between 0 and 20. Now is the time to start practicing general skip counting by any number from any number.\n\nSkip counting up and down by single-digit numbers helps with adding and subtracting, as well as multiplication and division. This is a lot to learn, so please expect it to take time. The tricky part in skip counting is when the tens digit changes, so be sure to focus on that. This is a handy activity to do when you are traveling or waiting around with some extra time.\n\nSkip counting by 10’s is tied to understanding that two-digit numbers are made up of a tens place and a ones place. Skip counting by 10’s will be easier if your child can look at a 100-chart.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_330b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Create a random 2-digit starting number using two playing cards from 1 to 9 - the first card will give you the tens place and the other the ones place. Starting at that number, you are allowed to use a total of 5 jumps each of which is either by 1 or 10. The goal is to get as close to 50 as possible, and the score is the difference from 50. The lowest total score after several rounds wins.\n\nYoung players benefit from referring to a 100-chart. Using that chart will also emphasize place value as they go up or down by 10.\n\nYou can vary this game by allowing steps of 1, 2 or 10, or steps of 1, 2, 5, or 10. Also, use target numbers other than 50 sometimes.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_330c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These puzzles have islands (circles) connected by bridges (lines). In this version, the connections are made by skip counting. Some of the islands have numbers written on them and some will start off blank. Above the puzzle is the starting number, ending number, and the skip amount. The challenge is to fill in the missing numbers and find the path. You can also place the numbers and blanks on the floor to make a stepping puzzle.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM330IslandHoppingSkipCounting.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "As with the Skip Counting activity, create puzzles to practice going forward or backward starting at a variety of numbers, not just numbers that are a multiple of the skip amount. \n\nCreate these puzzles by making the islands first, filling in the skip counting numbers, connecting those islands in the correct order, and then adding some additional connections to help make a puzzle out of it. In the version you give your child, remove some numbers leaving enough of the numbers so that it can still be figured out.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_340a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a Tic-Tac-Toe board and tokens with the numbers from 1 to 9 on them. One player has the odd numbers and the other the even ones. Players take turns placing a token, with the Odd player going first. The first player to complete 3 in a row whose sum is 15 wins. One variation is to keep going, fill all the squares, and see which player made the most 15’s. \n\nA related game is to have an attacker and a defender. The attacker goes first (the first move cannot be a 5 in the center) and tries to get 15, and the defender tries to stop the attacker.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_340b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "There are many versions of this game. The idea is always the same: deal a grid of cards face down, say 4 by 4, and the players take turns turning over two cards. If the cards match, the player keeps the cards, two more cards are dealt into the empty spaces, and the player gets another turn. If the cards don’t match, the cards are turned back over and the player’s turn ends. The player with the most cards wins.\n\nHere are other ideas for how cards can match:\n\n* Use a target sum - two cards match if their sum is the target.\n* Use a target difference - two cards match if their difference is the target.\n* Use cards with addition or subtraction problems together with cards that have the answers - cards match if the problem matches the answer.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_340c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Start with a number line that goes from 1 to some number, say 20. During a turn, choose two numbers and a result, none of which have been crossed out, and write down an addition or subtraction equation that involves those numbers. The two numbers in the equation are crossed off, and the result is circled. \n\nThe next player must use the result as one of the two numbers. If it is played competitively, the winner is the last player with a legal move. It can also be played cooperatively to see how few numbers are left untouched.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM340PairingDown.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_340d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "This starts with a 4 by 4 grid of numbers with a target sum. The challenge is to find entries to remove so that the sum of the remaining numbers in every row and column is the target. An alternative version uses individual target sums for each row and column.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM340FixIt.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Make these puzzles by putting in pairs or triples of numbers that sum to the target sum. Then fill in the remaining spaces with decoy numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_350a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value: "This helpful device shows how two-digit numbers are formed from tens and ones.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM350ExpandedFormFoldingPaper.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Take a piece of paper that exactly fits four Number Cards side by side. Mark the paper with: <space> - “0” - “+” - <space>. It should have vertical folds on both sides of the “+” sign. Paper clip numbers to the two spaces. For example, if you use 2 and 3, folded up this looks like 23, but unfolded this becomes 20+3.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_350b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "One player thinks of a number between 0 and 99. The other player figures out the number by asking questions about the tens and ones digits.\n\nSuppose the number is 23. The player could ask if the tens digit is bigger than or equal to the ones digit - it isn’t for 23. The player could ask if the sum of the two digits is less than 8 - it is for 23. The player could then ask if twice the tens digit is bigger than the ones digit - it is. At this point, the number must be 23 or 34. Asking if the sum of the digits is less than 6 finishes things off.\n\nThe types of questions can be anything the players agree to, but it is best if the questions involve the ones and tens digits.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_350c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Select 20 numbers from 0 to 99. Write those numbers on pieces of paper (cards). For each of those numbers, write an expanded form of that number on a card. For example, create 50 + 3 for 53, 30 + 0 for 30, and 0 + 7 for 7. Take those two decks of 20 cards and shuffle them together. Now play the Memory Challenge game as usual, where matches occur when a regular number is paired with its expanded form.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_350d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "A rectangular grid of numbers is given with some of the numbers filled in. The challenge is to fill in the remaining numbers so that any two numbers that share a side only differ in a single place, and the difference of the digits in that place is 1 (including going between 0 and 9). No number may be used more than once in the grid. Using a 100-Chart may be helpful for beginning solvers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM350IslandHoppingby1sAnd10s.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Make this puzzle by taking an empty grid and filling it with numbers, with no number repeated. Next, remove some of the numbers, making sure that it is not too hard for your child. In the example, the red numbers are the missing ones.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_360a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Write the numbers 5, 10, 25, and 50 vertically on a piece of paper. Put a single blank space on each side of the 5, and two blank spaces on each side of the other numbers. One player fills in the blanks on the left side and the other fills the other side. Each player also has one extra blank to use once with a number to ignore.\n\nPlay with a deck of Number Cards from 0 to 9. Randomly pick a card from the deck, and put it back in after it is used. Both players must use that number somewhere in the spaces that haven’t been filled in yet. Once all the spaces are filled, the player’s values are compared to each of the target numbers. Whichever player gets closest to each target number gets a point, with both players getting a point if they are equally close. Whoever has the most points wins.\n\nVary this game by having a different set of target numbers. You can also choose to score the game by summing up all the errors for each player. For this, the player with the smaller score wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_360b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Shuffle a deck of playing cards with the face cards and tens removed, and split it evenly between two players. Each player turns over two cards and puts them side by side to form a two-digit number. The player with the larger number keeps all four cards. If there is a tie, each player turns over two more cards with the winner getting all eight cards. After one or more passes through the cards, the player with the most cards wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_360c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Traditionally, the target number is 21, but for a young child use a smaller number such as 12. Adjust the contents of the playing cards for your child. For example, for a very young child this might be the cards 1 to 4 in the four suits. \n\nTwo cards are dealt to each player - one is face up and one is face down (the receiving player is the only one to look at the face down card). During a turn, the player has the option of asking for one more card until the player decides to stop. After every player has had a turn, the players compare the sum of their cards. The player with the sum closest to the target without going over wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_360d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Shuffle a deck of playing cards with the numbers 1 to 9. Deal two cards to each player face down. Then, each player turns over one card and decides whether that card will be the tens or ones card. After deciding, each player’s remaining card is turned over and is used to fill the remaining place. The player with the larger number wins. You can also play that the smaller number wins. You can decide whether it is more dramatic to show the cards as they are turned over, or wait until all the decisions are made and the final numbers are formed.\n\nTo practice a bit of addition, as well as making the decisions trickier, draw three cards to turn over one at a time to form a two-digit number and a single-digit number. The goal is to create the largest sum of the two numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_365a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a deck with the picture cards removed. Fill a tic-tac-toe board with randomly generated numbers from 1 to 20. Use a larger range if you want to include multiplication.\n\nDeal 6 cards to each player and then flip them all over at the same time. For the first play, it is a race among the two players – the first player to combine two or more of their cards to match one of the squares gets to put an X there and replaces the cards they used. After that, the players take turns putting an X or an O in a chosen square whose value they can match – the cards used for the match are replaced by drawing new ones. If no match can be made, they lose their turn and can choose two of their cards to replace with new ones. The first player to get 3 in a row wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_365b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use three dice and a board with three rows of five squares numbered from 1 to 15 . A player rolls the dice and uses addition and subtraction to combine the three numbers to match one of the numbers on the board. The matched number is crossed out and claimed. If a player can’t find a match, the other player gets a chance to use the numbers and claim the result - in any event, the other player gets the next turn. The winner is the one with the most claimed numbers after a fixed number of turns.\n\nA smaller version would use two dice with the numbers from 1 to 10, and a larger version would use 4 dice and the numbers from 1 to 20.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_365c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a deck with the  picture cards removed – you can leave in the Queens and use them as 0’s if you like. Before play starts, agree on a set of “poison” numbers for the round. The poison numbers can be any set of numbers you want your child to practice with. Some examples are: \n\n* even numbers\n* odd numbers\n* square numbers (1, 4, 9, 16)\n* prime numbers (2, 3, 5, 7, 11, 13, 17, 19)\n* multiples of a number, such as 3\n\nEach player starts with three cards. The first player discards a number that is not a poison number and replaces it from the draw pile. The next player discards a number so that the sum of the first two numbers is not a poison number and replaces the discard from the draw pile. The next player plays so that the sum of the three cards is not a poison number, and so on. The first player unable to discard a legal card loses. This game works equally well with more than two players.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_370a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              'These "magic" puzzles are one-time challenges. Let your child spend time with them, wrestle with them, and have the satisfaction of figuring them out.\n\nMake a triangle of six circles with three circles on a side. Use each of the numbers from 1 to 6 once so that each side of the triangle has the same sum. This involves two challenges - finding out which sums will work and then figuring out how to get those sums. It is better to let your child play with this to figure out which sums are possible, but if frustration wins out, the possible sums are 9, 10, 11, and 12.',
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM370CircleGraphs1to6MagicCircle.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "If your child enjoys figuring this out, this can be done for larger triangles as well. For a triangle with nine circles with four circles on a side, the possible sums are 17, 19, 20, 21, and 23.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_370b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These are similar to the Magic Triangles puzzles. They have circles connected in a geometric pattern and an associated collection of numbers. The goal is to put the numbers in the circles so every straight line of connected circles has the same sum. The answers are in the Resources file.\n\n1. The numbers 1 to 4 are in a plus sign shape with no circles in common.\n2. The numbers 1 to 5 are in a plus sign with one circle in common in the middle.\n3. The numbers 1 to 7, lines of 3 circles, with one common circle in the middle.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "text_upside_1",
            value:
              "4. The numbers 1 to 9, lines of 3 circles, with one common circle in the middle.\n5. The numbers 1 to 5 in an L shape with one common circle in the corner.\n6. The numbers 1 to 8 are in a plus sign with no circles in common.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_upside_1",
          },
          {
            name: "image_upside_1_right",
            value: "EFM370CircleGraphs1To9Star.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_right",
          },
          {
            name: "image_upside_1_right_flex",
            value: 80,
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_right_flex",
          },
          {
            name: "image_upside_1_right_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_right_max_width",
          },
          {
            name: "text_side_1",
            value:
              "7. The numbers 1 to 9 are in a plus sign with one circle in common in the middle.\n8. The numbers 1 to 12 are in a star shape. This has 6 directions of lines of 4 circles. Hint: The sum is 26.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "image_side_1_right",
            value: "EFM370CircleGraphs1To12StarOfDavid.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right",
          },
          {
            name: "image_side_1_right_flex",
            value: 80,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right_flex",
          },
          {
            name: "image_side_1_right_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right_max_width",
          },
          {
            name: "text_downside_1",
            value:
              "9. The numbers 1 to 7 are in an H shape - 3 vertically on the left, 1 in the center, 3 vertically on the right. The five possible lines of 3 are connected. Hint: The sum is 12.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_downside_1",
          },
          {
            name: "image_downside_1_right",
            value: "EFM370CircleGraphs1To7H.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_downside_1_right",
          },
          {
            name: "image_downside_1_right_flex",
            value: 80,
            type: "set_variable",
            _nested_name: "activity_body.image_downside_1_right_flex",
          },
          {
            name: "image_downside_1_right_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_downside_1_right_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_380a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Here’s a fun way to make a long addition problem into a much simpler problem. Use an adding problem that has several number bonds for 10. Instead of adding 3 + 8 + 9 + 4 + 7 + 6 + 2 the usual way from left to right, rearrange the terms to put the number bonds together. This example would become (3 + 7) + (8 + 2) + (4 + 6) + 9, which is just 10 + 10 + 10 + 9 = 39.\n\nOnce this is easy, include trickier problems such as 4 + 8 + 9 + 5 + 3, which can be rearranged as  (8 + 9 + 3) + 4 + 5 = 20 + 9 = 29. Have your child make a habit of looking for ways to simplify long expressions to make these calculations easier.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_380b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Your child already knows how to multiply by 2 by simply doubling. This is an exciting time when your child learns a lot more about multiplication.\n\nBy now, your child is so familiar with addition that it’s no surprise that 2 + 3 is the same as 3 + 2.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM380MultiplyingCommutes.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "240px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Although not as obvious, the same is true for multiplication. This illustration should make it easy to see that two rows of three is the same as three rows of two – you’re just changing your point of view!\n\nIt doesn’t matter which order you multiply two numbers – you get the same answer either way!\n\nIn addition to being cool in a nerdy way, it also means that your child needs to master only about half as many multiplication facts – once your child knows 3 x 4, they also know 4 x 3.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_380c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "All that skip counting practice your child did paid off in getting much better at addition and subtraction. It also will be a big help in getting started with multiplication.\n\nAlthough skip counting is not the fastest way to find a result, it is reliable. Suppose your child needs to find 7 x 3. Do this by skip counting by 3’s seven times or skip counting by 7’s three times.\n\nYour child will eventually memorize these facts, but skip counting is a handy method for now.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_380d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "For someone good at adding, multiplying by 3 and 4 can be quick and easy.\n\nMultiplying a number by 3 is adding the number to double the number. So, 3 x 6 is 6 more than double 6, which is 6 + 12.\n\nMultiplying a number by 4 is doubling a number and doubling it again. So, 4 x 7 is 2 x (2 x 7), which is 14 + 14.\n\nAt this point, your child should be comfortable quickly doing all the multiplying up to 5 times 5, which is a huge leap forward!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_390a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "This starts with a 3 by 3 that has target sums given for each row and column. Some of the numbers from 1 to 9 are already placed in the grid. For the numbers that are not yet placed, the challenge is to place them to make the row and column sums be the target values.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM390SumSquare.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "240px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "To make one of these puzzles, start by placing pieces of paper with the numbers from 1 to 9 on a 3 x 3 grid. For each row and column, write the sum to the right or below. Then, remove some of the numbers from the grid. Lastly, hand the pieces of paper with the numbers you removed to your child and ask “where were these?”\n\nOne variation that keeps the sums smaller is to use the numbers from 0 to 8 instead. A harder variation is to do the same thing with the numbers 1 to 12 in a 3 by 4 grid.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_390b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "One person gives two numbers, one a sum and the other a difference, and the other person is challenged to find the two numbers that have that sum and difference. For example, if one person says the sum is 12 and the difference is 6, the other person says the numbers are 3 and 9.\n\nBecause of how easy it is to create these questions, this is a good activity to let your child be the questioner. Not all combinations of numbers for the sum and difference will produce reasonable answers. If you start with two numbers and then say their sum and difference, that will guarantee that there is an answer.\n\nChallenge an older child with the question of why some sums and differences have reasonable answers and others do not.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_390c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "A pyramid of 10 numbers placed in 4 rows is given with a target number. The challenge is to find a path through the pyramid using one number from each row so that the sum of the numbers is the target number. The numbers on the path must connect to each other.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM390AdditionPyramid.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "240px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Make one of these puzzles by filling in the numbers that you want to form the path, and record the sum of those numbers. Then fill in the remaining decoy numbers in the pyramid.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_400a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These investigations are for your child to play with and think about. There is deeper mathematics involved with each one, but your child is too young to have the necessary background. For now, let your child play with and be amazed by the patterns that occur.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_400b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "In a peculiar garden there are two kinds of flowers. One has 4 petals and the other kind has 7 petals. A child was asked to pick some flowers so that the total number of petals was 13. Could it be done? How about 15 petals? For which numbers of petals is it possible? For numbers that are possible, can it be done in more than one way? For example, 32 petals is four 7’s and one 4, and it is also eight 4’s.\n\nBy varying the numbers, there are lots of examples to play with. For some pairs of numbers there comes a point where all numbers of petals are possible, and for other pairs of numbers there is no such point. For 4 and 7, every number from 18 on is possible. For 3 and 6, there is no point after which all numbers occur.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_400c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Suppose your child likes to take steps two at a time sometimes, but one at a time other times. If your child wants to go up some steps, a natural question is: How many ways can this be done?\n\nFor example, for 0 steps there is just one way - you just stand there. For 1 step there is one way. For two steps, you can either take a one double step or two single steps. \n\nYour child should carefully count many cases of this and then make a table of the results (when there is lots of information, a table often helps). The start of the table would look like this:",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM400FibTableTo9.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "After looking at these numbers, your child may notice that each pair of numbers adds up to the next number. Why does this happen? These numbers are called Fibonacci Numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_4_400d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "A balance scale is a simple device for telling when two things have the same weight. The scale is usually supplied with a set of weights that are used to measure the weight of objects. There are some interesting investigations you can do if you restrict the weights you are allowed to use.\n\nFor example, if you only have weights that are 4 units and 7 units, then the things you can weigh exactly are the same as you found in the flower petal investigation.\n\nWhat happens if you have one weight each for each of the weights in a doubling progression of 1, 2, 4, 8, and 16? How many ways can you weigh something that weighs 13? What is the largest weight you can measure? This situation is related to the binary number system.\n\nWhat happens if the weights are the Fibonacci Numbers? Is there more than one way to weigh some weights? Find a restriction that would cause there to be only one way for each weight.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter4_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_180a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "All players start with one finger raised on each hand. During a turn, a player has the choice of either “attacking” or “splitting.” \n\nTo attack, a player takes a live hand and attacks a live hand of an opponent. The result is that the opponent's hand has the sum of the two hands and the attacking player’s hand is unchanged. If a hand ends up with exactly five fingers, it is dead. If the hand has over five fingers, its count is either reduced by five (in one set of rules) or is dead (an alternate set of rules). \n\nTo split, a player bangs their hands together and redistributes the fingers between the two hands. A split may not reverse the two finger counts.\n\nA player wins when both hands of everyone else are dead. In one variation, the first player to have two dead hands wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_180b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Have your child count some small number of objects. While they look away, change the number of objects. When they look back, ask what change you made. They can test their theory by reenacting what they think happened. \n\nOnce this becomes easy, you can have them be more creative with their answers. For example, if 4 became 6, the answer might be that you doubled the 4 and then took 2 away.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_180c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Numbered circles are connected in an upward fashion, and every circle is the sum of all the circles directly below and connected to it. \n\nThe easiest puzzles have most of the circles filled in. For older children, there are variations that involve larger numbers and cleverer solutions.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM180SimpleShapeSums.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "One option is to use non-circular shapes. While the value in a circle may duplicate the value in some other circle or shape, the value in a non-circular shape must match the value in all other places with the same shape. For example, all squares have the same value. Use matching to practice adding twins, near twins, and halving.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
          {
            name: "image_bottom_1",
            value: "EFM180ComplexShapeSums.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1",
          },
          {
            name: "image_bottom_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1_max_width",
          },
          {
            name: "text_bottom_2",
            value:
              "Make these puzzles by starting with a diagram that is completely filled in and then removing some numbers. If the puzzle has some repeated numbers, use a square or other shape instead of a circle for that repeated number.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_2",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_190a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Welcome to the world beyond 10 fingers! There are wonderful things to discover here. The next group of numbers from 10 to 20 is 10 more than the numbers your child already knows. But, before this can become easy, your child needs to conquer the crazy names we use for eleven, twelve, and thirteen.\n\nThe next games are designed to emphasize the role that 10 plays in connecting pairs of numbers such as 6 and 16. These games also emphasize the idea that 16 should be thought of as 10 plus 6. This view of decomposing numbers using place value will be much more important as your child counts to 100 in the next chapter.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_190b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "If you don’t have them already, create some extended decks of counting cards from 0 to 20. One deck will be normal numbers, one deck will have the numbers in expanded form from 0 to 20 as 0 + (0 to 9), 10 + (0 to 9), and 20 + 0, and one deck will use ten frames.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM190NumberCardsto20.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "400px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_190c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Place a random collection of 16 Number Cards from 0 to 20 with expanded form on a 4 by 4 bingo board for each child. Then, mix up a collection of counting cards from 0 to 20. Select one card at a time from this pile until the first child gets four in a row and yells Bingo!\n\nOne important variation of this game is to do a “Tens-Reversed” version using cards with numerals. When a card is chosen, if it is 1 to 10, then 10 is added to find the matching value, and if it is 11 to 20, then 10 is subtracted for the matching value.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_190d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "This version of the Memory Challenge game uses a Number Card deck from 0 to 20 with the rule that two numbers match if they are 10 apart. If you also have cards from 0 to 20 that use expanded form or ten frames, you should use those too. Deal a 3 by 4 grid of cards out on the table, all face-down.\n\nPlayers take turns flipping two cards face-up. If the two cards are ten apart, the player gets to keep the cards, replaces the two cards from the draw pile, and continues their turn. If the cards do not match, the player flips the cards back over and ends their turn.\n\nThe game ends when the last pair of cards is taken. The player with the most cards wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_200a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Here are some geometric concepts your child can play around with. The first is the idea of similarity. Two shapes are similar if they have the same shape except that one is smaller or larger than the other. Challenge your child to pick a picture and draw it twice as big or twice as small.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM200SymmetricArt.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Another geometric concept to play with is mirror symmetry. Your child can see this by taking a mirror with a flat side and putting it down along its edge on a drawing or photo and seeing what the mirror image looks like. Once your child has the idea, give your child half of a picture and challenge them to draw the mirror image.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_200b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM200SimTriangle.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 80,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "160px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "The two players have different colored markers. Place six (use more for a harder game) dots evenly around a circle. Players take turns drawing lines between the dots using their color. The loser is the first player forced to create a triangle all of whose sides have the player’s color and whose corners are on the circle. In the illustrated game, green moves next and must lose.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_200c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Using something small, such as pieces of food, challenge your child to make shapes with a given number of pieces. These shapes can be rectangles, triangles, squares, or anything fun.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM200NumberShapes.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Investigate which numbers are even and odd by using number shapes. For any number, ask your child to put the pieces into two rows that have the same number in them. This is something you would do if you were splitting the food evenly between the two of you. For which numbers does it work out evenly?",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
          {
            name: "image_bottom_1",
            value: "EFM200SquareOfOddNumbers.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1",
          },
          {
            name: "image_bottom_1_max_width",
            value: "220px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1_max_width",
          },
          {
            name: "text_bottom_2",
            value:
              "Once your child knows what an odd number is, investigate adding up the first few odd numbers as shown in this diagram. Amazingly, the sum of the first odd numbers is always a square number.\n\nYour child may notice that for some numbers, such as 12, there are different shapes of rectangles that can be made, and that for other numbers, such as 7, only flat rectangles can be made. If you want to, you can tell your child that numbers such as 5 and 7 are called prime numbers because there is no  way to break them into normal rectangles.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_2",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_210a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Very gradually, introduce multiplication to your child by a small change in language - start referring to doubling a number as taking “two of it” or as “multiplying it by 2.”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_210b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Set a starting total, say 20. Let your child choose whether to go first or second. During the first turn, a player chooses to subtract 1 or 2 from the current total. After the first turn, a player may subtract any number from 1 up to twice the number used on the last turn. The first person to reach 0 wins (an alternative rule is they lose). Once children learn to play this without writing anything down, it is a fun travel game.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_210c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a small collection of Number Cards involving some small quantities. Start with combinations of three cards and work your way up to more cards. \n\nSuppose the numbers are 1, 2, and 3. The question is: If you randomly pick two cards and add them, are you more likely to get an even or odd number? Count how many ways there are of getting an odd number versus an even number. For example, in the case of using 1, 2, and 3, there is one way to get an even number (1 + 3) and two ways to get an odd number (1 + 2, 2 + 3). So the odd number sums are more likely.\n\nTo make a game of it, let one player be Even and the other player be Odd. See who has the most successes after a dozen trial runs.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_210d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "In addition to being good practice, skip counting is a faster way to count a collection of things, such as toes, than counting them one at a time. \n\nCount by 2’s while pushing your child on the swings. Start by alternating with your child - you say 1, your child says 2, you say 3, your child says 4, and so on. After establishing the pattern, one of you can say their part without the other person saying anything.\n\nWhile traveling, find something fun to skip count like yellow cars. Skip count up or down by 2’s ending by 20. Initially, do this starting at 0 or 20, but eventually, start at any number.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_210e_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Two players agree on a target number, say 20, set their running total to 0, and choose who will go first. A turn starts by generating a number using one die or the sum of two dice. If the number is odd, the player must double it. If the number is even, the player may take half of it as many times as is desired as long as the numbers being halved are even. The player then adds that final result to the running total as long as that does not put the total over the target - if the final result cannot be used, the turn is skipped. The player who brings the total exactly to the target number wins. \n\nThere are a few variations. You can allow the player not to change the initial number. You can allow halving at most once. Finally, you can practice subtracting by starting at the target number and subtracting your way down to 0.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_220a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a grid of numbers with a target sum. Find groups of two or three numbers that add up to the target. The members of a group must share sides. Use tokens, such as different types of food items, to identify each group within the puzzle. When complete, the entire puzzle will be made up of identified groups.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM220NumberBlobs.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Create these puzzles by starting with an empty grid and working your way around the grid using pairs and triples that add up to the target sum. It’s more fun if the puzzle has just one solution, but don’t worry about it.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_220b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Using a target sum that your child is comfortable with, remove cards at or above that target from the Number Card deck. If there are more than two players and you have restricted the numbers significantly, you may need to use several decks. \n\nPlay starts by dealing 5 cards to each player. Put the remaining cards in a common draw pile. Players take turns “fishing” for cards whose number will sum to the target sum with cards they already have. \n\nFor example, a player might ask a player, “Do you have any 4’s?” If that player has some 4’s, they are handed over and the original player gets another turn. However, if that player does not have any 4’s, then the player says “Go Fish!” and a card is drawn from the draw pile. If the drawn card matches with a card they have, the player may have another turn; otherwise, the turn is over and play continues to the left. \n\nWhen a player has a pair of cards that sum to the total, the player puts that pair on the table in front of them. The game is over when all cards are in pairs. The player with the most pairs wins.\n\nTo create some variety, allow players to use more than two cards to create a group of cards that sum to the target sum. Another possibility is to say that two cards match when their difference is a specified target difference.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_220c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Depending on how many children are playing, there are two ways to play this.\n\nAdult with two children: Each child draws a card and places it on their forehead facing out without seeing it. You announce the sum of the cards and the children are challenged to figure out their own card by looking at the other child’s card.\n\nAdult with one child: Create several pairs of cards in advance where each pair of cards has the same total known to all. The unused cards are moved to the side. Pick up one random pair of cards, place the cards on your foreheads, and figure out each card by looking at the other person’s card.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_230a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use one deck (two if there are several players) of cards that go from 0 to 20. Each player is dealt four cards face up in the order they are dealt, and the remaining cards form a draw pile.\n\nYou can either play that a player must select one of their existing cards in advance or, the friendlier version, that the card can be selected after seeing the new card. Either way, one of their cards is replaced by the top card of the pile and the replaced card is put on the draw pile bottom.\n\nThe first player to get their cards in order wins. Make this easier by allowing duplicate cards. Make this harder by using more cards in a hand.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_230b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Each player draws a staircase with anywhere from 4 to 10 steps (more steps for older players).",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM230OrderedSteps.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Create a number using Number Cards numbered from 0 to 9. The first selection will be from the cards 0 to 1, and this is the tens digit. Then select a ones digit from all the cards. The two digits together form the number. If possible, the player must place this number on their steps. The first player to fill their steps in increasing order from bottom to top wins. Make it easier by allowing neighboring steps to have the same value.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_230c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Start with a deck of Number Cards that go from 0 to 40 (higher with more players). Deal ten cards to each player (fewer cards for younger players). The dealt cards are placed in front of each player in the order they are dealt. The remaining cards are placed face down in a draw pile. The top card is placed facing up as the first card in a discard pile. The goal of the game is to get the cards in ascending order from left to right.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM230OrderingCards.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "During a turn, a player may select either the top card of the discard pile or the draw pile - this card must be used to replace one of the cards in front of the player, and the replaced card is put face up on the top of the discard pile.\n\nYou can play that the first player to get their cards in order wins, and that’s all there is to it. Or, you can use a point system for each round of play. In this system, the winner receives 15 points. The other players receive one point for every card they have in order starting with their lowest card.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_235a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a deck of cards from 1 to 10. Choose a target sum, say 10. Each round starts by dealing five cards face down on the table. One player chooses three of those cards and turns them over. Two cards are chosen from those three to add up as close to the target as possible. The unused three cards are given to the other player to choose two cards to get close to the target. The player closest to the target from either side wins a point. \n\nHave a number line handy to use for discussions about which player is closer to the target sum.\n\nOne variation is to use subtraction instead, in which case you would use a lower target.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_235b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use two dice or two sets of number cards going from 1 to 6. Each player has 6 tokens – animal tokens are perfect for this game if you have them. Each player also has a piece of paper with boxes numbered from 0 to 5. Each player decides where to put their 6 tokens – it is okay to put more than one token in a box.\n \nDuring a player’s turn, two numbers are created by rolling the dice or picking two cards, and the difference of those numbers is used. A player can free one of their tokens if they have one in that box. The first player to rescue all their tokens wins.\n\nAlternatively, use cards numbered from 1 to 10 and have 10 boxes numbered from 0 to 9. \n\nAn important part of this game is choosing good boxes to place tokens in to start with. With practice, your child will realize that some boxes are more likely to occur than others.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_235c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Make a sheet of paper with 12 rows. In each row, put 8 squares. The leftmost column of squares has the numbers from 1 to 12 written in the squares. Put 1 token on each of the 12 numbers. Start rolling a pair of dice. After each roll, move the token for the sum of the dice one square to the right. The goal for each token is to be the first to get all the way to the right across the page.\n\nLet your child come up with some questions to investigate. Some natural questions are:\n\n*Which token will win and why? \n*Which tokens do well and which ones do poorly? \n*Which token is the worst?\n*How will the winners change if the rows are changed to have fewer squares or more squares?\n\nHave your child explain their ideas about the answers to these questions, and then investigate their ideas by running experiments.\n\nAdd a competitive element to this by guessing which token will win before the round starts.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_240a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "All puzzles on this page start with the basic Sudoku rule that a square grid is filled with numbers so that each number appears exactly once in each row and column. \n\nMake these puzzles by starting with a completely filled puzzle, removing many or all the numbers, and creating subregions and the appropriate extra information for that type of puzzle.\n\nTo save space, the examples here are all 4 by 4. You can make larger puzzles yourself, or you can find larger versions of these on the internet.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_240b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These two puzzles have the usual additional Sudoku restriction that the numbers must occur exactly once in each marked subregion.\n\nFor Even-Odd Sudoku puzzles, the squares for even numbers are greyed in. This makes them generally easier than regular Sudoku and it reinforces even and odd numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM240EvenOddAndKropkiSudoku4by4.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Kropki Sudoku is the same as regular Sudoku except two types of dots placed between cells are added. If the dot is hollow, then the two numbers are one apart. If the dot is filled in, then one number is half the other number.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_240c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "In addition to the usual Sudoku rules, these puzzles are broken into subregions that have a target number assigned to them. Unlike standard Sudoku, it is allowed for a number to be repeated in a subregion as long as that does not break the rule about no repeats in a row or column. If a subregion has just one square in it, then the target number will be the value of that square.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM240SumdokuDiffdoku.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "In Sumdoku, the sum of all the numbers in a subregion is the target number. In Diffdoku, all subregions have one or two squares. If a subregion has two squares, then the difference of the two numbers is the target number.\n\nIn a Sumdiffdoku puzzle, both addition and subtraction are used. The subregions are marked with a “+” or a “-” to indicate whether to take a sum or difference.\n\nTo vary the math calculations, use different groups of numbers instead of the usual 1 to 4 for a 4 by 4. For example, use the numbers 1, 3, 5, and 7. If you do this, list the numbers above the puzzle so your child will know what to use.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_250a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Each player writes the numbers from 1 to 9 on a piece of paper. To start a turn, a player finds the sum of the roll of two dice. Using only numbers that have yet to be crossed out, the player crosses out a group of one or more numbers that add up to that sum. If this can’t be done, nothing changes. A player may decide in advance to use just one die. The first player to get all numbers crossed out wins.\n\nOne way to vary this game is to use a larger range of numbers, such as going to 10 or even 12. Another way is to give each player a single turn - the turn continues with new rolls until the first time the player is stuck. At the end, the player’s score is the sum of the numbers not crossed out. The player with the lowest score wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_250b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "From a deck of playing cards, remove the face cards and any numbers that are larger than what the children are comfortable with. Shuffle the cards and turn over five cards to use and a sixth card that is the target. Leave the remaining cards as a draw pile to fill in cards as they get removed. \n\nDuring a turn, if a player can use the sum or difference of two of the five cards to equal the sixth, the player gets all three cards and they are replaced  from the draw pile. If the player fails, then a new sixth card is turned over and the turn moves to the next player. The player with the most cards at the end of the game wins.\n\nThere are several variations you can use. You can allow a player to use three cards, instead of just two,  to add up to the sixth. You can even allow any number of cards to be used to add up to the sixth. Another variation is to allow a mixture of addition and subtraction with any number of cards.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_250c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a regular deck of playing cards, have a target number of 5, and remove all cards above the target, except for one card - the hot potato, which can be anything else, such as a Joker or face card. Deal the entire remaining deck to all players - it’s okay if some players get one more card than others. \n\nAll players start by placing on the table from their hands 5’s and any pairs that add up to 5. On your turn, you can pick a random card from any other player’s hand (a simpler rule is that it is always the player on your right). If this new card gives you a pair of cards that add up to the target sum, place the pair on the table; otherwise, keep the card in your hand. Play then moves to the next player on your right. \n\nWhen play ends, the player holding the hot potato loses. Alternatively, you can play that the first player to run out of cards wins.\n\nAs your child’s adding skills improve, use larger target numbers up to 10. Varying the target number will provide practice with the various number bonds.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_260a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Counting the number of ways of doing something involving choices can lead to some interesting investigations. Here are a few possibilities - have fun thinking of many more with your child.\n\nInvestigation 1: Drawing with only red and blue, how many ways can you draw a monster with a hat, eyes, and cape? How does this change if you only colored the hat and the cape? How would it change if you used three colors, or if you could only use each color once?\n\nInvestigation 2: You have a row of 5 identical candies. How many ways can you color them so that there are 2 red ones and 3 blue ones?\n\nInvestigation 3: Find all the ways to get a sum using a small set of numbers. Do this with and without considering order. For example, if you use 1 and 2, there are 1+1+1+1 = 2+1+1 = 2+2 ways of getting 4 without considering order, and 1+1+1+1 = 2+1+1 = 1+2+1 = 1+1+2 = 2+2 ways of getting 4 considering order.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_260b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "The players agree on a target. A useful target is 10, but other numbers are fine. Each player is dealt five cards from a deck without face cards. Players then find as many ways as they can to get the target total using addition and/or subtraction with any of their cards to reach the target. \n\nDo this as a group activity where the whole group is given five cards to use to cooperatively come up with ways to achieve the total.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_260c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "One person gives the other person a target number and challenges them to come up with different ways of adding and/or subtracting to get that number. If the target is 3, it might start with 1 + 2, but then become 1 + 5 - 3 and so on. As your child learns more mathematics, additional skills can be added, such as doubling and halving. For example, 5 is 2 doubled plus 1 or two 10’s minus three 5’s.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_260d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Roll five dice to create numbers to work with. Roll two more dice to create a two-digit target number - the first die will be the tens place digit and the second die will be the ones digit. The challenge is to use addition, subtraction, and forming two-digit numbers to get as close as possible to the target number - the score is how close they come. You can either have a winner for each round, or you can add up the scores over several rounds and have an overall winner with the lowest score. Allow multiplication once your child knows how to double or triple numbers.\n\nSuppose the roll is: 4, 4, 3, 1, 3 and 22. One player might add and get 4 + 4 + 3 + 1 + 3 = 15. Another player might use 14 + 4 + 3 + 3 = 24. Someone else might have 34 - 14 + 3 = 23.\n\nSuppose the roll is: 1, 2, 5, 6, 4 and 63. A player gets close with 65 - 4 + 2 + 1 = 64. Another one gets it exactly with 56 + 4 + 2 + 1 = 63. A third says 52 + 6 + 4 + 1 = 63 also works. Have a chat about why some problems have lots of solutions.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_270a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Remove all cards above a target number, say 10. Make a 21-card pyramid with 6 rows. Place the cards in the pyramid face up with each lower row half-overlapping the smaller row above it. The remaining cards create a draw pile.\n\nA group of one or more cards summing to the target may be used if each card is not covered at all. This group can include the top card of the draw pile or the discard pile. These cards are then moved aside. If there are no matches, move the top draw pile card to the discard pile.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM270PyramidSolitaire.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "The game is over when the draw pile is empty. Your goal is to use as many cards as possible from the pyramid. \n\nIf you use a target less than 10, reduce the pyramid size by a row or two so that you have a big enough draw pile. For example, for a goal of 8 use 15 cards in 5 rows.\n\nInstead of using addition, use subtraction. If you use the cards up to ten, a good target number is 5. For this, remove pairs of cards whose difference is 5. When you have a card with a 5, you can either remove it or pair it with a 10.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_270b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "The challenge is to stack a deck of numbered cards, say 1 to 5, so that the following happens: \n\nThe top card is 1. Remove the top card and set it aside. Move the next card to the bottom of the deck. The next card is 2 and is set aside. Move the next card to the bottom of the deck. Continue until all cards are set aside in order.\n\nOnce your child finds it easy for 1 to 5, challenge your child to do it for larger number ranges.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_270c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "The challenge is to place the numbers from 1 to 6 in a pyramid with one card in the top row, two cards in the second row and three cards in the third row, where each number is the difference of the two numbers below it. \n\nLet your child take time and play around with this. Most likely, just by playing with it, your child will happen upon a solution. However, if your child gets anxious, here are two tips that help. The 6 must be in the bottom row because it cannot be the difference of any pair of numbers. Similarly, the 5 must either be in the bottom row or in the middle row above the 6 and the 1.\n\nIf your child finds this easy to do, challenge them to find how many ways it can be done. Discuss what it means for two solutions to be different - if one solution is the mirror image of another, should it be considered different? Another challenge is to solve the harder puzzle of putting the numbers from 1 to 10 in a pyramid.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_280a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Playing strategy games will help your child immensely with many reasoning, planning, and problem solving skills. There are dozens of such games - such as tic-tac-toe, 9 Men’s Morris, Fox and Geese, Dara, Connect Four, Mancala, Checkers, Go, Chess - far too many to cover here.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_280b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "There are many games similar to this one - games such as Rota, 9 Holes, and 3 Men’s Morris. In this version, there are 9 points connected in a grid by 3 horizontal and 3 vertical lines. Each player has three identical tokens to play with. The goal of the game is to get your three tokens in a line.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM280Tapatan.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "180px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "There are two phases of play. During the first phase, the placement phase, the players take turns placing their tokens one at a time on vacant points. After all the tokens have been placed, the second phase, the movement phase, begins. During this phase, players take turns moving their tokens to empty adjacent points. An alternative rule is that pieces can be moved to any empty point, not just adjacent points.\n\nThe game is over when one player wins or when the same position occurs three times, in which case it is a tie game.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_280c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "This satisfying game starts with a rectangular grid of dots - say 3 by 4. During a turn, a player draws a horizontal or vertical line connecting two unjoined adjacent dots. If the new line completes a 1 by 1 box, the player earns a point and draws another line. When no more lines can be drawn, the player with the most points wins. An easy way to keep track of points is to put an initial inside each earned box.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM280DotsAndBoxes.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "240px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Although this is traditionally played with little squares, it can also be played with dots in a pattern to produce triangles or hexagons - it’s just a bit harder to draw.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_3_280d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "There are a cluster of games played with similar rules. Rather than use any of the detailed official rules, a simpler version should work just fine for young players. Although the official games are played on a 19 by 19 rectangular grid of points, a 13 by 13 grid produced by 13 horizontal and vertical lines should work well.\n\nPlayers take turns placing their tokens on grid points - you can use raisins and cheerios, or any other tokens you have lots of. The first player to get five of their tokens in a row wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter3_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_90a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM90HouseConnecttheDots.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 140,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "200px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "Complete fun drawings by connecting numbered dots. One way is to take a simple drawing, say of a house, remove some straight lines and replace them with numbered dots, that when connected in order recreate the original drawing.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_90b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "These puzzles have numbered islands (circles) connected by bridges (lines) drawn on paper. The challenge is to find a path that connects the islands in order. The easiest versions have numbers that go from 1 to the number of islands.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM90IslandHoppingConsecutive.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "To add challenge, leave out some of the numbers so your child figures out what is missing and where it belongs. Also, instead of starting at 1, design the puzzles to start at 0 or other numbers (usually noting this at the top of the puzzle).\n\nMake this into a physical puzzle by placing pieces of paper with consecutive numbers on the floor in some twisty path. Your child can solve this puzzle by walking along the path from the smallest to the largest number. To add challenge, replace some of the numbered pieces with blank ones. Also, challenge your child to start at the largest number and go downward.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_90c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "In addition to putting a number line on a piece of paper on a wall, create a number line using a string. Tie or clip a section of string between two objects. Use paper clips to attach sliding Number Cards from 0 to 10 along the string in order.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM90StringNumberLine.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Here are some things you can do with this. You and your child will probably discover many more.\n* Switch two numbers and have your child find the mistake.\n* Leave out a number and have your child find which one is missing.\n* Practice adding. For example, to do 4 + 2, slide over the first 4 numbers and then slide over the next 2.\n* Practice subtracting. To do 6 - 2, slide over to the left the first 6 cards and then slide 2 of those back to the right.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_95a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Create designs by folding a piece of paper and cutting the paper while it is folded. This is called Kirigami. Folding the paper once and cutting it creates a design with one side the mirror image of the other. Experiment with cutting out faces, lamps, or geometric shapes.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM95Kirigami.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "If your child makes two intersecting folds, cutting this paper creates designs that are mirror images in two directions. This makes it easy to create designs such as flowers.\n\nExperiment with various folds and cuts. Create snowflake designs by starting with the same two folds as in the last example, and then doing two more folds that split the folded paper into thirds.\n \nMake a game of this by working backwards - draw a symmetrical shape on a piece of paper and challenge your child to cut a folded piece of paper to create that shape.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_95b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Cut out large shapes from big pieces of paper (use color paper if you have it) and place the shapes on the floor. At first, use simple shapes such as a triangle, a rectangle, a square, a pentagon, a hexagon, and an octagon. You can find patterns for these online or in the EFM Printables file. To create more running around, include more than one of each shape. \n\nAs your child gets better at this, include variations of these shapes - include a right triangle, an obtuse triangle, an acute triangle, a kite, a parallelogram (diamond), and some more unusual shapes.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM95ColoredShapesonFloor.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "320px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              'Give  your child some shape information and challenge them to run to the shape, or shapes, that satisfy that information. For a very young child, show them a drawing and challenge them to find the matching shape on the floor, and maybe name it when they do. For a slightly older child, you could name the shape and challenge them to find it.\n\nAdd aspects to this by asking for shapes all of whose sides are the same length, or all of whose angles are the same (or all different), or whose opposite sides (or angles) are the same size. \n\nAs your child gets experienced, playfully mix in some impossible requests such as a triangle with two right angles or a quadrilateral with exactly three right angles.\n\nOne useful variation in a lot of activities is to reverse your roles — have your child make up questions and you find the shapes. Make a "mistake" sometimes and have your child explain to you what you did wrong.',
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_100a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Place all the dominoes, also known as bones, face up between the players. For a turn, a player rolls two dice. If the domino that matches the two dice is available, the player claims it and moves it to their own pile — an alternative rule is that, even if a domino has already been claimed by one player, it can be stolen by another player.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM100StealingBones.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "For two players, the first player to claim ten dominoes wins. For more than two players, the first player with six dominoes wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_100b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "The game of dominoes has a long and rich history with many versions. If you play with others, make sure you all use the same rules before you start!\n\nThe game starts by placing all the tiles (bones) face down and mixed up - this is called the boneyard. Take seven tiles apiece for two players, and five tiles apiece for three or four players. \n\nPlay starts with the player with the highest double putting it on the table. If no one has a double, the game is started over. After this first play, play passes to the player to the right. \n\nA turn consists of placing a tile that matches one of the two available ends of the string of dominoes. If the placed domino is a double, place it crosswise to the previous domino. \n\nIf the player has no matching tile, the player is “blocked,” and there are two possible rules to use. One option is that the player’s turn is over. The other option is that the player must keep drawing tiles from the boneyard until there is a match (one version restricts this to a single draw whether or not there is a match). If the boneyard is emptied before there is a move, then play passes on to the next player.\n\nThe game is over when a player runs out of bones, or when all players are blocked. At this point, the winner is the player with the lowest total of dots on their remaining bones (which will be 0 if they have used up all their bones).",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM100DominoesGame.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "The winner’s score can be calculated in two ways. The traditional way is to use the sum of the dots on all the other players’ tiles. With this scoring, rounds are played until a player reaches a target of 50 or 100. For little ones just learning to count, a better scoring system is to let the winner have the score which is  the count of all the other players’ tiles. Alternatively, you can just have a winner and not bother with doing any scoring.\n\nOne variation, useful later when your child starts adding, is to change the rule for matching. In this variation, two tiles match if their numbers add up to six - if you are using dominoes up to a larger number, such as nine, matching numbers would add up to nine.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_105a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM105MemoryChallenge.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 120,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "200px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "Select two or four sets of the Number Cards and remove numbers above your child’s comfort level. Place the cards face down in a 3 by 3 grid, with the remaining cards put in a draw pile. Take turns flipping two cards face-up. If the cards match, the player gets to keep the cards, replaces the two cards from the draw pile, and continues their turn. If the cards don’t match, the player flips the cards back over and ends their turn. The game ends when the last pair of cards is taken. The player with the most cards wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "text_bottom_1",
            value:
              "One variation allows at most one match per turn. Another option is to have a target sum, larger than the largest card used, and then two cards match when their sum is the target.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_105b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Remove cards above the highest number your child is comfortable with. If there are more than two players and you have restricted the numbers significantly, you may need to use several decks.\n\nStart by dealing 5 cards to each player and put the remaining cards in a common draw pile. During a turn, a player “fishes” by asking any player if they have a card matching one of their cards – if they do, they hand over the card, and if they don’t, they say “Go FIsh!” and the player must pick a card from the draw pile.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM105GoFish.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "When a player has a pair of matching cards, those cards are placed in a “book” in front of them. The game is over after all the cards have been put into books. The player with the most books wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_105c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Play this with Number Cards, or if there are many players, with numbered regular playing cards. Reserve two suits worth of cards for a draw pile, and divide the remaining cards among the players. Each player will randomly select 16 cards to place in a 4 by 4 grid face up in front of them.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM105BingoWithCards.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Cards are then drawn from the draw pile and the number is called out. Each player may turn over one card from their grid that matches the number drawn. If a player has more than one card that matches, the player must choose which one to turn over. The first player to get four cards flipped over in a row horizontally, vertically, or diagonally wins the game and calls out “Bingo!”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_110a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Create a stack of Number Cards with a range of quantities your child is comfortable with. Split the cards evenly between two players and place the cards face down. The players take turns placing a single card on the stack in the middle between them. If the card is one more, same, or one less than the previous card, the first player to yell out the relationship claims the whole pile.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM110WithinOneorTwo.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "This can be extended to include the relationships of two more or two less as options. Another variation is to use a target sum, say 10 – yell out whenever the top two cards add up to the target.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_110b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Have your child count a small number of objects and put them in a box. Next, ask your child to put up the same number of fingers as there are objects in the box.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM110InvisibleAddSub.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Finally, show your child that you are adding (or removing) one or two objects to the box, and then ask how many objects there are in the box. When this becomes too easy, you can add or remove more than two objects.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_110c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "A target number, say 10, is chosen. Let your child choose whether to go first or second. The total starts at 0. During a turn, a person chooses to add 1 or 2 to the current total. The first person to reach the target wins. Once children learn to play this verbally, it is a great travel game.\n\nFor younger children, use  an actual pile of objects to play with instead of writing anything down. In this case, a player would add one or two objects to the pile on their turn until the target quantity is reached. Similarly, a number line to the target number could be used and a marker could be advanced along the line one or two spaces during each move.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM110NumberLineforNim.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "This game can also be played with subtraction. In this version, the starting total starts at the target, which in this example is 10. On a given turn the player chooses whether to subtract 1 or 2. The first person to reach 0 wins.\n\nThere are many variations to this popular game. You can use larger target numbers as your child’s skills improve. One variation is that instead of winning, the player forced to hit or go beyond the target number loses. You can also experiment with what happens if you allow a player to add (or subtract) 1, 2, or 3 for each turn.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_115a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Each Shape Card has three properties:\n\n*shape (circle, triangle, or square)\n*count (one, two, or three)\n*color (red, blue, or black)\n\nDeal five cards to each player, with the remaining cards face-down in a draw pile. Turn the draw pile’s top card face-up to begin a new stack. Take turns placing a card on the stack – the new card must match two features of the top card.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM115FeatureMatchingGame.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "If you cannot play a card on your turn, draw a card from the draw pile and end your turn. \nThe first person to run out of cards is the winner. If the draw pile runs out, the player with the fewest cards in their hand wins. \n\nSimplify the game by only requiring a match of one property with the top card. Another variation is to allow a player to place more than one card on a turn as long as each card is a legal play on top of the previous card.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_115b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Choose one of the Shape Cards - this is your starting card. Create a sequence of 4 to 8 cards that can legally be played in sequence on that starting card – each card must have two properties in common with the previous card.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM115MatchingPuzzle.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "When you’re done, separate the starting card and shuffle the other cards. The challenge is to take the shuffled cards and place them in a series of legal moves on the starting card.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_115c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Draw a tic-tac-toe grid big enough to hold a Shape Card in each square. Choose 8 of the Shape Cards that have two of each property. For example, pick the 8 cards that are either a triangle or square, have one or two figures, and are either red or blue. Place these 8 cards around the outside of the board.\n\nPlayers take turns picking an unused card for their opponent to place on the board. The first player to place a card that completes 3 cards in a row which have at least one property in common wins!  If all the cards are played without a winner, it's a tie game. Here are some examples of ways to win:",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM115TripletExamples.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Simplify the game and add an element of luck by placing the cards face down and having each player play the top card.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_120a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Remove the cards from two, four, or six Number Decks outside your child’s comfort range. Split the cards evenly in two piles face down. Flip over the top cards and the player with the larger card keeps both cards. If the cards match, flip the next two cards and the winner gets all four cards. The player with the most cards after one or more runs through all the cards is the winner.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM120WarCards.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value: "To change things up, sometimes play that the smaller of the two cards wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_120b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM120FittingIn.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 120,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "200px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "Give your child some number of small objects, say seven, and count them together. Pick a target number, say five. Ask your child to take five objects out of the original group of seven objects, if it is possible. This helps your child learn the relative sizes of numbers and how much they are bigger or less than each other.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "text_bottom_1",
            value:
              "At first, the target number should be less than or equal to the total number. Later on, giving numbers that are too big provides practice with the relative size of quantities, as well as providing practice checking that requests are reasonable.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_120c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              'This is a group game that starts with each player thinking of a number for that round. When everyone is ready, the adult starts slowly counting aloud from 1. With the announcement of each number, any children who were thinking of that number call out. If more than one child calls out, those children are "out" and the adult continues to count. If only one child calls out, that child is the winner of the round.',
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_side_1_left",
            value: "EFM120SmallestSingleNumber.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 120,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "200px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "This is also a quick, fun game to play with a large group of adults — it can be quite funny when no one picks a particular low number (such as two).",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "text_bottom_1",
            value:
              "Make this an active game as follows. With two to four children, play it like Rock, Paper, Scissors. Have the children raise some number of fingers on one or two hands behind their backs. At the count of three, everyone brings their hands out and the game is played as described above. With more children, have them thinking of their number while crouched down in a ball on the floor, looking at the floor. When the adult calls their number, they get to pop up, and the  game is played as described above.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_125a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Each player has two number lines, one for their battleships and one for their guesses. These number lines are drawn on paper and go from 0 to 12 (or higher if the children can count higher). Out of sight, on their battleship number line, each player places tokens on two numbers that will be their battleships. \n\nAfter the setup, the players take turns guessing numbers. When a player makes a guess, the other player says how close the guess was to the nearest target - the guesser then marks down that information on their second number line. The first person to get all the targets wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM125NumberLineBattleship.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "There are several variations to make this more challenging. A wider range of numbers can be used. The response to a guess can be a range of distances rather than an exact amount - for example: “the nearest ship is 1 or 2 away.” Another variation is to have ships that are two or three spaces in length.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_125b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "This is an introductory, warmup version of a fun game we will revisit again soon.\n\nThere are two people involved. The Puzzler thinks of a number and the Questioner discovers the number. The Puzzler declares, “I am thinking of a number from 0 to 8” (or whatever upper limit they like). The Questioner then asks questions of the form “How does your number compare to 3?” The Puzzler answers that the number is smaller, equal to, or larger than that number. \n\nHere is an example of a game with a target of 5:\n\nPuzzler: I’m thinking of a number from 0 to 8. Question: How does your number compare to 3?\nPuzzler: My number is larger than 3.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM125ImThinkingofaNumber1.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Question: How does your number compare to 6?\nPuzzler: My number is smaller than 6.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
          {
            name: "image_bottom_1",
            value: "EFM125ImThinkingofaNumber2.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1",
          },
          {
            name: "image_bottom_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1_max_width",
          },
          {
            name: "text_bottom_2",
            value:
              "Question: How does your number compare to 5?\nPuzzler: Well done! My number is equal to 5.\n\nWith younger children, you can play this game with counting cards from 0 to 8 (or whatever the limits are) placed face up in order on the table. Under one of the cards you hide a star or whatever is fun. After each guess, the child (Questioner) turns over all the cards that have been eliminated until the star is discovered.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_2",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_130a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "This is a magic trick for practicing addition and subtraction. Do this slowly enough so that your child will get a chance to see what is going on. \n\nFor addition, count the number of raised fingers on your left hand, say 3. Count the number of raised fingers on your right hand, say 1. Make sure you pick two numbers that add up to 5 or less. Now, bring the two hands together and poof - the fingers on your right hand are transferred to the left hand, where there are now 4 fingers raised. Magic! Summarize by saying “3 fingers plus 1 more finger creates 4 fingers. Tada!”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM130Fingers3plus1.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "For subtraction, raise some fingers on your left hand, say 4 of them. Have your right hand reach over and grab some of the fingers, say 1 of them. Presto, there will be 3 fingers left raised on the left hand and 1 raised on the right hand. Verbally summarize this saying that 4 take away 1 gives three, or you can say that you have broken 4 into two pieces which are 3 and 1. The latter wording emphasizes the concept of number bonds, which are pairs of numbers that add up to a given total.\n\nOccasionally, throw in the following special cases. For addition, let one or both of the hands have 0 fingers raised and show nothing changes when adding 0. For subtraction, subtract all the fingers so none are left over, and sometimes subtract none of the fingers to show that nothing changes.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_130b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "It is useful for your child to easily recognize numbers of objects. Practice this in two ways. One way is to use Number Cards with ten frames. Pick a card at random and playfully see if your child can recognize the quantity. For variety, have your child quiz you sometimes.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_side_1_left",
            value: "EFM130FingerTenFrame.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 75,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "150px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "The other way is to use fingers. Show some fingers on one or both hands and have your child recognize the total count. When two hands are used for numbers over five, one of the hands should have 5 fingers raised - that way it looks like a ten frame.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_130c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM130WhatsMissing.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 70,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "150px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "Count a small number of little things. Hide some of them while your child is not looking. When your child looks back, ask how many are hidden.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "text_bottom_1",
            value:
              "For example, suppose you have 6 raisins on a table. Have your child look away and cover 2 of them with a bowl. When your child looks back, count out the 4 visible raisins and ask how many raisins are under the bowl if there are 6 in total. One way for your child to figure this is to “count on” from 4 to 6 - as your child counts 4, 5, and 6, start with 0 fingers raised and raise one finger at a time to arrive at 2 raised fingers. Similarly, your child can do almost the same thing by “counting down” from 6 to 4. Seeing that 4 plus 2 more is 6 is tied together with taking 2 away from 6 to get 4 is great practice for understanding fact families.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_135a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Create an empty 5 by 5 grid using five horizontal and vertical lines.  Players take turns putting their tokens on points where the lines cross in the grid. The first player with four tokens on the corners of a square of any size wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM135MakingSquares.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "As your child gets experienced with this, change the rules to allow squares with diagonal sides.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_135b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "String Art - Make abstract drawings by connecting points with the same number along opposite sides of an angle.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM135PatternsConnecttheDots.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "A second way is to put some dots, say 8, evenly spaced on a circle. Play with creating different patterns by connecting the dots in order, or connecting every second dot, or every third dot.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_135c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use four tokens each of four different types. For example, use different colored gummy bears. We have used orange triangles, blue squares, red circles, and purple diamonds. To create one of these puzzles, start with the answer – this will be a pattern of tokens with one of each kind in each row and column, and one of each kind in each 2 by 2 corner box of the grid.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM135ShapeSoduku.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Once you have the “answer,” pull off some of the tokens and place them in a pile to the side. Finally, give the puzzle to your child to figure out how to put back the tokens that were pulled off.\n\nAlthough you can remove any set of tokens you feel will make a good puzzle, there are some simple strategies for creating puzzles: remove one token from each row; remove all of one kind of token and one each of the other tokens; or remove one entire row and column.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_140a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Gently introduce the idea of variable names by starting to use silly names for numbers in activities that involve missing numbers. \n\nThere are two people - the Puzzler, who thinks of a number, and the Questioner, who discovers the number. \n\nTo start, the Puzzler says, “Bowser is a number from 0 to 12.” The Questioner then asks questions of the form “How does Bowser compare to 4?” The Puzzler then says Bowser is smaller, equal to, or larger than 4. \n\nMake this into a game by counting the questions. After alternating turns, the player asking the smaller number of questions wins. As your child’s mathematics develops, use other kinds of questions, such as “Is Bowser even?” or “Is Bowser a prime number?”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_140b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM140BagGame.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 60,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "You and your child each pretend to have a bag with some number of things. One person creates a story such as: “Your bag has 3 raisins and mine has one more. How many do I have?” After your child gets comfortable with this, let your child come up with the question some of the time - this is often great fun for them, especially if you make the occasional “mistake.”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "text_bottom_1",
            value:
              "These stories can get more elaborate with experience. For example, the story could be “I have two fewer cookies than you do, and together we have six cookies. How many cookies do you have?” Another example, “You have twice as many candies as I do, and together we have nine pieces. How many pieces do you have?”\n\nThe use of bags and pieces of food can be replaced by the idea of a fish bowl with two (or more) kinds of fish, or with any other imagery that appeals to your child. For a fish bowl, you could create a story such as “There are seven fish in the bowl, and there is one more goldfish than there are tetras. How many goldfish are there?”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_140c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Stories are a fun way to add interest to calculations. Here two examples of such stories: \n\nThere are four chairs in a room. At first there are two people, but then three more come along. Can everyone sit down? This is more interesting than simply asking if  2 + 3 is larger than 4.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_side_1_left",
            value: "EFM140IceCreamScoopStory.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 60,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "My two friends and I are having ice cream. I will give each of my friends one more scoop than I get. If there are ten scoops of ice cream, how many scoops of ice cream can I have?\n\nPick topics that interest your child, such as food or animals. As your child gets better at these stories, let some of the stories be somewhat vague so your child will need to analyze more and learn to ask clarifying questions.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_145a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a deck of cards with numbers from 1 to 10. On a shared piece of paper, have boxes, or simple drawings of houses, numbered from 0 to 11. To provide practice figuring out order, do not put these boxes in order on the page. Each player has 7 tokens distinct from the other player’s tokens - using different colors is one way to do this.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM145GetOutofMyHouse.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "On a turn, a player picks a card and puts their token in any house that is one more or one less, as long as it does not have 3 or more of the other player’s tokens in it already. If the house has one or two of the opponent’s tokens, those are given back to the opponent and the player says “Get out of my house.” The first player to place all their tokens wins.\n\nIf your child is not ready for numerals yet, use Number Cards and boxes with quantities of dots.\n\nOne playing option is to use a smaller or larger range of Number Cards and boxes. Another option is to allow moves to houses that are 2 numbers more or less.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_145b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use one set of cards from 0 to 10. Use either Number Cards or playing cards with Queen as 0 and Ace as 1. Each player also gets 20 tokens.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM145InBetweenGame.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "For the player whose turn it is, deal two cards face up and a third card face down between them. The player decides to bet 0 to 3 tokens that the third card is between the two cards. If the player is right, the player gets that many tokens from the other player. If the player is wrong, that many tokens go to the other player. \n\nYou can either play five rounds or until one player runs out of tokens. The player with the most tokens at the end wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_145c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Develop a sense of quantities by seeing who can make the best estimate for the size of a group, such as a group of people standing in line. Force yourselves to make a quick estimate so no one gets an advantage by doing a partial count. After everyone gives an estimate, count the objects and reward the person who is the closest.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM145Estimation.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_150a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "This is similar to the Shape Sudoku puzzles, only now it uses numbers (or quantities of dots). To avoid erasing, use numbered (or dotted) slips of paper to solve the puzzles.\n\nFor a 4 by 4 puzzle, each row and column has the numbers from 1 to 4 once. Also, each marked subregion has the numbers from 1 to 4 once. That’s it! Create these puzzles for your child by starting with a completed puzzle and removing some of the pieces of paper.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM150JigsawSudoku4by4.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "For variety, you can use irregularly-sized subregions. You can also create puzzles of larger size (two 5 by 5 puzzles are shown).",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
          {
            name: "image_bottom_1",
            value: "EFM150JigsawSudoku5by5.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1",
          },
          {
            name: "image_bottom_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_150b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Greater Than Sudoku puzzles start with the same rules as regular Sudoku - each number appears exactly once in each row, column, and subregion. Additionally, if there is a less than or greater than symbol between two cells, then the numbers in the cells must obey that relationship.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM150GreaterThanSudoku4by4.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Tell a child who has never seen a comparison symbol that the bigger number is on the side with the wider part of the symbol. Some people say that the symbol is a hungry alligator and it always wants its mouth to point in the direction of the larger number.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
          {
            name: "image_bottom_1",
            value: "EFM150GreaterThanSudoku6by6.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1",
          },
          {
            name: "image_bottom_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_bottom_1_max_width",
          },
          {
            name: "text_bottom_2",
            value:
              "A useful strategy is to first look for where the smallest and largest numbers are. As your child gets better, make the puzzles more challenging by leaving out more of the inequality symbols.\n\nMake these puzzles by using a finished Sudoku puzzle. Put in greater than and less than signs on a blank grid of the same geometry. If your child gets stuck, put in a few numbers to help your child get started.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_2",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_160a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Someone makes a statement and the other players attempt to show that the person is lying. \n\nOne type of statement is to say something is always true. Examples of this are: all trucks have four wheels, all rectangles are squares, all birds can fly, and the moon comes out at night.\n\nAnother type of statement is of the form “if __, then ___ .” Examples of this are: if today is Monday, then it is a school day; if I don’t eat for three hours, then I am hungry; and if a person is taller than someone, then they are older.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_160b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "The CodeMaster creates a code, and the other player is the CodeBreaker. Suppose the code has three positions each of which can be from 1 to  5. An example of such a code would be 321.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_side_1_left",
            value: "EFM160Codebreaker.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 60,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "To break the code, the CodeBreaker guesses a code and the CodeMaster says how close the guess is. For example, if the CodeBreaker guesses 131, then the CodeMaster would say that one spot was exactly right and one other spot had the correct number but in the wrong place. Play continues until the CodeBreaker figures out the code. The number of guesses is the score for the CodeBreaker. The lowest score wins.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "text_bottom_1",
            value:
              "To add challenge, have a maximum number of questions that the CodeBreaker is allowed to ask. Other variations are: allow or disallow repeated numbers in the code, use shorter or longer lengths for the code, and use a narrower or wider range of numbers for each place of the code.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_160c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Start with a 4 x 4 empty grid of squares formed by 5 horizontal and vertical lines. Use a set of 15 pieces of paper the size of the grid squares, and number the pieces of paper from 1 to 15. The puzzle starts by having someone place the pieces of paper on the grid. The object of the puzzle is to get the pieces of paper in order with only the lower right hand corner of the grid empty. To achieve this, a piece of paper can be moved if it is adjacent to the empty square - in which case it can be slid into that space. Depending on how the person sets up the puzzle, the puzzle may or may not be solvable.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM160FifteenPuzzle3by3.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "A 4 x 4 grid is too hard for a beginner, so start with something smaller. The grid could be as small as 2 x 2 or as big as the child wants. The number of numbered pieces of paper will always be one less than the size of the grid. For example, on a 2 x 3 grid use the cards from 1 to 5.\n\nTo create these puzzles, you have two options. The first is to place the squares randomly, in which case you have a 50 / 50 chance of the position being solvable. Alternatively, you can start by placing the pieces of paper in the final position and then making a series of legal moves to move the paper around. When you are all done, you are guaranteed that the puzzle is solvable.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_170a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value: "There are two methods for this:",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_upside_1_left",
            value: "EFM170Fingers4Plus2.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_left",
          },
          {
            name: "image_upside_1_left_flex",
            value: 80,
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_left_flex",
          },
          {
            name: "image_upside_1_left_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_left_max_width",
          },
          {
            name: "text_upside_1",
            value:
              "Method 1: Use this method if both numbers are 5 or less. For the example of adding 4 and 2, put up 4 fingers on one hand and 2 fingers on the other. Then, bring the two hands together - Tada! Your child will see 4 and 2 brought together becomes 6.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_upside_1",
          },
          {
            name: "text_side_1",
            value:
              "Method 2:  Use “counting on” from one of the numbers to reach any sum of up to 10. \n\nTo add 4 and 2, put up 4 fingers on one hand, and count aloud from 0 to 2. For each spoken number after 0, put up one more finger. When 2 is reached, there should be 6 fingers raised. \n\nThis method allows addition of numbers bigger than 5. Your child will come to realize that it’s easier to start with the larger number of fingers raised and count on using the smaller number.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "image_side_1_right",
            value: "EFM170Fingers4Plus2CountingOn.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right",
          },
          {
            name: "image_side_1_right_flex",
            value: 90,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right_flex",
          },
          {
            name: "image_side_1_right_max_width",
            value: "140px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_2_170b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "There are two mental models for subtraction. It can be thought of as “take away” or “difference,” and your child should be comfortable with both models. Here is 8 - 5 calculated both ways:",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "text_upside_1",
            value:
              "Take Away: Think of  8 - 5 as what is left after you start with 8 things and take 5 of them away. Start with 8 fingers raised. Next, count aloud from 0 to 5, and for each number after 0 put one finger down. When 5 is reached in the count, there will be three fingers left up.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_upside_1",
          },
          {
            name: "image_upside_1_right",
            value: "EFM170Fingers8takeaway5Fixed.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_right",
          },
          {
            name: "image_upside_1_right_flex",
            value: 90,
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_right_flex",
          },
          {
            name: "image_upside_1_right_max_width",
            value: "140px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_right_max_width",
          },
          {
            name: "text_side_1",
            value:
              "Difference: This model views 8 - 5 as finding the difference or distance between the two numbers. Start with 5 fingers raised. Then count the new fingers being raised, and when there are 8 fingers raised the difference of 3 will have been counted.\n\nThis method uses the “counting on” addition method to find the number to add to 5 to get 8.\n\nMix in problems where a number is subtracted from itself to get 0.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "image_side_1_right",
            value: "EFM170Fingers4Plus2CountingOn.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right",
          },
          {
            name: "image_side_1_right_flex",
            value: 90,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right_flex",
          },
          {
            name: "image_side_1_right_max_width",
            value: "140px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter2_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_10a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM10PairLookingAway.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 60,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "180px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "At these early ages, it is all about exposure! Your child is being exposed to a wide array of experiences and is discovering patterns. Expose your child to math and play with math together.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "text_bottom_1",
            value:
              "Start this even before your child seems to understand what you are saying. Your child is a sponge who will eventually understand your words.\n\nMake a habit of pointing at things your child is interacting with and describing them with words involving numbers, shapes, and colors. If you are dealing with a small set of things, count them out loud to your child.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_10b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Story time is a wonderful chance to do a bit of math with your child during a cozy time. This builds up happy associations with math that encourage your child to see math as something pleasant to do together.\n\nAs you read a story with your child, talk about things in the pictures and in the story. If there are birds in the picture, point to the birds and count the birds to your child: “Look, there are 1, 2, 3 birds in the tree.” If there is a big yellow sun, point to the sun and say: “The sun is round and it is yellow. The wall of this room is also yellow. Point to something round in this room.”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM10PairReadingOnBench.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "270px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "As your child gets older and understands more things, you can count together or you can ask your child to point to things you describe.\n\nWe have provided free story picture books as PDFs that you can download and read with your child. Each book has suggested comments or questions you can say to your child as you read the story. Use these same math interactions in your day-to-day activities with your child. For example, as you take a walk you can point to birds on a wire and count them together.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_12a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Pushing your child on the swings is a perfect opportunity to count with your child. With each push, count “1, 2, 3, 4, 5.”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM12EFMLogoNoEFM.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "220px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "After your child starts learning how to count to 5, counting down from 5 is also a good idea. Start or end at 0 sometimes.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_12b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value: "There are many things to count or describe when you shop in a store.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM12Apples.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "330px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Count the apples you buy or the people in line in front of you. Point out the shapes of fruit or pictures on food boxes.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_12c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_upside_1_left",
            value: "EFM12TrafficSignal.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_left",
          },
          {
            name: "image_upside_1_left_flex",
            value: 40,
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_left_flex",
          },
          {
            name: "image_upside_1_left_max_width",
            value: "60px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_upside_1_left_max_width",
          },
          {
            name: "text_upside_1",
            value:
              "While you are traveling, there are many opportunities to talk mathematically with your child.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_upside_1",
          },
          {
            name: "text_side_1",
            value:
              "For example, if you see a somewhat unusual red car, you can point that out and count together other red cars that are like it. Similarly, you might see a big truck and start counting those. You might see a circle in a design in a building and ask your child to point out other circles they see.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "image_side_1_right",
            value: "EFM12StopSign.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right",
          },
          {
            name: "image_side_1_right_flex",
            value: 55,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right_flex",
          },
          {
            name: "image_side_1_right_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right_max_width",
          },
          {
            name: "image_downside_1_left",
            value: "EFM12TriangleSign.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_downside_1_left",
          },
          {
            name: "image_downside_1_left_flex",
            value: 55,
            type: "set_variable",
            _nested_name: "activity_body.image_downside_1_left_flex",
          },
          {
            name: "image_downside_1_left_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_downside_1_left_max_width",
          },
          {
            name: "text_downside_1",
            value:
              "There is no end to the shapes, colors, and counting that you can find and talk about once you get used to looking for them.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_downside_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_20a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Help your child explore the physical relationships between shapes by providing an environment rich in opportunities.\n\nCut holes (square, circle, triangle) in a box and watch your child fit toys through them.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_side_1_left",
            value: "EFM20BoxWithHoles.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 50,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "Add different colors to outline the holes (red triangle, blue circle, yellow square) and name the shape of the hole when your child puts the toy through.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_20b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM20BlueClock.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 50,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "Similar to I Spy, play this game anywhere!\nPlayer 1: “I’m thinking of a large blue circle.”\nPlayer 2: “I see it! It’s the clock!”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "text_bottom_1",
            value:
              "Take turns with your child observing and finding.\n\nStart with simple shapes, add size and color, and then add shape inside of shape or other arrangements.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_20c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM20Balloons.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 50,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "Make a puzzle for your child to play with. Have your child paint or draw on a piece of cardboard or stiff paper.\n\nCut the paper into large pieces. Jigsaw puzzle!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_20d_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Create a set of “tiles” from cardboard or stiff paper. Use one color for each shape (red squares, blue triangles, etc.). Watch your child make patterns fitting the tiles together. Name the shapes and colors as they go.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_side_1_left",
            value: "EFM20ColoredTiling.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 50,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "120px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "With older children, talk about patterns in the tiling that repeat. Also, talk about symmetries in the overall design. Some designs have one side that is the reflection of the other side, and that is called mirror symmetry. \n\nAfter your child has made a few designs, start pointing out patterns in the tiled floors and buildings that you see.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_30a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_top_1",
            value: "EFM30Socks.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_top_1",
          },
          {
            name: "image_top_1_max_width",
            value: "240px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_top_1_max_width",
          },
          {
            name: "text_top_1",
            value:
              "Let’s sort laundry! \n\nWhat a great way to find properties that make things the same or different. \n1. Sort by colors to be washed together.\n2. Sort by type (and size) when clean.\n3. Talk about why socks make a pair.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_30b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Version one:\nGuesser -- finds a specific object.\nPuzzler -- describes the object.\n\nVersion two:\nGuesser -- asks questions about the object until they guess what it is. \nPuzzler -- answers yes/no questions.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM30MugOnShelf.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "270px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Incorporate concepts into the game that your child is learning, such as color, size (large, medium, small), weight (heavy, light), quantity, and relationship (inside, on top of, below).",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_30c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Patterns are everywhere! See how many you can make with your child. Play with:\n\n1. Movement patterns: stepping, jumping, waving, nodding\n2. Sound patterns: clapping, knee slapping, tongue clicking, stamping\n3. Loudness patterns: soft, medium, loud\n4. Visual patterns: color, shape, size\n\nPlayer one: makes a pattern and challenges the other person to repeat it. (Step, clap, jump)\n\nPlayer two: can repeat and eventually add to the pattern, challenging player one to repeat it. (Step, clap, jump, touch their nose)",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM30ShapePattern.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "As you get better, challenge each other to repeat longer and longer patterns from memory. \n\nYou can use a pattern as a secret code for getting through a passageway. You can also make necklaces with your child by taking string and threading on beads or bits of food to create repeating patterns. Walking hand in hand, you can use squeeze patterns (short short long, etc.).\n\nFor older children, create puzzles by drawing a pattern of shapes on paper. One person establishes a pattern and then leaves gaps in the sequence for the other to fill in.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_40a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Pick a number, say 2. Challenge your child to go on a treasure hunt to find as many ways as possible that 2 shows up around you. It may show up as the numeral 2 on a wall, sign, or building, or it may show up as two of something, such as two chairs or two dishes.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM40FindingTwos.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "240px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_40b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "With some food item you have a lot of, make a 21-piece triangle with 1 piece in the top row, 2 pieces in the next, up to 6 pieces in the last row.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM40CheerioPyramid.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "180px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Take turns with your child rolling a die. Each time the count of a roll matches a row that is still in the triangle, the player gets to remove that row and either eat it (yum) or put it in their personal pile.\n\nBeginning players can do a 1-to-1 match of the dots on the die with the food pieces in a row. The player with the bigger pile of food wins!",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_40c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "As understanding of the first few numbers grows, ask your child questions about one more or one less. Without talking about how many items there currently are, ask “Would you like one more?” or “Would you like one less?”",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM40OneMoreAppleSlice.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "240px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Slowly, start emphasizing the current quantity and how it changes. Count the number of items together, perhaps two apple slices on your child’s plate. Summarize saying there are two apple slices, and ask if your child would like one more apple slice or perhaps one less. If the amount does change, end by asking how many apple slices there are now.\n\nSimilarly, when you are walking about, pick out things to count. Suppose there are three people in line in front of you. Count them together and ask how many there will be when one leaves and there will be one less.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_50a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "You only need a few materials for these Early Family Math activities, and they are all very inexpensive and easy to get. \n\nHere’s a short list:\n* Five dice\n* A deck of playing cards\n* String\n* Sidewalk chalk\n* Some stiff paper in various colors \n\nMany of our activities can be played using decks of playing cards. However, using a Number Card deck will help your child practice ideas that will not be emphasized with regular playing cards.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM50NumberCards.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Make your own using card stock or any thick paper. You can either use the pdf supplied in Resources or draw your own.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_50b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "There are a few games and puzzles that involve a Shape Deck of 27 cards in the Shape Deck Games page. If you happen to have a set of 81 cards from the game of SET, you can use 27 of those cards that have solid colors as a Shape Deck.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM50ShapeDeck.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "400px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Start with some stiff paper such as card stock if you can. Regular paper will work, it’s just not as easy to handle or as durable.\n\nEach of the 27 cards of the Shape Deck has three properties: a shape (circle, triangle, or square), a count (one, two, or three) and a color (red, blue, or black). The 27 cards are pictured below. Use the pdf supplied in Resources or draw your own.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_50c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_middle_1",
            value: "EFM50NumberLine.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "400px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Place a number line on a wall to let your child see the numbers and how they grow. The number line should start at 0 and go to at least 20, with the numbers increasing as they go to the right. Make it from regular paper and use tick marks and large numbers.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_60a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_middle_1",
            value: "EFM60HomeStoreItems.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "320px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Kids love to play store! Create tags with silly prices that are small numbers. Put these price tags on things in your home (toys, food, books, etc.) Give your child pretend money to spend on things in the store. After each “purchase,” have your child calculate how much money is left.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_60b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_middle_1",
            value: "EFM60TwoCheeriosinahand.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "200px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Start with a bowl of small pieces of food. Have your child count out loud a few items from the bowl, say 5, and give them to you. Secretly divide these items between your hands and then hold both hands out with one hand open and the other closed. Your child now counts aloud the items in the open hand and then chooses which hand to “steal” from. Have your child predict how many items will be stolen before you open your hand.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_60c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "image_side_1_left",
            value: "EFM60Hopscotchto10.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 30,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "100px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "1. Draw a diagram similar to this. Use chalk if outside, or masking or painter's tape if inside.\n2. Throw a marker into the first square. If it lands on a line, or outside the square, you lose your turn and you pass the marker to the next player.\n3. Hop on one foot into the first empty square, and then every subsequent empty square. Skip the one your marker is on.\n4. At the pairs (4-5 and 7-8), jump with both feet.\n5. At 10, hop with both feet, turn around, and head back toward the start.\n6. When you reach the marked square again, pick up the marker—on one foot!—and keep going.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "text_bottom_1",
            value:
              "7. If you finished without any mistakes, pass the marker to the next player. On your next turn, throw the marker to the next number.\n8. If you fall, jump outside the lines, or miss a square or the marker, you lose your turn and must repeat the same number on your next turn. Whoever reaches 10 first, wins.\n\nFor younger children, relax many of the rules and replace hopping with stepping.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_70a_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Create large circles on the ground using Hula Hoops, string, or draw them with sidewalk chalk. Use a collection of objects and have each circle represent a property of some of the objects. Possible properties are: has four legs, is bigger than a doll, has some red coloring. The challenge for your child is to put everything that has the property in the circle and everything without the property outside the circle.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM70GoingInCircles.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "300px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Start by using one circle to get your child used to the idea. When you change to two circles, make them partially overlap, and choose the properties so that some objects have both properties. For example, if you have a box of blocks, the two properties might be having a round shape and being wooden. Your child should tell you how they are deciding to place each object.\n\nReverse this activity by placing objects in the circles and challenging your child to identify what property goes with each circle.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_70b_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Choose two items that are somewhat similar. How are they similar? How are they different?\n\nAllow your child lots of freedom to come up with unusual reasons. Sometimes let your child pick the two items to challenge you to come up with the similarities and differences.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_side_1_left",
            value: "EFM70ForkGold.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left",
          },
          {
            name: "image_side_1_left_flex",
            value: 30,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_flex",
          },
          {
            name: "image_side_1_left_max_width",
            value: "90px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_left_max_width",
          },
          {
            name: "text_side_1",
            value:
              "For example, pick a spoon and a fork. They are similar because you eat with them and they are both kept in the kitchen. They are different because one is pointy and one is round.\n\nOne variation is to choose an item and ask which things in the room are similar to it and which things are very different from it.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_side_1",
          },
          {
            name: "image_side_1_right",
            value: "EFM70SpoonGold.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right",
          },
          {
            name: "image_side_1_right_flex",
            value: 36,
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right_flex",
          },
          {
            name: "image_side_1_right_max_width",
            value: "110px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_side_1_right_max_width",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_1_70c_template",
    status: "released",
    rows: [
      {
        type: "template",
        name: "activity_body",
        value: "efm_activity_body_template",
        rows: [
          {
            name: "text_top_1",
            value:
              "Use a set of four items or drawings where one of the four is the odd one out. Challenge your child to identify the one that is not like the others and to explain why – accept any reason that makes sense; your child may have an unusual reason.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_top_1",
          },
          {
            name: "image_middle_1",
            value: "EFM70WhichOneIsDifferent.svg",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1",
          },
          {
            name: "image_middle_1_max_width",
            value: "360px",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.image_middle_1_max_width",
          },
          {
            name: "text_bottom_1",
            value:
              "Suppose the four items are a red triangle, a red square with a hole, a green square, and solid red square. Your child may choose the green square because it’s the only one that is not red. Or, your child may choose the red square with a hole because it’s the only one with a hole. Or, the red triangle might be chosen because it’s the only shape that isn’t a square. \n\nThere isn’t always more than one good answer, but you should always be open to surprising ideas.",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "activity_body.text_bottom_1",
          },
        ],
        _nested_name: "activity_body",
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
];
export default template;
