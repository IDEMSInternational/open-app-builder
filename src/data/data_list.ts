/* eslint-disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const data_list: FlowTypes.Data_list[] = [
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "campaign_home_screen",
    "status": "released",
    "rows": [
      {
        "id": "default",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "default.sent",
              true
            ],
            "_raw": "set_field: default.sent : true",
            "_cleaned": "click | set_field: default.sent : true"
          }
        ],
        "priority": -1,
        "campaign_list": [
          "weekly_workshops",
          "parent_points",
          "parent_centre"
        ],
        "icon": "plh_images/icons/play_white.svg"
      },
      {
        "id": "w_self_care_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_5"
            ],
            "_raw": "set_field: which_relax : relax_5",
            "_cleaned": "click | set_field: which_relax : relax_5"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_self_care_relax.sent",
              true
            ],
            "_raw": "set_field: w_self_care_relax.sent : true",
            "_cleaned": "click | set_field: w_self_care_relax.sent : true"
          }
        ],
        "priority": 0.1,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_completed"
              }
            },
            "_raw": "get_field | w_self_care_completed : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_relax.sent"
              }
            },
            "_raw": "get_field | w_self_care_relax.sent : true | before : 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 6 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "welcome_survey_quick_start",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "setup_and_survey_stepper"
            ],
            "_raw": "go_to: setup_and_survey_stepper",
            "_cleaned": "click | go_to: setup_and_survey_stepper"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "welcome_survey_quick_start.sent",
              true
            ],
            "_raw": "set_field: welcome_survey_quick_start.sent : true",
            "_cleaned": "click | set_field: welcome_survey_quick_start.sent : true"
          }
        ],
        "priority": 0.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_started"
              }
            },
            "_raw": "get_field | w_self_care_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "survey_completed"
              }
            },
            "_raw": "get_field | survey_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/phone_heart_white.svg"
      },
      {
        "id": "w_self_care_m_workshop_tomorrow",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_self_care_m_workshop_tomorrow"
            ],
            "_raw": "pop_up: w_self_care_m_workshop_tomorrow",
            "_cleaned": "click | pop_up: w_self_care_m_workshop_tomorrow"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_self_care_m_workshop_tomorrow.sent",
              true
            ],
            "_raw": "set_field: w_self_care_m_workshop_tomorrow.sent : true",
            "_cleaned": "click | set_field: w_self_care_m_workshop_tomorrow.sent : true"
          }
        ],
        "priority": 0.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "5",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 5 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_m_workshop_tomorrow.sent"
              }
            },
            "_raw": "get_field | w_self_care_m_workshop_tomorrow.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_self_care_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_self_care_m_hp_reminder"
            ],
            "_raw": "pop_up: w_self_care_m_hp_reminder",
            "_cleaned": "click | pop_up: w_self_care_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_self_care_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_self_care_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_self_care_m_hp_reminder.sent : true"
          }
        ],
        "priority": 0.8,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_completed"
              }
            },
            "_raw": "get_field : first | w_self_care_completed: true | before: 3 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_self_care_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_self_care_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_self_care_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_self_care_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_self_care_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 0.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "5",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 5 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_self_care_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      },
      {
        "id": "w_1on1_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_2"
            ],
            "_raw": "set_field: which_relax : relax_2",
            "_cleaned": "click | set_field: which_relax : relax_2"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_relax.sent",
              true
            ],
            "_raw": "set_field: w_1on1_relax.sent : true",
            "_cleaned": "click | set_field: w_1on1_relax.sent : true"
          }
        ],
        "priority": 1.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 6 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_relax.sent"
              }
            },
            "_raw": "get_field | w_1on1_relax.sent : true | before : 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 13 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_1on1_m_workshop_released_individual",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_1on1_m_workshop_released"
            ],
            "_raw": "pop_up: w_1on1_m_workshop_released",
            "_cleaned": "click | pop_up: w_1on1_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_1on1_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_1on1_m_workshop_released.sent : true"
          }
        ],
        "priority": 1.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: false"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 6 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_started"
              }
            },
            "_raw": "get_field | w_1on1_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_1on1_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_1on1_m_workshop_released_together",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_1on1_m_workshop_released"
            ],
            "_raw": "pop_up: w_1on1_m_workshop_released",
            "_cleaned": "click | pop_up: w_1on1_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_1on1_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_1on1_m_workshop_released.sent : true"
          }
        ],
        "priority": 1.3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: true"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 6 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_started"
              }
            },
            "_raw": "get_field | w_1on1_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_1on1_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_1on1_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_1on1_m_something_fun"
            ],
            "_raw": "pop_up: w_1on1_m_something_fun",
            "_cleaned": "click | pop_up: w_1on1_m_something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_1on1_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_1on1_m_something_fun.sent : true"
          }
        ],
        "priority": 1.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "7",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 7 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_m_something_fun.sent"
              }
            },
            "_raw": "get_field | w_1on1_m_something_fun.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_1on1_m_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_1on1_m_praise"
            ],
            "_raw": "pop_up: w_1on1_m_praise",
            "_cleaned": "click | pop_up: w_1on1_m_praise"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_m_praise.sent",
              true
            ],
            "_raw": "set_field: w_1on1_m_praise.sent : true",
            "_cleaned": "click | set_field: w_1on1_m_praise.sent : true"
          }
        ],
        "priority": 1.5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "8",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 8 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_m_praise.sent"
              }
            },
            "_raw": "get_field | w_1on1_m_praise.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_completed"
              }
            },
            "_raw": "get_field | w_1on1_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/heart_white.svg"
      },
      {
        "id": "w_1on1_m_workshop_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_1on1_m_workshop_reminder"
            ],
            "_raw": "pop_up: w_1on1_m_workshop_reminder",
            "_cleaned": "click | pop_up: w_1on1_m_workshop_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_m_workshop_reminder.sent",
              true
            ],
            "_raw": "set_field: w_1on1_m_workshop_reminder.sent : true",
            "_cleaned": "click | set_field: w_1on1_m_workshop_reminder.sent : true"
          }
        ],
        "priority": 1.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "9",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 9 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_started"
              }
            },
            "_raw": "get_field | w_1on1_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_m_workshop_reminder.sent"
              }
            },
            "_raw": "get_field | w_1on1_m_workshop_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_1on1_m_workshop_in_progress",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_1on1_m_workshop_in_progress"
            ],
            "_raw": "pop_up: w_1on1_m_workshop_in_progress",
            "_cleaned": "click | pop_up: w_1on1_m_workshop_in_progress"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_m_workshop_in_progress.sent",
              true
            ],
            "_raw": "set_field: w_1on1_m_workshop_in_progress.sent : true",
            "_cleaned": "click | set_field: w_1on1_m_workshop_in_progress.sent : true"
          }
        ],
        "priority": 1.7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "9",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 9 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_m_workshop_in_progress.sent"
              }
            },
            "_raw": "get_field | w_1on1_m_workshop_in_progress.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_started"
              }
            },
            "_raw": "get_field | w_1on1_started : false"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_completed"
              }
            },
            "_raw": "get_field | w_1on1_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_1on1_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_1on1_m_hp_reminder"
            ],
            "_raw": "pop_up: w_1on1_m_hp_reminder",
            "_cleaned": "click | pop_up: w_1on1_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_1on1_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_1on1_m_hp_reminder.sent : true"
          }
        ],
        "priority": 1.8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "9",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 9 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_completed"
              }
            },
            "_raw": "get_field | w_1on1_completed: true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_1on1_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_1on1_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_1on1_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_1on1_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 1.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "12",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 12 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_1on1_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      },
      {
        "id": "w_praise_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_3"
            ],
            "_raw": "set_field: which_relax : relax_3",
            "_cleaned": "click | set_field: which_relax : relax_3"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_relax.sent",
              true
            ],
            "_raw": "set_field: w_praise_relax.sent : true",
            "_cleaned": "click | set_field: w_praise_relax.sent : true"
          }
        ],
        "priority": 2.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 13 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_relax.sent"
              }
            },
            "_raw": "get_field | w_praise_relax.sent : true | before : 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 20 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_praise_m_workshop_released_individual",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_praise_m_workshop_released"
            ],
            "_raw": "pop_up: w_praise_m_workshop_released",
            "_cleaned": "click | pop_up: w_praise_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_praise_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_praise_m_workshop_released.sent : true"
          }
        ],
        "priority": 2.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: false"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 13 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_started"
              }
            },
            "_raw": "get_field | w_praise_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_praise_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_praise_m_workshop_released_together",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_praise_m_workshop_released"
            ],
            "_raw": "pop_up: w_praise_m_workshop_released",
            "_cleaned": "click | pop_up: w_praise_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_praise_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_praise_m_workshop_released.sent : true"
          }
        ],
        "priority": 2.3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: true"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 13 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_praise_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_praise_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_praise_m_something_fun"
            ],
            "_raw": "pop_up: w_praise_m_something_fun",
            "_cleaned": "click | pop_up: w_praise_m_something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_praise_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_praise_m_something_fun.sent : true"
          }
        ],
        "priority": 2.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "14",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 14 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_m_something_fun.sent"
              }
            },
            "_raw": "get_field | w_praise_m_something_fun.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_praise_m_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_praise_m_praise"
            ],
            "_raw": "pop_up: w_praise_m_praise",
            "_cleaned": "click | pop_up: w_praise_m_praise"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_m_praise.sent",
              true
            ],
            "_raw": "set_field: w_praise_m_praise.sent : true",
            "_cleaned": "click | set_field: w_praise_m_praise.sent : true"
          }
        ],
        "priority": 2.5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "15",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 15 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_m_praise.sent"
              }
            },
            "_raw": "get_field | w_praise_m_praise.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/heart_white.svg"
      },
      {
        "id": "w_praise_m_workshop_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_praise_m_workshop_reminder"
            ],
            "_raw": "pop_up: w_praise_m_workshop_reminder",
            "_cleaned": "click | pop_up: w_praise_m_workshop_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_m_workshop_reminder.sent",
              true
            ],
            "_raw": "set_field: w_praise_m_workshop_reminder.sent : true",
            "_cleaned": "click | set_field: w_praise_m_workshop_reminder.sent : true"
          }
        ],
        "priority": 2.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "16",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 16 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_started"
              }
            },
            "_raw": "get_field | w_praise_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_m_workshop_reminder.sent"
              }
            },
            "_raw": "get_field | w_praise_m_workshop_reminder.sent : true | before : 1 : day"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_praise_m_workshop_in_pro",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_praise_m_workshop_in_pro"
            ],
            "_raw": "pop_up: w_praise_m_workshop_in_pro",
            "_cleaned": "click | pop_up: w_praise_m_workshop_in_pro"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_m_workshop_in_pro.sent",
              true
            ],
            "_raw": "set_field: w_praise_m_workshop_in_pro.sent : true",
            "_cleaned": "click | set_field: w_praise_m_workshop_in_pro.sent : true"
          }
        ],
        "priority": 2.7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "16",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 16 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_m_workshop_in_pro.sent"
              }
            },
            "_raw": "get_field | w_praise_m_workshop_in_pro.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_started"
              }
            },
            "_raw": "get_field | w_praise_started : false"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_completed"
              }
            },
            "_raw": "get_field | w_praise_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_praise_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_praise_m_hp_reminder"
            ],
            "_raw": "pop_up: w_praise_m_hp_reminder",
            "_cleaned": "click | pop_up: w_praise_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_praise_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_praise_m_hp_reminder.sent : true"
          }
        ],
        "priority": 2.8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "16",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 16 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_completed"
              }
            },
            "_raw": "get_field | w_praise_completed: true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_praise_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_praise_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_praise_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_praise_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 2.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "19",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 19 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_praise_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      },
      {
        "id": "w_instruct_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_4"
            ],
            "_raw": "set_field: which_relax : relax_4",
            "_cleaned": "click | set_field: which_relax : relax_4"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_relax.sent",
              true
            ],
            "_raw": "set_field: w_instruct_relax.sent : true",
            "_cleaned": "click | set_field: w_instruct_relax.sent : true"
          }
        ],
        "priority": 3.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 20 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_relax.sent"
              }
            },
            "_raw": "get_field | w_instruct_relax.sent : true | within: 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 27 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_instruct_m_workshop_released_individual",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_instruct_m_workshop_released"
            ],
            "_raw": "pop_up: w_instruct_m_workshop_released",
            "_cleaned": "click | pop_up: w_instruct_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_instruct_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_instruct_m_workshop_released.sent : true"
          }
        ],
        "priority": 3.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: false"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 20 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_started"
              }
            },
            "_raw": "get_field | w_instruct_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_instruct_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_instruct_m_workshop_released_together",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_instruct_m_workshop_released"
            ],
            "_raw": "pop_up: w_instruct_m_workshop_released",
            "_cleaned": "click | pop_up: w_instruct_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_instruct_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_instruct_m_workshop_released.sent : true"
          }
        ],
        "priority": 3.3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: true"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 20 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_started"
              }
            },
            "_raw": "get_field | w_instruct_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_instruct_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_instruct_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_instruct_m_something_fun"
            ],
            "_raw": "pop_up: w_instruct_m_something_fun",
            "_cleaned": "click | pop_up: w_instruct_m_something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_instruct_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_instruct_m_something_fun.sent : true"
          }
        ],
        "priority": 3.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "21",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 21 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_m_something_fun.sent"
              }
            },
            "_raw": "get_field | w_instruct_m_something_fun.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_instruct_m_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_instruct_m_praise"
            ],
            "_raw": "pop_up: w_instruct_m_praise",
            "_cleaned": "click | pop_up: w_instruct_m_praise"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_m_praise.sent",
              true
            ],
            "_raw": "set_field: w_instruct_m_praise.sent : true",
            "_cleaned": "click | set_field: w_instruct_m_praise.sent : true"
          }
        ],
        "priority": 3.5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "22",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 22 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_m_praise.sent"
              }
            },
            "_raw": "get_field | w_instruct_m_praise.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/heart_white.svg"
      },
      {
        "id": "w_instruct_m_workshop_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_instruct_m_workshop_reminder"
            ],
            "_raw": "pop_up: w_instruct_m_workshop_reminder",
            "_cleaned": "click | pop_up: w_instruct_m_workshop_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_m_workshop_reminder.sent",
              true
            ],
            "_raw": "set_field: w_instruct_m_workshop_reminder.sent : true",
            "_cleaned": "click | set_field: w_instruct_m_workshop_reminder.sent : true"
          }
        ],
        "priority": 3.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "23",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 23 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_started"
              }
            },
            "_raw": "get_field | w_instruct_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_m_workshop_reminder.sent"
              }
            },
            "_raw": "get_field | w_instruct_m_workshop_reminder.sent : true | before : 1 : day"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_instruct_m_workshop_in_pro",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_instruct_m_workshop_in_pro"
            ],
            "_raw": "pop_up: w_instruct_m_workshop_in_pro",
            "_cleaned": "click | pop_up: w_instruct_m_workshop_in_pro"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_m_workshop_in_pro.sent",
              true
            ],
            "_raw": "set_field: w_instruct_m_workshop_in_pro.sent : true",
            "_cleaned": "click | set_field: w_instruct_m_workshop_in_pro.sent : true"
          }
        ],
        "priority": 3.7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "23",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 23 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_m_workshop_in_pro.sent"
              }
            },
            "_raw": "get_field | w_instruct_m_workshop_in_pro.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_started"
              }
            },
            "_raw": "get_field | w_instruct_started : false"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_completed"
              }
            },
            "_raw": "get_field | w_instruct_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_instruct_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_instruct_m_hp_reminder"
            ],
            "_raw": "pop_up: w_instruct_m_hp_reminder",
            "_cleaned": "click | pop_up: w_instruct_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_instruct_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_instruct_m_hp_reminder.sent : true"
          }
        ],
        "priority": 3.8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "23",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 23 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_completed"
              }
            },
            "_raw": "get_field | w_instruct_completed: true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_instruct_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_instruct_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_instruct_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_instruct_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 3.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "26",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 26 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_instruct_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      },
      {
        "id": "w_stress_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_7"
            ],
            "_raw": "set_field: which_relax : relax_7",
            "_cleaned": "click | set_field: which_relax : relax_7"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_relax.sent",
              true
            ],
            "_raw": "set_field: w_stress_relax.sent : true",
            "_cleaned": "click | set_field: w_stress_relax.sent : true"
          }
        ],
        "priority": 4.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_relax.sent"
              }
            },
            "_raw": "get_field | w_stress_relax.sent : true | within : 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_stress_m_workshop_released_individual",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_stress_m_workshop_released"
            ],
            "_raw": "pop_up: w_stress_m_workshop_released",
            "_cleaned": "click | pop_up: w_stress_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_stress_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_stress_m_workshop_released.sent : true"
          }
        ],
        "priority": 4.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: false"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_started"
              }
            },
            "_raw": "get_field | w_stress_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_stress_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_stress_m_workshop_released_together",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_stress_m_workshop_released"
            ],
            "_raw": "pop_up: w_stress_m_workshop_released",
            "_cleaned": "click | pop_up: w_stress_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_stress_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_stress_m_workshop_released.sent : true"
          }
        ],
        "priority": 4.3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: true"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_started"
              }
            },
            "_raw": "get_field | w_stress_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_stress_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_stress_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_stress_m_something_fun"
            ],
            "_raw": "pop_up: w_stress_m_something_fun",
            "_cleaned": "click | pop_up: w_stress_m_something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_stress_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_stress_m_something_fun.sent : true"
          }
        ],
        "priority": 4.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "28",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 28 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_m_something_fun.sent"
              }
            },
            "_raw": "get_field | w_stress_m_something_fun.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_stress_m_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_stress_m_praise"
            ],
            "_raw": "pop_up: w_stress_m_praise",
            "_cleaned": "click | pop_up: w_stress_m_praise"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_m_praise.sent",
              true
            ],
            "_raw": "set_field: w_stress_m_praise.sent : true",
            "_cleaned": "click | set_field: w_stress_m_praise.sent : true"
          }
        ],
        "priority": 4.5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "29",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 29 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_m_praise.sent"
              }
            },
            "_raw": "get_field | w_stress_m_praise.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/heart_white.svg"
      },
      {
        "id": "w_stress_m_workshop_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_stress_m_workshop_reminder"
            ],
            "_raw": "pop_up: w_stress_m_workshop_reminder",
            "_cleaned": "click | pop_up: w_stress_m_workshop_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_m_workshop_reminder.sent",
              true
            ],
            "_raw": "set_field: w_stress_m_workshop_reminder.sent : true",
            "_cleaned": "click | set_field: w_stress_m_workshop_reminder.sent : true"
          }
        ],
        "priority": 4.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_started"
              }
            },
            "_raw": "get_field | w_stress_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_m_workshop_reminder.sent"
              }
            },
            "_raw": "get_field | w_stress_m_workshop_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_stress_m_workshop_in_progress",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_stress_m_workshop_in_progress"
            ],
            "_raw": "pop_up: w_stress_m_workshop_in_progress",
            "_cleaned": "click | pop_up: w_stress_m_workshop_in_progress"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_m_workshop_in_progress.sent",
              true
            ],
            "_raw": "set_field: w_stress_m_workshop_in_progress.sent : true",
            "_cleaned": "click | set_field: w_stress_m_workshop_in_progress.sent : true"
          }
        ],
        "priority": 4.7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_m_workshop_in_progress.sent"
              }
            },
            "_raw": "get_field | w_stress_m_workshop_in_progress.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_started"
              }
            },
            "_raw": "get_field | w_stress_started : false"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_completed"
              }
            },
            "_raw": "get_field | w_stress_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_stress_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_stress_m_hp_reminder"
            ],
            "_raw": "pop_up: w_stress_m_hp_reminder",
            "_cleaned": "click | pop_up: w_stress_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_stress_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_stress_m_hp_reminder.sent : true"
          }
        ],
        "priority": 4.8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_completed"
              }
            },
            "_raw": "get_field | w_stress_completed: true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_stress_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_stress_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_stress_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_stress_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 4.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_stress_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      },
      {
        "id": "w_money_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_8"
            ],
            "_raw": "set_field: which_relax : relax_8",
            "_cleaned": "click | set_field: which_relax : relax_8"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_relax.sent",
              true
            ],
            "_raw": "set_field: w_money_relax.sent : true",
            "_cleaned": "click | set_field: w_money_relax.sent : true"
          }
        ],
        "priority": 5.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_relax.sent"
              }
            },
            "_raw": "get_field | w_money_relax.sent : true | within: 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_money_m_workshop_released_individual",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_money_m_workshop_released"
            ],
            "_raw": "pop_up: w_money_m_workshop_released",
            "_cleaned": "click | pop_up: w_money_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_money_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_money_m_workshop_released.sent : true"
          }
        ],
        "priority": 5.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: false"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_started"
              }
            },
            "_raw": "get_field | w_money_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_money_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_money_m_workshop_released_together",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_money_m_workshop_released"
            ],
            "_raw": "pop_up: w_money_m_workshop_released",
            "_cleaned": "click | pop_up: w_money_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_money_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_money_m_workshop_released.sent : true"
          }
        ],
        "priority": 5.3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: true"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_started"
              }
            },
            "_raw": "get_field | w_money_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_money_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_money_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_money_m_something_fun"
            ],
            "_raw": "pop_up: w_money_m_something_fun",
            "_cleaned": "click | pop_up: w_money_m_something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_money_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_money_m_something_fun.sent : true"
          }
        ],
        "priority": 5.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "28",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 28 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_m_something_fun.sent"
              }
            },
            "_raw": "get_field | w_money_m_something_fun.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_money_m_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_money_m_praise"
            ],
            "_raw": "pop_up: w_money_m_praise",
            "_cleaned": "click | pop_up: w_money_m_praise"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_m_praise.sent",
              true
            ],
            "_raw": "set_field: w_money_m_praise.sent : true",
            "_cleaned": "click | set_field: w_money_m_praise.sent : true"
          }
        ],
        "priority": 5.5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "29",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 29 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_m_praise.sent"
              }
            },
            "_raw": "get_field | w_money_m_praise.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/heart_white.svg"
      },
      {
        "id": "w_money_m_workshop_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_money_m_workshop_reminder"
            ],
            "_raw": "pop_up: w_money_m_workshop_reminder",
            "_cleaned": "click | pop_up: w_money_m_workshop_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_m_workshop_reminder.sent",
              true
            ],
            "_raw": "set_field: w_money_m_workshop_reminder.sent : true",
            "_cleaned": "click | set_field: w_money_m_workshop_reminder.sent : true"
          }
        ],
        "priority": 5.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_started"
              }
            },
            "_raw": "get_field | w_money_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_m_workshop_reminder.sent"
              }
            },
            "_raw": "get_field | w_money_m_workshop_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_money_m_workshop_in_progress",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_money_m_workshop_in_progress"
            ],
            "_raw": "pop_up: w_money_m_workshop_in_progress",
            "_cleaned": "click | pop_up: w_money_m_workshop_in_progress"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_m_workshop_in_progress.sent",
              true
            ],
            "_raw": "set_field: w_money_m_workshop_in_progress.sent : true",
            "_cleaned": "click | set_field: w_money_m_workshop_in_progress.sent : true"
          }
        ],
        "priority": 5.7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_m_workshop_in_progress.sent"
              }
            },
            "_raw": "get_field | w_money_m_workshop_in_progress.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_started"
              }
            },
            "_raw": "get_field | w_money_started : false"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_completed"
              }
            },
            "_raw": "get_field | w_money_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_money_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_money_m_hp_reminder"
            ],
            "_raw": "pop_up: w_money_m_hp_reminder",
            "_cleaned": "click | pop_up: w_money_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_money_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_money_m_hp_reminder.sent : true"
          }
        ],
        "priority": 5.8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_completed"
              }
            },
            "_raw": "get_field | w_money_completed: true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_money_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_money_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_money_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_money_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 5.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_money_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      },
      {
        "id": "w_rules_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_9"
            ],
            "_raw": "set_field: which_relax : relax_9",
            "_cleaned": "click | set_field: which_relax : relax_9"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_relax.sent",
              true
            ],
            "_raw": "set_field: w_rules_relax.sent : true",
            "_cleaned": "click | set_field: w_rules_relax.sent : true"
          }
        ],
        "priority": 6.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_relax.sent"
              }
            },
            "_raw": "get_field | w_rules_relax.sent : true | within: 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_rules_m_workshop_released_individual",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_rules_m_workshop_released"
            ],
            "_raw": "pop_up: w_rules_m_workshop_released",
            "_cleaned": "click | pop_up: w_rules_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_rules_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_rules_m_workshop_released.sent : true"
          }
        ],
        "priority": 6.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: false"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_rules_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_rules_m_workshop_released_together",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_rules_m_workshop_released"
            ],
            "_raw": "pop_up: w_rules_m_workshop_released",
            "_cleaned": "click | pop_up: w_rules_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_rules_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_rules_m_workshop_released.sent : true"
          }
        ],
        "priority": 6.3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: true"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_rules_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_rules_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_rules_m_something_fun"
            ],
            "_raw": "pop_up: w_rules_m_something_fun",
            "_cleaned": "click | pop_up: w_rules_m_something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_rules_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_rules_m_something_fun.sent : true"
          }
        ],
        "priority": 6.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "28",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 28 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_m_something_fun.sent"
              }
            },
            "_raw": "get_field | w_rules_m_something_fun.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_rules_m_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_rules_m_praise"
            ],
            "_raw": "pop_up: w_rules_m_praise",
            "_cleaned": "click | pop_up: w_rules_m_praise"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_m_praise.sent",
              true
            ],
            "_raw": "set_field: w_rules_m_praise.sent : true",
            "_cleaned": "click | set_field: w_rules_m_praise.sent : true"
          }
        ],
        "priority": 6.5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "29",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 29 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_m_praise.sent"
              }
            },
            "_raw": "get_field | w_rules_m_praise.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/heart_white.svg"
      },
      {
        "id": "w_rules_m_workshop_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_rules_m_workshop_reminder"
            ],
            "_raw": "pop_up: w_rules_m_workshop_reminder",
            "_cleaned": "click | pop_up: w_rules_m_workshop_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_m_workshop_reminder.sent",
              true
            ],
            "_raw": "set_field: w_rules_m_workshop_reminder.sent : true",
            "_cleaned": "click | set_field: w_rules_m_workshop_reminder.sent : true"
          }
        ],
        "priority": 6.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_started"
              }
            },
            "_raw": "get_field | w_rules_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_m_workshop_reminder.sent"
              }
            },
            "_raw": "get_field | w_rules_m_workshop_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_rules_m_workshop_in_progress",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_rules_m_workshop_in_progress"
            ],
            "_raw": "pop_up: w_rules_m_workshop_in_progress",
            "_cleaned": "click | pop_up: w_rules_m_workshop_in_progress"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_m_workshop_in_progress.sent",
              true
            ],
            "_raw": "set_field: w_rules_m_workshop_in_progress.sent : true",
            "_cleaned": "click | set_field: w_rules_m_workshop_in_progress.sent : true"
          }
        ],
        "priority": 6.7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_m_workshop_in_progress.sent"
              }
            },
            "_raw": "get_field | w_rules_m_workshop_in_progress.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_started"
              }
            },
            "_raw": "get_field | w_rules_started : false"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_completed"
              }
            },
            "_raw": "get_field | w_rules_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_rules_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_rules_m_hp_reminder"
            ],
            "_raw": "pop_up: w_rules_m_hp_reminder",
            "_cleaned": "click | pop_up: w_rules_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_rules_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_rules_m_hp_reminder.sent : true"
          }
        ],
        "priority": 6.8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_completed"
              }
            },
            "_raw": "get_field | w_rules_completed: true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_rules_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_rules_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_rules_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_rules_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 6.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_rules_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      },
      {
        "id": "w_consequence_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_10"
            ],
            "_raw": "set_field: which_relax : relax_10",
            "_cleaned": "click | set_field: which_relax : relax_10"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_relax.sent",
              true
            ],
            "_raw": "set_field: w_consequence_relax.sent : true",
            "_cleaned": "click | set_field: w_consequence_relax.sent : true"
          }
        ],
        "priority": 7.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_relax.sent"
              }
            },
            "_raw": "get_field | w_consequence_relax.sent : true | within: 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_consequence_m_workshop_released_individual",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_consequence_m_workshop_rel"
            ],
            "_raw": "pop_up: w_consequence_m_workshop_rel",
            "_cleaned": "click | pop_up: w_consequence_m_workshop_rel"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_m_workshop_rel.sent",
              true
            ],
            "_raw": "set_field: w_consequence_m_workshop_rel.sent : true",
            "_cleaned": "click | set_field: w_consequence_m_workshop_rel.sent : true"
          }
        ],
        "priority": 7.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: false"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_m_workshop_rel.sent"
              }
            },
            "_raw": "get_field | w_consequence_m_workshop_rel.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_consequence_m_workshop_released_together",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_consequence_m_workshop_rel"
            ],
            "_raw": "pop_up: w_consequence_m_workshop_rel",
            "_cleaned": "click | pop_up: w_consequence_m_workshop_rel"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_m_workshop_rel.sent",
              true
            ],
            "_raw": "set_field: w_consequence_m_workshop_rel.sent : true",
            "_cleaned": "click | set_field: w_consequence_m_workshop_rel.sent : true"
          }
        ],
        "priority": 7.3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: true"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_m_workshop_rel.sent"
              }
            },
            "_raw": "get_field | w_consequence_m_workshop_rel.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_consequence_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_consequence_m_something_fun"
            ],
            "_raw": "pop_up: w_consequence_m_something_fun",
            "_cleaned": "click | pop_up: w_consequence_m_something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_consequence_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_consequence_m_something_fun.sent : true"
          }
        ],
        "priority": 7.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "28",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 28 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_m_something_fun.sent"
              }
            },
            "_raw": "get_field | w_consequence_m_something_fun.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_consequence_m_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_consequence_m_praise"
            ],
            "_raw": "pop_up: w_consequence_m_praise",
            "_cleaned": "click | pop_up: w_consequence_m_praise"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_m_praise.sent",
              true
            ],
            "_raw": "set_field: w_consequence_m_praise.sent : true",
            "_cleaned": "click | set_field: w_consequence_m_praise.sent : true"
          }
        ],
        "priority": 7.5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "29",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 29 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_m_praise.sent"
              }
            },
            "_raw": "get_field | w_consequence_m_praise.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/heart_white.svg"
      },
      {
        "id": "w_consequence_m_workshop_rem",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_consequence_m_workshop_rem"
            ],
            "_raw": "pop_up: w_consequence_m_workshop_rem",
            "_cleaned": "click | pop_up: w_consequence_m_workshop_rem"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_m_workshop_rem.sent",
              true
            ],
            "_raw": "set_field: w_consequence_m_workshop_rem.sent : true",
            "_cleaned": "click | set_field: w_consequence_m_workshop_rem.sent : true"
          }
        ],
        "priority": 7.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_started"
              }
            },
            "_raw": "get_field | w_consequence_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_m_workshop_rem.sent"
              }
            },
            "_raw": "get_field | w_consequence_m_workshop_rem.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_consequence_m_workshop_in_pro",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_consequence_m_workshop_in_pro"
            ],
            "_raw": "pop_up: w_consequence_m_workshop_in_pro",
            "_cleaned": "click | pop_up: w_consequence_m_workshop_in_pro"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_m_workshop_in_pro.sent",
              true
            ],
            "_raw": "set_field: w_consequence_m_workshop_in_pro.sent : true",
            "_cleaned": "click | set_field: w_consequence_m_workshop_in_pro.sent : true"
          }
        ],
        "priority": 7.7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_m_workshop_in_pro.sent"
              }
            },
            "_raw": "get_field | w_consequence_m_workshop_in_pro.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_started"
              }
            },
            "_raw": "get_field | w_consequence_started : false"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_completed"
              }
            },
            "_raw": "get_field | w_consequence_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_consequence_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_consequence_m_hp_reminder"
            ],
            "_raw": "pop_up: w_consequence_m_hp_reminder",
            "_cleaned": "click | pop_up: w_consequence_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_consequence_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_consequence_m_hp_reminder.sent : true"
          }
        ],
        "priority": 7.8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_completed"
              }
            },
            "_raw": "get_field | w_consequence_completed: true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_consequence_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_consequence_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_consequence_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_consequence_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 7.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_consequence_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      },
      {
        "id": "w_solve_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_11"
            ],
            "_raw": "set_field: which_relax : relax_11",
            "_cleaned": "click | set_field: which_relax : relax_11"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_relax.sent",
              true
            ],
            "_raw": "set_field: w_solve_relax.sent : true",
            "_cleaned": "click | set_field: w_solve_relax.sent : true"
          }
        ],
        "priority": 8.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_relax.sent"
              }
            },
            "_raw": "get_field | w_solve_relax.sent : true | within: 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_solve_m_workshop_released_individual",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_solve_m_workshop_released"
            ],
            "_raw": "pop_up: w_solve_m_workshop_released",
            "_cleaned": "click | pop_up: w_solve_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_solve_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_solve_m_workshop_released.sent : true"
          }
        ],
        "priority": 8.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: false"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_solve_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_solve_m_workshop_released_together",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_solve_m_workshop_released"
            ],
            "_raw": "pop_up: w_solve_m_workshop_released",
            "_cleaned": "click | pop_up: w_solve_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_solve_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_solve_m_workshop_released.sent : true"
          }
        ],
        "priority": 8.3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: true"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_solve_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_solve_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_solve_m_something_fun"
            ],
            "_raw": "pop_up: w_solve_m_something_fun",
            "_cleaned": "click | pop_up: w_solve_m_something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_solve_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_solve_m_something_fun.sent : true"
          }
        ],
        "priority": 8.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "28",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 28 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_m_something_fun.sent"
              }
            },
            "_raw": "get_field | w_solve_m_something_fun.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_solve_m_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_solve_m_praise"
            ],
            "_raw": "pop_up: w_solve_m_praise",
            "_cleaned": "click | pop_up: w_solve_m_praise"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_m_praise.sent",
              true
            ],
            "_raw": "set_field: w_solve_m_praise.sent : true",
            "_cleaned": "click | set_field: w_solve_m_praise.sent : true"
          }
        ],
        "priority": 8.5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "29",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 29 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_m_praise.sent"
              }
            },
            "_raw": "get_field | w_solve_m_praise.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/heart_white.svg"
      },
      {
        "id": "w_solve_m_workshop_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_solve_m_workshop_reminder"
            ],
            "_raw": "pop_up: w_solve_m_workshop_reminder",
            "_cleaned": "click | pop_up: w_solve_m_workshop_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_m_workshop_reminder.sent",
              true
            ],
            "_raw": "set_field: w_solve_m_workshop_reminder.sent : true",
            "_cleaned": "click | set_field: w_solve_m_workshop_reminder.sent : true"
          }
        ],
        "priority": 8.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_started"
              }
            },
            "_raw": "get_field | w_solve_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_m_workshop_reminder.sent"
              }
            },
            "_raw": "get_field | w_solve_m_workshop_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_solve_m_workshop_in_progress",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_solve_m_workshop_in_progress"
            ],
            "_raw": "pop_up: w_solve_m_workshop_in_progress",
            "_cleaned": "click | pop_up: w_solve_m_workshop_in_progress"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_m_workshop_in_progress.sent",
              true
            ],
            "_raw": "set_field: w_solve_m_workshop_in_progress.sent : true",
            "_cleaned": "click | set_field: w_solve_m_workshop_in_progress.sent : true"
          }
        ],
        "priority": 8.7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_m_workshop_in_progress.sent"
              }
            },
            "_raw": "get_field | w_solve_m_workshop_in_progress.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_started"
              }
            },
            "_raw": "get_field | w_solve_started : false"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_completed"
              }
            },
            "_raw": "get_field | w_solve_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_solve_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_solve_m_hp_reminder"
            ],
            "_raw": "pop_up: w_solve_m_hp_reminder",
            "_cleaned": "click | pop_up: w_solve_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_solve_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_solve_m_hp_reminder.sent : true"
          }
        ],
        "priority": 8.8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_completed"
              }
            },
            "_raw": "get_field | w_solve_completed: true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_solve_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_solve_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_solve_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_solve_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 8.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_solve_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      },
      {
        "id": "w_safe_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_12"
            ],
            "_raw": "set_field: which_relax : relax_12",
            "_cleaned": "click | set_field: which_relax : relax_12"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_relax.sent",
              true
            ],
            "_raw": "set_field: w_safe_relax.sent : true",
            "_cleaned": "click | set_field: w_safe_relax.sent : true"
          }
        ],
        "priority": 9.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_relax.sent"
              }
            },
            "_raw": "get_field | w_safe_relax.sent : true | within: 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_safe_m_workshop_released_individual",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_safe_m_workshop_released"
            ],
            "_raw": "pop_up: w_safe_m_workshop_released",
            "_cleaned": "click | pop_up: w_safe_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_safe_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_safe_m_workshop_released.sent : true"
          }
        ],
        "priority": 9.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: false"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_safe_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_safe_m_workshop_released_together",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_safe_m_workshop_released"
            ],
            "_raw": "pop_up: w_safe_m_workshop_released",
            "_cleaned": "click | pop_up: w_safe_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_safe_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_safe_m_workshop_released.sent : true"
          }
        ],
        "priority": 9.3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: true"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_safe_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_safe_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_safe_m_something_fun"
            ],
            "_raw": "pop_up: w_safe_m_something_fun",
            "_cleaned": "click | pop_up: w_safe_m_something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_safe_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_safe_m_something_fun.sent : true"
          }
        ],
        "priority": 9.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "28",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 28 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_m_something_fun.sent"
              }
            },
            "_raw": "get_field | w_safe_m_something_fun.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_safe_m_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_safe_m_praise"
            ],
            "_raw": "pop_up: w_safe_m_praise",
            "_cleaned": "click | pop_up: w_safe_m_praise"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_m_praise.sent",
              true
            ],
            "_raw": "set_field: w_safe_m_praise.sent : true",
            "_cleaned": "click | set_field: w_safe_m_praise.sent : true"
          }
        ],
        "priority": 9.5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "29",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 29 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_m_praise.sent"
              }
            },
            "_raw": "get_field | w_safe_m_praise.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/heart_white.svg"
      },
      {
        "id": "w_safe_m_workshop_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_safe_m_workshop_reminder"
            ],
            "_raw": "pop_up: w_safe_m_workshop_reminder",
            "_cleaned": "click | pop_up: w_safe_m_workshop_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_m_workshop_reminder.sent",
              true
            ],
            "_raw": "set_field: w_safe_m_workshop_reminder.sent : true",
            "_cleaned": "click | set_field: w_safe_m_workshop_reminder.sent : true"
          }
        ],
        "priority": 9.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_started"
              }
            },
            "_raw": "get_field | w_safe_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_m_workshop_reminder.sent"
              }
            },
            "_raw": "get_field | w_safe_m_workshop_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_safe_m_workshop_in_progress",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_safe_m_workshop_in_progress"
            ],
            "_raw": "pop_up: w_safe_m_workshop_in_progress",
            "_cleaned": "click | pop_up: w_safe_m_workshop_in_progress"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_m_workshop_in_progress.sent",
              true
            ],
            "_raw": "set_field: w_safe_m_workshop_in_progress.sent : true",
            "_cleaned": "click | set_field: w_safe_m_workshop_in_progress.sent : true"
          }
        ],
        "priority": 9.7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_m_workshop_in_progress.sent"
              }
            },
            "_raw": "get_field | w_safe_m_workshop_in_progress.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_started"
              }
            },
            "_raw": "get_field | w_safe_started : false"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_completed"
              }
            },
            "_raw": "get_field | w_safe_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_safe_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_safe_m_hp_reminder"
            ],
            "_raw": "pop_up: w_safe_m_hp_reminder",
            "_cleaned": "click | pop_up: w_safe_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_safe_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_safe_m_hp_reminder.sent : true"
          }
        ],
        "priority": 9.8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_completed"
              }
            },
            "_raw": "get_field | w_safe_completed: true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_safe_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_safe_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_safe_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_safe_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 9.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_safe_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      },
      {
        "id": "w_crisis_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_13"
            ],
            "_raw": "set_field: which_relax : relax_13",
            "_cleaned": "click | set_field: which_relax : relax_13"
          },
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_relax"
            ],
            "_raw": "pop_up: m_relax",
            "_cleaned": "click | pop_up: m_relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_relax.sent",
              true
            ],
            "_raw": "set_field: w_crisis_relax.sent : true",
            "_cleaned": "click | set_field: w_crisis_relax.sent : true"
          }
        ],
        "priority": 10.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_relax.sent"
              }
            },
            "_raw": "get_field | w_crisis_relax.sent : true | within: 1 : day"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_crisis_m_workshop_released_individual",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_crisis_m_workshop_released"
            ],
            "_raw": "pop_up: w_crisis_m_workshop_released",
            "_cleaned": "click | pop_up: w_crisis_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_crisis_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_crisis_m_workshop_released.sent : true"
          }
        ],
        "priority": 10.2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: false"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_crisis_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_crisis_m_workshop_released_together",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_crisis_m_workshop_released"
            ],
            "_raw": "pop_up: w_crisis_m_workshop_released",
            "_cleaned": "click | pop_up: w_crisis_m_workshop_released"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_m_workshop_released.sent",
              true
            ],
            "_raw": "set_field: w_crisis_m_workshop_released.sent : true",
            "_cleaned": "click | set_field: w_crisis_m_workshop_released.sent : true"
          }
        ],
        "priority": 10.3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "do_workshops_together"
              }
            },
            "_raw": "get_field | do_workshops_together: true"
          },
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_m_workshop_released.sent"
              }
            },
            "_raw": "get_field | w_crisis_m_workshop_released.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_crisis_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_crisis_m_something_fun"
            ],
            "_raw": "pop_up: w_crisis_m_something_fun",
            "_cleaned": "click | pop_up: w_crisis_m_something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_crisis_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_crisis_m_something_fun.sent : true"
          }
        ],
        "priority": 10.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "28",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 28 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_m_something_fun.sent"
              }
            },
            "_raw": "get_field | w_crisis_m_something_fun.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_crisis_m_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_crisis_m_praise"
            ],
            "_raw": "pop_up: w_crisis_m_praise",
            "_cleaned": "click | pop_up: w_crisis_m_praise"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_m_praise.sent",
              true
            ],
            "_raw": "set_field: w_crisis_m_praise.sent : true",
            "_cleaned": "click | set_field: w_crisis_m_praise.sent : true"
          }
        ],
        "priority": 10.5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "29",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 29 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_m_praise.sent"
              }
            },
            "_raw": "get_field | w_crisis_m_praise.sent : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/heart_white.svg"
      },
      {
        "id": "w_crisis_m_workshop_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_crisis_m_workshop_reminder"
            ],
            "_raw": "pop_up: w_crisis_m_workshop_reminder",
            "_cleaned": "click | pop_up: w_crisis_m_workshop_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_m_workshop_reminder.sent",
              true
            ],
            "_raw": "set_field: w_crisis_m_workshop_reminder.sent : true",
            "_cleaned": "click | set_field: w_crisis_m_workshop_reminder.sent : true"
          }
        ],
        "priority": 10.6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_started"
              }
            },
            "_raw": "get_field | w_crisis_started : false"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_m_workshop_reminder.sent"
              }
            },
            "_raw": "get_field | w_crisis_m_workshop_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_crisis_m_workshop_in_progress",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_crisis_m_workshop_in_progress"
            ],
            "_raw": "pop_up: w_crisis_m_workshop_in_progress",
            "_cleaned": "click | pop_up: w_crisis_m_workshop_in_progress"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_m_workshop_in_progress.sent",
              true
            ],
            "_raw": "set_field: w_crisis_m_workshop_in_progress.sent : true",
            "_cleaned": "click | set_field: w_crisis_m_workshop_in_progress.sent : true"
          }
        ],
        "priority": 10.7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_m_workshop_in_progress.sent"
              }
            },
            "_raw": "get_field | w_crisis_m_workshop_in_progress.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_started"
              }
            },
            "_raw": "get_field | w_crisis_started : false"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_completed"
              }
            },
            "_raw": "get_field | w_crisis_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops"
        ],
        "icon": "plh_images/icons/bell_white.svg"
      },
      {
        "id": "w_crisis_m_hp_reminder",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "w_crisis_m_hp_reminder"
            ],
            "_raw": "pop_up: w_crisis_m_hp_reminder",
            "_cleaned": "click | pop_up: w_crisis_m_hp_reminder"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_m_hp_reminder.sent",
              true
            ],
            "_raw": "set_field: w_crisis_m_hp_reminder.sent : true",
            "_cleaned": "click | set_field: w_crisis_m_hp_reminder.sent : true"
          }
        ],
        "priority": 10.8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "30",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 30 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_completed"
              }
            },
            "_raw": "get_field | w_crisis_completed: true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_m_hp_reminder.sent"
              }
            },
            "_raw": "get_field | w_crisis_m_hp_reminder.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_crisis_m_parent_points_overview",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "m_parent_points_overview"
            ],
            "_raw": "pop_up: m_parent_points_overview",
            "_cleaned": "click | pop_up: m_parent_points_overview"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_m_parent_points_overview.sent",
              true
            ],
            "_raw": "set_field: w_crisis_m_parent_points_overview.sent : true",
            "_cleaned": "click | set_field: w_crisis_m_parent_points_overview.sent : true"
          }
        ],
        "priority": 10.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_m_parent_points_overview.sent"
              }
            },
            "_raw": "get_field | w_crisis_m_parent_points_overview.sent : true"
          }
        ],
        "campaign_list": [
          "parent_points"
        ],
        "icon": "plh_images/icons/star_white.svg"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/campaigns/campaign_quick_starts.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "campaign_workshop_quick_start",
    "status": "released",
    "rows": [
      {
        "id": "default",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "default.sent",
              true
            ],
            "_raw": "set_field: default.sent : true",
            "_cleaned": "click | set_field: default.sent : true"
          }
        ],
        "priority": -1,
        "campaign_list": [
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg"
      },
      {
        "id": "w_self_care_quick_start",
        "workshop": "w_self_care",
        "workshop_data": "@data.workshop.w_self_care",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_self_care_stepper"
            ],
            "_raw": "go_to: w_self_care_stepper",
            "_cleaned": "click | go_to: w_self_care_stepper"
          }
        ],
        "priority": 0,
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_started"
              }
            },
            "_raw": "get_field | w_self_care_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_self_care_continue",
        "workshop": "w_self_care",
        "workshop_data": "@data.workshop.w_self_care",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_self_care_stepper"
            ],
            "_raw": "go_to: w_self_care_stepper",
            "_cleaned": "click | go_to: w_self_care_stepper"
          }
        ],
        "priority": 0,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_started"
              }
            },
            "_raw": "get_field | w_self_care_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_completed"
              }
            },
            "_raw": "get_field | w_self_care_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_1on1_quick_start",
        "workshop": "w_1on1",
        "workshop_data": "@data.workshop.w_1on1",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_1on1_stepper"
            ],
            "_raw": "go_to: w_1on1_stepper",
            "_cleaned": "click | go_to: w_1on1_stepper"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 6 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_started"
              }
            },
            "_raw": "get_field | w_1on1_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_1on1_continue",
        "workshop": "w_1on1",
        "workshop_data": "@data.workshop.w_1on1",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_1on1_stepper"
            ],
            "_raw": "go_to: w_1on1_stepper",
            "_cleaned": "click | go_to: w_1on1_stepper"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 6 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_started"
              }
            },
            "_raw": "get_field | w_1on1_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_completed"
              }
            },
            "_raw": "get_field | w_1on1_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_praise_quick_start",
        "workshop": "w_praise",
        "workshop_data": "@data.workshop.w_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_praise_stepper"
            ],
            "_raw": "go_to: w_praise_stepper",
            "_cleaned": "click | go_to: w_praise_stepper"
          }
        ],
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 13 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_started"
              }
            },
            "_raw": "get_field | w_praise_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_praise_continue",
        "workshop": "w_praise",
        "workshop_data": "@data.workshop.w_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_praise_stepper"
            ],
            "_raw": "go_to: w_praise_stepper",
            "_cleaned": "click | go_to: w_praise_stepper"
          }
        ],
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 13 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_started"
              }
            },
            "_raw": "get_field | w_praise_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_completed"
              }
            },
            "_raw": "get_field | w_praise_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_instruct_quick_start",
        "workshop": "w_instruct",
        "workshop_data": "@data.workshop.w_instruct",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_instruct_stepper"
            ],
            "_raw": "go_to: w_instruct_stepper",
            "_cleaned": "click | go_to: w_instruct_stepper"
          }
        ],
        "priority": 3,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 20 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_started"
              }
            },
            "_raw": "get_field | w_instruct_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_instruct_continue",
        "workshop": "w_instruct",
        "workshop_data": "@data.workshop.w_instruct",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_instruct_stepper"
            ],
            "_raw": "go_to: w_instruct_stepper",
            "_cleaned": "click | go_to: w_instruct_stepper"
          }
        ],
        "priority": 3,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 20 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_started"
              }
            },
            "_raw": "get_field | w_instruct_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_completed"
              }
            },
            "_raw": "get_field | w_instruct_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_stress_quick_start",
        "workshop": "w_stress",
        "workshop_data": "@data.workshop.w_stress",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_stress_stepper"
            ],
            "_raw": "go_to: w_stress_stepper",
            "_cleaned": "click | go_to: w_stress_stepper"
          }
        ],
        "priority": 4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_started"
              }
            },
            "_raw": "get_field | w_stress_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_stress_continue",
        "workshop": "w_stress",
        "workshop_data": "@data.workshop.w_stress",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_stress_stepper"
            ],
            "_raw": "go_to: w_stress_stepper",
            "_cleaned": "click | go_to: w_stress_stepper"
          }
        ],
        "priority": 4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_started"
              }
            },
            "_raw": "get_field | w_stress_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_completed"
              }
            },
            "_raw": "get_field | w_stress_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_money_quick_start",
        "workshop": "w_money",
        "workshop_data": "@data.workshop.w_money",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_money_stepper"
            ],
            "_raw": "go_to: w_money_stepper",
            "_cleaned": "click | go_to: w_money_stepper"
          }
        ],
        "priority": 5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_started"
              }
            },
            "_raw": "get_field | w_money_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_money_continue",
        "workshop": "w_money",
        "workshop_data": "@data.workshop.w_money",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_money_stepper"
            ],
            "_raw": "go_to: w_money_stepper",
            "_cleaned": "click | go_to: w_money_stepper"
          }
        ],
        "priority": 5,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_started"
              }
            },
            "_raw": "get_field | w_money_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_completed"
              }
            },
            "_raw": "get_field | w_money_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_rules_quick_start",
        "workshop": "w_rules",
        "workshop_data": "@data.workshop.w_rules",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_rules_stepper"
            ],
            "_raw": "go_to: w_rules_stepper",
            "_cleaned": "click | go_to: w_rules_stepper"
          }
        ],
        "priority": 6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_started"
              }
            },
            "_raw": "get_field | w_rules_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_rules_continue",
        "workshop": "w_rules",
        "workshop_data": "@data.workshop.w_rules",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_rules_stepper"
            ],
            "_raw": "go_to: w_rules_stepper",
            "_cleaned": "click | go_to: w_rules_stepper"
          }
        ],
        "priority": 6,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_started"
              }
            },
            "_raw": "get_field | w_rules_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_completed"
              }
            },
            "_raw": "get_field | w_rules_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_consequence_quick_start",
        "workshop": "w_consequence",
        "workshop_data": "@data.workshop.w_consequence",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_consequence_stepper"
            ],
            "_raw": "go_to: w_consequence_stepper",
            "_cleaned": "click | go_to: w_consequence_stepper"
          }
        ],
        "priority": 7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_started"
              }
            },
            "_raw": "get_field | w_consequence_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_consequence_continue",
        "workshop": "w_consequence",
        "workshop_data": "@data.workshop.w_consequence",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_consequence_stepper"
            ],
            "_raw": "go_to: w_consequence_stepper",
            "_cleaned": "click | go_to: w_consequence_stepper"
          }
        ],
        "priority": 7,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_started"
              }
            },
            "_raw": "get_field | w_consequence_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_completed"
              }
            },
            "_raw": "get_field | w_consequence_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_solve_quick_start",
        "workshop": "w_solve",
        "workshop_data": "@data.workshop.w_solve",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_solve_stepper"
            ],
            "_raw": "go_to: w_solve_stepper",
            "_cleaned": "click | go_to: w_solve_stepper"
          }
        ],
        "priority": 8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_started"
              }
            },
            "_raw": "get_field | w_solve_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_solve_continue",
        "workshop": "w_solve",
        "workshop_data": "@data.workshop.w_solve",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_solve_stepper"
            ],
            "_raw": "go_to: w_solve_stepper",
            "_cleaned": "click | go_to: w_solve_stepper"
          }
        ],
        "priority": 8,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_started"
              }
            },
            "_raw": "get_field | w_solve_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_completed"
              }
            },
            "_raw": "get_field | w_solve_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_safe_quick_start",
        "workshop": "w_safe",
        "workshop_data": "@data.workshop.w_safe",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_safe_stepper"
            ],
            "_raw": "go_to: w_safe_stepper",
            "_cleaned": "click | go_to: w_safe_stepper"
          }
        ],
        "priority": 9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_started"
              }
            },
            "_raw": "get_field | w_safe_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_safe_continue",
        "workshop": "w_safe",
        "workshop_data": "@data.workshop.w_safe",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_safe_stepper"
            ],
            "_raw": "go_to: w_safe_stepper",
            "_cleaned": "click | go_to: w_safe_stepper"
          }
        ],
        "priority": 9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_started"
              }
            },
            "_raw": "get_field | w_safe_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_completed"
              }
            },
            "_raw": "get_field | w_safe_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_crisis_quick_start",
        "workshop": "w_crisis",
        "workshop_data": "@data.workshop.w_crisis",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_crisis_stepper"
            ],
            "_raw": "go_to: w_crisis_stepper",
            "_cleaned": "click | go_to: w_crisis_stepper"
          }
        ],
        "priority": 10,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_started"
              }
            },
            "_raw": "get_field | w_crisis_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_crisis_continue",
        "workshop": "w_crisis",
        "workshop_data": "@data.workshop.w_crisis",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_crisis_stepper"
            ],
            "_raw": "go_to: w_crisis_stepper",
            "_cleaned": "click | go_to: w_crisis_stepper"
          }
        ],
        "priority": 10,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_started"
              }
            },
            "_raw": "get_field | w_crisis_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_completed"
              }
            },
            "_raw": "get_field | w_crisis_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      },
      {
        "id": "w_celebrate_quick_start",
        "workshop": "w_celebrate",
        "workshop_data": "@data.workshop.w_celebrate",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_celebrate_stepper"
            ],
            "_raw": "go_to: w_celebrate_stepper",
            "_cleaned": "click | go_to: w_celebrate_stepper"
          }
        ],
        "priority": 11,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_celebrate_started"
              }
            },
            "_raw": "get_field | w_celebrate_started : true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Start"
      },
      {
        "id": "w_celebrate_continue",
        "workshop": "w_celebrate",
        "workshop_data": "@data.workshop.w_celebrate",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_celebrate_stepper"
            ],
            "_raw": "go_to: w_celebrate_stepper",
            "_cleaned": "click | go_to: w_celebrate_stepper"
          }
        ],
        "priority": 11,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 34 : day"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_celebrate_started"
              }
            },
            "_raw": "get_field | w_celebrate_started : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_celebrate_completed"
              }
            },
            "_raw": "get_field | w_celebrate_completed: true"
          }
        ],
        "campaign_list": [
          "weekly_workshops",
          "workshop_quick_start"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Continue"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/campaigns/campaign_quick_starts.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "campaign_relax",
    "status": "released",
    "rows": [
      {
        "id": "default",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "default.sent",
              true
            ],
            "_raw": "set_field: default.sent : true",
            "_cleaned": "click | set_field: default.sent : true"
          }
        ],
        "priority": -1,
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_self_care_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_5"
            ],
            "_raw": "set_field: which_relax : relax_5",
            "_cleaned": "click | set_field: which_relax : relax_5"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_self_care_relax.sent",
              true
            ],
            "_raw": "set_field: w_self_care_relax.sent : true",
            "_cleaned": "click | set_field: w_self_care_relax.sent : true"
          }
        ],
        "priority": 0.1,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_completed"
              }
            },
            "_raw": "get_field | w_self_care_completed : true"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 6 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_1on1_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_2"
            ],
            "_raw": "set_field: which_relax : relax_2",
            "_cleaned": "click | set_field: which_relax : relax_2"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_relax.sent",
              true
            ],
            "_raw": "set_field: w_1on1_relax.sent : true",
            "_cleaned": "click | set_field: w_1on1_relax.sent : true"
          }
        ],
        "priority": 1.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 6 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 13 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_praise_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_3"
            ],
            "_raw": "set_field: which_relax : relax_3",
            "_cleaned": "click | set_field: which_relax : relax_3"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_relax.sent",
              true
            ],
            "_raw": "set_field: w_praise_relax.sent : true",
            "_cleaned": "click | set_field: w_praise_relax.sent : true"
          }
        ],
        "priority": 2.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 13 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 20 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_instruct_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_4"
            ],
            "_raw": "set_field: which_relax : relax_4",
            "_cleaned": "click | set_field: which_relax : relax_4"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_relax.sent",
              true
            ],
            "_raw": "set_field: w_instruct_relax.sent : true",
            "_cleaned": "click | set_field: w_instruct_relax.sent : true"
          }
        ],
        "priority": 3.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 20 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 27 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_stress_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_7"
            ],
            "_raw": "set_field: which_relax : relax_7",
            "_cleaned": "click | set_field: which_relax : relax_7"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_relax.sent",
              true
            ],
            "_raw": "set_field: w_stress_relax.sent : true",
            "_cleaned": "click | set_field: w_stress_relax.sent : true"
          }
        ],
        "priority": 4.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_money_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_8"
            ],
            "_raw": "set_field: which_relax : relax_8",
            "_cleaned": "click | set_field: which_relax : relax_8"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_relax.sent",
              true
            ],
            "_raw": "set_field: w_money_relax.sent : true",
            "_cleaned": "click | set_field: w_money_relax.sent : true"
          }
        ],
        "priority": 5.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_rules_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_9"
            ],
            "_raw": "set_field: which_relax : relax_9",
            "_cleaned": "click | set_field: which_relax : relax_9"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_relax.sent",
              true
            ],
            "_raw": "set_field: w_rules_relax.sent : true",
            "_cleaned": "click | set_field: w_rules_relax.sent : true"
          }
        ],
        "priority": 6.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_consequence_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_10"
            ],
            "_raw": "set_field: which_relax : relax_10",
            "_cleaned": "click | set_field: which_relax : relax_10"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_relax.sent",
              true
            ],
            "_raw": "set_field: w_consequence_relax.sent : true",
            "_cleaned": "click | set_field: w_consequence_relax.sent : true"
          }
        ],
        "priority": 7.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_solve_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_11"
            ],
            "_raw": "set_field: which_relax : relax_11",
            "_cleaned": "click | set_field: which_relax : relax_11"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_relax.sent",
              true
            ],
            "_raw": "set_field: w_solve_relax.sent : true",
            "_cleaned": "click | set_field: w_solve_relax.sent : true"
          }
        ],
        "priority": 8.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_safe_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_12"
            ],
            "_raw": "set_field: which_relax : relax_12",
            "_cleaned": "click | set_field: which_relax : relax_12"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_relax.sent",
              true
            ],
            "_raw": "set_field: w_safe_relax.sent : true",
            "_cleaned": "click | set_field: w_safe_relax.sent : true"
          }
        ],
        "priority": 9.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      },
      {
        "id": "w_crisis_relax",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "which_relax",
              "relax_13"
            ],
            "_raw": "set_field: which_relax : relax_13",
            "_cleaned": "click | set_field: which_relax : relax_13"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "relax"
            ],
            "_raw": "go_to: relax",
            "_cleaned": "click | go_to: relax"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_relax.sent",
              true
            ],
            "_raw": "set_field: w_crisis_relax.sent : true",
            "_cleaned": "click | set_field: w_crisis_relax.sent : true"
          }
        ],
        "priority": 10.1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "relax"
        ],
        "icon": "plh_images/icons/smile_eyes_down_white.svg"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/campaigns/campaign_quick_starts.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "campaign_something_fun",
    "status": "released",
    "rows": [
      {
        "id": "default",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "default.sent",
              true
            ],
            "_raw": "set_field: default.sent : true",
            "_cleaned": "click | set_field: default.sent : true"
          }
        ],
        "priority": -1,
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_1on1_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_co_chef"
            ],
            "_raw": "go_to: activity_co_chef",
            "_cleaned": "click | go_to: activity_co_chef"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_1on1_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_1on1_m_something_fun.sent : true"
          }
        ],
        "priority": 1.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 6 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 13 : day"
          }
        ],
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_praise_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_reflect_positive"
            ],
            "_raw": "go_to: activity_reflect_positive",
            "_cleaned": "click | go_to: activity_reflect_positive"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_praise_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_praise_m_something_fun.sent : true"
          }
        ],
        "priority": 2.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 13 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 20 : day"
          }
        ],
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_instruct_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_dance_moves"
            ],
            "_raw": "go_to: activity_dance_moves",
            "_cleaned": "click | go_to: activity_dance_moves"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_instruct_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_instruct_m_something_fun.sent : true"
          }
        ],
        "priority": 3.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 20 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 27 : day"
          }
        ],
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_stress_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_check_in_chat"
            ],
            "_raw": "go_to: activity_check_in_chat",
            "_cleaned": "click | go_to: activity_check_in_chat"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_stress_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_stress_m_something_fun.sent : true"
          }
        ],
        "priority": 4.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_money_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_dream_travel"
            ],
            "_raw": "go_to: activity_dream_travel",
            "_cleaned": "click | go_to: activity_dream_travel"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_money_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_money_m_something_fun.sent : true"
          }
        ],
        "priority": 5.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_rules_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_famous_party"
            ],
            "_raw": "go_to: activity_famous_party",
            "_cleaned": "click | go_to: activity_famous_party"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_rules_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_rules_m_something_fun.sent : true"
          }
        ],
        "priority": 6.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_consequence_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_two_truths"
            ],
            "_raw": "go_to: activity_two_truths",
            "_cleaned": "click | go_to: activity_two_truths"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_consequence_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_consequence_m_something_fun.sent : true"
          }
        ],
        "priority": 7.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_solve_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_mirror"
            ],
            "_raw": "go_to: activity_mirror",
            "_cleaned": "click | go_to: activity_mirror"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_solve_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_solve_m_something_fun.sent : true"
          }
        ],
        "priority": 8.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_safe_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_time_machine"
            ],
            "_raw": "go_to: activity_time_machine",
            "_cleaned": "click | go_to: activity_time_machine"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_safe_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_safe_m_something_fun.sent : true"
          }
        ],
        "priority": 9.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      },
      {
        "id": "w_crisis_m_something_fun",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_superpowers"
            ],
            "_raw": "go_to: activity_superpowers",
            "_cleaned": "click | go_to: activity_superpowers"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_m_something_fun.sent",
              true
            ],
            "_raw": "set_field: w_crisis_m_something_fun.sent : true",
            "_cleaned": "click | set_field: w_crisis_m_something_fun.sent : true"
          }
        ],
        "priority": 10.4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "27",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 27 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "34",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before : 34 : day"
          }
        ],
        "campaign_list": [
          "something_fun"
        ],
        "icon": "plh_images/icons/smile_eyes_up_white.svg"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/campaigns/campaign_quick_starts.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "campaign_hp_review",
    "status": "released",
    "rows": [
      {
        "id": "w_1on1_hp_review",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_1on1_hp_review"
            ],
            "_raw": "go_to: w_1on1_hp_review",
            "_cleaned": "click | go_to: w_1on1_hp_review"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_hp_review.sent",
              true
            ],
            "_raw": "set_field: w_1on1_hp_review.sent : true",
            "_cleaned": "click | set_field: w_1on1_hp_review.sent : true"
          }
        ],
        "priority": 1.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "12",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 12 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_hp_review_completed"
              }
            },
            "_raw": "get_field | w_1on1_hp_review_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_praise_hp_review",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_praise_hp_review"
            ],
            "_raw": "go_to: w_praise_hp_review",
            "_cleaned": "click | go_to: w_praise_hp_review"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_hp_review.sent",
              true
            ],
            "_raw": "set_field: w_praise_hp_review.sent : true",
            "_cleaned": "click | set_field: w_praise_hp_review.sent : true"
          }
        ],
        "priority": 2.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "19",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 19 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_hp_review_completed"
              }
            },
            "_raw": "get_field | w_praise_hp_review_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_instruct_hp_review",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_instruct_hp_review"
            ],
            "_raw": "go_to: w_instruct_hp_review",
            "_cleaned": "click | go_to: w_instruct_hp_review"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_hp_review.sent",
              true
            ],
            "_raw": "set_field: w_instruct_hp_review.sent : true",
            "_cleaned": "click | set_field: w_instruct_hp_review.sent : true"
          }
        ],
        "priority": 3.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "26",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 26 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_instruct_hp_review_completed"
              }
            },
            "_raw": "get_field | w_instruct_hp_review_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_stress_hp_review",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_stress_hp_review"
            ],
            "_raw": "go_to: w_stress_hp_review",
            "_cleaned": "click | go_to: w_stress_hp_review"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_stress_hp_review.sent",
              true
            ],
            "_raw": "set_field: w_stress_hp_review.sent : true",
            "_cleaned": "click | set_field: w_stress_hp_review.sent : true"
          }
        ],
        "priority": 4.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_stress_hp_review_completed"
              }
            },
            "_raw": "get_field | w_stress_hp_review_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_money_hp_review",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_money_hp_review"
            ],
            "_raw": "go_to: w_money_hp_review",
            "_cleaned": "click | go_to: w_money_hp_review"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_money_hp_review.sent",
              true
            ],
            "_raw": "set_field: w_money_hp_review.sent : true",
            "_cleaned": "click | set_field: w_money_hp_review.sent : true"
          }
        ],
        "priority": 5.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_money_hp_review_completed"
              }
            },
            "_raw": "get_field | w_money_hp_review_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_rules_hp_review",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_rules_hp_review"
            ],
            "_raw": "go_to: w_rules_hp_review",
            "_cleaned": "click | go_to: w_rules_hp_review"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_rules_hp_review.sent",
              true
            ],
            "_raw": "set_field: w_rules_hp_review.sent : true",
            "_cleaned": "click | set_field: w_rules_hp_review.sent : true"
          }
        ],
        "priority": 6.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_rules_hp_review_completed"
              }
            },
            "_raw": "get_field | w_rules_hp_review_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_consequence_hp_review",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_consequence_hp_review"
            ],
            "_raw": "go_to: w_consequence_hp_review",
            "_cleaned": "click | go_to: w_consequence_hp_review"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_consequence_hp_review.sent",
              true
            ],
            "_raw": "set_field: w_consequence_hp_review.sent : true",
            "_cleaned": "click | set_field: w_consequence_hp_review.sent : true"
          }
        ],
        "priority": 7.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_consequence_hp_review_completed"
              }
            },
            "_raw": "get_field | w_consequence_hp_review_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_solve_hp_review",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_solve_hp_review"
            ],
            "_raw": "go_to: w_solve_hp_review",
            "_cleaned": "click | go_to: w_solve_hp_review"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_solve_hp_review.sent",
              true
            ],
            "_raw": "set_field: w_solve_hp_review.sent : true",
            "_cleaned": "click | set_field: w_solve_hp_review.sent : true"
          }
        ],
        "priority": 8.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_solve_hp_review_completed"
              }
            },
            "_raw": "get_field | w_solve_hp_review_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_safe_hp_review",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_safe_hp_review"
            ],
            "_raw": "go_to: w_safe_hp_review",
            "_cleaned": "click | go_to: w_safe_hp_review"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_safe_hp_review.sent",
              true
            ],
            "_raw": "set_field: w_safe_hp_review.sent : true",
            "_cleaned": "click | set_field: w_safe_hp_review.sent : true"
          }
        ],
        "priority": 9.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_safe_hp_review_completed"
              }
            },
            "_raw": "get_field | w_safe_hp_review_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      },
      {
        "id": "w_crisis_hp_review",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_crisis_hp_review"
            ],
            "_raw": "go_to: w_crisis_hp_review",
            "_cleaned": "click | go_to: w_crisis_hp_review"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_crisis_hp_review.sent",
              true
            ],
            "_raw": "set_field: w_crisis_hp_review.sent : true",
            "_cleaned": "click | set_field: w_crisis_hp_review.sent : true"
          }
        ],
        "priority": 10.9,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "33",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 33 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_crisis_hp_review_completed"
              }
            },
            "_raw": "get_field | w_crisis_hp_review_completed : true"
          }
        ],
        "campaign_list": [
          "parent_centre"
        ],
        "icon": "plh_images/icons/parent_heart_white.svg"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/campaigns/campaign_quick_starts.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "campaign_unlock_workshops",
    "status": "released",
    "rows": [
      {
        "id": "unlock_w_self_care",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_self_care_disabled",
              false
            ],
            "_raw": "set_field: w_self_care_disabled : FALSE",
            "_cleaned": "click | set_field: w_self_care_disabled : FALSE"
          }
        ],
        "priority": -1,
        "campaign_list": [
          "unlock_workshops"
        ]
      },
      {
        "id": "unlock_w_1on1",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_disabled",
              false
            ],
            "_raw": "set_field: w_1on1_disabled : FALSE",
            "_cleaned": "click | set_field: w_1on1_disabled : FALSE"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "unlock_w_1on1.sent",
              true
            ],
            "_raw": "set_field: unlock_w_1on1.sent : TRUE",
            "_cleaned": "click | set_field: unlock_w_1on1.sent : TRUE"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "6",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 6 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "unlock_w_1on1.sent"
              }
            },
            "_raw": "get_field | unlock_w_1on1.sent : TRUE"
          }
        ],
        "campaign_list": [
          "unlock_workshops"
        ]
      },
      {
        "id": "unlock_w_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_disabled",
              false
            ],
            "_raw": "set_field: w_praise_disabled : FALSE",
            "_cleaned": "click | set_field: w_praise_disabled : FALSE"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "unlock_w_praise.sent",
              true
            ],
            "_raw": "set_field: unlock_w_praise.sent : TRUE",
            "_cleaned": "click | set_field: unlock_w_praise.sent : TRUE"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "13",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 13 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "unlock_w_praise.sent"
              }
            },
            "_raw": "get_field | unlock_w_praise.sent : TRUE"
          }
        ],
        "campaign_list": [
          "unlock_workshops"
        ]
      },
      {
        "id": "unlock_w_instruct",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_disabled",
              false
            ],
            "_raw": "set_field: w_instruct_disabled : FALSE",
            "_cleaned": "click | set_field: w_instruct_disabled : FALSE"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "unlock_w_instruct.sent",
              true
            ],
            "_raw": "set_field: unlock_w_instruct.sent : TRUE",
            "_cleaned": "click | set_field: unlock_w_instruct.sent : TRUE"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "20",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 20 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "unlock_w_instruct.sent"
              }
            },
            "_raw": "get_field | unlock_w_instruct.sent : TRUE"
          }
        ],
        "campaign_list": [
          "unlock_workshops"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/campaigns/campaign_unlock_workshops.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "m_inactive_data",
    "status": "released",
    "rows": [
      {
        "id": "inactive_0",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "inactive_0.sent",
              true
            ],
            "_raw": "set_field: inactive_0.sent : true",
            "_cleaned": "click | set_field: inactive_0.sent : true"
          }
        ],
        "priority": 0,
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "inactive_0.sent"
              }
            },
            "_raw": "get_field | inactive_0.sent : true"
          }
        ],
        "campaign_list": [
          "m_inactive_campaign"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "Welcome to ParentApp. Click here to start your journey!",
          "time": {
            "hour": "19",
            "minute": "30"
          },
          "delay": {
            "days": "0"
          }
        },
        "title": "New message from PLH",
        "text": "Welcome to ParentApp. Click here to start your journey!"
      },
      {
        "id": "inactive_1",
        "priority": 1,
        "campaign_list": [
          "m_inactive_campaign"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "Hope you are feeling OK. Parenting is hard, but it’s never too late to start again with your teenager. Your first parenting workshop is ready for you! Click here to start your ParentApp journey!",
          "time": {
            "hour": "19",
            "minute": "30"
          },
          "delay": {
            "days": "7"
          }
        },
        "title": "New message from PLH",
        "text": "Hope you are feeling OK. Parenting is hard, but it’s never too late to start again with your teenager. Your first parenting workshop is ready for you! Click here to start your ParentApp journey!"
      },
      {
        "id": "inactive_2",
        "priority": 2,
        "campaign_list": [
          "m_inactive_campaign"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "Hi! Is everything OK? It seems you haven’t opened ParentApp lately. Why don’t you give it a try? Millions of parents have found these materials helpful. We are still here to support you.",
          "time": {
            "hour": "19",
            "minute": "30"
          },
          "delay": {
            "days": "30"
          }
        },
        "title": "New message from PLH",
        "text": "Hi! Is everything OK? It seems you haven’t opened ParentApp lately. Why don’t you give it a try? Millions of parents have found these materials helpful. We are still here to support you. "
      },
      {
        "id": "inactive_3",
        "priority": -1,
        "campaign_list": [
          "m_inactive_campaign"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "Hello again! It’s never too late to use ParentApp and get tailored parenting support. Why don’t you give it a try when you are commuting to work or when the food is cooking? Millions of parents found our materials helpful.",
          "time": {
            "hour": "19",
            "minute": "30"
          },
          "delay": {
            "days": "30"
          }
        },
        "title": "New message from PLH",
        "text": "Hello again! It’s never too late to use ParentApp and get tailored parenting support. Why don’t you give it a try when you are commuting to work or when the food is cooking? Millions of parents found our materials helpful."
      },
      {
        "id": "inactive_4",
        "priority": -2,
        "campaign_list": [
          "m_inactive_campaign"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "ParentApp misses you! There is a lot to explore. We are still here to support you.",
          "time": {
            "hour": "19",
            "minute": "30"
          },
          "delay": {
            "days": "30"
          }
        },
        "title": "New message from PLH",
        "text": "ParentApp misses you! There is a lot to explore. We are still here to support you. "
      },
      {
        "id": "inactive_5",
        "priority": -3,
        "campaign_list": [
          "m_inactive_campaign"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "Hope you are feeling OK. We know parenting is hard - use ParentApp to help you manage parenting stress.",
          "time": {
            "hour": "19",
            "minute": "30"
          },
          "delay": {
            "days": "30"
          }
        },
        "title": "New message from PLH",
        "text": "Hope you are feeling OK. We know parenting is hard - use ParentApp to help you manage parenting stress."
      },
      {
        "id": "inactive_6",
        "priority": -4,
        "campaign_list": [
          "m_inactive_campaign"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "Hope you are feeling OK. We know parenting is hard - use ParentApp to prepare your teen for success in life.",
          "time": {
            "hour": "19",
            "minute": "30"
          },
          "delay": {
            "days": "30"
          }
        },
        "title": "New message from PLH",
        "text": "Hope you are feeling OK. We know parenting is hard - use ParentApp to prepare your teen for success in life."
      },
      {
        "id": "inactive_7",
        "priority": -5,
        "campaign_list": [
          "m_inactive_campaign"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "Hope you are feeling OK. We know parenting is hard - use ParentApp to help you manage your teen's behaviour.",
          "time": {
            "hour": "19",
            "minute": "30"
          },
          "delay": {
            "days": "30"
          }
        },
        "title": "New message from PLH",
        "text": "Hope you are feeling OK. We know parenting is hard - use ParentApp to help you manage your teen's behaviour."
      },
      {
        "id": "inactive_8",
        "priority": -6,
        "campaign_list": [
          "m_inactive_campaign"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "Hope you are feeling OK. We know parenting is hard - use ParentApp to bond with your teen again!",
          "time": {
            "hour": "19",
            "minute": "30"
          },
          "delay": {
            "days": "30"
          }
        },
        "title": "New message from PLH",
        "text": "Hope you are feeling OK. We know parenting is hard - use ParentApp to bond with your teen again!"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/campaigns/no_app_activity.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "activity_data_list",
    "data_list_name": "something_fun",
    "status": "released",
    "rows": [
      {
        "id": "reflect_positive",
        "workshop": "praise",
        "title": "Reflect on the positive",
        "text_template": "activity_reflect_positive",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "check_in_chat",
        "workshop": "stress",
        "title": "Check-in chat",
        "text_template": "activity_check_in_chat",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "dream_travel",
        "workshop": "money",
        "title": "Dream Travel",
        "text_template": "activity_dream_travel",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "famous_party",
        "workshop": "rules",
        "title": "Famous Party",
        "text_template": "activity_famous_party",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "two_truths",
        "workshop": "consequence",
        "title": "Two truths, one lie",
        "text_template": "activity_two_truths",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "time_machine",
        "workshop": "safe",
        "title": "Time Machine",
        "text_template": "activity_time_machine",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "superpowers",
        "workshop": "crisis",
        "title": "Superpowers",
        "text_template": "activity_superpowers",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "friendly_chat",
        "title": "Just a friendly chat",
        "text_template": "activity_friendly_chat",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "interrupter",
        "title": "The Interrupter",
        "text_template": "activity_interrupter",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "three_options",
        "title": "Three options",
        "text_template": "activity_three_options",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "yes_no_maybe",
        "title": "Yes, No or Maybe",
        "text_template": "activity_yes_no_maybe",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "memory_game",
        "title": "Memory game - \"On Saturday...\"",
        "text_template": "activity_memory_game",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "invent_story",
        "title": "Make up a story",
        "text_template": "activity_invent_story",
        "fields::favourite": false,
        "spend_time": true,
        "type": "chat_together"
      },
      {
        "id": "co_chef",
        "workshop": "1on1",
        "title": "Co-chef",
        "text_template": "activity_co_chef",
        "fields::favourite": false,
        "spend_time": true,
        "type": "do_together"
      },
      {
        "id": "dance_moves",
        "workshop": "instruct",
        "title": "Dance moves",
        "text_template": "activity_dance_moves",
        "fields::favourite": false,
        "spend_time": true,
        "type": "do_together"
      },
      {
        "id": "mirror",
        "workshop": "solve",
        "title": "Mirror",
        "text_template": "activity_mirror",
        "fields::favourite": false,
        "spend_time": true,
        "type": "do_together"
      },
      {
        "id": "whats_new",
        "title": "What's new?",
        "text_template": "activity_whats_new",
        "fields::favourite": false,
        "spend_time": true,
        "type": "do_together"
      },
      {
        "id": "get_active",
        "title": "Get active!",
        "text_template": "activity_get_active",
        "fields::favourite": false,
        "spend_time": true,
        "type": "do_together"
      },
      {
        "id": "name_that_tune",
        "title": "Name that tune",
        "text_template": "activity_name_that_tune",
        "fields::favourite": false,
        "spend_time": true,
        "type": "do_together"
      },
      {
        "id": "pass_the_snap",
        "title": "Pass the snap",
        "text_template": "activity_pass_the_snap",
        "fields::favourite": false,
        "spend_time": true,
        "type": "do_together",
        "intro_text": "Here is a fun game you can do with your family!"
      },
      {
        "id": "family_workout",
        "title": "Family workout",
        "text_template": "activity_family_workout",
        "fields::favourite": false,
        "spend_time": true,
        "type": "do_together"
      },
      {
        "id": "housework",
        "title": "Make housework fun",
        "text_template": "activity_housework",
        "fields::favourite": false,
        "spend_time": true,
        "has_recording": true,
        "type": "do_together",
        "intro_text": "Household chores aren’t fun… or are they? You can make them into a game!"
      },
      {
        "id": "doing_what",
        "title": "What are you doing?",
        "text_template": "activity_doing_what",
        "fields::favourite": false,
        "spend_time": true,
        "has_recording": true,
        "type": "do_together",
        "intro_text": "Here is a fun game you can do with your family!"
      },
      {
        "id": "crazy_chicken",
        "title": "Crazy chicken",
        "text_template": "activity_crazy_chicken",
        "fields::favourite": false,
        "spend_time": true,
        "type": "do_together"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/data/activity_data_list.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "habit_data_list",
    "status": "released",
    "data_list_name": "habit",
    "rows": [
      {
        "id": "relax",
        "title": "Relax",
        "description": "Doing a relaxation activity",
        "task_id": "task_habit_relax",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_relax.svg",
        "mark_text": "Every time you do a relax, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Did it? Tap it!",
        "fields::weekly_count": 0,
        "fields::total_count": 0
      },
      {
        "id": "treat_yourself",
        "title": "Treat yourself well",
        "description": "Doing something they like for themselves",
        "task_id": "task_habit_treat_yourself",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_treat_yourself.svg",
        "mark_text": "Every time you treat yourself well, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Did it? Tap it!",
        "fields::weekly_count": 0,
        "fields::total_count": 0
      },
      {
        "id": "praise_yourself",
        "title": "Praise yourself",
        "description": "Praising themselves",
        "task_id": "task_habit_praise_yourself",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_praise_yourself.svg",
        "mark_text": "Every time you praise yourself, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Did it? Tap it!",
        "fields::weekly_count": 0,
        "fields::total_count": 0
      },
      {
        "id": "spend_time",
        "title": "One-on-one time",
        "description": "Spending time with their teen",
        "task_id": "task_habit_spend_time",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_spend_time.svg",
        "mark_text": "Every time you do one-on-one time, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Did it? Tap it!",
        "fields::weekly_count": 0,
        "fields::total_count": 0
      },
      {
        "id": "praise_teen",
        "title": "Praise your teen",
        "description": "Praising their teen when they did positive thing",
        "task_id": "task_habit_praise_teen",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_praise_teen.svg",
        "mark_text": "Every time you praise your teen, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Did it? Tap it!",
        "fields::weekly_count": 0,
        "fields::total_count": 0
      },
      {
        "id": "instruct_positively",
        "title": "Get positive",
        "description": "Giving their teen a positive instruction",
        "task_id": "task_habit_instruct_positively",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_instruct_positively.svg",
        "mark_text": "Every time you give a positive instruction, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Did it? Tap it!",
        "fields::weekly_count": 0,
        "fields::total_count": 0
      },
      {
        "id": "breathe",
        "title": "Breathe not yell",
        "description": "Taking a pause before responding",
        "task_id": "task_habit_breathe",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_breathe.svg",
        "mark_text": "Every time you take a pause before responding, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Did it? Tap it!",
        "fields::weekly_count": 0,
        "fields::total_count": 0
      },
      {
        "id": "money",
        "title": "Good money choice",
        "description": "Keeping the budget",
        "task_id": "task_habit_money",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_money.svg",
        "mark_text": "Every time you make a good choice about needs, wants and savings, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Did it? Tap it!",
        "fields::weekly_count": 0,
        "fields::total_count": 0
      },
      {
        "id": "consequence",
        "title": "Calm consequence",
        "description": "Giving their teen a consequence in a calm way",
        "task_id": "task_habit_consequence",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_consequence.svg",
        "mark_text": "Every time you give a calm consequence, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Did it? Tap it!",
        "fields::weekly_count": 0,
        "fields::total_count": 0
      },
      {
        "id": "safe",
        "title": "Safe",
        "description": "Planning or keeping a family safety plan",
        "task_id": "task_habit_safe",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_safe.svg",
        "mark_text": "Every time you do something to keep your teen safe, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Did it? Tap it!",
        "fields::weekly_count": 0,
        "fields::total_count": 0
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/data/habit_data_list.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "hp_praise_messages",
    "status": "released",
    "data_list_name": "praise",
    "rows": [
      {
        "id": "hp_praise_message_1",
        "text": "That’s wonderful! Well done for spending time together. It lays the foundation for a great relationship with your teen!",
        "workshop": "w_1on1",
        "mood_list": [
          "happy"
        ]
      },
      {
        "id": "hp_praise_message_2",
        "text": "Good for you! One-on-one time shows your teens they are important to you. It really makes a difference!",
        "workshop": "w_1on1",
        "mood_list": [
          "happy"
        ]
      },
      {
        "id": "hp_praise_message_3",
        "text": "Wonderful! Spending time with your teen may make your teen more willing to help out more often. You are doing great!",
        "workshop": "w_1on1",
        "mood_list": [
          "happy"
        ]
      },
      {
        "id": "hp_praise_message_4",
        "text": "Well done! One-on-one time with your teen gives you a chance to learn more about your teen’s interests and abilities. You are a star!",
        "workshop": "w_1on1",
        "mood_list": [
          "happy"
        ]
      },
      {
        "id": "hp_praise_message_5",
        "text": "Excellent job! Spending time together helps to build a strong and positive relationship between you and your teen.",
        "workshop": "w_1on1",
        "mood_list": [
          "happy"
        ]
      },
      {
        "id": "hp_praise_message_6",
        "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will greatly improve your relationship; well done for trying!   ",
        "workshop": "w_1on1",
        "mood_list": [
          "ok"
        ]
      },
      {
        "id": "hp_praise_message_7",
        "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen - things will get better. Well done for trying!",
        "workshop": "w_1on1",
        "mood_list": [
          "sad"
        ]
      },
      {
        "id": "hp_praise_message_8",
        "text": "Great to hear it went well; you are a star!",
        "workshop": "w_instruct",
        "mood_list": [
          "happy"
        ]
      },
      {
        "id": "hp_praise_message_9",
        "text": "Sorry to hear it was difficult for you. Well done for trying!",
        "workshop": "w_instruct",
        "mood_list": [
          "ok",
          "sad"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/data/praise_data_list.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "relax_list",
    "data_list_name": "relax",
    "status": "released",
    "rows": [
      {
        "id": "relax_1",
        "title": "Quick pause",
        "task_id": "task_relax",
        "text_template": "relax_1_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_1_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_2",
        "title": "Power of three",
        "workshop": "1on1",
        "task_id": "task_relax",
        "text_template": "relax_2_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_2_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_3",
        "title": "One thing today",
        "workshop": "praise",
        "task_id": "task_relax",
        "text_template": "relax_3_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_3_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_4",
        "title": "Breathe to three",
        "workshop": "instruct",
        "task_id": "task_relax",
        "text_template": "relax_4_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_4_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_5",
        "title": "In and out",
        "workshop": "self_care",
        "task_id": "task_relax",
        "text_template": "relax_5_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_5_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_6",
        "title": "Think about today",
        "task_id": "task_relax",
        "text_template": "relax_6_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_6_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_7",
        "title": "Pause to respond",
        "workshop": "stress",
        "task_id": "task_relax",
        "text_template": "relax_7_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_7_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_8",
        "title": "Small things",
        "workshop": "money",
        "task_id": "task_relax",
        "text_template": "relax_8_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_8_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_9",
        "title": "Body scan",
        "workshop": "rules",
        "task_id": "task_relax",
        "text_template": "relax_9_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_9_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_10",
        "title": "Feel the ground",
        "workshop": "consequence",
        "task_id": "task_relax",
        "text_template": "relax_10_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_10_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_11",
        "title": "Counting sounds",
        "workshop": "solve",
        "task_id": "task_relax",
        "text_template": "relax_11_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_11_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_12",
        "title": "Feel your feeling",
        "workshop": "safe",
        "task_id": "task_relax",
        "text_template": "relax_12_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_12_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_13",
        "title": "Your song",
        "workshop": "crisis",
        "task_id": "task_relax",
        "text_template": "relax_13_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_13_audio.mp3",
        "fields::favourite": false,
        "type": "relax_active"
      },
      {
        "id": "relax_14",
        "title": "Ground & gratitude",
        "workshop": "celebrate",
        "task_id": "task_relax",
        "text_template": "relax_14_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_14_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_15",
        "title": "Notice how you feel",
        "task_id": "task_relax",
        "text_template": "relax_15_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_15_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_16",
        "title": "Pause power",
        "task_id": "task_relax",
        "text_template": "relax_16_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_16_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_17",
        "title": "Praise yourself",
        "task_id": "task_relax",
        "text_template": "relax_17_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_17_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_short"
      },
      {
        "id": "relax_18",
        "title": "Taking care of yourself",
        "task_id": "task_relax",
        "text_template": "relax_18_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_18_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_long",
        "intro_text": "Let’s do a short activity that can help when you are feeling you need some more support to get through the day."
      },
      {
        "id": "relax_19",
        "title": "Take a pause",
        "task_id": "task_relax",
        "text_template": "relax_19_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_19_audio.mp3",
        "fields::favourite": false,
        "type": "relax_passive_long",
        "intro_text": "Let’s do a short activity that you can do whenever you are feeling stressed or worried."
      },
      {
        "id": "relax_20",
        "title": "Physical activity",
        "task_id": "task_relax",
        "text_template": "relax_20_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_20_audio.mp3",
        "fields::favourite": false,
        "type": "relax_active",
        "intro_text": "Let’s do a fun physical activity that can help release stress and keep healthy."
      },
      {
        "id": "relax_21",
        "title": "List of things",
        "task_id": "task_relax",
        "text_template": "relax_21_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_21_audio.mp3",
        "fields::favourite": false,
        "type": "relax_active"
      },
      {
        "id": "relax_22",
        "title": "Connect",
        "task_id": "task_relax",
        "text_template": "relax_22_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_22_audio.mp3",
        "fields::favourite": false,
        "type": "relax_active"
      },
      {
        "id": "relax_23",
        "title": "Prevent anger",
        "task_id": "task_relax",
        "text_template": "relax_23_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_23_audio.mp3",
        "fields::favourite": false,
        "type": "relax_active"
      },
      {
        "id": "relax_24",
        "title": "Angry? Take a break.",
        "task_id": "task_relax",
        "text_template": "relax_24_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_24_audio.mp3",
        "fields::favourite": false,
        "type": "relax_active"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/data/relax_data_list.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "workshop_data_list",
    "status": "released",
    "data_list_name": "workshop",
    "rows": [
      {
        "id": "w_self_care",
        "number": 1,
        "title": "Welcome and Self-Care",
        "in_text_title": "\"Welcome and Self-Care\" workshop",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_treat_yourself.svg",
        "short_title": "Self-Care",
        "tools": "How to add self-care",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": false,
        "relax": "relax_5"
      },
      {
        "id": "w_1on1",
        "number": 2,
        "title": "One-on-One Time",
        "in_text_title": "\"One-on-One Time\" workshop",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_spend_time.svg",
        "tools": "How to spend one-on-one time",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_2",
        "something_fun": "co_chef"
      },
      {
        "id": "w_praise",
        "number": 3,
        "title": "Praise",
        "in_text_title": "\"Praise\" workshop",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_praise_yourself.svg",
        "tools": "How to praise",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_3",
        "something_fun": "reflect_positive"
      },
      {
        "id": "w_instruct",
        "number": 4,
        "title": "Positive Instructions",
        "in_text_title": "\"Positive Instructions\" workshop",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_instruct_positively.svg",
        "tools": "How to give positive instructions",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_4",
        "something_fun": "dance_moves"
      },
      {
        "id": "w_stress",
        "number": 5,
        "title": "Managing Stress",
        "in_text_title": "\"Managing Stress\" workshop",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_breathe.svg",
        "tools": "How to manage stress",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_7",
        "something_fun": "check_in_chat"
      },
      {
        "id": "w_money",
        "number": 6,
        "title": "Family Budgets",
        "in_text_title": "\"Family Budgets\" workshop",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_money.svg",
        "tools": "How to budget & save",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_8",
        "something_fun": "dream_travel"
      },
      {
        "id": "w_rules",
        "number": 7,
        "title": "Rules",
        "in_text_title": "\"Rules\" workshop",
        "tools": "How to create rules",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_9",
        "something_fun": "famous_party"
      },
      {
        "id": "w_consequence",
        "number": 8,
        "title": "Calm Consequences",
        "in_text_title": "\"Calm Consequences\" workshop",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_consequence.svg",
        "tools": "How to give calm consequences",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_10",
        "something_fun": "two_truths"
      },
      {
        "id": "w_solve",
        "number": 9,
        "title": "Problem Solving",
        "in_text_title": "\"Problem Solving\" workshop",
        "tools": "How to solve problems",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_11",
        "something_fun": "mirror"
      },
      {
        "id": "w_safe",
        "number": 10,
        "title": "Teen Safety",
        "in_text_title": "\"Teen Safety\" workshop",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_safe.svg",
        "tools": "How to keep your teen safe",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_12",
        "something_fun": "time_machine"
      },
      {
        "id": "w_crisis",
        "number": 11,
        "title": "Dealing with Crisis",
        "in_text_title": "\"Dealing with Crisis\" workshop",
        "tools": "How to deal with crisis",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_13",
        "something_fun": "superpowers"
      },
      {
        "id": "w_celebrate",
        "number": 12,
        "title": "Celebration and Next Steps",
        "in_text_title": "\"Celebration and Next Steps\" workshop",
        "tools": "How to support each other",
        "completion_level": 0,
        "fields::started": false,
        "fields::completed": false,
        "fields::disabled": true,
        "relax": "relax_14"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/data/workshop_data_list.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "debug_campaign_list",
    "status": "released",
    "rows": [
      {
        "id": "debug_reminder_reset",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_1.sent",
              false
            ],
            "_raw": "set_field: debug_reminder_1.sent: false",
            "_cleaned": "click | set_field: debug_reminder_1.sent: false"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_2.sent",
              false
            ],
            "_raw": "set_field: debug_reminder_2.sent: false",
            "_cleaned": "click | set_field: debug_reminder_2.sent: false"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_3.sent",
              false
            ],
            "_raw": "set_field: debug_reminder_3.sent: false",
            "_cleaned": "click | set_field: debug_reminder_3.sent: false"
          }
        ],
        "priority": -2,
        "campaign_list": [
          "debug_campaign"
        ]
      },
      {
        "id": "debug_reminder_default",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_default.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_default.sent : true",
            "_cleaned": "click | set_field: debug_reminder_default.sent : true"
          }
        ],
        "priority": -1,
        "campaign_list": [
          "debug_campaign",
          "debug_campaign_2"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Default"
      },
      {
        "id": "debug_reminder_1",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_1.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_1.sent : true",
            "_cleaned": "click | set_field: debug_reminder_1.sent : true"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_default.sent"
              }
            },
            "_raw": "get_field | debug_reminder_default.sent:TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_1.sent"
              }
            },
            "_raw": "get_field | debug_reminder_1.sent : true"
          }
        ],
        "campaign_list": [
          "debug_campaign"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": 1
      },
      {
        "id": "debug_reminder_2",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_2.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_2.sent : true",
            "_cleaned": "click | set_field: debug_reminder_2.sent : true"
          }
        ],
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_1.sent"
              }
            },
            "_raw": "get_field | debug_reminder_1.sent:TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_2.sent"
              }
            },
            "_raw": "get_field | debug_reminder_2.sent : true"
          }
        ],
        "campaign_list": [
          "debug_campaign"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": 2
      },
      {
        "id": "debug_reminder_3",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_3.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_3.sent : true",
            "_cleaned": "click | set_field: debug_reminder_3.sent : true"
          }
        ],
        "priority": 3,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "data_events",
                "filter": {
                  "field": "debug_reminder_2.sent",
                  "value": "TRUE"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "2",
                  "unit": "day"
                }
              }
            },
            "_raw": "get_field:first | debug_reminder_2.sent:TRUE | before : 2 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_3.sent"
              }
            },
            "_raw": "get_field | debug_reminder_3.sent : true"
          }
        ],
        "campaign_list": [
          "debug_campaign"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": 3
      },
      {
        "id": "debug_reminder_4",
        "priority": 4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "5",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 5 : day"
          }
        ],
        "campaign_list": [
          "debug_campaign"
        ]
      },
      {
        "id": "debug_reminder_5",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "@global.example_text"
            ],
            "_raw": "pop_up: @global.example_text",
            "_cleaned": "click | pop_up: @global.example_text"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_5.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_5.sent : true",
            "_cleaned": "click | set_field: debug_reminder_5.sent : true"
          }
        ],
        "priority": 1,
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_5.sent"
              }
            },
            "_raw": "get_field | debug_reminder_5.sent : true"
          }
        ],
        "campaign_list": [
          "debug_campaign_2"
        ],
        "icon": "plh_images/icons/bell_white.svg",
        "text": 5
      },
      {
        "id": "debug_reminder_6",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "@global.some_global",
              "some_value"
            ],
            "_raw": "set_field: @global.some_global : some_value",
            "_cleaned": "click | set_field: @global.some_global : some_value"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_6.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_6.sent : true",
            "_cleaned": "click | set_field: debug_reminder_6.sent : true"
          }
        ],
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_5.sent"
              }
            },
            "_raw": "get_field | debug_reminder_5.sent:TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_6.sent"
              }
            },
            "_raw": "get_field | debug_reminder_6.sent : true"
          }
        ],
        "campaign_list": [
          "debug_campaign_2"
        ],
        "icon": "plh_images/icons/bell_white.svg",
        "text": 6
      },
      {
        "id": "debug_reminder_7",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "activity_@data.workshop.1on1.something_fun"
            ],
            "_raw": "go_to: activity_@data.workshop.1on1.something_fun",
            "_cleaned": "click | go_to: activity_@data.workshop.1on1.something_fun"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_7.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_7.sent : true",
            "_cleaned": "click | set_field: debug_reminder_7.sent : true"
          }
        ],
        "priority": 3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_6.sent"
              }
            },
            "_raw": "get_field | debug_reminder_6.sent:TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_7.sent"
              }
            },
            "_raw": "get_field | debug_reminder_7.sent : true"
          }
        ],
        "campaign_list": [
          "debug_campaign_2"
        ],
        "icon": "plh_images/icons/bell_white.svg",
        "text": 7
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_campaigns.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "debug_data_list",
    "status": "released",
    "data_list_name": "debug",
    "rows": [
      {
        "id": "item_1",
        "text": "Item 1 text",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_relax.svg"
      },
      {
        "id": "item_2",
        "text": "Item 2 text",
        "image_asset": "assets/plh_assets/plh_images/icons/play_white.svg"
      },
      {
        "id": "item_3",
        "text": "Item 3 text"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_data_lists.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "debug_variable_data",
    "status": "released",
    "data_list_name": "debug_vars",
    "rows": [
      {
        "id": "number_1",
        "value": 1
      },
      {
        "id": "bool_true",
        "value": true
      },
      {
        "id": "bool_false",
        "value": false
      },
      {
        "id": "number_0",
        "value": 0
      },
      {
        "id": "list_1",
        "value_list": [
          "1",
          "2",
          "3"
        ]
      },
      {
        "id": "text_1",
        "value": "text1"
      },
      {
        "id": "collection_1",
        "value_collection": {
          "key1": "val1",
          "key2": "val2"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "example_data_list",
    "status": "released",
    "data_list_name": "example",
    "rows": [
      {
        "id": "example1",
        "value": "Success - Example 1"
      },
      {
        "id": "example3",
        "value_list": [
          "name:name_var_1 | text:Option 1",
          "name:name_var_2 | text: Option 2"
        ],
        "text": "any fields can be accessed"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_data_lists.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "example_notifications_list",
    "status": "released",
    "rows": [
      {
        "id": "example_notification_1",
        "priority": 1,
        "campaign_list": [
          "example_notifications"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "Example text. Ideally this should be 40-50 characters",
          "delay": {
            "minutes": "2"
          }
        },
        "title": "New message from PLH",
        "text": "Example text. Ideally this should be 40-50 characters",
        "message_length": 53
      },
      {
        "id": "example_notification_2",
        "priority": 2,
        "campaign_list": [
          "example_notifications"
        ],
        "notification_schedule": {
          "title": "New message from PLH",
          "text": "There is no maximum text length, but some longer messages can get cut off.\n\nTypically around on 150-230 IOS and on 450-650 Android",
          "time": {
            "hour": "19",
            "minute": "30"
          },
          "delay": {
            "days": "7"
          }
        },
        "title": "New message from PLH",
        "text": "There is no maximum text length, but some longer messages can get cut off.\n\nTypically around on 150-230 IOS and on 450-650 Android",
        "message_length": 130
      },
      {
        "id": "example_notification_3",
        "priority": 3,
        "campaign_list": [
          "example_notifications"
        ],
        "notification_schedule": {
          "time": {
            "hour": "1",
            "minute": "10"
          },
          "delay": {
            "days": "2",
            "hours": "4",
            "minutes": "30"
          }
        },
        "text": "Text needs to be included in the notification_schedule column. This will not be used otherwise"
      },
      {
        "id": "example_notification_4",
        "notification_schedule": {
          "text": "TODO - text examples with conditions based on fields or previous notifications",
          "delay": {
            "minutes": "1"
          }
        },
        "text": "TODO - text examples with conditions based on fields or previous notifications"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_notifications.xlsx"
  }
]