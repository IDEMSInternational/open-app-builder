/* eslint-disable */
import { FlowTypes } from "data-models";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_inactive_day",
    status: "released",
    rows: [
      {
        id: "m_inactive_day_1",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_inactive_day_1.sent", true],
            _raw: "set_field: m_inactive_day_1.sent : true",
            _cleaned: "click | set_field: m_inactive_day_1.sent : true",
          },
        ],
        priority: 1,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_inactive_day_1.sent",
                value: true,
              },
            },
            _raw: "get_field | m_inactive_day_1.sent : true",
          },
        ],
        campaign_list: ["inactive_day"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
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
    _xlsxPath: "campaigns/notification_campaigns.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_inactive_week",
    status: "released",
    rows: [
      {
        id: "m_inactive_week_1",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_inactive_week_1.sent", true],
            _raw: "set_field: m_inactive_week_1.sent : true",
            _cleaned: "click | set_field: m_inactive_week_1.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["inactive_week"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
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
        id: "m_inactive_week_2",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_inactive_week_2.sent", true],
            _raw: "set_field: m_inactive_week_2.sent : true",
            _cleaned: "click | set_field: m_inactive_week_2.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["inactive_week"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
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
        id: "m_inactive_week_3",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_inactive_week_3.sent", true],
            _raw: "set_field: m_inactive_week_3.sent : true",
            _cleaned: "click | set_field: m_inactive_week_3.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["inactive_week"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
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
        id: "m_inactive_week_4",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_inactive_week_4.sent", true],
            _raw: "set_field: m_inactive_week_4.sent : true",
            _cleaned: "click | set_field: m_inactive_week_4.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["inactive_week"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
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
    _xlsxPath: "campaigns/notification_campaigns.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_inactive_month",
    status: "released",
    rows: [
      {
        id: "m_inactive_month_1",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_inactive_month_1.sent", true],
            _raw: "set_field: m_inactive_month_1.sent : true",
            _cleaned: "click | set_field: m_inactive_month_1.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["inactive_month"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
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
        id: "m_inactive_month_2",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_inactive_month_2.sent", true],
            _raw: "set_field: m_inactive_month_2.sent : true",
            _cleaned: "click | set_field: m_inactive_month_2.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["inactive_month"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
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
        id: "m_inactive_month_3",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_inactive_month_3.sent", true],
            _raw: "set_field: m_inactive_month_3.sent : true",
            _cleaned: "click | set_field: m_inactive_month_3.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["inactive_month"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
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
        id: "m_inactive_month_4",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_inactive_month_4.sent", true],
            _raw: "set_field: m_inactive_month_4.sent : true",
            _cleaned: "click | set_field: m_inactive_month_4.sent : true",
          },
        ],
        priority: 1,
        campaign_list: ["inactive_month"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
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
    _xlsxPath: "campaigns/notification_campaigns.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_generic",
    status: "released",
    rows: [
      {
        id: "m_generic_1",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_generic_1.sent", true],
            _raw: "set_field: m_generic_1.sent : true",
            _cleaned: "click | set_field: m_generic_1.sent : true",
          },
        ],
        priority: 1,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_generic_1.sent",
                value: true,
              },
            },
            _raw: "get_field | m_generic_1.sent : true",
          },
        ],
        campaign_list: ["generic"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
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
        id: "m_generic_2",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_generic_2.sent", true],
            _raw: "set_field: m_generic_2.sent : true",
            _cleaned: "click | set_field: m_generic_2.sent : true",
          },
        ],
        priority: 1,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_generic_2.sent",
                value: true,
              },
            },
            _raw: "get_field | m_generic_2.sent : true",
          },
        ],
        campaign_list: ["generic"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
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
        id: "m_generic_3",
        click_action_list: [
          {
            trigger: "click",
            action_id: "set_field",
            args: ["m_generic_3.sent", true],
            _raw: "set_field: m_generic_3.sent : true",
            _cleaned: "click | set_field: m_generic_3.sent : true",
          },
        ],
        priority: 1,
        deactivation_condition_list: [
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "m_generic_3.sent",
                value: true,
              },
            },
            _raw: "get_field | m_generic_3.sent : true",
          },
        ],
        campaign_list: ["generic"],
        title: "New message from PLH",
        _translations: {
          title: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_tn: true,
            za_xh: true,
            za_zu: true,
          },
          text: {
            tz_sw: true,
            za_af: true,
            za_st: true,
            za_xh: true,
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
    _xlsxPath: "campaigns/notification_campaigns.xlsx",
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_self_care_stepper"],
            _raw: "go_to: w_self_care_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_self_care_stepper"],
            _raw: "go_to: w_self_care_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_stepper"],
            _raw: "go_to: w_1on1_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_1on1_stepper"],
            _raw: "go_to: w_1on1_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_stepper"],
            _raw: "go_to: w_praise_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_praise_stepper"],
            _raw: "go_to: w_praise_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_stepper"],
            _raw: "go_to: w_instruct_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_instruct_stepper"],
            _raw: "go_to: w_instruct_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_stepper"],
            _raw: "go_to: w_stress_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_stress_stepper"],
            _raw: "go_to: w_stress_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_stepper"],
            _raw: "go_to: w_money_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_money_stepper"],
            _raw: "go_to: w_money_stepper",
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
            tz_sw: true,
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
            tz_sw: true,
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_stepper"],
            _raw: "go_to: w_consequence_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_consequence_stepper"],
            _raw: "go_to: w_consequence_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_stepper"],
            _raw: "go_to: w_solve_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_solve_stepper"],
            _raw: "go_to: w_solve_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_stepper"],
            _raw: "go_to: w_safe_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_safe_stepper"],
            _raw: "go_to: w_safe_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_stepper"],
            _raw: "go_to: w_crisis_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_crisis_stepper"],
            _raw: "go_to: w_crisis_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_celebrate_stepper"],
            _raw: "go_to: w_celebrate_stepper",
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
            tz_sw: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_celebrate_stepper"],
            _raw: "go_to: w_celebrate_stepper",
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
            tz_sw: true,
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
    _xlsxPath: "campaigns/campaign_weekly_workshops_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_self_care",
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
        id: "survey_welcome_quick_start",
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
            args: ["survey_welcome_quick_start.sent", true],
            _raw: "set_field: survey_welcome_quick_start.sent : true",
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["survey_final_stepper"],
            _raw: "go_to: survey_final_stepper",
            _cleaned: "click | go_to: survey_final_stepper",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["survey_final_quick_start.sent", true],
            _raw: "set_field: survey_final_quick_start.sent : true",
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["w_self_care_stepper"],
            _raw: "go_to: w_self_care_stepper",
            _cleaned: "click | go_to: w_self_care_stepper",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_self_care_m_w_released.sent", true],
            _raw: "set_field: w_self_care_m_w_released.sent : true",
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
                field: "w_self_care_completed",
                value: true,
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
                field: "w_self_care_completed",
                value: true,
              },
            },
            _raw: "get_field | w_self_care_completed: true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_self_care_completed",
                value: false,
              },
            },
            _raw: "get_field | w_self_care_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_1on1",
    status: "released",
    rows: [
      {
        id: "w_1on1_m_w_released",
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
                field: "w_1on1_completed",
                value: true,
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
                field: "w_1on1_completed",
                value: true,
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
                field: "w_1on1_completed",
                value: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_1on1_m_w_tomorrow"],
            _raw: "pop_up: w_1on1_m_w_tomorrow",
            _cleaned: "click | pop_up: w_1on1_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_1on1_m_w_tomorrow.sent", true],
            _raw: "set_field: w_1on1_m_w_tomorrow.sent : true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_completed",
                value: false,
              },
            },
            _raw: "get_field | w_1on1_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_praise",
    status: "released",
    rows: [
      {
        id: "w_praise_m_w_released",
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_in_progress"],
            _raw: "pop_up: w_praise_m_w_in_progress",
            _cleaned: "click | pop_up: w_praise_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_in_progress.sent", true],
            _raw: "set_field: w_praise_m_w_in_progress.sent : true",
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
                field: "w_praise_completed",
                value: true,
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
                field: "w_praise_completed",
                value: true,
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
                field: "w_praise_completed",
                value: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_praise_m_w_tomorrow"],
            _raw: "pop_up: w_praise_m_w_tomorrow",
            _cleaned: "click | pop_up: w_praise_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_praise_m_w_tomorrow.sent", true],
            _raw: "set_field: w_praise_m_w_tomorrow.sent : true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_praise_completed",
                value: false,
              },
            },
            _raw: "get_field | w_praise_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_instruct",
    status: "released",
    rows: [
      {
        id: "w_instruct_m_w_released",
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_in_progress"],
            _raw: "pop_up: w_instruct_m_w_in_progress",
            _cleaned: "click | pop_up: w_instruct_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_in_progress.sent", true],
            _raw: "set_field: w_instruct_m_w_in_progress.sent : true",
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
                field: "w_instruct_completed",
                value: true,
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
                field: "w_instruct_completed",
                value: true,
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
                field: "w_instruct_completed",
                value: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_instruct_m_w_tomorrow"],
            _raw: "pop_up: w_instruct_m_w_tomorrow",
            _cleaned: "click | pop_up: w_instruct_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_instruct_m_w_tomorrow.sent", true],
            _raw: "set_field: w_instruct_m_w_tomorrow.sent : true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_1on1_completed",
                value: false,
              },
            },
            _raw: "get_field | w_1on1_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_stress",
    status: "released",
    rows: [
      {
        id: "w_stress_m_w_released",
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
                field: "w_stress_completed",
                value: true,
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
                field: "w_stress_completed",
                value: true,
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
                field: "w_stress_completed",
                value: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_stress_m_w_tomorrow"],
            _raw: "pop_up: w_stress_m_w_tomorrow",
            _cleaned: "click | pop_up: w_stress_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_stress_m_w_tomorrow.sent", true],
            _raw: "set_field: w_stress_m_w_tomorrow.sent : true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_stress_completed",
                value: false,
              },
            },
            _raw: "get_field | w_stress_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_money",
    status: "released",
    rows: [
      {
        id: "w_money_m_w_released",
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
                field: "w_money_completed",
                value: true,
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
                field: "w_money_completed",
                value: true,
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
                field: "w_money_completed",
                value: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_money_m_w_tomorrow"],
            _raw: "pop_up: w_money_m_w_tomorrow",
            _cleaned: "click | pop_up: w_money_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_money_m_w_tomorrow.sent", true],
            _raw: "set_field: w_money_m_w_tomorrow.sent : true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_money_completed",
                value: false,
              },
            },
            _raw: "get_field | w_money_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_rules",
    status: "released",
    rows: [
      {
        id: "w_rules_m_w_released",
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
                field: "w_rules_completed",
                value: true,
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
                field: "w_rules_completed",
                value: true,
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
                field: "w_rules_completed",
                value: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_rules_m_w_tomorrow"],
            _raw: "pop_up: w_rules_m_w_tomorrow",
            _cleaned: "click | pop_up: w_rules_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_rules_m_w_tomorrow.sent", true],
            _raw: "set_field: w_rules_m_w_tomorrow.sent : true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_rules_completed",
                value: false,
              },
            },
            _raw: "get_field | w_rules_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_consequence",
    status: "released",
    rows: [
      {
        id: "w_consequence_m_w_released",
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_released"],
            _raw: "pop_up: w_consequence_m_w_released",
            _cleaned: "click | pop_up: w_consequence_m_w_released",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_released.sent", true],
            _raw: "set_field: w_consequence_m_w_released.sent : true",
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_reminder"],
            _raw: "pop_up: w_consequence_m_w_reminder",
            _cleaned: "click | pop_up: w_consequence_m_w_reminder",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_reminder.sent", true],
            _raw: "set_field: w_consequence_m_w_reminder.sent : true",
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_in_progress"],
            _raw: "pop_up: w_consequence_m_w_in_progress",
            _cleaned: "click | pop_up: w_consequence_m_w_in_progress",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_in_progress.sent", true],
            _raw: "set_field: w_consequence_m_w_in_progress.sent : true",
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
                field: "w_consequence_completed",
                value: true,
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
                field: "w_consequence_completed",
                value: true,
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
                field: "w_consequence_completed",
                value: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_consequence_m_w_tomorrow"],
            _raw: "pop_up: w_consequence_m_w_tomorrow",
            _cleaned: "click | pop_up: w_consequence_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_consequence_m_w_tomorrow.sent", true],
            _raw: "set_field: w_consequence_m_w_tomorrow.sent : true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_consequence_completed",
                value: false,
              },
            },
            _raw: "get_field | w_consequence_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_solve",
    status: "released",
    rows: [
      {
        id: "w_solve_m_w_released",
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
                field: "w_solve_completed",
                value: true,
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
                field: "w_solve_completed",
                value: true,
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
                field: "w_solve_completed",
                value: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_solve_m_w_tomorrow"],
            _raw: "pop_up: w_solve_m_w_tomorrow",
            _cleaned: "click | pop_up: w_solve_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_solve_m_w_tomorrow.sent", true],
            _raw: "set_field: w_solve_m_w_tomorrow.sent : true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_solve_completed",
                value: false,
              },
            },
            _raw: "get_field | w_solve_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_safe",
    status: "released",
    rows: [
      {
        id: "w_safe_m_w_released",
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
                field: "w_safe_completed",
                value: true,
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
                field: "w_safe_completed",
                value: true,
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
                field: "w_safe_completed",
                value: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_safe_m_w_tomorrow"],
            _raw: "pop_up: w_safe_m_w_tomorrow",
            _cleaned: "click | pop_up: w_safe_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_safe_m_w_tomorrow.sent", true],
            _raw: "set_field: w_safe_m_w_tomorrow.sent : true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_safe_completed",
                value: false,
              },
            },
            _raw: "get_field | w_safe_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows",
    flow_name: "campaign_hs_w_crisis",
    status: "released",
    rows: [
      {
        id: "w_crisis_m_w_released",
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
                field: "w_crisis_completed",
                value: true,
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
                field: "w_crisis_completed",
                value: true,
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
                field: "w_crisis_completed",
                value: true,
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
        click_action_list: [
          {
            trigger: "click",
            action_id: "pop_up",
            args: ["w_crisis_m_w_tomorrow"],
            _raw: "pop_up: w_crisis_m_w_tomorrow",
            _cleaned: "click | pop_up: w_crisis_m_w_tomorrow",
          },
          {
            trigger: "click",
            action_id: "set_field",
            args: ["w_crisis_m_w_tomorrow.sent", true],
            _raw: "set_field: w_crisis_m_w_tomorrow.sent : true",
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
          {
            condition_type: "field_evaluation",
            condition_args: {
              field_evaluation: {
                field: "w_crisis_completed",
                value: false,
              },
            },
            _raw: "get_field | w_crisis_completed : false",
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
    _xlsxPath: "campaigns/campaign_home_screen_quick_start.xlsx",
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
    _xlsxPath: "campaigns/campaign_parent_centre_quick_start.xlsx",
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
    _xlsxPath: "campaigns/campaign_parent_centre_quick_start.xlsx",
  },
];
export default data_list;
