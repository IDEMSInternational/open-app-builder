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
            action_id: "set_field",
            args: ["current_activity", "data.efm_act.efm_act_1_10a"],
            _raw: "click | set_field:current_activity: data.efm_act.efm_act_1_10a",
            _cleaned: "click | set_field:current_activity: data.efm_act.efm_act_1_10a",
          },
          {
            trigger: "click",
            action_id: "go_to",
            args: ["efm_activity_template"],
            _raw: "click | go_to: efm_activity_template",
            _cleaned: "click | go_to: efm_activity_template",
          },
        ],
        _nested_name: "button_activities",
      },
      {
        type: "button",
        name: "button_chapter1",
        value: "Chapter 1",
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
        name: "text2",
        value: "Text 2: (id) @local.efm_activity.id",
        _translations: {
          value: {},
        },
        _nested_name: "text2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Text 2: (id) @local.efm_activity.id",
              matchedExpression: "@local.efm_activity.id",
              type: "local",
              fieldName: "efm_activity",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.efm_activity.id": ["value"],
        },
      },
      {
        type: "text",
        name: "text1",
        value: "Text 1: (template): @local.efm_activity_body_template",
        _translations: {
          value: {},
        },
        _nested_name: "text1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Text 1: (template): @local.efm_activity_body_template",
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
              value: {
                tz_sw: true,
                za_af: true,
                za_st: true,
                za_tn: true,
                za_xh: true,
                za_zu: true,
              },
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
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
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
            value: ".",
            _translations: {
              value: {},
            },
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
              value: {
                tz_sw: true,
                za_af: true,
                za_st: true,
                za_tn: true,
                za_xh: true,
                za_zu: true,
              },
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
                action_id: "go_to",
                args: ["efm_activity_template"],
                _raw: "click | go_to: efm_activity_template",
                _cleaned: "click | go_to: efm_activity_template",
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
    flow_name: "efm_chapter1_acts",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Chapter 1",
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
            condition: '@item.chapter=="1"',
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
              "@item.id": [
                "value",
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
              "@item.title": ["value"],
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
    flow_name: "efm_act_1_10a_template",
    status: "released",
    rows: [
      {
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "display_group",
        name: "group1",
        style_list: ["@global.efm_parskip_fix"],
        rows: [
          {
            type: "image",
            name: "image1",
            value: "EFM10PairLookingAway.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 60", "max-width: 180px"],
            _nested_name: "group1.image1",
          },
          {
            type: "text",
            name: "text_1",
            value:
              "At these early ages, it is all about exposure! Your child is being exposed to a wide array of experiences and is discovering patterns. Expose your child to math and play with math together.",
            _translations: {
              value: {},
            },
            style_list: ["flex: 100:\n@local.activity_text_style"],
            _nested_name: "group1.text_1",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "flex: 100:\n@local.activity_text_style",
                    matchedExpression: "@local.activity_text_style",
                    type: "local",
                    fieldName: "activity_text_style",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.activity_text_style": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Start this even before your child seems to understand what you are saying. Your child is a sponge who will eventually understand your words.\n\nMake a habit of pointing at things your child is interacting with and describing them with words involving numbers, shapes, and colors. If you are dealing with a small set of things, count them out loud to your child.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "Story time is a wonderful chance to do a bit of math with your child during a cozy time. This builds up happy associations with math that encourage your child to see math as something pleasant to do together.\n\nAs you read a story with your child, talk about things in the pictures and in the story. If there are birds in the picture, point to the birds and count the birds to your child: “Look, there are 1, 2, 3 birds in the tree.” If there is a big yellow sun, point to the sun and say: “The sun is round and it is yellow. The wall of this room is also yellow. Point to something round in this room.”",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image1",
            value: "EFM10PairReadingOnBench.svg",
            _translations: {
              value: {},
            },
            style_list: ["max-width: 270px"],
            _nested_name: "group1.image1",
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "As your child gets older and understands more things, you can count together or you can ask your child to point to things you describe.\n\nWe have provided free story picture books as PDFs that you can download and read with your child. Each book has suggested comments or questions you can say to your child as you read the story. Use these same math interactions in your day-to-day activities with your child. For example, as you take a walk you can point to birds on a wire and count them together.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "Pushing your child on the swings is a perfect opportunity to count with your child. With each push, count “1, 2, 3, 4, 5.”",
        _translations: {
          value: {},
        },
        style_list: ["@local.activity_text_style", "@global.efm_parskip_fix"],
        _nested_name: "text_1",
        _dynamicFields: {
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
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.activity_text_style": ["style_list.0"],
          "@global.efm_parskip_fix": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image1",
            value: "EFM12EFMLogoNoEFM.svg",
            _translations: {
              value: {},
            },
            style_list: ["max-width: 220px", "@global.efm_parskip_fix"],
            _nested_name: "group1.image1",
            _dynamicFields: {
              style_list: {
                "1": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.1"],
            },
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "After your child starts learning how to count to 5, counting down from 5 is also a good idea. Start or end at 0 sometimes.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value: "There are many things to count or describe when you shop in a store.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image1",
            value: "EFM12Apples.svg",
            _translations: {
              value: {},
            },
            style_list: ["max-width: 330px"],
            _nested_name: "group1.image1",
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Count the apples you buy or the people in line in front of you. Point out the shapes of fruit or pictures on food boxes.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "display_group",
        name: "group1",
        style_list: ["@global.efm_parskip_fix"],
        rows: [
          {
            type: "image",
            name: "image1",
            value: "EFM12TrafficSignal.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 55", "max-width: 60px"],
            _nested_name: "group1.image1",
          },
          {
            type: "text",
            name: "text_1",
            value:
              "While you are traveling, there are many opportunities to talk mathematically with your child.",
            _translations: {
              value: {},
            },
            style_list: ["flex:100", "@local.activity_text_style"],
            _nested_name: "group1.text_1",
            _dynamicFields: {
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
              "@local.activity_text_style": ["style_list.1"],
            },
          },
        ],
        _nested_name: "group1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
      },
      {
        type: "display_group",
        name: "group2",
        style_list: ["@global.efm_parskip_fix"],
        rows: [
          {
            type: "text",
            name: "text_2",
            value:
              "For example, if you see a somewhat unusual red car, you can point that out and count together other red cars that are like it. Similarly, you might see a big truck and start counting those. You might see a circle in a design in a building and ask your child to point out other circles they see.",
            _translations: {
              value: {},
            },
            style_list: ["flex: 100", "@local.activity_text_style"],
            _nested_name: "group2.text_2",
            _dynamicFields: {
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
              "@local.activity_text_style": ["style_list.1"],
            },
          },
          {
            type: "image",
            name: "image2",
            value: "EFM12StopSign.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 55", "max-width: 120px"],
            _nested_name: "group2.image2",
          },
        ],
        _nested_name: "group2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
      },
      {
        type: "display_group",
        name: "group3",
        style_list: ["@global.efm_parskip_fix"],
        rows: [
          {
            type: "image",
            name: "image3",
            value: "EFM12TriangleSign.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 55", "max-width: 120px"],
            _nested_name: "group3.image3",
          },
          {
            type: "text",
            name: "text_3",
            value:
              "There is no end to the shapes, colors, and counting that you can find and talk about once you get used to looking for them.",
            _translations: {
              value: {},
            },
            style_list: ["flex: 100", "@local.activity_text_style"],
            _nested_name: "group3.text_3",
            _dynamicFields: {
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
              "@local.activity_text_style": ["style_list.1"],
            },
          },
        ],
        _nested_name: "group3",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "Help your child explore the physical relationships between shapes by providing an environment rich in opportunities.\n\nCut holes (square, circle, triangle) in a box and watch your child fit toys through them.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        style_list: ["@global.efm_parskip_fix"],
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM20BoxWithHoles.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 50", "max-width: 120px"],
            _nested_name: "group1.image",
          },
          {
            type: "text",
            name: "text_2",
            value:
              "Add different colors to outline the holes (red triangle, blue circle, yellow square) and name the shape of the hole when your child puts the toy through.",
            _translations: {
              value: {},
            },
            style_list: ["flex: 100", "@local.activity_text_style"],
            _nested_name: "group1.text_2",
            _dynamicFields: {
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
              "@local.activity_text_style": ["style_list.1"],
            },
          },
        ],
        _nested_name: "group1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "display_group",
        name: "group1",
        style_list: ["@global.efm_parskip_fix"],
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM20BlueClock.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 50", "max-width: 120px"],
            _nested_name: "group1.image",
          },
          {
            type: "text",
            name: "text_1",
            value:
              "Similar to I Spy, play this game anywhere!\nPlayer 1: “I’m thinking of a large blue circle.”\nPlayer 2: “I see it! It’s the clock!”",
            _translations: {
              value: {},
            },
            style_list: ["flex: 100", "@local.activity_text_style"],
            _nested_name: "group1.text_1",
            _dynamicFields: {
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
              "@local.activity_text_style": ["style_list.1"],
            },
          },
        ],
        _nested_name: "group1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Take turns with your child observing and finding.\n\nStart with simple shapes, add size and color, and then add shape inside of shape or other arrangements.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "display_group",
        name: "group1",
        style_list: ["@global.efm_parskip_fix"],
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM20Balloons.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 50", "max-width: 120px"],
            _nested_name: "group1.image",
          },
          {
            type: "text",
            name: "text_1",
            value:
              "Make a puzzle for your child to play with. Have your child paint or draw on a piece of cardboard or stiff paper.\n\nCut the paper into large pieces. Jigsaw puzzle!",
            _translations: {
              value: {},
            },
            style_list: ["flex: 100", "@local.activity_text_style"],
            _nested_name: "group1.text_1",
            _dynamicFields: {
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
              "@local.activity_text_style": ["style_list.1"],
            },
          },
        ],
        _nested_name: "group1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "Create a set of “tiles” from cardboard or stiff paper. Use one color for each shape (red squares, blue triangles, etc.). Watch your child make patterns fitting the tiles together. Name the shapes and colors as they go.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        style_list: ["@global.efm_parskip_fix"],
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM20ColoredTiling.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 50", "max-width: 120px"],
            _nested_name: "group1.image",
          },
          {
            type: "text",
            name: "text_2",
            value:
              "With older children, talk about patterns in the tiling that repeat. Also, talk about symmetries in the overall design. Some designs have one side that is the reflection of the other side, and that is called mirror symmetry. \n\nAfter your child has made a few designs, start pointing out patterns in the tiled floors and buildings that you see.",
            _translations: {
              value: {},
            },
            style_list: ["flex:100", "@local.activity_text_style"],
            _nested_name: "group1.text_2",
            _dynamicFields: {
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
              "@local.activity_text_style": ["style_list.1"],
            },
          },
        ],
        _nested_name: "group1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM30Socks.svg",
            _translations: {
              value: {},
            },
            style_list: ["max-width: 240px"],
            _nested_name: "group1.image",
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_1",
        value:
          "Let’s sort laundry! \n\nWhat a great way to find properties that make things the same or different. \n1. Sort by colors to be washed together.\n2. Sort by type (and size) when clean.\n3. Talk about why socks make a pair.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "Version one:\nGuesser -- finds a specific object.\nPuzzler -- describes the object.\n\nVersion two:\nGuesser -- asks questions about the object until they guess what it is. \nPuzzler -- answers yes/no questions.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM30MugOnShelf.svg",
            _translations: {
              value: {},
            },
            style_list: ["max-width: 360px"],
            _nested_name: "group1.image",
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Incorporate concepts into the game that your child is learning, such as color, size (large, medium, small), weight (heavy, light), quantity, and relationship (inside, on top of, below).",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "Patterns are everywhere! See how many you can make with your child. Play with:\n\n1. Movement patterns: stepping, jumping, waving, nodding\n2. Sound patterns: clapping, knee slapping, tongue clicking, stamping\n3. Loudness patterns: soft, medium, loud\n4. Visual patterns: color, shape, size\n\nPlayer one: makes a pattern and challenges the other person to repeat it. (Step, clap, jump)\n\nPlayer two: can repeat and eventually add to the pattern, challenging player one to repeat it. (Step, clap, jump, touch their nose)",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM30ShapePattern.svg",
            _translations: {
              value: {},
            },
            style_list: ["max-width: 300px"],
            _nested_name: "group1.image",
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "As you get better, challenge each other to repeat longer and longer patterns from memory. \n\nYou can use a pattern as a secret code for getting through a passageway. You can also make necklaces with your child by taking string and threading on beads or bits of food to create repeating patterns. Walking hand in hand, you can use squeeze patterns (short short long, etc.).\n\nFor older children, create puzzles by drawing a pattern of shapes on paper. One person establishes a pattern and then leaves gaps in the sequence for the other to fill in.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "Pick a number, say 2. Challenge your child to go on a treasure hunt to find as many ways as possible that 2 shows up around you. It may show up as the numeral 2 on a wall, sign, or building, or it may show up as two of something, such as two chairs or two dishes.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM40FindingTwos.svg",
            _translations: {
              value: {},
            },
            style_list: ["@global.efm_parskip_fix", "max-width: 240px"],
            _nested_name: "group1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "With some food item you have a lot of, make a 21-piece triangle with 1 piece in the top row, 2 pieces in the next, up to 6 pieces in the last row.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM40CheerioPyramid.svg",
            _translations: {
              value: {},
            },
            style_list: ["@global.efm_parskip_fix", "max-width: 180px"],
            _nested_name: "group1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Take turns with your child rolling a die. Each time the count of a roll matches a row that is still in the triangle, the player gets to remove that row and either eat it (yum) or put it in their personal pile.\n\nBeginning players can do a 1-to-1 match of the dots on the die with the food pieces in a row. The player with the bigger pile of food wins!",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "As understanding of the first few numbers grows, ask your child questions about one more or one less. Without talking about how many items there currently are, ask “Would you like one more?” or “Would you like one less?”",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM40OneMoreAppleSlice.svg",
            _translations: {
              value: {},
            },
            style_list: ["@global.efm_parskip_fix", "max-width: 240px"],
            _nested_name: "group1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Slowly, start emphasizing the current quantity and how it changes. Count the number of items together, perhaps two apple slices on your child’s plate. Summarize saying there are two apple slices, and ask if your child would like one more apple slice or perhaps one less. If the amount does change, end by asking how many apple slices there are now.\n\nSimilarly, when you are walking about, pick out things to count. Suppose there are three people in line in front of you. Count them together and ask how many there will be when one leaves and there will be one less.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "You only need a few materials for these Early Family Math activities, and they are all very inexpensive and easy to get. \n\nHere’s a short list:\n* Five dice\n* A deck of playing cards\n* String\n* Sidewalk chalk\n* Some stiff paper in various colors",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value:
          "Many of our activities can be played using decks of playing cards. However, using a Number Card deck will help your child practice ideas that will not be emphasized with regular playing cards.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_3",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM50NumberCards.svg",
            _translations: {
              value: {},
            },
            style_list: ["@global.efm_parskip_fix", "max-width: 3000px"],
            _nested_name: "group1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Make your own using card stock or any thick paper. You can either use the pdf supplied in Resources or draw your own.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "There are a few games and puzzles that involve a Shape Deck of 27 cards in the Shape Deck Games page. If you happen to have a set of 81 cards from the game of SET, you can use 27 of those cards that have solid colors as a Shape Deck.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM50ShapeDeck.svg",
            _translations: {
              value: {},
            },
            style_list: ["@global.efm_parskip_fix", "max-width: 400px"],
            _nested_name: "group1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Start with some stiff paper such as card stock if you can. Regular paper will work, it’s just not as easy to handle or as durable.\n\nEach of the 27 cards of the Shape Deck has three properties: a shape (circle, triangle, or square), a count (one, two, or three) and a color (red, blue, or black). The 27 cards are pictured below. Use the pdf supplied in Resources or draw your own.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM50NumberLine.svg",
            _translations: {
              value: {},
            },
            style_list: ["@global.efm_parskip_fix", "max-width: 400px"],
            _nested_name: "group1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_1",
        value:
          "Place a number line on a wall to let your child see the numbers and how they grow. The number line should start at 0 and go to at least 20, with the numbers increasing as they go to the right. Make it from regular paper and use tick marks and large numbers.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM60HomeStoreItems.svg",
            _translations: {
              value: {},
            },
            style_list: ["@global.efm_parskip_fix", "max-width: 320px"],
            _nested_name: "group1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_1",
        value:
          "Kids love to play store! Create tags with silly prices that are small numbers. Put these price tags on things in your home (toys, food, books, etc.) Give your child pretend money to spend on things in the store. After each “purchase,” have your child calculate how much money is left.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM60TwoCheeriosinahand.svg",
            _translations: {
              value: {},
            },
            style_list: ["@global.efm_parskip_fix", "max-width: 200px"],
            _nested_name: "group1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_1",
        value:
          "Start with a bowl of small pieces of food. Have your child count out loud a few items from the bowl, say 5, and give them to you. Secretly divide these items between your hands and then hold both hands out with one hand open and the other closed. Your child now counts aloud the items in the open hand and then chooses which hand to “steal” from. Have your child predict how many items will be stolen before you open your hand.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "display_group",
        name: "group1",
        style_list: ["@global.efm_parskip_fix"],
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM60Hopscotchto10.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 30", "max-width: 100px"],
            _nested_name: "group1.image",
          },
          {
            type: "text",
            name: "text_2",
            value:
              "1. Draw a diagram similar to this. Use chalk if outside, or masking or painter's tape if inside.\n2. Throw a marker into the first square. If it lands on a line, or outside the square, you lose your turn and you pass the marker to the next player.\n3. Hop on one foot into the first empty square, and then every subsequent empty square. Skip the one your marker is on.\n4. At the pairs (4-5 and 7-8), jump with both feet.\n5. At 10, hop with both feet, turn around, and head back toward the start.\n6. When you reach the marked square again, pick up the marker—on one foot!—and keep going.",
            _translations: {
              value: {},
            },
            style_list: ["flex:100", "@local.activity_text_style"],
            _nested_name: "group1.text_2",
            _dynamicFields: {
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
              "@local.activity_text_style": ["style_list.1"],
            },
          },
        ],
        _nested_name: "group1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value:
          "7. If you finished without any mistakes, pass the marker to the next player. On your next turn, throw the marker to the next number.\n8. If you fall, jump outside the lines, or miss a square or the marker, you lose your turn and must repeat the same number on your next turn. Whoever reaches 10 first, wins.\n\nFor younger children, relax many of the rules and replace hopping with stepping.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "Create large circles on the ground using Hula Hoops, string, or draw them with sidewalk chalk. Use a collection of objects and have each circle represent a property of some of the objects. Possible properties are: has four legs, is bigger than a doll, has some red coloring. The challenge for your child is to put everything that has the property in the circle and everything without the property outside the circle.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM70GoingInCircles.svg",
            _translations: {
              value: {},
            },
            style_list: ["@global.efm_parskip_fix", "max-width: 300px"],
            _nested_name: "group1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Start by using one circle to get your child used to the idea. When you change to two circles, make them partially overlap, and choose the properties so that some objects have both properties. For example, if you have a box of blocks, the two properties might be having a round shape and being wooden. Your child should tell you how they are deciding to place each object.\n\nReverse this activity by placing objects in the circles and challenging your child to identify what property goes with each circle.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "Choose two items that are somewhat similar. How are they similar? How are they different?\n\nAllow your child lots of freedom to come up with unusual reasons. Sometimes let your child pick the two items to challenge you to come up with the similarities and differences.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        style_list: ["@global.efm_parskip_fix"],
        rows: [
          {
            type: "image",
            name: "image1",
            value: "EFM70ForkGold.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 30", "max-width: 90px"],
            _nested_name: "group1.image1",
          },
          {
            type: "text",
            name: "text_2",
            value:
              "For example, pick a spoon and a fork. They are similar because you eat with them and they are both kept in the kitchen. They are different because one is pointy and one is round.\n\nOne variation is to choose an item and ask which things in the room are similar to it and which things are very different from it.",
            _translations: {
              value: {},
            },
            style_list: ["flex:100", "@local.activity_text_style"],
            _nested_name: "group1.text_2",
            _dynamicFields: {
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
              "@local.activity_text_style": ["style_list.1"],
            },
          },
          {
            type: "image",
            name: "image2",
            value: "EFM70SpoonGold.svg",
            _translations: {
              value: {},
            },
            style_list: ["flex: 36", "max-width: 110px"],
            _nested_name: "group1.image2",
          },
        ],
        _nested_name: "group1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.efm_parskip_fix": ["style_list.0"],
        },
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
        name: "activity_text_style",
        value: "@global.efm_act_text_style",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.efm_act_text_style",
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
        type: "text",
        name: "text_1",
        value:
          "Use a set of four items or drawings where one of the four is the odd one out. Challenge your child to identify the one that is not like the others and to explain why – accept any reason that makes sense; your child may have an unusual reason.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_1",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
      {
        type: "display_group",
        name: "group1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM70WhichOneIsDifferent.svg",
            _translations: {
              value: {},
            },
            style_list: ["@global.efm_parskip_fix", "max-width: 360px"],
            _nested_name: "group1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@global.efm_parskip_fix",
                    matchedExpression: "@global.efm_parskip_fix",
                    type: "global",
                    fieldName: "efm_parskip_fix",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.efm_parskip_fix": ["style_list.0"],
            },
          },
        ],
        _nested_name: "group1",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Suppose the four items are a red triangle, a red square with a hole, a green square, and solid red square. Your child may choose the green square because it’s the only one that is not red. Or, your child may choose the red square with a hole because it’s the only one with a hole. Or, the red triangle might be chosen because it’s the only shape that isn’t a square. \n\nThere isn’t always more than one good answer, but you should always be open to surprising ideas.",
        _translations: {
          value: {},
        },
        style_list: ["@global.efm_parskip_fix", "@local.activity_text_style"],
        _nested_name: "text_2",
        _dynamicFields: {
          style_list: {
            "0": [
              {
                fullExpression: "@global.efm_parskip_fix",
                matchedExpression: "@global.efm_parskip_fix",
                type: "global",
                fieldName: "efm_parskip_fix",
              },
            ],
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
          "@global.efm_parskip_fix": ["style_list.0"],
          "@local.activity_text_style": ["style_list.1"],
        },
      },
    ],
    _xlsxPath: "EFM_activity_chapter1_sheets.xlsx",
  },
];
export default template;
