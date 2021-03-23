/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const global: FlowTypes.Global[] = [
  {
    "flow_type": "global",
    "flow_name": "debug_set_global_1",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "debug_variable_1",
        "value": "Value of the first debug variable"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "example_initialise_global",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "example_global_constant_text",
        "value": "Example Global Constant Text",
        "comments": "I'm setting a new global constant"
      },
      {
        "type": "declare_global_constant",
        "name": "example_global_constant_title",
        "value": "Example Global Constant Title",
        "comments": "I'm setting a new global constant"
      },
      {
        "type": "declare_global_constant",
        "name": "example_global_constant_image",
        "value": "plh_images/habits/habit_relax_image.svg",
        "comments": "I'm setting a new global constant"
      },
      {
        "type": "declare_field_default",
        "name": "field_1",
        "value": "Value of Field 1",
        "comments": "This should be defined in one template and persist to another"
      },
      {
        "type": "declare_field_default",
        "name": "field_0",
        "value": "Value of field 0"
      },
      {
        "type": "declare_field_default",
        "name": "field_4",
        "value": true
      },
      {
        "type": "declare_field_default",
        "name": "field_5",
        "value": 5
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_global_field.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "home_screen_variables",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "weekly_workshops",
        "value": "Weekly Workshops"
      },
      {
        "type": "declare_global_constant",
        "name": "weekly_workshop",
        "value": "Weekly Workshop"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_points",
        "value": "Parent Points"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point",
        "value": "Parent Point"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_centre",
        "value": "Parent Centre"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\navigation_templates\\global_navigation.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "parent_centre_variables",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "help",
        "value": "Help"
      },
      {
        "type": "declare_global_constant",
        "name": "help_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "declare_global_constant",
        "name": "essential_tools",
        "value": "Essential Tools"
      },
      {
        "type": "declare_global_constant",
        "name": "essential_tools_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "declare_global_constant",
        "name": "covid",
        "value": "COVID"
      },
      {
        "type": "declare_global_constant",
        "name": "covid_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "declare_global_constant",
        "name": "relax_and_activities",
        "value": "Relax & Activities"
      },
      {
        "type": "declare_global_constant",
        "name": "relax_and_activities_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "declare_global_constant",
        "name": "extra",
        "value": "Extra"
      },
      {
        "type": "declare_global_constant",
        "name": "extra_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "declare_global_constant",
        "name": "support_contacts",
        "value": "Support Contacts"
      },
      {
        "type": "declare_global_constant",
        "name": "support_contacts_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "declare_global_constant",
        "name": "evidence_base",
        "value": "Evidence Base"
      },
      {
        "type": "declare_global_constant",
        "name": "evidence_base_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "declare_global_constant",
        "name": "technical_support",
        "value": "Technical Support"
      },
      {
        "type": "declare_global_constant",
        "name": "technical_support_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\navigation_templates\\global_navigation.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "parent_point_variables",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "parent_point_relax",
        "value": "Relax"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_relax_image",
        "value": "plh_images/habits/habit_relax_image.svg"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_treat_yourself",
        "value": "Treat yourself well"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_treat_yourself_image",
        "value": "plh_images/habits/habit_treat_yourself_image.svg"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_praise_yourself",
        "value": "Praise yourself"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_praise_yourself_image",
        "value": "plh_images/habits/habit_praise_yourself_image.svg"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_spend_time",
        "value": "One on one time"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_spend_time_image",
        "value": "plh_images/habits/habit_spend_time_image.svg"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_praise_teen",
        "value": "Praise your teen"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_praise_teen_image",
        "value": "plh_images/habits/habit_praise_teen_image.svg"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_breathe",
        "value": "Breathe not yell"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_breathe_image",
        "value": "plh_images/habits/habit_breathe_image.svg"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_money",
        "value": "Good money choice"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_money_image",
        "value": "plh_images/habits/habit_money_image.svg"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_consequence",
        "value": "Calm consequence"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_consequence_image",
        "value": "plh_images/habits/habit_consequence_image.svg"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_safe",
        "value": "Safe"
      },
      {
        "type": "declare_global_constant",
        "name": "parent_point_safe_image",
        "value": "plh_images/habits/habit_safe_image.svg"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\parent_point_templates\\global_parent_points.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "workshop_titles",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "w_self_care",
        "value": "Self-Care",
        "comments": "self-care"
      },
      {
        "type": "declare_global_constant",
        "name": "w_self_care_short",
        "value": "Self-Care",
        "comments": "ETW 1 -- done"
      },
      {
        "type": "declare_global_constant",
        "name": "w_1on1",
        "value": "One-on-One Time",
        "comments": "1on1"
      },
      {
        "type": "declare_global_constant",
        "name": "w_1on1_short",
        "value": "1 on 1",
        "comments": "ETW 3 -- done"
      },
      {
        "type": "declare_global_constant",
        "name": "w_praise",
        "value": "Praise & Positive Reinforcement",
        "comments": "praise"
      },
      {
        "type": "declare_global_constant",
        "name": "w_praise_short",
        "value": "Praise",
        "comments": "ETW 4 -- done"
      },
      {
        "type": "declare_global_constant",
        "name": "w_instruct",
        "value": "Positive Instructions",
        "comments": "instruct"
      },
      {
        "type": "declare_global_constant",
        "name": "w_instruct_short",
        "value": "Instructions",
        "comments": "ETW 2 -- done"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress",
        "value": "Managing Anger & Stress",
        "comments": "stress"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress_short",
        "value": "Stress",
        "comments": "ETW 5"
      },
      {
        "type": "declare_global_constant",
        "name": "w_money",
        "value": "Family Budgeting",
        "comments": "money"
      },
      {
        "type": "declare_global_constant",
        "name": "w_money_short",
        "value": "Money"
      },
      {
        "type": "declare_global_constant",
        "name": "w_rules",
        "value": "Rules",
        "comments": "rules"
      },
      {
        "type": "declare_global_constant",
        "name": "w_rules_short",
        "value": "Rules"
      },
      {
        "type": "declare_global_constant",
        "name": "w_responsibility",
        "value": "Accepting Responsibility",
        "comments": "responsibility"
      },
      {
        "type": "declare_global_constant",
        "name": "w_responsibility_short",
        "value": "Consequences"
      },
      {
        "type": "declare_global_constant",
        "name": "w_solve",
        "value": "Problem Solving",
        "comments": "solve"
      },
      {
        "type": "declare_global_constant",
        "name": "w_solve_short",
        "value": "Problem Solve"
      },
      {
        "type": "declare_global_constant",
        "name": "w_safe",
        "value": "Keeping Your Teen Safe",
        "comments": "safe"
      },
      {
        "type": "declare_global_constant",
        "name": "w_safe_short",
        "value": "Safety"
      },
      {
        "type": "declare_global_constant",
        "name": "w_crisis",
        "value": "Dealing with Crisis",
        "comments": "crisis"
      },
      {
        "type": "declare_global_constant",
        "name": "w_crisis_short",
        "value": "Crisis"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\global_variables_workshops.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "workshop_completion_levels",
    "status": "released",
    "rows": [
      {
        "type": "declare_field_default",
        "name": "w_self-care_completion_level",
        "value": 0
      },
      {
        "type": "declare_field_default",
        "name": "w_1on1_completion_level",
        "value": 0
      },
      {
        "type": "declare_field_default",
        "name": "w_praise_completion_level",
        "value": 0
      },
      {
        "type": "declare_field_default",
        "name": "w_instruct_completion_level",
        "value": 0
      },
      {
        "type": "declare_field_default",
        "name": "w_stress_completion_level",
        "value": 0
      },
      {
        "type": "declare_field_default",
        "name": "w_money_completion_level",
        "value": 0
      },
      {
        "type": "declare_field_default",
        "name": "w_rules_completion_level",
        "value": 0
      },
      {
        "type": "declare_field_default",
        "name": "w_responsibility_completion_level",
        "value": 0
      },
      {
        "type": "declare_field_default",
        "name": "w_solve_completion_level",
        "value": 0
      },
      {
        "type": "declare_field_default",
        "name": "w_safe_completion_level",
        "value": 0
      },
      {
        "type": "declare_field_default",
        "name": "w_crisis_completion_level",
        "value": 0
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\global_variables_workshops.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "workshop_options",
    "status": "released",
    "rows": [
      {
        "type": "declare_field_default",
        "name": "do_workshops_together",
        "value": true
      },
      {
        "type": "declare_field_default",
        "name": "guide_number",
        "value": "guide_2"
      },
      {
        "type": "declare_field_default",
        "name": "group_name",
        "value": "Friends"
      },
      {
        "type": "declare_field_default",
        "name": "user_name",
        "value": "Lucie"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\global_variables_workshops.xlsx"
  }
]