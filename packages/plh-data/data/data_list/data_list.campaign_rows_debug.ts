/* eslint-disable */
import { FlowTypes } from "data-models";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows_debug",
    flow_name: "debug_campaign_list",
    status: "released",
    rows: [
      {
        id: "debug_reminder_reset",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_1.sent", false],
            _raw: "set_field: debug_reminder_1.sent: false",
            _cleaned: "click | set_field: debug_reminder_1.sent: false",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_2.sent", false],
            _raw: "set_field: debug_reminder_2.sent: false",
            _cleaned: "click | set_field: debug_reminder_2.sent: false",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_3.sent", false],
            _raw: "set_field: debug_reminder_3.sent: false",
            _cleaned: "click | set_field: debug_reminder_3.sent: false",
          },
        ],
        priority: -2,
        campaign_list: ["debug_campaign"],
      },
      {
        id: "debug_reminder_default",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_default.sent", true],
            _raw: "set_field: debug_reminder_default.sent : true",
            _cleaned: "click | set_field: debug_reminder_default.sent : true",
          },
        ],
        priority: -1,
        campaign_list: ["debug_campaign", "debug_campaign_2"],
        icon: "plh_images/icons/play_white.svg",
        text: "Default",
      },
      {
        id: "debug_reminder_1",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_1.sent", true],
            _raw: "set_field: debug_reminder_1.sent : true",
            _cleaned: "click | set_field: debug_reminder_1.sent : true",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_reminder_default.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_reminder_default.sent:TRUE",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_reminder_1.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_reminder_1.sent : true",
          },
        ],
        campaign_list: ["debug_campaign"],
        icon: "plh_images/icons/play_white.svg",
        text: 1,
      },
      {
        id: "debug_reminder_2",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_2.sent", true],
            _raw: "set_field: debug_reminder_2.sent : true",
            _cleaned: "click | set_field: debug_reminder_2.sent : true",
          },
        ],
        priority: 2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_reminder_1.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_reminder_1.sent:TRUE",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_reminder_2.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_reminder_2.sent : true",
          },
        ],
        campaign_list: ["debug_campaign"],
        icon: "plh_images/icons/play_white.svg",
        text: 2,
      },
      {
        id: "debug_reminder_3",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_3.sent", true],
            _raw: "set_field: debug_reminder_3.sent : true",
            _cleaned: "click | set_field: debug_reminder_3.sent : true",
          },
        ],
        priority: 3,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "data_events",
                where: {
                  name: "debug_reminder_2.sent",
                  value: "true",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "2",
                  unit: "day",
                },
              },
            },
            _raw: "get_field:first | debug_reminder_2.sent:TRUE | before : 2 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_reminder_3.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_reminder_3.sent : true",
          },
        ],
        campaign_list: ["debug_campaign"],
        icon: "plh_images/icons/play_white.svg",
        text: 3,
      },
      {
        id: "debug_reminder_4",
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
                  value: "5",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 5 : day",
          },
        ],
        campaign_list: ["debug_campaign"],
      },
      {
        id: "debug_reminder_5",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["@global.example_text"],
            _raw: "pop_up: @global.example_text",
            _cleaned: "click | pop_up: @global.example_text",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_5.sent", true],
            _raw: "set_field: debug_reminder_5.sent : true",
            _cleaned: "click | set_field: debug_reminder_5.sent : true",
          },
        ],
        priority: 1,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_reminder_5.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_reminder_5.sent : true",
          },
        ],
        campaign_list: ["debug_campaign_2"],
        icon: "plh_images/icons/bell_white.svg",
        text: 5,
      },
      {
        id: "debug_reminder_6",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["@global.some_global", "some_value"],
            _raw: "set_field: @global.some_global : some_value",
            _cleaned: "click | set_field: @global.some_global : some_value",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_6.sent", true],
            _raw: "set_field: debug_reminder_6.sent : true",
            _cleaned: "click | set_field: debug_reminder_6.sent : true",
          },
        ],
        priority: 2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_reminder_5.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_reminder_5.sent:TRUE",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_reminder_6.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_reminder_6.sent : true",
          },
        ],
        campaign_list: ["debug_campaign_2"],
        icon: "plh_images/icons/bell_white.svg",
        text: 6,
      },
      {
        id: "debug_reminder_7",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_@data.workshop.1on1.something_fun"],
            _raw: "go_to: activity_@data.workshop.1on1.something_fun",
            _cleaned: "click | go_to: activity_@data.workshop.1on1.something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["debug_reminder_7.sent", true],
            _raw: "set_field: debug_reminder_7.sent : true",
            _cleaned: "click | set_field: debug_reminder_7.sent : true",
          },
        ],
        priority: 3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_reminder_6.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_reminder_6.sent:TRUE",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_reminder_7.sent",
                value: true,
              },
            },
            _raw: "get_field | debug_reminder_7.sent : true",
          },
        ],
        campaign_list: ["debug_campaign_2"],
        icon: "plh_images/icons/bell_white.svg",
        text: 7,
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows_debug",
    flow_name: "debug_campaign_3_list",
    status: "released",
    rows: [
      {
        id: "disabled_1",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_1", false],
            _raw: "set_field: disabled_1 : FALSE",
            _cleaned: "click | set_field: disabled_1 : FALSE",
          },
        ],
        priority: -1,
        campaign_list: ["debug_campaign_3"],
      },
      {
        id: "disabled_2",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_2", false],
            _raw: "set_field: disabled_2 : FALSE",
            _cleaned: "click | set_field: disabled_2 : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_2.sent", true],
            _raw: "set_field: disabled_2.sent : TRUE",
            _cleaned: "click | set_field: disabled_2.sent : TRUE",
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
                field: "disabled_2.sent",
                value: true,
              },
            },
            _raw: "get_field | disabled_2.sent : TRUE",
          },
        ],
        campaign_list: ["debug_campaign_3"],
      },
      {
        id: "disabled_3",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_3", false],
            _raw: "set_field: disabled_3 : FALSE",
            _cleaned: "click | set_field: disabled_3 : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_3.sent", true],
            _raw: "set_field: disabled_3.sent : TRUE",
            _cleaned: "click | set_field: disabled_3.sent : TRUE",
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
                field: "disabled_3.sent",
                value: true,
              },
            },
            _raw: "get_field | disabled_3.sent : TRUE",
          },
        ],
        campaign_list: ["debug_campaign_3"],
      },
      {
        id: "disabled_4",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_4", false],
            _raw: "set_field: disabled_4 : FALSE",
            _cleaned: "click | set_field: disabled_4 : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_4.sent", true],
            _raw: "set_field: disabled_4.sent : TRUE",
            _cleaned: "click | set_field: disabled_4.sent : TRUE",
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
                field: "disabled_4.sent",
                value: true,
              },
            },
            _raw: "get_field | disabled_4.sent : TRUE",
          },
        ],
        campaign_list: ["debug_campaign_3"],
      },
      {
        id: "disabled_5",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_5", false],
            _raw: "set_field: disabled_5 : FALSE",
            _cleaned: "click | set_field: disabled_5 : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_5.sent", true],
            _raw: "set_field: disabled_5.sent : TRUE",
            _cleaned: "click | set_field: disabled_5.sent : TRUE",
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
                field: "disabled_5.sent",
                value: true,
              },
            },
            _raw: "get_field | disabled_5.sent : TRUE",
          },
        ],
        campaign_list: ["debug_campaign_3"],
      },
      {
        id: "disabled_6",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_6", false],
            _raw: "set_field: disabled_6 : FALSE",
            _cleaned: "click | set_field: disabled_6 : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_6.sent", true],
            _raw: "set_field: disabled_6.sent : TRUE",
            _cleaned: "click | set_field: disabled_6.sent : TRUE",
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
                field: "disabled_6.sent",
                value: true,
              },
            },
            _raw: "get_field | disabled_6.sent : TRUE",
          },
        ],
        campaign_list: ["debug_campaign_3"],
      },
      {
        id: "disabled_7",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_7", false],
            _raw: "set_field: disabled_7 : FALSE",
            _cleaned: "click | set_field: disabled_7 : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["disabled_7.sent", true],
            _raw: "set_field: disabled_7.sent : TRUE",
            _cleaned: "click | set_field: disabled_7.sent : TRUE",
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
                field: "disabled_7.sent",
                value: true,
              },
            },
            _raw: "get_field | disabled_7.sent : TRUE",
          },
        ],
        campaign_list: ["debug_campaign_4"],
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
];
export default data_list;
