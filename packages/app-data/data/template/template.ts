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
        name: "button_videos",
        value: "Videos",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["example_videos"],
            _raw: "click | go_to: example_videos",
            _cleaned: "click | go_to: example_videos",
          },
        ],
        _nested_name: "button_videos",
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
    _xlsxPath: "example_templates.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "example_activities",
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
    _xlsxPath: "example_templates.xlsx",
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
    _xlsxPath: "example_templates.xlsx",
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
    _xlsxPath: "example_templates.xlsx",
  },
];
export default template;
