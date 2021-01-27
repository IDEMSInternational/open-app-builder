/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const conversation: FlowTypes.Conversation[] = [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "character_names",
        "uuid": "uuid_character_names_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_character_names_node_0",
            "actions": [
              {
                "uuid": "uuid_character_names_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "first_guide",
                  "name": "first_guide"
                },
                "value": "Osk"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_0",
                "destination_uuid": "uuid_character_names_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_1",
            "actions": [
              {
                "uuid": "uuid_character_names_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "second_guide",
                  "name": "second_guide"
                },
                "value": "Oska"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_1",
                "destination_uuid": "uuid_character_names_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_2",
            "actions": [
              {
                "uuid": "uuid_character_names_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "elder",
                  "name": "elder"
                },
                "value": "Ed"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_2",
                "destination_uuid": "uuid_character_names_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_3",
            "actions": [
              {
                "uuid": "uuid_character_names_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "friend",
                  "name": "friend"
                },
                "value": "Fred"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_3",
                "destination_uuid": "uuid_character_names_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_4",
            "actions": [
              {
                "uuid": "uuid_character_names_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "neighbour",
                  "name": "neighbour"
                },
                "value": "Nancy"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_4",
                "destination_uuid": "uuid_character_names_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_5",
            "actions": [
              {
                "uuid": "uuid_character_names_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "neighbour_young_daughter",
                  "name": "neighbour_young_daughter"
                },
                "value": "Shukuru"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_5",
                "destination_uuid": "uuid_character_names_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_6",
            "actions": [
              {
                "uuid": "uuid_character_names_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "neighbour_teen_daughter",
                  "name": "neighbour_teen_daughter"
                },
                "value": "Faraja"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_6",
                "destination_uuid": "uuid_character_names_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_7",
            "actions": [
              {
                "uuid": "uuid_character_names_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "country",
                  "name": "country"
                },
                "value": "South Africa"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_7",
                "destination_uuid": "uuid_character_names_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_8",
            "actions": [
              {
                "uuid": "uuid_character_names_action_8",
                "type": "set_contact_field",
                "field": {
                  "key": "guidenumber",
                  "name": "guidenumber"
                },
                "value": "guide1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_8",
                "destination_uuid": "uuid_character_names_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_9",
            "actions": [
              {
                "uuid": "uuid_character_names_action_9",
                "type": "set_contact_field",
                "field": {
                  "key": "guide",
                  "name": "guide"
                },
                "value": "@fields.first_guide"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_9",
                "destination_uuid": "uuid_character_names_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_10",
            "actions": [
              {
                "uuid": "uuid_character_names_action_10",
                "type": "set_contact_field",
                "field": {
                  "key": "guide_teen",
                  "name": "guide_teen"
                },
                "value": "Alex"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_10",
                "destination_uuid": "uuid_character_names_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_character_names_node_11",
            "actions": [
              {
                "uuid": "uuid_character_names_action_11",
                "type": "set_contact_field",
                "field": {
                  "key": "character_names__completed",
                  "name": "character_names__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_11",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_welcome_intro",
        "uuid": "uuid_mod_welcome_intro_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_welcome_intro_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Welcome - It’s great to have you here. This week is about you. In this ’'welcome’’ session you will:  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_intro_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_intro_exit_0",
                "destination_uuid": "uuid_mod_welcome_intro_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_intro_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "1. See what will this app give you https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_intro_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_intro_exit_1",
                "destination_uuid": "uuid_mod_welcome_intro_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_intro_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "2. Get essential tools for self-care  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_intro_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_intro_exit_2",
                "destination_uuid": "uuid_mod_welcome_intro_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_intro_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "3. Customise the app for your needs  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_intro_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_intro_exit_3",
                "destination_uuid": "uuid_mod_welcome_intro_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_intro_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "4. Get one quick tool for parenting a teen   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_intro_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_intro_exit_4",
                "destination_uuid": "uuid_mod_welcome_intro_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_intro_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_intro_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_intro__completed",
                  "name": "mod_welcome_intro__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_intro_exit_5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_welcome_give",
        "uuid": "uuid_mod_welcome_give_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_welcome_give_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "You deserve to feel good, and have happier family relationships. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_give_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_give_exit_0",
                "destination_uuid": "uuid_mod_welcome_give_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_give_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "This app will be customised to what you need and what is worrying you. You’ll get:",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_give_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_give_exit_1",
                "destination_uuid": "uuid_mod_welcome_give_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_give_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "Weekly Workshops <img class=\"icon\" src=\"assets/plh_assets/plh_images/other_icons/tick.svg\">\n10-12 weekly sessions structured for you. These include key tools for self-care and parenting a teenager, and extra content where you want it. You can choose to do each workshop as an individual, or with someone else, or as a group with family or friends.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_give_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_give_exit_2",
                "destination_uuid": "uuid_mod_welcome_give_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_give_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Parent Centre <img class=\"icon\" src=\"assets/plh_assets/plh_images/other_icons/tick.svg\">\nStacked with the resources you need, whenever you want. Instant access help section with Essential Tools for each skill, extra information and local resources",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_give_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_give_exit_3",
                "destination_uuid": "uuid_mod_welcome_give_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_give_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Parent Points <img class=\"icon\" src=\"assets/plh_assets/plh_images/other_icons/tick.svg\">\nTrack your success in self-care and parenting. Celebrate your daily achievements! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_give_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_give_exit_4",
                "destination_uuid": "uuid_mod_welcome_give_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_give_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_give_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_give__completed",
                  "name": "mod_welcome_give__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_give_exit_5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_welcome_self-care_package",
        "uuid": "uuid_mod_welcome_self-care_package_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Parents don’t look after themselves enough. But this is so important. Reducing our stress and treating ourselves well helps us and our teenagers.  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_0",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Here are three brief things to do every day. These will be available anytime in your Toolbox.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_1",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "RELAX – RECOGNISE – REWARD ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_2",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "RELAX\n\nLet’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_3",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_4",
            "actions": [
              {
                "flow": {
                  "name": "calm_5"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_welcome_self-care_package_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_5",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_5"
              },
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_welcome_self-care_package_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_welcome_self-care_package_category_0"
                },
                {
                  "uuid": "uuid_mod_welcome_self-care_package_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_welcome_self-care_package_category_1"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_self-care_package_category_0",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_5"
                },
                {
                  "uuid": "uuid_mod_welcome_self-care_package_category_1",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_self-care_package_category_0"
            }
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_relax_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_7",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_mod_welcome_self-care_package_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_8",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_7",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_9",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_self-care_package_category_2",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_self-care_package_category_2",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_welcome_daily_calm"
            }
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_8",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_daily_calm",
                  "name": "mod_welcome_daily_calm"
                },
                "value": "@results.mod_welcome_daily_calm"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_10",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_11",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "RECOGNISE   \n\nTake a moment and think of one thing YOU have done recently that you have done well! Say it aloud if you can ‘Well done for …\"\nHere is one thing we know you deserve a praise for -  you started using ParentApp! \n \nSo... WELL DONE for using ParentApp!   \n\nHere are more examples to things you might did recently and deserve a praise:  \n \n1. Showing love to my children \n2. Getting up even though I felt tired \n3. Smiling at someone \n4. Making food to stay strong \n5. Spending time with my children \n6. Helping my children with schoolwork   ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_12",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your Parent Point <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_relax_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_13",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "REWARD \n\nRemember you deserve your quality time too! What makes you happy?",
                "type": "send_msg",
                "quick_replies": [
                  "Have a hot drink",
                  "Call a friend or family",
                  "Have a relaxed bath",
                  "Read",
                  "Watch TV",
                  "Write your own"
                ],
                "uuid": "uuid_mod_welcome_self-care_package_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_14",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_13",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_15",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_14"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_self-care_package_category_3",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_self-care_package_category_3",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_15"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_welcome_happy"
            }
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_14",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_action_12",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_happy",
                  "name": "mod_welcome_happy"
                },
                "value": "@results.mod_welcome_happy"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_16",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_18"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_18",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Write your own"
                  ],
                  "category_uuid": "uuid_mod_welcome_self-care_package_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_self-care_package_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_20",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_self-care_package_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_21",
                  "name": "Write your own",
                  "uuid": "uuid_mod_welcome_self-care_package_category_6"
                }
              ],
              "operand": "@fields.mod_welcome_happy",
              "default_category_uuid": "uuid_mod_welcome_self-care_package_category_5"
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_20",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_19"
              },
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_21",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_15",
            "actions": [
              {
                "attachments": [],
                "text": "Write your own",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_17",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_16",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_18",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_17"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_self-care_package_category_4",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_self-care_package_category_4",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_18"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_welcome_happy"
            }
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_17",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_action_14",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_happy",
                  "name": "mod_welcome_happy"
                },
                "value": "@results.mod_welcome_happy"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_19",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_19",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your Parent Point <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_treat_yourself_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_22",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_20",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! \n\nStart now. Relax, recognise and reward yourself",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_16"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_23",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_21"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_21",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_action_17",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_self-care_package__completed",
                  "name": "mod_welcome_self-care_package__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_24",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_welcome_quick_praise",
        "uuid": "uuid_mod_welcome_quick_praise_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_welcome_quick_praise_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_quick_praise_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_quick_praise_exit_0",
                "destination_uuid": "uuid_mod_welcome_quick_praise_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_quick_praise_node_1",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/right_on_time.svg"
                ],
                "text": "This week, watch for something positive that your teenager does. Something you want them to do more of. Tell them that this was good, and that you appreciate it. It can be something you’d not usually think of to praise, or something really small – like: \n- came home on time  \n- said something nice \n- smiled ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_quick_praise_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_quick_praise_exit_1",
                "destination_uuid": "uuid_mod_welcome_quick_praise_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_quick_praise_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "Over time they will want to do these more.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_quick_praise_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_quick_praise_exit_2",
                "destination_uuid": "uuid_mod_welcome_quick_praise_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_quick_praise_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "We’ll be in touch throughout this week with reminders and support.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_quick_praise_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_quick_praise_exit_3",
                "destination_uuid": "uuid_mod_welcome_quick_praise_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_quick_praise_node_4",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_quick_praise_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_quick_praise__completed",
                  "name": "mod_welcome_quick_praise__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_quick_praise_exit_4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_welcome_survey",
        "uuid": "uuid_mod_welcome_survey_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_welcome_survey_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_survey_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_0",
                "destination_uuid": "uuid_mod_welcome_survey_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_1",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/play_ball.svg"
                ],
                "text": "It is hard to find time to have fun with your teen. How many days in the past week did you do something fun together?",
                "type": "send_msg",
                "quick_replies": [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ],
                "uuid": "uuid_mod_welcome_survey_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_1",
                "destination_uuid": "uuid_mod_welcome_survey_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_2",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_2",
                "destination_uuid": "uuid_mod_welcome_survey_node_3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_survey_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_survey_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_welcome_survey_exit_2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcome_survey_q_1"
            }
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_3",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_survey_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "welcome_survey_q_1",
                  "name": "welcome_survey_q_1"
                },
                "value": "@results.welcome_survey_q_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_3",
                "destination_uuid": "uuid_mod_welcome_survey_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_0"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_1"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_2"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_3"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_4"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_5"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_6"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_5",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_6",
                  "name": "0;1;2;3",
                  "uuid": "uuid_mod_welcome_survey_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_8",
                  "name": "4;5;6;7",
                  "uuid": "uuid_mod_welcome_survey_category_3"
                }
              ],
              "operand": "@fields.welcome_survey_q_1",
              "default_category_uuid": "uuid_mod_welcome_survey_category_1"
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_5",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_6",
                "destination_uuid": "uuid_mod_welcome_survey_node_4"
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_8",
                "destination_uuid": "uuid_mod_welcome_survey_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_4",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/frustrated.svg"
                ],
                "text": "We know it is hard to find time in our busy lives. Well done for trying your best!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_4",
                "destination_uuid": "uuid_mod_welcome_survey_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_6",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/stickers/sticker01.jpg"
                ],
                "text": "Well done for spending time with your teen, it makes all the difference!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_7",
                "destination_uuid": "uuid_mod_welcome_survey_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_10",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_12",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_13",
                  "name": "Next",
                  "uuid": "uuid_mod_welcome_survey_category_6"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_welcome_survey_category_5",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_12",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_13",
                "destination_uuid": "uuid_mod_welcome_survey_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Focusing on the positive will help you see that behaviour more. How many days in the past week have you praised your teen?",
                "type": "send_msg",
                "quick_replies": [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ],
                "uuid": "uuid_mod_welcome_survey_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_9",
                "destination_uuid": "uuid_mod_welcome_survey_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_8",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_10",
                "destination_uuid": "uuid_mod_welcome_survey_node_9"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_survey_category_4",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_survey_category_4",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_welcome_survey_exit_10"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcome_survey_q_2"
            }
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_9",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_survey_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "welcome_survey_q_2",
                  "name": "welcome_survey_q_2"
                },
                "value": "@results.welcome_survey_q_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_11",
                "destination_uuid": "uuid_mod_welcome_survey_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_12",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_9"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_10"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_11"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_12"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_13"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_14"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_15"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_16"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_17"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_15",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_16",
                  "name": "0;1;2;3;4",
                  "uuid": "uuid_mod_welcome_survey_category_8"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_18",
                  "name": "5;6;7;8",
                  "uuid": "uuid_mod_welcome_survey_category_9"
                }
              ],
              "operand": "@fields.welcome_survey_q_2",
              "default_category_uuid": "uuid_mod_welcome_survey_category_7"
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_15",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_16",
                "destination_uuid": "uuid_mod_welcome_survey_node_11"
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_18",
                "destination_uuid": "uuid_mod_welcome_survey_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_14",
                "destination_uuid": "uuid_mod_welcome_survey_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_13",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_17",
                "destination_uuid": "uuid_mod_welcome_survey_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_17",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_18"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_22",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_11"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_23",
                  "name": "Next",
                  "uuid": "uuid_mod_welcome_survey_category_12"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_welcome_survey_category_11",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_22",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_23",
                "destination_uuid": "uuid_mod_welcome_survey_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_14",
            "actions": [
              {
                "attachments": [],
                "text": "This is a very stressful time for families. How many days in the past week did you feel very stressed as a parent/caregiver? ",
                "type": "send_msg",
                "quick_replies": [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ],
                "uuid": "uuid_mod_welcome_survey_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_19",
                "destination_uuid": "uuid_mod_welcome_survey_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_15",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_20",
                "destination_uuid": "uuid_mod_welcome_survey_node_16"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_survey_category_10",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_survey_category_10",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_welcome_survey_exit_20"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcome_survey_q_3"
            }
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_16",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_survey_action_10",
                "type": "set_contact_field",
                "field": {
                  "key": "welcome_survey_q_3",
                  "name": "welcome_survey_q_3"
                },
                "value": "@results.welcome_survey_q_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_21",
                "destination_uuid": "uuid_mod_welcome_survey_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_19",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_14",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_19"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_14",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_20"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_14",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_21"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_22"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_23"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_24"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_25"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_26"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_25",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_13"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_26",
                  "name": "0;1;2",
                  "uuid": "uuid_mod_welcome_survey_category_14"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_28",
                  "name": "3;4;5;6;7",
                  "uuid": "uuid_mod_welcome_survey_category_15"
                }
              ],
              "operand": "@fields.welcome_survey_q_3",
              "default_category_uuid": "uuid_mod_welcome_survey_category_13"
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_25",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_26",
                "destination_uuid": "uuid_mod_welcome_survey_node_18"
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_28",
                "destination_uuid": "uuid_mod_welcome_survey_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_18",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_24",
                "destination_uuid": "uuid_mod_welcome_survey_node_24"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_20",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_27",
                "destination_uuid": "uuid_mod_welcome_survey_node_24"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_24",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_18",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_27"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_32",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_17"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_33",
                  "name": "Next",
                  "uuid": "uuid_mod_welcome_survey_category_18"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_welcome_survey_category_17",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_32",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_33",
                "destination_uuid": "uuid_mod_welcome_survey_node_21"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_21",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/shout.svg"
                ],
                "text": "Sometimes our children make us really upset. How many days in the past week did you shout, scream or yell at your children? ",
                "type": "send_msg",
                "quick_replies": [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ],
                "uuid": "uuid_mod_welcome_survey_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_29",
                "destination_uuid": "uuid_mod_welcome_survey_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_22",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_30",
                "destination_uuid": "uuid_mod_welcome_survey_node_23"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_survey_category_16",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_survey_category_16",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_welcome_survey_exit_30"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcome_survey_q_4"
            }
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_23",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_survey_action_14",
                "type": "set_contact_field",
                "field": {
                  "key": "welcome_survey_q_4",
                  "name": "welcome_survey_q_4"
                },
                "value": "@results.welcome_survey_q_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_31",
                "destination_uuid": "uuid_mod_welcome_survey_node_26"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_26",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_20",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_28"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_20",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_29"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_21",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_30"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_21",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_31"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_21",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_32"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_21",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_33"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_21",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_34"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_21",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_35"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_35",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_19"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_36",
                  "name": "0;1",
                  "uuid": "uuid_mod_welcome_survey_category_20"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_38",
                  "name": "2;3;4;5;6;7",
                  "uuid": "uuid_mod_welcome_survey_category_21"
                }
              ],
              "operand": "@fields.welcome_survey_q_4",
              "default_category_uuid": "uuid_mod_welcome_survey_category_19"
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_35",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_36",
                "destination_uuid": "uuid_mod_welcome_survey_node_25"
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_38",
                "destination_uuid": "uuid_mod_welcome_survey_node_27"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_25",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_34",
                "destination_uuid": "uuid_mod_welcome_survey_node_31"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_27",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_16"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_37",
                "destination_uuid": "uuid_mod_welcome_survey_node_31"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_31",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_24",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_36"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_42",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_23"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_43",
                  "name": "Next",
                  "uuid": "uuid_mod_welcome_survey_category_24"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_welcome_survey_category_23",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_42",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_43",
                "destination_uuid": "uuid_mod_welcome_survey_node_28"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_28",
            "actions": [
              {
                "attachments": [],
                "text": "It is so stressful when children misbehave. How many days in the past week did you physically discipline your children by hitting, spanking, or slapping with your hand or an object like a stick or a belt? ",
                "type": "send_msg",
                "quick_replies": [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ],
                "uuid": "uuid_mod_welcome_survey_action_17"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_39",
                "destination_uuid": "uuid_mod_welcome_survey_node_29"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_29",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_40",
                "destination_uuid": "uuid_mod_welcome_survey_node_30"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_survey_category_22",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_survey_category_22",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_welcome_survey_exit_40"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcome_survey_q_5"
            }
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_30",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_survey_action_18",
                "type": "set_contact_field",
                "field": {
                  "key": "welcome_survey_q_5",
                  "name": "welcome_survey_q_5"
                },
                "value": "@results.welcome_survey_q_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_41",
                "destination_uuid": "uuid_mod_welcome_survey_node_34"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_32",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_19"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_44",
                "destination_uuid": "uuid_mod_welcome_survey_node_38"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_34",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_26",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_37"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_26",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_38"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_26",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_39"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_26",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_40"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_26",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_41"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_26",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_42"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_26",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_43"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_46",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_25"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_47",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "uuid_mod_welcome_survey_category_26"
                }
              ],
              "operand": "@fields.welcome_survey_q_5",
              "default_category_uuid": "uuid_mod_welcome_survey_category_25"
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_46",
                "destination_uuid": "uuid_mod_welcome_survey_node_32"
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_47",
                "destination_uuid": "uuid_mod_welcome_survey_node_33"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_33",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_20"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_45",
                "destination_uuid": "uuid_mod_welcome_survey_node_38"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_38",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_29",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_44"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_51",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_28"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_52",
                  "name": "Next",
                  "uuid": "uuid_mod_welcome_survey_category_29"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_welcome_survey_category_28",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_51",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_52",
                "destination_uuid": "uuid_mod_welcome_survey_node_35"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_35",
            "actions": [
              {
                "attachments": [],
                "text": "Bonus question: We all want to keep our children safe. How confident do you feel you are able to protect your child from sexual abuse online or in-person?\n(0 = not confident to 8 = extremely confident)",
                "type": "send_msg",
                "quick_replies": [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ],
                "uuid": "uuid_mod_welcome_survey_action_21"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_48",
                "destination_uuid": "uuid_mod_welcome_survey_node_36"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_36",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_49",
                "destination_uuid": "uuid_mod_welcome_survey_node_37"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_survey_category_27",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_survey_category_27",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_welcome_survey_exit_49"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcome_survey_q_6"
            }
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_37",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_survey_action_22",
                "type": "set_contact_field",
                "field": {
                  "key": "welcome_survey_q_6",
                  "name": "welcome_survey_q_6"
                },
                "value": "@results.welcome_survey_q_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_50",
                "destination_uuid": "uuid_mod_welcome_survey_node_40"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_40",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_31",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_45"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_31",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_46"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_31",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_47"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_31",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_48"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_31",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_49"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_32",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_50"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_32",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_51"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_32",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_52"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_32",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_53"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_54",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_30"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_55",
                  "name": "0;1;2;3;4",
                  "uuid": "uuid_mod_welcome_survey_category_31"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_57",
                  "name": "5;6;7;8",
                  "uuid": "uuid_mod_welcome_survey_category_32"
                }
              ],
              "operand": "@fields.welcome_survey_q_6",
              "default_category_uuid": "uuid_mod_welcome_survey_category_30"
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_54",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_55",
                "destination_uuid": "uuid_mod_welcome_survey_node_39"
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_57",
                "destination_uuid": "uuid_mod_welcome_survey_node_41"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_39",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_23"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_53",
                "destination_uuid": "uuid_mod_welcome_survey_node_43"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_41",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_welcome_survey_action_24"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_56",
                "destination_uuid": "uuid_mod_welcome_survey_node_43"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_43",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_welcome_survey_category_34",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_survey_case_54"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_59",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_survey_category_33"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_survey_exit_60",
                  "name": "Next",
                  "uuid": "uuid_mod_welcome_survey_category_34"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_welcome_survey_category_33",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_59",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_survey_exit_60",
                "destination_uuid": "uuid_mod_welcome_survey_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_42",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_survey_action_25"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_58",
                "destination_uuid": "uuid_mod_welcome_survey_node_44"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_survey_node_44",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_survey_action_26",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_survey__completed",
                  "name": "mod_welcome_survey__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_survey_exit_61",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_welcome_praise_teen",
        "uuid": "uuid_mod_welcome_praise_teen_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_welcome_praise_teen_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Not yet"
                ],
                "uuid": "uuid_mod_welcome_praise_teen_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_praise_teen_exit_0",
                "destination_uuid": "uuid_mod_welcome_praise_teen_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_praise_teen_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_welcome_praise_teen_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_praise_teen_case_0"
                },
                {
                  "arguments": [
                    "Not yet"
                  ],
                  "category_uuid": "uuid_mod_welcome_praise_teen_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_praise_teen_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_praise_teen_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_praise_teen_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_praise_teen_exit_3",
                  "name": "Yes",
                  "uuid": "uuid_mod_welcome_praise_teen_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_praise_teen_exit_5",
                  "name": "Not yet",
                  "uuid": "uuid_mod_welcome_praise_teen_category_2"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_welcome_praise_teen_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_praise_teen_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_praise_teen_exit_3",
                "destination_uuid": "uuid_mod_welcome_praise_teen_node_1"
              },
              {
                "uuid": "uuid_mod_welcome_praise_teen_exit_5",
                "destination_uuid": "uuid_mod_welcome_praise_teen_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_praise_teen_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Well done",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_praise_teen_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_praise_teen_exit_1",
                "destination_uuid": "uuid_mod_welcome_praise_teen_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_praise_teen_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Try tomorrow",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_praise_teen_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_praise_teen_exit_4",
                "destination_uuid": "uuid_mod_welcome_praise_teen_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_praise_teen_node_4",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_praise_teen_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_praise_teen__completed",
                  "name": "mod_welcome_praise_teen__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_praise_teen_exit_6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_welcome_relax",
        "uuid": "uuid_mod_welcome_relax_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_welcome_relax_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Here's a relaxing activity for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_relax_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_relax_exit_0",
                "destination_uuid": "uuid_mod_welcome_relax_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_relax_node_1",
            "actions": [
              {
                "flow": {
                  "name": "calm_random"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_welcome_relax_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_relax_exit_2",
                "destination_uuid": "uuid_mod_welcome_relax_node_3"
              },
              {
                "uuid": "uuid_mod_welcome_relax_exit_3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_welcome_relax_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_welcome_relax_category_0"
                },
                {
                  "uuid": "uuid_mod_welcome_relax_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_welcome_relax_category_1"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_relax_category_0",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_welcome_relax_exit_2"
                },
                {
                  "uuid": "uuid_mod_welcome_relax_category_1",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_welcome_relax_exit_3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_relax_category_0"
            }
          },
          {
            "uuid": "uuid_mod_welcome_relax_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_relax_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_relax_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_relax_exit_4",
                "destination_uuid": "uuid_mod_welcome_relax_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_relax_node_3",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_relax_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_relax__completed",
                  "name": "mod_welcome_relax__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_relax_exit_5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_unlocked",
        "uuid": "uuid_mod_1on1_unlocked_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_unlocked_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for a week of parenting! A new module is available for you https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_unlocked_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_unlocked_exit_0",
                "destination_uuid": "uuid_mod_1on1_unlocked_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_unlocked_node_1",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_unlocked_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_unlocked__completed",
                  "name": "mod_1on1_unlocked__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_unlocked_exit_1",
                "destination_uuid": "uuid_mod_1on1_unlocked_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_unlocked_node_2",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_1on1_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_unlocked_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_unlocked_exit_2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_emo",
        "uuid": "uuid_mod_1on1_emo_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_emo_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Welcome! Let’s start with caring for you. How are you feeling today?   https://plh-demo1.idems.international/chat/msg-info?character=guide&choiceMediaDisplay=media&choiceMediaUrls=%5B%22plh_images%2Fstickers%2Ffaces%2Fhappier.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fneutral.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fsadder.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "Happy",
                  "OK",
                  "Sad"
                ],
                "uuid": "uuid_mod_1on1_emo_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_0",
                "destination_uuid": "uuid_mod_1on1_emo_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "uuid_mod_1on1_emo_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_emo_case_0"
                },
                {
                  "arguments": [
                    "OK"
                  ],
                  "category_uuid": "uuid_mod_1on1_emo_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_emo_case_1"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "uuid_mod_1on1_emo_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_emo_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_emo_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_emo_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_emo_exit_3",
                  "name": "Happy",
                  "uuid": "uuid_mod_1on1_emo_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_emo_exit_5",
                  "name": "OK; Sad",
                  "uuid": "uuid_mod_1on1_emo_category_2"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_emo_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_emo_exit_3",
                "destination_uuid": "uuid_mod_1on1_emo_node_1"
              },
              {
                "uuid": "uuid_mod_1on1_emo_exit_5",
                "destination_uuid": "uuid_mod_1on1_emo_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You’ve done a relaxation @habit.habit_relax.weekly_count times this week, and praised yourself @habit.habit_praise_yourself.weekly_count times.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_emo_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_1",
                "destination_uuid": "uuid_mod_1on1_emo_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard. I’m proud of you.  You’ve done a relaxation @habit.habit_relax.weekly_count times this week, and praised yourself @habit.habit_praise_yourself.weekly_count times.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_emo_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_4",
                "destination_uuid": "uuid_mod_1on1_emo_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Let's do a 30 second relax together now.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_emo_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_6",
                "destination_uuid": "uuid_mod_1on1_emo_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_5",
            "actions": [
              {
                "flow": {
                  "name": "calm_2"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_emo_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_8",
                "destination_uuid": "uuid_mod_1on1_emo_node_6"
              },
              {
                "uuid": "uuid_mod_1on1_emo_exit_9",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_1on1_emo_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_1on1_emo_category_3"
                },
                {
                  "uuid": "uuid_mod_1on1_emo_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_1on1_emo_category_4"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_emo_category_3",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_1on1_emo_exit_8"
                },
                {
                  "uuid": "uuid_mod_1on1_emo_category_4",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_1on1_emo_exit_9"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_emo_category_3"
            }
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_relax_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_emo_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_10",
                "destination_uuid": "uuid_mod_1on1_emo_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Whatever you are feeling, it's great that you are here!",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_1on1_emo_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_11",
                "destination_uuid": "uuid_mod_1on1_emo_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_10",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_1on1_emo_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_emo_case_5"
                },
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_1on1_emo_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_emo_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_emo_exit_14",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_emo_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_emo_exit_15",
                  "name": "Next",
                  "uuid": "uuid_mod_1on1_emo_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_emo_exit_18",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_1on1_emo_category_7"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_emo_category_5",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_14",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_emo_exit_15",
                "destination_uuid": "uuid_mod_1on1_emo_node_8"
              },
              {
                "uuid": "uuid_mod_1on1_emo_exit_18",
                "destination_uuid": "uuid_mod_1on1_emo_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_8",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_emo_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_emo__completed",
                  "name": "mod_1on1_emo__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_12",
                "destination_uuid": "uuid_mod_1on1_emo_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_9",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_emo_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_13",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_11",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_emo_action_9",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_emo__completed",
                  "name": "mod_1on1_emo__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_16",
                "destination_uuid": "uuid_mod_1on1_emo_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_12",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_1on1_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_emo_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_17",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_intro",
        "uuid": "uuid_mod_1on1_intro_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_intro_node_0",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/worried.svg"
                ],
                "text": "Being a parent can be so hard. Sometimes I feel like my children never listen to me. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_intro_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_0",
                "destination_uuid": "uuid_mod_1on1_intro_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "But science shows that spending just a few minutes each day of focused one-on-one time with your teen helps build trust and love.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_intro_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_1",
                "destination_uuid": "uuid_mod_1on1_intro_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "It’s a time when you focus on them, without TV or phones. Let them lead what you do or talk about.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_intro_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_2",
                "destination_uuid": "uuid_mod_1on1_intro_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Feel like you have NO TIME and you are exhausted?....Yes, I know how it is. This is why we talked with parents in @fields.country and they found ways to do one on one time that don’t take up extra time: \n- Walking to the shops, or to get water together \n- Washing the dishes \n- Doing a chore together\n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_intro_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_3",
                "destination_uuid": "uuid_mod_1on1_intro_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "It may not have instant results, but it will make a difference over the long term. You are an amazing parent for trying this.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_intro_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_4",
                "destination_uuid": "uuid_mod_1on1_intro_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_5",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/book.svg"
                ],
                "text": "Next – essential tools for one-on-one time.",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_1on1_intro_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_5",
                "destination_uuid": "uuid_mod_1on1_intro_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_8",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_1on1_intro_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_intro_case_0"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_1on1_intro_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_intro_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_intro_exit_8",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_intro_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_intro_exit_9",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_1on1_intro_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_intro_exit_12",
                  "name": "Next",
                  "uuid": "uuid_mod_1on1_intro_category_2"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_intro_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_8",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_intro_exit_9",
                "destination_uuid": "uuid_mod_1on1_intro_node_6"
              },
              {
                "uuid": "uuid_mod_1on1_intro_exit_12",
                "destination_uuid": "uuid_mod_1on1_intro_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_6",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_intro_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_intro__completed",
                  "name": "mod_1on1_intro__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_6",
                "destination_uuid": "uuid_mod_1on1_intro_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_7",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_1on1_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_intro_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_9",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_intro_action_8",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_intro__completed",
                  "name": "mod_1on1_intro__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_10",
                "destination_uuid": "uuid_mod_1on1_intro_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_10",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_intro_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_11",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_activity",
        "uuid": "uuid_mod_1on1_activity_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_activity_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This week, can you try 5 minutes of one-on-one time with your teen every day that you can? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_activity_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_0",
                "destination_uuid": "uuid_mod_1on1_activity_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "These are ideas that some of our 135 million parent users say are good!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_activity_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_1",
                "destination_uuid": "uuid_mod_1on1_activity_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "Pick some ideas and drag then to the notebook on the right. You can add yours too. You can also show this list to your teen. Don’t forget to let them pick the activity!",
                "type": "send_msg",
                "quick_replies": [
                  "Prepare dinner",
                  "Eat breakfast/lunch/dinner",
                  "Have tea after school",
                  "Watch a TV show",
                  "Review homework",
                  "Walk to school/shop/other",
                  "Chat before bedtime",
                  "Play a game/sport",
                  "Add your own"
                ],
                "uuid": "uuid_mod_1on1_activity_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_2",
                "destination_uuid": "uuid_mod_1on1_activity_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_3",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_3",
                "destination_uuid": "uuid_mod_1on1_activity_node_4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_activity_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_activity_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_1on1_activity_exit_3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_chooseact"
            }
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_4",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_chooseact",
                  "name": "mod_1on1_chooseact"
                },
                "value": "@results.mod_1on1_chooseact"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_4",
                "destination_uuid": "uuid_mod_1on1_activity_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_8",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Add your own"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_activity_exit_8",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_activity_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_exit_9",
                  "name": "Add your own",
                  "uuid": "uuid_mod_1on1_activity_category_3"
                }
              ],
              "operand": "@fields.mod_1on1_chooseact",
              "default_category_uuid": "uuid_mod_1on1_activity_category_2"
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_8",
                "destination_uuid": "uuid_mod_1on1_activity_node_9"
              },
              {
                "uuid": "uuid_mod_1on1_activity_exit_9",
                "destination_uuid": "uuid_mod_1on1_activity_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Type your own reply.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_activity_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_5",
                "destination_uuid": "uuid_mod_1on1_activity_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_6",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_6",
                "destination_uuid": "uuid_mod_1on1_activity_node_7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_activity_category_1",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_activity_category_1",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_1on1_activity_exit_6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_chooseact"
            }
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_7",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_chooseact",
                  "name": "mod_1on1_chooseact"
                },
                "value": "@results.mod_1on1_chooseact"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_7",
                "destination_uuid": "uuid_mod_1on1_activity_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_spend_time_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_1on1_activity_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_10",
                "destination_uuid": "uuid_mod_1on1_activity_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_12",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_activity_exit_13",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_activity_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_exit_14",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_1on1_activity_category_5"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_activity_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_13",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_activity_exit_14",
                "destination_uuid": "uuid_mod_1on1_activity_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_10",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_activity__completed",
                  "name": "mod_1on1_activity__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_11",
                "destination_uuid": "uuid_mod_1on1_activity_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_11",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_1on1_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_12",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_activity_review",
        "uuid": "uuid_mod_1on1_activity_review_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_activity_review_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Your goal was to do one or more of these activities with your teen: @fields.mod_1on1_chooseact\n\nHow did it go?  https://plh-demo1.idems.international/chat/msg-info?character=guide&choiceMediaDisplay=both&choiceMediaUrls=%5B%22plh_images%2Fstickers%2Ffaces%2Fhappier.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fneutral.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fsadder.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "Great",
                  "OK",
                  "Bad"
                ],
                "uuid": "uuid_mod_1on1_activity_review_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_0",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_1",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_1",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_activity_review_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_activity_review_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_experience"
            }
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_review_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_experience",
                  "name": "mod_1on1_experience"
                },
                "value": "@results.mod_1on1_experience"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_2",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_review_case_0"
                },
                {
                  "arguments": [
                    "OK"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_review_case_1"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_review_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_activity_review_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_5",
                  "name": "Great",
                  "uuid": "uuid_mod_1on1_activity_review_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_7",
                  "name": "OK",
                  "uuid": "uuid_mod_1on1_activity_review_category_3"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_15",
                  "name": "Bad",
                  "uuid": "uuid_mod_1on1_activity_review_category_8"
                }
              ],
              "operand": "@fields.mod_1on1_experience",
              "default_category_uuid": "uuid_mod_1on1_activity_review_category_1"
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_4",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_5",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_3"
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_7",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_5"
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_15",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_activity_review_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_3",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_5",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/neutral.svg"
                ],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_activity_review_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_6",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_6",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_review_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_9",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_7"
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_10",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_1on1_activity_review_case_2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_4"
                },
                {
                  "uuid": "uuid_mod_1on1_activity_review_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_5"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_activity_review_category_4",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_9"
                },
                {
                  "uuid": "uuid_mod_1on1_activity_review_category_5",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_10"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_activity_review_category_4"
            }
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_7",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_review_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_12",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_11"
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_13",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_1on1_activity_review_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_6"
                },
                {
                  "uuid": "uuid_mod_1on1_activity_review_case_5",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_7"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_activity_review_category_6",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_12"
                },
                {
                  "uuid": "uuid_mod_1on1_activity_review_category_7",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_13"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_activity_review_category_6"
            }
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_8",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/sad.svg"
                ],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_activity_review_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_14",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_9",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_review_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_17",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_10"
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_18",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_1on1_activity_review_case_7",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_9"
                },
                {
                  "uuid": "uuid_mod_1on1_activity_review_case_8",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_10"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_activity_review_category_9",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_17"
                },
                {
                  "uuid": "uuid_mod_1on1_activity_review_category_10",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_18"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_activity_review_category_9"
            }
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_10",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_review_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_20",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_11"
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_21",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_1on1_activity_review_case_9",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_11"
                },
                {
                  "uuid": "uuid_mod_1on1_activity_review_case_10",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_12"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_activity_review_category_11",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_20"
                },
                {
                  "uuid": "uuid_mod_1on1_activity_review_category_12",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_21"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_activity_review_category_11"
            }
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "One-on-One Time gives you great results in just 10 minutes a day, and it's completely free!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_activity_review_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_22",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "Do you have a photo of your time together? Or any nice photo? Upload it so yo can remember good times",
                "type": "send_msg",
                "quick_replies": [
                  "Upload",
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_1on1_activity_review_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_23",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_15",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Upload"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_14",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_review_case_11"
                },
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_review_case_12"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_26",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_activity_review_category_13"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_27",
                  "name": "Upload",
                  "uuid": "uuid_mod_1on1_activity_review_category_14"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_30",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_1on1_activity_review_category_15"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_activity_review_category_13",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_26",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_27",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_13"
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_30",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_13",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_review_action_11",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_activity_review__completed",
                  "name": "mod_1on1_activity_review__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_24",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_14",
            "actions": [
              {
                "flow": {
                  "name": "gallery"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_review_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_25",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_16",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_review_action_13",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_activity_review__completed",
                  "name": "mod_1on1_activity_review__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_28",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_17",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_1on1_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_review_action_14"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_29",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_highlights",
        "uuid": "uuid_mod_1on1_highlights_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_highlights_node_0",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "wait",
                  "name": "wait"
                },
                "value": "wait"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_0",
                "destination_uuid": "uuid_mod_1on1_highlights_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_0"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_1"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_highlights_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_5",
                  "name": "Great; Neutral",
                  "uuid": "uuid_mod_1on1_highlights_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_9",
                  "name": "Bad",
                  "uuid": "uuid_mod_1on1_highlights_category_4"
                }
              ],
              "operand": "@fields.mod_1on1_experience",
              "default_category_uuid": "uuid_mod_1on1_highlights_category_1"
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_4",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_5",
                "destination_uuid": "uuid_mod_1on1_highlights_node_1"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_9",
                "destination_uuid": "uuid_mod_1on1_highlights_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Which of my tips helped you? ",
                "type": "send_msg",
                "quick_replies": [
                  "\"Day\" - Do it every day",
                  "\"Play\" - Let your teen choose the activity",
                  "\"Stay\" - Give your teen all of your attention",
                  "None"
                ],
                "uuid": "uuid_mod_1on1_highlights_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_1",
                "destination_uuid": "uuid_mod_1on1_highlights_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_2",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_2",
                "destination_uuid": "uuid_mod_1on1_highlights_node_3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_highlights_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_highlights_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_high_1"
            }
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_3",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_high_1",
                  "name": "mod_1on1_high_1"
                },
                "value": "@results.mod_1on1_high_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_3",
                "destination_uuid": "uuid_mod_1on1_highlights_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Did any of my tips help you when you tried spending One-on-One Time?",
                "type": "send_msg",
                "quick_replies": [
                  "\"Day\" - Do it every day",
                  "\"Play\" - Let your teen choose the activity",
                  "\"Stay\" - Give your teen all of your attention",
                  "None"
                ],
                "uuid": "uuid_mod_1on1_highlights_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_6",
                "destination_uuid": "uuid_mod_1on1_highlights_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_6",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_7",
                "destination_uuid": "uuid_mod_1on1_highlights_node_7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_highlights_category_3",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_highlights_category_3",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_high_1"
            }
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_7",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_high_1",
                  "name": "mod_1on1_high_1"
                },
                "value": "@results.mod_1on1_high_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_8",
                "destination_uuid": "uuid_mod_1on1_highlights_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_11",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "\"Day\" - Do it every day"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_3"
                },
                {
                  "arguments": [
                    "\"Play\" - Let your teen choose the activity"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_4"
                },
                {
                  "arguments": [
                    "\"Play\" - Let your teen choose the activity"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_5"
                },
                {
                  "arguments": [
                    "\"Stay\" - Give your teen all of your attention"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_6"
                },
                {
                  "arguments": [
                    "\"Stay\" - Give your teen all of your attention"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_7"
                },
                {
                  "arguments": [
                    "None"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_14",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_8"
                },
                {
                  "arguments": [
                    "None"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_13",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_highlights_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_14",
                  "name": "\"Day\" - Do it every day",
                  "uuid": "uuid_mod_1on1_highlights_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_19",
                  "name": "\"Play\" - Let your teen choose the activity",
                  "uuid": "uuid_mod_1on1_highlights_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_20",
                  "name": "\"Play\" - Let your teen choose the activity",
                  "uuid": "uuid_mod_1on1_highlights_category_10"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_25",
                  "name": "\"Stay\" - Give your teen all of your attention",
                  "uuid": "uuid_mod_1on1_highlights_category_12"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_26",
                  "name": "\"Stay\" - Give your teen all of your attention",
                  "uuid": "uuid_mod_1on1_highlights_category_13"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_29",
                  "name": "None",
                  "uuid": "uuid_mod_1on1_highlights_category_14"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_30",
                  "name": "None",
                  "uuid": "uuid_mod_1on1_highlights_category_15"
                }
              ],
              "operand": "@fields.mod_1on1_high_1",
              "default_category_uuid": "uuid_mod_1on1_highlights_category_6"
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_13",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_14",
                "destination_uuid": "uuid_mod_1on1_highlights_node_8"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_19",
                "destination_uuid": "uuid_mod_1on1_highlights_node_13"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_20",
                "destination_uuid": "uuid_mod_1on1_highlights_node_13"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_25",
                "destination_uuid": "uuid_mod_1on1_highlights_node_17"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_26",
                "destination_uuid": "uuid_mod_1on1_highlights_node_17"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_29",
                "destination_uuid": "uuid_mod_1on1_highlights_node_21"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_30",
                "destination_uuid": "uuid_mod_1on1_highlights_node_21"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you? ",
                "type": "send_msg",
                "quick_replies": [
                  "Having a specific time helps me remember ",
                  "With a routine my teen and I can both keep our schedule free",
                  "Spending time every day helps build trust with my teen "
                ],
                "uuid": "uuid_mod_1on1_highlights_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_10",
                "destination_uuid": "uuid_mod_1on1_highlights_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_9",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_11",
                "destination_uuid": "uuid_mod_1on1_highlights_node_10"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_highlights_category_5",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_highlights_category_5",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_11"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_high_2"
            }
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_10",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_high_2",
                  "name": "mod_1on1_high_2"
                },
                "value": "@results.mod_1on1_high_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_12",
                "destination_uuid": "uuid_mod_1on1_highlights_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_highlights_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_15",
                "destination_uuid": "uuid_mod_1on1_highlights_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_13",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you? ",
                "type": "send_msg",
                "quick_replies": [
                  "Letting my teen choose what to do builds their confidence",
                  "If my teen chooses, he/she is more likely to want to spend time together",
                  "Letting my teen choose shows that I care about his/her interests",
                  "By accepting my teen’s suggestions, I show I listen to him/her",
                  "Saying something nice about my teen’s choice helps them feel valued"
                ],
                "uuid": "uuid_mod_1on1_highlights_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_16",
                "destination_uuid": "uuid_mod_1on1_highlights_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_14",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_17",
                "destination_uuid": "uuid_mod_1on1_highlights_node_15"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_highlights_category_8",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_highlights_category_8",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_17"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_high_3"
            }
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_15",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_9",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_high_3",
                  "name": "mod_1on1_high_3"
                },
                "value": "@results.mod_1on1_high_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_18",
                "destination_uuid": "uuid_mod_1on1_highlights_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_16",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_highlights_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_21",
                "destination_uuid": "uuid_mod_1on1_highlights_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_17",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you? ",
                "type": "send_msg",
                "quick_replies": [
                  "By preventing interruptions, I show my teen they are most important",
                  "Even if I can't join my teen's activity, like sports, I can still cheer them on",
                  "When I pay attention, I can learn so much about my teen's interests, views and capabilities"
                ],
                "uuid": "uuid_mod_1on1_highlights_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_22",
                "destination_uuid": "uuid_mod_1on1_highlights_node_18"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_18",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_23",
                "destination_uuid": "uuid_mod_1on1_highlights_node_19"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_highlights_category_11",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_highlights_category_11",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_23"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_high_4"
            }
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_19",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_12",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_high_4",
                  "name": "mod_1on1_high_4"
                },
                "value": "@results.mod_1on1_high_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_24",
                "destination_uuid": "uuid_mod_1on1_highlights_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_20",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_highlights_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_27",
                "destination_uuid": "uuid_mod_1on1_highlights_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_21",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_highlights_action_14"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_28",
                "destination_uuid": "uuid_mod_1on1_highlights_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_22",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_15",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_highlights__completed",
                  "name": "mod_1on1_highlights__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_31",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_challenges",
        "uuid": "uuid_mod_1on1_challenges_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_challenges_node_0",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_challenges_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "wait",
                  "name": "wait"
                },
                "value": "wait"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_0",
                "destination_uuid": "uuid_mod_1on1_challenges_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_0"
                },
                {
                  "arguments": [
                    "OK"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_3",
                  "name": "Great; OK",
                  "uuid": "uuid_mod_1on1_challenges_category_1"
                }
              ],
              "operand": "@fields.mod_1on1_experience",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_0"
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_2",
                "destination_uuid": "uuid_mod_1on1_challenges_node_4"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_3",
                "destination_uuid": "uuid_mod_1on1_challenges_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "These are the top 8 challenges and solutions that parents have with one-on-one time!",
                "type": "send_msg",
                "quick_replies": [
                  "I don’t have enough time",
                  "My teen does not want to spend time with me",
                  "My teen only wants to watch TV or play on their phone",
                  "My teen wants to do things that are not safe or that cost money",
                  "My teen wants to do things that I cannot do physically",
                  "My teen chose a competitive activity. I won and they got angry.",
                  "I struggled to end One-on-One Time",
                  "All my children want One-on-One Time at the same time"
                ],
                "uuid": "uuid_mod_1on1_challenges_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_1",
                "destination_uuid": "uuid_mod_1on1_challenges_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_2"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_5",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_6",
                  "name": "Neutral; Bad",
                  "uuid": "uuid_mod_1on1_challenges_category_3"
                }
              ],
              "operand": "@fields.mod_praise_experience",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_2"
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_5",
                "destination_uuid": "uuid_mod_1on1_challenges_node_6"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_6",
                "destination_uuid": "uuid_mod_1on1_challenges_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any challenges when trying to spend time with your teen? ",
                "type": "send_msg",
                "quick_replies": [
                  "I don’t have enough time",
                  "My teen does not want to spend time with me",
                  "My teen only wants to watch TV or play on their phone",
                  "My teen wants to do things that are not safe or that cost money",
                  "My teen wants to do things that I cannot do physically",
                  "My teen chose a competitive activity. I won and they got angry.",
                  "I struggled to end One-on-One Time",
                  "All my children want One-on-One Time at the same time"
                ],
                "uuid": "uuid_mod_1on1_challenges_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_6",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_8",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_9",
                  "name": "Bad",
                  "uuid": "uuid_mod_1on1_challenges_category_5"
                }
              ],
              "operand": "@fields.mod_1on1_experience",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_4"
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_8",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_9",
                "destination_uuid": "uuid_mod_1on1_challenges_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "What challenges did you have when trying to spend time with your teen? ",
                "type": "send_msg",
                "quick_replies": [
                  "I don’t have enough time",
                  "My teen does not want to spend time with me",
                  "My teen only wants to watch TV or play on their phone",
                  "My teen wants to do things that are not safe or that cost money",
                  "My teen wants to do things that I cannot do physically",
                  "My teen chose a competitive activity. I won and they got angry.",
                  "I struggled to end One-on-One Time",
                  "All my children want One-on-One Time at the same time"
                ],
                "uuid": "uuid_mod_1on1_challenges_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_7",
                "destination_uuid": "uuid_mod_1on1_challenges_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_8",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_5"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_9"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_10"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_18",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_14"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_19",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_15"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_24",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_19"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_25",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_20"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_29",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_23"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_30",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_24"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_34",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_27"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_35",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_28"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_39",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_31"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_40",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_32"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_45",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_36"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_46",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_37"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_11",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_12",
                  "name": "I don’t have enough time",
                  "uuid": "uuid_mod_1on1_challenges_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_21",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "uuid_mod_1on1_challenges_category_12"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_22",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "uuid_mod_1on1_challenges_category_13"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_31",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "uuid_mod_1on1_challenges_category_18"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_32",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "uuid_mod_1on1_challenges_category_19"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_41",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "uuid_mod_1on1_challenges_category_24"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_42",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "uuid_mod_1on1_challenges_category_25"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_49",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "uuid_mod_1on1_challenges_category_29"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_50",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "uuid_mod_1on1_challenges_category_30"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_57",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "uuid_mod_1on1_challenges_category_34"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_58",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "uuid_mod_1on1_challenges_category_35"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_65",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "uuid_mod_1on1_challenges_category_39"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_66",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "uuid_mod_1on1_challenges_category_40"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_75",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "uuid_mod_1on1_challenges_category_45"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_76",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "uuid_mod_1on1_challenges_category_46"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_6",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_11",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_12",
                "destination_uuid": "uuid_mod_1on1_challenges_node_7"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_21",
                "destination_uuid": "uuid_mod_1on1_challenges_node_13"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_22",
                "destination_uuid": "uuid_mod_1on1_challenges_node_13"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_31",
                "destination_uuid": "uuid_mod_1on1_challenges_node_18"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_32",
                "destination_uuid": "uuid_mod_1on1_challenges_node_18"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_41",
                "destination_uuid": "uuid_mod_1on1_challenges_node_23"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_42",
                "destination_uuid": "uuid_mod_1on1_challenges_node_23"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_49",
                "destination_uuid": "uuid_mod_1on1_challenges_node_27"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_50",
                "destination_uuid": "uuid_mod_1on1_challenges_node_27"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_57",
                "destination_uuid": "uuid_mod_1on1_challenges_node_31"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_58",
                "destination_uuid": "uuid_mod_1on1_challenges_node_31"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_65",
                "destination_uuid": "uuid_mod_1on1_challenges_node_35"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_66",
                "destination_uuid": "uuid_mod_1on1_challenges_node_35"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_75",
                "destination_uuid": "uuid_mod_1on1_challenges_node_40"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_76",
                "destination_uuid": "uuid_mod_1on1_challenges_node_40"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "I know it can be hard to find time during our day, with work, chores, and everything else.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Think of a time each day that I can make 5 minutes or a bit more.",
                  "Find a chore that I could do together in a fun way.",
                  "Ask my teen or someone else to help me with a chore so I have some extra free time."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_10",
                "destination_uuid": "uuid_mod_1on1_challenges_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_10",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_6"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_7"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_11",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_14",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_8"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_15",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "uuid_mod_1on1_challenges_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_17",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "uuid_mod_1on1_challenges_category_10"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_19",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "uuid_mod_1on1_challenges_category_11"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_8",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_14",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_15",
                "destination_uuid": "uuid_mod_1on1_challenges_node_9"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_17",
                "destination_uuid": "uuid_mod_1on1_challenges_node_11"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_19",
                "destination_uuid": "uuid_mod_1on1_challenges_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_13",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_16",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_18",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_13",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry you struggled with that. It can make us feel bad if our children do not want to spend One-on-One Time with us.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "Do something fun with the whole family. "
                ],
                "uuid": "uuid_mod_1on1_challenges_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_20",
                "destination_uuid": "uuid_mod_1on1_challenges_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_15",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_11"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_16",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_12"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_17",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_13"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_24",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_14"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_25",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "uuid_mod_1on1_challenges_category_15"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_27",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "uuid_mod_1on1_challenges_category_16"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_29",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "uuid_mod_1on1_challenges_category_17"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_14",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_24",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_25",
                "destination_uuid": "uuid_mod_1on1_challenges_node_14"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_27",
                "destination_uuid": "uuid_mod_1on1_challenges_node_16"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_29",
                "destination_uuid": "uuid_mod_1on1_challenges_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_14",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_23",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_16",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_26",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_17",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_28",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_18",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry you had that challenge. Children often want to spend time watching T.V. or playing with a gadget. Well done for being patient with them!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other fun options to do instead.",
                  "Find something educational to do together with my teen on the gadget.",
                  "Ask my teen to show how their phone/gadget works."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_30",
                "destination_uuid": "uuid_mod_1on1_challenges_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_20",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_21",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_16"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_22",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_17"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_23",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_18"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_34",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_20"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_35",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "uuid_mod_1on1_challenges_category_21"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_37",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "uuid_mod_1on1_challenges_category_22"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_39",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "uuid_mod_1on1_challenges_category_23"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_20",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_34",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_35",
                "destination_uuid": "uuid_mod_1on1_challenges_node_19"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_37",
                "destination_uuid": "uuid_mod_1on1_challenges_node_21"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_39",
                "destination_uuid": "uuid_mod_1on1_challenges_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_19",
            "actions": [
              {
                "attachments": [],
                "text": "That’s perfect! If you need any inspiration, I can give you some ideas of what you could do! In a minute we will give you a list of his suggested activities. Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_33",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_21",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_14"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_36",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_22",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_38",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_23",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_16"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_40",
                "destination_uuid": "uuid_mod_1on1_challenges_node_25"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_25",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_27",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_21"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_28",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_22"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_44",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_26"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_45",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "uuid_mod_1on1_challenges_category_27"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_47",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "uuid_mod_1on1_challenges_category_28"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_26",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_44",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_45",
                "destination_uuid": "uuid_mod_1on1_challenges_node_24"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_47",
                "destination_uuid": "uuid_mod_1on1_challenges_node_26"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_24",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_17"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_43",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_26",
            "actions": [
              {
                "attachments": [],
                "text": "That’s perfect! If you need any inspiration, I can give you some ideas of what you could do! In a minute we will give you a list of his suggested activities. Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_18"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_46",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_27",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_19"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_48",
                "destination_uuid": "uuid_mod_1on1_challenges_node_29"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_29",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_32",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_25"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_33",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_26"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_52",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_31"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_53",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "uuid_mod_1on1_challenges_category_32"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_55",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "uuid_mod_1on1_challenges_category_33"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_31",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_52",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_53",
                "destination_uuid": "uuid_mod_1on1_challenges_node_28"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_55",
                "destination_uuid": "uuid_mod_1on1_challenges_node_30"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_28",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_20"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_51",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_30",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, I can give you some ideas of what you could do! In a minute we will give you a list of his suggested activities. Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_21"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_54",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_31",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_22"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_56",
                "destination_uuid": "uuid_mod_1on1_challenges_node_33"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_33",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_37",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_29"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_38",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_30"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_60",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_36"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_61",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "uuid_mod_1on1_challenges_category_37"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_63",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "uuid_mod_1on1_challenges_category_38"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_36",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_60",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_61",
                "destination_uuid": "uuid_mod_1on1_challenges_node_32"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_63",
                "destination_uuid": "uuid_mod_1on1_challenges_node_34"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_32",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_23"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_59",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_34",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_24"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_62",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_35",
            "actions": [
              {
                "attachments": [],
                "text": "I know the end of One-on-One Time can sometimes be difficult.\n\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "Plan One-on-One Time right before another activity my teen enjoys."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_25"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_64",
                "destination_uuid": "uuid_mod_1on1_challenges_node_37"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_37",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_42",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_33"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_43",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_34"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_44",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_35"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_68",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_41"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_69",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "uuid_mod_1on1_challenges_category_42"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_71",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "uuid_mod_1on1_challenges_category_43"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_73",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "uuid_mod_1on1_challenges_category_44"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_41",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_68",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_69",
                "destination_uuid": "uuid_mod_1on1_challenges_node_36"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_71",
                "destination_uuid": "uuid_mod_1on1_challenges_node_38"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_73",
                "destination_uuid": "uuid_mod_1on1_challenges_node_39"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_36",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_26"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_67",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_38",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_27"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_70",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_39",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_28"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_72",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_40",
            "actions": [
              {
                "attachments": [],
                "text": "I also struggled with that! It can be difficult to spend One-on-One Time with our teens when we have more than one child.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Ask another adult or older sibling to look after the younger children during that time.",
                  "Think of a time when the other children are not around and spend time then.",
                  "Plan One-on-One Time in a place other than at home"
                ],
                "uuid": "uuid_mod_1on1_challenges_action_29"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_74",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_42",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_48",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_38"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_49",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_39"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_50",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_40"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_78",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_47"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_79",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "uuid_mod_1on1_challenges_category_48"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_81",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "uuid_mod_1on1_challenges_category_49"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_83",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "uuid_mod_1on1_challenges_category_50"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_47",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_78",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_79",
                "destination_uuid": "uuid_mod_1on1_challenges_node_41"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_81",
                "destination_uuid": "uuid_mod_1on1_challenges_node_43"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_83",
                "destination_uuid": "uuid_mod_1on1_challenges_node_44"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_41",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_30"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_77",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_43",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_31"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_80",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_44",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_32"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_82",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_45",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_mod_1on1_challenges_action_33"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_84",
                "destination_uuid": "uuid_mod_1on1_challenges_node_47"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_47",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_52",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_41"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_53",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_42"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_86",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_51"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_87",
                  "name": "No",
                  "uuid": "uuid_mod_1on1_challenges_category_52"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_89",
                  "name": "Yes",
                  "uuid": "uuid_mod_1on1_challenges_category_53"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_51",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_86",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_87",
                "destination_uuid": "uuid_mod_1on1_challenges_node_46"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_89",
                "destination_uuid": "uuid_mod_1on1_challenges_node_48"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_46",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_34"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_85",
                "destination_uuid": "uuid_mod_1on1_challenges_node_58"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_48",
            "actions": [
              {
                "attachments": [],
                "text": "What other challenges did you have when trying to spend time with your teen?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "I don’t have enough time",
                  "My teen does not want to spend time with me",
                  "My teen only wants to watch TV or play on their phone",
                  "My teen wants to do things that are not safe or that cost money",
                  "My teen wants to do things that I cannot do physically",
                  "My teen chose a competitive activity. I won and they got angry.",
                  "I struggled to end One-on-One Time",
                  "All my children want One-on-One Time at the same time"
                ],
                "uuid": "uuid_mod_1on1_challenges_action_35"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_88",
                "destination_uuid": "uuid_mod_1on1_challenges_node_50"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_50",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_55",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_43"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_56",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_44"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_57",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_45"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_58",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_46"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_59",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_47"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_60",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_48"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_61",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_49"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_62",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_50"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_91",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_54"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_92",
                  "name": "I don’t have enough time",
                  "uuid": "uuid_mod_1on1_challenges_category_55"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_94",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "uuid_mod_1on1_challenges_category_56"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_96",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "uuid_mod_1on1_challenges_category_57"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_98",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "uuid_mod_1on1_challenges_category_58"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_100",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "uuid_mod_1on1_challenges_category_59"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_102",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "uuid_mod_1on1_challenges_category_60"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_104",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "uuid_mod_1on1_challenges_category_61"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_106",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "uuid_mod_1on1_challenges_category_62"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_54",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_91",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_92",
                "destination_uuid": "uuid_mod_1on1_challenges_node_7"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_94",
                "destination_uuid": "uuid_mod_1on1_challenges_node_13"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_96",
                "destination_uuid": "uuid_mod_1on1_challenges_node_18"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_98",
                "destination_uuid": "uuid_mod_1on1_challenges_node_23"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_100",
                "destination_uuid": "uuid_mod_1on1_challenges_node_27"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_102",
                "destination_uuid": "uuid_mod_1on1_challenges_node_31"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_104",
                "destination_uuid": "uuid_mod_1on1_challenges_node_35"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_106",
                "destination_uuid": "uuid_mod_1on1_challenges_node_40"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_58",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_challenges_action_36",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_challenges__completed",
                  "name": "mod_1on1_challenges__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_107",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_par",
        "uuid": "uuid_mod_1on1_par_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_par_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! How is your parenting going today? https://plh-demo1.idems.international/chat/msg-info?character=guide&choiceMediaUrls=%5B%22plh_images%2Fstickers%2Ffaces%2Fhappier.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fneutral.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fsadder.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "Great",
                  "Neutral",
                  "Bad"
                ],
                "uuid": "uuid_mod_1on1_par_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_0",
                "destination_uuid": "uuid_mod_1on1_par_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_par_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "uuid_mod_1on1_par_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_par_case_0"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "uuid_mod_1on1_par_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_par_case_1"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "uuid_mod_1on1_par_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_par_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_par_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_par_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_par_exit_3",
                  "name": "Great",
                  "uuid": "uuid_mod_1on1_par_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_par_exit_5",
                  "name": "Neutral",
                  "uuid": "uuid_mod_1on1_par_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_par_exit_7",
                  "name": "Bad",
                  "uuid": "uuid_mod_1on1_par_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_par_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_par_exit_3",
                "destination_uuid": "uuid_mod_1on1_par_node_1"
              },
              {
                "uuid": "uuid_mod_1on1_par_exit_5",
                "destination_uuid": "uuid_mod_1on1_par_node_3"
              },
              {
                "uuid": "uuid_mod_1on1_par_exit_7",
                "destination_uuid": "uuid_mod_1on1_par_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_par_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "So good to hear that you and your children are in a good space today. What a wonderful feeling!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "uuid_mod_1on1_par_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_1",
                "destination_uuid": "uuid_mod_1on1_par_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_par_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes things go great. Sometimes they don’t. And sometimes we don't quite know what to think...and that's totally okay! Remember that you are not alone.",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "uuid_mod_1on1_par_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_4",
                "destination_uuid": "uuid_mod_1on1_par_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_par_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that things are difficult with your children now. It is completely normal to struggle sometimes. Remember that you are not alone!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "uuid_mod_1on1_par_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_6",
                "destination_uuid": "uuid_mod_1on1_par_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_par_node_7",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "uuid_mod_1on1_par_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_par_case_3"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "uuid_mod_1on1_par_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_par_case_4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_par_exit_10",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_par_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_par_exit_11",
                  "name": "More tips",
                  "uuid": "uuid_mod_1on1_par_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_par_exit_14",
                  "name": "Activity to help you relax",
                  "uuid": "uuid_mod_1on1_par_category_6"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_par_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_10",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_par_exit_11",
                "destination_uuid": "uuid_mod_1on1_par_node_5"
              },
              {
                "uuid": "uuid_mod_1on1_par_exit_14",
                "destination_uuid": "uuid_mod_1on1_par_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_par_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_par_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_par__completed",
                  "name": "mod_1on1_par__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_8",
                "destination_uuid": "uuid_mod_1on1_par_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_par_node_6",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_par_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_9",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_par_node_10",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "uuid_mod_1on1_par_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_par_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_par_exit_15",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_par_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_par_exit_16",
                  "name": "Activity to help you relax",
                  "uuid": "uuid_mod_1on1_par_category_8"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_par_category_7",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_15",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_par_exit_16",
                "destination_uuid": "uuid_mod_1on1_par_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_par_node_8",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_par_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_par__completed",
                  "name": "mod_1on1_par__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_12",
                "destination_uuid": "uuid_mod_1on1_par_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_par_node_9",
            "actions": [
              {
                "flow": {
                  "name": "calm_2"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_par_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_par_exit_13",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_activity_reminder",
        "uuid": "uuid_mod_1on1_activity_reminder_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_activity_reminder_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Have you spent time with your teen already? Try it again today – you are doing so well! \n\nTap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_spend_time_icon.svg\">: see your success! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Ideas to spend time with your teen"
                ],
                "uuid": "uuid_mod_1on1_activity_reminder_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_reminder_exit_0",
                "destination_uuid": "uuid_mod_1on1_activity_reminder_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_reminder_node_3",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Ideas to spend time with your teen"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_reminder_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_reminder_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_activity_reminder_exit_3",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_activity_reminder_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_reminder_exit_4",
                  "name": "Ideas to spend time with your teen",
                  "uuid": "uuid_mod_1on1_activity_reminder_category_1"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_activity_reminder_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_reminder_exit_3",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_activity_reminder_exit_4",
                "destination_uuid": "uuid_mod_1on1_activity_reminder_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_reminder_node_1",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_reminder_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_activity_reminder__completed",
                  "name": "mod_1on1_activity_reminder__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_reminder_exit_1",
                "destination_uuid": "uuid_mod_1on1_activity_reminder_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_reminder_node_2",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_ideas"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_reminder_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_reminder_exit_2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_open_app_praise",
        "uuid": "uuid_mod_1on1_open_app_praise_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_open_app_praise_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for using ParentApp and committing to your parenting https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_open_app_praise_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_open_app_praise_exit_0",
                "destination_uuid": "uuid_mod_1on1_open_app_praise_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_open_app_praise_node_1",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_open_app_praise_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_open_app_praise__completed",
                  "name": "mod_1on1_open_app_praise__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_open_app_praise_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_other_praise",
        "uuid": "uuid_mod_1on1_other_praise_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_other_praise_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Hope you are feeling OK. Parenting is hard, but it’s never too late to start again with your teenager. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_other_praise_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_other_praise_exit_0",
                "destination_uuid": "uuid_mod_1on1_other_praise_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_other_praise_node_1",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_other_praise_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_other_praise__completed",
                  "name": "mod_1on1_other_praise__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_other_praise_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_1on1_fun",
        "uuid": "uuid_mod_1on1_fun_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_fun_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Here is something fun you can do with your teen! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Get active",
                  "Chat together",
                  "Pop stars"
                ],
                "uuid": "uuid_mod_1on1_fun_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_fun_exit_0",
                "destination_uuid": "uuid_mod_1on1_fun_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_fun_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "uuid_mod_1on1_fun_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_fun_case_0"
                },
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "uuid_mod_1on1_fun_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_fun_case_1"
                },
                {
                  "arguments": [
                    "Pop stars"
                  ],
                  "category_uuid": "uuid_mod_1on1_fun_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_fun_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_fun_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_fun_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_fun_exit_3",
                  "name": "Get active",
                  "uuid": "uuid_mod_1on1_fun_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_fun_exit_5",
                  "name": "Chat together",
                  "uuid": "uuid_mod_1on1_fun_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_fun_exit_7",
                  "name": "Pop stars",
                  "uuid": "uuid_mod_1on1_fun_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_fun_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_fun_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_fun_exit_3",
                "destination_uuid": "uuid_mod_1on1_fun_node_1"
              },
              {
                "uuid": "uuid_mod_1on1_fun_exit_5",
                "destination_uuid": "uuid_mod_1on1_fun_node_3"
              },
              {
                "uuid": "uuid_mod_1on1_fun_exit_7",
                "destination_uuid": "uuid_mod_1on1_fun_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_fun_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Co-chef\n- Ask your teen what kind of meal they would like to eat. \n- Prepare it together! \n- Let them have a turn at being the head chef – they lead and you follow their instructions \n- You can even help them make a budget for ingredients!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_fun_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_fun_exit_1",
                "destination_uuid": "uuid_mod_1on1_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_fun_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Just a friendly chat \n- Have a conversation with your teen about something they like \n- It can be about anything they choose to talk about: sports, friends, music, celebrities… \n- Try to listen to your teen and give them space to talk ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_fun_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_fun_exit_4",
                "destination_uuid": "uuid_mod_1on1_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_fun_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Pop stars\n- Ask your teen to choose their favourite song \n- Try to sing it together – do your best pop star impression!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_fun_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_fun_exit_6",
                "destination_uuid": "uuid_mod_1on1_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_fun_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_spend_time_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_1on1_fun_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_fun_exit_8",
                "destination_uuid": "uuid_mod_1on1_fun_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_fun_node_8",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_1on1_fun_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_fun_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_fun_exit_11",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_fun_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_fun_exit_12",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_1on1_fun_category_5"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_1on1_fun_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_fun_exit_11",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_fun_exit_12",
                "destination_uuid": "uuid_mod_1on1_fun_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_fun_node_6",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_fun_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_fun__completed",
                  "name": "mod_1on1_fun__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_fun_exit_9",
                "destination_uuid": "uuid_mod_1on1_fun_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_fun_node_7",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_1on1_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_fun_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_fun_exit_10",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_praise_emo",
        "uuid": "uuid_mod_praise_emo_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_praise_emo_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Hi – great to see you. You’ve done @habit.habit_spend_time.weekly_count one-on-one times this week, you’ve relaxed @habit.habit_relax.weekly_count times and praised yourself @habit.habit_praise_yourself.weekly_count times. This is amazing – well done you!  \n\nHow are you feeling today? https://plh-demo1.idems.international/chat/msg-info?character=guide&choiceMediaDisplay=media&choiceMediaUrls=%5B%22plh_images%2Fstickers%2Ffaces%2Fhappier.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fneutral.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fsadder.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "Happy",
                  "OK",
                  "Sad"
                ],
                "uuid": "uuid_mod_praise_emo_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_0",
                "destination_uuid": "uuid_mod_praise_emo_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "uuid_mod_praise_emo_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_emo_case_0"
                },
                {
                  "arguments": [
                    "OK"
                  ],
                  "category_uuid": "uuid_mod_praise_emo_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_emo_case_1"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "uuid_mod_praise_emo_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_emo_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_emo_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_3",
                  "name": "Happy",
                  "uuid": "uuid_mod_praise_emo_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_5",
                  "name": "OK",
                  "uuid": "uuid_mod_praise_emo_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_7",
                  "name": "Sad",
                  "uuid": "uuid_mod_praise_emo_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_praise_emo_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_emo_exit_3",
                "destination_uuid": "uuid_mod_praise_emo_node_1"
              },
              {
                "uuid": "uuid_mod_praise_emo_exit_5",
                "destination_uuid": "uuid_mod_praise_emo_node_3"
              },
              {
                "uuid": "uuid_mod_praise_emo_exit_7",
                "destination_uuid": "uuid_mod_praise_emo_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that you are doing well. You are a wonderful parent!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_emo_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_1",
                "destination_uuid": "uuid_mod_praise_emo_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that you are not having the best day. Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_emo_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_4",
                "destination_uuid": "uuid_mod_praise_emo_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that you are not having a good day. Well done for getting up every morning and trying again, even when you are tired. That is real courage and dedication!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_emo_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_6",
                "destination_uuid": "uuid_mod_praise_emo_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Let's do a quick relax together",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_emo_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_8",
                "destination_uuid": "uuid_mod_praise_emo_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_6",
            "actions": [
              {
                "flow": {
                  "name": "calm_3"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_emo_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_10",
                "destination_uuid": "uuid_mod_praise_emo_node_7"
              },
              {
                "uuid": "uuid_mod_praise_emo_exit_11",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_praise_emo_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_praise_emo_category_4"
                },
                {
                  "uuid": "uuid_mod_praise_emo_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_praise_emo_category_5"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_emo_category_4",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_praise_emo_exit_10"
                },
                {
                  "uuid": "uuid_mod_praise_emo_category_5",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_praise_emo_exit_11"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_emo_category_4"
            }
          },
          {
            "uuid": "uuid_mod_praise_emo_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_relax_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_emo_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_12",
                "destination_uuid": "uuid_mod_praise_emo_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Praise is a powerful parenting skill. Think about the last time someone thanked you, or said you'd done something great. How did it make you feel?  https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media&choiceMediaUrls=%5B%22plh_images%2Fstickers%2Ffaces%2Fhappy.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fhappier.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fhappiest.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "Slight smile",
                  "Moderate smile",
                  "Big smile"
                ],
                "uuid": "uuid_mod_praise_emo_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_13",
                "destination_uuid": "uuid_mod_praise_emo_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_9",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_14",
                "destination_uuid": "uuid_mod_praise_emo_node_10"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_emo_category_6",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_emo_category_6",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_emo_exit_14"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_praise_feeling_1"
            }
          },
          {
            "uuid": "uuid_mod_praise_emo_node_10",
            "actions": [
              {
                "uuid": "uuid_mod_praise_emo_action_8",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_feeling_1",
                  "name": "mod_praise_feeling_1"
                },
                "value": "@results.mod_praise_feeling_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_15",
                "destination_uuid": "uuid_mod_praise_emo_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "Parents usually don’t get thanked or praised enough. How does not being thanked make you feel?",
                "type": "send_msg",
                "quick_replies": [
                  "Sad",
                  "Angry",
                  "Tired"
                ],
                "uuid": "uuid_mod_praise_emo_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_16",
                "destination_uuid": "uuid_mod_praise_emo_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_12",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_17",
                "destination_uuid": "uuid_mod_praise_emo_node_13"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_emo_category_7",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_emo_category_7",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_emo_exit_17"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_praise_feeling_2"
            }
          },
          {
            "uuid": "uuid_mod_praise_emo_node_13",
            "actions": [
              {
                "uuid": "uuid_mod_praise_emo_action_10",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_feeling_2",
                  "name": "mod_praise_feeling_2"
                },
                "value": "@results.mod_praise_feeling_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_18",
                "destination_uuid": "uuid_mod_praise_emo_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_14",
            "actions": [
              {
                "attachments": [],
                "text": "Your teen feels this way too. And this week’s parenting tool is important and simple: Praise them for what they do right.",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_praise_emo_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_19",
                "destination_uuid": "uuid_mod_praise_emo_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_17",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_praise_emo_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_emo_case_5"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_praise_emo_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_emo_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_22",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_emo_category_8"
                },
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_23",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_praise_emo_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_26",
                  "name": "Next",
                  "uuid": "uuid_mod_praise_emo_category_10"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_praise_emo_category_8",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_22",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_emo_exit_23",
                "destination_uuid": "uuid_mod_praise_emo_node_15"
              },
              {
                "uuid": "uuid_mod_praise_emo_exit_26",
                "destination_uuid": "uuid_mod_praise_emo_node_18"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_15",
            "actions": [
              {
                "uuid": "uuid_mod_praise_emo_action_12",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_emo__completed",
                  "name": "mod_praise_emo__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_20",
                "destination_uuid": "uuid_mod_praise_emo_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_16",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_praise_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_emo_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_21",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_18",
            "actions": [
              {
                "uuid": "uuid_mod_praise_emo_action_14",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_emo__completed",
                  "name": "mod_praise_emo__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_24",
                "destination_uuid": "uuid_mod_praise_emo_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_19",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_emo_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_25",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_praise_intro",
        "uuid": "uuid_mod_praise_intro_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_praise_intro_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I tell my teens to do 20 things and they ignore me. Often I just want to scream. But then they still ignore me. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_intro_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_0",
                "destination_uuid": "uuid_mod_praise_intro_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "But the other day, they surprised me! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Click here"
                ],
                "uuid": "uuid_mod_praise_intro_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_1",
                "destination_uuid": "uuid_mod_praise_intro_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_3",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Click here"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_3",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_intro_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_4",
                  "name": "Click here",
                  "uuid": "uuid_mod_praise_intro_category_1"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_praise_intro_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_3",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_4",
                "destination_uuid": "uuid_mod_praise_intro_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_praise/illustrated_story/@fields.guidenumber/is_1.svg\"> </p>\n<p>I was busy and my older daughter actually helped her sister with her homework. Usually they just fight!</p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_praise_intro_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_2",
                "destination_uuid": "uuid_mod_praise_intro_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_6",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_intro_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_7",
                  "name": "Next",
                  "uuid": "uuid_mod_praise_intro_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_praise_intro_category_2",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_6",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_7",
                "destination_uuid": "uuid_mod_praise_intro_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_praise/illustrated_story/@fields.guidenumber/is_2.svg\"></p>\n<p>Here’s the parenting skill: if I tell my daughters how proud I am of them for doing this, then they will want to do it again.</p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_praise_intro_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_5",
                "destination_uuid": "uuid_mod_praise_intro_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_7",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_2"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_9",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_intro_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_10",
                  "name": "Previous",
                  "uuid": "uuid_mod_praise_intro_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_14",
                  "name": "Next",
                  "uuid": "uuid_mod_praise_intro_category_7"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_praise_intro_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_9",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_10",
                "destination_uuid": "uuid_mod_praise_intro_node_2"
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_14",
                "destination_uuid": "uuid_mod_praise_intro_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "How do you think what I said made my teens feel? https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media&choiceMediaUrls=%5B%22plh_images%2Fstickers%2Ffaces%2Fhappy.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fhappier.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fhappiest.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "Slight smile",
                  "Moderate smile",
                  "Big smile"
                ],
                "uuid": "uuid_mod_praise_intro_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_11",
                "destination_uuid": "uuid_mod_praise_intro_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_9",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_12",
                "destination_uuid": "uuid_mod_praise_intro_node_10"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_intro_category_6",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_intro_category_6",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_intro_exit_12"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_praise_feeling_3"
            }
          },
          {
            "uuid": "uuid_mod_praise_intro_node_10",
            "actions": [
              {
                "uuid": "uuid_mod_praise_intro_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_feeling_3",
                  "name": "mod_praise_feeling_3"
                },
                "value": "@results.mod_praise_feeling_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_13",
                "destination_uuid": "uuid_mod_praise_intro_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "Why did I praise them? https://plh-demo1.idems.international/chat/msg-info?chooseMulti=true",
                "type": "send_msg",
                "quick_replies": [
                  "To get them to do it more often",
                  "To help me finish my work",
                  "To make them feel good",
                  "To make me feel good"
                ],
                "uuid": "uuid_mod_praise_intro_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_15",
                "destination_uuid": "uuid_mod_praise_intro_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_12",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_16",
                "destination_uuid": "uuid_mod_praise_intro_node_13"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_intro_category_8",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_intro_category_8",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_intro_exit_16"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "wait"
            }
          },
          {
            "uuid": "uuid_mod_praise_intro_node_13",
            "actions": [
              {
                "uuid": "uuid_mod_praise_intro_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "wait",
                  "name": "wait"
                },
                "value": "@results.wait"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_17",
                "destination_uuid": "uuid_mod_praise_intro_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_14",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/hug.svg"
                ],
                "text": "All of those things are true! When they are happy, I feel happy. And I got my work done. The same can work for you! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_intro_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_18",
                "destination_uuid": "uuid_mod_praise_intro_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_15",
            "actions": [
              {
                "attachments": [],
                "text": "Next: Essential tools - praise in 3 easy steps!",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_praise_intro_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_19",
                "destination_uuid": "uuid_mod_praise_intro_node_18"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_18",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_4"
                },
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_11",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_22",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_intro_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_23",
                  "name": "Next",
                  "uuid": "uuid_mod_praise_intro_category_10"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_26",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_praise_intro_category_11"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_praise_intro_category_9",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_22",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_23",
                "destination_uuid": "uuid_mod_praise_intro_node_16"
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_26",
                "destination_uuid": "uuid_mod_praise_intro_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_16",
            "actions": [
              {
                "uuid": "uuid_mod_praise_intro_action_10",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_intro__completed",
                  "name": "mod_praise_intro__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_20",
                "destination_uuid": "uuid_mod_praise_intro_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_17",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_intro_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_21",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_19",
            "actions": [
              {
                "uuid": "uuid_mod_praise_intro_action_12",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_intro__completed",
                  "name": "mod_praise_intro__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_24",
                "destination_uuid": "uuid_mod_praise_intro_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_20",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_praise_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_intro_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_25",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_praise_photo",
        "uuid": "uuid_mod_praise_photo_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_praise_photo_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Can you find another great photo? One of you, or your family or your teenager? It’s good to remind ourselves of good times and things we are proud of. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "uuid_mod_praise_photo_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_photo_exit_0",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_photo_node_1",
            "actions": [
              {
                "uuid": "uuid_mod_praise_photo_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_photo__completed",
                  "name": "mod_praise_photo__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_photo_exit_1",
                "destination_uuid": "uuid_mod_praise_photo_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_photo_node_2",
            "actions": [
              {
                "flow": {
                  "name": "gallery"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_photo_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_photo_exit_2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_photo_node_3",
            "actions": [
              {
                "uuid": "uuid_mod_praise_photo_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_photo__completed",
                  "name": "mod_praise_photo__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_photo_exit_3",
                "destination_uuid": "uuid_mod_praise_photo_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_photo_node_4",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_praise_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_photo_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_photo_exit_4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_praise_activity",
        "uuid": "uuid_mod_praise_activity_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_praise_activity_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Praise your teen once a day. It will only take 10 seconds! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_0",
                "destination_uuid": "uuid_mod_praise_activity_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s hard to think of what to praise for! Here’s some ideas. https://plh-demo1.idems.international/chat/msg-info?character=guide&chooseMulti=true",
                "type": "send_msg",
                "quick_replies": [
                  "Being kind to someone",
                  "Cleaning their room ",
                  "Joining a family meal",
                  "Greeting other family members ",
                  "Looking after siblings ",
                  "Coming home in time ",
                  "Showing thoughtfulness/respect ",
                  "Saying 'please' or 'thank you' ",
                  "Going to school",
                  "Doing chores or schoolwork  ",
                  "Getting through mealtime peacefully ",
                  "Enter your own"
                ],
                "uuid": "uuid_mod_praise_activity_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_1",
                "destination_uuid": "uuid_mod_praise_activity_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_2",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_2",
                "destination_uuid": "uuid_mod_praise_activity_node_3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_activity_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_activity_exit_2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "teen_praise"
            }
          },
          {
            "uuid": "uuid_mod_praise_activity_node_3",
            "actions": [
              {
                "uuid": "uuid_mod_praise_activity_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "teen_praise",
                  "name": "teen_praise"
                },
                "value": "@results.teen_praise"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_3",
                "destination_uuid": "uuid_mod_praise_activity_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_7",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Enter your own"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_7",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_8",
                  "name": "Enter your own",
                  "uuid": "uuid_mod_praise_activity_category_3"
                }
              ],
              "operand": "@fields.teen_praise",
              "default_category_uuid": "uuid_mod_praise_activity_category_2"
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_7",
                "destination_uuid": "uuid_mod_praise_activity_node_8"
              },
              {
                "uuid": "uuid_mod_praise_activity_exit_8",
                "destination_uuid": "uuid_mod_praise_activity_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Type your own idea https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_4",
                "destination_uuid": "uuid_mod_praise_activity_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_5",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_5",
                "destination_uuid": "uuid_mod_praise_activity_node_6"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_category_1",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_activity_category_1",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_activity_exit_5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "teen_praise"
            }
          },
          {
            "uuid": "uuid_mod_praise_activity_node_6",
            "actions": [
              {
                "uuid": "uuid_mod_praise_activity_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "teen_praise",
                  "name": "teen_praise"
                },
                "value": "@results.teen_praise"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_6",
                "destination_uuid": "uuid_mod_praise_activity_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it! Remember to praise with enthusiasm!   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_9",
                "destination_uuid": "uuid_mod_praise_activity_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "Also remember to praise yourself every day https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_10",
                "destination_uuid": "uuid_mod_praise_activity_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "Every time you praise your teen, mark your Parent Point  to track your success https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_11",
                "destination_uuid": "uuid_mod_praise_activity_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "Every time you praise yourself, mark your Parent Point  to track your success https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_12",
                "destination_uuid": "uuid_mod_praise_activity_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "Do you have a photo of your time together? or any nice photo? Upload it so you can remember good times https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_praise_activity_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_13",
                "destination_uuid": "uuid_mod_praise_activity_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_15",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_case_1"
                },
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_16",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_17",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "uuid_mod_praise_activity_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_20",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_praise_activity_category_6"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_praise_activity_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_16",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_exit_17",
                "destination_uuid": "uuid_mod_praise_activity_node_13"
              },
              {
                "uuid": "uuid_mod_praise_activity_exit_20",
                "destination_uuid": "uuid_mod_praise_activity_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_13",
            "actions": [
              {
                "uuid": "uuid_mod_praise_activity_action_10",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_activity__completed",
                  "name": "mod_praise_activity__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_14",
                "destination_uuid": "uuid_mod_praise_activity_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_14",
            "actions": [
              {
                "flow": {
                  "name": "gallery"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_activity_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_15",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_16",
            "actions": [
              {
                "uuid": "uuid_mod_praise_activity_action_12",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_activity__completed",
                  "name": "mod_praise_activity__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_18",
                "destination_uuid": "uuid_mod_praise_activity_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_17",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_praise_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_activity_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_19",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_praise_activity_review",
        "uuid": "uuid_mod_praise_activity_review_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_praise_activity_review_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Your goal was to praise your teen. You’ve marked @habit.habit_praise_teen.weekly_count praises in your Parent Points - How did it go?  https://plh-demo1.idems.international/chat/msg-info?character=guide&choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "Good",
                  "Bad"
                ],
                "uuid": "uuid_mod_praise_activity_review_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_0",
                "destination_uuid": "uuid_mod_praise_activity_review_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_1",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_1",
                "destination_uuid": "uuid_mod_praise_activity_review_node_2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_review_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_activity_review_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_praise_experience"
            }
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_praise_activity_review_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_experience",
                  "name": "mod_praise_experience"
                },
                "value": "@results.mod_praise_experience"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_2",
                "destination_uuid": "uuid_mod_praise_activity_review_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_0"
                },
                {
                  "arguments": [
                    "Good"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_review_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_5",
                  "name": "Bad",
                  "uuid": "uuid_mod_praise_activity_review_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_7",
                  "name": "Good",
                  "uuid": "uuid_mod_praise_activity_review_category_3"
                }
              ],
              "operand": "@fields.mod_praise_experience",
              "default_category_uuid": "uuid_mod_praise_activity_review_category_1"
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_4",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_5",
                "destination_uuid": "uuid_mod_praise_activity_review_node_3"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_7",
                "destination_uuid": "uuid_mod_praise_activity_review_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometimes to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_praise_activity_review_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_3",
                "destination_uuid": "uuid_mod_praise_activity_review_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Well done, great job for remembering. How did your teen respond? ",
                "type": "send_msg",
                "quick_replies": [
                  "Surprised",
                  "Happy",
                  "My teen did not like it",
                  "I don’t know"
                ],
                "uuid": "uuid_mod_praise_activity_review_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_6",
                "destination_uuid": "uuid_mod_praise_activity_review_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_7",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_2"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_3"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_4"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_9",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_review_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_10",
                  "name": "Surprised",
                  "uuid": "uuid_mod_praise_activity_review_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_12",
                  "name": "Happy",
                  "uuid": "uuid_mod_praise_activity_review_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_14",
                  "name": "My teen did not like it",
                  "uuid": "uuid_mod_praise_activity_review_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_16",
                  "name": "I don’t know",
                  "uuid": "uuid_mod_praise_activity_review_category_8"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_praise_activity_review_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_9",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_10",
                "destination_uuid": "uuid_mod_praise_activity_review_node_6"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_12",
                "destination_uuid": "uuid_mod_praise_activity_review_node_8"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_14",
                "destination_uuid": "uuid_mod_praise_activity_review_node_9"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_16",
                "destination_uuid": "uuid_mod_praise_activity_review_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_8",
                "destination_uuid": "uuid_mod_praise_activity_review_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_11",
                "destination_uuid": "uuid_mod_praise_activity_review_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_13",
                "destination_uuid": "uuid_mod_praise_activity_review_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_15",
                "destination_uuid": "uuid_mod_praise_activity_review_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_praise_teen_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_praise_activity_review_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_17",
                "destination_uuid": "uuid_mod_praise_activity_review_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_14",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_20",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_review_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_21",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_praise_activity_review_category_10"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_praise_activity_review_category_9",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_20",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_21",
                "destination_uuid": "uuid_mod_praise_activity_review_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_12",
            "actions": [
              {
                "uuid": "uuid_mod_praise_activity_review_action_9",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_activity_review__completed",
                  "name": "mod_praise_activity_review__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_18",
                "destination_uuid": "uuid_mod_praise_activity_review_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_13",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_praise_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_activity_review_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_19",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_praise_act_teen_reminder",
        "uuid": "uuid_mod_praise_act_teen_reminder_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_praise_act_teen_reminder_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Praise time! Look at your teen and praise them for one thing they are doing great!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_act_teen_reminder_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_act_teen_reminder_exit_0",
                "destination_uuid": "uuid_mod_praise_act_teen_reminder_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_act_teen_reminder_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_praise_teen_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_act_teen_reminder_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_act_teen_reminder_exit_1",
                "destination_uuid": "uuid_mod_praise_act_teen_reminder_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_act_teen_reminder_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_praise_act_teen_reminder_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_act_teen_reminder__completed",
                  "name": "mod_praise_act_teen_reminder__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_act_teen_reminder_exit_2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_praise_act_adult_reminder",
        "uuid": "uuid_mod_praise_act_adult_reminder_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_praise_act_adult_reminder_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "When was the last time you praised another adult in your household? Try it out!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_act_adult_reminder_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_act_adult_reminder_exit_0",
                "destination_uuid": "uuid_mod_praise_act_adult_reminder_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_act_adult_reminder_node_1",
            "actions": [
              {
                "uuid": "uuid_mod_praise_act_adult_reminder_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_act_adult_reminder__completed",
                  "name": "mod_praise_act_adult_reminder__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_act_adult_reminder_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_praise_fun",
        "uuid": "uuid_mod_praise_fun_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_praise_fun_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Here is something fun to do with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_fun_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_0",
                "destination_uuid": "uuid_mod_praise_fun_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_fun_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "At the End of the Day take a minute\n- Talk to your teen about one fun thing they did.\n- Praise yourself for one thing you did well today.\n- You are a star!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_fun_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_1",
                "destination_uuid": "uuid_mod_praise_fun_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_fun_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_spend_time_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_praise_fun_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_2",
                "destination_uuid": "uuid_mod_praise_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_fun_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_praise_fun_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_fun_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_fun_exit_5",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_fun_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_praise_fun_exit_6",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_praise_fun_category_1"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_praise_fun_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_5",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_fun_exit_6",
                "destination_uuid": "uuid_mod_praise_fun_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_fun_node_3",
            "actions": [
              {
                "uuid": "uuid_mod_praise_fun_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_fun__completed",
                  "name": "mod_praise_fun__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_3",
                "destination_uuid": "uuid_mod_praise_fun_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_fun_node_4",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_praise_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_fun_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_instruct_emo",
        "uuid": "uuid_mod_instruct_emo_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instruct_emo_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It's great to see you again. You’ve done  \n- @habit.habit_spend_time.weekly_count one-on-one times this week  \n- you’ve relaxed @habit.habit_relax.weekly_count times  \n- praised yourself @habit.habit_praise_yourself.weekly_count times\n- and praised your teen @habit.habit_praise_teen.weekly_count times. \n\nYou are showing such commitment to being a parent and to caring for yourself. You are fantastic.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_emo_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_0",
                "destination_uuid": "uuid_mod_instruct_emo_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "How are you feeling today? https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media&choiceMediaUrls=%5B%22plh_images%2Fstickers%2Ffaces%2Fhappier.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fneutral.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fsadder.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "Happy",
                  "OK",
                  "Sad"
                ],
                "uuid": "uuid_mod_instruct_emo_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_1",
                "destination_uuid": "uuid_mod_instruct_emo_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_3",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "uuid_mod_instruct_emo_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_emo_case_0"
                },
                {
                  "arguments": [
                    "OK"
                  ],
                  "category_uuid": "uuid_mod_instruct_emo_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_emo_case_1"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "uuid_mod_instruct_emo_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_emo_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_emo_exit_3",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_emo_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_emo_exit_4",
                  "name": "Happy",
                  "uuid": "uuid_mod_instruct_emo_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_emo_exit_6",
                  "name": "OK",
                  "uuid": "uuid_mod_instruct_emo_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_emo_exit_8",
                  "name": "Sad",
                  "uuid": "uuid_mod_instruct_emo_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_emo_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_3",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_emo_exit_4",
                "destination_uuid": "uuid_mod_instruct_emo_node_2"
              },
              {
                "uuid": "uuid_mod_instruct_emo_exit_6",
                "destination_uuid": "uuid_mod_instruct_emo_node_4"
              },
              {
                "uuid": "uuid_mod_instruct_emo_exit_8",
                "destination_uuid": "uuid_mod_instruct_emo_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful, I am so happy! Keep up the good work.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_emo_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_2",
                "destination_uuid": "uuid_mod_instruct_emo_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that things are difficult right now. All families struggle. We are here to help!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_emo_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_5",
                "destination_uuid": "uuid_mod_instruct_emo_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Whatever went ‘wrong’ today, let it go and try again tomorrow. It’s okay!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_emo_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_7",
                "destination_uuid": "uuid_mod_instruct_emo_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Let’s slow down for a moment together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_emo_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_9",
                "destination_uuid": "uuid_mod_instruct_emo_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_7",
            "actions": [
              {
                "flow": {
                  "name": "calm_4"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_emo_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_11",
                "destination_uuid": "uuid_mod_instruct_emo_node_8"
              },
              {
                "uuid": "uuid_mod_instruct_emo_exit_12",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_instruct_emo_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_instruct_emo_category_4"
                },
                {
                  "uuid": "uuid_mod_instruct_emo_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_instruct_emo_category_5"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_emo_category_4",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_instruct_emo_exit_11"
                },
                {
                  "uuid": "uuid_mod_instruct_emo_category_5",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_instruct_emo_exit_12"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_emo_category_4"
            }
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Tap your ParentPoint <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_relax_icon.svg\">: see your success!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_emo_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_13",
                "destination_uuid": "uuid_mod_instruct_emo_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I’m not sure I asked for your name. Could you please tell me your name or a name you’d like us to use?",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_emo_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_14",
                "destination_uuid": "uuid_mod_instruct_emo_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_10",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_15",
                "destination_uuid": "uuid_mod_instruct_emo_node_11"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_emo_category_6",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_emo_category_6",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instruct_emo_exit_15"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "username"
            }
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_11",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_emo_action_9",
                "type": "set_contact_field",
                "field": {
                  "key": "username",
                  "name": "username"
                },
                "value": "@results.username"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_16",
                "destination_uuid": "uuid_mod_instruct_emo_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you @fields.username!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_emo_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_17",
                "destination_uuid": "uuid_mod_instruct_emo_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_13",
            "actions": [
              {
                "attachments": [],
                "text": "Next: Why positive instructions?",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_instruct_emo_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_18",
                "destination_uuid": "uuid_mod_instruct_emo_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_16",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_emo_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_emo_case_5"
                },
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_instruct_emo_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_emo_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_emo_exit_21",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_emo_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_emo_exit_22",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_emo_category_8"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_emo_exit_25",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_instruct_emo_category_9"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_emo_category_7",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_21",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_emo_exit_22",
                "destination_uuid": "uuid_mod_instruct_emo_node_14"
              },
              {
                "uuid": "uuid_mod_instruct_emo_exit_25",
                "destination_uuid": "uuid_mod_instruct_emo_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_14",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_emo_action_12",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_emo__completed",
                  "name": "mod_instruct_emo__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_19",
                "destination_uuid": "uuid_mod_instruct_emo_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_15",
            "actions": [
              {
                "flow": {
                  "name": "mod_instruct_intro"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_emo_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_20",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_17",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_emo_action_14",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_emo__completed",
                  "name": "mod_instruct_emo__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_23",
                "destination_uuid": "uuid_mod_instruct_emo_node_18"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_emo_node_18",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_instruct_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_emo_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_emo_exit_24",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_instruct_intro",
        "uuid": "uuid_mod_instruct_intro_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instruct_intro_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/teen_shout.svg\"></p>\n<p>@fields.second_guide: \"Stop making so much noise!\"</p>\n<p>@fields.guide_teen: \"I hate you!\"</p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_instruct_intro_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_0",
                "destination_uuid": "uuid_mod_instruct_intro_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_intro_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_intro_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_intro_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_3",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_intro_category_1"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_intro_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_intro_exit_3",
                "destination_uuid": "uuid_mod_instruct_intro_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "It is so hard to tell teenagers what to do! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_intro_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_1",
                "destination_uuid": "uuid_mod_instruct_intro_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "What really helped was to change how I ask my teen to do things. Now, I tell them what they should do instead of what they shouldn’t. Let me show you how it works!\n",
                "type": "send_msg",
                "quick_replies": [
                  "Click here"
                ],
                "uuid": "uuid_mod_instruct_intro_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_4",
                "destination_uuid": "uuid_mod_instruct_intro_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Click here"
                  ],
                  "category_uuid": "uuid_mod_instruct_intro_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_intro_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_6",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_intro_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_7",
                  "name": "Click here",
                  "uuid": "uuid_mod_instruct_intro_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_intro_category_2",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_6",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_intro_exit_7",
                "destination_uuid": "uuid_mod_instruct_intro_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "<img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/thought_experiment/te_1.svg\">\nDO NOT THINK ABOUT AN ELEPHANT\n\nWhat are you thinking about?",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_instruct_intro_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_5",
                "destination_uuid": "uuid_mod_instruct_intro_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_7",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_intro_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_intro_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_9",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_intro_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_10",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_intro_category_5"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_intro_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_9",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_intro_exit_10",
                "destination_uuid": "uuid_mod_instruct_intro_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "<img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/thought_experiment/te_2.svg\"> \n‘Don’t do’ instructions make teens think about that thing. Sometimes they don’t understand what we do want from them. Also often they hate being told not to do things (don’t we all?)",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_instruct_intro_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_8",
                "destination_uuid": "uuid_mod_instruct_intro_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_9",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_instruct_intro_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_intro_case_3"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_intro_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_intro_case_4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_12",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_intro_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_13",
                  "name": "Previous",
                  "uuid": "uuid_mod_instruct_intro_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_15",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_intro_category_8"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_intro_category_6",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_12",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_intro_exit_13",
                "destination_uuid": "uuid_mod_instruct_intro_node_4"
              },
              {
                "uuid": "uuid_mod_instruct_intro_exit_15",
                "destination_uuid": "uuid_mod_instruct_intro_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "<img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/thought_experiment/te_1.svg\"> \nTHINK ABOUT A FURRY TIGER, THANK YOU! \n\nWhat are you thinking about? ",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_instruct_intro_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_14",
                "destination_uuid": "uuid_mod_instruct_intro_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_12",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_instruct_intro_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_intro_case_5"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_intro_category_11",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_intro_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_17",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_intro_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_18",
                  "name": "Previous",
                  "uuid": "uuid_mod_instruct_intro_category_10"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_20",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_intro_category_11"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_intro_category_9",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_17",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_intro_exit_18",
                "destination_uuid": "uuid_mod_instruct_intro_node_6"
              },
              {
                "uuid": "uuid_mod_instruct_intro_exit_20",
                "destination_uuid": "uuid_mod_instruct_intro_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_13",
            "actions": [
              {
                "attachments": [],
                "text": "<img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/thought_experiment/te_3.svg\">\nPositive, clear instructions help teens focus on what they should be doing. They also feel more respectful to a teenager.",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_instruct_intro_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_19",
                "destination_uuid": "uuid_mod_instruct_intro_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_15",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_instruct_intro_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_intro_case_7"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_intro_category_14",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_intro_case_8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_22",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_intro_category_12"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_23",
                  "name": "Previous",
                  "uuid": "uuid_mod_instruct_intro_category_13"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_intro_exit_26",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_intro_category_14"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_intro_category_12",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_22",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_intro_exit_23",
                "destination_uuid": "uuid_mod_instruct_intro_node_10"
              },
              {
                "uuid": "uuid_mod_instruct_intro_exit_26",
                "destination_uuid": "uuid_mod_instruct_intro_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_16",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_intro_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_intro__completed",
                  "name": "mod_instruct_intro__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_24",
                "destination_uuid": "uuid_mod_instruct_intro_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_intro_node_17",
            "actions": [
              {
                "flow": {
                  "name": "mod_instruct_story"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_intro_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_intro_exit_25",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_instruct_story",
        "uuid": "uuid_mod_instruct_story_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instruct_story_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This happened with @fields.neighbour's teen daughter the other day: https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "See story"
                ],
                "uuid": "uuid_mod_instruct_story_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_0",
                "destination_uuid": "uuid_mod_instruct_story_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "See story"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_3",
                  "name": "See story",
                  "uuid": "uuid_mod_instruct_story_category_1"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_3",
                "destination_uuid": "uuid_mod_instruct_story_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "<p>@fields.neighbour was cleaning the house while their daughter @fields.neighbour_teen_daughter was with her friends practicing dance moves.  </p>\n<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/illustrated_story/is_1.svg\"></p>\n<p>@fields.neighbour: \"Don’t make such a mess while I am cleaning the house. You are in the way!\"</p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_instruct_story_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_1",
                "destination_uuid": "uuid_mod_instruct_story_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_5",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_6",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_story_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_2",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_5",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_6",
                "destination_uuid": "uuid_mod_instruct_story_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/illustrated_story/is_2.svg\"></p>\n<p>@fields.neighbour_teen_daughter: \"But I need to practice for the school competition. You never let me do anything.\"</p>\n<p>@fields.neighbour: \"Don't you talk back to me!\"</p>\n<p></p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_instruct_story_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_4",
                "destination_uuid": "uuid_mod_instruct_story_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_6",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_2"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_8",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_9",
                  "name": "Previous",
                  "uuid": "uuid_mod_instruct_story_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_11",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_story_category_6"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_8",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_9",
                "destination_uuid": "uuid_mod_instruct_story_node_1"
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_11",
                "destination_uuid": "uuid_mod_instruct_story_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/illustrated_story/is_3.svg\"></p>\n<p>@fields.neighbour_teen_daughter: \"Arrg!! Why am I being yelled at all the time????\" </p>\n<p>@fields.neighbour: \"That child is always making trouble.\"</p>\n<p></p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_instruct_story_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_10",
                "destination_uuid": "uuid_mod_instruct_story_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_9",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_4"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_13",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_14",
                  "name": "Previous",
                  "uuid": "uuid_mod_instruct_story_category_8"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_18",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_story_category_10"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_7",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_13",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_14",
                "destination_uuid": "uuid_mod_instruct_story_node_3"
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_18",
                "destination_uuid": "uuid_mod_instruct_story_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "How do you think @fields.neighbour_teen_daughter felt about the way @fields.neighbour responded to her?",
                "type": "send_msg",
                "quick_replies": [
                  "Slight frown",
                  "Confused face",
                  "Angry face"
                ],
                "uuid": "uuid_mod_instruct_story_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_15",
                "destination_uuid": "uuid_mod_instruct_story_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_11",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_16",
                "destination_uuid": "uuid_mod_instruct_story_node_12"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_story_category_9",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_story_category_9",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instruct_story_exit_16"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instruct_story_feel"
            }
          },
          {
            "uuid": "uuid_mod_instruct_story_node_12",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_story_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_story_feel",
                  "name": "mod_instruct_story_feel"
                },
                "value": "@results.mod_instruct_story_feel"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_17",
                "destination_uuid": "uuid_mod_instruct_story_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_13",
            "actions": [
              {
                "attachments": [],
                "text": "At first I thought @fields.neighbour_teen_daughter was just being disrespectful, but then I thought maybe it was something @fields.neighbour did.  \n\nWhat could @fields.neighbour have done differently?\n",
                "type": "send_msg",
                "quick_replies": [
                  "Say something nice first",
                  "Speak to her in a calm voice",
                  "Tell @fields.neighbour_teen_daughter what they want her to do"
                ],
                "uuid": "uuid_mod_instruct_story_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_19",
                "destination_uuid": "uuid_mod_instruct_story_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_14",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_20",
                "destination_uuid": "uuid_mod_instruct_story_node_15"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_story_category_11",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_story_category_11",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instruct_story_exit_20"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instruct_story_response"
            }
          },
          {
            "uuid": "uuid_mod_instruct_story_node_15",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_story_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_story_response",
                  "name": "mod_instruct_story_response"
                },
                "value": "@results.mod_instruct_story_response"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_21",
                "destination_uuid": "uuid_mod_instruct_story_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_16",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for thinking along! Let’s go back in time and see what happens! ",
                "type": "send_msg",
                "quick_replies": [
                  "See story"
                ],
                "uuid": "uuid_mod_instruct_story_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_22",
                "destination_uuid": "uuid_mod_instruct_story_node_18"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_18",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "See story"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_24",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_12"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_25",
                  "name": "See story",
                  "uuid": "uuid_mod_instruct_story_category_13"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_12",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_24",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_25",
                "destination_uuid": "uuid_mod_instruct_story_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_17",
            "actions": [
              {
                "attachments": [],
                "text": "<p>@fields.neighbour was cleaning the house while their daughter @fields.neighbour_teen_daughter was with her friends practicing dance moves.  </p>\n<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/illustrated_story/is_4.svg\"></p>\n<p></p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_instruct_story_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_23",
                "destination_uuid": "uuid_mod_instruct_story_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_20",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_27",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_14"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_28",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_story_category_15"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_14",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_27",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_28",
                "destination_uuid": "uuid_mod_instruct_story_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_19",
            "actions": [
              {
                "attachments": [],
                "text": "<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/illustrated_story/is_5.svg\"></p>\n<p>@fields.neighbour: \"@fields.neighbour_teen_daughter, it is nice to see you practicing your dance moves with your friends. Please take it outside so I can finish cleaning the house. Afterwards, you can show me your dance.\"</p>\n<p>@fields.neighbour_teen_daughter: \"Okay!\"</p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_instruct_story_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_26",
                "destination_uuid": "uuid_mod_instruct_story_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_22",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_17",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_8"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_18",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_30",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_16"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_31",
                  "name": "Previous",
                  "uuid": "uuid_mod_instruct_story_category_17"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_33",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_story_category_18"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_16",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_30",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_31",
                "destination_uuid": "uuid_mod_instruct_story_node_17"
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_33",
                "destination_uuid": "uuid_mod_instruct_story_node_23"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_23",
            "actions": [
              {
                "attachments": [],
                "text": "<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/illustrated_story/is_6.svg\"></p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_instruct_story_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_32",
                "destination_uuid": "uuid_mod_instruct_story_node_25"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_25",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_20",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_10"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_21",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_11"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_35",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_19"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_36",
                  "name": "Previous",
                  "uuid": "uuid_mod_instruct_story_category_20"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_38",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_story_category_21"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_19",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_35",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_36",
                "destination_uuid": "uuid_mod_instruct_story_node_19"
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_38",
                "destination_uuid": "uuid_mod_instruct_story_node_26"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_26",
            "actions": [
              {
                "attachments": [],
                "text": "<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/illustrated_story/is_7.svg\"></p>\n<p>@fields.neighbour: \"Thank you for practicing outside while I finished cleaning the house, @fields.neighbour_teen_daughter . Now I have some time to watch your dance.\"</p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_instruct_story_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_37",
                "destination_uuid": "uuid_mod_instruct_story_node_28"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_28",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_23",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_12"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_24",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_13"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_40",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_22"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_41",
                  "name": "Previous",
                  "uuid": "uuid_mod_instruct_story_category_23"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_43",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_story_category_24"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_22",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_40",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_41",
                "destination_uuid": "uuid_mod_instruct_story_node_23"
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_43",
                "destination_uuid": "uuid_mod_instruct_story_node_29"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_29",
            "actions": [
              {
                "attachments": [],
                "text": "<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_instruct/illustrated_story/is_8.svg\"> </p>\n<p>@fields.neighbour: \"Wow, @fields.neighbour_teen_daughter! You have such good dance moves!\"</p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_instruct_story_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_42",
                "destination_uuid": "uuid_mod_instruct_story_node_31"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_31",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_26",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_14"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_28",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_15"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_45",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_25"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_46",
                  "name": "Previous",
                  "uuid": "uuid_mod_instruct_story_category_26"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_50",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_story_category_28"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_25",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_45",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_46",
                "destination_uuid": "uuid_mod_instruct_story_node_26"
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_50",
                "destination_uuid": "uuid_mod_instruct_story_node_32"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_32",
            "actions": [
              {
                "attachments": [],
                "text": "Why do you think it worked better for @fields.neighbour this time?",
                "type": "send_msg",
                "quick_replies": [
                  "@fields.neighbour_teen_daughter felt respected and loved",
                  "@fields.neighbour was able to stay calm",
                  "@fields.neighbour kept a positive attitude"
                ],
                "uuid": "uuid_mod_instruct_story_action_14"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_47",
                "destination_uuid": "uuid_mod_instruct_story_node_33"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_33",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_48",
                "destination_uuid": "uuid_mod_instruct_story_node_34"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_story_category_27",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_story_category_27",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instruct_story_exit_48"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instruct_story_why"
            }
          },
          {
            "uuid": "uuid_mod_instruct_story_node_34",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_story_action_15",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_story_why",
                  "name": "mod_instruct_story_why"
                },
                "value": "@results.mod_instruct_story_why"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_49",
                "destination_uuid": "uuid_mod_instruct_story_node_35"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_35",
            "actions": [
              {
                "attachments": [],
                "text": "Next - Essential tools for Positive Instructions",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Back to stepper"
                ],
                "uuid": "uuid_mod_instruct_story_action_16"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_51",
                "destination_uuid": "uuid_mod_instruct_story_node_38"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_38",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_30",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_16"
                },
                {
                  "arguments": [
                    "Back to stepper"
                  ],
                  "category_uuid": "uuid_mod_instruct_story_category_31",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_story_case_17"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_54",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_story_category_29"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_55",
                  "name": "Next",
                  "uuid": "uuid_mod_instruct_story_category_30"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_story_exit_58",
                  "name": "Back to stepper",
                  "uuid": "uuid_mod_instruct_story_category_31"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_story_category_29",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_54",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_55",
                "destination_uuid": "uuid_mod_instruct_story_node_36"
              },
              {
                "uuid": "uuid_mod_instruct_story_exit_58",
                "destination_uuid": "uuid_mod_instruct_story_node_39"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_36",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_story_action_17",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_story__completed",
                  "name": "mod_instruct_story__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_52",
                "destination_uuid": "uuid_mod_instruct_story_node_37"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_37",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_instruct_tips"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_story_action_18"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_53",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_39",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_story_action_19",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_story__completed",
                  "name": "mod_instruct_story__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_56",
                "destination_uuid": "uuid_mod_instruct_story_node_40"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_story_node_40",
            "actions": [
              {
                "flow": {
                  "name": "link_mod_instruct_page"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_story_action_20"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_story_exit_57",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_instruct_activity",
        "uuid": "uuid_mod_instruct_activity_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instruct_activity_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "What behaviours would you want your teen to do more?",
                "type": "send_msg",
                "quick_replies": [
                  "Do schoolwork",
                  "Come home in time",
                  "Get ready for school in time",
                  "Clean up school clothes",
                  "Enter your own"
                ],
                "uuid": "uuid_mod_instruct_activity_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_0",
                "destination_uuid": "uuid_mod_instruct_activity_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_1",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_1",
                "destination_uuid": "uuid_mod_instruct_activity_node_2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_activity_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_activity_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instruct_activity_exit_1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instruct_behaviour"
            }
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_activity_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_behaviour",
                  "name": "mod_instruct_behaviour"
                },
                "value": "@results.mod_instruct_behaviour"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_2",
                "destination_uuid": "uuid_mod_instruct_activity_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_6",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Enter your own"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_activity_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_activity_exit_6",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_activity_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_activity_exit_7",
                  "name": "Enter your own",
                  "uuid": "uuid_mod_instruct_activity_category_3"
                }
              ],
              "operand": "@fields.mod_instruct_behaviour",
              "default_category_uuid": "uuid_mod_instruct_activity_category_2"
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_6",
                "destination_uuid": "uuid_mod_instruct_activity_node_7"
              },
              {
                "uuid": "uuid_mod_instruct_activity_exit_7",
                "destination_uuid": "uuid_mod_instruct_activity_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Type your own reply.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_activity_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_3",
                "destination_uuid": "uuid_mod_instruct_activity_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_4",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_4",
                "destination_uuid": "uuid_mod_instruct_activity_node_5"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_activity_category_1",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_activity_category_1",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instruct_activity_exit_4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instruct_behaviour"
            }
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_activity_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_behaviour",
                  "name": "mod_instruct_behaviour"
                },
                "value": "@results.mod_instruct_behaviour"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_5",
                "destination_uuid": "uuid_mod_instruct_activity_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "What would be a positive, simple, and realistic instruction for this?",
                "type": "send_msg",
                "quick_replies": [
                  "Please do your school work before going to play.",
                  "Please come home before 7pm.",
                  "Please get ready and leave for school 30 minutes before school starts.",
                  "Please wash your school clothes and put them away in the cupboard.",
                  "Enter your own"
                ],
                "uuid": "uuid_mod_instruct_activity_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_8",
                "destination_uuid": "uuid_mod_instruct_activity_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_8",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_9",
                "destination_uuid": "uuid_mod_instruct_activity_node_9"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_activity_category_4",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_activity_category_4",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instruct_activity_exit_9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instruct_instruction"
            }
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_9",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_activity_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_instruction",
                  "name": "mod_instruct_instruction"
                },
                "value": "@results.mod_instruct_instruction"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_10",
                "destination_uuid": "uuid_mod_instruct_activity_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_13",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Enter your own"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_activity_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_activity_exit_14",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_activity_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_activity_exit_15",
                  "name": "Enter your own",
                  "uuid": "uuid_mod_instruct_activity_category_7"
                }
              ],
              "operand": "@fields.mod_instruct_instruction",
              "default_category_uuid": "uuid_mod_instruct_activity_category_6"
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_14",
                "destination_uuid": "uuid_mod_instruct_activity_node_14"
              },
              {
                "uuid": "uuid_mod_instruct_activity_exit_15",
                "destination_uuid": "uuid_mod_instruct_activity_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "Type your own reply.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_activity_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_11",
                "destination_uuid": "uuid_mod_instruct_activity_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_11",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_12",
                "destination_uuid": "uuid_mod_instruct_activity_node_12"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_activity_category_5",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_activity_category_5",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instruct_activity_exit_12"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instruct_instruction"
            }
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_12",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_activity_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_instruction",
                  "name": "mod_instruct_instruction"
                },
                "value": "@results.mod_instruct_instruction"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_13",
                "destination_uuid": "uuid_mod_instruct_activity_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_14",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, try out ONE positive, simple, and realistic instruction with your teen. Remember to praise them, you will see the positive results!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_activity_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_16",
                "destination_uuid": "uuid_mod_instruct_activity_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_node_15",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_activity_action_9",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_activity__completed",
                  "name": "mod_instruct_activity__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_exit_17",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_instruct_activity_review",
        "uuid": "uuid_mod_instruct_activity_review_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instruct_activity_review_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Your goal was to try out ONE positive, simple, and realistic instruction with your teen: @fields.mod_instruct_instruction.\n\nHow did it go?  https://plh-demo1.idems.international/chat/msg-info?character=elder&choiceMediaDisplay=both&choiceMediaUrls=%5B%22plh_images%2Fstickers%2Ffaces%2Fhappier.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fneutral.svg%22%2C%22plh_images%2Fstickers%2Ffaces%2Fsadder.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "Great",
                  "Neutral",
                  "Bad"
                ],
                "uuid": "uuid_mod_instruct_activity_review_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_0",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_1",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_1",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_activity_review_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_activity_review_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instruct_experience"
            }
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_activity_review_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_experience",
                  "name": "mod_instruct_experience"
                },
                "value": "@results.mod_instruct_experience"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_2",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_activity_review_case_0"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_activity_review_case_6"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_activity_review_case_7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_activity_review_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_5",
                  "name": "Great",
                  "uuid": "uuid_mod_instruct_activity_review_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_16",
                  "name": "Neutral; Bad",
                  "uuid": "uuid_mod_instruct_activity_review_category_9"
                }
              ],
              "operand": "@fields.mod_instruct_experience",
              "default_category_uuid": "uuid_mod_instruct_activity_review_category_1"
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_4",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_5",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_3"
              },
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_16",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well, you are a star! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_activity_review_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_3",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_5",
            "actions": [
              {
                "flow": {
                  "name": "mod_instruct_highlights"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_activity_review_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_7",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_6"
              },
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_8",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_instruct_activity_review_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_3"
                },
                {
                  "uuid": "uuid_mod_instruct_activity_review_case_2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_4"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_activity_review_category_3",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_7"
                },
                {
                  "uuid": "uuid_mod_instruct_activity_review_category_4",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_8"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_activity_review_category_3"
            }
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any challenges? https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_mod_instruct_activity_review_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_9",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_8",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_activity_review_case_5"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_14",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_activity_review_case_12"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_13",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_activity_review_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_14",
                  "name": "Yes",
                  "uuid": "uuid_mod_instruct_activity_review_category_8"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_25",
                  "name": "No",
                  "uuid": "uuid_mod_instruct_activity_review_category_14"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_activity_review_category_7",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_13",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_14",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_7"
              },
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_25",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_7",
            "actions": [
              {
                "flow": {
                  "name": "mod_instruct_challenges"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_activity_review_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_11",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_14"
              },
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_12",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_instruct_activity_review_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_5"
                },
                {
                  "uuid": "uuid_mod_instruct_activity_review_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_6"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_activity_review_category_5",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_11"
                },
                {
                  "uuid": "uuid_mod_instruct_activity_review_category_6",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_12"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_activity_review_category_5"
            }
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_activity_review_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_15",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_10",
            "actions": [
              {
                "flow": {
                  "name": "mod_instruct_challenges"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_activity_review_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_18",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_11"
              },
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_19",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_instruct_activity_review_case_8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_10"
                },
                {
                  "uuid": "uuid_mod_instruct_activity_review_case_9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_11"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_activity_review_category_10",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_18"
                },
                {
                  "uuid": "uuid_mod_instruct_activity_review_category_11",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_19"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_activity_review_category_10"
            }
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_11",
            "actions": [
              {
                "flow": {
                  "name": "mod_instruct_highlights"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_activity_review_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_21",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_14"
              },
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_22",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_instruct_activity_review_case_10",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_12"
                },
                {
                  "uuid": "uuid_mod_instruct_activity_review_case_11",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_instruct_activity_review_category_13"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_activity_review_category_12",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_21"
                },
                {
                  "uuid": "uuid_mod_instruct_activity_review_category_13",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_instruct_activity_review_exit_22"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_activity_review_category_12"
            }
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_12",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_activity_review_action_9",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_activity_review__completed",
                  "name": "mod_instruct_activity_review__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_23",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_13",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_activity_review_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_24",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_14",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_activity_review_action_11",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_activity_review__completed",
                  "name": "mod_instruct_activity_review__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_26",
                "destination_uuid": "uuid_mod_instruct_activity_review_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_activity_review_node_15",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_activity_review_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_activity_review_exit_27",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_instruct_highlights",
        "uuid": "uuid_mod_instruct_highlights_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instruct_highlights_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Which of @fields.elder's tips helped you?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Get Your Teen's Attention",
                  "Be Specific, Positive, and Realistic!",
                  "Give Instructions One at a Time",
                  "Praise Your Teens When They Follow Instructions"
                ],
                "uuid": "uuid_mod_instruct_highlights_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_highlights_exit_0",
                "destination_uuid": "uuid_mod_instruct_highlights_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_highlights_node_1",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_highlights_exit_1",
                "destination_uuid": "uuid_mod_instruct_highlights_node_2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_highlights_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_highlights_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instruct_highlights_exit_1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instruct_high"
            }
          },
          {
            "uuid": "uuid_mod_instruct_highlights_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_highlights_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_high",
                  "name": "mod_instruct_high"
                },
                "value": "@results.mod_instruct_high"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_highlights_exit_2",
                "destination_uuid": "uuid_mod_instruct_highlights_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_highlights_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Get Your Teen's Attention"
                  ],
                  "category_uuid": "uuid_mod_instruct_highlights_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_highlights_case_0"
                },
                {
                  "arguments": [
                    "Be Specific, Positive, and Realistic!"
                  ],
                  "category_uuid": "uuid_mod_instruct_highlights_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_highlights_case_1"
                },
                {
                  "arguments": [
                    "Give Instructions One at a Time"
                  ],
                  "category_uuid": "uuid_mod_instruct_highlights_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_highlights_case_2"
                },
                {
                  "arguments": [
                    "Praise Your Teens When They Follow Instructions"
                  ],
                  "category_uuid": "uuid_mod_instruct_highlights_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_highlights_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_highlights_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_highlights_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_highlights_exit_5",
                  "name": "Get Your Teen's Attention",
                  "uuid": "uuid_mod_instruct_highlights_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_highlights_exit_7",
                  "name": "Be Specific, Positive, and Realistic!",
                  "uuid": "uuid_mod_instruct_highlights_category_3"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_highlights_exit_9",
                  "name": "Give Instructions One at a Time",
                  "uuid": "uuid_mod_instruct_highlights_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_highlights_exit_11",
                  "name": "Praise Your Teens When They Follow Instructions",
                  "uuid": "uuid_mod_instruct_highlights_category_5"
                }
              ],
              "operand": "@fields.mod_instruct_high",
              "default_category_uuid": "uuid_mod_instruct_highlights_category_1"
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_highlights_exit_4",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_highlights_exit_5",
                "destination_uuid": "uuid_mod_instruct_highlights_node_3"
              },
              {
                "uuid": "uuid_mod_instruct_highlights_exit_7",
                "destination_uuid": "uuid_mod_instruct_highlights_node_5"
              },
              {
                "uuid": "uuid_mod_instruct_highlights_exit_9",
                "destination_uuid": "uuid_mod_instruct_highlights_node_6"
              },
              {
                "uuid": "uuid_mod_instruct_highlights_exit_11",
                "destination_uuid": "uuid_mod_instruct_highlights_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_highlights_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful, when we make sure to first get our teen’s full attention at a good time, it makes it so much easier to give clear and effective instructions! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_highlights_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_highlights_exit_3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_highlights_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Awesome, when we think of which exact instruction to give before telling our teen, our instructions become much easier to follow! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_highlights_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_highlights_exit_6",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_highlights_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "So true! By just giving one instruction at a time, our teen gets manageable tasks and is more likely to listen – so we can praise them even more! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_highlights_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_highlights_exit_8",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_highlights_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Yes, that also helped so much with my teen. When we praise them, our teens feel encouraged to listen again next time! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_highlights_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_highlights_exit_10",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_instruct_challenges",
        "uuid": "uuid_mod_instruct_challenges_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instruct_challenges_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "What was your main challenge when trying to give a positive, simple and realistic instruction? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "My teenager did not want to follow the instruction",
                  "I did not find time to spend one-on-one time with my teen.",
                  "I gave a negative instead of a positive instruction",
                  "I shouted at my teen when they behaved negatively, instead of giving them a positive instruction for what they should do."
                ],
                "uuid": "uuid_mod_instruct_challenges_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_0",
                "destination_uuid": "uuid_mod_instruct_challenges_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_challenges_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "My teenager did not want to follow the instruction"
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_challenges_case_0"
                },
                {
                  "arguments": [
                    "I did not find time to spend one-on-one time with my teen."
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_challenges_case_3"
                },
                {
                  "arguments": [
                    "I gave a negative instead of a positive instruction"
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_challenges_case_4"
                },
                {
                  "arguments": [
                    "I shouted at my teen when they behaved negatively, instead of giving them a positive instruction for what they should do."
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_challenges_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_challenges_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_3",
                  "name": "My teenager did not want to follow the instruction",
                  "uuid": "uuid_mod_instruct_challenges_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_7",
                  "name": "I did not find time to spend one-on-one time with my teen.",
                  "uuid": "uuid_mod_instruct_challenges_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_9",
                  "name": "I gave a negative instead of a positive instruction",
                  "uuid": "uuid_mod_instruct_challenges_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_11",
                  "name": "I shouted at my teen when they behaved negatively, instead of giving them a positive instruction for what they should do.",
                  "uuid": "uuid_mod_instruct_challenges_category_6"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_challenges_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_challenges_exit_3",
                "destination_uuid": "uuid_mod_instruct_challenges_node_1"
              },
              {
                "uuid": "uuid_mod_instruct_challenges_exit_7",
                "destination_uuid": "uuid_mod_instruct_challenges_node_3"
              },
              {
                "uuid": "uuid_mod_instruct_challenges_exit_9",
                "destination_uuid": "uuid_mod_instruct_challenges_node_4"
              },
              {
                "uuid": "uuid_mod_instruct_challenges_exit_11",
                "destination_uuid": "uuid_mod_instruct_challenges_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_challenges_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "I know, our children need time to learn to follow instructions. Be patient, try again, and remember to praise them every time they follow an instruction!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_challenges_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_1",
                "destination_uuid": "uuid_mod_instruct_challenges_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_challenges_node_3",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instruct_challenges_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_5",
                "destination_uuid": "uuid_mod_instruct_challenges_node_7"
              },
              {
                "uuid": "uuid_mod_instruct_challenges_exit_6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_instruct_challenges_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_2"
                },
                {
                  "uuid": "uuid_mod_instruct_challenges_case_2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_3"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_instruct_challenges_category_2",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_5"
                },
                {
                  "uuid": "uuid_mod_instruct_challenges_category_3",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_instruct_challenges_category_2"
            }
          },
          {
            "uuid": "uuid_mod_instruct_challenges_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "I know, it takes some time to get used to giving positive instructions – it’s really worth trying again! Think about behaviour you would love to see your teen do more, and think of positive ways to give that instruction! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_challenges_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_8",
                "destination_uuid": "uuid_mod_instruct_challenges_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_challenges_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "It is difficult to come up with instructions while we are still angry. Try and find a time when you are calm to introduce a positive instruction to your teen.   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_challenges_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_10",
                "destination_uuid": "uuid_mod_instruct_challenges_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_challenges_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Next time we chat, we’ll talk more about how we can manage our emotions as well! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_challenges_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_12",
                "destination_uuid": "uuid_mod_instruct_challenges_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_challenges_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_mod_instruct_challenges_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_13",
                "destination_uuid": "uuid_mod_instruct_challenges_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_challenges_node_9",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_challenges_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_15",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_challenges_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_16",
                  "name": "Yes",
                  "uuid": "uuid_mod_instruct_challenges_category_8"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_challenges_category_7",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_15",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_challenges_exit_16",
                "destination_uuid": "uuid_mod_instruct_challenges_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_challenges_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "What other challenge did you have when trying to give a positive, simple and realistic instruction? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "My teenager did not want to follow the instruction",
                  "I did not find time to spend one-on-one time with my teen.",
                  "I gave a negative instead of a positive instruction",
                  "I shouted at my teen when they behaved negatively, instead of giving them a positive instruction for what they should do."
                ],
                "uuid": "uuid_mod_instruct_challenges_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_14",
                "destination_uuid": "uuid_mod_instruct_challenges_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_challenges_node_11",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "My teenager did not want to follow the instruction"
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_challenges_case_7"
                },
                {
                  "arguments": [
                    "I did not find time to spend one-on-one time with my teen."
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_11",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_challenges_case_8"
                },
                {
                  "arguments": [
                    "I gave a negative instead of a positive instruction"
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_challenges_case_9"
                },
                {
                  "arguments": [
                    "I shouted at my teen when they behaved negatively, instead of giving them a positive instruction for what they should do."
                  ],
                  "category_uuid": "uuid_mod_instruct_challenges_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_challenges_case_10"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_18",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_challenges_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_19",
                  "name": "My teenager did not want to follow the instruction",
                  "uuid": "uuid_mod_instruct_challenges_category_10"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_21",
                  "name": "I did not find time to spend one-on-one time with my teen.",
                  "uuid": "uuid_mod_instruct_challenges_category_11"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_23",
                  "name": "I gave a negative instead of a positive instruction",
                  "uuid": "uuid_mod_instruct_challenges_category_12"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_challenges_exit_25",
                  "name": "I shouted at my teen when they behaved negatively, instead of giving them a positive instruction for what they should do.",
                  "uuid": "uuid_mod_instruct_challenges_category_13"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_challenges_category_9",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_challenges_exit_18",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_challenges_exit_19",
                "destination_uuid": "uuid_mod_instruct_challenges_node_1"
              },
              {
                "uuid": "uuid_mod_instruct_challenges_exit_21",
                "destination_uuid": "uuid_mod_instruct_challenges_node_3"
              },
              {
                "uuid": "uuid_mod_instruct_challenges_exit_23",
                "destination_uuid": "uuid_mod_instruct_challenges_node_4"
              },
              {
                "uuid": "uuid_mod_instruct_challenges_exit_25",
                "destination_uuid": "uuid_mod_instruct_challenges_node_5"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "mod_instruct_fun",
        "uuid": "uuid_mod_instruct_fun_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instruct_fun_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Here is something fun to do with your teen!",
                "type": "send_msg",
                "quick_replies": [
                  "Chat together",
                  "Get active",
                  "Watch & sing"
                ],
                "uuid": "uuid_mod_instruct_fun_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_fun_exit_0",
                "destination_uuid": "uuid_mod_instruct_fun_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_fun_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "uuid_mod_instruct_fun_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_fun_case_0"
                },
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "uuid_mod_instruct_fun_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_fun_case_1"
                },
                {
                  "arguments": [
                    "Watch & sing"
                  ],
                  "category_uuid": "uuid_mod_instruct_fun_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instruct_fun_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instruct_fun_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instruct_fun_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_fun_exit_3",
                  "name": "Chat together",
                  "uuid": "uuid_mod_instruct_fun_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_fun_exit_5",
                  "name": "Get active",
                  "uuid": "uuid_mod_instruct_fun_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instruct_fun_exit_7",
                  "name": "Watch & sing",
                  "uuid": "uuid_mod_instruct_fun_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_mod_instruct_fun_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instruct_fun_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instruct_fun_exit_3",
                "destination_uuid": "uuid_mod_instruct_fun_node_1"
              },
              {
                "uuid": "uuid_mod_instruct_fun_exit_5",
                "destination_uuid": "uuid_mod_instruct_fun_node_3"
              },
              {
                "uuid": "uuid_mod_instruct_fun_exit_7",
                "destination_uuid": "uuid_mod_instruct_fun_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_fun_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Dream Travel \n- You can’t always travel but you can always dream! Ask your teen these questions.\n- Where do you want to travel? How long will you be away? What will you pack? What will you do? What will you see? \n- Look at a map together if you have one. \n- Choose a country that they’ve never heard of and find out about it.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_fun_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_fun_exit_1",
                "destination_uuid": "uuid_mod_instruct_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_fun_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Dance moves \n- Create a set of dance moves to your teen's favourite songs.\n- First person does a dance move and everyone else copies.\n- Everyone takes turns being the leader.\n- Perform it for the household!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_fun_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_fun_exit_4",
                "destination_uuid": "uuid_mod_instruct_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_fun_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Song...",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instruct_fun_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_fun_exit_6",
                "destination_uuid": "uuid_mod_instruct_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instruct_fun_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_instruct_fun_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instruct_fun__completed",
                  "name": "mod_instruct_fun__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instruct_fun_exit_8",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "homescreen",
        "uuid": "uuid_homescreen_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_homescreen_node_0",
            "actions": [
              {
                "uuid": "uuid_homescreen_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "module_list__completed",
                  "name": "module_list__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_homescreen_exit_0",
                "destination_uuid": "uuid_homescreen_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_homescreen_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/module_list",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_homescreen_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_homescreen_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "my_journey",
        "uuid": "uuid_my_journey_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_my_journey_node_0",
            "actions": [
              {
                "uuid": "uuid_my_journey_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "my_journey__completed",
                  "name": "my_journey__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_my_journey_exit_0",
                "destination_uuid": "uuid_my_journey_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_my_journey_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_my_journey_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_my_journey_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "toolbox",
        "uuid": "uuid_toolbox_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_toolbox_node_0",
            "actions": [
              {
                "uuid": "uuid_toolbox_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "toolbox__completed",
                  "name": "toolbox__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_exit_0",
                "destination_uuid": "uuid_toolbox_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_toolbox_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_toolbox_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "toolbox_mod_1on1_tips",
        "uuid": "uuid_toolbox_mod_1on1_tips_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_toolbox_mod_1on1_tips_node_0",
            "actions": [
              {
                "uuid": "uuid_toolbox_mod_1on1_tips_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_tips__completed",
                  "name": "mod_1on1_tips__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_mod_1on1_tips_exit_0",
                "destination_uuid": "uuid_toolbox_mod_1on1_tips_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_toolbox_mod_1on1_tips_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/tips/mod_1on1_tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_toolbox_mod_1on1_tips_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_mod_1on1_tips_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "toolbox_mod_praise_tips",
        "uuid": "uuid_toolbox_mod_praise_tips_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_toolbox_mod_praise_tips_node_0",
            "actions": [
              {
                "uuid": "uuid_toolbox_mod_praise_tips_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_praise_tips__completed",
                  "name": "mod_praise_tips__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_mod_praise_tips_exit_0",
                "destination_uuid": "uuid_toolbox_mod_praise_tips_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_toolbox_mod_praise_tips_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/tips/mod_praise_tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_toolbox_mod_praise_tips_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_mod_praise_tips_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "toolbox_mod_instruct_tips",
        "uuid": "uuid_toolbox_mod_instruct_tips_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_toolbox_mod_instruct_tips_node_0",
            "actions": [
              {
                "uuid": "uuid_toolbox_mod_instruct_tips_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_tips__completed",
                  "name": "mod_instructions_tips__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_mod_instruct_tips_exit_0",
                "destination_uuid": "uuid_toolbox_mod_instruct_tips_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_toolbox_mod_instruct_tips_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/tips/mod_instruct_tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_toolbox_mod_instruct_tips_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_mod_instruct_tips_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "gallery",
        "uuid": "uuid_gallery_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_gallery_node_0",
            "actions": [
              {
                "uuid": "uuid_gallery_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "gallery__completed",
                  "name": "gallery__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_gallery_exit_0",
                "destination_uuid": "uuid_gallery_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_gallery_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_gallery_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_gallery_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "link_mod_welcome_page",
        "uuid": "uuid_link_mod_welcome_page_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_link_mod_welcome_page_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/module_page/mod_welcome_page",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_link_mod_welcome_page_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_link_mod_welcome_page_exit_0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "link_mod_1on1_page",
        "uuid": "uuid_link_mod_1on1_page_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_link_mod_1on1_page_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/module_page/mod_1on1_page",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_link_mod_1on1_page_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_link_mod_1on1_page_exit_0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "link_mod_praise_page",
        "uuid": "uuid_link_mod_praise_page_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_link_mod_praise_page_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/module_page/mod_praise_page",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_link_mod_praise_page_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_link_mod_praise_page_exit_0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "link_mod_instruct_page",
        "uuid": "uuid_link_mod_instruct_page_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_link_mod_instruct_page_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/module_page/mod_instruct_page",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_link_mod_instruct_page_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_link_mod_instruct_page_exit_0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "calm_random",
        "uuid": "uuid_calm_random_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_calm_random_node_0",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_calm_random_exit_4",
                "destination_uuid": "uuid_calm_random_node_1"
              },
              {
                "uuid": "uuid_calm_random_exit_8",
                "destination_uuid": "uuid_calm_random_node_2"
              },
              {
                "uuid": "uuid_calm_random_exit_12",
                "destination_uuid": "uuid_calm_random_node_3"
              },
              {
                "uuid": "uuid_calm_random_exit_16",
                "destination_uuid": "uuid_calm_random_node_4"
              },
              {
                "uuid": "uuid_calm_random_exit_20",
                "destination_uuid": "uuid_calm_random_node_5"
              },
              {
                "uuid": "uuid_calm_random_exit_24",
                "destination_uuid": "uuid_calm_random_node_6"
              }
            ],
            "router": {
              "type": "random",
              "cases": [],
              "categories": [
                {
                  "exit_uuid": "uuid_calm_random_exit_4",
                  "name": "1",
                  "uuid": "uuid_calm_random_category_2"
                },
                {
                  "exit_uuid": "uuid_calm_random_exit_8",
                  "name": "2",
                  "uuid": "uuid_calm_random_category_5"
                },
                {
                  "exit_uuid": "uuid_calm_random_exit_12",
                  "name": "3",
                  "uuid": "uuid_calm_random_category_8"
                },
                {
                  "exit_uuid": "uuid_calm_random_exit_16",
                  "name": "4",
                  "uuid": "uuid_calm_random_category_11"
                },
                {
                  "exit_uuid": "uuid_calm_random_exit_20",
                  "name": "5",
                  "uuid": "uuid_calm_random_category_14"
                },
                {
                  "exit_uuid": "uuid_calm_random_exit_24",
                  "name": "6",
                  "uuid": "uuid_calm_random_category_17"
                }
              ]
            }
          },
          {
            "uuid": "uuid_calm_random_node_1",
            "actions": [
              {
                "flow": {
                  "name": "calm_1"
                },
                "type": "enter_flow",
                "uuid": "uuid_calm_random_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_random_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_calm_random_exit_3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_calm_random_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_calm_random_category_0"
                },
                {
                  "uuid": "uuid_calm_random_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_calm_random_category_1"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_calm_random_category_0",
                  "name": "Complete",
                  "exit_uuid": "uuid_calm_random_exit_2"
                },
                {
                  "uuid": "uuid_calm_random_category_1",
                  "name": "Expired",
                  "exit_uuid": "uuid_calm_random_exit_3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_calm_random_category_0"
            }
          },
          {
            "uuid": "uuid_calm_random_node_2",
            "actions": [
              {
                "flow": {
                  "name": "calm_2"
                },
                "type": "enter_flow",
                "uuid": "uuid_calm_random_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_random_exit_6",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_calm_random_exit_7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_calm_random_case_2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_calm_random_category_3"
                },
                {
                  "uuid": "uuid_calm_random_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_calm_random_category_4"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_calm_random_category_3",
                  "name": "Complete",
                  "exit_uuid": "uuid_calm_random_exit_6"
                },
                {
                  "uuid": "uuid_calm_random_category_4",
                  "name": "Expired",
                  "exit_uuid": "uuid_calm_random_exit_7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_calm_random_category_3"
            }
          },
          {
            "uuid": "uuid_calm_random_node_3",
            "actions": [
              {
                "flow": {
                  "name": "calm_3"
                },
                "type": "enter_flow",
                "uuid": "uuid_calm_random_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_random_exit_10",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_calm_random_exit_11",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_calm_random_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_calm_random_category_6"
                },
                {
                  "uuid": "uuid_calm_random_case_5",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_calm_random_category_7"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_calm_random_category_6",
                  "name": "Complete",
                  "exit_uuid": "uuid_calm_random_exit_10"
                },
                {
                  "uuid": "uuid_calm_random_category_7",
                  "name": "Expired",
                  "exit_uuid": "uuid_calm_random_exit_11"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_calm_random_category_6"
            }
          },
          {
            "uuid": "uuid_calm_random_node_4",
            "actions": [
              {
                "flow": {
                  "name": "calm_4"
                },
                "type": "enter_flow",
                "uuid": "uuid_calm_random_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_random_exit_14",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_calm_random_exit_15",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_calm_random_case_6",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_calm_random_category_9"
                },
                {
                  "uuid": "uuid_calm_random_case_7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_calm_random_category_10"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_calm_random_category_9",
                  "name": "Complete",
                  "exit_uuid": "uuid_calm_random_exit_14"
                },
                {
                  "uuid": "uuid_calm_random_category_10",
                  "name": "Expired",
                  "exit_uuid": "uuid_calm_random_exit_15"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_calm_random_category_9"
            }
          },
          {
            "uuid": "uuid_calm_random_node_5",
            "actions": [
              {
                "flow": {
                  "name": "calm_5"
                },
                "type": "enter_flow",
                "uuid": "uuid_calm_random_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_random_exit_18",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_calm_random_exit_19",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_calm_random_case_8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_calm_random_category_12"
                },
                {
                  "uuid": "uuid_calm_random_case_9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_calm_random_category_13"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_calm_random_category_12",
                  "name": "Complete",
                  "exit_uuid": "uuid_calm_random_exit_18"
                },
                {
                  "uuid": "uuid_calm_random_category_13",
                  "name": "Expired",
                  "exit_uuid": "uuid_calm_random_exit_19"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_calm_random_category_12"
            }
          },
          {
            "uuid": "uuid_calm_random_node_6",
            "actions": [
              {
                "flow": {
                  "name": "calm_6"
                },
                "type": "enter_flow",
                "uuid": "uuid_calm_random_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_random_exit_22",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_calm_random_exit_23",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_calm_random_case_10",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_calm_random_category_15"
                },
                {
                  "uuid": "uuid_calm_random_case_11",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_calm_random_category_16"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_calm_random_category_15",
                  "name": "Complete",
                  "exit_uuid": "uuid_calm_random_exit_22"
                },
                {
                  "uuid": "uuid_calm_random_category_16",
                  "name": "Expired",
                  "exit_uuid": "uuid_calm_random_exit_23"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_calm_random_category_15"
            }
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "calm_1",
        "uuid": "uuid_calm_1_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_calm_1_node_0",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/seated.svg"
                ],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_1_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_1_exit_0",
                "destination_uuid": "uuid_calm_1_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_calm_1_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Try this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_1_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_1_exit_1",
                "destination_uuid": "uuid_calm_1_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_calm_1_node_2",
            "actions": [
              {
                "uuid": "uuid_calm_1_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "calm_1__completed",
                  "name": "calm_1__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_1_exit_2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "calm_2",
        "uuid": "uuid_calm_2_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_calm_2_node_0",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/seated.svg"
                ],
                "text": "Let's use the magic power of three to stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_2_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_2_exit_0",
                "destination_uuid": "uuid_calm_2_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_calm_2_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_2_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_2_exit_1",
                "destination_uuid": "uuid_calm_2_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_calm_2_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_2_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_2_exit_2",
                "destination_uuid": "uuid_calm_2_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_calm_2_node_3",
            "actions": [
              {
                "uuid": "uuid_calm_2_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "calm_2__completed",
                  "name": "calm_2__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_2_exit_3",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "calm_3",
        "uuid": "uuid_calm_3_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_calm_3_node_0",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/seated.svg"
                ],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_3_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_3_exit_0",
                "destination_uuid": "uuid_calm_3_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_calm_3_node_1",
            "actions": [
              {
                "uuid": "uuid_calm_3_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "calm_3__completed",
                  "name": "calm_3__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_3_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "calm_4",
        "uuid": "uuid_calm_4_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_calm_4_node_0",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/seated.svg"
                ],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_4_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_4_exit_0",
                "destination_uuid": "uuid_calm_4_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_calm_4_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreathe out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreathe out to the count of three. 1, 2, 3. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_4_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_4_exit_1",
                "destination_uuid": "uuid_calm_4_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_calm_4_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "Do you feel any different? Deep breathing helps our whole body and mind to calm down. \n\nYou are a star!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_4_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_4_exit_2",
                "destination_uuid": "uuid_calm_4_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_calm_4_node_3",
            "actions": [
              {
                "uuid": "uuid_calm_4_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "calm_4__completed",
                  "name": "calm_4__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_4_exit_3",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "calm_5",
        "uuid": "uuid_calm_5_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_calm_5_node_0",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/seated.svg"
                ],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_5_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_5_exit_0",
                "destination_uuid": "uuid_calm_5_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_calm_5_node_1",
            "actions": [
              {
                "uuid": "uuid_calm_5_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "calm_5__completed",
                  "name": "calm_5__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_5_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_random",
        "uuid": "uuid_praise_random_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_random_node_0",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_praise_random_exit_4",
                "destination_uuid": "uuid_praise_random_node_1"
              },
              {
                "uuid": "uuid_praise_random_exit_8",
                "destination_uuid": "uuid_praise_random_node_2"
              },
              {
                "uuid": "uuid_praise_random_exit_12",
                "destination_uuid": "uuid_praise_random_node_3"
              },
              {
                "uuid": "uuid_praise_random_exit_16",
                "destination_uuid": "uuid_praise_random_node_4"
              },
              {
                "uuid": "uuid_praise_random_exit_20",
                "destination_uuid": "uuid_praise_random_node_5"
              },
              {
                "uuid": "uuid_praise_random_exit_24",
                "destination_uuid": "uuid_praise_random_node_6"
              },
              {
                "uuid": "uuid_praise_random_exit_28",
                "destination_uuid": "uuid_praise_random_node_7"
              }
            ],
            "router": {
              "type": "random",
              "cases": [],
              "categories": [
                {
                  "exit_uuid": "uuid_praise_random_exit_4",
                  "name": "1",
                  "uuid": "uuid_praise_random_category_2"
                },
                {
                  "exit_uuid": "uuid_praise_random_exit_8",
                  "name": "2",
                  "uuid": "uuid_praise_random_category_5"
                },
                {
                  "exit_uuid": "uuid_praise_random_exit_12",
                  "name": "3",
                  "uuid": "uuid_praise_random_category_8"
                },
                {
                  "exit_uuid": "uuid_praise_random_exit_16",
                  "name": "4",
                  "uuid": "uuid_praise_random_category_11"
                },
                {
                  "exit_uuid": "uuid_praise_random_exit_20",
                  "name": "5",
                  "uuid": "uuid_praise_random_category_14"
                },
                {
                  "exit_uuid": "uuid_praise_random_exit_24",
                  "name": "6",
                  "uuid": "uuid_praise_random_category_17"
                },
                {
                  "exit_uuid": "uuid_praise_random_exit_28",
                  "name": "7",
                  "uuid": "uuid_praise_random_category_20"
                }
              ]
            }
          },
          {
            "uuid": "uuid_praise_random_node_1",
            "actions": [
              {
                "flow": {
                  "name": "praise_1"
                },
                "type": "enter_flow",
                "uuid": "uuid_praise_random_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_random_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_praise_random_exit_3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_praise_random_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_praise_random_category_0"
                },
                {
                  "uuid": "uuid_praise_random_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_praise_random_category_1"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_praise_random_category_0",
                  "name": "Complete",
                  "exit_uuid": "uuid_praise_random_exit_2"
                },
                {
                  "uuid": "uuid_praise_random_category_1",
                  "name": "Expired",
                  "exit_uuid": "uuid_praise_random_exit_3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_praise_random_category_0"
            }
          },
          {
            "uuid": "uuid_praise_random_node_2",
            "actions": [
              {
                "flow": {
                  "name": "praise_2"
                },
                "type": "enter_flow",
                "uuid": "uuid_praise_random_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_random_exit_6",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_praise_random_exit_7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_praise_random_case_2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_praise_random_category_3"
                },
                {
                  "uuid": "uuid_praise_random_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_praise_random_category_4"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_praise_random_category_3",
                  "name": "Complete",
                  "exit_uuid": "uuid_praise_random_exit_6"
                },
                {
                  "uuid": "uuid_praise_random_category_4",
                  "name": "Expired",
                  "exit_uuid": "uuid_praise_random_exit_7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_praise_random_category_3"
            }
          },
          {
            "uuid": "uuid_praise_random_node_3",
            "actions": [
              {
                "flow": {
                  "name": "praise_3"
                },
                "type": "enter_flow",
                "uuid": "uuid_praise_random_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_random_exit_10",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_praise_random_exit_11",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_praise_random_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_praise_random_category_6"
                },
                {
                  "uuid": "uuid_praise_random_case_5",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_praise_random_category_7"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_praise_random_category_6",
                  "name": "Complete",
                  "exit_uuid": "uuid_praise_random_exit_10"
                },
                {
                  "uuid": "uuid_praise_random_category_7",
                  "name": "Expired",
                  "exit_uuid": "uuid_praise_random_exit_11"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_praise_random_category_6"
            }
          },
          {
            "uuid": "uuid_praise_random_node_4",
            "actions": [
              {
                "flow": {
                  "name": "praise_4"
                },
                "type": "enter_flow",
                "uuid": "uuid_praise_random_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_random_exit_14",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_praise_random_exit_15",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_praise_random_case_6",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_praise_random_category_9"
                },
                {
                  "uuid": "uuid_praise_random_case_7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_praise_random_category_10"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_praise_random_category_9",
                  "name": "Complete",
                  "exit_uuid": "uuid_praise_random_exit_14"
                },
                {
                  "uuid": "uuid_praise_random_category_10",
                  "name": "Expired",
                  "exit_uuid": "uuid_praise_random_exit_15"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_praise_random_category_9"
            }
          },
          {
            "uuid": "uuid_praise_random_node_5",
            "actions": [
              {
                "flow": {
                  "name": "praise_5"
                },
                "type": "enter_flow",
                "uuid": "uuid_praise_random_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_random_exit_18",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_praise_random_exit_19",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_praise_random_case_8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_praise_random_category_12"
                },
                {
                  "uuid": "uuid_praise_random_case_9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_praise_random_category_13"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_praise_random_category_12",
                  "name": "Complete",
                  "exit_uuid": "uuid_praise_random_exit_18"
                },
                {
                  "uuid": "uuid_praise_random_category_13",
                  "name": "Expired",
                  "exit_uuid": "uuid_praise_random_exit_19"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_praise_random_category_12"
            }
          },
          {
            "uuid": "uuid_praise_random_node_6",
            "actions": [
              {
                "flow": {
                  "name": "praise_6"
                },
                "type": "enter_flow",
                "uuid": "uuid_praise_random_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_random_exit_22",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_praise_random_exit_23",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_praise_random_case_10",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_praise_random_category_15"
                },
                {
                  "uuid": "uuid_praise_random_case_11",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_praise_random_category_16"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_praise_random_category_15",
                  "name": "Complete",
                  "exit_uuid": "uuid_praise_random_exit_22"
                },
                {
                  "uuid": "uuid_praise_random_category_16",
                  "name": "Expired",
                  "exit_uuid": "uuid_praise_random_exit_23"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_praise_random_category_15"
            }
          },
          {
            "uuid": "uuid_praise_random_node_7",
            "actions": [
              {
                "flow": {
                  "name": "praise_7"
                },
                "type": "enter_flow",
                "uuid": "uuid_praise_random_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_random_exit_26",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_praise_random_exit_27",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_praise_random_case_12",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_praise_random_category_18"
                },
                {
                  "uuid": "uuid_praise_random_case_13",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_praise_random_category_19"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_praise_random_category_18",
                  "name": "Complete",
                  "exit_uuid": "uuid_praise_random_exit_26"
                },
                {
                  "uuid": "uuid_praise_random_category_19",
                  "name": "Expired",
                  "exit_uuid": "uuid_praise_random_exit_27"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_praise_random_category_18"
            }
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_1",
        "uuid": "uuid_praise_1_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_1_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_1_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_1_exit_0",
                "destination_uuid": "uuid_praise_1_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_1_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_1_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_1__completed",
                  "name": "praise_1__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_1_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_2",
        "uuid": "uuid_praise_2_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_2_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_2_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_2_exit_0",
                "destination_uuid": "uuid_praise_2_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_2_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_2_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_2__completed",
                  "name": "praise_2__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_2_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_3",
        "uuid": "uuid_praise_3_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_3_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_3_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_3_exit_0",
                "destination_uuid": "uuid_praise_3_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_3_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_3_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_3__completed",
                  "name": "praise_3__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_3_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_4",
        "uuid": "uuid_praise_4_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_4_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_4_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_4_exit_0",
                "destination_uuid": "uuid_praise_4_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_4_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_4_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_4__completed",
                  "name": "praise_4__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_4_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_5",
        "uuid": "uuid_praise_5_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_5_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_5_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_5_exit_0",
                "destination_uuid": "uuid_praise_5_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_5_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_5_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_5__completed",
                  "name": "praise_5__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_5_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_6",
        "uuid": "uuid_praise_6_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_6_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_6_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_6_exit_0",
                "destination_uuid": "uuid_praise_6_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_6_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_6_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_6__completed",
                  "name": "praise_6__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_6_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_7",
        "uuid": "uuid_praise_7_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_7_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazingly! Remember it's the small things that make a big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_7_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_7_exit_0",
                "destination_uuid": "uuid_praise_7_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_7_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_7_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_7__completed",
                  "name": "praise_7__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_7_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_8",
        "uuid": "uuid_praise_8_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_8_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_8_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_8_exit_0",
                "destination_uuid": "uuid_praise_8_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_8_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_8_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_8__completed",
                  "name": "praise_8__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_8_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_9",
        "uuid": "uuid_praise_9_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_9_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for getting to the end of the day! Sometimes that’s all we can do. Get some rest and try again tomorrow!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_9_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_9_exit_0",
                "destination_uuid": "uuid_praise_9_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_9_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_9_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_9__completed",
                  "name": "praise_9__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_9_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_10",
        "uuid": "uuid_praise_10_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_10_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Hooray! Trust that your hard work is bearing sweet fruits, even if you can’t taste them yet!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_10_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_10_exit_0",
                "destination_uuid": "uuid_praise_10_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_10_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_10_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_10__completed",
                  "name": "praise_10__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_10_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_11",
        "uuid": "uuid_praise_11_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_11_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_11_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_11_exit_0",
                "destination_uuid": "uuid_praise_11_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_11_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_11_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_11__completed",
                  "name": "praise_11__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_11_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_12",
        "uuid": "uuid_praise_12_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_12_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Every time you take a pause, it is an act of kindness to yourself and your family. Thank you for being kind to yourself and your family today!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_12_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_12_exit_0",
                "destination_uuid": "uuid_praise_12_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_12_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_12_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_12__completed",
                  "name": "praise_12__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_12_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_13",
        "uuid": "uuid_praise_13_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_13_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "It’s the end of the day! You did it! Now it’s time for you. You deserve a break!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_13_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_13_exit_0",
                "destination_uuid": "uuid_praise_13_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_13_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_13_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_13__completed",
                  "name": "praise_13__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_13_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_14",
        "uuid": "uuid_praise_14_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_14_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_14_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_14_exit_0",
                "destination_uuid": "uuid_praise_14_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_14_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_14_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_14__completed",
                  "name": "praise_14__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_14_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_15",
        "uuid": "uuid_praise_15_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_15_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "There’s no such thing as a perfect parent or the perfect child. We are all just trying our best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_15_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_15_exit_0",
                "destination_uuid": "uuid_praise_15_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_15_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_15_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_15__completed",
                  "name": "praise_15__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_15_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_16",
        "uuid": "uuid_praise_16_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_16_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it’s the small things that make a big difference. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_16_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_16_exit_0",
                "destination_uuid": "uuid_praise_16_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_16_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_16_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_16__completed",
                  "name": "praise_16__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_16_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_17",
        "uuid": "uuid_praise_17_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_17_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_17_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_17_exit_0",
                "destination_uuid": "uuid_praise_17_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_17_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_17_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_17__completed",
                  "name": "praise_17__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_17_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_18",
        "uuid": "uuid_praise_18_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_18_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for bringing the sunshine of positive attention into your family. Keep shining! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_18_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_18_exit_0",
                "destination_uuid": "uuid_praise_18_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_18_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_18_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_18__completed",
                  "name": "praise_18__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_18_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_19",
        "uuid": "uuid_praise_19_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_19_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Whatever you feel you did ‘wrong’ today, let it go and try again tomorrow. It’s ok!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_19_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_19_exit_0",
                "destination_uuid": "uuid_praise_19_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_19_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_19_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_19__completed",
                  "name": "praise_19__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_19_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_20",
        "uuid": "uuid_praise_20_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_20_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "You made a difference today by showing up. Your down time starts now! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_20_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_20_exit_0",
                "destination_uuid": "uuid_praise_20_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_20_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_20_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_20__completed",
                  "name": "praise_20__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_20_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_21",
        "uuid": "uuid_praise_21_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_21_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_21_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_21_exit_0",
                "destination_uuid": "uuid_praise_21_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_21_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_21_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_21__completed",
                  "name": "praise_21__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_21_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_22",
        "uuid": "uuid_praise_22_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_22_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is taking care of your kids! Well done for taking a pause today. Keep it up!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_22_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_22_exit_0",
                "destination_uuid": "uuid_praise_22_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_22_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_22_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_22__completed",
                  "name": "praise_22__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_22_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_23",
        "uuid": "uuid_praise_23_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_23_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Has anyone told you how incredible you are for being there for your children during a global pandemic? There’s no guidebook for these challenging times but you’re doing it! That makes you amazing.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_23_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_23_exit_0",
                "destination_uuid": "uuid_praise_23_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_23_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_23_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_23__completed",
                  "name": "praise_23__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_23_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_24",
        "uuid": "uuid_praise_24_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_24_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "There’s no such thing as a perfect parent. Speak kindly to yourself about what a great job you are doing. We think you’re doing great! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_24_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_24_exit_0",
                "destination_uuid": "uuid_praise_24_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_24_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_24_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_24__completed",
                  "name": "praise_24__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_24_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_25",
        "uuid": "uuid_praise_25_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_25_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for being patient with yourself and your family. Every little bit helps!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_25_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_25_exit_0",
                "destination_uuid": "uuid_praise_25_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_25_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_25_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_25__completed",
                  "name": "praise_25__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_25_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_26",
        "uuid": "uuid_praise_26_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_26_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Ten points for you today! Together we can overcome any challenge. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_26_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_26_exit_0",
                "destination_uuid": "uuid_praise_26_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_26_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_26_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_26__completed",
                  "name": "praise_26__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_26_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_27",
        "uuid": "uuid_praise_27_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_27_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for spending One-on-One time with your family! Time is the most valuable gift you can give them.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_27_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_27_exit_0",
                "destination_uuid": "uuid_praise_27_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_27_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_27_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_27__completed",
                  "name": "praise_27__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_27_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_28",
        "uuid": "uuid_praise_28_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_28_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Top marks for effort! It’s not easy but you tried your best. That’s all you can ever do! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_28_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_28_exit_0",
                "destination_uuid": "uuid_praise_28_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_28_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_28_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_28__completed",
                  "name": "praise_28__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_28_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_29",
        "uuid": "uuid_praise_29_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_29_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for your kindness and patience today! Even when it’s tough, your words of praise, your smile and your attention are like sunshine for your children. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_29_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_29_exit_0",
                "destination_uuid": "uuid_praise_29_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_29_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_29_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_29__completed",
                  "name": "praise_29__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_29_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_30",
        "uuid": "uuid_praise_30_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_30_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Your curiosity and creativity are paying off! Give yourself a hug! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_30_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_30_exit_0",
                "destination_uuid": "uuid_praise_30_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_30_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_30_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_30__completed",
                  "name": "praise_30__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_30_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_31",
        "uuid": "uuid_praise_31_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_31_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Hooray! Other women around the world are cheering for you right now!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_31_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_31_exit_0",
                "destination_uuid": "uuid_praise_31_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_31_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_31_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_31__completed",
                  "name": "praise_31__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_31_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_32",
        "uuid": "uuid_praise_32_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_32_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing so much strength and sharing it with your family.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_32_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_32_exit_0",
                "destination_uuid": "uuid_praise_32_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_32_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_32_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_32__completed",
                  "name": "praise_32__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_32_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_33",
        "uuid": "uuid_praise_33_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_33_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for being an inspiration to others. Keep shining!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_33_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_33_exit_0",
                "destination_uuid": "uuid_praise_33_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_33_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_33_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_33__completed",
                  "name": "praise_33__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_33_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_34",
        "uuid": "uuid_praise_34_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_34_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for your dedication! The world needs more people like you.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_34_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_34_exit_0",
                "destination_uuid": "uuid_praise_34_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_34_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_34_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_34__completed",
                  "name": "praise_34__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_34_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_35",
        "uuid": "uuid_praise_35_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_35_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "It’s not always easy to be a woman in this world. But you are leading the way!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_35_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_35_exit_0",
                "destination_uuid": "uuid_praise_35_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_35_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_35_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_35__completed",
                  "name": "praise_35__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_35_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_36",
        "uuid": "uuid_praise_36_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_36_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Fake it until you make it, Mama!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_36_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_36_exit_0",
                "destination_uuid": "uuid_praise_36_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_36_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_36_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_36__completed",
                  "name": "praise_36__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_36_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_37",
        "uuid": "uuid_praise_37_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_37_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for being a superman and being there for your family today! Keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_37_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_37_exit_0",
                "destination_uuid": "uuid_praise_37_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_37_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_37_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_37__completed",
                  "name": "praise_37__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_37_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_38",
        "uuid": "uuid_praise_38_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_38_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for being a man who supports their family. You are a real hero.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_38_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_38_exit_0",
                "destination_uuid": "uuid_praise_38_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_38_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_38_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_38__completed",
                  "name": "praise_38__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_38_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_39",
        "uuid": "uuid_praise_39_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_39_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "You’re a man who puts a lot of thought into everything you do. We see it and appreciate it.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_39_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_39_exit_0",
                "destination_uuid": "uuid_praise_39_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_39_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_39_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_39__completed",
                  "name": "praise_39__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_39_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_40",
        "uuid": "uuid_praise_40_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_40_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for your dedication! The world needs more men like you.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_40_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_40_exit_0",
                "destination_uuid": "uuid_praise_40_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_40_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_40_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_40__completed",
                  "name": "praise_40__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_40_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_41",
        "uuid": "uuid_praise_41_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_41_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "You are such a great example for all men! Keep up the good work.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_41_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_41_exit_0",
                "destination_uuid": "uuid_praise_41_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_41_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_41_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_41__completed",
                  "name": "praise_41__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_41_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_42",
        "uuid": "uuid_praise_42_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_42_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Your commitment is an inspiration for all men. Keep calm and carry on!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_42_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_42_exit_0",
                "destination_uuid": "uuid_praise_42_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_42_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_42_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_42__completed",
                  "name": "praise_42__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_42_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_43",
        "uuid": "uuid_praise_43_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_43_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.  Nobody is doing this perfectly.  Take a moment to praise yourself for not giving up.  You are a real star!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_43_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_43_exit_0",
                "destination_uuid": "uuid_praise_43_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_43_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_43_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_43__completed",
                  "name": "praise_43__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_43_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_44",
        "uuid": "uuid_praise_44_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_44_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it feels like even though you do the best you can, your kids are still grumpy. Remember that you are doing an amazing job, and that there will be good times too!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_44_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_44_exit_0",
                "destination_uuid": "uuid_praise_44_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_44_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_44_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_44__completed",
                  "name": "praise_44__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_44_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_45",
        "uuid": "uuid_praise_45_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_45_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Remember to be proud of yourself for every good moment of parenting.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_45_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_45_exit_0",
                "destination_uuid": "uuid_praise_45_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_45_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_45_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_45__completed",
                  "name": "praise_45__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_45_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_46",
        "uuid": "uuid_praise_46_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_46_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "There is no such thing as a perfect parent. We are proud of you for trying your best.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_46_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_46_exit_0",
                "destination_uuid": "uuid_praise_46_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_46_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_46_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_46__completed",
                  "name": "praise_46__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_46_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_47",
        "uuid": "uuid_praise_47_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_47_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for being committed to improving the life of your child. It shows you really care!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_47_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_47_exit_0",
                "destination_uuid": "uuid_praise_47_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_47_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_47_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_47__completed",
                  "name": "praise_47__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_47_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "praise_48",
        "uuid": "uuid_praise_48_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_praise_48_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "You are amazing. Don't forget it.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_praise_48_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_48_exit_0",
                "destination_uuid": "uuid_praise_48_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_praise_48_node_1",
            "actions": [
              {
                "uuid": "uuid_praise_48_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "praise_48__completed",
                  "name": "praise_48__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_praise_48_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "error_nested_flows_parent",
        "uuid": "uuid_error_nested_flows_parent_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_error_nested_flows_parent_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "I'm going to go to a child flow",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_error_nested_flows_parent_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_nested_flows_parent_exit_0",
                "destination_uuid": "uuid_error_nested_flows_parent_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_error_nested_flows_parent_node_1",
            "actions": [
              {
                "flow": {
                  "name": "error_nested_flows_child"
                },
                "type": "enter_flow",
                "uuid": "uuid_error_nested_flows_parent_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_nested_flows_parent_exit_2",
                "destination_uuid": "uuid_error_nested_flows_parent_node_2"
              },
              {
                "uuid": "uuid_error_nested_flows_parent_exit_3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_error_nested_flows_parent_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_error_nested_flows_parent_category_0"
                },
                {
                  "uuid": "uuid_error_nested_flows_parent_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_error_nested_flows_parent_category_1"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_error_nested_flows_parent_category_0",
                  "name": "Complete",
                  "exit_uuid": "uuid_error_nested_flows_parent_exit_2"
                },
                {
                  "uuid": "uuid_error_nested_flows_parent_category_1",
                  "name": "Expired",
                  "exit_uuid": "uuid_error_nested_flows_parent_exit_3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_error_nested_flows_parent_category_0"
            }
          },
          {
            "uuid": "uuid_error_nested_flows_parent_node_2",
            "actions": [
              {
                "uuid": "uuid_error_nested_flows_parent_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "error_nested_flows_parent__completed",
                  "name": "error_nested_flows_parent__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_nested_flows_parent_exit_4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "error_nested_flows_child",
        "uuid": "uuid_error_nested_flows_child_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_error_nested_flows_child_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "I'm taking you to calm_1",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_error_nested_flows_child_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_nested_flows_child_exit_0",
                "destination_uuid": "uuid_error_nested_flows_child_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_error_nested_flows_child_node_1",
            "actions": [
              {
                "flow": {
                  "name": "calm_1"
                },
                "type": "enter_flow",
                "uuid": "uuid_error_nested_flows_child_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_nested_flows_child_exit_2",
                "destination_uuid": "uuid_error_nested_flows_child_node_2"
              },
              {
                "uuid": "uuid_error_nested_flows_child_exit_3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_error_nested_flows_child_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_error_nested_flows_child_category_0"
                },
                {
                  "uuid": "uuid_error_nested_flows_child_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_error_nested_flows_child_category_1"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_error_nested_flows_child_category_0",
                  "name": "Complete",
                  "exit_uuid": "uuid_error_nested_flows_child_exit_2"
                },
                {
                  "uuid": "uuid_error_nested_flows_child_category_1",
                  "name": "Expired",
                  "exit_uuid": "uuid_error_nested_flows_child_exit_3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_error_nested_flows_child_category_0"
            }
          },
          {
            "uuid": "uuid_error_nested_flows_child_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "I came back from calm_1",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_error_nested_flows_child_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_nested_flows_child_exit_4",
                "destination_uuid": "uuid_error_nested_flows_child_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_error_nested_flows_child_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "I'm taking you to a tip sheet",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_error_nested_flows_child_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_nested_flows_child_exit_5",
                "destination_uuid": "uuid_error_nested_flows_child_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_error_nested_flows_child_node_4",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips"
                },
                "type": "enter_flow",
                "uuid": "uuid_error_nested_flows_child_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_nested_flows_child_exit_7",
                "destination_uuid": "uuid_error_nested_flows_child_node_5"
              },
              {
                "uuid": "uuid_error_nested_flows_child_exit_8",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_error_nested_flows_child_case_2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_error_nested_flows_child_category_2"
                },
                {
                  "uuid": "uuid_error_nested_flows_child_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_error_nested_flows_child_category_3"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_error_nested_flows_child_category_2",
                  "name": "Complete",
                  "exit_uuid": "uuid_error_nested_flows_child_exit_7"
                },
                {
                  "uuid": "uuid_error_nested_flows_child_category_3",
                  "name": "Expired",
                  "exit_uuid": "uuid_error_nested_flows_child_exit_8"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_error_nested_flows_child_category_2"
            }
          },
          {
            "uuid": "uuid_error_nested_flows_child_node_5",
            "actions": [
              {
                "uuid": "uuid_error_nested_flows_child_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "error_nested_flows_child__completed",
                  "name": "error_nested_flows_child__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_nested_flows_child_exit_9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "error_message_trim",
        "uuid": "uuid_error_message_trim_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_error_message_trim_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the error message trim flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_error_message_trim_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_message_trim_exit_0",
                "destination_uuid": "uuid_error_message_trim_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_error_message_trim_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "This text is not followed by a line break.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_error_message_trim_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_message_trim_exit_1",
                "destination_uuid": "uuid_error_message_trim_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_error_message_trim_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "This text is followed by one line break.\n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_error_message_trim_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_message_trim_exit_2",
                "destination_uuid": "uuid_error_message_trim_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_error_message_trim_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "This text is followed by two line breaks.\n\n\n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_error_message_trim_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_message_trim_exit_3",
                "destination_uuid": "uuid_error_message_trim_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_error_message_trim_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "This text is followed by many spaces                                                                                                            ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_error_message_trim_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_error_message_trim_exit_4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "uuid_example_main_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_main_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_main_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_0",
                "destination_uuid": "uuid_example_main_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_main_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question.",
                "type": "send_msg",
                "quick_replies": [
                  "First option: launch example_media flow",
                  "Second option: launch example_tickbox flow",
                  "Third option: launch example_variables flow",
                  "Fourth option: launch example_story flow",
                  "Stay in this flow."
                ],
                "uuid": "uuid_example_main_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_1",
                "destination_uuid": "uuid_example_main_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_main_node_3",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "uuid_example_main_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_main_case_2"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "uuid_example_main_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_main_case_5"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "uuid_example_main_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_main_case_8"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "uuid_example_main_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_main_case_11"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "uuid_example_main_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_main_case_12"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_main_exit_5",
                  "name": "All Responses",
                  "uuid": "uuid_example_main_category_2"
                },
                {
                  "exit_uuid": "uuid_example_main_exit_6",
                  "name": "First option: launch example_media flow",
                  "uuid": "uuid_example_main_category_3"
                },
                {
                  "exit_uuid": "uuid_example_main_exit_10",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "uuid_example_main_category_6"
                },
                {
                  "exit_uuid": "uuid_example_main_exit_14",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "uuid_example_main_category_9"
                },
                {
                  "exit_uuid": "uuid_example_main_exit_18",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "uuid_example_main_category_12"
                },
                {
                  "exit_uuid": "uuid_example_main_exit_20",
                  "name": "Stay in this flow.",
                  "uuid": "uuid_example_main_category_13"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_main_category_2",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_main_exit_5",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_main_exit_6",
                "destination_uuid": "uuid_example_main_node_2"
              },
              {
                "uuid": "uuid_example_main_exit_10",
                "destination_uuid": "uuid_example_main_node_4"
              },
              {
                "uuid": "uuid_example_main_exit_14",
                "destination_uuid": "uuid_example_main_node_5"
              },
              {
                "uuid": "uuid_example_main_exit_18",
                "destination_uuid": "uuid_example_main_node_6"
              },
              {
                "uuid": "uuid_example_main_exit_20",
                "destination_uuid": "uuid_example_main_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_main_node_2",
            "actions": [
              {
                "flow": {
                  "name": "example_media"
                },
                "type": "enter_flow",
                "uuid": "uuid_example_main_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_3",
                "destination_uuid": "uuid_example_main_node_8"
              },
              {
                "uuid": "uuid_example_main_exit_4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_example_main_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_example_main_category_0"
                },
                {
                  "uuid": "uuid_example_main_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_example_main_category_1"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_example_main_category_0",
                  "name": "Complete",
                  "exit_uuid": "uuid_example_main_exit_3"
                },
                {
                  "uuid": "uuid_example_main_category_1",
                  "name": "Expired",
                  "exit_uuid": "uuid_example_main_exit_4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_example_main_category_0"
            }
          },
          {
            "uuid": "uuid_example_main_node_4",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox"
                },
                "type": "enter_flow",
                "uuid": "uuid_example_main_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_8",
                "destination_uuid": "uuid_example_main_node_8"
              },
              {
                "uuid": "uuid_example_main_exit_9",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_example_main_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_example_main_category_4"
                },
                {
                  "uuid": "uuid_example_main_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_example_main_category_5"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_example_main_category_4",
                  "name": "Complete",
                  "exit_uuid": "uuid_example_main_exit_8"
                },
                {
                  "uuid": "uuid_example_main_category_5",
                  "name": "Expired",
                  "exit_uuid": "uuid_example_main_exit_9"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_example_main_category_4"
            }
          },
          {
            "uuid": "uuid_example_main_node_5",
            "actions": [
              {
                "flow": {
                  "name": "example_variables"
                },
                "type": "enter_flow",
                "uuid": "uuid_example_main_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_12",
                "destination_uuid": "uuid_example_main_node_8"
              },
              {
                "uuid": "uuid_example_main_exit_13",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_example_main_case_6",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_example_main_category_7"
                },
                {
                  "uuid": "uuid_example_main_case_7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_example_main_category_8"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_example_main_category_7",
                  "name": "Complete",
                  "exit_uuid": "uuid_example_main_exit_12"
                },
                {
                  "uuid": "uuid_example_main_category_8",
                  "name": "Expired",
                  "exit_uuid": "uuid_example_main_exit_13"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_example_main_category_7"
            }
          },
          {
            "uuid": "uuid_example_main_node_6",
            "actions": [
              {
                "flow": {
                  "name": "example_story"
                },
                "type": "enter_flow",
                "uuid": "uuid_example_main_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_16",
                "destination_uuid": "uuid_example_main_node_8"
              },
              {
                "uuid": "uuid_example_main_exit_17",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_example_main_case_9",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_example_main_category_10"
                },
                {
                  "uuid": "uuid_example_main_case_10",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_example_main_category_11"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_example_main_category_10",
                  "name": "Complete",
                  "exit_uuid": "uuid_example_main_exit_16"
                },
                {
                  "uuid": "uuid_example_main_category_11",
                  "name": "Expired",
                  "exit_uuid": "uuid_example_main_exit_17"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_example_main_category_10"
            }
          },
          {
            "uuid": "uuid_example_main_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_main_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_19",
                "destination_uuid": "uuid_example_main_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_example_main_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_main_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_21",
                "destination_uuid": "uuid_example_main_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_example_main_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_example_main_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_22",
                "destination_uuid": "uuid_example_main_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_example_main_node_11",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_example_main_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_main_case_13"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "uuid_example_main_category_16",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_main_case_14"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_main_exit_24",
                  "name": "All Responses",
                  "uuid": "uuid_example_main_category_14"
                },
                {
                  "exit_uuid": "uuid_example_main_exit_25",
                  "name": "Yes",
                  "uuid": "uuid_example_main_category_15"
                },
                {
                  "exit_uuid": "uuid_example_main_exit_27",
                  "name": "No",
                  "uuid": "uuid_example_main_category_16"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_main_category_14",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_main_exit_24",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_main_exit_25",
                "destination_uuid": "uuid_example_main_node_1"
              },
              {
                "uuid": "uuid_example_main_exit_27",
                "destination_uuid": "uuid_example_main_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_example_main_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_main_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_26",
                "destination_uuid": "uuid_example_main_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_example_main_node_13",
            "actions": [
              {
                "uuid": "uuid_example_main_action_10",
                "type": "set_contact_field",
                "field": {
                  "key": "example_main__completed",
                  "name": "example_main__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_main_exit_28",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_media",
        "uuid": "uuid_example_media_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_media_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_media_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_media_exit_0",
                "destination_uuid": "uuid_example_media_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_1",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/guide1/neutral.svg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_media_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_media_exit_1",
                "destination_uuid": "uuid_example_media_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "This message contains an image inside the speech bubble. This text is above the image\n<img class=\"block-image\" src=\"assets/plh_assets/plh_images/characters/guide1/neutral.svg\">\nand this text is below.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_media_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_media_exit_2",
                "destination_uuid": "uuid_example_media_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both&choiceMediaUrls=%5B%22plh_images%2Fcharacters%2Fguide1%2Fneutral.svg%22%2C%22plh_images%2Fcharacters%2Fguide2%2Fneutral.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "uuid_example_media_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_media_exit_3",
                "destination_uuid": "uuid_example_media_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "uuid_example_media_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_media_case_0"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "uuid_example_media_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_media_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_media_exit_5",
                  "name": "All Responses",
                  "uuid": "uuid_example_media_category_0"
                },
                {
                  "exit_uuid": "uuid_example_media_exit_6",
                  "name": "image1; image2",
                  "uuid": "uuid_example_media_category_1"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_media_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_media_exit_5",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_media_exit_6",
                "destination_uuid": "uuid_example_media_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media&choiceMediaUrls=%5B%22plh_images%2Fcharacters%2Fguide1%2Fneutral.svg%22%2C%22plh_images%2Fcharacters%2Fguide2%2Fneutral.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "uuid_example_media_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_media_exit_4",
                "destination_uuid": "uuid_example_media_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_7",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "uuid_example_media_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_media_case_2"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "uuid_example_media_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_media_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_media_exit_8",
                  "name": "All Responses",
                  "uuid": "uuid_example_media_category_2"
                },
                {
                  "exit_uuid": "uuid_example_media_exit_9",
                  "name": "image1; image2",
                  "uuid": "uuid_example_media_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_media_category_2",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_media_exit_8",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_media_exit_9",
                "destination_uuid": "uuid_example_media_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "This displays text for the first choice, and an image and text for the second choice. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both&choiceMediaUrls=%5Bnull%2C%22plh_images%2Fcharacters%2Fguide2%2Fneutral.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "uuid_example_media_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_media_exit_7",
                "destination_uuid": "uuid_example_media_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_9",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "uuid_example_media_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_media_case_4"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "uuid_example_media_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_media_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_media_exit_11",
                  "name": "All Responses",
                  "uuid": "uuid_example_media_category_4"
                },
                {
                  "exit_uuid": "uuid_example_media_exit_12",
                  "name": "image1; image2",
                  "uuid": "uuid_example_media_category_5"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_media_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_media_exit_11",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_media_exit_12",
                "destination_uuid": "uuid_example_media_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "This displays text for the first choice and an image for the second choice. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media&choiceMediaUrls=%5Bnull%2C%22plh_images%2Fcharacters%2Fguide2%2Fneutral.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "uuid_example_media_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_media_exit_10",
                "destination_uuid": "uuid_example_media_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_11",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "uuid_example_media_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_media_case_6"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "uuid_example_media_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_media_case_7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_media_exit_14",
                  "name": "All Responses",
                  "uuid": "uuid_example_media_category_6"
                },
                {
                  "exit_uuid": "uuid_example_media_exit_15",
                  "name": "image1; image2",
                  "uuid": "uuid_example_media_category_7"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_media_category_6",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_media_exit_14",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_media_exit_15",
                "destination_uuid": "uuid_example_media_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_10",
            "actions": [
              {
                "uuid": "uuid_example_media_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "example_media__completed",
                  "name": "example_media__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_media_exit_13",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_icon",
        "uuid": "uuid_example_icon_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_icon_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the icon example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_icon_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_icon_exit_0",
                "destination_uuid": "uuid_example_icon_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_icon_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "After this text there is an in-line icon <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_relax_icon.svg\"> followed by this text.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_icon_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_icon_exit_1",
                "destination_uuid": "uuid_example_icon_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_icon_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "This message contains multiple icons: first icon <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_spend_time_icon.svg\">, second <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_relax_icon.svg\">, third icon <img class=\"icon\" src=\"assets/plh_assets/plh_images/habits/habit_relax_icon.svg\">.",
                "type": "send_msg",
                "quick_replies": [
                  "Done"
                ],
                "uuid": "uuid_example_icon_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_icon_exit_2",
                "destination_uuid": "uuid_example_icon_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_example_icon_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Done"
                  ],
                  "category_uuid": "uuid_example_icon_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_icon_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_icon_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_example_icon_category_0"
                },
                {
                  "exit_uuid": "uuid_example_icon_exit_5",
                  "name": "Done",
                  "uuid": "uuid_example_icon_category_1"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_icon_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_icon_exit_4",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_icon_exit_5",
                "destination_uuid": "uuid_example_icon_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_icon_node_3",
            "actions": [
              {
                "uuid": "uuid_example_icon_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "example_icon__completed",
                  "name": "example_icon__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_icon_exit_3",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_long_xxxxxxxxxxxxxxxx",
        "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_0",
                "destination_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_1",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/guide1/neutral.svg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_1",
                "destination_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both&choiceMediaUrls=%5B%22plh_images%2Fcharacters%2Fguide1%2Fneutral.svg%22%2C%22plh_images%2Fcharacters%2Fguide2%2Fneutral.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_2",
                "destination_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_case_0"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_category_0"
                },
                {
                  "exit_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_5",
                  "name": "image1; image2",
                  "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_category_1"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_4",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_5",
                "destination_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media&choiceMediaUrls=%5B%22plh_images%2Fcharacters%2Fguide1%2Fneutral.svg%22%2C%22plh_images%2Fcharacters%2Fguide2%2Fneutral.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_3",
                "destination_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_6",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_case_2"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_7",
                  "name": "All Responses",
                  "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_category_2"
                },
                {
                  "exit_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_8",
                  "name": "image1; image2",
                  "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_category_2",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_7",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_8",
                "destination_uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_node_5",
            "actions": [
              {
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "example_long_xxxxxxxxxxxxxxxx__completed",
                  "name": "example_long_xxxxxxxxxxxxxxxx__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_long_xxxxxxxxxxxxxxxx_exit_6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_tickbox",
        "uuid": "uuid_example_tickbox_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_tickbox_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "uuid_example_tickbox_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_exit_0",
                "destination_uuid": "uuid_example_tickbox_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "uuid_example_tickbox_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_tickbox_case_0"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "uuid_example_tickbox_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_tickbox_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_tickbox_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_example_tickbox_category_0"
                },
                {
                  "exit_uuid": "uuid_example_tickbox_exit_3",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "uuid_example_tickbox_category_1"
                },
                {
                  "exit_uuid": "uuid_example_tickbox_exit_5",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "uuid_example_tickbox_category_2"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_tickbox_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_tickbox_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_tickbox_exit_3",
                "destination_uuid": "uuid_example_tickbox_node_1"
              },
              {
                "uuid": "uuid_example_tickbox_exit_5",
                "destination_uuid": "uuid_example_tickbox_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Ticked Value",
                  "Unticked Value"
                ],
                "uuid": "uuid_example_tickbox_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_exit_1",
                "destination_uuid": "uuid_example_tickbox_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=false",
                "type": "send_msg",
                "quick_replies": [
                  "Ticked Value",
                  "Unticked Value"
                ],
                "uuid": "uuid_example_tickbox_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_exit_4",
                "destination_uuid": "uuid_example_tickbox_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Ticked Value"
                  ],
                  "category_uuid": "uuid_example_tickbox_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_tickbox_case_2"
                },
                {
                  "arguments": [
                    "Unticked Value"
                  ],
                  "category_uuid": "uuid_example_tickbox_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_tickbox_case_3"
                },
                {
                  "arguments": [
                    "Unticked Value"
                  ],
                  "category_uuid": "uuid_example_tickbox_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_tickbox_case_4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_tickbox_exit_7",
                  "name": "All Responses",
                  "uuid": "uuid_example_tickbox_category_3"
                },
                {
                  "exit_uuid": "uuid_example_tickbox_exit_8",
                  "name": "Ticked Value",
                  "uuid": "uuid_example_tickbox_category_4"
                },
                {
                  "exit_uuid": "uuid_example_tickbox_exit_10",
                  "name": "Unticked Value",
                  "uuid": "uuid_example_tickbox_category_5"
                },
                {
                  "exit_uuid": "uuid_example_tickbox_exit_11",
                  "name": "Unticked Value",
                  "uuid": "uuid_example_tickbox_category_6"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_tickbox_category_3",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_tickbox_exit_7",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_tickbox_exit_8",
                "destination_uuid": "uuid_example_tickbox_node_4"
              },
              {
                "uuid": "uuid_example_tickbox_exit_10",
                "destination_uuid": "uuid_example_tickbox_node_6"
              },
              {
                "uuid": "uuid_example_tickbox_exit_11",
                "destination_uuid": "uuid_example_tickbox_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_tickbox_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_exit_6",
                "destination_uuid": "uuid_example_tickbox_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_tickbox_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_exit_9",
                "destination_uuid": "uuid_example_tickbox_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_node_7",
            "actions": [
              {
                "uuid": "uuid_example_tickbox_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "example_tickbox__completed",
                  "name": "example_tickbox__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_exit_12",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_variables",
        "uuid": "uuid_example_variables_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_variables_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_variables_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_0",
                "destination_uuid": "uuid_example_variables_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_variables_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "uuid_example_variables_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_1",
                "destination_uuid": "uuid_example_variables_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_variables_node_2",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_2",
                "destination_uuid": "uuid_example_variables_node_3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_example_variables_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_example_variables_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_example_variables_exit_2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "favourite_number"
            }
          },
          {
            "uuid": "uuid_example_variables_node_3",
            "actions": [
              {
                "uuid": "uuid_example_variables_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "favourite_number",
                  "name": "favourite_number"
                },
                "value": "@results.favourite_number"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_3",
                "destination_uuid": "uuid_example_variables_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_variables_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "uuid_example_variables_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_variables_case_0"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "uuid_example_variables_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_variables_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_variables_exit_5",
                  "name": "All Responses",
                  "uuid": "uuid_example_variables_category_1"
                },
                {
                  "exit_uuid": "uuid_example_variables_exit_6",
                  "name": "1",
                  "uuid": "uuid_example_variables_category_2"
                },
                {
                  "exit_uuid": "uuid_example_variables_exit_8",
                  "name": "2",
                  "uuid": "uuid_example_variables_category_3"
                }
              ],
              "operand": "@fields.favourite_number",
              "default_category_uuid": "uuid_example_variables_category_1"
            },
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_5",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_variables_exit_6",
                "destination_uuid": "uuid_example_variables_node_4"
              },
              {
                "uuid": "uuid_example_variables_exit_8",
                "destination_uuid": "uuid_example_variables_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_variables_node_4",
            "actions": [
              {
                "uuid": "uuid_example_variables_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "favourite_number_text",
                  "name": "favourite_number_text"
                },
                "value": "one"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_4",
                "destination_uuid": "uuid_example_variables_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_variables_node_6",
            "actions": [
              {
                "uuid": "uuid_example_variables_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "favourite_number_text",
                  "name": "favourite_number_text"
                },
                "value": "two"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_7",
                "destination_uuid": "uuid_example_variables_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_variables_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_variables_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_9",
                "destination_uuid": "uuid_example_variables_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_example_variables_node_8",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_10",
                "destination_uuid": "uuid_example_variables_node_9"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_example_variables_category_4",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_example_variables_category_4",
                  "name": "All Responses",
                  "exit_uuid": "uuid_example_variables_exit_10"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "favourite_word"
            }
          },
          {
            "uuid": "uuid_example_variables_node_9",
            "actions": [
              {
                "uuid": "uuid_example_variables_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "favourite_word",
                  "name": "favourite_word"
                },
                "value": "@results.favourite_word"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_11",
                "destination_uuid": "uuid_example_variables_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_example_variables_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_variables_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_12",
                "destination_uuid": "uuid_example_variables_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_example_variables_node_11",
            "actions": [
              {
                "uuid": "uuid_example_variables_action_8",
                "type": "set_contact_field",
                "field": {
                  "key": "example_variables__completed",
                  "name": "example_variables__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_variables_exit_13",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_user_input",
        "uuid": "uuid_example_user_input_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_user_input_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the user input example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_user_input_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_0",
                "destination_uuid": "uuid_example_user_input_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_user_input_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "This message allows the user to type a custom reply.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_user_input_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_1",
                "destination_uuid": "uuid_example_user_input_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_user_input_node_2",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_2",
                "destination_uuid": "uuid_example_user_input_node_3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_example_user_input_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_example_user_input_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_example_user_input_exit_2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "first_reply"
            }
          },
          {
            "uuid": "uuid_example_user_input_node_3",
            "actions": [
              {
                "uuid": "uuid_example_user_input_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "first_reply",
                  "name": "first_reply"
                },
                "value": "@results.first_reply"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_3",
                "destination_uuid": "uuid_example_user_input_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_example_user_input_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "This message has two quick replies, and also allows the user to type a custom reply.",
                "type": "send_msg",
                "quick_replies": [
                  "quick reply 1",
                  "quick reply 2",
                  "custom reply"
                ],
                "uuid": "uuid_example_user_input_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_4",
                "destination_uuid": "uuid_example_user_input_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_user_input_node_5",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_5",
                "destination_uuid": "uuid_example_user_input_node_6"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_example_user_input_category_1",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_example_user_input_category_1",
                  "name": "All Responses",
                  "exit_uuid": "uuid_example_user_input_exit_5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "second_reply"
            }
          },
          {
            "uuid": "uuid_example_user_input_node_6",
            "actions": [
              {
                "uuid": "uuid_example_user_input_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "second_reply",
                  "name": "second_reply"
                },
                "value": "@results.second_reply"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_6",
                "destination_uuid": "uuid_example_user_input_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_example_user_input_node_10",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "custom reply"
                  ],
                  "category_uuid": "uuid_example_user_input_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_user_input_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_user_input_exit_10",
                  "name": "All Responses",
                  "uuid": "uuid_example_user_input_category_3"
                },
                {
                  "exit_uuid": "uuid_example_user_input_exit_11",
                  "name": "custom reply",
                  "uuid": "uuid_example_user_input_category_4"
                }
              ],
              "operand": "@fields.second_reply",
              "default_category_uuid": "uuid_example_user_input_category_3"
            },
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_10",
                "destination_uuid": "uuid_example_user_input_node_11"
              },
              {
                "uuid": "uuid_example_user_input_exit_11",
                "destination_uuid": "uuid_example_user_input_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_user_input_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Type your custom reply.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_user_input_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_7",
                "destination_uuid": "uuid_example_user_input_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_example_user_input_node_8",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_8",
                "destination_uuid": "uuid_example_user_input_node_9"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_example_user_input_category_2",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_example_user_input_category_2",
                  "name": "All Responses",
                  "exit_uuid": "uuid_example_user_input_exit_8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "second_reply"
            }
          },
          {
            "uuid": "uuid_example_user_input_node_9",
            "actions": [
              {
                "uuid": "uuid_example_user_input_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "second_reply",
                  "name": "second_reply"
                },
                "value": "@results.second_reply"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_9",
                "destination_uuid": "uuid_example_user_input_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_example_user_input_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "Your first reply was @fields.first_reply and your second reply was @fields.second_reply. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_user_input_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_12",
                "destination_uuid": "uuid_example_user_input_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_example_user_input_node_12",
            "actions": [
              {
                "uuid": "uuid_example_user_input_action_8",
                "type": "set_contact_field",
                "field": {
                  "key": "example_user_input__completed",
                  "name": "example_user_input__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_user_input_exit_13",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_story1",
        "uuid": "uuid_example_story1_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_story1_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_story1_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story1_exit_0",
                "destination_uuid": "uuid_example_story1_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_story1_node_1",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/modules/mod_praise/illustrated_story/@fields.guidenumber/is_1.svg"
                ],
                "text": "Top text\n<story-image>\nBottom text",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_example_story1_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story1_exit_1",
                "destination_uuid": "uuid_example_story1_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_story1_node_3",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_example_story1_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_story1_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_story1_exit_3",
                  "name": "All Responses",
                  "uuid": "uuid_example_story1_category_0"
                },
                {
                  "exit_uuid": "uuid_example_story1_exit_4",
                  "name": "Next",
                  "uuid": "uuid_example_story1_category_1"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_story1_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_story1_exit_3",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_story1_exit_4",
                "destination_uuid": "uuid_example_story1_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_story1_node_2",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/modules/mod_praise/illustrated_story/@fields.guidenumber/is_2.svg"
                ],
                "text": "Top text 2\n<story-image>\nBottom text 2",
                "type": "send_msg",
                "quick_replies": [
                  "Previous",
                  "Next"
                ],
                "uuid": "uuid_example_story1_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story1_exit_2",
                "destination_uuid": "uuid_example_story1_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_story1_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_example_story1_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_story1_case_1"
                },
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_example_story1_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_story1_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_story1_exit_6",
                  "name": "All Responses",
                  "uuid": "uuid_example_story1_category_2"
                },
                {
                  "exit_uuid": "uuid_example_story1_exit_7",
                  "name": "Next",
                  "uuid": "uuid_example_story1_category_3"
                },
                {
                  "exit_uuid": "uuid_example_story1_exit_9",
                  "name": "Previous",
                  "uuid": "uuid_example_story1_category_4"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_story1_category_2",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_story1_exit_6",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_story1_exit_7",
                "destination_uuid": "uuid_example_story1_node_4"
              },
              {
                "uuid": "uuid_example_story1_exit_9",
                "destination_uuid": "uuid_example_story1_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_story1_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in regular mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_story1_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story1_exit_5",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_example_story1_node_7",
            "actions": [
              {
                "uuid": "uuid_example_story1_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "example_story1__completed",
                  "name": "example_story1__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story1_exit_10",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_story2",
        "uuid": "uuid_example_story2_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_story2_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Start story"
                ],
                "uuid": "uuid_example_story2_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story2_exit_0",
                "destination_uuid": "uuid_example_story2_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_story2_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Start story"
                  ],
                  "category_uuid": "uuid_example_story2_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_story2_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_story2_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_example_story2_category_0"
                },
                {
                  "exit_uuid": "uuid_example_story2_exit_3",
                  "name": "Start story",
                  "uuid": "uuid_example_story2_category_1"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_story2_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_story2_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_story2_exit_3",
                "destination_uuid": "uuid_example_story2_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_story2_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "<p>Top text</p>\n<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_praise/illustrated_story/@fields.guidenumber/is_1.svg\"></p>\n<p>Bottom text</p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_example_story2_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story2_exit_1",
                "destination_uuid": "uuid_example_story2_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_example_story2_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_example_story2_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_story2_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_story2_exit_5",
                  "name": "All Responses",
                  "uuid": "uuid_example_story2_category_2"
                },
                {
                  "exit_uuid": "uuid_example_story2_exit_6",
                  "name": "Next",
                  "uuid": "uuid_example_story2_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_story2_category_2",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_story2_exit_5",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_story2_exit_6",
                "destination_uuid": "uuid_example_story2_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_story2_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "<p>Top text 2</p>\n<p><img class=\"block-image\" src=\"assets/plh_assets/plh_images/modules/mod_praise/illustrated_story/@fields.guidenumber/is_2.svg\"></p>\n<p>Bottom text 2</p> https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Previous",
                  "Next"
                ],
                "uuid": "uuid_example_story2_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story2_exit_4",
                "destination_uuid": "uuid_example_story2_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_story2_node_6",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_example_story2_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_story2_case_2"
                },
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_example_story2_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_story2_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_story2_exit_8",
                  "name": "All Responses",
                  "uuid": "uuid_example_story2_category_4"
                },
                {
                  "exit_uuid": "uuid_example_story2_exit_9",
                  "name": "Next",
                  "uuid": "uuid_example_story2_category_5"
                },
                {
                  "exit_uuid": "uuid_example_story2_exit_11",
                  "name": "Previous",
                  "uuid": "uuid_example_story2_category_6"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_story2_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_story2_exit_8",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_story2_exit_9",
                "destination_uuid": "uuid_example_story2_node_5"
              },
              {
                "uuid": "uuid_example_story2_exit_11",
                "destination_uuid": "uuid_example_story2_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_story2_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in regular mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_story2_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story2_exit_7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_example_story2_node_8",
            "actions": [
              {
                "uuid": "uuid_example_story2_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "example_story2__completed",
                  "name": "example_story2__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story2_exit_12",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_exit",
        "uuid": "uuid_example_exit_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_exit_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the example exit flow",
                "type": "send_msg",
                "quick_replies": [
                  "Test default",
                  "Test next",
                  "Test custom"
                ],
                "uuid": "uuid_example_exit_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_exit_exit_0",
                "destination_uuid": "uuid_example_exit_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_exit_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Test default"
                  ],
                  "category_uuid": "uuid_example_exit_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_exit_case_0"
                },
                {
                  "arguments": [
                    "Test custom"
                  ],
                  "category_uuid": "uuid_example_exit_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_exit_case_1"
                },
                {
                  "arguments": [
                    "Test custom"
                  ],
                  "category_uuid": "uuid_example_exit_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_exit_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_exit_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_example_exit_category_0"
                },
                {
                  "exit_uuid": "uuid_example_exit_exit_3",
                  "name": "Test default",
                  "uuid": "uuid_example_exit_category_1"
                },
                {
                  "exit_uuid": "uuid_example_exit_exit_6",
                  "name": "Test custom",
                  "uuid": "uuid_example_exit_category_2"
                },
                {
                  "exit_uuid": "uuid_example_exit_exit_10",
                  "name": "Test custom",
                  "uuid": "uuid_example_exit_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_exit_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_exit_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_exit_exit_3",
                "destination_uuid": "uuid_example_exit_node_1"
              },
              {
                "uuid": "uuid_example_exit_exit_6",
                "destination_uuid": "uuid_example_exit_node_4"
              },
              {
                "uuid": "uuid_example_exit_exit_10",
                "destination_uuid": "uuid_example_exit_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_exit_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "This is the default exit. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_exit_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_exit_exit_1",
                "destination_uuid": "uuid_example_exit_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_exit_node_3",
            "actions": [
              {
                "uuid": "uuid_example_exit_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "example_exit__completed",
                  "name": "example_exit__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_exit_exit_4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_example_exit_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "This is the default exit when you have a next flow. It has two buttons one for the next flow and the other to just exit.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_exit_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_exit_exit_5",
                "destination_uuid": "uuid_example_exit_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_exit_node_5",
            "actions": [
              {
                "uuid": "uuid_example_exit_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "example_exit__completed",
                  "name": "example_exit__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_exit_exit_7",
                "destination_uuid": "uuid_example_exit_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_exit_node_6",
            "actions": [
              {
                "flow": {
                  "name": "example_subflow"
                },
                "type": "enter_flow",
                "uuid": "uuid_example_exit_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_exit_exit_8",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_example_exit_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "This is the custom exit.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_exit_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_exit_exit_9",
                "destination_uuid": "uuid_example_exit_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_example_exit_node_8",
            "actions": [
              {
                "uuid": "uuid_example_exit_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "example_exit__completed",
                  "name": "example_exit__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_exit_exit_11",
                "destination_uuid": "uuid_example_exit_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_example_exit_node_9",
            "actions": [
              {
                "flow": {
                  "name": "example_subflow"
                },
                "type": "enter_flow",
                "uuid": "uuid_example_exit_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_exit_exit_12",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_mark_as_completed",
        "uuid": "uuid_example_mark_as_completed_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_mark_as_completed_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the mark_as_completed example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Mark task as completed",
                  "Mark this flow as completed"
                ],
                "uuid": "uuid_example_mark_as_completed_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_mark_as_completed_exit_0",
                "destination_uuid": "uuid_example_mark_as_completed_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_mark_as_completed_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Mark task as completed"
                  ],
                  "category_uuid": "uuid_example_mark_as_completed_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_mark_as_completed_case_0"
                },
                {
                  "arguments": [
                    "Mark this flow as completed"
                  ],
                  "category_uuid": "uuid_example_mark_as_completed_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_mark_as_completed_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_mark_as_completed_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_example_mark_as_completed_category_0"
                },
                {
                  "exit_uuid": "uuid_example_mark_as_completed_exit_3",
                  "name": "Mark task as completed",
                  "uuid": "uuid_example_mark_as_completed_category_1"
                },
                {
                  "exit_uuid": "uuid_example_mark_as_completed_exit_6",
                  "name": "Mark this flow as completed",
                  "uuid": "uuid_example_mark_as_completed_category_2"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_mark_as_completed_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_mark_as_completed_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_mark_as_completed_exit_3",
                "destination_uuid": "uuid_example_mark_as_completed_node_1"
              },
              {
                "uuid": "uuid_example_mark_as_completed_exit_6",
                "destination_uuid": "uuid_example_mark_as_completed_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_example_mark_as_completed_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "(a message)",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_mark_as_completed_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_mark_as_completed_exit_1",
                "destination_uuid": "uuid_example_mark_as_completed_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_mark_as_completed_node_3",
            "actions": [
              {
                "uuid": "uuid_example_mark_as_completed_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "task_relax__completed",
                  "name": "task_relax__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_mark_as_completed_exit_4",
                "destination_uuid": "uuid_example_mark_as_completed_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_mark_as_completed_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "(a message)",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_mark_as_completed_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_mark_as_completed_exit_5",
                "destination_uuid": "uuid_example_mark_as_completed_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_mark_as_completed_node_5",
            "actions": [
              {
                "uuid": "uuid_example_mark_as_completed_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "example_mark_as_completed__completed",
                  "name": "example_mark_as_completed__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_mark_as_completed_exit_7",
                "destination_uuid": "uuid_example_mark_as_completed_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_mark_as_completed_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Some text. Flow completed = @fields.example_mark_as_completed__completed",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_mark_as_completed_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_mark_as_completed_exit_8",
                "destination_uuid": "uuid_example_mark_as_completed_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_mark_as_completed_node_7",
            "actions": [
              {
                "uuid": "uuid_example_mark_as_completed_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "example_mark_as_completed__completed",
                  "name": "example_mark_as_completed__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_mark_as_completed_exit_9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_characters",
        "uuid": "uuid_example_characters_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_characters_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows the functionality of the character, character_media and character_display columns.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_characters_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_characters_exit_0",
                "destination_uuid": "uuid_example_characters_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_characters_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "This text is said by @fields.neighbour. A neutral image of neighbour is displayed in front of this text. https://plh-demo1.idems.international/chat/msg-info?character=neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_characters_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_characters_exit_1",
                "destination_uuid": "uuid_example_characters_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_characters_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "This text is said by @fields.neighbour. No image of neighbour is displayed. https://plh-demo1.idems.international/chat/msg-info?character=neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_characters_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_characters_exit_2",
                "destination_uuid": "uuid_example_characters_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_characters_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "This text is said by @fields.neighbour. A happy image of neighbour is displayed in front of this text. The link to this image is the happy_asset associated to neighbour in the character_names sheet. https://plh-demo1.idems.international/chat/msg-info?character=neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_characters_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_characters_exit_3",
                "destination_uuid": "uuid_example_characters_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_example_characters_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "This is the end of the character example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_characters_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_characters_exit_4",
                "destination_uuid": "uuid_example_characters_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_characters_node_5",
            "actions": [
              {
                "uuid": "uuid_example_characters_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "example_characters__completed",
                  "name": "example_characters__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_characters_exit_5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_tickbox_2",
        "uuid": "uuid_example_tickbox_2_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_tickbox_2_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a Yes/No question that assumes Yes as an answer",
                  "Show a Yes/No question that assumes No as an answer"
                ],
                "uuid": "uuid_example_tickbox_2_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_2_exit_0",
                "destination_uuid": "uuid_example_tickbox_2_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_2_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Show a Yes/No question that assumes Yes as an answer"
                  ],
                  "category_uuid": "uuid_example_tickbox_2_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_tickbox_2_case_0"
                },
                {
                  "arguments": [
                    "Show a Yes/No question that assumes No as an answer"
                  ],
                  "category_uuid": "uuid_example_tickbox_2_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_tickbox_2_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_tickbox_2_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_example_tickbox_2_category_0"
                },
                {
                  "exit_uuid": "uuid_example_tickbox_2_exit_3",
                  "name": "Show a Yes/No question that assumes Yes as an answer",
                  "uuid": "uuid_example_tickbox_2_category_1"
                },
                {
                  "exit_uuid": "uuid_example_tickbox_2_exit_5",
                  "name": "Show a Yes/No question that assumes No as an answer",
                  "uuid": "uuid_example_tickbox_2_category_2"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_tickbox_2_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_tickbox_2_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_tickbox_2_exit_3",
                "destination_uuid": "uuid_example_tickbox_2_node_1"
              },
              {
                "uuid": "uuid_example_tickbox_2_exit_5",
                "destination_uuid": "uuid_example_tickbox_2_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_2_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "This question is a Yes/No question where the assumed answer is Yes https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_example_tickbox_2_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_2_exit_1",
                "destination_uuid": "uuid_example_tickbox_2_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_2_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "This question is a Yes/No question where the assumed answer is No https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=false",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_example_tickbox_2_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_2_exit_4",
                "destination_uuid": "uuid_example_tickbox_2_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_2_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_example_tickbox_2_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_tickbox_2_case_2"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "uuid_example_tickbox_2_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_tickbox_2_case_3"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "uuid_example_tickbox_2_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_tickbox_2_case_4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_tickbox_2_exit_7",
                  "name": "All Responses",
                  "uuid": "uuid_example_tickbox_2_category_3"
                },
                {
                  "exit_uuid": "uuid_example_tickbox_2_exit_8",
                  "name": "Yes",
                  "uuid": "uuid_example_tickbox_2_category_4"
                },
                {
                  "exit_uuid": "uuid_example_tickbox_2_exit_10",
                  "name": "No",
                  "uuid": "uuid_example_tickbox_2_category_5"
                },
                {
                  "exit_uuid": "uuid_example_tickbox_2_exit_11",
                  "name": "No",
                  "uuid": "uuid_example_tickbox_2_category_6"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_tickbox_2_category_3",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_tickbox_2_exit_7",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_tickbox_2_exit_8",
                "destination_uuid": "uuid_example_tickbox_2_node_4"
              },
              {
                "uuid": "uuid_example_tickbox_2_exit_10",
                "destination_uuid": "uuid_example_tickbox_2_node_6"
              },
              {
                "uuid": "uuid_example_tickbox_2_exit_11",
                "destination_uuid": "uuid_example_tickbox_2_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_2_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "You chose Yes",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_tickbox_2_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_2_exit_6",
                "destination_uuid": "uuid_example_tickbox_2_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_2_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "You chose No",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_tickbox_2_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_2_exit_9",
                "destination_uuid": "uuid_example_tickbox_2_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_tickbox_2_node_7",
            "actions": [
              {
                "uuid": "uuid_example_tickbox_2_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "example_tickbox_2__completed",
                  "name": "example_tickbox_2__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_tickbox_2_exit_12",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_habit",
        "uuid": "uuid_example_habit_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_habit_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows the functionality of printing the number of recorded habits. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_habit_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_habit_exit_0",
                "destination_uuid": "uuid_example_habit_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_example_habit_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "uuid_example_habit_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_habit_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_habit_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_example_habit_category_0"
                },
                {
                  "exit_uuid": "uuid_example_habit_exit_3",
                  "name": "1",
                  "uuid": "uuid_example_habit_category_1"
                }
              ],
              "operand": "@habit.habit_relax.weekly_count",
              "default_category_uuid": "uuid_example_habit_category_0"
            },
            "exits": [
              {
                "uuid": "uuid_example_habit_exit_2",
                "destination_uuid": "uuid_example_habit_node_3"
              },
              {
                "uuid": "uuid_example_habit_exit_3",
                "destination_uuid": "uuid_example_habit_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_example_habit_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "In the past 7 days the habit habit_relax was recorded @habit.habit_relax.weekly_count time. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_habit_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_habit_exit_1",
                "destination_uuid": "uuid_example_habit_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_habit_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "In the past 7 days the habit habit_relax was recorded @habit.habit_relax.weekly_count times. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_habit_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_habit_exit_4",
                "destination_uuid": "uuid_example_habit_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_habit_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "uuid_example_habit_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_habit_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_habit_exit_6",
                  "name": "All Responses",
                  "uuid": "uuid_example_habit_category_2"
                },
                {
                  "exit_uuid": "uuid_example_habit_exit_7",
                  "name": "1",
                  "uuid": "uuid_example_habit_category_3"
                }
              ],
              "operand": "@habit.habit_spend_time.weekly_count",
              "default_category_uuid": "uuid_example_habit_category_2"
            },
            "exits": [
              {
                "uuid": "uuid_example_habit_exit_6",
                "destination_uuid": "uuid_example_habit_node_6"
              },
              {
                "uuid": "uuid_example_habit_exit_7",
                "destination_uuid": "uuid_example_habit_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_example_habit_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "In the past 7 days the habit habit_spend_time was recorded @habit.habit_spend_time.weekly_count time. ",
                "type": "send_msg",
                "quick_replies": [
                  "Done"
                ],
                "uuid": "uuid_example_habit_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_habit_exit_5",
                "destination_uuid": "uuid_example_habit_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_example_habit_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "In the past 7 days the habit habit_spend_time was recorded @habit.habit_spend_time.weekly_count times. ",
                "type": "send_msg",
                "quick_replies": [
                  "Done"
                ],
                "uuid": "uuid_example_habit_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_habit_exit_8",
                "destination_uuid": "uuid_example_habit_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_example_habit_node_8",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Done"
                  ],
                  "category_uuid": "uuid_example_habit_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_example_habit_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_example_habit_exit_10",
                  "name": "All Responses",
                  "uuid": "uuid_example_habit_category_4"
                },
                {
                  "exit_uuid": "uuid_example_habit_exit_11",
                  "name": "Done",
                  "uuid": "uuid_example_habit_category_5"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_example_habit_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_habit_exit_10",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_habit_exit_11",
                "destination_uuid": "uuid_example_habit_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_example_habit_node_7",
            "actions": [
              {
                "uuid": "uuid_example_habit_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "example_habit__completed",
                  "name": "example_habit__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_habit_exit_9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "first_app_launch_opening",
        "uuid": "uuid_first_app_launch_opening_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_first_app_launch_opening_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "You deserve to feel good, and have happier family relationships.   \n\nThis app will give you:   \n- 10 weekly sessions with essential skills for self-care and parenting a teenager [shot of a weekly session] \n- The Toolbox - Instant access help section with Essential Tools for each skill, extra information and local resources [shot of help screen] \n- STAR habits: Track and see your success [shot of star habit and celebration] \n- [What else should we add here?]  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_first_app_launch_opening_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_0",
                "destination_uuid": "uuid_first_app_launch_opening_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_first_app_launch_opening_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_1",
                "destination_uuid": "uuid_first_app_launch_opening_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "uuid_first_app_launch_opening_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_2",
                "destination_uuid": "uuid_first_app_launch_opening_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_3",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_3",
                "destination_uuid": "uuid_first_app_launch_opening_node_4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_first_app_launch_opening_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_first_app_launch_opening_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_first_app_launch_opening_exit_3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "research_agreement"
            }
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_4",
            "actions": [
              {
                "uuid": "uuid_first_app_launch_opening_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "research_agreement",
                  "name": "research_agreement"
                },
                "value": "@results.research_agreement"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_4",
                "destination_uuid": "uuid_first_app_launch_opening_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_5",
            "actions": [
              {
                "flow": {
                  "name": "character_names"
                },
                "type": "enter_flow",
                "uuid": "uuid_first_app_launch_opening_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_6",
                "destination_uuid": "uuid_first_app_launch_opening_node_6"
              },
              {
                "uuid": "uuid_first_app_launch_opening_exit_7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_first_app_launch_opening_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_first_app_launch_opening_category_1"
                },
                {
                  "uuid": "uuid_first_app_launch_opening_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_first_app_launch_opening_category_2"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_first_app_launch_opening_category_1",
                  "name": "Complete",
                  "exit_uuid": "uuid_first_app_launch_opening_exit_6"
                },
                {
                  "uuid": "uuid_first_app_launch_opening_category_2",
                  "name": "Expired",
                  "exit_uuid": "uuid_first_app_launch_opening_exit_7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_first_app_launch_opening_category_1"
            }
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media&choiceMediaUrls=%5B%22plh_images%2Fcharacters%2Fguide1%2Fneutral.svg%22%2C%22plh_images%2Fcharacters%2Fguide2%2Fneutral.svg%22%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%5D",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "uuid_first_app_launch_opening_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_8",
                "destination_uuid": "uuid_first_app_launch_opening_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_7",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_9",
                "destination_uuid": "uuid_first_app_launch_opening_node_8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_first_app_launch_opening_category_3",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_first_app_launch_opening_category_3",
                  "name": "All Responses",
                  "exit_uuid": "uuid_first_app_launch_opening_exit_9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "guidenumber"
            }
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_8",
            "actions": [
              {
                "uuid": "uuid_first_app_launch_opening_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "guidenumber",
                  "name": "guidenumber"
                },
                "value": "@results.guidenumber"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_10",
                "destination_uuid": "uuid_first_app_launch_opening_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_10",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "uuid_first_app_launch_opening_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_first_app_launch_opening_case_2"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "uuid_first_app_launch_opening_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_first_app_launch_opening_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_first_app_launch_opening_exit_12",
                  "name": "All Responses",
                  "uuid": "uuid_first_app_launch_opening_category_4"
                },
                {
                  "exit_uuid": "uuid_first_app_launch_opening_exit_13",
                  "name": "guide1",
                  "uuid": "uuid_first_app_launch_opening_category_5"
                },
                {
                  "exit_uuid": "uuid_first_app_launch_opening_exit_15",
                  "name": "guide2",
                  "uuid": "uuid_first_app_launch_opening_category_6"
                }
              ],
              "operand": "@fields.guidenumber",
              "default_category_uuid": "uuid_first_app_launch_opening_category_4"
            },
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_12",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_first_app_launch_opening_exit_13",
                "destination_uuid": "uuid_first_app_launch_opening_node_9"
              },
              {
                "uuid": "uuid_first_app_launch_opening_exit_15",
                "destination_uuid": "uuid_first_app_launch_opening_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_9",
            "actions": [
              {
                "uuid": "uuid_first_app_launch_opening_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "guide",
                  "name": "guide"
                },
                "value": "@fields.first_guide"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_11",
                "destination_uuid": "uuid_first_app_launch_opening_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_11",
            "actions": [
              {
                "uuid": "uuid_first_app_launch_opening_action_8",
                "type": "set_contact_field",
                "field": {
                  "key": "guide",
                  "name": "guide"
                },
                "value": "@fields.second_guide"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_14",
                "destination_uuid": "uuid_first_app_launch_opening_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_launch_opening_node_12",
            "actions": [
              {
                "uuid": "uuid_first_app_launch_opening_action_9",
                "type": "set_contact_field",
                "field": {
                  "key": "first_app_launch_opening__completed",
                  "name": "first_app_launch_opening__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_launch_opening_exit_16",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "help_main",
        "uuid": "uuid_help_main_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_help_main_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Please tell me how can I help you",
                "type": "send_msg",
                "quick_replies": [
                  "Give me quick parenting tips",
                  "Something bad happened!",
                  "I have technical problems with the app"
                ],
                "uuid": "uuid_help_main_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_main_exit_0",
                "destination_uuid": "uuid_help_main_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_help_main_node_3",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Give me quick parenting tips"
                  ],
                  "category_uuid": "uuid_help_main_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_main_case_0"
                },
                {
                  "arguments": [
                    "Something bad happened!"
                  ],
                  "category_uuid": "uuid_help_main_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_main_case_1"
                },
                {
                  "arguments": [
                    "I have technical problems with the app"
                  ],
                  "category_uuid": "uuid_help_main_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_main_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_help_main_exit_3",
                  "name": "All Responses",
                  "uuid": "uuid_help_main_category_0"
                },
                {
                  "exit_uuid": "uuid_help_main_exit_4",
                  "name": "Give me quick parenting tips",
                  "uuid": "uuid_help_main_category_1"
                },
                {
                  "exit_uuid": "uuid_help_main_exit_7",
                  "name": "Something bad happened!",
                  "uuid": "uuid_help_main_category_2"
                },
                {
                  "exit_uuid": "uuid_help_main_exit_10",
                  "name": "I have technical problems with the app",
                  "uuid": "uuid_help_main_category_3"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_help_main_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_help_main_exit_3",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_help_main_exit_4",
                "destination_uuid": "uuid_help_main_node_1"
              },
              {
                "uuid": "uuid_help_main_exit_7",
                "destination_uuid": "uuid_help_main_node_4"
              },
              {
                "uuid": "uuid_help_main_exit_10",
                "destination_uuid": "uuid_help_main_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_help_main_node_1",
            "actions": [
              {
                "uuid": "uuid_help_main_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "help_main__completed",
                  "name": "help_main__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_main_exit_1",
                "destination_uuid": "uuid_help_main_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_help_main_node_2",
            "actions": [
              {
                "flow": {
                  "name": "help_parenting_support"
                },
                "type": "enter_flow",
                "uuid": "uuid_help_main_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_main_exit_2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_help_main_node_4",
            "actions": [
              {
                "uuid": "uuid_help_main_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "help_main__completed",
                  "name": "help_main__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_main_exit_5",
                "destination_uuid": "uuid_help_main_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_help_main_node_5",
            "actions": [
              {
                "flow": {
                  "name": "help_safeguarding"
                },
                "type": "enter_flow",
                "uuid": "uuid_help_main_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_main_exit_6",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_help_main_node_6",
            "actions": [
              {
                "uuid": "uuid_help_main_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "help_main__completed",
                  "name": "help_main__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_main_exit_8",
                "destination_uuid": "uuid_help_main_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_help_main_node_7",
            "actions": [
              {
                "flow": {
                  "name": "help_app_support"
                },
                "type": "enter_flow",
                "uuid": "uuid_help_main_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_main_exit_9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "help_parenting_support",
        "uuid": "uuid_help_parenting_support_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_help_parenting_support_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Parenting is hard! These are challenges faced by millions of families. Choose one for quick tips.",
                "type": "send_msg",
                "quick_replies": [
                  "I hardly spend time with my teen ",
                  "My teen's behavior is difficult ",
                  "My stress, loneliness, anger ",
                  "Money problems ",
                  "Conflict in the family  ",
                  "Keeping my teen safe outside and online",
                  "Challenges with my disabled child",
                  "It's something else"
                ],
                "uuid": "uuid_help_parenting_support_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_0",
                "destination_uuid": "uuid_help_parenting_support_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "I hardly spend time with my teen "
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_0"
                },
                {
                  "arguments": [
                    "My teen's behavior is difficult "
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_1"
                },
                {
                  "arguments": [
                    "My stress, loneliness, anger "
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_2"
                },
                {
                  "arguments": [
                    "Money problems "
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_3"
                },
                {
                  "arguments": [
                    "Conflict in the family  "
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_4"
                },
                {
                  "arguments": [
                    "Keeping my teen safe outside and online"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_5"
                },
                {
                  "arguments": [
                    "Challenges with my disabled child"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_6"
                },
                {
                  "arguments": [
                    "It's something else"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_help_parenting_support_category_0"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_3",
                  "name": "I hardly spend time with my teen ",
                  "uuid": "uuid_help_parenting_support_category_1"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_6",
                  "name": "My teen's behavior is difficult ",
                  "uuid": "uuid_help_parenting_support_category_2"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_9",
                  "name": "My stress, loneliness, anger ",
                  "uuid": "uuid_help_parenting_support_category_3"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_12",
                  "name": "Money problems ",
                  "uuid": "uuid_help_parenting_support_category_4"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_15",
                  "name": "Conflict in the family  ",
                  "uuid": "uuid_help_parenting_support_category_5"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_18",
                  "name": "Keeping my teen safe outside and online",
                  "uuid": "uuid_help_parenting_support_category_6"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_21",
                  "name": "Challenges with my disabled child",
                  "uuid": "uuid_help_parenting_support_category_7"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_24",
                  "name": "It's something else",
                  "uuid": "uuid_help_parenting_support_category_8"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_help_parenting_support_category_0",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_help_parenting_support_exit_3",
                "destination_uuid": "uuid_help_parenting_support_node_1"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_6",
                "destination_uuid": "uuid_help_parenting_support_node_4"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_9",
                "destination_uuid": "uuid_help_parenting_support_node_6"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_12",
                "destination_uuid": "uuid_help_parenting_support_node_8"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_15",
                "destination_uuid": "uuid_help_parenting_support_node_10"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_18",
                "destination_uuid": "uuid_help_parenting_support_node_12"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_21",
                "destination_uuid": "uuid_help_parenting_support_node_14"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_24",
                "destination_uuid": "uuid_help_parenting_support_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "This is so difficult for parents, especially when we are so busy and our teens can be really grouchy. But spending even 10 minutes a day of focused time with your teen helps build trust. Try asking your teen what they would like to do together. It can be fun for you too (sometimes!) \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_help_parenting_support_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_1",
                "destination_uuid": "uuid_help_parenting_support_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "You'll get more support in \"1-on-1 time\" module.",
                "type": "send_msg",
                "quick_replies": [
                  "Click here to continue your ParentApp journey",
                  "Not now"
                ],
                "uuid": "uuid_help_parenting_support_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_4",
                "destination_uuid": "uuid_help_parenting_support_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "All teenagers are sometimes just horrible! One thing that can help with teenage behaviour is to praise them any time that they do something good – however small. Teens may not look like they want or seek your praise but they still really, really do.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_help_parenting_support_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_5",
                "destination_uuid": "uuid_help_parenting_support_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "You'll get more support in the \"Rules\" module.",
                "type": "send_msg",
                "quick_replies": [
                  "Click here to continue your ParentApp journey",
                  "Not now"
                ],
                "uuid": "uuid_help_parenting_support_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_7",
                "destination_uuid": "uuid_help_parenting_support_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Parenting stress is really high right now. We know exactly how you feel. Caring for yourself is really important. When you feel overwhelmed, try taking five slow, deep breaths. Do something relaxing every day for yourself. You deserve it! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_help_parenting_support_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_8",
                "destination_uuid": "uuid_help_parenting_support_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "You'll get more support in the \"Managing anger and stress\" module.",
                "type": "send_msg",
                "quick_replies": [
                  "Click here to continue your ParentApp journey",
                  "Not now"
                ],
                "uuid": "uuid_help_parenting_support_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_10",
                "destination_uuid": "uuid_help_parenting_support_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "You are not alone. Money stress is so hard for parents. Try talking to your teen about how much money comes in and what you need to spend money on as a family each month. This can help them to understand why you can't afford something they want. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_help_parenting_support_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_11",
                "destination_uuid": "uuid_help_parenting_support_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "You'll get more support in the \"Family budgeting\" module.",
                "type": "send_msg",
                "quick_replies": [
                  "Click here to continue your ParentApp journey",
                  "Not now"
                ],
                "uuid": "uuid_help_parenting_support_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_13",
                "destination_uuid": "uuid_help_parenting_support_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "In stressful times like these, families argue. When a problem comes up, try to talk about it together. What is the problem exactly? What different solutions are there and what are the consequences of one? this can help find solutions with less arguing.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_help_parenting_support_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_14",
                "destination_uuid": "uuid_help_parenting_support_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "You'll get more support in the \"Problem solving\" module.",
                "type": "send_msg",
                "quick_replies": [
                  "Click here to continue your ParentApp journey",
                  "Not now"
                ],
                "uuid": "uuid_help_parenting_support_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_16",
                "destination_uuid": "uuid_help_parenting_support_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "This is a top concern for parents. Try to start a conversation with your teen about safe and unsafe places in your community and online (you might need to try a few times). They may even know some you don’t. This can start to help you make a plan together about how to stay safe.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_help_parenting_support_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_17",
                "destination_uuid": "uuid_help_parenting_support_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_13",
            "actions": [
              {
                "attachments": [],
                "text": "You'll get more support in the \"keeping my teen safe\" module.",
                "type": "send_msg",
                "quick_replies": [
                  "Click here to continue your ParentApp journey",
                  "Not now"
                ],
                "uuid": "uuid_help_parenting_support_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_19",
                "destination_uuid": "uuid_help_parenting_support_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_14",
            "actions": [
              {
                "attachments": [],
                "text": "[disability quick tip]",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_help_parenting_support_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_20",
                "destination_uuid": "uuid_help_parenting_support_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_15",
            "actions": [
              {
                "attachments": [],
                "text": "More tips will be given as part of the ParentApp journey. ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here to continue your ParentApp journey",
                  "Not now"
                ],
                "uuid": "uuid_help_parenting_support_action_14"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_22",
                "destination_uuid": "uuid_help_parenting_support_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_16",
            "actions": [
              {
                "attachments": [],
                "text": "It’s not easy looking after your family. We have built this app based on ten years of evidence, and hundreds thousands of parents have found that it helps with many parenting challenges. We hope this app will help - please give it a chance.",
                "type": "send_msg",
                "quick_replies": [
                  "Click here to continue your ParentApp journey",
                  "Not now"
                ],
                "uuid": "uuid_help_parenting_support_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_23",
                "destination_uuid": "uuid_help_parenting_support_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_19",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Not now"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_8"
                },
                {
                  "arguments": [
                    "Click here to continue your ParentApp journey"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_11",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_9"
                },
                {
                  "arguments": [
                    "Click here to continue your ParentApp journey"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_10"
                },
                {
                  "arguments": [
                    "Click here to continue your ParentApp journey"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_11"
                },
                {
                  "arguments": [
                    "Click here to continue your ParentApp journey"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_14",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_12"
                },
                {
                  "arguments": [
                    "Click here to continue your ParentApp journey"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_13"
                },
                {
                  "arguments": [
                    "Click here to continue your ParentApp journey"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_16",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_14"
                },
                {
                  "arguments": [
                    "Click here to continue your ParentApp journey"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_17",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_15"
                },
                {
                  "arguments": [
                    "Click here to continue your ParentApp journey"
                  ],
                  "category_uuid": "uuid_help_parenting_support_category_18",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_parenting_support_case_16"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_27",
                  "name": "All Responses",
                  "uuid": "uuid_help_parenting_support_category_9"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_28",
                  "name": "Not now",
                  "uuid": "uuid_help_parenting_support_category_10"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_30",
                  "name": "Click here to continue your ParentApp journey",
                  "uuid": "uuid_help_parenting_support_category_11"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_31",
                  "name": "Click here to continue your ParentApp journey",
                  "uuid": "uuid_help_parenting_support_category_12"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_32",
                  "name": "Click here to continue your ParentApp journey",
                  "uuid": "uuid_help_parenting_support_category_13"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_33",
                  "name": "Click here to continue your ParentApp journey",
                  "uuid": "uuid_help_parenting_support_category_14"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_34",
                  "name": "Click here to continue your ParentApp journey",
                  "uuid": "uuid_help_parenting_support_category_15"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_35",
                  "name": "Click here to continue your ParentApp journey",
                  "uuid": "uuid_help_parenting_support_category_16"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_36",
                  "name": "Click here to continue your ParentApp journey",
                  "uuid": "uuid_help_parenting_support_category_17"
                },
                {
                  "exit_uuid": "uuid_help_parenting_support_exit_37",
                  "name": "Click here to continue your ParentApp journey",
                  "uuid": "uuid_help_parenting_support_category_18"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_help_parenting_support_category_9",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_27",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_help_parenting_support_exit_28",
                "destination_uuid": "uuid_help_parenting_support_node_17"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_30",
                "destination_uuid": "uuid_help_parenting_support_node_20"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_31",
                "destination_uuid": "uuid_help_parenting_support_node_20"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_32",
                "destination_uuid": "uuid_help_parenting_support_node_20"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_33",
                "destination_uuid": "uuid_help_parenting_support_node_20"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_34",
                "destination_uuid": "uuid_help_parenting_support_node_20"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_35",
                "destination_uuid": "uuid_help_parenting_support_node_20"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_36",
                "destination_uuid": "uuid_help_parenting_support_node_20"
              },
              {
                "uuid": "uuid_help_parenting_support_exit_37",
                "destination_uuid": "uuid_help_parenting_support_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_17",
            "actions": [
              {
                "uuid": "uuid_help_parenting_support_action_16",
                "type": "set_contact_field",
                "field": {
                  "key": "help_parenting_support__completed",
                  "name": "help_parenting_support__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_25",
                "destination_uuid": "uuid_help_parenting_support_node_18"
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_18",
            "actions": [
              {
                "flow": {
                  "name": "help_main"
                },
                "type": "enter_flow",
                "uuid": "uuid_help_parenting_support_action_17"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_26",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_help_parenting_support_node_20",
            "actions": [
              {
                "uuid": "uuid_help_parenting_support_action_18",
                "type": "set_contact_field",
                "field": {
                  "key": "help_parenting_support__completed",
                  "name": "help_parenting_support__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_parenting_support_exit_29",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "help_safeguarding",
        "uuid": "uuid_help_safeguarding_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_help_safeguarding_node_0",
            "actions": [
              {
                "flow": {
                  "name": "help_sos_providers"
                },
                "type": "enter_flow",
                "uuid": "uuid_help_safeguarding_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_safeguarding_exit_1",
                "destination_uuid": "uuid_help_safeguarding_node_1"
              },
              {
                "uuid": "uuid_help_safeguarding_exit_2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_help_safeguarding_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_help_safeguarding_category_0"
                },
                {
                  "uuid": "uuid_help_safeguarding_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_help_safeguarding_category_1"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_help_safeguarding_category_0",
                  "name": "Complete",
                  "exit_uuid": "uuid_help_safeguarding_exit_1"
                },
                {
                  "uuid": "uuid_help_safeguarding_category_1",
                  "name": "Expired",
                  "exit_uuid": "uuid_help_safeguarding_exit_2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_help_safeguarding_category_0"
            }
          },
          {
            "uuid": "uuid_help_safeguarding_node_1",
            "actions": [
              {
                "flow": {
                  "name": "help_not_sos_providers"
                },
                "type": "enter_flow",
                "uuid": "uuid_help_safeguarding_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_safeguarding_exit_4",
                "destination_uuid": "uuid_help_safeguarding_node_2"
              },
              {
                "uuid": "uuid_help_safeguarding_exit_5",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_help_safeguarding_case_2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_help_safeguarding_category_2"
                },
                {
                  "uuid": "uuid_help_safeguarding_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_help_safeguarding_category_3"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_help_safeguarding_category_2",
                  "name": "Complete",
                  "exit_uuid": "uuid_help_safeguarding_exit_4"
                },
                {
                  "uuid": "uuid_help_safeguarding_category_3",
                  "name": "Expired",
                  "exit_uuid": "uuid_help_safeguarding_exit_5"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_help_safeguarding_category_2"
            }
          },
          {
            "uuid": "uuid_help_safeguarding_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "You clicked ''something bad happened''. We hope you and your family are safe. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_help_safeguarding_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_safeguarding_exit_6",
                "destination_uuid": "uuid_help_safeguarding_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_help_safeguarding_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "If you ever feel like talking confidentially to a trained professional, you can call:\n@fields.provider_a at @fields.provider_a_phone\n@fields.provider_b at @fields.provider_b_phone\n@fields.provider_c at @fields.provider_c_phone\n@fields.provider_d at @fields.provider_d_phone\nYou should be proud of yourself for exploring ways to get help.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_help_safeguarding_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_safeguarding_exit_7",
                "destination_uuid": "uuid_help_safeguarding_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_help_safeguarding_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "When you’re ready, click ''back'' to go back to the ''help me now'' menu",
                "type": "send_msg",
                "quick_replies": [
                  "Back"
                ],
                "uuid": "uuid_help_safeguarding_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_safeguarding_exit_8",
                "destination_uuid": "uuid_help_safeguarding_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_help_safeguarding_node_7",
            "actions": [],
            "router": {
              "type": "switch",
              "cases": [
                {
                  "arguments": [
                    "Back"
                  ],
                  "category_uuid": "uuid_help_safeguarding_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_help_safeguarding_case_4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_help_safeguarding_exit_11",
                  "name": "All Responses",
                  "uuid": "uuid_help_safeguarding_category_4"
                },
                {
                  "exit_uuid": "uuid_help_safeguarding_exit_12",
                  "name": "Back",
                  "uuid": "uuid_help_safeguarding_category_5"
                }
              ],
              "operand": "@input.text",
              "default_category_uuid": "uuid_help_safeguarding_category_4",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_help_safeguarding_exit_11",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_help_safeguarding_exit_12",
                "destination_uuid": "uuid_help_safeguarding_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_help_safeguarding_node_5",
            "actions": [
              {
                "uuid": "uuid_help_safeguarding_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "help_safeguarding__completed",
                  "name": "help_safeguarding__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_safeguarding_exit_9",
                "destination_uuid": "uuid_help_safeguarding_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_help_safeguarding_node_6",
            "actions": [
              {
                "flow": {
                  "name": "help_main"
                },
                "type": "enter_flow",
                "uuid": "uuid_help_safeguarding_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_safeguarding_exit_10",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "help_app_support",
        "uuid": "uuid_help_app_support_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_help_app_support_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear you are having technical problems. We're still improving this. Please write us to ParentApp.support@Parentinglh.org so we can help",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_help_app_support_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_app_support_exit_0",
                "destination_uuid": "uuid_help_app_support_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_help_app_support_node_1",
            "actions": [
              {
                "uuid": "uuid_help_app_support_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "help_app_support__completed",
                  "name": "help_app_support__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_app_support_exit_1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "help_sos_providers",
        "uuid": "uuid_help_sos_providers_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_help_sos_providers_node_0",
            "actions": [
              {
                "uuid": "uuid_help_sos_providers_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "provider_a",
                  "name": "provider_a"
                },
                "value": "Police"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_sos_providers_exit_0",
                "destination_uuid": "uuid_help_sos_providers_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_help_sos_providers_node_1",
            "actions": [
              {
                "uuid": "uuid_help_sos_providers_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "provider_a_phone",
                  "name": "provider_a_phone"
                },
                "value": "10111"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_sos_providers_exit_1",
                "destination_uuid": "uuid_help_sos_providers_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_help_sos_providers_node_2",
            "actions": [
              {
                "uuid": "uuid_help_sos_providers_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "provider_b",
                  "name": "provider_b"
                },
                "value": "Ambulance"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_sos_providers_exit_2",
                "destination_uuid": "uuid_help_sos_providers_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_help_sos_providers_node_3",
            "actions": [
              {
                "uuid": "uuid_help_sos_providers_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "provider_b_phone",
                  "name": "provider_b_phone"
                },
                "value": "10177"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_sos_providers_exit_3",
                "destination_uuid": "uuid_help_sos_providers_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_help_sos_providers_node_4",
            "actions": [
              {
                "uuid": "uuid_help_sos_providers_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "country",
                  "name": "country"
                },
                "value": "South Africa"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_sos_providers_exit_4",
                "destination_uuid": "uuid_help_sos_providers_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_help_sos_providers_node_5",
            "actions": [
              {
                "uuid": "uuid_help_sos_providers_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "help_sos_providers__completed",
                  "name": "help_sos_providers__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_sos_providers_exit_5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  },
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "help_not_sos_providers",
        "uuid": "uuid_help_not_sos_providers_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_help_not_sos_providers_node_0",
            "actions": [
              {
                "uuid": "uuid_help_not_sos_providers_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "provider_c",
                  "name": "provider_c"
                },
                "value": "Mental health helpline"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_not_sos_providers_exit_0",
                "destination_uuid": "uuid_help_not_sos_providers_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_help_not_sos_providers_node_1",
            "actions": [
              {
                "uuid": "uuid_help_not_sos_providers_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "provider_c_phone",
                  "name": "provider_c_phone"
                },
                "value": "0800 21 22 23"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_not_sos_providers_exit_1",
                "destination_uuid": "uuid_help_not_sos_providers_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_help_not_sos_providers_node_2",
            "actions": [
              {
                "uuid": "uuid_help_not_sos_providers_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "provider_d",
                  "name": "provider_d"
                },
                "value": "Childline South Africa"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_not_sos_providers_exit_2",
                "destination_uuid": "uuid_help_not_sos_providers_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_help_not_sos_providers_node_3",
            "actions": [
              {
                "uuid": "uuid_help_not_sos_providers_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "provider_d_phone",
                  "name": "provider_d_phone"
                },
                "value": "08 000 55 555"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_not_sos_providers_exit_3",
                "destination_uuid": "uuid_help_not_sos_providers_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_help_not_sos_providers_node_4",
            "actions": [
              {
                "uuid": "uuid_help_not_sos_providers_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "help_not_sos_providers__completed",
                  "name": "help_not_sos_providers__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_help_not_sos_providers_exit_4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
    "site": "https://rapidpro.idems.international",
    "triggers": [],
    "version": "13"
  }
]