/* eslint-disable */
import { FlowTypes } from "../../model/flowTypes";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_home_screen",
    status: "released",
    rows: [
      {
        id: "default",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["default.sent", true],
            _raw: "set_field: default.sent : true",
            _cleaned: "click | set_field: default.sent : true",
          },
        ],
        priority: -1,
        campaign_list: ["weekly_workshops", "parent_points", "parent_centre"],
        icon: "plh_images/icons/play_white.svg",
      },
      {
        id: "w_self_care_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_self_care_m_relax"],
            _raw: "pop_up: w_self_care_m_relax",
            _cleaned: "click | pop_up: w_self_care_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_m_relax.sent", true],
            _raw: "set_field: w_self_care_m_relax.sent : true",
            _cleaned: "click | set_field: w_self_care_m_relax.sent : true",
          },
        ],
        priority: 0.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_self_care_completed",
              },
            },
            _raw: "get_field | w_self_care_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_self_care_m_relax.sent",
              },
            },
            _raw: "get_field | w_self_care_m_relax.sent : true | before : 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "6",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 6 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "welcome_survey_quick_start",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["setup_and_survey_stepper"],
            _raw: "go_to: setup_and_survey_stepper",
            _cleaned: "click | go_to: setup_and_survey_stepper",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["welcome_survey_quick_start.sent", true],
            _raw: "set_field: welcome_survey_quick_start.sent : true",
            _cleaned: "click | set_field: welcome_survey_quick_start.sent : true",
          },
        ],
        priority: 0.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_self_care_started",
              },
            },
            _raw: "get_field | w_self_care_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "survey_completed",
              },
            },
            _raw: "get_field | survey_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/phone_heart_white.svg",
      },
      {
        id: "w_self_care_m_w_tomorrow",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_self_care_m_w_tomorrow"],
            _raw: "pop_up: w_self_care_m_w_tomorrow",
            _cleaned: "click | pop_up: w_self_care_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_m_w_tomorrow.sent", true],
            _raw: "set_field: w_self_care_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_self_care_m_w_tomorrow.sent : true",
          },
        ],
        priority: 0.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
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
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_self_care_m_w_tomorrow.sent",
              },
            },
            _raw: "get_field | w_self_care_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_self_care_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_self_care_m_hp_reminder"],
            _raw: "pop_up: w_self_care_m_hp_reminder",
            _cleaned: "click | pop_up: w_self_care_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_m_hp_reminder.sent", true],
            _raw: "set_field: w_self_care_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_self_care_m_hp_reminder.sent : true",
          },
        ],
        priority: 0.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "data_events",
                filter: {
                  field: "w_self_care_completed",
                  value: "true",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "3",
                  unit: "day",
                },
              },
            },
            _raw: "get_field:first | w_self_care_completed: true | before : 3 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_self_care_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_self_care_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_self_care_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_m_parent_points_overview.sent", true],
            _raw: "set_field: w_self_care_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_self_care_m_parent_points_overview.sent : true",
          },
        ],
        priority: 0.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_self_care_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_self_care_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_1on1_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_relax"],
            _raw: "pop_up: w_1on1_m_relax",
            _cleaned: "click | pop_up: w_1on1_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_relax.sent", true],
            _raw: "set_field: w_1on1_m_relax.sent : true",
            _cleaned: "click | set_field: w_1on1_m_relax.sent : true",
          },
        ],
        priority: 1.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "6",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 6 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_m_relax.sent",
              },
            },
            _raw: "get_field | w_1on1_m_relax.sent : true | before : 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 13 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_1on1_m_w_released_individual",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_released"],
            _raw: "pop_up: w_1on1_m_w_released",
            _cleaned: "click | pop_up: w_1on1_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_released.sent", true],
            _raw: "set_field: w_1on1_m_w_released.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_released.sent : true",
          },
        ],
        priority: 1.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: false",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "6",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 6 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_started",
              },
            },
            _raw: "get_field | w_1on1_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_m_w_released.sent",
              },
            },
            _raw: "get_field | w_1on1_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_1on1_m_w_released_together",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_released"],
            _raw: "pop_up: w_1on1_m_w_released",
            _cleaned: "click | pop_up: w_1on1_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_released.sent", true],
            _raw: "set_field: w_1on1_m_w_released.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_released.sent : true",
          },
        ],
        priority: 1.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: true",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "6",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 6 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_started",
              },
            },
            _raw: "get_field | w_1on1_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_m_w_released.sent",
              },
            },
            _raw: "get_field | w_1on1_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_1on1_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_something_fun"],
            _raw: "pop_up: w_1on1_m_something_fun",
            _cleaned: "click | pop_up: w_1on1_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_something_fun.sent", true],
            _raw: "set_field: w_1on1_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_1on1_m_something_fun.sent : true",
          },
        ],
        priority: 1.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "7",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 7 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_m_something_fun.sent",
              },
            },
            _raw: "get_field | w_1on1_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_1on1_m_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_praise"],
            _raw: "pop_up: w_1on1_m_praise",
            _cleaned: "click | pop_up: w_1on1_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_praise.sent", true],
            _raw: "set_field: w_1on1_m_praise.sent : true",
            _cleaned: "click | set_field: w_1on1_m_praise.sent : true",
          },
        ],
        priority: 1.5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "8",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 8 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_m_praise.sent",
              },
            },
            _raw: "get_field | w_1on1_m_praise.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_completed",
              },
            },
            _raw: "get_field | w_1on1_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_1on1_m_w_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_reminder"],
            _raw: "pop_up: w_1on1_m_w_reminder",
            _cleaned: "click | pop_up: w_1on1_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_reminder.sent", true],
            _raw: "set_field: w_1on1_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_reminder.sent : true",
          },
        ],
        priority: 1.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "9",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 9 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_started",
              },
            },
            _raw: "get_field | w_1on1_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_m_w_reminder.sent",
              },
            },
            _raw: "get_field | w_1on1_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_1on1_m_w_in_progress",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_in_progress"],
            _raw: "pop_up: w_1on1_m_w_in_progress",
            _cleaned: "click | pop_up: w_1on1_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_in_progress.sent", true],
            _raw: "set_field: w_1on1_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_in_progress.sent : true",
          },
        ],
        priority: 1.7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "9",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 9 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_m_w_in_progress.sent",
              },
            },
            _raw: "get_field | w_1on1_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_started",
              },
            },
            _raw: "get_field | w_1on1_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_completed",
              },
            },
            _raw: "get_field | w_1on1_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_1on1_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_hp_reminder"],
            _raw: "pop_up: w_1on1_m_hp_reminder",
            _cleaned: "click | pop_up: w_1on1_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_hp_reminder.sent", true],
            _raw: "set_field: w_1on1_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_1on1_m_hp_reminder.sent : true",
          },
        ],
        priority: 1.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "9",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 9 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_completed",
              },
            },
            _raw: "get_field | w_1on1_completed: true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_1on1_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_1on1_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_parent_points_overview.sent", true],
            _raw: "set_field: w_1on1_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_1on1_m_parent_points_overview.sent : true",
          },
        ],
        priority: 1.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "12",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 12 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_1on1_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_praise_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_relax"],
            _raw: "pop_up: w_praise_m_relax",
            _cleaned: "click | pop_up: w_praise_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_relax.sent", true],
            _raw: "set_field: w_praise_m_relax.sent : true",
            _cleaned: "click | set_field: w_praise_m_relax.sent : true",
          },
        ],
        priority: 2.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 13 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_m_relax.sent",
              },
            },
            _raw: "get_field | w_praise_m_relax.sent : true | before : 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 20 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_praise_m_w_released_individual",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_released"],
            _raw: "pop_up: w_praise_m_w_released",
            _cleaned: "click | pop_up: w_praise_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_released.sent", true],
            _raw: "set_field: w_praise_m_w_released.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_released.sent : true",
          },
        ],
        priority: 2.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: false",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 13 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_started",
              },
            },
            _raw: "get_field | w_praise_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_m_w_released.sent",
              },
            },
            _raw: "get_field | w_praise_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_praise_m_w_released_together",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_released"],
            _raw: "pop_up: w_praise_m_w_released",
            _cleaned: "click | pop_up: w_praise_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_released.sent", true],
            _raw: "set_field: w_praise_m_w_released.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_released.sent : true",
          },
        ],
        priority: 2.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: true",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 13 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_m_w_released.sent",
              },
            },
            _raw: "get_field | w_praise_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_praise_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_something_fun"],
            _raw: "pop_up: w_praise_m_something_fun",
            _cleaned: "click | pop_up: w_praise_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_something_fun.sent", true],
            _raw: "set_field: w_praise_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_praise_m_something_fun.sent : true",
          },
        ],
        priority: 2.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "14",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 14 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_m_something_fun.sent",
              },
            },
            _raw: "get_field | w_praise_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_praise_m_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_praise"],
            _raw: "pop_up: w_praise_m_praise",
            _cleaned: "click | pop_up: w_praise_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_praise.sent", true],
            _raw: "set_field: w_praise_m_praise.sent : true",
            _cleaned: "click | set_field: w_praise_m_praise.sent : true",
          },
        ],
        priority: 2.5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "15",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 15 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_m_praise.sent",
              },
            },
            _raw: "get_field | w_praise_m_praise.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_praise_m_w_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_reminder"],
            _raw: "pop_up: w_praise_m_w_reminder",
            _cleaned: "click | pop_up: w_praise_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_reminder.sent", true],
            _raw: "set_field: w_praise_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_reminder.sent : true",
          },
        ],
        priority: 2.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "16",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 16 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_started",
              },
            },
            _raw: "get_field | w_praise_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_m_w_reminder.sent",
              },
            },
            _raw: "get_field | w_praise_m_w_reminder.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_praise_m_w_in_pro",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_in_pro"],
            _raw: "pop_up: w_praise_m_w_in_pro",
            _cleaned: "click | pop_up: w_praise_m_w_in_pro",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_in_pro.sent", true],
            _raw: "set_field: w_praise_m_w_in_pro.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_in_pro.sent : true",
          },
        ],
        priority: 2.7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "16",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 16 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_m_w_in_pro.sent",
              },
            },
            _raw: "get_field | w_praise_m_w_in_pro.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_started",
              },
            },
            _raw: "get_field | w_praise_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_completed",
              },
            },
            _raw: "get_field | w_praise_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_praise_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_hp_reminder"],
            _raw: "pop_up: w_praise_m_hp_reminder",
            _cleaned: "click | pop_up: w_praise_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_hp_reminder.sent", true],
            _raw: "set_field: w_praise_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_praise_m_hp_reminder.sent : true",
          },
        ],
        priority: 2.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "16",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 16 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_completed",
              },
            },
            _raw: "get_field | w_praise_completed: true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_praise_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_praise_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_parent_points_overview.sent", true],
            _raw: "set_field: w_praise_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_praise_m_parent_points_overview.sent : true",
          },
        ],
        priority: 2.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "19",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 19 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_praise_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_instruct_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_relax"],
            _raw: "pop_up: w_instruct_m_relax",
            _cleaned: "click | pop_up: w_instruct_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_relax.sent", true],
            _raw: "set_field: w_instruct_m_relax.sent : true",
            _cleaned: "click | set_field: w_instruct_m_relax.sent : true",
          },
        ],
        priority: 3.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 20 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_m_relax.sent",
              },
            },
            _raw: "get_field | w_instruct_m_relax.sent : true | within: 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 27 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_instruct_m_w_released_individual",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_released"],
            _raw: "pop_up: w_instruct_m_w_released",
            _cleaned: "click | pop_up: w_instruct_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_released.sent", true],
            _raw: "set_field: w_instruct_m_w_released.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_released.sent : true",
          },
        ],
        priority: 3.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: false",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 20 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_started",
              },
            },
            _raw: "get_field | w_instruct_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_m_w_released.sent",
              },
            },
            _raw: "get_field | w_instruct_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_instruct_m_w_released_together",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_released"],
            _raw: "pop_up: w_instruct_m_w_released",
            _cleaned: "click | pop_up: w_instruct_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_released.sent", true],
            _raw: "set_field: w_instruct_m_w_released.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_released.sent : true",
          },
        ],
        priority: 3.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: true",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 20 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_started",
              },
            },
            _raw: "get_field | w_instruct_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_m_w_released.sent",
              },
            },
            _raw: "get_field | w_instruct_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_instruct_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_something_fun"],
            _raw: "pop_up: w_instruct_m_something_fun",
            _cleaned: "click | pop_up: w_instruct_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_something_fun.sent", true],
            _raw: "set_field: w_instruct_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_instruct_m_something_fun.sent : true",
          },
        ],
        priority: 3.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "21",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 21 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_m_something_fun.sent",
              },
            },
            _raw: "get_field | w_instruct_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_instruct_m_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_praise"],
            _raw: "pop_up: w_instruct_m_praise",
            _cleaned: "click | pop_up: w_instruct_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_praise.sent", true],
            _raw: "set_field: w_instruct_m_praise.sent : true",
            _cleaned: "click | set_field: w_instruct_m_praise.sent : true",
          },
        ],
        priority: 3.5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "22",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 22 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_m_praise.sent",
              },
            },
            _raw: "get_field | w_instruct_m_praise.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_instruct_m_w_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_reminder"],
            _raw: "pop_up: w_instruct_m_w_reminder",
            _cleaned: "click | pop_up: w_instruct_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_reminder.sent", true],
            _raw: "set_field: w_instruct_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_reminder.sent : true",
          },
        ],
        priority: 3.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "23",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 23 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_started",
              },
            },
            _raw: "get_field | w_instruct_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_m_w_reminder.sent",
              },
            },
            _raw: "get_field | w_instruct_m_w_reminder.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_instruct_m_w_in_pro",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_in_pro"],
            _raw: "pop_up: w_instruct_m_w_in_pro",
            _cleaned: "click | pop_up: w_instruct_m_w_in_pro",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_in_pro.sent", true],
            _raw: "set_field: w_instruct_m_w_in_pro.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_in_pro.sent : true",
          },
        ],
        priority: 3.7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "23",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 23 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_m_w_in_pro.sent",
              },
            },
            _raw: "get_field | w_instruct_m_w_in_pro.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_started",
              },
            },
            _raw: "get_field | w_instruct_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_completed",
              },
            },
            _raw: "get_field | w_instruct_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_instruct_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_hp_reminder"],
            _raw: "pop_up: w_instruct_m_hp_reminder",
            _cleaned: "click | pop_up: w_instruct_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_hp_reminder.sent", true],
            _raw: "set_field: w_instruct_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_instruct_m_hp_reminder.sent : true",
          },
        ],
        priority: 3.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "23",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 23 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_completed",
              },
            },
            _raw: "get_field | w_instruct_completed: true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_instruct_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_instruct_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_parent_points_overview.sent", true],
            _raw: "set_field: w_instruct_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_instruct_m_parent_points_overview.sent : true",
          },
        ],
        priority: 3.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "26",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 26 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_instruct_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_stress_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_relax"],
            _raw: "pop_up: w_stress_m_relax",
            _cleaned: "click | pop_up: w_stress_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_relax.sent", true],
            _raw: "set_field: w_stress_m_relax.sent : true",
            _cleaned: "click | set_field: w_stress_m_relax.sent : true",
          },
        ],
        priority: 4.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_m_relax.sent",
              },
            },
            _raw: "get_field | w_stress_m_relax.sent : true | within : 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_stress_m_w_released_individual",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_released"],
            _raw: "pop_up: w_stress_m_w_released",
            _cleaned: "click | pop_up: w_stress_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_released.sent", true],
            _raw: "set_field: w_stress_m_w_released.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_released.sent : true",
          },
        ],
        priority: 4.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: false",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_started",
              },
            },
            _raw: "get_field | w_stress_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_m_w_released.sent",
              },
            },
            _raw: "get_field | w_stress_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_stress_m_w_released_together",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_released"],
            _raw: "pop_up: w_stress_m_w_released",
            _cleaned: "click | pop_up: w_stress_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_released.sent", true],
            _raw: "set_field: w_stress_m_w_released.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_released.sent : true",
          },
        ],
        priority: 4.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: true",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_started",
              },
            },
            _raw: "get_field | w_stress_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_m_w_released.sent",
              },
            },
            _raw: "get_field | w_stress_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_stress_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_something_fun"],
            _raw: "pop_up: w_stress_m_something_fun",
            _cleaned: "click | pop_up: w_stress_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_something_fun.sent", true],
            _raw: "set_field: w_stress_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_stress_m_something_fun.sent : true",
          },
        ],
        priority: 4.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "28",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 28 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_m_something_fun.sent",
              },
            },
            _raw: "get_field | w_stress_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_stress_m_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_praise"],
            _raw: "pop_up: w_stress_m_praise",
            _cleaned: "click | pop_up: w_stress_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_praise.sent", true],
            _raw: "set_field: w_stress_m_praise.sent : true",
            _cleaned: "click | set_field: w_stress_m_praise.sent : true",
          },
        ],
        priority: 4.5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "29",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 29 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_m_praise.sent",
              },
            },
            _raw: "get_field | w_stress_m_praise.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_stress_m_w_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_reminder"],
            _raw: "pop_up: w_stress_m_w_reminder",
            _cleaned: "click | pop_up: w_stress_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_reminder.sent", true],
            _raw: "set_field: w_stress_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_reminder.sent : true",
          },
        ],
        priority: 4.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_started",
              },
            },
            _raw: "get_field | w_stress_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_m_w_reminder.sent",
              },
            },
            _raw: "get_field | w_stress_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_stress_m_w_in_progress",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_in_progress"],
            _raw: "pop_up: w_stress_m_w_in_progress",
            _cleaned: "click | pop_up: w_stress_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_in_progress.sent", true],
            _raw: "set_field: w_stress_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_in_progress.sent : true",
          },
        ],
        priority: 4.7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_m_w_in_progress.sent",
              },
            },
            _raw: "get_field | w_stress_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_started",
              },
            },
            _raw: "get_field | w_stress_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_completed",
              },
            },
            _raw: "get_field | w_stress_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_stress_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_hp_reminder"],
            _raw: "pop_up: w_stress_m_hp_reminder",
            _cleaned: "click | pop_up: w_stress_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_hp_reminder.sent", true],
            _raw: "set_field: w_stress_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_stress_m_hp_reminder.sent : true",
          },
        ],
        priority: 4.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_completed",
              },
            },
            _raw: "get_field | w_stress_completed: true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_stress_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_stress_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_parent_points_overview.sent", true],
            _raw: "set_field: w_stress_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_stress_m_parent_points_overview.sent : true",
          },
        ],
        priority: 4.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_stress_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_money_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_relax"],
            _raw: "pop_up: w_money_m_relax",
            _cleaned: "click | pop_up: w_money_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_relax.sent", true],
            _raw: "set_field: w_money_m_relax.sent : true",
            _cleaned: "click | set_field: w_money_m_relax.sent : true",
          },
        ],
        priority: 5.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_m_relax.sent",
              },
            },
            _raw: "get_field | w_money_m_relax.sent : true | within: 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_money_m_w_released_individual",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_released"],
            _raw: "pop_up: w_money_m_w_released",
            _cleaned: "click | pop_up: w_money_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_released.sent", true],
            _raw: "set_field: w_money_m_w_released.sent : true",
            _cleaned: "click | set_field: w_money_m_w_released.sent : true",
          },
        ],
        priority: 5.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: false",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_started",
              },
            },
            _raw: "get_field | w_money_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_m_w_released.sent",
              },
            },
            _raw: "get_field | w_money_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_money_m_w_released_together",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_released"],
            _raw: "pop_up: w_money_m_w_released",
            _cleaned: "click | pop_up: w_money_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_released.sent", true],
            _raw: "set_field: w_money_m_w_released.sent : true",
            _cleaned: "click | set_field: w_money_m_w_released.sent : true",
          },
        ],
        priority: 5.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: true",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_started",
              },
            },
            _raw: "get_field | w_money_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_m_w_released.sent",
              },
            },
            _raw: "get_field | w_money_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_money_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_something_fun"],
            _raw: "pop_up: w_money_m_something_fun",
            _cleaned: "click | pop_up: w_money_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_something_fun.sent", true],
            _raw: "set_field: w_money_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_money_m_something_fun.sent : true",
          },
        ],
        priority: 5.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "28",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 28 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_m_something_fun.sent",
              },
            },
            _raw: "get_field | w_money_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_money_m_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_praise"],
            _raw: "pop_up: w_money_m_praise",
            _cleaned: "click | pop_up: w_money_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_praise.sent", true],
            _raw: "set_field: w_money_m_praise.sent : true",
            _cleaned: "click | set_field: w_money_m_praise.sent : true",
          },
        ],
        priority: 5.5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "29",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 29 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_m_praise.sent",
              },
            },
            _raw: "get_field | w_money_m_praise.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_money_m_w_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_reminder"],
            _raw: "pop_up: w_money_m_w_reminder",
            _cleaned: "click | pop_up: w_money_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_reminder.sent", true],
            _raw: "set_field: w_money_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_money_m_w_reminder.sent : true",
          },
        ],
        priority: 5.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_started",
              },
            },
            _raw: "get_field | w_money_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_m_w_reminder.sent",
              },
            },
            _raw: "get_field | w_money_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_money_m_w_in_progress",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_in_progress"],
            _raw: "pop_up: w_money_m_w_in_progress",
            _cleaned: "click | pop_up: w_money_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_in_progress.sent", true],
            _raw: "set_field: w_money_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_money_m_w_in_progress.sent : true",
          },
        ],
        priority: 5.7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_m_w_in_progress.sent",
              },
            },
            _raw: "get_field | w_money_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_started",
              },
            },
            _raw: "get_field | w_money_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_completed",
              },
            },
            _raw: "get_field | w_money_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_money_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_hp_reminder"],
            _raw: "pop_up: w_money_m_hp_reminder",
            _cleaned: "click | pop_up: w_money_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_hp_reminder.sent", true],
            _raw: "set_field: w_money_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_money_m_hp_reminder.sent : true",
          },
        ],
        priority: 5.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_completed",
              },
            },
            _raw: "get_field | w_money_completed: true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_money_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_money_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_parent_points_overview.sent", true],
            _raw: "set_field: w_money_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_money_m_parent_points_overview.sent : true",
          },
        ],
        priority: 5.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_money_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_rules_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_relax"],
            _raw: "pop_up: w_rules_m_relax",
            _cleaned: "click | pop_up: w_rules_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_relax.sent", true],
            _raw: "set_field: w_rules_m_relax.sent : true",
            _cleaned: "click | set_field: w_rules_m_relax.sent : true",
          },
        ],
        priority: 6.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_m_relax.sent",
              },
            },
            _raw: "get_field | w_rules_m_relax.sent : true | within: 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_rules_m_w_released_individual",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_released"],
            _raw: "pop_up: w_rules_m_w_released",
            _cleaned: "click | pop_up: w_rules_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_released.sent", true],
            _raw: "set_field: w_rules_m_w_released.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_released.sent : true",
          },
        ],
        priority: 6.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: false",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_m_w_released.sent",
              },
            },
            _raw: "get_field | w_rules_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_rules_m_w_released_together",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_released"],
            _raw: "pop_up: w_rules_m_w_released",
            _cleaned: "click | pop_up: w_rules_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_released.sent", true],
            _raw: "set_field: w_rules_m_w_released.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_released.sent : true",
          },
        ],
        priority: 6.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: true",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_m_w_released.sent",
              },
            },
            _raw: "get_field | w_rules_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_rules_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_something_fun"],
            _raw: "pop_up: w_rules_m_something_fun",
            _cleaned: "click | pop_up: w_rules_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_something_fun.sent", true],
            _raw: "set_field: w_rules_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_rules_m_something_fun.sent : true",
          },
        ],
        priority: 6.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "28",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 28 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_m_something_fun.sent",
              },
            },
            _raw: "get_field | w_rules_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_rules_m_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_praise"],
            _raw: "pop_up: w_rules_m_praise",
            _cleaned: "click | pop_up: w_rules_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_praise.sent", true],
            _raw: "set_field: w_rules_m_praise.sent : true",
            _cleaned: "click | set_field: w_rules_m_praise.sent : true",
          },
        ],
        priority: 6.5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "29",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 29 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_m_praise.sent",
              },
            },
            _raw: "get_field | w_rules_m_praise.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_rules_m_w_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_reminder"],
            _raw: "pop_up: w_rules_m_w_reminder",
            _cleaned: "click | pop_up: w_rules_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_reminder.sent", true],
            _raw: "set_field: w_rules_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_reminder.sent : true",
          },
        ],
        priority: 6.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_started",
              },
            },
            _raw: "get_field | w_rules_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_m_w_reminder.sent",
              },
            },
            _raw: "get_field | w_rules_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_rules_m_w_in_progress",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_in_progress"],
            _raw: "pop_up: w_rules_m_w_in_progress",
            _cleaned: "click | pop_up: w_rules_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_in_progress.sent", true],
            _raw: "set_field: w_rules_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_in_progress.sent : true",
          },
        ],
        priority: 6.7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_m_w_in_progress.sent",
              },
            },
            _raw: "get_field | w_rules_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_started",
              },
            },
            _raw: "get_field | w_rules_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_completed",
              },
            },
            _raw: "get_field | w_rules_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_rules_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_hp_reminder"],
            _raw: "pop_up: w_rules_m_hp_reminder",
            _cleaned: "click | pop_up: w_rules_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_hp_reminder.sent", true],
            _raw: "set_field: w_rules_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_rules_m_hp_reminder.sent : true",
          },
        ],
        priority: 6.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_completed",
              },
            },
            _raw: "get_field | w_rules_completed: true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_rules_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_rules_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_parent_points_overview.sent", true],
            _raw: "set_field: w_rules_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_rules_m_parent_points_overview.sent : true",
          },
        ],
        priority: 6.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_rules_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_consequence_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_relax"],
            _raw: "pop_up: w_consequence_m_relax",
            _cleaned: "click | pop_up: w_consequence_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_relax.sent", true],
            _raw: "set_field: w_consequence_m_relax.sent : true",
            _cleaned: "click | set_field: w_consequence_m_relax.sent : true",
          },
        ],
        priority: 7.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_m_relax.sent",
              },
            },
            _raw: "get_field | w_consequence_m_relax.sent : true | within: 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_consequence_m_w_released_individual",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_rel"],
            _raw: "pop_up: w_consequence_m_w_rel",
            _cleaned: "click | pop_up: w_consequence_m_w_rel",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_rel.sent", true],
            _raw: "set_field: w_consequence_m_w_rel.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_rel.sent : true",
          },
        ],
        priority: 7.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: false",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_m_w_rel.sent",
              },
            },
            _raw: "get_field | w_consequence_m_w_rel.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_consequence_m_w_released_together",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_rel"],
            _raw: "pop_up: w_consequence_m_w_rel",
            _cleaned: "click | pop_up: w_consequence_m_w_rel",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_rel.sent", true],
            _raw: "set_field: w_consequence_m_w_rel.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_rel.sent : true",
          },
        ],
        priority: 7.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: true",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_m_w_rel.sent",
              },
            },
            _raw: "get_field | w_consequence_m_w_rel.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_consequence_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_something_fun"],
            _raw: "pop_up: w_consequence_m_something_fun",
            _cleaned: "click | pop_up: w_consequence_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_something_fun.sent", true],
            _raw: "set_field: w_consequence_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_consequence_m_something_fun.sent : true",
          },
        ],
        priority: 7.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "28",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 28 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_m_something_fun.sent",
              },
            },
            _raw: "get_field | w_consequence_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_consequence_m_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_praise"],
            _raw: "pop_up: w_consequence_m_praise",
            _cleaned: "click | pop_up: w_consequence_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_praise.sent", true],
            _raw: "set_field: w_consequence_m_praise.sent : true",
            _cleaned: "click | set_field: w_consequence_m_praise.sent : true",
          },
        ],
        priority: 7.5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "29",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 29 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_m_praise.sent",
              },
            },
            _raw: "get_field | w_consequence_m_praise.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_consequence_m_w_rem",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_rem"],
            _raw: "pop_up: w_consequence_m_w_rem",
            _cleaned: "click | pop_up: w_consequence_m_w_rem",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_rem.sent", true],
            _raw: "set_field: w_consequence_m_w_rem.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_rem.sent : true",
          },
        ],
        priority: 7.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_started",
              },
            },
            _raw: "get_field | w_consequence_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_m_w_rem.sent",
              },
            },
            _raw: "get_field | w_consequence_m_w_rem.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_consequence_m_w_in_pro",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_in_pro"],
            _raw: "pop_up: w_consequence_m_w_in_pro",
            _cleaned: "click | pop_up: w_consequence_m_w_in_pro",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_in_pro.sent", true],
            _raw: "set_field: w_consequence_m_w_in_pro.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_in_pro.sent : true",
          },
        ],
        priority: 7.7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_m_w_in_pro.sent",
              },
            },
            _raw: "get_field | w_consequence_m_w_in_pro.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_started",
              },
            },
            _raw: "get_field | w_consequence_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_completed",
              },
            },
            _raw: "get_field | w_consequence_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_consequence_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_hp_reminder"],
            _raw: "pop_up: w_consequence_m_hp_reminder",
            _cleaned: "click | pop_up: w_consequence_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_hp_reminder.sent", true],
            _raw: "set_field: w_consequence_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_consequence_m_hp_reminder.sent : true",
          },
        ],
        priority: 7.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_completed",
              },
            },
            _raw: "get_field | w_consequence_completed: true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_consequence_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_consequence_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_parent_points_overview.sent", true],
            _raw: "set_field: w_consequence_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_consequence_m_parent_points_overview.sent : true",
          },
        ],
        priority: 7.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_consequence_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_solve_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_relax"],
            _raw: "pop_up: w_solve_m_relax",
            _cleaned: "click | pop_up: w_solve_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_relax.sent", true],
            _raw: "set_field: w_solve_m_relax.sent : true",
            _cleaned: "click | set_field: w_solve_m_relax.sent : true",
          },
        ],
        priority: 8.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_m_relax.sent",
              },
            },
            _raw: "get_field | w_solve_m_relax.sent : true | within: 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_solve_m_w_released_individual",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_released"],
            _raw: "pop_up: w_solve_m_w_released",
            _cleaned: "click | pop_up: w_solve_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_released.sent", true],
            _raw: "set_field: w_solve_m_w_released.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_released.sent : true",
          },
        ],
        priority: 8.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: false",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_m_w_released.sent",
              },
            },
            _raw: "get_field | w_solve_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_solve_m_w_released_together",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_released"],
            _raw: "pop_up: w_solve_m_w_released",
            _cleaned: "click | pop_up: w_solve_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_released.sent", true],
            _raw: "set_field: w_solve_m_w_released.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_released.sent : true",
          },
        ],
        priority: 8.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: true",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_m_w_released.sent",
              },
            },
            _raw: "get_field | w_solve_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_solve_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_something_fun"],
            _raw: "pop_up: w_solve_m_something_fun",
            _cleaned: "click | pop_up: w_solve_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_something_fun.sent", true],
            _raw: "set_field: w_solve_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_solve_m_something_fun.sent : true",
          },
        ],
        priority: 8.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "28",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 28 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_m_something_fun.sent",
              },
            },
            _raw: "get_field | w_solve_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_solve_m_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_praise"],
            _raw: "pop_up: w_solve_m_praise",
            _cleaned: "click | pop_up: w_solve_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_praise.sent", true],
            _raw: "set_field: w_solve_m_praise.sent : true",
            _cleaned: "click | set_field: w_solve_m_praise.sent : true",
          },
        ],
        priority: 8.5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "29",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 29 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_m_praise.sent",
              },
            },
            _raw: "get_field | w_solve_m_praise.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_solve_m_w_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_reminder"],
            _raw: "pop_up: w_solve_m_w_reminder",
            _cleaned: "click | pop_up: w_solve_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_reminder.sent", true],
            _raw: "set_field: w_solve_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_reminder.sent : true",
          },
        ],
        priority: 8.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_started",
              },
            },
            _raw: "get_field | w_solve_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_m_w_reminder.sent",
              },
            },
            _raw: "get_field | w_solve_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_solve_m_w_in_progress",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_in_progress"],
            _raw: "pop_up: w_solve_m_w_in_progress",
            _cleaned: "click | pop_up: w_solve_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_in_progress.sent", true],
            _raw: "set_field: w_solve_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_in_progress.sent : true",
          },
        ],
        priority: 8.7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_m_w_in_progress.sent",
              },
            },
            _raw: "get_field | w_solve_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_started",
              },
            },
            _raw: "get_field | w_solve_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_completed",
              },
            },
            _raw: "get_field | w_solve_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_solve_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_hp_reminder"],
            _raw: "pop_up: w_solve_m_hp_reminder",
            _cleaned: "click | pop_up: w_solve_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_hp_reminder.sent", true],
            _raw: "set_field: w_solve_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_solve_m_hp_reminder.sent : true",
          },
        ],
        priority: 8.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_completed",
              },
            },
            _raw: "get_field | w_solve_completed: true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_solve_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_solve_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_parent_points_overview.sent", true],
            _raw: "set_field: w_solve_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_solve_m_parent_points_overview.sent : true",
          },
        ],
        priority: 8.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_solve_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_safe_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_relax"],
            _raw: "pop_up: w_safe_m_relax",
            _cleaned: "click | pop_up: w_safe_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_relax.sent", true],
            _raw: "set_field: w_safe_m_relax.sent : true",
            _cleaned: "click | set_field: w_safe_m_relax.sent : true",
          },
        ],
        priority: 9.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_m_relax.sent",
              },
            },
            _raw: "get_field | w_safe_m_relax.sent : true | within: 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_safe_m_w_released_individual",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_released"],
            _raw: "pop_up: w_safe_m_w_released",
            _cleaned: "click | pop_up: w_safe_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_released.sent", true],
            _raw: "set_field: w_safe_m_w_released.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_released.sent : true",
          },
        ],
        priority: 9.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: false",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_m_w_released.sent",
              },
            },
            _raw: "get_field | w_safe_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_safe_m_w_released_together",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_released"],
            _raw: "pop_up: w_safe_m_w_released",
            _cleaned: "click | pop_up: w_safe_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_released.sent", true],
            _raw: "set_field: w_safe_m_w_released.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_released.sent : true",
          },
        ],
        priority: 9.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: true",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_m_w_released.sent",
              },
            },
            _raw: "get_field | w_safe_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_safe_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_something_fun"],
            _raw: "pop_up: w_safe_m_something_fun",
            _cleaned: "click | pop_up: w_safe_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_something_fun.sent", true],
            _raw: "set_field: w_safe_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_safe_m_something_fun.sent : true",
          },
        ],
        priority: 9.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "28",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 28 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_m_something_fun.sent",
              },
            },
            _raw: "get_field | w_safe_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_safe_m_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_praise"],
            _raw: "pop_up: w_safe_m_praise",
            _cleaned: "click | pop_up: w_safe_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_praise.sent", true],
            _raw: "set_field: w_safe_m_praise.sent : true",
            _cleaned: "click | set_field: w_safe_m_praise.sent : true",
          },
        ],
        priority: 9.5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "29",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 29 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_m_praise.sent",
              },
            },
            _raw: "get_field | w_safe_m_praise.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_safe_m_w_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_reminder"],
            _raw: "pop_up: w_safe_m_w_reminder",
            _cleaned: "click | pop_up: w_safe_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_reminder.sent", true],
            _raw: "set_field: w_safe_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_reminder.sent : true",
          },
        ],
        priority: 9.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_started",
              },
            },
            _raw: "get_field | w_safe_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_m_w_reminder.sent",
              },
            },
            _raw: "get_field | w_safe_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_safe_m_w_in_progress",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_in_progress"],
            _raw: "pop_up: w_safe_m_w_in_progress",
            _cleaned: "click | pop_up: w_safe_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_in_progress.sent", true],
            _raw: "set_field: w_safe_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_in_progress.sent : true",
          },
        ],
        priority: 9.7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_m_w_in_progress.sent",
              },
            },
            _raw: "get_field | w_safe_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_started",
              },
            },
            _raw: "get_field | w_safe_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_completed",
              },
            },
            _raw: "get_field | w_safe_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_safe_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_hp_reminder"],
            _raw: "pop_up: w_safe_m_hp_reminder",
            _cleaned: "click | pop_up: w_safe_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_hp_reminder.sent", true],
            _raw: "set_field: w_safe_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_safe_m_hp_reminder.sent : true",
          },
        ],
        priority: 9.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_completed",
              },
            },
            _raw: "get_field | w_safe_completed: true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_safe_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_safe_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_parent_points_overview.sent", true],
            _raw: "set_field: w_safe_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_safe_m_parent_points_overview.sent : true",
          },
        ],
        priority: 9.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_safe_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_crisis_m_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_relax"],
            _raw: "pop_up: w_crisis_m_relax",
            _cleaned: "click | pop_up: w_crisis_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_relax.sent", true],
            _raw: "set_field: w_crisis_m_relax.sent : true",
            _cleaned: "click | set_field: w_crisis_m_relax.sent : true",
          },
        ],
        priority: 10.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_m_relax.sent",
              },
            },
            _raw: "get_field | w_crisis_m_relax.sent : true | within: 1 : day",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_crisis_m_w_released_individual",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_released"],
            _raw: "pop_up: w_crisis_m_w_released",
            _cleaned: "click | pop_up: w_crisis_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_released.sent", true],
            _raw: "set_field: w_crisis_m_w_released.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_released.sent : true",
          },
        ],
        priority: 10.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: false",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_m_w_released.sent",
              },
            },
            _raw: "get_field | w_crisis_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_crisis_m_w_released_together",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_released"],
            _raw: "pop_up: w_crisis_m_w_released",
            _cleaned: "click | pop_up: w_crisis_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_released.sent", true],
            _raw: "set_field: w_crisis_m_w_released.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_released.sent : true",
          },
        ],
        priority: 10.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "do_workshops_together",
              },
            },
            _raw: "get_field | do_workshops_together: true",
          },
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_m_w_released.sent",
              },
            },
            _raw: "get_field | w_crisis_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_crisis_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_something_fun"],
            _raw: "pop_up: w_crisis_m_something_fun",
            _cleaned: "click | pop_up: w_crisis_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_something_fun.sent", true],
            _raw: "set_field: w_crisis_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_crisis_m_something_fun.sent : true",
          },
        ],
        priority: 10.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "28",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 28 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_m_something_fun.sent",
              },
            },
            _raw: "get_field | w_crisis_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_crisis_m_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_praise"],
            _raw: "pop_up: w_crisis_m_praise",
            _cleaned: "click | pop_up: w_crisis_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_praise.sent", true],
            _raw: "set_field: w_crisis_m_praise.sent : true",
            _cleaned: "click | set_field: w_crisis_m_praise.sent : true",
          },
        ],
        priority: 10.5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "29",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 29 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_m_praise.sent",
              },
            },
            _raw: "get_field | w_crisis_m_praise.sent : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_crisis_m_w_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_reminder"],
            _raw: "pop_up: w_crisis_m_w_reminder",
            _cleaned: "click | pop_up: w_crisis_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_reminder.sent", true],
            _raw: "set_field: w_crisis_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_reminder.sent : true",
          },
        ],
        priority: 10.6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_started",
              },
            },
            _raw: "get_field | w_crisis_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_m_w_reminder.sent",
              },
            },
            _raw: "get_field | w_crisis_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_crisis_m_w_in_progress",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_in_progress"],
            _raw: "pop_up: w_crisis_m_w_in_progress",
            _cleaned: "click | pop_up: w_crisis_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_in_progress.sent", true],
            _raw: "set_field: w_crisis_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_in_progress.sent : true",
          },
        ],
        priority: 10.7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_m_w_in_progress.sent",
              },
            },
            _raw: "get_field | w_crisis_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_started",
              },
            },
            _raw: "get_field | w_crisis_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_completed",
              },
            },
            _raw: "get_field | w_crisis_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_crisis_m_hp_reminder",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_hp_reminder"],
            _raw: "pop_up: w_crisis_m_hp_reminder",
            _cleaned: "click | pop_up: w_crisis_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_hp_reminder.sent", true],
            _raw: "set_field: w_crisis_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_crisis_m_hp_reminder.sent : true",
          },
        ],
        priority: 10.8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "30",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 30 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_completed",
              },
            },
            _raw: "get_field | w_crisis_completed: true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_m_hp_reminder.sent",
              },
            },
            _raw: "get_field | w_crisis_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_crisis_m_parent_points_overview",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_parent_points_overview.sent", true],
            _raw: "set_field: w_crisis_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_crisis_m_parent_points_overview.sent : true",
          },
        ],
        priority: 10.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "no_parent_points_this_week",
              },
            },
            _raw: "get_field | no_parent_points_this_week : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_m_parent_points_overview.sent",
              },
            },
            _raw: "get_field | w_crisis_m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/campaigns/campaign_quick_starts.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_workshop_quick_start",
    status: "released",
    rows: [
      {
        id: "default",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["default.sent", true],
            _raw: "set_field: default.sent : true",
            _cleaned: "click | set_field: default.sent : true",
          },
        ],
        priority: -1,
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
      },
      {
        id: "w_self_care_quick_start",
        workshop: "w_self_care",
        workshop_data: "@data.workshop.w_self_care",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_self_care_stepper"],
            _raw: "go_to: w_self_care_stepper",
            _cleaned: "click | go_to: w_self_care_stepper",
          },
        ],
        priority: 0,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_self_care_started",
              },
            },
            _raw: "get_field | w_self_care_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_self_care_continue",
        workshop: "w_self_care",
        workshop_data: "@data.workshop.w_self_care",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_self_care_stepper"],
            _raw: "go_to: w_self_care_stepper",
            _cleaned: "click | go_to: w_self_care_stepper",
          },
        ],
        priority: 0,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_self_care_started",
              },
            },
            _raw: "get_field | w_self_care_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_self_care_completed",
              },
            },
            _raw: "get_field | w_self_care_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_1on1_quick_start",
        workshop: "w_1on1",
        workshop_data: "@data.workshop.w_1on1",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_stepper"],
            _raw: "go_to: w_1on1_stepper",
            _cleaned: "click | go_to: w_1on1_stepper",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "6",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 6 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_started",
              },
            },
            _raw: "get_field | w_1on1_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_1on1_continue",
        workshop: "w_1on1",
        workshop_data: "@data.workshop.w_1on1",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_stepper"],
            _raw: "go_to: w_1on1_stepper",
            _cleaned: "click | go_to: w_1on1_stepper",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "6",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 6 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_started",
              },
            },
            _raw: "get_field | w_1on1_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_completed",
              },
            },
            _raw: "get_field | w_1on1_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_praise_quick_start",
        workshop: "w_praise",
        workshop_data: "@data.workshop.w_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_stepper"],
            _raw: "go_to: w_praise_stepper",
            _cleaned: "click | go_to: w_praise_stepper",
          },
        ],
        priority: 2,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 13 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_started",
              },
            },
            _raw: "get_field | w_praise_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_praise_continue",
        workshop: "w_praise",
        workshop_data: "@data.workshop.w_praise",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_stepper"],
            _raw: "go_to: w_praise_stepper",
            _cleaned: "click | go_to: w_praise_stepper",
          },
        ],
        priority: 2,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 13 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_started",
              },
            },
            _raw: "get_field | w_praise_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_completed",
              },
            },
            _raw: "get_field | w_praise_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_instruct_quick_start",
        workshop: "w_instruct",
        workshop_data: "@data.workshop.w_instruct",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_stepper"],
            _raw: "go_to: w_instruct_stepper",
            _cleaned: "click | go_to: w_instruct_stepper",
          },
        ],
        priority: 3,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 20 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_started",
              },
            },
            _raw: "get_field | w_instruct_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_instruct_continue",
        workshop: "w_instruct",
        workshop_data: "@data.workshop.w_instruct",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_stepper"],
            _raw: "go_to: w_instruct_stepper",
            _cleaned: "click | go_to: w_instruct_stepper",
          },
        ],
        priority: 3,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 20 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_started",
              },
            },
            _raw: "get_field | w_instruct_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_completed",
              },
            },
            _raw: "get_field | w_instruct_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_stress_quick_start",
        workshop: "w_stress",
        workshop_data: "@data.workshop.w_stress",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_stepper"],
            _raw: "go_to: w_stress_stepper",
            _cleaned: "click | go_to: w_stress_stepper",
          },
        ],
        priority: 4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_started",
              },
            },
            _raw: "get_field | w_stress_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_stress_continue",
        workshop: "w_stress",
        workshop_data: "@data.workshop.w_stress",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_stepper"],
            _raw: "go_to: w_stress_stepper",
            _cleaned: "click | go_to: w_stress_stepper",
          },
        ],
        priority: 4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_started",
              },
            },
            _raw: "get_field | w_stress_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_completed",
              },
            },
            _raw: "get_field | w_stress_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_money_quick_start",
        workshop: "w_money",
        workshop_data: "@data.workshop.w_money",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_stepper"],
            _raw: "go_to: w_money_stepper",
            _cleaned: "click | go_to: w_money_stepper",
          },
        ],
        priority: 5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_started",
              },
            },
            _raw: "get_field | w_money_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_money_continue",
        workshop: "w_money",
        workshop_data: "@data.workshop.w_money",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_stepper"],
            _raw: "go_to: w_money_stepper",
            _cleaned: "click | go_to: w_money_stepper",
          },
        ],
        priority: 5,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_started",
              },
            },
            _raw: "get_field | w_money_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_completed",
              },
            },
            _raw: "get_field | w_money_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_rules_quick_start",
        workshop: "w_rules",
        workshop_data: "@data.workshop.w_rules",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_rules_stepper"],
            _raw: "go_to: w_rules_stepper",
            _cleaned: "click | go_to: w_rules_stepper",
          },
        ],
        priority: 6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_started",
              },
            },
            _raw: "get_field | w_rules_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_rules_continue",
        workshop: "w_rules",
        workshop_data: "@data.workshop.w_rules",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_rules_stepper"],
            _raw: "go_to: w_rules_stepper",
            _cleaned: "click | go_to: w_rules_stepper",
          },
        ],
        priority: 6,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_started",
              },
            },
            _raw: "get_field | w_rules_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_completed",
              },
            },
            _raw: "get_field | w_rules_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_consequence_quick_start",
        workshop: "w_consequence",
        workshop_data: "@data.workshop.w_consequence",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_stepper"],
            _raw: "go_to: w_consequence_stepper",
            _cleaned: "click | go_to: w_consequence_stepper",
          },
        ],
        priority: 7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_started",
              },
            },
            _raw: "get_field | w_consequence_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_consequence_continue",
        workshop: "w_consequence",
        workshop_data: "@data.workshop.w_consequence",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_stepper"],
            _raw: "go_to: w_consequence_stepper",
            _cleaned: "click | go_to: w_consequence_stepper",
          },
        ],
        priority: 7,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_started",
              },
            },
            _raw: "get_field | w_consequence_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_completed",
              },
            },
            _raw: "get_field | w_consequence_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_solve_quick_start",
        workshop: "w_solve",
        workshop_data: "@data.workshop.w_solve",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_stepper"],
            _raw: "go_to: w_solve_stepper",
            _cleaned: "click | go_to: w_solve_stepper",
          },
        ],
        priority: 8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_started",
              },
            },
            _raw: "get_field | w_solve_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_solve_continue",
        workshop: "w_solve",
        workshop_data: "@data.workshop.w_solve",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_stepper"],
            _raw: "go_to: w_solve_stepper",
            _cleaned: "click | go_to: w_solve_stepper",
          },
        ],
        priority: 8,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_started",
              },
            },
            _raw: "get_field | w_solve_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_completed",
              },
            },
            _raw: "get_field | w_solve_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_safe_quick_start",
        workshop: "w_safe",
        workshop_data: "@data.workshop.w_safe",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_stepper"],
            _raw: "go_to: w_safe_stepper",
            _cleaned: "click | go_to: w_safe_stepper",
          },
        ],
        priority: 9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_started",
              },
            },
            _raw: "get_field | w_safe_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_safe_continue",
        workshop: "w_safe",
        workshop_data: "@data.workshop.w_safe",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_stepper"],
            _raw: "go_to: w_safe_stepper",
            _cleaned: "click | go_to: w_safe_stepper",
          },
        ],
        priority: 9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_started",
              },
            },
            _raw: "get_field | w_safe_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_completed",
              },
            },
            _raw: "get_field | w_safe_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_crisis_quick_start",
        workshop: "w_crisis",
        workshop_data: "@data.workshop.w_crisis",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_stepper"],
            _raw: "go_to: w_crisis_stepper",
            _cleaned: "click | go_to: w_crisis_stepper",
          },
        ],
        priority: 10,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_started",
              },
            },
            _raw: "get_field | w_crisis_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_crisis_continue",
        workshop: "w_crisis",
        workshop_data: "@data.workshop.w_crisis",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_stepper"],
            _raw: "go_to: w_crisis_stepper",
            _cleaned: "click | go_to: w_crisis_stepper",
          },
        ],
        priority: 10,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_started",
              },
            },
            _raw: "get_field | w_crisis_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_completed",
              },
            },
            _raw: "get_field | w_crisis_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_celebrate_quick_start",
        workshop: "w_celebrate",
        workshop_data: "@data.workshop.w_celebrate",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_celebrate_stepper"],
            _raw: "go_to: w_celebrate_stepper",
            _cleaned: "click | go_to: w_celebrate_stepper",
          },
        ],
        priority: 11,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_celebrate_started",
              },
            },
            _raw: "get_field | w_celebrate_started : true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_celebrate_continue",
        workshop: "w_celebrate",
        workshop_data: "@data.workshop.w_celebrate",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_celebrate_stepper"],
            _raw: "go_to: w_celebrate_stepper",
            _cleaned: "click | go_to: w_celebrate_stepper",
          },
        ],
        priority: 11,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 34 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_celebrate_started",
              },
            },
            _raw: "get_field | w_celebrate_started : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_celebrate_completed",
              },
            },
            _raw: "get_field | w_celebrate_completed: true",
          },
        ],
        campaign_list: ["weekly_workshops", "workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/campaigns/campaign_quick_starts.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_relax",
    status: "released",
    rows: [
      {
        id: "default",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["default.sent", true],
            _raw: "set_field: default.sent : true",
            _cleaned: "click | set_field: default.sent : true",
          },
        ],
        priority: -1,
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_self_care_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_self_care_relax"],
            _raw: "go_to: w_self_care_relax",
            _cleaned: "click | go_to: w_self_care_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_relax.sent", true],
            _raw: "set_field: w_self_care_relax.sent : true",
            _cleaned: "click | set_field: w_self_care_relax.sent : true",
          },
        ],
        priority: 0.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_self_care_completed",
              },
            },
            _raw: "get_field | w_self_care_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "6",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 6 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_1on1_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_relax"],
            _raw: "go_to: w_1on1_relax",
            _cleaned: "click | go_to: w_1on1_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_relax.sent", true],
            _raw: "set_field: w_1on1_relax.sent : true",
            _cleaned: "click | set_field: w_1on1_relax.sent : true",
          },
        ],
        priority: 1.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "6",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 6 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 13 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_praise_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_relax"],
            _raw: "go_to: w_praise_relax",
            _cleaned: "click | go_to: w_praise_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_relax.sent", true],
            _raw: "set_field: w_praise_relax.sent : true",
            _cleaned: "click | set_field: w_praise_relax.sent : true",
          },
        ],
        priority: 2.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 13 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 20 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_instruct_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_relax"],
            _raw: "go_to: w_instruct_relax",
            _cleaned: "click | go_to: w_instruct_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_relax.sent", true],
            _raw: "set_field: w_instruct_relax.sent : true",
            _cleaned: "click | set_field: w_instruct_relax.sent : true",
          },
        ],
        priority: 3.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 20 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 27 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_stress_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_relax"],
            _raw: "go_to: w_stress_relax",
            _cleaned: "click | go_to: w_stress_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_relax.sent", true],
            _raw: "set_field: w_stress_relax.sent : true",
            _cleaned: "click | set_field: w_stress_relax.sent : true",
          },
        ],
        priority: 4.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_money_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_relax"],
            _raw: "go_to: w_money_relax",
            _cleaned: "click | go_to: w_money_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_relax.sent", true],
            _raw: "set_field: w_money_relax.sent : true",
            _cleaned: "click | set_field: w_money_relax.sent : true",
          },
        ],
        priority: 5.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_rules_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_rules_relax"],
            _raw: "go_to: w_rules_relax",
            _cleaned: "click | go_to: w_rules_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_relax.sent", true],
            _raw: "set_field: w_rules_relax.sent : true",
            _cleaned: "click | set_field: w_rules_relax.sent : true",
          },
        ],
        priority: 6.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_consequence_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_relax"],
            _raw: "go_to: w_consequence_relax",
            _cleaned: "click | go_to: w_consequence_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_relax.sent", true],
            _raw: "set_field: w_consequence_relax.sent : true",
            _cleaned: "click | set_field: w_consequence_relax.sent : true",
          },
        ],
        priority: 7.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_solve_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_relax"],
            _raw: "go_to: w_solve_relax",
            _cleaned: "click | go_to: w_solve_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_relax.sent", true],
            _raw: "set_field: w_solve_relax.sent : true",
            _cleaned: "click | set_field: w_solve_relax.sent : true",
          },
        ],
        priority: 8.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_safe_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_relax"],
            _raw: "go_to: w_safe_relax",
            _cleaned: "click | go_to: w_safe_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_relax.sent", true],
            _raw: "set_field: w_safe_relax.sent : true",
            _cleaned: "click | set_field: w_safe_relax.sent : true",
          },
        ],
        priority: 9.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_crisis_relax",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_relax"],
            _raw: "go_to: w_crisis_relax",
            _cleaned: "click | go_to: w_crisis_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_relax.sent", true],
            _raw: "set_field: w_crisis_relax.sent : true",
            _cleaned: "click | set_field: w_crisis_relax.sent : true",
          },
        ],
        priority: 10.1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/campaigns/campaign_quick_starts.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_something_fun",
    status: "released",
    rows: [
      {
        id: "default",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["default.sent", true],
            _raw: "set_field: default.sent : true",
            _cleaned: "click | set_field: default.sent : true",
          },
        ],
        priority: -1,
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_1on1_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_co_chef"],
            _raw: "go_to: activity_co_chef",
            _cleaned: "click | go_to: activity_co_chef",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_something_fun.sent", true],
            _raw: "set_field: w_1on1_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_1on1_m_something_fun.sent : true",
          },
        ],
        priority: 1.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "6",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 6 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 13 : day",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_praise_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_reflect_positive"],
            _raw: "go_to: activity_reflect_positive",
            _cleaned: "click | go_to: activity_reflect_positive",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_something_fun.sent", true],
            _raw: "set_field: w_praise_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_praise_m_something_fun.sent : true",
          },
        ],
        priority: 2.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 13 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 20 : day",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_instruct_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_dance_moves"],
            _raw: "go_to: activity_dance_moves",
            _cleaned: "click | go_to: activity_dance_moves",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_something_fun.sent", true],
            _raw: "set_field: w_instruct_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_instruct_m_something_fun.sent : true",
          },
        ],
        priority: 3.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 20 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 27 : day",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_stress_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_check_in_chat"],
            _raw: "go_to: activity_check_in_chat",
            _cleaned: "click | go_to: activity_check_in_chat",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_something_fun.sent", true],
            _raw: "set_field: w_stress_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_stress_m_something_fun.sent : true",
          },
        ],
        priority: 4.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_money_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_dream_travel"],
            _raw: "go_to: activity_dream_travel",
            _cleaned: "click | go_to: activity_dream_travel",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_something_fun.sent", true],
            _raw: "set_field: w_money_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_money_m_something_fun.sent : true",
          },
        ],
        priority: 5.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_rules_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_famous_party"],
            _raw: "go_to: activity_famous_party",
            _cleaned: "click | go_to: activity_famous_party",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_something_fun.sent", true],
            _raw: "set_field: w_rules_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_rules_m_something_fun.sent : true",
          },
        ],
        priority: 6.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_consequence_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_two_truths"],
            _raw: "go_to: activity_two_truths",
            _cleaned: "click | go_to: activity_two_truths",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_something_fun.sent", true],
            _raw: "set_field: w_consequence_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_consequence_m_something_fun.sent : true",
          },
        ],
        priority: 7.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_solve_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_mirror"],
            _raw: "go_to: activity_mirror",
            _cleaned: "click | go_to: activity_mirror",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_something_fun.sent", true],
            _raw: "set_field: w_solve_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_solve_m_something_fun.sent : true",
          },
        ],
        priority: 8.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_safe_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_time_machine"],
            _raw: "go_to: activity_time_machine",
            _cleaned: "click | go_to: activity_time_machine",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_something_fun.sent", true],
            _raw: "set_field: w_safe_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_safe_m_something_fun.sent : true",
          },
        ],
        priority: 9.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_crisis_m_something_fun",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["activity_superpowers"],
            _raw: "go_to: activity_superpowers",
            _cleaned: "click | go_to: activity_superpowers",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_something_fun.sent", true],
            _raw: "set_field: w_crisis_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_crisis_m_something_fun.sent : true",
          },
        ],
        priority: 10.4,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/campaigns/campaign_quick_starts.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hp_review",
    status: "released",
    rows: [
      {
        id: "w_1on1_hp_review",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_hp_review"],
            _raw: "go_to: w_1on1_hp_review",
            _cleaned: "click | go_to: w_1on1_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_hp_review.sent", true],
            _raw: "set_field: w_1on1_hp_review.sent : true",
            _cleaned: "click | set_field: w_1on1_hp_review.sent : true",
          },
        ],
        priority: 1.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "12",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 12 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_completed",
              },
            },
            _raw: "get_field | w_1on1_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_hp_review_completed",
              },
            },
            _raw: "get_field | w_1on1_hp_review_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_praise_hp_review",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_hp_review"],
            _raw: "go_to: w_praise_hp_review",
            _cleaned: "click | go_to: w_praise_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_hp_review.sent", true],
            _raw: "set_field: w_praise_hp_review.sent : true",
            _cleaned: "click | set_field: w_praise_hp_review.sent : true",
          },
        ],
        priority: 2.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "19",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 19 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_completed",
              },
            },
            _raw: "get_field | w_praise_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_hp_review_completed",
              },
            },
            _raw: "get_field | w_praise_hp_review_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_instruct_hp_review",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_hp_review"],
            _raw: "go_to: w_instruct_hp_review",
            _cleaned: "click | go_to: w_instruct_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_hp_review.sent", true],
            _raw: "set_field: w_instruct_hp_review.sent : true",
            _cleaned: "click | set_field: w_instruct_hp_review.sent : true",
          },
        ],
        priority: 3.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "26",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 26 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_completed",
              },
            },
            _raw: "get_field | w_instruct_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_hp_review_completed",
              },
            },
            _raw: "get_field | w_instruct_hp_review_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_stress_hp_review",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_hp_review"],
            _raw: "go_to: w_stress_hp_review",
            _cleaned: "click | go_to: w_stress_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_hp_review.sent", true],
            _raw: "set_field: w_stress_hp_review.sent : true",
            _cleaned: "click | set_field: w_stress_hp_review.sent : true",
          },
        ],
        priority: 4.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_completed",
              },
            },
            _raw: "get_field | w_stress_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_hp_review_completed",
              },
            },
            _raw: "get_field | w_stress_hp_review_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_money_hp_review",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_hp_review"],
            _raw: "go_to: w_money_hp_review",
            _cleaned: "click | go_to: w_money_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_hp_review.sent", true],
            _raw: "set_field: w_money_hp_review.sent : true",
            _cleaned: "click | set_field: w_money_hp_review.sent : true",
          },
        ],
        priority: 5.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_completed",
              },
            },
            _raw: "get_field | w_money_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_hp_review_completed",
              },
            },
            _raw: "get_field | w_money_hp_review_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_rules_hp_review",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_rules_hp_review"],
            _raw: "go_to: w_rules_hp_review",
            _cleaned: "click | go_to: w_rules_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_hp_review.sent", true],
            _raw: "set_field: w_rules_hp_review.sent : true",
            _cleaned: "click | set_field: w_rules_hp_review.sent : true",
          },
        ],
        priority: 6.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_completed",
              },
            },
            _raw: "get_field | w_rules_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_hp_review_completed",
              },
            },
            _raw: "get_field | w_rules_hp_review_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_consequence_hp_review",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_hp_review"],
            _raw: "go_to: w_consequence_hp_review",
            _cleaned: "click | go_to: w_consequence_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_hp_review.sent", true],
            _raw: "set_field: w_consequence_hp_review.sent : true",
            _cleaned: "click | set_field: w_consequence_hp_review.sent : true",
          },
        ],
        priority: 7.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_completed",
              },
            },
            _raw: "get_field | w_consequence_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_hp_review_completed",
              },
            },
            _raw: "get_field | w_consequence_hp_review_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_solve_hp_review",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_hp_review"],
            _raw: "go_to: w_solve_hp_review",
            _cleaned: "click | go_to: w_solve_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_hp_review.sent", true],
            _raw: "set_field: w_solve_hp_review.sent : true",
            _cleaned: "click | set_field: w_solve_hp_review.sent : true",
          },
        ],
        priority: 8.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_completed",
              },
            },
            _raw: "get_field | w_solve_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_hp_review_completed",
              },
            },
            _raw: "get_field | w_solve_hp_review_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_safe_hp_review",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_hp_review"],
            _raw: "go_to: w_safe_hp_review",
            _cleaned: "click | go_to: w_safe_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_hp_review.sent", true],
            _raw: "set_field: w_safe_hp_review.sent : true",
            _cleaned: "click | set_field: w_safe_hp_review.sent : true",
          },
        ],
        priority: 9.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_completed",
              },
            },
            _raw: "get_field | w_safe_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_hp_review_completed",
              },
            },
            _raw: "get_field | w_safe_hp_review_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_crisis_hp_review",
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_hp_review"],
            _raw: "go_to: w_crisis_hp_review",
            _cleaned: "click | go_to: w_crisis_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_hp_review.sent", true],
            _raw: "set_field: w_crisis_hp_review.sent : true",
            _cleaned: "click | set_field: w_crisis_hp_review.sent : true",
          },
        ],
        priority: 10.9,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "33",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before: 33 : day",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_completed",
              },
            },
            _raw: "get_field | w_crisis_completed : true",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_hp_review_completed",
              },
            },
            _raw: "get_field | w_crisis_hp_review_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/campaigns/campaign_quick_starts.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_unlock_workshops",
    status: "released",
    rows: [
      {
        id: "w_self_care_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_disabled", false],
            _raw: "set_field: w_self_care_disabled : FALSE",
            _cleaned: "click | set_field: w_self_care_disabled : FALSE",
          },
        ],
        priority: -1,
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_1on1_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_disabled", false],
            _raw: "set_field: w_1on1_disabled : FALSE",
            _cleaned: "click | set_field: w_1on1_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_disabled.sent", true],
            _raw: "set_field: w_1on1_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_1on1_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "6",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 6 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_1on1_disabled.sent",
              },
            },
            _raw: "get_field | w_1on1_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_praise_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_disabled", false],
            _raw: "set_field: w_praise_disabled : FALSE",
            _cleaned: "click | set_field: w_praise_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_disabled.sent", true],
            _raw: "set_field: w_praise_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_praise_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "13",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 13 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_praise_disabled.sent",
              },
            },
            _raw: "get_field | w_praise_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_instruct_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_disabled", false],
            _raw: "set_field: w_instruct_disabled : FALSE",
            _cleaned: "click | set_field: w_instruct_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_disabled.sent", true],
            _raw: "set_field: w_instruct_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_instruct_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "20",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 20 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_instruct_disabled.sent",
              },
            },
            _raw: "get_field | w_instruct_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_stress_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_disabled", false],
            _raw: "set_field: w_stress_disabled : FALSE",
            _cleaned: "click | set_field: w_stress_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_disabled.sent", true],
            _raw: "set_field: w_stress_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_stress_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "27",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 27 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_stress_disabled.sent",
              },
            },
            _raw: "get_field | w_stress_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_money_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_disabled", false],
            _raw: "set_field: w_money_disabled : FALSE",
            _cleaned: "click | set_field: w_money_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_disabled.sent", true],
            _raw: "set_field: w_money_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_money_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "34",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 34 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_money_disabled.sent",
              },
            },
            _raw: "get_field | w_money_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_rules_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_disabled", false],
            _raw: "set_field: w_rules_disabled : FALSE",
            _cleaned: "click | set_field: w_rules_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_disabled.sent", true],
            _raw: "set_field: w_rules_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_rules_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "41",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 41 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_rules_disabled.sent",
              },
            },
            _raw: "get_field | w_rules_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_consequence_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_disabled", false],
            _raw: "set_field: w_consequence_disabled : FALSE",
            _cleaned: "click | set_field: w_consequence_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_disabled.sent", true],
            _raw: "set_field: w_consequence_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_consequence_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "48",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 48 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_consequence_disabled.sent",
              },
            },
            _raw: "get_field | w_consequence_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_solve_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_disabled", false],
            _raw: "set_field: w_solve_disabled : FALSE",
            _cleaned: "click | set_field: w_solve_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_disabled.sent", true],
            _raw: "set_field: w_solve_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_solve_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "55",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 55 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_solve_disabled.sent",
              },
            },
            _raw: "get_field | w_solve_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_safe_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_disabled", false],
            _raw: "set_field: w_safe_disabled : FALSE",
            _cleaned: "click | set_field: w_safe_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_disabled.sent", true],
            _raw: "set_field: w_safe_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_safe_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "62",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 62 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_safe_disabled.sent",
              },
            },
            _raw: "get_field | w_safe_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_crisis_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_disabled", false],
            _raw: "set_field: w_crisis_disabled : FALSE",
            _cleaned: "click | set_field: w_crisis_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_disabled.sent", true],
            _raw: "set_field: w_crisis_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_crisis_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "69",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 69 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_crisis_disabled.sent",
              },
            },
            _raw: "get_field | w_crisis_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
      {
        id: "w_celebrate_disabled",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_celebrate_disabled", false],
            _raw: "set_field: w_celebrate_disabled : FALSE",
            _cleaned: "click | set_field: w_celebrate_disabled : FALSE",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_celebrate_disabled.sent", true],
            _raw: "set_field: w_celebrate_disabled.sent : TRUE",
            _cleaned: "click | set_field: w_celebrate_disabled.sent : TRUE",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "db_lookup",
            condition_args: {
              db_lookup: {
                table_id: "app_events",
                filter: {
                  field: "event_id",
                  value: "app_launch",
                },
                order: "asc",
                evaluate: {
                  operator: ">",
                  value: "76",
                  unit: "day",
                },
              },
            },
            _raw: "first_launch | before : 76 : day",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "w_celebrate_disabled.sent",
              },
            },
            _raw: "get_field | w_celebrate_disabled.sent : TRUE",
          },
        ],
        campaign_list: ["unlock_workshops"],
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/campaigns/campaign_unlock_workshops.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "m_inactive_data",
    status: "released",
    rows: [
      {
        id: "inactive_0",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["inactive_0.sent", true],
            _raw: "set_field: inactive_0.sent : true",
            _cleaned: "click | set_field: inactive_0.sent : true",
          },
        ],
        priority: 0,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                evaluate: "inactive_0.sent",
              },
            },
            _raw: "get_field | inactive_0.sent : true",
          },
        ],
        campaign_list: ["m_inactive_campaign"],
        notification_schedule: {
          title: "New message from PLH",
          text: "Welcome to ParentApp. Click here to start your journey!",
          time: {
            hour: "19",
            minute: "30",
          },
          delay: {
            days: "0",
          },
        },
        title: "New message from PLH",
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Welcome to ParentApp. Click here to start your journey!",
          },
        },
        text: "Welcome to ParentApp. Click here to start your journey!",
      },
      {
        id: "inactive_1",
        priority: 1,
        campaign_list: ["m_inactive_campaign"],
        notification_schedule: {
          title: "New message from PLH",
          text: "Hope you are feeling OK. Parenting is hard, but it’s never too late to start again with your teenager. Your first parenting workshop is ready for you! Click here to start your ParentApp journey!",
          time: {
            hour: "19",
            minute: "30",
          },
          delay: {
            days: "7",
          },
        },
        title: "New message from PLH",
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hope you are feeling OK. Parenting is hard, but it’s never too late to start again with your teenager. Your first parenting workshop is ready for you! Click here to start your ParentApp journey!",
          },
        },
        text: "Hope you are feeling OK. Parenting is hard, but it’s never too late to start again with your teenager. Your first parenting workshop is ready for you! Click here to start your ParentApp journey!",
      },
      {
        id: "inactive_2",
        priority: 2,
        campaign_list: ["m_inactive_campaign"],
        notification_schedule: {
          title: "New message from PLH",
          text: "Hi! Is everything OK? It seems you haven’t opened ParentApp lately. Why don’t you give it a try? Millions of parents have found these materials helpful. We are still here to support you.",
          time: {
            hour: "19",
            minute: "30",
          },
          delay: {
            days: "30",
          },
        },
        title: "New message from PLH",
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hi! Is everything OK? It seems you haven’t opened ParentApp lately. Why don’t you give it a try? Millions of parents have found these materials helpful. We are still here to support you. ",
          },
        },
        text: "Hi! Is everything OK? It seems you haven’t opened ParentApp lately. Why don’t you give it a try? Millions of parents have found these materials helpful. We are still here to support you. ",
      },
      {
        id: "inactive_3",
        priority: -1,
        campaign_list: ["m_inactive_campaign"],
        notification_schedule: {
          title: "New message from PLH",
          text: "Hello again! It’s never too late to use ParentApp and get tailored parenting support. Why don’t you give it a try when you are commuting to work or when the food is cooking? Millions of parents found our materials helpful.",
          time: {
            hour: "19",
            minute: "30",
          },
          delay: {
            days: "30",
          },
        },
        title: "New message from PLH",
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hello again! It’s never too late to use ParentApp and get tailored parenting support. Why don’t you give it a try when you are commuting to work or when the food is cooking? Millions of parents found our materials helpful.",
          },
        },
        text: "Hello again! It’s never too late to use ParentApp and get tailored parenting support. Why don’t you give it a try when you are commuting to work or when the food is cooking? Millions of parents found our materials helpful.",
      },
      {
        id: "inactive_4",
        priority: -2,
        campaign_list: ["m_inactive_campaign"],
        notification_schedule: {
          title: "New message from PLH",
          text: "ParentApp misses you! There is a lot to explore. We are still here to support you.",
          time: {
            hour: "19",
            minute: "30",
          },
          delay: {
            days: "30",
          },
        },
        title: "New message from PLH",
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "ParentApp misses you! There is a lot to explore. We are still here to support you. ",
          },
        },
        text: "ParentApp misses you! There is a lot to explore. We are still here to support you. ",
      },
      {
        id: "inactive_5",
        priority: -3,
        campaign_list: ["m_inactive_campaign"],
        notification_schedule: {
          title: "New message from PLH",
          text: "Hope you are feeling OK. We know parenting is hard - use ParentApp to help you manage parenting stress.",
          time: {
            hour: "19",
            minute: "30",
          },
          delay: {
            days: "30",
          },
        },
        title: "New message from PLH",
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hope you are feeling OK. We know parenting is hard - use ParentApp to help you manage parenting stress.",
          },
        },
        text: "Hope you are feeling OK. We know parenting is hard - use ParentApp to help you manage parenting stress.",
      },
      {
        id: "inactive_6",
        priority: -4,
        campaign_list: ["m_inactive_campaign"],
        notification_schedule: {
          title: "New message from PLH",
          text: "Hope you are feeling OK. We know parenting is hard - use ParentApp to prepare your teen for success in life.",
          time: {
            hour: "19",
            minute: "30",
          },
          delay: {
            days: "30",
          },
        },
        title: "New message from PLH",
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hope you are feeling OK. We know parenting is hard - use ParentApp to prepare your teen for success in life.",
          },
        },
        text: "Hope you are feeling OK. We know parenting is hard - use ParentApp to prepare your teen for success in life.",
      },
      {
        id: "inactive_7",
        priority: -5,
        campaign_list: ["m_inactive_campaign"],
        notification_schedule: {
          title: "New message from PLH",
          text: "Hope you are feeling OK. We know parenting is hard - use ParentApp to help you manage your teen's behaviour.",
          time: {
            hour: "19",
            minute: "30",
          },
          delay: {
            days: "30",
          },
        },
        title: "New message from PLH",
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hope you are feeling OK. We know parenting is hard - use ParentApp to help you manage your teen's behaviour.",
          },
        },
        text: "Hope you are feeling OK. We know parenting is hard - use ParentApp to help you manage your teen's behaviour.",
      },
      {
        id: "inactive_8",
        priority: -6,
        campaign_list: ["m_inactive_campaign"],
        notification_schedule: {
          title: "New message from PLH",
          text: "Hope you are feeling OK. We know parenting is hard - use ParentApp to bond with your teen again!",
          time: {
            hour: "19",
            minute: "30",
          },
          delay: {
            days: "30",
          },
        },
        title: "New message from PLH",
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hope you are feeling OK. We know parenting is hard - use ParentApp to bond with your teen again!",
          },
        },
        text: "Hope you are feeling OK. We know parenting is hard - use ParentApp to bond with your teen again!",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/campaigns/no_app_activity.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
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
                evaluate: "debug_reminder_default.sent",
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
                evaluate: "debug_reminder_1.sent",
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
                evaluate: "debug_reminder_1.sent",
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
                evaluate: "debug_reminder_2.sent",
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
                filter: {
                  field: "debug_reminder_2.sent",
                  value: "TRUE",
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
                evaluate: "debug_reminder_3.sent",
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
                filter: {
                  field: "event_id",
                  value: "app_launch",
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
                evaluate: "debug_reminder_5.sent",
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
                evaluate: "debug_reminder_5.sent",
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
                evaluate: "debug_reminder_6.sent",
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
                evaluate: "debug_reminder_6.sent",
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
                evaluate: "debug_reminder_7.sent",
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
    flow_subtype: "campaign_rows",
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
                filter: {
                  field: "event_id",
                  value: "app_launch",
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
                evaluate: "disabled_2.sent",
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
                filter: {
                  field: "event_id",
                  value: "app_launch",
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
                evaluate: "disabled_3.sent",
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
                filter: {
                  field: "event_id",
                  value: "app_launch",
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
                evaluate: "disabled_4.sent",
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
                filter: {
                  field: "event_id",
                  value: "app_launch",
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
                evaluate: "disabled_5.sent",
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
                filter: {
                  field: "w_self_care_started",
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
                evaluate: "disabled_6.sent",
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
                filter: {
                  field: "w_self_care_started",
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
                evaluate: "disabled_7.sent",
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
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "example_notifications_list",
    status: "released",
    rows: [
      {
        id: "example_notification_1",
        priority: 1,
        campaign_list: ["example_notifications"],
        notification_schedule: {
          title: "New message from PLH",
          text: "Example text. Ideally this should be 40-50 characters",
          delay: {
            minutes: "2",
          },
        },
        title: "New message from PLH",
        text: "Example text. Ideally this should be 40-50 characters",
        message_length: 53,
      },
      {
        id: "example_notification_2",
        priority: 2,
        campaign_list: ["example_notifications"],
        notification_schedule: {
          title: "New message from PLH",
          text: "There is no maximum text length, but some longer messages can get cut off.\n\nTypically around on 150-230 IOS and on 450-650 Android",
          time: {
            hour: "19",
            minute: "30",
          },
          delay: {
            days: "7",
          },
        },
        title: "New message from PLH",
        text: "There is no maximum text length, but some longer messages can get cut off.\n\nTypically around on 150-230 IOS and on 450-650 Android",
        message_length: 130,
      },
      {
        id: "example_notification_3",
        priority: 3,
        campaign_list: ["example_notifications"],
        notification_schedule: {
          time: {
            hour: "1",
            minute: "10",
          },
          delay: {
            days: "2",
            hours: "4",
            minutes: "30",
          },
        },
        text: "Text needs to be included in the notification_schedule column. This will not be used otherwise",
      },
      {
        id: "example_notification_4",
        notification_schedule: {
          text: "TODO - text examples with conditions based on fields or previous notifications",
          delay: {
            minutes: "1",
          },
        },
        text: "TODO - text examples with conditions based on fields or previous notifications",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_notifications.xlsx",
  },
];
export default data_list;
