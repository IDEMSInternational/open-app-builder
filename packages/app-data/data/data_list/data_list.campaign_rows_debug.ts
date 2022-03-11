/* eslint-disable */
import { FlowTypes } from "data-models";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows_debug",
    flow_name: "debug_campaign_rows",
    status: "released",
    comments: "This contains content for schedules",
    rows: [
      {
        id: "debug_daily_1",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_1.sent", true],
            _raw: "sent | set_field: debug_daily_1.sent: true",
            _cleaned: "sent | set_field: debug_daily_1.sent: true",
          },
        ],
        priority: 4,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_daily_1.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_daily_1.sent: TRUE",
          },
        ],
        campaign_list: ["debug_daily"],
        text: "Text 1",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "Text 1",
          },
          title: {
            eng: "Debug Notification 1",
          },
        },
        title: "Debug Notification 1",
      },
      {
        id: "debug_daily_2",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_2.sent", true],
            _raw: "sent | set_field: debug_daily_2.sent: true",
            _cleaned: "sent | set_field: debug_daily_2.sent: true",
          },
        ],
        priority: 3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_daily_2.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_daily_2.sent: TRUE",
          },
        ],
        campaign_list: ["debug_daily"],
        text: "How are you feeling today?",
        _translations: {
          text: {
            tz_sw: true,
          },
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "How are you feeling today?",
          },
          title: {
            eng: "Debug Notification 2",
          },
        },
        title: "Debug Notification 2",
      },
      {
        id: "debug_daily_3",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_3.sent", true],
            _raw: "sent | set_field: debug_daily_3.sent: true",
            _cleaned: "sent | set_field: debug_daily_3.sent: true",
          },
        ],
        priority: 2,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_daily_3.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_daily_3.sent: TRUE",
          },
        ],
        campaign_list: ["debug_daily"],
        text: "Text: @global.debug_variable_1",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "Text: @global.debug_variable_1",
          },
          title: {
            eng: "Debug Notification 3",
          },
        },
        title: "Debug Notification 3",
      },
      {
        id: "debug_daily_4a",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_1.sent", false],
            _raw: "sent | set_field: debug_daily_1.sent: false",
            _cleaned: "sent | set_field: debug_daily_1.sent: false",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_2.sent", false],
            _raw: "sent | set_field: debug_daily_2.sent: false",
            _cleaned: "sent | set_field: debug_daily_2.sent: false",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_3.sent", false],
            _raw: "sent | set_field: debug_daily_3.sent: false",
            _cleaned: "sent | set_field: debug_daily_3.sent: false",
          },
        ],
        priority: 1,
        campaign_list: ["debug_daily"],
        text: "Text 4",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "Text 4",
          },
          title: {
            eng: "Debug Notification 4a",
          },
        },
        title: "Debug Notification 4a",
      },
      {
        id: "debug_daily_4b",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_1.sent", false],
            _raw: "sent | set_field: debug_daily_1.sent: false",
            _cleaned: "sent | set_field: debug_daily_1.sent: false",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_2.sent", false],
            _raw: "sent | set_field: debug_daily_2.sent: false",
            _cleaned: "sent | set_field: debug_daily_2.sent: false",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_3.sent", false],
            _raw: "sent | set_field: debug_daily_3.sent: false",
            _cleaned: "sent | set_field: debug_daily_3.sent: false",
          },
        ],
        priority: 1,
        campaign_list: ["debug_daily"],
        text: "Text 4",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "Text 4",
          },
          title: {
            eng: "Debug Notification 4b",
          },
        },
        title: "Debug Notification 4b",
      },
      {
        id: "debug_daily_4c",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_1.sent", false],
            _raw: "sent | set_field: debug_daily_1.sent: false",
            _cleaned: "sent | set_field: debug_daily_1.sent: false",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_2.sent", false],
            _raw: "sent | set_field: debug_daily_2.sent: false",
            _cleaned: "sent | set_field: debug_daily_2.sent: false",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_daily_3.sent", false],
            _raw: "sent | set_field: debug_daily_3.sent: false",
            _cleaned: "sent | set_field: debug_daily_3.sent: false",
          },
        ],
        priority: 1,
        campaign_list: ["debug_daily"],
        text: "Text 4",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "Text 4",
          },
          title: {
            eng: "Debug Notification 4c",
          },
        },
        title: "Debug Notification 4c",
      },
      {
        id: "debug_fixed_saturday",
        campaign_list: ["debug_fixed_saturday"],
        text: "We hope you are having a nice weekend",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "We hope you are having a nice weekend",
          },
          title: {
            eng: "Debug Fixed Saturday",
          },
        },
        title: "Debug Fixed Saturday",
      },
      {
        id: "debug_fixed_december_no_time",
        campaign_list: ["debug_fixed_december_no_time"],
        text: "December daily - no time specified",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "December daily - no time specified",
          },
          title: {
            eng: "Debug Fixed December No Time",
          },
        },
        title: "Debug Fixed December No Time",
      },
      {
        id: "debug_fixed_december_early",
        campaign_list: ["debug_fixed_december_early"],
        text: "December daily - early",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "December daily - early",
          },
          title: {
            eng: "Debug Fixed December Early",
          },
        },
        title: "Debug Fixed December Early",
      },
      {
        id: "debug_fixed_december_noon",
        campaign_list: ["debug_fixed_december_noon"],
        text: "December daily - noon",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "December daily - noon",
          },
          title: {
            eng: "Debug Fixed December Noon",
          },
        },
        title: "Debug Fixed December Noon",
      },
      {
        id: "debug_fixed_december_late",
        campaign_list: ["debug_fixed_december_late"],
        text: "December daily - late",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "December daily - late",
          },
          title: {
            eng: "Debug Fixed December Late",
          },
        },
        title: "Debug Fixed December Late",
      },
      {
        id: "debug_fixed_new_years_day",
        campaign_list: ["debug_fixed_new_years_day"],
        text: "Happy new year from PLH",
        _translations: {
          text: {},
          title: {},
        },
        _translatedFields: {
          text: {
            eng: "Happy new year from PLH",
          },
          title: {
            eng: "Debug Fixed New Years Day",
          },
        },
        title: "Debug Fixed New Years Day",
      },
    ],
    _xlsxPath: "quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows_debug",
    flow_name: "debug_campaign_rows_actions",
    status: "released",
    rows: [
      {
        id: "debug_actions_1",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_field", "value_set_through_notification_action"],
            _raw: "sent | set_field: debug_field : value_set_through_notification_action",
            _cleaned: "sent | set_field: debug_field : value_set_through_notification_action",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_actions_1.sent", true],
            _raw: "sent | set_field: debug_actions_1.sent : true",
            _cleaned: "sent | set_field: debug_actions_1.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["debug_actions"],
        text: "Set a global",
        title: "Debug Actions 1",
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "debug_actions_2",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["example_text"],
            _raw: "click | pop_up: example_text",
            _cleaned: "click | pop_up: example_text",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_actions_2.sent", true],
            _raw: "sent | set_field: debug_actions_2.sent : true",
            _cleaned: "sent | set_field: debug_actions_2.sent : true",
          },
        ],
        priority: 2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_actions_1.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_actions_1.sent: TRUE",
          },
        ],
        campaign_list: ["debug_actions"],
        text: "Pop up a template",
        title: "Debug Actions 2",
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "debug_actions_3",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["@data.something_fun.co_chef.text_template"],
            _raw: "go_to: @data.something_fun.co_chef.text_template",
            _cleaned: "click | go_to: @data.something_fun.co_chef.text_template",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_actions_1.sent", false],
            _raw: "sent | set_field: debug_actions_1.sent: FALSE",
            _cleaned: "sent | set_field: debug_actions_1.sent: FALSE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_actions_2.sent", false],
            _raw: "sent | set_field: debug_actions_2.sent: FALSE",
            _cleaned: "sent | set_field: debug_actions_2.sent: FALSE",
          },
        ],
        priority: 3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_actions_2.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_actions_2.sent: TRUE",
          },
        ],
        campaign_list: ["debug_actions"],
        text: "Go to a template",
        title: "Debug Actions 3",
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows_debug",
    flow_name: "debug_campaign_rows_actions_2",
    status: "released",
    comments: "Can be merged into main actions once PR merged to support dismissed/sent actions",
    rows: [
      {
        id: "debug_actions_2a",
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_actions_2a.clicked", true],
            _raw: "click | set_field: debug_actions_2a.clicked: TRUE",
            _cleaned: "click | set_field: debug_actions_2a.clicked: TRUE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_actions_2a.sent", true],
            _raw: "sent | set_field: debug_actions_2a.sent: TRUE",
            _cleaned: "sent | set_field: debug_actions_2a.sent: TRUE",
          },
        ],
        priority: 1,
        campaign_list: ["debug_actions_2"],
      },
      {
        id: "debug_actions_2b",
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_actions_2b.clicked", true],
            _raw: "click | set_field: debug_actions_2b.clicked: TRUE",
            _cleaned: "click | set_field: debug_actions_2b.clicked: TRUE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_actions_2b.sent", true],
            _raw: "sent | set_field: debug_actions_2b.sent: TRUE",
            _cleaned: "sent | set_field: debug_actions_2b.sent: TRUE",
          },
        ],
        priority: 2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_actions_2a.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_actions_2a.sent: TRUE",
          },
        ],
        campaign_list: ["debug_actions_2"],
      },
      {
        id: "debug_actions_2c",
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_actions_2c.clicked", true],
            _raw: "click | set_field: debug_actions_2c.clicked: TRUE",
            _cleaned: "click | set_field: debug_actions_2c.clicked: TRUE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_actions_2c.sent", true],
            _raw: "sent | set_field: debug_actions_2c.sent: TRUE",
            _cleaned: "sent | set_field: debug_actions_2c.sent: TRUE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_actions_4.sent", false],
            _raw: "sent | set_field: debug_actions_4.sent: FALSE",
            _cleaned: "sent | set_field: debug_actions_4.sent: FALSE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_actions_5.sent", false],
            _raw: "sent | set_field: debug_actions_5.sent: FALSE",
            _cleaned: "sent | set_field: debug_actions_5.sent: FALSE",
          },
        ],
        priority: 3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_actions_2b.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_actions_2b.sent: TRUE",
          },
        ],
        campaign_list: ["debug_actions_2"],
      },
      {
        id: "debug_actions_2d",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_stepper"],
            _raw: "click | go_to: w_1on1_stepper",
            _cleaned: "click | go_to: w_1on1_stepper",
          },
        ],
        priority: 4,
        campaign_list: ["debug_actions_2"],
        text: "Go to the workshop stepper",
        title: "Debug 1on1 stepper",
      },
    ],
    _xlsxPath: "quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows_debug",
    flow_name: "debug_campaign_rows_calc",
    status: "released",
    rows: [
      {
        id: "debug_calc_1",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_1", false],
            _raw: "sent | set_field: debug_calc_1 : FALSE",
            _cleaned: "sent | set_field: debug_calc_1 : FALSE",
          },
        ],
        priority: -1,
        campaign_list: ["debug_calc"],
      },
      {
        id: "debug_calc_2",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_2", false],
            _raw: "sent | set_field: debug_calc_2 : FALSE",
            _cleaned: "sent | set_field: debug_calc_2 : FALSE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_2.sent", true],
            _raw: "sent | set_field: debug_calc_2.sent : TRUE",
            _cleaned: "sent | set_field: debug_calc_2.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                where: {
                  event_id: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "@calc(Math.min(0.001,0.002))",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : @calc(Math.min(0.001,0.002)) : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_calc_2.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_calc_2.sent: TRUE",
          },
        ],
        campaign_list: ["debug_calc"],
      },
      {
        id: "debug_calc_3",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_3", false],
            _raw: "sent | set_field: debug_calc_3 : FALSE",
            _cleaned: "sent | set_field: debug_calc_3 : FALSE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_3.sent", true],
            _raw: "sent | set_field: debug_calc_3.sent : TRUE",
            _cleaned: "sent | set_field: debug_calc_3.sent : TRUE",
          },
        ],
        priority: 2,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                where: {
                  event_id: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "1",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 1 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_calc_3.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_calc_3.sent: TRUE",
          },
        ],
        campaign_list: ["debug_calc"],
      },
      {
        id: "debug_calc_4",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_4", false],
            _raw: "sent | set_field: debug_calc_4 : FALSE",
            _cleaned: "sent | set_field: debug_calc_4 : FALSE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_4.sent", true],
            _raw: "sent | set_field: debug_calc_4.sent : TRUE",
            _cleaned: "sent | set_field: debug_calc_4.sent : TRUE",
          },
        ],
        priority: 3,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                where: {
                  event_id: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "@calc(Math.min(1,3))",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : @calc(Math.min(1,3)) : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_calc_4.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_calc_4.sent: TRUE",
          },
        ],
        campaign_list: ["debug_calc"],
      },
      {
        id: "debug_calc_5",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_5", false],
            _raw: "sent | set_field: debug_calc_5 : FALSE",
            _cleaned: "sent | set_field: debug_calc_5 : FALSE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_5.sent", true],
            _raw: "sent | set_field: debug_calc_5.sent : TRUE",
            _cleaned: "sent | set_field: debug_calc_5.sent : TRUE",
          },
        ],
        priority: 4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                where: {
                  event_id: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "@calc(Math.max(1,3))",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : @calc(Math.max(1,3)) : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_calc_5.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_calc_5.sent: TRUE",
          },
        ],
        campaign_list: ["debug_calc"],
      },
      {
        id: "debug_calc_6",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_6", false],
            _raw: "sent | set_field: debug_calc_6 : FALSE",
            _cleaned: "sent | set_field: debug_calc_6 : FALSE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_6.sent", true],
            _raw: "sent | set_field: debug_calc_6.sent : TRUE",
            _cleaned: "sent | set_field: debug_calc_6.sent : TRUE",
          },
        ],
        priority: 5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "data_events",
                where: {
                  name: "w_self_care_started",
                  value: "true",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "0.001",
                  unit: "day",
                },
              },
            },
            _raw: "get_field:first | w_self_care_started: true | before : 0.001 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_calc_6.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_calc_6.sent: TRUE",
          },
        ],
        campaign_list: ["debug_calc"],
      },
      {
        id: "debug_calc_7",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_7", false],
            _raw: "sent | set_field: debug_calc_7 : FALSE",
            _cleaned: "sent | set_field: debug_calc_7 : FALSE",
          },
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["debug_calc_7.sent", true],
            _raw: "sent | set_field: debug_calc_7.sent : TRUE",
            _cleaned: "sent | set_field: debug_calc_7.sent : TRUE",
          },
        ],
        priority: 5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "data_events",
                where: {
                  name: "w_self_care_started",
                  value: "true",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "2",
                  unit: "min",
                },
              },
            },
            _raw: "get_field:first | w_self_care_started: true | before : 2 : min",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_calc_7.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_calc_7.sent: TRUE",
          },
        ],
        campaign_list: ["debug_calc"],
      },
    ],
    _xlsxPath: "quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows_debug",
    flow_name: "debug_campaign_rows_html",
    status: "released",
    rows: [
      {
        id: "debug_html_1",
        priority: 1,
        campaign_list: ["debug_html"],
        text: "<b>Bold Text</b>",
        title: "Bold",
      },
      {
        id: "debug_html_2",
        priority: 2,
        campaign_list: ["debug_html"],
        text: "**Bold Markdown**",
        title: "Bold Markdown",
      },
      {
        id: "debug_html_3",
        priority: 3,
        campaign_list: ["debug_html"],
        text: '<p><span style="color: #99cc00;">M</span>u<span style="color: #008080;">lti</span>Colo<span style="color: #ff6600;">r</span> <span style="color: #000080;">P</span><span style="color: #00ccff;">u</span><span style="color: #ff0000;">s</span><span style="color: #808080;">h</span></p>',
        title: "Mixed HTML",
      },
      {
        id: "debug_html_4",
        priority: 4,
        campaign_list: ["debug_html"],
        text: '<string name="welcome">Welcome to <b>Android</b>!</string>',
        title: "Android HTML",
      },
    ],
    _xlsxPath: "quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
];
export default data_list;
