/* eslint-disable */
import { FlowTypes } from "data-models";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_subtype: "campaign_schedule",
    flow_name: "debug_campaign_schedules",
    status: "released",
    comments: "This contains schedules for notifications",
    rows: [
      {
        id: "debug_daily",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        schedule: {
          batch_size: 5,
        },
        time: {
          hour: 19,
          minute: 30,
        },
      },
      {
        id: "debug_fixed_saturday",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        schedule: {
          day_of_week: 6,
        },
        time: {
          hour: 19,
          minute: 30,
        },
      },
      {
        id: "debug_fixed_past",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        schedule: {
          start_date: "1990-11-01T00:00:00.000",
          end_date: "1990-11-30T00:00:00.000",
        },
      },
      {
        id: "debug_fixed_december_no_time",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        schedule: {
          start_date: "2021-12-01T00:00:00.000",
          end_date: "2021-12-31T00:00:00.000",
        },
      },
      {
        id: "debug_fixed_december_early",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        schedule: {
          start_date: "2021-12-01T00:00:00.000",
          end_date: "2021-12-31T00:00:00.000",
        },
        time: {
          hour: 6,
          minute: 0,
        },
      },
      {
        id: "debug_fixed_december_noon",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        schedule: {
          start_date: "2021-12-01T00:00:00.000",
          end_date: "2021-12-31T00:00:00.000",
        },
        time: {
          hour: 12,
          minute: 0,
        },
      },
      {
        id: "debug_fixed_december_late",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        schedule: {
          start_date: "2021-12-01T00:00:00.000",
          end_date: "2021-12-31T00:00:00.000",
        },
        time: {
          hour: 22,
          minute: 0,
        },
      },
      {
        id: "debug_fixed_new_years_day",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        schedule: {
          start_date: "2022-01-01T00:00:00.000",
          end_date: "2022-01-01T00:00:00.000",
        },
        time: {
          hour: 13,
          minute: 0,
        },
      },
      {
        id: "debug_consecutive_days",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        schedule: {
          batch_size: 5,
        },
      },
      {
        id: "debug_actions",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        time: {
          hour: 18,
          minute: 0,
        },
      },
      {
        id: "debug_actions_2",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        time: {
          hour: 18,
          minute: 1,
        },
      },
      {
        id: "debug_condition",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
        schedule: {
          day_of_week: 1,
        },
        time: {
          hour: 17,
          minute: 0,
        },
      },
      {
        id: "debug_html",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "debug_campaigns_enabled",
                value: true,
              },
            },
            _raw: "get_field | debug_campaigns_enabled:TRUE",
          },
        ],
      },
    ],
    _xlsxPath: "quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_schedule",
    flow_name: "nf_schedule_in_week_messages",
    status: "released",
    rows: [
      {
        id: "nf_w_released",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "iwm_as_notifications",
                value: true,
              },
            },
            _raw: "get_field | iwm_as_notifications : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "calc",
            condition_args: {
              calc: "@fields.workshop_number == 1",
            },
            _raw: "@fields.workshop_number == 1",
          },
        ],
        schedule: {
          day_of_week: "+@fields.workshop_start_day",
        },
        time: {
          hour: 13,
          minute: 0,
        },
      },
      {
        id: "nf_relax",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "iwm_as_notifications",
                value: true,
              },
            },
            _raw: "get_field | iwm_as_notifications : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_started",
                value: true,
              },
            },
            _raw: "get_field | w_self_care_started : true",
          },
        ],
        time: {
          hour: 19,
          minute: 0,
        },
      },
      {
        id: "nf_something_fun",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "iwm_as_notifications",
                value: true,
              },
            },
            _raw: "get_field | iwm_as_notifications : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "calc",
            condition_args: {
              calc: "@fields.workshop_number == 1",
            },
            _raw: "@fields.workshop_number == 1",
          },
        ],
        schedule: {
          day_of_week: "(+@fields.workshop_start_day +2 -1)%7 +1",
        },
        time: {
          hour: 13,
          minute: 0,
        },
      },
      {
        id: "nf_praise",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "iwm_as_notifications",
                value: true,
              },
            },
            _raw: "get_field | iwm_as_notifications : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "calc",
            condition_args: {
              calc: "@fields.workshop_number == 1",
            },
            _raw: "@fields.workshop_number == 1",
          },
        ],
        schedule: {
          day_of_week: "(+@fields.workshop_start_day +3 -1)%7 +1",
        },
        time: {
          hour: 9,
          minute: 0,
        },
      },
      {
        id: "nf_w_reminder",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "iwm_as_notifications",
                value: true,
              },
            },
            _raw: "get_field | iwm_as_notifications : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "calc",
            condition_args: {
              calc: "@fields.workshop_number == 1",
            },
            _raw: "@fields.workshop_number == 1",
          },
        ],
        schedule: {
          day_of_week: "(+@fields.workshop_start_day +3 -1)%7 +1",
        },
        time: {
          hour: 13,
          minute: 0,
        },
      },
      {
        id: "nf_hp_reminder",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "iwm_as_notifications",
                value: true,
              },
            },
            _raw: "get_field | iwm_as_notifications : true",
          },
        ],
        schedule: {
          day_of_week: "(+@fields.workshop_start_day +4 -1)%7 +1",
        },
        time: {
          hour: 13,
          minute: 0,
        },
      },
      {
        id: "nf_parent_points_overview",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "iwm_as_notifications",
                value: true,
              },
            },
            _raw: "get_field | iwm_as_notifications : true",
          },
        ],
        schedule: {
          day_of_week: "(+@fields.workshop_start_day +5 -1)%7 +1",
        },
        time: {
          hour: 9,
          minute: 0,
        },
      },
      {
        id: "nf_hp_review",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "iwm_as_notifications",
                value: true,
              },
            },
            _raw: "get_field | iwm_as_notifications : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "calc",
            condition_args: {
              calc: "@fields.workshop_number == 1",
            },
            _raw: "@fields.workshop_number == 1",
          },
        ],
        schedule: {
          day_of_week: "(+@fields.workshop_start_day +5 -1)%7 +1",
        },
        time: {
          hour: 13,
          minute: 0,
        },
      },
      {
        id: "nf_w_tomorrow",
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "iwm_as_notifications",
                value: true,
              },
            },
            _raw: "get_field | iwm_as_notifications : true",
          },
        ],
        schedule: {
          day_of_week: "(+@fields.workshop_start_day +6 -1)%7 +1",
        },
        time: {
          hour: 13,
          minute: 0,
        },
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_schedule",
    flow_name: "nf_schedule_inactive",
    status: "released",
    rows: [
      {
        id: "nf_inactive_day",
        time: {
          hour: 19,
          minute: 30,
        },
        delay: {
          days: 0,
        },
      },
      {
        id: "nf_inactive_week",
        time: {
          hour: 19,
          minute: 30,
        },
        delay: {
          days: 6,
        },
      },
      {
        id: "nf_inactive_month",
        time: {
          hour: 19,
          minute: 30,
        },
        delay: {
          days: 30,
        },
      },
      {
        id: "nf_generic",
        schedule: {
          day_of_week: 6,
        },
        time: {
          hour: 12,
          minute: 0,
        },
      },
    ],
    _xlsxPath: "global/campaigns/notifications_inactive.xlsx",
  },
];
export default data_list;
