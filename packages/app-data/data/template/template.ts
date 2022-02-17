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
        name: "piece1",
        value: "example",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "piece1",
      },
      {
        name: "piece2",
        value: "_videos",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "piece2",
      },
      {
        type: "image",
        name: "main_image",
        value: "abacus.jpg",
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
            args: ["example_activities"],
            _raw: "click | go_to: example_activities",
            _cleaned: "click | go_to: example_activities",
          },
        ],
        _nested_name: "button_activities",
      },
      {
        type: "button",
        name: "button_activities_1",
        value: "Activities Esmee",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["example_activities_Esmee"],
            _raw: "click | go_to: example_activities_Esmee",
            _cleaned: "click | go_to: example_activities_Esmee",
          },
        ],
        _nested_name: "button_activities_1",
      },
      {
        type: "button",
        name: "button_videos",
        value: "Videos",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["@local.piece1@local.piece2"],
            _raw: "click | go_to: @local.piece1@local.piece2",
            _cleaned: "click | go_to: @local.piece1@local.piece2",
          },
        ],
        _nested_name: "button_videos",
        _dynamicFields: {
          action_list: {
            "0": {
              args: {
                "0": [
                  {
                    fullExpression: "@local.piece1@local.piece2",
                    matchedExpression: "@local.piece1",
                    type: "local",
                    fieldName: "piece1",
                  },
                  {
                    fullExpression: "@local.piece1@local.piece2",
                    matchedExpression: "@local.piece2",
                    type: "local",
                    fieldName: "piece2",
                  },
                ],
              },
              _raw: [
                {
                  fullExpression: "click | go_to: @local.piece1@local.piece2",
                  matchedExpression: "@local.piece1",
                  type: "local",
                  fieldName: "piece1",
                },
                {
                  fullExpression: "click | go_to: @local.piece1@local.piece2",
                  matchedExpression: "@local.piece2",
                  type: "local",
                  fieldName: "piece2",
                },
              ],
              _cleaned: [
                {
                  fullExpression: "click | go_to: @local.piece1@local.piece2",
                  matchedExpression: "@local.piece1",
                  type: "local",
                  fieldName: "piece1",
                },
                {
                  fullExpression: "click | go_to: @local.piece1@local.piece2",
                  matchedExpression: "@local.piece2",
                  type: "local",
                  fieldName: "piece2",
                },
              ],
            },
          },
        },
        _dynamicDependencies: {
          "@local.piece1": ["action_list.0.args.0", "action_list.0._raw", "action_list.0._cleaned"],
          "@local.piece2": ["action_list.0.args.0", "action_list.0._raw", "action_list.0._cleaned"],
        },
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
            args: ["example_storybooks"],
            _raw: "click | go_to: example_storybooks",
            _cleaned: "click | go_to: example_storybooks",
          },
        ],
        _nested_name: "button_storybooks",
      },
    ],
    _xlsxPath: "app_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_activities",
    status: "released",
    rows: [
      {
        name: "activity_text_style",
        value: "color: rgb(255,0,0)",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_text_style",
      },
      {
        name: "activity_image_style",
        value: "flex: 55",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "activity_image_style",
      },
      {
        type: "template",
        name: "header1",
        value: "efm_activity_header",
        rows: [
          {
            name: "efm_activity_name",
            value: "Math Out Loud - General",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "header1.efm_activity_name",
          },
          {
            name: "efm_activity_type",
            value: "Activity",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "header1.efm_activity_type",
          },
        ],
        _nested_name: "header1",
      },
      {
        type: "display_group",
        name: "trial1",
        rows: [
          {
            type: "image",
            name: "image",
            value: "EFM10EFMPairLookingAway.svg",
            _translations: {
              value: {},
            },
            style_list: ["@local.activity_image_style"],
            _nested_name: "trial1.image",
            _dynamicFields: {
              style_list: {
                "0": [
                  {
                    fullExpression: "@local.activity_image_style",
                    matchedExpression: "@local.activity_image_style",
                    type: "local",
                    fieldName: "activity_image_style",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@local.activity_image_style": ["style_list.0"],
            },
          },
          {
            type: "text",
            name: "text_1",
            value:
              "At these early ages, it is all about exposure! Your child is being exposed to a wide array of experiences and is discovering patterns. Expose your child to math and play with math together.",
            _translations: {
              value: {},
            },
            style_list: ["flex:100", "@local.activity_text_style"],
            _nested_name: "trial1.text_1",
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
        _nested_name: "trial1",
      },
      {
        type: "display_group",
        name: "trial2",
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "text_2",
            value:
              "Start this even before your child seems to understand what you are saying. Your child is a sponge who will eventually understand your words.",
            _translations: {
              value: {},
            },
            style_list: ["color: red", "margin-top: -15px"],
            _nested_name: "trial2.text_2",
          },
          {
            type: "text",
            name: "text_3",
            value:
              "Make a habit of pointing at things your child is interacting with and describing them with words involving numbers, shapes, and colors. If you are dealing with a small set of things, count them out loud to your child.",
            _translations: {
              value: {},
            },
            style_list: ["margin-top: -15px"],
            _nested_name: "trial2.text_3",
          },
        ],
        _nested_name: "trial2",
      },
    ],
    _xlsxPath: "app_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_activities_Esmee",
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
        type: "text",
        name: "text",
        value: "Try out these activities",
        _translations: {
          value: {},
        },
        _nested_name: "text",
      },
      {
        type: "items",
        name: "items",
        value: "@data.activities",
        rows: [
          {
            type: "text",
            name: "text",
            value: "This is a new row of text.",
            _translations: {
              value: {},
            },
            _nested_name: "items.text",
          },
          {
            type: "button",
            name: "button",
            value: "@item.chapter: @item.title",
            _translations: {
              value: {},
            },
            action_list: [
              {
                trigger: "click",
                action_id: "go_to",
                args: ["@item.template"],
                _raw: "click | go_to: @item.template",
                _cleaned: "click | go_to: @item.template",
              },
            ],
            _nested_name: "items.button",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.chapter: @item.title",
                  matchedExpression: "@item.chapter",
                  type: "item",
                  fieldName: "chapter",
                },
                {
                  fullExpression: "@item.chapter: @item.title",
                  matchedExpression: "@item.title",
                  type: "item",
                  fieldName: "title",
                },
              ],
              action_list: {
                "0": {
                  args: {
                    "0": [
                      {
                        fullExpression: "@item.template",
                        matchedExpression: "@item.template",
                        type: "item",
                        fieldName: "template",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | go_to: @item.template",
                      matchedExpression: "@item.template",
                      type: "item",
                      fieldName: "template",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | go_to: @item.template",
                      matchedExpression: "@item.template",
                      type: "item",
                      fieldName: "template",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@item.chapter": ["value"],
              "@item.title": ["value"],
              "@item.template": [
                "action_list.0.args.0",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
            },
          },
          {
            type: "text",
            name: "text",
            value: "This is another row of text.",
            _translations: {
              value: {},
            },
            _nested_name: "items.text",
          },
        ],
        _nested_name: "items",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.activities",
              matchedExpression: "@data.activities",
              type: "data",
              fieldName: "activities",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.activities": ["value"],
        },
      },
    ],
    _xlsxPath: "app_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_activity_header",
    status: "released",
    rows: [
      {
        name: "efm_activity_name",
        value: "No Name Given",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "efm_activity_name",
      },
      {
        name: "efm_activity_type",
        value: "No Activitty Type Given",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "efm_activity_type",
      },
      {
        type: "title",
        name: "title",
        value: "@local.efm_activity_name",
        _translations: {
          value: {},
        },
        _nested_name: "title",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.efm_activity_name",
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
        type: "subtitle",
        name: "subtitle",
        value: "@local.efm_activity_type",
        _translations: {
          value: {},
        },
        style_list: ["margin-top: -23px"],
        _nested_name: "subtitle",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.efm_activity_type",
              matchedExpression: "@local.efm_activity_type",
              type: "local",
              fieldName: "efm_activity_type",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.efm_activity_type": ["value"],
        },
      },
    ],
    _xlsxPath: "app_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_videos",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Videos",
        _translations: {
          value: {},
        },
        _nested_name: "title",
      },
      {
        type: "text",
        name: "top_text",
        value: "Have a look at these videos",
        _translations: {
          value: {},
        },
        _nested_name: "top_text",
      },
      {
        name: "answer_list",
        value: ["name:video_1 | text:1", "name:video_2 | text:2", "name:video_3 | text: 3"],
        type: "set_variable",
        _nested_name: "answer_list",
      },
      {
        type: "radio_group",
        name: "radio_group",
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
        type: "display_group",
        name: "dg_video_1",
        condition: '@local.radio_group == "video_1"',
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "video_text",
            value: "@data.videos.video_1.title",
            _translations: {
              value: {},
            },
            _nested_name: "dg_video_1.video_text",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.videos.video_1.title",
                  matchedExpression: "@data.videos.video_1.title",
                  type: "data",
                  fieldName: "videos",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.videos.video_1.title": ["value"],
            },
          },
          {
            type: "video",
            name: "video_player",
            value: "@data.videos.video_1.video_asset",
            _translations: {
              value: {},
            },
            _nested_name: "dg_video_1.video_player",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.videos.video_1.video_asset",
                  matchedExpression: "@data.videos.video_1.video_asset",
                  type: "data",
                  fieldName: "videos",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.videos.video_1.video_asset": ["value"],
            },
          },
        ],
        _nested_name: "dg_video_1",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.radio_group == "video_1"',
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
        name: "dg_video_2",
        condition: '@local.radio_group == "video_2"',
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "video_text",
            value: "@data.videos.video_2.title",
            _translations: {
              value: {},
            },
            _nested_name: "dg_video_2.video_text",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.videos.video_2.title",
                  matchedExpression: "@data.videos.video_2.title",
                  type: "data",
                  fieldName: "videos",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.videos.video_2.title": ["value"],
            },
          },
          {
            type: "video",
            name: "video_player",
            value: "@data.videos.video_2.video_asset",
            _translations: {
              value: {},
            },
            _nested_name: "dg_video_2.video_player",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.videos.video_2.video_asset",
                  matchedExpression: "@data.videos.video_2.video_asset",
                  type: "data",
                  fieldName: "videos",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.videos.video_2.video_asset": ["value"],
            },
          },
        ],
        _nested_name: "dg_video_2",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.radio_group == "video_2"',
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
        name: "dg_video_3",
        condition: '@local.radio_group == "video_3"',
        parameter_list: {
          style: "column",
        },
        rows: [
          {
            type: "text",
            name: "video_text",
            value: "@data.videos.video_3.title",
            _translations: {
              value: {},
            },
            _nested_name: "dg_video_3.video_text",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.videos.video_3.title",
                  matchedExpression: "@data.videos.video_3.title",
                  type: "data",
                  fieldName: "videos",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.videos.video_3.title": ["value"],
            },
          },
          {
            type: "video",
            name: "video_player",
            value: "@data.videos.video_3.video_asset",
            _translations: {
              value: {},
            },
            _nested_name: "dg_video_3.video_player",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@data.videos.video_3.video_asset",
                  matchedExpression: "@data.videos.video_3.video_asset",
                  type: "data",
                  fieldName: "videos",
                },
              ],
            },
            _dynamicDependencies: {
              "@data.videos.video_3.video_asset": ["value"],
            },
          },
        ],
        _nested_name: "dg_video_3",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.radio_group == "video_3"',
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
    ],
    _xlsxPath: "app_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_storybooks",
    status: "released",
    rows: [
      {
        type: "title",
        name: "title",
        value: "Storybooks",
        _translations: {
          value: {},
        },
        _nested_name: "title",
      },
      {
        type: "text",
        name: "text",
        value: "Have a look at these stories",
        _translations: {
          value: {},
        },
        _nested_name: "text",
      },
      {
        type: "items",
        name: "items",
        value: "@data.storybooks",
        rows: [
          {
            type: "tile_component",
            name: "tile_@item.id",
            parameter_list: {
              icon_src: "book",
              first_line_text: "@item.title",
            },
            _nested_name: "items.tile_@item.id",
            _dynamicFields: {
              name: [
                {
                  fullExpression: "tile_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              parameter_list: {
                first_line_text: [
                  {
                    fullExpression: "@item.title",
                    matchedExpression: "@item.title",
                    type: "item",
                    fieldName: "title",
                  },
                ],
              },
              _nested_name: [
                {
                  fullExpression: "items.tile_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.id": ["name", "_nested_name"],
              "@item.title": ["parameter_list.first_line_text"],
            },
          },
        ],
        _nested_name: "items",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.storybooks",
              matchedExpression: "@data.storybooks",
              type: "data",
              fieldName: "storybooks",
            },
          ],
        },
        _dynamicDependencies: {
          "@data.storybooks": ["value"],
        },
      },
    ],
    _xlsxPath: "app_sheets.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "efm_act_text",
    status: "released",
    rows: [
      {
        name: "text_to_use",
        value: "Danger Danger you forgot the text.",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "text_to_use",
      },
      {
        name: "text_ignored_1",
        value: '""',
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "text_ignored_1",
      },
      {
        name: "text_ignored_2",
        value: '""',
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "text_ignored_2",
      },
      {
        name: "style_of_text",
        value: "style:center",
        _translations: {
          value: {},
        },
        type: "set_variable",
        _nested_name: "style_of_text",
      },
      {
        type: "text",
        name: "text",
        value: "@local.text_to_use @local.text_ignored_1 @local.text_ignored_2 END!",
        _translations: {
          value: {},
        },
        style_list: ["@local.style_of_text"],
        _nested_name: "text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@local.text_to_use @local.text_ignored_1 @local.text_ignored_2 END!",
              matchedExpression: "@local.text_to_use",
              type: "local",
              fieldName: "text_to_use",
            },
            {
              fullExpression: "@local.text_to_use @local.text_ignored_1 @local.text_ignored_2 END!",
              matchedExpression: "@local.text_ignored_1",
              type: "local",
              fieldName: "text_ignored_1",
            },
            {
              fullExpression: "@local.text_to_use @local.text_ignored_1 @local.text_ignored_2 END!",
              matchedExpression: "@local.text_ignored_2",
              type: "local",
              fieldName: "text_ignored_2",
            },
          ],
          style_list: {
            "0": [
              {
                fullExpression: "@local.style_of_text",
                matchedExpression: "@local.style_of_text",
                type: "local",
                fieldName: "style_of_text",
              },
            ],
          },
        },
        _dynamicDependencies: {
          "@local.text_to_use": ["value"],
          "@local.text_ignored_1": ["value"],
          "@local.text_ignored_2": ["value"],
          "@local.style_of_text": ["style_list.0"],
        },
      },
    ],
    _xlsxPath: "app_sheets.xlsx",
  },
];
export default template;
