/* eslint-disable */
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_global_field.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "home_screen_variables",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "parent_app",
        "value": "ParentApp"
      },
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
        "value": "Parent Library"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/navigation_templates/global_navigation.xlsx"
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
        "value": "Essential tools"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/navigation_templates/global_navigation.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/parent_point_templates/global_parent_points.xlsx"
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
        "comments": "individual done"
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
        "value": "One-on-One Time",
        "comments": "individual done"
      },
      {
        "type": "declare_global_constant",
        "name": "w_praise",
        "value": "Praise",
        "comments": "praise"
      },
      {
        "type": "declare_global_constant",
        "name": "w_praise_short",
        "value": "Praise",
        "comments": "individual done"
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
        "value": "Positive Instructions",
        "comments": "individual done"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress",
        "value": "Managing Stress",
        "comments": "stress"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress_short",
        "value": "Managing Stress",
        "comments": "individual done"
      },
      {
        "type": "declare_global_constant",
        "name": "w_money",
        "value": "Family Budgets",
        "comments": "money"
      },
      {
        "type": "declare_global_constant",
        "name": "w_money_short",
        "value": "Family Budgets"
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
        "name": "w_consequence",
        "value": "Calm Consequences",
        "comments": "consequence"
      },
      {
        "type": "declare_global_constant",
        "name": "w_consequence_short",
        "value": "Calm Consequences"
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
        "value": "Problem Solving"
      },
      {
        "type": "declare_global_constant",
        "name": "w_safe",
        "value": "Teen Safety",
        "comments": "safe"
      },
      {
        "type": "declare_global_constant",
        "name": "w_safe_short",
        "value": "Teen Safety"
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
        "value": "Dealing with Crisis"
      },
      {
        "type": "declare_global_constant",
        "name": "w_celebrate",
        "value": "Celebration and Next Steps",
        "comments": "celebrate"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/global_variables_workshops.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "workshop_modes",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "home_practice_problem_solving",
        "value": "Talk about Home Practice"
      },
      {
        "type": "declare_global_constant",
        "name": "home_practice",
        "value": "Home Practice"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/global_variables_workshops.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "names_of_characters",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "guide_1_name",
        "value": "Giles"
      },
      {
        "type": "declare_global_constant",
        "name": "guide_2_name",
        "value": "Grace"
      },
      {
        "type": "declare_global_constant",
        "name": "guide_teen_name",
        "value": "Alex"
      },
      {
        "type": "declare_global_constant",
        "name": "w_praise_female_caregiver_name",
        "value": "Felicia"
      },
      {
        "type": "declare_global_constant",
        "name": "w_praise_girl",
        "value": "Faraja"
      },
      {
        "type": "declare_global_constant",
        "name": "w_praise_teen_girl",
        "value": "Amina"
      },
      {
        "type": "declare_global_constant",
        "name": "w_instruct_teen_girl",
        "value": "Amina"
      },
      {
        "type": "declare_global_constant",
        "name": "w_instruct_female_caregiver",
        "value": "Grandma"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress_teen_boy_1",
        "value": "Amani"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress_girl",
        "value": "Shukuru"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress_male_caregiver",
        "value": "Father"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress_female_caregiver",
        "value": "Mother"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress_teen_girl",
        "value": "Maria"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress_teen_boy_2",
        "value": "James"
      },
      {
        "type": "declare_global_constant",
        "name": "w_stress_parent",
        "value": "Dad"
      },
      {
        "type": "declare_global_constant",
        "name": "w_rules_teen_boy",
        "value": "Amani"
      },
      {
        "type": "declare_global_constant",
        "name": "w_rules_female_caregiver_1",
        "value": "Mother"
      },
      {
        "type": "declare_global_constant",
        "name": "w_rules_teen_girl",
        "value": "Shalini"
      },
      {
        "type": "declare_global_constant",
        "name": "w_rules_female_caregiver_2",
        "value": "Mom"
      },
      {
        "type": "declare_global_constant",
        "name": "w_consequence_teen_boy",
        "value": "Amani"
      },
      {
        "type": "declare_global_constant",
        "name": "w_consequence_male_caregiver",
        "value": "Father"
      },
      {
        "type": "declare_global_constant",
        "name": "w_consequence_female_caregiver",
        "value": "Mother"
      },
      {
        "type": "declare_global_constant",
        "name": "w_money_grandma",
        "value": "Grandma Sara"
      },
      {
        "type": "declare_global_constant",
        "name": "w_money_teen_girl",
        "value": "Amina"
      },
      {
        "type": "declare_global_constant",
        "name": "w_money_teen_boy",
        "value": "Baraka"
      },
      {
        "type": "declare_global_constant",
        "name": "w_solve_female_caregiver_1",
        "value": "Mother"
      },
      {
        "type": "declare_global_constant",
        "name": "w_solve_female_caregiver_1_name",
        "value": "Emma"
      },
      {
        "type": "declare_global_constant",
        "name": "w_solve_teen_girl",
        "value": "Faraja"
      },
      {
        "type": "declare_global_constant",
        "name": "w_solve_teen_boy_1",
        "value": "Sammy"
      },
      {
        "type": "declare_global_constant",
        "name": "w_solve_female_caregiver_2",
        "value": "Grandma"
      },
      {
        "type": "declare_global_constant",
        "name": "w_solve_teen_boy_2",
        "value": "Baraka"
      },
      {
        "type": "declare_global_constant",
        "name": "w_safe_teen_girl_1",
        "value": "Faraja"
      },
      {
        "type": "declare_global_constant",
        "name": "w_safe_teen_girl_2",
        "value": "Amina"
      },
      {
        "type": "declare_global_constant",
        "name": "w_safe_teen_girl_3",
        "value": "Shukuru"
      },
      {
        "type": "declare_global_constant",
        "name": "w_safe_female_caregiver",
        "value": "Mom"
      },
      {
        "type": "declare_global_constant",
        "name": "w_crisis_teen_girl_1",
        "value": "Faraja"
      },
      {
        "type": "declare_global_constant",
        "name": "w_crisis_adult_friend",
        "value": "Bibi"
      },
      {
        "type": "declare_global_constant",
        "name": "w_crisis_female_caregiver",
        "value": "Mama"
      },
      {
        "type": "declare_global_constant",
        "name": "w_crisis_teen_boy_1",
        "value": "Amani"
      },
      {
        "type": "declare_global_constant",
        "name": "w_crisis_teen_boy_2",
        "value": "Thabani"
      },
      {
        "type": "declare_global_constant",
        "name": "w_crisis_male_caregiver_1",
        "value": "Dad"
      },
      {
        "type": "declare_global_constant",
        "name": "w_crisis_male_caregiver_2",
        "value": "Grandpa"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/global_variables_workshops.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "localisation_options",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "teen_social_medium",
        "value": "TikTok"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/global_variables_workshops.xlsx"
  },
  {
    "flow_type": "global",
    "flow_name": "workshop_buttons",
    "status": "released",
    "rows": [
      {
        "type": "declare_global_constant",
        "name": "ideas_button",
        "value": "Real-world ideas"
      },
      {
        "type": "declare_global_constant",
        "name": "ideas_short_button",
        "value": "Ideas"
      },
      {
        "type": "declare_global_constant",
        "name": "ideas_pop_up",
        "value": "Ideas from other families..."
      },
      {
        "type": "declare_global_constant",
        "name": "more_button",
        "value": "Find out more"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/global_variables_workshops.xlsx"
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
      },
      {
        "type": "declare_field_default",
        "name": "w_week1_unlocked",
        "value": true
      },
      {
        "type": "declare_field_default",
        "name": "w_week2_unlocked",
        "value": false
      },
      {
        "type": "declare_field_default",
        "name": "w_week3_unlocked",
        "value": false
      },
      {
        "type": "declare_field_default",
        "name": "w_week4_unlocked",
        "value": false
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/global_variables_workshops.xlsx"
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
        "type": "declare_global_constant",
        "name": "together",
        "value": "Group"
      },
      {
        "type": "declare_global_constant",
        "name": "individual",
        "value": "Me"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/global_variables_workshops.xlsx"
  }
]