/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const module_page: FlowTypes.Module_page[] = [
  {
    "flow_type": "module_page",
    "module": "welcome",
    "flow_name": "mod_welcome_page",
    "status": "released",
    "rows": [
      {
        "row_id": 1,
        "type": "main_image",
        "media": "hyperlink to image"
      },
      {
        "row_id": 2,
        "type": "title",
        "text": "Self Care"
      },
      {
        "row_id": 3,
        "type": "description",
        "text": "Looking after yourself is essential for parenting."
      },
      {
        "type": "step_group",
        "rows": [
          {
            "row_id": 5,
            "type": "step_intro",
            "text": "Complete the following things to learn more"
          },
          {
            "row_id": 6,
            "type": "step_item",
            "task_id": "task_mod_welcome_self-care_package"
          },
          {
            "row_id": 7,
            "type": "step_item",
            "task_id": "task_mod_welcome_quick_praise"
          },
          {
            "row_id": 8,
            "type": "step_item",
            "task_id": "task_mod_welcome_survey"
          },
          {
            "row_id": 9,
            "type": "step_item",
            "task_id": "task_mod_welcome_photo_activity"
          }
        ]
      }
    ]
  },
  {
    "flow_type": "module_page",
    "module": "1on1",
    "flow_name": "mod_1on1_page",
    "status": "released",
    "rows": [
      {
        "row_id": 1,
        "type": "main_image",
        "media": "hyperlink to image"
      },
      {
        "row_id": 2,
        "type": "title",
        "text": "One-on-one time"
      },
      {
        "row_id": 3,
        "type": "description",
        "text": "One-on-One Time helps build a positive, trusting relationship. When you really show interest in your teens, you make them feel valued and appreciated."
      },
      {
        "type": "step_group",
        "rows": [
          {
            "row_id": 4,
            "type": "step_intro",
            "text": "Complete the following things to learn more and unlock your toolbox"
          },
          {
            "row_id": 5,
            "type": "step_item",
            "task_id": "task_mod_1on1_emo"
          },
          {
            "row_id": 6,
            "type": "step_item",
            "task_id": "task_mod_1on1_intro"
          },
          {
            "row_id": 7,
            "type": "step_item",
            "task_id": "task_mod_1on1_tips"
          },
          {
            "row_id": 8,
            "type": "step_item",
            "task_id": "task_mod_1on1_activity"
          },
          {
            "row_id": 9,
            "type": "step_item",
            "task_id": "task_mod_1on1_activity_review"
          }
        ]
      },
      {
        "row_id": 11,
        "type": "button",
        "text": "Toolbox",
        "task_id": "task_mod_1on1_tips"
      }
    ]
  },
  {
    "flow_type": "module_page",
    "module": "praise",
    "flow_name": "mod_praise_page",
    "status": "released",
    "rows": [
      {
        "row_id": 1,
        "type": "main_image",
        "media": "hyperlink to image"
      },
      {
        "row_id": 2,
        "type": "title",
        "text": "Praise & Positive Reinforcement"
      },
      {
        "row_id": 3,
        "type": "description",
        "text": "Praise your children when they are behaving well! When you bring more attention to positive behaviour, they are likely to do it more often. They also will feel good about themselves! "
      },
      {
        "type": "step_group",
        "rows": [
          {
            "row_id": 4,
            "type": "step_intro",
            "text": "Complete the following things to learn more and unlock your toolbox"
          },
          {
            "row_id": 5,
            "type": "step_item",
            "task_id": "task_mod_praise_intro"
          },
          {
            "row_id": 7,
            "type": "step_item",
            "task_id": "task_mod_praise_tips"
          },
          {
            "row_id": 8,
            "type": "step_item",
            "task_id": "task_mod_praise_activity"
          },
          {
            "row_id": 9,
            "type": "step_item",
            "task_id": "task_mod_praise_activity_review"
          }
        ]
      },
      {
        "row_id": 11,
        "type": "button",
        "text": "Toolbox",
        "task_id": "task_mod_praise_tips"
      }
    ]
  },
  {
    "flow_type": "module_page",
    "module": "instructions",
    "flow_name": "mod_instructions_page",
    "status": "released",
    "rows": [
      {
        "row_id": 1,
        "type": "main_image",
        "media": "hyperlink to image"
      },
      {
        "row_id": 2,
        "type": "title",
        "text": "Positive Instructions"
      },
      {
        "row_id": 3,
        "type": "description",
        "text": "Positive instructions help us focus on the things we should be doing and keep our relationship positive. "
      },
      {
        "type": "step_group",
        "rows": [
          {
            "row_id": 4,
            "type": "step_intro",
            "text": "Complete the following things to learn more and unlock your toolbox"
          },
          {
            "row_id": 5,
            "type": "step_item",
            "text": "Parenting check-in",
            "task_id": "task_mod_instructions_par"
          },
          {
            "row_id": 7,
            "type": "step_item",
            "text": "Intro to positive instructions",
            "task_id": "task_mod_instructions_intro"
          },
          {
            "row_id": 8,
            "type": "step_item",
            "text": "Home activity",
            "task_id": "task_mod_instructions_activity"
          },
          {
            "row_id": 9,
            "type": "step_item",
            "text": "Home activity review",
            "task_id": "task_mod_instructions_activity_review"
          }
        ]
      },
      {
        "row_id": 11,
        "type": "button",
        "text": "Toolbox",
        "task_id": "task_mod_praise_tips"
      }
    ]
  },
  {
    "flow_type": "module_page",
    "module": "anger",
    "flow_name": "mod_anger_page",
    "status": "released",
    "rows": [
      {
        "row_id": 1,
        "type": "main_image",
        "media": "hyperlink to image"
      },
      {
        "row_id": 2,
        "type": "title",
        "text": "One-on-one time"
      },
      {
        "row_id": 3,
        "type": "description",
        "text": "One-on-One Time helps build a positive, trusting relationship. When you really show interest in your teens, you make them feel valued and appreciated."
      },
      {
        "type": "step_group",
        "rows": [
          {
            "row_id": 4,
            "type": "step_intro",
            "text": "Complete the following things to learn more and unlock your toolbox"
          },
          {
            "row_id": 5,
            "type": "step_item",
            "text": "Intro to praise",
            "task_id": "task_mod_praise_intro"
          },
          {
            "row_id": 7,
            "type": "step_item",
            "text": "Core tips",
            "task_id": "task_mod_praise_tips"
          },
          {
            "row_id": 8,
            "type": "step_item",
            "text": "Home activity",
            "task_id": "task_mod_praise_activity"
          },
          {
            "row_id": 9,
            "type": "step_item",
            "text": "Home activity review",
            "task_id": "task_mod_praise_activity_review"
          }
        ]
      },
      {
        "row_id": 11,
        "type": "button",
        "text": "Toolbox",
        "task_id": "task_mod_praise_tips"
      }
    ]
  }
]