/* eslint-disable */
import { FlowTypes } from "data-models";
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
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
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
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
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
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
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
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
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
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
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
    flow_subtype: "debug",
    flow_name: "debug_campaign",
    status: "released",
    rows: [
      {
        name: "active_campaign",
        value: "@campaign.debug_campaign",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "active_campaign",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@campaign.debug_campaign",
              matchedExpression: "@campaign.debug_campaign",
              type: "campaign",
              fieldName: "debug_campaign",
            },
          ],
        },
        _dynamicDependencies: {
          "@campaign.debug_campaign": ["value"],
        },
      },
      {
        type: "display_group",
        condition: "@local.active_campaign.id",
        exclude_from_translation: true,
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "campaign_id",
            value: "Campaign id: @local.active_campaign.id",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "display_group.campaign_id",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "Campaign id: @local.active_campaign.id",
                  matchedExpression: "@local.active_campaign.id",
                  type: "local",
                  fieldName: "active_campaign",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.active_campaign.id": ["value"],
            },
          },
          {
            type: "round_button",
            name: "campaign_quickstart",
            action_list: [
              {
                trigger: "click",
                action_id: "trigger_actions",
                args: ["@local.active_campaign.click_action_list"],
                _raw: "click | trigger_actions: @local.active_campaign.click_action_list",
                _cleaned: "click | trigger_actions: @local.active_campaign.click_action_list",
              },
              {
                trigger: "click",
                action_id: "set_local",
                args: ["active_campaign", false],
                _raw: "click | set_local: active_campaign : false",
                _cleaned: "click | set_local: active_campaign : false",
              },
            ],
            exclude_from_translation: true,
            parameter_list: {
              icon_src: "@local.active_campaign.icon",
              text: "@local.active_campaign.text",
              style: "home_screen yellow",
            },
            style_list: ["padding: 0"],
            _nested_name: "display_group.campaign_quickstart",
            _dynamicFields: {
              action_list: {
                "0": {
                  args: {
                    "0": [
                      {
                        fullExpression: "@local.active_campaign.click_action_list",
                        matchedExpression: "@local.active_campaign.click_action_list",
                        type: "local",
                        fieldName: "active_campaign",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression:
                        "click | trigger_actions: @local.active_campaign.click_action_list",
                      matchedExpression: "@local.active_campaign.click_action_list",
                      type: "local",
                      fieldName: "active_campaign",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression:
                        "click | trigger_actions: @local.active_campaign.click_action_list",
                      matchedExpression: "@local.active_campaign.click_action_list",
                      type: "local",
                      fieldName: "active_campaign",
                    },
                  ],
                },
              },
              parameter_list: {
                icon_src: [
                  {
                    fullExpression: "@local.active_campaign.icon",
                    matchedExpression: "@local.active_campaign.icon",
                    type: "local",
                    fieldName: "active_campaign",
                  },
                ],
                text: [
                  {
                    fullExpression: "@local.active_campaign.text",
                    matchedExpression: "@local.active_campaign.text",
                    type: "local",
                    fieldName: "active_campaign",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.active_campaign.click_action_list": [
                "action_list.0.args.0",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
              "@local.active_campaign.icon": ["parameter_list.icon_src"],
              "@local.active_campaign.text": ["parameter_list.text"],
            },
          },
        ],
        name: "display_group",
        _nested_name: "display_group",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "@local.active_campaign.id",
              matchedExpression: "@local.active_campaign.id",
              type: "local",
              fieldName: "active_campaign",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.active_campaign.id": ["condition"],
        },
      },
      {
        type: "button",
        name: "clear_reminders",
        value: "Reset Reminders",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_default.sent", false],
            _raw: "click | set_field : debug_reminder_default.sent : false",
            _cleaned: "click | set_field : debug_reminder_default.sent : false",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_1.sent", false],
            _raw: "click | set_field : debug_reminder_1.sent : false",
            _cleaned: "click | set_field : debug_reminder_1.sent : false",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_2.sent", false],
            _raw: "click | set_field : debug_reminder_2.sent : false",
            _cleaned: "click | set_field : debug_reminder_2.sent : false",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_3.sent", false],
            _raw: "click | set_field : debug_reminder_3.sent : false",
            _cleaned: "click | set_field : debug_reminder_3.sent : false",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_number", "1"],
            _raw: "click | set_field : debug_reminder_number: 1",
            _cleaned: "click | set_field : debug_reminder_number: 1",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "clear_reminders",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "debug_campaign_2",
    status: "released",
    rows: [
      {
        name: "active_campaign_2",
        value: "@campaign.debug_campaign_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "active_campaign_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@campaign.debug_campaign_2",
              matchedExpression: "@campaign.debug_campaign_2",
              type: "campaign",
              fieldName: "debug_campaign_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@campaign.debug_campaign_2": ["value"],
        },
      },
      {
        type: "display_group",
        exclude_from_translation: true,
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "campaign_id",
            value: "Campaign id: @local.active_campaign_2.id",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "display_group.campaign_id",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "Campaign id: @local.active_campaign_2.id",
                  matchedExpression: "@local.active_campaign_2.id",
                  type: "local",
                  fieldName: "active_campaign_2",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.active_campaign_2.id": ["value"],
            },
          },
          {
            type: "round_button",
            name: "campaign_2_quickstart",
            action_list: [
              {
                trigger: "click",
                action_id: "trigger_actions",
                args: ["@local.active_campaign_2.click_action_list"],
                _raw: "click | trigger_actions: @local.active_campaign_2.click_action_list",
                _cleaned: "click | trigger_actions: @local.active_campaign_2.click_action_list",
              },
            ],
            exclude_from_translation: true,
            parameter_list: {
              icon_src: "@local.active_campaign_2.icon",
              text: "@local.active_campaign_2.text",
              style: "home_screen orange",
            },
            style_list: ["padding: 0"],
            _nested_name: "display_group.campaign_2_quickstart",
            _dynamicFields: {
              action_list: {
                "0": {
                  args: {
                    "0": [
                      {
                        fullExpression: "@local.active_campaign_2.click_action_list",
                        matchedExpression: "@local.active_campaign_2.click_action_list",
                        type: "local",
                        fieldName: "active_campaign_2",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression:
                        "click | trigger_actions: @local.active_campaign_2.click_action_list",
                      matchedExpression: "@local.active_campaign_2.click_action_list",
                      type: "local",
                      fieldName: "active_campaign_2",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression:
                        "click | trigger_actions: @local.active_campaign_2.click_action_list",
                      matchedExpression: "@local.active_campaign_2.click_action_list",
                      type: "local",
                      fieldName: "active_campaign_2",
                    },
                  ],
                },
              },
              parameter_list: {
                icon_src: [
                  {
                    fullExpression: "@local.active_campaign_2.icon",
                    matchedExpression: "@local.active_campaign_2.icon",
                    type: "local",
                    fieldName: "active_campaign_2",
                  },
                ],
                text: [
                  {
                    fullExpression: "@local.active_campaign_2.text",
                    matchedExpression: "@local.active_campaign_2.text",
                    type: "local",
                    fieldName: "active_campaign_2",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.active_campaign_2.click_action_list": [
                "action_list.0.args.0",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
              "@local.active_campaign_2.icon": ["parameter_list.icon_src"],
              "@local.active_campaign_2.text": ["parameter_list.text"],
            },
          },
        ],
        name: "display_group",
        _nested_name: "display_group",
      },
      {
        type: "button",
        name: "clear_reminders",
        value: "Reset Reminders",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_default.sent", false],
            _raw: "click | set_field : debug_reminder_default.sent : false",
            _cleaned: "click | set_field : debug_reminder_default.sent : false",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_5.sent", false],
            _raw: "click | set_field : debug_reminder_5.sent : false",
            _cleaned: "click | set_field : debug_reminder_5.sent : false",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_6.sent", false],
            _raw: "click | set_field : debug_reminder_6.sent : false",
            _cleaned: "click | set_field : debug_reminder_6.sent : false",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_7.sent", false],
            _raw: "click | set_field : debug_reminder_7.sent : false",
            _cleaned: "click | set_field : debug_reminder_7.sent : false",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "clear_reminders",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_changed_radio_group_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "set_field",
        name: "demo_changed_field_1",
        value: false,
        exclude_from_translation: true,
        _nested_name: "demo_changed_field_1",
      },
      {
        name: "demo_changed_local",
        value: "demo_changed_field_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "demo_changed_local",
      },
      {
        name: "answer_list_2",
        value: ["name:name_var_1 | text:First", "name:name_var_2 | text:Second"],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_2",
      },
      {
        type: "radio_group",
        name: "radio_group",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["@local.demo_changed_local", "this.value"],
            _raw: "changed | set_field: @local.demo_changed_local: @local.radio_group",
            _cleaned: "changed | set_field: @local.demo_changed_local: @local.radio_group",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list_2",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.demo_changed_local",
                    matchedExpression: "@local.demo_changed_local",
                    type: "local",
                    fieldName: "demo_changed_local",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression:
                    "changed | set_field: @local.demo_changed_local: @local.radio_group",
                  matchedExpression: "@local.demo_changed_local",
                  type: "local",
                  fieldName: "demo_changed_local",
                },
                {
                  fullExpression:
                    "changed | set_field: @local.demo_changed_local: @local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
              _cleaned: [
                {
                  fullExpression:
                    "changed | set_field: @local.demo_changed_local: @local.radio_group",
                  matchedExpression: "@local.demo_changed_local",
                  type: "local",
                  fieldName: "demo_changed_local",
                },
                {
                  fullExpression:
                    "changed | set_field: @local.demo_changed_local: @local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
            },
          },
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_2",
                matchedExpression: "@local.answer_list_2",
                type: "local",
                fieldName: "answer_list_2",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.demo_changed_local": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
          "@local.radio_group": ["action_list.0._raw", "action_list.0._cleaned"],
          "@local.answer_list_2": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_1"',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_1"',
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_1"',
              matchedExpression: "@field.demo_changed_field_1",
              type: "field",
              fieldName: "demo_changed_field_1",
            },
            {
              fullExpression:
                '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_1"',
              matchedExpression: "@field.demo_changed_field_2",
              type: "field",
              fieldName: "demo_changed_field_2",
            },
          ],
          hidden: [
            {
              fullExpression:
                '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_1"',
              matchedExpression: "@field.demo_changed_field_1",
              type: "field",
              fieldName: "demo_changed_field_1",
            },
            {
              fullExpression:
                '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_1"',
              matchedExpression: "@field.demo_changed_field_2",
              type: "field",
              fieldName: "demo_changed_field_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.demo_changed_field_1": ["value", "hidden"],
          "@field.demo_changed_field_2": ["value", "hidden"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_2"',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_2"',
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_2"',
              matchedExpression: "@field.demo_changed_field_1",
              type: "field",
              fieldName: "demo_changed_field_1",
            },
            {
              fullExpression:
                '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_2"',
              matchedExpression: "@field.demo_changed_field_2",
              type: "field",
              fieldName: "demo_changed_field_2",
            },
          ],
          hidden: [
            {
              fullExpression:
                '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_2"',
              matchedExpression: "@field.demo_changed_field_1",
              type: "field",
              fieldName: "demo_changed_field_1",
            },
            {
              fullExpression:
                '@field.demo_changed_field_1 || @field.demo_changed_field_2=="name_var_2"',
              matchedExpression: "@field.demo_changed_field_2",
              type: "field",
              fieldName: "demo_changed_field_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.demo_changed_field_1": ["value", "hidden"],
          "@field.demo_changed_field_2": ["value", "hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_changed_radio_group.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_changed_radio_group_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "set_field",
        name: "demo_changed_field_3",
        value: false,
        exclude_from_translation: true,
        _nested_name: "demo_changed_field_3",
      },
      {
        name: "answer_list_2",
        value: ["name:name_var_1 | text:First", "name:name_var_2 | text:Second"],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_2",
      },
      {
        type: "radio_group",
        name: "radio_group",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["demo_changed_field_4", "this.value"],
            _raw: "changed | set_field: demo_changed_field_4: @local.radio_group",
            _cleaned: "changed | set_field: demo_changed_field_4: @local.radio_group",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list_2",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | set_field: demo_changed_field_4: @local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field: demo_changed_field_4: @local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
            },
          },
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_2",
                matchedExpression: "@local.answer_list_2",
                type: "local",
                fieldName: "answer_list_2",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.radio_group": ["action_list.0._raw", "action_list.0._cleaned"],
          "@local.answer_list_2": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_1"',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_1"',
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_1"',
              matchedExpression: "@field.demo_changed_field_3",
              type: "field",
              fieldName: "demo_changed_field_3",
            },
            {
              fullExpression:
                '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_1"',
              matchedExpression: "@field.demo_changed_field_4",
              type: "field",
              fieldName: "demo_changed_field_4",
            },
          ],
          hidden: [
            {
              fullExpression:
                '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_1"',
              matchedExpression: "@field.demo_changed_field_3",
              type: "field",
              fieldName: "demo_changed_field_3",
            },
            {
              fullExpression:
                '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_1"',
              matchedExpression: "@field.demo_changed_field_4",
              type: "field",
              fieldName: "demo_changed_field_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.demo_changed_field_3": ["value", "hidden"],
          "@field.demo_changed_field_4": ["value", "hidden"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_2"',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_2"',
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_2"',
              matchedExpression: "@field.demo_changed_field_3",
              type: "field",
              fieldName: "demo_changed_field_3",
            },
            {
              fullExpression:
                '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_2"',
              matchedExpression: "@field.demo_changed_field_4",
              type: "field",
              fieldName: "demo_changed_field_4",
            },
          ],
          hidden: [
            {
              fullExpression:
                '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_2"',
              matchedExpression: "@field.demo_changed_field_3",
              type: "field",
              fieldName: "demo_changed_field_3",
            },
            {
              fullExpression:
                '@field.demo_changed_field_3 || @field.demo_changed_field_4=="name_var_2"',
              matchedExpression: "@field.demo_changed_field_4",
              type: "field",
              fieldName: "demo_changed_field_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.demo_changed_field_3": ["value", "hidden"],
          "@field.demo_changed_field_4": ["value", "hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_changed_radio_group.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_changed_radio_group_3",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "set_field",
        name: "demo_changed_field_5",
        value: false,
        exclude_from_translation: true,
        _nested_name: "demo_changed_field_5",
      },
      {
        name: "answer_list_2",
        value: ["name:name_var_1 | text:First", "name:name_var_2 | text:Second"],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_2",
      },
      {
        type: "radio_group",
        name: "radio_group",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["demo_changed_field_6", "this.value"],
            _raw: "changed | set_field: demo_changed_field_6: @local.radio_group",
            _cleaned: "changed | set_field: demo_changed_field_6: @local.radio_group",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list_2",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | set_field: demo_changed_field_6: @local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field: demo_changed_field_6: @local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
            },
          },
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_2",
                matchedExpression: "@local.answer_list_2",
                type: "local",
                fieldName: "answer_list_2",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.radio_group": ["action_list.0._raw", "action_list.0._cleaned"],
          "@local.answer_list_2": ["parameter_list.answer_list"],
        },
      },
      {
        type: "template",
        name: "example_text_1",
        value: "example_text",
        hidden: '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_1"',
        exclude_from_translation: true,
        rows: [
          {
            name: "text",
            value: '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_1"',
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_1.text",
            _dynamicFields: {
              value: [
                {
                  fullExpression:
                    '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_1"',
                  matchedExpression: "@field.demo_changed_field_5",
                  type: "field",
                  fieldName: "demo_changed_field_5",
                },
                {
                  fullExpression:
                    '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_1"',
                  matchedExpression: "@field.demo_changed_field_6",
                  type: "field",
                  fieldName: "demo_changed_field_6",
                },
              ],
            },
            _dynamicDependencies: {
              "@field.demo_changed_field_5": ["value"],
              "@field.demo_changed_field_6": ["value"],
            },
          },
        ],
        _nested_name: "example_text_1",
        _dynamicFields: {
          hidden: [
            {
              fullExpression:
                '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_1"',
              matchedExpression: "@field.demo_changed_field_5",
              type: "field",
              fieldName: "demo_changed_field_5",
            },
            {
              fullExpression:
                '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_1"',
              matchedExpression: "@field.demo_changed_field_6",
              type: "field",
              fieldName: "demo_changed_field_6",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.demo_changed_field_5": ["hidden"],
          "@field.demo_changed_field_6": ["hidden"],
        },
      },
      {
        type: "template",
        name: "example_text_2",
        value: "example_text",
        hidden: '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_2"',
        exclude_from_translation: true,
        rows: [
          {
            name: "text",
            value: '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_2"',
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_2.text",
            _dynamicFields: {
              value: [
                {
                  fullExpression:
                    '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_2"',
                  matchedExpression: "@field.demo_changed_field_5",
                  type: "field",
                  fieldName: "demo_changed_field_5",
                },
                {
                  fullExpression:
                    '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_2"',
                  matchedExpression: "@field.demo_changed_field_6",
                  type: "field",
                  fieldName: "demo_changed_field_6",
                },
              ],
            },
            _dynamicDependencies: {
              "@field.demo_changed_field_5": ["value"],
              "@field.demo_changed_field_6": ["value"],
            },
          },
        ],
        _nested_name: "example_text_2",
        _dynamicFields: {
          hidden: [
            {
              fullExpression:
                '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_2"',
              matchedExpression: "@field.demo_changed_field_5",
              type: "field",
              fieldName: "demo_changed_field_5",
            },
            {
              fullExpression:
                '@field.demo_changed_field_5 || @field.demo_changed_field_6=="name_var_2"',
              matchedExpression: "@field.demo_changed_field_6",
              type: "field",
              fieldName: "demo_changed_field_6",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.demo_changed_field_5": ["hidden"],
          "@field.demo_changed_field_6": ["hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_changed_radio_group.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_changed_radio_group_4",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "set_field",
        name: "demo_changed_field_7",
        value: false,
        exclude_from_translation: true,
        _nested_name: "demo_changed_field_7",
      },
      {
        name: "answer_list_2",
        value: ["name:name_var_1 | text:First", "name:name_var_2 | text:Second"],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_2",
      },
      {
        type: "radio_group",
        name: "radio_group",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["demo_changed_field_8", "this.value"],
            _raw: "changed | set_field: demo_changed_field_8: @local.radio_group",
            _cleaned: "changed | set_field: demo_changed_field_8: @local.radio_group",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list_2",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | set_field: demo_changed_field_8: @local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field: demo_changed_field_8: @local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
            },
          },
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_2",
                matchedExpression: "@local.answer_list_2",
                type: "local",
                fieldName: "answer_list_2",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.radio_group": ["action_list.0._raw", "action_list.0._cleaned"],
          "@local.answer_list_2": ["parameter_list.answer_list"],
        },
      },
      {
        type: "template",
        name: "box_duo",
        value: "box_duo",
        exclude_from_translation: true,
        rows: [
          {
            type: "nested_properties",
            name: "box_1",
            value: "example_text",
            hidden: '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_1"',
            exclude_from_translation: true,
            rows: [
              {
                name: "text",
                value: '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_1"',
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "box_duo.box_1.text",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression:
                        '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_1"',
                      matchedExpression: "@field.demo_changed_field_7",
                      type: "field",
                      fieldName: "demo_changed_field_7",
                    },
                    {
                      fullExpression:
                        '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_1"',
                      matchedExpression: "@field.demo_changed_field_8",
                      type: "field",
                      fieldName: "demo_changed_field_8",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@field.demo_changed_field_7": ["value"],
                  "@field.demo_changed_field_8": ["value"],
                },
              },
            ],
            _nested_name: "box_duo.box_1",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression:
                    '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_1"',
                  matchedExpression: "@field.demo_changed_field_7",
                  type: "field",
                  fieldName: "demo_changed_field_7",
                },
                {
                  fullExpression:
                    '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_1"',
                  matchedExpression: "@field.demo_changed_field_8",
                  type: "field",
                  fieldName: "demo_changed_field_8",
                },
              ],
            },
            _dynamicDependencies: {
              "@field.demo_changed_field_7": ["hidden"],
              "@field.demo_changed_field_8": ["hidden"],
            },
          },
          {
            type: "nested_properties",
            name: "box_2",
            value: "example_text",
            hidden: '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_2"',
            exclude_from_translation: true,
            rows: [
              {
                name: "text",
                value: '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_2"',
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "box_duo.box_2.text",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression:
                        '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_2"',
                      matchedExpression: "@field.demo_changed_field_7",
                      type: "field",
                      fieldName: "demo_changed_field_7",
                    },
                    {
                      fullExpression:
                        '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_2"',
                      matchedExpression: "@field.demo_changed_field_8",
                      type: "field",
                      fieldName: "demo_changed_field_8",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@field.demo_changed_field_7": ["value"],
                  "@field.demo_changed_field_8": ["value"],
                },
              },
            ],
            _nested_name: "box_duo.box_2",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression:
                    '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_2"',
                  matchedExpression: "@field.demo_changed_field_7",
                  type: "field",
                  fieldName: "demo_changed_field_7",
                },
                {
                  fullExpression:
                    '@field.demo_changed_field_7 || @field.demo_changed_field_8=="name_var_2"',
                  matchedExpression: "@field.demo_changed_field_8",
                  type: "field",
                  fieldName: "demo_changed_field_8",
                },
              ],
            },
            _dynamicDependencies: {
              "@field.demo_changed_field_7": ["hidden"],
              "@field.demo_changed_field_8": ["hidden"],
            },
          },
        ],
        _nested_name: "box_duo",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_changed_radio_group.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_combo_box_value",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "answer_list",
        value: [
          "name: name_1 | text: This is text 1",
          "name: name_2 | text: This is text 2",
          "name: name_3 | text: This is text 3",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        type: "combo_box",
        name: "combo_box",
        value: "name_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
        },
        _nested_name: "combo_box",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_combo_box.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_combo_box_input",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "answer_list",
        value: [
          "name: name_1 | text: This is text 1",
          "name: name_2 | text: This is text 2",
          "name: name_3 | text: This is text 3",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        type: "combo_box",
        name: "combo_box",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
          placeholder: "Click here to answer",
          input_allowed: "true",
          answer_placeholder: "Type your own",
        },
        _nested_name: "combo_box",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_result",
        value: "Local combo box variable: @local.combo_box",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_result",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Local combo box variable: @local.combo_box",
              matchedExpression: "@local.combo_box",
              type: "local",
              fieldName: "combo_box",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.combo_box": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_combo_box.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_combo_box_input_var",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "answer_list",
        value: [
          "name: name_1 | text: This is text 1",
          "name: name_2 | text: This is text 2",
          "name: name_3 | text: This is text 3",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        type: "combo_box",
        name: "combo_box_1",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
          placeholder: "Click here to answer",
          input_allowed: "true",
          answer_placeholder: "Type your own",
        },
        _nested_name: "combo_box_1",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
        },
      },
      {
        name: "input_allowed",
        value: true,
        type: "set_variable",
        _nested_name: "input_allowed",
      },
      {
        type: "combo_box",
        name: "combo_box_2",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
          placeholder: "Click here to answer",
          input_allowed: "@local.input_allowed",
          answer_placeholder: "Type your own",
        },
        _nested_name: "combo_box_2",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
            input_allowed: [
              {
                fullExpression: "@local.input_allowed",
                matchedExpression: "@local.input_allowed",
                type: "local",
                fieldName: "input_allowed",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
          "@local.input_allowed": ["parameter_list.input_allowed"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_combo_box.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_combo_box_in_dg",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "display_group",
        name: "display_group_1",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "title",
            name: "title_1",
            value: "Using the condition column",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "display_group_1.title_1",
          },
          {
            name: "answer_list_challenge_1",
            value: [
              "name:choice_1_a | text: choice_1_a",
              "name:choice_1_b | text: choice_1_b",
              "name:choice_1_c | text: choice_1_c",
            ],
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "display_group_1.answer_list_challenge_1",
          },
          {
            type: "combo_box",
            name: "combo_box_challenge_1",
            parameter_list: {
              answer_list: "@local.answer_list_challenge_1",
              placeholder: "@global.tap_and_choose",
            },
            _nested_name: "display_group_1.combo_box_challenge_1",
            _dynamicFields: {
              parameter_list: {
                answer_list: [
                  {
                    fullExpression: "@local.answer_list_challenge_1",
                    matchedExpression: "@local.answer_list_challenge_1",
                    type: "local",
                    fieldName: "answer_list_challenge_1",
                  },
                ],
                placeholder: [
                  {
                    fullExpression: "@global.tap_and_choose",
                    matchedExpression: "@global.tap_and_choose",
                    type: "global",
                    fieldName: "tap_and_choose",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.answer_list_challenge_1": ["parameter_list.answer_list"],
              "@global.tap_and_choose": ["parameter_list.placeholder"],
            },
          },
          {
            type: "text",
            name: "reply_choice_1_a",
            value: "reply_choice_1_a",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: '@local.combo_box_challenge_1=="choice_1_a"',
            exclude_from_translation: true,
            _nested_name: "display_group_1.reply_choice_1_a",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: '@local.combo_box_challenge_1=="choice_1_a"',
                  matchedExpression: "@local.combo_box_challenge_1",
                  type: "local",
                  fieldName: "combo_box_challenge_1",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.combo_box_challenge_1": ["condition"],
            },
          },
          {
            type: "text",
            name: "reply_choice_1_b",
            value: "reply_choice_1_b",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: '@local.combo_box_challenge_1=="choice_1_b"',
            exclude_from_translation: true,
            _nested_name: "display_group_1.reply_choice_1_b",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: '@local.combo_box_challenge_1=="choice_1_b"',
                  matchedExpression: "@local.combo_box_challenge_1",
                  type: "local",
                  fieldName: "combo_box_challenge_1",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.combo_box_challenge_1": ["condition"],
            },
          },
          {
            type: "text",
            name: "reply_choice_1_c",
            value: "reply_choice_1_c",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: '@local.combo_box_challenge_1=="choice_1_c"',
            exclude_from_translation: true,
            _nested_name: "display_group_1.reply_choice_1_c",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: '@local.combo_box_challenge_1=="choice_1_c"',
                  matchedExpression: "@local.combo_box_challenge_1",
                  type: "local",
                  fieldName: "combo_box_challenge_1",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.combo_box_challenge_1": ["condition"],
            },
          },
        ],
        _nested_name: "display_group_1",
      },
      {
        type: "display_group",
        name: "display_group_2",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "title",
            name: "title_2",
            value: "Using the hidden column",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "display_group_2.title_2",
          },
          {
            name: "answer_list_challenge_2",
            value: [
              "name:choice_2_a | text: choice_2_a",
              "name:choice_2_b | text: choice_2_b",
              "name:choice_2_c | text: choice_2_c",
            ],
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "display_group_2.answer_list_challenge_2",
          },
          {
            type: "combo_box",
            name: "combo_box_challenge_2",
            parameter_list: {
              answer_list: "@local.answer_list_challenge_2",
              placeholder: "@global.tap_and_choose",
            },
            _nested_name: "display_group_2.combo_box_challenge_2",
            _dynamicFields: {
              parameter_list: {
                answer_list: [
                  {
                    fullExpression: "@local.answer_list_challenge_2",
                    matchedExpression: "@local.answer_list_challenge_2",
                    type: "local",
                    fieldName: "answer_list_challenge_2",
                  },
                ],
                placeholder: [
                  {
                    fullExpression: "@global.tap_and_choose",
                    matchedExpression: "@global.tap_and_choose",
                    type: "global",
                    fieldName: "tap_and_choose",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.answer_list_challenge_2": ["parameter_list.answer_list"],
              "@global.tap_and_choose": ["parameter_list.placeholder"],
            },
          },
          {
            type: "text",
            name: "reply_choice_2_a",
            value: "reply_choice_2_a",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            hidden: '@local.combo_box_challenge_2!="choice_2_a"',
            exclude_from_translation: true,
            _nested_name: "display_group_2.reply_choice_2_a",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression: '@local.combo_box_challenge_2!="choice_2_a"',
                  matchedExpression: "@local.combo_box_challenge_2",
                  type: "local",
                  fieldName: "combo_box_challenge_2",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.combo_box_challenge_2": ["hidden"],
            },
          },
          {
            type: "text",
            name: "reply_choice_2_b",
            value: "reply_choice_2_b",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            hidden: '@local.combo_box_challenge_2!="choice_2_b"',
            exclude_from_translation: true,
            _nested_name: "display_group_2.reply_choice_2_b",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression: '@local.combo_box_challenge_2!="choice_2_b"',
                  matchedExpression: "@local.combo_box_challenge_2",
                  type: "local",
                  fieldName: "combo_box_challenge_2",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.combo_box_challenge_2": ["hidden"],
            },
          },
          {
            type: "text",
            name: "reply_choice_2_c",
            value: "reply_choice_2_c",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            hidden: '@local.combo_box_challenge_2!="choice_2_c"',
            exclude_from_translation: true,
            _nested_name: "display_group_2.reply_choice_2_c",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression: '@local.combo_box_challenge_2!="choice_2_c"',
                  matchedExpression: "@local.combo_box_challenge_2",
                  type: "local",
                  fieldName: "combo_box_challenge_2",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.combo_box_challenge_2": ["hidden"],
            },
          },
        ],
        _nested_name: "display_group_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_combo_box_in_dg.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_combo_box_not_in_dg",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "Using the condition column",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        name: "answer_list_challenge_1",
        value: [
          "name:choice_1_a | text: choice_1_a",
          "name:choice_1_b | text: choice_1_b",
          "name:choice_1_c | text: choice_1_c",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_challenge_1",
      },
      {
        type: "combo_box",
        name: "combo_box_challenge_1",
        parameter_list: {
          answer_list: "@local.answer_list_challenge_1",
          placeholder: "@global.tap_and_choose",
        },
        _nested_name: "combo_box_challenge_1",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_challenge_1",
                matchedExpression: "@local.answer_list_challenge_1",
                type: "local",
                fieldName: "answer_list_challenge_1",
              },
            ],
            placeholder: [
              {
                fullExpression: "@global.tap_and_choose",
                matchedExpression: "@global.tap_and_choose",
                type: "global",
                fieldName: "tap_and_choose",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list_challenge_1": ["parameter_list.answer_list"],
          "@global.tap_and_choose": ["parameter_list.placeholder"],
        },
      },
      {
        type: "text",
        name: "reply_choice_1_a",
        value: "reply_choice_1_a",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        condition: '@local.combo_box_challenge_1=="choice_1_a"',
        exclude_from_translation: true,
        _nested_name: "reply_choice_1_a",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.combo_box_challenge_1=="choice_1_a"',
              matchedExpression: "@local.combo_box_challenge_1",
              type: "local",
              fieldName: "combo_box_challenge_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.combo_box_challenge_1": ["condition"],
        },
      },
      {
        type: "text",
        name: "reply_choice_1_b",
        value: "reply_choice_1_b",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        condition: '@local.combo_box_challenge_1=="choice_1_b"',
        exclude_from_translation: true,
        _nested_name: "reply_choice_1_b",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.combo_box_challenge_1=="choice_1_b"',
              matchedExpression: "@local.combo_box_challenge_1",
              type: "local",
              fieldName: "combo_box_challenge_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.combo_box_challenge_1": ["condition"],
        },
      },
      {
        type: "text",
        name: "reply_choice_1_c",
        value: "reply_choice_1_c",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        condition: '@local.combo_box_challenge_1=="choice_1_c"',
        exclude_from_translation: true,
        _nested_name: "reply_choice_1_c",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.combo_box_challenge_1=="choice_1_c"',
              matchedExpression: "@local.combo_box_challenge_1",
              type: "local",
              fieldName: "combo_box_challenge_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.combo_box_challenge_1": ["condition"],
        },
      },
      {
        type: "title",
        name: "title_2",
        value: "Using the hidden column",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_2",
      },
      {
        name: "answer_list_challenge_2",
        value: [
          "name:choice_2_a | text: choice_2_a",
          "name:choice_2_b | text: choice_2_b",
          "name:choice_2_c | text: choice_2_c",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_challenge_2",
      },
      {
        type: "combo_box",
        name: "combo_box_challenge_2",
        parameter_list: {
          answer_list: "@local.answer_list_challenge_2",
          placeholder: "@global.tap_and_choose",
        },
        _nested_name: "combo_box_challenge_2",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_challenge_2",
                matchedExpression: "@local.answer_list_challenge_2",
                type: "local",
                fieldName: "answer_list_challenge_2",
              },
            ],
            placeholder: [
              {
                fullExpression: "@global.tap_and_choose",
                matchedExpression: "@global.tap_and_choose",
                type: "global",
                fieldName: "tap_and_choose",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list_challenge_2": ["parameter_list.answer_list"],
          "@global.tap_and_choose": ["parameter_list.placeholder"],
        },
      },
      {
        type: "text",
        name: "reply_choice_2_a",
        value: "reply_choice_2_a",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@local.combo_box_challenge_2!="choice_2_a"',
        exclude_from_translation: true,
        _nested_name: "reply_choice_2_a",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@local.combo_box_challenge_2!="choice_2_a"',
              matchedExpression: "@local.combo_box_challenge_2",
              type: "local",
              fieldName: "combo_box_challenge_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.combo_box_challenge_2": ["hidden"],
        },
      },
      {
        type: "text",
        name: "reply_choice_2_b",
        value: "reply_choice_2_b",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@local.combo_box_challenge_2!="choice_2_b"',
        exclude_from_translation: true,
        _nested_name: "reply_choice_2_b",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@local.combo_box_challenge_2!="choice_2_b"',
              matchedExpression: "@local.combo_box_challenge_2",
              type: "local",
              fieldName: "combo_box_challenge_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.combo_box_challenge_2": ["hidden"],
        },
      },
      {
        type: "text",
        name: "reply_choice_2_c",
        value: "reply_choice_2_c",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@local.combo_box_challenge_2!="choice_2_c"',
        exclude_from_translation: true,
        _nested_name: "reply_choice_2_c",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@local.combo_box_challenge_2!="choice_2_c"',
              matchedExpression: "@local.combo_box_challenge_2",
              type: "local",
              fieldName: "combo_box_challenge_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.combo_box_challenge_2": ["hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_combo_box_in_dg.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_combo_box_variables",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "answer_1_list",
        value: [
          "name: name_1 | text: This is text 1",
          "name: name_2 | text: This is text 2",
          "name: name_3 | text: This is text 3",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_1_list",
      },
      {
        name: "option_1",
        value: "Option 1",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "option_1",
      },
      {
        name: "option_2",
        value: "Option 2",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "option_2",
      },
      {
        name: "option_3",
        value: "Option 3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "option_3",
      },
      {
        name: "answer_2_list",
        value: [
          "name: name_1 | text: @local.option_1",
          "name: name_2 | text: @local.option_2",
          "name: name_3 | text: @local.option_3",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_2_list",
        _dynamicFields: {
          value: {
            "0": [
              {
                fullExpression: "name: name_1 | text: @local.option_1",
                matchedExpression: "@local.option_1",
                type: "local",
                fieldName: "option_1",
              },
            ],
            "1": [
              {
                fullExpression: "name: name_2 | text: @local.option_2",
                matchedExpression: "@local.option_2",
                type: "local",
                fieldName: "option_2",
              },
            ],
            "2": [
              {
                fullExpression: "name: name_3 | text: @local.option_3",
                matchedExpression: "@local.option_3",
                type: "local",
                fieldName: "option_3",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.option_1": ["value.0"],
          "@local.option_2": ["value.1"],
          "@local.option_3": ["value.2"],
        },
      },
      {
        name: "answer_3_list",
        value: [
          "name: name_1 | text: @global.example_global_constant_text",
          "name: name_2 | text: @global.example_global_constant_title",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_3_list",
        _dynamicFields: {
          value: {
            "0": [
              {
                fullExpression: "name: name_1 | text: @global.example_global_constant_text",
                matchedExpression: "@global.example_global_constant_text",
                type: "global",
                fieldName: "example_global_constant_text",
              },
            ],
            "1": [
              {
                fullExpression: "name: name_2 | text: @global.example_global_constant_title",
                matchedExpression: "@global.example_global_constant_title",
                type: "global",
                fieldName: "example_global_constant_title",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.example_global_constant_text": ["value.0"],
          "@global.example_global_constant_title": ["value.1"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "This is the combo box variables debug template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
      },
      {
        type: "text",
        name: "text_2",
        value: "Direct answer list (set through local variable)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
      {
        type: "combo_box",
        name: "combo_box_1",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_1_list",
        },
        _nested_name: "combo_box_1",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_1_list",
                matchedExpression: "@local.answer_1_list",
                type: "local",
                fieldName: "answer_1_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_1_list": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "Answer list contains local variables",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
      },
      {
        type: "combo_box",
        name: "combo_box_2",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_2_list",
        },
        _nested_name: "combo_box_2",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_2_list",
                matchedExpression: "@local.answer_2_list",
                type: "local",
                fieldName: "answer_2_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_2_list": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_4",
        value: "Answer list contains global variables",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4",
      },
      {
        type: "combo_box",
        name: "combo_box_3",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_3_list",
        },
        _nested_name: "combo_box_3",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_3_list",
                matchedExpression: "@local.answer_3_list",
                type: "local",
                fieldName: "answer_3_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_3_list": ["parameter_list.answer_list"],
        },
      },
      {
        name: "spend_time_idea_1",
        value: "Walking to the shops",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "spend_time_idea_1",
      },
      {
        name: "spend_time_idea_2",
        value: "Get water together",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "spend_time_idea_2",
      },
      {
        name: "spend_time_idea_3",
        value: "Doing a chore together",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "spend_time_idea_3",
      },
      {
        name: "spend_time_idea_4",
        value: "Prepare dinner",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "spend_time_idea_4",
      },
      {
        name: "spend_time_idea_5",
        value: "Eat breakfast/lunch/dinner",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "spend_time_idea_5",
      },
      {
        name: "spend_time_idea_6",
        value: "Have tea after school",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "spend_time_idea_6",
      },
      {
        name: "spend_time_idea_7",
        value: "Watch a T.V. show",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "spend_time_idea_7",
      },
      {
        name: "spend_time_idea_8",
        value: "Review homework",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "spend_time_idea_8",
      },
      {
        name: "spend_time_idea_9",
        value: "Chat before bedtime",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "spend_time_idea_9",
      },
      {
        name: "spend_time_idea_10",
        value: "Play a game/sport",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "spend_time_idea_10",
      },
      {
        name: "answer_list",
        value: [
          "name:name_1 | text:@local.spend_time_idea_1",
          "name:name_2 | text:@local.spend_time_idea_2",
          "name:name_3 | text:@local.spend_time_idea_3",
          "name:name_4 | text:@local.spend_time_idea_4",
          "name:name_5 | text:@local.spend_time_idea_5",
          "name:name_6 | text:@local.spend_time_idea_6",
          "name:name_7 | text:@local.spend_time_idea_7",
          "name:name_8 | text:@local.spend_time_idea_8",
          "name:name_9 | text:@local.spend_time_idea_9",
          "name:name_10 | text:@local.spend_time_idea_10",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list",
        _dynamicFields: {
          value: {
            "0": [
              {
                fullExpression: "name:name_1 | text:@local.spend_time_idea_1",
                matchedExpression: "@local.spend_time_idea_1",
                type: "local",
                fieldName: "spend_time_idea_1",
              },
            ],
            "1": [
              {
                fullExpression: "name:name_2 | text:@local.spend_time_idea_2",
                matchedExpression: "@local.spend_time_idea_2",
                type: "local",
                fieldName: "spend_time_idea_2",
              },
            ],
            "2": [
              {
                fullExpression: "name:name_3 | text:@local.spend_time_idea_3",
                matchedExpression: "@local.spend_time_idea_3",
                type: "local",
                fieldName: "spend_time_idea_3",
              },
            ],
            "3": [
              {
                fullExpression: "name:name_4 | text:@local.spend_time_idea_4",
                matchedExpression: "@local.spend_time_idea_4",
                type: "local",
                fieldName: "spend_time_idea_4",
              },
            ],
            "4": [
              {
                fullExpression: "name:name_5 | text:@local.spend_time_idea_5",
                matchedExpression: "@local.spend_time_idea_5",
                type: "local",
                fieldName: "spend_time_idea_5",
              },
            ],
            "5": [
              {
                fullExpression: "name:name_6 | text:@local.spend_time_idea_6",
                matchedExpression: "@local.spend_time_idea_6",
                type: "local",
                fieldName: "spend_time_idea_6",
              },
            ],
            "6": [
              {
                fullExpression: "name:name_7 | text:@local.spend_time_idea_7",
                matchedExpression: "@local.spend_time_idea_7",
                type: "local",
                fieldName: "spend_time_idea_7",
              },
            ],
            "7": [
              {
                fullExpression: "name:name_8 | text:@local.spend_time_idea_8",
                matchedExpression: "@local.spend_time_idea_8",
                type: "local",
                fieldName: "spend_time_idea_8",
              },
            ],
            "8": [
              {
                fullExpression: "name:name_9 | text:@local.spend_time_idea_9",
                matchedExpression: "@local.spend_time_idea_9",
                type: "local",
                fieldName: "spend_time_idea_9",
              },
            ],
            "9": [
              {
                fullExpression: "name:name_10 | text:@local.spend_time_idea_10",
                matchedExpression: "@local.spend_time_idea_10",
                type: "local",
                fieldName: "spend_time_idea_10",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.spend_time_idea_1": ["value.0"],
          "@local.spend_time_idea_2": ["value.1"],
          "@local.spend_time_idea_3": ["value.2"],
          "@local.spend_time_idea_4": ["value.3"],
          "@local.spend_time_idea_5": ["value.4"],
          "@local.spend_time_idea_6": ["value.5"],
          "@local.spend_time_idea_7": ["value.6"],
          "@local.spend_time_idea_8": ["value.7"],
          "@local.spend_time_idea_9": ["value.8"],
          "@local.spend_time_idea_10": ["value.9"],
        },
      },
      {
        type: "combo_box",
        name: "combo_box_4",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
        },
        _nested_name: "combo_box_4",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_component_variables.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_radio_group_variables",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "option_1",
        value: "Option 1",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "option_1",
      },
      {
        name: "option_2",
        value: "Option 2",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "option_2",
      },
      {
        name: "option_3",
        value: "Option 3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "option_3",
      },
      {
        name: "answer_1_list",
        value: ["name:name_1 | text:Text 1", "name:name_2 | text: Text 2"],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_1_list",
      },
      {
        name: "answer_2_list",
        value: ["name:name_1 | text:@local.option_1", "name:name_2 | text:@local.option_2"],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_2_list",
        _dynamicFields: {
          value: {
            "0": [
              {
                fullExpression: "name:name_1 | text:@local.option_1",
                matchedExpression: "@local.option_1",
                type: "local",
                fieldName: "option_1",
              },
            ],
            "1": [
              {
                fullExpression: "name:name_2 | text:@local.option_2",
                matchedExpression: "@local.option_2",
                type: "local",
                fieldName: "option_2",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.option_1": ["value.0"],
          "@local.option_2": ["value.1"],
        },
      },
      {
        name: "answer_3_list",
        value: [
          "name:name_1 | text:@global.example_global_constant_text",
          "name:name_2 | text:@global.example_global_constant_title",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_3_list",
        _dynamicFields: {
          value: {
            "0": [
              {
                fullExpression: "name:name_1 | text:@global.example_global_constant_text",
                matchedExpression: "@global.example_global_constant_text",
                type: "global",
                fieldName: "example_global_constant_text",
              },
            ],
            "1": [
              {
                fullExpression: "name:name_2 | text:@global.example_global_constant_title",
                matchedExpression: "@global.example_global_constant_title",
                type: "global",
                fieldName: "example_global_constant_title",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.example_global_constant_text": ["value.0"],
          "@global.example_global_constant_title": ["value.1"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "This is the radio group variables debug template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
      },
      {
        type: "text",
        name: "text_2",
        value: "Direct answer list (set through local variable)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
      {
        type: "radio_group",
        name: "radio_group_1",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_1_list",
        },
        _nested_name: "radio_group_1",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_1_list",
                matchedExpression: "@local.answer_1_list",
                type: "local",
                fieldName: "answer_1_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_1_list": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "Answer list contains local variables",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
      },
      {
        type: "radio_group",
        name: "radio_group_2",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_2_list",
        },
        _nested_name: "radio_group_2",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_2_list",
                matchedExpression: "@local.answer_2_list",
                type: "local",
                fieldName: "answer_2_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_2_list": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_4",
        value: "Answer list contains global variables",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4",
      },
      {
        type: "radio_group",
        name: "radio_group_3",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_3_list",
        },
        _nested_name: "radio_group_3",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_3_list",
                matchedExpression: "@local.answer_3_list",
                type: "local",
                fieldName: "answer_3_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_3_list": ["parameter_list.answer_list"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_component_variables.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_conditional_messages_q1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "set_field",
        name: "answer_q1",
        value: "NA",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "answer_q1",
      },
      {
        type: "slider",
        name: "slider_q1",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["answer_q1", "this.value"],
            _raw: "changed | set_field:answer_q1:@local.slider_q1",
            _cleaned: "changed | set_field:answer_q1:@local.slider_q1",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          title: "Question 1",
        },
        _nested_name: "slider_q1",
        _dynamicFields: {
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | set_field:answer_q1:@local.slider_q1",
                  matchedExpression: "@local.slider_q1",
                  type: "local",
                  fieldName: "slider_q1",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:answer_q1:@local.slider_q1",
                  matchedExpression: "@local.slider_q1",
                  type: "local",
                  fieldName: "slider_q1",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.slider_q1": ["action_list.0._raw", "action_list.0._cleaned"],
        },
      },
      {
        type: "text",
        name: "text_q1",
        value: "answer to q1 saved in field answer_q1: @field.answer_q1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_q1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "answer to q1 saved in field answer_q1: @field.answer_q1",
              matchedExpression: "@field.answer_q1",
              type: "field",
              fieldName: "answer_q1",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.answer_q1": ["value"],
        },
      },
      {
        type: "button",
        name: "go_to_q2",
        value: "Go to Q2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["debug_conditional_messages_q2"],
            _raw: "click | go_to:debug_conditional_messages_q2",
            _cleaned: "click | go_to:debug_conditional_messages_q2",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "go_to_q2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_conditional_messages.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_conditional_messages_q2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "set_field",
        name: "answer_q2",
        value: "NA",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "answer_q2",
      },
      {
        type: "slider",
        name: "slider_q2",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["answer_q2", "this.value"],
            _raw: "changed | set_field:answer_q2:@local.slider_q2",
            _cleaned: "changed | set_field:answer_q2:@local.slider_q2",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          title: "Question 2",
        },
        _nested_name: "slider_q2",
        _dynamicFields: {
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | set_field:answer_q2:@local.slider_q2",
                  matchedExpression: "@local.slider_q2",
                  type: "local",
                  fieldName: "slider_q2",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:answer_q2:@local.slider_q2",
                  matchedExpression: "@local.slider_q2",
                  type: "local",
                  fieldName: "slider_q2",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.slider_q2": ["action_list.0._raw", "action_list.0._cleaned"],
        },
      },
      {
        type: "text",
        name: "text_q2",
        value: "answer to q2 saved in field answer_q2: @field.answer_q2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_q2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "answer to q2 saved in field answer_q2: @field.answer_q2",
              matchedExpression: "@field.answer_q2",
              type: "field",
              fieldName: "answer_q2",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.answer_q2": ["value"],
        },
      },
      {
        type: "button",
        name: "back_to_q1",
        value: "Back to Q1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["debug_conditional_messages_q1"],
            _raw: "click | go_to:debug_conditional_messages_q1",
            _cleaned: "click | go_to:debug_conditional_messages_q1",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "back_to_q1",
      },
      {
        type: "button",
        name: "conditional_texts",
        value: "Go to conditional texts",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["debug_conditional_texts"],
            _raw: "click | go_to:debug_conditional_texts",
            _cleaned: "click | go_to:debug_conditional_texts",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "conditional_texts",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_conditional_messages.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_conditional_texts",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_q1",
        value: "answer to q1 saved in field answer_q1: @field.answer_q1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_q1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "answer to q1 saved in field answer_q1: @field.answer_q1",
              matchedExpression: "@field.answer_q1",
              type: "field",
              fieldName: "answer_q1",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.answer_q1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_q2",
        value: "answer to q2 saved in field answer_q2: @field.answer_q2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_q2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "answer to q2 saved in field answer_q2: @field.answer_q2",
              matchedExpression: "@field.answer_q2",
              type: "field",
              fieldName: "answer_q2",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.answer_q2": ["value"],
        },
      },
      {
        type: "title",
        name: "title_1",
        value: "Hidden column",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "text",
        name: "conditional_text_1",
        value: "This text shows if the answer to Q1 is less than 4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@field.answer_q1>=4",
        exclude_from_translation: true,
        _nested_name: "conditional_text_1",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@field.answer_q1>=4",
              matchedExpression: "@field.answer_q1",
              type: "field",
              fieldName: "answer_q1",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.answer_q1": ["hidden"],
        },
      },
      {
        type: "text",
        name: "conditional_text_2",
        value: "This text shows if the answer to Q2 is less than 4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@field.answer_q2>=4",
        exclude_from_translation: true,
        _nested_name: "conditional_text_2",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@field.answer_q2>=4",
              matchedExpression: "@field.answer_q2",
              type: "field",
              fieldName: "answer_q2",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.answer_q2": ["hidden"],
        },
      },
      {
        type: "text",
        name: "conditional_text_3",
        value:
          "This text shows if the answer to Q1 is greater than or equal to 4 and the answer to Q2 is greater than or equal to 4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@field.answer_q1<4 || @field.answer_q2<4",
        exclude_from_translation: true,
        _nested_name: "conditional_text_3",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@field.answer_q1<4 || @field.answer_q2<4",
              matchedExpression: "@field.answer_q1",
              type: "field",
              fieldName: "answer_q1",
            },
            {
              fullExpression: "@field.answer_q1<4 || @field.answer_q2<4",
              matchedExpression: "@field.answer_q2",
              type: "field",
              fieldName: "answer_q2",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.answer_q1": ["hidden"],
          "@field.answer_q2": ["hidden"],
        },
      },
      {
        type: "title",
        name: "title_2",
        value: "Condition column",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_2",
      },
      {
        type: "text",
        name: "conditional_text",
        value: "This text is created if the answer to Q1 is greater than or equal to 4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        condition: "@field.answer_q1>=4",
        exclude_from_translation: true,
        _nested_name: "conditional_text",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "@field.answer_q1>=4",
              matchedExpression: "@field.answer_q1",
              type: "field",
              fieldName: "answer_q1",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.answer_q1": ["condition"],
        },
      },
      {
        type: "text",
        name: "conditional_text",
        value: "This text is created if the answer to Q1 is less than 4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        condition: "!(@field.answer_q1>=4)",
        exclude_from_translation: true,
        _nested_name: "conditional_text",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "!(@field.answer_q1>=4)",
              matchedExpression: "@field.answer_q1",
              type: "field",
              fieldName: "answer_q1",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.answer_q1": ["condition"],
        },
      },
      {
        type: "title",
        name: "title_2",
        value: "Condition column through a nested template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_2",
      },
      {
        type: "template",
        name: "example_text_1",
        value: "example_text",
        exclude_from_translation: true,
        rows: [
          {
            name: "text",
            value: "This text is created if the answer to Q1 is greater than or equal to 4",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: "@field.answer_q1>=4",
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_1.text",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: "@field.answer_q1>=4",
                  matchedExpression: "@field.answer_q1",
                  type: "field",
                  fieldName: "answer_q1",
                },
              ],
            },
            _dynamicDependencies: {
              "@field.answer_q1": ["condition"],
            },
          },
          {
            name: "text",
            value: "This text is created if the answer to Q1 is less than 4",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: "!(@field.answer_q1>=4)",
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_1.text",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: "!(@field.answer_q1>=4)",
                  matchedExpression: "@field.answer_q1",
                  type: "field",
                  fieldName: "answer_q1",
                },
              ],
            },
            _dynamicDependencies: {
              "@field.answer_q1": ["condition"],
            },
          },
        ],
        _nested_name: "example_text_1",
      },
      {
        type: "button",
        name: "back_to_q1",
        value: "Back to Q2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["debug_conditional_messages_q2"],
            _raw: "click | go_to:debug_conditional_messages_q2",
            _cleaned: "click | go_to:debug_conditional_messages_q2",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "back_to_q1",
      },
      {
        type: "template",
        name: "example_text_2",
        value: "example_text",
        exclude_from_translation: true,
        rows: [
          {
            name: "text",
            value: "not printed",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: "1>2",
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_2.text",
          },
          {
            name: "text",
            value: "printed",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: "2>1",
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_2.text",
          },
        ],
        _nested_name: "example_text_2",
      },
      {
        type: "template",
        name: "example_text_3",
        value: "example_text",
        exclude_from_translation: true,
        rows: [
          {
            name: "text",
            value: "printed",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: "2>1",
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_3.text",
          },
          {
            name: "text",
            value: "not printed",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: "1>2",
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_3.text",
          },
        ],
        _nested_name: "example_text_3",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_conditional_messages.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_data_image",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_1",
        value: "Print text  and image of item 1:\n\n@data.debug.item_1.text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Print text  and image of item 1:\n\n@data.debug.item_1.text",
              matchedExpression: "@data.debug.item_1.text",
              type: "data",
              fieldName: "debug",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.debug.item_1.text": ["value"],
        },
      },
      {
        type: "image",
        name: "image_1",
        value: "@data.debug.item_1.image_asset",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "image_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.debug.item_1.image_asset",
              matchedExpression: "@data.debug.item_1.image_asset",
              type: "data",
              fieldName: "debug",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.debug.item_1.image_asset": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value:
          "The parent point box below shows that the icon_src is NOT found when called through a data field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
      {
        type: "parent_point_box",
        name: "parent_point_box_1",
        exclude_from_translation: true,
        parameter_list: {
          text: "@data.debug.item_1.text",
          icon_src: "@data.debug.item_1.image_asset",
        },
        _nested_name: "parent_point_box_1",
        _dynamicFields: {
          parameter_list: {
            text: [
              {
                fullExpression: "@data.debug.item_1.text",
                matchedExpression: "@data.debug.item_1.text",
                type: "data",
                fieldName: "debug",
              },
            ],
            icon_src: [
              {
                fullExpression: "@data.debug.item_1.image_asset",
                matchedExpression: "@data.debug.item_1.image_asset",
                type: "data",
                fieldName: "debug",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@data.debug.item_1.text": ["parameter_list.text"],
          "@data.debug.item_1.image_asset": ["parameter_list.icon_src"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "The parent point box below shows that the icon_src IS found when called directly",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
      },
      {
        type: "parent_point_box",
        name: "parent_point_box_2",
        exclude_from_translation: true,
        parameter_list: {
          text: "@data.debug.item_1.text",
          icon_src: "plh_images/habits/habit_relax.svg",
        },
        _nested_name: "parent_point_box_2",
        _dynamicFields: {
          parameter_list: {
            text: [
              {
                fullExpression: "@data.debug.item_1.text",
                matchedExpression: "@data.debug.item_1.text",
                type: "data",
                fieldName: "debug",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@data.debug.item_1.text": ["parameter_list.text"],
        },
      },
      {
        value:
          "The tile below shows that the icon_src is NOT found when called through a data field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        name: "set_variable",
        _nested_name: "set_variable",
      },
      {
        type: "tile_component",
        name: "quick_start_tile_1",
        exclude_from_translation: true,
        parameter_list: {
          style: "quick_start_dark",
          first_line_text: "@data.debug.item_2.text",
          second_line_text: "image through data",
          icon_src: "@data.debug.item_2.image_asset",
        },
        _nested_name: "quick_start_tile_1",
        _dynamicFields: {
          parameter_list: {
            first_line_text: [
              {
                fullExpression: "@data.debug.item_2.text",
                matchedExpression: "@data.debug.item_2.text",
                type: "data",
                fieldName: "debug",
              },
            ],
            icon_src: [
              {
                fullExpression: "@data.debug.item_2.image_asset",
                matchedExpression: "@data.debug.item_2.image_asset",
                type: "data",
                fieldName: "debug",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@data.debug.item_2.text": ["parameter_list.first_line_text"],
          "@data.debug.item_2.image_asset": ["parameter_list.icon_src"],
        },
      },
      {
        value: "The tile below shows that the icon_src IS found when called directly",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        name: "set_variable",
        _nested_name: "set_variable",
      },
      {
        type: "tile_component",
        name: "quick_start_tile_2",
        exclude_from_translation: true,
        parameter_list: {
          style: "quick_start_dark",
          first_line_text: "@data.debug.item_2.text",
          second_line_text: "image loaded directly",
          icon_src: "plh_images/icons/play_white.svg",
        },
        _nested_name: "quick_start_tile_2",
        _dynamicFields: {
          parameter_list: {
            first_line_text: [
              {
                fullExpression: "@data.debug.item_2.text",
                matchedExpression: "@data.debug.item_2.text",
                type: "data",
                fieldName: "debug",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@data.debug.item_2.text": ["parameter_list.first_line_text"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_data_lists.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_data_bottom",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_1",
        value: "@data.debug.item_1.text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.debug.item_1.text",
              matchedExpression: "@data.debug.item_1.text",
              type: "data",
              fieldName: "debug",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.debug.item_1.text": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "This text is directly authored in the value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
      {
        type: "text",
        name: "text_3",
        value: "This text is directly authored in the value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
      },
      {
        type: "text",
        name: "text_4",
        value: "@data.debug.item_1.text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.debug.item_1.text",
              matchedExpression: "@data.debug.item_1.text",
              type: "data",
              fieldName: "debug",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.debug.item_1.text": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_data_lists.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_data_middle",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "debug_data_bottom",
        value: "debug_data_bottom",
        exclude_from_translation: true,
        rows: [
          {
            name: "text_1",
            value: "@data.debug.item_2.text",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_data_bottom.text_1",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.debug.item_2.text",
                  matchedExpression: "@data.debug.item_2.text",
                  type: "data",
                  fieldName: "debug",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.debug.item_2.text": ["value"],
            },
          },
          {
            name: "text_2",
            value: "@data.debug.item_2.text",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_data_bottom.text_2",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.debug.item_2.text",
                  matchedExpression: "@data.debug.item_2.text",
                  type: "data",
                  fieldName: "debug",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.debug.item_2.text": ["value"],
            },
          },
          {
            name: "text_3",
            value: "This text is overridden directly in the value",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_data_bottom.text_3",
          },
        ],
        _nested_name: "debug_data_bottom",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_data_lists.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_data_top",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "debug_data_middle",
        value: "debug_data_middle",
        exclude_from_translation: true,
        rows: [
          {
            type: "nested_properties",
            name: "debug_data_bottom",
            exclude_from_translation: true,
            rows: [
              {
                name: "text_2",
                value: "@data.debug.item_3.text",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_data_middle.debug_data_bottom.text_2",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@data.debug.item_3.text",
                      matchedExpression: "@data.debug.item_3.text",
                      type: "data",
                      fieldName: "debug",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@data.debug.item_3.text": ["value"],
                },
              },
              {
                name: "text_3",
                value: "@data.debug.item_3.text",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_data_middle.debug_data_bottom.text_3",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@data.debug.item_3.text",
                      matchedExpression: "@data.debug.item_3.text",
                      type: "data",
                      fieldName: "debug",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@data.debug.item_3.text": ["value"],
                },
              },
              {
                name: "text_4",
                value: "@data.debug.item_3.text",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_data_middle.debug_data_bottom.text_4",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@data.debug.item_3.text",
                      matchedExpression: "@data.debug.item_3.text",
                      type: "data",
                      fieldName: "debug",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@data.debug.item_3.text": ["value"],
                },
              },
            ],
            _nested_name: "debug_data_middle.debug_data_bottom",
          },
        ],
        _nested_name: "debug_data_middle",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_data_lists.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_dg_form",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "display_group",
        name: "form",
        value: "form",
        parameter_list: {
          style: "form",
          get_device_info: "true",
          button_text: "Send",
        },
        rows: [
          {
            type: "simple_checkbox",
            name: "checkbox_1",
            value: false,
            action_list: [
              {
                trigger: "changed",
                action_id: "set_field",
                args: ["demo_changed_field_checkbox_1", "this.value"],
                _raw: "changed | set_field:demo_changed_field_checkbox_1:@local.checkbox_1",
                _cleaned: "changed | set_field:demo_changed_field_checkbox_1:@local.checkbox_1",
              },
            ],
            exclude_from_translation: true,
            parameter_list: {
              label_text: "checkbox 1",
              align: "left",
            },
            _nested_name: "form.checkbox_1",
            _dynamicFields: {
              action_list: {
                "0": {
                  _raw: [
                    {
                      fullExpression:
                        "changed | set_field:demo_changed_field_checkbox_1:@local.checkbox_1",
                      matchedExpression: "@local.checkbox_1",
                      type: "local",
                      fieldName: "checkbox_1",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression:
                        "changed | set_field:demo_changed_field_checkbox_1:@local.checkbox_1",
                      matchedExpression: "@local.checkbox_1",
                      type: "local",
                      fieldName: "checkbox_1",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@local.checkbox_1": ["action_list.0._raw", "action_list.0._cleaned"],
            },
          },
          {
            type: "simple_checkbox",
            name: "checkbox_2",
            value: false,
            action_list: [
              {
                trigger: "changed",
                action_id: "set_field",
                args: ["demo_changed_field_checkbox_2", "@local.form.checkbox_1"],
                _raw: "changed | set_field:demo_changed_field_checkbox_2:@local.form.checkbox_1",
                _cleaned:
                  "changed | set_field:demo_changed_field_checkbox_2:@local.form.checkbox_1",
              },
            ],
            exclude_from_translation: true,
            parameter_list: {
              label_text: "checkbox 2",
              align: "left",
            },
            _nested_name: "form.checkbox_2",
            _dynamicFields: {
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "@local.form.checkbox_1",
                        matchedExpression: "@local.form.checkbox_1",
                        type: "local",
                        fieldName: "form",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression:
                        "changed | set_field:demo_changed_field_checkbox_2:@local.form.checkbox_1",
                      matchedExpression: "@local.form.checkbox_1",
                      type: "local",
                      fieldName: "form",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression:
                        "changed | set_field:demo_changed_field_checkbox_2:@local.form.checkbox_1",
                      matchedExpression: "@local.form.checkbox_1",
                      type: "local",
                      fieldName: "form",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@local.form.checkbox_1": [
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
            },
          },
          {
            name: "text_checkbox_3",
            value: "Contact me via email",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            type: "set_variable",
            _nested_name: "form.text_checkbox_3",
          },
          {
            type: "simple_checkbox",
            name: "checkbox_3",
            parameter_list: {
              label_text: "checkbox 3",
              align: "left",
            },
            _nested_name: "form.checkbox_3",
          },
          {
            type: "text",
            name: "text_checkbox_3",
            value: "Checkbox 3 text",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            hidden: "!@local.checkbox_3",
            _nested_name: "form.text_checkbox_3",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression: "!@local.checkbox_3",
                  matchedExpression: "!@local.checkbox_3",
                  type: "local",
                  fieldName: "checkbox_3",
                },
              ],
            },
            _dynamicDependencies: {
              "!@local.checkbox_3": ["hidden"],
            },
          },
          {
            type: "text",
            name: "text_checkbox_3_form",
            value: "Checkbox 3 form text",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            hidden: "!@local.form.checkbox_3",
            _nested_name: "form.text_checkbox_3_form",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression: "!@local.form.checkbox_3",
                  matchedExpression: "!@local.form.checkbox_3",
                  type: "local",
                  fieldName: "form",
                },
              ],
            },
            _dynamicDependencies: {
              "!@local.form.checkbox_3": ["hidden"],
            },
          },
        ],
        _nested_name: "form",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_dg.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_dg_var",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "var_1",
        value: "Value",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "var_1",
      },
      {
        type: "title",
        name: "title_1",
        value: "Correctly spaced dg",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "display_group",
        name: "dg_1",
        rows: [
          {
            type: "number_selector",
            name: "number_selector_1",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_1.number_selector_1",
          },
          {
            type: "number_selector",
            name: "number_selector_2",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_1.number_selector_2",
          },
        ],
        _nested_name: "dg_1",
      },
      {
        type: "title",
        name: "title_2",
        value: "Correctly spaced dg with variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_2",
      },
      {
        type: "display_group",
        name: "dg_2",
        rows: [
          {
            type: "number_selector",
            name: "number_selector_3",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_2.number_selector_3",
          },
          {
            type: "number_selector",
            name: "number_selector_4",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_2.number_selector_4",
          },
          {
            name: "var_2",
            value: "Value",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "dg_2.var_2",
          },
        ],
        _nested_name: "dg_2",
      },
      {
        type: "title",
        name: "title_3",
        value: "Awkwardly spaced dg with nested variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_3",
      },
      {
        type: "display_group",
        name: "dg_3",
        rows: [
          {
            type: "number_selector",
            name: "number_selector_5",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_3.number_selector_5",
          },
          {
            type: "number_selector",
            name: "number_selector_6",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_3.number_selector_6",
          },
          {
            name: "var_3",
            value: "@local.var_1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "dg_3.var_3",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.var_1",
                  matchedExpression: "@local.var_1",
                  type: "local",
                  fieldName: "var_1",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.var_1": ["value"],
            },
          },
        ],
        _nested_name: "dg_3",
      },
      {
        type: "title",
        name: "title_4",
        value: "Correctly spaced dg with nested variable (this flex should be the default)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "title_4",
      },
      {
        type: "display_group",
        name: "dg_4",
        rows: [
          {
            type: "number_selector",
            name: "number_selector_7",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_4.number_selector_7",
          },
          {
            type: "number_selector",
            name: "number_selector_8",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_4.number_selector_8",
          },
          {
            name: "var_4",
            value: "@local.var_1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            style_list: ["flex: 0"],
            type: "set_variable",
            _nested_name: "dg_4.var_4",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.var_1",
                  matchedExpression: "@local.var_1",
                  type: "local",
                  fieldName: "var_1",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.var_1": ["value"],
            },
          },
        ],
        _nested_name: "dg_4",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_dg.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_dg_form_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "display_group",
        name: "form",
        value: "form",
        parameter_list: {
          style: "form",
          get_device_info: "true",
          button_text: "Send",
        },
        rows: [
          {
            type: "simple_checkbox",
            name: "checkbox_1",
            value: false,
            action_list: [
              {
                trigger: "changed",
                action_id: "set_field",
                args: ["demo_changed_field_checkbox_1", "this.value"],
                _raw: "changed | set_field:demo_changed_field_checkbox_1:@local.checkbox_1",
                _cleaned: "changed | set_field:demo_changed_field_checkbox_1:@local.checkbox_1",
              },
            ],
            exclude_from_translation: true,
            parameter_list: {
              label_text: "checkbox 1",
              align: "left",
            },
            _nested_name: "form.checkbox_1",
            _dynamicFields: {
              action_list: {
                "0": {
                  _raw: [
                    {
                      fullExpression:
                        "changed | set_field:demo_changed_field_checkbox_1:@local.checkbox_1",
                      matchedExpression: "@local.checkbox_1",
                      type: "local",
                      fieldName: "checkbox_1",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression:
                        "changed | set_field:demo_changed_field_checkbox_1:@local.checkbox_1",
                      matchedExpression: "@local.checkbox_1",
                      type: "local",
                      fieldName: "checkbox_1",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@local.checkbox_1": ["action_list.0._raw", "action_list.0._cleaned"],
            },
          },
          {
            type: "simple_checkbox",
            name: "checkbox_2",
            value: false,
            action_list: [
              {
                trigger: "changed",
                action_id: "set_field",
                args: ["demo_changed_field_checkbox_2", "@local.form.checkbox_1"],
                _raw: "changed | set_field:demo_changed_field_checkbox_2:@local.form.checkbox_1",
                _cleaned:
                  "changed | set_field:demo_changed_field_checkbox_2:@local.form.checkbox_1",
              },
            ],
            exclude_from_translation: true,
            parameter_list: {
              label_text: "checkbox 2",
              align: "left",
            },
            _nested_name: "form.checkbox_2",
            _dynamicFields: {
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "@local.form.checkbox_1",
                        matchedExpression: "@local.form.checkbox_1",
                        type: "local",
                        fieldName: "form",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression:
                        "changed | set_field:demo_changed_field_checkbox_2:@local.form.checkbox_1",
                      matchedExpression: "@local.form.checkbox_1",
                      type: "local",
                      fieldName: "form",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression:
                        "changed | set_field:demo_changed_field_checkbox_2:@local.form.checkbox_1",
                      matchedExpression: "@local.form.checkbox_1",
                      type: "local",
                      fieldName: "form",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@local.form.checkbox_1": [
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
            },
          },
          {
            name: "text_checkbox_3",
            value: "Contact me via email",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            type: "set_variable",
            _nested_name: "form.text_checkbox_3",
          },
          {
            type: "simple_checkbox",
            name: "checkbox_3",
            parameter_list: {
              label_text: "checkbox 3",
              align: "left",
            },
            _nested_name: "form.checkbox_3",
          },
          {
            type: "text",
            name: "text_checkbox_3",
            value: "Checkbox 3 text",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            hidden: "!@local.checkbox_3",
            _nested_name: "form.text_checkbox_3",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression: "!@local.checkbox_3",
                  matchedExpression: "!@local.checkbox_3",
                  type: "local",
                  fieldName: "checkbox_3",
                },
              ],
            },
            _dynamicDependencies: {
              "!@local.checkbox_3": ["hidden"],
            },
          },
          {
            type: "text",
            name: "text_checkbox_3_form",
            value: "Checkbox 3 form text",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            hidden: "!@local.form.checkbox_3",
            _nested_name: "form.text_checkbox_3_form",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression: "!@local.form.checkbox_3",
                  matchedExpression: "!@local.form.checkbox_3",
                  type: "local",
                  fieldName: "form",
                },
              ],
            },
            _dynamicDependencies: {
              "!@local.form.checkbox_3": ["hidden"],
            },
          },
        ],
        _nested_name: "form",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_dg_testing.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_dg_var_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "var_1",
        value: "Value",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "var_1",
      },
      {
        type: "title",
        name: "title_1",
        value: "Correctly spaced dg Saqlain",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "display_group",
        name: "dg_1",
        rows: [
          {
            type: "number_selector",
            name: "number_selector_1",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_1.number_selector_1",
          },
          {
            type: "number_selector",
            name: "number_selector_2",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_1.number_selector_2",
          },
        ],
        _nested_name: "dg_1",
      },
      {
        type: "title",
        name: "title_2",
        value: "Correctly spaced dg with variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_2",
      },
      {
        type: "display_group",
        name: "dg_2",
        rows: [
          {
            type: "number_selector",
            name: "number_selector_3",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_2.number_selector_3",
          },
          {
            type: "number_selector",
            name: "number_selector_4",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_2.number_selector_4",
          },
          {
            name: "var_2",
            value: "Value",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "dg_2.var_2",
          },
        ],
        _nested_name: "dg_2",
      },
      {
        type: "title",
        name: "title_3",
        value: "Awkwardly spaced dg with nested variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_3",
      },
      {
        type: "display_group",
        name: "dg_3",
        rows: [
          {
            type: "number_selector",
            name: "number_selector_5",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_3.number_selector_5",
          },
          {
            type: "number_selector",
            name: "number_selector_6",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_3.number_selector_6",
          },
          {
            name: "var_3",
            value: "@local.var_1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "dg_3.var_3",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.var_1",
                  matchedExpression: "@local.var_1",
                  type: "local",
                  fieldName: "var_1",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.var_1": ["value"],
            },
          },
        ],
        _nested_name: "dg_3",
      },
      {
        type: "title",
        name: "title_4",
        value: "Correctly spaced dg with nested variable (this flex should be the default)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "title_4",
      },
      {
        type: "display_group",
        name: "dg_4",
        rows: [
          {
            type: "number_selector",
            name: "number_selector_7",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_4.number_selector_7",
          },
          {
            type: "number_selector",
            name: "number_selector_8",
            parameter_list: {
              min_value: "0",
              max_value: "20",
            },
            _nested_name: "dg_4.number_selector_8",
          },
          {
            name: "var_4",
            value: "@local.var_1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "dg_4.var_4",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.var_1",
                  matchedExpression: "@local.var_1",
                  type: "local",
                  fieldName: "var_1",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.var_1": ["value"],
            },
          },
        ],
        _nested_name: "dg_4",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_dg_testing.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_go_to_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value: "This is the first template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "button",
        name: "button_go_to_1",
        value: "Go to the second template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["debug_go_to_2"],
            _raw: "click | go_to:debug_go_to_2",
            _cleaned: "click | go_to:debug_go_to_2",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_go_to_1",
      },
      {
        type: "text",
        name: "go_to_field",
        value: "Value of debug_go_to_field: @fields.debug_go_to_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "go_to_field",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_go_to_field: @fields.debug_go_to_field",
              matchedExpression: "@fields.debug_go_to_field",
              type: "fields",
              fieldName: "debug_go_to_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_go_to_field": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_double_go_to.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_go_to_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value: "This is the second template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "text_box",
        name: "debug_text_box",
        value: "@fields.debug_go_to_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["debug_go_to_field", "this.value"],
            _raw: "changed | set_field:debug_go_to_field:@local.debug_text_box",
            _cleaned: "changed | set_field:debug_go_to_field:@local.debug_text_box",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "debug_text_box",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields.debug_go_to_field",
              matchedExpression: "@fields.debug_go_to_field",
              type: "fields",
              fieldName: "debug_go_to_field",
            },
          ],
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | set_field:debug_go_to_field:@local.debug_text_box",
                  matchedExpression: "@local.debug_text_box",
                  type: "local",
                  fieldName: "debug_text_box",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:debug_go_to_field:@local.debug_text_box",
                  matchedExpression: "@local.debug_text_box",
                  type: "local",
                  fieldName: "debug_text_box",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@fields.debug_go_to_field": ["value"],
          "@local.debug_text_box": ["action_list.0._raw", "action_list.0._cleaned"],
        },
      },
      {
        type: "text",
        name: "go_to_field",
        value:
          "Value of debug_go_to_field: \nlocal: @local.debug_text_box;\nfield: @fields.debug_go_to_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "go_to_field",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "Value of debug_go_to_field: \nlocal: @local.debug_text_box;\nfield: @fields.debug_go_to_field",
              matchedExpression: "@local.debug_text_box",
              type: "local",
              fieldName: "debug_text_box",
            },
            {
              fullExpression:
                "Value of debug_go_to_field: \nlocal: @local.debug_text_box;\nfield: @fields.debug_go_to_field",
              matchedExpression: "@fields.debug_go_to_field",
              type: "fields",
              fieldName: "debug_go_to_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.debug_text_box": ["value"],
          "@fields.debug_go_to_field": ["value"],
        },
      },
      {
        type: "button",
        name: "button_go_to_1",
        value: "Go to the third template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["debug_go_to_3"],
            _raw: "click | go_to:debug_go_to_3",
            _cleaned: "click | go_to:debug_go_to_3",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_go_to_1",
      },
      {
        type: "button",
        name: "button_completed",
        value: "Complete the current template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "emit",
            args: ["completed"],
            _raw: "click | emit:completed",
            _cleaned: "click | emit:completed",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_completed",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_double_go_to.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_go_to_3",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value: "This is the third template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "button",
        name: "button_completed",
        value: "Complete the current template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "emit",
            args: ["completed"],
            _raw: "click | emit:completed",
            _cleaned: "click | emit:completed",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_completed",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_double_go_to.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_radio_group",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "answer_list",
        value: [
          "name:name_var_1 | text:First",
          "name:name_var_2 | text:Second",
          "name:name_var_3 | text:Third",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        type: "text",
        name: "text",
        value: "This is the radio group debug template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "radio_group",
        name: "radio_group",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_double_radio_group.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_double_radio_group_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "template_name",
        value: "debug_radio_group",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "template_name",
      },
      {
        type: "template",
        name: "debug_radio_group_1",
        value: "debug_radio_group",
        exclude_from_translation: true,
        rows: [
          {
            name: "text",
            value: "This is the first instance of @local.template_name",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_1.text",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "This is the first instance of @local.template_name",
                  matchedExpression: "@local.template_name",
                  type: "local",
                  fieldName: "template_name",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.template_name": ["value"],
            },
          },
          {
            name: "answer_list",
            value: [
              "name:name_var_1 | text:First",
              "name:name_var_2 | text:Second",
              "name:name_var_3 | text:Third",
            ],
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_1.answer_list",
          },
        ],
        _nested_name: "debug_radio_group_1",
      },
      {
        type: "template",
        name: "debug_radio_group_2",
        value: "debug_radio_group",
        exclude_from_translation: true,
        rows: [
          {
            name: "text",
            value: "This is the second instance of debug_radio_group",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_2.text",
          },
          {
            name: "answer_list",
            value: [
              "name:name_var_4 | text:1",
              "name:name_var_5 | text:2",
              "name:name_var_6 | text:3",
            ],
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_2.answer_list",
          },
        ],
        _nested_name: "debug_radio_group_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_double_radio_group.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_double_radio_group_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "template_name",
        value: "debug_radio_group",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "template_name",
      },
      {
        name: "answer_list_1_list",
        value: [
          "name:name_var_1 | text:First",
          "name:name_var_2 | text:Second",
          "name:name_var_3 | text:Third",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_1_list",
      },
      {
        name: "answer_list_2_list",
        value: ["name:name_var_1 | text:1", "name:name_var_2 | text:2", "name:name_var_3 | text:3"],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_2_list",
      },
      {
        type: "template",
        name: "debug_radio_group_1",
        value: "debug_radio_group",
        exclude_from_translation: true,
        rows: [
          {
            name: "text",
            value: "This is the first instance of @local.template_name",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_1.text",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "This is the first instance of @local.template_name",
                  matchedExpression: "@local.template_name",
                  type: "local",
                  fieldName: "template_name",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.template_name": ["value"],
            },
          },
          {
            name: "answer_list",
            value: ["@local.answer_list_1_list"],
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_1.answer_list",
            _dynamicFields: {
              value: {
                "0": [
                  {
                    fullExpression: "@local.answer_list_1_list",
                    matchedExpression: "@local.answer_list_1_list",
                    type: "local",
                    fieldName: "answer_list_1_list",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.answer_list_1_list": ["value.0"],
            },
          },
        ],
        _nested_name: "debug_radio_group_1",
      },
      {
        type: "template",
        name: "debug_radio_group_2",
        value: "debug_radio_group",
        exclude_from_translation: true,
        rows: [
          {
            name: "text",
            value: "This is the second instance of debug_radio_group",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_2.text",
          },
          {
            name: "answer_list",
            value: ["@local.answer_list_2_list"],
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_2.answer_list",
            _dynamicFields: {
              value: {
                "0": [
                  {
                    fullExpression: "@local.answer_list_2_list",
                    matchedExpression: "@local.answer_list_2_list",
                    type: "local",
                    fieldName: "answer_list_2_list",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.answer_list_2_list": ["value.0"],
            },
          },
        ],
        _nested_name: "debug_radio_group_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_double_radio_group.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_slider_dynamic",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "slider",
        name: "slider_1",
        exclude_from_translation: true,
        parameter_list: {
          title: "Slider 1",
        },
        _nested_name: "slider_1",
      },
      {
        type: "text",
        name: "text_1",
        value: "local variable for slider 1: @local.slider_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "local variable for slider 1: @local.slider_1",
              matchedExpression: "@local.slider_1",
              type: "local",
              fieldName: "slider_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.slider_1": ["value"],
        },
      },
      {
        type: "slider",
        name: "slider_2",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["slider_2_field", "this.value"],
            _raw: "changed | set_field:slider_2_field:@local.slider_2",
            _cleaned: "changed | set_field:slider_2_field:@local.slider_2",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          title: "Slider 2",
        },
        _nested_name: "slider_2",
        _dynamicFields: {
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | set_field:slider_2_field:@local.slider_2",
                  matchedExpression: "@local.slider_2",
                  type: "local",
                  fieldName: "slider_2",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:slider_2_field:@local.slider_2",
                  matchedExpression: "@local.slider_2",
                  type: "local",
                  fieldName: "slider_2",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.slider_2": ["action_list.0._raw", "action_list.0._cleaned"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "local variable for slider 2: @local.slider_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "local variable for slider 2: @local.slider_2",
              matchedExpression: "@local.slider_2",
              type: "local",
              fieldName: "slider_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.slider_2": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "field for slider 2: @field.slider_2_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "field for slider 2: @field.slider_2_field",
              matchedExpression: "@field.slider_2_field",
              type: "field",
              fieldName: "slider_2_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.slider_2_field": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_dynamic.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_radio_group_dynamic",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "answer_list",
        value: ["name:name_var_1 | text:First", "name:name_var_2 | text:Second"],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        type: "radio_group",
        name: "radio_group_1",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
        },
        _nested_name: "radio_group_1",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "local variable for radio group 1: @local.radio_group_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "local variable for radio group 1: @local.radio_group_1",
              matchedExpression: "@local.radio_group_1",
              type: "local",
              fieldName: "radio_group_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group_1": ["value"],
        },
      },
      {
        type: "radio_group",
        name: "radio_group_2",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["radio_group_2_field", "this.value"],
            _raw: "changed | set_field:radio_group_2_field:@local.radio_group_2",
            _cleaned: "changed | set_field:radio_group_2_field:@local.radio_group_2",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
        },
        _nested_name: "radio_group_2",
        _dynamicFields: {
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | set_field:radio_group_2_field:@local.radio_group_2",
                  matchedExpression: "@local.radio_group_2",
                  type: "local",
                  fieldName: "radio_group_2",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:radio_group_2_field:@local.radio_group_2",
                  matchedExpression: "@local.radio_group_2",
                  type: "local",
                  fieldName: "radio_group_2",
                },
              ],
            },
          },
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.radio_group_2": ["action_list.0._raw", "action_list.0._cleaned"],
          "@local.answer_list": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "local variable for radio group 2: @local.radio_group_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "local variable for radio group 2: @local.radio_group_2",
              matchedExpression: "@local.radio_group_2",
              type: "local",
              fieldName: "radio_group_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group_2": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "field for radio group 2: @field.radio_group_2_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "field for radio group 2: @field.radio_group_2_field",
              matchedExpression: "@field.radio_group_2_field",
              type: "field",
              fieldName: "radio_group_2_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.radio_group_2_field": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_dynamic.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_combo_box_dynamic",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "answer_list",
        value: [
          "name: name_1 | text: This is text 1",
          "name: name_2 | text: This is text 2",
          "name: name_3 | text: This is text 3",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        name: "combo_box_2_var",
        value: "combo_box_2_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "combo_box_2_var",
      },
      {
        type: "combo_box",
        name: "combo_box_1",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
        },
        _nested_name: "combo_box_1",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "local variable for combo box 1: @local.combo_box_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "local variable for combo box 1: @local.combo_box_1",
              matchedExpression: "@local.combo_box_1",
              type: "local",
              fieldName: "combo_box_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.combo_box_1": ["value"],
        },
      },
      {
        type: "combo_box",
        name: "combo_box_2",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["@local.combo_box_2_var", "this.value"],
            _raw: "changed | set_field:@local.combo_box_2_var:@local.combo_box_2",
            _cleaned: "changed | set_field:@local.combo_box_2_var:@local.combo_box_2",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
        },
        _nested_name: "combo_box_2",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.combo_box_2_var",
                    matchedExpression: "@local.combo_box_2_var",
                    type: "local",
                    fieldName: "combo_box_2_var",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "changed | set_field:@local.combo_box_2_var:@local.combo_box_2",
                  matchedExpression: "@local.combo_box_2_var",
                  type: "local",
                  fieldName: "combo_box_2_var",
                },
                {
                  fullExpression: "changed | set_field:@local.combo_box_2_var:@local.combo_box_2",
                  matchedExpression: "@local.combo_box_2",
                  type: "local",
                  fieldName: "combo_box_2",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:@local.combo_box_2_var:@local.combo_box_2",
                  matchedExpression: "@local.combo_box_2_var",
                  type: "local",
                  fieldName: "combo_box_2_var",
                },
                {
                  fullExpression: "changed | set_field:@local.combo_box_2_var:@local.combo_box_2",
                  matchedExpression: "@local.combo_box_2",
                  type: "local",
                  fieldName: "combo_box_2",
                },
              ],
            },
          },
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.combo_box_2_var": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
          "@local.combo_box_2": ["action_list.0._raw", "action_list.0._cleaned"],
          "@local.answer_list": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "Local variable for combo box 2: @local.combo_box_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Local variable for combo box 2: @local.combo_box_2",
              matchedExpression: "@local.combo_box_2",
              type: "local",
              fieldName: "combo_box_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.combo_box_2": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "field for combo box 2: @field.combo_box_2_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "field for combo box 2: @field.combo_box_2_field",
              matchedExpression: "@field.combo_box_2_field",
              type: "field",
              fieldName: "combo_box_2_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.combo_box_2_field": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_dynamic.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_falsy_values",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "falsy_var_1",
        value: 0,
        type: "set_variable",
        _nested_name: "falsy_var_1",
      },
      {
        name: "falsy_var_2",
        value: false,
        type: "set_variable",
        _nested_name: "falsy_var_2",
      },
      {
        name: "falsy_var_3",
        value: "null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "falsy_var_3",
      },
      {
        name: "falsy_var_4",
        value: "NaN",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "falsy_var_4",
      },
      {
        name: "falsy_var_5",
        value: "undefined",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "falsy_var_5",
      },
      {
        name: "falsy_var_6",
        value: '""',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "falsy_var_6",
      },
      {
        type: "text",
        name: "text_1",
        value: "falsy value: @local.falsy_var_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "falsy value: @local.falsy_var_1",
              matchedExpression: "@local.falsy_var_1",
              type: "local",
              fieldName: "falsy_var_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "@local.falsy_var_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.falsy_var_1",
              matchedExpression: "@local.falsy_var_1",
              type: "local",
              fieldName: "falsy_var_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "falsy value: @local.falsy_var_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "falsy value: @local.falsy_var_2",
              matchedExpression: "@local.falsy_var_2",
              type: "local",
              fieldName: "falsy_var_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_2": ["value"],
        },
      },
      {
        type: "text",
        name: "text_4",
        value: "@local.falsy_var_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_4",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.falsy_var_2",
              matchedExpression: "@local.falsy_var_2",
              type: "local",
              fieldName: "falsy_var_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_2": ["value"],
        },
      },
      {
        type: "text",
        name: "text_5",
        value: "falsy value: @local.falsy_var_3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_5",
        _dynamicFields: {
          value: [
            {
              fullExpression: "falsy value: @local.falsy_var_3",
              matchedExpression: "@local.falsy_var_3",
              type: "local",
              fieldName: "falsy_var_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_3": ["value"],
        },
      },
      {
        type: "text",
        name: "text_6",
        value: "@local.falsy_var_3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_6",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.falsy_var_3",
              matchedExpression: "@local.falsy_var_3",
              type: "local",
              fieldName: "falsy_var_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_3": ["value"],
        },
      },
      {
        type: "text",
        name: "text_7",
        value: "falsy value: @local.falsy_var_4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_7",
        _dynamicFields: {
          value: [
            {
              fullExpression: "falsy value: @local.falsy_var_4",
              matchedExpression: "@local.falsy_var_4",
              type: "local",
              fieldName: "falsy_var_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_4": ["value"],
        },
      },
      {
        type: "text",
        name: "text_8",
        value: "@local.falsy_var_4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_8",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.falsy_var_4",
              matchedExpression: "@local.falsy_var_4",
              type: "local",
              fieldName: "falsy_var_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_4": ["value"],
        },
      },
      {
        type: "text",
        name: "text_9",
        value: "falsy value: @local.falsy_var_5",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_9",
        _dynamicFields: {
          value: [
            {
              fullExpression: "falsy value: @local.falsy_var_5",
              matchedExpression: "@local.falsy_var_5",
              type: "local",
              fieldName: "falsy_var_5",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_5": ["value"],
        },
      },
      {
        type: "text",
        name: "text_10",
        value: "@local.falsy_var_5",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_10",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.falsy_var_5",
              matchedExpression: "@local.falsy_var_5",
              type: "local",
              fieldName: "falsy_var_5",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_5": ["value"],
        },
      },
      {
        type: "text",
        name: "text_11",
        value: "falsy value: @local.falsy_var_6",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_11",
        _dynamicFields: {
          value: [
            {
              fullExpression: "falsy value: @local.falsy_var_6",
              matchedExpression: "@local.falsy_var_6",
              type: "local",
              fieldName: "falsy_var_6",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_6": ["value"],
        },
      },
      {
        type: "text",
        name: "text_12",
        value: "@local.falsy_var_6",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_12",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.falsy_var_6",
              matchedExpression: "@local.falsy_var_6",
              type: "local",
              fieldName: "falsy_var_6",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.falsy_var_6": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_falsy_values.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_field_null",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "local_var_1",
        value: "Hello",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        type: "set_variable",
        _nested_name: "local_var_1",
      },
      {
        type: "set_field",
        name: "debug_field_1",
        _nested_name: "debug_field_1",
      },
      {
        type: "set_field",
        name: "debug_field_2",
        value: "@local.local_var_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "debug_field_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.local_var_1",
              matchedExpression: "@local.local_var_1",
              type: "local",
              fieldName: "local_var_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.local_var_1": ["value"],
        },
      },
      {
        type: "button",
        name: "button_1",
        value: "Set debug_field_3 to blank",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_field_3", ""],
            _raw: "click | set_field : debug_field_3 :",
            _cleaned: "click | set_field : debug_field_3 :",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_1",
      },
      {
        type: "button",
        name: "button_2",
        value: "Set debug_field_4 to a blank local variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_field_4", "@local.local_var_1"],
            _raw: "click | set_field : debug_field_4 : @local.local_var_1",
            _cleaned: "click | set_field : debug_field_4 : @local.local_var_1",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_2",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "1": [
                  {
                    fullExpression: "@local.local_var_1",
                    matchedExpression: "@local.local_var_1",
                    type: "local",
                    fieldName: "local_var_1",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | set_field : debug_field_4 : @local.local_var_1",
                  matchedExpression: "@local.local_var_1",
                  type: "local",
                  fieldName: "local_var_1",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | set_field : debug_field_4 : @local.local_var_1",
                  matchedExpression: "@local.local_var_1",
                  type: "local",
                  fieldName: "local_var_1",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.local_var_1": [
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "button",
        name: "button_3",
        value: "Set debug_field_5 to a non existing local variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_field_5", "@local.local_var_2"],
            _raw: "click | set_field : debug_field_5 : @local.local_var_2",
            _cleaned: "click | set_field : debug_field_5 : @local.local_var_2",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_3",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "1": [
                  {
                    fullExpression: "@local.local_var_2",
                    matchedExpression: "@local.local_var_2",
                    type: "local",
                    fieldName: "local_var_2",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | set_field : debug_field_5 : @local.local_var_2",
                  matchedExpression: "@local.local_var_2",
                  type: "local",
                  fieldName: "local_var_2",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | set_field : debug_field_5 : @local.local_var_2",
                  matchedExpression: "@local.local_var_2",
                  type: "local",
                  fieldName: "local_var_2",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.local_var_2": [
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "Value of local variable: @local.local_var_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of local variable: @local.local_var_1",
              matchedExpression: "@local.local_var_1",
              type: "local",
              fieldName: "local_var_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.local_var_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "Value of debug_field_1: @fields.debug_field_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_1: @fields.debug_field_1",
              matchedExpression: "@fields.debug_field_1",
              type: "fields",
              fieldName: "debug_field_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "debug_field_1 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_1 == null",
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_1 == null",
              matchedExpression: "@fields.debug_field_1",
              type: "fields",
              fieldName: "debug_field_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_1": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_4",
        value: "debug_field_1 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_1 != null",
        exclude_from_translation: true,
        _nested_name: "text_4",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_1 != null",
              matchedExpression: "@fields.debug_field_1",
              type: "fields",
              fieldName: "debug_field_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_1": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_5",
        value: "Value of debug_field_2: @fields.debug_field_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_2: @fields.debug_field_2",
              matchedExpression: "@fields.debug_field_2",
              type: "fields",
              fieldName: "debug_field_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_2": ["value"],
        },
      },
      {
        type: "text",
        name: "text_6",
        value: "debug_field_2 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_2 == null",
        exclude_from_translation: true,
        _nested_name: "text_6",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_2 == null",
              matchedExpression: "@fields.debug_field_2",
              type: "fields",
              fieldName: "debug_field_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_2": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_7",
        value: "debug_field_2 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_2 != null",
        exclude_from_translation: true,
        _nested_name: "text_7",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_2 != null",
              matchedExpression: "@fields.debug_field_2",
              type: "fields",
              fieldName: "debug_field_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_2": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_8",
        value: "Value of debug_field_3: @fields.debug_field_3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_8",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_3: @fields.debug_field_3",
              matchedExpression: "@fields.debug_field_3",
              type: "fields",
              fieldName: "debug_field_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_3": ["value"],
        },
      },
      {
        type: "text",
        name: "text_9",
        value: "debug_field_3 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_3 == null",
        exclude_from_translation: true,
        _nested_name: "text_9",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_3 == null",
              matchedExpression: "@fields.debug_field_3",
              type: "fields",
              fieldName: "debug_field_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_3": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_10",
        value: "debug_field_3 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_3 != null",
        exclude_from_translation: true,
        _nested_name: "text_10",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_3 != null",
              matchedExpression: "@fields.debug_field_3",
              type: "fields",
              fieldName: "debug_field_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_3": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_11",
        value: "Value of debug_field_4: @fields.debug_field_4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_11",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_4: @fields.debug_field_4",
              matchedExpression: "@fields.debug_field_4",
              type: "fields",
              fieldName: "debug_field_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_4": ["value"],
        },
      },
      {
        type: "text",
        name: "text_12",
        value: "debug_field_4 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_4 == null",
        exclude_from_translation: true,
        _nested_name: "text_12",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_4 == null",
              matchedExpression: "@fields.debug_field_4",
              type: "fields",
              fieldName: "debug_field_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_4": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_13",
        value: "debug_field_4 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_4 != null",
        exclude_from_translation: true,
        _nested_name: "text_13",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_4 != null",
              matchedExpression: "@fields.debug_field_4",
              type: "fields",
              fieldName: "debug_field_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_4": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_14",
        value: "Value of debug_field_5: @fields.debug_field_5",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_14",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_5: @fields.debug_field_5",
              matchedExpression: "@fields.debug_field_5",
              type: "fields",
              fieldName: "debug_field_5",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_5": ["value"],
        },
      },
      {
        type: "text",
        name: "text_15",
        value: "debug_field_5 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_5 == null",
        exclude_from_translation: true,
        _nested_name: "text_15",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_5 == null",
              matchedExpression: "@fields.debug_field_5",
              type: "fields",
              fieldName: "debug_field_5",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_5": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_16",
        value: "debug_field_5 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_5 != null",
        exclude_from_translation: true,
        _nested_name: "text_16",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_5 != null",
              matchedExpression: "@fields.debug_field_5",
              type: "fields",
              fieldName: "debug_field_5",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_5": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_17",
        value: "Value of debug_field_6: @fields.debug_field_6",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_17",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_6: @fields.debug_field_6",
              matchedExpression: "@fields.debug_field_6",
              type: "fields",
              fieldName: "debug_field_6",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_6": ["value"],
        },
      },
      {
        type: "text",
        name: "text_18",
        value: "debug_field_6 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_6 == null",
        exclude_from_translation: true,
        _nested_name: "text_18",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_6 == null",
              matchedExpression: "@fields.debug_field_6",
              type: "fields",
              fieldName: "debug_field_6",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_6": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_19",
        value: "debug_field_6 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_6 != null",
        exclude_from_translation: true,
        _nested_name: "text_19",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_6 != null",
              matchedExpression: "@fields.debug_field_6",
              type: "fields",
              fieldName: "debug_field_6",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_6": ["hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_field_null.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_field_null_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "local_var_1",
        value: "Hello",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        type: "set_variable",
        _nested_name: "local_var_1",
      },
      {
        type: "set_field",
        name: "debug_field_1",
        _nested_name: "debug_field_1",
      },
      {
        type: "set_field",
        name: "debug_field_2",
        value: "@local.local_var_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "debug_field_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.local_var_1",
              matchedExpression: "@local.local_var_1",
              type: "local",
              fieldName: "local_var_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.local_var_1": ["value"],
        },
      },
      {
        type: "button",
        name: "button_1",
        value: "Set debug_field_3 to blank",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_field_3", ""],
            _raw: "click | set_field : debug_field_3 :",
            _cleaned: "click | set_field : debug_field_3 :",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_1",
      },
      {
        type: "button",
        name: "button_2",
        value: "Set debug_field_4 to a blank local variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_field_4", "@local.local_var_1"],
            _raw: "click | set_field : debug_field_4 : @local.local_var_1",
            _cleaned: "click | set_field : debug_field_4 : @local.local_var_1",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_2",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "1": [
                  {
                    fullExpression: "@local.local_var_1",
                    matchedExpression: "@local.local_var_1",
                    type: "local",
                    fieldName: "local_var_1",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | set_field : debug_field_4 : @local.local_var_1",
                  matchedExpression: "@local.local_var_1",
                  type: "local",
                  fieldName: "local_var_1",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | set_field : debug_field_4 : @local.local_var_1",
                  matchedExpression: "@local.local_var_1",
                  type: "local",
                  fieldName: "local_var_1",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.local_var_1": [
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "button",
        name: "button_3",
        value: "Set debug_field_5 to a non existing local variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_field_5", "@local.local_var_2"],
            _raw: "click | set_field : debug_field_5 : @local.local_var_2",
            _cleaned: "click | set_field : debug_field_5 : @local.local_var_2",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_3",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "1": [
                  {
                    fullExpression: "@local.local_var_2",
                    matchedExpression: "@local.local_var_2",
                    type: "local",
                    fieldName: "local_var_2",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | set_field : debug_field_5 : @local.local_var_2",
                  matchedExpression: "@local.local_var_2",
                  type: "local",
                  fieldName: "local_var_2",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | set_field : debug_field_5 : @local.local_var_2",
                  matchedExpression: "@local.local_var_2",
                  type: "local",
                  fieldName: "local_var_2",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.local_var_2": [
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "Value of local variable: @local.local_var_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of local variable: @local.local_var_1",
              matchedExpression: "@local.local_var_1",
              type: "local",
              fieldName: "local_var_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.local_var_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "Value of debug_field_1: @fields.debug_field_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_1: @fields.debug_field_1",
              matchedExpression: "@fields.debug_field_1",
              type: "fields",
              fieldName: "debug_field_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "debug_field_1 evaluates to FALSE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_1",
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_1",
              matchedExpression: "@fields.debug_field_1",
              type: "fields",
              fieldName: "debug_field_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_1": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_4",
        value: "debug_field_1 evaluates to TRUE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@fields.debug_field_1",
        exclude_from_translation: true,
        _nested_name: "text_4",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@fields.debug_field_1",
              matchedExpression: "!@fields.debug_field_1",
              type: "fields",
              fieldName: "debug_field_1",
            },
          ],
        },
        _dynamicDependencies: {
          "!@fields.debug_field_1": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_5",
        value: "Value of debug_field_2: @fields.debug_field_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_2: @fields.debug_field_2",
              matchedExpression: "@fields.debug_field_2",
              type: "fields",
              fieldName: "debug_field_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_2": ["value"],
        },
      },
      {
        type: "text",
        name: "text_6",
        value: "debug_field_2 evaluates to FALSE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_2",
        exclude_from_translation: true,
        _nested_name: "text_6",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_2",
              matchedExpression: "@fields.debug_field_2",
              type: "fields",
              fieldName: "debug_field_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_2": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_7",
        value: "debug_field_2 evaluates to TRUE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@fields.debug_field_2",
        exclude_from_translation: true,
        _nested_name: "text_7",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@fields.debug_field_2",
              matchedExpression: "!@fields.debug_field_2",
              type: "fields",
              fieldName: "debug_field_2",
            },
          ],
        },
        _dynamicDependencies: {
          "!@fields.debug_field_2": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_8",
        value: "Value of debug_field_3: @fields.debug_field_3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_8",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_3: @fields.debug_field_3",
              matchedExpression: "@fields.debug_field_3",
              type: "fields",
              fieldName: "debug_field_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_3": ["value"],
        },
      },
      {
        type: "text",
        name: "text_9",
        value: "debug_field_3 evaluates to FALSE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_3",
        exclude_from_translation: true,
        _nested_name: "text_9",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_3",
              matchedExpression: "@fields.debug_field_3",
              type: "fields",
              fieldName: "debug_field_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_3": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_10",
        value: "debug_field_3 evaluates to TRUE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@fields.debug_field_3",
        exclude_from_translation: true,
        _nested_name: "text_10",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@fields.debug_field_3",
              matchedExpression: "!@fields.debug_field_3",
              type: "fields",
              fieldName: "debug_field_3",
            },
          ],
        },
        _dynamicDependencies: {
          "!@fields.debug_field_3": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_11",
        value: "Value of debug_field_4: @fields.debug_field_4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_11",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_4: @fields.debug_field_4",
              matchedExpression: "@fields.debug_field_4",
              type: "fields",
              fieldName: "debug_field_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_4": ["value"],
        },
      },
      {
        type: "text",
        name: "text_12",
        value: "debug_field_4 evaluates to FALSE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_4",
        exclude_from_translation: true,
        _nested_name: "text_12",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_4",
              matchedExpression: "@fields.debug_field_4",
              type: "fields",
              fieldName: "debug_field_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_4": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_13",
        value: "debug_field_4 evaluates to TRUE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@fields.debug_field_4",
        exclude_from_translation: true,
        _nested_name: "text_13",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@fields.debug_field_4",
              matchedExpression: "!@fields.debug_field_4",
              type: "fields",
              fieldName: "debug_field_4",
            },
          ],
        },
        _dynamicDependencies: {
          "!@fields.debug_field_4": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_14",
        value: "Value of debug_field_5: @fields.debug_field_5",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_14",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_5: @fields.debug_field_5",
              matchedExpression: "@fields.debug_field_5",
              type: "fields",
              fieldName: "debug_field_5",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_5": ["value"],
        },
      },
      {
        type: "text",
        name: "text_15",
        value: "debug_field_5 evaluates to FALSE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_5",
        exclude_from_translation: true,
        _nested_name: "text_15",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_5",
              matchedExpression: "@fields.debug_field_5",
              type: "fields",
              fieldName: "debug_field_5",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_5": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_16",
        value: "debug_field_5 evaluates to TRUE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@fields.debug_field_5",
        exclude_from_translation: true,
        _nested_name: "text_16",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@fields.debug_field_5",
              matchedExpression: "!@fields.debug_field_5",
              type: "fields",
              fieldName: "debug_field_5",
            },
          ],
        },
        _dynamicDependencies: {
          "!@fields.debug_field_5": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_17",
        value: "Value of debug_field_6: @fields.debug_field_6",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_17",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_6: @fields.debug_field_6",
              matchedExpression: "@fields.debug_field_6",
              type: "fields",
              fieldName: "debug_field_6",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_6": ["value"],
        },
      },
      {
        type: "text",
        name: "text_18",
        value: "debug_field_6 evaluates to FALSE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@fields.debug_field_6",
        exclude_from_translation: true,
        _nested_name: "text_18",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@fields.debug_field_6",
              matchedExpression: "@fields.debug_field_6",
              type: "fields",
              fieldName: "debug_field_6",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_6": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_19",
        value: "debug_field_6 evaluates to TRUE",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@fields.debug_field_6",
        exclude_from_translation: true,
        _nested_name: "text_19",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@fields.debug_field_6",
              matchedExpression: "!@fields.debug_field_6",
              type: "fields",
              fieldName: "debug_field_6",
            },
          ],
        },
        _dynamicDependencies: {
          "!@fields.debug_field_6": ["hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_field_null.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_field_null_if",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "local_var_1",
        value: "Hello",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        type: "set_variable",
        _nested_name: "local_var_1",
      },
      {
        type: "set_field",
        name: "debug_field_1",
        _nested_name: "debug_field_1",
      },
      {
        type: "set_field",
        name: "debug_field_2",
        value: "@local.local_var_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "debug_field_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.local_var_1",
              matchedExpression: "@local.local_var_1",
              type: "local",
              fieldName: "local_var_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.local_var_1": ["value"],
        },
      },
      {
        type: "button",
        name: "button_1",
        value: "Set debug_field_3 to blank",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_field_3", ""],
            _raw: "click | set_field : debug_field_3 :",
            _cleaned: "click | set_field : debug_field_3 :",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_1",
      },
      {
        type: "button",
        name: "button_2",
        value: "Set debug_field_4 to a blank local variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_field_4", "@local.local_var_1"],
            _raw: "click | set_field : debug_field_4 : @local.local_var_1",
            _cleaned: "click | set_field : debug_field_4 : @local.local_var_1",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_2",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "1": [
                  {
                    fullExpression: "@local.local_var_1",
                    matchedExpression: "@local.local_var_1",
                    type: "local",
                    fieldName: "local_var_1",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | set_field : debug_field_4 : @local.local_var_1",
                  matchedExpression: "@local.local_var_1",
                  type: "local",
                  fieldName: "local_var_1",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | set_field : debug_field_4 : @local.local_var_1",
                  matchedExpression: "@local.local_var_1",
                  type: "local",
                  fieldName: "local_var_1",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.local_var_1": [
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "button",
        name: "button_3",
        value: "Set debug_field_5 to a non existing local variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_field_5", "@local.local_var_2"],
            _raw: "click | set_field : debug_field_5 : @local.local_var_2",
            _cleaned: "click | set_field : debug_field_5 : @local.local_var_2",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_3",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "1": [
                  {
                    fullExpression: "@local.local_var_2",
                    matchedExpression: "@local.local_var_2",
                    type: "local",
                    fieldName: "local_var_2",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | set_field : debug_field_5 : @local.local_var_2",
                  matchedExpression: "@local.local_var_2",
                  type: "local",
                  fieldName: "local_var_2",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | set_field : debug_field_5 : @local.local_var_2",
                  matchedExpression: "@local.local_var_2",
                  type: "local",
                  fieldName: "local_var_2",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.local_var_2": [
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "Value of local variable: @local.local_var_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of local variable: @local.local_var_1",
              matchedExpression: "@local.local_var_1",
              type: "local",
              fieldName: "local_var_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.local_var_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "Value of debug_field_1: @fields.debug_field_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_1: @fields.debug_field_1",
              matchedExpression: "@fields.debug_field_1",
              type: "fields",
              fieldName: "debug_field_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "debug_field_1 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@calc(if(@fields.debug_field_1))",
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@calc(if(@fields.debug_field_1))",
              matchedExpression: "@fields.debug_field_1",
              type: "fields",
              fieldName: "debug_field_1",
            },
            {
              fullExpression: "!@calc(if(@fields.debug_field_1))",
              matchedExpression: "!@calc(if(@fields.debug_field_1))",
              type: "calc",
              fieldName: "if(@fields.debug_field_1)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_1": ["hidden"],
          "!@calc(if(@fields.debug_field_1))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_4",
        value: "debug_field_1 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@calc(if(@fields.debug_field_1))",
        exclude_from_translation: true,
        _nested_name: "text_4",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@calc(if(@fields.debug_field_1))",
              matchedExpression: "@fields.debug_field_1",
              type: "fields",
              fieldName: "debug_field_1",
            },
            {
              fullExpression: "@calc(if(@fields.debug_field_1))",
              matchedExpression: "@calc(if(@fields.debug_field_1))",
              type: "calc",
              fieldName: "if(@fields.debug_field_1)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_1": ["hidden"],
          "@calc(if(@fields.debug_field_1))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_5",
        value: "Value of debug_field_2: @fields.debug_field_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_2: @fields.debug_field_2",
              matchedExpression: "@fields.debug_field_2",
              type: "fields",
              fieldName: "debug_field_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_2": ["value"],
        },
      },
      {
        type: "text",
        name: "text_6",
        value: "debug_field_2 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@calc(if(@fields.debug_field_2))",
        exclude_from_translation: true,
        _nested_name: "text_6",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@calc(if(@fields.debug_field_2))",
              matchedExpression: "@fields.debug_field_2",
              type: "fields",
              fieldName: "debug_field_2",
            },
            {
              fullExpression: "!@calc(if(@fields.debug_field_2))",
              matchedExpression: "!@calc(if(@fields.debug_field_2))",
              type: "calc",
              fieldName: "if(@fields.debug_field_2)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_2": ["hidden"],
          "!@calc(if(@fields.debug_field_2))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_7",
        value: "debug_field_2 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@calc(if(@fields.debug_field_2))",
        exclude_from_translation: true,
        _nested_name: "text_7",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@calc(if(@fields.debug_field_2))",
              matchedExpression: "@fields.debug_field_2",
              type: "fields",
              fieldName: "debug_field_2",
            },
            {
              fullExpression: "@calc(if(@fields.debug_field_2))",
              matchedExpression: "@calc(if(@fields.debug_field_2))",
              type: "calc",
              fieldName: "if(@fields.debug_field_2)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_2": ["hidden"],
          "@calc(if(@fields.debug_field_2))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_8",
        value: "Value of debug_field_3: @fields.debug_field_3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_8",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_3: @fields.debug_field_3",
              matchedExpression: "@fields.debug_field_3",
              type: "fields",
              fieldName: "debug_field_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_3": ["value"],
        },
      },
      {
        type: "text",
        name: "text_9",
        value: "debug_field_3 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@calc(if(@fields.debug_field_3))",
        exclude_from_translation: true,
        _nested_name: "text_9",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@calc(if(@fields.debug_field_3))",
              matchedExpression: "@fields.debug_field_3",
              type: "fields",
              fieldName: "debug_field_3",
            },
            {
              fullExpression: "!@calc(if(@fields.debug_field_3))",
              matchedExpression: "!@calc(if(@fields.debug_field_3))",
              type: "calc",
              fieldName: "if(@fields.debug_field_3)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_3": ["hidden"],
          "!@calc(if(@fields.debug_field_3))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_10",
        value: "debug_field_3 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@calc(if(@fields.debug_field_3))",
        exclude_from_translation: true,
        _nested_name: "text_10",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@calc(if(@fields.debug_field_3))",
              matchedExpression: "@fields.debug_field_3",
              type: "fields",
              fieldName: "debug_field_3",
            },
            {
              fullExpression: "@calc(if(@fields.debug_field_3))",
              matchedExpression: "@calc(if(@fields.debug_field_3))",
              type: "calc",
              fieldName: "if(@fields.debug_field_3)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_3": ["hidden"],
          "@calc(if(@fields.debug_field_3))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_11",
        value: "Value of debug_field_4: @fields.debug_field_4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_11",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_4: @fields.debug_field_4",
              matchedExpression: "@fields.debug_field_4",
              type: "fields",
              fieldName: "debug_field_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_4": ["value"],
        },
      },
      {
        type: "text",
        name: "text_12",
        value: "debug_field_4 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@calc(if(@fields.debug_field_4))",
        exclude_from_translation: true,
        _nested_name: "text_12",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@calc(if(@fields.debug_field_4))",
              matchedExpression: "@fields.debug_field_4",
              type: "fields",
              fieldName: "debug_field_4",
            },
            {
              fullExpression: "!@calc(if(@fields.debug_field_4))",
              matchedExpression: "!@calc(if(@fields.debug_field_4))",
              type: "calc",
              fieldName: "if(@fields.debug_field_4)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_4": ["hidden"],
          "!@calc(if(@fields.debug_field_4))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_13",
        value: "debug_field_4 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@calc(if(@fields.debug_field_4))",
        exclude_from_translation: true,
        _nested_name: "text_13",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@calc(if(@fields.debug_field_4))",
              matchedExpression: "@fields.debug_field_4",
              type: "fields",
              fieldName: "debug_field_4",
            },
            {
              fullExpression: "@calc(if(@fields.debug_field_4))",
              matchedExpression: "@calc(if(@fields.debug_field_4))",
              type: "calc",
              fieldName: "if(@fields.debug_field_4)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_4": ["hidden"],
          "@calc(if(@fields.debug_field_4))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_14",
        value: "Value of debug_field_5: @fields.debug_field_5",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_14",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_5: @fields.debug_field_5",
              matchedExpression: "@fields.debug_field_5",
              type: "fields",
              fieldName: "debug_field_5",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_5": ["value"],
        },
      },
      {
        type: "text",
        name: "text_15",
        value: "debug_field_5 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@calc(if(@fields.debug_field_5))",
        exclude_from_translation: true,
        _nested_name: "text_15",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@calc(if(@fields.debug_field_5))",
              matchedExpression: "@fields.debug_field_5",
              type: "fields",
              fieldName: "debug_field_5",
            },
            {
              fullExpression: "!@calc(if(@fields.debug_field_5))",
              matchedExpression: "!@calc(if(@fields.debug_field_5))",
              type: "calc",
              fieldName: "if(@fields.debug_field_5)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_5": ["hidden"],
          "!@calc(if(@fields.debug_field_5))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_16",
        value: "debug_field_5 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@calc(if(@fields.debug_field_5))",
        exclude_from_translation: true,
        _nested_name: "text_16",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@calc(if(@fields.debug_field_5))",
              matchedExpression: "@fields.debug_field_5",
              type: "fields",
              fieldName: "debug_field_5",
            },
            {
              fullExpression: "@calc(if(@fields.debug_field_5))",
              matchedExpression: "@calc(if(@fields.debug_field_5))",
              type: "calc",
              fieldName: "if(@fields.debug_field_5)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_5": ["hidden"],
          "@calc(if(@fields.debug_field_5))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_17",
        value: "Value of debug_field_6: @fields.debug_field_6",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_17",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value of debug_field_6: @fields.debug_field_6",
              matchedExpression: "@fields.debug_field_6",
              type: "fields",
              fieldName: "debug_field_6",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_6": ["value"],
        },
      },
      {
        type: "text",
        name: "text_18",
        value: "debug_field_6 is not null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@calc(if(@fields.debug_field_6))",
        exclude_from_translation: true,
        _nested_name: "text_18",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@calc(if(@fields.debug_field_6))",
              matchedExpression: "@fields.debug_field_6",
              type: "fields",
              fieldName: "debug_field_6",
            },
            {
              fullExpression: "!@calc(if(@fields.debug_field_6))",
              matchedExpression: "!@calc(if(@fields.debug_field_6))",
              type: "calc",
              fieldName: "if(@fields.debug_field_6)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_6": ["hidden"],
          "!@calc(if(@fields.debug_field_6))": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_19",
        value: "debug_field_6 is null",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@calc(if(@fields.debug_field_6))",
        exclude_from_translation: true,
        _nested_name: "text_19",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@calc(if(@fields.debug_field_6))",
              matchedExpression: "@fields.debug_field_6",
              type: "fields",
              fieldName: "debug_field_6",
            },
            {
              fullExpression: "@calc(if(@fields.debug_field_6))",
              matchedExpression: "@calc(if(@fields.debug_field_6))",
              type: "calc",
              fieldName: "if(@fields.debug_field_6)",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_field_6": ["hidden"],
          "@calc(if(@fields.debug_field_6))": ["hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_field_null.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_full_stop_after_var",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "local_full_stop",
        value: "Local with a full stop",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "local_full_stop",
      },
      {
        type: "text",
        name: "text_1",
        value:
          "This string ends with a local variable with a full stop at the end: @local.local_full_stop.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "This string ends with a local variable with a full stop at the end: @local.local_full_stop.",
              matchedExpression: "@local.local_full_stop",
              type: "local",
              fieldName: "local_full_stop",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.local_full_stop": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value:
          "This string ends with a local variable with a space before a full stop at the end: @local.local_full_stop .",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "This string ends with a local variable with a space before a full stop at the end: @local.local_full_stop .",
              matchedExpression: "@local.local_full_stop",
              type: "local",
              fieldName: "local_full_stop",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.local_full_stop": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value:
          "This string ends with a field variable with a full stop at the end: @field.field_full_stop.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "This string ends with a field variable with a full stop at the end: @field.field_full_stop.",
              matchedExpression: "@field.field_full_stop",
              type: "field",
              fieldName: "field_full_stop",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.field_full_stop": ["value"],
        },
      },
      {
        type: "text",
        name: "text_4",
        value:
          "This string ends with a field variable with a space before a full stop at the end: @field.field_full_stop .",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "This string ends with a field variable with a space before a full stop at the end: @field.field_full_stop .",
              matchedExpression: "@field.field_full_stop",
              type: "field",
              fieldName: "field_full_stop",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.field_full_stop": ["value"],
        },
      },
      {
        type: "text",
        name: "text_5",
        value:
          "This string ends with a global constant with a full stop at the end: @global.global_full_stop.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "This string ends with a global constant with a full stop at the end: @global.global_full_stop.",
              matchedExpression: "@global.global_full_stop",
              type: "global",
              fieldName: "global_full_stop",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.global_full_stop": ["value"],
        },
      },
      {
        type: "text",
        name: "text_6",
        value:
          "This string ends with a global constant with a space before a full stop at the end: @global.global_full_stop .",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_6",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "This string ends with a global constant with a space before a full stop at the end: @global.global_full_stop .",
              matchedExpression: "@global.global_full_stop",
              type: "global",
              fieldName: "global_full_stop",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.global_full_stop": ["value"],
        },
      },
      {
        type: "title",
        value: "Dynamic Texts",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        name: "title",
        _nested_name: "title",
      },
      {
        name: "dynamic_lookup",
        value: "local_full_stop",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        type: "set_variable",
        _nested_name: "dynamic_lookup",
      },
      {
        name: "dynamic_text_1",
        value: "@local.@local.dynamic_lookup",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "dynamic_text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.@local.dynamic_lookup",
              matchedExpression: "@local.dynamic_lookup",
              type: "local",
              fieldName: "dynamic_lookup",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.dynamic_lookup": ["value"],
        },
      },
      {
        type: "text",
        name: "text_7",
        value: "Dyanmic with full stop: @local.dynamic_text_1.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_7",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Dyanmic with full stop: @local.dynamic_text_1.",
              matchedExpression: "@local.dynamic_text_1",
              type: "local",
              fieldName: "dynamic_text_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.dynamic_text_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_8",
        value: '@local.dynamic_text_1+"."',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_8",
        _dynamicFields: {
          value: [
            {
              fullExpression: '@local.dynamic_text_1+"."',
              matchedExpression: "@local.dynamic_text_1",
              type: "local",
              fieldName: "dynamic_text_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.dynamic_text_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_9",
        value: "@local.dynamic_text_1.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_9",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.dynamic_text_1.",
              matchedExpression: "@local.dynamic_text_1",
              type: "local",
              fieldName: "dynamic_text_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.dynamic_text_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_10",
        value: "@local.@local.dynamic_lookup.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_10",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.@local.dynamic_lookup.",
              matchedExpression: "@local.dynamic_lookup",
              type: "local",
              fieldName: "dynamic_lookup",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.dynamic_lookup": ["value"],
        },
      },
      {
        type: "title",
        value: "Mixed Sentences",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "title",
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text_11",
        value: "Start text: @local.local_full_stop. More text follows.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_11",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Start text: @local.local_full_stop. More text follows.",
              matchedExpression: "@local.local_full_stop",
              type: "local",
              fieldName: "local_full_stop",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.local_full_stop": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_full_stop_after_var.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_global_bottom",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_1",
        value: "@global.debug_item_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.debug_item_1",
              matchedExpression: "@global.debug_item_1",
              type: "global",
              fieldName: "debug_item_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.debug_item_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "@global.debug_item_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.debug_item_1",
              matchedExpression: "@global.debug_item_1",
              type: "global",
              fieldName: "debug_item_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.debug_item_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "@global.debug_item_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.debug_item_1",
              matchedExpression: "@global.debug_item_1",
              type: "global",
              fieldName: "debug_item_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.debug_item_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_4",
        value: "@global.debug_item_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.debug_item_1",
              matchedExpression: "@global.debug_item_1",
              type: "global",
              fieldName: "debug_item_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.debug_item_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_5",
        value: "This text is directly authored in the value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
      },
      {
        type: "text",
        name: "text_6",
        value: "This text is directly authored in the value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_6",
      },
      {
        type: "text",
        name: "text_7",
        value: "This text is directly authored in the value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_7",
      },
      {
        type: "text",
        name: "text_8",
        value: "This text is directly authored in the value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_8",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_global.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_global_middle",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "debug_global_bottom",
        value: "debug_global_bottom",
        exclude_from_translation: true,
        rows: [
          {
            name: "text_2",
            value: "@global.debug_item_2",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_global_bottom.text_2",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@global.debug_item_2",
                  matchedExpression: "@global.debug_item_2",
                  type: "global",
                  fieldName: "debug_item_2",
                },
              ],
            },
            _dynamicDependencies: {
              "@global.debug_item_2": ["value"],
            },
          },
          {
            name: "text_3",
            value: "@global.debug_item_2",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_global_bottom.text_3",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@global.debug_item_2",
                  matchedExpression: "@global.debug_item_2",
                  type: "global",
                  fieldName: "debug_item_2",
                },
              ],
            },
            _dynamicDependencies: {
              "@global.debug_item_2": ["value"],
            },
          },
          {
            name: "text_4",
            value: "This text is overridden directly in the value",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_global_bottom.text_4",
          },
          {
            name: "text_6",
            value: "@global.debug_item_2",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_global_bottom.text_6",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@global.debug_item_2",
                  matchedExpression: "@global.debug_item_2",
                  type: "global",
                  fieldName: "debug_item_2",
                },
              ],
            },
            _dynamicDependencies: {
              "@global.debug_item_2": ["value"],
            },
          },
          {
            name: "text_7",
            value: "@global.debug_item_2",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_global_bottom.text_7",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@global.debug_item_2",
                  matchedExpression: "@global.debug_item_2",
                  type: "global",
                  fieldName: "debug_item_2",
                },
              ],
            },
            _dynamicDependencies: {
              "@global.debug_item_2": ["value"],
            },
          },
          {
            name: "text_8",
            value: "This text is overridden directly in the value",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_global_bottom.text_8",
          },
        ],
        _nested_name: "debug_global_bottom",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_global.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_global_top",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "debug_global_middle",
        value: "debug_global_middle",
        exclude_from_translation: true,
        rows: [
          {
            type: "nested_properties",
            name: "debug_global_bottom",
            exclude_from_translation: true,
            rows: [
              {
                name: "text_1",
                value: "@global.debug_item_3",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_global_middle.debug_global_bottom.text_1",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@global.debug_item_3",
                      matchedExpression: "@global.debug_item_3",
                      type: "global",
                      fieldName: "debug_item_3",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@global.debug_item_3": ["value"],
                },
              },
              {
                name: "text_2",
                value: "@global.debug_item_3",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_global_middle.debug_global_bottom.text_2",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@global.debug_item_3",
                      matchedExpression: "@global.debug_item_3",
                      type: "global",
                      fieldName: "debug_item_3",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@global.debug_item_3": ["value"],
                },
              },
              {
                name: "text_3",
                value: "This text is overridden directly in the value",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_global_middle.debug_global_bottom.text_3",
              },
              {
                name: "text_4",
                value: "@global.debug_item_3",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_global_middle.debug_global_bottom.text_4",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@global.debug_item_3",
                      matchedExpression: "@global.debug_item_3",
                      type: "global",
                      fieldName: "debug_item_3",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@global.debug_item_3": ["value"],
                },
              },
              {
                name: "text_5",
                value: "@global.debug_item_3",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_global_middle.debug_global_bottom.text_5",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@global.debug_item_3",
                      matchedExpression: "@global.debug_item_3",
                      type: "global",
                      fieldName: "debug_item_3",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@global.debug_item_3": ["value"],
                },
              },
              {
                name: "text_6",
                value: "@global.debug_item_3",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_global_middle.debug_global_bottom.text_6",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@global.debug_item_3",
                      matchedExpression: "@global.debug_item_3",
                      type: "global",
                      fieldName: "debug_item_3",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@global.debug_item_3": ["value"],
                },
              },
              {
                name: "text_7",
                value: "This text is overridden directly in the value",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_global_middle.debug_global_bottom.text_7",
              },
              {
                name: "text_8",
                value: "@global.debug_item_3",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_global_middle.debug_global_bottom.text_8",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@global.debug_item_3",
                      matchedExpression: "@global.debug_item_3",
                      type: "global",
                      fieldName: "debug_item_3",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@global.debug_item_3": ["value"],
                },
              },
            ],
            _nested_name: "debug_global_middle.debug_global_bottom",
          },
        ],
        _nested_name: "debug_global_middle",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_global.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_global_local",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "template",
        value: "template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "template",
      },
      {
        name: "debug_item_1",
        value: "_debug_item_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "debug_item_1",
      },
      {
        type: "button",
        name: "button_pop_up",
        value: "Simple pop-up",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_text"],
            _raw: "click | pop_up:example_text",
            _cleaned: "click | pop_up:example_text",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_pop_up",
      },
      {
        type: "button",
        name: "button_go_to",
        value: "@global.debug_item_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["@local.template@local.debug_item_1"],
            _raw: "click | go_to:@local.template@local.debug_item_1",
            _cleaned: "click | go_to:@local.template@local.debug_item_1",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_go_to",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.debug_item_1",
              matchedExpression: "@global.debug_item_1",
              type: "global",
              fieldName: "debug_item_1",
            },
          ],
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.template@local.debug_item_1",
                    matchedExpression: "@local.template",
                    type: "local",
                    fieldName: "template",
                  },
                  {
                    fullExpression: "@local.template@local.debug_item_1",
                    matchedExpression: "@local.debug_item_1",
                    type: "local",
                    fieldName: "debug_item_1",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | go_to:@local.template@local.debug_item_1",
                  matchedExpression: "@local.template",
                  type: "local",
                  fieldName: "template",
                },
                {
                  fullExpression: "click | go_to:@local.template@local.debug_item_1",
                  matchedExpression: "@local.debug_item_1",
                  type: "local",
                  fieldName: "debug_item_1",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | go_to:@local.template@local.debug_item_1",
                  matchedExpression: "@local.template",
                  type: "local",
                  fieldName: "template",
                },
                {
                  fullExpression: "click | go_to:@local.template@local.debug_item_1",
                  matchedExpression: "@local.debug_item_1",
                  type: "local",
                  fieldName: "debug_item_1",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@global.debug_item_1": ["value"],
          "@local.template": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
          "@local.debug_item_1": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_global.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "template_debug_item_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value: "This is the debug_item_1 template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_global.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_go_to_nest_top",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value: "This text is followed by the template debug_go_to_nest_bottom",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "template",
        name: "name_debug_go_to_nest_bottom",
        value: "debug_go_to_nest_bottom",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "name_debug_go_to_nest_bottom",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_go_to_nested.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_go_to_nest_bottom",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "button",
        name: "button",
        value: "Go to example_emit and come back",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["example_emit"],
            _raw: "click | go_to:example_emit",
            _cleaned: "click | go_to:example_emit",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_go_to_nested.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_hp_review",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "workshop_data",
        type: "set_variable",
        _nested_name: "workshop_data",
      },
      {
        name: "workshop",
        value: "@local.workshop_data.id",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "workshop",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.workshop_data.id",
              matchedExpression: "@local.workshop_data.id",
              type: "local",
              fieldName: "workshop_data",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.workshop_data.id": ["value"],
        },
      },
      {
        name: "debug",
        value: "_debug",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "debug",
      },
      {
        name: "workshop_debug",
        value: "@local.workshop@local.debug",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "workshop_debug",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.workshop@local.debug",
              matchedExpression: "@local.workshop",
              type: "local",
              fieldName: "workshop",
            },
            {
              fullExpression: "@local.workshop@local.debug",
              matchedExpression: "@local.debug",
              type: "local",
              fieldName: "debug",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.workshop": ["value"],
          "@local.debug": ["value"],
        },
      },
      {
        type: "text",
        name: "debug_description",
        value: "This template should show the same information on both sections",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        _nested_name: "debug_description",
      },
      {
        type: "template",
        name: "workshop_activity",
        value: "debug_workshop_activity",
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
        rows: [
          {
            name: "intro_text",
            value: "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "workshop_activity.intro_text",
            _dynamicFields: {
              value: [
                {
                  fullExpression:
                    "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                  matchedExpression: "@local.workshop_data.id",
                  type: "local",
                  fieldName: "workshop_data",
                },
                {
                  fullExpression:
                    "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                  matchedExpression: "@local.workshop",
                  type: "local",
                  fieldName: "workshop",
                },
                {
                  fullExpression:
                    "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                  matchedExpression: "@local.debug",
                  type: "local",
                  fieldName: "debug",
                },
                {
                  fullExpression:
                    "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                  matchedExpression: "@local.workshop_debug",
                  type: "local",
                  fieldName: "workshop_debug",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.workshop_data.id": ["value"],
              "@local.workshop": ["value"],
              "@local.debug": ["value"],
              "@local.workshop_debug": ["value"],
            },
          },
          {
            type: "nested_properties",
            name: "content_box",
            value: "example_title_text",
            rows: [
              {
                name: "title",
                value: "Content",
                _translations: {
                  value: {
                    spa: false,
                    tsa: true,
                    xho: true,
                    zul: true,
                  },
                },
                type: "set_variable",
                _nested_name: "workshop_activity.content_box.title",
              },
              {
                name: "text",
                value:
                  "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                type: "set_variable",
                _nested_name: "workshop_activity.content_box.text",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression:
                        "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                      matchedExpression: "@local.workshop_data.id",
                      type: "local",
                      fieldName: "workshop_data",
                    },
                    {
                      fullExpression:
                        "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                      matchedExpression: "@local.workshop",
                      type: "local",
                      fieldName: "workshop",
                    },
                    {
                      fullExpression:
                        "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                      matchedExpression: "@local.debug",
                      type: "local",
                      fieldName: "debug",
                    },
                    {
                      fullExpression:
                        "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                      matchedExpression: "@local.workshop_debug",
                      type: "local",
                      fieldName: "workshop_debug",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@local.workshop_data.id": ["value"],
                  "@local.workshop": ["value"],
                  "@local.debug": ["value"],
                  "@local.workshop_debug": ["value"],
                },
              },
            ],
            _nested_name: "workshop_activity.content_box",
          },
        ],
        _nested_name: "workshop_activity",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_hp_review.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_workshop_activity",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "hide_intro",
        value: false,
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "hide_intro",
      },
      {
        name: "hide_content",
        value: true,
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "hide_content",
      },
      {
        type: "animated_section",
        name: "intro",
        hidden: "@local.hide_intro",
        rows: [
          {
            type: "title",
            name: "intro_title",
            value: "Intro",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            _nested_name: "intro.intro_title",
          },
          {
            type: "text",
            name: "intro_text",
            _nested_name: "intro.intro_text",
          },
          {
            type: "round_button",
            name: "button_completed_chevron",
            action_list: [
              {
                trigger: "click",
                action_id: "set_local",
                args: ["hide_content", false],
                _raw: "click | set_local:hide_content:false",
                _cleaned: "click | set_local:hide_content:false",
              },
              {
                trigger: "click",
                action_id: "set_local",
                args: ["hide_intro", true],
                _raw: "click | set_local:hide_intro:true",
                _cleaned: "click | set_local:hide_intro:true",
              },
            ],
            parameter_list: {
              icon_src: "chevron-forward",
              style: "navigation",
            },
            _nested_name: "intro.button_completed_chevron",
          },
        ],
        _nested_name: "intro",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@local.hide_intro",
              matchedExpression: "@local.hide_intro",
              type: "local",
              fieldName: "hide_intro",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.hide_intro": ["hidden"],
        },
      },
      {
        type: "animated_section",
        name: "content",
        hidden: "@local.hide_content",
        rows: [
          {
            type: "template",
            name: "content_box",
            rows: [],
            _nested_name: "content.content_box",
          },
          {
            type: "round_button",
            name: "button_uncompleted_chevron",
            action_list: [
              {
                trigger: "click",
                action_id: "set_local",
                args: ["hide_intro", false],
                _raw: "click |  set_local:hide_intro:false",
                _cleaned: "click |  set_local:hide_intro:false",
              },
              {
                trigger: "click",
                action_id: "set_local",
                args: ["hide_content", true],
                _raw: "click | set_local:hide_content:true",
                _cleaned: "click | set_local:hide_content:true",
              },
            ],
            parameter_list: {
              icon_src: "chevron-back",
              style: "navigation",
            },
            _nested_name: "content.button_uncompleted_chevron",
          },
        ],
        _nested_name: "content",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@local.hide_content",
              matchedExpression: "@local.hide_content",
              type: "local",
              fieldName: "hide_content",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.hide_content": ["hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_hp_review.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_hp_review_specific",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "home_practice_review",
        value: "debug_hp_review",
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
        rows: [
          {
            name: "workshop_data",
            value: "@data.workshop.w_consequence",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "home_practice_review.workshop_data",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.workshop.w_consequence",
                  matchedExpression: "@data.workshop.w_consequence",
                  type: "data",
                  fieldName: "workshop",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.workshop.w_consequence": ["value"],
            },
          },
        ],
        _nested_name: "home_practice_review",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_hp_review.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_hp_review_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "workshop_data",
        type: "set_variable",
        _nested_name: "workshop_data",
      },
      {
        name: "workshop",
        value: "@local.workshop_data.id",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "workshop",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.workshop_data.id",
              matchedExpression: "@local.workshop_data.id",
              type: "local",
              fieldName: "workshop_data",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.workshop_data.id": ["value"],
        },
      },
      {
        name: "debug",
        value: "_debug",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "debug",
      },
      {
        name: "workshop_debug",
        value: "@local.workshop@local.debug",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "workshop_debug",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.workshop@local.debug",
              matchedExpression: "@local.workshop",
              type: "local",
              fieldName: "workshop",
            },
            {
              fullExpression: "@local.workshop@local.debug",
              matchedExpression: "@local.debug",
              type: "local",
              fieldName: "debug",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.workshop": ["value"],
          "@local.debug": ["value"],
        },
      },
      {
        type: "template",
        name: "workshop_activity",
        value: "debug_workshop_activity_2",
        rows: [
          {
            name: "intro_text",
            value: "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "workshop_activity.intro_text",
            _dynamicFields: {
              value: [
                {
                  fullExpression:
                    "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                  matchedExpression: "@local.workshop_data.id",
                  type: "local",
                  fieldName: "workshop_data",
                },
                {
                  fullExpression:
                    "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                  matchedExpression: "@local.workshop",
                  type: "local",
                  fieldName: "workshop",
                },
                {
                  fullExpression:
                    "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                  matchedExpression: "@local.debug",
                  type: "local",
                  fieldName: "debug",
                },
                {
                  fullExpression:
                    "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                  matchedExpression: "@local.workshop_debug",
                  type: "local",
                  fieldName: "workshop_debug",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.workshop_data.id": ["value"],
              "@local.workshop": ["value"],
              "@local.debug": ["value"],
              "@local.workshop_debug": ["value"],
            },
          },
          {
            type: "nested_properties",
            name: "content_box",
            value: "example_title_text",
            rows: [
              {
                name: "title",
                value: "Content",
                _translations: {
                  value: {
                    spa: false,
                    tsa: true,
                    xho: true,
                    zul: true,
                  },
                },
                type: "set_variable",
                _nested_name: "workshop_activity.content_box.title",
              },
              {
                name: "text",
                value:
                  "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                type: "set_variable",
                _nested_name: "workshop_activity.content_box.text",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression:
                        "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                      matchedExpression: "@local.workshop_data.id",
                      type: "local",
                      fieldName: "workshop_data",
                    },
                    {
                      fullExpression:
                        "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                      matchedExpression: "@local.workshop",
                      type: "local",
                      fieldName: "workshop",
                    },
                    {
                      fullExpression:
                        "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                      matchedExpression: "@local.debug",
                      type: "local",
                      fieldName: "debug",
                    },
                    {
                      fullExpression:
                        "@local.workshop_data.id\n@local.workshop\n@local.debug\n@local.workshop_debug",
                      matchedExpression: "@local.workshop_debug",
                      type: "local",
                      fieldName: "workshop_debug",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@local.workshop_data.id": ["value"],
                  "@local.workshop": ["value"],
                  "@local.debug": ["value"],
                  "@local.workshop_debug": ["value"],
                },
              },
            ],
            _nested_name: "workshop_activity.content_box",
          },
        ],
        _nested_name: "workshop_activity",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_hp_review_2.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_workshop_activity_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "intro_title",
        value: "Intro",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        _nested_name: "intro_title",
      },
      {
        type: "text",
        name: "intro_text",
        _nested_name: "intro_text",
      },
      {
        type: "template",
        name: "content_box",
        rows: [],
        _nested_name: "content_box",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_hp_review_2.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_hp_review_specific_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "home_practice_review",
        value: "debug_hp_review_2",
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
        rows: [
          {
            name: "workshop_data",
            value: "@data.workshop.w_consequence",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "home_practice_review.workshop_data",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.workshop.w_consequence",
                  matchedExpression: "@data.workshop.w_consequence",
                  type: "data",
                  fieldName: "workshop",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.workshop.w_consequence": ["value"],
            },
          },
        ],
        _nested_name: "home_practice_review",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_hp_review_2.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_text_and_blank_child_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value: "Initial text",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        _nested_name: "text",
      },
      {
        type: "template",
        name: "subtemplate_1",
        rows: [],
        _nested_name: "subtemplate_1",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nested_same_name.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_text_and_blank_child_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value: "Initial text",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        _nested_name: "text",
      },
      {
        type: "template",
        name: "subtemplate_2",
        rows: [],
        _nested_name: "subtemplate_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nested_same_name.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nested_same_name",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Double nested 1",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        _nested_name: "title",
      },
      {
        type: "template",
        name: "template_1",
        value: "debug_text_and_blank_child_1",
        rows: [
          {
            name: "text",
            value: "Text 1",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            type: "set_variable",
            _nested_name: "template_1.text",
          },
          {
            type: "nested_properties",
            name: "subtemplate_1",
            value: "debug_text_and_blank_child_1",
            rows: [
              {
                name: "text",
                value: "Text 2",
                _translations: {
                  value: {
                    spa: false,
                    tsa: true,
                    xho: true,
                    zul: true,
                  },
                },
                type: "set_variable",
                _nested_name: "template_1.subtemplate_1.text",
              },
              {
                type: "nested_properties",
                name: "subtemplate_1",
                value: "example_text",
                rows: [
                  {
                    name: "text",
                    value: "Text 3",
                    _translations: {
                      value: {
                        spa: false,
                        tsa: true,
                        xho: true,
                        zul: true,
                      },
                    },
                    type: "set_variable",
                    _nested_name: "template_1.subtemplate_1.subtemplate_1.text",
                  },
                ],
                _nested_name: "template_1.subtemplate_1.subtemplate_1",
              },
            ],
            _nested_name: "template_1.subtemplate_1",
          },
        ],
        _nested_name: "template_1",
      },
      {
        type: "title",
        name: "title",
        value: "Double nested 2",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        _nested_name: "title",
      },
      {
        type: "template",
        name: "template_2",
        value: "debug_text_and_blank_child_1",
        rows: [
          {
            name: "text",
            value: "Text 1",
            _translations: {
              value: {
                spa: false,
                tsa: true,
                xho: true,
                zul: true,
              },
            },
            type: "set_variable",
            _nested_name: "template_2.text",
          },
          {
            type: "nested_properties",
            name: "subtemplate_1",
            value: "debug_text_and_blank_child_2",
            rows: [
              {
                name: "text",
                value: "Text 2",
                _translations: {
                  value: {
                    spa: false,
                    tsa: true,
                    xho: true,
                    zul: true,
                  },
                },
                type: "set_variable",
                _nested_name: "template_2.subtemplate_1.text",
              },
              {
                type: "nested_properties",
                name: "subtemplate_2",
                value: "example_text",
                rows: [
                  {
                    name: "text",
                    value: "Text 3",
                    _translations: {
                      value: {
                        spa: false,
                        tsa: true,
                        xho: true,
                        zul: true,
                      },
                    },
                    type: "set_variable",
                    _nested_name: "template_2.subtemplate_1.subtemplate_2.text",
                  },
                ],
                _nested_name: "template_2.subtemplate_1.subtemplate_2",
              },
            ],
            _nested_name: "template_2.subtemplate_1",
          },
        ],
        _nested_name: "template_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nested_same_name.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_sheet_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Title of debug_nesting_sheet_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_test_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "name_1",
        value: "debug_nesting_sheet_1",
        exclude_from_translation: true,
        rows: [
          {
            name: "title",
            value: "This title was overwritten",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "name_1.title",
          },
        ],
        _nested_name: "name_1",
      },
      {
        type: "template",
        name: "name_2",
        value: "debug_nesting_sheet_1",
        exclude_from_translation: true,
        rows: [
          {
            name: "title",
            value: "This title was overwritten as well",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "name_2.title",
          },
        ],
        _nested_name: "name_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_sheet_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "fail: title debug_nesting_sheet_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "fail: text debug_nesting_sheet_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_test_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "other_name",
        value: "debug_test_1",
        exclude_from_translation: true,
        rows: [
          {
            type: "nested_properties",
            name: "name_1",
            exclude_from_translation: true,
            rows: [
              {
                name: "title",
                value: "title for sheet 1 was overwritten twice",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "other_name.name_1.title",
              },
            ],
            _nested_name: "other_name.name_1",
          },
        ],
        _nested_name: "other_name",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_test_1_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "debug_sheet_1a",
        value: "debug_nesting_sheet_1",
        exclude_from_translation: true,
        rows: [
          {
            name: "title",
            value: "title for sheet 1a was overwritten",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_sheet_1a.title",
          },
        ],
        _nested_name: "debug_sheet_1a",
      },
      {
        type: "template",
        name: "debug_sheet_2a",
        value: "debug_nesting_sheet_2",
        exclude_from_translation: true,
        rows: [
          {
            name: "title",
            value: "title for sheet 2 was overwritten",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_sheet_2a.title",
          },
        ],
        _nested_name: "debug_sheet_2a",
      },
      {
        type: "template",
        name: "debug_sheet_2b",
        value: "debug_nesting_sheet_2",
        exclude_from_translation: true,
        rows: [
          {
            name: "text",
            value: "text for sheet 2 was overwritten",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_sheet_2b.text",
          },
        ],
        _nested_name: "debug_sheet_2b",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_test_1_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        value: "Test 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "text",
        _nested_name: "text",
      },
      {
        type: "set_variable",
        name: "test_1_text",
        value: "success: test1 text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "test_1_text",
      },
      {
        type: "template",
        name: "debug_override_1",
        value: "debug_nesting_override_1",
        exclude_from_translation: true,
        rows: [
          {
            type: "nested_properties",
            name: "template_wrapper",
            value: "debug_nesting_sheet_2",
            exclude_from_translation: true,
            rows: [
              {
                name: "title",
                value: "success: test1 title",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_override_1.template_wrapper.title",
              },
              {
                name: "text",
                value: "@local.test_1_text",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_override_1.template_wrapper.text",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@local.test_1_text",
                      matchedExpression: "@local.test_1_text",
                      type: "local",
                      fieldName: "test_1_text",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@local.test_1_text": ["value"],
                },
              },
            ],
            _nested_name: "debug_override_1.template_wrapper",
          },
        ],
        _nested_name: "debug_override_1",
      },
      {
        type: "text",
        value: "Test 2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "text",
        _nested_name: "text",
      },
      {
        type: "set_variable",
        name: "test_2_text",
        value: "success: test2 text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "test_2_text",
      },
      {
        type: "template",
        name: "debug_sheet_2",
        value: "debug_nesting_sheet_2",
        exclude_from_translation: true,
        rows: [
          {
            name: "title",
            value: "sucess: test2 title",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_sheet_2.title",
          },
          {
            name: "text",
            value: "@local.test_2_text",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_sheet_2.text",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.test_2_text",
                  matchedExpression: "@local.test_2_text",
                  type: "local",
                  fieldName: "test_2_text",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.test_2_text": ["value"],
            },
          },
        ],
        _nested_name: "debug_sheet_2",
      },
      {
        type: "set_variable",
        name: "test_3_text",
        value: "success: text3_text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "test_3_text",
      },
      {
        type: "text",
        value: "Test 3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "text",
        _nested_name: "text",
      },
      {
        type: "template",
        name: "wrapper",
        value: "debug_nesting_override_1",
        exclude_from_translation: true,
        rows: [
          {
            type: "nested_properties",
            name: "template_wrapper",
            value: "debug_nesting_override_1",
            exclude_from_translation: true,
            rows: [
              {
                type: "nested_properties",
                name: "template_wrapper",
                value: "debug_nesting_sheet_2",
                exclude_from_translation: true,
                rows: [
                  {
                    name: "title",
                    value: "success: text3_title",
                    _translations: {
                      value: {
                        spa: false,
                        tsa: false,
                        xho: false,
                        zul: false,
                      },
                    },
                    exclude_from_translation: true,
                    type: "set_variable",
                    _nested_name: "wrapper.template_wrapper.template_wrapper.title",
                  },
                  {
                    name: "text",
                    value: "@local.test_3_text",
                    _translations: {
                      value: {
                        spa: false,
                        tsa: false,
                        xho: false,
                        zul: false,
                      },
                    },
                    exclude_from_translation: true,
                    type: "set_variable",
                    _nested_name: "wrapper.template_wrapper.template_wrapper.text",
                    _dynamicFields: {
                      value: [
                        {
                          fullExpression: "@local.test_3_text",
                          matchedExpression: "@local.test_3_text",
                          type: "local",
                          fieldName: "test_3_text",
                        },
                      ],
                    },
                    _dynamicDependencies: {
                      "@local.test_3_text": ["value"],
                    },
                  },
                ],
                _nested_name: "wrapper.template_wrapper.template_wrapper",
              },
            ],
            _nested_name: "wrapper.template_wrapper",
          },
        ],
        _nested_name: "wrapper",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_override_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "template_wrapper",
        rows: [],
        _nested_name: "template_wrapper",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_pop_ups_override",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "example_pop_ups",
        value: "example_pop_ups",
        exclude_from_translation: true,
        rows: [
          {
            name: "text_1",
            value: "This is template shows how buttons can be overwritten.",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_pop_ups.text_1",
          },
          {
            name: "text_2",
            value: "Button 1 has a new button text, but the action_list is unaltered.",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_pop_ups.text_2",
          },
          {
            name: "button_pop_up_1",
            value: "New Button 1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_pop_ups.button_pop_up_1",
          },
          {
            name: "text_3",
            value: "Button 2 has an altered action_list. It now launches a simple text pop-up.",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_pop_ups.text_3",
          },
          {
            name: "button_pop_up_2",
            action_list: [
              {
                trigger: "click",
                action_id: "pop_up",
                args: ["example_text"],
                _raw: "click | pop_up:example_text",
                _cleaned: "click | pop_up:example_text",
              },
            ],
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_pop_ups.button_pop_up_2",
          },
          {
            name: "text_4",
            value: "Button 3 is unaltered.",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_pop_ups.text_4",
          },
        ],
        _nested_name: "example_pop_ups",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_variables",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "heading_1",
        value: "TEST 1: Override template variables",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "heading_1",
      },
      {
        type: "template",
        name: "two_texts_a",
        value: "debug_two_texts",
        exclude_from_translation: true,
        rows: [
          {
            type: "set_variable",
            name: "child_local_variable",
            value: "Success: nesting local variable",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "two_texts_a.child_local_variable",
          },
          {
            type: "set_variable",
            name: "child_text_1",
            value: "Success: text_1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "two_texts_a.child_text_1",
          },
        ],
        _nested_name: "two_texts_a",
      },
      {
        type: "text",
        name: "heading_2",
        value: "TEST 2: Override template variables dynamic",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "heading_2",
      },
      {
        type: "set_variable",
        name: "var_text_1",
        value: "Success: text_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_text_1",
      },
      {
        type: "template",
        name: "two_texts_b",
        value: "debug_two_texts",
        exclude_from_translation: true,
        rows: [
          {
            type: "set_variable",
            name: "child_local_variable",
            value: "Success: nesting local variable",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "two_texts_b.child_local_variable",
          },
          {
            type: "set_variable",
            name: "child_text_1",
            value: "@local.var_text_1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "two_texts_b.child_text_1",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@local.var_text_1",
                  matchedExpression: "@local.var_text_1",
                  type: "local",
                  fieldName: "var_text_1",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.var_text_1": ["value"],
            },
          },
        ],
        _nested_name: "two_texts_b",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_variables_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "set_variable",
        name: "var_text_1",
        value: "Success: text_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_text_1",
      },
      {
        type: "text",
        name: "heading_1",
        value: "TEST 1 - Overwrite a general wrapper to display a named template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "heading_1",
      },
      {
        type: "template",
        name: "debug_wrapper_1",
        value: "debug_wrapper",
        exclude_from_translation: true,
        rows: [
          {
            type: "nested_properties",
            name: "wrapper_template",
            value: "debug_two_texts",
            exclude_from_translation: true,
            rows: [
              {
                type: "set_variable",
                name: "child_local_variable",
                value: "Success: nesting local variable",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                _nested_name: "debug_wrapper_1.wrapper_template.child_local_variable",
              },
              {
                type: "set_variable",
                name: "child_text_1",
                value: "@local.var_text_1",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                _nested_name: "debug_wrapper_1.wrapper_template.child_text_1",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@local.var_text_1",
                      matchedExpression: "@local.var_text_1",
                      type: "local",
                      fieldName: "var_text_1",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@local.var_text_1": ["value"],
                },
              },
            ],
            _nested_name: "debug_wrapper_1.wrapper_template",
          },
        ],
        _nested_name: "debug_wrapper_1",
      },
      {
        type: "text",
        name: "heading_2",
        value:
          "The template below should match the template above, and has been set by 2 levels of nested_properties",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        condition: false,
        _nested_name: "heading_2",
      },
      {
        type: "template",
        name: "debug_wrapper_2",
        value: "debug_wrapper",
        exclude_from_translation: true,
        condition: false,
        rows: [
          {
            type: "nested_properties",
            name: "wrapper_template",
            value: "debug_wrapper",
            exclude_from_translation: true,
            rows: [
              {
                type: "nested_properties",
                name: "wrapper_template",
                value: "debug_two_texts",
                exclude_from_translation: true,
                rows: [
                  {
                    type: "set_variable",
                    name: "child_local_variable",
                    value: "Success: nesting local variable",
                    _translations: {
                      value: {
                        spa: false,
                        tsa: false,
                        xho: false,
                        zul: false,
                      },
                    },
                    exclude_from_translation: true,
                    _nested_name:
                      "debug_wrapper_2.wrapper_template.wrapper_template.child_local_variable",
                  },
                  {
                    type: "set_variable",
                    name: "child_text_1",
                    value: "@local.var_text_1",
                    _translations: {
                      value: {
                        spa: false,
                        tsa: false,
                        xho: false,
                        zul: false,
                      },
                    },
                    exclude_from_translation: true,
                    _nested_name: "debug_wrapper_2.wrapper_template.wrapper_template.child_text_1",
                    _dynamicFields: {
                      value: [
                        {
                          fullExpression: "@local.var_text_1",
                          matchedExpression: "@local.var_text_1",
                          type: "local",
                          fieldName: "var_text_1",
                        },
                      ],
                    },
                    _dynamicDependencies: {
                      "@local.var_text_1": ["value"],
                    },
                  },
                ],
                _nested_name: "debug_wrapper_2.wrapper_template.wrapper_template",
              },
            ],
            _nested_name: "debug_wrapper_2.wrapper_template",
          },
        ],
        _nested_name: "debug_wrapper_2",
      },
      {
        type: "text",
        name: "heading_3",
        value: "The content below adds additional content to the template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "heading_3",
      },
      {
        type: "template",
        name: "debug_wrapper_1",
        value: "debug_wrapper",
        exclude_from_translation: true,
        rows: [
          {
            type: "nested_properties",
            name: "wrapper_template",
            value: "debug_two_texts",
            exclude_from_translation: true,
            rows: [
              {
                type: "set_variable",
                name: "child_local_variable",
                value: "Success: nesting local variable",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                _nested_name: "debug_wrapper_1.wrapper_template.child_local_variable",
              },
              {
                type: "set_variable",
                name: "child_text_1",
                value: "@local.var_text_1",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                _nested_name: "debug_wrapper_1.wrapper_template.child_text_1",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression: "@local.var_text_1",
                      matchedExpression: "@local.var_text_1",
                      type: "local",
                      fieldName: "var_text_1",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@local.var_text_1": ["value"],
                },
              },
            ],
            _nested_name: "debug_wrapper_1.wrapper_template",
          },
        ],
        _nested_name: "debug_wrapper_1",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_variables_3",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "heading_1",
        value: "TEST 1: Conditional properties",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "heading_1",
      },
      {
        type: "set_variable",
        name: "toggle_value",
        value: true,
        exclude_from_translation: true,
        _nested_name: "toggle_value",
      },
      {
        type: "button",
        name: "toggle_button",
        value: "Value: @local.toggle_value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_local",
            args: ["toggle_value", "!@local.toggle_value"],
            _raw: "click | set_local : toggle_value:!@local.toggle_value",
            _cleaned: "click | set_local : toggle_value:!@local.toggle_value",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "toggle_button",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Value: @local.toggle_value",
              matchedExpression: "@local.toggle_value",
              type: "local",
              fieldName: "toggle_value",
            },
          ],
          action_list: {
            "0": {
              args: {
                "1": [
                  {
                    fullExpression: "!@local.toggle_value",
                    matchedExpression: "!@local.toggle_value",
                    type: "local",
                    fieldName: "toggle_value",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | set_local : toggle_value:!@local.toggle_value",
                  matchedExpression: "!@local.toggle_value",
                  type: "local",
                  fieldName: "toggle_value",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | set_local : toggle_value:!@local.toggle_value",
                  matchedExpression: "!@local.toggle_value",
                  type: "local",
                  fieldName: "toggle_value",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.toggle_value": ["value"],
          "!@local.toggle_value": [
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "template",
        name: "two_texts_a",
        value: "debug_two_texts",
        exclude_from_translation: true,
        rows: [
          {
            type: "set_variable",
            name: "child_local_variable",
            value: "Text variant 1 (toggle to change)",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            condition: "@local.toggle_value",
            _nested_name: "two_texts_a.child_local_variable",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: "@local.toggle_value",
                  matchedExpression: "@local.toggle_value",
                  type: "local",
                  fieldName: "toggle_value",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.toggle_value": ["condition"],
            },
          },
          {
            type: "set_variable",
            name: "child_local_variable",
            value: "Text variant 2 (toggle to change)",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            condition: "!@local.toggle_value",
            _nested_name: "two_texts_a.child_local_variable",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: "!@local.toggle_value",
                  matchedExpression: "!@local.toggle_value",
                  type: "local",
                  fieldName: "toggle_value",
                },
              ],
            },
            _dynamicDependencies: {
              "!@local.toggle_value": ["condition"],
            },
          },
          {
            type: "set_variable",
            name: "child_text_1",
            value: "Success: text_1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "two_texts_a.child_text_1",
          },
        ],
        _nested_name: "two_texts_a",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_conditional",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "text_2",
        value: "Success: text_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "text_2",
      },
      {
        name: "text_1_toggle",
        value: true,
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "text_1_toggle",
      },
      {
        type: "text",
        name: "var_toggle_text",
        value: "The value of the toggle is: @local.text_1_toggle",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_toggle_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "The value of the toggle is: @local.text_1_toggle",
              matchedExpression: "@local.text_1_toggle",
              type: "local",
              fieldName: "text_1_toggle",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.text_1_toggle": ["value"],
        },
      },
      {
        type: "text",
        name: "intro_1",
        value:
          "The following template should change text_1 value depending on the value of a variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "intro_1",
      },
      {
        type: "template",
        name: "direct_template_2",
        value: "debug_two_texts",
        exclude_from_translation: true,
        rows: [
          {
            type: "set_variable",
            name: "child_text_1",
            value: "Success: text_1 - toggle TRUE",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            condition: "@local.text_1_toggle",
            _nested_name: "direct_template_2.child_text_1",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: "@local.text_1_toggle",
                  matchedExpression: "@local.text_1_toggle",
                  type: "local",
                  fieldName: "text_1_toggle",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.text_1_toggle": ["condition"],
            },
          },
          {
            type: "set_variable",
            name: "child_text_1",
            value: "Success: text_1 - toggle FALSE",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            condition: "!@local.text_1_toggle",
            _nested_name: "direct_template_2.child_text_1",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: "!@local.text_1_toggle",
                  matchedExpression: "!@local.text_1_toggle",
                  type: "local",
                  fieldName: "text_1_toggle",
                },
              ],
            },
            _dynamicDependencies: {
              "!@local.text_1_toggle": ["condition"],
            },
          },
          {
            type: "set_variable",
            name: "child_text_2",
            value: 'Expected: "Success: text_2"\nResult: @local.text_2',
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "direct_template_2.child_text_2",
            _dynamicFields: {
              value: [
                {
                  fullExpression: 'Expected: "Success: text_2"\nResult: @local.text_2',
                  matchedExpression: "@local.text_2",
                  type: "local",
                  fieldName: "text_2",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.text_2": ["value"],
            },
          },
          {
            type: "set_variable",
            name: "child_local_variable",
            value: "Success: nesting local variable",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "direct_template_2.child_local_variable",
          },
        ],
        _nested_name: "direct_template_2",
      },
      {
        type: "button",
        name: "toggle text",
        value: "Toggle value of text_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_local",
            args: [],
            _raw: "click | set_local | var_toggle: !@local.var_toggle",
            _cleaned: "click | set_local | var_toggle: !@local.var_toggle",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "toggle text",
        _dynamicFields: {
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "click | set_local | var_toggle: !@local.var_toggle",
                  matchedExpression: "!@local.var_toggle",
                  type: "local",
                  fieldName: "var_toggle",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | set_local | var_toggle: !@local.var_toggle",
                  matchedExpression: "!@local.var_toggle",
                  type: "local",
                  fieldName: "var_toggle",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "!@local.var_toggle": ["action_list.0._raw", "action_list.0._cleaned"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_two_texts",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "child_local_variable",
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "child_local_variable",
      },
      {
        type: "text",
        name: "child_text_1",
        value: 'Failed: "text_1" has not been overwritten',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "child_text_1",
      },
      {
        type: "text",
        name: "child_text_from_local_variable",
        value: "@local.child_local_variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "emit",
            args: ["@local.child_local_variable"],
            _raw: "click | emit:@local.child_local_variable",
            _cleaned: "click | emit:@local.child_local_variable",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          key_1: "@local.child_local_variable",
        },
        _nested_name: "child_text_from_local_variable",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.child_local_variable",
              matchedExpression: "@local.child_local_variable",
              type: "local",
              fieldName: "child_local_variable",
            },
          ],
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.child_local_variable",
                    matchedExpression: "@local.child_local_variable",
                    type: "local",
                    fieldName: "child_local_variable",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | emit:@local.child_local_variable",
                  matchedExpression: "@local.child_local_variable",
                  type: "local",
                  fieldName: "child_local_variable",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | emit:@local.child_local_variable",
                  matchedExpression: "@local.child_local_variable",
                  type: "local",
                  fieldName: "child_local_variable",
                },
              ],
            },
          },
          parameter_list: {
            key_1: [
              {
                fullExpression: "@local.child_local_variable",
                matchedExpression: "@local.child_local_variable",
                type: "local",
                fieldName: "child_local_variable",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.child_local_variable": [
            "value",
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
            "parameter_list.key_1",
          ],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_nesting_variables_global",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "var_text_2",
        value: "This is text_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "var_text_2",
      },
      {
        name: "var_text_4",
        value: "This is text_4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "var_text_4",
      },
      {
        type: "template",
        name: "debug_two_texts",
        value: "debug_two_texts",
        exclude_from_translation: true,
        rows: [
          {
            name: "child_text_1",
            value: "This is text_1 overridden directly in the value",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_two_texts.child_text_1",
          },
          {
            name: "child_text_2",
            value: "@global.teen_girl_1 overridden by calling a variable",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_two_texts.child_text_2",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@global.teen_girl_1 overridden by calling a variable",
                  matchedExpression: "@global.teen_girl_1",
                  type: "global",
                  fieldName: "teen_girl_1",
                },
              ],
            },
            _dynamicDependencies: {
              "@global.teen_girl_1": ["value"],
            },
          },
        ],
        _nested_name: "debug_two_texts",
      },
      {
        type: "text",
        name: "text_3",
        value: "This is text_3 written directly in the value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
      },
      {
        type: "text",
        name: "text_4",
        value: "@local.var_text_4 calling a variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.var_text_4 calling a variable",
              matchedExpression: "@local.var_text_4",
              type: "local",
              fieldName: "var_text_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_text_4": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_variable_type",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "set_variable",
        name: "var_counter",
        value: 1,
        exclude_from_translation: true,
        _nested_name: "var_counter",
      },
      {
        type: "set_variable",
        name: "var_counter_calc",
        value: "10*@local.var_counter",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_counter_calc",
        _dynamicFields: {
          value: [
            {
              fullExpression: "10*@local.var_counter",
              matchedExpression: "@local.var_counter",
              type: "local",
              fieldName: "var_counter",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_counter": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "var_counter_addition",
        value: "@local.var_counter + @local.var_counter",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_counter_addition",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.var_counter + @local.var_counter",
              matchedExpression: "@local.var_counter",
              type: "local",
              fieldName: "var_counter",
            },
            {
              fullExpression: "@local.var_counter + @local.var_counter",
              matchedExpression: "@local.var_counter",
              type: "local",
              fieldName: "var_counter",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_counter": ["value", "value"],
        },
      },
      {
        type: "set_variable",
        name: "var_bool_true",
        value: "@data.debug_vars.bool_true.value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_bool_true",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.debug_vars.bool_true.value",
              matchedExpression: "@data.debug_vars.bool_true.value",
              type: "data",
              fieldName: "debug_vars",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.debug_vars.bool_true.value": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "var_recursive_lookup",
        value: "@local.var_bool_true",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_recursive_lookup",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.var_bool_true",
              matchedExpression: "@local.var_bool_true",
              type: "local",
              fieldName: "var_bool_true",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_bool_true": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "var_dynamic_nested_name",
        value: "var_bool_true",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_dynamic_nested_name",
      },
      {
        type: "set_variable",
        name: "var_dynamic_nested",
        value: "@local.@local.var_dynamic_nested_name",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_dynamic_nested",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.@local.var_dynamic_nested_name",
              matchedExpression: "@local.var_dynamic_nested_name",
              type: "local",
              fieldName: "var_dynamic_nested_name",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_dynamic_nested_name": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "var_bool_false",
        value: "@data.debug_vars.bool_false.value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_bool_false",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.debug_vars.bool_false.value",
              matchedExpression: "@data.debug_vars.bool_false.value",
              type: "data",
              fieldName: "debug_vars",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.debug_vars.bool_false.value": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "var_number_0",
        value: "@data.debug_vars.number_0.value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_number_0",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.debug_vars.number_0.value",
              matchedExpression: "@data.debug_vars.number_0.value",
              type: "data",
              fieldName: "debug_vars",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.debug_vars.number_0.value": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "var_list_1",
        value: ["@data.debug_vars.list_1.value_list"],
        exclude_from_translation: true,
        _nested_name: "var_list_1",
        _dynamicFields: {
          value: {
            "0": [
              {
                fullExpression: "@data.debug_vars.list_1.value_list",
                matchedExpression: "@data.debug_vars.list_1.value_list",
                type: "data",
                fieldName: "debug_vars",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@data.debug_vars.list_1.value_list": ["value.0"],
        },
      },
      {
        type: "set_variable",
        name: "var_list_1_length",
        value: ["@local.var_list_1.length"],
        exclude_from_translation: true,
        _nested_name: "var_list_1_length",
        _dynamicFields: {
          value: {
            "0": [
              {
                fullExpression: "@local.var_list_1.length",
                matchedExpression: "@local.var_list_1.length",
                type: "local",
                fieldName: "var_list_1",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.var_list_1.length": ["value.0"],
        },
      },
      {
        type: "set_variable",
        name: "var_text_1",
        value: "@data.debug_vars.text_1.value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.debug_vars.text_1.value",
              matchedExpression: "@data.debug_vars.text_1.value",
              type: "data",
              fieldName: "debug_vars",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.debug_vars.text_1.value": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "global_text",
        value: "@global.debug_variable_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "global_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.debug_variable_1",
              matchedExpression: "@global.debug_variable_1",
              type: "global",
              fieldName: "debug_variable_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.debug_variable_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "List length Test: @local.var_list_1_length",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "List length Test: @local.var_list_1_length",
              matchedExpression: "@local.var_list_1_length",
              type: "local",
              fieldName: "var_list_1_length",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_list_1_length": ["value"],
        },
      },
      {
        type: "text",
        name: "text_4wrong",
        value: "Expected fail calculation: 10*@local.var_counter",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4wrong",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Expected fail calculation: 10*@local.var_counter",
              matchedExpression: "@local.var_counter",
              type: "local",
              fieldName: "var_counter",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_counter": ["value"],
        },
      },
      {
        type: "text",
        name: "text_4right",
        value: "Expected pass calculation: @local.var_counter_calc",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4right",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Expected pass calculation: @local.var_counter_calc",
              matchedExpression: "@local.var_counter_calc",
              type: "local",
              fieldName: "var_counter_calc",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_counter_calc": ["value"],
        },
      },
      {
        type: "text",
        name: "text_5",
        value: "Basic Text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
      },
      {
        type: "text",
        name: "text_6",
        value: "Multiple values: @local.var_bool_true and @local.var_bool_false",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_6",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Multiple values: @local.var_bool_true and @local.var_bool_false",
              matchedExpression: "@local.var_bool_true",
              type: "local",
              fieldName: "var_bool_true",
            },
            {
              fullExpression: "Multiple values: @local.var_bool_true and @local.var_bool_false",
              matchedExpression: "@local.var_bool_false",
              type: "local",
              fieldName: "var_bool_false",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_bool_true": ["value"],
          "@local.var_bool_false": ["value"],
        },
      },
      {
        type: "text",
        name: "text_7",
        value: "Recursive lookup: @local.var_recursive_lookup",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_7",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Recursive lookup: @local.var_recursive_lookup",
              matchedExpression: "@local.var_recursive_lookup",
              type: "local",
              fieldName: "var_recursive_lookup",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_recursive_lookup": ["value"],
        },
      },
      {
        type: "text",
        name: "text_dynamic_nested",
        value: "Dynamic nested pass: @local.var_dynamic_nested",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_dynamic_nested",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Dynamic nested pass: @local.var_dynamic_nested",
              matchedExpression: "@local.var_dynamic_nested",
              type: "local",
              fieldName: "var_dynamic_nested",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_dynamic_nested": ["value"],
        },
      },
      {
        type: "button",
        name: "button_number_1_increment",
        value: "Counter value: @local.var_counter",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_local",
            args: ["var_counter", "@local.var_counter+ 1"],
            _raw: "click | set_local:var_counter:@local.var_counter+ 1",
            _cleaned: "click | set_local:var_counter:@local.var_counter+ 1",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_number_1_increment",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Counter value: @local.var_counter",
              matchedExpression: "@local.var_counter",
              type: "local",
              fieldName: "var_counter",
            },
          ],
          action_list: {
            "0": {
              args: {
                "1": [
                  {
                    fullExpression: "@local.var_counter+ 1",
                    matchedExpression: "@local.var_counter",
                    type: "local",
                    fieldName: "var_counter",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | set_local:var_counter:@local.var_counter+ 1",
                  matchedExpression: "@local.var_counter",
                  type: "local",
                  fieldName: "var_counter",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | set_local:var_counter:@local.var_counter+ 1",
                  matchedExpression: "@local.var_counter",
                  type: "local",
                  fieldName: "var_counter",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.var_counter": [
            "value",
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "text",
        name: "text_7",
        value: "TODO - nested rows",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_7",
      },
      {
        type: "text",
        name: "text_8",
        value: "Expected: global.debug_variable_1 lookup\nResult: @local.global_text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_8",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "Expected: global.debug_variable_1 lookup\nResult: @local.global_text",
              matchedExpression: "@local.global_text",
              type: "local",
              fieldName: "global_text",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.global_text": ["value"],
        },
      },
      {
        type: "text",
        name: "text_9",
        value: "Global text test: @global.debug_variable_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_9",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Global text test: @global.debug_variable_1",
              matchedExpression: "@global.debug_variable_1",
              type: "global",
              fieldName: "debug_variable_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.debug_variable_1": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "var_col_1",
        value: "@data.debug_vars.collection_1.value_collection",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_col_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.debug_vars.collection_1.value_collection",
              matchedExpression: "@data.debug_vars.collection_1.value_collection",
              type: "data",
              fieldName: "debug_vars",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.debug_vars.collection_1.value_collection": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "var_col_1_key1",
        value: "@local.var_col_1.key1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "var_col_1_key1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.var_col_1.key1",
              matchedExpression: "@local.var_col_1.key1",
              type: "local",
              fieldName: "var_col_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_col_1.key1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_col",
        value: "col_1 (object): @local.var_col_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_col",
        _dynamicFields: {
          value: [
            {
              fullExpression: "col_1 (object): @local.var_col_1",
              matchedExpression: "@local.var_col_1",
              type: "local",
              fieldName: "var_col_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_col_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text_col_key",
        value: "key1: @local.var_col_1_key1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_col_key",
        _dynamicFields: {
          value: [
            {
              fullExpression: "key1: @local.var_col_1_key1",
              matchedExpression: "@local.var_col_1_key1",
              type: "local",
              fieldName: "var_col_1_key1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_col_1_key1": ["value"],
        },
      },
      {
        type: "text",
        name: "test_col_key",
        value: '@local.var_col_1_key1 === "val1"',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "test_col_key",
        _dynamicFields: {
          value: [
            {
              fullExpression: '@local.var_col_1_key1 === "val1"',
              matchedExpression: "@local.var_col_1_key1",
              type: "local",
              fieldName: "var_col_1_key1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_col_1_key1": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_wrapper",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "wrapper_template",
        exclude_from_translation: true,
        rows: [
          {
            name: "text_1",
            value: "No text to display in wrapper_template",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "wrapper_template.text_1",
          },
        ],
        _nested_name: "wrapper_template",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_ordered_list",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title_unordered",
        value: "This is a bulleted list",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_unordered",
      },
      {
        type: "text",
        name: "text_unordered",
        value: "These are some ideas you can try:\n\n* first idea\n* second idea\n* third idea",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_unordered",
      },
      {
        type: "title",
        name: "title_ordered",
        value: "This should be a numbered list",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_ordered",
      },
      {
        type: "text",
        name: "text_ordered",
        value: "These are some ideas you can try:\n\n* first idea\n* second idea\n* third idea",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        parameter_list: {
          style: "numbered",
        },
        _nested_name: "text_ordered",
      },
      {
        type: "title",
        name: "title_ordered",
        value: "This should be a numbered list",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_ordered",
      },
      {
        type: "text",
        name: "text_ordered2",
        value: "* first idea\n* second idea\n* third idea",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        parameter_list: {
          style: "numbered",
        },
        _nested_name: "text_ordered2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_ordered_list.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_actions_bottom",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "button",
        name: "button",
        value: "Button",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "emit",
            args: ["completed"],
            _raw: "click | emit:completed",
            _cleaned: "click | emit:completed",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_overriding_action_list.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_actions_middle",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "field_1",
        value: "debug_actions_middle_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "field_1",
      },
      {
        name: "value_1",
        value: "Value 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "value_1",
      },
      {
        type: "text",
        name: "text_1",
        value: "Set the field debug_actions_middle_1 through a local variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
      },
      {
        type: "template",
        name: "debug_actions_bottom_1",
        value: "debug_actions_bottom",
        action_list: [
          {
            trigger: "completed",
            action_id: "set_field",
            args: ["@local.field_1", "@local.value_1"],
            _raw: "completed | set_field: @local.field_1 : @local.value_1",
            _cleaned: "completed | set_field: @local.field_1 : @local.value_1",
          },
          {
            trigger: "completed",
            action_id: "emit",
            args: ["completed"],
            _raw: "completed | emit: completed",
            _cleaned: "completed | emit: completed",
          },
        ],
        exclude_from_translation: true,
        rows: [],
        _nested_name: "debug_actions_bottom_1",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.field_1",
                    matchedExpression: "@local.field_1",
                    type: "local",
                    fieldName: "field_1",
                  },
                ],
                "1": [
                  {
                    fullExpression: "@local.value_1",
                    matchedExpression: "@local.value_1",
                    type: "local",
                    fieldName: "value_1",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "completed | set_field: @local.field_1 : @local.value_1",
                  matchedExpression: "@local.field_1",
                  type: "local",
                  fieldName: "field_1",
                },
                {
                  fullExpression: "completed | set_field: @local.field_1 : @local.value_1",
                  matchedExpression: "@local.value_1",
                  type: "local",
                  fieldName: "value_1",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "completed | set_field: @local.field_1 : @local.value_1",
                  matchedExpression: "@local.field_1",
                  type: "local",
                  fieldName: "field_1",
                },
                {
                  fullExpression: "completed | set_field: @local.field_1 : @local.value_1",
                  matchedExpression: "@local.value_1",
                  type: "local",
                  fieldName: "value_1",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.field_1": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
          "@local.value_1": [
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "Set the field debug_actions_middle_2 directly",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
      {
        type: "template",
        name: "debug_actions_bottom_2",
        value: "debug_actions_bottom",
        action_list: [
          {
            trigger: "completed",
            action_id: "set_field",
            args: ["debug_actions_middle_2", "Value 2"],
            _raw: "completed | set_field: debug_actions_middle_2 : Value 2",
            _cleaned: "completed | set_field: debug_actions_middle_2 : Value 2",
          },
          {
            trigger: "completed",
            action_id: "emit",
            args: ["completed"],
            _raw: "completed | emit: completed",
            _cleaned: "completed | emit: completed",
          },
        ],
        exclude_from_translation: true,
        rows: [],
        _nested_name: "debug_actions_bottom_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_overriding_action_list.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_actions_top",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title_0",
        value: "Example 0",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_0",
      },
      {
        type: "template",
        name: "debug_actions_middle_0",
        value: "debug_actions_middle",
        exclude_from_translation: true,
        rows: [
          {
            name: "text_1",
            value: "Do not override the action list",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_actions_middle_0.text_1",
          },
          {
            name: "text_2",
            value: "Do not override the action list",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_actions_middle_0.text_2",
          },
        ],
        _nested_name: "debug_actions_middle_0",
      },
      {
        type: "title",
        name: "title_1",
        value: "Example 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "template",
        name: "debug_actions_middle_1",
        value: "debug_actions_middle",
        exclude_from_translation: true,
        rows: [
          {
            name: "text_1",
            value: "Set the field debug_actions_top_1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_actions_middle_1.text_1",
          },
          {
            type: "nested_properties",
            name: "debug_actions_bottom_1",
            action_list: [
              {
                trigger: "completed",
                action_id: "set_field",
                args: ["debug_actions_top_1", "Value 1"],
                _raw: "completed | set_field: debug_actions_top_1 : Value 1",
                _cleaned: "completed | set_field: debug_actions_top_1 : Value 1",
              },
            ],
            exclude_from_translation: true,
            rows: [],
            _nested_name: "debug_actions_middle_1.debug_actions_bottom_1",
          },
          {
            name: "text_2",
            value: "Set the field debug_actions_top_2",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_actions_middle_1.text_2",
          },
          {
            type: "nested_properties",
            name: "debug_actions_bottom_2",
            action_list: [
              {
                trigger: "completed",
                action_id: "set_field",
                args: ["debug_actions_top_2", "Value 2"],
                _raw: "completed | set_field: debug_actions_top_2 : Value 2",
                _cleaned: "completed | set_field: debug_actions_top_2 : Value 2",
              },
            ],
            exclude_from_translation: true,
            rows: [],
            _nested_name: "debug_actions_middle_1.debug_actions_bottom_2",
          },
        ],
        _nested_name: "debug_actions_middle_1",
      },
      {
        type: "title",
        name: "title_2",
        value: "Example 2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_2",
      },
      {
        type: "template",
        name: "debug_actions_middle_2",
        value: "debug_actions_middle",
        exclude_from_translation: true,
        rows: [
          {
            name: "text_1",
            value: "Set the field debug_actions_top_3 and emit completed",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_actions_middle_2.text_1",
          },
          {
            type: "nested_properties",
            name: "debug_actions_bottom_1",
            action_list: [
              {
                trigger: "completed",
                action_id: "set_field",
                args: ["debug_actions_top_3", "Value 3"],
                _raw: "completed | set_field: debug_actions_top_3: Value 3",
                _cleaned: "completed | set_field: debug_actions_top_3: Value 3",
              },
              {
                trigger: "completed",
                action_id: "emit",
                args: ["completed"],
                _raw: "completed | emit: completed",
                _cleaned: "completed | emit: completed",
              },
            ],
            exclude_from_translation: true,
            rows: [],
            _nested_name: "debug_actions_middle_2.debug_actions_bottom_1",
          },
          {
            name: "text_2",
            value: "Set the field debug_actions_top_4 and emit completed",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_actions_middle_2.text_2",
          },
          {
            type: "nested_properties",
            name: "debug_actions_bottom_2",
            action_list: [
              {
                trigger: "completed",
                action_id: "set_field",
                args: ["debug_actions_top_4", "Value 4"],
                _raw: "completed | set_field: debug_actions_top_4: Value 4",
                _cleaned: "completed | set_field: debug_actions_top_4: Value 4",
              },
              {
                trigger: "completed",
                action_id: "emit",
                args: ["completed"],
                _raw: "completed | emit: completed",
                _cleaned: "completed | emit: completed",
              },
            ],
            exclude_from_translation: true,
            rows: [],
            _nested_name: "debug_actions_middle_2.debug_actions_bottom_2",
          },
        ],
        _nested_name: "debug_actions_middle_2",
      },
      {
        type: "title",
        name: "title_3",
        value: "Example 3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_3",
      },
      {
        type: "template",
        name: "debug_actions_middle_3",
        value: "debug_actions_middle",
        exclude_from_translation: true,
        rows: [
          {
            name: "text_1",
            value: "Emit completed",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_actions_middle_3.text_1",
          },
          {
            type: "nested_properties",
            name: "debug_actions_bottom_1",
            action_list: [
              {
                trigger: "completed",
                action_id: "emit",
                args: ["completed"],
                _raw: "completed | emit: completed",
                _cleaned: "completed | emit: completed",
              },
            ],
            exclude_from_translation: true,
            rows: [],
            _nested_name: "debug_actions_middle_3.debug_actions_bottom_1",
          },
          {
            name: "text_2",
            value: "Emit completed",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_actions_middle_3.text_2",
          },
          {
            type: "nested_properties",
            name: "debug_actions_bottom_2",
            action_list: [
              {
                trigger: "completed",
                action_id: "emit",
                args: ["completed"],
                _raw: "completed | emit: completed",
                _cleaned: "completed | emit: completed",
              },
            ],
            exclude_from_translation: true,
            rows: [],
            _nested_name: "debug_actions_middle_3.debug_actions_bottom_2",
          },
        ],
        _nested_name: "debug_actions_middle_3",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_overriding_action_list.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_radio_group_replies",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "answer_list",
        value: ["name:name_var_1 | text:First", "name:name_var_2 | text:Second"],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        type: "radio_group",
        name: "radio_group",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "text_1_hidden",
        value: "Text first - hidden",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@local.radio_group != "name_var_1"',
        exclude_from_translation: true,
        _nested_name: "text_1_hidden",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@local.radio_group != "name_var_1"',
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_1_condition",
        value: "Text first - condition",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        condition: '@local.radio_group == "name_var_1"',
        exclude_from_translation: true,
        _nested_name: "text_1_condition",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.radio_group == "name_var_1"',
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["condition"],
        },
      },
      {
        type: "display_group",
        name: "dg_1",
        hidden: '@local.radio_group != "name_var_1"',
        rows: [
          {
            type: "text",
            name: "text_1_display_group",
            value: "Text first - hidden on display group",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "dg_1.text_1_display_group",
          },
        ],
        _nested_name: "dg_1",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@local.radio_group != "name_var_1"',
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_2_hidden",
        value: "Text second - hidden",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@local.radio_group != "name_var_2"',
        exclude_from_translation: true,
        _nested_name: "text_2_hidden",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@local.radio_group != "name_var_2"',
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_2_condition",
        value: "Text second - condition",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        condition: '@local.radio_group == "name_var_2"',
        exclude_from_translation: true,
        _nested_name: "text_2_condition",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.radio_group == "name_var_2"',
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["condition"],
        },
      },
      {
        type: "display_group",
        name: "dg_2",
        hidden: '@local.radio_group != "name_var_2"',
        rows: [
          {
            type: "text",
            name: "text_2_display_group",
            value: "Text second - hidden on display group",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "dg_2.text_2_display_group",
          },
        ],
        _nested_name: "dg_2",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@local.radio_group != "name_var_2"',
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_overriding_value.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_overriding_value",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "Nested template",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "text",
        name: "text_1",
        value: "Hiding and conditions work correctly",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
      },
      {
        type: "template",
        name: "debug_radio_group_replies_1",
        value: "debug_radio_group_replies",
        rows: [],
        _nested_name: "debug_radio_group_replies_1",
      },
      {
        type: "title",
        name: "title_2",
        value: "Nested template with overridden text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_2",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "Hiding no longer works when specified on the same row as the text. When specified on the display group, hiding does work. Condition works fine.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
      {
        type: "template",
        name: "debug_radio_group_replies_2",
        value: "debug_radio_group_replies",
        rows: [
          {
            name: "text_1_hidden",
            value: "New text first - hidden",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_replies_2.text_1_hidden",
          },
          {
            name: "text_1_condition",
            value: "New text first - condition",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_replies_2.text_1_condition",
          },
          {
            name: "text_1_display_group",
            value: "New text first - hidden on display group",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_replies_2.text_1_display_group",
          },
          {
            name: "text_2_hidden",
            value: "New text second - hidden",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_replies_2.text_2_hidden",
          },
          {
            name: "text_2_condition",
            value: "New text second - condition",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_replies_2.text_2_condition",
          },
          {
            name: "text_2_display_group",
            value: "New text second - hidden on display group",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_radio_group_replies_2.text_2_display_group",
          },
        ],
        _nested_name: "debug_radio_group_replies_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_overriding_value.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_pop_ups_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_2",
        value: "Button 1 is a simple text pop-up:",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
      {
        type: "button",
        name: "button_pop_up_1",
        value: "Button 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_text"],
            _raw: "click | pop_up:example_text",
            _cleaned: "click | pop_up:example_text",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_pop_up_1",
      },
      {
        type: "text",
        name: "text_4",
        value: "Button 2 is a pop-up with a button:",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4",
      },
      {
        type: "button",
        name: "button_pop_up_3",
        value: "Button 2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_go_to_3"],
            _raw: "click | pop_up:example_go_to_3",
            _cleaned: "click | pop_up:example_go_to_3",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_pop_up_3",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_pop_ups.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_pop_ups_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "debug_pop_ups_1",
        value: "debug_pop_ups_1",
        rows: [],
        _nested_name: "debug_pop_ups_1",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_pop_ups.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_pop_ups_variable",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "template_name",
        value: "example_text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "template_name",
      },
      {
        type: "text",
        name: "text_1",
        value: "Button 1 pops up the template example_text directly",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
      },
      {
        type: "button",
        name: "button_pop_up_1",
        value: "Button_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_text"],
            _raw: "click | pop_up:example_text",
            _cleaned: "click | pop_up:example_text",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_pop_up_1",
      },
      {
        type: "text",
        name: "text_2",
        value: 'Button 2 pops up the template example_text using a local variable "template_name"',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
      {
        type: "button",
        name: "button_pop_up_2",
        value: "Button 2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["@local.template_name"],
            _raw: "click | pop_up:@local.template_name",
            _cleaned: "click | pop_up:@local.template_name",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_pop_up_2",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.template_name",
                    matchedExpression: "@local.template_name",
                    type: "local",
                    fieldName: "template_name",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | pop_up:@local.template_name",
                  matchedExpression: "@local.template_name",
                  type: "local",
                  fieldName: "template_name",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | pop_up:@local.template_name",
                  matchedExpression: "@local.template_name",
                  type: "local",
                  fieldName: "template_name",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.template_name": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_pop_ups_variable.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_relax_checkbox",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "set_field",
        name: "relax_3_favourite",
        value: false,
        exclude_from_translation: true,
        _nested_name: "relax_3_favourite",
      },
      {
        type: "set_field",
        name: "which_relax",
        value: "relax_3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "which_relax",
      },
      {
        name: "favourite",
        value: "_favourite",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "favourite",
      },
      {
        name: "relax",
        value: "@field.which_relax",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "relax",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@field.which_relax",
              matchedExpression: "@field.which_relax",
              type: "field",
              fieldName: "which_relax",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.which_relax": ["value"],
        },
      },
      {
        name: "relax_favourite",
        value: "@local.relax@local.favourite",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "relax_favourite",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.relax@local.favourite",
              matchedExpression: "@local.relax",
              type: "local",
              fieldName: "relax",
            },
            {
              fullExpression: "@local.relax@local.favourite",
              matchedExpression: "@local.favourite",
              type: "local",
              fieldName: "favourite",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.relax": ["value"],
          "@local.favourite": ["value"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "@local.relax_favourite",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.relax_favourite",
              matchedExpression: "@local.relax_favourite",
              type: "local",
              fieldName: "relax_favourite",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.relax_favourite": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "This is @field.@local.relax_favourite",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "This is @field.@local.relax_favourite",
              matchedExpression: "@local.relax_favourite",
              type: "local",
              fieldName: "relax_favourite",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.relax_favourite": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "@field.@local.relax@local.favourite",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@field.@local.relax@local.favourite",
              matchedExpression: "@local.relax",
              type: "local",
              fieldName: "relax",
            },
            {
              fullExpression: "@field.@local.relax@local.favourite",
              matchedExpression: "@local.favourite",
              type: "local",
              fieldName: "favourite",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.relax": ["value"],
          "@local.favourite": ["value"],
        },
      },
      {
        type: "simple_checkbox",
        name: "checkbox_1",
        value: "@field.@local.relax_favourite",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["@local.relax_favourite", "this.value"],
            _raw: "changed | set_field:@local.relax_favourite:@local.checkbox_1",
            _cleaned: "changed | set_field:@local.relax_favourite:@local.checkbox_1",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          label_text: "checkbox 1",
        },
        _nested_name: "checkbox_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@field.@local.relax_favourite",
              matchedExpression: "@local.relax_favourite",
              type: "local",
              fieldName: "relax_favourite",
            },
          ],
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.relax_favourite",
                    matchedExpression: "@local.relax_favourite",
                    type: "local",
                    fieldName: "relax_favourite",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "changed | set_field:@local.relax_favourite:@local.checkbox_1",
                  matchedExpression: "@local.relax_favourite",
                  type: "local",
                  fieldName: "relax_favourite",
                },
                {
                  fullExpression: "changed | set_field:@local.relax_favourite:@local.checkbox_1",
                  matchedExpression: "@local.checkbox_1",
                  type: "local",
                  fieldName: "checkbox_1",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:@local.relax_favourite:@local.checkbox_1",
                  matchedExpression: "@local.relax_favourite",
                  type: "local",
                  fieldName: "relax_favourite",
                },
                {
                  fullExpression: "changed | set_field:@local.relax_favourite:@local.checkbox_1",
                  matchedExpression: "@local.checkbox_1",
                  type: "local",
                  fieldName: "checkbox_1",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.relax_favourite": [
            "value",
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
          "@local.checkbox_1": ["action_list.0._raw", "action_list.0._cleaned"],
        },
      },
      {
        type: "text",
        name: "local_text_1",
        value: "checkbox local: @local.checkbox_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "local_text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "checkbox local: @local.checkbox_1",
              matchedExpression: "@local.checkbox_1",
              type: "local",
              fieldName: "checkbox_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.checkbox_1": ["value"],
        },
      },
      {
        type: "simple_checkbox",
        name: "checkbox_2",
        value: "@field.relax_3_favourite",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["relax_3_favourite", "this.value"],
            _raw: "changed | set_field:relax_3_favourite:@local.checkbox_2",
            _cleaned: "changed | set_field:relax_3_favourite:@local.checkbox_2",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          label_text: "checkbox 2",
        },
        _nested_name: "checkbox_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@field.relax_3_favourite",
              matchedExpression: "@field.relax_3_favourite",
              type: "field",
              fieldName: "relax_3_favourite",
            },
          ],
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | set_field:relax_3_favourite:@local.checkbox_2",
                  matchedExpression: "@local.checkbox_2",
                  type: "local",
                  fieldName: "checkbox_2",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:relax_3_favourite:@local.checkbox_2",
                  matchedExpression: "@local.checkbox_2",
                  type: "local",
                  fieldName: "checkbox_2",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@field.relax_3_favourite": ["value"],
          "@local.checkbox_2": ["action_list.0._raw", "action_list.0._cleaned"],
        },
      },
      {
        type: "text",
        name: "local_text_2",
        value: "checkbox local: @local.checkbox_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "local_text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "checkbox local: @local.checkbox_2",
              matchedExpression: "@local.checkbox_2",
              type: "local",
              fieldName: "checkbox_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.checkbox_2": ["value"],
        },
      },
      {
        type: "simple_checkbox",
        name: "checkbox_3",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["relax_3_favourite", "this.value"],
            _raw: "changed | set_field:relax_3_favourite:@local.checkbox_3",
            _cleaned: "changed | set_field:relax_3_favourite:@local.checkbox_3",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          label_text: "checkbox 3",
        },
        _nested_name: "checkbox_3",
        _dynamicFields: {
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | set_field:relax_3_favourite:@local.checkbox_3",
                  matchedExpression: "@local.checkbox_3",
                  type: "local",
                  fieldName: "checkbox_3",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:relax_3_favourite:@local.checkbox_3",
                  matchedExpression: "@local.checkbox_3",
                  type: "local",
                  fieldName: "checkbox_3",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.checkbox_3": ["action_list.0._raw", "action_list.0._cleaned"],
        },
      },
      {
        type: "text",
        name: "local_text_3",
        value: "checkbox local: @local.checkbox_3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "local_text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "checkbox local: @local.checkbox_3",
              matchedExpression: "@local.checkbox_3",
              type: "local",
              fieldName: "checkbox_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.checkbox_3": ["value"],
        },
      },
      {
        type: "simple_checkbox",
        name: "checkbox_4",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["@local.relax_favourite", "this.value"],
            _raw: "changed | set_field:@local.relax_favourite:@local.checkbox_4",
            _cleaned: "changed | set_field:@local.relax_favourite:@local.checkbox_4",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          label_text: "checkbox 4",
        },
        _nested_name: "checkbox_4",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.relax_favourite",
                    matchedExpression: "@local.relax_favourite",
                    type: "local",
                    fieldName: "relax_favourite",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "changed | set_field:@local.relax_favourite:@local.checkbox_4",
                  matchedExpression: "@local.relax_favourite",
                  type: "local",
                  fieldName: "relax_favourite",
                },
                {
                  fullExpression: "changed | set_field:@local.relax_favourite:@local.checkbox_4",
                  matchedExpression: "@local.checkbox_4",
                  type: "local",
                  fieldName: "checkbox_4",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:@local.relax_favourite:@local.checkbox_4",
                  matchedExpression: "@local.relax_favourite",
                  type: "local",
                  fieldName: "relax_favourite",
                },
                {
                  fullExpression: "changed | set_field:@local.relax_favourite:@local.checkbox_4",
                  matchedExpression: "@local.checkbox_4",
                  type: "local",
                  fieldName: "checkbox_4",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.relax_favourite": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
          "@local.checkbox_4": ["action_list.0._raw", "action_list.0._cleaned"],
        },
      },
      {
        type: "text",
        name: "local_text_4",
        value: "checkbox local: @local.checkbox_4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "local_text_4",
        _dynamicFields: {
          value: [
            {
              fullExpression: "checkbox local: @local.checkbox_4",
              matchedExpression: "@local.checkbox_4",
              type: "local",
              fieldName: "checkbox_4",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.checkbox_4": ["value"],
        },
      },
      {
        type: "animated_section",
        name: "dave",
        exclude_from_translation: true,
        rows: [
          {
            type: "simple_checkbox",
            name: "checkbox_5",
            action_list: [
              {
                trigger: "changed",
                action_id: "set_field",
                args: ["checkbox_a_s_test", "this.value"],
                _raw: "changed | set_field:checkbox_a_s_test:@local.checkbox_5",
                _cleaned: "changed | set_field:checkbox_a_s_test:@local.checkbox_5",
              },
            ],
            exclude_from_translation: true,
            parameter_list: {
              label_text: "checkbox 5",
            },
            _nested_name: "dave.checkbox_5",
            _dynamicFields: {
              action_list: {
                "0": {
                  _raw: [
                    {
                      fullExpression: "changed | set_field:checkbox_a_s_test:@local.checkbox_5",
                      matchedExpression: "@local.checkbox_5",
                      type: "local",
                      fieldName: "checkbox_5",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "changed | set_field:checkbox_a_s_test:@local.checkbox_5",
                      matchedExpression: "@local.checkbox_5",
                      type: "local",
                      fieldName: "checkbox_5",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@local.checkbox_5": ["action_list.0._raw", "action_list.0._cleaned"],
            },
          },
        ],
        _nested_name: "dave",
      },
      {
        type: "text",
        name: "text_5",
        value:
          "the local for checkbox 5 in animates section is @local.checkbox_5 and the field is @fields.checkbox_a_s_test",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "the local for checkbox 5 in animates section is @local.checkbox_5 and the field is @fields.checkbox_a_s_test",
              matchedExpression: "@local.checkbox_5",
              type: "local",
              fieldName: "checkbox_5",
            },
            {
              fullExpression:
                "the local for checkbox 5 in animates section is @local.checkbox_5 and the field is @fields.checkbox_a_s_test",
              matchedExpression: "@fields.checkbox_a_s_test",
              type: "fields",
              fieldName: "checkbox_a_s_test",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.checkbox_5": ["value"],
          "@fields.checkbox_a_s_test": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_relax_checkbox.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_render_parent",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Parent",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "Value of test_render_updates_field: \nfield: @fields.test_render_updates_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "Value of test_render_updates_field: \nfield: @fields.test_render_updates_field",
              matchedExpression: "@fields.test_render_updates_field",
              type: "fields",
              fieldName: "test_render_updates_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.test_render_updates_field": ["value"],
        },
      },
      {
        type: "template",
        name: "debug_render_child",
        value: "debug_render_child",
        exclude_from_translation: true,
        rows: [
          {
            type: "nested_properties",
            name: "debug_render_grandchild_2b",
            value: "debug_render_grandchild_2",
            exclude_from_translation: true,
            rows: [
              {
                name: "title",
                value: "Grandchild 2b",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_render_child.debug_render_grandchild_2b.title",
              },
              {
                name: "text_3",
                value: "(parent) selected no",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                hidden: '@fields.test_render_updates_field!="no"',
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_render_child.debug_render_grandchild_2b.text_3",
                _dynamicFields: {
                  hidden: [
                    {
                      fullExpression: '@fields.test_render_updates_field!="no"',
                      matchedExpression: "@fields.test_render_updates_field",
                      type: "fields",
                      fieldName: "test_render_updates_field",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@fields.test_render_updates_field": ["hidden"],
                },
              },
              {
                name: "text_4",
                value: "(parent) selected yes",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                hidden: '@fields.test_render_updates_field!="yes"',
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_render_child.debug_render_grandchild_2b.text_4",
                _dynamicFields: {
                  hidden: [
                    {
                      fullExpression: '@fields.test_render_updates_field!="yes"',
                      matchedExpression: "@fields.test_render_updates_field",
                      type: "fields",
                      fieldName: "test_render_updates_field",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@fields.test_render_updates_field": ["hidden"],
                },
              },
              {
                name: "text_5",
                value:
                  "(parent) Value of test_render_updates_field: @fields.test_render_updates_field",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_render_child.debug_render_grandchild_2b.text_5",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression:
                        "(parent) Value of test_render_updates_field: @fields.test_render_updates_field",
                      matchedExpression: "@fields.test_render_updates_field",
                      type: "fields",
                      fieldName: "test_render_updates_field",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@fields.test_render_updates_field": ["value"],
                },
              },
            ],
            _nested_name: "debug_render_child.debug_render_grandchild_2b",
          },
          {
            type: "nested_properties",
            name: "debug_render_grandchild_3b",
            value: "example_title_text",
            condition: '@fields.test_render_updates_field=="no"',
            exclude_from_translation: true,
            rows: [
              {
                name: "title",
                value: "Grandchild 3b",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_render_child.debug_render_grandchild_3b.title",
              },
              {
                name: "text",
                value: "(parent) selected no",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_render_child.debug_render_grandchild_3b.text",
              },
            ],
            _nested_name: "debug_render_child.debug_render_grandchild_3b",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: '@fields.test_render_updates_field=="no"',
                  matchedExpression: "@fields.test_render_updates_field",
                  type: "fields",
                  fieldName: "test_render_updates_field",
                },
              ],
            },
            _dynamicDependencies: {
              "@fields.test_render_updates_field": ["condition"],
            },
          },
          {
            type: "nested_properties",
            name: "debug_render_grandchild_4b",
            value: "example_title_text",
            condition: '@fields.test_render_updates_field=="yes"',
            exclude_from_translation: true,
            rows: [
              {
                name: "title",
                value: "Grandchild 4b",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_render_child.debug_render_grandchild_4b.title",
              },
              {
                name: "text",
                value: "(parent) selected yes",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "debug_render_child.debug_render_grandchild_4b.text",
              },
            ],
            _nested_name: "debug_render_child.debug_render_grandchild_4b",
            _dynamicFields: {
              condition: [
                {
                  fullExpression: '@fields.test_render_updates_field=="yes"',
                  matchedExpression: "@fields.test_render_updates_field",
                  type: "fields",
                  fieldName: "test_render_updates_field",
                },
              ],
            },
            _dynamicDependencies: {
              "@fields.test_render_updates_field": ["condition"],
            },
          },
        ],
        _nested_name: "debug_render_child",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_render_grandchild_2.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_render_child",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Child",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "template",
        name: "debug_render_grandchild_1",
        value: "debug_render_grandchild_1",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "debug_render_grandchild_1",
      },
      {
        type: "template",
        name: "debug_render_grandchild_2a",
        value: "debug_render_grandchild_2",
        exclude_from_translation: true,
        rows: [
          {
            name: "title",
            value: "Grandchild 2a",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_render_grandchild_2a.title",
          },
          {
            name: "text_3",
            value: "(child) selected no",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            hidden: '@fields.test_render_updates_field!="no"',
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_render_grandchild_2a.text_3",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression: '@fields.test_render_updates_field!="no"',
                  matchedExpression: "@fields.test_render_updates_field",
                  type: "fields",
                  fieldName: "test_render_updates_field",
                },
              ],
            },
            _dynamicDependencies: {
              "@fields.test_render_updates_field": ["hidden"],
            },
          },
          {
            name: "text_4",
            value: "(child) selected yes",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            hidden: '@fields.test_render_updates_field!="yes"',
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_render_grandchild_2a.text_4",
            _dynamicFields: {
              hidden: [
                {
                  fullExpression: '@fields.test_render_updates_field!="yes"',
                  matchedExpression: "@fields.test_render_updates_field",
                  type: "fields",
                  fieldName: "test_render_updates_field",
                },
              ],
            },
            _dynamicDependencies: {
              "@fields.test_render_updates_field": ["hidden"],
            },
          },
          {
            name: "text_5",
            value: "(child) Value of test_render_updates_field: @fields.test_render_updates_field",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_render_grandchild_2a.text_5",
            _dynamicFields: {
              value: [
                {
                  fullExpression:
                    "(child) Value of test_render_updates_field: @fields.test_render_updates_field",
                  matchedExpression: "@fields.test_render_updates_field",
                  type: "fields",
                  fieldName: "test_render_updates_field",
                },
              ],
            },
            _dynamicDependencies: {
              "@fields.test_render_updates_field": ["value"],
            },
          },
        ],
        _nested_name: "debug_render_grandchild_2a",
      },
      {
        type: "template",
        name: "debug_render_grandchild_2b",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "debug_render_grandchild_2b",
      },
      {
        type: "template",
        name: "debug_render_grandchild_3a",
        value: "example_title_text",
        hidden: '@fields.test_render_updates_field!="no"',
        exclude_from_translation: true,
        rows: [
          {
            name: "title",
            value: "Grandchild 3a",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_render_grandchild_3a.title",
          },
          {
            name: "text",
            value: "(child) selected no",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_render_grandchild_3a.text",
          },
        ],
        _nested_name: "debug_render_grandchild_3a",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@fields.test_render_updates_field!="no"',
              matchedExpression: "@fields.test_render_updates_field",
              type: "fields",
              fieldName: "test_render_updates_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.test_render_updates_field": ["hidden"],
        },
      },
      {
        type: "template",
        name: "debug_render_grandchild_3b",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "debug_render_grandchild_3b",
      },
      {
        type: "template",
        name: "debug_render_grandchild_4a",
        value: "example_title_text",
        hidden: '@fields.test_render_updates_field!="yes"',
        exclude_from_translation: true,
        rows: [
          {
            name: "title",
            value: "Grandchild 4a",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_render_grandchild_4a.title",
          },
          {
            name: "text",
            value: "(child) selected yes",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "debug_render_grandchild_4a.text",
          },
        ],
        _nested_name: "debug_render_grandchild_4a",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@fields.test_render_updates_field!="yes"',
              matchedExpression: "@fields.test_render_updates_field",
              type: "fields",
              fieldName: "test_render_updates_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.test_render_updates_field": ["hidden"],
        },
      },
      {
        type: "template",
        name: "debug_render_grandchild_4b",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "debug_render_grandchild_4b",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_render_grandchild_2.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_render_grandchild_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Grandchild 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        name: "answer_list_1",
        value: ["name: yes | text: Yes", "name: no | text: No"],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_1",
      },
      {
        type: "radio_group",
        name: "radio_group",
        value: "@fields.test_render_updates_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["test_render_updates_field", "this.value"],
            _raw: "changed | set_field:test_render_updates_field:@local.radio_group",
            _cleaned: "changed | set_field:test_render_updates_field:@local.radio_group",
          },
          {
            trigger: "changed",
            action_id: "emit",
            args: ["force_reload"],
            _raw: "changed | emit:force_reload",
            _cleaned: "changed | emit:force_reload",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.answer_list_1",
          radio_button_type: "btn_text",
          options_per_row: "2",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields.test_render_updates_field",
              matchedExpression: "@fields.test_render_updates_field",
              type: "fields",
              fieldName: "test_render_updates_field",
            },
          ],
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression:
                    "changed | set_field:test_render_updates_field:@local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
              _cleaned: [
                {
                  fullExpression:
                    "changed | set_field:test_render_updates_field:@local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
            },
          },
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_1",
                matchedExpression: "@local.answer_list_1",
                type: "local",
                fieldName: "answer_list_1",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@fields.test_render_updates_field": ["value"],
          "@local.radio_group": ["action_list.0._raw", "action_list.0._cleaned"],
          "@local.answer_list_1": ["parameter_list.answer_list"],
        },
      },
      {
        type: "text",
        name: "go_to_field",
        value:
          "Value of test_render_updates_field:  @fields.test_render_updates_field\n\nlocal: @local.radio_group;",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "go_to_field",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "Value of test_render_updates_field:  @fields.test_render_updates_field\n\nlocal: @local.radio_group;",
              matchedExpression: "@fields.test_render_updates_field",
              type: "fields",
              fieldName: "test_render_updates_field",
            },
            {
              fullExpression:
                "Value of test_render_updates_field:  @fields.test_render_updates_field\n\nlocal: @local.radio_group;",
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.test_render_updates_field": ["value"],
          "@local.radio_group": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_render_grandchild_2.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_render_grandchild_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Grandchild 2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "(grandchild) Value of test_render_updates_field: @fields.test_render_updates_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "(grandchild) Value of test_render_updates_field: @fields.test_render_updates_field",
              matchedExpression: "@fields.test_render_updates_field",
              type: "fields",
              fieldName: "test_render_updates_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.test_render_updates_field": ["value"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "(grandchild) selected no",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@fields.test_render_updates_field!="no"',
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@fields.test_render_updates_field!="no"',
              matchedExpression: "@fields.test_render_updates_field",
              type: "fields",
              fieldName: "test_render_updates_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.test_render_updates_field": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "(grandchild) selected yes",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: '@fields.test_render_updates_field!="yes"',
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@fields.test_render_updates_field!="yes"',
              matchedExpression: "@fields.test_render_updates_field",
              type: "fields",
              fieldName: "test_render_updates_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.test_render_updates_field": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "Text 3",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
      },
      {
        type: "text",
        name: "text_4",
        value: "Text 4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4",
      },
      {
        type: "text",
        name: "text_5",
        value: "Text 5",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_render_grandchild_2.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_title_text",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Example Title",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "Example text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_render_grandchild_2.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_render_updates",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        value: "Parent",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "title",
        _nested_name: "title",
      },
      {
        type: "text",
        value: "Changing either child input should update the other sibling",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "text",
        _nested_name: "text",
      },
      {
        type: "text",
        value: "Value of debug_render_updates_field: \nfield: @fields.debug_render_updates_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "text",
        _nested_name: "text",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "Value of debug_render_updates_field: \nfield: @fields.debug_render_updates_field",
              matchedExpression: "@fields.debug_render_updates_field",
              type: "fields",
              fieldName: "debug_render_updates_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_render_updates_field": ["value"],
        },
      },
      {
        type: "template",
        name: "debug_render_updates_child_1",
        value: "debug_render_updates_child_1",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "debug_render_updates_child_1",
      },
      {
        type: "template",
        name: "debug_render_updates_child_2",
        value: "debug_render_updates_child_2",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "debug_render_updates_child_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_render_updates.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_render_updates_child_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        value: "Child 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "title",
        _nested_name: "title",
      },
      {
        type: "text_box",
        name: "debug_render_updates_text",
        value: "@fields.debug_render_updates_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["debug_render_updates_field", "this.value"],
            _raw: "changed | set_field:debug_render_updates_field:@local.debug_render_updates_text",
            _cleaned:
              "changed | set_field:debug_render_updates_field:@local.debug_render_updates_text",
          },
          {
            trigger: "changed",
            action_id: "emit",
            args: ["force_reprocess"],
            _raw: "changed | emit:force_reprocess",
            _cleaned: "changed | emit:force_reprocess",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "debug_render_updates_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields.debug_render_updates_field",
              matchedExpression: "@fields.debug_render_updates_field",
              type: "fields",
              fieldName: "debug_render_updates_field",
            },
          ],
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression:
                    "changed | set_field:debug_render_updates_field:@local.debug_render_updates_text",
                  matchedExpression: "@local.debug_render_updates_text",
                  type: "local",
                  fieldName: "debug_render_updates_text",
                },
              ],
              _cleaned: [
                {
                  fullExpression:
                    "changed | set_field:debug_render_updates_field:@local.debug_render_updates_text",
                  matchedExpression: "@local.debug_render_updates_text",
                  type: "local",
                  fieldName: "debug_render_updates_text",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@fields.debug_render_updates_field": ["value"],
          "@local.debug_render_updates_text": ["action_list.0._raw", "action_list.0._cleaned"],
        },
      },
      {
        type: "text",
        name: "go_to_field",
        value:
          "Value of debug_render_updates_field: \nlocal: @local.debug_render_updates_text;\nfield: @fields.debug_render_updates_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "go_to_field",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "Value of debug_render_updates_field: \nlocal: @local.debug_render_updates_text;\nfield: @fields.debug_render_updates_field",
              matchedExpression: "@local.debug_render_updates_text",
              type: "local",
              fieldName: "debug_render_updates_text",
            },
            {
              fullExpression:
                "Value of debug_render_updates_field: \nlocal: @local.debug_render_updates_text;\nfield: @fields.debug_render_updates_field",
              matchedExpression: "@fields.debug_render_updates_field",
              type: "fields",
              fieldName: "debug_render_updates_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.debug_render_updates_text": ["value"],
          "@fields.debug_render_updates_field": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_render_updates.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_render_updates_child_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        value: "Child 2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "title",
        _nested_name: "title",
      },
      {
        type: "text",
        value: "Value of debug_render_updates_field: \nfield: @fields.debug_render_updates_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "text",
        _nested_name: "text",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "Value of debug_render_updates_field: \nfield: @fields.debug_render_updates_field",
              matchedExpression: "@fields.debug_render_updates_field",
              type: "fields",
              fieldName: "debug_render_updates_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.debug_render_updates_field": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_render_updates.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_rounded_corners",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "image",
        name: "image",
        value: "plh_images/workshops/solve/read_1/slide_1.svg",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        parameter_list: {
          style: "rounded_corners",
        },
        _nested_name: "image",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_rounded_corners.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_set_field_triggered",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text_box",
        name: "text_box",
        value: "@fields.debug_tracker_text_box",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["debug_tracker_undefined@local.text_box"],
            _raw: "changed | set_field:debug_tracker_undefined@local.text_box",
            _cleaned: "changed | set_field:debug_tracker_undefined@local.text_box",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "text_box",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields.debug_tracker_text_box",
              matchedExpression: "@fields.debug_tracker_text_box",
              type: "fields",
              fieldName: "debug_tracker_text_box",
            },
          ],
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "debug_tracker_undefined@local.text_box",
                    matchedExpression: "@local.text_box",
                    type: "local",
                    fieldName: "text_box",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "changed | set_field:debug_tracker_undefined@local.text_box",
                  matchedExpression: "@local.text_box",
                  type: "local",
                  fieldName: "text_box",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | set_field:debug_tracker_undefined@local.text_box",
                  matchedExpression: "@local.text_box",
                  type: "local",
                  fieldName: "text_box",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@fields.debug_tracker_text_box": ["value"],
          "@local.text_box": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "text",
        value:
          "text_box\n---------------------------------------------------\nlocal: @local.text_box   \nfield: @fields.debug_tracker_text_box    \ntriggered: @fields.debug_triggered_text_box",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "text",
        _nested_name: "text",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "text_box\n---------------------------------------------------\nlocal: @local.text_box   \nfield: @fields.debug_tracker_text_box    \ntriggered: @fields.debug_triggered_text_box",
              matchedExpression: "@local.text_box",
              type: "local",
              fieldName: "text_box",
            },
            {
              fullExpression:
                "text_box\n---------------------------------------------------\nlocal: @local.text_box   \nfield: @fields.debug_tracker_text_box    \ntriggered: @fields.debug_triggered_text_box",
              matchedExpression: "@fields.debug_tracker_text_box",
              type: "fields",
              fieldName: "debug_tracker_text_box",
            },
            {
              fullExpression:
                "text_box\n---------------------------------------------------\nlocal: @local.text_box   \nfield: @fields.debug_tracker_text_box    \ntriggered: @fields.debug_triggered_text_box",
              matchedExpression: "@fields.debug_triggered_text_box",
              type: "fields",
              fieldName: "debug_triggered_text_box",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.text_box": ["value"],
          "@fields.debug_tracker_text_box": ["value"],
          "@fields.debug_triggered_text_box": ["value"],
        },
      },
      {
        type: "template",
        name: "nav_buttons",
        value: "nav_buttons",
        action_list: [
          {
            trigger: "completed",
            action_id: "set_field",
            args: ["debug_triggered_text_box", "@local.text_box"],
            _raw: "completed | set_field:debug_triggered_text_box:@local.text_box",
            _cleaned: "completed | set_field:debug_triggered_text_box:@local.text_box",
          },
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
        rows: [
          {
            name: "use_completed_chevron",
            value: true,
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "nav_buttons.use_completed_chevron",
          },
        ],
        _nested_name: "nav_buttons",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "1": [
                  {
                    fullExpression: "@local.text_box",
                    matchedExpression: "@local.text_box",
                    type: "local",
                    fieldName: "text_box",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "completed | set_field:debug_triggered_text_box:@local.text_box",
                  matchedExpression: "@local.text_box",
                  type: "local",
                  fieldName: "text_box",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "completed | set_field:debug_triggered_text_box:@local.text_box",
                  matchedExpression: "@local.text_box",
                  type: "local",
                  fieldName: "text_box",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.text_box": [
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_set_field_triggered.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_slider_with_template",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "slider",
        name: "slider",
        exclude_from_translation: true,
        parameter_list: {
          min: "0",
          max: "5",
        },
        _nested_name: "slider",
      },
      {
        type: "template",
        name: "example_text",
        value: "example_text",
        exclude_from_translation: true,
        rows: [],
        _nested_name: "example_text",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_slider_with_template.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_slider_without_template",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "slider",
        name: "slider",
        exclude_from_translation: true,
        parameter_list: {
          min: "0",
          max: "5",
        },
        _nested_name: "slider",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_slider_with_template.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_video_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "video",
        name: "video_src",
        value: "plh_video/lets_slow_down.mp4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "video_src",
      },
      {
        type: "video",
        name: "video_src",
        value: "https://www.w3schools.com/html/mov_bbb.mp4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "video_src",
      },
      {
        type: "text",
        name: "my_text",
        value: "This is My Text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "my_text",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_timer_icons_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "timer",
        name: "timer",
        exclude_from_translation: true,
        parameter_list: {
          duration_extension: "1",
          duration: "10",
        },
        _nested_name: "timer",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_negation",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "var_true",
        value: true,
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "var_true",
      },
      {
        name: "var_false",
        value: false,
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "var_false",
      },
      {
        type: "text",
        name: "true_true",
        value: "Variable true  (this text is hidden)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@local.var_true",
        exclude_from_translation: true,
        _nested_name: "true_true",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@local.var_true",
              matchedExpression: "@local.var_true",
              type: "local",
              fieldName: "var_true",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_true": ["hidden"],
        },
      },
      {
        type: "text",
        name: "true_false",
        value: "Variable true Hidden negated (this text is visible)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@local.var_true",
        exclude_from_translation: true,
        _nested_name: "true_false",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@local.var_true",
              matchedExpression: "!@local.var_true",
              type: "local",
              fieldName: "var_true",
            },
          ],
        },
        _dynamicDependencies: {
          "!@local.var_true": ["hidden"],
        },
      },
      {
        type: "text",
        name: "false_true",
        value: "Variable false (this text is visible)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@local.var_false",
        exclude_from_translation: true,
        _nested_name: "false_true",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@local.var_false",
              matchedExpression: "@local.var_false",
              type: "local",
              fieldName: "var_false",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_false": ["hidden"],
        },
      },
      {
        type: "text",
        name: "false_false",
        value: "Variable false Hidden negated (this text is hidden)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@local.var_false",
        exclude_from_translation: true,
        _nested_name: "false_false",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@local.var_false",
              matchedExpression: "!@local.var_false",
              type: "local",
              fieldName: "var_false",
            },
          ],
        },
        _dynamicDependencies: {
          "!@local.var_false": ["hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_set_local",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "debug_variable_one",
        value: "Value of the first debug variable.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "debug_variable_one",
      },
      {
        name: "debug_variable_two",
        value: "Value of the second debug variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "debug_variable_two",
      },
      {
        name: "debug_variable_3",
        value: "Value of the third debug variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "debug_variable_3",
      },
      {
        name: "debug_variable_four",
        value: "Value of the fourth debug variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "debug_variable_four",
      },
      {
        name: "debug_variable_five",
        value: "Value of the fifth debug variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "debug_variable_five",
      },
      {
        type: "text",
        name: "debug_text_1",
        value: "Text that includes @local.debug_variable_one",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "debug_text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Text that includes @local.debug_variable_one",
              matchedExpression: "@local.debug_variable_one",
              type: "local",
              fieldName: "debug_variable_one",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.debug_variable_one": ["value"],
        },
      },
      {
        type: "text",
        name: "debug_text_2",
        value: "Text that includes @local.debug_variable_two",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "debug_text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Text that includes @local.debug_variable_two",
              matchedExpression: "@local.debug_variable_two",
              type: "local",
              fieldName: "debug_variable_two",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.debug_variable_two": ["value"],
        },
      },
      {
        type: "text",
        name: "debug_text_3",
        value: "Text that includes @local.debug_variable_3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "debug_text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Text that includes @local.debug_variable_3",
              matchedExpression: "@local.debug_variable_3",
              type: "local",
              fieldName: "debug_variable_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.debug_variable_3": ["value"],
        },
      },
      {
        type: "text",
        name: "debug_text_4",
        value: "Text that includes @local.debug_variable_four",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "debug_text_4",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Text that includes @local.debug_variable_four",
              matchedExpression: "@local.debug_variable_four",
              type: "local",
              fieldName: "debug_variable_four",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.debug_variable_four": ["value"],
        },
      },
      {
        type: "text",
        name: "debug_text_5",
        value: "Text that includes @local.debug_variable-five",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "debug_text_5",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Text that includes @local.debug_variable-five",
              matchedExpression: "@local.debug_variable",
              type: "local",
              fieldName: "debug_variable",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.debug_variable": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_set_local_image",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "debug_variable",
        value: "plh_images/workshop_modes/guide_2/wave.svg",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "debug_variable",
      },
      {
        type: "image",
        name: "direct_image",
        value: "plh_images/workshop_modes/guide_2/wave.svg",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "direct_image",
      },
      {
        type: "text",
        name: "text",
        value: "Text below the direct image and above the variable image.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "image",
        name: "variable_image",
        value: "plh_images/workshop_modes/guide_2/wave.svg",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "variable_image",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_set_global_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "@global.debug_variable_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.debug_variable_1",
              matchedExpression: "@global.debug_variable_1",
              type: "global",
              fieldName: "debug_variable_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.debug_variable_1": ["value"],
        },
      },
      {
        type: "text",
        name: "text",
        value: "Text that includes @global.debug_variable_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Text that includes @global.debug_variable_1",
              matchedExpression: "@global.debug_variable_1",
              type: "global",
              fieldName: "debug_variable_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.debug_variable_1": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_set_field_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "set_field",
        name: "variable",
        value: "Value of the field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "variable",
      },
      {
        type: "text",
        name: "text_1",
        value: "Field value is @field.variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Field value is @field.variable",
              matchedExpression: "@field.variable",
              type: "field",
              fieldName: "variable",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.variable": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_set_field_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_1",
        value: "Field value is @field.variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Field value is @field.variable",
              matchedExpression: "@field.variable",
              type: "field",
              fieldName: "variable",
            },
          ],
        },
        _dynamicDependencies: {
          "@field.variable": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_text",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_1",
        value: "Some text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_hidden",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "box_1",
        value: "debug_text",
        exclude_from_translation: true,
        rows: [
          {
            name: "text_1",
            value: "First row: This text is hidden",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            hidden: true,
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "box_1.text_1",
          },
          {
            name: "text_1",
            value: "Second row: This text is visible",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            hidden: false,
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "box_1.text_1",
          },
        ],
        _nested_name: "box_1",
      },
      {
        type: "template",
        name: "box_2",
        value: "debug_text",
        exclude_from_translation: true,
        rows: [
          {
            name: "text_1",
            value: "First row: This text is visible",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            hidden: false,
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "box_2.text_1",
          },
          {
            name: "text_1",
            value: "Second row: This text is hidden",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            hidden: true,
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "box_2.text_1",
          },
        ],
        _nested_name: "box_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_hidden_text",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_1",
        value: "Placeholder Text to create separation",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
      },
      {
        type: "text",
        name: "text_2",
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
      {
        type: "text",
        name: "text_3",
        value: "Placeholder Text to create separation",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
      },
      {
        type: "text",
        name: "text_4",
        value: "This is text_4 which should be hidden as we set hidden to true",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: true,
        exclude_from_translation: true,
        _nested_name: "text_4",
      },
      {
        type: "text",
        name: "text_5",
        value: "Placeholder Text to create separation",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_hidden_buttons",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_1",
        value: "Placeholder Text to create separation",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
      },
      {
        type: "button",
        name: "button_1",
        exclude_from_translation: true,
        _nested_name: "button_1",
      },
      {
        type: "text",
        name: "text_2",
        value: "Placeholder Text to create separation..",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
      {
        type: "text",
        name: "button_2",
        value: "Hidden Button",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: true,
        exclude_from_translation: true,
        _nested_name: "button_2",
      },
      {
        type: "text",
        name: "text_3",
        value: "Placeholder Text to create separation",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_audio_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "audio",
        name: "audio_src",
        value: "plh_audio/sample.mp3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        parameter_list: {
          title: "Test title",
        },
        _nested_name: "audio_src",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_evaluate_hidden",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "var_true",
        value: true,
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "var_true",
      },
      {
        name: "var_number_1",
        value: 1,
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "var_number_1",
      },
      {
        type: "text",
        name: "true_true",
        value: "This text is hidden if var_true is true.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@local.var_true",
        exclude_from_translation: true,
        _nested_name: "true_true",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@local.var_true",
              matchedExpression: "@local.var_true",
              type: "local",
              fieldName: "var_true",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_true": ["hidden"],
        },
      },
      {
        type: "text",
        name: "true_false",
        value: "This text is hidden if var_true is false.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@local.var_true",
        exclude_from_translation: true,
        _nested_name: "true_false",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@local.var_true",
              matchedExpression: "!@local.var_true",
              type: "local",
              fieldName: "var_true",
            },
          ],
        },
        _dynamicDependencies: {
          "!@local.var_true": ["hidden"],
        },
      },
      {
        type: "text",
        name: "number_1",
        value: "This text is hidden if var_number_1 is 1.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@local.var_number_1 == 1",
        exclude_from_translation: true,
        _nested_name: "number_1",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@local.var_number_1 == 1",
              matchedExpression: "@local.var_number_1",
              type: "local",
              fieldName: "var_number_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_number_1": ["hidden"],
        },
      },
      {
        type: "text",
        name: "number_not_1",
        value: "This text is hidden if var_number_1 not 1.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@local.var_number_1 != 1",
        exclude_from_translation: true,
        _nested_name: "number_not_1",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@local.var_number_1 != 1",
              matchedExpression: "@local.var_number_1",
              type: "local",
              fieldName: "var_number_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_number_1": ["hidden"],
        },
      },
      {
        type: "text",
        name: "number_greater_1",
        value: "This text is hidden if var_number_1 is greater than 1.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "@local.var_number_1 > 1",
        exclude_from_translation: true,
        _nested_name: "number_greater_1",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "@local.var_number_1 > 1",
              matchedExpression: "@local.var_number_1",
              type: "local",
              fieldName: "var_number_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_number_1": ["hidden"],
        },
      },
      {
        type: "text",
        name: "number_not_1",
        value: "This text is hidden if var_number_1 is not greater than 1.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!(@local.var_number_1 > 1)",
        exclude_from_translation: true,
        _nested_name: "number_not_1",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!(@local.var_number_1 > 1)",
              matchedExpression: "@local.var_number_1",
              type: "local",
              fieldName: "var_number_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.var_number_1": ["hidden"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_text_paragraphs",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "Spacing between two paragraphs of text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "text",
        name: "text_1_a",
        value:
          "This is the first line in the first paragraph\nThis is the second line in the first paragraph.\n\nThis is the first line in the second paragraph\nThis is the second line in the second paragraph.\n\nThis is the first line in the third paragraph",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1_a",
      },
      {
        type: "title",
        name: "title_2",
        value: "Spacing in and around bulleted lists",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_2",
      },
      {
        type: "text",
        name: "text_2",
        value:
          "This text is followed by a bulleted list. \n- First item\n- Second item\nSecond line of second item\n- Third item\n\nText below the bulleted list.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_print_global",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "read",
        value: "read_temp",
        action_list: [
          {
            trigger: "completed",
            action_id: "emit",
            args: ["completed"],
            _raw: "completed | emit:completed",
            _cleaned: "completed | emit:completed",
          },
        ],
        exclude_from_translation: true,
        rows: [
          {
            type: "nested_properties",
            name: "workshop_activity",
            exclude_from_translation: true,
            rows: [
              {
                name: "intro_text",
                value:
                  "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "read.workshop_activity.intro_text",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression:
                        "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                      matchedExpression: "@global.w_instruct_female_caregiver",
                      type: "global",
                      fieldName: "w_instruct_female_caregiver",
                    },
                    {
                      fullExpression:
                        "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                      matchedExpression: "@global.w_instruct_teen_girl",
                      type: "global",
                      fieldName: "w_instruct_teen_girl",
                    },
                    {
                      fullExpression:
                        "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                      matchedExpression: "@global.parent_point",
                      type: "global",
                      fieldName: "parent_point",
                    },
                    {
                      fullExpression:
                        "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                      matchedExpression: "@global.w_instruct",
                      type: "global",
                      fieldName: "w_instruct",
                    },
                    {
                      fullExpression:
                        "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                      matchedExpression: "@global.guide_teen_name",
                      type: "global",
                      fieldName: "guide_teen_name",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@global.w_instruct_female_caregiver": ["value"],
                  "@global.w_instruct_teen_girl": ["value"],
                  "@global.parent_point": ["value"],
                  "@global.w_instruct": ["value"],
                  "@global.guide_teen_name": ["value"],
                },
              },
              {
                type: "nested_properties",
                name: "content_box",
                value: "box_image",
                exclude_from_translation: true,
                rows: [
                  {
                    name: "image_src",
                    value: "plh_images/workshops/instruct/read_1/slide_1.svg",
                    _translations: {
                      value: {
                        spa: false,
                        tsa: false,
                        xho: false,
                        zul: false,
                      },
                    },
                    exclude_from_translation: true,
                    type: "set_variable",
                    _nested_name: "read.workshop_activity.content_box.image_src",
                  },
                  {
                    name: "text",
                    value:
                      "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                    _translations: {
                      value: {
                        spa: false,
                        tsa: false,
                        xho: false,
                        zul: false,
                      },
                    },
                    exclude_from_translation: true,
                    type: "set_variable",
                    _nested_name: "read.workshop_activity.content_box.text",
                    _dynamicFields: {
                      value: [
                        {
                          fullExpression:
                            "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                          matchedExpression: "@global.w_instruct_female_caregiver",
                          type: "global",
                          fieldName: "w_instruct_female_caregiver",
                        },
                        {
                          fullExpression:
                            "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                          matchedExpression: "@global.w_instruct_teen_girl",
                          type: "global",
                          fieldName: "w_instruct_teen_girl",
                        },
                        {
                          fullExpression:
                            "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                          matchedExpression: "@global.parent_point",
                          type: "global",
                          fieldName: "parent_point",
                        },
                        {
                          fullExpression:
                            "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                          matchedExpression: "@global.w_instruct",
                          type: "global",
                          fieldName: "w_instruct",
                        },
                        {
                          fullExpression:
                            "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                          matchedExpression: "@global.guide_teen_name",
                          type: "global",
                          fieldName: "guide_teen_name",
                        },
                      ],
                    },
                    _dynamicDependencies: {
                      "@global.w_instruct_female_caregiver": ["value"],
                      "@global.w_instruct_teen_girl": ["value"],
                      "@global.parent_point": ["value"],
                      "@global.w_instruct": ["value"],
                      "@global.guide_teen_name": ["value"],
                    },
                  },
                ],
                _nested_name: "read.workshop_activity.content_box",
              },
            ],
            _nested_name: "read.workshop_activity",
          },
        ],
        _nested_name: "read",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_stepper_nav_group",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "nav_group",
        name: "nav_template_list",
        value: [
          "debug_stepper_step_1",
          "debug_stepper_step_2",
          "debug_stepper_step_3",
          "debug_stepper_step_4",
        ],
        exclude_from_translation: true,
        parameter_list: {
          progress_field: "debug_stepper_progress_field",
        },
        _nested_name: "nav_template_list",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_stepper.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_stepper_step_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Step 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "This is the first step in the nav_group",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "template",
        name: "nav_buttons",
        value: "nav_buttons",
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
        rows: [],
        _nested_name: "nav_buttons",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_stepper.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_stepper_step_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Step 2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "This is the second step in the nav_group",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "template",
        name: "nav_buttons",
        value: "nav_buttons",
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
        rows: [],
        _nested_name: "nav_buttons",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_stepper.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_stepper_step_3",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Step 3",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "This is the third step in the nav_group",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "template",
        name: "nav_buttons",
        value: "nav_buttons",
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
        rows: [],
        _nested_name: "nav_buttons",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_stepper.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_stepper_step_4",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Step 4",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "This is the fourth and last step in the nav_group",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text",
      },
      {
        type: "template",
        name: "nav_buttons",
        value: "nav_buttons",
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
        rows: [],
        _nested_name: "nav_buttons",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_stepper.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_text_wrapping",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value:
          "thisisaverylongstringwithoutobviousbreakpointstowraprepeatedmultipletimesthisisaverylongstringwithoutobviousbreakpointstowraprepeatedmultipletimesthisisaverylongstringwithoutobviousbreakpointstowraprepeatedmultipletimesthisisaverylongstringwithoutobviousbreakpointstowraprepeatedmultipletimesthisisaverylongstringwithoutobviousbreakpointstowraprepeatedmultipletimes",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        style_list: ["overflow-wrap: anywhere"],
        _nested_name: "text",
      },
      {
        type: "button",
        name: "button",
        value: "pop-up",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["debug_text_wrapping_popup"],
            _raw: "click | pop_up:debug_text_wrapping_popup",
            _cleaned: "click | pop_up:debug_text_wrapping_popup",
          },
        ],
        _nested_name: "button",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_text_wrapping.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_text_wrapping_popup",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value:
          "thisisaverylongstringwithoutobviousbreakpointstowraprepeatedmultipletimesthisisaverylongstringwithoutobviousbreakpointstowraprepeatedmultipletimesthisisaverylongstringwithoutobviousbreakpointstowraprepeatedmultipletimesthisisaverylongstringwithoutobviousbreakpointstowraprepeatedmultipletimesthisisaverylongstringwithoutobviousbreakpointstowraprepeatedmultipletimes",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        style_list: ["overflow-wrap: anywhere"],
        _nested_name: "text",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_text_wrapping.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_tile_text",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value:
          "All the tiles in the display group below should be the same height. \n\nText in the tiles below should be vertically centred, not fixed to top. You can see how the text in the tiles with short text is not vertically centred.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text",
      },
      {
        type: "display_group",
        name: "tool_tiles",
        exclude_from_translation: true,
        parameter_list: {
          style: "two_columns",
        },
        rows: [
          {
            type: "tile_component",
            name: "tile_1",
            exclude_from_translation: true,
            parameter_list: {
              style: "image_text",
              first_line_text: "short text",
              icon_src: "@data.workshop.w_1on1.image_asset",
            },
            _nested_name: "tool_tiles.tile_1",
            _dynamicFields: {
              parameter_list: {
                icon_src: [
                  {
                    fullExpression: "@data.workshop.w_1on1.image_asset",
                    matchedExpression: "@data.workshop.w_1on1.image_asset",
                    type: "data",
                    fieldName: "workshop",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@data.workshop.w_1on1.image_asset": ["parameter_list.icon_src"],
            },
          },
          {
            type: "tile_component",
            name: "tile_2",
            exclude_from_translation: true,
            parameter_list: {
              style: "image_text",
              first_line_text:
                "This is a very long text that should wrap into several lines within the tile component. Please go through this",
              icon_src: "@data.workshop.w_1on1.image_asset",
            },
            _nested_name: "tool_tiles.tile_2",
            _dynamicFields: {
              parameter_list: {
                icon_src: [
                  {
                    fullExpression: "@data.workshop.w_1on1.image_asset",
                    matchedExpression: "@data.workshop.w_1on1.image_asset",
                    type: "data",
                    fieldName: "workshop",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@data.workshop.w_1on1.image_asset": ["parameter_list.icon_src"],
            },
          },
          {
            type: "tile_component",
            name: "tile_3",
            exclude_from_translation: true,
            parameter_list: {
              style: "image_text",
              first_line_text: "short text",
              icon_src: "@data.workshop.w_1on1.image_asset",
            },
            _nested_name: "tool_tiles.tile_3",
            _dynamicFields: {
              parameter_list: {
                icon_src: [
                  {
                    fullExpression: "@data.workshop.w_1on1.image_asset",
                    matchedExpression: "@data.workshop.w_1on1.image_asset",
                    type: "data",
                    fieldName: "workshop",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@data.workshop.w_1on1.image_asset": ["parameter_list.icon_src"],
            },
          },
          {
            type: "tile_component",
            name: "tile_4",
            exclude_from_translation: true,
            parameter_list: {
              style: "image_text",
              first_line_text: "short text",
              icon_src: "@data.workshop.w_1on1.image_asset",
            },
            _nested_name: "tool_tiles.tile_4",
            _dynamicFields: {
              parameter_list: {
                icon_src: [
                  {
                    fullExpression: "@data.workshop.w_1on1.image_asset",
                    matchedExpression: "@data.workshop.w_1on1.image_asset",
                    type: "data",
                    fieldName: "workshop",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@data.workshop.w_1on1.image_asset": ["parameter_list.icon_src"],
            },
          },
        ],
        _nested_name: "tool_tiles",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_tile_text.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_tour_template",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "button",
        name: "button",
        value: "Go to debug_tour",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "start_tour",
            args: ["debug_tour"],
            _raw: "click | start_tour: debug_tour",
            _cleaned: "click | start_tour: debug_tour",
          },
        ],
        _nested_name: "button",
      },
      {
        type: "text",
        name: "text_1",
        value: "global: @global.parent_app",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "global: @global.parent_app",
              matchedExpression: "@global.parent_app",
              type: "global",
              fieldName: "parent_app",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.parent_app": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "data: @data.example.example1.text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "data: @data.example.example1.text",
              matchedExpression: "@data.example.example1.text",
              type: "data",
              fieldName: "example",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example.example1.text": ["value"],
        },
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_tour.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_translation_tile",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "quick_start_campaign",
        value: "@campaign.workshop_quick_start",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "quick_start_campaign",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@campaign.workshop_quick_start",
              matchedExpression: "@campaign.workshop_quick_start",
              type: "campaign",
              fieldName: "workshop_quick_start",
            },
          ],
        },
        _dynamicDependencies: {
          "@campaign.workshop_quick_start": ["value"],
        },
      },
      {
        name: "start_or_continue",
        value: "@local.quick_start_campaign.text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "start_or_continue",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.quick_start_campaign.text",
              matchedExpression: "@local.quick_start_campaign.text",
              type: "local",
              fieldName: "quick_start_campaign",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.quick_start_campaign.text": ["value"],
        },
      },
      {
        name: "label_group",
        value: "@global.together",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "label_group",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.together",
              matchedExpression: "@global.together",
              type: "global",
              fieldName: "together",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.together": ["value"],
        },
      },
      {
        name: "label_individual",
        value: "@global.individual",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "label_individual",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.individual",
              matchedExpression: "@global.individual",
              type: "global",
              fieldName: "individual",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.individual": ["value"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "The text on the first tile is set through locals. Translations are found.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        parameter_list: {
          style: "emphasised",
        },
        _nested_name: "text_1",
      },
      {
        type: "tile_component",
        name: "tile_1",
        parameter_list: {
          style: "quick_start_dark",
          first_line_text: "@local.start_or_continue",
          second_line_text: "@local.label_individual",
        },
        _nested_name: "tile_1",
        _dynamicFields: {
          parameter_list: {
            first_line_text: [
              {
                fullExpression: "@local.start_or_continue",
                matchedExpression: "@local.start_or_continue",
                type: "local",
                fieldName: "start_or_continue",
              },
            ],
            second_line_text: [
              {
                fullExpression: "@local.label_individual",
                matchedExpression: "@local.label_individual",
                type: "local",
                fieldName: "label_individual",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.start_or_continue": ["parameter_list.first_line_text"],
          "@local.label_individual": ["parameter_list.second_line_text"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value:
          "The text on the second tile is set through globals and a (local) data item in the parameter list. Translations are not found.",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        parameter_list: {
          style: "emphasised",
        },
        _nested_name: "text_2",
      },
      {
        type: "tile_component",
        name: "tile_2",
        parameter_list: {
          style: "quick_start_dark",
          first_line_text: "@local.quick_start_campaign.text",
          second_line_text: "@global.individual",
        },
        _nested_name: "tile_2",
        _dynamicFields: {
          parameter_list: {
            first_line_text: [
              {
                fullExpression: "@local.quick_start_campaign.text",
                matchedExpression: "@local.quick_start_campaign.text",
                type: "local",
                fieldName: "quick_start_campaign",
              },
            ],
            second_line_text: [
              {
                fullExpression: "@global.individual",
                matchedExpression: "@global.individual",
                type: "global",
                fieldName: "individual",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.quick_start_campaign.text": ["parameter_list.first_line_text"],
          "@global.individual": ["parameter_list.second_line_text"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_translation.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_translation_radio_group",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_1",
        value: "@global.individual",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.individual",
              matchedExpression: "@global.individual",
              type: "global",
              fieldName: "individual",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.individual": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "@global.together",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.together",
              matchedExpression: "@global.together",
              type: "global",
              fieldName: "together",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.together": ["value"],
        },
      },
      {
        type: "title",
        name: "text_3",
        value: "Radio group with globals (doesn't work)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        parameter_list: {
          style: "emphasised",
        },
        _nested_name: "text_3",
      },
      {
        name: "answer_list_1",
        value: [
          "name: individual | text: @global.individual",
          "name: together | text: @global.together",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_1",
        _dynamicFields: {
          value: {
            "0": [
              {
                fullExpression: "name: individual | text: @global.individual",
                matchedExpression: "@global.individual",
                type: "global",
                fieldName: "individual",
              },
            ],
            "1": [
              {
                fullExpression: "name: together | text: @global.together",
                matchedExpression: "@global.together",
                type: "global",
                fieldName: "together",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@global.individual": ["value.0"],
          "@global.together": ["value.1"],
        },
      },
      {
        type: "radio_group",
        name: "radio_group_1",
        parameter_list: {
          answer_list: "@local.answer_list_1",
        },
        _nested_name: "radio_group_1",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_1",
                matchedExpression: "@local.answer_list_1",
                type: "local",
                fieldName: "answer_list_1",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list_1": ["parameter_list.answer_list"],
        },
      },
      {
        type: "title",
        name: "text_4",
        value: "Radio group with locals (works)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        parameter_list: {
          style: "emphasised",
        },
        _nested_name: "text_4",
      },
      {
        name: "individual",
        value: "@global.individual",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "individual",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.individual",
              matchedExpression: "@global.individual",
              type: "global",
              fieldName: "individual",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.individual": ["value"],
        },
      },
      {
        name: "together",
        value: "@global.together",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "together",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.together",
              matchedExpression: "@global.together",
              type: "global",
              fieldName: "together",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.together": ["value"],
        },
      },
      {
        name: "answer_list_2",
        value: [
          "name: individual | text: @local.individual",
          "name: together | text: @local.together",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "answer_list_2",
        _dynamicFields: {
          value: {
            "0": [
              {
                fullExpression: "name: individual | text: @local.individual",
                matchedExpression: "@local.individual",
                type: "local",
                fieldName: "individual",
              },
            ],
            "1": [
              {
                fullExpression: "name: together | text: @local.together",
                matchedExpression: "@local.together",
                type: "local",
                fieldName: "together",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.individual": ["value.0"],
          "@local.together": ["value.1"],
        },
      },
      {
        type: "radio_group",
        name: "radio_group_2",
        parameter_list: {
          answer_list: "@local.answer_list_2",
        },
        _nested_name: "radio_group_2",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_2",
                matchedExpression: "@local.answer_list_2",
                type: "local",
                fieldName: "answer_list_2",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list_2": ["parameter_list.answer_list"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_translation.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_translation_trim",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text_1",
        value: "The translation of the following string exists and works correctly:",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        parameter_list: {
          style: "emphasised",
        },
        _nested_name: "text_1",
      },
      {
        type: "text",
        name: "text_2",
        value: "Sometimes our children make us really upset.",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        _nested_name: "text_2",
      },
      {
        type: "text",
        name: "text_3",
        value: "The translation of the same string, **followed by a space**, is not found:",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        parameter_list: {
          style: "emphasised",
        },
        _nested_name: "text_3",
      },
      {
        type: "text",
        name: "text_4",
        value: "Sometimes our children make us really upset.",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        _nested_name: "text_4",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_translation.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_radio_group",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "radio_group_final",
        value: "radio_group_final_temp",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        type: "set_variable",
        _nested_name: "radio_group_final",
      },
      {
        name: "answer_list",
        value: ["name:option_1 |  text: Option 1", "name: option_2 | text: Option 2"],
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        name: "options_per_row",
        value: 2,
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "options_per_row",
      },
      {
        type: "radio_group",
        name: "radio_group",
        parameter_list: {
          answer_list: "@local.answer_list",
          options_per_row: "@local.options_per_row",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
            options_per_row: [
              {
                fullExpression: "@local.options_per_row",
                matchedExpression: "@local.options_per_row",
                type: "local",
                fieldName: "options_per_row",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
          "@local.options_per_row": ["parameter_list.options_per_row"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "Local variable: @local.radio_group",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Local variable: @local.radio_group",
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["value"],
        },
      },
      {
        type: "button",
        name: "button_1",
        value: "Set field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["@local.radio_group_final", "@local.radio_group"],
            _raw: "click | set_field:@local.radio_group_final:@local.radio_group",
            _cleaned: "click | set_field:@local.radio_group_final:@local.radio_group",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_1",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.radio_group_final",
                    matchedExpression: "@local.radio_group_final",
                    type: "local",
                    fieldName: "radio_group_final",
                  },
                ],
                "1": [
                  {
                    fullExpression: "@local.radio_group",
                    matchedExpression: "@local.radio_group",
                    type: "local",
                    fieldName: "radio_group",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | set_field:@local.radio_group_final:@local.radio_group",
                  matchedExpression: "@local.radio_group_final",
                  type: "local",
                  fieldName: "radio_group_final",
                },
                {
                  fullExpression: "click | set_field:@local.radio_group_final:@local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | set_field:@local.radio_group_final:@local.radio_group",
                  matchedExpression: "@local.radio_group_final",
                  type: "local",
                  fieldName: "radio_group_final",
                },
                {
                  fullExpression: "click | set_field:@local.radio_group_final:@local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.radio_group_final": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
          "@local.radio_group": [
            "action_list.0.args.1",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "Field: @field.@local.radio_group_final",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Field: @field.@local.radio_group_final",
              matchedExpression: "@local.radio_group_final",
              type: "local",
              fieldName: "radio_group_final",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group_final": ["value"],
        },
      },
      {
        type: "button",
        name: "button_2",
        value: "Emit completed",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "emit",
            args: ["completed"],
            _raw: "click | emit:completed",
            _cleaned: "click | emit:completed",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_update_sibling.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_update_sibling_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "pair",
        value: "pair",
        rows: [
          {
            type: "nested_properties",
            name: "box_1",
            value: "example_radio_group",
            rows: [],
            _nested_name: "pair.box_1",
          },
          {
            type: "nested_properties",
            name: "box_2",
            value: "example_text_button",
            rows: [
              {
                name: "text",
                value:
                  "Condition evaluates as option 1.\n\nValue of field: @fields.radio_group_final_temp",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                condition: '@fields.radio_group_final_temp == "option_1"',
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "pair.box_2.text",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression:
                        "Condition evaluates as option 1.\n\nValue of field: @fields.radio_group_final_temp",
                      matchedExpression: "@fields.radio_group_final_temp",
                      type: "fields",
                      fieldName: "radio_group_final_temp",
                    },
                  ],
                  condition: [
                    {
                      fullExpression: '@fields.radio_group_final_temp == "option_1"',
                      matchedExpression: "@fields.radio_group_final_temp",
                      type: "fields",
                      fieldName: "radio_group_final_temp",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@fields.radio_group_final_temp": ["value", "condition"],
                },
              },
              {
                name: "text",
                value:
                  "Condition evaluates as option 2.\n\nValue of field: @fields.radio_group_final_temp",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                condition: '@fields.radio_group_final_temp == "option_2"',
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "pair.box_2.text",
                _dynamicFields: {
                  value: [
                    {
                      fullExpression:
                        "Condition evaluates as option 2.\n\nValue of field: @fields.radio_group_final_temp",
                      matchedExpression: "@fields.radio_group_final_temp",
                      type: "fields",
                      fieldName: "radio_group_final_temp",
                    },
                  ],
                  condition: [
                    {
                      fullExpression: '@fields.radio_group_final_temp == "option_2"',
                      matchedExpression: "@fields.radio_group_final_temp",
                      type: "fields",
                      fieldName: "radio_group_final_temp",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@fields.radio_group_final_temp": ["value", "condition"],
                },
              },
              {
                name: "button",
                value: "Emit uncompleted",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                action_list: [
                  {
                    trigger: "click",
                    action_id: "emit",
                    args: ["uncompleted"],
                    _raw: "click | emit:uncompleted",
                    _cleaned: "click | emit:uncompleted",
                  },
                ],
                exclude_from_translation: true,
                type: "set_variable",
                _nested_name: "pair.box_2.button",
              },
            ],
            _nested_name: "pair.box_2",
          },
        ],
        _nested_name: "pair",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_update_sibling.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_update_sibling_2_a",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "pair",
        value: "pair",
        rows: [
          {
            type: "nested_properties",
            name: "box_1",
            value: "example_radio_group",
            rows: [],
            _nested_name: "pair.box_1",
          },
          {
            type: "nested_properties",
            name: "box_2",
            value: "debug_update_sibling_2_b",
            rows: [],
            _nested_name: "pair.box_2",
          },
        ],
        _nested_name: "pair",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_update_sibling.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_update_sibling_2_b",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "example_text_button",
        value: "example_text_button",
        action_list: [
          {
            trigger: "uncompleted",
            action_id: "emit",
            args: ["uncompleted"],
            _raw: "uncompleted | emit:uncompleted",
            _cleaned: "uncompleted | emit:uncompleted",
          },
        ],
        rows: [
          {
            name: "local_var",
            value: "@fields.radio_group_final_temp",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_text_button.local_var",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@fields.radio_group_final_temp",
                  matchedExpression: "@fields.radio_group_final_temp",
                  type: "fields",
                  fieldName: "radio_group_final_temp",
                },
              ],
            },
            _dynamicDependencies: {
              "@fields.radio_group_final_temp": ["value"],
            },
          },
          {
            name: "text",
            value:
              "Condition evaluates as option 1.\n\nValue of field: @fields.radio_group_final_temp \nValue of local that follows field: @local.local_var",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: '@fields.radio_group_final_temp == "option_1"',
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_button.text",
            _dynamicFields: {
              value: [
                {
                  fullExpression:
                    "Condition evaluates as option 1.\n\nValue of field: @fields.radio_group_final_temp \nValue of local that follows field: @local.local_var",
                  matchedExpression: "@fields.radio_group_final_temp",
                  type: "fields",
                  fieldName: "radio_group_final_temp",
                },
                {
                  fullExpression:
                    "Condition evaluates as option 1.\n\nValue of field: @fields.radio_group_final_temp \nValue of local that follows field: @local.local_var",
                  matchedExpression: "@local.local_var",
                  type: "local",
                  fieldName: "local_var",
                },
              ],
              condition: [
                {
                  fullExpression: '@fields.radio_group_final_temp == "option_1"',
                  matchedExpression: "@fields.radio_group_final_temp",
                  type: "fields",
                  fieldName: "radio_group_final_temp",
                },
              ],
            },
            _dynamicDependencies: {
              "@fields.radio_group_final_temp": ["value", "condition"],
              "@local.local_var": ["value"],
            },
          },
          {
            name: "text",
            value:
              "Condition evaluates as option 2.\n\nValue of field: @fields.radio_group_final_temp \nValue of local that follows field: @local.local_var",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: '@fields.radio_group_final_temp == "option_2"',
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_button.text",
            _dynamicFields: {
              value: [
                {
                  fullExpression:
                    "Condition evaluates as option 2.\n\nValue of field: @fields.radio_group_final_temp \nValue of local that follows field: @local.local_var",
                  matchedExpression: "@fields.radio_group_final_temp",
                  type: "fields",
                  fieldName: "radio_group_final_temp",
                },
                {
                  fullExpression:
                    "Condition evaluates as option 2.\n\nValue of field: @fields.radio_group_final_temp \nValue of local that follows field: @local.local_var",
                  matchedExpression: "@local.local_var",
                  type: "local",
                  fieldName: "local_var",
                },
              ],
              condition: [
                {
                  fullExpression: '@fields.radio_group_final_temp == "option_2"',
                  matchedExpression: "@fields.radio_group_final_temp",
                  type: "fields",
                  fieldName: "radio_group_final_temp",
                },
              ],
            },
            _dynamicDependencies: {
              "@fields.radio_group_final_temp": ["value", "condition"],
              "@local.local_var": ["value"],
            },
          },
          {
            name: "button",
            value: "Emit uncompleted",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            action_list: [
              {
                trigger: "click",
                action_id: "emit",
                args: ["uncompleted"],
                _raw: "click | emit:uncompleted",
                _cleaned: "click | emit:uncompleted",
              },
            ],
            exclude_from_translation: true,
            type: "set_variable",
            _nested_name: "example_text_button.button",
          },
        ],
        _nested_name: "example_text_button",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_update_sibling.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_update_child_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "radio_group_final",
        value: "radio_group_final_temp",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        type: "set_variable",
        _nested_name: "radio_group_final",
      },
      {
        name: "answer_list",
        value: ["name:option_1 |  text: Option 1", "name: option_2 | text: Option 2"],
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        name: "options_per_row",
        value: 2,
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "options_per_row",
      },
      {
        type: "radio_group",
        name: "radio_group",
        parameter_list: {
          answer_list: "@local.answer_list",
          options_per_row: "@local.options_per_row",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
            options_per_row: [
              {
                fullExpression: "@local.options_per_row",
                matchedExpression: "@local.options_per_row",
                type: "local",
                fieldName: "options_per_row",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
          "@local.options_per_row": ["parameter_list.options_per_row"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "Local variable: @local.radio_group",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Local variable: @local.radio_group",
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["value"],
        },
      },
      {
        name: "show_first_template",
        value: '@local.radio_group == "option_1"',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "show_first_template",
        _dynamicFields: {
          value: [
            {
              fullExpression: '@local.radio_group == "option_1"',
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["value"],
        },
      },
      {
        type: "template",
        name: "example_text_button_1",
        value: "example_text_button",
        action_list: [
          {
            trigger: "completed",
            action_id: "pop_up",
            args: ["example_text_option_1"],
            _raw: "completed | pop_up : example_text_option_1",
            _cleaned: "completed | pop_up : example_text_option_1",
          },
        ],
        condition: "@local.show_first_template",
        rows: [
          {
            name: "text",
            value: "You selected option 1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_text_button_1.text",
          },
        ],
        _nested_name: "example_text_button_1",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "@local.show_first_template",
              matchedExpression: "@local.show_first_template",
              type: "local",
              fieldName: "show_first_template",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.show_first_template": ["condition"],
        },
      },
      {
        type: "template",
        name: "example_text_button_2",
        value: "example_text_button",
        action_list: [
          {
            trigger: "completed",
            action_id: "pop_up",
            args: ["example_text_option_2"],
            _raw: "completed | pop_up : example_text_option_2",
            _cleaned: "completed | pop_up : example_text_option_2",
          },
        ],
        condition: "!@local.show_first_template",
        rows: [
          {
            name: "text",
            value: "You selected option 2",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_text_button_2.text",
          },
        ],
        _nested_name: "example_text_button_2",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "!@local.show_first_template",
              matchedExpression: "!@local.show_first_template",
              type: "local",
              fieldName: "show_first_template",
            },
          ],
        },
        _dynamicDependencies: {
          "!@local.show_first_template": ["condition"],
        },
      },
      {
        type: "template",
        name: "example_text",
        value: "example_text",
        rows: [
          {
            name: "text",
            value: "Local variable: @local.radio_group",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_text.text",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "Local variable: @local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.radio_group": ["value"],
            },
          },
        ],
        _nested_name: "example_text",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_update_sibling.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_update_child_2_a",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "radio_group_final",
        value: "radio_group_final_temp",
        _translations: {
          value: {
            spa: false,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        type: "set_variable",
        _nested_name: "radio_group_final",
      },
      {
        name: "answer_list",
        value: ["name:option_1 |  text: Option 1", "name: option_2 | text: Option 2"],
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        name: "options_per_row",
        value: 2,
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "options_per_row",
      },
      {
        type: "radio_group",
        name: "radio_group",
        parameter_list: {
          answer_list: "@local.answer_list",
          options_per_row: "@local.options_per_row",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list",
                matchedExpression: "@local.answer_list",
                type: "local",
                fieldName: "answer_list",
              },
            ],
            options_per_row: [
              {
                fullExpression: "@local.options_per_row",
                matchedExpression: "@local.options_per_row",
                type: "local",
                fieldName: "options_per_row",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.answer_list": ["parameter_list.answer_list"],
          "@local.options_per_row": ["parameter_list.options_per_row"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "Local variable: @local.radio_group",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Local variable: @local.radio_group",
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["value"],
        },
      },
      {
        type: "template",
        name: "debug_update_child_2_b",
        value: "debug_update_child_2_b",
        rows: [
          {
            name: "show_first_template",
            value: '@local.radio_group == "option_1"',
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "debug_update_child_2_b.show_first_template",
            _dynamicFields: {
              value: [
                {
                  fullExpression: '@local.radio_group == "option_1"',
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.radio_group": ["value"],
            },
          },
        ],
        _nested_name: "debug_update_child_2_b",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_update_sibling.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_update_child_2_b",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        name: "show_first_template",
        value: true,
        type: "set_variable",
        _nested_name: "show_first_template",
      },
      {
        type: "template",
        name: "example_text_button_1",
        value: "example_text_button",
        action_list: [
          {
            trigger: "completed",
            action_id: "pop_up",
            args: ["example_text_option_1"],
            _raw: "completed | pop_up : example_text_option_1",
            _cleaned: "completed | pop_up : example_text_option_1",
          },
        ],
        condition: "@local.show_first_template",
        rows: [
          {
            name: "text",
            value: "You selected option 1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_text_button_1.text",
          },
        ],
        _nested_name: "example_text_button_1",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "@local.show_first_template",
              matchedExpression: "@local.show_first_template",
              type: "local",
              fieldName: "show_first_template",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.show_first_template": ["condition"],
        },
      },
      {
        type: "template",
        name: "example_text_button_2",
        value: "example_text_button",
        action_list: [
          {
            trigger: "completed",
            action_id: "pop_up",
            args: ["example_text_option_2"],
            _raw: "completed | pop_up : example_text_option_2",
            _cleaned: "completed | pop_up : example_text_option_2",
          },
        ],
        condition: "!@local.show_first_template",
        rows: [
          {
            name: "text",
            value: "You selected option 2",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_text_button_2.text",
          },
        ],
        _nested_name: "example_text_button_2",
        _dynamicFields: {
          condition: [
            {
              fullExpression: "!@local.show_first_template",
              matchedExpression: "!@local.show_first_template",
              type: "local",
              fieldName: "show_first_template",
            },
          ],
        },
        _dynamicDependencies: {
          "!@local.show_first_template": ["condition"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_update_sibling.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_text_option_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value: "You selected option 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_update_sibling.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_text_option_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "text",
        name: "text",
        value: "You selected option 2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_update_sibling.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_var_in_bulleted_list",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "List with last item global",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "text",
        name: "text_1",
        value: "- First item\n- @global.savings_option_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "- First item\n- @global.savings_option_2",
              matchedExpression: "@global.savings_option_2",
              type: "global",
              fieldName: "savings_option_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_2": ["value"],
        },
      },
      {
        type: "title",
        name: "title_2",
        value: "List with first item global",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_2",
      },
      {
        type: "text",
        name: "text_2",
        value: "- @global.savings_option_1\n- Second item",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "- @global.savings_option_1\n- Second item",
              matchedExpression: "@global.savings_option_1",
              type: "global",
              fieldName: "savings_option_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_1": ["value"],
        },
      },
      {
        type: "title",
        name: "title_3",
        value: "List with only global",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_3",
      },
      {
        type: "text",
        name: "text_3",
        value: '"- "+@global.savings_option_1\n"- "+@global.savings_option_2',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: '"- "+@global.savings_option_1\n"- "+@global.savings_option_2',
              matchedExpression: "@global.savings_option_1",
              type: "global",
              fieldName: "savings_option_1",
            },
            {
              fullExpression: '"- "+@global.savings_option_1\n"- "+@global.savings_option_2',
              matchedExpression: "@global.savings_option_2",
              type: "global",
              fieldName: "savings_option_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_1": ["value"],
          "@global.savings_option_2": ["value"],
        },
      },
      {
        type: "title",
        name: "title_4",
        value: "List with only global and a bit of text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_4",
      },
      {
        type: "text",
        name: "text_4",
        value:
          "This is a bit of text before the list\n- @global.savings_option_1\n- @global.savings_option_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "This is a bit of text before the list\n- @global.savings_option_1\n- @global.savings_option_2",
              matchedExpression: "@global.savings_option_1",
              type: "global",
              fieldName: "savings_option_1",
            },
            {
              fullExpression:
                "This is a bit of text before the list\n- @global.savings_option_1\n- @global.savings_option_2",
              matchedExpression: "@global.savings_option_2",
              type: "global",
              fieldName: "savings_option_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_1": ["value"],
          "@global.savings_option_2": ["value"],
        },
      },
      {
        type: "title",
        name: "title_5",
        value: "List with only global using *",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_5",
      },
      {
        type: "text",
        name: "text_5",
        value: "* @global.savings_option_1\n* @global.savings_option_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
        _dynamicFields: {
          value: [
            {
              fullExpression: "* @global.savings_option_1\n* @global.savings_option_2",
              matchedExpression: "@global.savings_option_1",
              type: "global",
              fieldName: "savings_option_1",
            },
            {
              fullExpression: "* @global.savings_option_1\n* @global.savings_option_2",
              matchedExpression: "@global.savings_option_2",
              type: "global",
              fieldName: "savings_option_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_1": ["value"],
          "@global.savings_option_2": ["value"],
        },
      },
      {
        type: "title",
        name: "title_6",
        value: "Ordered lists (hardcoded)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_6",
      },
      {
        type: "text",
        name: "text_6",
        value:
          "1. @global.savings_option_1\nsome text as a second line\n2. @global.savings_option_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_6",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "1. @global.savings_option_1\nsome text as a second line\n2. @global.savings_option_2",
              matchedExpression: "@global.savings_option_1",
              type: "global",
              fieldName: "savings_option_1",
            },
            {
              fullExpression:
                "1. @global.savings_option_1\nsome text as a second line\n2. @global.savings_option_2",
              matchedExpression: "@global.savings_option_2",
              type: "global",
              fieldName: "savings_option_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_1": ["value"],
          "@global.savings_option_2": ["value"],
        },
      },
      {
        type: "title",
        name: "title_7",
        value: "Ordered lists (automated)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_7",
      },
      {
        type: "text",
        name: "text_7",
        value: '"- "+@global.savings_option_1\n"- "+@global.savings_option_2',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        parameter_list: {
          style: "numbered",
        },
        exclude_from_translation: true,
        _nested_name: "text_7",
        _dynamicFields: {
          value: [
            {
              fullExpression: '"- "+@global.savings_option_1\n"- "+@global.savings_option_2',
              matchedExpression: "@global.savings_option_1",
              type: "global",
              fieldName: "savings_option_1",
            },
            {
              fullExpression: '"- "+@global.savings_option_1\n"- "+@global.savings_option_2',
              matchedExpression: "@global.savings_option_2",
              type: "global",
              fieldName: "savings_option_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_1": ["value"],
          "@global.savings_option_2": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_var_in_bulleted_list.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "debug_var_in_bulleted_list_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "List with last item global",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "text",
        name: "text_1",
        value: "* First item\n* @global.savings_option_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "* First item\n* @global.savings_option_2",
              matchedExpression: "@global.savings_option_2",
              type: "global",
              fieldName: "savings_option_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_2": ["value"],
        },
      },
      {
        type: "title",
        name: "title_2",
        value: "List with first item global",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_2",
      },
      {
        type: "text",
        name: "text_2",
        value: "* @global.savings_option_1\n* Second item",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "* @global.savings_option_1\n* Second item",
              matchedExpression: "@global.savings_option_1",
              type: "global",
              fieldName: "savings_option_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_1": ["value"],
        },
      },
      {
        type: "title",
        name: "title_4",
        value: "List with only global and a bit of text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_4",
      },
      {
        type: "text",
        name: "text_4",
        value:
          "This is a bit of text before the list\n* @global.savings_option_1\n* @global.savings_option_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_4",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "This is a bit of text before the list\n* @global.savings_option_1\n* @global.savings_option_2",
              matchedExpression: "@global.savings_option_1",
              type: "global",
              fieldName: "savings_option_1",
            },
            {
              fullExpression:
                "This is a bit of text before the list\n* @global.savings_option_1\n* @global.savings_option_2",
              matchedExpression: "@global.savings_option_2",
              type: "global",
              fieldName: "savings_option_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_1": ["value"],
          "@global.savings_option_2": ["value"],
        },
      },
      {
        type: "title",
        name: "title_5",
        value: "List with only global using *",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_5",
      },
      {
        type: "text",
        name: "text_5",
        value: "* @global.savings_option_1\n* @global.savings_option_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_5",
        _dynamicFields: {
          value: [
            {
              fullExpression: "* @global.savings_option_1\n* @global.savings_option_2",
              matchedExpression: "@global.savings_option_1",
              type: "global",
              fieldName: "savings_option_1",
            },
            {
              fullExpression: "* @global.savings_option_1\n* @global.savings_option_2",
              matchedExpression: "@global.savings_option_2",
              type: "global",
              fieldName: "savings_option_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_1": ["value"],
          "@global.savings_option_2": ["value"],
        },
      },
      {
        type: "title",
        name: "title_6",
        value: "Ordered lists (hardcoded)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "title_6",
      },
      {
        type: "text",
        name: "text_6",
        value: "1. @global.savings_option_1\n2. @global.savings_option_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_6",
        _dynamicFields: {
          value: [
            {
              fullExpression: "1. @global.savings_option_1\n2. @global.savings_option_2",
              matchedExpression: "@global.savings_option_1",
              type: "global",
              fieldName: "savings_option_1",
            },
            {
              fullExpression: "1. @global.savings_option_1\n2. @global.savings_option_2",
              matchedExpression: "@global.savings_option_2",
              type: "global",
              fieldName: "savings_option_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.savings_option_1": ["value"],
          "@global.savings_option_2": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_var_in_bulleted_list.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_calc",
    status: "released",
    rows: [
      {
        type: "title",
        name: "example_1",
        value: "Calc JS Functions",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_1",
      },
      {
        type: "set_variable",
        name: "example_calc_1",
        value: "@calc(Math.floor(Math.random()*7))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_calc_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(Math.floor(Math.random()*7))",
              matchedExpression: "@calc(Math.floor(Math.random()*7))",
              type: "calc",
              fieldName: "Math.floor(Math.random()*7)",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(Math.floor(Math.random()*7))": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "example_calc_2",
        value: "@local.example_calc_1 + 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_calc_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.example_calc_1 + 1",
              matchedExpression: "@local.example_calc_1",
              type: "local",
              fieldName: "example_calc_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.example_calc_1": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "example_calc_3",
        value: "@calc(Math.ceil(Math.random()*3))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        condition: "!@local.example_calc_3",
        _nested_name: "example_calc_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(Math.ceil(Math.random()*3))",
              matchedExpression: "@calc(Math.ceil(Math.random()*3))",
              type: "calc",
              fieldName: "Math.ceil(Math.random()*3)",
            },
          ],
          condition: [
            {
              fullExpression: "!@local.example_calc_3",
              matchedExpression: "!@local.example_calc_3",
              type: "local",
              fieldName: "example_calc_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(Math.ceil(Math.random()*3))": ["value"],
          "!@local.example_calc_3": ["condition"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value:
          "calc_1: @local.example_calc_1\ncalc_2: @local.example_calc_2\ncalc_3: @local.example_calc_3   (fixed)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "calc_1: @local.example_calc_1\ncalc_2: @local.example_calc_2\ncalc_3: @local.example_calc_3   (fixed)",
              matchedExpression: "@local.example_calc_1",
              type: "local",
              fieldName: "example_calc_1",
            },
            {
              fullExpression:
                "calc_1: @local.example_calc_1\ncalc_2: @local.example_calc_2\ncalc_3: @local.example_calc_3   (fixed)",
              matchedExpression: "@local.example_calc_2",
              type: "local",
              fieldName: "example_calc_2",
            },
            {
              fullExpression:
                "calc_1: @local.example_calc_1\ncalc_2: @local.example_calc_2\ncalc_3: @local.example_calc_3   (fixed)",
              matchedExpression: "@local.example_calc_3",
              type: "local",
              fieldName: "example_calc_3",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.example_calc_1": ["value"],
          "@local.example_calc_2": ["value"],
          "@local.example_calc_3": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "example_calc_max",
        value: "@calc(Math.max(@local.example_calc_1,@local.example_calc_2,@local.example_calc_3))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_calc_max",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "@calc(Math.max(@local.example_calc_1,@local.example_calc_2,@local.example_calc_3))",
              matchedExpression: "@local.example_calc_1",
              type: "local",
              fieldName: "example_calc_1",
            },
            {
              fullExpression:
                "@calc(Math.max(@local.example_calc_1,@local.example_calc_2,@local.example_calc_3))",
              matchedExpression: "@local.example_calc_2",
              type: "local",
              fieldName: "example_calc_2",
            },
            {
              fullExpression:
                "@calc(Math.max(@local.example_calc_1,@local.example_calc_2,@local.example_calc_3))",
              matchedExpression: "@local.example_calc_3",
              type: "local",
              fieldName: "example_calc_3",
            },
            {
              fullExpression:
                "@calc(Math.max(@local.example_calc_1,@local.example_calc_2,@local.example_calc_3))",
              matchedExpression:
                "@calc(Math.max(@local.example_calc_1,@local.example_calc_2,@local.example_calc_3))",
              type: "calc",
              fieldName:
                "Math.max(@local.example_calc_1,@local.example_calc_2,@local.example_calc_3)",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.example_calc_1": ["value"],
          "@local.example_calc_2": ["value"],
          "@local.example_calc_3": ["value"],
          "@calc(Math.max(@local.example_calc_1,@local.example_calc_2,@local.example_calc_3))": [
            "value",
          ],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "The largest number is: @local.example_calc_max",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "The largest number is: @local.example_calc_max",
              matchedExpression: "@local.example_calc_max",
              type: "local",
              fieldName: "example_calc_max",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.example_calc_max": ["value"],
        },
      },
      {
        type: "title",
        name: "example_2",
        value: "Calc Custom Functions",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_2",
      },
      {
        type: "subtitle",
        name: "example_2.1",
        value: "Calc Pick Random Array Item",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_2.1",
      },
      {
        type: "set_variable",
        name: "list_data",
        value: "@data.example_calc.example_1.value_list",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "list_data",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example_calc.example_1.value_list",
              matchedExpression: "@data.example_calc.example_1.value_list",
              type: "data",
              fieldName: "example_calc",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example_calc.example_1.value_list": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "random_item",
        value: "@calc(pick_random(@local.list_data))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "random_item",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(pick_random(@local.list_data))",
              matchedExpression: "@local.list_data",
              type: "local",
              fieldName: "list_data",
            },
            {
              fullExpression: "@calc(pick_random(@local.list_data))",
              matchedExpression: "@calc(pick_random(@local.list_data))",
              type: "calc",
              fieldName: "pick_random(@local.list_data)",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.list_data": ["value"],
          "@calc(pick_random(@local.list_data))": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "Random Item: @local.random_item.name",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Random Item: @local.random_item.name",
              matchedExpression: "@local.random_item.name",
              type: "local",
              fieldName: "random_item",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.random_item.name": ["value"],
        },
      },
      {
        type: "button",
        name: "button_1",
        value: "Randomise",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "emit",
            args: ["force_reprocess"],
            _raw: "click | emit:force_reprocess",
            _cleaned: "click | emit:force_reprocess",
          },
        ],
        _nested_name: "button_1",
      },
      {
        type: "subtitle",
        name: "example_2.2",
        value: "Calc Lookup Text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_2.2",
      },
      {
        type: "radio_group",
        name: "selected_item",
        action_list: [
          {
            trigger: "changed",
            action_id: "emit",
            args: ["force_reprocess"],
            _raw: "changed | emit:force_reprocess",
            _cleaned: "changed | emit:force_reprocess",
          },
        ],
        parameter_list: {
          answer_list: "@local.list_data",
        },
        _nested_name: "selected_item",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.list_data",
                matchedExpression: "@local.list_data",
                type: "local",
                fieldName: "list_data",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.list_data": ["parameter_list.answer_list"],
        },
      },
      {
        type: "set_variable",
        name: "selected_item_text",
        value: "@calc(lookup_answer_list(@local.list_data,@local.selected_item))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "selected_item_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(lookup_answer_list(@local.list_data,@local.selected_item))",
              matchedExpression: "@local.list_data",
              type: "local",
              fieldName: "list_data",
            },
            {
              fullExpression: "@calc(lookup_answer_list(@local.list_data,@local.selected_item))",
              matchedExpression: "@local.selected_item",
              type: "local",
              fieldName: "selected_item",
            },
            {
              fullExpression: "@calc(lookup_answer_list(@local.list_data,@local.selected_item))",
              matchedExpression: "@calc(lookup_answer_list(@local.list_data,@local.selected_item))",
              type: "calc",
              fieldName: "lookup_answer_list(@local.list_data,@local.selected_item)",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.list_data": ["value"],
          "@local.selected_item": ["value"],
          "@calc(lookup_answer_list(@local.list_data,@local.selected_item))": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2.2a",
        value: "Selected name: @local.selected_item",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        condition: "@local.selected_item",
        _nested_name: "text_2.2a",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Selected name: @local.selected_item",
              matchedExpression: "@local.selected_item",
              type: "local",
              fieldName: "selected_item",
            },
          ],
          condition: [
            {
              fullExpression: "@local.selected_item",
              matchedExpression: "@local.selected_item",
              type: "local",
              fieldName: "selected_item",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.selected_item": ["value", "condition"],
        },
      },
      {
        type: "text",
        name: "text_2.2b",
        value: "Selected text: @local.selected_item_text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        condition: "@local.selected_item",
        _nested_name: "text_2.2b",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Selected text: @local.selected_item_text",
              matchedExpression: "@local.selected_item_text",
              type: "local",
              fieldName: "selected_item_text",
            },
          ],
          condition: [
            {
              fullExpression: "@local.selected_item",
              matchedExpression: "@local.selected_item",
              type: "local",
              fieldName: "selected_item",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.selected_item_text": ["value"],
          "@local.selected_item": ["condition"],
        },
      },
      {
        type: "title",
        name: "example_3",
        value: "Calc Date Utilities",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_3",
      },
      {
        type: "set_variable",
        name: "date_now",
        value: "@calc(now())",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "date_now",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(now())",
              matchedExpression: "@calc(now())",
              type: "calc",
              fieldName: "now()",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(now())": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3.1a",
        value: "Today is @local.date_now",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_3.1a",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Today is @local.date_now",
              matchedExpression: "@local.date_now",
              type: "local",
              fieldName: "date_now",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.date_now": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "timestamp",
        value: "@calc(timestamp())",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "timestamp",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(timestamp())",
              matchedExpression: "@calc(timestamp())",
              type: "calc",
              fieldName: "timestamp()",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(timestamp())": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3.1b",
        value: "This is a db-friendly timestamp: @local.timestamp",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_3.1b",
        _dynamicFields: {
          value: [
            {
              fullExpression: "This is a db-friendly timestamp: @local.timestamp",
              matchedExpression: "@local.timestamp",
              type: "local",
              fieldName: "timestamp",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.timestamp": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "date_formatted",
        value: '@calc(window.date_fns.format(now(),"dd MMM yyyy"))',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "date_formatted",
        _dynamicFields: {
          value: [
            {
              fullExpression: '@calc(window.date_fns.format(now(),"dd MMM yyyy"))',
              matchedExpression: '@calc(window.date_fns.format(now(),"dd MMM yyyy"))',
              type: "calc",
              fieldName: 'window.date_fns.format(now(),"dd MMM yyyy")',
            },
          ],
        },
        _dynamicDependencies: {
          '@calc(window.date_fns.format(now(),"dd MMM yyyy"))': ["value"],
        },
      },
      {
        type: "text",
        name: "text_3.1c",
        value: "Formatted: @local.date_formatted",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_3.1c",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Formatted: @local.date_formatted",
              matchedExpression: "@local.date_formatted",
              type: "local",
              fieldName: "date_formatted",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.date_formatted": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "start_of_week",
        value: "@calc(window.date_fns.startOfWeek(now(),{ weekStartsOn: 1 }))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "start_of_week",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(window.date_fns.startOfWeek(now(),{ weekStartsOn: 1 }))",
              matchedExpression: "@calc(window.date_fns.startOfWeek(now(),{ weekStartsOn: 1 }))",
              type: "calc",
              fieldName: "window.date_fns.startOfWeek(now(),{ weekStartsOn: 1 })",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(window.date_fns.startOfWeek(now(),{ weekStartsOn: 1 }))": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "start_of_week_text",
        value: "The week started on @local.start_of_week",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "start_of_week_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "The week started on @local.start_of_week",
              matchedExpression: "@local.start_of_week",
              type: "local",
              fieldName: "start_of_week",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.start_of_week": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "days_to_xmas",
        value: '@calc(window.date_fns.differenceInDays(new Date("2021-12-25"),now()))',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "days_to_xmas",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                '@calc(window.date_fns.differenceInDays(new Date("2021-12-25"),now()))',
              matchedExpression:
                '@calc(window.date_fns.differenceInDays(new Date("2021-12-25"),now()))',
              type: "calc",
              fieldName: 'window.date_fns.differenceInDays(new Date("2021-12-25"),now())',
            },
          ],
        },
        _dynamicDependencies: {
          '@calc(window.date_fns.differenceInDays(new Date("2021-12-25"),now()))': ["value"],
        },
      },
      {
        type: "text",
        name: "text_3.2",
        value: "There are @local.days_to_xmas days to Christmas (2021)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_3.2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "There are @local.days_to_xmas days to Christmas (2021)",
              matchedExpression: "@local.days_to_xmas",
              type: "local",
              fieldName: "days_to_xmas",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.days_to_xmas": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "last_xmas_words",
        value:
          '@calc(window.date_fns.formatDistance(new Date("2020-12-25"),now(),{ addSuffix: true }))',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "last_xmas_words",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                '@calc(window.date_fns.formatDistance(new Date("2020-12-25"),now(),{ addSuffix: true }))',
              matchedExpression:
                '@calc(window.date_fns.formatDistance(new Date("2020-12-25"),now(),{ addSuffix: true }))',
              type: "calc",
              fieldName:
                'window.date_fns.formatDistance(new Date("2020-12-25"),now(),{ addSuffix: true })',
            },
          ],
        },
        _dynamicDependencies: {
          '@calc(window.date_fns.formatDistance(new Date("2020-12-25"),now(),{ addSuffix: true }))':
            ["value"],
        },
      },
      {
        type: "text",
        name: "text_3.3",
        value: "The last christmas was @local.last_xmas_words",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_3.3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "The last christmas was @local.last_xmas_words",
              matchedExpression: "@local.last_xmas_words",
              type: "local",
              fieldName: "last_xmas_words",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.last_xmas_words": ["value"],
        },
      },
      {
        type: "title",
        name: "example_4",
        value: "Calc Context Variables",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_4",
      },
      {
        name: "app_day",
        value: "@calc(this.app_day)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "app_day",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(this.app_day)",
              matchedExpression: "@calc(this.app_day)",
              type: "calc",
              fieldName: "this.app_day",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(this.app_day)": ["value"],
        },
      },
      {
        name: "app_first_launch",
        value: "@calc(this.app_first_launch)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "app_first_launch",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(this.app_first_launch)",
              matchedExpression: "@calc(this.app_first_launch)",
              type: "calc",
              fieldName: "this.app_first_launch",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(this.app_first_launch)": ["value"],
        },
      },
      {
        name: "app_user_id",
        value: "@calc(this.app_user_id)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "app_user_id",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(this.app_user_id)",
              matchedExpression: "@calc(this.app_user_id)",
              type: "calc",
              fieldName: "this.app_user_id",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(this.app_user_id)": ["value"],
        },
      },
      {
        name: "device_os",
        value: "@calc(this.device_info.operatingSystem)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "device_os",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(this.device_info.operatingSystem)",
              matchedExpression: "@calc(this.device_info.operatingSystem)",
              type: "calc",
              fieldName: "this.device_info.operatingSystem",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(this.device_info.operatingSystem)": ["value"],
        },
      },
      {
        type: "text",
        name: "text_4.1",
        value: "The current app day is @local.app_day",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_4.1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "The current app day is @local.app_day",
              matchedExpression: "@local.app_day",
              type: "local",
              fieldName: "app_day",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.app_day": ["value"],
        },
      },
      {
        type: "text",
        name: "text_4.2",
        value: "The app was first launched on @local.app_first_launch",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_4.2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "The app was first launched on @local.app_first_launch",
              matchedExpression: "@local.app_first_launch",
              type: "local",
              fieldName: "app_first_launch",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.app_first_launch": ["value"],
        },
      },
      {
        type: "text",
        name: "text_4.3",
        value: "The current user id is @local.app_user_id",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_4.3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "The current user id is @local.app_user_id",
              matchedExpression: "@local.app_user_id",
              type: "local",
              fieldName: "app_user_id",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.app_user_id": ["value"],
        },
      },
      {
        type: "text",
        name: "text_4.4",
        value: "The device OS is @local.device_os",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_4.4",
        _dynamicFields: {
          value: [
            {
              fullExpression: "The device OS is @local.device_os",
              matchedExpression: "@local.device_os",
              type: "local",
              fieldName: "device_os",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.device_os": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_calc.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_calc_date",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "Today",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "title_1",
      },
      {
        type: "text",
        name: "text_1",
        value: "Today is @fields.current_date",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Today is @fields.current_date",
              matchedExpression: "@fields.current_date",
              type: "fields",
              fieldName: "current_date",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.current_date": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "date",
        value: "@calc(Date())",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "date",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(Date())",
              matchedExpression: "@calc(Date())",
              type: "calc",
              fieldName: "Date()",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(Date())": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "Today is @local.date",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Today is @local.date",
              matchedExpression: "@local.date",
              type: "local",
              fieldName: "date",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.date": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "day",
        value: "@calc((new Date()).getDay())",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "day",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc((new Date()).getDay())",
              matchedExpression: "@calc((new Date()).getDay())",
              type: "calc",
              fieldName: "(new Date()).getDay()",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc((new Date()).getDay())": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "Today is @local.day",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Today is @local.day",
              matchedExpression: "@local.day",
              type: "local",
              fieldName: "day",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.day": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "christmas",
        value: "@calc(new Date(2021,12, 25))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "christmas",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(new Date(2021,12, 25))",
              matchedExpression: "@calc(new Date(2021,12, 25))",
              type: "calc",
              fieldName: "new Date(2021,12, 25)",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(new Date(2021,12, 25))": ["value"],
        },
      },
      {
        type: "text",
        name: "text_4",
        value: "Christmas is @local.christmas",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_4",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Christmas is @local.christmas",
              matchedExpression: "@local.christmas",
              type: "local",
              fieldName: "christmas",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.christmas": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "christmas_time",
        value: "@calc((new Date(2021,12, 25)).getTime())",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "christmas_time",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc((new Date(2021,12, 25)).getTime())",
              matchedExpression: "@calc((new Date(2021,12, 25)).getTime())",
              type: "calc",
              fieldName: "(new Date(2021,12, 25)).getTime()",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc((new Date(2021,12, 25)).getTime())": ["value"],
        },
      },
      {
        type: "text",
        name: "text_5",
        value: "Christmas time is @local.christmas_time",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_5",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Christmas time is @local.christmas_time",
              matchedExpression: "@local.christmas_time",
              type: "local",
              fieldName: "christmas_time",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.christmas_time": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "days_to_christmas",
        value: "@calc( (@local.christmas_time - (new Date()).getTime())  / (1000 * 3600 * 24) )",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "days_to_christmas",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "@calc( (@local.christmas_time - (new Date()).getTime())  / (1000 * 3600 * 24) )",
              matchedExpression: "@local.christmas_time",
              type: "local",
              fieldName: "christmas_time",
            },
            {
              fullExpression:
                "@calc( (@local.christmas_time - (new Date()).getTime())  / (1000 * 3600 * 24) )",
              matchedExpression:
                "@calc( (@local.christmas_time - (new Date()).getTime())  / (1000 * 3600 * 24) )",
              type: "calc",
              fieldName: " (@local.christmas_time - (new Date()).getTime())  / (1000 * 3600 * 24) ",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.christmas_time": ["value"],
          "@calc( (@local.christmas_time - (new Date()).getTime())  / (1000 * 3600 * 24) )": [
            "value",
          ],
        },
      },
      {
        type: "text",
        name: "text_6",
        value: "Christmas is in @local.days_to_christmas days",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_6",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Christmas is in @local.days_to_christmas days",
              matchedExpression: "@local.days_to_christmas",
              type: "local",
              fieldName: "days_to_christmas",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.days_to_christmas": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "midnight",
        value: "@calc((new Date()).setHours(0,0,0,0))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "midnight",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc((new Date()).setHours(0,0,0,0))",
              matchedExpression: "@calc((new Date()).setHours(0,0,0,0))",
              type: "calc",
              fieldName: "(new Date()).setHours(0,0,0,0)",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc((new Date()).setHours(0,0,0,0))": ["value"],
        },
      },
      {
        type: "text",
        name: "text_7",
        value: "Midnight was at @local.midnight",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_7",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Midnight was at @local.midnight",
              matchedExpression: "@local.midnight",
              type: "local",
              fieldName: "midnight",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.midnight": ["value"],
        },
      },
      {
        type: "set_variable",
        name: "midnight_time",
        value: "@calc(((new Date()).setHours(0,0,0,0)))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "midnight_time",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(((new Date()).setHours(0,0,0,0)))",
              matchedExpression: "@calc(((new Date()).setHours(0,0,0,0)))",
              type: "calc",
              fieldName: "((new Date()).setHours(0,0,0,0))",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(((new Date()).setHours(0,0,0,0)))": ["value"],
        },
      },
      {
        type: "text",
        name: "text_8",
        value: "Midnight time was @local.midnight_time",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_8",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Midnight time was @local.midnight_time",
              matchedExpression: "@local.midnight_time",
              type: "local",
              fieldName: "midnight_time",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.midnight_time": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_calc.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_calc_2",
    status: "released",
    rows: [
      {
        name: "app_first_launch",
        value: "@calc(this.app_first_launch)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "app_first_launch",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(this.app_first_launch)",
              matchedExpression: "@calc(this.app_first_launch)",
              type: "calc",
              fieldName: "this.app_first_launch",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(this.app_first_launch)": ["value"],
        },
      },
      {
        type: "text",
        name: "app_first_launch_text",
        value: "app_first_launch: @local.app_first_launch",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "app_first_launch_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "app_first_launch: @local.app_first_launch",
              matchedExpression: "@local.app_first_launch",
              type: "local",
              fieldName: "app_first_launch",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.app_first_launch": ["value"],
        },
      },
      {
        type: "set_field",
        name: "workshop_start_day",
        value: "@calc(window.date_fns.getDay(new Date(this.app_first_launch)))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "workshop_start_day",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(window.date_fns.getDay(new Date(this.app_first_launch)))",
              matchedExpression: "@calc(window.date_fns.getDay(new Date(this.app_first_launch)))",
              type: "calc",
              fieldName: "window.date_fns.getDay(new Date(this.app_first_launch))",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(window.date_fns.getDay(new Date(this.app_first_launch)))": ["value"],
        },
      },
      {
        type: "text",
        name: "workshop_start_day_text",
        value: "workshop_start_day: @fields.workshop_start_day",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "workshop_start_day_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "workshop_start_day: @fields.workshop_start_day",
              matchedExpression: "@fields.workshop_start_day",
              type: "fields",
              fieldName: "workshop_start_day",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.workshop_start_day": ["value"],
        },
      },
      {
        type: "set_field",
        name: "workshop_start_day_label",
        value: "@calc(window.date_fns.format(new Date(@local.app_first_launch), 'EEEE'))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "workshop_start_day_label",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "@calc(window.date_fns.format(new Date(@local.app_first_launch), 'EEEE'))",
              matchedExpression: "@local.app_first_launch",
              type: "local",
              fieldName: "app_first_launch",
            },
            {
              fullExpression:
                "@calc(window.date_fns.format(new Date(@local.app_first_launch), 'EEEE'))",
              matchedExpression:
                "@calc(window.date_fns.format(new Date(@local.app_first_launch), 'EEEE'))",
              type: "calc",
              fieldName: "window.date_fns.format(new Date(@local.app_first_launch), 'EEEE')",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.app_first_launch": ["value"],
          "@calc(window.date_fns.format(new Date(@local.app_first_launch), 'EEEE'))": ["value"],
        },
      },
      {
        type: "text",
        name: "workshop_start_day_label_text",
        value: "workshop_start_day_label: @fields.workshop_start_day_label",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "workshop_start_day_label_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "workshop_start_day_label: @fields.workshop_start_day_label",
              matchedExpression: "@fields.workshop_start_day_label",
              type: "fields",
              fieldName: "workshop_start_day_label",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.workshop_start_day_label": ["value"],
        },
      },
      {
        name: "today_end",
        value: "@calc(window.date_fns.endOfDay(new Date()))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "today_end",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@calc(window.date_fns.endOfDay(new Date()))",
              matchedExpression: "@calc(window.date_fns.endOfDay(new Date()))",
              type: "calc",
              fieldName: "window.date_fns.endOfDay(new Date())",
            },
          ],
        },
        _dynamicDependencies: {
          "@calc(window.date_fns.endOfDay(new Date()))": ["value"],
        },
      },
      {
        name: "days_since_app_first_launch",
        value:
          "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@local.app_first_launch)))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "days_since_app_first_launch",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@local.app_first_launch)))",
              matchedExpression: "@local.today_end",
              type: "local",
              fieldName: "today_end",
            },
            {
              fullExpression:
                "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@local.app_first_launch)))",
              matchedExpression: "@local.app_first_launch",
              type: "local",
              fieldName: "app_first_launch",
            },
            {
              fullExpression:
                "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@local.app_first_launch)))",
              matchedExpression:
                "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@local.app_first_launch)))",
              type: "calc",
              fieldName:
                "window.date_fns.differenceInDays(@local.today_end, new Date(@local.app_first_launch))",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.today_end": ["value"],
          "@local.app_first_launch": ["value"],
          "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@local.app_first_launch)))":
            ["value"],
        },
      },
      {
        type: "text",
        name: "days_since_app_first_launch_text",
        value: "days_since_app_first_launch: @local.days_since_app_first_launch",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "days_since_app_first_launch_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "days_since_app_first_launch: @local.days_since_app_first_launch",
              matchedExpression: "@local.days_since_app_first_launch",
              type: "local",
              fieldName: "days_since_app_first_launch",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.days_since_app_first_launch": ["value"],
        },
      },
      {
        type: "set_field",
        name: "benchmark_date",
        value: "@local.app_first_launch",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "benchmark_date",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.app_first_launch",
              matchedExpression: "@local.app_first_launch",
              type: "local",
              fieldName: "app_first_launch",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.app_first_launch": ["value"],
        },
      },
      {
        type: "text",
        name: "benchmark_date_text",
        value: "benchmark_date: @fields.benchmark_date",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "benchmark_date_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "benchmark_date: @fields.benchmark_date",
              matchedExpression: "@fields.benchmark_date",
              type: "fields",
              fieldName: "benchmark_date",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.benchmark_date": ["value"],
        },
      },
      {
        type: "set_field",
        name: "benchmark_workshop_number",
        value: 1,
        _nested_name: "benchmark_workshop_number",
      },
      {
        type: "text",
        name: "benchmark_workshop_number_text",
        value: "benchmark_workshop_number: @fields.benchmark_workshop_number",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "benchmark_workshop_number_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "benchmark_workshop_number: @fields.benchmark_workshop_number",
              matchedExpression: "@fields.benchmark_workshop_number",
              type: "fields",
              fieldName: "benchmark_workshop_number",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.benchmark_workshop_number": ["value"],
        },
      },
      {
        type: "set_field",
        name: "benchmark_day",
        value:
          "@calc( (window.date_fns.getDay(new Date(@fields.benchmark_date)) - @fields.workshop_start_day +7) % 7)",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "benchmark_day",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "@calc( (window.date_fns.getDay(new Date(@fields.benchmark_date)) - @fields.workshop_start_day +7) % 7)",
              matchedExpression: "@fields.benchmark_date",
              type: "fields",
              fieldName: "benchmark_date",
            },
            {
              fullExpression:
                "@calc( (window.date_fns.getDay(new Date(@fields.benchmark_date)) - @fields.workshop_start_day +7) % 7)",
              matchedExpression: "@fields.workshop_start_day",
              type: "fields",
              fieldName: "workshop_start_day",
            },
            {
              fullExpression:
                "@calc( (window.date_fns.getDay(new Date(@fields.benchmark_date)) - @fields.workshop_start_day +7) % 7)",
              matchedExpression:
                "@calc( (window.date_fns.getDay(new Date(@fields.benchmark_date)) - @fields.workshop_start_day +7) % 7)",
              type: "calc",
              fieldName:
                " (window.date_fns.getDay(new Date(@fields.benchmark_date)) - @fields.workshop_start_day +7) % 7",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.benchmark_date": ["value"],
          "@fields.workshop_start_day": ["value"],
          "@calc( (window.date_fns.getDay(new Date(@fields.benchmark_date)) - @fields.workshop_start_day +7) % 7)":
            ["value"],
        },
      },
      {
        type: "text",
        name: "benchmark_day_text",
        value: "benchmark_day: @fields.benchmark_day",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "benchmark_day_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "benchmark_day: @fields.benchmark_day",
              matchedExpression: "@fields.benchmark_day",
              type: "fields",
              fieldName: "benchmark_day",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.benchmark_day": ["value"],
        },
      },
      {
        name: "days_since_benchmark_date",
        value:
          "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@fields.benchmark_date)))",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "days_since_benchmark_date",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@fields.benchmark_date)))",
              matchedExpression: "@local.today_end",
              type: "local",
              fieldName: "today_end",
            },
            {
              fullExpression:
                "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@fields.benchmark_date)))",
              matchedExpression: "@fields.benchmark_date",
              type: "fields",
              fieldName: "benchmark_date",
            },
            {
              fullExpression:
                "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@fields.benchmark_date)))",
              matchedExpression:
                "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@fields.benchmark_date)))",
              type: "calc",
              fieldName:
                "window.date_fns.differenceInDays(@local.today_end, new Date(@fields.benchmark_date))",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.today_end": ["value"],
          "@fields.benchmark_date": ["value"],
          "@calc(window.date_fns.differenceInDays(@local.today_end, new Date(@fields.benchmark_date)))":
            ["value"],
        },
      },
      {
        type: "text",
        name: "days_since_benchmark_date_text",
        value: "days_since_benchmark_date: @local.days_since_benchmark_date",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "days_since_benchmark_date_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "days_since_benchmark_date: @local.days_since_benchmark_date",
              matchedExpression: "@local.days_since_benchmark_date",
              type: "local",
              fieldName: "days_since_benchmark_date",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.days_since_benchmark_date": ["value"],
        },
      },
      {
        type: "set_field",
        name: "workshop_number",
        value:
          "@calc( +@fields.benchmark_workshop_number + Math.floor((@local.days_since_benchmark_date + +@fields.benchmark_day)/7) )",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "workshop_number",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "@calc( +@fields.benchmark_workshop_number + Math.floor((@local.days_since_benchmark_date + +@fields.benchmark_day)/7) )",
              matchedExpression: "@fields.benchmark_workshop_number",
              type: "fields",
              fieldName: "benchmark_workshop_number",
            },
            {
              fullExpression:
                "@calc( +@fields.benchmark_workshop_number + Math.floor((@local.days_since_benchmark_date + +@fields.benchmark_day)/7) )",
              matchedExpression: "@local.days_since_benchmark_date",
              type: "local",
              fieldName: "days_since_benchmark_date",
            },
            {
              fullExpression:
                "@calc( +@fields.benchmark_workshop_number + Math.floor((@local.days_since_benchmark_date + +@fields.benchmark_day)/7) )",
              matchedExpression: "@fields.benchmark_day",
              type: "fields",
              fieldName: "benchmark_day",
            },
            {
              fullExpression:
                "@calc( +@fields.benchmark_workshop_number + Math.floor((@local.days_since_benchmark_date + +@fields.benchmark_day)/7) )",
              matchedExpression:
                "@calc( +@fields.benchmark_workshop_number + Math.floor((@local.days_since_benchmark_date + +@fields.benchmark_day)/7) )",
              type: "calc",
              fieldName:
                " +@fields.benchmark_workshop_number + Math.floor((@local.days_since_benchmark_date + +@fields.benchmark_day)/7) ",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.benchmark_workshop_number": ["value"],
          "@local.days_since_benchmark_date": ["value"],
          "@fields.benchmark_day": ["value"],
          "@calc( +@fields.benchmark_workshop_number + Math.floor((@local.days_since_benchmark_date + +@fields.benchmark_day)/7) )":
            ["value"],
        },
      },
      {
        type: "text",
        name: "workshop_number_text",
        value: "workshop_number: @fields.workshop_number",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "workshop_number_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "workshop_number: @fields.workshop_number",
              matchedExpression: "@fields.workshop_number",
              type: "fields",
              fieldName: "workshop_number",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.workshop_number": ["value"],
        },
      },
      {
        type: "set_field",
        name: "workshop_day",
        value:
          "@calc( (window.date_fns.getDay(@local.today_end) - @fields.workshop_start_day + 7) % 7 )",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "workshop_day",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "@calc( (window.date_fns.getDay(@local.today_end) - @fields.workshop_start_day + 7) % 7 )",
              matchedExpression: "@local.today_end",
              type: "local",
              fieldName: "today_end",
            },
            {
              fullExpression:
                "@calc( (window.date_fns.getDay(@local.today_end) - @fields.workshop_start_day + 7) % 7 )",
              matchedExpression: "@fields.workshop_start_day",
              type: "fields",
              fieldName: "workshop_start_day",
            },
            {
              fullExpression:
                "@calc( (window.date_fns.getDay(@local.today_end) - @fields.workshop_start_day + 7) % 7 )",
              matchedExpression:
                "@calc( (window.date_fns.getDay(@local.today_end) - @fields.workshop_start_day + 7) % 7 )",
              type: "calc",
              fieldName:
                " (window.date_fns.getDay(@local.today_end) - @fields.workshop_start_day + 7) % 7 ",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.today_end": ["value"],
          "@fields.workshop_start_day": ["value"],
          "@calc( (window.date_fns.getDay(@local.today_end) - @fields.workshop_start_day + 7) % 7 )":
            ["value"],
        },
      },
      {
        type: "text",
        name: "workshop_day_text",
        value: "workshop_day: @fields.workshop_day",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "workshop_day_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "workshop_day: @fields.workshop_day",
              matchedExpression: "@fields.workshop_day",
              type: "fields",
              fieldName: "workshop_day",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.workshop_day": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_calc.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_calc_3",
    status: "released",
    rows: [
      {
        name: "disabled",
        value: "_disabled",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "disabled",
      },
      {
        name: "workshop_number",
        value: "+@fields.workshop_number",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "workshop_number",
        _dynamicFields: {
          value: [
            {
              fullExpression: "+@fields.workshop_number",
              matchedExpression: "@fields.workshop_number",
              type: "fields",
              fieldName: "workshop_number",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.workshop_number": ["value"],
        },
      },
      {
        type: "items",
        value: "@data.workshop",
        rows: [
          {
            type: "set_field",
            name: "@item.id@local.disabled",
            value: false,
            condition: "@calc(@item.number <= @local.workshop_number)",
            _nested_name: "items.@item.id@local.disabled",
            _dynamicFields: {
              name: [
                {
                  fullExpression: "@item.id@local.disabled",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
                {
                  fullExpression: "@item.id@local.disabled",
                  matchedExpression: "@local.disabled",
                  type: "local",
                  fieldName: "disabled",
                },
              ],
              condition: [
                {
                  fullExpression: "@calc(@item.number <= @local.workshop_number)",
                  matchedExpression: "@item.number",
                  type: "item",
                  fieldName: "number",
                },
                {
                  fullExpression: "@calc(@item.number <= @local.workshop_number)",
                  matchedExpression: "@local.workshop_number",
                  type: "local",
                  fieldName: "workshop_number",
                },
                {
                  fullExpression: "@calc(@item.number <= @local.workshop_number)",
                  matchedExpression: "@calc(@item.number <= @local.workshop_number)",
                  type: "calc",
                  fieldName: "@item.number <= @local.workshop_number",
                },
              ],
              _nested_name: [
                {
                  fullExpression: "items.@item.id@local.disabled",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
                {
                  fullExpression: "items.@item.id@local.disabled",
                  matchedExpression: "@local.disabled",
                  type: "local",
                  fieldName: "disabled",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.id": ["name", "_nested_name"],
              "@local.disabled": ["name", "_nested_name"],
              "@item.number": ["condition"],
              "@local.workshop_number": ["condition"],
              "@calc(@item.number <= @local.workshop_number)": ["condition"],
            },
          },
        ],
        name: "items",
        _nested_name: "items",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.workshop",
              matchedExpression: "@data.workshop",
              type: "data",
              fieldName: "workshop",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.workshop": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_calc.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_data_template",
    status: "released",
    rows: [
      {
        type: "text",
        name: "text_1",
        value: "@data.example.example1.value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example.example1.value",
              matchedExpression: "@data.example.example1.value",
              type: "data",
              fieldName: "example",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example.example1.value": ["value"],
        },
      },
      {
        type: "text",
        name: "broken_1",
        value: "@data.example.example1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "broken_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example.example1",
              matchedExpression: "@data.example.example1",
              type: "data",
              fieldName: "example",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example.example1": ["value"],
        },
      },
      {
        type: "radio_group",
        name: "radio_group_1",
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@data.example.example3.value_list",
        },
        _nested_name: "radio_group_1",
        _dynamicFields: {
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@data.example.example3.value_list",
                matchedExpression: "@data.example.example3.value_list",
                type: "data",
                fieldName: "example",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@data.example.example3.value_list": ["parameter_list.answer_list"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_data_lists.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_data_from_id",
    status: "released",
    rows: [
      {
        name: "data_item_id",
        value: "@data.example.example1.id",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "data_item_id",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example.example1.id",
              matchedExpression: "@data.example.example1.id",
              type: "data",
              fieldName: "example",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example.example1.id": ["value"],
        },
      },
      {
        name: "example",
        value: "example.@local.data_item_id",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "example",
        _dynamicFields: {
          value: [
            {
              fullExpression: "example.@local.data_item_id",
              matchedExpression: "@local.data_item_id",
              type: "local",
              fieldName: "data_item_id",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.data_item_id": ["value"],
        },
      },
      {
        name: "data_item",
        value: "@data.@local.example",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "data_item",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.@local.example",
              matchedExpression: "@local.example",
              type: "local",
              fieldName: "example",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.example": ["value"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "id: @local.data_item_id\nwhich is the same as\nid: @local.data_item.id",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "id: @local.data_item_id\nwhich is the same as\nid: @local.data_item.id",
              matchedExpression: "@local.data_item_id",
              type: "local",
              fieldName: "data_item_id",
            },
            {
              fullExpression:
                "id: @local.data_item_id\nwhich is the same as\nid: @local.data_item.id",
              matchedExpression: "@local.data_item.id",
              type: "local",
              fieldName: "data_item",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.data_item_id": ["value"],
          "@local.data_item.id": ["value"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value: "value: @local.data_item.value",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "value: @local.data_item.value",
              matchedExpression: "@local.data_item.value",
              type: "local",
              fieldName: "data_item",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.data_item.value": ["value"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value: "text: @local.data_item.text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression: "text: @local.data_item.text",
              matchedExpression: "@local.data_item.text",
              type: "local",
              fieldName: "data_item",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.data_item.text": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_data_lists.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_items",
    status: "released",
    rows: [
      {
        type: "title",
        name: "basic_example",
        value: "Basic Example",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "basic_example",
      },
      {
        type: "items",
        value: "@data.example_items",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "item_text_1_@item.id",
            value: "@item.id",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "items.item_text_1_@item.id",
            _dynamicFields: {
              name: [
                {
                  fullExpression: "item_text_1_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              value: [
                {
                  fullExpression: "@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              _nested_name: [
                {
                  fullExpression: "items.item_text_1_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.id": ["name", "value", "_nested_name"],
            },
          },
          {
            type: "text",
            name: "item_text_2_@item.id",
            value: "@item.name",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "items.item_text_2_@item.id",
            _dynamicFields: {
              name: [
                {
                  fullExpression: "item_text_2_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              value: [
                {
                  fullExpression: "@item.name",
                  matchedExpression: "@item.name",
                  type: "item",
                  fieldName: "name",
                },
              ],
              _nested_name: [
                {
                  fullExpression: "items.item_text_2_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.id": ["name", "_nested_name"],
              "@item.name": ["value"],
            },
          },
          {
            type: "text",
            name: "item_text_3_@item.id",
            value: "+@item._index+1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "items.item_text_3_@item.id",
            _dynamicFields: {
              name: [
                {
                  fullExpression: "item_text_3_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              value: [
                {
                  fullExpression: "+@item._index+1",
                  matchedExpression: "@item._index",
                  type: "item",
                  fieldName: "_index",
                },
              ],
              _nested_name: [
                {
                  fullExpression: "items.item_text_3_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.id": ["name", "_nested_name"],
              "@item._index": ["value"],
            },
          },
        ],
        name: "items",
        _nested_name: "items",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example_items",
              matchedExpression: "@data.example_items",
              type: "data",
              fieldName: "example_items",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example_items": ["value"],
        },
      },
      {
        type: "title",
        name: "title",
        value: "Setting conditional variables",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "title",
      },
      {
        type: "items",
        value: "@data.example_items",
        rows: [
          {
            type: "set_field",
            name: "example_items_field_@item.id",
            value: "@item.field_value",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            condition: "@item.field_value > 2",
            _nested_name: "items.example_items_field_@item.id",
            _dynamicFields: {
              name: [
                {
                  fullExpression: "example_items_field_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              value: [
                {
                  fullExpression: "@item.field_value",
                  matchedExpression: "@item.field_value",
                  type: "item",
                  fieldName: "field_value",
                },
              ],
              condition: [
                {
                  fullExpression: "@item.field_value > 2",
                  matchedExpression: "@item.field_value",
                  type: "item",
                  fieldName: "field_value",
                },
              ],
              _nested_name: [
                {
                  fullExpression: "items.example_items_field_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.id": ["name", "_nested_name"],
              "@item.field_value": ["value", "condition"],
            },
          },
        ],
        name: "items",
        _nested_name: "items",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example_items",
              matchedExpression: "@data.example_items",
              type: "data",
              fieldName: "example_items",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example_items": ["value"],
        },
      },
      {
        type: "text",
        name: "conditional_var_1",
        value: "This should be set as 7: @fields.example_items_field_item_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "conditional_var_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "This should be set as 7: @fields.example_items_field_item_1",
              matchedExpression: "@fields.example_items_field_item_1",
              type: "fields",
              fieldName: "example_items_field_item_1",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.example_items_field_item_1": ["value"],
        },
      },
      {
        type: "text",
        name: "conditional_var_2",
        value: "This should be not set (blank): @fields.example_items_field_item_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "conditional_var_2",
        _dynamicFields: {
          value: [
            {
              fullExpression: "This should be not set (blank): @fields.example_items_field_item_2",
              matchedExpression: "@fields.example_items_field_item_2",
              type: "fields",
              fieldName: "example_items_field_item_2",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.example_items_field_item_2": ["value"],
        },
      },
      {
        type: "title",
        name: "workshop_example",
        value: "Workshop Example",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "workshop_example",
      },
      {
        type: "items",
        value: "@data.workshop",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "item_id_@item.id",
            value: "@item.id",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "items.item_id_@item.id",
            _dynamicFields: {
              name: [
                {
                  fullExpression: "item_id_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              value: [
                {
                  fullExpression: "@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              _nested_name: [
                {
                  fullExpression: "items.item_id_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.id": ["name", "value", "_nested_name"],
            },
          },
          {
            type: "text",
            name: "item_number_@item.id",
            value: "@item.number",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "items.item_number_@item.id",
            _dynamicFields: {
              name: [
                {
                  fullExpression: "item_number_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              value: [
                {
                  fullExpression: "@item.number",
                  matchedExpression: "@item.number",
                  type: "item",
                  fieldName: "number",
                },
              ],
              _nested_name: [
                {
                  fullExpression: "items.item_number_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.id": ["name", "_nested_name"],
              "@item.number": ["value"],
            },
          },
        ],
        name: "items",
        _nested_name: "items",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.workshop",
              matchedExpression: "@data.workshop",
              type: "data",
              fieldName: "workshop",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.workshop": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_items.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_items_unlock",
    status: "released",
    rows: [
      {
        type: "title",
        name: "workshop_example",
        value: "Example Items Unlock",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "workshop_example",
      },
      {
        type: "set_variable",
        name: "current_week",
        value: '@calc(window.date_fns.differenceInWeeks(new Date(), new Date("2021-08-01"))+1)',
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "current_week",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                '@calc(window.date_fns.differenceInWeeks(new Date(), new Date("2021-08-01"))+1)',
              matchedExpression:
                '@calc(window.date_fns.differenceInWeeks(new Date(), new Date("2021-08-01"))+1)',
              type: "calc",
              fieldName: 'window.date_fns.differenceInWeeks(new Date(), new Date("2021-08-01"))+1',
            },
          ],
        },
        _dynamicDependencies: {
          '@calc(window.date_fns.differenceInWeeks(new Date(), new Date("2021-08-01"))+1)': [
            "value",
          ],
        },
      },
      {
        type: "text",
        name: "text_current_week",
        value: "@local.current_week",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_current_week",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.current_week",
              matchedExpression: "@local.current_week",
              type: "local",
              fieldName: "current_week",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.current_week": ["value"],
        },
      },
      {
        type: "items",
        value: "@data.example_items",
        rows: [
          {
            type: "set_field",
            name: "@item.unlock_fieldname",
            value: "@calc(@item.unlock_week > @local.current_week)",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "items.@item.unlock_fieldname",
            _dynamicFields: {
              name: [
                {
                  fullExpression: "@item.unlock_fieldname",
                  matchedExpression: "@item.unlock_fieldname",
                  type: "item",
                  fieldName: "unlock_fieldname",
                },
              ],
              value: [
                {
                  fullExpression: "@calc(@item.unlock_week > @local.current_week)",
                  matchedExpression: "@item.unlock_week",
                  type: "item",
                  fieldName: "unlock_week",
                },
                {
                  fullExpression: "@calc(@item.unlock_week > @local.current_week)",
                  matchedExpression: "@local.current_week",
                  type: "local",
                  fieldName: "current_week",
                },
                {
                  fullExpression: "@calc(@item.unlock_week > @local.current_week)",
                  matchedExpression: "@calc(@item.unlock_week > @local.current_week)",
                  type: "calc",
                  fieldName: "@item.unlock_week > @local.current_week",
                },
              ],
              _nested_name: [
                {
                  fullExpression: "items.@item.unlock_fieldname",
                  matchedExpression: "@item.unlock_fieldname",
                  type: "item",
                  fieldName: "unlock_fieldname",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.unlock_fieldname": ["name", "_nested_name"],
              "@item.unlock_week": ["value"],
              "@local.current_week": ["value"],
              "@calc(@item.unlock_week > @local.current_week)": ["value"],
            },
          },
          {
            type: "display_group",
            name: "group_@item.id",
            rows: [
              {
                type: "text",
                name: "text_group_item_@item.id",
                value: "group item: @item.id",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                _nested_name: "items.group_@item.id.text_group_item_@item.id",
                _dynamicFields: {
                  name: [
                    {
                      fullExpression: "text_group_item_@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  value: [
                    {
                      fullExpression: "group item: @item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  _nested_name: [
                    {
                      fullExpression: "items.group_@item.id.text_group_item_@item.id",
                      matchedExpression: "@item.id.text_group_item_",
                      type: "item",
                      fieldName: "id",
                    },
                    {
                      fullExpression: "items.group_@item.id.text_group_item_@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@item.id": ["name", "value", "_nested_name"],
                  "@item.id.text_group_item_": ["_nested_name"],
                },
              },
              {
                type: "text",
                name: "text_workshop_unlock_week_@item.id",
                value: "Unlock week: @item.unlock_week",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                _nested_name: "items.group_@item.id.text_workshop_unlock_week_@item.id",
                _dynamicFields: {
                  name: [
                    {
                      fullExpression: "text_workshop_unlock_week_@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  value: [
                    {
                      fullExpression: "Unlock week: @item.unlock_week",
                      matchedExpression: "@item.unlock_week",
                      type: "item",
                      fieldName: "unlock_week",
                    },
                  ],
                  _nested_name: [
                    {
                      fullExpression: "items.group_@item.id.text_workshop_unlock_week_@item.id",
                      matchedExpression: "@item.id.text_workshop_unlock_week_",
                      type: "item",
                      fieldName: "id",
                    },
                    {
                      fullExpression: "items.group_@item.id.text_workshop_unlock_week_@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@item.id": ["name", "_nested_name"],
                  "@item.unlock_week": ["value"],
                  "@item.id.text_workshop_unlock_week_": ["_nested_name"],
                },
              },
              {
                type: "text",
                name: "text_workshop_unlocked_@item.id",
                value: "Unlocked: @fields.@item.unlock_fieldname",
                _translations: {
                  value: {
                    spa: false,
                    tsa: false,
                    xho: false,
                    zul: false,
                  },
                },
                _nested_name: "items.group_@item.id.text_workshop_unlocked_@item.id",
                _dynamicFields: {
                  name: [
                    {
                      fullExpression: "text_workshop_unlocked_@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                  value: [
                    {
                      fullExpression: "Unlocked: @fields.@item.unlock_fieldname",
                      matchedExpression: "@item.unlock_fieldname",
                      type: "item",
                      fieldName: "unlock_fieldname",
                    },
                  ],
                  _nested_name: [
                    {
                      fullExpression: "items.group_@item.id.text_workshop_unlocked_@item.id",
                      matchedExpression: "@item.id.text_workshop_unlocked_",
                      type: "item",
                      fieldName: "id",
                    },
                    {
                      fullExpression: "items.group_@item.id.text_workshop_unlocked_@item.id",
                      matchedExpression: "@item.id",
                      type: "item",
                      fieldName: "id",
                    },
                  ],
                },
                _dynamicDependencies: {
                  "@item.id": ["name", "_nested_name"],
                  "@item.unlock_fieldname": ["value"],
                  "@item.id.text_workshop_unlocked_": ["_nested_name"],
                },
              },
            ],
            _nested_name: "items.group_@item.id",
            _dynamicFields: {
              name: [
                {
                  fullExpression: "group_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              _nested_name: [
                {
                  fullExpression: "items.group_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.id": ["name", "_nested_name"],
            },
          },
        ],
        name: "items",
        _nested_name: "items",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example_items",
              matchedExpression: "@data.example_items",
              type: "data",
              fieldName: "example_items",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example_items": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_items.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_lang_select",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        value: "Language Select",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        name: "title",
        _nested_name: "title",
      },
      {
        name: "language_list",
        value: [
          "name: eng | text: English",
          "name: spa | text: Español",
          "name: fra | text: Français",
        ],
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "language_list",
      },
      {
        type: "radio_group",
        name: "language_select",
        value: "@fields._app_language",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "changed",
            action_id: "emit",
            args: ["set_language", "this.value"],
            _raw: "changed | emit: set_language:@local.language_select",
            _cleaned: "changed | emit: set_language:@local.language_select",
          },
          {
            trigger: "changed",
            action_id: "emit",
            args: ["force_reload"],
            _raw: "changed | emit: force_reload",
            _cleaned: "changed | emit: force_reload",
          },
        ],
        exclude_from_translation: true,
        parameter_list: {
          answer_list: "@local.language_list",
        },
        _nested_name: "language_select",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields._app_language",
              matchedExpression: "@fields._app_language",
              type: "fields",
              fieldName: "_app_language",
            },
          ],
          action_list: {
            "0": {
              _raw: [
                {
                  fullExpression: "changed | emit: set_language:@local.language_select",
                  matchedExpression: "@local.language_select",
                  type: "local",
                  fieldName: "language_select",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "changed | emit: set_language:@local.language_select",
                  matchedExpression: "@local.language_select",
                  type: "local",
                  fieldName: "language_select",
                },
              ],
            },
          },
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.language_list",
                matchedExpression: "@local.language_list",
                type: "local",
                fieldName: "language_list",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@fields._app_language": ["value"],
          "@local.language_select": ["action_list.0._raw", "action_list.0._cleaned"],
          "@local.language_list": ["parameter_list.answer_list"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_languages.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_lang_template_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "lang_select",
        value: "example_lang_select",
        rows: [],
        _nested_name: "lang_select",
      },
      {
        type: "title",
        name: "title",
        value: "Example Language Template",
        _translations: {
          value: {
            spa: true,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text_1",
        value: "This is a default text that needs to be translated",
        _translations: {
          value: {
            spa: true,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_1",
      },
      {
        type: "subtitle",
        name: "subtitle_1",
        value: "How are you feeling today?",
        _translations: {
          value: {
            spa: true,
            tsa: true,
            xho: true,
            zul: true,
          },
        },
        parameter_list: {
          style: "large",
        },
        _nested_name: "subtitle_1",
      },
      {
        name: "answer_list_1",
        value: [
          "name:happy | image:plh_images/stickers/faces/happier.svg | image_checked:plh_images/stickers/faces/happier.svg",
          "name:ok | image:plh_images/stickers/faces/neutral.svg | image_checked:plh_images/stickers/faces/neutral.svg",
          "name:sad | image:plh_images/stickers/faces/sadder.svg |  image_checked:plh_images/stickers/faces/sadder.svg",
        ],
        type: "set_variable",
        _nested_name: "answer_list_1",
      },
      {
        name: "options_per_row",
        value: 3,
        type: "set_variable",
        _nested_name: "options_per_row",
      },
      {
        name: "radio_group_field_name",
        value: "radio_group_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "radio_group_field_name",
      },
      {
        type: "radio_group",
        name: "radio_group",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["@local.radio_group_field_name", "this.value"],
            _raw: "changed | set_field:@local.radio_group_field_name:@local.radio_group",
            _cleaned: "changed | set_field:@local.radio_group_field_name:@local.radio_group",
          },
        ],
        parameter_list: {
          answer_list: "@local.answer_list_1",
          options_per_row: "@local.options_per_row",
        },
        _nested_name: "radio_group",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.radio_group_field_name",
                    matchedExpression: "@local.radio_group_field_name",
                    type: "local",
                    fieldName: "radio_group_field_name",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression:
                    "changed | set_field:@local.radio_group_field_name:@local.radio_group",
                  matchedExpression: "@local.radio_group_field_name",
                  type: "local",
                  fieldName: "radio_group_field_name",
                },
                {
                  fullExpression:
                    "changed | set_field:@local.radio_group_field_name:@local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
              _cleaned: [
                {
                  fullExpression:
                    "changed | set_field:@local.radio_group_field_name:@local.radio_group",
                  matchedExpression: "@local.radio_group_field_name",
                  type: "local",
                  fieldName: "radio_group_field_name",
                },
                {
                  fullExpression:
                    "changed | set_field:@local.radio_group_field_name:@local.radio_group",
                  matchedExpression: "@local.radio_group",
                  type: "local",
                  fieldName: "radio_group",
                },
              ],
            },
          },
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_1",
                matchedExpression: "@local.answer_list_1",
                type: "local",
                fieldName: "answer_list_1",
              },
            ],
            options_per_row: [
              {
                fullExpression: "@local.options_per_row",
                matchedExpression: "@local.options_per_row",
                type: "local",
                fieldName: "options_per_row",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.radio_group_field_name": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
          "@local.radio_group": ["action_list.0._raw", "action_list.0._cleaned"],
          "@local.answer_list_1": ["parameter_list.answer_list"],
          "@local.options_per_row": ["parameter_list.options_per_row"],
        },
      },
      {
        type: "display_group",
        name: "reply_happy_dg",
        hidden: '@local.radio_group!="happy"',
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "reply_happy",
            value: "This is the default reply if the feeling response is happy, the first option.",
            _translations: {
              value: {
                spa: true,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "reply_happy_dg.reply_happy",
          },
        ],
        _nested_name: "reply_happy_dg",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@local.radio_group!="happy"',
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["hidden"],
        },
      },
      {
        type: "display_group",
        name: "reply_ok_dg",
        hidden: '@local.radio_group!="ok"',
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "reply_ok",
            value: "This is the default reply if the feeling response is ok, the second option.",
            _translations: {
              value: {
                spa: true,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "reply_ok_dg.reply_ok",
          },
        ],
        _nested_name: "reply_ok_dg",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@local.radio_group!="ok"',
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["hidden"],
        },
      },
      {
        type: "display_group",
        name: "reply_sad_dg",
        hidden: '@local.radio_group!="sad"',
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "reply_sad",
            value: "This is the default reply if the feeling response is sad, the third option.",
            _translations: {
              value: {
                spa: true,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "reply_sad_dg.reply_sad",
          },
        ],
        _nested_name: "reply_sad_dg",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: '@local.radio_group!="sad"',
              matchedExpression: "@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_2",
        value:
          "The field set through the radio group is @local.radio_group_field_name and its value is @fields.@local.radio_group_field_name.",
        _translations: {
          value: {
            spa: true,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@local.radio_group",
        _nested_name: "text_2",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "The field set through the radio group is @local.radio_group_field_name and its value is @fields.@local.radio_group_field_name.",
              matchedExpression: "@local.radio_group_field_name",
              type: "local",
              fieldName: "radio_group_field_name",
            },
            {
              fullExpression:
                "The field set through the radio group is @local.radio_group_field_name and its value is @fields.@local.radio_group_field_name.",
              matchedExpression: "@local.radio_group_field_name",
              type: "local",
              fieldName: "radio_group_field_name",
            },
          ],
          hidden: [
            {
              fullExpression: "!@local.radio_group",
              matchedExpression: "!@local.radio_group",
              type: "local",
              fieldName: "radio_group",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.radio_group_field_name": ["value", "value"],
          "!@local.radio_group": ["hidden"],
        },
      },
      {
        type: "subtitle",
        name: "subtitle_2",
        value: "Select one of the following options:",
        _translations: {
          value: {
            spa: true,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        parameter_list: {
          style: "large",
        },
        _nested_name: "subtitle_2",
      },
      {
        name: "combo_box_answered",
        value: false,
        type: "set_variable",
        _nested_name: "combo_box_answered",
      },
      {
        name: "answer_list_2",
        value: [
          "name: option_1 | text:This is the first default option for the combo box",
          "name: option_2 | text:This is the second default option for the combo box",
          "name: option_3 | text:This is the third default option for the combo box",
        ],
        type: "set_variable",
        _nested_name: "answer_list_2",
      },
      {
        name: "placeholder",
        value: "@global.tap_and_choose",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "placeholder",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.tap_and_choose",
              matchedExpression: "@global.tap_and_choose",
              type: "global",
              fieldName: "tap_and_choose",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.tap_and_choose": ["value"],
        },
      },
      {
        name: "input_allowed",
        value: true,
        type: "set_variable",
        _nested_name: "input_allowed",
      },
      {
        name: "answer_placeholder",
        value: "@global.type_your_own",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        type: "set_variable",
        _nested_name: "answer_placeholder",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@global.type_your_own",
              matchedExpression: "@global.type_your_own",
              type: "global",
              fieldName: "type_your_own",
            },
          ],
        },
        _dynamicDependencies: {
          "@global.type_your_own": ["value"],
        },
      },
      {
        name: "combo_box_field_name",
        value: "radio_group_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
        type: "set_variable",
        _nested_name: "combo_box_field_name",
      },
      {
        type: "combo_box",
        name: "combo_box",
        action_list: [
          {
            trigger: "changed",
            action_id: "set_field",
            args: ["@local.combo_box_field_name", "this.value"],
            _raw: "changed | set_field:@local.combo_box_field_name:@local.combo_box",
            _cleaned: "changed | set_field:@local.combo_box_field_name:@local.combo_box",
          },
          {
            trigger: "changed",
            action_id: "set_local",
            args: ["combo_box_answered", true],
            _raw: "changed | set_local: combo_box_answered: true",
            _cleaned: "changed | set_local: combo_box_answered: true",
          },
        ],
        parameter_list: {
          answer_list: "@local.answer_list_2",
          placeholder: "@local.placeholder",
          input_allowed: "@local.input_allowed",
          answer_placeholder: "@local.answer_placeholder",
        },
        _nested_name: "combo_box",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.combo_box_field_name",
                    matchedExpression: "@local.combo_box_field_name",
                    type: "local",
                    fieldName: "combo_box_field_name",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression:
                    "changed | set_field:@local.combo_box_field_name:@local.combo_box",
                  matchedExpression: "@local.combo_box_field_name",
                  type: "local",
                  fieldName: "combo_box_field_name",
                },
                {
                  fullExpression:
                    "changed | set_field:@local.combo_box_field_name:@local.combo_box",
                  matchedExpression: "@local.combo_box",
                  type: "local",
                  fieldName: "combo_box",
                },
              ],
              _cleaned: [
                {
                  fullExpression:
                    "changed | set_field:@local.combo_box_field_name:@local.combo_box",
                  matchedExpression: "@local.combo_box_field_name",
                  type: "local",
                  fieldName: "combo_box_field_name",
                },
                {
                  fullExpression:
                    "changed | set_field:@local.combo_box_field_name:@local.combo_box",
                  matchedExpression: "@local.combo_box",
                  type: "local",
                  fieldName: "combo_box",
                },
              ],
            },
          },
          parameter_list: {
            answer_list: [
              {
                fullExpression: "@local.answer_list_2",
                matchedExpression: "@local.answer_list_2",
                type: "local",
                fieldName: "answer_list_2",
              },
            ],
            placeholder: [
              {
                fullExpression: "@local.placeholder",
                matchedExpression: "@local.placeholder",
                type: "local",
                fieldName: "placeholder",
              },
            ],
            input_allowed: [
              {
                fullExpression: "@local.input_allowed",
                matchedExpression: "@local.input_allowed",
                type: "local",
                fieldName: "input_allowed",
              },
            ],
            answer_placeholder: [
              {
                fullExpression: "@local.answer_placeholder",
                matchedExpression: "@local.answer_placeholder",
                type: "local",
                fieldName: "answer_placeholder",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.combo_box_field_name": [
            "action_list.0.args.0",
            "action_list.0._raw",
            "action_list.0._cleaned",
          ],
          "@local.combo_box": ["action_list.0._raw", "action_list.0._cleaned"],
          "@local.answer_list_2": ["parameter_list.answer_list"],
          "@local.placeholder": ["parameter_list.placeholder"],
          "@local.input_allowed": ["parameter_list.input_allowed"],
          "@local.answer_placeholder": ["parameter_list.answer_placeholder"],
        },
      },
      {
        type: "display_group",
        name: "reply_dg",
        hidden: "!@local.combo_box_answered",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "reply_combo_box",
            value: "The option selected was @local.combo_box.",
            _translations: {
              value: {
                spa: true,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "reply_dg.reply_combo_box",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "The option selected was @local.combo_box.",
                  matchedExpression: "@local.combo_box",
                  type: "local",
                  fieldName: "combo_box",
                },
              ],
            },
            _dynamicDependencies: {
              "@local.combo_box": ["value"],
            },
          },
        ],
        _nested_name: "reply_dg",
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@local.combo_box_answered",
              matchedExpression: "!@local.combo_box_answered",
              type: "local",
              fieldName: "combo_box_answered",
            },
          ],
        },
        _dynamicDependencies: {
          "!@local.combo_box_answered": ["hidden"],
        },
      },
      {
        type: "text",
        name: "text_3",
        value:
          "The field set through the combo box is @local.combo_box_field_name and its value is @fields.@local.combo_box_field_name.",
        _translations: {
          value: {
            spa: true,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        hidden: "!@local.combo_box",
        _nested_name: "text_3",
        _dynamicFields: {
          value: [
            {
              fullExpression:
                "The field set through the combo box is @local.combo_box_field_name and its value is @fields.@local.combo_box_field_name.",
              matchedExpression: "@local.combo_box_field_name",
              type: "local",
              fieldName: "combo_box_field_name",
            },
            {
              fullExpression:
                "The field set through the combo box is @local.combo_box_field_name and its value is @fields.@local.combo_box_field_name.",
              matchedExpression: "@local.combo_box_field_name",
              type: "local",
              fieldName: "combo_box_field_name",
            },
          ],
          hidden: [
            {
              fullExpression: "!@local.combo_box",
              matchedExpression: "!@local.combo_box",
              type: "local",
              fieldName: "combo_box",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.combo_box_field_name": ["value", "value"],
          "!@local.combo_box": ["hidden"],
        },
      },
      {
        type: "button",
        name: "button_1",
        value: "Pop-up 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_lang_template_pop_1"],
            _raw: "click | pop_up:example_lang_template_pop_1",
            _cleaned: "click | pop_up:example_lang_template_pop_1",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_1",
      },
      {
        type: "button",
        name: "button_2",
        value: "Pop-up 2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_lang_template_pop_2"],
            _raw: "click | pop_up:example_lang_template_pop_2",
            _cleaned: "click | pop_up:example_lang_template_pop_2",
          },
        ],
        exclude_from_translation: true,
        _nested_name: "button_2",
      },
      {
        type: "display_group",
        name: "global_box",
        parameter_list: {
          style: "dashed_box",
        },
        rows: [
          {
            type: "text",
            name: "text_4",
            value: "(don't translate this) The following text is a global:",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "global_box.text_4",
          },
          {
            type: "text",
            name: "text_5",
            value: "@global.languge_global",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "global_box.text_5",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@global.languge_global",
                  matchedExpression: "@global.languge_global",
                  type: "global",
                  fieldName: "languge_global",
                },
              ],
            },
            _dynamicDependencies: {
              "@global.languge_global": ["value"],
            },
          },
        ],
        _nested_name: "global_box",
      },
      {
        type: "display_group",
        parameter_list: {
          style: "dashed_box",
        },
        rows: [
          {
            type: "text",
            name: "text_6",
            value: "(don't translate) The following text is a field:",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "display_group.text_6",
          },
          {
            type: "text",
            name: "text_7",
            value: "@fields.language_field_1",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "display_group.text_7",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@fields.language_field_1",
                  matchedExpression: "@fields.language_field_1",
                  type: "fields",
                  fieldName: "language_field_1",
                },
              ],
            },
            _dynamicDependencies: {
              "@fields.language_field_1": ["value"],
            },
          },
        ],
        name: "display_group",
        _nested_name: "display_group",
      },
      {
        type: "display_group",
        parameter_list: {
          style: "dashed_box",
        },
        rows: [
          {
            type: "text",
            name: "text_8",
            value:
              "(don't translate) The following text is a field defined in a global from a data list:",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            exclude_from_translation: true,
            _nested_name: "display_group.text_8",
          },
          {
            type: "text",
            name: "text_9",
            value: "@fields.language_field_2",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            _nested_name: "display_group.text_9",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@fields.language_field_2",
                  matchedExpression: "@fields.language_field_2",
                  type: "fields",
                  fieldName: "language_field_2",
                },
              ],
            },
            _dynamicDependencies: {
              "@fields.language_field_2": ["value"],
            },
          },
        ],
        name: "display_group",
        _nested_name: "display_group",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_languages.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_lang_template_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "example_lang_template_1",
        value: "example_lang_template_1",
        rows: [
          {
            name: "text_1",
            value: "This is a modified text that needs to be translated.\n\nThis is a nested text.",
            _translations: {
              value: {
                spa: true,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_lang_template_1.text_1",
          },
          {
            name: "reply_happy",
            value:
              "This is the modified reply if the feeling response is happy, the first option.\n\nThis is a nested text.",
            _translations: {
              value: {
                spa: true,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_lang_template_1.reply_happy",
          },
          {
            name: "reply_ok",
            value:
              "This is the modified reply if the feeling response is ok, the second option.\n\nThis is a nested text.",
            _translations: {
              value: {
                spa: true,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_lang_template_1.reply_ok",
          },
          {
            name: "reply_sad",
            value:
              "This is the modified reply if the feeling response is sad, the third option.\n\nThis is a nested text.",
            _translations: {
              value: {
                spa: true,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_lang_template_1.reply_sad",
          },
          {
            name: "subtitle_2",
            value: "Which of the following do you like the most (this is modified)?",
            _translations: {
              value: {
                spa: true,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_lang_template_1.subtitle_2",
          },
          {
            name: "answer_list_2",
            value: [
              "name: option_1 | text:Cats (modified text in answer list)",
              "name: option_2 | text:Dogs (modified text in answer list)",
              "name: option_3 | text:Chinchillas (modified text in answer list)",
            ],
            type: "set_variable",
            _nested_name: "example_lang_template_1.answer_list_2",
          },
          {
            name: "input_allowed",
            value: false,
            type: "set_variable",
            _nested_name: "example_lang_template_1.input_allowed",
          },
        ],
        _nested_name: "example_lang_template_1",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_languages.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_lang_template_pop_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "@data.example_lang.example_lang_1.title",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "title_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example_lang.example_lang_1.title",
              matchedExpression: "@data.example_lang.example_lang_1.title",
              type: "data",
              fieldName: "example_lang",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example_lang.example_lang_1.title": ["value"],
        },
      },
      {
        type: "text",
        name: "text_1",
        value: "@data.example_lang.example_lang_1.text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "text_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example_lang.example_lang_1.text",
              matchedExpression: "@data.example_lang.example_lang_1.text",
              type: "data",
              fieldName: "example_lang",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example_lang.example_lang_1.text": ["value"],
        },
      },
      {
        type: "image",
        name: "image_1",
        value: "@data.example_lang.example_lang_1.image_asset",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "image_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example_lang.example_lang_1.image_asset",
              matchedExpression: "@data.example_lang.example_lang_1.image_asset",
              type: "data",
              fieldName: "example_lang",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example_lang.example_lang_1.image_asset": ["value"],
        },
      },
      {
        type: "lottie_animation",
        name: "lottie_1",
        value: "@data.example_lang.example_lang_1.lottie_asset",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "lottie_1",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.example_lang.example_lang_1.lottie_asset",
              matchedExpression: "@data.example_lang.example_lang_1.lottie_asset",
              type: "data",
              fieldName: "example_lang",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.example_lang.example_lang_1.lottie_asset": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_languages.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_lang_template_pop_2",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "template",
        name: "example_lang_template_pop_1",
        value: "example_lang_template_pop_1",
        rows: [
          {
            name: "title_1",
            value: "New title: @data.example_lang.example_lang_2.title",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_lang_template_pop_1.title_1",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "New title: @data.example_lang.example_lang_2.title",
                  matchedExpression: "@data.example_lang.example_lang_2.title",
                  type: "data",
                  fieldName: "example_lang",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.example_lang.example_lang_2.title": ["value"],
            },
          },
          {
            name: "text_1",
            value: "New text: @data.example_lang.example_lang_2.text",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_lang_template_pop_1.text_1",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "New text: @data.example_lang.example_lang_2.text",
                  matchedExpression: "@data.example_lang.example_lang_2.text",
                  type: "data",
                  fieldName: "example_lang",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.example_lang.example_lang_2.text": ["value"],
            },
          },
          {
            name: "image_1",
            value: "@data.example_lang.example_lang_2.image_asset",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_lang_template_pop_1.image_1",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.example_lang.example_lang_2.image_asset",
                  matchedExpression: "@data.example_lang.example_lang_2.image_asset",
                  type: "data",
                  fieldName: "example_lang",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.example_lang.example_lang_2.image_asset": ["value"],
            },
          },
          {
            name: "lottie_1",
            value: "@data.example_lang.example_lang_2.lottie_asset",
            _translations: {
              value: {
                spa: false,
                tsa: false,
                xho: false,
                zul: false,
              },
            },
            type: "set_variable",
            _nested_name: "example_lang_template_pop_1.lottie_1",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.example_lang.example_lang_2.lottie_asset",
                  matchedExpression: "@data.example_lang.example_lang_2.lottie_asset",
                  type: "data",
                  fieldName: "example_lang",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.example_lang.example_lang_2.lottie_asset": ["value"],
            },
          },
        ],
        _nested_name: "example_lang_template_pop_1",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_languages.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_startup_1",
    status: "released",
    process_on_start: 1.1,
    comments: "Templates will be processed on startup in ascending order of priority",
    rows: [
      {
        type: "title",
        name: "example_1",
        value: "Example Startup 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_1",
      },
      {
        type: "set_field",
        name: "example_startup_field",
        value: "Set by example_startup_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_startup_field",
      },
      {
        type: "text",
        name: "example_startup_text",
        value: "@fields.example_startup_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_startup_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields.example_startup_field",
              matchedExpression: "@fields.example_startup_field",
              type: "fields",
              fieldName: "example_startup_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.example_startup_field": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_startup.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_startup_2",
    status: "released",
    process_on_start: 2.1,
    comments:
      "This template will be processed after example_startup_1 (2.1 > 1.1), and so variables set here may overwrite variables seet in example_startup_1",
    rows: [
      {
        type: "title",
        name: "example_1",
        value: "Example Startup 2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_1",
      },
      {
        type: "set_field",
        name: "example_startup_field",
        value: "Set by example_startup_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_startup_field",
      },
      {
        type: "text",
        name: "example_startup_text",
        value: "@fields.example_startup_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_startup_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields.example_startup_field",
              matchedExpression: "@fields.example_startup_field",
              type: "fields",
              fieldName: "example_startup_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.example_startup_field": ["value"],
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_startup.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_startup_trigger",
    status: "released",
    rows: [
      {
        type: "title",
        name: "example_1",
        value: "Example Startup Trigger",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_1",
      },
      {
        type: "text",
        name: "example_startup_text",
        value: "example_startup_field: @fields.example_startup_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        _nested_name: "example_startup_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "example_startup_field: @fields.example_startup_field",
              matchedExpression: "@fields.example_startup_field",
              type: "fields",
              fieldName: "example_startup_field",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields.example_startup_field": ["value"],
        },
      },
      {
        type: "button",
        name: "trigger_1",
        value: "Trigger example_startup_1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "process_template",
            args: ["example_startup_1"],
            _raw: "click | process_template: example_startup_1",
            _cleaned: "click | process_template: example_startup_1",
          },
          {
            trigger: "click",
            action_id: "emit",
            args: ["force_reprocess"],
            _raw: "click | emit: force_reprocess",
            _cleaned: "click | emit: force_reprocess",
          },
        ],
        _nested_name: "trigger_1",
      },
      {
        type: "button",
        name: "trigger_2",
        value: "Trigger example_startup_2",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        action_list: [
          {
            trigger: "click",
            action_id: "process_template",
            args: ["example_startup_2"],
            _raw: "click | process_template: example_startup_2",
            _cleaned: "click | process_template: example_startup_2",
          },
          {
            trigger: "click",
            action_id: "emit",
            args: ["force_reprocess"],
            _raw: "click | emit: force_reprocess",
            _cleaned: "click | emit: force_reprocess",
          },
        ],
        _nested_name: "trigger_2",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_startup.xlsx",
  },
];
export default template;
