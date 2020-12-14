/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const conversation: FlowTypes.Conversation[] = [
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
              "default_category_uuid": "uuid_example_main_category_2",
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
              "default_category_uuid": "uuid_example_main_category_14",
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
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "uuid_example_media_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_media_exit_2",
                "destination_uuid": "uuid_example_media_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_example_media_category_0",
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
                  "exit_uuid": "uuid_example_media_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_example_media_category_0"
                },
                {
                  "exit_uuid": "uuid_example_media_exit_5",
                  "name": "image1; image2",
                  "uuid": "uuid_example_media_category_1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_media_exit_4",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_media_exit_5",
                "destination_uuid": "uuid_example_media_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
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
                "destination_uuid": "uuid_example_media_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_example_media_category_2",
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
                  "exit_uuid": "uuid_example_media_exit_7",
                  "name": "All Responses",
                  "uuid": "uuid_example_media_category_2"
                },
                {
                  "exit_uuid": "uuid_example_media_exit_8",
                  "name": "image1; image2",
                  "uuid": "uuid_example_media_category_3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_example_media_exit_7",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_example_media_exit_8",
                "destination_uuid": "uuid_example_media_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_example_media_node_5",
            "actions": [
              {
                "uuid": "uuid_example_media_action_4",
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
                "uuid": "uuid_example_media_exit_6",
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
              "default_category_uuid": "uuid_example_tickbox_category_0",
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
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
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
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
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
              "default_category_uuid": "uuid_example_tickbox_category_3",
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
              "default_category_uuid": "uuid_example_variables_category_1",
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
              "operand": "@fields.favourite_number"
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
        "name": "example_story",
        "uuid": "uuid_example_story_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_example_story_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "uuid_example_story_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story_exit_0",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_example_story_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "This text appears below the image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_story_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story_exit_2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_example_story_node_5",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/guide1/neutral.svg"
                ],
                "text": "This text appears above the image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_story_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story_exit_5",
                "destination_uuid": "uuid_example_story_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_example_story_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "This text appears below the image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_story_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story_exit_6",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_example_story_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "This is descriptive text. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_story_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story_exit_10",
                "destination_uuid": "uuid_example_story_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_example_story_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "This text is said by @fields.guide. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_story_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story_exit_11",
                "destination_uuid": "uuid_example_story_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_example_story_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "This text is said by @fields.neighbour. https://plh-demo1.idems.international/chat/msg-info?character=neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_story_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story_exit_12",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_example_story_node_14",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_example_story_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story_exit_14",
                "destination_uuid": "uuid_example_story_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_example_story_node_15",
            "actions": [
              {
                "uuid": "uuid_example_story_action_8",
                "type": "set_contact_field",
                "field": {
                  "key": "example_story__completed",
                  "name": "example_story__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_example_story_exit_15",
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
        "name": "first_app_opening",
        "uuid": "uuid_first_app_opening_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_first_app_opening_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_first_app_opening_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_opening_exit_0",
                "destination_uuid": "uuid_first_app_opening_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_opening_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "uuid_first_app_opening_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_opening_exit_1",
                "destination_uuid": "uuid_first_app_opening_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_opening_node_2",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_first_app_opening_exit_2",
                "destination_uuid": "uuid_first_app_opening_node_3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_first_app_opening_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_first_app_opening_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_first_app_opening_exit_2"
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
            "uuid": "uuid_first_app_opening_node_3",
            "actions": [
              {
                "uuid": "uuid_first_app_opening_action_2",
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
                "uuid": "uuid_first_app_opening_exit_3",
                "destination_uuid": "uuid_first_app_opening_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_opening_node_4",
            "actions": [
              {
                "flow": {
                  "name": "character_names"
                },
                "type": "enter_flow",
                "uuid": "uuid_first_app_opening_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_opening_exit_5",
                "destination_uuid": "uuid_first_app_opening_node_5"
              },
              {
                "uuid": "uuid_first_app_opening_exit_6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_first_app_opening_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_first_app_opening_category_1"
                },
                {
                  "uuid": "uuid_first_app_opening_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_first_app_opening_category_2"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_first_app_opening_category_1",
                  "name": "Complete",
                  "exit_uuid": "uuid_first_app_opening_exit_5"
                },
                {
                  "uuid": "uuid_first_app_opening_category_2",
                  "name": "Expired",
                  "exit_uuid": "uuid_first_app_opening_exit_6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_first_app_opening_category_1"
            }
          },
          {
            "uuid": "uuid_first_app_opening_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "uuid_first_app_opening_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_opening_exit_7",
                "destination_uuid": "uuid_first_app_opening_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_opening_node_6",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_first_app_opening_exit_8",
                "destination_uuid": "uuid_first_app_opening_node_7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_first_app_opening_category_3",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_first_app_opening_category_3",
                  "name": "All Responses",
                  "exit_uuid": "uuid_first_app_opening_exit_8"
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
            "uuid": "uuid_first_app_opening_node_7",
            "actions": [
              {
                "uuid": "uuid_first_app_opening_action_5",
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
                "uuid": "uuid_first_app_opening_exit_9",
                "destination_uuid": "uuid_first_app_opening_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_opening_node_9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_first_app_opening_category_4",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "uuid_first_app_opening_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_first_app_opening_case_2"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "uuid_first_app_opening_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_first_app_opening_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_first_app_opening_exit_11",
                  "name": "All Responses",
                  "uuid": "uuid_first_app_opening_category_4"
                },
                {
                  "exit_uuid": "uuid_first_app_opening_exit_12",
                  "name": "guide1",
                  "uuid": "uuid_first_app_opening_category_5"
                },
                {
                  "exit_uuid": "uuid_first_app_opening_exit_14",
                  "name": "guide2",
                  "uuid": "uuid_first_app_opening_category_6"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "uuid_first_app_opening_exit_11",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_first_app_opening_exit_12",
                "destination_uuid": "uuid_first_app_opening_node_8"
              },
              {
                "uuid": "uuid_first_app_opening_exit_14",
                "destination_uuid": "uuid_first_app_opening_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_opening_node_8",
            "actions": [
              {
                "uuid": "uuid_first_app_opening_action_6",
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
                "uuid": "uuid_first_app_opening_exit_10",
                "destination_uuid": "uuid_first_app_opening_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_opening_node_10",
            "actions": [
              {
                "uuid": "uuid_first_app_opening_action_7",
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
                "uuid": "uuid_first_app_opening_exit_13",
                "destination_uuid": "uuid_first_app_opening_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_opening_node_11",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/busy.svg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_first_app_opening_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_opening_exit_15",
                "destination_uuid": "uuid_first_app_opening_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_first_app_opening_node_12",
            "actions": [
              {
                "uuid": "uuid_first_app_opening_action_9",
                "type": "set_contact_field",
                "field": {
                  "key": "first_app_opening__completed",
                  "name": "first_app_opening__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_first_app_opening_exit_16",
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
                "text": "What makes you happy?",
                "type": "send_msg",
                "quick_replies": [
                  "Have a hot drink",
                  "Call a friend or family",
                  "Have a relaxed bath",
                  "Read",
                  "Watch TV"
                ],
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
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_1",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_self-care_package_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_self-care_package_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_1"
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
            "uuid": "uuid_mod_welcome_self-care_package_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_action_1",
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
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_2"
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
                "attachments": [],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_4",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_5",
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
                "uuid": "uuid_mod_welcome_self-care_package_exit_6",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_6"
              },
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_7",
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
                  "category_uuid": "uuid_mod_welcome_self-care_package_category_1"
                },
                {
                  "uuid": "uuid_mod_welcome_self-care_package_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_welcome_self-care_package_category_2"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_welcome_self-care_package_category_1",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_6"
                },
                {
                  "uuid": "uuid_mod_welcome_self-care_package_category_2",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_self-care_package_category_1"
            }
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_5"
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
                "uuid": "uuid_mod_welcome_self-care_package_exit_9",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_self-care_package_node_8",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_self-care_package_exit_10",
                "destination_uuid": "uuid_mod_welcome_self-care_package_node_9"
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
                  "exit_uuid": "uuid_mod_welcome_self-care_package_exit_10"
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
            "uuid": "uuid_mod_welcome_self-care_package_node_9",
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
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_8"
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
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_welcome_self-care_package_action_9"
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
                "uuid": "uuid_mod_welcome_self-care_package_action_10",
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
                "uuid": "uuid_mod_welcome_self-care_package_exit_14",
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
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Try telling your teen how much you appreciated that. Over time they will want to do these more. https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "uuid": "uuid_mod_welcome_quick_praise_action_2",
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
                "uuid": "uuid_mod_welcome_quick_praise_exit_2",
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
                "text": "It is hard to find time to have fun with your teen. How many days in the past week did you do something fun together? https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_1",
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
              "operand": "@fields.welcome_survey_q_1"
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
                "text": "We know it is hard to find time in our busy lives. Well done for trying your best! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Well done for spending time with your teen, it makes all the difference! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_5",
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
                "text": "Focusing on the positive will help you see that behaviour more. How many days in the past week have you praised your teen? https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_7",
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
              "operand": "@fields.welcome_survey_q_2"
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
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot. https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_11",
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
                "text": "This is a very stressful time for families. How many days in the past week did you feel very stressed as a parent/caregiver?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_13",
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
              "operand": "@fields.welcome_survey_q_3"
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
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing. https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help. https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_17",
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
                "text": "Sometimes our children make us really upset. How many days in the past week did you shout, scream or yell at your children?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_19",
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
              "operand": "@fields.welcome_survey_q_4"
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
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_23",
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
                "text": "It is so stressful when children misbehave. How many days in the past week did you physically discipline your children by hitting, spanking, or slapping with your hand or an object like a stick or a belt?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_25",
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
              "operand": "@fields.welcome_survey_q_5"
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
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_28",
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
                "text": "Bonus question: We all want to keep our children safe. How confident do you feel you are able to protect your child from sexual abuse online or in-person?\n(0 = not confident to 8 = extremely confident) https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_30",
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
              "operand": "@fields.welcome_survey_q_6"
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
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_welcome_survey_category_33",
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
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support.  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
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
        "name": "mod_welcome_photo_activity",
        "uuid": "uuid_mod_welcome_photo_activity_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_welcome_photo_activity_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "uuid_mod_welcome_photo_activity_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_photo_activity_exit_0",
                "destination_uuid": "uuid_mod_welcome_photo_activity_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_photo_activity_node_3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_welcome_photo_activity_category_0",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "uuid_mod_welcome_photo_activity_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_welcome_photo_activity_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_welcome_photo_activity_exit_3",
                  "name": "All Responses",
                  "uuid": "uuid_mod_welcome_photo_activity_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_welcome_photo_activity_exit_4",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "uuid_mod_welcome_photo_activity_category_1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_welcome_photo_activity_exit_3",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_welcome_photo_activity_exit_4",
                "destination_uuid": "uuid_mod_welcome_photo_activity_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_photo_activity_node_1",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_photo_activity_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_photo_activity__completed",
                  "name": "mod_welcome_photo_activity__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_photo_activity_exit_1",
                "destination_uuid": "uuid_mod_welcome_photo_activity_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_photo_activity_node_2",
            "actions": [
              {
                "flow": {
                  "name": "gallery"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_welcome_photo_activity_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_photo_activity_exit_2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_welcome_photo_activity_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_welcome_photo_activity_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_welcome_photo_activity__completed",
                  "name": "mod_welcome_photo_activity__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_welcome_photo_activity_exit_6",
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
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/happy.svg"
                ],
                "text": "Well done for a week of parenting! A new module is available for you https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_unlocked_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_unlocked_exit_0",
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
                "text": "Welcome! How are you feeling today? https://plh-demo1.idems.international/chat/msg-info?character=guide&choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "Happy",
                  "Neutral",
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
              "default_category_uuid": "uuid_mod_1on1_emo_category_0",
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
                    "Neutral"
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
                  "name": "Neutral; Sad",
                  "uuid": "uuid_mod_1on1_emo_category_2"
                }
              ],
              "operand": "@input.text",
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
                "text": "Great to hear you are doing well! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_emo_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_1",
                "destination_uuid": "uuid_mod_1on1_emo_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "A 30 second relax can help Let's take a quick pause together. Do you have 30 seconds? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_mod_1on1_emo_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_6",
                "destination_uuid": "uuid_mod_1on1_emo_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_emo_category_5",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_1on1_emo_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_emo_case_5"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "uuid_mod_1on1_emo_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_emo_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_emo_exit_10",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_emo_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_emo_exit_11",
                  "name": "Yes",
                  "uuid": "uuid_mod_1on1_emo_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_emo_exit_13",
                  "name": "No",
                  "uuid": "uuid_mod_1on1_emo_category_7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_10",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_emo_exit_11",
                "destination_uuid": "uuid_mod_1on1_emo_node_5"
              },
              {
                "uuid": "uuid_mod_1on1_emo_exit_13",
                "destination_uuid": "uuid_mod_1on1_emo_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_5",
            "actions": [
              {
                "flow": {
                  "name": "calm_1"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_emo_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_8",
                "destination_uuid": "uuid_mod_1on1_emo_node_8"
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
            "uuid": "uuid_mod_1on1_emo_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_emo_action_5"
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
            "uuid": "uuid_mod_1on1_emo_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_emo_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_emo_exit_14",
                "destination_uuid": "uuid_mod_1on1_emo_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_9",
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
                "uuid": "uuid_mod_1on1_emo_exit_15",
                "destination_uuid": "uuid_mod_1on1_emo_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_emo_node_10",
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
                "uuid": "uuid_mod_1on1_emo_exit_16",
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
                "text": "But science shows that spending just a few minutes each day of focused one-on-one time with your teen helps build trust and love. https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "It’s a time when you focus on them, without TV or phones. Let them lead what you do or talk about. https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Feel like you have NO TIME and you are exhausted?....Yes, I know how it is. This is why we talked with parents in @fields.country and they found ways to do one on one time that don’t take up extra time: \n- Walking to the shops, or to get water together \n- Washing the dishes \n- Doing a chore together\n https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "It may not have instant results, but it will make a difference over the long term. You are an amazing parent for trying this. https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "I have 3 tips to make your One-on-One Time great! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Show me the tips",
                  "Later"
                ],
                "uuid": "uuid_mod_1on1_intro_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_5",
                "destination_uuid": "uuid_mod_1on1_intro_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_intro_category_0",
              "cases": [
                {
                  "arguments": [
                    "Show me the tips"
                  ],
                  "category_uuid": "uuid_mod_1on1_intro_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_intro_case_0"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "uuid_mod_1on1_intro_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_intro_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_intro_exit_7",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_intro_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_intro_exit_8",
                  "name": "Show me the tips",
                  "uuid": "uuid_mod_1on1_intro_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_intro_exit_12",
                  "name": "Later",
                  "uuid": "uuid_mod_1on1_intro_category_2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_7",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_intro_exit_8",
                "destination_uuid": "uuid_mod_1on1_intro_node_6"
              },
              {
                "uuid": "uuid_mod_1on1_intro_exit_12",
                "destination_uuid": "uuid_mod_1on1_intro_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_intro_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_6",
                "destination_uuid": "uuid_mod_1on1_intro_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_8",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_intro_action_7",
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
                "uuid": "uuid_mod_1on1_intro_exit_9",
                "destination_uuid": "uuid_mod_1on1_intro_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_9",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_intro_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_10",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "uuid_mod_1on1_intro_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_11",
                "destination_uuid": "uuid_mod_1on1_intro_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_13",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_intro_category_3",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "uuid_mod_1on1_intro_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_intro_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_intro_exit_15",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_intro_category_3"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_intro_exit_16",
                  "name": "Take me to Homescreen",
                  "uuid": "uuid_mod_1on1_intro_category_4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_15",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_intro_exit_16",
                "destination_uuid": "uuid_mod_1on1_intro_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_11",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_intro_action_10",
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
                "uuid": "uuid_mod_1on1_intro_exit_13",
                "destination_uuid": "uuid_mod_1on1_intro_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_intro_node_12",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_intro_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_intro_exit_14",
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
                "text": "This week, can you try 5 minutes of one-on-one time with your teen every day that you can?",
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
                "text": "These are ideas that some of our 134 million parent users say are good!",
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
                "text": "Here are some ideas! You can add yours too. You can also show this list to your teen.",
                "type": "send_msg",
                "quick_replies": [
                  "Prepare dinner",
                  "Eat a meal together",
                  "Have tea after school",
                  "Watch a TV show",
                  "Review homework",
                  "Walk to school/shop",
                  "Chat before bedtime",
                  "Play a game/sport"
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
                "destination_uuid": "uuid_mod_1on1_activity_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Don’t forget to let your teen pick the activity!",
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
            "actions": [
              {
                "attachments": [],
                "text": "Every time you do one-on-one time mark your STAR to track your success",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "uuid_mod_1on1_activity_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_6",
                "destination_uuid": "uuid_mod_1on1_activity_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_activity_category_1",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_activity_exit_9",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_activity_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_exit_10",
                  "name": "Take me to Homescreen",
                  "uuid": "uuid_mod_1on1_activity_category_2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_9",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_activity_exit_10",
                "destination_uuid": "uuid_mod_1on1_activity_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_7",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_action_6",
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
                "uuid": "uuid_mod_1on1_activity_exit_7",
                "destination_uuid": "uuid_mod_1on1_activity_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_node_8",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_exit_8",
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
                "text": "Your goal was to do one or more of these activities with your teen: @fields.mod_1on1_chooseact\n\nHow did it go?  https://plh-demo1.idems.international/chat/msg-info?character=guide&choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "Great",
                  "Neutral",
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
              "default_category_uuid": "uuid_mod_1on1_activity_review_category_1",
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
                    "Neutral"
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
                  "name": "Neutral",
                  "uuid": "uuid_mod_1on1_activity_review_category_3"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_15",
                  "name": "Bad",
                  "uuid": "uuid_mod_1on1_activity_review_category_8"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
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
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Do you have a photo of your time together? Or any nice photo? I would love to see it! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Upload",
                  "Skip"
                ],
                "uuid": "uuid_mod_1on1_activity_review_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_22",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_14",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_activity_review_category_13",
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
                    "Skip"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_review_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_review_case_12"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_25",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_activity_review_category_13"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_26",
                  "name": "Upload",
                  "uuid": "uuid_mod_1on1_activity_review_category_14"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_review_exit_29",
                  "name": "Skip",
                  "uuid": "uuid_mod_1on1_activity_review_category_15"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_25",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_26",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_12"
              },
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_29",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_12",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_review_action_10",
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
                "uuid": "uuid_mod_1on1_activity_review_exit_23",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_13",
            "actions": [
              {
                "flow": {
                  "name": "gallery"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_review_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_24",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_15",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_review_action_12",
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
                "uuid": "uuid_mod_1on1_activity_review_exit_27",
                "destination_uuid": "uuid_mod_1on1_activity_review_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_review_node_16",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_review_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_review_exit_28",
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
                "attachments": [],
                "text": "Which of my tips helped you?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "\"Day\" - Do it every day",
                  "\"Play\" - Let your teen choose the activity",
                  "\"Stay\" - Give your teen all of your attention",
                  "None"
                ],
                "uuid": "uuid_mod_1on1_highlights_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_0",
                "destination_uuid": "uuid_mod_1on1_highlights_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_1",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_1",
                "destination_uuid": "uuid_mod_1on1_highlights_node_2"
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
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_1"
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
            "uuid": "uuid_mod_1on1_highlights_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_1",
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
                "uuid": "uuid_mod_1on1_highlights_exit_2",
                "destination_uuid": "uuid_mod_1on1_highlights_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Did any of my tips help you when you tried spending One-on-One Time? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "\"Day\" - Do it every day",
                  "\"Play\" - Let your teen choose the activity",
                  "\"Stay\" - Give your teen all of your attention",
                  "None"
                ],
                "uuid": "uuid_mod_1on1_highlights_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_3",
                "destination_uuid": "uuid_mod_1on1_highlights_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_4",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_4",
                "destination_uuid": "uuid_mod_1on1_highlights_node_5"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_highlights_category_1",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_highlights_category_1",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_4"
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
            "uuid": "uuid_mod_1on1_highlights_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_3",
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
                "uuid": "uuid_mod_1on1_highlights_exit_5",
                "destination_uuid": "uuid_mod_1on1_highlights_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_highlights_category_3",
              "cases": [
                {
                  "arguments": [
                    "\"Day\" - Do it every day"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_0"
                },
                {
                  "arguments": [
                    "\"Play\" - Let your teen choose the activity"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_1"
                },
                {
                  "arguments": [
                    "\"Play\" - Let your teen choose the activity"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_2"
                },
                {
                  "arguments": [
                    "\"Stay\" - Give your teen all of your attention"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_3"
                },
                {
                  "arguments": [
                    "\"Stay\" - Give your teen all of your attention"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_4"
                },
                {
                  "arguments": [
                    "None"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_11",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_5"
                },
                {
                  "arguments": [
                    "None"
                  ],
                  "category_uuid": "uuid_mod_1on1_highlights_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_highlights_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_9",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_highlights_category_3"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_10",
                  "name": "\"Day\" - Do it every day",
                  "uuid": "uuid_mod_1on1_highlights_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_15",
                  "name": "\"Play\" - Let your teen choose the activity",
                  "uuid": "uuid_mod_1on1_highlights_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_16",
                  "name": "\"Play\" - Let your teen choose the activity",
                  "uuid": "uuid_mod_1on1_highlights_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_21",
                  "name": "\"Stay\" - Give your teen all of your attention",
                  "uuid": "uuid_mod_1on1_highlights_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_22",
                  "name": "\"Stay\" - Give your teen all of your attention",
                  "uuid": "uuid_mod_1on1_highlights_category_10"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_25",
                  "name": "None",
                  "uuid": "uuid_mod_1on1_highlights_category_11"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_26",
                  "name": "None",
                  "uuid": "uuid_mod_1on1_highlights_category_12"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_9",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_10",
                "destination_uuid": "uuid_mod_1on1_highlights_node_6"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_15",
                "destination_uuid": "uuid_mod_1on1_highlights_node_11"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_16",
                "destination_uuid": "uuid_mod_1on1_highlights_node_11"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_21",
                "destination_uuid": "uuid_mod_1on1_highlights_node_15"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_22",
                "destination_uuid": "uuid_mod_1on1_highlights_node_15"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_25",
                "destination_uuid": "uuid_mod_1on1_highlights_node_19"
              },
              {
                "uuid": "uuid_mod_1on1_highlights_exit_26",
                "destination_uuid": "uuid_mod_1on1_highlights_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Having a specific time helps me remember ",
                  "With a routine my teen and I can both keep our schedule free",
                  "Spending time every day helps build trust with my teen "
                ],
                "uuid": "uuid_mod_1on1_highlights_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_6",
                "destination_uuid": "uuid_mod_1on1_highlights_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_7",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_7",
                "destination_uuid": "uuid_mod_1on1_highlights_node_8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_highlights_category_2",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_1on1_highlights_category_2",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_7"
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
            "uuid": "uuid_mod_1on1_highlights_node_8",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_5",
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
                "uuid": "uuid_mod_1on1_highlights_exit_8",
                "destination_uuid": "uuid_mod_1on1_highlights_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_highlights_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_11",
                "destination_uuid": "uuid_mod_1on1_highlights_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Letting my teen choose what to do builds their confidence",
                  "If my teen chooses, he/she is more likely to want to spend time together",
                  "Letting my teen choose shows that I care about his/her interests",
                  "By accepting my teen’s suggestions, I show I listen to him/her",
                  "Saying something nice about my teen’s choice helps them feel valued"
                ],
                "uuid": "uuid_mod_1on1_highlights_action_7"
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
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_13",
                "destination_uuid": "uuid_mod_1on1_highlights_node_13"
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
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_13"
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
            "uuid": "uuid_mod_1on1_highlights_node_13",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_8",
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
                "uuid": "uuid_mod_1on1_highlights_exit_14",
                "destination_uuid": "uuid_mod_1on1_highlights_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_14",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_highlights_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_17",
                "destination_uuid": "uuid_mod_1on1_highlights_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_15",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "By preventing interruptions, I show my teen they are most important",
                  "Even if I can't join my teen's activity, like sports, I can still cheer them on",
                  "When I pay attention, I can learn so much about my teen's interests, views and capabilities"
                ],
                "uuid": "uuid_mod_1on1_highlights_action_10"
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
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_19",
                "destination_uuid": "uuid_mod_1on1_highlights_node_17"
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
                  "exit_uuid": "uuid_mod_1on1_highlights_exit_19"
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
            "uuid": "uuid_mod_1on1_highlights_node_17",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_highlights_action_11",
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
                "uuid": "uuid_mod_1on1_highlights_exit_20",
                "destination_uuid": "uuid_mod_1on1_highlights_node_18"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_18",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_highlights_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_highlights_exit_23",
                "destination_uuid": "uuid_mod_1on1_highlights_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_highlights_node_19",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_highlights_action_13"
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
                "uuid": "uuid_mod_1on1_highlights_action_14",
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
                "uuid": "uuid_mod_1on1_highlights_exit_27",
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
                "attachments": [],
                "text": "These are the top 8 challenges and solutions that parents have with one-on-one time https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "uuid": "uuid_mod_1on1_challenges_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_0",
                "destination_uuid": "uuid_mod_1on1_challenges_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any challenges when trying to spend time with your teen?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "What challenges did you have when trying to spend time with your teen?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "uuid": "uuid_mod_1on1_challenges_exit_2",
                "destination_uuid": "uuid_mod_1on1_challenges_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_0",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_0"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_4"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_5"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_9"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_10"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_18",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_14"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_19",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_15"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_23",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_18"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_24",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_19"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_28",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_22"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_29",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_23"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_33",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_26"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_34",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_27"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_39",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_31"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_40",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_32"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_5",
                  "name": "I don’t have enough time",
                  "uuid": "uuid_mod_1on1_challenges_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_14",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "uuid_mod_1on1_challenges_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_15",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "uuid_mod_1on1_challenges_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_24",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "uuid_mod_1on1_challenges_category_12"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_25",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "uuid_mod_1on1_challenges_category_13"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_34",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "uuid_mod_1on1_challenges_category_18"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_35",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "uuid_mod_1on1_challenges_category_19"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_42",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "uuid_mod_1on1_challenges_category_23"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_43",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "uuid_mod_1on1_challenges_category_24"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_50",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "uuid_mod_1on1_challenges_category_28"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_51",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "uuid_mod_1on1_challenges_category_29"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_58",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "uuid_mod_1on1_challenges_category_33"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_59",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "uuid_mod_1on1_challenges_category_34"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_68",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "uuid_mod_1on1_challenges_category_39"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_69",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "uuid_mod_1on1_challenges_category_40"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_4",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_5",
                "destination_uuid": "uuid_mod_1on1_challenges_node_3"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_14",
                "destination_uuid": "uuid_mod_1on1_challenges_node_9"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_15",
                "destination_uuid": "uuid_mod_1on1_challenges_node_9"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_24",
                "destination_uuid": "uuid_mod_1on1_challenges_node_14"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_25",
                "destination_uuid": "uuid_mod_1on1_challenges_node_14"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_34",
                "destination_uuid": "uuid_mod_1on1_challenges_node_19"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_35",
                "destination_uuid": "uuid_mod_1on1_challenges_node_19"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_42",
                "destination_uuid": "uuid_mod_1on1_challenges_node_23"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_43",
                "destination_uuid": "uuid_mod_1on1_challenges_node_23"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_50",
                "destination_uuid": "uuid_mod_1on1_challenges_node_27"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_51",
                "destination_uuid": "uuid_mod_1on1_challenges_node_27"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_58",
                "destination_uuid": "uuid_mod_1on1_challenges_node_31"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_59",
                "destination_uuid": "uuid_mod_1on1_challenges_node_31"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_68",
                "destination_uuid": "uuid_mod_1on1_challenges_node_36"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_69",
                "destination_uuid": "uuid_mod_1on1_challenges_node_36"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "I know it can be hard to find time during our day, with work, chores, and everything else.\nDo you want to try one of the following things? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Think of a time each day that I can make 5 minutes or a bit more.",
                  "Find a chore that I could do together in a fun way.",
                  "Ask my teen or someone else to help me with a chore so I have some extra free time."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_3",
                "destination_uuid": "uuid_mod_1on1_challenges_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_2",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_1"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_2"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_7",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_8",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "uuid_mod_1on1_challenges_category_3"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_10",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "uuid_mod_1on1_challenges_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_12",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "uuid_mod_1on1_challenges_category_5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_7",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_8",
                "destination_uuid": "uuid_mod_1on1_challenges_node_5"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_10",
                "destination_uuid": "uuid_mod_1on1_challenges_node_7"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_12",
                "destination_uuid": "uuid_mod_1on1_challenges_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_6",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_9",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_11",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry you struggled with that. It can make us feel bad if our children do not want to spend One-on-One Time us.\nDo you want to try one of the following things? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "Do something fun with the whole family. "
                ],
                "uuid": "uuid_mod_1on1_challenges_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_13",
                "destination_uuid": "uuid_mod_1on1_challenges_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_11",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_8",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_6"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_7"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_11",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_17",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_8"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_18",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "uuid_mod_1on1_challenges_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_20",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "uuid_mod_1on1_challenges_category_10"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_22",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "uuid_mod_1on1_challenges_category_11"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_17",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_18",
                "destination_uuid": "uuid_mod_1on1_challenges_node_10"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_20",
                "destination_uuid": "uuid_mod_1on1_challenges_node_12"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_22",
                "destination_uuid": "uuid_mod_1on1_challenges_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_16",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_19",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_13",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_21",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_14",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry you had that challenge. Children often want to spend time watching T.V. or playing with a gadget. Well done for being patient with them!\nDo you want to try one of the following things? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other fun options to do instead.",
                  "Find something educational to do together with my teen on the gadget.",
                  "Ask my teen to show how their phone/gadget works."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_23",
                "destination_uuid": "uuid_mod_1on1_challenges_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_16",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_14",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_11"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_16",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_12"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_17",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_13"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_27",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_14"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_28",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "uuid_mod_1on1_challenges_category_15"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_30",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "uuid_mod_1on1_challenges_category_16"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_32",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "uuid_mod_1on1_challenges_category_17"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_27",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_28",
                "destination_uuid": "uuid_mod_1on1_challenges_node_15"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_30",
                "destination_uuid": "uuid_mod_1on1_challenges_node_17"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_32",
                "destination_uuid": "uuid_mod_1on1_challenges_node_18"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_15",
            "actions": [
              {
                "attachments": [],
                "text": "That’s perfect! If you need any inspiration, I can give you some ideas of what you could do! In a minute we will give you a list of his suggested activities. Remember, let your teen choose! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_26",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_17",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_29",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_18",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_14"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_31",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_19",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_33",
                "destination_uuid": "uuid_mod_1on1_challenges_node_21"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_21",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_20",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_21",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_16"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_22",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_17"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_37",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_20"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_38",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "uuid_mod_1on1_challenges_category_21"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_40",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "uuid_mod_1on1_challenges_category_22"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_37",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_38",
                "destination_uuid": "uuid_mod_1on1_challenges_node_20"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_40",
                "destination_uuid": "uuid_mod_1on1_challenges_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_20",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_16"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_36",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_22",
            "actions": [
              {
                "attachments": [],
                "text": "That’s perfect! If you need any inspiration, I can give you some ideas of what you could do! In a minute we will give you a list of his suggested activities. Remember, let your teen choose! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_17"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_39",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_23",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_18"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_41",
                "destination_uuid": "uuid_mod_1on1_challenges_node_25"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_25",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_25",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_26",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_20"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_27",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_21"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_45",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_25"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_46",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "uuid_mod_1on1_challenges_category_26"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_48",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "uuid_mod_1on1_challenges_category_27"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_45",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_46",
                "destination_uuid": "uuid_mod_1on1_challenges_node_24"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_48",
                "destination_uuid": "uuid_mod_1on1_challenges_node_26"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_24",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_19"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_44",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_26",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, I can give you some ideas of what you could do! In a minute we will give you a list of his suggested activities. Remember, let your teen choose! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_20"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_47",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_27",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_21"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_49",
                "destination_uuid": "uuid_mod_1on1_challenges_node_29"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_29",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_30",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_31",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_24"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_32",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_25"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_53",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_30"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_54",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "uuid_mod_1on1_challenges_category_31"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_56",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "uuid_mod_1on1_challenges_category_32"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_53",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_54",
                "destination_uuid": "uuid_mod_1on1_challenges_node_28"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_56",
                "destination_uuid": "uuid_mod_1on1_challenges_node_30"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_28",
            "actions": [
              {
                "attachments": [],
                "text": "That’s perfect! If you need any inspiration, I can give you some ideas of what you could do! In a minute we will give you a list of his suggested activities. Remember, let your teen choose! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_1on1_challenges_action_22"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_52",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_30",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_1on1_challenges_action_23"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_55",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_31",
            "actions": [
              {
                "attachments": [],
                "text": "I know the end of One-on-One Time can sometimes be difficult.\n\nDo you want to try one of the following things? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "Plan One-on-One Time right before another activity my teen enjoys."
                ],
                "uuid": "uuid_mod_1on1_challenges_action_24"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_57",
                "destination_uuid": "uuid_mod_1on1_challenges_node_33"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_33",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_35",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_36",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_28"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_37",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_29"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_38",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_30"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_61",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_35"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_62",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "uuid_mod_1on1_challenges_category_36"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_64",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "uuid_mod_1on1_challenges_category_37"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_66",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "uuid_mod_1on1_challenges_category_38"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_61",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_62",
                "destination_uuid": "uuid_mod_1on1_challenges_node_32"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_64",
                "destination_uuid": "uuid_mod_1on1_challenges_node_34"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_66",
                "destination_uuid": "uuid_mod_1on1_challenges_node_35"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_32",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_25"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_60",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_34",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_26"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_63",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_35",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\" https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_27"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_65",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_36",
            "actions": [
              {
                "attachments": [],
                "text": "I also struggled with that! It can be difficult to spend One-on-One Time with our teens when we have more than one child.\nDo you want to try one of the following things? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Ask another adult or older sibling to look after the younger children during that time.",
                  "Think of a time when the other children are not around and spend time then.",
                  "Plan One-on-One Time in a place other than at home"
                ],
                "uuid": "uuid_mod_1on1_challenges_action_28"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_67",
                "destination_uuid": "uuid_mod_1on1_challenges_node_38"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_38",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_41",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_42",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_33"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_43",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_34"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_44",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_35"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_71",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_41"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_72",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "uuid_mod_1on1_challenges_category_42"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_74",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "uuid_mod_1on1_challenges_category_43"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_76",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "uuid_mod_1on1_challenges_category_44"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_71",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_72",
                "destination_uuid": "uuid_mod_1on1_challenges_node_37"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_74",
                "destination_uuid": "uuid_mod_1on1_challenges_node_39"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_76",
                "destination_uuid": "uuid_mod_1on1_challenges_node_40"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_37",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_29"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_70",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_39",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_30"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_73",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_40",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention.  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_31"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_75",
                "destination_uuid": "uuid_mod_1on1_challenges_node_42"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_42",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_45",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_46",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_36"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_78",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_45"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_79",
                  "name": "Next",
                  "uuid": "uuid_mod_1on1_challenges_category_46"
                }
              ],
              "operand": "@input.text",
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
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_41",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_mod_1on1_challenges_action_32"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_77",
                "destination_uuid": "uuid_mod_1on1_challenges_node_44"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_44",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_47",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_48",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_37"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_49",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_38"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_81",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_47"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_82",
                  "name": "No",
                  "uuid": "uuid_mod_1on1_challenges_category_48"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_84",
                  "name": "Yes",
                  "uuid": "uuid_mod_1on1_challenges_category_49"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_81",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_82",
                "destination_uuid": "uuid_mod_1on1_challenges_node_43"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_84",
                "destination_uuid": "uuid_mod_1on1_challenges_node_45"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_43",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_challenges_action_33"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_80",
                "destination_uuid": "uuid_mod_1on1_challenges_node_55"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_45",
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
                "uuid": "uuid_mod_1on1_challenges_action_34"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_challenges_exit_83",
                "destination_uuid": "uuid_mod_1on1_challenges_node_47"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_47",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_challenges_category_50",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_51",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_39"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_52",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_40"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_53",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_41"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_54",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_42"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_55",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_43"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_56",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_44"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_57",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_45"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "uuid_mod_1on1_challenges_category_58",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_challenges_case_46"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_86",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_challenges_category_50"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_87",
                  "name": "I don’t have enough time",
                  "uuid": "uuid_mod_1on1_challenges_category_51"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_89",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "uuid_mod_1on1_challenges_category_52"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_91",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "uuid_mod_1on1_challenges_category_53"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_93",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "uuid_mod_1on1_challenges_category_54"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_95",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "uuid_mod_1on1_challenges_category_55"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_97",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "uuid_mod_1on1_challenges_category_56"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_99",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "uuid_mod_1on1_challenges_category_57"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_challenges_exit_101",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "uuid_mod_1on1_challenges_category_58"
                }
              ],
              "operand": "@input.text",
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
                "destination_uuid": "uuid_mod_1on1_challenges_node_3"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_89",
                "destination_uuid": "uuid_mod_1on1_challenges_node_9"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_91",
                "destination_uuid": "uuid_mod_1on1_challenges_node_14"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_93",
                "destination_uuid": "uuid_mod_1on1_challenges_node_19"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_95",
                "destination_uuid": "uuid_mod_1on1_challenges_node_23"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_97",
                "destination_uuid": "uuid_mod_1on1_challenges_node_27"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_99",
                "destination_uuid": "uuid_mod_1on1_challenges_node_31"
              },
              {
                "uuid": "uuid_mod_1on1_challenges_exit_101",
                "destination_uuid": "uuid_mod_1on1_challenges_node_36"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_challenges_node_55",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_challenges_action_35",
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
                "uuid": "uuid_mod_1on1_challenges_exit_102",
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
                "text": "Hi! How is your parenting going today? https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_1on1_par_category_0",
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
                "text": "So good to hear that you and your children are in a good space today. What a wonderful feeling! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Sometimes things go great. Sometimes they don’t. And sometimes we don't quite know what to think...and that's totally okay! Remember that you are not alone. https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Sorry that things are difficult with your children now. It is completely normal to struggle sometimes. Remember that you are not alone! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_1on1_par_category_4",
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
              "default_category_uuid": "uuid_mod_1on1_par_category_7",
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
                "text": "Hi awesome parent! Here is something fun you can do with your teen: https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
              "default_category_uuid": "uuid_mod_1on1_fun_category_0",
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
                "text": "Co-chef\n- Ask your teen what kind of meal they would like to eat. \n- Prepare it together! \n- Let them have a turn at being the head chef – they lead and you follow their instructions \n- You can even help them make a budget for ingredients! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Just a friendly chat \n- Have a conversation with your teen about something they like \n- It can be about anything they choose to talk about: sports, friends, music, celebrities… \n- Try to listen to your teen and give them space to talk  https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "- Ask your teen to choose their favourite song \n- Try to sing it together – do your best pop star impression!   https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Every time you do one-on-one time mark your STAR to track your success https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_fun_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_fun_exit_8",
                "destination_uuid": null
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
        "name": "mod_1on1_activity_push",
        "uuid": "uuid_mod_1on1_activity_push_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_activity_push_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Have you spent time with your teen already? Try it again today – you are doing so well! \n\n\nEvery time you do one-on-one time  mark your STAR to track your success ",
                "type": "send_msg",
                "quick_replies": [
                  "Ideas to spend time with your teen"
                ],
                "uuid": "uuid_mod_1on1_activity_push_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_push_exit_0",
                "destination_uuid": "uuid_mod_1on1_activity_push_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_push_node_3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_1on1_activity_push_category_0",
              "cases": [
                {
                  "arguments": [
                    "Ideas to spend time with your teen"
                  ],
                  "category_uuid": "uuid_mod_1on1_activity_push_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_1on1_activity_push_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_1on1_activity_push_exit_3",
                  "name": "All Responses",
                  "uuid": "uuid_mod_1on1_activity_push_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_1on1_activity_push_exit_4",
                  "name": "Ideas to spend time with your teen",
                  "uuid": "uuid_mod_1on1_activity_push_category_1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_push_exit_3",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_1on1_activity_push_exit_4",
                "destination_uuid": "uuid_mod_1on1_activity_push_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_push_node_1",
            "actions": [
              {
                "uuid": "uuid_mod_1on1_activity_push_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_activity_push__completed",
                  "name": "mod_1on1_activity_push__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_push_exit_1",
                "destination_uuid": "uuid_mod_1on1_activity_push_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_1on1_activity_push_node_2",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_ideas"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_1on1_activity_push_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_activity_push_exit_2",
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
        "name": "mod_1on1_praise_push",
        "uuid": "uuid_mod_1on1_praise_push_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_1on1_praise_push_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for spending One-on-One time with your family! Time is the most valuable gift you can give them.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_1on1_praise_push_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_1on1_praise_push_exit_0",
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
                "text": "Hi good to see you! https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Think about the last time someone thanked you, or said you'd done something great. How did it make you feel? https://plh-demo1.idems.international/chat/msg-info?character=guide&choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "slight smile",
                  "moderate smile",
                  "big smile"
                ],
                "uuid": "uuid_mod_praise_intro_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_1",
                "destination_uuid": "uuid_mod_praise_intro_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_2",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_2",
                "destination_uuid": "uuid_mod_praise_intro_node_3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_intro_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_intro_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_intro_exit_2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "feeling_1"
            }
          },
          {
            "uuid": "uuid_mod_praise_intro_node_3",
            "actions": [
              {
                "uuid": "uuid_mod_praise_intro_action_2",
                "type": "set_contact_field",
                "field": {
                  "key": "feeling_1",
                  "name": "feeling_1"
                },
                "value": "@results.feeling_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_3",
                "destination_uuid": "uuid_mod_praise_intro_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Parents usually don’t get thanked or praised enough. How does not being thanked make you feel? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "sad",
                  "angry",
                  "tired"
                ],
                "uuid": "uuid_mod_praise_intro_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_4",
                "destination_uuid": "uuid_mod_praise_intro_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_5",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_5",
                "destination_uuid": "uuid_mod_praise_intro_node_6"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_intro_category_1",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_intro_category_1",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_intro_exit_5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "feeling_2"
            }
          },
          {
            "uuid": "uuid_mod_praise_intro_node_6",
            "actions": [
              {
                "uuid": "uuid_mod_praise_intro_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "feeling_2",
                  "name": "feeling_2"
                },
                "value": "@results.feeling_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_6",
                "destination_uuid": "uuid_mod_praise_intro_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Your teen feels this way too. And this week’s parenting tool is important and simple: Praise them for what they do right. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_intro_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_7",
                "destination_uuid": "uuid_mod_praise_intro_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I tell my teens to do 20 things and they ignore me. Often I just want to scream. But then they still ignore me. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_intro_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_8",
                "destination_uuid": "uuid_mod_praise_intro_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "But the other day, they surprised me! Let me tell you: https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "uuid_mod_praise_intro_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_9",
                "destination_uuid": "uuid_mod_praise_intro_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_11",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_intro_category_2",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_11",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_intro_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_12",
                  "name": "Let me hear your story",
                  "uuid": "uuid_mod_praise_intro_category_3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_11",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_12",
                "destination_uuid": "uuid_mod_praise_intro_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_10",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/conversations/mod_praise/@fields.guidenumber/mod_praise_is_1.svg"
                ],
                "text": "I was busy and my older daughter actually helped her sister with her homework. Usually they just fight! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "uuid_mod_praise_intro_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_10",
                "destination_uuid": "uuid_mod_praise_intro_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_13",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_intro_category_4",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_14",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_intro_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_15",
                  "name": "Next",
                  "uuid": "uuid_mod_praise_intro_category_5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_14",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_15",
                "destination_uuid": "uuid_mod_praise_intro_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_12",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/conversations/mod_praise/@fields.guidenumber/mod_praise_is_2.svg"
                ],
                "text": "Here’s the parenting skill: if I tell my daughters how proud I am of them for doing this, then they will want to do it again. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "uuid_mod_praise_intro_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_13",
                "destination_uuid": "uuid_mod_praise_intro_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_15",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_intro_category_6",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_2"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_17",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_intro_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_18",
                  "name": "Previous",
                  "uuid": "uuid_mod_praise_intro_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_22",
                  "name": "Next",
                  "uuid": "uuid_mod_praise_intro_category_9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_17",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_18",
                "destination_uuid": "uuid_mod_praise_intro_node_10"
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_22",
                "destination_uuid": "uuid_mod_praise_intro_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_16",
            "actions": [
              {
                "attachments": [],
                "text": "How do you think what I said made my teens feel? https://plh-demo1.idems.international/chat/msg-info?character=guide&choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "slight smile",
                  "moderate smile",
                  "big smile"
                ],
                "uuid": "uuid_mod_praise_intro_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_19",
                "destination_uuid": "uuid_mod_praise_intro_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_17",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_20",
                "destination_uuid": "uuid_mod_praise_intro_node_18"
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
                  "exit_uuid": "uuid_mod_praise_intro_exit_20"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "feeling_3"
            }
          },
          {
            "uuid": "uuid_mod_praise_intro_node_18",
            "actions": [
              {
                "uuid": "uuid_mod_praise_intro_action_11",
                "type": "set_contact_field",
                "field": {
                  "key": "feeling_3",
                  "name": "feeling_3"
                },
                "value": "@results.feeling_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_21",
                "destination_uuid": "uuid_mod_praise_intro_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_19",
            "actions": [
              {
                "attachments": [],
                "text": "Why did I praise them? https://plh-demo1.idems.international/chat/msg-info?character=guide&chooseMulti=true",
                "type": "send_msg",
                "quick_replies": [
                  "To get them to do it more often",
                  "To help me finish my work",
                  "To make them feel good",
                  "To make me feel good"
                ],
                "uuid": "uuid_mod_praise_intro_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_23",
                "destination_uuid": "uuid_mod_praise_intro_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_20",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_24",
                "destination_uuid": "uuid_mod_praise_intro_node_21"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_intro_category_10",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_intro_category_10",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_intro_exit_24"
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
            "uuid": "uuid_mod_praise_intro_node_21",
            "actions": [
              {
                "uuid": "uuid_mod_praise_intro_action_13",
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
                "uuid": "uuid_mod_praise_intro_exit_25",
                "destination_uuid": "uuid_mod_praise_intro_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_22",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/hug.svg"
                ],
                "text": "All of those things are true! When they are happy, I feel happy. And I got my work done. The same can work for you!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_intro_action_14"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_26",
                "destination_uuid": "uuid_mod_praise_intro_node_23"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_23",
            "actions": [
              {
                "attachments": [],
                "text": "Next: praise in 3 easy steps! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "uuid_mod_praise_intro_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_27",
                "destination_uuid": "uuid_mod_praise_intro_node_26"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_26",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_intro_category_11",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_4"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "uuid_mod_praise_intro_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_intro_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_30",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_intro_category_11"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_31",
                  "name": "Take me to Tips",
                  "uuid": "uuid_mod_praise_intro_category_12"
                },
                {
                  "exit_uuid": "uuid_mod_praise_intro_exit_34",
                  "name": "Take me to Homescreen",
                  "uuid": "uuid_mod_praise_intro_category_13"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_30",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_31",
                "destination_uuid": "uuid_mod_praise_intro_node_24"
              },
              {
                "uuid": "uuid_mod_praise_intro_exit_34",
                "destination_uuid": "uuid_mod_praise_intro_node_27"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_24",
            "actions": [
              {
                "uuid": "uuid_mod_praise_intro_action_16",
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
                "uuid": "uuid_mod_praise_intro_exit_28",
                "destination_uuid": "uuid_mod_praise_intro_node_25"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_25",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_intro_action_17"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_29",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_27",
            "actions": [
              {
                "uuid": "uuid_mod_praise_intro_action_18",
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
                "uuid": "uuid_mod_praise_intro_exit_32",
                "destination_uuid": "uuid_mod_praise_intro_node_28"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_intro_node_28",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_intro_action_19"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_intro_exit_33",
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
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
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
                "text": "Let's practice praising! Would you like to do this with your teen now? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "uuid_mod_praise_activity_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_1",
                "destination_uuid": "uuid_mod_praise_activity_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_category_2",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_case_2"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_5",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_6",
                  "name": "Later",
                  "uuid": "uuid_mod_praise_activity_category_3"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_10",
                  "name": "Yes",
                  "uuid": "uuid_mod_praise_activity_category_5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_5",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_exit_6",
                "destination_uuid": "uuid_mod_praise_activity_node_2"
              },
              {
                "uuid": "uuid_mod_praise_activity_exit_10",
                "destination_uuid": "uuid_mod_praise_activity_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_2",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_activity_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_3",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_exit_4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_praise_activity_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_category_0"
                },
                {
                  "uuid": "uuid_mod_praise_activity_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_category_1"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_activity_category_0",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_praise_activity_exit_3"
                },
                {
                  "uuid": "uuid_mod_praise_activity_category_1",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_praise_activity_exit_4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_category_0"
            }
          },
          {
            "uuid": "uuid_mod_praise_activity_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Parent – Which of the following things does your teen do well?  https://plh-demo1.idems.international/chat/msg-info?character=guide&chooseMulti=true",
                "type": "send_msg",
                "quick_replies": [
                  "Making their bed ",
                  "Cleaning their room ",
                  "Helping clean up after school ",
                  "Greeting other family members ",
                  "Looking after siblings ",
                  "Coming home in time ",
                  "Showing thoughtfulness/respect ",
                  "Using 'please' and 'thank you' ",
                  "Getting ready for school in time ",
                  "Doing chores or schoolwork  ",
                  "Getting through mealtime peacefully "
                ],
                "uuid": "uuid_mod_praise_activity_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_7",
                "destination_uuid": "uuid_mod_praise_activity_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_5",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_8",
                "destination_uuid": "uuid_mod_praise_activity_node_6"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_category_4",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_activity_category_4",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_activity_exit_8"
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
                "uuid": "uuid_mod_praise_activity_exit_9",
                "destination_uuid": "uuid_mod_praise_activity_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "uuid_mod_praise_activity_action_5"
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
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_category_7",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_case_4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_15",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_16",
                  "name": "Click here when done",
                  "uuid": "uuid_mod_praise_activity_category_8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_15",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_exit_16",
                "destination_uuid": "uuid_mod_praise_activity_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Now it's your teen's turn to praise you!\nTeen – which things do you like about your parent?  https://plh-demo1.idems.international/chat/msg-info?character=guide&chooseMulti=true",
                "type": "send_msg",
                "quick_replies": [
                  "Cooking for the family ",
                  "Helping with school work ",
                  "Making money for the family ",
                  "Cleaning the house ",
                  "Spending time with me ",
                  "Looking after me when I am sick ",
                  "Ensuring we have enough food ",
                  "Listening to me ",
                  "Having a chat together ",
                  "Saying nice things about me "
                ],
                "uuid": "uuid_mod_praise_activity_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_12",
                "destination_uuid": "uuid_mod_praise_activity_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_9",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_13",
                "destination_uuid": "uuid_mod_praise_activity_node_10"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_category_6",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_activity_category_6",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_activity_exit_13"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "parent_praise"
            }
          },
          {
            "uuid": "uuid_mod_praise_activity_node_10",
            "actions": [
              {
                "uuid": "uuid_mod_praise_activity_action_7",
                "type": "set_contact_field",
                "field": {
                  "key": "parent_praise",
                  "name": "parent_praise"
                },
                "value": "@results.parent_praise"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_14",
                "destination_uuid": "uuid_mod_praise_activity_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "uuid_mod_praise_activity_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_17",
                "destination_uuid": "uuid_mod_praise_activity_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_14",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_category_9",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_19",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_20",
                  "name": "Click here when done",
                  "uuid": "uuid_mod_praise_activity_category_10"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_19",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_exit_20",
                "destination_uuid": "uuid_mod_praise_activity_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_13",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_18",
                "destination_uuid": "uuid_mod_praise_activity_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_15",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_21",
                "destination_uuid": "uuid_mod_praise_activity_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_16",
            "actions": [
              {
                "attachments": [],
                "text": "Take a moment and think of one thing you have done recently that you have done well! Here are some ideas: \n\n\n https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Using this app",
                  "Showing love to my children ",
                  "Getting up even though I felt tired ",
                  "Smiling at someone ",
                  "Making food to stay strong ",
                  "Spending time with my children ",
                  "Helping my children with schoolwork "
                ],
                "uuid": "uuid_mod_praise_activity_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_22",
                "destination_uuid": "uuid_mod_praise_activity_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_17",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_23",
                "destination_uuid": "uuid_mod_praise_activity_node_18"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_category_11",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_activity_category_11",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_praise_activity_exit_23"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "self_praise"
            }
          },
          {
            "uuid": "uuid_mod_praise_activity_node_18",
            "actions": [
              {
                "uuid": "uuid_mod_praise_activity_action_12",
                "type": "set_contact_field",
                "field": {
                  "key": "self_praise",
                  "name": "self_praise"
                },
                "value": "@results.self_praise"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_24",
                "destination_uuid": "uuid_mod_praise_activity_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_19",
            "actions": [
              {
                "attachments": [
                  "image:plh_images/characters/@fields.guidenumber/high_five.svg"
                ],
                "text": "Try to say it out loud: \"Well done for @fields.self_praise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "uuid_mod_praise_activity_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_25",
                "destination_uuid": "uuid_mod_praise_activity_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_22",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_category_12",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_28",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_category_12"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_exit_29",
                  "name": "Take me to Homescreen",
                  "uuid": "uuid_mod_praise_activity_category_13"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_28",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_exit_29",
                "destination_uuid": "uuid_mod_praise_activity_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_20",
            "actions": [
              {
                "uuid": "uuid_mod_praise_activity_action_14",
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
                "uuid": "uuid_mod_praise_activity_exit_26",
                "destination_uuid": "uuid_mod_praise_activity_node_21"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_node_21",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_activity_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_exit_27",
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
                "text": "Your goal was to continue to spend time with your teen, and to PRAISE them when spending time together.  \n\nDid you manage to spend time with your teen this week? How did it go? https://plh-demo1.idems.international/chat/msg-info?character=elder&choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "Great",
                  "Neutral",
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
              "default_category_uuid": "uuid_mod_praise_activity_review_category_1",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_0"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_1"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_2"
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
                  "name": "Great",
                  "uuid": "uuid_mod_praise_activity_review_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_7",
                  "name": "Neutral; Bad",
                  "uuid": "uuid_mod_praise_activity_review_category_3"
                }
              ],
              "operand": "@fields.mod_praise_experience"
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
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "uuid_mod_praise_activity_review_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_3",
                "destination_uuid": "uuid_mod_praise_activity_review_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
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
              "default_category_uuid": "uuid_mod_praise_activity_review_category_6",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_5"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_11",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_review_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_12",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "uuid_mod_praise_activity_review_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_17",
                  "name": "Continue",
                  "uuid": "uuid_mod_praise_activity_review_category_10"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_11",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_12",
                "destination_uuid": "uuid_mod_praise_activity_review_node_6"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_17",
                "destination_uuid": "uuid_mod_praise_activity_review_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_6",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_activity_review_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_9",
                "destination_uuid": "uuid_mod_praise_activity_review_node_11"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_10",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_praise_activity_review_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_4"
                },
                {
                  "uuid": "uuid_mod_praise_activity_review_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_5"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_praise_activity_review_category_4",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_9"
                },
                {
                  "uuid": "uuid_mod_praise_activity_review_category_5",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_10"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_review_category_4"
            }
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_review_category_8",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_9",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_14",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_review_category_8"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_15",
                  "name": "Go to Praise check-in",
                  "uuid": "uuid_mod_praise_activity_review_category_9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_14",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_15",
                "destination_uuid": "uuid_mod_praise_activity_review_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_mod_praise_activity_review_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_13",
                "destination_uuid": "uuid_mod_praise_activity_review_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_10",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_mod_praise_activity_review_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_16",
                "destination_uuid": "uuid_mod_praise_activity_review_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_mod_praise_activity_review_action_7"
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
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_review_category_11",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_8"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_9"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_14",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_10"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_15",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_11"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_20",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_review_category_11"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_21",
                  "name": "No",
                  "uuid": "uuid_mod_praise_activity_review_category_12"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_23",
                  "name": "Yes",
                  "uuid": "uuid_mod_praise_activity_review_category_13"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_24",
                  "name": "Yes",
                  "uuid": "uuid_mod_praise_activity_review_category_14"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_25",
                  "name": "Yes",
                  "uuid": "uuid_mod_praise_activity_review_category_15"
                }
              ],
              "operand": "@input.text",
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
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_23",
                "destination_uuid": "uuid_mod_praise_activity_review_node_14"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_24",
                "destination_uuid": "uuid_mod_praise_activity_review_node_14"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_25",
                "destination_uuid": "uuid_mod_praise_activity_review_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_12",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_19",
                "destination_uuid": "uuid_mod_praise_activity_review_node_24"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_14",
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
                "uuid": "uuid_mod_praise_activity_review_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_22",
                "destination_uuid": "uuid_mod_praise_activity_review_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_16",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_review_category_16",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_17",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_12"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_18",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_13"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_19",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_14"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_20",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_15"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_27",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_review_category_16"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_28",
                  "name": "Surprised",
                  "uuid": "uuid_mod_praise_activity_review_category_17"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_30",
                  "name": "Happy",
                  "uuid": "uuid_mod_praise_activity_review_category_18"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_32",
                  "name": "My teen did not like it",
                  "uuid": "uuid_mod_praise_activity_review_category_19"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_34",
                  "name": "I don’t know",
                  "uuid": "uuid_mod_praise_activity_review_category_20"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_27",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_28",
                "destination_uuid": "uuid_mod_praise_activity_review_node_15"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_30",
                "destination_uuid": "uuid_mod_praise_activity_review_node_17"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_32",
                "destination_uuid": "uuid_mod_praise_activity_review_node_18"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_34",
                "destination_uuid": "uuid_mod_praise_activity_review_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_15",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_26",
                "destination_uuid": "uuid_mod_praise_activity_review_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_17",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_29",
                "destination_uuid": "uuid_mod_praise_activity_review_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_18",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_31",
                "destination_uuid": "uuid_mod_praise_activity_review_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_19",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_33",
                "destination_uuid": "uuid_mod_praise_activity_review_node_20"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_20",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen at any other time during the week?",
                "type": "send_msg",
                "quick_replies": [
                  "Every day",
                  "Almost every day",
                  "A few days",
                  "Never"
                ],
                "uuid": "uuid_mod_praise_activity_review_action_14"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_35",
                "destination_uuid": "uuid_mod_praise_activity_review_node_22"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_22",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_activity_review_category_21",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_22",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_16"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_22",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_17"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_23",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_18"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "uuid_mod_praise_activity_review_category_23",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_activity_review_case_19"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_37",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_activity_review_category_21"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_38",
                  "name": "Every day; Almost every day",
                  "uuid": "uuid_mod_praise_activity_review_category_22"
                },
                {
                  "exit_uuid": "uuid_mod_praise_activity_review_exit_40",
                  "name": "A few days; Never",
                  "uuid": "uuid_mod_praise_activity_review_category_23"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_37",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_38",
                "destination_uuid": "uuid_mod_praise_activity_review_node_21"
              },
              {
                "uuid": "uuid_mod_praise_activity_review_exit_40",
                "destination_uuid": "uuid_mod_praise_activity_review_node_23"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_21",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_36",
                "destination_uuid": "uuid_mod_praise_activity_review_node_24"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_23",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_activity_review_action_16"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_39",
                "destination_uuid": "uuid_mod_praise_activity_review_node_24"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_24",
            "actions": [
              {
                "uuid": "uuid_mod_praise_activity_review_action_17",
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
                "uuid": "uuid_mod_praise_activity_review_exit_41",
                "destination_uuid": "uuid_mod_praise_activity_review_node_25"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_activity_review_node_25",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_activity_review_action_18"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_activity_review_exit_42",
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
                "text": "Hi! How are you feeling? ",
                "type": "send_msg",
                "quick_replies": [
                  "Happy",
                  "Neutral",
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
              "default_category_uuid": "uuid_mod_praise_emo_category_0",
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
                    "Neutral"
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
                  "name": "Neutral",
                  "uuid": "uuid_mod_praise_emo_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_7",
                  "name": "Sad",
                  "uuid": "uuid_mod_praise_emo_category_3"
                }
              ],
              "operand": "@input.text",
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
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "uuid_mod_praise_emo_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_1",
                "destination_uuid": "uuid_mod_praise_emo_node_7"
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
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "uuid_mod_praise_emo_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_4",
                "destination_uuid": "uuid_mod_praise_emo_node_7"
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
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "uuid_mod_praise_emo_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_6",
                "destination_uuid": "uuid_mod_praise_emo_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_emo_category_4",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "uuid_mod_praise_emo_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_emo_case_3"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "uuid_mod_praise_emo_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_emo_case_4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_10",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_emo_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_11",
                  "name": "More tips",
                  "uuid": "uuid_mod_praise_emo_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_14",
                  "name": "Activity to help you relax",
                  "uuid": "uuid_mod_praise_emo_category_6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_10",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_emo_exit_11",
                "destination_uuid": "uuid_mod_praise_emo_node_5"
              },
              {
                "uuid": "uuid_mod_praise_emo_exit_14",
                "destination_uuid": "uuid_mod_praise_emo_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_praise_emo_action_4",
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
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_emo_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_9",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_10",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_emo_category_7",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "uuid_mod_praise_emo_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_emo_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_15",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_emo_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_praise_emo_exit_16",
                  "name": "Activity to help you relax",
                  "uuid": "uuid_mod_praise_emo_category_8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_15",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_emo_exit_16",
                "destination_uuid": "uuid_mod_praise_emo_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_8",
            "actions": [
              {
                "uuid": "uuid_mod_praise_emo_action_6",
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
                "uuid": "uuid_mod_praise_emo_exit_12",
                "destination_uuid": "uuid_mod_praise_emo_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_emo_node_9",
            "actions": [
              {
                "flow": {
                  "name": "calm_3"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_praise_emo_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_emo_exit_13",
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
                "quick_replies": [
                  "Chat together",
                  "Get active",
                  "Watch & sing"
                ],
                "uuid": "uuid_mod_praise_fun_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_0",
                "destination_uuid": "uuid_mod_praise_fun_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_fun_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_praise_fun_category_0",
              "cases": [
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "uuid_mod_praise_fun_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_fun_case_0"
                },
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "uuid_mod_praise_fun_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_fun_case_1"
                },
                {
                  "arguments": [
                    "Watch & sing"
                  ],
                  "category_uuid": "uuid_mod_praise_fun_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_praise_fun_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_praise_fun_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_praise_fun_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_praise_fun_exit_3",
                  "name": "Chat together",
                  "uuid": "uuid_mod_praise_fun_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_praise_fun_exit_5",
                  "name": "Get active",
                  "uuid": "uuid_mod_praise_fun_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_praise_fun_exit_7",
                  "name": "Watch & sing",
                  "uuid": "uuid_mod_praise_fun_category_3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_praise_fun_exit_3",
                "destination_uuid": "uuid_mod_praise_fun_node_1"
              },
              {
                "uuid": "uuid_mod_praise_fun_exit_5",
                "destination_uuid": "uuid_mod_praise_fun_node_3"
              },
              {
                "uuid": "uuid_mod_praise_fun_exit_7",
                "destination_uuid": "uuid_mod_praise_fun_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_fun_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "At the End of the Day\n- At the end of each day, take a minute to think about the day.\n- Talk your child about one positive or fun thing they did.\n- Praise yourself for one thing you did well today.\n- Think of one thing that you are grateful for.\n- You are a star!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_fun_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_1",
                "destination_uuid": "uuid_mod_praise_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_fun_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "What's new?\n- Think of a new skill you could learn together with your teen. For example, keeping a ball in the air or your foot, juggling, making soup?\n- Take turns in trying the new skill out.\n- Make sure to praise each other, and try to learn and play together!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_fun_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_4",
                "destination_uuid": "uuid_mod_praise_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_fun_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Song...",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_praise_fun_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_praise_fun_exit_6",
                "destination_uuid": "uuid_mod_praise_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_praise_fun_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_praise_fun_action_4",
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
                "uuid": "uuid_mod_praise_fun_exit_8",
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
        "name": "mod_instructions_par",
        "uuid": "uuid_mod_instructions_par_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instructions_par_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Welcome! How is your parenting going today? https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "Great",
                  "Neutral",
                  "Bad"
                ],
                "uuid": "uuid_mod_instructions_par_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_0",
                "destination_uuid": "uuid_mod_instructions_par_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_par_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_par_category_0",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "uuid_mod_instructions_par_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_par_case_0"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "uuid_mod_instructions_par_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_par_case_1"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "uuid_mod_instructions_par_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_par_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_par_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_par_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_par_exit_3",
                  "name": "Great",
                  "uuid": "uuid_mod_instructions_par_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_par_exit_5",
                  "name": "Neutral",
                  "uuid": "uuid_mod_instructions_par_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_par_exit_7",
                  "name": "Bad",
                  "uuid": "uuid_mod_instructions_par_category_3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_par_exit_3",
                "destination_uuid": "uuid_mod_instructions_par_node_1"
              },
              {
                "uuid": "uuid_mod_instructions_par_exit_5",
                "destination_uuid": "uuid_mod_instructions_par_node_3"
              },
              {
                "uuid": "uuid_mod_instructions_par_exit_7",
                "destination_uuid": "uuid_mod_instructions_par_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_par_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful, I am so happy things are going well between you and your children. Keep up the good work.",
                "type": "send_msg",
                "quick_replies": [
                  "Relaxation activity",
                  "Continue"
                ],
                "uuid": "uuid_mod_instructions_par_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_1",
                "destination_uuid": "uuid_mod_instructions_par_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_par_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that things are difficult right now. All families have good and bad days. We are here to help!\n\nLet’s slow down for a moment together!",
                "type": "send_msg",
                "quick_replies": [
                  "Relaxation activity"
                ],
                "uuid": "uuid_mod_instructions_par_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_4",
                "destination_uuid": "uuid_mod_instructions_par_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_par_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Whatever you feel went ‘wrong’ today, let it go and try again tomorrow. It’s okay! \n\nLet’s slow down for a moment together!",
                "type": "send_msg",
                "quick_replies": [
                  "Relaxation activity"
                ],
                "uuid": "uuid_mod_instructions_par_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_6",
                "destination_uuid": "uuid_mod_instructions_par_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_par_node_6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_par_category_6",
              "cases": [
                {
                  "arguments": [
                    "Relaxation activity"
                  ],
                  "category_uuid": "uuid_mod_instructions_par_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_par_case_5"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "uuid_mod_instructions_par_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_par_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_par_exit_11",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_par_category_6"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_par_exit_12",
                  "name": "Relaxation activity",
                  "uuid": "uuid_mod_instructions_par_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_par_exit_16",
                  "name": "Continue",
                  "uuid": "uuid_mod_instructions_par_category_8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_11",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_par_exit_12",
                "destination_uuid": "uuid_mod_instructions_par_node_5"
              },
              {
                "uuid": "uuid_mod_instructions_par_exit_16",
                "destination_uuid": "uuid_mod_instructions_par_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_par_node_5",
            "actions": [
              {
                "flow": {
                  "name": "calm_4"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instructions_par_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_9",
                "destination_uuid": "uuid_mod_instructions_par_node_7"
              },
              {
                "uuid": "uuid_mod_instructions_par_exit_10",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_instructions_par_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_instructions_par_category_4"
                },
                {
                  "uuid": "uuid_mod_instructions_par_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_instructions_par_category_5"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_instructions_par_category_4",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_instructions_par_exit_9"
                },
                {
                  "uuid": "uuid_mod_instructions_par_category_5",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_instructions_par_exit_10"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_par_category_4"
            }
          },
          {
            "uuid": "uuid_mod_instructions_par_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "@fields.elder may have some other helpful ideas for you!",
                "type": "send_msg",
                "quick_replies": [
                  "More relaxation activities",
                  "Continue"
                ],
                "uuid": "uuid_mod_instructions_par_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_13",
                "destination_uuid": "uuid_mod_instructions_par_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_par_node_10",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_par_category_9",
              "cases": [
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "uuid_mod_instructions_par_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_par_case_7"
                },
                {
                  "arguments": [
                    "More relaxation activities"
                  ],
                  "category_uuid": "uuid_mod_instructions_par_category_11",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_par_case_8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_par_exit_17",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_par_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_par_exit_18",
                  "name": "Continue",
                  "uuid": "uuid_mod_instructions_par_category_10"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_par_exit_20",
                  "name": "More relaxation activities",
                  "uuid": "uuid_mod_instructions_par_category_11"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_17",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_par_exit_18",
                "destination_uuid": "uuid_mod_instructions_par_node_8"
              },
              {
                "uuid": "uuid_mod_instructions_par_exit_20",
                "destination_uuid": "uuid_mod_instructions_par_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_par_node_8",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_par_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_par__completed",
                  "name": "mod_instructions_par__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_14",
                "destination_uuid": "uuid_mod_instructions_par_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_par_node_9",
            "actions": [
              {
                "flow": {
                  "name": "mod_instructions_intro"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instructions_par_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_15",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_par_node_11",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_par_action_8",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_par__completed",
                  "name": "mod_instructions_par__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_par_exit_19",
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
        "name": "mod_instructions_intro",
        "uuid": "uuid_mod_instructions_intro_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instructions_intro_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Hi, it's great to see you again! I hope my last tips were helpful. \n\nActually, I’m not sure I asked for your name. Could you please tell me you name or nickname? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Prefer not to"
                ],
                "uuid": "uuid_mod_instructions_intro_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_0",
                "destination_uuid": "uuid_mod_instructions_intro_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_1",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_1",
                "destination_uuid": "uuid_mod_instructions_intro_node_2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_intro_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instructions_intro_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instructions_intro_exit_1"
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
            "uuid": "uuid_mod_instructions_intro_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_intro_action_1",
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
                "uuid": "uuid_mod_instructions_intro_exit_2",
                "destination_uuid": "uuid_mod_instructions_intro_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_intro_category_1",
              "cases": [
                {
                  "arguments": [
                    "Prefer not to"
                  ],
                  "category_uuid": "uuid_mod_instructions_intro_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_intro_case_0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_intro_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_intro_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_intro_exit_5",
                  "name": "Prefer not to",
                  "uuid": "uuid_mod_instructions_intro_category_2"
                }
              ],
              "operand": "@fields.username"
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_4",
                "destination_uuid": "uuid_mod_instructions_intro_node_5"
              },
              {
                "uuid": "uuid_mod_instructions_intro_exit_5",
                "destination_uuid": "uuid_mod_instructions_intro_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "That’s totally fine. Another thing…",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_intro_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_3",
                "destination_uuid": "uuid_mod_instructions_intro_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you @fields.username! Another thing…",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_intro_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_6",
                "destination_uuid": "uuid_mod_instructions_intro_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Stop making so much noise! https://plh-demo1.idems.international/chat/msg-info?character=neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_intro_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_7",
                "destination_uuid": "uuid_mod_instructions_intro_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Uuugh why can I never do what I like to do!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_intro_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_8",
                "destination_uuid": "uuid_mod_instructions_intro_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_8",
            "actions": [
              {
                "attachments": [],
                "text": "Oh @fields.neighbour, I always used to struggle with this with my teens!\n\nWhat really helped me was to change how I ask my teen to do things. Now, I am telling them what they should do instead of what they shouldn’t. Let me show you how it works! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Show me how"
                ],
                "uuid": "uuid_mod_instructions_intro_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_9",
                "destination_uuid": "uuid_mod_instructions_intro_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_10",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_intro_category_3",
              "cases": [
                {
                  "arguments": [
                    "Show me how"
                  ],
                  "category_uuid": "uuid_mod_instructions_intro_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_intro_case_1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_intro_exit_11",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_intro_category_3"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_intro_exit_12",
                  "name": "Show me how",
                  "uuid": "uuid_mod_instructions_intro_category_4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_11",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_intro_exit_12",
                "destination_uuid": "uuid_mod_instructions_intro_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "Let me give you an example: \nDon’t think about an elephant.\nWhat are you thinking about?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Continue"
                ],
                "uuid": "uuid_mod_instructions_intro_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_10",
                "destination_uuid": "uuid_mod_instructions_intro_node_12"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_12",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_intro_category_5",
              "cases": [
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "uuid_mod_instructions_intro_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_intro_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_intro_exit_14",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_intro_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_intro_exit_15",
                  "name": "Continue",
                  "uuid": "uuid_mod_instructions_intro_category_6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_14",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_intro_exit_15",
                "destination_uuid": "uuid_mod_instructions_intro_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_11",
            "actions": [
              {
                "attachments": [],
                "text": "When we give a negative instruction, this is what often happens! Our teens may not understand what we do want from them or may just not like how we tell them. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Continue"
                ],
                "uuid": "uuid_mod_instructions_intro_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_13",
                "destination_uuid": "uuid_mod_instructions_intro_node_14"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_14",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_intro_category_7",
              "cases": [
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "uuid_mod_instructions_intro_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_intro_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_intro_exit_17",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_intro_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_intro_exit_18",
                  "name": "Continue",
                  "uuid": "uuid_mod_instructions_intro_category_8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_17",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_intro_exit_18",
                "destination_uuid": "uuid_mod_instructions_intro_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_13",
            "actions": [
              {
                "attachments": [],
                "text": "Think about a cheetah. \nWhat are you thinking about?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Continue"
                ],
                "uuid": "uuid_mod_instructions_intro_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_16",
                "destination_uuid": "uuid_mod_instructions_intro_node_15"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_15",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Positive instructions help us focus on the things we should be doing and keep our relationship positive.  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Watch again",
                  "Continue"
                ],
                "uuid": "uuid_mod_instructions_intro_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_19",
                "destination_uuid": "uuid_mod_instructions_intro_node_17"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_17",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_intro_category_9",
              "cases": [
                {
                  "arguments": [
                    "Watch again"
                  ],
                  "category_uuid": "uuid_mod_instructions_intro_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_intro_case_4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_intro_exit_21",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_intro_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_intro_exit_22",
                  "name": "Watch again",
                  "uuid": "uuid_mod_instructions_intro_category_10"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_21",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_intro_exit_22",
                "destination_uuid": "uuid_mod_instructions_intro_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_18",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_intro_action_11",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_intro__completed",
                  "name": "mod_instructions_intro__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_23",
                "destination_uuid": "uuid_mod_instructions_intro_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_intro_node_19",
            "actions": [
              {
                "flow": {
                  "name": "mod_instructions_story"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instructions_intro_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_intro_exit_24",
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
        "name": "mod_instructions_activity",
        "uuid": "uuid_mod_instructions_activity_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instructions_activity_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "What behaviours would you want your teen to do more?",
                "type": "send_msg",
                "quick_replies": [
                  "Do schoolwork",
                  "Come home in time",
                  "Get ready for school in time",
                  "Clean up school clothes"
                ],
                "uuid": "uuid_mod_instructions_activity_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_activity_exit_0",
                "destination_uuid": "uuid_mod_instructions_activity_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_activity_node_1",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_activity_exit_1",
                "destination_uuid": "uuid_mod_instructions_activity_node_2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_activity_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instructions_activity_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instructions_activity_exit_1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instructions_behaviour"
            }
          },
          {
            "uuid": "uuid_mod_instructions_activity_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_activity_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_behaviour",
                  "name": "mod_instructions_behaviour"
                },
                "value": "@results.mod_instructions_behaviour"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_activity_exit_2",
                "destination_uuid": "uuid_mod_instructions_activity_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_activity_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "What would be a positive, simple, and realistic instruction for this?",
                "type": "send_msg",
                "quick_replies": [
                  "Please do your school work before going to play.",
                  "Please come home before 7pm.",
                  "Please get ready and leave for school 30 minutes before school starts.",
                  "Please wash your school clothes and put them away in the cupboard."
                ],
                "uuid": "uuid_mod_instructions_activity_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_activity_exit_3",
                "destination_uuid": "uuid_mod_instructions_activity_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_activity_node_4",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_activity_exit_4",
                "destination_uuid": "uuid_mod_instructions_activity_node_5"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_activity_category_1",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instructions_activity_category_1",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instructions_activity_exit_4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instructions_instruction"
            }
          },
          {
            "uuid": "uuid_mod_instructions_activity_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_activity_action_3",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_instruction",
                  "name": "mod_instructions_instruction"
                },
                "value": "@results.mod_instructions_instruction"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_activity_exit_5",
                "destination_uuid": "uuid_mod_instructions_activity_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_activity_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, try out ONE positive, simple, and realistic instruction with your teen. Remember to praise them, you will see the positive results!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_activity_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_activity_exit_6",
                "destination_uuid": "uuid_mod_instructions_activity_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_activity_node_7",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_activity_action_5",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_activity__completed",
                  "name": "mod_instructions_activity__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_activity_exit_7",
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
        "name": "mod_instructions_highlights",
        "uuid": "uuid_mod_instructions_highlights_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instructions_highlights_node_0",
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
                "uuid": "uuid_mod_instructions_highlights_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_highlights_exit_0",
                "destination_uuid": "uuid_mod_instructions_highlights_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_highlights_node_1",
            "actions": [],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_highlights_exit_1",
                "destination_uuid": "uuid_mod_instructions_highlights_node_2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_highlights_category_0",
              "cases": [],
              "categories": [
                {
                  "uuid": "uuid_mod_instructions_highlights_category_0",
                  "name": "All Responses",
                  "exit_uuid": "uuid_mod_instructions_highlights_exit_1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_instructions_high"
            }
          },
          {
            "uuid": "uuid_mod_instructions_highlights_node_2",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_highlights_action_1",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_high",
                  "name": "mod_instructions_high"
                },
                "value": "@results.mod_instructions_high"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_highlights_exit_2",
                "destination_uuid": "uuid_mod_instructions_highlights_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_highlights_node_4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_highlights_category_1",
              "cases": [
                {
                  "arguments": [
                    "Get Your Teen's Attention"
                  ],
                  "category_uuid": "uuid_mod_instructions_highlights_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_highlights_case_0"
                },
                {
                  "arguments": [
                    "Be Specific, Positive, and Realistic!"
                  ],
                  "category_uuid": "uuid_mod_instructions_highlights_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_highlights_case_1"
                },
                {
                  "arguments": [
                    "Give Instructions One at a Time"
                  ],
                  "category_uuid": "uuid_mod_instructions_highlights_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_highlights_case_2"
                },
                {
                  "arguments": [
                    "Praise Your Teens When They Follow Instructions"
                  ],
                  "category_uuid": "uuid_mod_instructions_highlights_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_highlights_case_3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_highlights_exit_4",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_highlights_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_highlights_exit_5",
                  "name": "Get Your Teen's Attention",
                  "uuid": "uuid_mod_instructions_highlights_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_highlights_exit_7",
                  "name": "Be Specific, Positive, and Realistic!",
                  "uuid": "uuid_mod_instructions_highlights_category_3"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_highlights_exit_9",
                  "name": "Give Instructions One at a Time",
                  "uuid": "uuid_mod_instructions_highlights_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_highlights_exit_11",
                  "name": "Praise Your Teens When They Follow Instructions",
                  "uuid": "uuid_mod_instructions_highlights_category_5"
                }
              ],
              "operand": "@fields.mod_instructions_high"
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_highlights_exit_4",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_highlights_exit_5",
                "destination_uuid": "uuid_mod_instructions_highlights_node_3"
              },
              {
                "uuid": "uuid_mod_instructions_highlights_exit_7",
                "destination_uuid": "uuid_mod_instructions_highlights_node_5"
              },
              {
                "uuid": "uuid_mod_instructions_highlights_exit_9",
                "destination_uuid": "uuid_mod_instructions_highlights_node_6"
              },
              {
                "uuid": "uuid_mod_instructions_highlights_exit_11",
                "destination_uuid": "uuid_mod_instructions_highlights_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_highlights_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful, when we make sure to first get our teen’s full attention at a good time, it makes it so much easier to give clear and effective instructions! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_highlights_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_highlights_exit_3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_highlights_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "Awesome, when we think of which exact instruction to give before telling our teen, our instructions become much easier to follow! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_highlights_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_highlights_exit_6",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_highlights_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "So true! By just giving one instruction at a time, our teen gets manageable tasks and is more likely to listen – so we can praise them even more! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_highlights_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_highlights_exit_8",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_highlights_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Yes, that also helped so much with my teen. When we praise them, our teens feel encouraged to listen again next time! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_highlights_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_highlights_exit_10",
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
        "name": "mod_instructions_challenges",
        "uuid": "uuid_mod_instructions_challenges_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instructions_challenges_node_0",
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
                "uuid": "uuid_mod_instructions_challenges_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_0",
                "destination_uuid": "uuid_mod_instructions_challenges_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_challenges_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_challenges_category_0",
              "cases": [
                {
                  "arguments": [
                    "My teenager did not want to follow the instruction"
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_challenges_case_0"
                },
                {
                  "arguments": [
                    "I did not find time to spend one-on-one time with my teen."
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_4",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_challenges_case_3"
                },
                {
                  "arguments": [
                    "I gave a negative instead of a positive instruction"
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_challenges_case_4"
                },
                {
                  "arguments": [
                    "I shouted at my teen when they behaved negatively, instead of giving them a positive instruction for what they should do."
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_challenges_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_challenges_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_3",
                  "name": "My teenager did not want to follow the instruction",
                  "uuid": "uuid_mod_instructions_challenges_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_7",
                  "name": "I did not find time to spend one-on-one time with my teen.",
                  "uuid": "uuid_mod_instructions_challenges_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_9",
                  "name": "I gave a negative instead of a positive instruction",
                  "uuid": "uuid_mod_instructions_challenges_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_11",
                  "name": "I shouted at my teen when they behaved negatively, instead of giving them a positive instruction for what they should do.",
                  "uuid": "uuid_mod_instructions_challenges_category_6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_challenges_exit_3",
                "destination_uuid": "uuid_mod_instructions_challenges_node_1"
              },
              {
                "uuid": "uuid_mod_instructions_challenges_exit_7",
                "destination_uuid": "uuid_mod_instructions_challenges_node_3"
              },
              {
                "uuid": "uuid_mod_instructions_challenges_exit_9",
                "destination_uuid": "uuid_mod_instructions_challenges_node_4"
              },
              {
                "uuid": "uuid_mod_instructions_challenges_exit_11",
                "destination_uuid": "uuid_mod_instructions_challenges_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_challenges_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "I know, our children need time to learn to follow instructions. Be patient, try again, and remember to praise them every time they follow an instruction!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_challenges_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_1",
                "destination_uuid": "uuid_mod_instructions_challenges_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_challenges_node_3",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instructions_challenges_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_5",
                "destination_uuid": "uuid_mod_instructions_challenges_node_7"
              },
              {
                "uuid": "uuid_mod_instructions_challenges_exit_6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_mod_instructions_challenges_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_2"
                },
                {
                  "uuid": "uuid_mod_instructions_challenges_case_2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_3"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_mod_instructions_challenges_category_2",
                  "name": "Complete",
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_5"
                },
                {
                  "uuid": "uuid_mod_instructions_challenges_category_3",
                  "name": "Expired",
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_challenges_category_2"
            }
          },
          {
            "uuid": "uuid_mod_instructions_challenges_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "I know, it takes some time to get used to giving positive instructions – it’s really worth trying again! Think about behaviour you would love to see your teen do more, and think of positive ways to give that instruction! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_challenges_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_8",
                "destination_uuid": "uuid_mod_instructions_challenges_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_challenges_node_5",
            "actions": [
              {
                "attachments": [],
                "text": "It is difficult to come up with instructions while we are still angry. Try and find a time when you are calm to introduce a positive instruction to your teen.   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_challenges_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_10",
                "destination_uuid": "uuid_mod_instructions_challenges_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_challenges_node_6",
            "actions": [
              {
                "attachments": [],
                "text": "Next time we chat, we’ll talk more about how we can manage our emotions as well! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_challenges_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_12",
                "destination_uuid": "uuid_mod_instructions_challenges_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_challenges_node_7",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "uuid_mod_instructions_challenges_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_13",
                "destination_uuid": "uuid_mod_instructions_challenges_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_challenges_node_9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_challenges_category_7",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_challenges_case_6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_15",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_challenges_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_16",
                  "name": "Yes",
                  "uuid": "uuid_mod_instructions_challenges_category_8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_15",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_challenges_exit_16",
                "destination_uuid": "uuid_mod_instructions_challenges_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_challenges_node_8",
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
                "uuid": "uuid_mod_instructions_challenges_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_14",
                "destination_uuid": "uuid_mod_instructions_challenges_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_challenges_node_11",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_challenges_category_9",
              "cases": [
                {
                  "arguments": [
                    "My teenager did not want to follow the instruction"
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_challenges_case_7"
                },
                {
                  "arguments": [
                    "I did not find time to spend one-on-one time with my teen."
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_11",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_challenges_case_8"
                },
                {
                  "arguments": [
                    "I gave a negative instead of a positive instruction"
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_12",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_challenges_case_9"
                },
                {
                  "arguments": [
                    "I shouted at my teen when they behaved negatively, instead of giving them a positive instruction for what they should do."
                  ],
                  "category_uuid": "uuid_mod_instructions_challenges_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_challenges_case_10"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_18",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_challenges_category_9"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_19",
                  "name": "My teenager did not want to follow the instruction",
                  "uuid": "uuid_mod_instructions_challenges_category_10"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_21",
                  "name": "I did not find time to spend one-on-one time with my teen.",
                  "uuid": "uuid_mod_instructions_challenges_category_11"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_23",
                  "name": "I gave a negative instead of a positive instruction",
                  "uuid": "uuid_mod_instructions_challenges_category_12"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_challenges_exit_25",
                  "name": "I shouted at my teen when they behaved negatively, instead of giving them a positive instruction for what they should do.",
                  "uuid": "uuid_mod_instructions_challenges_category_13"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_challenges_exit_18",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_challenges_exit_19",
                "destination_uuid": "uuid_mod_instructions_challenges_node_1"
              },
              {
                "uuid": "uuid_mod_instructions_challenges_exit_21",
                "destination_uuid": "uuid_mod_instructions_challenges_node_3"
              },
              {
                "uuid": "uuid_mod_instructions_challenges_exit_23",
                "destination_uuid": "uuid_mod_instructions_challenges_node_4"
              },
              {
                "uuid": "uuid_mod_instructions_challenges_exit_25",
                "destination_uuid": "uuid_mod_instructions_challenges_node_5"
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
        "name": "mod_instructions_emo",
        "uuid": "uuid_mod_instructions_emo_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instructions_emo_node_0",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! How are you feeling? ",
                "type": "send_msg",
                "quick_replies": [
                  "Happy",
                  "Neutral",
                  "Sad"
                ],
                "uuid": "uuid_mod_instructions_emo_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_0",
                "destination_uuid": "uuid_mod_instructions_emo_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_emo_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_emo_category_0",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "uuid_mod_instructions_emo_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_emo_case_0"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "uuid_mod_instructions_emo_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_emo_case_1"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "uuid_mod_instructions_emo_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_emo_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_emo_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_emo_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_emo_exit_3",
                  "name": "Happy",
                  "uuid": "uuid_mod_instructions_emo_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_emo_exit_5",
                  "name": "Neutral",
                  "uuid": "uuid_mod_instructions_emo_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_emo_exit_7",
                  "name": "Sad",
                  "uuid": "uuid_mod_instructions_emo_category_3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_emo_exit_3",
                "destination_uuid": "uuid_mod_instructions_emo_node_1"
              },
              {
                "uuid": "uuid_mod_instructions_emo_exit_5",
                "destination_uuid": "uuid_mod_instructions_emo_node_3"
              },
              {
                "uuid": "uuid_mod_instructions_emo_exit_7",
                "destination_uuid": "uuid_mod_instructions_emo_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_emo_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "So good to hear you are feeling well today. You are incredible!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "uuid_mod_instructions_emo_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_1",
                "destination_uuid": "uuid_mod_instructions_emo_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_emo_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes we are up, sometimes we are down – it’s okay. Remember it’s the small things that make the difference and I am here for you!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "uuid_mod_instructions_emo_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_4",
                "destination_uuid": "uuid_mod_instructions_emo_node_7"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_emo_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that things are difficult right now. Take a deep breath and know that you are valued. We are here to help!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "uuid_mod_instructions_emo_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_6",
                "destination_uuid": "uuid_mod_instructions_emo_node_10"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_emo_node_7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_emo_category_4",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "uuid_mod_instructions_emo_category_5",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_emo_case_3"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "uuid_mod_instructions_emo_category_6",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_emo_case_4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_emo_exit_10",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_emo_category_4"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_emo_exit_11",
                  "name": "More tips",
                  "uuid": "uuid_mod_instructions_emo_category_5"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_emo_exit_14",
                  "name": "Activity to help you relax",
                  "uuid": "uuid_mod_instructions_emo_category_6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_10",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_emo_exit_11",
                "destination_uuid": "uuid_mod_instructions_emo_node_5"
              },
              {
                "uuid": "uuid_mod_instructions_emo_exit_14",
                "destination_uuid": "uuid_mod_instructions_emo_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_emo_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_emo_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_emo__completed",
                  "name": "mod_instructions_emo__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_8",
                "destination_uuid": "uuid_mod_instructions_emo_node_6"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_emo_node_6",
            "actions": [
              {
                "flow": {
                  "name": "homescreen"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instructions_emo_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_9",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_emo_node_10",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_emo_category_7",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "uuid_mod_instructions_emo_category_8",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_emo_case_5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_emo_exit_15",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_emo_category_7"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_emo_exit_16",
                  "name": "Activity to help you relax",
                  "uuid": "uuid_mod_instructions_emo_category_8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_15",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_emo_exit_16",
                "destination_uuid": "uuid_mod_instructions_emo_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_emo_node_8",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_emo_action_6",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_emo__completed",
                  "name": "mod_instructions_emo__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_12",
                "destination_uuid": "uuid_mod_instructions_emo_node_9"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_emo_node_9",
            "actions": [
              {
                "flow": {
                  "name": "calm_6"
                },
                "type": "enter_flow",
                "uuid": "uuid_mod_instructions_emo_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_emo_exit_13",
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
        "name": "mod_instructions_fun",
        "uuid": "uuid_mod_instructions_fun_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_mod_instructions_fun_node_0",
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
                "uuid": "uuid_mod_instructions_fun_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_fun_exit_0",
                "destination_uuid": "uuid_mod_instructions_fun_node_2"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_fun_node_2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_mod_instructions_fun_category_0",
              "cases": [
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "uuid_mod_instructions_fun_category_1",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_fun_case_0"
                },
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "uuid_mod_instructions_fun_category_2",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_fun_case_1"
                },
                {
                  "arguments": [
                    "Watch & sing"
                  ],
                  "category_uuid": "uuid_mod_instructions_fun_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_mod_instructions_fun_case_2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_mod_instructions_fun_exit_2",
                  "name": "All Responses",
                  "uuid": "uuid_mod_instructions_fun_category_0"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_fun_exit_3",
                  "name": "Chat together",
                  "uuid": "uuid_mod_instructions_fun_category_1"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_fun_exit_5",
                  "name": "Get active",
                  "uuid": "uuid_mod_instructions_fun_category_2"
                },
                {
                  "exit_uuid": "uuid_mod_instructions_fun_exit_7",
                  "name": "Watch & sing",
                  "uuid": "uuid_mod_instructions_fun_category_3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_mod_instructions_fun_exit_2",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_mod_instructions_fun_exit_3",
                "destination_uuid": "uuid_mod_instructions_fun_node_1"
              },
              {
                "uuid": "uuid_mod_instructions_fun_exit_5",
                "destination_uuid": "uuid_mod_instructions_fun_node_3"
              },
              {
                "uuid": "uuid_mod_instructions_fun_exit_7",
                "destination_uuid": "uuid_mod_instructions_fun_node_4"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_fun_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Dream Travel \n- You can’t always travel but you can always dream! Ask your teen these questions.\n- Where do you want to travel? How long will you be away? What will you pack? What will you do? What will you see? \n- Look at a map together if you have one. \n- Choose a country that they’ve never heard of and find out about it.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_fun_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_fun_exit_1",
                "destination_uuid": "uuid_mod_instructions_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_fun_node_3",
            "actions": [
              {
                "attachments": [],
                "text": "Dance moves \n- Create a set of dance moves to your teen's favourite songs.\n- First person does a dance move and everyone else copies.\n- Everyone takes turns being the leader.\n- Perform it for the household!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_fun_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_fun_exit_4",
                "destination_uuid": "uuid_mod_instructions_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_fun_node_4",
            "actions": [
              {
                "attachments": [],
                "text": "Song...",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_mod_instructions_fun_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_fun_exit_6",
                "destination_uuid": "uuid_mod_instructions_fun_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_mod_instructions_fun_node_5",
            "actions": [
              {
                "uuid": "uuid_mod_instructions_fun_action_4",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_instructions_fun__completed",
                  "name": "mod_instructions_fun__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_mod_instructions_fun_exit_8",
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
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
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
                "uuid": "uuid_calm_1_action_1",
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
                "uuid": "uuid_calm_1_exit_1",
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
                "text": "Let's use the magic power of three stay present and relax. \n",
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
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "uuid_calm_4_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_calm_4_exit_1",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "uuid_calm_4_node_3",
            "actions": [
              {
                "uuid": "uuid_calm_4_action_2",
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
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
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
        "name": "chat_content_flow",
        "uuid": "uuid_chat_content_flow_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_chat_content_flow_node_0",
            "actions": [
              {
                "flow": {
                  "name": "character_names"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_0"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_1",
                "destination_uuid": "uuid_chat_content_flow_node_1"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_0"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_1"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_0",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_1"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_1",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_0"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_1",
            "actions": [
              {
                "attachments": [],
                "text": "Which module would you like to test?",
                "type": "send_msg",
                "quick_replies": [
                  "first app opening",
                  "welcome",
                  "1on1",
                  "praise"
                ],
                "uuid": "uuid_chat_content_flow_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_3",
                "destination_uuid": "uuid_chat_content_flow_node_3"
              }
            ]
          },
          {
            "uuid": "uuid_chat_content_flow_node_3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_2",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_3",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_2"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_17",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_15"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_28",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_25"
                },
                {
                  "arguments": [
                    "first app opening"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_41",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_37"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_5",
                  "name": "All Responses",
                  "uuid": "uuid_chat_content_flow_category_2"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_6",
                  "name": "welcome",
                  "uuid": "uuid_chat_content_flow_category_3"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_25",
                  "name": "1on1",
                  "uuid": "uuid_chat_content_flow_category_17"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_40",
                  "name": "praise",
                  "uuid": "uuid_chat_content_flow_category_28"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_57",
                  "name": "first app opening",
                  "uuid": "uuid_chat_content_flow_category_41"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_5",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_6",
                "destination_uuid": "uuid_chat_content_flow_node_2"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_25",
                "destination_uuid": "uuid_chat_content_flow_node_9"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_40",
                "destination_uuid": "uuid_chat_content_flow_node_14"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_57",
                "destination_uuid": "uuid_chat_content_flow_node_19"
              }
            ]
          },
          {
            "uuid": "uuid_chat_content_flow_node_2",
            "actions": [
              {
                "attachments": [],
                "text": "Which flow would you like to launch?",
                "type": "send_msg",
                "quick_replies": [
                  "mod_welcome_self-care_package",
                  "mod_welcome_quick_praise",
                  "mod_welcome_survey",
                  "mod_welcome_photo_activity"
                ],
                "uuid": "uuid_chat_content_flow_action_2"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_4",
                "destination_uuid": "uuid_chat_content_flow_node_5"
              }
            ]
          },
          {
            "uuid": "uuid_chat_content_flow_node_5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_6",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_7",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_5"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_10",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_8"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_13",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_11"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_16",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_14"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_10",
                  "name": "All Responses",
                  "uuid": "uuid_chat_content_flow_category_6"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_11",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "uuid_chat_content_flow_category_7"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_15",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "uuid_chat_content_flow_category_10"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_19",
                  "name": "mod_welcome_survey",
                  "uuid": "uuid_chat_content_flow_category_13"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_23",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "uuid_chat_content_flow_category_16"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_10",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_11",
                "destination_uuid": "uuid_chat_content_flow_node_4"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_15",
                "destination_uuid": "uuid_chat_content_flow_node_6"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_19",
                "destination_uuid": "uuid_chat_content_flow_node_7"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_23",
                "destination_uuid": "uuid_chat_content_flow_node_8"
              }
            ]
          },
          {
            "uuid": "uuid_chat_content_flow_node_4",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_3"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_8",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_9",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_4"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_5"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_4",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_8"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_5",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_9"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_4"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_6",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_4"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_13",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_14",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_6",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_8"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_9"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_8",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_13"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_9",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_14"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_8"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_7",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_5"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_17",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_18",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_9",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_11"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_10",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_12"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_11",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_17"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_12",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_18"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_11"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_8",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_6"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_21",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_22",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_12",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_14"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_13",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_15"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_14",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_21"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_15",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_22"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_14"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_9",
            "actions": [
              {
                "attachments": [],
                "text": "Which flow would you like to launch?",
                "type": "send_msg",
                "quick_replies": [
                  "mod_1on1_emo",
                  "mod_1on1_activity",
                  "mod_1on1_activity_review"
                ],
                "uuid": "uuid_chat_content_flow_action_7"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_24",
                "destination_uuid": "uuid_chat_content_flow_node_11"
              }
            ]
          },
          {
            "uuid": "uuid_chat_content_flow_node_11",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_20",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_21",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_18"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_24",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_21"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_27",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_24"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_29",
                  "name": "All Responses",
                  "uuid": "uuid_chat_content_flow_category_20"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_30",
                  "name": "mod_1on1_emo",
                  "uuid": "uuid_chat_content_flow_category_21"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_34",
                  "name": "mod_1on1_activity",
                  "uuid": "uuid_chat_content_flow_category_24"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_38",
                  "name": "mod_1on1_activity_review",
                  "uuid": "uuid_chat_content_flow_category_27"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_29",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_30",
                "destination_uuid": "uuid_chat_content_flow_node_10"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_34",
                "destination_uuid": "uuid_chat_content_flow_node_12"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_38",
                "destination_uuid": "uuid_chat_content_flow_node_13"
              }
            ]
          },
          {
            "uuid": "uuid_chat_content_flow_node_10",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_8"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_27",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_28",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_16",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_18"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_17",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_19"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_18",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_27"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_19",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_28"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_18"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_12",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_9"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_32",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_33",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_19",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_22"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_20",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_23"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_22",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_32"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_23",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_33"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_22"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_13",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_10"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_36",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_37",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_22",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_25"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_23",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_26"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_25",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_36"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_26",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_37"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_25"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_14",
            "actions": [
              {
                "attachments": [],
                "text": "Which flow would you like to launch?",
                "type": "send_msg",
                "quick_replies": [
                  "mod_praise_intro",
                  "mod_praise_activity",
                  "mod_praise_activity_review"
                ],
                "uuid": "uuid_chat_content_flow_action_11"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_39",
                "destination_uuid": "uuid_chat_content_flow_node_16"
              }
            ]
          },
          {
            "uuid": "uuid_chat_content_flow_node_16",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_31",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_32",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_28"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_35",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_31"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_38",
                  "type": "has_only_phrase",
                  "uuid": "uuid_chat_content_flow_case_34"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_44",
                  "name": "All Responses",
                  "uuid": "uuid_chat_content_flow_category_31"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_45",
                  "name": "mod_praise_intro",
                  "uuid": "uuid_chat_content_flow_category_32"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_49",
                  "name": "mod_praise_activity",
                  "uuid": "uuid_chat_content_flow_category_35"
                },
                {
                  "exit_uuid": "uuid_chat_content_flow_exit_53",
                  "name": "mod_praise_activity_review",
                  "uuid": "uuid_chat_content_flow_category_38"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_44",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_45",
                "destination_uuid": "uuid_chat_content_flow_node_15"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_49",
                "destination_uuid": "uuid_chat_content_flow_node_17"
              },
              {
                "uuid": "uuid_chat_content_flow_exit_53",
                "destination_uuid": "uuid_chat_content_flow_node_18"
              }
            ]
          },
          {
            "uuid": "uuid_chat_content_flow_node_15",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_12"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_42",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_43",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_26",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_29"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_27",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_30"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_29",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_42"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_30",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_43"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_29"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_17",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_13"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_47",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_48",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_29",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_33"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_30",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_34"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_33",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_47"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_34",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_48"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_33"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_18",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_14"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_51",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_52",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_32",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_36"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_33",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_37"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_36",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_51"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_37",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_52"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_36"
            }
          },
          {
            "uuid": "uuid_chat_content_flow_node_19",
            "actions": [
              {
                "flow": {
                  "name": "first_app_opening"
                },
                "type": "enter_flow",
                "uuid": "uuid_chat_content_flow_action_15"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_chat_content_flow_exit_55",
                "destination_uuid": null
              },
              {
                "uuid": "uuid_chat_content_flow_exit_56",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "uuid_chat_content_flow_case_35",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_39"
                },
                {
                  "uuid": "uuid_chat_content_flow_case_36",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "uuid_chat_content_flow_category_40"
                }
              ],
              "categories": [
                {
                  "uuid": "uuid_chat_content_flow_category_39",
                  "name": "Complete",
                  "exit_uuid": "uuid_chat_content_flow_exit_55"
                },
                {
                  "uuid": "uuid_chat_content_flow_category_40",
                  "name": "Expired",
                  "exit_uuid": "uuid_chat_content_flow_exit_56"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "uuid_chat_content_flow_category_39"
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
                  "key": "character_names__completed",
                  "name": "character_names__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_character_names_exit_10",
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
                  "key": "homescreen__completed",
                  "name": "homescreen__completed"
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
                "flow": {
                  "name": "https://plh-demo1.idems.international/module_list"
                },
                "type": "enter_flow",
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
                "flow": {
                  "name": "https://plh-demo1.idems.international/chat"
                },
                "type": "enter_flow",
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
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox"
                },
                "type": "enter_flow",
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
                  "key": "toolbox_mod_1on1_tips__completed",
                  "name": "toolbox_mod_1on1_tips__completed"
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
                "flow": {
                  "name": "https://plh-demo1.idems.international/tips/flow/mod_1on1_tips"
                },
                "type": "enter_flow",
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
                  "key": "toolbox_mod_praise_tips__completed",
                  "name": "toolbox_mod_praise_tips__completed"
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
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips"
                },
                "type": "enter_flow",
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
        "name": "toolbox_mod_instructions_tips",
        "uuid": "uuid_toolbox_mod_instructions_tips_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_toolbox_mod_instructions_tips_node_0",
            "actions": [
              {
                "uuid": "uuid_toolbox_mod_instructions_tips_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "toolbox_mod_instructions_tips__completed",
                  "name": "toolbox_mod_instructions_tips__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_mod_instructions_tips_exit_0",
                "destination_uuid": "uuid_toolbox_mod_instructions_tips_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_toolbox_mod_instructions_tips_node_1",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips"
                },
                "type": "enter_flow",
                "uuid": "uuid_toolbox_mod_instructions_tips_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_mod_instructions_tips_exit_1",
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
        "name": "toolbox_mod_stress_tips",
        "uuid": "uuid_toolbox_mod_stress_tips_flow_0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "uuid_toolbox_mod_stress_tips_node_0",
            "actions": [
              {
                "uuid": "uuid_toolbox_mod_stress_tips_action_0",
                "type": "set_contact_field",
                "field": {
                  "key": "toolbox_mod_stress_tips__completed",
                  "name": "toolbox_mod_stress_tips__completed"
                },
                "value": "true"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_mod_stress_tips_exit_0",
                "destination_uuid": "uuid_toolbox_mod_stress_tips_node_1"
              }
            ]
          },
          {
            "uuid": "uuid_toolbox_mod_stress_tips_node_1",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox/topic/MANAGING_ANGER_AND_STRESS/Stress_Tips"
                },
                "type": "enter_flow",
                "uuid": "uuid_toolbox_mod_stress_tips_action_1"
              }
            ],
            "exits": [
              {
                "uuid": "uuid_toolbox_mod_stress_tips_exit_1",
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
                "flow": {
                  "name": "https://plh-demo1.idems.international/gallery"
                },
                "type": "enter_flow",
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
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
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
                "text": "Every time you take a pause is an act of kindness. Thank you for being kind to yourself and your family today!",
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
                "text": "Congratulations! You are doing amazing! Remember it’s the small things that make the big difference. ",
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
                "text": "Hey beautiful woman! Thank you for showing so much strength and sharing it with your family.",
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
                "text": "Thank you for being an inspiration to other women. Keep shining that light of yours!",
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
                "text": "Thank you for your dedication! The world needs more women like you.",
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
                "text": "Sometimes it feels like do the best you can, and your kids are still grumpy. Remember that you are doing an amazing job, and that there will be good times with them too!",
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
                "text": "Remember to be proud of yourself for every good moment of parenting",
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
                "text": "Thank you for being so committed to improving the life of your children. It shows you really care!",
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
  }
]