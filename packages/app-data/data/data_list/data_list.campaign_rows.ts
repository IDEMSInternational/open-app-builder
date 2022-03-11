/* eslint-disable */
import { FlowTypes } from "data-models";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_w_1on1",
    status: "released",
    rows: [
      {
        id: "w_released_w_1on1_ind",
        workshop: "w_1on1",
        message_type: "w_released",
        template_pop_up: "w_1on1_m_w_released",
        message_condition: "_ind",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_released"],
            _raw: "click | pop_up: w_1on1_m_w_released",
            _cleaned: "click | pop_up: w_1on1_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_released.sent", true],
            _raw: "click | set_field: w_1on1_m_w_released.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_released.sent : true",
          },
        ],
        priority: 11.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_started",
                value: false,
              },
            },
            _raw: "get_field | w_1on1_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_1on1_m_w_released.sent : true",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_1on1_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.user_name. Your @data.workshop.w_1on1.in_text_title is ready for you.",
          },
        },
        text: "Hi @fields.user_name. Your @data.workshop.w_1on1.in_text_title is ready for you.",
      },
      {
        id: "w_released_w_1on1_tog",
        workshop: "w_1on1",
        message_type: "w_released",
        template_pop_up: "w_1on1_m_w_released",
        message_condition: "_tog",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_released"],
            _raw: "click | pop_up: w_1on1_m_w_released",
            _cleaned: "click | pop_up: w_1on1_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_released.sent", true],
            _raw: "click | set_field: w_1on1_m_w_released.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_released.sent : true",
          },
        ],
        priority: 11.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_started",
                value: false,
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
                field: "w_1on1_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_1on1_m_w_released.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_1on1_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.group_name. Your @data.workshop.w_1on1.in_text_title is ready for you.",
          },
        },
        text: "Hi @fields.group_name. Your @data.workshop.w_1on1.in_text_title is ready for you.",
      },
      {
        id: "relax_w_1on1",
        workshop: "w_1on1",
        message_type: "relax",
        template_pop_up: "w_1on1_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_relax"],
            _raw: "click | pop_up: w_1on1_m_relax",
            _cleaned: "click | pop_up: w_1on1_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_relax.sent", true],
            _raw: "click | set_field: w_1on1_m_relax.sent : true",
            _cleaned: "click | set_field: w_1on1_m_relax.sent : true",
          },
        ],
        priority: 11.9,
        activation_condition_list: [],
        campaign_list: ["nf_relax"],
        hs_quick_start: "parent_points",
        title: "@global.m_relax",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_relax",
          },
          text: {
            eng: "@global.text_m_relax",
          },
        },
        text: "@global.text_m_relax",
      },
      {
        id: "something_fun_w_1on1",
        workshop: "w_1on1",
        message_type: "something_fun",
        template_pop_up: "w_1on1_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_something_fun"],
            _raw: "click | pop_up: w_1on1_m_something_fun",
            _cleaned: "click | pop_up: w_1on1_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_something_fun.sent", true],
            _raw: "click | set_field: w_1on1_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_1on1_m_something_fun.sent : true",
          },
        ],
        priority: 11.8,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_1on1_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["nf_something_fun"],
        hs_quick_start: "parent_centre",
        title: "@global.m_something_fun",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_something_fun",
          },
          text: {
            eng: "@global.text_m_something_fun",
          },
        },
        text: "@global.text_m_something_fun",
      },
      {
        id: "praise_w_1on1",
        workshop: "w_1on1",
        message_type: "praise",
        template_pop_up: "w_1on1_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_praise"],
            _raw: "click | pop_up: w_1on1_m_praise",
            _cleaned: "click | pop_up: w_1on1_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_praise.sent", true],
            _raw: "click | set_field: w_1on1_m_praise.sent : true",
            _cleaned: "click | set_field: w_1on1_m_praise.sent : true",
          },
        ],
        priority: 11.7,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_1on1_m_praise.sent : true",
          },
        ],
        campaign_list: ["nf_praise"],
        hs_quick_start: "parent_centre",
        title: "@global.m_praise",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_praise",
          },
          text: {
            eng: "You've put so much effort into being a better parent. You are loved and appreciated!",
          },
        },
        text: "You've put so much effort into being a better parent. You are loved and appreciated!",
      },
      {
        id: "w_reminder_w_1on1",
        workshop: "w_1on1",
        message_type: "w_reminder",
        template_pop_up: "w_1on1_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_reminder"],
            _raw: "click | pop_up: w_1on1_m_w_reminder",
            _cleaned: "click | pop_up: w_1on1_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_reminder.sent", true],
            _raw: "click | set_field: w_1on1_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_reminder.sent : true",
          },
        ],
        priority: 11.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_started",
                value: false,
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
                field: "w_1on1_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_1on1_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_1on1_started",
        title: "@global.m_w_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_reminder",
          },
          text: {
            eng: "Thank you for committing to your parenting. \n\nYour @data.workshop.w_1on1.in_text_title is ready for you!",
          },
        },
        text: "Thank you for committing to your parenting. \n\nYour @data.workshop.w_1on1.in_text_title is ready for you!",
      },
      {
        id: "w_in_progress_w_1on1",
        workshop: "w_1on1",
        message_type: "w_in_progress",
        template_pop_up: "w_1on1_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_in_progress"],
            _raw: "click | pop_up: w_1on1_m_w_in_progress",
            _cleaned: "click | pop_up: w_1on1_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_1on1_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_in_progress.sent : true",
          },
        ],
        priority: 11.5,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_1on1_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_started",
                value: false,
              },
            },
            _raw: "get_field | w_1on1_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_1on1_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_1on1_started",
        completion_level_field: "w_1on1_completion_level",
        title: "@global.m_w_in_progress",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_in_progress",
          },
          text: {
            eng: "Spending time with your teen helps build trust. \n\nContinue your @global.parent_app journey for great results.",
          },
        },
        text: "Spending time with your teen helps build trust. \n\nContinue your @global.parent_app journey for great results.",
      },
      {
        id: "hp_reminder_w_1on1",
        workshop: "w_1on1",
        message_type: "hp_reminder",
        template_pop_up: "w_1on1_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_hp_reminder"],
            _raw: "click | pop_up: w_1on1_m_hp_reminder",
            _cleaned: "click | pop_up: w_1on1_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_1on1_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_1on1_m_hp_reminder.sent : true",
          },
        ],
        priority: 11.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_1on1_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_1on1_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_1on1_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "Have you spent time with your teen already?",
          },
        },
        text: "Have you spent time with your teen already?",
      },
      {
        id: "parent_points_overview_w_1on1",
        workshop: "w_1on1",
        message_type: "parent_points_overview",
        template_pop_up: "m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_parent_points_overview.sent", true],
            _raw: "click | set_field: m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: m_parent_points_overview.sent : true",
          },
        ],
        priority: 11.3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["nf_parent_points_overview"],
        hs_quick_start: "parent_points",
        title: "@global.m_parent_points_overview",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_parent_points_overview",
          },
          text: {
            eng: "@global.text_m_parent_points_overview",
          },
        },
        text: "@global.text_m_parent_points_overview",
      },
      {
        id: "hp_review_w_1on1",
        workshop: "w_1on1",
        message_type: "hp_review",
        template_go_to: "w_1on1_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_hp_review"],
            _raw: "click | go_to: w_1on1_hp_review",
            _cleaned: "click | go_to: w_1on1_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["undefined.sent", true],
            _raw: "click | set_field: undefined.sent : true",
            _cleaned: "click | set_field: undefined.sent : true",
          },
        ],
        priority: 11.2,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined.sent",
                value: true,
              },
            },
            _raw: "get_field |  undefined.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_1on1_completion_level :100",
          },
        ],
        campaign_list: ["nf_hp_review"],
        hs_quick_start: "parent_centre",
        completion_level_field: "w_1on1_completion_level",
        title: "@global.hp_review",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.hp_review",
          },
          text: {
            eng: "@global.text_m_hp_review",
          },
        },
        text: "@global.text_m_hp_review",
      },
      {
        id: "w_tomorrow_w_1on1_compl",
        workshop: "w_1on1",
        message_type: "w_tomorrow",
        template_pop_up: "w_1on1_m_w_tomorrow",
        message_condition: "_compl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_tomorrow"],
            _raw: "click | pop_up: w_1on1_m_w_tomorrow",
            _cleaned: "click | pop_up: w_1on1_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_1on1_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_tomorrow.sent : true",
          },
        ],
        priority: 11.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_1on1_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_1on1_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_1on1_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Well done for completing the @data.workshop.w_1on1.in_text_title. Tomorrow, you can access a new workshop to help you relax, enjoy and learn new skills!",
          },
        },
        text: "Well done for completing the @data.workshop.w_1on1.in_text_title. Tomorrow, you can access a new workshop to help you relax, enjoy and learn new skills!",
      },
      {
        id: "w_tomorrow_w_1on1_incompl",
        workshop: "w_1on1",
        message_type: "w_tomorrow",
        template_pop_up: "w_1on1_m_w_tomorrow",
        message_condition: "_incompl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_tomorrow"],
            _raw: "click | pop_up: w_1on1_m_w_tomorrow",
            _cleaned: "click | pop_up: w_1on1_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_1on1_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_tomorrow.sent : true",
          },
        ],
        priority: 11.1,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_1on1_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_1on1_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_1on1_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Remember to finish the @data.workshop.w_1on1.in_text_title. You will get valuable information within minutes! \n\nWell done for trying to be a better parent.",
          },
        },
        text: "Remember to finish the @data.workshop.w_1on1.in_text_title. You will get valuable information within minutes! \n\nWell done for trying to be a better parent.",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_w_praise",
    status: "released",
    rows: [
      {
        id: "w_released_w_praise_ind",
        workshop: "w_praise",
        message_type: "w_released",
        template_pop_up: "w_praise_m_w_released",
        message_condition: "_ind",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_released"],
            _raw: "click | pop_up: w_praise_m_w_released",
            _cleaned: "click | pop_up: w_praise_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_released.sent", true],
            _raw: "click | set_field: w_praise_m_w_released.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_released.sent : true",
          },
        ],
        priority: 10.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_started",
                value: false,
              },
            },
            _raw: "get_field | w_praise_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_praise_m_w_released.sent : true",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_praise_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.user_name! You're starting your third  @global.parent_app week. \n\nA new workshop is ready!",
          },
        },
        text: "Hi @fields.user_name! You're starting your third  @global.parent_app week. \n\nA new workshop is ready!",
      },
      {
        id: "w_released_w_praise_tog",
        workshop: "w_praise",
        message_type: "w_released",
        template_pop_up: "w_praise_m_w_released",
        message_condition: "_tog",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_released"],
            _raw: "click | pop_up: w_praise_m_w_released",
            _cleaned: "click | pop_up: w_praise_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_released.sent", true],
            _raw: "click | set_field: w_praise_m_w_released.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_released.sent : true",
          },
        ],
        priority: 10.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_started",
                value: false,
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
                field: "w_praise_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_praise_m_w_released.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_praise_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.group_name! You're starting your third  @global.parent_app week. \n\nA new workshop is ready!",
          },
        },
        text: "Hi @fields.group_name! You're starting your third  @global.parent_app week. \n\nA new workshop is ready!",
      },
      {
        id: "relax_w_praise",
        workshop: "w_praise",
        message_type: "relax",
        template_pop_up: "w_praise_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_relax"],
            _raw: "click | pop_up: w_praise_m_relax",
            _cleaned: "click | pop_up: w_praise_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_relax.sent", true],
            _raw: "click | set_field: w_praise_m_relax.sent : true",
            _cleaned: "click | set_field: w_praise_m_relax.sent : true",
          },
        ],
        priority: 10.9,
        activation_condition_list: [],
        campaign_list: ["nf_relax"],
        hs_quick_start: "parent_points",
        title: "@global.m_relax",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_relax",
          },
          text: {
            eng: "@global.text_m_relax",
          },
        },
        text: "@global.text_m_relax",
      },
      {
        id: "something_fun_w_praise",
        workshop: "w_praise",
        message_type: "something_fun",
        template_pop_up: "w_praise_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_something_fun"],
            _raw: "click | pop_up: w_praise_m_something_fun",
            _cleaned: "click | pop_up: w_praise_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_something_fun.sent", true],
            _raw: "click | set_field: w_praise_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_praise_m_something_fun.sent : true",
          },
        ],
        priority: 10.8,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_praise_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["nf_something_fun"],
        hs_quick_start: "parent_centre",
        title: "@global.m_something_fun",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_something_fun",
          },
          text: {
            eng: "@global.text_m_something_fun",
          },
        },
        text: "@global.text_m_something_fun",
      },
      {
        id: "praise_w_praise",
        workshop: "w_praise",
        message_type: "praise",
        template_pop_up: "w_praise_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_praise"],
            _raw: "click | pop_up: w_praise_m_praise",
            _cleaned: "click | pop_up: w_praise_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_praise.sent", true],
            _raw: "click | set_field: w_praise_m_praise.sent : true",
            _cleaned: "click | set_field: w_praise_m_praise.sent : true",
          },
        ],
        priority: 10.7,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_praise_m_praise.sent : true",
          },
        ],
        campaign_list: ["nf_praise"],
        hs_quick_start: "parent_centre",
        title: "@global.m_praise",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_praise",
          },
          text: {
            eng: "Well done for using @global.parent_app! Remember, small things make a big difference.",
          },
        },
        text: "Well done for using @global.parent_app! Remember, small things make a big difference.",
      },
      {
        id: "w_reminder_w_praise",
        workshop: "w_praise",
        message_type: "w_reminder",
        template_pop_up: "w_praise_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_reminder"],
            _raw: "click | pop_up: w_praise_m_w_reminder",
            _cleaned: "click | pop_up: w_praise_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_reminder.sent", true],
            _raw: "click | set_field: w_praise_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_reminder.sent : true",
          },
        ],
        priority: 10.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_started",
                value: false,
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
                field: "w_praise_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_praise_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_praise_started",
        title: "@global.m_w_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_reminder",
          },
          text: {
            eng: "Thank you for investing in yourself and your family.Try the @data.workshop.w_praise.in_text_title to build a great parenting skill!",
          },
        },
        text: "Thank you for investing in yourself and your family.Try the @data.workshop.w_praise.in_text_title to build a great parenting skill!",
      },
      {
        id: "w_in_progress_w_praise",
        workshop: "w_praise",
        message_type: "w_in_progress",
        template_pop_up: "w_praise_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_in_progress"],
            _raw: "click | pop_up: w_praise_m_w_in_progress",
            _cleaned: "click | pop_up: w_praise_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_praise_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_in_progress.sent : true",
          },
        ],
        priority: 10.5,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_praise_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_started",
                value: false,
              },
            },
            _raw: "get_field | w_praise_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_praise_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_praise_started",
        completion_level_field: "w_praise_completion_level",
        title: "@global.m_w_in_progress",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_in_progress",
          },
          text: {
            eng: "Praise makes all the difference. \n\nFinish the @data.workshop.w_praise.in_text_title to see how to use it in YOUR family.",
          },
        },
        text: "Praise makes all the difference. \n\nFinish the @data.workshop.w_praise.in_text_title to see how to use it in YOUR family.",
      },
      {
        id: "hp_reminder_w_praise",
        workshop: "w_praise",
        message_type: "hp_reminder",
        template_pop_up: "w_praise_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_hp_reminder"],
            _raw: "click | pop_up: w_praise_m_hp_reminder",
            _cleaned: "click | pop_up: w_praise_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_praise_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_praise_m_hp_reminder.sent : true",
          },
        ],
        priority: 10.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_praise_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_praise_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_praise_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "Praise your teen for one thing they did well. \n\nAnd when last did you praise yourself or another adult? Try it!",
          },
        },
        text: "Praise your teen for one thing they did well. \n\nAnd when last did you praise yourself or another adult? Try it!",
      },
      {
        id: "parent_points_overview_w_praise",
        workshop: "w_praise",
        message_type: "parent_points_overview",
        template_pop_up: "m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_parent_points_overview.sent", true],
            _raw: "click | set_field: m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: m_parent_points_overview.sent : true",
          },
        ],
        priority: 10.3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["nf_parent_points_overview"],
        hs_quick_start: "parent_points",
        title: "@global.m_parent_points_overview",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_parent_points_overview",
          },
          text: {
            eng: "@global.text_m_parent_points_overview",
          },
        },
        text: "@global.text_m_parent_points_overview",
      },
      {
        id: "hp_review_w_praise",
        workshop: "w_praise",
        message_type: "hp_review",
        template_go_to: "w_praise_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_hp_review"],
            _raw: "click | go_to: w_praise_hp_review",
            _cleaned: "click | go_to: w_praise_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["undefined.sent", true],
            _raw: "click | set_field: undefined.sent : true",
            _cleaned: "click | set_field: undefined.sent : true",
          },
        ],
        priority: 10.2,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined.sent",
                value: true,
              },
            },
            _raw: "get_field |  undefined.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_praise_completion_level :100",
          },
        ],
        campaign_list: ["nf_hp_review"],
        hs_quick_start: "parent_centre",
        completion_level_field: "w_praise_completion_level",
        title: "@global.hp_review",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.hp_review",
          },
          text: {
            eng: "@global.text_m_hp_review",
          },
        },
        text: "@global.text_m_hp_review",
      },
      {
        id: "w_tomorrow_w_praise_compl",
        workshop: "w_praise",
        message_type: "w_tomorrow",
        template_pop_up: "w_praise_m_w_tomorrow",
        message_condition: "_compl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_tomorrow"],
            _raw: "click | pop_up: w_praise_m_w_tomorrow",
            _cleaned: "click | pop_up: w_praise_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_praise_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_tomorrow.sent : true",
          },
        ],
        priority: 10.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_praise_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_praise_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_praise_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Amazing, you completed the @data.workshop.w_praise.in_text_title. A new workshop is ready tomorrow. Try it - you will see a change in your teen’s behaviour.",
          },
        },
        text: "Amazing, you completed the @data.workshop.w_praise.in_text_title. A new workshop is ready tomorrow. Try it - you will see a change in your teen’s behaviour.",
      },
      {
        id: "w_tomorrow_w_praise_incompl",
        workshop: "w_praise",
        message_type: "w_tomorrow",
        template_pop_up: "w_praise_m_w_tomorrow",
        message_condition: "_incompl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_tomorrow"],
            _raw: "click | pop_up: w_praise_m_w_tomorrow",
            _cleaned: "click | pop_up: w_praise_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_praise_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_tomorrow.sent : true",
          },
        ],
        priority: 10.1,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_praise_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_praise_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_praise_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Hi @global.user_name, a new workshop awaits you tomorrow!\n\nIt seems like you haven’t finished the @data.workshop.w_praise.in_text_title. It’s short (promise!) – give it a go when you have a few minutes.",
          },
        },
        text: "Hi @global.user_name, a new workshop awaits you tomorrow!\n\nIt seems like you haven’t finished the @data.workshop.w_praise.in_text_title. It’s short (promise!) – give it a go when you have a few minutes.",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_w_instruct",
    status: "released",
    rows: [
      {
        id: "w_released_w_instruct_ind",
        workshop: "w_instruct",
        message_type: "w_released",
        template_pop_up: "w_instruct_m_w_released",
        message_condition: "_ind",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_released"],
            _raw: "click | pop_up: w_instruct_m_w_released",
            _cleaned: "click | pop_up: w_instruct_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_released.sent", true],
            _raw: "click | set_field: w_instruct_m_w_released.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_released.sent : true",
          },
        ],
        priority: 9.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_started",
                value: false,
              },
            },
            _raw: "get_field | w_instruct_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_instruct_m_w_released.sent : true",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_instruct_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.user_name, well done for starting week 4! \n\nThis week helps increase your chances of getting your teen to do what you ask them.",
          },
        },
        text: "Hi @fields.user_name, well done for starting week 4! \n\nThis week helps increase your chances of getting your teen to do what you ask them.",
      },
      {
        id: "w_released_w_instruct_tog",
        workshop: "w_instruct",
        message_type: "w_released",
        template_pop_up: "w_instruct_m_w_released",
        message_condition: "_tog",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_released"],
            _raw: "click | pop_up: w_instruct_m_w_released",
            _cleaned: "click | pop_up: w_instruct_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_released.sent", true],
            _raw: "click | set_field: w_instruct_m_w_released.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_released.sent : true",
          },
        ],
        priority: 9.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_started",
                value: false,
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
                field: "w_instruct_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_instruct_m_w_released.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_instruct_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.group_name, well done for starting week 4!\n\nThis week helps increase your chances of getting your teen to do what you ask them.",
          },
        },
        text: "Hi @fields.group_name, well done for starting week 4!\n\nThis week helps increase your chances of getting your teen to do what you ask them.",
      },
      {
        id: "relax_w_instruct",
        workshop: "w_instruct",
        message_type: "relax",
        template_pop_up: "w_instruct_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_relax"],
            _raw: "click | pop_up: w_instruct_m_relax",
            _cleaned: "click | pop_up: w_instruct_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_relax.sent", true],
            _raw: "click | set_field: w_instruct_m_relax.sent : true",
            _cleaned: "click | set_field: w_instruct_m_relax.sent : true",
          },
        ],
        priority: 9.9,
        activation_condition_list: [],
        campaign_list: ["nf_relax"],
        hs_quick_start: "parent_points",
        title: "@global.m_relax",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_relax",
          },
          text: {
            eng: "@global.text_m_relax",
          },
        },
        text: "@global.text_m_relax",
      },
      {
        id: "something_fun_w_instruct",
        workshop: "w_instruct",
        message_type: "something_fun",
        template_pop_up: "w_instruct_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_something_fun"],
            _raw: "click | pop_up: w_instruct_m_something_fun",
            _cleaned: "click | pop_up: w_instruct_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_something_fun.sent", true],
            _raw: "click | set_field: w_instruct_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_instruct_m_something_fun.sent : true",
          },
        ],
        priority: 9.8,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_instruct_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["nf_something_fun"],
        hs_quick_start: "parent_centre",
        title: "@global.m_something_fun",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_something_fun",
          },
          text: {
            eng: "@global.text_m_something_fun",
          },
        },
        text: "@global.text_m_something_fun",
      },
      {
        id: "praise_w_instruct",
        workshop: "w_instruct",
        message_type: "praise",
        template_pop_up: "w_instruct_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_praise"],
            _raw: "click | pop_up: w_instruct_m_praise",
            _cleaned: "click | pop_up: w_instruct_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_praise.sent", true],
            _raw: "click | set_field: w_instruct_m_praise.sent : true",
            _cleaned: "click | set_field: w_instruct_m_praise.sent : true",
          },
        ],
        priority: 9.7,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_instruct_m_praise.sent : true",
          },
        ],
        campaign_list: ["nf_praise"],
        hs_quick_start: "parent_centre",
        title: "@global.m_praise",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_praise",
          },
          text: {
            eng: "Be kind to yourself. No parent is perfect. Using @global.parent_app shows you care!",
          },
        },
        text: "Be kind to yourself. No parent is perfect. Using @global.parent_app shows you care!",
      },
      {
        id: "w_reminder_w_instruct",
        workshop: "w_instruct",
        message_type: "w_reminder",
        template_pop_up: "w_instruct_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_reminder"],
            _raw: "click | pop_up: w_instruct_m_w_reminder",
            _cleaned: "click | pop_up: w_instruct_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_reminder.sent", true],
            _raw: "click | set_field: w_instruct_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_reminder.sent : true",
          },
        ],
        priority: 9.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_started",
                value: false,
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
                field: "w_instruct_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_instruct_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_instruct_started",
        title: "@global.m_w_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_reminder",
          },
          text: {
            eng: "Teens don’t always listen. Look at this week's workshop to learn how positive instructions can help.",
          },
        },
        text: "Teens don’t always listen. Look at this week's workshop to learn how positive instructions can help.",
      },
      {
        id: "w_in_progress_w_instruct",
        workshop: "w_instruct",
        message_type: "w_in_progress",
        template_pop_up: "w_instruct_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_in_progress"],
            _raw: "click | pop_up: w_instruct_m_w_in_progress",
            _cleaned: "click | pop_up: w_instruct_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_instruct_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_in_progress.sent : true",
          },
        ],
        priority: 9.5,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_instruct_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_started",
                value: false,
              },
            },
            _raw: "get_field | w_instruct_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_instruct_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_instruct_started",
        completion_level_field: "w_instruct_completion_level",
        title: "@global.m_w_in_progress",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_in_progress",
          },
          text: {
            eng: "Positive instructions improves behaviour.\n\nComplete the @data.workshop.w_instruct.in_text_title for ideas on how this can work in your family.",
          },
        },
        text: "Positive instructions improves behaviour.\n\nComplete the @data.workshop.w_instruct.in_text_title for ideas on how this can work in your family.",
      },
      {
        id: "hp_reminder_w_instruct_once",
        workshop: "w_instruct",
        message_type: "hp_reminder",
        template_pop_up: "w_instruct_m_hp_reminder",
        message_condition: "_once",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_hp_reminder"],
            _raw: "click | pop_up: w_instruct_m_hp_reminder",
            _cleaned: "click | pop_up: w_instruct_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_instruct_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_instruct_m_hp_reminder.sent : true",
          },
        ],
        priority: 9.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_instruct_completion_level :100",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "parent_point_count_instruct_positively",
                value: "1",
              },
            },
            _raw: "get_field | parent_point_count_instruct_positively : 1",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_instruct_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_instruct_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "You’ve already marked the @global.parent_point @data.habit.instruct_positively.title once – you’re making great progress.",
          },
        },
        text: "You’ve already marked the @global.parent_point @data.habit.instruct_positively.title once – you’re making great progress.",
      },
      {
        id: "hp_reminder_w_instruct_multi",
        workshop: "w_instruct",
        message_type: "hp_reminder",
        template_pop_up: "w_instruct_m_hp_reminder",
        message_condition: "_multi",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_hp_reminder"],
            _raw: "click | pop_up: w_instruct_m_hp_reminder",
            _cleaned: "click | pop_up: w_instruct_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_instruct_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_instruct_m_hp_reminder.sent : true",
          },
        ],
        priority: 9.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined",
                value: "100",
              },
            },
            _raw: "get_field | undefined :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_instruct_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "parent_point_count_instruct_positively",
                value: "0",
              },
            },
            _raw: "get_field | parent_point_count_instruct_positively : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "parent_point_count_instruct_positively",
                value: "1",
              },
            },
            _raw: "get_field | parent_point_count_instruct_positively : 1",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "You’ve already marked the @global.parent_point @data.habit.instruct_positively.title @fields.parent_point_count_instruct_positively times – you’re making great progress.",
          },
        },
        text: "You’ve already marked the @global.parent_point @data.habit.instruct_positively.title @fields.parent_point_count_instruct_positively times – you’re making great progress.",
      },
      {
        id: "parent_points_overview_w_instruct",
        workshop: "w_instruct",
        message_type: "parent_points_overview",
        template_pop_up: "m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_parent_points_overview.sent", true],
            _raw: "click | set_field: m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: m_parent_points_overview.sent : true",
          },
        ],
        priority: 9.3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["nf_parent_points_overview"],
        hs_quick_start: "parent_points",
        title: "@global.m_parent_points_overview",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_parent_points_overview",
          },
          text: {
            eng: "@global.text_m_parent_points_overview",
          },
        },
        text: "@global.text_m_parent_points_overview",
      },
      {
        id: "hp_review_w_instruct",
        workshop: "w_instruct",
        message_type: "hp_review",
        template_go_to: "w_instruct_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_hp_review"],
            _raw: "click | go_to: w_instruct_hp_review",
            _cleaned: "click | go_to: w_instruct_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["undefined.sent", true],
            _raw: "click | set_field: undefined.sent : true",
            _cleaned: "click | set_field: undefined.sent : true",
          },
        ],
        priority: 9.2,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined.sent",
                value: true,
              },
            },
            _raw: "get_field |  undefined.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_instruct_completion_level :100",
          },
        ],
        campaign_list: ["nf_hp_review"],
        hs_quick_start: "parent_centre",
        completion_level_field: "w_instruct_completion_level",
        title: "@global.hp_review",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.hp_review",
          },
          text: {
            eng: "@global.text_m_hp_review",
          },
        },
        text: "@global.text_m_hp_review",
      },
      {
        id: "w_tomorrow_w_instruct_compl",
        workshop: "w_instruct",
        message_type: "w_tomorrow",
        template_pop_up: "w_instruct_m_w_tomorrow",
        message_condition: "_compl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_tomorrow"],
            _raw: "click | pop_up: w_instruct_m_w_tomorrow",
            _cleaned: "click | pop_up: w_instruct_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_instruct_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_tomorrow.sent : true",
          },
        ],
        priority: 9.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_instruct_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_instruct_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_instruct_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Congratulations, you completed the @data.workshop.w_instruct.in_text_title.\n\nTomorrow, a new workshop is ready for you. See a big difference by making small changes!",
          },
        },
        text: "Congratulations, you completed the @data.workshop.w_instruct.in_text_title.\n\nTomorrow, a new workshop is ready for you. See a big difference by making small changes!",
      },
      {
        id: "w_tomorrow_w_instruct_incompl",
        workshop: "w_instruct",
        message_type: "w_tomorrow",
        template_pop_up: "w_instruct_m_w_tomorrow",
        message_condition: "_incompl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_tomorrow"],
            _raw: "click | pop_up: w_instruct_m_w_tomorrow",
            _cleaned: "click | pop_up: w_instruct_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_instruct_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_tomorrow.sent : true",
          },
        ],
        priority: 9.1,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_instruct_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_instruct_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_instruct_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Some parents use the app after their evening meal. Why not complete the @data.workshop.w_instruct.in_text_title when you have a few minutes?",
          },
        },
        text: "Some parents use the app after their evening meal. Why not complete the @data.workshop.w_instruct.in_text_title when you have a few minutes?",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_w_stress",
    status: "released",
    rows: [
      {
        id: "w_released_w_stress_ind",
        workshop: "w_stress",
        message_type: "w_released",
        template_pop_up: "w_stress_m_w_released",
        message_condition: "_ind",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_released"],
            _raw: "click | pop_up: w_stress_m_w_released",
            _cleaned: "click | pop_up: w_stress_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_released.sent", true],
            _raw: "click | set_field: w_stress_m_w_released.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_released.sent : true",
          },
        ],
        priority: 8.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_started",
                value: false,
              },
            },
            _raw: "get_field | w_stress_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_stress_m_w_released.sent : true",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_stress_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.user_name! Congratulations for starting week 5.\n\nA new workshop awaits with tips on staying calm and in control when our teens drive us crazy.",
          },
        },
        text: "Hi @fields.user_name! Congratulations for starting week 5.\n\nA new workshop awaits with tips on staying calm and in control when our teens drive us crazy.",
      },
      {
        id: "w_released_w_stress_tog",
        workshop: "w_stress",
        message_type: "w_released",
        template_pop_up: "w_stress_m_w_released",
        message_condition: "_tog",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_released"],
            _raw: "click | pop_up: w_stress_m_w_released",
            _cleaned: "click | pop_up: w_stress_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_released.sent", true],
            _raw: "click | set_field: w_stress_m_w_released.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_released.sent : true",
          },
        ],
        priority: 8.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_started",
                value: false,
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
                field: "w_stress_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_stress_m_w_released.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_stress_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.group_name! Congratulations for starting week 5.\n\nA new workshop awaits with tips on staying calm and in control when our teens drive us crazy.",
          },
        },
        text: "Hi @fields.group_name! Congratulations for starting week 5.\n\nA new workshop awaits with tips on staying calm and in control when our teens drive us crazy.",
      },
      {
        id: "relax_w_stress",
        workshop: "w_stress",
        message_type: "relax",
        template_pop_up: "w_stress_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_relax"],
            _raw: "click | pop_up: w_stress_m_relax",
            _cleaned: "click | pop_up: w_stress_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_relax.sent", true],
            _raw: "click | set_field: w_stress_m_relax.sent : true",
            _cleaned: "click | set_field: w_stress_m_relax.sent : true",
          },
        ],
        priority: 8.9,
        activation_condition_list: [],
        campaign_list: ["nf_relax"],
        hs_quick_start: "parent_points",
        title: "@global.m_relax",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_relax",
          },
          text: {
            eng: "@global.text_m_relax",
          },
        },
        text: "@global.text_m_relax",
      },
      {
        id: "something_fun_w_stress",
        workshop: "w_stress",
        message_type: "something_fun",
        template_pop_up: "w_stress_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_something_fun"],
            _raw: "click | pop_up: w_stress_m_something_fun",
            _cleaned: "click | pop_up: w_stress_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_something_fun.sent", true],
            _raw: "click | set_field: w_stress_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_stress_m_something_fun.sent : true",
          },
        ],
        priority: 8.8,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_stress_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["nf_something_fun"],
        hs_quick_start: "parent_centre",
        title: "@global.m_something_fun",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_something_fun",
          },
          text: {
            eng: "@global.text_m_something_fun",
          },
        },
        text: "@global.text_m_something_fun",
      },
      {
        id: "praise_w_stress",
        workshop: "w_stress",
        message_type: "praise",
        template_pop_up: "w_stress_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_praise"],
            _raw: "click | pop_up: w_stress_m_praise",
            _cleaned: "click | pop_up: w_stress_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_praise.sent", true],
            _raw: "click | set_field: w_stress_m_praise.sent : true",
            _cleaned: "click | set_field: w_stress_m_praise.sent : true",
          },
        ],
        priority: 8.7,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_stress_m_praise.sent : true",
          },
        ],
        campaign_list: ["nf_praise"],
        hs_quick_start: "parent_centre",
        title: "@global.m_praise",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_praise",
          },
          text: {
            eng: "Manage anger and stress with this new workshop. It helps you take better care of yourself.",
          },
        },
        text: "Manage anger and stress with this new workshop. It helps you take better care of yourself.",
      },
      {
        id: "w_reminder_w_stress",
        workshop: "w_stress",
        message_type: "w_reminder",
        template_pop_up: "w_stress_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_reminder"],
            _raw: "click | pop_up: w_stress_m_w_reminder",
            _cleaned: "click | pop_up: w_stress_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_reminder.sent", true],
            _raw: "click | set_field: w_stress_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_reminder.sent : true",
          },
        ],
        priority: 8.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_started",
                value: false,
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
                field: "w_stress_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_stress_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_stress_started",
        title: "@global.m_w_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_reminder",
          },
          text: {
            eng: "Manage anger and stress with this new workshop. It helps you take better care of yourself.",
          },
        },
        text: "Manage anger and stress with this new workshop. It helps you take better care of yourself.",
      },
      {
        id: "w_in_progress_w_stress",
        workshop: "w_stress",
        message_type: "w_in_progress",
        template_pop_up: "w_stress_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_in_progress"],
            _raw: "click | pop_up: w_stress_m_w_in_progress",
            _cleaned: "click | pop_up: w_stress_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_stress_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_in_progress.sent : true",
          },
        ],
        priority: 8.5,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_stress_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_started",
                value: false,
              },
            },
            _raw: "get_field | w_stress_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_stress_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_stress_started",
        completion_level_field: "w_stress_completion_level",
        title: "@global.m_w_in_progress",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_in_progress",
          },
          text: {
            eng: "Feeling overwhelmed? Deep breaths help. \n\nComplete the @data.workshop.w_stress.in_text_title to help you deal with stress.",
          },
        },
        text: "Feeling overwhelmed? Deep breaths help. \n\nComplete the @data.workshop.w_stress.in_text_title to help you deal with stress.",
      },
      {
        id: "hp_reminder_w_stress_no",
        workshop: "w_stress",
        message_type: "hp_reminder",
        template_pop_up: "w_stress_m_hp_reminder",
        message_condition: "_no",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_hp_reminder"],
            _raw: "click | pop_up: w_stress_m_hp_reminder",
            _cleaned: "click | pop_up: w_stress_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_stress_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_stress_m_hp_reminder.sent : true",
          },
        ],
        priority: 8.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_stress_completion_level :100",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "parent_point_count_breathe",
                value: "0",
              },
            },
            _raw: "get_field | parent_point_count_breathe : 0",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_stress_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_stress_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "Feeling stressed this week? Try taking deep breaths before responding to your teen - it makes a big difference.",
          },
        },
        text: "Feeling stressed this week? Try taking deep breaths before responding to your teen - it makes a big difference.",
      },
      {
        id: "hp_reminder_w_stress_yes",
        workshop: "w_stress",
        message_type: "hp_reminder",
        template_pop_up: "w_stress_m_hp_reminder",
        message_condition: "_yes",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_hp_reminder"],
            _raw: "click | pop_up: w_stress_m_hp_reminder",
            _cleaned: "click | pop_up: w_stress_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_stress_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_stress_m_hp_reminder.sent : true",
          },
        ],
        priority: 8.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_stress_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_stress_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "parent_point_count_breathe",
                value: "0",
              },
            },
            _raw: "get_field | parent_point_count_breathe : 0",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_stress_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "Well done for taking a big breath before responding to your teen! Each time you take a pause, you take back control.",
          },
        },
        text: "Well done for taking a big breath before responding to your teen! Each time you take a pause, you take back control.",
      },
      {
        id: "parent_points_overview_w_stress",
        workshop: "w_stress",
        message_type: "parent_points_overview",
        template_pop_up: "m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_parent_points_overview.sent", true],
            _raw: "click | set_field: m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: m_parent_points_overview.sent : true",
          },
        ],
        priority: 8.3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["nf_parent_points_overview"],
        hs_quick_start: "parent_points",
        title: "@global.m_parent_points_overview",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_parent_points_overview",
          },
          text: {
            eng: "@global.text_m_parent_points_overview",
          },
        },
        text: "@global.text_m_parent_points_overview",
      },
      {
        id: "hp_review_w_stress",
        workshop: "w_stress",
        message_type: "hp_review",
        template_go_to: "w_stress_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_hp_review"],
            _raw: "click | go_to: w_stress_hp_review",
            _cleaned: "click | go_to: w_stress_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["undefined.sent", true],
            _raw: "click | set_field: undefined.sent : true",
            _cleaned: "click | set_field: undefined.sent : true",
          },
        ],
        priority: 8.2,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined.sent",
                value: true,
              },
            },
            _raw: "get_field |  undefined.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_stress_completion_level :100",
          },
        ],
        campaign_list: ["nf_hp_review"],
        hs_quick_start: "parent_centre",
        completion_level_field: "w_stress_completion_level",
        title: "@global.hp_review",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.hp_review",
          },
          text: {
            eng: "@global.text_m_hp_review",
          },
        },
        text: "@global.text_m_hp_review",
      },
      {
        id: "w_tomorrow_w_stress_compl",
        workshop: "w_stress",
        message_type: "w_tomorrow",
        template_pop_up: "w_stress_m_w_tomorrow",
        message_condition: "_compl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_tomorrow"],
            _raw: "click | pop_up: w_stress_m_w_tomorrow",
            _cleaned: "click | pop_up: w_stress_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_stress_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_tomorrow.sent : true",
          },
        ],
        priority: 8.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_stress_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_stress_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_stress_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Well done for completing the @data.workshop.w_stress.in_text_title. Tomorrow, access a new workshop to help you relax and build valuable skills!",
          },
        },
        text: "Well done for completing the @data.workshop.w_stress.in_text_title. Tomorrow, access a new workshop to help you relax and build valuable skills!",
      },
      {
        id: "w_tomorrow_w_stress_incompl",
        workshop: "w_stress",
        message_type: "w_tomorrow",
        template_pop_up: "w_stress_m_w_tomorrow",
        message_condition: "_incompl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_tomorrow"],
            _raw: "click | pop_up: w_stress_m_w_tomorrow",
            _cleaned: "click | pop_up: w_stress_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_stress_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_tomorrow.sent : true",
          },
        ],
        priority: 8.1,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_stress_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_stress_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_stress_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Get ready for a new workshop tomorrow. \n \n By completing the @data.workshop.w_stress.in_text_title first, you lay a key foundation: If you feel good, your family will too!",
          },
        },
        text: "Get ready for a new workshop tomorrow. \n \n By completing the @data.workshop.w_stress.in_text_title first, you lay a key foundation: If you feel good, your family will too!",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_w_money",
    status: "released",
    rows: [
      {
        id: "w_released_w_money_ind",
        workshop: "w_money",
        message_type: "w_released",
        template_pop_up: "w_money_m_w_released",
        message_condition: "_ind",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_released"],
            _raw: "click | pop_up: w_money_m_w_released",
            _cleaned: "click | pop_up: w_money_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_released.sent", true],
            _raw: "click | set_field: w_money_m_w_released.sent : true",
            _cleaned: "click | set_field: w_money_m_w_released.sent : true",
          },
        ],
        priority: 7.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_started",
                value: false,
              },
            },
            _raw: "get_field | w_money_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_money_m_w_released.sent : true",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_money_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.user_name! Amazing, this is your second month with @global.parent_app.\n\nMost families struggle with money. This workshop will give you tools to plan your expenses to help you through the month.",
          },
        },
        text: "Hi @fields.user_name! Amazing, this is your second month with @global.parent_app.\n\nMost families struggle with money. This workshop will give you tools to plan your expenses to help you through the month.",
      },
      {
        id: "w_released_w_money_tog",
        workshop: "w_money",
        message_type: "w_released",
        template_pop_up: "w_money_m_w_released",
        message_condition: "_tog",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_released"],
            _raw: "click | pop_up: w_money_m_w_released",
            _cleaned: "click | pop_up: w_money_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_released.sent", true],
            _raw: "click | set_field: w_money_m_w_released.sent : true",
            _cleaned: "click | set_field: w_money_m_w_released.sent : true",
          },
        ],
        priority: 7.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_started",
                value: false,
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
                field: "w_money_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_money_m_w_released.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_money_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.group_name! Amazing, this is your second month with @global.parent_app. \n\nMost families struggle with money. This workshop will give you tools to plan your expenses to help you through the month.",
          },
        },
        text: "Hi @fields.group_name! Amazing, this is your second month with @global.parent_app. \n\nMost families struggle with money. This workshop will give you tools to plan your expenses to help you through the month.",
      },
      {
        id: "relax_w_money",
        workshop: "w_money",
        message_type: "relax",
        template_pop_up: "w_money_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_relax"],
            _raw: "click | pop_up: w_money_m_relax",
            _cleaned: "click | pop_up: w_money_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_relax.sent", true],
            _raw: "click | set_field: w_money_m_relax.sent : true",
            _cleaned: "click | set_field: w_money_m_relax.sent : true",
          },
        ],
        priority: 7.9,
        activation_condition_list: [],
        campaign_list: ["nf_relax"],
        hs_quick_start: "parent_points",
        title: "@global.m_relax",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_relax",
          },
          text: {
            eng: "@global.text_m_relax",
          },
        },
        text: "@global.text_m_relax",
      },
      {
        id: "something_fun_w_money",
        workshop: "w_money",
        message_type: "something_fun",
        template_pop_up: "w_money_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_something_fun"],
            _raw: "click | pop_up: w_money_m_something_fun",
            _cleaned: "click | pop_up: w_money_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_something_fun.sent", true],
            _raw: "click | set_field: w_money_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_money_m_something_fun.sent : true",
          },
        ],
        priority: 7.8,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_money_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["nf_something_fun"],
        hs_quick_start: "parent_centre",
        title: "@global.m_something_fun",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_something_fun",
          },
          text: {
            eng: "@global.text_m_something_fun",
          },
        },
        text: "@global.text_m_something_fun",
      },
      {
        id: "praise_w_money",
        workshop: "w_money",
        message_type: "praise",
        template_pop_up: "w_money_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_praise"],
            _raw: "click | pop_up: w_money_m_praise",
            _cleaned: "click | pop_up: w_money_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_praise.sent", true],
            _raw: "click | set_field: w_money_m_praise.sent : true",
            _cleaned: "click | set_field: w_money_m_praise.sent : true",
          },
        ],
        priority: 7.7,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_money_m_praise.sent : true",
          },
        ],
        campaign_list: ["nf_praise"],
        hs_quick_start: "parent_centre",
        title: "@global.m_praise",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_praise",
          },
          text: {
            eng: "You are not alone. Parents around the world are going through the same struggles. \n\nYou are doing your best and we are proud of you!",
          },
        },
        text: "You are not alone. Parents around the world are going through the same struggles. \n\nYou are doing your best and we are proud of you!",
      },
      {
        id: "w_reminder_w_money",
        workshop: "w_money",
        message_type: "w_reminder",
        template_pop_up: "w_money_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_reminder"],
            _raw: "click | pop_up: w_money_m_w_reminder",
            _cleaned: "click | pop_up: w_money_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_reminder.sent", true],
            _raw: "click | set_field: w_money_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_money_m_w_reminder.sent : true",
          },
        ],
        priority: 7.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_started",
                value: false,
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
                field: "w_money_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_money_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_money_started",
        title: "@global.m_w_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_reminder",
          },
          text: {
            eng: "Stressed about money? Does your teen ask for things you can’t afford? \n\nThis week deals with money and budgeting.",
          },
        },
        text: "Stressed about money? Does your teen ask for things you can’t afford? \n\nThis week deals with money and budgeting.",
      },
      {
        id: "w_in_progress_w_money",
        workshop: "w_money",
        message_type: "w_in_progress",
        template_pop_up: "w_money_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_in_progress"],
            _raw: "click | pop_up: w_money_m_w_in_progress",
            _cleaned: "click | pop_up: w_money_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_money_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_money_m_w_in_progress.sent : true",
          },
        ],
        priority: 7.5,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_money_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_started",
                value: false,
              },
            },
            _raw: "get_field | w_money_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_money_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_money_started",
        completion_level_field: "w_money_completion_level",
        title: "@global.m_w_in_progress",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_in_progress",
          },
          text: {
            eng: "Create a family budget with your teen - it will prevent money arguments. \n\nComplete the @data.workshop.w_money.in_text_title to see how. It's easy - you'll see!",
          },
        },
        text: "Create a family budget with your teen - it will prevent money arguments. \n\nComplete the @data.workshop.w_money.in_text_title to see how. It's easy - you'll see!",
      },
      {
        id: "hp_reminder_w_money",
        workshop: "w_money",
        message_type: "hp_reminder",
        template_pop_up: "w_money_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_hp_reminder"],
            _raw: "click | pop_up: w_money_m_hp_reminder",
            _cleaned: "click | pop_up: w_money_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_money_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_money_m_hp_reminder.sent : true",
          },
        ],
        priority: 7.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_money_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_money_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_money_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "Have you talked with your teen about your family budget yet?",
          },
        },
        text: "Have you talked with your teen about your family budget yet?",
      },
      {
        id: "parent_points_overview_w_money",
        workshop: "w_money",
        message_type: "parent_points_overview",
        template_pop_up: "m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_parent_points_overview.sent", true],
            _raw: "click | set_field: m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: m_parent_points_overview.sent : true",
          },
        ],
        priority: 7.3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["nf_parent_points_overview"],
        hs_quick_start: "parent_points",
        title: "@global.m_parent_points_overview",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_parent_points_overview",
          },
          text: {
            eng: "@global.text_m_parent_points_overview",
          },
        },
        text: "@global.text_m_parent_points_overview",
      },
      {
        id: "hp_review_w_money",
        workshop: "w_money",
        message_type: "hp_review",
        template_go_to: "w_money_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_hp_review"],
            _raw: "click | go_to: w_money_hp_review",
            _cleaned: "click | go_to: w_money_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["undefined.sent", true],
            _raw: "click | set_field: undefined.sent : true",
            _cleaned: "click | set_field: undefined.sent : true",
          },
        ],
        priority: 7.2,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined.sent",
                value: true,
              },
            },
            _raw: "get_field |  undefined.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_money_completion_level :100",
          },
        ],
        campaign_list: ["nf_hp_review"],
        hs_quick_start: "parent_centre",
        completion_level_field: "w_money_completion_level",
        title: "@global.hp_review",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.hp_review",
          },
          text: {
            eng: "@global.text_m_hp_review",
          },
        },
        text: "@global.text_m_hp_review",
      },
      {
        id: "w_tomorrow_w_money_compl",
        workshop: "w_money",
        message_type: "w_tomorrow",
        template_pop_up: "w_money_m_w_tomorrow",
        message_condition: "_compl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_tomorrow"],
            _raw: "click | pop_up: w_money_m_w_tomorrow",
            _cleaned: "click | pop_up: w_money_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_money_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_money_m_w_tomorrow.sent : true",
          },
        ],
        priority: 7.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_money_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_money_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_money_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Great, you completed the @data.workshop.w_money.in_text_title! Tomorrow, access a new workshop to help you set family rules that work.",
          },
        },
        text: "Great, you completed the @data.workshop.w_money.in_text_title! Tomorrow, access a new workshop to help you set family rules that work.",
      },
      {
        id: "w_tomorrow_w_money_incompl",
        workshop: "w_money",
        message_type: "w_tomorrow",
        template_pop_up: "w_money_m_w_tomorrow",
        message_condition: "_incompl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_tomorrow"],
            _raw: "click | pop_up: w_money_m_w_tomorrow",
            _cleaned: "click | pop_up: w_money_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_money_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_money_m_w_tomorrow.sent : true",
          },
        ],
        priority: 7.1,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_money_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_money_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_money_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Many parents say budgeting brings peace. If you haven't finished the @data.workshop.w_money.in_text_title, give it a go!\n\nThank you for your committed parenting.",
          },
        },
        text: "Many parents say budgeting brings peace. If you haven't finished the @data.workshop.w_money.in_text_title, give it a go!\n\nThank you for your committed parenting.",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_w_rules",
    status: "released",
    rows: [
      {
        id: "w_released_w_rules_ind",
        workshop: "w_rules",
        message_type: "w_released",
        template_pop_up: "w_rules_m_w_released",
        message_condition: "_ind",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_released"],
            _raw: "click | pop_up: w_rules_m_w_released",
            _cleaned: "click | pop_up: w_rules_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_released.sent", true],
            _raw: "click | set_field: w_rules_m_w_released.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_released.sent : true",
          },
        ],
        priority: 6.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_started",
                value: false,
              },
            },
            _raw: "get_field | w_rules_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_rules_m_w_released.sent : true",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_rules_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.user_name! New week, new workshop! Learn to set household rules that your teen understands and follows.",
          },
        },
        text: "Hi @fields.user_name! New week, new workshop! Learn to set household rules that your teen understands and follows.",
      },
      {
        id: "w_released_w_rules_tog",
        workshop: "w_rules",
        message_type: "w_released",
        template_pop_up: "w_rules_m_w_released",
        message_condition: "_tog",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_released"],
            _raw: "click | pop_up: w_rules_m_w_released",
            _cleaned: "click | pop_up: w_rules_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_released.sent", true],
            _raw: "click | set_field: w_rules_m_w_released.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_released.sent : true",
          },
        ],
        priority: 6.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_started",
                value: false,
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
                field: "w_rules_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_rules_m_w_released.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_rules_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.group_name! New week, new workshop! Learn to set household rules that your teen understands and follows.",
          },
        },
        text: "Hi @fields.group_name! New week, new workshop! Learn to set household rules that your teen understands and follows.",
      },
      {
        id: "relax_w_rules",
        workshop: "w_rules",
        message_type: "relax",
        template_pop_up: "w_rules_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_relax"],
            _raw: "click | pop_up: w_rules_m_relax",
            _cleaned: "click | pop_up: w_rules_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_relax.sent", true],
            _raw: "click | set_field: w_rules_m_relax.sent : true",
            _cleaned: "click | set_field: w_rules_m_relax.sent : true",
          },
        ],
        priority: 6.9,
        activation_condition_list: [],
        campaign_list: ["nf_relax"],
        hs_quick_start: "parent_points",
        title: "@global.m_relax",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_relax",
          },
          text: {
            eng: "@global.text_m_relax",
          },
        },
        text: "@global.text_m_relax",
      },
      {
        id: "something_fun_w_rules",
        workshop: "w_rules",
        message_type: "something_fun",
        template_pop_up: "w_rules_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_something_fun"],
            _raw: "click | pop_up: w_rules_m_something_fun",
            _cleaned: "click | pop_up: w_rules_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_something_fun.sent", true],
            _raw: "click | set_field: w_rules_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_rules_m_something_fun.sent : true",
          },
        ],
        priority: 6.8,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_rules_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["nf_something_fun"],
        hs_quick_start: "parent_centre",
        title: "@global.m_something_fun",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_something_fun",
          },
          text: {
            eng: "@global.text_m_something_fun",
          },
        },
        text: "@global.text_m_something_fun",
      },
      {
        id: "praise_w_rules",
        workshop: "w_rules",
        message_type: "praise",
        template_pop_up: "w_rules_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_praise"],
            _raw: "click | pop_up: w_rules_m_praise",
            _cleaned: "click | pop_up: w_rules_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_praise.sent", true],
            _raw: "click | set_field: w_rules_m_praise.sent : true",
            _cleaned: "click | set_field: w_rules_m_praise.sent : true",
          },
        ],
        priority: 6.7,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_rules_m_praise.sent : true",
          },
        ],
        campaign_list: ["nf_praise"],
        hs_quick_start: "parent_centre",
        title: "@global.m_praise",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_praise",
          },
          text: {
            eng: "Tried your best but your teen is still grumpy? Remember, you are doing a great job - there will be good times with them too!",
          },
        },
        text: "Tried your best but your teen is still grumpy? Remember, you are doing a great job - there will be good times with them too!",
      },
      {
        id: "w_reminder_w_rules",
        workshop: "w_rules",
        message_type: "w_reminder",
        template_pop_up: "w_rules_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_reminder"],
            _raw: "click | pop_up: w_rules_m_w_reminder",
            _cleaned: "click | pop_up: w_rules_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_reminder.sent", true],
            _raw: "click | set_field: w_rules_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_reminder.sent : true",
          },
        ],
        priority: 6.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_started",
                value: false,
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
                field: "w_rules_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_rules_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_rules_started",
        title: "@global.m_w_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_reminder",
          },
          text: {
            eng: "Thank you for investing in your parenting. \n\nDo the @data.workshop.w_rules.in_text_title to help your teen understand and follow household rules.",
          },
        },
        text: "Thank you for investing in your parenting. \n\nDo the @data.workshop.w_rules.in_text_title to help your teen understand and follow household rules.",
      },
      {
        id: "w_in_progress_w_rules",
        workshop: "w_rules",
        message_type: "w_in_progress",
        template_pop_up: "w_rules_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_in_progress"],
            _raw: "click | pop_up: w_rules_m_w_in_progress",
            _cleaned: "click | pop_up: w_rules_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_rules_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_in_progress.sent : true",
          },
        ],
        priority: 6.5,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_rules_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_started",
                value: false,
              },
            },
            _raw: "get_field | w_rules_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_rules_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_rules_started",
        completion_level_field: "w_rules_completion_level",
        title: "@global.m_w_in_progress",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_in_progress",
          },
          text: {
            eng: "So close to gaining another tool! Complete the @data.workshop.w_rules.in_text_title and set ONE simple, realistic rule with your teen, and see things change!",
          },
        },
        text: "So close to gaining another tool! Complete the @data.workshop.w_rules.in_text_title and set ONE simple, realistic rule with your teen, and see things change!",
      },
      {
        id: "hp_reminder_w_rules",
        workshop: "w_rules",
        message_type: "hp_reminder",
        template_pop_up: "w_rules_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_hp_reminder"],
            _raw: "click | pop_up: w_rules_m_hp_reminder",
            _cleaned: "click | pop_up: w_rules_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_rules_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_rules_m_hp_reminder.sent : true",
          },
        ],
        priority: 6.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_rules_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_rules_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_rules_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "Have you managed to set a rule with your teen?",
          },
        },
        text: "Have you managed to set a rule with your teen?",
      },
      {
        id: "parent_points_overview_w_rules",
        workshop: "w_rules",
        message_type: "parent_points_overview",
        template_pop_up: "m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_parent_points_overview.sent", true],
            _raw: "click | set_field: m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: m_parent_points_overview.sent : true",
          },
        ],
        priority: 6.3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["nf_parent_points_overview"],
        hs_quick_start: "parent_points",
        title: "@global.m_parent_points_overview",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_parent_points_overview",
          },
          text: {
            eng: "@global.text_m_parent_points_overview",
          },
        },
        text: "@global.text_m_parent_points_overview",
      },
      {
        id: "hp_review_w_rules",
        workshop: "w_rules",
        message_type: "hp_review",
        template_go_to: "w_rules_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_rules_hp_review"],
            _raw: "click | go_to: w_rules_hp_review",
            _cleaned: "click | go_to: w_rules_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["undefined.sent", true],
            _raw: "click | set_field: undefined.sent : true",
            _cleaned: "click | set_field: undefined.sent : true",
          },
        ],
        priority: 6.2,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined.sent",
                value: true,
              },
            },
            _raw: "get_field |  undefined.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_rules_completion_level :100",
          },
        ],
        campaign_list: ["nf_hp_review"],
        hs_quick_start: "parent_centre",
        completion_level_field: "w_rules_completion_level",
        title: "@global.hp_review",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.hp_review",
          },
          text: {
            eng: "@global.text_m_hp_review",
          },
        },
        text: "@global.text_m_hp_review",
      },
      {
        id: "w_tomorrow_w_rules_compl",
        workshop: "w_rules",
        message_type: "w_tomorrow",
        template_pop_up: "w_rules_m_w_tomorrow",
        message_condition: "_compl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_tomorrow"],
            _raw: "click | pop_up: w_rules_m_w_tomorrow",
            _cleaned: "click | pop_up: w_rules_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_rules_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_tomorrow.sent : true",
          },
        ],
        priority: 6.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_rules_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_rules_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_rules_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Congratulations, you completed the @local.workshop_data.in_text_title.\n \nTomorrow, access a new workshop! It will show you what to do when teens display bad (or good) behaviour!",
          },
        },
        text: "Congratulations, you completed the @local.workshop_data.in_text_title.\n \nTomorrow, access a new workshop! It will show you what to do when teens display bad (or good) behaviour!",
      },
      {
        id: "w_tomorrow_w_rules_incompl",
        workshop: "w_rules",
        message_type: "w_tomorrow",
        template_pop_up: "w_rules_m_w_tomorrow",
        message_condition: "_incompl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_tomorrow"],
            _raw: "click | pop_up: w_rules_m_w_tomorrow",
            _cleaned: "click | pop_up: w_rules_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_rules_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_tomorrow.sent : true",
          },
        ],
        priority: 6.1,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_rules_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_rules_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_rules_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "A brand-new workshop unlocks tomorrow!\n \nComplete the @local.workshop_data.in_text_title before moving on. Just a few more minutes to help your teen follow your rules!",
          },
        },
        text: "A brand-new workshop unlocks tomorrow!\n \nComplete the @local.workshop_data.in_text_title before moving on. Just a few more minutes to help your teen follow your rules!",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_w_consequence",
    status: "released",
    rows: [
      {
        id: "w_released_w_consequence_ind",
        workshop: "w_consequence",
        message_type: "w_released",
        template_pop_up: "w_consequence_m_w_released",
        message_condition: "_ind",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_released"],
            _raw: "click | pop_up: w_consequence_m_w_released",
            _cleaned: "click | pop_up: w_consequence_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_released.sent", true],
            _raw: "click | set_field: w_consequence_m_w_released.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_released.sent : true",
          },
        ],
        priority: 5.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_started",
                value: false,
              },
            },
            _raw: "get_field | w_consequence_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_consequence_m_w_released.sent : true",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_consequence_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.user_name! Today we are celebrating two @global.parent_app months! \nThis week you'll learn to how help your teen follow household rules.",
          },
        },
        text: "Hi @fields.user_name! Today we are celebrating two @global.parent_app months! \nThis week you'll learn to how help your teen follow household rules.",
      },
      {
        id: "w_released_w_consequence_tog",
        workshop: "w_consequence",
        message_type: "w_released",
        template_pop_up: "w_consequence_m_w_released",
        message_condition: "_tog",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_released"],
            _raw: "click | pop_up: w_consequence_m_w_released",
            _cleaned: "click | pop_up: w_consequence_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_released.sent", true],
            _raw: "click | set_field: w_consequence_m_w_released.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_released.sent : true",
          },
        ],
        priority: 5.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_started",
                value: false,
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
                field: "w_consequence_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_consequence_m_w_released.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_consequence_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.group_name! Today we are celebrating two @global.parent_app months! \n\nThis week you'll learn to help your teen follow household rules.",
          },
        },
        text: "Hi @fields.group_name! Today we are celebrating two @global.parent_app months! \n\nThis week you'll learn to help your teen follow household rules.",
      },
      {
        id: "relax_w_consequence",
        workshop: "w_consequence",
        message_type: "relax",
        template_pop_up: "w_consequence_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_relax"],
            _raw: "click | pop_up: w_consequence_m_relax",
            _cleaned: "click | pop_up: w_consequence_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_relax.sent", true],
            _raw: "click | set_field: w_consequence_m_relax.sent : true",
            _cleaned: "click | set_field: w_consequence_m_relax.sent : true",
          },
        ],
        priority: 5.9,
        activation_condition_list: [],
        campaign_list: ["nf_relax"],
        hs_quick_start: "parent_points",
        title: "@global.m_relax",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_relax",
          },
          text: {
            eng: "@global.text_m_relax",
          },
        },
        text: "@global.text_m_relax",
      },
      {
        id: "something_fun_w_consequence",
        workshop: "w_consequence",
        message_type: "something_fun",
        template_pop_up: "w_consequence_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_something_fun"],
            _raw: "click | pop_up: w_consequence_m_something_fun",
            _cleaned: "click | pop_up: w_consequence_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_something_fun.sent", true],
            _raw: "click | set_field: w_consequence_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_consequence_m_something_fun.sent : true",
          },
        ],
        priority: 5.8,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_consequence_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["nf_something_fun"],
        hs_quick_start: "parent_centre",
        title: "@global.m_something_fun",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_something_fun",
          },
          text: {
            eng: "@global.text_m_something_fun",
          },
        },
        text: "@global.text_m_something_fun",
      },
      {
        id: "praise_w_consequence",
        workshop: "w_consequence",
        message_type: "praise",
        template_pop_up: "w_consequence_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_praise"],
            _raw: "click | pop_up: w_consequence_m_praise",
            _cleaned: "click | pop_up: w_consequence_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_praise.sent", true],
            _raw: "click | set_field: w_consequence_m_praise.sent : true",
            _cleaned: "click | set_field: w_consequence_m_praise.sent : true",
          },
        ],
        priority: 5.7,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_consequence_m_praise.sent : true",
          },
        ],
        campaign_list: ["nf_praise"],
        hs_quick_start: "parent_centre",
        title: "@global.m_praise",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_praise",
          },
          text: {
            eng: "Think about every time you have made your teen smile and all the care you have given them.  \n\nYou should be so proud - this is a hard time to be a parent.",
          },
        },
        text: "Think about every time you have made your teen smile and all the care you have given them.  \n\nYou should be so proud - this is a hard time to be a parent.",
      },
      {
        id: "w_reminder_w_consequence",
        workshop: "w_consequence",
        message_type: "w_reminder",
        template_pop_up: "w_consequence_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_reminder"],
            _raw: "click | pop_up: w_consequence_m_w_reminder",
            _cleaned: "click | pop_up: w_consequence_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_reminder.sent", true],
            _raw: "click | set_field: w_consequence_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_reminder.sent : true",
          },
        ],
        priority: 5.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_started",
                value: false,
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
                field: "w_consequence_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_consequence_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_consequence_started",
        title: "@global.m_w_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_reminder",
          },
          text: {
            eng: "Well done - you’ve gained 6 parenting tools already! Do the next workshop to get more!",
          },
        },
        text: "Well done - you’ve gained 6 parenting tools already! Do the next workshop to get more!",
      },
      {
        id: "w_in_progress_w_consequence",
        workshop: "w_consequence",
        message_type: "w_in_progress",
        template_pop_up: "w_consequence_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_in_progress"],
            _raw: "click | pop_up: w_consequence_m_w_in_progress",
            _cleaned: "click | pop_up: w_consequence_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_consequence_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_in_progress.sent : true",
          },
        ],
        priority: 5.5,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_consequence_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_started",
                value: false,
              },
            },
            _raw: "get_field | w_consequence_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_consequence_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_consequence_started",
        completion_level_field: "w_consequence_completion_level",
        title: "@global.m_w_in_progress",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_in_progress",
          },
          text: {
            eng: "Complete the workshop and talk with your teen about a positive and a negative consequence of a behaviour.",
          },
        },
        text: "Complete the workshop and talk with your teen about a positive and a negative consequence of a behaviour.",
      },
      {
        id: "hp_reminder_w_consequence",
        workshop: "w_consequence",
        message_type: "hp_reminder",
        template_pop_up: "w_consequence_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_hp_reminder"],
            _raw: "click | pop_up: w_consequence_m_hp_reminder",
            _cleaned: "click | pop_up: w_consequence_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_consequence_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_consequence_m_hp_reminder.sent : true",
          },
        ],
        priority: 5.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_consequence_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_consequence_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_consequence_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "Have you thought of a positive and a negative consequence of a behaviour with your teen yet?",
          },
        },
        text: "Have you thought of a positive and a negative consequence of a behaviour with your teen yet?",
      },
      {
        id: "parent_points_overview_w_consequence",
        workshop: "w_consequence",
        message_type: "parent_points_overview",
        template_pop_up: "m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_parent_points_overview.sent", true],
            _raw: "click | set_field: m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: m_parent_points_overview.sent : true",
          },
        ],
        priority: 5.3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["nf_parent_points_overview"],
        hs_quick_start: "parent_points",
        title: "@global.m_parent_points_overview",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_parent_points_overview",
          },
          text: {
            eng: "@global.text_m_parent_points_overview",
          },
        },
        text: "@global.text_m_parent_points_overview",
      },
      {
        id: "hp_review_w_consequence",
        workshop: "w_consequence",
        message_type: "hp_review",
        template_go_to: "w_consequence_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_hp_review"],
            _raw: "click | go_to: w_consequence_hp_review",
            _cleaned: "click | go_to: w_consequence_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["undefined.sent", true],
            _raw: "click | set_field: undefined.sent : true",
            _cleaned: "click | set_field: undefined.sent : true",
          },
        ],
        priority: 5.2,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined.sent",
                value: true,
              },
            },
            _raw: "get_field |  undefined.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_consequence_completion_level :100",
          },
        ],
        campaign_list: ["nf_hp_review"],
        hs_quick_start: "parent_centre",
        completion_level_field: "w_consequence_completion_level",
        title: "@global.hp_review",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.hp_review",
          },
          text: {
            eng: "@global.text_m_hp_review",
          },
        },
        text: "@global.text_m_hp_review",
      },
      {
        id: "w_tomorrow_w_consequence_compl",
        workshop: "w_consequence",
        message_type: "w_tomorrow",
        template_pop_up: "w_consequence_m_w_tomorrow",
        message_condition: "_compl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_tomorrow"],
            _raw: "click | pop_up: w_consequence_m_w_tomorrow",
            _cleaned: "click | pop_up: w_consequence_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_consequence_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_tomorrow.sent : true",
          },
        ],
        priority: 5.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_consequence_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_consequence_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_consequence_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Well done for completing the @data.workshop.w_consequence.in_text_title. Access a new workshop tomorrow to help you enjoy and learn useful skills!",
          },
        },
        text: "Well done for completing the @data.workshop.w_consequence.in_text_title. Access a new workshop tomorrow to help you enjoy and learn useful skills!",
      },
      {
        id: "w_tomorrow_w_consequence_incompl",
        workshop: "w_consequence",
        message_type: "w_tomorrow",
        template_pop_up: "w_consequence_m_w_tomorrow",
        message_condition: "_incompl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_tomorrow"],
            _raw: "click | pop_up: w_consequence_m_w_tomorrow",
            _cleaned: "click | pop_up: w_consequence_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_consequence_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_tomorrow.sent : true",
          },
        ],
        priority: 5.1,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_consequence_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_consequence_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_consequence_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Calm consequences help your teen follow rules. If you haven't finished  the @data.workshop.w_consequence.in_text_title, give it a go!\n\nWell done for showing so much commitment.",
          },
        },
        text: "Calm consequences help your teen follow rules. If you haven't finished  the @data.workshop.w_consequence.in_text_title, give it a go!\n\nWell done for showing so much commitment.",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_w_solve",
    status: "released",
    rows: [
      {
        id: "w_released_w_solve_ind",
        workshop: "w_solve",
        message_type: "w_released",
        template_pop_up: "w_solve_m_w_released",
        message_condition: "_ind",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_released"],
            _raw: "click | pop_up: w_solve_m_w_released",
            _cleaned: "click | pop_up: w_solve_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_released.sent", true],
            _raw: "click | set_field: w_solve_m_w_released.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_released.sent : true",
          },
        ],
        priority: 4.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_started",
                value: false,
              },
            },
            _raw: "get_field | w_solve_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_solve_m_w_released.sent : true",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_solve_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.user_name! You are making such good progress! \n\nHaving a teen means having lots of unexpected problems. This workshop will show you how to deal with them.",
          },
        },
        text: "Hi @fields.user_name! You are making such good progress! \n\nHaving a teen means having lots of unexpected problems. This workshop will show you how to deal with them.",
      },
      {
        id: "w_released_w_solve_tog",
        workshop: "w_solve",
        message_type: "w_released",
        template_pop_up: "w_solve_m_w_released",
        message_condition: "_tog",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_released"],
            _raw: "click | pop_up: w_solve_m_w_released",
            _cleaned: "click | pop_up: w_solve_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_released.sent", true],
            _raw: "click | set_field: w_solve_m_w_released.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_released.sent : true",
          },
        ],
        priority: 4.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_started",
                value: false,
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
                field: "w_solve_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_solve_m_w_released.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_solve_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.group_name! You are making such good progress!\n\nHaving a teen means having a lot of unexpected problems to deal with. This workshop will show you all how to deal with them.",
          },
        },
        text: "Hi @fields.group_name! You are making such good progress!\n\nHaving a teen means having a lot of unexpected problems to deal with. This workshop will show you all how to deal with them.",
      },
      {
        id: "relax_w_solve",
        workshop: "w_solve",
        message_type: "relax",
        template_pop_up: "w_solve_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_relax"],
            _raw: "click | pop_up: w_solve_m_relax",
            _cleaned: "click | pop_up: w_solve_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_relax.sent", true],
            _raw: "click | set_field: w_solve_m_relax.sent : true",
            _cleaned: "click | set_field: w_solve_m_relax.sent : true",
          },
        ],
        priority: 4.9,
        activation_condition_list: [],
        campaign_list: ["nf_relax"],
        hs_quick_start: "parent_points",
        title: "@global.m_relax",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_relax",
          },
          text: {
            eng: "@global.text_m_relax",
          },
        },
        text: "@global.text_m_relax",
      },
      {
        id: "something_fun_w_solve",
        workshop: "w_solve",
        message_type: "something_fun",
        template_pop_up: "w_solve_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_something_fun"],
            _raw: "click | pop_up: w_solve_m_something_fun",
            _cleaned: "click | pop_up: w_solve_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_something_fun.sent", true],
            _raw: "click | set_field: w_solve_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_solve_m_something_fun.sent : true",
          },
        ],
        priority: 4.8,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_solve_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["nf_something_fun"],
        hs_quick_start: "parent_centre",
        title: "@global.m_something_fun",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_something_fun",
          },
          text: {
            eng: "@global.text_m_something_fun",
          },
        },
        text: "@global.text_m_something_fun",
      },
      {
        id: "praise_w_solve",
        workshop: "w_solve",
        message_type: "praise",
        template_pop_up: "w_solve_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_praise"],
            _raw: "click | pop_up: w_solve_m_praise",
            _cleaned: "click | pop_up: w_solve_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_praise.sent", true],
            _raw: "click | set_field: w_solve_m_praise.sent : true",
            _cleaned: "click | set_field: w_solve_m_praise.sent : true",
          },
        ],
        priority: 4.7,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_solve_m_praise.sent : true",
          },
        ],
        campaign_list: ["nf_praise"],
        hs_quick_start: "parent_centre",
        title: "@global.m_praise",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_praise",
          },
          text: {
            eng: "Your commitment is inspiring. Keep calm and carry on!",
          },
        },
        text: "Your commitment is inspiring. Keep calm and carry on!",
      },
      {
        id: "w_reminder_w_solve",
        workshop: "w_solve",
        message_type: "w_reminder",
        template_pop_up: "w_solve_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_reminder"],
            _raw: "click | pop_up: w_solve_m_w_reminder",
            _cleaned: "click | pop_up: w_solve_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_reminder.sent", true],
            _raw: "click | set_field: w_solve_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_reminder.sent : true",
          },
        ],
        priority: 4.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_started",
                value: false,
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
                field: "w_solve_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_solve_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_solve_started",
        title: "@global.m_w_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_reminder",
          },
          text: {
            eng: "Unexpected problems arise when we have teens. \n \nLearn how to address them in the next workshop.",
          },
        },
        text: "Unexpected problems arise when we have teens. \n \nLearn how to address them in the next workshop.",
      },
      {
        id: "w_in_progress_w_solve",
        workshop: "w_solve",
        message_type: "w_in_progress",
        template_pop_up: "w_solve_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_in_progress"],
            _raw: "click | pop_up: w_solve_m_w_in_progress",
            _cleaned: "click | pop_up: w_solve_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_solve_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_in_progress.sent : true",
          },
        ],
        priority: 4.5,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_solve_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_started",
                value: false,
              },
            },
            _raw: "get_field | w_solve_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_solve_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_solve_started",
        completion_level_field: "w_solve_completion_level",
        title: "@global.m_w_in_progress",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_in_progress",
          },
          text: {
            eng: "You are on the right track to solving problems with your teen! \n\nComplete the @data.workshop.w_solve.in_text_title to gain another parenting skill.",
          },
        },
        text: "You are on the right track to solving problems with your teen! \n\nComplete the @data.workshop.w_solve.in_text_title to gain another parenting skill.",
      },
      {
        id: "hp_reminder_w_solve",
        workshop: "w_solve",
        message_type: "hp_reminder",
        template_pop_up: "w_solve_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_hp_reminder"],
            _raw: "click | pop_up: w_solve_m_hp_reminder",
            _cleaned: "click | pop_up: w_solve_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_solve_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_solve_m_hp_reminder.sent : true",
          },
        ],
        priority: 4.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_solve_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_solve_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_solve_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "Practise the four steps of problem-solving with your teen. \n \nKNOW IT, SOLVE IT, TRY IT, TEST IT!",
          },
        },
        text: "Practise the four steps of problem-solving with your teen. \n \nKNOW IT, SOLVE IT, TRY IT, TEST IT!",
      },
      {
        id: "parent_points_overview_w_solve",
        workshop: "w_solve",
        message_type: "parent_points_overview",
        template_pop_up: "m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_parent_points_overview.sent", true],
            _raw: "click | set_field: m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: m_parent_points_overview.sent : true",
          },
        ],
        priority: 4.3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["nf_parent_points_overview"],
        hs_quick_start: "parent_points",
        title: "@global.m_parent_points_overview",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_parent_points_overview",
          },
          text: {
            eng: "@global.text_m_parent_points_overview",
          },
        },
        text: "@global.text_m_parent_points_overview",
      },
      {
        id: "hp_review_w_solve",
        workshop: "w_solve",
        message_type: "hp_review",
        template_go_to: "w_solve_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_hp_review"],
            _raw: "click | go_to: w_solve_hp_review",
            _cleaned: "click | go_to: w_solve_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["undefined.sent", true],
            _raw: "click | set_field: undefined.sent : true",
            _cleaned: "click | set_field: undefined.sent : true",
          },
        ],
        priority: 4.2,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined.sent",
                value: true,
              },
            },
            _raw: "get_field |  undefined.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_solve_completion_level :100",
          },
        ],
        campaign_list: ["nf_hp_review"],
        hs_quick_start: "parent_centre",
        completion_level_field: "w_solve_completion_level",
        title: "@global.hp_review",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.hp_review",
          },
          text: {
            eng: "@global.text_m_hp_review",
          },
        },
        text: "@global.text_m_hp_review",
      },
      {
        id: "w_tomorrow_w_solve_compl",
        workshop: "w_solve",
        message_type: "w_tomorrow",
        template_pop_up: "w_solve_m_w_tomorrow",
        message_condition: "_compl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_tomorrow"],
            _raw: "click | pop_up: w_solve_m_w_tomorrow",
            _cleaned: "click | pop_up: w_solve_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_solve_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_tomorrow.sent : true",
          },
        ],
        priority: 4.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_solve_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_solve_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_solve_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Great! You completed the @data.workshop.w_solve.in_text_title. Tomorrow, a new workshop is unlocked to help you keep your teen safe.",
          },
        },
        text: "Great! You completed the @data.workshop.w_solve.in_text_title. Tomorrow, a new workshop is unlocked to help you keep your teen safe.",
      },
      {
        id: "w_tomorrow_w_solve_incompl",
        workshop: "w_solve",
        message_type: "w_tomorrow",
        template_pop_up: "w_solve_m_w_tomorrow",
        message_condition: "_incompl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_tomorrow"],
            _raw: "click | pop_up: w_solve_m_w_tomorrow",
            _cleaned: "click | pop_up: w_solve_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_solve_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_tomorrow.sent : true",
          },
        ],
        priority: 4.1,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_solve_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_solve_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_solve_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Access a new workshop tomorrow! \n \n By completing the @data.workshop.w_solve.in_text_title first, you'll know how to solve problems together.",
          },
        },
        text: "Access a new workshop tomorrow! \n \n By completing the @data.workshop.w_solve.in_text_title first, you'll know how to solve problems together.",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_w_safe",
    status: "released",
    rows: [
      {
        id: "w_released_w_safe_ind",
        workshop: "w_safe",
        message_type: "w_released",
        template_pop_up: "w_safe_m_w_released",
        message_condition: "_ind",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_released"],
            _raw: "click | pop_up: w_safe_m_w_released",
            _cleaned: "click | pop_up: w_safe_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_released.sent", true],
            _raw: "click | set_field: w_safe_m_w_released.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_released.sent : true",
          },
        ],
        priority: 3.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_started",
                value: false,
              },
            },
            _raw: "get_field | w_safe_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_safe_m_w_released.sent : true",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_safe_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.user_name! You're nearly at the end of your @global.parent_app journey! Thank you for sticking to it. \n\nThis week is about keeping our teens safe online and in the community.",
          },
        },
        text: "Hi @fields.user_name! You're nearly at the end of your @global.parent_app journey! Thank you for sticking to it. \n\nThis week is about keeping our teens safe online and in the community.",
      },
      {
        id: "w_released_w_safe_tog",
        workshop: "w_safe",
        message_type: "w_released",
        template_pop_up: "w_safe_m_w_released",
        message_condition: "_tog",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_released"],
            _raw: "click | pop_up: w_safe_m_w_released",
            _cleaned: "click | pop_up: w_safe_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_released.sent", true],
            _raw: "click | set_field: w_safe_m_w_released.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_released.sent : true",
          },
        ],
        priority: 3.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_started",
                value: false,
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
                field: "w_safe_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_safe_m_w_released.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_safe_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.group_name! You're nearly at the end of your @global.parent_app journey! Thank you for sticking to it.  \n\nThis week is about keeping our teens safe online and in the community.",
          },
        },
        text: "Hi @fields.group_name! You're nearly at the end of your @global.parent_app journey! Thank you for sticking to it.  \n\nThis week is about keeping our teens safe online and in the community.",
      },
      {
        id: "relax_w_safe",
        workshop: "w_safe",
        message_type: "relax",
        template_pop_up: "w_safe_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_relax"],
            _raw: "click | pop_up: w_safe_m_relax",
            _cleaned: "click | pop_up: w_safe_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_relax.sent", true],
            _raw: "click | set_field: w_safe_m_relax.sent : true",
            _cleaned: "click | set_field: w_safe_m_relax.sent : true",
          },
        ],
        priority: 3.9,
        activation_condition_list: [],
        campaign_list: ["nf_relax"],
        hs_quick_start: "parent_points",
        title: "@global.m_relax",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_relax",
          },
          text: {
            eng: "@global.text_m_relax",
          },
        },
        text: "@global.text_m_relax",
      },
      {
        id: "something_fun_w_safe",
        workshop: "w_safe",
        message_type: "something_fun",
        template_pop_up: "w_safe_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_something_fun"],
            _raw: "click | pop_up: w_safe_m_something_fun",
            _cleaned: "click | pop_up: w_safe_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_something_fun.sent", true],
            _raw: "click | set_field: w_safe_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_safe_m_something_fun.sent : true",
          },
        ],
        priority: 3.8,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_safe_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["nf_something_fun"],
        hs_quick_start: "parent_centre",
        title: "@global.m_something_fun",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_something_fun",
          },
          text: {
            eng: "@global.text_m_something_fun",
          },
        },
        text: "@global.text_m_something_fun",
      },
      {
        id: "praise_w_safe",
        workshop: "w_safe",
        message_type: "praise",
        template_pop_up: "w_safe_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_praise"],
            _raw: "click | pop_up: w_safe_m_praise",
            _cleaned: "click | pop_up: w_safe_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_praise.sent", true],
            _raw: "click | set_field: w_safe_m_praise.sent : true",
            _cleaned: "click | set_field: w_safe_m_praise.sent : true",
          },
        ],
        priority: 3.7,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_safe_m_praise.sent : true",
          },
        ],
        campaign_list: ["nf_praise"],
        hs_quick_start: "parent_centre",
        title: "@global.m_praise",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_praise",
          },
          text: {
            eng: "Parenting is tough, especially now. Be proud of your achievements. Of the care you give them. Of every time you make them smile. You're incredible!",
          },
        },
        text: "Parenting is tough, especially now. Be proud of your achievements. Of the care you give them. Of every time you make them smile. You're incredible!",
      },
      {
        id: "w_reminder_w_safe",
        workshop: "w_safe",
        message_type: "w_reminder",
        template_pop_up: "w_safe_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_reminder"],
            _raw: "click | pop_up: w_safe_m_w_reminder",
            _cleaned: "click | pop_up: w_safe_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_reminder.sent", true],
            _raw: "click | set_field: w_safe_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_reminder.sent : true",
          },
        ],
        priority: 3.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_started",
                value: false,
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
                field: "w_safe_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_safe_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_safe_started",
        title: "@global.m_w_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_reminder",
          },
          text: {
            eng: "Think about all the parenting skills you've already gained!\n\nComplete the next workshop to get more.",
          },
        },
        text: "Think about all the parenting skills you've already gained!\n\nComplete the next workshop to get more.",
      },
      {
        id: "w_in_progress_w_safe",
        workshop: "w_safe",
        message_type: "w_in_progress",
        template_pop_up: "w_safe_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_in_progress"],
            _raw: "click | pop_up: w_safe_m_w_in_progress",
            _cleaned: "click | pop_up: w_safe_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_safe_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_in_progress.sent : true",
          },
        ],
        priority: 3.5,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_safe_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_started",
                value: false,
              },
            },
            _raw: "get_field | w_safe_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_safe_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_safe_started",
        completion_level_field: "w_safe_completion_level",
        title: "@global.m_w_in_progress",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_in_progress",
          },
          text: {
            eng: "Chatting together about their community and online experiences helps keep teens safe. \n\nComplete the @data.workshop.w_safe.in_text_title to see how.",
          },
        },
        text: "Chatting together about their community and online experiences helps keep teens safe. \n\nComplete the @data.workshop.w_safe.in_text_title to see how.",
      },
      {
        id: "hp_reminder_w_safe",
        workshop: "w_safe",
        message_type: "hp_reminder",
        template_pop_up: "w_safe_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_hp_reminder"],
            _raw: "click | pop_up: w_safe_m_hp_reminder",
            _cleaned: "click | pop_up: w_safe_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_safe_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_safe_m_hp_reminder.sent : true",
          },
        ],
        priority: 3.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_safe_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_safe_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_safe_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "Have you talked with your teen about safety measures?",
          },
        },
        text: "Have you talked with your teen about safety measures?",
      },
      {
        id: "parent_points_overview_w_safe",
        workshop: "w_safe",
        message_type: "parent_points_overview",
        template_pop_up: "m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_parent_points_overview.sent", true],
            _raw: "click | set_field: m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: m_parent_points_overview.sent : true",
          },
        ],
        priority: 3.3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["nf_parent_points_overview"],
        hs_quick_start: "parent_points",
        title: "@global.m_parent_points_overview",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_parent_points_overview",
          },
          text: {
            eng: "@global.text_m_parent_points_overview",
          },
        },
        text: "@global.text_m_parent_points_overview",
      },
      {
        id: "hp_review_w_safe",
        workshop: "w_safe",
        message_type: "hp_review",
        template_go_to: "w_safe_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_hp_review"],
            _raw: "click | go_to: w_safe_hp_review",
            _cleaned: "click | go_to: w_safe_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["undefined.sent", true],
            _raw: "click | set_field: undefined.sent : true",
            _cleaned: "click | set_field: undefined.sent : true",
          },
        ],
        priority: 3.2,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined.sent",
                value: true,
              },
            },
            _raw: "get_field |  undefined.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_safe_completion_level :100",
          },
        ],
        campaign_list: ["nf_hp_review"],
        hs_quick_start: "parent_centre",
        completion_level_field: "w_safe_completion_level",
        title: "@global.hp_review",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.hp_review",
          },
          text: {
            eng: "@global.text_m_hp_review",
          },
        },
        text: "@global.text_m_hp_review",
      },
      {
        id: "w_tomorrow_w_safe_compl",
        workshop: "w_safe",
        message_type: "w_tomorrow",
        template_pop_up: "w_safe_m_w_tomorrow",
        message_condition: "_compl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_tomorrow"],
            _raw: "click | pop_up: w_safe_m_w_tomorrow",
            _cleaned: "click | pop_up: w_safe_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_safe_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_tomorrow.sent : true",
          },
        ],
        priority: 3.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_safe_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_safe_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_safe_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Congratulations, you completed @data.workshop.w_safe.in_text_title. A new workshop is ready tomorrow to help your family deal with any situation – together you can do so much!",
          },
        },
        text: "Congratulations, you completed @data.workshop.w_safe.in_text_title. A new workshop is ready tomorrow to help your family deal with any situation – together you can do so much!",
      },
      {
        id: "w_tomorrow_w_safe_incompl",
        workshop: "w_safe",
        message_type: "w_tomorrow",
        template_pop_up: "w_safe_m_w_tomorrow",
        message_condition: "_incompl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_tomorrow"],
            _raw: "click | pop_up: w_safe_m_w_tomorrow",
            _cleaned: "click | pop_up: w_safe_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_safe_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_tomorrow.sent : true",
          },
        ],
        priority: 3.1,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_safe_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_safe_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_safe_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Finish the @data.workshop.w_safe.in_text_title before moving on. This can prevent many problems. \n\nWell done for using @global.parent_app to support your family.",
          },
        },
        text: "Finish the @data.workshop.w_safe.in_text_title before moving on. This can prevent many problems. \n\nWell done for using @global.parent_app to support your family.",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_w_crisis",
    status: "released",
    rows: [
      {
        id: "w_released_w_crisis_ind",
        workshop: "w_crisis",
        message_type: "w_released",
        template_pop_up: "w_crisis_m_w_released",
        message_condition: "_ind",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_released"],
            _raw: "click | pop_up: w_crisis_m_w_released",
            _cleaned: "click | pop_up: w_crisis_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_released.sent", true],
            _raw: "click | set_field: w_crisis_m_w_released.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_released.sent : true",
          },
        ],
        priority: 2.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_started",
                value: false,
              },
            },
            _raw: "get_field | w_crisis_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_crisis_m_w_released.sent : true",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_crisis_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.user_name! Crises happen to anyone - being ready helps a lot. \n\nThis workshop will show you how.",
          },
        },
        text: "Hi @fields.user_name! Crises happen to anyone - being ready helps a lot. \n\nThis workshop will show you how.",
      },
      {
        id: "w_released_w_crisis_tog",
        workshop: "w_crisis",
        message_type: "w_released",
        template_pop_up: "w_crisis_m_w_released",
        message_condition: "_tog",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_released"],
            _raw: "click | pop_up: w_crisis_m_w_released",
            _cleaned: "click | pop_up: w_crisis_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_released.sent", true],
            _raw: "click | set_field: w_crisis_m_w_released.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_released.sent : true",
          },
        ],
        priority: 2.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_started",
                value: false,
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
                field: "w_crisis_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_crisis_m_w_released.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "do_workshops_together",
                value: false,
              },
            },
            _raw: "get_field | do_workshops_together : false",
          },
        ],
        campaign_list: ["nf_w_released"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_crisis_started",
        title: "@global.m_w_released",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_released",
          },
          text: {
            eng: "Hi @fields.group_name! Crises happen to anyone - being ready helps a lot. \n\nThis workshop will show you how.",
          },
        },
        text: "Hi @fields.group_name! Crises happen to anyone - being ready helps a lot. \n\nThis workshop will show you how.",
      },
      {
        id: "relax_w_crisis",
        workshop: "w_crisis",
        message_type: "relax",
        template_pop_up: "w_crisis_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_relax"],
            _raw: "click | pop_up: w_crisis_m_relax",
            _cleaned: "click | pop_up: w_crisis_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_relax.sent", true],
            _raw: "click | set_field: w_crisis_m_relax.sent : true",
            _cleaned: "click | set_field: w_crisis_m_relax.sent : true",
          },
        ],
        priority: 2.9,
        activation_condition_list: [],
        campaign_list: ["nf_relax"],
        hs_quick_start: "parent_points",
        title: "@global.m_relax",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_relax",
          },
          text: {
            eng: "@global.text_m_relax",
          },
        },
        text: "@global.text_m_relax",
      },
      {
        id: "something_fun_w_crisis",
        workshop: "w_crisis",
        message_type: "something_fun",
        template_pop_up: "w_crisis_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_something_fun"],
            _raw: "click | pop_up: w_crisis_m_something_fun",
            _cleaned: "click | pop_up: w_crisis_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_something_fun.sent", true],
            _raw: "click | set_field: w_crisis_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_crisis_m_something_fun.sent : true",
          },
        ],
        priority: 2.8,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_crisis_m_something_fun.sent : true",
          },
        ],
        campaign_list: ["nf_something_fun"],
        hs_quick_start: "parent_centre",
        title: "@global.m_something_fun",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_something_fun",
          },
          text: {
            eng: "@global.text_m_something_fun",
          },
        },
        text: "@global.text_m_something_fun",
      },
      {
        id: "praise_w_crisis",
        workshop: "w_crisis",
        message_type: "praise",
        template_pop_up: "w_crisis_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_praise"],
            _raw: "click | pop_up: w_crisis_m_praise",
            _cleaned: "click | pop_up: w_crisis_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_praise.sent", true],
            _raw: "click | set_field: w_crisis_m_praise.sent : true",
            _cleaned: "click | set_field: w_crisis_m_praise.sent : true",
          },
        ],
        priority: 2.7,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_crisis_m_praise.sent : true",
          },
        ],
        campaign_list: ["nf_praise"],
        hs_quick_start: "parent_centre",
        title: "@global.m_praise",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_praise",
          },
          text: {
            eng: "Be proud, you are a committed parent. This is a big achievement!",
          },
        },
        text: "Be proud, you are a committed parent. This is a big achievement!",
      },
      {
        id: "w_reminder_w_crisis",
        workshop: "w_crisis",
        message_type: "w_reminder",
        template_pop_up: "w_crisis_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_reminder"],
            _raw: "click | pop_up: w_crisis_m_w_reminder",
            _cleaned: "click | pop_up: w_crisis_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_reminder.sent", true],
            _raw: "click | set_field: w_crisis_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_reminder.sent : true",
          },
        ],
        priority: 2.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_started",
                value: false,
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
                field: "w_crisis_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_crisis_m_w_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_crisis_started",
        title: "@global.m_w_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_reminder",
          },
          text: {
            eng: "Crises may happen, and we CAN be prepared!\n\nStart the next workshop to see how with your teen.",
          },
        },
        text: "Crises may happen, and we CAN be prepared!\n\nStart the next workshop to see how with your teen.",
      },
      {
        id: "w_in_progress_w_crisis",
        workshop: "w_crisis",
        message_type: "w_in_progress",
        template_pop_up: "w_crisis_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_in_progress"],
            _raw: "click | pop_up: w_crisis_m_w_in_progress",
            _cleaned: "click | pop_up: w_crisis_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_crisis_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_in_progress.sent : true",
          },
        ],
        priority: 2.5,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_crisis_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_started",
                value: false,
              },
            },
            _raw: "get_field | w_crisis_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_crisis_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_reminder"],
        hs_quick_start: "weekly_workshops",
        started_field: "w_crisis_started",
        completion_level_field: "w_crisis_completion_level",
        title: "@global.m_w_in_progress",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_in_progress",
          },
          text: {
            eng: "Great that you joined this parenting journey! \n\nComplete the @data.workshop.w_crisis.in_text_title to learn the best way to react when teens need us.",
          },
        },
        text: "Great that you joined this parenting journey! \n\nComplete the @data.workshop.w_crisis.in_text_title to learn the best way to react when teens need us.",
      },
      {
        id: "hp_reminder_w_crisis",
        workshop: "w_crisis",
        message_type: "hp_reminder",
        template_pop_up: "w_crisis_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_hp_reminder"],
            _raw: "click | pop_up: w_crisis_m_hp_reminder",
            _cleaned: "click | pop_up: w_crisis_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_crisis_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_crisis_m_hp_reminder.sent : true",
          },
        ],
        priority: 2.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_crisis_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_crisis_m_hp_reminder.sent : true",
          },
        ],
        campaign_list: ["nf_hp_reminder"],
        hs_quick_start: "parent_points",
        completion_level_field: "w_crisis_completion_level",
        title: "@global.m_hp_reminder",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_hp_reminder",
          },
          text: {
            eng: "Have you and your teen discussed what you would do in a crisis?",
          },
        },
        text: "Have you and your teen discussed what you would do in a crisis?",
      },
      {
        id: "parent_points_overview_w_crisis",
        workshop: "w_crisis",
        message_type: "parent_points_overview",
        template_pop_up: "m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up: m_parent_points_overview",
            _cleaned: "click | pop_up: m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_parent_points_overview.sent", true],
            _raw: "click | set_field: m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: m_parent_points_overview.sent : true",
          },
        ],
        priority: 2.3,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | m_parent_points_overview.sent : true",
          },
        ],
        campaign_list: ["nf_parent_points_overview"],
        hs_quick_start: "parent_points",
        title: "@global.m_parent_points_overview",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_parent_points_overview",
          },
          text: {
            eng: "@global.text_m_parent_points_overview",
          },
        },
        text: "@global.text_m_parent_points_overview",
      },
      {
        id: "hp_review_w_crisis",
        workshop: "w_crisis",
        message_type: "hp_review",
        template_go_to: "w_crisis_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_hp_review"],
            _raw: "click | go_to: w_crisis_hp_review",
            _cleaned: "click | go_to: w_crisis_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["undefined.sent", true],
            _raw: "click | set_field: undefined.sent : true",
            _cleaned: "click | set_field: undefined.sent : true",
          },
        ],
        priority: 2.2,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "undefined.sent",
                value: true,
              },
            },
            _raw: "get_field |  undefined.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_crisis_completion_level :100",
          },
        ],
        campaign_list: ["nf_hp_review"],
        hs_quick_start: "parent_centre",
        completion_level_field: "w_crisis_completion_level",
        title: "@global.hp_review",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.hp_review",
          },
          text: {
            eng: "@global.text_m_hp_review",
          },
        },
        text: "@global.text_m_hp_review",
      },
      {
        id: "w_tomorrow_w_crisis_compl",
        workshop: "w_crisis",
        message_type: "w_tomorrow",
        template_pop_up: "w_crisis_m_w_tomorrow",
        message_condition: "_compl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_tomorrow"],
            _raw: "click | pop_up: w_crisis_m_w_tomorrow",
            _cleaned: "click | pop_up: w_crisis_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_crisis_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_tomorrow.sent : true",
          },
        ],
        priority: 2.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_crisis_completion_level :100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_crisis_m_w_tomorrow.sent : true",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_crisis_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "Well done for finishing the @data.workshop.w_crisis. Tomorrow, you can access the final workshop to reflect on your journey and plan what to do next!",
          },
        },
        text: "Well done for finishing the @data.workshop.w_crisis. Tomorrow, you can access the final workshop to reflect on your journey and plan what to do next!",
      },
      {
        id: "w_tomorrow_w_crisis_incompl",
        workshop: "w_crisis",
        message_type: "w_tomorrow",
        template_pop_up: "w_crisis_m_w_tomorrow",
        message_condition: "_incompl",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_tomorrow"],
            _raw: "click | pop_up: w_crisis_m_w_tomorrow",
            _cleaned: "click | pop_up: w_crisis_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_crisis_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_tomorrow.sent : true",
          },
        ],
        priority: 2.1,
        activation_condition_list: [],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field |  w_crisis_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_crisis_completion_level :100",
          },
        ],
        campaign_list: ["nf_w_tomorrow"],
        hs_quick_start: "weekly_workshops",
        completion_level_field: "w_crisis_completion_level",
        title: "@global.m_w_tomorrow",
        _translations: {
          title: {},
          text: {},
        },
        _translatedFields: {
          title: {
            eng: "@global.m_w_tomorrow",
          },
          text: {
            eng: "The final workshop unlocks tomorrow!\n\nFirst try to finish the @data.workshop.w_crisis.in_text_title. That way, you can complete your set of parenting skills and decide what to do next.",
          },
        },
        text: "The final workshop unlocks tomorrow!\n\nFirst try to finish the @data.workshop.w_crisis.in_text_title. That way, you can complete your set of parenting skills and decide what to do next.",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_in_week_messages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_inactive_day",
    status: "released",
    rows: [
      {
        id: "nf_inactive_day_1",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_inactive_day_1.sent", true],
            _raw: "sent | set_field: nf_inactive_day_1.sent : true",
            _cleaned: "sent | set_field: nf_inactive_day_1.sent : true",
          },
        ],
        priority: 1,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "nf_inactive_day_1.sent",
                value: true,
              },
            },
            _raw: "get_field | nf_inactive_day_1.sent : true",
          },
        ],
        campaign_list: ["nf_inactive_day"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
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
    ],
    _xlsxPath: "global/campaigns/notifications_inactive.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_inactive_week",
    status: "released",
    rows: [
      {
        id: "nf_inactive_week_1",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_inactive_week_1.sent", true],
            _raw: "sent | set_field: nf_inactive_week_1.sent : true",
            _cleaned: "sent | set_field: nf_inactive_week_1.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["nf_inactive_week"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
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
        id: "nf_inactive_week_2",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_inactive_week_2.sent", true],
            _raw: "sent | set_field: nf_inactive_week_2.sent : true",
            _cleaned: "sent | set_field: nf_inactive_week_2.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["nf_inactive_week"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
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
        id: "nf_inactive_week_3",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_inactive_week_3.sent", true],
            _raw: "sent | set_field: nf_inactive_week_3.sent : true",
            _cleaned: "sent | set_field: nf_inactive_week_3.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["nf_inactive_week"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
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
        id: "nf_inactive_week_4",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_inactive_week_4.sent", true],
            _raw: "sent | set_field: nf_inactive_week_4.sent : true",
            _cleaned: "sent | set_field: nf_inactive_week_4.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["nf_inactive_week"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
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
    ],
    _xlsxPath: "global/campaigns/notifications_inactive.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_inactive_month",
    status: "released",
    rows: [
      {
        id: "nf_inactive_month_1",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_inactive_month_1.sent", true],
            _raw: "sent | set_field: nf_inactive_month_1.sent : true",
            _cleaned: "sent | set_field: nf_inactive_month_1.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["nf_inactive_month"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hi! Is everything OK? It seems you haven’t opened ParentApp lately. Why don’t you give it a try? Millions of parents have found these materials helpful. We are still here to support you.",
          },
        },
        text: "Hi! Is everything OK? It seems you haven’t opened ParentApp lately. Why don’t you give it a try? Millions of parents have found these materials helpful. We are still here to support you.",
      },
      {
        id: "nf_inactive_month_2",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_inactive_month_2.sent", true],
            _raw: "sent | set_field: nf_inactive_month_2.sent : true",
            _cleaned: "sent | set_field: nf_inactive_month_2.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["nf_inactive_month"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "ParentApp misses you! There is a lot to explore. We are still here to support you.",
          },
        },
        text: "ParentApp misses you! There is a lot to explore. We are still here to support you.",
      },
      {
        id: "nf_inactive_month_3",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_inactive_month_3.sent", true],
            _raw: "sent | set_field: nf_inactive_month_3.sent : true",
            _cleaned: "sent | set_field: nf_inactive_month_3.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["nf_inactive_month"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
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
        id: "nf_inactive_month_4",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_inactive_month_4.sent", true],
            _raw: "sent | set_field: nf_inactive_month_4.sent : true",
            _cleaned: "sent | set_field: nf_inactive_month_4.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["nf_inactive_month"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
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
    _xlsxPath: "global/campaigns/notifications_inactive.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "nf_generic",
    status: "released",
    rows: [
      {
        id: "nf_generic_1",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_generic_1.sent", true],
            _raw: "sent | set_field: nf_generic_1.sent : true",
            _cleaned: "sent | set_field: nf_generic_1.sent : true",
          },
        ],
        priority: 1,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "nf_generic_1.sent",
                value: true,
              },
            },
            _raw: "get_field | nf_generic_1.sent : true",
          },
        ],
        campaign_list: ["nf_generic"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hi great parent, remember to take care of yourself too - it will help you AND your family! Get your tips and more in ParentApp.",
          },
        },
        text: "Hi great parent, remember to take care of yourself too - it will help you AND your family! Get your tips and more in ParentApp.",
      },
      {
        id: "nf_generic_2",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_generic_2.sent", true],
            _raw: "sent | set_field: nf_generic_2.sent : true",
            _cleaned: "sent | set_field: nf_generic_2.sent : true",
          },
        ],
        priority: 1,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "nf_generic_2.sent",
                value: true,
              },
            },
            _raw: "get_field | nf_generic_2.sent : true",
          },
        ],
        campaign_list: ["nf_generic"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hi great parent! Remember, you can find lots of helpful tips in ParentApp.",
          },
        },
        text: "Hi great parent! Remember, you can find lots of helpful tips in ParentApp.",
      },
      {
        id: "nf_generic_3",
        action_list: [
          {
            trigger: "sent",
            action_id: "set_field",
            args: ["nf_generic_3.sent", true],
            _raw: "sent | set_field: nf_generic_3.sent : true",
            _cleaned: "sent | set_field: nf_generic_3.sent : true",
          },
        ],
        priority: 1,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "nf_generic_3.sent",
                value: true,
              },
            },
            _raw: "get_field | nf_generic_3.sent : true",
          },
        ],
        campaign_list: ["nf_generic"],
        title: "New message from PLH",
        _translations: {
          title: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            za_af: true,
            za_st: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "New message from PLH",
          },
          text: {
            eng: "Hi great parent! ParentApp is here to support you. Check it out now!",
          },
        },
        text: "Hi great parent! ParentApp is here to support you. Check it out now!",
      },
    ],
    _xlsxPath: "global/campaigns/notifications_inactive.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_relax",
    status: "released",
    rows: [
      {
        id: "default",
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["default.sent", true],
            _raw: "click | set_field: default.sent : true",
            _cleaned: "click | set_field: default.sent : true",
          },
        ],
        priority: -1,
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_self_care_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_self_care_relax"],
            _raw: "click | go_to: w_self_care_relax",
            _cleaned: "click | go_to: w_self_care_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_relax.sent", true],
            _raw: "click | set_field: w_self_care_relax.sent : true",
            _cleaned: "click | set_field: w_self_care_relax.sent : true",
          },
        ],
        priority: 0.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "1",
              },
            },
            _raw: "get_field | workshop_number : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_completed",
                value: true,
              },
            },
            _raw: "get_field | w_self_care_completed : true",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_1on1_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_relax"],
            _raw: "click | go_to: w_1on1_relax",
            _cleaned: "click | go_to: w_1on1_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_relax.sent", true],
            _raw: "click | set_field: w_1on1_relax.sent : true",
            _cleaned: "click | set_field: w_1on1_relax.sent : true",
          },
        ],
        priority: 1.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_praise_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_relax"],
            _raw: "click | go_to: w_praise_relax",
            _cleaned: "click | go_to: w_praise_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_relax.sent", true],
            _raw: "click | set_field: w_praise_relax.sent : true",
            _cleaned: "click | set_field: w_praise_relax.sent : true",
          },
        ],
        priority: 2.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_instruct_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_relax"],
            _raw: "click | go_to: w_instruct_relax",
            _cleaned: "click | go_to: w_instruct_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_relax.sent", true],
            _raw: "click | set_field: w_instruct_relax.sent : true",
            _cleaned: "click | set_field: w_instruct_relax.sent : true",
          },
        ],
        priority: 3.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_stress_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_relax"],
            _raw: "click | go_to: w_stress_relax",
            _cleaned: "click | go_to: w_stress_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_relax.sent", true],
            _raw: "click | set_field: w_stress_relax.sent : true",
            _cleaned: "click | set_field: w_stress_relax.sent : true",
          },
        ],
        priority: 4.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_money_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_relax"],
            _raw: "click | go_to: w_money_relax",
            _cleaned: "click | go_to: w_money_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_relax.sent", true],
            _raw: "click | set_field: w_money_relax.sent : true",
            _cleaned: "click | set_field: w_money_relax.sent : true",
          },
        ],
        priority: 5.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_rules_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_rules_relax"],
            _raw: "click | go_to: w_rules_relax",
            _cleaned: "click | go_to: w_rules_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_relax.sent", true],
            _raw: "click | set_field: w_rules_relax.sent : true",
            _cleaned: "click | set_field: w_rules_relax.sent : true",
          },
        ],
        priority: 6.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_consequence_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_relax"],
            _raw: "click | go_to: w_consequence_relax",
            _cleaned: "click | go_to: w_consequence_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_relax.sent", true],
            _raw: "click | set_field: w_consequence_relax.sent : true",
            _cleaned: "click | set_field: w_consequence_relax.sent : true",
          },
        ],
        priority: 7.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_solve_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_relax"],
            _raw: "click | go_to: w_solve_relax",
            _cleaned: "click | go_to: w_solve_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_relax.sent", true],
            _raw: "click | set_field: w_solve_relax.sent : true",
            _cleaned: "click | set_field: w_solve_relax.sent : true",
          },
        ],
        priority: 8.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_safe_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_relax"],
            _raw: "click | go_to: w_safe_relax",
            _cleaned: "click | go_to: w_safe_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_relax.sent", true],
            _raw: "click | set_field: w_safe_relax.sent : true",
            _cleaned: "click | set_field: w_safe_relax.sent : true",
          },
        ],
        priority: 9.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_crisis_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_relax"],
            _raw: "click | go_to: w_crisis_relax",
            _cleaned: "click | go_to: w_crisis_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_relax.sent", true],
            _raw: "click | set_field: w_crisis_relax.sent : true",
            _cleaned: "click | set_field: w_crisis_relax.sent : true",
          },
        ],
        priority: 10.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
        ],
        campaign_list: ["relax"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_parent_centre.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_something_fun",
    status: "released",
    rows: [
      {
        id: "default",
        action_list: [
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
        action_list: [
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
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_praise_m_something_fun",
        action_list: [
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
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_instruct_m_something_fun",
        action_list: [
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
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_stress_m_something_fun",
        action_list: [
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
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_money_m_something_fun",
        action_list: [
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
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_rules_m_something_fun",
        action_list: [
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
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_consequence_m_something_fun",
        action_list: [
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
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_solve_m_something_fun",
        action_list: [
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
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_safe_m_something_fun",
        action_list: [
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
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_crisis_m_something_fun",
        action_list: [
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
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
        ],
        campaign_list: ["something_fun"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_parent_centre.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_self_care",
    status: "released",
    rows: [
      {
        id: "default",
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["default.sent", true],
            _raw: "click | set_field: default.sent : true",
            _cleaned: "click | set_field: default.sent : true",
          },
        ],
        priority: -1,
        campaign_list: ["weekly_workshops", "parent_points", "parent_centre"],
        icon: "plh_images/icons/play_white.svg",
      },
      {
        id: "survey_welcome_quick_start",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["setup_and_survey_stepper"],
            _raw: "click | go_to: setup_and_survey_stepper",
            _cleaned: "click | go_to: setup_and_survey_stepper",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["survey_welcome_quick_start.sent", true],
            _raw: "click | set_field: survey_welcome_quick_start.sent : true",
            _cleaned: "click | set_field: survey_welcome_quick_start.sent : true",
          },
        ],
        priority: 13.2,
        activation_condition_list: [
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
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "survey_welcome_completed",
                value: true,
              },
            },
            _raw: "get_field | survey_welcome_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/phone_heart_white.svg",
      },
      {
        id: "survey_final_quick_start",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["survey_final_stepper"],
            _raw: "click | go_to: survey_final_stepper",
            _cleaned: "click | go_to: survey_final_stepper",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["survey_final_quick_start.sent", true],
            _raw: "click | set_field: survey_final_quick_start.sent : true",
            _cleaned: "click | set_field: survey_final_quick_start.sent : true",
          },
        ],
        priority: 13.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_celebrate_started",
                value: true,
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
                field: "survey_final_completed",
                value: true,
              },
            },
            _raw: "get_field | survey_final_completed : true",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/phone_heart_white.svg",
      },
      {
        id: "w_self_care_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_self_care_stepper"],
            _raw: "click | go_to: w_self_care_stepper",
            _cleaned: "click | go_to: w_self_care_stepper",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_m_w_released.sent", true],
            _raw: "click | set_field: w_self_care_m_w_released.sent : true",
            _cleaned: "click | set_field: w_self_care_m_w_released.sent : true",
          },
        ],
        priority: 12.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "1",
              },
            },
            _raw: "get_field | workshop_number : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_started",
                value: false,
              },
            },
            _raw: "get_field | w_self_care_started : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_self_care_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/play_white.svg",
      },
      {
        id: "w_self_care_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_self_care_m_relax"],
            _raw: "click | pop_up:w_self_care_m_relax",
            _cleaned: "click | pop_up:w_self_care_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_m_relax.sent", true],
            _raw: "click | set_field: w_self_care_m_relax.sent : true",
            _cleaned: "click | set_field: w_self_care_m_relax.sent : true",
          },
        ],
        priority: 12.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "1",
              },
            },
            _raw: "get_field | workshop_number : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_self_care_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_self_care_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_self_care_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_self_care_m_hp_reminder"],
            _raw: "click | pop_up:w_self_care_m_hp_reminder",
            _cleaned: "click | pop_up:w_self_care_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_self_care_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_self_care_m_hp_reminder.sent : true",
          },
        ],
        priority: 12.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "1",
              },
            },
            _raw: "get_field | workshop_number : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_self_care_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_self_care_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_self_care_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_self_care_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_self_care_m_parent_points_overview.sent : true",
          },
        ],
        priority: 12.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "1",
              },
            },
            _raw: "get_field | workshop_number : 1",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_self_care_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_self_care_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_self_care_m_w_tomorrow"],
            _raw: "click | pop_up:w_self_care_m_w_tomorrow",
            _cleaned: "click | pop_up:w_self_care_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_self_care_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_self_care_m_w_tomorrow.sent : true",
          },
        ],
        priority: 12.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "1",
              },
            },
            _raw: "get_field | workshop_number : 1",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_self_care_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_1on1",
    status: "released",
    rows: [
      {
        id: "w_1on1_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_released"],
            _raw: "click | pop_up:w_1on1_m_w_released",
            _cleaned: "click | pop_up:w_1on1_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_released.sent", true],
            _raw: "click | set_field: w_1on1_m_w_released.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_released.sent : true",
          },
        ],
        priority: 11.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_started",
                value: false,
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
                field: "w_1on1_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_1on1_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_relax"],
            _raw: "click | pop_up:w_1on1_m_relax",
            _cleaned: "click | pop_up:w_1on1_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_relax.sent", true],
            _raw: "click | set_field: w_1on1_m_relax.sent : true",
            _cleaned: "click | set_field: w_1on1_m_relax.sent : true",
          },
        ],
        priority: 11.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_1on1_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_something_fun"],
            _raw: "click | pop_up:w_1on1_m_something_fun",
            _cleaned: "click | pop_up:w_1on1_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_something_fun.sent", true],
            _raw: "click | set_field: w_1on1_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_1on1_m_something_fun.sent : true",
          },
        ],
        priority: 11.8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_m_something_fun.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_1on1_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_praise"],
            _raw: "click | pop_up:w_1on1_m_praise",
            _cleaned: "click | pop_up:w_1on1_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_praise.sent", true],
            _raw: "click | set_field: w_1on1_m_praise.sent : true",
            _cleaned: "click | set_field: w_1on1_m_praise.sent : true",
          },
        ],
        priority: 11.7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_m_praise.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_1on1_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_reminder"],
            _raw: "click | pop_up:w_1on1_m_w_reminder",
            _cleaned: "click | pop_up:w_1on1_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_reminder.sent", true],
            _raw: "click | set_field: w_1on1_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_reminder.sent : true",
          },
        ],
        priority: 11.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_started",
                value: false,
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
                field: "w_1on1_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_m_w_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_1on1_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_in_progress"],
            _raw: "click | pop_up:w_1on1_m_w_in_progress",
            _cleaned: "click | pop_up:w_1on1_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_1on1_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_in_progress.sent : true",
          },
        ],
        priority: 11.5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_started",
                value: false,
              },
            },
            _raw: "get_field | w_1on1_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_1on1_completion_level: 100",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_1on1_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_hp_reminder"],
            _raw: "click | pop_up:w_1on1_m_hp_reminder",
            _cleaned: "click | pop_up:w_1on1_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_1on1_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_1on1_m_hp_reminder.sent : true",
          },
        ],
        priority: 11.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_1on1_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_1on1_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_1on1_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_1on1_m_parent_points_overview.sent : true",
          },
        ],
        priority: 11.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_1on1_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_hp_review"],
            _raw: "click | go_to: w_1on1_hp_review",
            _cleaned: "click | go_to: w_1on1_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_hp_review.sent", true],
            _raw: "click | set_field: w_1on1_hp_review.sent : true",
            _cleaned: "click | set_field: w_1on1_hp_review.sent : true",
          },
        ],
        priority: 11.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_1on1_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_hp_review_completed",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_hp_review_completed : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_1on1_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_tomorrow"],
            _raw: "click | pop_up:w_1on1_m_w_tomorrow",
            _cleaned: "click | pop_up:w_1on1_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_1on1_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_1on1_m_w_tomorrow.sent : true",
          },
        ],
        priority: 11.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "2",
              },
            },
            _raw: "get_field | workshop_number : 2",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_praise",
    status: "released",
    rows: [
      {
        id: "w_praise_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_released"],
            _raw: "click | pop_up:w_praise_m_w_released",
            _cleaned: "click | pop_up:w_praise_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_released.sent", true],
            _raw: "click | set_field: w_praise_m_w_released.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_released.sent : true",
          },
        ],
        priority: 10.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_started",
                value: false,
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
                field: "w_praise_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_praise_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_praise_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_relax"],
            _raw: "click | pop_up:w_praise_m_relax",
            _cleaned: "click | pop_up:w_praise_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_relax.sent", true],
            _raw: "click | set_field: w_praise_m_relax.sent : true",
            _cleaned: "click | set_field: w_praise_m_relax.sent : true",
          },
        ],
        priority: 10.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_praise_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_praise_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_something_fun"],
            _raw: "click | pop_up:w_praise_m_something_fun",
            _cleaned: "click | pop_up:w_praise_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_something_fun.sent", true],
            _raw: "click | set_field: w_praise_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_praise_m_something_fun.sent : true",
          },
        ],
        priority: 10.8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field | w_praise_m_something_fun.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_praise_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_praise"],
            _raw: "click | pop_up:w_praise_m_praise",
            _cleaned: "click | pop_up:w_praise_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_praise.sent", true],
            _raw: "click | set_field: w_praise_m_praise.sent : true",
            _cleaned: "click | set_field: w_praise_m_praise.sent : true",
          },
        ],
        priority: 10.7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field | w_praise_m_praise.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_praise_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_reminder"],
            _raw: "click | pop_up:w_praise_m_w_reminder",
            _cleaned: "click | pop_up:w_praise_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_reminder.sent", true],
            _raw: "click | set_field: w_praise_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_reminder.sent : true",
          },
        ],
        priority: 10.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_started",
                value: false,
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
                field: "w_praise_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_praise_m_w_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_praise_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_in_progress"],
            _raw: "click | pop_up:w_praise_m_w_in_progress",
            _cleaned: "click | pop_up:w_praise_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_praise_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_in_progress.sent : true",
          },
        ],
        priority: 10.5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field | w_praise_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_started",
                value: false,
              },
            },
            _raw: "get_field | w_praise_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_praise_completion_level: 100",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_praise_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_hp_reminder"],
            _raw: "click | pop_up:w_praise_m_hp_reminder",
            _cleaned: "click | pop_up:w_praise_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_praise_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_praise_m_hp_reminder.sent : true",
          },
        ],
        priority: 10.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_praise_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_praise_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_praise_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_praise_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_praise_m_parent_points_overview.sent : true",
          },
        ],
        priority: 10.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_praise_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_praise_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_hp_review"],
            _raw: "click | go_to: w_praise_hp_review",
            _cleaned: "click | go_to: w_praise_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_hp_review.sent", true],
            _raw: "click | set_field: w_praise_hp_review.sent : true",
            _cleaned: "click | set_field: w_praise_hp_review.sent : true",
          },
        ],
        priority: 10.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_praise_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_hp_review_completed",
                value: true,
              },
            },
            _raw: "get_field | w_praise_hp_review_completed : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_praise_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_tomorrow"],
            _raw: "click | pop_up:w_praise_m_w_tomorrow",
            _cleaned: "click | pop_up:w_praise_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_praise_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_praise_m_w_tomorrow.sent : true",
          },
        ],
        priority: 10.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "3",
              },
            },
            _raw: "get_field | workshop_number : 3",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_praise_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_instruct",
    status: "released",
    rows: [
      {
        id: "w_instruct_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_released"],
            _raw: "click | pop_up:w_instruct_m_w_released",
            _cleaned: "click | pop_up:w_instruct_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_released.sent", true],
            _raw: "click | set_field: w_instruct_m_w_released.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_released.sent : true",
          },
        ],
        priority: 9.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_started",
                value: false,
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
                field: "w_instruct_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_instruct_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_instruct_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_relax"],
            _raw: "click | pop_up:w_instruct_m_relax",
            _cleaned: "click | pop_up:w_instruct_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_relax.sent", true],
            _raw: "click | set_field: w_instruct_m_relax.sent : true",
            _cleaned: "click | set_field: w_instruct_m_relax.sent : true",
          },
        ],
        priority: 9.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_instruct_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_instruct_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_something_fun"],
            _raw: "click | pop_up:w_instruct_m_something_fun",
            _cleaned: "click | pop_up:w_instruct_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_something_fun.sent", true],
            _raw: "click | set_field: w_instruct_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_instruct_m_something_fun.sent : true",
          },
        ],
        priority: 9.8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_something_fun.sent",
                value: true,
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
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_praise"],
            _raw: "click | pop_up:w_instruct_m_praise",
            _cleaned: "click | pop_up:w_instruct_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_praise.sent", true],
            _raw: "click | set_field: w_instruct_m_praise.sent : true",
            _cleaned: "click | set_field: w_instruct_m_praise.sent : true",
          },
        ],
        priority: 9.7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_praise.sent",
                value: true,
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
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_reminder"],
            _raw: "click | pop_up:w_instruct_m_w_reminder",
            _cleaned: "click | pop_up:w_instruct_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_reminder.sent", true],
            _raw: "click | set_field: w_instruct_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_reminder.sent : true",
          },
        ],
        priority: 9.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_started",
                value: false,
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
                field: "w_instruct_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_instruct_m_w_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_instruct_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_in_progress"],
            _raw: "click | pop_up:w_instruct_m_w_in_progress",
            _cleaned: "click | pop_up:w_instruct_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_instruct_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_in_progress.sent : true",
          },
        ],
        priority: 9.5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field | w_instruct_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_started",
                value: false,
              },
            },
            _raw: "get_field | w_instruct_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_instruct_completion_level: 100",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_instruct_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_hp_reminder"],
            _raw: "click | pop_up:w_instruct_m_hp_reminder",
            _cleaned: "click | pop_up:w_instruct_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_instruct_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_instruct_m_hp_reminder.sent : true",
          },
        ],
        priority: 9.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_instruct_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_instruct_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_instruct_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_instruct_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_instruct_m_parent_points_overview.sent : true",
          },
        ],
        priority: 9.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_instruct_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_instruct_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_hp_review"],
            _raw: "click | go_to: w_instruct_hp_review",
            _cleaned: "click | go_to: w_instruct_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_hp_review.sent", true],
            _raw: "click | set_field: w_instruct_hp_review.sent : true",
            _cleaned: "click | set_field: w_instruct_hp_review.sent : true",
          },
        ],
        priority: 9.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_instruct_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_hp_review_completed",
                value: true,
              },
            },
            _raw: "get_field | w_instruct_hp_review_completed : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_instruct_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_tomorrow"],
            _raw: "click | pop_up:w_instruct_m_w_tomorrow",
            _cleaned: "click | pop_up:w_instruct_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_instruct_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_instruct_m_w_tomorrow.sent : true",
          },
        ],
        priority: 9.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "4",
              },
            },
            _raw: "get_field | workshop_number : 4",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_instruct_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_stress",
    status: "released",
    rows: [
      {
        id: "w_stress_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_released"],
            _raw: "click | pop_up:w_stress_m_w_released",
            _cleaned: "click | pop_up:w_stress_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_released.sent", true],
            _raw: "click | set_field: w_stress_m_w_released.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_released.sent : true",
          },
        ],
        priority: 8.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_started",
                value: false,
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
                field: "w_stress_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_stress_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_stress_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_relax"],
            _raw: "click | pop_up:w_stress_m_relax",
            _cleaned: "click | pop_up:w_stress_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_relax.sent", true],
            _raw: "click | set_field: w_stress_m_relax.sent : true",
            _cleaned: "click | set_field: w_stress_m_relax.sent : true",
          },
        ],
        priority: 8.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_stress_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_stress_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_something_fun"],
            _raw: "click | pop_up:w_stress_m_something_fun",
            _cleaned: "click | pop_up:w_stress_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_something_fun.sent", true],
            _raw: "click | set_field: w_stress_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_stress_m_something_fun.sent : true",
          },
        ],
        priority: 8.8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field | w_stress_m_something_fun.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_stress_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_praise"],
            _raw: "click | pop_up:w_stress_m_praise",
            _cleaned: "click | pop_up:w_stress_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_praise.sent", true],
            _raw: "click | set_field: w_stress_m_praise.sent : true",
            _cleaned: "click | set_field: w_stress_m_praise.sent : true",
          },
        ],
        priority: 8.7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field | w_stress_m_praise.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_stress_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_reminder"],
            _raw: "click | pop_up:w_stress_m_w_reminder",
            _cleaned: "click | pop_up:w_stress_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_reminder.sent", true],
            _raw: "click | set_field: w_stress_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_reminder.sent : true",
          },
        ],
        priority: 8.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_started",
                value: false,
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
                field: "w_stress_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_stress_m_w_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_stress_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_in_progress"],
            _raw: "click | pop_up:w_stress_m_w_in_progress",
            _cleaned: "click | pop_up:w_stress_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_stress_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_in_progress.sent : true",
          },
        ],
        priority: 8.5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field | w_stress_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_started",
                value: false,
              },
            },
            _raw: "get_field | w_stress_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_stress_completion_level: 100",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_stress_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_hp_reminder"],
            _raw: "click | pop_up:w_stress_m_hp_reminder",
            _cleaned: "click | pop_up:w_stress_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_stress_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_stress_m_hp_reminder.sent : true",
          },
        ],
        priority: 8.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_stress_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_stress_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_stress_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_stress_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_stress_m_parent_points_overview.sent : true",
          },
        ],
        priority: 8.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_stress_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_stress_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_hp_review"],
            _raw: "click | go_to: w_stress_hp_review",
            _cleaned: "click | go_to: w_stress_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_hp_review.sent", true],
            _raw: "click | set_field: w_stress_hp_review.sent : true",
            _cleaned: "click | set_field: w_stress_hp_review.sent : true",
          },
        ],
        priority: 8.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_stress_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_hp_review_completed",
                value: true,
              },
            },
            _raw: "get_field | w_stress_hp_review_completed : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_stress_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_tomorrow"],
            _raw: "click | pop_up:w_stress_m_w_tomorrow",
            _cleaned: "click | pop_up:w_stress_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_stress_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_stress_m_w_tomorrow.sent : true",
          },
        ],
        priority: 8.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "5",
              },
            },
            _raw: "get_field | workshop_number : 5",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_stress_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_money",
    status: "released",
    rows: [
      {
        id: "w_money_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_released"],
            _raw: "click | pop_up:w_money_m_w_released",
            _cleaned: "click | pop_up:w_money_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_released.sent", true],
            _raw: "click | set_field: w_money_m_w_released.sent : true",
            _cleaned: "click | set_field: w_money_m_w_released.sent : true",
          },
        ],
        priority: 7.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_started",
                value: false,
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
                field: "w_money_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_money_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_money_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_relax"],
            _raw: "click | pop_up:w_money_m_relax",
            _cleaned: "click | pop_up:w_money_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_relax.sent", true],
            _raw: "click | set_field: w_money_m_relax.sent : true",
            _cleaned: "click | set_field: w_money_m_relax.sent : true",
          },
        ],
        priority: 7.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_money_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_money_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_something_fun"],
            _raw: "click | pop_up:w_money_m_something_fun",
            _cleaned: "click | pop_up:w_money_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_something_fun.sent", true],
            _raw: "click | set_field: w_money_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_money_m_something_fun.sent : true",
          },
        ],
        priority: 7.8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field | w_money_m_something_fun.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_money_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_praise"],
            _raw: "click | pop_up:w_money_m_praise",
            _cleaned: "click | pop_up:w_money_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_praise.sent", true],
            _raw: "click | set_field: w_money_m_praise.sent : true",
            _cleaned: "click | set_field: w_money_m_praise.sent : true",
          },
        ],
        priority: 7.7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field | w_money_m_praise.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_money_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_reminder"],
            _raw: "click | pop_up:w_money_m_w_reminder",
            _cleaned: "click | pop_up:w_money_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_reminder.sent", true],
            _raw: "click | set_field: w_money_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_money_m_w_reminder.sent : true",
          },
        ],
        priority: 7.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_started",
                value: false,
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
                field: "w_money_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_money_m_w_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_money_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_in_progress"],
            _raw: "click | pop_up:w_money_m_w_in_progress",
            _cleaned: "click | pop_up:w_money_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_money_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_money_m_w_in_progress.sent : true",
          },
        ],
        priority: 7.5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field | w_money_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_started",
                value: false,
              },
            },
            _raw: "get_field | w_money_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_money_completion_level:100",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_money_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_hp_reminder"],
            _raw: "click | pop_up:w_money_m_hp_reminder",
            _cleaned: "click | pop_up:w_money_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_money_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_money_m_hp_reminder.sent : true",
          },
        ],
        priority: 7.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_money_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_money_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_money_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_money_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_money_m_parent_points_overview.sent : true",
          },
        ],
        priority: 7.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_money_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_money_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_hp_review"],
            _raw: "click | go_to: w_money_hp_review",
            _cleaned: "click | go_to: w_money_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_hp_review.sent", true],
            _raw: "click | set_field: w_money_hp_review.sent : true",
            _cleaned: "click | set_field: w_money_hp_review.sent : true",
          },
        ],
        priority: 7.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_money_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_hp_review_completed",
                value: true,
              },
            },
            _raw: "get_field | w_money_hp_review_completed : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_money_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_tomorrow"],
            _raw: "click | pop_up:w_money_m_w_tomorrow",
            _cleaned: "click | pop_up:w_money_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_money_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_money_m_w_tomorrow.sent : true",
          },
        ],
        priority: 7.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "6",
              },
            },
            _raw: "get_field | workshop_number : 6",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_money_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_rules",
    status: "released",
    rows: [
      {
        id: "w_rules_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_released"],
            _raw: "click | pop_up:w_rules_m_w_released",
            _cleaned: "click | pop_up:w_rules_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_released.sent", true],
            _raw: "click | set_field: w_rules_m_w_released.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_released.sent : true",
          },
        ],
        priority: 6.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_started",
                value: false,
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
                field: "w_rules_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_rules_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_rules_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_relax"],
            _raw: "click | pop_up:w_rules_m_relax",
            _cleaned: "click | pop_up:w_rules_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_relax.sent", true],
            _raw: "click | set_field: w_rules_m_relax.sent : true",
            _cleaned: "click | set_field: w_rules_m_relax.sent : true",
          },
        ],
        priority: 6.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_rules_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_rules_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_something_fun"],
            _raw: "click | pop_up:w_rules_m_something_fun",
            _cleaned: "click | pop_up:w_rules_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_something_fun.sent", true],
            _raw: "click | set_field: w_rules_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_rules_m_something_fun.sent : true",
          },
        ],
        priority: 6.8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field | w_rules_m_something_fun.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_rules_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_praise"],
            _raw: "click | pop_up:w_rules_m_praise",
            _cleaned: "click | pop_up:w_rules_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_praise.sent", true],
            _raw: "click | set_field: w_rules_m_praise.sent : true",
            _cleaned: "click | set_field: w_rules_m_praise.sent : true",
          },
        ],
        priority: 6.7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field | w_rules_m_praise.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_rules_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_reminder"],
            _raw: "click | pop_up:w_rules_m_w_reminder",
            _cleaned: "click | pop_up:w_rules_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_reminder.sent", true],
            _raw: "click | set_field: w_rules_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_reminder.sent : true",
          },
        ],
        priority: 6.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_started",
                value: false,
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
                field: "w_rules_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_rules_m_w_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_rules_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_in_progress"],
            _raw: "click | pop_up:w_rules_m_w_in_progress",
            _cleaned: "click | pop_up:w_rules_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_rules_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_in_progress.sent : true",
          },
        ],
        priority: 6.5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field | w_rules_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_started",
                value: false,
              },
            },
            _raw: "get_field | w_rules_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_rules_completion_level: 100",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_rules_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_hp_reminder"],
            _raw: "click | pop_up:w_rules_m_hp_reminder",
            _cleaned: "click | pop_up:w_rules_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_rules_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_rules_m_hp_reminder.sent : true",
          },
        ],
        priority: 6.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_rules_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_rules_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_rules_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_rules_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_rules_m_parent_points_overview.sent : true",
          },
        ],
        priority: 6.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_rules_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_rules_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_rules_hp_review"],
            _raw: "click | go_to: w_rules_hp_review",
            _cleaned: "click | go_to: w_rules_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_hp_review.sent", true],
            _raw: "click | set_field: w_rules_hp_review.sent : true",
            _cleaned: "click | set_field: w_rules_hp_review.sent : true",
          },
        ],
        priority: 6.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_rules_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_hp_review_completed",
                value: true,
              },
            },
            _raw: "get_field | w_rules_hp_review_completed : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_rules_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_tomorrow"],
            _raw: "click | pop_up:w_rules_m_w_tomorrow",
            _cleaned: "click | pop_up:w_rules_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_rules_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_rules_m_w_tomorrow.sent : true",
          },
        ],
        priority: 6.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "7",
              },
            },
            _raw: "get_field | workshop_number : 7",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_rules_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_consequence",
    status: "released",
    rows: [
      {
        id: "w_consequence_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_released"],
            _raw: "click | pop_up:w_consequence_m_w_released",
            _cleaned: "click | pop_up:w_consequence_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_released.sent", true],
            _raw: "click | set_field: w_consequence_m_w_released.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_released.sent : true",
          },
        ],
        priority: 5.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_started",
                value: false,
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
                field: "w_consequence_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_consequence_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_relax"],
            _raw: "click | pop_up:w_consequence_m_relax",
            _cleaned: "click | pop_up:w_consequence_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_relax.sent", true],
            _raw: "click | set_field: w_consequence_m_relax.sent : true",
            _cleaned: "click | set_field: w_consequence_m_relax.sent : true",
          },
        ],
        priority: 5.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_consequence_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_something_fun"],
            _raw: "click | pop_up:w_consequence_m_something_fun",
            _cleaned: "click | pop_up:w_consequence_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_something_fun.sent", true],
            _raw: "click | set_field: w_consequence_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_consequence_m_something_fun.sent : true",
          },
        ],
        priority: 5.8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_m_something_fun.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_consequence_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_praise"],
            _raw: "click | pop_up:w_consequence_m_praise",
            _cleaned: "click | pop_up:w_consequence_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_praise.sent", true],
            _raw: "click | set_field: w_consequence_m_praise.sent : true",
            _cleaned: "click | set_field: w_consequence_m_praise.sent : true",
          },
        ],
        priority: 5.7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_m_praise.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_consequence_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_reminder"],
            _raw: "click | pop_up:w_consequence_m_w_reminder",
            _cleaned: "click | pop_up:w_consequence_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_reminder.sent", true],
            _raw: "click | set_field: w_consequence_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_reminder.sent : true",
          },
        ],
        priority: 5.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_started",
                value: false,
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
                field: "w_consequence_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_m_w_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_consequence_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_in_progress"],
            _raw: "click | pop_up:w_consequence_m_w_in_progress",
            _cleaned: "click | pop_up:w_consequence_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_consequence_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_in_progress.sent : true",
          },
        ],
        priority: 5.5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_started",
                value: false,
              },
            },
            _raw: "get_field | w_consequence_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_consequence_completion_level: 100",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_consequence_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_hp_reminder"],
            _raw: "click | pop_up:w_consequence_m_hp_reminder",
            _cleaned: "click | pop_up:w_consequence_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_consequence_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_consequence_m_hp_reminder.sent : true",
          },
        ],
        priority: 5.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_consequence_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_consequence_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_consequence_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_consequence_m_parent_points_overview.sent : true",
          },
        ],
        priority: 5.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_consequence_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_hp_review"],
            _raw: "click | go_to: w_consequence_hp_review",
            _cleaned: "click | go_to: w_consequence_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_hp_review.sent", true],
            _raw: "click | set_field: w_consequence_hp_review.sent : true",
            _cleaned: "click | set_field: w_consequence_hp_review.sent : true",
          },
        ],
        priority: 5.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_consequence_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_hp_review_completed",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_hp_review_completed : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_consequence_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_tomorrow"],
            _raw: "click | pop_up:w_consequence_m_w_tomorrow",
            _cleaned: "click | pop_up:w_consequence_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_consequence_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_consequence_m_w_tomorrow.sent : true",
          },
        ],
        priority: 5.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "8",
              },
            },
            _raw: "get_field | workshop_number : 8",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_solve",
    status: "released",
    rows: [
      {
        id: "w_solve_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_released"],
            _raw: "click | pop_up:w_solve_m_w_released",
            _cleaned: "click | pop_up:w_solve_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_released.sent", true],
            _raw: "click | set_field: w_solve_m_w_released.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_released.sent : true",
          },
        ],
        priority: 4.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_started",
                value: false,
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
                field: "w_solve_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_solve_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_solve_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_relax"],
            _raw: "click | pop_up:w_solve_m_relax",
            _cleaned: "click | pop_up:w_solve_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_relax.sent", true],
            _raw: "click | set_field: w_solve_m_relax.sent : true",
            _cleaned: "click | set_field: w_solve_m_relax.sent : true",
          },
        ],
        priority: 4.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_solve_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_solve_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_something_fun"],
            _raw: "click | pop_up:w_solve_m_something_fun",
            _cleaned: "click | pop_up:w_solve_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_something_fun.sent", true],
            _raw: "click | set_field: w_solve_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_solve_m_something_fun.sent : true",
          },
        ],
        priority: 4.8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field | w_solve_m_something_fun.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_solve_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_praise"],
            _raw: "click | pop_up:w_solve_m_praise",
            _cleaned: "click | pop_up:w_solve_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_praise.sent", true],
            _raw: "click | set_field: w_solve_m_praise.sent : true",
            _cleaned: "click | set_field: w_solve_m_praise.sent : true",
          },
        ],
        priority: 4.7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field | w_solve_m_praise.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_solve_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_reminder"],
            _raw: "click | pop_up:w_solve_m_w_reminder",
            _cleaned: "click | pop_up:w_solve_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_reminder.sent", true],
            _raw: "click | set_field: w_solve_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_reminder.sent : true",
          },
        ],
        priority: 4.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_started",
                value: false,
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
                field: "w_solve_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_solve_m_w_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_solve_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_in_progress"],
            _raw: "click | pop_up:w_solve_m_w_in_progress",
            _cleaned: "click | pop_up:w_solve_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_solve_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_in_progress.sent : true",
          },
        ],
        priority: 4.5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field | w_solve_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_started",
                value: false,
              },
            },
            _raw: "get_field | w_solve_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_solve_completion_level: 100",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_solve_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_hp_reminder"],
            _raw: "click | pop_up:w_solve_m_hp_reminder",
            _cleaned: "click | pop_up:w_solve_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_solve_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_solve_m_hp_reminder.sent : true",
          },
        ],
        priority: 4.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_solve_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_solve_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_solve_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_solve_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_solve_m_parent_points_overview.sent : true",
          },
        ],
        priority: 4.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_solve_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_solve_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_hp_review"],
            _raw: "click | go_to: w_solve_hp_review",
            _cleaned: "click | go_to: w_solve_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_hp_review.sent", true],
            _raw: "click | set_field: w_solve_hp_review.sent : true",
            _cleaned: "click | set_field: w_solve_hp_review.sent : true",
          },
        ],
        priority: 4.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_solve_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_hp_review_completed",
                value: true,
              },
            },
            _raw: "get_field | w_solve_hp_review_completed : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_solve_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_tomorrow"],
            _raw: "click | pop_up:w_solve_m_w_tomorrow",
            _cleaned: "click | pop_up:w_solve_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_solve_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_solve_m_w_tomorrow.sent : true",
          },
        ],
        priority: 4.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "9",
              },
            },
            _raw: "get_field | workshop_number : 9",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_solve_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_safe",
    status: "released",
    rows: [
      {
        id: "w_safe_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_released"],
            _raw: "click | pop_up:w_safe_m_w_released",
            _cleaned: "click | pop_up:w_safe_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_released.sent", true],
            _raw: "click | set_field: w_safe_m_w_released.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_released.sent : true",
          },
        ],
        priority: 3.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_started",
                value: false,
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
                field: "w_safe_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_safe_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_safe_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_relax"],
            _raw: "click | pop_up:w_safe_m_relax",
            _cleaned: "click | pop_up:w_safe_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_relax.sent", true],
            _raw: "click | set_field: w_safe_m_relax.sent : true",
            _cleaned: "click | set_field: w_safe_m_relax.sent : true",
          },
        ],
        priority: 3.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_safe_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_safe_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_something_fun"],
            _raw: "click | pop_up:w_safe_m_something_fun",
            _cleaned: "click | pop_up:w_safe_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_something_fun.sent", true],
            _raw: "click | set_field: w_safe_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_safe_m_something_fun.sent : true",
          },
        ],
        priority: 3.8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field | w_safe_m_something_fun.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_safe_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_praise"],
            _raw: "click | pop_up:w_safe_m_praise",
            _cleaned: "click | pop_up:w_safe_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_praise.sent", true],
            _raw: "click | set_field: w_safe_m_praise.sent : true",
            _cleaned: "click | set_field: w_safe_m_praise.sent : true",
          },
        ],
        priority: 3.7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field | w_safe_m_praise.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_safe_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_reminder"],
            _raw: "click | pop_up:w_safe_m_w_reminder",
            _cleaned: "click | pop_up:w_safe_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_reminder.sent", true],
            _raw: "click | set_field: w_safe_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_reminder.sent : true",
          },
        ],
        priority: 3.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_started",
                value: false,
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
                field: "w_safe_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_safe_m_w_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_safe_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_in_progress"],
            _raw: "click | pop_up:w_safe_m_w_in_progress",
            _cleaned: "click | pop_up:w_safe_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_safe_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_in_progress.sent : true",
          },
        ],
        priority: 3.5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field | w_safe_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_started",
                value: false,
              },
            },
            _raw: "get_field | w_safe_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_safe_completion_level: 100",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_safe_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_hp_reminder"],
            _raw: "click | pop_up:w_safe_m_hp_reminder",
            _cleaned: "click | pop_up:w_safe_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_safe_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_safe_m_hp_reminder.sent : true",
          },
        ],
        priority: 3.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_safe_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_safe_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_safe_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_safe_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_safe_m_parent_points_overview.sent : true",
          },
        ],
        priority: 3.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_safe_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_safe_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_hp_review"],
            _raw: "click | go_to: w_safe_hp_review",
            _cleaned: "click | go_to: w_safe_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_hp_review.sent", true],
            _raw: "click | set_field: w_safe_hp_review.sent : true",
            _cleaned: "click | set_field: w_safe_hp_review.sent : true",
          },
        ],
        priority: 3.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_safe_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_hp_review_completed",
                value: true,
              },
            },
            _raw: "get_field | w_safe_hp_review_completed : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_safe_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_tomorrow"],
            _raw: "click | pop_up:w_safe_m_w_tomorrow",
            _cleaned: "click | pop_up:w_safe_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_safe_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_safe_m_w_tomorrow.sent : true",
          },
        ],
        priority: 3.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "10",
              },
            },
            _raw: "get_field | workshop_number : 10",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_safe_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_crisis",
    status: "released",
    rows: [
      {
        id: "w_crisis_m_w_released",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_released"],
            _raw: "click | pop_up:w_crisis_m_w_released",
            _cleaned: "click | pop_up:w_crisis_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_released.sent", true],
            _raw: "click | set_field: w_crisis_m_w_released.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_released.sent : true",
          },
        ],
        priority: 2.99,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_started",
                value: false,
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
                field: "w_crisis_m_w_released.sent",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_m_w_released.sent : true",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_crisis_m_relax",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_relax"],
            _raw: "click | pop_up:w_crisis_m_relax",
            _cleaned: "click | pop_up:w_crisis_m_relax",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_relax.sent", true],
            _raw: "click | set_field: w_crisis_m_relax.sent : true",
            _cleaned: "click | set_field: w_crisis_m_relax.sent : true",
          },
        ],
        priority: 2.9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_relax.sent",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_m_relax.sent : true | before : 1 : day",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/smile_eyes_down_white.svg",
      },
      {
        id: "w_crisis_m_something_fun",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_something_fun"],
            _raw: "click | pop_up:w_crisis_m_something_fun",
            _cleaned: "click | pop_up:w_crisis_m_something_fun",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_something_fun.sent", true],
            _raw: "click | set_field: w_crisis_m_something_fun.sent : true",
            _cleaned: "click | set_field: w_crisis_m_something_fun.sent : true",
          },
        ],
        priority: 2.8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_something_fun.sent",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_m_something_fun.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/smile_eyes_up_white.svg",
      },
      {
        id: "w_crisis_m_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_praise"],
            _raw: "click | pop_up:w_crisis_m_praise",
            _cleaned: "click | pop_up:w_crisis_m_praise",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_praise.sent", true],
            _raw: "click | set_field: w_crisis_m_praise.sent : true",
            _cleaned: "click | set_field: w_crisis_m_praise.sent : true",
          },
        ],
        priority: 2.7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_praise.sent",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_m_praise.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/heart_white.svg",
      },
      {
        id: "w_crisis_m_w_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_reminder"],
            _raw: "click | pop_up:w_crisis_m_w_reminder",
            _cleaned: "click | pop_up:w_crisis_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_reminder.sent", true],
            _raw: "click | set_field: w_crisis_m_w_reminder.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_reminder.sent : true",
          },
        ],
        priority: 2.6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_started",
                value: false,
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
                field: "w_crisis_m_w_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_m_w_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_crisis_m_w_in_progress",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_in_progress"],
            _raw: "click | pop_up:w_crisis_m_w_in_progress",
            _cleaned: "click | pop_up:w_crisis_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_in_progress.sent", true],
            _raw: "click | set_field: w_crisis_m_w_in_progress.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_in_progress.sent : true",
          },
        ],
        priority: 2.5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_w_in_progress.sent",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_m_w_in_progress.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_started",
                value: false,
              },
            },
            _raw: "get_field | w_crisis_started : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_crisis_completion_level: 100",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
      {
        id: "w_crisis_m_hp_reminder",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_hp_reminder"],
            _raw: "click | pop_up:w_crisis_m_hp_reminder",
            _cleaned: "click | pop_up:w_crisis_m_hp_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_hp_reminder.sent", true],
            _raw: "click | set_field: w_crisis_m_hp_reminder.sent : true",
            _cleaned: "click | set_field: w_crisis_m_hp_reminder.sent : true",
          },
        ],
        priority: 2.4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_crisis_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_hp_reminder.sent",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_m_hp_reminder.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_crisis_m_parent_points_overview",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["m_parent_points_overview"],
            _raw: "click | pop_up:m_parent_points_overview",
            _cleaned: "click | pop_up:m_parent_points_overview",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_parent_points_overview.sent", true],
            _raw: "click | set_field: w_crisis_m_parent_points_overview.sent : true",
            _cleaned: "click | set_field: w_crisis_m_parent_points_overview.sent : true",
          },
        ],
        priority: 2.3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_parent_points_overview.sent",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_m_parent_points_overview.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_points"],
        icon: "plh_images/icons/star_white.svg",
      },
      {
        id: "w_crisis_hp_review",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_hp_review"],
            _raw: "click | go_to: w_crisis_hp_review",
            _cleaned: "click | go_to: w_crisis_hp_review",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_hp_review.sent", true],
            _raw: "click | set_field: w_crisis_hp_review.sent : true",
            _cleaned: "click | set_field: w_crisis_hp_review.sent : true",
          },
        ],
        priority: 2.2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_completion_level",
                value: "100",
              },
            },
            _raw: "get_field | w_crisis_completion_level: 100",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_hp_review_completed",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_hp_review_completed : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
        ],
        campaign_list: ["parent_centre"],
        icon: "plh_images/icons/parent_heart_white.svg",
      },
      {
        id: "w_crisis_m_w_tomorrow",
        action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_tomorrow"],
            _raw: "click | pop_up:w_crisis_m_w_tomorrow",
            _cleaned: "click | pop_up:w_crisis_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_tomorrow.sent", true],
            _raw: "click | set_field: w_crisis_m_w_tomorrow.sent : true",
            _cleaned: "click | set_field: w_crisis_m_w_tomorrow.sent : true",
          },
        ],
        priority: 2.1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_number",
                value: "11",
              },
            },
            _raw: "get_field | workshop_number : 11",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_m_w_tomorrow.sent",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_m_w_tomorrow.sent : true",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "0",
              },
            },
            _raw: "get_field | workshop_day : 0",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "1",
              },
            },
            _raw: "get_field | workshop_day : 1",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "2",
              },
            },
            _raw: "get_field | workshop_day : 2",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "3",
              },
            },
            _raw: "get_field | workshop_day : 3",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "4",
              },
            },
            _raw: "get_field | workshop_day : 4",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "workshop_day",
                value: "5",
              },
            },
            _raw: "get_field | workshop_day : 5",
          },
        ],
        campaign_list: ["weekly_workshops"],
        icon: "plh_images/icons/bell_white.svg",
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_home_screen.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_workshop_quick_start",
    status: "released",
    rows: [
      {
        id: "default",
        action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["default.sent", true],
            _raw: "click | set_field: default.sent : true",
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
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_self_care_stepper"],
            _raw: "click | go_to: w_self_care_stepper",
            _cleaned: "click | go_to: w_self_care_stepper",
          },
        ],
        priority: 12,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_self_care_disabled : false",
          },
        ],
        deactivation_condition_list: [
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
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_self_care_continue",
        workshop: "w_self_care",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_self_care_stepper"],
            _raw: "click | go_to: w_self_care_stepper",
            _cleaned: "click | go_to: w_self_care_stepper",
          },
        ],
        priority: 12,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_self_care_disabled : false",
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
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_completed",
                value: true,
              },
            },
            _raw: "get_field | w_self_care_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_1on1_quick_start",
        workshop: "w_1on1",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_stepper"],
            _raw: "click | go_to: w_1on1_stepper",
            _cleaned: "click | go_to: w_1on1_stepper",
          },
        ],
        priority: 11,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_1on1_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_started",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_1on1_continue",
        workshop: "w_1on1",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_stepper"],
            _raw: "click | go_to: w_1on1_stepper",
            _cleaned: "click | go_to: w_1on1_stepper",
          },
        ],
        priority: 11,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_1on1_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_started",
                value: true,
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
                field: "w_1on1_completed",
                value: true,
              },
            },
            _raw: "get_field | w_1on1_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_praise_quick_start",
        workshop: "w_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_stepper"],
            _raw: "click | go_to: w_praise_stepper",
            _cleaned: "click | go_to: w_praise_stepper",
          },
        ],
        priority: 10,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_praise_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_started",
                value: true,
              },
            },
            _raw: "get_field | w_praise_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_praise_continue",
        workshop: "w_praise",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_stepper"],
            _raw: "click | go_to: w_praise_stepper",
            _cleaned: "click | go_to: w_praise_stepper",
          },
        ],
        priority: 10,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_praise_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_started",
                value: true,
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
                field: "w_praise_completed",
                value: true,
              },
            },
            _raw: "get_field | w_praise_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_instruct_quick_start",
        workshop: "w_instruct",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_stepper"],
            _raw: "click | go_to: w_instruct_stepper",
            _cleaned: "click | go_to: w_instruct_stepper",
          },
        ],
        priority: 9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_instruct_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_started",
                value: true,
              },
            },
            _raw: "get_field | w_instruct_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_instruct_continue",
        workshop: "w_instruct",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_stepper"],
            _raw: "click | go_to: w_instruct_stepper",
            _cleaned: "click | go_to: w_instruct_stepper",
          },
        ],
        priority: 9,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_instruct_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_instruct_started",
                value: true,
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
                field: "w_instruct_completed",
                value: true,
              },
            },
            _raw: "get_field | w_instruct_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_stress_quick_start",
        workshop: "w_stress",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_stepper"],
            _raw: "click | go_to: w_stress_stepper",
            _cleaned: "click | go_to: w_stress_stepper",
          },
        ],
        priority: 8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_stress_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_started",
                value: true,
              },
            },
            _raw: "get_field | w_stress_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_stress_continue",
        workshop: "w_stress",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_stepper"],
            _raw: "click | go_to: w_stress_stepper",
            _cleaned: "click | go_to: w_stress_stepper",
          },
        ],
        priority: 8,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_stress_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_started",
                value: true,
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
                field: "w_stress_completed",
                value: true,
              },
            },
            _raw: "get_field | w_stress_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_money_quick_start",
        workshop: "w_money",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_stepper"],
            _raw: "click | go_to: w_money_stepper",
            _cleaned: "click | go_to: w_money_stepper",
          },
        ],
        priority: 7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_money_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_started",
                value: true,
              },
            },
            _raw: "get_field | w_money_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_money_continue",
        workshop: "w_money",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_stepper"],
            _raw: "click | go_to: w_money_stepper",
            _cleaned: "click | go_to: w_money_stepper",
          },
        ],
        priority: 7,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_money_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_started",
                value: true,
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
                field: "w_money_completed",
                value: true,
              },
            },
            _raw: "get_field | w_money_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_rules_quick_start",
        workshop: "w_rules",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_rules_stepper"],
            _raw: "click | go_to: w_rules_stepper",
            _cleaned: "click | go_to: w_rules_stepper",
          },
        ],
        priority: 6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_rules_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_started",
                value: true,
              },
            },
            _raw: "get_field | w_rules_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_rules_continue",
        workshop: "w_rules",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_rules_stepper"],
            _raw: "click | go_to: w_rules_stepper",
            _cleaned: "click | go_to: w_rules_stepper",
          },
        ],
        priority: 6,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_rules_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_started",
                value: true,
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
                field: "w_rules_completed",
                value: true,
              },
            },
            _raw: "get_field | w_rules_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_consequence_quick_start",
        workshop: "w_consequence",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_stepper"],
            _raw: "click | go_to: w_consequence_stepper",
            _cleaned: "click | go_to: w_consequence_stepper",
          },
        ],
        priority: 5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_consequence_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_started",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_consequence_continue",
        workshop: "w_consequence",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_stepper"],
            _raw: "click | go_to: w_consequence_stepper",
            _cleaned: "click | go_to: w_consequence_stepper",
          },
        ],
        priority: 5,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_consequence_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_started",
                value: true,
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
                field: "w_consequence_completed",
                value: true,
              },
            },
            _raw: "get_field | w_consequence_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_solve_quick_start",
        workshop: "w_solve",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_stepper"],
            _raw: "click | go_to: w_solve_stepper",
            _cleaned: "click | go_to: w_solve_stepper",
          },
        ],
        priority: 4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_solve_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_started",
                value: true,
              },
            },
            _raw: "get_field | w_solve_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_solve_continue",
        workshop: "w_solve",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_stepper"],
            _raw: "click | go_to: w_solve_stepper",
            _cleaned: "click | go_to: w_solve_stepper",
          },
        ],
        priority: 4,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_solve_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_started",
                value: true,
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
                field: "w_solve_completed",
                value: true,
              },
            },
            _raw: "get_field | w_solve_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_safe_quick_start",
        workshop: "w_safe",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_stepper"],
            _raw: "click | go_to: w_safe_stepper",
            _cleaned: "click | go_to: w_safe_stepper",
          },
        ],
        priority: 3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_safe_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_started",
                value: true,
              },
            },
            _raw: "get_field | w_safe_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_safe_continue",
        workshop: "w_safe",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_stepper"],
            _raw: "click | go_to: w_safe_stepper",
            _cleaned: "click | go_to: w_safe_stepper",
          },
        ],
        priority: 3,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_safe_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_started",
                value: true,
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
                field: "w_safe_completed",
                value: true,
              },
            },
            _raw: "get_field | w_safe_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_crisis_quick_start",
        workshop: "w_crisis",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_stepper"],
            _raw: "click | go_to: w_crisis_stepper",
            _cleaned: "click | go_to: w_crisis_stepper",
          },
        ],
        priority: 2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_crisis_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_started",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_crisis_continue",
        workshop: "w_crisis",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_stepper"],
            _raw: "click | go_to: w_crisis_stepper",
            _cleaned: "click | go_to: w_crisis_stepper",
          },
        ],
        priority: 2,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_crisis_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_started",
                value: true,
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
                field: "w_crisis_completed",
                value: true,
              },
            },
            _raw: "get_field | w_crisis_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
      {
        id: "w_celebrate_quick_start",
        workshop: "w_celebrate",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_celebrate_stepper"],
            _raw: "click | go_to: w_celebrate_stepper",
            _cleaned: "click | go_to: w_celebrate_stepper",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_celebrate_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_celebrate_disabled : false",
          },
        ],
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_celebrate_started",
                value: true,
              },
            },
            _raw: "get_field | w_celebrate_started : true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Start",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Start",
          },
        },
      },
      {
        id: "w_celebrate_continue",
        workshop: "w_celebrate",
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_celebrate_stepper"],
            _raw: "click | go_to: w_celebrate_stepper",
            _cleaned: "click | go_to: w_celebrate_stepper",
          },
        ],
        priority: 1,
        activation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_celebrate_disabled",
                value: false,
              },
            },
            _raw: "get_field | w_celebrate_disabled : false",
          },
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_celebrate_started",
                value: true,
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
                field: "w_celebrate_completed",
                value: true,
              },
            },
            _raw: "get_field | w_celebrate_completed: true",
          },
        ],
        campaign_list: ["workshop_quick_start"],
        icon: "plh_images/icons/play_white.svg",
        text: "Continue",
        _translations: {
          text: {
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "Continue",
          },
        },
      },
    ],
    _xlsxPath: "global/campaigns/quick_start_weekly_workshops.xlsx",
  },
];
export default data_list;
