/* eslint-disable */
import { FlowTypes } from "data-models";
const template: FlowTypes.Template[] = [
  {
    flow_type: "template",
    flow_name: "feature_feedback_default",
    status: "released",
    flow_subtype: "debug_feedback",
    comments: "Default general feedback form",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "Feedback",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "text_area",
        name: "feedback",
        parameter_list: {
          placeholder: "Write feedback here",
        },
        _nested_name: "feedback",
      },
      {
        type: "display_group",
        name: "dg_buttons",
        rows: [
          {
            type: "button",
            name: "button_cancel",
            value: "Cancel",
            _translations: {
              value: {},
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
            _nested_name: "dg_buttons.button_cancel",
          },
          {
            type: "button",
            name: "button_submit",
            value: "Submit",
            _translations: {
              value: {
                tz_sw: true,
                za_af: true,
                za_st: true,
                za_xh: true,
                za_zu: true,
              },
            },
            action_list: [
              {
                trigger: "click",
                action_id: "emit",
                args: ["completed", "@local.feedback"],
                _raw: "click | emit:completed:@local.feedback",
                _cleaned: "click | emit:completed:@local.feedback",
              },
            ],
            exclude_from_translation: true,
            _nested_name: "dg_buttons.button_submit",
            _dynamicFields: {
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "@local.feedback",
                        matchedExpression: "@local.feedback",
                        type: "local",
                        fieldName: "feedback",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | emit:completed:@local.feedback",
                      matchedExpression: "@local.feedback",
                      type: "local",
                      fieldName: "feedback",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | emit:completed:@local.feedback",
                      matchedExpression: "@local.feedback",
                      type: "local",
                      fieldName: "feedback",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@local.feedback": [
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
            },
          },
        ],
        _nested_name: "dg_buttons",
      },
    ],
    _xlsxPath: "quality_assurance/feature_templates/feature_feedback.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "feature_feedback_text_select",
    status: "released",
    flow_subtype: "debug_feedback",
    comments: "Default text-select feedback form",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "Suggest Change",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "text",
        name: "selected_text",
        value: "@fields._feedback_selected_text",
        _translations: {
          value: {},
        },
        _nested_name: "selected_text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "@fields._feedback_selected_text",
              matchedExpression: "@fields._feedback_selected_text",
              type: "fields",
              fieldName: "_feedback_selected_text",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields._feedback_selected_text": ["value"],
        },
      },
      {
        type: "text_area",
        name: "feedback",
        exclude_from_translation: true,
        _nested_name: "feedback",
      },
      {
        type: "display_group",
        name: "dg_buttons",
        exclude_from_translation: true,
        rows: [
          {
            type: "button",
            name: "button_cancel",
            value: "Cancel",
            _translations: {
              value: {},
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
            _nested_name: "dg_buttons.button_cancel",
          },
          {
            type: "button",
            name: "button_submit",
            value: "Submit",
            _translations: {
              value: {
                tz_sw: true,
                za_af: true,
                za_st: true,
                za_xh: true,
                za_zu: true,
              },
            },
            action_list: [
              {
                trigger: "click",
                action_id: "emit",
                args: ["completed", "@local.feedback"],
                _raw: "click | emit:completed:@local.feedback",
                _cleaned: "click | emit:completed:@local.feedback",
              },
            ],
            _nested_name: "dg_buttons.button_submit",
            _dynamicFields: {
              action_list: {
                "0": {
                  args: {
                    "1": [
                      {
                        fullExpression: "@local.feedback",
                        matchedExpression: "@local.feedback",
                        type: "local",
                        fieldName: "feedback",
                      },
                    ],
                  },
                  _raw: [
                    {
                      fullExpression: "click | emit:completed:@local.feedback",
                      matchedExpression: "@local.feedback",
                      type: "local",
                      fieldName: "feedback",
                    },
                  ],
                  _cleaned: [
                    {
                      fullExpression: "click | emit:completed:@local.feedback",
                      matchedExpression: "@local.feedback",
                      type: "local",
                      fieldName: "feedback",
                    },
                  ],
                },
              },
            },
            _dynamicDependencies: {
              "@local.feedback": [
                "action_list.0.args.1",
                "action_list.0._raw",
                "action_list.0._cleaned",
              ],
            },
          },
        ],
        _nested_name: "dg_buttons",
      },
    ],
    _xlsxPath: "quality_assurance/feature_templates/feature_feedback.xlsx",
  },
  {
    flow_type: "template",
    flow_name: "feature_feedback_debug",
    status: "released",
    flow_subtype: "debug_feedback",
    comments: "Used in /feedback debug page",
    rows: [
      {
        type: "title",
        value: "Fields",
        _translations: {
          value: {},
        },
        name: "title",
        _nested_name: "title",
      },
      {
        type: "text",
        value: "fields._feedback_selected_text = @fields._feedback_selected_text",
        _translations: {
          value: {},
        },
        name: "text",
        _nested_name: "text",
        _dynamicFields: {
          value: [
            {
              fullExpression: "fields._feedback_selected_text = @fields._feedback_selected_text",
              matchedExpression: "@fields._feedback_selected_text",
              type: "fields",
              fieldName: "_feedback_selected_text",
            },
          ],
        },
        _dynamicDependencies: {
          "@fields._feedback_selected_text": ["value"],
        },
      },
      {
        type: "title",
        value: "Actions",
        _translations: {
          value: {},
        },
        name: "title",
        _nested_name: "title",
      },
      {
        type: "button",
        value: "Enable Feedback Mode",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "feedback",
            args: ["enable"],
            _raw: "click | feedback:enable",
            _cleaned: "click | feedback:enable",
          },
        ],
        name: "button",
        _nested_name: "button",
      },
      {
        type: "button",
        value: "Disable Feedback Mode",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "feedback",
            args: ["disable"],
            _raw: "click | feedback:disable",
            _cleaned: "click | feedback:disable",
          },
        ],
        name: "button",
        _nested_name: "button",
      },
      {
        type: "button",
        value: "Open Feedback Template",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "feedback",
            args: ["open", "feature_feedback_default"],
            _raw: "click | feedback:open:feature_feedback_default",
            _cleaned: "click | feedback:open:feature_feedback_default",
          },
        ],
        name: "button",
        _nested_name: "button",
      },
    ],
    _xlsxPath: "quality_assurance/feature_templates/feature_feedback.xlsx",
  },
];
export default template;
