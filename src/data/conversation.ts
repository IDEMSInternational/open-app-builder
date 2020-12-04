/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const conversation: FlowTypes.Conversation[] = [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "7da64e31-6eb2-4f0a-b631-2ff6de2e526e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5423e567-dee5-439e-beab-fd1e9dbe10cd",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8922fe81-a80c-4771-9672-fad19be9082c"
              }
            ],
            "exits": [
              {
                "uuid": "85ba99f0-1f05-4d73-9f4d-2a15eecc3933",
                "destination_uuid": "966b827c-64bd-4aa2-89d5-3b225cf49240"
              }
            ]
          },
          {
            "uuid": "966b827c-64bd-4aa2-89d5-3b225cf49240",
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
                "uuid": "af68e48e-2f55-4ca6-aaae-8138f714c1ae"
              }
            ],
            "exits": [
              {
                "uuid": "b340d803-c07d-45a5-967d-3d70fe284e93",
                "destination_uuid": "621852b8-c10d-4d31-bcd7-982af484af9b"
              }
            ]
          },
          {
            "uuid": "621852b8-c10d-4d31-bcd7-982af484af9b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d1543e18-ba7c-4aa1-b631-172e145eafd5",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "1b37c0f5-1cb5-406d-8d20-bf5143730b8c",
                  "type": "has_only_phrase",
                  "uuid": "2f1cb437-7a26-442f-a811-c982c938c8e8"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "58f7c242-086b-4407-ad3e-f303ff1d46cf",
                  "type": "has_only_phrase",
                  "uuid": "85bafe49-6113-4b8f-a5a8-6c615fdf452a"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "8750d930-e1de-4978-ab89-f483942042d0",
                  "type": "has_only_phrase",
                  "uuid": "75282484-207b-4094-9d77-e805a1d63807"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "7fc6859a-b136-404d-8850-17fc6323df93",
                  "type": "has_only_phrase",
                  "uuid": "0236cfce-790c-432c-895e-19e35a7bf2c6"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "9e227e07-ab18-4481-93a5-8f044280a6cb",
                  "type": "has_only_phrase",
                  "uuid": "562105d5-925e-46ba-9a8c-5810e832c44a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "db63945f-f065-4862-b7a9-aadca9df9328",
                  "name": "All Responses",
                  "uuid": "d1543e18-ba7c-4aa1-b631-172e145eafd5"
                },
                {
                  "exit_uuid": "e39d0373-3ad5-4591-a39e-805c9d07c814",
                  "name": "First option: launch example_media flow",
                  "uuid": "1b37c0f5-1cb5-406d-8d20-bf5143730b8c"
                },
                {
                  "exit_uuid": "1bad03e2-827d-44db-b344-a4d31f0d2182",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "58f7c242-086b-4407-ad3e-f303ff1d46cf"
                },
                {
                  "exit_uuid": "4d0d3c10-128d-47af-85b9-4c3af7928292",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "8750d930-e1de-4978-ab89-f483942042d0"
                },
                {
                  "exit_uuid": "c60d618f-d2b4-455d-a57e-0070de8698a9",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "7fc6859a-b136-404d-8850-17fc6323df93"
                },
                {
                  "exit_uuid": "7f8d4186-cf4c-4281-b760-849288ac44b3",
                  "name": "Stay in this flow.",
                  "uuid": "9e227e07-ab18-4481-93a5-8f044280a6cb"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "db63945f-f065-4862-b7a9-aadca9df9328",
                "destination_uuid": null
              },
              {
                "uuid": "e39d0373-3ad5-4591-a39e-805c9d07c814",
                "destination_uuid": "fe07ffd3-c294-4c38-903e-69bafe1047dc"
              },
              {
                "uuid": "1bad03e2-827d-44db-b344-a4d31f0d2182",
                "destination_uuid": "d643d906-48cf-4b5d-9674-67bca2b13963"
              },
              {
                "uuid": "4d0d3c10-128d-47af-85b9-4c3af7928292",
                "destination_uuid": "39ff7c04-eae9-4230-bd9d-948bd356099f"
              },
              {
                "uuid": "c60d618f-d2b4-455d-a57e-0070de8698a9",
                "destination_uuid": "45d46041-4220-4a5c-8e2c-af8f32adc76d"
              },
              {
                "uuid": "7f8d4186-cf4c-4281-b760-849288ac44b3",
                "destination_uuid": "4a6a4d79-0c46-4c06-834a-e30fe44f8b3d"
              }
            ]
          },
          {
            "uuid": "fe07ffd3-c294-4c38-903e-69bafe1047dc",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "dd7a26e3-35c1-4255-ab97-e3d10378c298"
                },
                "type": "enter_flow",
                "uuid": "de3ef066-4ce0-42db-aac0-722db24b0fd5"
              }
            ],
            "exits": [
              {
                "uuid": "78ba32d0-3cbf-4bde-bdfd-c2c1b2643120",
                "destination_uuid": "4b8f255d-99bc-4fd6-a6f4-a0b21f171f60"
              },
              {
                "uuid": "48f81609-ee93-4909-98ab-660b9d005938",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ae4410cd-06d2-47ce-b5dc-73d385c62d67",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "40907b03-489f-424b-aba2-397e405155f8"
                },
                {
                  "uuid": "9fcbdbb0-8890-4a73-870b-509e830ac400",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "7f88edca-7b33-432e-a28f-eccc685f28d1"
                }
              ],
              "categories": [
                {
                  "uuid": "40907b03-489f-424b-aba2-397e405155f8",
                  "name": "Complete",
                  "exit_uuid": "78ba32d0-3cbf-4bde-bdfd-c2c1b2643120"
                },
                {
                  "uuid": "7f88edca-7b33-432e-a28f-eccc685f28d1",
                  "name": "Expired",
                  "exit_uuid": "48f81609-ee93-4909-98ab-660b9d005938"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "40907b03-489f-424b-aba2-397e405155f8"
            }
          },
          {
            "uuid": "d643d906-48cf-4b5d-9674-67bca2b13963",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "436a4250-1319-4e8e-85d7-f316a9820a7a"
                },
                "type": "enter_flow",
                "uuid": "ace5a48d-dab9-41ba-9130-51d5e1a247a1"
              }
            ],
            "exits": [
              {
                "uuid": "27ee5373-40b8-4f8f-8e8c-e6efe3761dfc",
                "destination_uuid": "4b8f255d-99bc-4fd6-a6f4-a0b21f171f60"
              },
              {
                "uuid": "d0faf82f-57be-4d77-90bc-99710649ed91",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "cf4c518b-f9b2-4482-a013-50f9d6847b28",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ebc2ae9a-b21b-4d30-a091-327d1615e579"
                },
                {
                  "uuid": "062c2f4c-544c-4449-8a2f-855b60b0bd86",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0d9ae476-e20a-46a7-8f99-c3137ce08051"
                }
              ],
              "categories": [
                {
                  "uuid": "ebc2ae9a-b21b-4d30-a091-327d1615e579",
                  "name": "Complete",
                  "exit_uuid": "27ee5373-40b8-4f8f-8e8c-e6efe3761dfc"
                },
                {
                  "uuid": "0d9ae476-e20a-46a7-8f99-c3137ce08051",
                  "name": "Expired",
                  "exit_uuid": "d0faf82f-57be-4d77-90bc-99710649ed91"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ebc2ae9a-b21b-4d30-a091-327d1615e579"
            }
          },
          {
            "uuid": "39ff7c04-eae9-4230-bd9d-948bd356099f",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "c1574dfd-6570-4388-9a9d-98db51867c76"
                },
                "type": "enter_flow",
                "uuid": "c20e12ee-053e-4f62-b7fc-47bbcf6e6deb"
              }
            ],
            "exits": [
              {
                "uuid": "64c2d927-379d-435b-a317-53bdecf3d5e9",
                "destination_uuid": "4b8f255d-99bc-4fd6-a6f4-a0b21f171f60"
              },
              {
                "uuid": "b0548e88-fe51-45a5-86fd-0c6ca4a42f4e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "becb9461-f4a5-49dc-8dd0-d7dc0708e7b3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "34463bd3-0ab1-4f24-b5ca-85732a7e0e0e"
                },
                {
                  "uuid": "ba141746-abc9-4a84-ae1d-ac08ff1367f1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "3a8113e9-8d14-49cf-a306-2065c9caef7a"
                }
              ],
              "categories": [
                {
                  "uuid": "34463bd3-0ab1-4f24-b5ca-85732a7e0e0e",
                  "name": "Complete",
                  "exit_uuid": "64c2d927-379d-435b-a317-53bdecf3d5e9"
                },
                {
                  "uuid": "3a8113e9-8d14-49cf-a306-2065c9caef7a",
                  "name": "Expired",
                  "exit_uuid": "b0548e88-fe51-45a5-86fd-0c6ca4a42f4e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "34463bd3-0ab1-4f24-b5ca-85732a7e0e0e"
            }
          },
          {
            "uuid": "45d46041-4220-4a5c-8e2c-af8f32adc76d",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "0819d2ec-727d-48cc-ab1d-0c6a60593069"
                },
                "type": "enter_flow",
                "uuid": "36bd4a54-eb52-4857-b42a-cde717749b63"
              }
            ],
            "exits": [
              {
                "uuid": "92e13383-b75c-4eca-aba3-e94c1207fae2",
                "destination_uuid": "4b8f255d-99bc-4fd6-a6f4-a0b21f171f60"
              },
              {
                "uuid": "493193ab-da29-4618-bede-fd8342fbb960",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7a930df8-81c3-423e-9e72-7af90d30a6d7",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "9c8fa08c-c1bd-4a5a-88fb-abeffca28f94"
                },
                {
                  "uuid": "c4eecd49-cca5-4592-9d01-d31cce04ec29",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "642d1b93-5a02-44dd-8f1c-b599472ec517"
                }
              ],
              "categories": [
                {
                  "uuid": "9c8fa08c-c1bd-4a5a-88fb-abeffca28f94",
                  "name": "Complete",
                  "exit_uuid": "92e13383-b75c-4eca-aba3-e94c1207fae2"
                },
                {
                  "uuid": "642d1b93-5a02-44dd-8f1c-b599472ec517",
                  "name": "Expired",
                  "exit_uuid": "493193ab-da29-4618-bede-fd8342fbb960"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "9c8fa08c-c1bd-4a5a-88fb-abeffca28f94"
            }
          },
          {
            "uuid": "4a6a4d79-0c46-4c06-834a-e30fe44f8b3d",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "aabd47ad-1676-4bf3-93db-07f1a7c30b16"
              }
            ],
            "exits": [
              {
                "uuid": "bce1bbb2-4479-4aa1-8d4a-dacd97d01d0e",
                "destination_uuid": "1f9c41dd-1e0e-444d-a887-cae8ec2faf1f"
              }
            ]
          },
          {
            "uuid": "4b8f255d-99bc-4fd6-a6f4-a0b21f171f60",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5e9774ca-3352-4e70-b8c9-b6ce8b527e5d"
              }
            ],
            "exits": [
              {
                "uuid": "29b58bb5-b44d-4e1c-a41d-3a19a6d628bd",
                "destination_uuid": "1f9c41dd-1e0e-444d-a887-cae8ec2faf1f"
              }
            ]
          },
          {
            "uuid": "1f9c41dd-1e0e-444d-a887-cae8ec2faf1f",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "bc249c3f-3fbd-452d-bfcb-9bfc381e52cb"
              }
            ],
            "exits": [
              {
                "uuid": "ad5d4aeb-354d-446f-bcd7-db3614e91e96",
                "destination_uuid": "7fc085d3-1164-434d-b677-a3441ff17c8e"
              }
            ]
          },
          {
            "uuid": "7fc085d3-1164-434d-b677-a3441ff17c8e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9cb153df-d15c-42a0-962b-7476b5dfba70",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "42b288a9-7ce8-40e2-bb9b-89599f7a2415",
                  "type": "has_only_phrase",
                  "uuid": "4e58d147-c74c-4ebf-a268-ce31dff37007"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "d7d7985d-a4e7-4590-b0ec-61e7c94acb57",
                  "type": "has_only_phrase",
                  "uuid": "f7d43a87-7589-42c9-8ee7-a956b336316b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3907d662-69d2-4c27-a02e-d9a66839935f",
                  "name": "All Responses",
                  "uuid": "9cb153df-d15c-42a0-962b-7476b5dfba70"
                },
                {
                  "exit_uuid": "946c40ca-c143-4b0f-a080-9d3aa4553e94",
                  "name": "Yes",
                  "uuid": "42b288a9-7ce8-40e2-bb9b-89599f7a2415"
                },
                {
                  "exit_uuid": "55cdb534-2ad4-4299-bab1-6ddbd13ca09a",
                  "name": "No",
                  "uuid": "d7d7985d-a4e7-4590-b0ec-61e7c94acb57"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3907d662-69d2-4c27-a02e-d9a66839935f",
                "destination_uuid": null
              },
              {
                "uuid": "946c40ca-c143-4b0f-a080-9d3aa4553e94",
                "destination_uuid": "966b827c-64bd-4aa2-89d5-3b225cf49240"
              },
              {
                "uuid": "55cdb534-2ad4-4299-bab1-6ddbd13ca09a",
                "destination_uuid": "81e97948-4a77-49d3-8c80-0ce0feab51ee"
              }
            ]
          },
          {
            "uuid": "81e97948-4a77-49d3-8c80-0ce0feab51ee",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "760074dc-3398-4134-a0f4-44b4ce17f3ef"
              }
            ],
            "exits": [
              {
                "uuid": "b4c80265-734d-4136-b5b2-a6dc44eccad2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "aa9b60ba-91bb-460f-9c70-ee70a59e3052",
            "actions": [
              {
                "uuid": "b07df489-6d93-407a-984c-7f516b72dfc0",
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
                "uuid": "84a0c597-01dc-42ba-b8c3-c72b9bc0aafe",
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
        "uuid": "294a89e2-4e49-41c1-8cbc-6078b9e95d5a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "62dd4b04-17f8-428a-a876-c60a607eb4db",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3ce76fd3-38e0-4b7d-a2fa-4838fa320b44"
              }
            ],
            "exits": [
              {
                "uuid": "2005766b-52fd-486b-9210-4a4de656ce0f",
                "destination_uuid": "8d8d2bac-a2f2-4090-bbde-601fa460ca46"
              }
            ]
          },
          {
            "uuid": "82b461de-ee9b-4f69-9d3e-1afe145d6089",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ed08a13a-a4fb-48ee-8fdb-df6462097de3"
              }
            ],
            "exits": [
              {
                "uuid": "5d31a950-9f14-46c7-8d72-cf44e6be0a9e",
                "destination_uuid": "3ef50281-cece-4766-bd66-1e28e8925a2f"
              }
            ]
          },
          {
            "uuid": "3ef50281-cece-4766-bd66-1e28e8925a2f",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "fe84887c-cfd7-4337-8b83-8d13b5c7d904"
              }
            ],
            "exits": [
              {
                "uuid": "9b60c2fc-27d1-4b49-8b77-eb7680dd7a7e",
                "destination_uuid": "445f51ce-547a-4424-bd61-1db2d4cc79c9"
              }
            ]
          },
          {
            "uuid": "445f51ce-547a-4424-bd61-1db2d4cc79c9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1792e16b-7b72-4ed8-b44e-7fde24ab5140",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "ef7de7ae-4efb-4ecc-a5a3-66e1262f0d10",
                  "type": "has_only_phrase",
                  "uuid": "5d404acd-142b-4e8e-b2da-9c0e48956e50"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "ef7de7ae-4efb-4ecc-a5a3-66e1262f0d10",
                  "type": "has_only_phrase",
                  "uuid": "db14af46-1e4e-48bf-b5b7-629cb3ffe7f0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "aebcd745-3b36-4b80-bf81-1e9c2097cb8e",
                  "name": "All Responses",
                  "uuid": "1792e16b-7b72-4ed8-b44e-7fde24ab5140"
                },
                {
                  "exit_uuid": "bc73076b-7905-4c2b-a974-bd344ee4d5cb",
                  "name": "image1; image2",
                  "uuid": "ef7de7ae-4efb-4ecc-a5a3-66e1262f0d10"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "aebcd745-3b36-4b80-bf81-1e9c2097cb8e",
                "destination_uuid": null
              },
              {
                "uuid": "bc73076b-7905-4c2b-a974-bd344ee4d5cb",
                "destination_uuid": "c6471648-74e3-4c4b-bc69-0c03d048ae6a"
              }
            ]
          },
          {
            "uuid": "c6471648-74e3-4c4b-bc69-0c03d048ae6a",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "087abdbf-b60a-45fc-9a5d-23047a226c59"
              }
            ],
            "exits": [
              {
                "uuid": "1da36ac4-5ca1-484c-b9b6-2a507fa23ece",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "8d8d2bac-a2f2-4090-bbde-601fa460ca46",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6569a1a2-9d06-4aea-8146-2e643b189fd3",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "5ce7cc34-3ef1-47f4-b371-8f1dd04b88c5",
                  "type": "has_only_phrase",
                  "uuid": "5ac1d47b-a9ec-4cf2-b96e-ea04a7ccc91d"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "5ce7cc34-3ef1-47f4-b371-8f1dd04b88c5",
                  "type": "has_only_phrase",
                  "uuid": "d587993c-341e-4749-8928-3f634c52d8ca"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a4897a3d-12b1-4ac9-880c-f56ce309c01b",
                  "name": "All Responses",
                  "uuid": "6569a1a2-9d06-4aea-8146-2e643b189fd3"
                },
                {
                  "exit_uuid": "085077cd-e018-442a-bae5-81c11185b6ac",
                  "name": "image1; image2",
                  "uuid": "5ce7cc34-3ef1-47f4-b371-8f1dd04b88c5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a4897a3d-12b1-4ac9-880c-f56ce309c01b",
                "destination_uuid": "82b461de-ee9b-4f69-9d3e-1afe145d6089"
              },
              {
                "uuid": "085077cd-e018-442a-bae5-81c11185b6ac",
                "destination_uuid": "bc243c9d-ddee-4f13-8a51-5fa5fda1eac4"
              }
            ]
          },
          {
            "uuid": "bc243c9d-ddee-4f13-8a51-5fa5fda1eac4",
            "actions": [
              {
                "uuid": "6c32e5f3-f3f9-4cbe-853f-a3ca5745ad84",
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
                "uuid": "a17ef449-bd03-4c78-ad25-5b6a6280c3a6",
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
        "uuid": "d0a03483-3733-46df-9a69-c7034b3baaac",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3fef4bfd-b664-4d2e-8dbd-ea2ba412afac",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "b1204b2e-aa23-4449-9794-e53d0b25e067"
              }
            ],
            "exits": [
              {
                "uuid": "5291181b-1f3d-480b-8366-6b5da18556b2",
                "destination_uuid": "00b2be07-1d7a-4fa1-8108-a0961d9a3856"
              }
            ]
          },
          {
            "uuid": "00b2be07-1d7a-4fa1-8108-a0961d9a3856",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ed18682c-d36c-4ed6-848a-084fba4c445f",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "77cfbe73-83ed-4810-bd87-bc5f00f9e90c",
                  "type": "has_only_phrase",
                  "uuid": "0859150e-c4ab-4a03-bdea-9ab1d990d9a3"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "98982f2a-71a7-4d75-9c05-5d31e368dedc",
                  "type": "has_only_phrase",
                  "uuid": "8e9b6aa0-84a7-47fc-9acb-5b141c40b684"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b325f30f-6118-4cb5-995b-d0a9619ac767",
                  "name": "All Responses",
                  "uuid": "ed18682c-d36c-4ed6-848a-084fba4c445f"
                },
                {
                  "exit_uuid": "2ca6016b-9c8c-4f20-8d75-5444ea6d600c",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "77cfbe73-83ed-4810-bd87-bc5f00f9e90c"
                },
                {
                  "exit_uuid": "2ba3da89-3227-468e-8acb-f2af31c90f0e",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "98982f2a-71a7-4d75-9c05-5d31e368dedc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b325f30f-6118-4cb5-995b-d0a9619ac767",
                "destination_uuid": null
              },
              {
                "uuid": "2ca6016b-9c8c-4f20-8d75-5444ea6d600c",
                "destination_uuid": "c03dce9e-3c6c-4f85-a675-be4eea4d2e81"
              },
              {
                "uuid": "2ba3da89-3227-468e-8acb-f2af31c90f0e",
                "destination_uuid": "a5a1f370-afe0-4026-8d91-ab0038f3f0d6"
              }
            ]
          },
          {
            "uuid": "c03dce9e-3c6c-4f85-a675-be4eea4d2e81",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "e0226d11-0d17-44b7-835e-4065c70adaaf"
              }
            ],
            "exits": [
              {
                "uuid": "66c8fe72-be72-4417-b905-3f065467b841",
                "destination_uuid": "3e5d9787-c4df-4cbf-833c-c5f7f7ad0dad"
              }
            ]
          },
          {
            "uuid": "a5a1f370-afe0-4026-8d91-ab0038f3f0d6",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "b150c9c2-9cb2-4abe-a6d6-a4e1fa3d0d72"
              }
            ],
            "exits": [
              {
                "uuid": "219d9a44-4f57-46bd-9e12-477913e818ad",
                "destination_uuid": "3e5d9787-c4df-4cbf-833c-c5f7f7ad0dad"
              }
            ]
          },
          {
            "uuid": "3e5d9787-c4df-4cbf-833c-c5f7f7ad0dad",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9387f14d-c56d-4956-b982-ba998a17eece",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "8097ec6c-342e-41db-bcf8-f1529003c891",
                  "type": "has_only_phrase",
                  "uuid": "8ab46a4a-17d0-4694-819f-63fdbf153149"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "98e494b6-57fa-452e-a2e0-6cc74a86d23e",
                  "type": "has_only_phrase",
                  "uuid": "9dda9b4a-6e26-498a-a730-db49eb62814a"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "00389520-7874-45f0-81fb-85a15158ddc4",
                  "type": "has_only_phrase",
                  "uuid": "2da5ed43-8659-47b2-a48a-7d70453ab0a5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3e69f7a3-7733-43f6-b0fb-7fa446e75d1e",
                  "name": "All Responses",
                  "uuid": "9387f14d-c56d-4956-b982-ba998a17eece"
                },
                {
                  "exit_uuid": "4d958da8-70fb-4619-954f-dd94a6f7c93f",
                  "name": "Hello",
                  "uuid": "8097ec6c-342e-41db-bcf8-f1529003c891"
                },
                {
                  "exit_uuid": "2a7d91f5-5692-4cb3-a0d2-77420acd918e",
                  "name": "Goodbye",
                  "uuid": "98e494b6-57fa-452e-a2e0-6cc74a86d23e"
                },
                {
                  "exit_uuid": "d30460a7-2bbd-486d-bd9a-ec1b4be219f6",
                  "name": "Goodbye",
                  "uuid": "00389520-7874-45f0-81fb-85a15158ddc4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3e69f7a3-7733-43f6-b0fb-7fa446e75d1e",
                "destination_uuid": null
              },
              {
                "uuid": "4d958da8-70fb-4619-954f-dd94a6f7c93f",
                "destination_uuid": "7a839ea7-4784-4f10-86c4-3e718119ea6e"
              },
              {
                "uuid": "2a7d91f5-5692-4cb3-a0d2-77420acd918e",
                "destination_uuid": "64b91e97-c898-4b7d-af6a-0be20d5d507c"
              },
              {
                "uuid": "d30460a7-2bbd-486d-bd9a-ec1b4be219f6",
                "destination_uuid": "64b91e97-c898-4b7d-af6a-0be20d5d507c"
              }
            ]
          },
          {
            "uuid": "7a839ea7-4784-4f10-86c4-3e718119ea6e",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dda6e476-6dd5-49e2-8a08-505a243d7738"
              }
            ],
            "exits": [
              {
                "uuid": "c752e379-0b47-4935-a1b8-48aa3ffcf000",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "64b91e97-c898-4b7d-af6a-0be20d5d507c",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2e524774-77a7-4e08-9315-ec0797c58429"
              }
            ],
            "exits": [
              {
                "uuid": "ad988768-fc71-41c9-82ec-6201e14837d1",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b1d59667-92fa-41d4-979e-9c4f10e1864c",
            "actions": [
              {
                "uuid": "69a3d14f-203e-4473-8544-4dae36be0926",
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
                "uuid": "fea26c8a-a9b6-4bc4-9b9a-630b011d9196",
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
        "uuid": "ae86a609-89e4-49a1-b229-98d989de780b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "163a0456-fc86-4b35-bf33-8d2ee68f664e",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7585b9e7-5dc0-4045-b6ef-b19711a13332"
              }
            ],
            "exits": [
              {
                "uuid": "a02f994d-e34c-4c4f-9468-7dd82c764279",
                "destination_uuid": "bf014a12-1e2e-42b7-8b17-b89d99ff95ee"
              }
            ]
          },
          {
            "uuid": "bf014a12-1e2e-42b7-8b17-b89d99ff95ee",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "d0ceb88a-f2fb-4afa-925b-b014c6ef8689"
              }
            ],
            "exits": [
              {
                "uuid": "65fbd2b4-c78e-4546-832a-35323fcc871c",
                "destination_uuid": "b6bc4ff5-5d04-42e8-877d-ececa9c34244"
              }
            ]
          },
          {
            "uuid": "b6bc4ff5-5d04-42e8-877d-ececa9c34244",
            "actions": [],
            "exits": [
              {
                "uuid": "471ec7f1-9cc7-4b2b-a74a-bedc5f71f155",
                "destination_uuid": "ac4105d1-41b6-4c5e-b0f4-41a46cc6d436"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "5282d030-ae31-4e76-af8e-5f427000a6c3",
              "cases": [],
              "categories": [
                {
                  "uuid": "5282d030-ae31-4e76-af8e-5f427000a6c3",
                  "name": "All Responses",
                  "exit_uuid": "471ec7f1-9cc7-4b2b-a74a-bedc5f71f155"
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
            "uuid": "ac4105d1-41b6-4c5e-b0f4-41a46cc6d436",
            "actions": [
              {
                "uuid": "79f7ded3-54da-4c10-885d-8230eb72d5be",
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
                "uuid": "7b8ccdcd-18cb-4211-8bb6-765113986d9e",
                "destination_uuid": "9baa5065-a120-4ef9-9b63-eadf9f7be4c2"
              }
            ]
          },
          {
            "uuid": "9baa5065-a120-4ef9-9b63-eadf9f7be4c2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3540d02b-17e8-426d-9b6e-113eba5da627",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "29891826-e81f-4ea9-9e49-4daa6f804a3c",
                  "type": "has_only_phrase",
                  "uuid": "4842ee98-98c2-44c1-a747-fcf32ba6cf3e"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "6f0a79d4-f3ad-4f93-8512-3988ab8c1548",
                  "type": "has_only_phrase",
                  "uuid": "dcab4abd-a951-430e-8e47-12b6ed7dd89a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d0713e5f-3ece-4767-9ddc-ef5d6740e339",
                  "name": "All Responses",
                  "uuid": "3540d02b-17e8-426d-9b6e-113eba5da627"
                },
                {
                  "exit_uuid": "66af89d2-c829-44b4-9e62-4b2bb365ad04",
                  "name": "1",
                  "uuid": "29891826-e81f-4ea9-9e49-4daa6f804a3c"
                },
                {
                  "exit_uuid": "8c94c60d-c031-4522-a239-6dc8705cf026",
                  "name": "2",
                  "uuid": "6f0a79d4-f3ad-4f93-8512-3988ab8c1548"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "d0713e5f-3ece-4767-9ddc-ef5d6740e339",
                "destination_uuid": "d0c6567c-8200-4b28-9cb4-1f1d4f321030"
              },
              {
                "uuid": "66af89d2-c829-44b4-9e62-4b2bb365ad04",
                "destination_uuid": "aa742d22-f040-4147-8e7b-76b7ccc66015"
              },
              {
                "uuid": "8c94c60d-c031-4522-a239-6dc8705cf026",
                "destination_uuid": "132d2f45-da5e-4fec-b957-b322d0e5f3d3"
              }
            ]
          },
          {
            "uuid": "aa742d22-f040-4147-8e7b-76b7ccc66015",
            "actions": [
              {
                "uuid": "6abd25ae-06ca-4bad-ba07-afda82ea5082",
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
                "uuid": "2f2bfb0c-64c9-4c22-821c-7a65f50c4bed",
                "destination_uuid": "f99cf3d4-45d3-4a4e-8d3f-759be6f940ca"
              }
            ]
          },
          {
            "uuid": "132d2f45-da5e-4fec-b957-b322d0e5f3d3",
            "actions": [
              {
                "uuid": "1af52599-0608-41e7-be40-e60d7db23dc4",
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
                "uuid": "cb9ab98c-5f8e-44eb-9c28-485c66b559f2",
                "destination_uuid": "64950a46-caa4-432a-b857-581e0359a17a"
              }
            ]
          },
          {
            "uuid": "d0c6567c-8200-4b28-9cb4-1f1d4f321030",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3fe82c59-7f49-4cfe-9120-d31ce1977d62"
              }
            ],
            "exits": [
              {
                "uuid": "a6832a86-4bc0-4e0e-a31b-333d65253576",
                "destination_uuid": "d7a353fb-f00b-42c7-a004-c4a9cd7dfa2c"
              }
            ]
          },
          {
            "uuid": "d7a353fb-f00b-42c7-a004-c4a9cd7dfa2c",
            "actions": [],
            "exits": [
              {
                "uuid": "403d4d9d-e5c3-4c7b-a697-347a864475d1",
                "destination_uuid": "105768a3-2b6f-4586-bacb-d496d817adfa"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "87dae841-afa0-4023-982b-162c7c1e66d9",
              "cases": [],
              "categories": [
                {
                  "uuid": "87dae841-afa0-4023-982b-162c7c1e66d9",
                  "name": "All Responses",
                  "exit_uuid": "403d4d9d-e5c3-4c7b-a697-347a864475d1"
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
            "uuid": "105768a3-2b6f-4586-bacb-d496d817adfa",
            "actions": [
              {
                "uuid": "c5fa9d2c-5288-4fae-b7ca-e1039b59763c",
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
                "uuid": "00a60c93-c0b9-4c52-ad06-3b8009a3f20c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f99cf3d4-45d3-4a4e-8d3f-759be6f940ca",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c20b251c-9d62-4597-af19-1b612bcb5817"
              }
            ],
            "exits": [
              {
                "uuid": "c8066e50-0c87-4671-a7df-d2f7d9cb1c67",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "64950a46-caa4-432a-b857-581e0359a17a",
            "actions": [
              {
                "uuid": "6e6c58f9-8fe2-433f-ad80-8a35c6105be4",
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
                "uuid": "4d20a5bd-ded7-4ec0-bb7d-214258a16b2b",
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
        "uuid": "0307cd1c-8887-49c1-86ca-9460f037a1a8",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1f3c1e21-2756-46bc-9f0d-48943b431235",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "35457807-55c5-4487-8732-392b14d559d4"
              }
            ],
            "exits": [
              {
                "uuid": "90854fa2-c7e0-4e63-911e-b63e6cff2104",
                "destination_uuid": "074ece0f-f6f1-4a76-a455-65afa3b5b49c"
              }
            ]
          },
          {
            "uuid": "074ece0f-f6f1-4a76-a455-65afa3b5b49c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "84f92945-7ddd-414b-977c-ae9b5a86e7ae",
              "cases": [
                {
                  "arguments": [
                    "Go to the story"
                  ],
                  "category_uuid": "b36b3080-d93f-46e8-a6d1-056492aaff2d",
                  "type": "has_only_phrase",
                  "uuid": "9fa3228b-fc3b-46c3-9bee-a0e13e995d10"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f85e3cae-361c-45d2-bde5-fad82da76458",
                  "name": "All Responses",
                  "uuid": "84f92945-7ddd-414b-977c-ae9b5a86e7ae"
                },
                {
                  "exit_uuid": "c32799d5-e728-4e01-9e1f-9dd961f8ffb2",
                  "name": "Go to the story",
                  "uuid": "b36b3080-d93f-46e8-a6d1-056492aaff2d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f85e3cae-361c-45d2-bde5-fad82da76458",
                "destination_uuid": null
              },
              {
                "uuid": "c32799d5-e728-4e01-9e1f-9dd961f8ffb2",
                "destination_uuid": "426182aa-c31c-429a-a6f9-4f293c37b4d2"
              }
            ]
          },
          {
            "uuid": "426182aa-c31c-429a-a6f9-4f293c37b4d2",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Module2/Praise_IS01.svg"
                ],
                "text": "This is some text in story mode. https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "a1dddd25-b221-44d6-8d63-c96513aed782"
              }
            ],
            "exits": [
              {
                "uuid": "061e97e2-6bd4-4850-b7e3-0f8721652204",
                "destination_uuid": "6da5d165-d560-4aaf-aee1-3a1cb79834b9"
              }
            ]
          },
          {
            "uuid": "6da5d165-d560-4aaf-aee1-3a1cb79834b9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6f630194-2709-4130-bee2-57452993a4a3",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "4a99eb60-3e58-4b68-a062-16ee271ee64d",
                  "type": "has_only_phrase",
                  "uuid": "d10d5304-aeaf-42bc-9b45-d43a0cd9b232"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5bf6fffc-3f72-4754-81fe-99db658675a8",
                  "name": "All Responses",
                  "uuid": "6f630194-2709-4130-bee2-57452993a4a3"
                },
                {
                  "exit_uuid": "faeac19d-a528-40f4-a934-f449ec0a0e2e",
                  "name": "Next",
                  "uuid": "4a99eb60-3e58-4b68-a062-16ee271ee64d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5bf6fffc-3f72-4754-81fe-99db658675a8",
                "destination_uuid": null
              },
              {
                "uuid": "faeac19d-a528-40f4-a934-f449ec0a0e2e",
                "destination_uuid": "60e672ce-221d-4035-9d5d-ccec920531cd"
              }
            ]
          },
          {
            "uuid": "60e672ce-221d-4035-9d5d-ccec920531cd",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Module2/Praise_IS01.svg"
                ],
                "text": "Another bit of text. https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "48926edb-85e1-4d60-8ac4-cb7c4fe3daf2"
              }
            ],
            "exits": [
              {
                "uuid": "36c8c0cf-16ee-4e5a-9aec-268a7b3934e2",
                "destination_uuid": "6813374a-3d14-45d8-a205-c90b9b36dce4"
              }
            ]
          },
          {
            "uuid": "6813374a-3d14-45d8-a205-c90b9b36dce4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "aa276f3c-d44e-484e-9556-0d251d17086b",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "1f9205a6-0d1c-4676-bc9d-a49b0807d523",
                  "type": "has_only_phrase",
                  "uuid": "18b1c03f-45fe-423b-b912-cf8e3fc8ad96"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "af42f91c-6a23-4aae-a539-665d5447fbff",
                  "type": "has_only_phrase",
                  "uuid": "08226dcf-04c1-4446-891f-b3946826e9e2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2b57db73-b0a8-4f21-9b1f-b6465f702f10",
                  "name": "All Responses",
                  "uuid": "aa276f3c-d44e-484e-9556-0d251d17086b"
                },
                {
                  "exit_uuid": "eb01c9c0-4328-40ca-8477-30c703e857b2",
                  "name": "Previous",
                  "uuid": "1f9205a6-0d1c-4676-bc9d-a49b0807d523"
                },
                {
                  "exit_uuid": "4794d038-e0fe-476b-9fa3-b894aba6616c",
                  "name": "Next",
                  "uuid": "af42f91c-6a23-4aae-a539-665d5447fbff"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2b57db73-b0a8-4f21-9b1f-b6465f702f10",
                "destination_uuid": null
              },
              {
                "uuid": "eb01c9c0-4328-40ca-8477-30c703e857b2",
                "destination_uuid": "426182aa-c31c-429a-a6f9-4f293c37b4d2"
              },
              {
                "uuid": "4794d038-e0fe-476b-9fa3-b894aba6616c",
                "destination_uuid": "2ffd2c00-8d3f-46a7-841f-bbc352589952"
              }
            ]
          },
          {
            "uuid": "2ffd2c00-8d3f-46a7-841f-bbc352589952",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c42685cc-a799-4193-a201-b246013a926c"
              }
            ],
            "exits": [
              {
                "uuid": "7d5a7463-908b-404e-ba00-f46d25a3dacc",
                "destination_uuid": "230aabf1-0153-42db-916e-8e48c1b69275"
              }
            ]
          },
          {
            "uuid": "230aabf1-0153-42db-916e-8e48c1b69275",
            "actions": [
              {
                "uuid": "75504e50-6859-47e9-8244-776295c3200b",
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
                "uuid": "6b5d4b37-54b1-49fa-b612-450a34f24afc",
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
        "uuid": "efa3c572-86f1-4700-a5d7-70d5cb765531",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "05aae667-9038-4028-9ea2-e93de70065d0",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ac775041-097f-4fff-a7c0-c083badb8ae3"
              }
            ],
            "exits": [
              {
                "uuid": "e5a543d5-7da4-4a57-98f3-9bb16f044c1f",
                "destination_uuid": "d9c590ca-5299-4fcf-80a9-74be7034015f"
              }
            ]
          },
          {
            "uuid": "d9c590ca-5299-4fcf-80a9-74be7034015f",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "df150c8c-cd72-4369-aafd-ec2f728aeaa0"
              }
            ],
            "exits": [
              {
                "uuid": "eba78cdb-adc9-4423-9f4d-969cf2802f7a",
                "destination_uuid": "0cd3a554-dae6-43fd-8b62-ab25de9265d4"
              }
            ]
          },
          {
            "uuid": "0cd3a554-dae6-43fd-8b62-ab25de9265d4",
            "actions": [],
            "exits": [
              {
                "uuid": "a8db5544-d61f-4d07-b77e-7ef44d8f77a7",
                "destination_uuid": "0cc41e89-914d-42ff-ab59-c5d1cbdc8598"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3cb8e14c-9809-4d37-825a-8c55cb6ac7b8",
              "cases": [],
              "categories": [
                {
                  "uuid": "3cb8e14c-9809-4d37-825a-8c55cb6ac7b8",
                  "name": "All Responses",
                  "exit_uuid": "a8db5544-d61f-4d07-b77e-7ef44d8f77a7"
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
            "uuid": "0cc41e89-914d-42ff-ab59-c5d1cbdc8598",
            "actions": [
              {
                "uuid": "3b3e41d8-71ff-4392-9dd5-6784dd0b538c",
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
                "uuid": "14c12f49-ef78-4b11-be7d-a3f87634fed5",
                "destination_uuid": "cb754ddc-ac93-49be-8e38-591368df1974"
              }
            ]
          },
          {
            "uuid": "cb754ddc-ac93-49be-8e38-591368df1974",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "cf884e17-286f-4812-84b3-39f1b5d3dbf0"
                },
                "type": "enter_flow",
                "uuid": "8bc23ce4-18f6-41f4-af1a-242e44823a30"
              }
            ],
            "exits": [
              {
                "uuid": "99e1f3c4-4afe-47a1-a840-cf846044751e",
                "destination_uuid": "ea069d76-160e-425f-af8a-7f08d3d93936"
              },
              {
                "uuid": "9a2dc282-9820-4e77-9590-aed650de189c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "82f73fe5-2915-4682-8529-40a6e69a2d07",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c5b3aca8-40ac-4b3b-9f42-ff8d03b0c288"
                },
                {
                  "uuid": "b13f19d4-9e3d-4911-ae34-9b578350cba6",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "1226b402-8768-4e69-8c84-683bb7566e10"
                }
              ],
              "categories": [
                {
                  "uuid": "c5b3aca8-40ac-4b3b-9f42-ff8d03b0c288",
                  "name": "Complete",
                  "exit_uuid": "99e1f3c4-4afe-47a1-a840-cf846044751e"
                },
                {
                  "uuid": "1226b402-8768-4e69-8c84-683bb7566e10",
                  "name": "Expired",
                  "exit_uuid": "9a2dc282-9820-4e77-9590-aed650de189c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c5b3aca8-40ac-4b3b-9f42-ff8d03b0c288"
            }
          },
          {
            "uuid": "ea069d76-160e-425f-af8a-7f08d3d93936",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "129af9eb-97e3-4178-b356-6fb6d9a38328"
              }
            ],
            "exits": [
              {
                "uuid": "b5799147-bbe8-4aea-b508-d99f4d2c4a44",
                "destination_uuid": "1f2968f9-69af-4dba-b3ef-c09f976a690a"
              }
            ]
          },
          {
            "uuid": "1f2968f9-69af-4dba-b3ef-c09f976a690a",
            "actions": [],
            "exits": [
              {
                "uuid": "deb5ad61-63f2-4268-80db-2ddb6e9d2977",
                "destination_uuid": "452c8c3f-d5ca-415e-971b-617a8d1db66f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fbdc4a81-955b-4a01-8f31-218e72bb96d4",
              "cases": [],
              "categories": [
                {
                  "uuid": "fbdc4a81-955b-4a01-8f31-218e72bb96d4",
                  "name": "All Responses",
                  "exit_uuid": "deb5ad61-63f2-4268-80db-2ddb6e9d2977"
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
            "uuid": "452c8c3f-d5ca-415e-971b-617a8d1db66f",
            "actions": [
              {
                "uuid": "e667d61f-97fe-4128-8ffb-ce3a4be487e9",
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
                "uuid": "6941b7d2-e8d3-4203-9eba-c63f3b7566e3",
                "destination_uuid": "3a8664b6-6752-464e-ba5b-fbee78df2292"
              }
            ]
          },
          {
            "uuid": "3a8664b6-6752-464e-ba5b-fbee78df2292",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d5ed857c-8ad2-4671-97a3-d1cfdbe9205f",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "02963437-7371-4e38-9556-a0825e2088bf",
                  "type": "has_only_phrase",
                  "uuid": "c8d246c4-5b79-413a-b233-bfbc5f0b752f"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "a313fc10-86fd-4df6-834f-89fb16734ec4",
                  "type": "has_only_phrase",
                  "uuid": "2c4ad7b4-0ac5-4b61-989d-2a3d48f04be2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f8361e43-cb0c-46ba-9965-0f880c11267a",
                  "name": "All Responses",
                  "uuid": "d5ed857c-8ad2-4671-97a3-d1cfdbe9205f"
                },
                {
                  "exit_uuid": "5636a8c6-7c55-48ff-9a21-cca827fc698a",
                  "name": "guide1",
                  "uuid": "02963437-7371-4e38-9556-a0825e2088bf"
                },
                {
                  "exit_uuid": "7ee4ec03-49d6-4637-9aa1-94ce18e11170",
                  "name": "guide2",
                  "uuid": "a313fc10-86fd-4df6-834f-89fb16734ec4"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "f8361e43-cb0c-46ba-9965-0f880c11267a",
                "destination_uuid": null
              },
              {
                "uuid": "5636a8c6-7c55-48ff-9a21-cca827fc698a",
                "destination_uuid": "5e1e657e-23d5-4b1b-833e-027c774ea60d"
              },
              {
                "uuid": "7ee4ec03-49d6-4637-9aa1-94ce18e11170",
                "destination_uuid": "3a399ce3-e71b-45dc-8a26-042c8b9a5186"
              }
            ]
          },
          {
            "uuid": "5e1e657e-23d5-4b1b-833e-027c774ea60d",
            "actions": [
              {
                "uuid": "19da011f-22ba-4fc8-b27c-69346f349d26",
                "type": "set_contact_field",
                "field": {
                  "key": "guide ",
                  "name": "guide "
                },
                "value": "@fields.firstguide"
              }
            ],
            "exits": [
              {
                "uuid": "eeb84558-c21c-46b4-839a-643b9936ac01",
                "destination_uuid": "6c8b9b32-4d1b-42a4-bd0c-2866093003e6"
              }
            ]
          },
          {
            "uuid": "3a399ce3-e71b-45dc-8a26-042c8b9a5186",
            "actions": [
              {
                "uuid": "53ee887a-f295-42b0-a69c-b18038a4a370",
                "type": "set_contact_field",
                "field": {
                  "key": "guide ",
                  "name": "guide "
                },
                "value": "@fields.secondguide"
              }
            ],
            "exits": [
              {
                "uuid": "997717e5-cfdc-4c4a-a668-98975178dfa5",
                "destination_uuid": "6c8b9b32-4d1b-42a4-bd0c-2866093003e6"
              }
            ]
          },
          {
            "uuid": "6c8b9b32-4d1b-42a4-bd0c-2866093003e6",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a64ec95e-24e2-43ba-846c-5d5e7ddda268"
              }
            ],
            "exits": [
              {
                "uuid": "e1f82907-268f-4e37-ba8e-996abfcb9035",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "d8d57563-254c-4449-a9b3-700d0c8c6f62",
            "actions": [
              {
                "uuid": "8e311181-ba81-43d5-86c7-5a99c50c8540",
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
                "uuid": "2d5e72fc-0607-482f-a552-c41e5e099b44",
                "destination_uuid": "92d76904-31c7-4453-b9aa-a16f96266e6c"
              }
            ]
          },
          {
            "uuid": "92d76904-31c7-4453-b9aa-a16f96266e6c",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "989bff9a-a449-4a32-8331-8f29a5cc06cd"
                },
                "type": "enter_flow",
                "uuid": "ad5ec2ce-e910-462d-b4d6-38292844c74a"
              }
            ],
            "exits": [
              {
                "uuid": "9dfbb804-5f62-48c9-85af-799c608ad0c6",
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
        "uuid": "b84dcc89-1b94-4a80-bf8f-d7bd9fbdb5e0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9fe7b5bc-7d75-4204-9b71-30d97aef5a2e",
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
                "uuid": "5939c7a2-b9d0-48b8-852e-64a10a71fdcd"
              }
            ],
            "exits": [
              {
                "uuid": "b394f18f-b402-4e4b-bc21-6d97cda274ad",
                "destination_uuid": "dbbb1bde-7700-4256-9b78-811330f24458"
              }
            ]
          },
          {
            "uuid": "dbbb1bde-7700-4256-9b78-811330f24458",
            "actions": [],
            "exits": [
              {
                "uuid": "6c06951e-4c23-4669-80b9-2e1a30a97e6a",
                "destination_uuid": "dd7f6ce6-09e9-4f26-8225-463a8bbea02e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0b1aef0e-a031-47c6-971a-b6f789b53027",
              "cases": [],
              "categories": [
                {
                  "uuid": "0b1aef0e-a031-47c6-971a-b6f789b53027",
                  "name": "All Responses",
                  "exit_uuid": "6c06951e-4c23-4669-80b9-2e1a30a97e6a"
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
            "uuid": "dd7f6ce6-09e9-4f26-8225-463a8bbea02e",
            "actions": [
              {
                "uuid": "879b0342-c995-4f98-95b0-0c85e8aeccaa",
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
                "uuid": "114974fe-621e-44f3-bf3a-ff6b6425f7fc",
                "destination_uuid": "3564b79f-7ceb-489a-9339-ec5b8911c50e"
              }
            ]
          },
          {
            "uuid": "3564b79f-7ceb-489a-9339-ec5b8911c50e",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "66bfe801-fce7-4346-9a7f-9aa20db995e2"
              }
            ],
            "exits": [
              {
                "uuid": "56b9e583-01ce-4e2e-989a-40110e788ed8",
                "destination_uuid": "45de8b33-2d94-4ebf-80f7-2ffd309a0495"
              }
            ]
          },
          {
            "uuid": "45de8b33-2d94-4ebf-80f7-2ffd309a0495",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dae98920-9c70-406f-bf6b-21befa41877e"
              }
            ],
            "exits": [
              {
                "uuid": "8a1cac1a-471c-456b-a344-8bc45bf737f7",
                "destination_uuid": "18786f49-3a72-48d1-a0f7-0e6a7f60a31c"
              }
            ]
          },
          {
            "uuid": "18786f49-3a72-48d1-a0f7-0e6a7f60a31c",
            "actions": [
              {
                "flow": {
                  "name": "calm_5",
                  "uuid": "7a442d3c-68ab-4df8-a76c-330ed10a086f"
                },
                "type": "enter_flow",
                "uuid": "dee081e1-67ef-4926-8340-1dfeae2d3fe9"
              }
            ],
            "exits": [
              {
                "uuid": "1c919874-01fb-46a2-8641-c4727049471b",
                "destination_uuid": null
              },
              {
                "uuid": "967f12e0-701e-4805-a5b1-27d08f829135",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1496b1ba-67f5-4ffe-8bbf-c931e5d161d9",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "e7840fd8-0664-412f-a01e-3a6b30a32a88"
                },
                {
                  "uuid": "4c511509-26a2-4989-82cf-1a0bd9a10e2b",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f7783826-e408-4a53-a063-98f6b109a362"
                }
              ],
              "categories": [
                {
                  "uuid": "e7840fd8-0664-412f-a01e-3a6b30a32a88",
                  "name": "Complete",
                  "exit_uuid": "1c919874-01fb-46a2-8641-c4727049471b"
                },
                {
                  "uuid": "f7783826-e408-4a53-a063-98f6b109a362",
                  "name": "Expired",
                  "exit_uuid": "967f12e0-701e-4805-a5b1-27d08f829135"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "e7840fd8-0664-412f-a01e-3a6b30a32a88"
            }
          },
          {
            "uuid": "45803753-86d1-4e6e-b90f-fb9c4f7ec9b1",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1e471300-a620-4b8d-b55f-17349933a263"
              }
            ],
            "exits": [
              {
                "uuid": "8285e626-ca13-41b6-8c0d-57c9ec015e9b",
                "destination_uuid": "412bde72-f956-4ca3-8100-44354d623b7b"
              }
            ]
          },
          {
            "uuid": "412bde72-f956-4ca3-8100-44354d623b7b",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "4a5c3cda-cfca-4c11-aa8a-afc4ea7772d8"
              }
            ],
            "exits": [
              {
                "uuid": "7eb71565-1d03-40b8-a284-376489ea27b1",
                "destination_uuid": "f218c183-aaf8-49de-bf16-d07d6c5208b6"
              }
            ]
          },
          {
            "uuid": "f218c183-aaf8-49de-bf16-d07d6c5208b6",
            "actions": [],
            "exits": [
              {
                "uuid": "3cf55839-049a-46a3-a349-68588db1b794",
                "destination_uuid": "be9e646e-b24f-41ad-8d8a-6ad2d54c65fe"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b7ac1f8d-fa96-4d1b-b62f-ef08bd609838",
              "cases": [],
              "categories": [
                {
                  "uuid": "b7ac1f8d-fa96-4d1b-b62f-ef08bd609838",
                  "name": "All Responses",
                  "exit_uuid": "3cf55839-049a-46a3-a349-68588db1b794"
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
            "uuid": "be9e646e-b24f-41ad-8d8a-6ad2d54c65fe",
            "actions": [
              {
                "uuid": "82ecd945-2523-4533-bf31-b8c4d4d192a5",
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
                "uuid": "3ea79e99-f5b3-4628-adf2-802ecb3f403d",
                "destination_uuid": "a3184a5a-e852-40ac-a8e1-adc5b9a1431a"
              }
            ]
          },
          {
            "uuid": "a3184a5a-e852-40ac-a8e1-adc5b9a1431a",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "96deb1cc-1137-4434-a996-6d432ba0e512"
              }
            ],
            "exits": [
              {
                "uuid": "03e6182e-3409-4d5c-ac79-2ed199538b18",
                "destination_uuid": "726e86df-8eef-4876-b323-6b72e777ad57"
              }
            ]
          },
          {
            "uuid": "726e86df-8eef-4876-b323-6b72e777ad57",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d6a26c3f-90fa-4a3c-a644-adcd746900aa"
              }
            ],
            "exits": [
              {
                "uuid": "718842d6-9dbe-4dec-bb82-581dd5a8b12d",
                "destination_uuid": "9a73ae60-ca50-4223-9799-4460fe110022"
              }
            ]
          },
          {
            "uuid": "9a73ae60-ca50-4223-9799-4460fe110022",
            "actions": [
              {
                "uuid": "5cafb242-1c40-4c49-a127-c7bed3cee434",
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
                "uuid": "9ec45760-1415-4af2-a9e4-86758c028000",
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
        "uuid": "f26baebd-7580-4a94-9855-83672dc9ade6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ddbb6760-b66a-4eb7-9a90-dc3fc3ba11cd",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "097e6b83-1fc2-47f4-8377-7e5c2f8f0297"
              }
            ],
            "exits": [
              {
                "uuid": "e90be721-91ef-46e9-bbc9-5322d24307df",
                "destination_uuid": "2f7860dc-a906-425a-8042-a6d2984ee8fa"
              }
            ]
          },
          {
            "uuid": "2f7860dc-a906-425a-8042-a6d2984ee8fa",
            "actions": [
              {
                "uuid": "2f2f208b-97b6-4b88-9c2d-73e4681afc63",
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
                "uuid": "8a98115a-4991-4a18-86c3-eb82c9e17672",
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
        "uuid": "0c17da1c-2e4b-4c2b-9d19-631c7b01400b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "cc829af3-9fe6-4e65-a87b-8b3ca8a882cf",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dc72798e-43aa-44d1-9679-3312ba5a7d5c"
              }
            ],
            "exits": [
              {
                "uuid": "f0ef423c-7de0-46f9-9374-0d1edd2e2620",
                "destination_uuid": "d34f2c6b-6d8b-4850-a2ad-e7f2172695e6"
              }
            ]
          },
          {
            "uuid": "d34f2c6b-6d8b-4850-a2ad-e7f2172695e6",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome05.jpg"
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
                "uuid": "fe9e4e8c-c28b-4d77-8114-aeb05347b675"
              }
            ],
            "exits": [
              {
                "uuid": "5d266440-31ed-48cf-970a-0f0ff7d9e81b",
                "destination_uuid": "3b8da40b-e8da-4f4d-88aa-80a6d34a2a4e"
              }
            ]
          },
          {
            "uuid": "3b8da40b-e8da-4f4d-88aa-80a6d34a2a4e",
            "actions": [],
            "exits": [
              {
                "uuid": "20ff9ffb-a2ca-4a12-b1eb-0af3a49a766e",
                "destination_uuid": "e095267c-ed16-43ce-b877-6cbadfd54eb7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "336a6f66-2575-42c4-85ea-2a0099bacdf4",
              "cases": [],
              "categories": [
                {
                  "uuid": "336a6f66-2575-42c4-85ea-2a0099bacdf4",
                  "name": "All Responses",
                  "exit_uuid": "20ff9ffb-a2ca-4a12-b1eb-0af3a49a766e"
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
            "uuid": "e095267c-ed16-43ce-b877-6cbadfd54eb7",
            "actions": [
              {
                "uuid": "a23b386c-d9af-494f-934d-7797483a7399",
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
                "uuid": "3ae81543-0bd0-494c-a03c-293059ec60e9",
                "destination_uuid": "6d720175-7dd7-47da-9895-72bc09c2f18c"
              }
            ]
          },
          {
            "uuid": "6d720175-7dd7-47da-9895-72bc09c2f18c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bbd653de-63b4-4ab4-8e80-1aae6021f289",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "42270f73-6924-432e-ae81-0decbdf5f650",
                  "type": "has_only_phrase",
                  "uuid": "7dfa955d-75a8-437c-a039-3ed06c3a5cf3"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "42270f73-6924-432e-ae81-0decbdf5f650",
                  "type": "has_only_phrase",
                  "uuid": "81deef8f-d8d6-4a49-8fff-c8e9633630cc"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "42270f73-6924-432e-ae81-0decbdf5f650",
                  "type": "has_only_phrase",
                  "uuid": "4f3af582-56e9-44f1-8c03-504f464a0a3e"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "42270f73-6924-432e-ae81-0decbdf5f650",
                  "type": "has_only_phrase",
                  "uuid": "d0bb1689-2bc4-477e-89bb-61250e1f7d8e"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "fdf0a23b-992f-4572-9ad8-345a698bec53",
                  "type": "has_only_phrase",
                  "uuid": "53640d9f-3549-444f-9079-f80ce565db6d"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "fdf0a23b-992f-4572-9ad8-345a698bec53",
                  "type": "has_only_phrase",
                  "uuid": "417942b3-2403-4dba-acf0-416099e85cd6"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "fdf0a23b-992f-4572-9ad8-345a698bec53",
                  "type": "has_only_phrase",
                  "uuid": "cf2f8704-219a-4357-850f-b4cede39f080"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "fdf0a23b-992f-4572-9ad8-345a698bec53",
                  "type": "has_only_phrase",
                  "uuid": "bfcdd986-c5dc-42e8-8ae3-9ab70e506f72"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "97f57364-dc23-4141-af8e-c82e2e6caa65",
                  "name": "All Responses",
                  "uuid": "bbd653de-63b4-4ab4-8e80-1aae6021f289"
                },
                {
                  "exit_uuid": "62b45ad4-8ff7-4a54-a40a-87604b68e5b2",
                  "name": "0;1;2;3",
                  "uuid": "42270f73-6924-432e-ae81-0decbdf5f650"
                },
                {
                  "exit_uuid": "8c6263f7-248f-497c-8b45-5c0f4249b938",
                  "name": "4;5;6;7",
                  "uuid": "fdf0a23b-992f-4572-9ad8-345a698bec53"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "97f57364-dc23-4141-af8e-c82e2e6caa65",
                "destination_uuid": null
              },
              {
                "uuid": "62b45ad4-8ff7-4a54-a40a-87604b68e5b2",
                "destination_uuid": "7dd0c570-6ce9-4011-bd9d-56d6ef6bcb27"
              },
              {
                "uuid": "8c6263f7-248f-497c-8b45-5c0f4249b938",
                "destination_uuid": "58cc7217-aa7f-4417-b5e1-1b6263a23e52"
              }
            ]
          },
          {
            "uuid": "7dd0c570-6ce9-4011-bd9d-56d6ef6bcb27",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome06.jpg"
                ],
                "text": "We know it is hard to find time in our busy lives. Well done for trying your best!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "fbcee25b-09f4-4ce7-a5d8-912035f0732c"
              }
            ],
            "exits": [
              {
                "uuid": "e7878e1b-92e7-48fa-aa60-b9a8e5313a92",
                "destination_uuid": "18fc1bbc-f919-42b4-abef-cafa9288fee1"
              }
            ]
          },
          {
            "uuid": "58cc7217-aa7f-4417-b5e1-1b6263a23e52",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/Sticker01.jpg"
                ],
                "text": "Well done for spending time with your teen, it makes all the difference!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "fec077a2-112a-48eb-aded-7982c1b0183f"
              }
            ],
            "exits": [
              {
                "uuid": "24970ef9-a79f-4fd3-8670-3ef83dd68e50",
                "destination_uuid": "18fc1bbc-f919-42b4-abef-cafa9288fee1"
              }
            ]
          },
          {
            "uuid": "18fc1bbc-f919-42b4-abef-cafa9288fee1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8abfef6f-a86f-4f4d-9d15-0ba71979b9f5",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "85959066-71b1-4d20-ac2c-33c748ff48aa",
                  "type": "has_only_phrase",
                  "uuid": "c80f1bf7-47b5-44e3-a9ae-bacad38e8467"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9cf043b3-19b6-4408-a2f4-3d2f28abd5ee",
                  "name": "All Responses",
                  "uuid": "8abfef6f-a86f-4f4d-9d15-0ba71979b9f5"
                },
                {
                  "exit_uuid": "962367aa-949f-46b7-b313-2ab27474e088",
                  "name": "Next",
                  "uuid": "85959066-71b1-4d20-ac2c-33c748ff48aa"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9cf043b3-19b6-4408-a2f4-3d2f28abd5ee",
                "destination_uuid": null
              },
              {
                "uuid": "962367aa-949f-46b7-b313-2ab27474e088",
                "destination_uuid": "bbf192ea-2fc6-4a88-ab25-afe87a15fc1f"
              }
            ]
          },
          {
            "uuid": "bbf192ea-2fc6-4a88-ab25-afe87a15fc1f",
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
                "uuid": "ba2529fd-3bf4-40bc-b59a-3009fd7fdb9e"
              }
            ],
            "exits": [
              {
                "uuid": "f1bb533a-c716-4b3e-89a7-1023dfea756e",
                "destination_uuid": "87a01408-7f2a-432a-9720-2c92917f8b67"
              }
            ]
          },
          {
            "uuid": "87a01408-7f2a-432a-9720-2c92917f8b67",
            "actions": [],
            "exits": [
              {
                "uuid": "d4978d7c-6b49-464f-8a8b-ffda9297f690",
                "destination_uuid": "573f780b-460e-4d50-9495-ce3c5a1bb618"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7a24351c-c795-40bb-af73-8e36f4a59079",
              "cases": [],
              "categories": [
                {
                  "uuid": "7a24351c-c795-40bb-af73-8e36f4a59079",
                  "name": "All Responses",
                  "exit_uuid": "d4978d7c-6b49-464f-8a8b-ffda9297f690"
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
            "uuid": "573f780b-460e-4d50-9495-ce3c5a1bb618",
            "actions": [
              {
                "uuid": "bdffb687-40b9-474f-8b94-8498a1e05b69",
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
                "uuid": "67fe92d1-7a9b-4c39-a9fa-908fa9b0de56",
                "destination_uuid": "26e037f5-7ea6-4214-a0cb-9937ae973c84"
              }
            ]
          },
          {
            "uuid": "26e037f5-7ea6-4214-a0cb-9937ae973c84",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9d2b457e-c453-45d8-9bda-93854bd2695c",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "703c02ea-6dfe-49a6-8b15-dda9e260843b",
                  "type": "has_only_phrase",
                  "uuid": "7855aaf1-5822-42ae-a0be-33ac7e0db359"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "703c02ea-6dfe-49a6-8b15-dda9e260843b",
                  "type": "has_only_phrase",
                  "uuid": "20892187-06f9-464e-9d6a-f06509792b09"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "703c02ea-6dfe-49a6-8b15-dda9e260843b",
                  "type": "has_only_phrase",
                  "uuid": "8709ff12-1be0-4f22-a67f-dca6f5928ca0"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "703c02ea-6dfe-49a6-8b15-dda9e260843b",
                  "type": "has_only_phrase",
                  "uuid": "c9dab8e1-96a5-4e88-a46b-7017ea9b5b2e"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "703c02ea-6dfe-49a6-8b15-dda9e260843b",
                  "type": "has_only_phrase",
                  "uuid": "e002c722-93a5-4c8c-a756-4363dcce2942"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "79242b21-5409-4eef-bc33-4b0948bbbf91",
                  "type": "has_only_phrase",
                  "uuid": "ba114dc4-15ca-466b-a5b2-3ea39224b202"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "79242b21-5409-4eef-bc33-4b0948bbbf91",
                  "type": "has_only_phrase",
                  "uuid": "8cc266e3-edca-47ed-b0ad-0fff7aafc451"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "79242b21-5409-4eef-bc33-4b0948bbbf91",
                  "type": "has_only_phrase",
                  "uuid": "f380c318-2e81-473b-ae3d-6801a69b781f"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "79242b21-5409-4eef-bc33-4b0948bbbf91",
                  "type": "has_only_phrase",
                  "uuid": "82e9a2af-7638-4963-b338-c50d62ef47ea"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f067e1fe-3334-4dbe-b1a1-4fb126ba4b82",
                  "name": "All Responses",
                  "uuid": "9d2b457e-c453-45d8-9bda-93854bd2695c"
                },
                {
                  "exit_uuid": "898a9750-7d4e-4c87-a865-f126f662dd5a",
                  "name": "0;1;2;3;4",
                  "uuid": "703c02ea-6dfe-49a6-8b15-dda9e260843b"
                },
                {
                  "exit_uuid": "25d8788e-e33b-450f-814f-3b44988bc43d",
                  "name": "5;6;7;8",
                  "uuid": "79242b21-5409-4eef-bc33-4b0948bbbf91"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "f067e1fe-3334-4dbe-b1a1-4fb126ba4b82",
                "destination_uuid": null
              },
              {
                "uuid": "898a9750-7d4e-4c87-a865-f126f662dd5a",
                "destination_uuid": "d6903a61-2c74-4134-9cdc-32c96abf94bb"
              },
              {
                "uuid": "25d8788e-e33b-450f-814f-3b44988bc43d",
                "destination_uuid": "9d28ddbd-d4b4-456a-a366-d096b5f6ce61"
              }
            ]
          },
          {
            "uuid": "d6903a61-2c74-4134-9cdc-32c96abf94bb",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "98c20128-b0cd-478c-8bfd-f275b02791c9"
              }
            ],
            "exits": [
              {
                "uuid": "6c3a441e-88fa-4701-a936-bcf8bda8c99e",
                "destination_uuid": "80067bd2-c6c5-4ff4-bf6a-4bfe4d0af869"
              }
            ]
          },
          {
            "uuid": "9d28ddbd-d4b4-456a-a366-d096b5f6ce61",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "a5b366d2-3cc0-45a7-a70c-c71df61a8ee1"
              }
            ],
            "exits": [
              {
                "uuid": "1102d88c-4a79-44e1-8506-2f9662d29c60",
                "destination_uuid": "80067bd2-c6c5-4ff4-bf6a-4bfe4d0af869"
              }
            ]
          },
          {
            "uuid": "80067bd2-c6c5-4ff4-bf6a-4bfe4d0af869",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3d67787c-2c38-4738-b225-a1fbac3a26ea",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "36c66e36-70ef-47fc-b9b5-5eb3078a9a0c",
                  "type": "has_only_phrase",
                  "uuid": "2efb0434-5ba7-46de-87cf-e96dc460bce3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8bcc675b-1a39-422e-917d-4b408376eb08",
                  "name": "All Responses",
                  "uuid": "3d67787c-2c38-4738-b225-a1fbac3a26ea"
                },
                {
                  "exit_uuid": "95f248b2-0e3e-4a17-b54a-1dbb553801d5",
                  "name": "Next",
                  "uuid": "36c66e36-70ef-47fc-b9b5-5eb3078a9a0c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8bcc675b-1a39-422e-917d-4b408376eb08",
                "destination_uuid": null
              },
              {
                "uuid": "95f248b2-0e3e-4a17-b54a-1dbb553801d5",
                "destination_uuid": "b971c67d-7d98-4e8b-9d64-e3f4381d6b15"
              }
            ]
          },
          {
            "uuid": "b971c67d-7d98-4e8b-9d64-e3f4381d6b15",
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
                "uuid": "a1f41e61-6716-426a-b087-0716efe526ff"
              }
            ],
            "exits": [
              {
                "uuid": "f76e03f6-b59b-4139-80ca-e23d0711a828",
                "destination_uuid": "665d4b35-286f-4ef6-9056-5218a92ab4a7"
              }
            ]
          },
          {
            "uuid": "665d4b35-286f-4ef6-9056-5218a92ab4a7",
            "actions": [],
            "exits": [
              {
                "uuid": "b635541d-793b-4d10-b9d0-2e883b8cace5",
                "destination_uuid": "b2e16e90-1e07-4dae-90ab-5767e943b5d3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6c6a9453-d050-461b-b08b-72a94044ce36",
              "cases": [],
              "categories": [
                {
                  "uuid": "6c6a9453-d050-461b-b08b-72a94044ce36",
                  "name": "All Responses",
                  "exit_uuid": "b635541d-793b-4d10-b9d0-2e883b8cace5"
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
            "uuid": "b2e16e90-1e07-4dae-90ab-5767e943b5d3",
            "actions": [
              {
                "uuid": "b33e1b9e-3b86-4d90-a514-c0627a010833",
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
                "uuid": "6bb0afad-3f91-4aff-808e-191c9e645a8f",
                "destination_uuid": "5424c0d6-e97b-4beb-bc34-78f4a7f9e6d9"
              }
            ]
          },
          {
            "uuid": "5424c0d6-e97b-4beb-bc34-78f4a7f9e6d9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "797f20ab-4138-46a7-b428-b7b5735ad473",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "b14c872d-189e-47a6-bee5-a1131592c850",
                  "type": "has_only_phrase",
                  "uuid": "7657ebfe-865b-4c20-b566-e35b6929788a"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "b14c872d-189e-47a6-bee5-a1131592c850",
                  "type": "has_only_phrase",
                  "uuid": "89956eed-ae32-4d2c-8f40-a86cef2ef130"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "b14c872d-189e-47a6-bee5-a1131592c850",
                  "type": "has_only_phrase",
                  "uuid": "148d0f0e-8af4-4b74-9330-3d98fac47cca"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "29a580a5-cacf-4bae-a004-d9ab2017efda",
                  "type": "has_only_phrase",
                  "uuid": "7d3d7e38-d848-4b0f-a26b-0b23df9c9d26"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "29a580a5-cacf-4bae-a004-d9ab2017efda",
                  "type": "has_only_phrase",
                  "uuid": "946cda9e-d167-4544-86f8-91fe67d7f031"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "29a580a5-cacf-4bae-a004-d9ab2017efda",
                  "type": "has_only_phrase",
                  "uuid": "f72a386a-7e22-4bf9-a2cb-9386fbcb4126"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "29a580a5-cacf-4bae-a004-d9ab2017efda",
                  "type": "has_only_phrase",
                  "uuid": "f442ca28-0538-4665-b73e-b9ae95ca9a7a"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "29a580a5-cacf-4bae-a004-d9ab2017efda",
                  "type": "has_only_phrase",
                  "uuid": "c24a61bf-6d73-4055-b031-295cd051b417"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "94763830-2ddb-4cbf-ae48-f1b969831fd4",
                  "name": "All Responses",
                  "uuid": "797f20ab-4138-46a7-b428-b7b5735ad473"
                },
                {
                  "exit_uuid": "64d0810f-128b-4ee0-94c3-c69c65e83bc5",
                  "name": "0;1;2",
                  "uuid": "b14c872d-189e-47a6-bee5-a1131592c850"
                },
                {
                  "exit_uuid": "993fea7c-b9a9-4baa-a7f1-3ad114f34009",
                  "name": "3;4;5;6;7",
                  "uuid": "29a580a5-cacf-4bae-a004-d9ab2017efda"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "94763830-2ddb-4cbf-ae48-f1b969831fd4",
                "destination_uuid": null
              },
              {
                "uuid": "64d0810f-128b-4ee0-94c3-c69c65e83bc5",
                "destination_uuid": "731137c7-6117-4d5d-91fa-c97ead7d565c"
              },
              {
                "uuid": "993fea7c-b9a9-4baa-a7f1-3ad114f34009",
                "destination_uuid": "f6294954-8887-40ce-bccc-74f821780b36"
              }
            ]
          },
          {
            "uuid": "731137c7-6117-4d5d-91fa-c97ead7d565c",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "d88017bb-08b5-477f-85bc-ef3b7ee9c43a"
              }
            ],
            "exits": [
              {
                "uuid": "a6739e12-328c-428e-a6eb-82d86d02fba2",
                "destination_uuid": "411f8ea6-3bde-4136-a108-b0e5d7f23384"
              }
            ]
          },
          {
            "uuid": "f6294954-8887-40ce-bccc-74f821780b36",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "fdea5fb9-fc61-4d62-9e68-fc3587edf6ff"
              }
            ],
            "exits": [
              {
                "uuid": "6068019d-3eba-4367-b9b5-dad0dfc365b7",
                "destination_uuid": "411f8ea6-3bde-4136-a108-b0e5d7f23384"
              }
            ]
          },
          {
            "uuid": "411f8ea6-3bde-4136-a108-b0e5d7f23384",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c53d0c38-b552-4210-9022-c123406804e1",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "c9705826-a609-4ee2-bfd4-c8be55b70642",
                  "type": "has_only_phrase",
                  "uuid": "8fe45e9f-b9e7-4a3f-a254-2724fac8bca0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5c47df67-f086-4e0c-be57-d38a7bf4390a",
                  "name": "All Responses",
                  "uuid": "c53d0c38-b552-4210-9022-c123406804e1"
                },
                {
                  "exit_uuid": "f3207f26-ded2-477d-a26d-ca1fc6041cc8",
                  "name": "Next",
                  "uuid": "c9705826-a609-4ee2-bfd4-c8be55b70642"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5c47df67-f086-4e0c-be57-d38a7bf4390a",
                "destination_uuid": null
              },
              {
                "uuid": "f3207f26-ded2-477d-a26d-ca1fc6041cc8",
                "destination_uuid": "e2167e77-2755-43cc-8f26-20b16aeb3c42"
              }
            ]
          },
          {
            "uuid": "e2167e77-2755-43cc-8f26-20b16aeb3c42",
            "actions": [
              {
                "attachments": [],
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
                "uuid": "9efb28c3-989c-4761-9250-815ca6d48aab"
              }
            ],
            "exits": [
              {
                "uuid": "486b69c4-386e-4482-877e-a3d7990eed9a",
                "destination_uuid": "3f600a31-b4e9-452d-a248-c3e7d7e80090"
              }
            ]
          },
          {
            "uuid": "3f600a31-b4e9-452d-a248-c3e7d7e80090",
            "actions": [],
            "exits": [
              {
                "uuid": "bd76553e-0a7b-48c4-9648-9cb27f02dc8e",
                "destination_uuid": "e151e184-8a95-4ddc-af84-6072bb05bc00"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ce320817-1cce-445a-8250-ed5fbc28048b",
              "cases": [],
              "categories": [
                {
                  "uuid": "ce320817-1cce-445a-8250-ed5fbc28048b",
                  "name": "All Responses",
                  "exit_uuid": "bd76553e-0a7b-48c4-9648-9cb27f02dc8e"
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
            "uuid": "e151e184-8a95-4ddc-af84-6072bb05bc00",
            "actions": [
              {
                "uuid": "e0cde9a0-4197-4f58-adb2-3375d07a80ff",
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
                "uuid": "193341be-5fc7-4ccc-9ba2-e5ee59ac4514",
                "destination_uuid": "4d601646-50f5-4a00-8f3d-5cf51e5cc45b"
              }
            ]
          },
          {
            "uuid": "4d601646-50f5-4a00-8f3d-5cf51e5cc45b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cff228f6-ffa2-46a0-8e95-11494a21cc0a",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "3552f3b3-2091-402a-b6e0-fa31a30073c0",
                  "type": "has_only_phrase",
                  "uuid": "0c28eddd-4bf7-4cd7-9360-3f09be3387fe"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "3552f3b3-2091-402a-b6e0-fa31a30073c0",
                  "type": "has_only_phrase",
                  "uuid": "af7642b9-bba3-4a94-977d-b637df445e6b"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "e5f59361-58df-45c6-98bd-0ca2b054869a",
                  "type": "has_only_phrase",
                  "uuid": "b6c891c9-7d76-4da9-951e-145496271618"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "e5f59361-58df-45c6-98bd-0ca2b054869a",
                  "type": "has_only_phrase",
                  "uuid": "a0874074-76d8-4e87-a596-510fb2bbf6bd"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "e5f59361-58df-45c6-98bd-0ca2b054869a",
                  "type": "has_only_phrase",
                  "uuid": "7212ed91-f8ad-4a74-87d9-4489850c74d6"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "e5f59361-58df-45c6-98bd-0ca2b054869a",
                  "type": "has_only_phrase",
                  "uuid": "767692ee-0411-4a9d-94f1-432c6cc828c3"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "e5f59361-58df-45c6-98bd-0ca2b054869a",
                  "type": "has_only_phrase",
                  "uuid": "72ad1a9c-59af-4cb8-bbee-5160672def15"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "e5f59361-58df-45c6-98bd-0ca2b054869a",
                  "type": "has_only_phrase",
                  "uuid": "9aaa2183-03d5-47bf-bf75-1e8d1e863fa2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "50e455ef-111e-47fd-9b4a-8134148fd57a",
                  "name": "All Responses",
                  "uuid": "cff228f6-ffa2-46a0-8e95-11494a21cc0a"
                },
                {
                  "exit_uuid": "722b0079-8ce6-426a-962d-c7c3c6ec1296",
                  "name": "0;1",
                  "uuid": "3552f3b3-2091-402a-b6e0-fa31a30073c0"
                },
                {
                  "exit_uuid": "6321eaf5-de5b-4913-b4f0-60c7f23582ed",
                  "name": "2;3;4;5;6;7",
                  "uuid": "e5f59361-58df-45c6-98bd-0ca2b054869a"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "50e455ef-111e-47fd-9b4a-8134148fd57a",
                "destination_uuid": null
              },
              {
                "uuid": "722b0079-8ce6-426a-962d-c7c3c6ec1296",
                "destination_uuid": "8cda477b-31b5-42fb-b040-add9e12cb37c"
              },
              {
                "uuid": "6321eaf5-de5b-4913-b4f0-60c7f23582ed",
                "destination_uuid": "78401bbb-056a-4411-8c0e-59e02db6250d"
              }
            ]
          },
          {
            "uuid": "8cda477b-31b5-42fb-b040-add9e12cb37c",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "996022dd-9721-42cb-8ec5-e4ce455fa0d8"
              }
            ],
            "exits": [
              {
                "uuid": "4acb16fa-75f9-4465-af22-7ccec16a5ebd",
                "destination_uuid": "aa152421-d920-48bf-81b9-e5218c18ac5e"
              }
            ]
          },
          {
            "uuid": "78401bbb-056a-4411-8c0e-59e02db6250d",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "0334c79c-0a2f-4605-b323-36dbe2da1513"
              }
            ],
            "exits": [
              {
                "uuid": "b1ff284b-6a7c-4e60-be7e-3d193e570365",
                "destination_uuid": "aa152421-d920-48bf-81b9-e5218c18ac5e"
              }
            ]
          },
          {
            "uuid": "aa152421-d920-48bf-81b9-e5218c18ac5e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "340a3b56-d36c-4838-9c3b-b58e841ca5ca",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "a45b5014-bfd8-4e0f-b861-52fdf9c445ee",
                  "type": "has_only_phrase",
                  "uuid": "66cae62c-3eb6-42e1-8a12-f5cc40448526"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7e26af20-e517-49a5-818a-49ff51da26f9",
                  "name": "All Responses",
                  "uuid": "340a3b56-d36c-4838-9c3b-b58e841ca5ca"
                },
                {
                  "exit_uuid": "7e4721d9-60af-42f6-923e-07d5ea466abf",
                  "name": "Next",
                  "uuid": "a45b5014-bfd8-4e0f-b861-52fdf9c445ee"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7e26af20-e517-49a5-818a-49ff51da26f9",
                "destination_uuid": null
              },
              {
                "uuid": "7e4721d9-60af-42f6-923e-07d5ea466abf",
                "destination_uuid": "7e8ddef0-819a-4a57-81ed-07ffd29edd71"
              }
            ]
          },
          {
            "uuid": "7e8ddef0-819a-4a57-81ed-07ffd29edd71",
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
                "uuid": "1c3fcccb-c475-495f-9642-31ce9d7489af"
              }
            ],
            "exits": [
              {
                "uuid": "5b2ac910-7cdf-4fa1-823f-b2ff94d7db2c",
                "destination_uuid": "241783b6-a1c5-40bd-86e1-9ef82d36ee84"
              }
            ]
          },
          {
            "uuid": "241783b6-a1c5-40bd-86e1-9ef82d36ee84",
            "actions": [],
            "exits": [
              {
                "uuid": "9485e555-517f-48e8-bb86-d7e4b141c55d",
                "destination_uuid": "3927d81a-016e-4d46-80c9-4f799ac96c48"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9ee9949e-ddf0-4863-85b0-ba904b7a9cc6",
              "cases": [],
              "categories": [
                {
                  "uuid": "9ee9949e-ddf0-4863-85b0-ba904b7a9cc6",
                  "name": "All Responses",
                  "exit_uuid": "9485e555-517f-48e8-bb86-d7e4b141c55d"
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
            "uuid": "3927d81a-016e-4d46-80c9-4f799ac96c48",
            "actions": [
              {
                "uuid": "dd9220b9-129a-41b0-b2d3-789593b5dd1b",
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
                "uuid": "c1fba921-2841-4476-8617-109840c85bb7",
                "destination_uuid": "fff1d33d-8ab5-45e7-9863-fd1007a50fec"
              }
            ]
          },
          {
            "uuid": "1de2f406-f57b-4f67-bcd4-aca0a933d646",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "ca560d54-89ce-458d-8f0e-40775e93587d"
              }
            ],
            "exits": [
              {
                "uuid": "d8978db5-6251-4b2d-98ce-caef7cc3fc2b",
                "destination_uuid": "1ba962b5-8de9-47bc-9772-78856303b0aa"
              }
            ]
          },
          {
            "uuid": "fff1d33d-8ab5-45e7-9863-fd1007a50fec",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "917f353c-61f7-4585-bbc5-e84ec07ed06f",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "d699a953-a955-4407-a7d4-daf80f92525b",
                  "type": "has_only_phrase",
                  "uuid": "dfac7773-ffda-4927-b9fb-96de6572278e"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "d699a953-a955-4407-a7d4-daf80f92525b",
                  "type": "has_only_phrase",
                  "uuid": "43528ce9-9fad-4c5d-9c79-b746c6c57b9d"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "d699a953-a955-4407-a7d4-daf80f92525b",
                  "type": "has_only_phrase",
                  "uuid": "b871da02-bbec-4e00-b550-6b243d5986a9"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "d699a953-a955-4407-a7d4-daf80f92525b",
                  "type": "has_only_phrase",
                  "uuid": "2c03c1da-f1ea-43d4-ba03-1d42d715084c"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "d699a953-a955-4407-a7d4-daf80f92525b",
                  "type": "has_only_phrase",
                  "uuid": "f4c96353-0146-4e45-95c4-6acd66fe069e"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "d699a953-a955-4407-a7d4-daf80f92525b",
                  "type": "has_only_phrase",
                  "uuid": "db1412b9-6b65-4489-b0a6-300a0dc8b5dd"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "d699a953-a955-4407-a7d4-daf80f92525b",
                  "type": "has_only_phrase",
                  "uuid": "6ee69326-c690-4793-a138-d71cca616ee4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "328ccf1b-ccbd-47ff-8fed-4494da277bc0",
                  "name": "All Responses",
                  "uuid": "917f353c-61f7-4585-bbc5-e84ec07ed06f"
                },
                {
                  "exit_uuid": "64702831-369b-4cd8-87c6-3637c953dad0",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "d699a953-a955-4407-a7d4-daf80f92525b"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "328ccf1b-ccbd-47ff-8fed-4494da277bc0",
                "destination_uuid": "1de2f406-f57b-4f67-bcd4-aca0a933d646"
              },
              {
                "uuid": "64702831-369b-4cd8-87c6-3637c953dad0",
                "destination_uuid": "8db83d38-955c-48e3-a42a-1e7934707824"
              }
            ]
          },
          {
            "uuid": "8db83d38-955c-48e3-a42a-1e7934707824",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "402363dc-e105-433e-99ab-8b73616f2bfd"
              }
            ],
            "exits": [
              {
                "uuid": "3e2cc87f-eb0f-420c-932a-188f132b6cdd",
                "destination_uuid": "1ba962b5-8de9-47bc-9772-78856303b0aa"
              }
            ]
          },
          {
            "uuid": "1ba962b5-8de9-47bc-9772-78856303b0aa",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "33547bad-389c-42e9-85ce-aed272f81a6c",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "bb55280d-4eb2-4fae-9647-930880b77341",
                  "type": "has_only_phrase",
                  "uuid": "82995e40-74e4-4a0e-ac7d-1b316f58e71b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "23d16b50-ed51-42fc-9705-b92225048405",
                  "name": "All Responses",
                  "uuid": "33547bad-389c-42e9-85ce-aed272f81a6c"
                },
                {
                  "exit_uuid": "fc41327c-6844-4cac-936e-a288c0fa67a2",
                  "name": "Next",
                  "uuid": "bb55280d-4eb2-4fae-9647-930880b77341"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "23d16b50-ed51-42fc-9705-b92225048405",
                "destination_uuid": null
              },
              {
                "uuid": "fc41327c-6844-4cac-936e-a288c0fa67a2",
                "destination_uuid": "1ed3e2f8-e42c-413b-a3eb-88acd611f141"
              }
            ]
          },
          {
            "uuid": "1ed3e2f8-e42c-413b-a3eb-88acd611f141",
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
                "uuid": "1389252c-9d34-4930-9866-022ee7e4ba35"
              }
            ],
            "exits": [
              {
                "uuid": "f5992715-688e-4491-aaf0-43e4c7cd4101",
                "destination_uuid": "88356c50-a5c8-47ba-9435-4dfbecd6ee41"
              }
            ]
          },
          {
            "uuid": "88356c50-a5c8-47ba-9435-4dfbecd6ee41",
            "actions": [],
            "exits": [
              {
                "uuid": "760a3783-19b8-4962-a5ae-4229db7fb13e",
                "destination_uuid": "6f017480-b77b-480b-832b-6ab08591ee0a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8222d8a3-d4b2-465e-bdc2-8189afbbb316",
              "cases": [],
              "categories": [
                {
                  "uuid": "8222d8a3-d4b2-465e-bdc2-8189afbbb316",
                  "name": "All Responses",
                  "exit_uuid": "760a3783-19b8-4962-a5ae-4229db7fb13e"
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
            "uuid": "6f017480-b77b-480b-832b-6ab08591ee0a",
            "actions": [
              {
                "uuid": "a716675a-028a-4a53-b6f6-b5ec10c4f31d",
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
                "uuid": "ce55ce31-5da4-4ae5-b7f7-b389559734bb",
                "destination_uuid": "9005e037-a80c-4df8-baed-3ceba5303477"
              }
            ]
          },
          {
            "uuid": "9005e037-a80c-4df8-baed-3ceba5303477",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f0528d0c-4ee8-41d4-afc5-a6a0f4a5f597",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "a99c4985-d627-413f-831f-228030516cab",
                  "type": "has_only_phrase",
                  "uuid": "fae6cea0-1f67-4b84-9ac1-4d1414741c53"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "a99c4985-d627-413f-831f-228030516cab",
                  "type": "has_only_phrase",
                  "uuid": "c4fb0777-34a4-44d9-8782-d2129defdeb6"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "a99c4985-d627-413f-831f-228030516cab",
                  "type": "has_only_phrase",
                  "uuid": "b9e2c5f8-6ff7-4dad-8f0f-57ae181b2ca4"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "a99c4985-d627-413f-831f-228030516cab",
                  "type": "has_only_phrase",
                  "uuid": "ebee7d44-3753-4975-95bd-9b0643f43b90"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "a99c4985-d627-413f-831f-228030516cab",
                  "type": "has_only_phrase",
                  "uuid": "ceccc418-f276-4c0c-a010-15d84c32d385"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "85e2d615-44fe-4576-b072-efcfab7741a9",
                  "type": "has_only_phrase",
                  "uuid": "deadaada-67f0-46a9-8b0d-51f68b304447"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "85e2d615-44fe-4576-b072-efcfab7741a9",
                  "type": "has_only_phrase",
                  "uuid": "e1d40569-bd22-41c9-b09c-d9d09fba676a"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "85e2d615-44fe-4576-b072-efcfab7741a9",
                  "type": "has_only_phrase",
                  "uuid": "52979d6e-478a-4b20-8032-8176201ba9ad"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "85e2d615-44fe-4576-b072-efcfab7741a9",
                  "type": "has_only_phrase",
                  "uuid": "6db529e7-1aa5-4188-824d-c54ecf48205c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1212e17f-22b1-4f5f-803d-08a401f58916",
                  "name": "All Responses",
                  "uuid": "f0528d0c-4ee8-41d4-afc5-a6a0f4a5f597"
                },
                {
                  "exit_uuid": "76695b8b-3d68-42b4-9840-975de7746b14",
                  "name": "0;1;2;3;4",
                  "uuid": "a99c4985-d627-413f-831f-228030516cab"
                },
                {
                  "exit_uuid": "8216c1bb-a742-434e-bc4f-3abf654a089d",
                  "name": "5;6;7;8",
                  "uuid": "85e2d615-44fe-4576-b072-efcfab7741a9"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "1212e17f-22b1-4f5f-803d-08a401f58916",
                "destination_uuid": null
              },
              {
                "uuid": "76695b8b-3d68-42b4-9840-975de7746b14",
                "destination_uuid": "5f29e3e8-5bbb-4568-9af7-5742510a06d1"
              },
              {
                "uuid": "8216c1bb-a742-434e-bc4f-3abf654a089d",
                "destination_uuid": "f8ef740f-2b8c-4c15-baed-fcd3e3d8707a"
              }
            ]
          },
          {
            "uuid": "5f29e3e8-5bbb-4568-9af7-5742510a06d1",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "f9554794-9f26-478e-9b80-68fca04c1e02"
              }
            ],
            "exits": [
              {
                "uuid": "191e4401-1e04-417a-a383-7c48417f540b",
                "destination_uuid": "7d7e0b49-8809-4fd7-80ba-02ff10fb37ef"
              }
            ]
          },
          {
            "uuid": "f8ef740f-2b8c-4c15-baed-fcd3e3d8707a",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "0b133068-5c87-4ea5-b5f7-a0ba5e24005b"
              }
            ],
            "exits": [
              {
                "uuid": "1706b67d-e794-45f1-816d-2071cbbd87c4",
                "destination_uuid": "7d7e0b49-8809-4fd7-80ba-02ff10fb37ef"
              }
            ]
          },
          {
            "uuid": "7d7e0b49-8809-4fd7-80ba-02ff10fb37ef",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "191f67d6-9046-4cf6-bfc3-f2b0226df6a0",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "97b898ad-2a95-4fc0-bbc1-53675b3ecac2",
                  "type": "has_only_phrase",
                  "uuid": "33c6d204-38da-4b19-b15d-553aa1fb6629"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "09b5bd8e-762d-4704-849d-919784eb9f92",
                  "name": "All Responses",
                  "uuid": "191f67d6-9046-4cf6-bfc3-f2b0226df6a0"
                },
                {
                  "exit_uuid": "0a8d0dcb-babf-4770-bab9-f84e8a444eac",
                  "name": "Next",
                  "uuid": "97b898ad-2a95-4fc0-bbc1-53675b3ecac2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "09b5bd8e-762d-4704-849d-919784eb9f92",
                "destination_uuid": null
              },
              {
                "uuid": "0a8d0dcb-babf-4770-bab9-f84e8a444eac",
                "destination_uuid": "c5c16aa2-b060-46cb-9ea8-b59aee301287"
              }
            ]
          },
          {
            "uuid": "c5c16aa2-b060-46cb-9ea8-b59aee301287",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "2a8f2071-96ae-4833-ac13-cd3e082e7f94"
              }
            ],
            "exits": [
              {
                "uuid": "543727c4-2cf6-4f21-b202-2b2416deb62b",
                "destination_uuid": "5caac814-7523-4aac-bb2c-556f6a80883c"
              }
            ]
          },
          {
            "uuid": "5caac814-7523-4aac-bb2c-556f6a80883c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "33bc8b3b-f169-48d9-bd86-dba6bf1b573b",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "984ab0cf-28c8-4e49-89af-b3eddc261e3f",
                  "type": "has_only_phrase",
                  "uuid": "f0433647-1c92-4707-8f66-8272232f5caf"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2dc73eb6-c941-46f1-bd24-542f6b95eabf",
                  "name": "All Responses",
                  "uuid": "33bc8b3b-f169-48d9-bd86-dba6bf1b573b"
                },
                {
                  "exit_uuid": "71b54071-3d85-44e8-8e33-19687d9af760",
                  "name": "Next",
                  "uuid": "984ab0cf-28c8-4e49-89af-b3eddc261e3f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2dc73eb6-c941-46f1-bd24-542f6b95eabf",
                "destination_uuid": null
              },
              {
                "uuid": "71b54071-3d85-44e8-8e33-19687d9af760",
                "destination_uuid": "207ccd8b-2ee9-4118-bce1-a33753992b00"
              }
            ]
          },
          {
            "uuid": "207ccd8b-2ee9-4118-bce1-a33753992b00",
            "actions": [
              {
                "uuid": "eeed458e-85e8-4182-8eee-cf9af70f1edd",
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
                "uuid": "d1651278-e267-4edb-9c92-c4d3380bd331",
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
        "uuid": "e0471aba-cc48-4fe6-ac10-e10d61a9bd79",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "214ccd9a-f503-4b32-bcb0-ea7a56276b55",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "7d9ad6eb-2d66-4ada-84cd-501ef4736414"
              }
            ],
            "exits": [
              {
                "uuid": "48d63ca6-bf62-4ce2-86e8-5a3910537199",
                "destination_uuid": "9308860a-cac4-41f2-ab64-04b3cac9e8a6"
              }
            ]
          },
          {
            "uuid": "9308860a-cac4-41f2-ab64-04b3cac9e8a6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "50c425fd-1b62-4e3c-90fe-dc7ebdeca840",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "bd1a8802-718e-4c11-af51-970d6e901c7f",
                  "type": "has_only_phrase",
                  "uuid": "1d869b74-8db4-46c7-af0a-0c204007d5cb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "bc56a55c-0eb2-4834-ae8b-14c4d927c819",
                  "name": "All Responses",
                  "uuid": "50c425fd-1b62-4e3c-90fe-dc7ebdeca840"
                },
                {
                  "exit_uuid": "33b152b3-dfcd-4e39-a4de-7394f6a5bc65",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "bd1a8802-718e-4c11-af51-970d6e901c7f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "bc56a55c-0eb2-4834-ae8b-14c4d927c819",
                "destination_uuid": null
              },
              {
                "uuid": "33b152b3-dfcd-4e39-a4de-7394f6a5bc65",
                "destination_uuid": "6b9745f9-bf51-48ae-80a0-87cfa4830738"
              }
            ]
          },
          {
            "uuid": "6b9745f9-bf51-48ae-80a0-87cfa4830738",
            "actions": [
              {
                "uuid": "9ba58203-7d19-414e-9c27-bdd2a027bdc3",
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
                "uuid": "ad00cef0-973f-477d-90c3-59e32250f6cc",
                "destination_uuid": "2e1250c4-219a-4e58-bd27-a8cfbc2096b3"
              }
            ]
          },
          {
            "uuid": "2e1250c4-219a-4e58-bd27-a8cfbc2096b3",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "079e5691-cc38-4412-898e-53e9cd3044f9"
                },
                "type": "enter_flow",
                "uuid": "cbd6ea66-81ff-4b69-b788-3531623f0ea4"
              }
            ],
            "exits": [
              {
                "uuid": "0afb0cb5-6f2b-4852-9e2f-481973752b5f",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "81cc4693-1aeb-48ba-86ef-3fe6de9c2553",
            "actions": [
              {
                "uuid": "ddcd9b51-f294-4484-ab52-30560d27354d",
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
                "uuid": "b9a99f48-76c9-4e58-8b97-612a9bb5ba5e",
                "destination_uuid": "37b6edfd-603f-4d6d-8980-5662016c9a1a"
              }
            ]
          },
          {
            "uuid": "37b6edfd-603f-4d6d-8980-5662016c9a1a",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "3f360017-e769-45b2-8f14-2070055e18f0"
                },
                "type": "enter_flow",
                "uuid": "2caebcab-2b5a-4428-afb9-e1241bf5e816"
              }
            ],
            "exits": [
              {
                "uuid": "59d7086a-7e3d-4d9a-b4f4-a2166e5988c8",
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
        "uuid": "2b0bbdf6-b81b-4564-90a3-7f45a83358ed",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "69ee9827-d9b7-4d66-85be-3765cf7044cf",
            "actions": [
              {
                "attachments": [],
                "text": "Welcome! How are you feeling today? https://plh-demo1.idems.international/chat/msg-info?character=Guide&choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "Happy",
                  "Neutral",
                  "Sad"
                ],
                "uuid": "5b729908-60fd-4a4a-9fe8-bfb00abede27"
              }
            ],
            "exits": [
              {
                "uuid": "bf380247-9205-43f5-a752-72d751400945",
                "destination_uuid": "d4121a1e-1476-4eb3-956b-48e2e8f6e973"
              }
            ]
          },
          {
            "uuid": "d4121a1e-1476-4eb3-956b-48e2e8f6e973",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e04ec99a-1bab-4e54-b78c-cbbc9db44e75",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "381476eb-d316-4df7-87a2-6354f7ea7607",
                  "type": "has_only_phrase",
                  "uuid": "8997d422-3e3c-48f9-917c-9521a8656f91"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "5fef7697-9844-4ff3-927d-f5875985425f",
                  "type": "has_only_phrase",
                  "uuid": "fbca8612-5f89-44eb-909d-b0e2b9a2ce75"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "5fef7697-9844-4ff3-927d-f5875985425f",
                  "type": "has_only_phrase",
                  "uuid": "2cd1191d-f84a-4531-bede-692b4054c05d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "af877d07-6d58-43c0-a66b-6b27a1d91fe0",
                  "name": "All Responses",
                  "uuid": "e04ec99a-1bab-4e54-b78c-cbbc9db44e75"
                },
                {
                  "exit_uuid": "57ec9824-b804-4c56-afc8-47117d6c9f92",
                  "name": "Happy",
                  "uuid": "381476eb-d316-4df7-87a2-6354f7ea7607"
                },
                {
                  "exit_uuid": "09f13c74-9660-4545-8209-a2ffbd1c0158",
                  "name": "Neutral; Sad",
                  "uuid": "5fef7697-9844-4ff3-927d-f5875985425f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "af877d07-6d58-43c0-a66b-6b27a1d91fe0",
                "destination_uuid": null
              },
              {
                "uuid": "57ec9824-b804-4c56-afc8-47117d6c9f92",
                "destination_uuid": "9534bfab-49a9-49c6-ad6c-e2abf0bf324e"
              },
              {
                "uuid": "09f13c74-9660-4545-8209-a2ffbd1c0158",
                "destination_uuid": "8f938065-529b-4fce-9765-786bf9100f9d"
              }
            ]
          },
          {
            "uuid": "9534bfab-49a9-49c6-ad6c-e2abf0bf324e",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "1fbfdf03-0e68-45fc-ac01-18e13f9fc6e7"
              }
            ],
            "exits": [
              {
                "uuid": "4e2b83f6-ea9c-4449-88b6-bbbf5fe08983",
                "destination_uuid": "8c31f0f3-da75-46c0-bcf3-331ba29646c8"
              }
            ]
          },
          {
            "uuid": "8f938065-529b-4fce-9765-786bf9100f9d",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b750d08b-b145-4fee-a203-5de3d3ff7271"
              }
            ],
            "exits": [
              {
                "uuid": "9314359c-90a2-46a4-b717-ec204dd1eae1",
                "destination_uuid": "16e1440d-4fed-470c-8b6b-c6d07a2f7274"
              }
            ]
          },
          {
            "uuid": "16e1440d-4fed-470c-8b6b-c6d07a2f7274",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "579004fe-4da2-4bf8-aa25-5d927bdb31ca"
              }
            ],
            "exits": [
              {
                "uuid": "6e1fa4cc-ac6f-4595-b279-95036f28fe32",
                "destination_uuid": "b705c0b9-15dc-4072-bd66-faf7adfecbd8"
              }
            ]
          },
          {
            "uuid": "b705c0b9-15dc-4072-bd66-faf7adfecbd8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e8a33b3b-09bb-48a0-9d66-82ad99563427",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "9e429351-63bf-4bc1-b1b7-484ca5602068",
                  "type": "has_only_phrase",
                  "uuid": "755ee24f-5dfc-482d-943d-bea0623661b0"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "3d1ae4a7-12fb-435c-b5fe-1c1008d1fa4a",
                  "type": "has_only_phrase",
                  "uuid": "4ff2d998-4e7f-4dc1-83db-ac5944b77fc0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ca989920-7af3-40e8-b35c-8f71c7e955d8",
                  "name": "All Responses",
                  "uuid": "e8a33b3b-09bb-48a0-9d66-82ad99563427"
                },
                {
                  "exit_uuid": "11eb7117-2bde-4331-b396-e038d7387d1b",
                  "name": "Yes",
                  "uuid": "9e429351-63bf-4bc1-b1b7-484ca5602068"
                },
                {
                  "exit_uuid": "144ec61c-89b4-4898-8b7d-29db568c0eae",
                  "name": "No",
                  "uuid": "3d1ae4a7-12fb-435c-b5fe-1c1008d1fa4a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ca989920-7af3-40e8-b35c-8f71c7e955d8",
                "destination_uuid": null
              },
              {
                "uuid": "11eb7117-2bde-4331-b396-e038d7387d1b",
                "destination_uuid": "ec982454-b4ad-4932-8452-1a97a3fe8b21"
              },
              {
                "uuid": "144ec61c-89b4-4898-8b7d-29db568c0eae",
                "destination_uuid": "eb68385a-4f5d-46b4-ae9e-167dd5c92c26"
              }
            ]
          },
          {
            "uuid": "ec982454-b4ad-4932-8452-1a97a3fe8b21",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "b9c84e25-bc89-4b0f-8e70-39172e6db1df"
                },
                "type": "enter_flow",
                "uuid": "0fe14648-2ab4-47f8-ae1d-842c3ec3200b"
              }
            ],
            "exits": [
              {
                "uuid": "6e29d78b-349b-4c1e-bf96-aa27652f8ed3",
                "destination_uuid": "b03d6fa2-ea4f-4d15-99ed-2cc3066528b4"
              },
              {
                "uuid": "2656688c-8bec-4de3-893c-bfa621f4c291",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "07965b12-bb60-4a98-a849-03d5f7307d1d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f4f291c7-7d82-4dd2-800a-61df5fb57d0f"
                },
                {
                  "uuid": "4e199db3-9724-41e4-82ac-f9af4f1e9623",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "34e364da-bf47-420b-bb31-553b00d0e5c4"
                }
              ],
              "categories": [
                {
                  "uuid": "f4f291c7-7d82-4dd2-800a-61df5fb57d0f",
                  "name": "Complete",
                  "exit_uuid": "6e29d78b-349b-4c1e-bf96-aa27652f8ed3"
                },
                {
                  "uuid": "34e364da-bf47-420b-bb31-553b00d0e5c4",
                  "name": "Expired",
                  "exit_uuid": "2656688c-8bec-4de3-893c-bfa621f4c291"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f4f291c7-7d82-4dd2-800a-61df5fb57d0f"
            }
          },
          {
            "uuid": "b03d6fa2-ea4f-4d15-99ed-2cc3066528b4",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d87a694f-db19-4d28-9f4a-bbea6b883707"
              }
            ],
            "exits": [
              {
                "uuid": "ea6e4fb1-5f6c-4c3b-82e8-c372a549370f",
                "destination_uuid": "be90d9e1-ea44-4819-a590-4317c546b207"
              }
            ]
          },
          {
            "uuid": "be90d9e1-ea44-4819-a590-4317c546b207",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "b28403d3-25f3-4b35-a34f-d08969520345"
              }
            ],
            "exits": [
              {
                "uuid": "77d7f6e9-c970-42db-916f-3fddb5688da1",
                "destination_uuid": "8c31f0f3-da75-46c0-bcf3-331ba29646c8"
              }
            ]
          },
          {
            "uuid": "eb68385a-4f5d-46b4-ae9e-167dd5c92c26",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "acf03ed1-5e9d-4a34-acdc-bc49500cde50"
              }
            ],
            "exits": [
              {
                "uuid": "5fa96b0a-a0d9-44b3-99a0-c6fcee0281cd",
                "destination_uuid": "8c31f0f3-da75-46c0-bcf3-331ba29646c8"
              }
            ]
          },
          {
            "uuid": "8c31f0f3-da75-46c0-bcf3-331ba29646c8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2be692f4-8a47-4ef3-a897-0084e0841334",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "65cbfe45-1001-40bc-a074-071735f8ec85",
                  "type": "has_only_phrase",
                  "uuid": "494b9c57-9e30-47ee-a85d-e046cc2bc51c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "27110a3a-8937-49f3-a6be-5d87ab5d734f",
                  "name": "All Responses",
                  "uuid": "2be692f4-8a47-4ef3-a897-0084e0841334"
                },
                {
                  "exit_uuid": "b5420089-d810-44d1-a650-7f15164f053f",
                  "name": "Chat to @fields.elder",
                  "uuid": "65cbfe45-1001-40bc-a074-071735f8ec85"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "27110a3a-8937-49f3-a6be-5d87ab5d734f",
                "destination_uuid": null
              },
              {
                "uuid": "b5420089-d810-44d1-a650-7f15164f053f",
                "destination_uuid": "0a6f4b5e-3f8e-422d-a4c8-298a2a61c7a0"
              }
            ]
          },
          {
            "uuid": "0a6f4b5e-3f8e-422d-a4c8-298a2a61c7a0",
            "actions": [
              {
                "uuid": "6309c0bd-e485-46e2-94c0-cd54da83d45e",
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
                "uuid": "69b2932c-1eaa-4532-a68e-0de119d0b9d4",
                "destination_uuid": "fe8aed96-3895-4c5b-bebf-9d0567b78d84"
              }
            ]
          },
          {
            "uuid": "fe8aed96-3895-4c5b-bebf-9d0567b78d84",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "10796169-20bd-4970-bfbd-1047818071b5"
                },
                "type": "enter_flow",
                "uuid": "6f7f4562-6fbd-4f5d-8e9f-00d6dc973173"
              }
            ],
            "exits": [
              {
                "uuid": "a9fee236-08ef-4473-9b34-e514c1cb057a",
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
        "uuid": "184a1ce9-61d5-4866-a75f-e88ca5b506dd",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "82959ffa-10b4-46c2-8856-4a9a98ad714f",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1b54b05f-394e-412c-ba81-f40dacb9ee22"
              }
            ],
            "exits": [
              {
                "uuid": "7fe92ca5-0693-4acc-8dce-4af8b82af5c9",
                "destination_uuid": "82fbc3fd-1e5b-4c91-abde-8b2f66b6ba40"
              }
            ]
          },
          {
            "uuid": "82fbc3fd-1e5b-4c91-abde-8b2f66b6ba40",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c5e1a0f9-7e33-4673-84e1-6dcd5abee873"
              }
            ],
            "exits": [
              {
                "uuid": "66724db6-5fe5-4fa8-94e2-53ad47b7259a",
                "destination_uuid": "55fcaeea-4ffb-4617-ba4f-c997196daf84"
              }
            ]
          },
          {
            "uuid": "55fcaeea-4ffb-4617-ba4f-c997196daf84",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "f7e5a3ae-0985-403b-83a7-8ab2b12880d8"
              }
            ],
            "exits": [
              {
                "uuid": "aa729119-96c2-451a-b45d-2ac96869e174",
                "destination_uuid": "ca199be9-296d-4e9e-8704-f50e9469bb22"
              }
            ]
          },
          {
            "uuid": "ca199be9-296d-4e9e-8704-f50e9469bb22",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a7efb47b-cb17-4fa7-bb84-99fb406513b5",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "5256abcb-ad9d-4d19-a77d-235604f70252",
                  "type": "has_only_phrase",
                  "uuid": "f96773c6-7b47-4661-9834-ef7215ba922a"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "308ea714-badc-4a8f-abc8-2f8945e7f413",
                  "type": "has_only_phrase",
                  "uuid": "d12aee82-3b77-4ec1-acbf-7db2be4a105d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "88408c53-a218-4eaf-8a3a-c73301acd311",
                  "name": "All Responses",
                  "uuid": "a7efb47b-cb17-4fa7-bb84-99fb406513b5"
                },
                {
                  "exit_uuid": "3cb67e01-0fb9-4024-af6c-6d3a8afff480",
                  "name": "Yes",
                  "uuid": "5256abcb-ad9d-4d19-a77d-235604f70252"
                },
                {
                  "exit_uuid": "0ac7413b-b35a-4de4-bb82-34dce1321081",
                  "name": "No",
                  "uuid": "308ea714-badc-4a8f-abc8-2f8945e7f413"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "88408c53-a218-4eaf-8a3a-c73301acd311",
                "destination_uuid": null
              },
              {
                "uuid": "3cb67e01-0fb9-4024-af6c-6d3a8afff480",
                "destination_uuid": "fb49ebbf-c2c9-4b3b-810b-e7fd76f0b224"
              },
              {
                "uuid": "0ac7413b-b35a-4de4-bb82-34dce1321081",
                "destination_uuid": "15e5e248-8553-4466-848b-c5f6c102f230"
              }
            ]
          },
          {
            "uuid": "fb49ebbf-c2c9-4b3b-810b-e7fd76f0b224",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "340909ba-a175-467d-9ebb-1751cd8f40f8"
              }
            ],
            "exits": [
              {
                "uuid": "26b6312c-5b40-4a87-8a93-f9894c71ceb3",
                "destination_uuid": "138de941-8f35-4d85-b5cf-fb20c683b296"
              }
            ]
          },
          {
            "uuid": "15e5e248-8553-4466-848b-c5f6c102f230",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fac09ae1-313d-485d-89b3-c1c5eafcbbe5"
              }
            ],
            "exits": [
              {
                "uuid": "df92d455-e455-4468-85de-25ba4fcfed68",
                "destination_uuid": "138de941-8f35-4d85-b5cf-fb20c683b296"
              }
            ]
          },
          {
            "uuid": "138de941-8f35-4d85-b5cf-fb20c683b296",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "668599f2-47a7-4410-9bdd-e9902f1b70b3"
              }
            ],
            "exits": [
              {
                "uuid": "2846ef69-c291-46a4-bc33-5669117da4d9",
                "destination_uuid": "6419c755-5b49-40ef-af27-54e66c43fbe4"
              }
            ]
          },
          {
            "uuid": "6419c755-5b49-40ef-af27-54e66c43fbe4",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "bf0fd6b2-d797-4aba-9b94-4a1f6e989437"
              }
            ],
            "exits": [
              {
                "uuid": "78a6c5e3-4f07-4bb8-9bf0-3ea284e884fd",
                "destination_uuid": "08ef6408-5bf1-40cb-9f08-1b6c5e4d40ba"
              }
            ]
          },
          {
            "uuid": "08ef6408-5bf1-40cb-9f08-1b6c5e4d40ba",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b648ead7-966f-4d34-95c6-c26b5d9ed2b3",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "50b52177-1da9-4e79-b51f-82f10b91a659",
                  "type": "has_only_phrase",
                  "uuid": "84415894-714e-4ba8-974a-2b285e4b37d1"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "5fa1d12e-7b0d-48a0-8406-83c088b733bc",
                  "type": "has_only_phrase",
                  "uuid": "a81d413a-f25d-40d1-8af5-a8f14c1564ad"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "783e247b-c56a-4627-9b4b-26b0b85f6eb1",
                  "name": "All Responses",
                  "uuid": "b648ead7-966f-4d34-95c6-c26b5d9ed2b3"
                },
                {
                  "exit_uuid": "cda91133-3b8c-42f9-87aa-78072fd3e730",
                  "name": "Yes",
                  "uuid": "50b52177-1da9-4e79-b51f-82f10b91a659"
                },
                {
                  "exit_uuid": "c2fee723-33dd-4472-b713-5eaaf89d444e",
                  "name": "Later",
                  "uuid": "5fa1d12e-7b0d-48a0-8406-83c088b733bc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "783e247b-c56a-4627-9b4b-26b0b85f6eb1",
                "destination_uuid": null
              },
              {
                "uuid": "cda91133-3b8c-42f9-87aa-78072fd3e730",
                "destination_uuid": "54238b60-c539-42b3-b4f7-b8d9dddc84b4"
              },
              {
                "uuid": "c2fee723-33dd-4472-b713-5eaaf89d444e",
                "destination_uuid": "94561d49-c7a2-4fc1-8514-9e2c864fd07b"
              }
            ]
          },
          {
            "uuid": "54238b60-c539-42b3-b4f7-b8d9dddc84b4",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "2d7212ff-afa2-47b6-9acd-df694fc72d1e"
              }
            ],
            "exits": [
              {
                "uuid": "8d308e16-c9ac-4c31-adf3-01dc901bc386",
                "destination_uuid": "b2479008-9c3d-403b-9b59-969145f6efed"
              }
            ]
          },
          {
            "uuid": "b2479008-9c3d-403b-9b59-969145f6efed",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2a385627-21fa-47ca-ae3b-13e8aec8d143",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "88c7be8c-b4df-43f1-8c5c-37d65aac76ad",
                  "type": "has_only_phrase",
                  "uuid": "07f26d4e-aab2-4bb8-8958-56d3122758b6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f35487d8-ec89-4531-8924-4073196a46ab",
                  "name": "All Responses",
                  "uuid": "2a385627-21fa-47ca-ae3b-13e8aec8d143"
                },
                {
                  "exit_uuid": "968c49e8-c0fe-4263-aee9-450f718fe37b",
                  "name": "Take me to Tips",
                  "uuid": "88c7be8c-b4df-43f1-8c5c-37d65aac76ad"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f35487d8-ec89-4531-8924-4073196a46ab",
                "destination_uuid": null
              },
              {
                "uuid": "968c49e8-c0fe-4263-aee9-450f718fe37b",
                "destination_uuid": "50ad071f-49dd-4d6b-bbee-31087d75a98a"
              }
            ]
          },
          {
            "uuid": "50ad071f-49dd-4d6b-bbee-31087d75a98a",
            "actions": [
              {
                "uuid": "8a64c27a-3957-4a8a-82c1-db30099092f1",
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
                "uuid": "90284c26-1f9a-4b11-801e-4d86d830642d",
                "destination_uuid": "bbe550ad-80be-45b6-83f2-98c95226ff03"
              }
            ]
          },
          {
            "uuid": "bbe550ad-80be-45b6-83f2-98c95226ff03",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "3c25aff5-89fb-42f2-8025-c87a7c89708d"
                },
                "type": "enter_flow",
                "uuid": "a6ea6b22-47f6-4fa9-960b-20a7e45a6aed"
              }
            ],
            "exits": [
              {
                "uuid": "4940269e-4899-4bb1-9444-a9f81a739bf2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "94561d49-c7a2-4fc1-8514-9e2c864fd07b",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "5b5a6669-afd4-4733-8616-d761aa483f80"
              }
            ],
            "exits": [
              {
                "uuid": "55b49be1-1031-4d76-a513-88483f9cd1e9",
                "destination_uuid": "7718f678-9406-4fe3-ba36-0f42e0433111"
              }
            ]
          },
          {
            "uuid": "7718f678-9406-4fe3-ba36-0f42e0433111",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b2492048-3f1a-447d-9d9f-069101590066",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "3aba74a4-657f-4e92-915b-9d9b2c1fd0ae",
                  "type": "has_only_phrase",
                  "uuid": "7a344cd5-936e-440e-b22a-8779c1ea496a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "068d2250-4203-4783-8729-2e5bf58f2f83",
                  "name": "All Responses",
                  "uuid": "b2492048-3f1a-447d-9d9f-069101590066"
                },
                {
                  "exit_uuid": "0c69302a-47c7-4be2-a525-d94ca214d03d",
                  "name": "Take me to the home screen",
                  "uuid": "3aba74a4-657f-4e92-915b-9d9b2c1fd0ae"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "068d2250-4203-4783-8729-2e5bf58f2f83",
                "destination_uuid": null
              },
              {
                "uuid": "0c69302a-47c7-4be2-a525-d94ca214d03d",
                "destination_uuid": "5c972cc9-67c5-4800-8176-b032f1829d72"
              }
            ]
          },
          {
            "uuid": "5c972cc9-67c5-4800-8176-b032f1829d72",
            "actions": [
              {
                "uuid": "38797102-9508-4f01-99da-5455ad8cd5d7",
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
                "uuid": "ddcabac9-355f-42e8-b2de-5a1d6d32779b",
                "destination_uuid": "f22d6024-9bfd-48b8-a6fe-81edfcc16a6e"
              }
            ]
          },
          {
            "uuid": "f22d6024-9bfd-48b8-a6fe-81edfcc16a6e",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "322c26df-3a24-4baf-bed4-8de783b10e4d"
                },
                "type": "enter_flow",
                "uuid": "da49f250-e41f-4589-8087-d79cfcdcc810"
              }
            ],
            "exits": [
              {
                "uuid": "a5c42f78-3f2f-42f1-814c-6c4ac0343d35",
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
        "uuid": "421705e3-9d46-4c64-9ae8-b94ebc57c668",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "473c4786-1892-4375-8de8-de856a772b4c",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0a17067d-d845-456a-ad34-189d3df31422"
              }
            ],
            "exits": [
              {
                "uuid": "c6110432-b674-4c2a-bb66-62b471304dd2",
                "destination_uuid": "3253c7d3-a775-4bf2-9375-532841f5efcc"
              }
            ]
          },
          {
            "uuid": "3253c7d3-a775-4bf2-9375-532841f5efcc",
            "actions": [
              {
                "attachments": [],
                "text": "Show this list to your teen and let them pick!",
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
                "uuid": "160cf592-a83c-4406-ac13-efdf32076ae0"
              }
            ],
            "exits": [
              {
                "uuid": "b1e859bd-0c9b-46a5-b4f5-4a3d8a7a9ed6",
                "destination_uuid": "d5fc0072-783b-4df1-bd45-72b407ea11a5"
              }
            ]
          },
          {
            "uuid": "d5fc0072-783b-4df1-bd45-72b407ea11a5",
            "actions": [],
            "exits": [
              {
                "uuid": "6420892f-eedc-4195-9df7-49d40301e1dc",
                "destination_uuid": "1ad79e21-b459-41bf-bd5c-e65ed07fb643"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "607437cb-1446-417a-8c70-104f1202b8e2",
              "cases": [],
              "categories": [
                {
                  "uuid": "607437cb-1446-417a-8c70-104f1202b8e2",
                  "name": "All Responses",
                  "exit_uuid": "6420892f-eedc-4195-9df7-49d40301e1dc"
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
            "uuid": "1ad79e21-b459-41bf-bd5c-e65ed07fb643",
            "actions": [
              {
                "uuid": "6040c190-a21b-489e-97c6-f9bb1d1ec45c",
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
                "uuid": "df0f59db-9c5c-4129-8352-d9f606d99490",
                "destination_uuid": "f480c810-1b5e-44fb-bb4b-ab1f3123eec5"
              }
            ]
          },
          {
            "uuid": "f480c810-1b5e-44fb-bb4b-ab1f3123eec5",
            "actions": [
              {
                "attachments": [],
                "text": "When will you spend time together? ",
                "type": "send_msg",
                "quick_replies": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "uuid": "4bbc59b5-4953-4c3b-93fd-34160951685f"
              }
            ],
            "exits": [
              {
                "uuid": "b2987622-09af-49cf-9e1d-6343d10d3e8c",
                "destination_uuid": "6241af59-3213-4c2e-8d3a-5fef01cb0bfa"
              }
            ]
          },
          {
            "uuid": "6241af59-3213-4c2e-8d3a-5fef01cb0bfa",
            "actions": [],
            "exits": [
              {
                "uuid": "1d740b09-218c-4597-8317-bdca52a611af",
                "destination_uuid": "9f7da496-ba13-43c1-8cf5-8e50150bea4c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "78e558d3-61c7-48a9-8123-1f78ba4edc7b",
              "cases": [],
              "categories": [
                {
                  "uuid": "78e558d3-61c7-48a9-8123-1f78ba4edc7b",
                  "name": "All Responses",
                  "exit_uuid": "1d740b09-218c-4597-8317-bdca52a611af"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_chooseday"
            }
          },
          {
            "uuid": "9f7da496-ba13-43c1-8cf5-8e50150bea4c",
            "actions": [
              {
                "uuid": "8e8fee23-3549-4692-a7c8-58864b4b7592",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_chooseday",
                  "name": "mod_1on1_chooseday"
                },
                "value": "@results.mod_1on1_chooseday"
              }
            ],
            "exits": [
              {
                "uuid": "db98909f-77ab-4152-b79a-fab997685b34",
                "destination_uuid": "f8e6d187-66f6-4c47-9fd0-540019bac760"
              }
            ]
          },
          {
            "uuid": "f8e6d187-66f6-4c47-9fd0-540019bac760",
            "actions": [
              {
                "attachments": [],
                "text": "At what time?",
                "type": "send_msg",
                "quick_replies": [
                  "Morning",
                  "Afternoon",
                  "Evening"
                ],
                "uuid": "c9d7cf77-2127-433b-abbb-cb7f6bc6311d"
              }
            ],
            "exits": [
              {
                "uuid": "25378d4d-7a94-45ef-82ca-4a1825fe6239",
                "destination_uuid": "f35c3f40-4176-4b66-8a88-8685c2d5aa5a"
              }
            ]
          },
          {
            "uuid": "f35c3f40-4176-4b66-8a88-8685c2d5aa5a",
            "actions": [],
            "exits": [
              {
                "uuid": "c9bee8c8-214f-4d9c-a6b9-4ad828baa373",
                "destination_uuid": "2c6872a8-01d3-432b-aec1-904de45cb540"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8d920bb2-996e-46a2-9f55-042f79623cf6",
              "cases": [],
              "categories": [
                {
                  "uuid": "8d920bb2-996e-46a2-9f55-042f79623cf6",
                  "name": "All Responses",
                  "exit_uuid": "c9bee8c8-214f-4d9c-a6b9-4ad828baa373"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_choosetime"
            }
          },
          {
            "uuid": "2c6872a8-01d3-432b-aec1-904de45cb540",
            "actions": [
              {
                "uuid": "482ef621-5d31-416f-8093-82520b86b97f",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_choosetime",
                  "name": "mod_1on1_choosetime"
                },
                "value": "@results.mod_1on1_choosetime"
              }
            ],
            "exits": [
              {
                "uuid": "4eccd8d1-3404-4f66-abbe-b4480d1e8234",
                "destination_uuid": "88731216-9b34-4fb3-a208-71a95e7ca998"
              }
            ]
          },
          {
            "uuid": "88731216-9b34-4fb3-a208-71a95e7ca998",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "e5ec4fbb-03ff-4f23-8c4f-9e81787097ab"
              }
            ],
            "exits": [
              {
                "uuid": "b6aec9e2-c496-4025-9746-688dab88c758",
                "destination_uuid": "5868be68-6552-448a-98f4-068fb86b2219"
              }
            ]
          },
          {
            "uuid": "5868be68-6552-448a-98f4-068fb86b2219",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d988902c-809d-4681-8a88-147cd56fe10b",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "fc4e839b-2d63-475a-af8d-01032c761db8",
                  "type": "has_only_phrase",
                  "uuid": "15b324de-b9ff-421b-b3d4-df92853182a2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b661740b-6364-46f5-94c1-8c6303802f92",
                  "name": "All Responses",
                  "uuid": "d988902c-809d-4681-8a88-147cd56fe10b"
                },
                {
                  "exit_uuid": "6ff3e0d4-def5-4617-a82f-672751ade33a",
                  "name": "Take me to Homescreen",
                  "uuid": "fc4e839b-2d63-475a-af8d-01032c761db8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b661740b-6364-46f5-94c1-8c6303802f92",
                "destination_uuid": null
              },
              {
                "uuid": "6ff3e0d4-def5-4617-a82f-672751ade33a",
                "destination_uuid": "1f66608f-f86e-422d-bf47-957222154b8f"
              }
            ]
          },
          {
            "uuid": "1f66608f-f86e-422d-bf47-957222154b8f",
            "actions": [
              {
                "uuid": "17425243-9f7a-43ce-a9c1-a5078a998d37",
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
                "uuid": "dfec65ad-9af6-4e86-80ff-5726ccb187d8",
                "destination_uuid": "54bb0c46-5c52-492d-bde4-2533a38f4b96"
              }
            ]
          },
          {
            "uuid": "54bb0c46-5c52-492d-bde4-2533a38f4b96",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "cdb6156a-fe6a-46a1-9537-dda70f88f6b9"
                },
                "type": "enter_flow",
                "uuid": "7372d9d3-a3e9-4706-80db-b2b89484c4c5"
              }
            ],
            "exits": [
              {
                "uuid": "d1ef0af9-8237-4688-b50f-09c44d132651",
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
        "uuid": "50711483-7a4e-4c88-97c0-db3deefd5c9e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "672bdfbd-bf58-4c3b-8914-0357523b2aa7",
            "actions": [
              {
                "attachments": [],
                "text": "Your goal for One-on-One Time was to @fields.mod_1on1_chooseact with your teen.\nHow did it go?  https://plh-demo1.idems.international/chat/msg-info?character=Elder&choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "Great",
                  "Neutral",
                  "Bad"
                ],
                "uuid": "6253bc4c-f68b-4428-92ea-978392135da8"
              }
            ],
            "exits": [
              {
                "uuid": "bf99071a-2ee7-4e7a-8631-5664eb65b8d9",
                "destination_uuid": "d4a51e77-bb64-4f25-8e78-ad0ffecf76fd"
              }
            ]
          },
          {
            "uuid": "d4a51e77-bb64-4f25-8e78-ad0ffecf76fd",
            "actions": [],
            "exits": [
              {
                "uuid": "91c98cbe-1ac4-4d8b-94ed-fe34dbc79960",
                "destination_uuid": "8d9d049d-cd0e-4c94-9255-e64b9cc68059"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d89a163f-8bcd-40d1-9742-572c6314bbf6",
              "cases": [],
              "categories": [
                {
                  "uuid": "d89a163f-8bcd-40d1-9742-572c6314bbf6",
                  "name": "All Responses",
                  "exit_uuid": "91c98cbe-1ac4-4d8b-94ed-fe34dbc79960"
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
            "uuid": "8d9d049d-cd0e-4c94-9255-e64b9cc68059",
            "actions": [
              {
                "uuid": "323d0a6a-d515-48e1-803b-31fb2e22d063",
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
                "uuid": "12331dfa-bc89-4c3d-94a4-d645f21d89c1",
                "destination_uuid": "4c45a03a-a0d8-496c-ae49-3baf0118a71a"
              }
            ]
          },
          {
            "uuid": "4c45a03a-a0d8-496c-ae49-3baf0118a71a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "628d2964-2ab5-40e1-962c-f649e9cf27ff",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "86fa4c26-27ba-4256-906d-5882b7747cb1",
                  "type": "has_only_phrase",
                  "uuid": "87075ebf-befb-4bd9-9ba3-87ebb60ec333"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "d0bdae64-cda0-4fc3-a545-a606904744f3",
                  "type": "has_only_phrase",
                  "uuid": "7908ad83-a672-49f2-baf8-b0cb2dfbbc56"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "d34b9612-5824-4c3e-9732-d6435f5e8663",
                  "type": "has_only_phrase",
                  "uuid": "1c9cea18-ef4c-492d-8512-db2c7ccf688a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b79a919d-e53d-4cb7-8860-1d113ae6c6ae",
                  "name": "All Responses",
                  "uuid": "628d2964-2ab5-40e1-962c-f649e9cf27ff"
                },
                {
                  "exit_uuid": "3589c22e-d847-41b6-bca4-0d849e351a5c",
                  "name": "Great",
                  "uuid": "86fa4c26-27ba-4256-906d-5882b7747cb1"
                },
                {
                  "exit_uuid": "548fb2a1-61d9-4f56-923d-daaefd4ff938",
                  "name": "Neutral",
                  "uuid": "d0bdae64-cda0-4fc3-a545-a606904744f3"
                },
                {
                  "exit_uuid": "afaff710-3455-4f29-a7e5-e75e30a9c128",
                  "name": "Bad",
                  "uuid": "d34b9612-5824-4c3e-9732-d6435f5e8663"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "b79a919d-e53d-4cb7-8860-1d113ae6c6ae",
                "destination_uuid": null
              },
              {
                "uuid": "3589c22e-d847-41b6-bca4-0d849e351a5c",
                "destination_uuid": "4bfbe347-9dbe-4ab8-8802-e4f564ae7705"
              },
              {
                "uuid": "548fb2a1-61d9-4f56-923d-daaefd4ff938",
                "destination_uuid": "3258588b-26e3-49f8-9dcf-3cfa651cf780"
              },
              {
                "uuid": "afaff710-3455-4f29-a7e5-e75e30a9c128",
                "destination_uuid": "bb3030b2-b31c-48a9-9657-08b8c2c6410b"
              }
            ]
          },
          {
            "uuid": "4bfbe347-9dbe-4ab8-8802-e4f564ae7705",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fe536248-29d6-4c36-bd41-daa031214a10"
              }
            ],
            "exits": [
              {
                "uuid": "64b94b60-bc20-49fc-ba49-1b4f2dfcab92",
                "destination_uuid": "fbcf1967-995e-4006-a7a3-9bebb77aaa5a"
              }
            ]
          },
          {
            "uuid": "3258588b-26e3-49f8-9dcf-3cfa651cf780",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f1b91c70-6839-41a1-8c19-2a07eca25b8a"
              }
            ],
            "exits": [
              {
                "uuid": "ad1d0f8f-a77f-49f2-a36d-0cd3c5f7ea06",
                "destination_uuid": "fbcf1967-995e-4006-a7a3-9bebb77aaa5a"
              }
            ]
          },
          {
            "uuid": "fbcf1967-995e-4006-a7a3-9bebb77aaa5a",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "f8405ebd-e80b-4952-bec1-cc969b24655b"
                },
                "type": "enter_flow",
                "uuid": "21903fca-d230-4a36-a4d2-d08658ed6e6f"
              }
            ],
            "exits": [
              {
                "uuid": "7ae7b1d8-aec5-4aa6-92fd-9c2ec1a6c839",
                "destination_uuid": "7b7fcd57-998d-4a32-87ed-4cfba00941d0"
              },
              {
                "uuid": "9c70eeca-3779-4b9c-b8d6-e23f5b923553",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c9edc75e-7e90-4425-a46f-f2a7630711ac",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "6e3b2559-ed9f-4a3e-aaee-160bcf245783"
                },
                {
                  "uuid": "e8059e45-a2be-4c01-9da7-aefbf19f39a9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "7cf29a38-8beb-4efb-9582-ea14ac0d3285"
                }
              ],
              "categories": [
                {
                  "uuid": "6e3b2559-ed9f-4a3e-aaee-160bcf245783",
                  "name": "Complete",
                  "exit_uuid": "7ae7b1d8-aec5-4aa6-92fd-9c2ec1a6c839"
                },
                {
                  "uuid": "7cf29a38-8beb-4efb-9582-ea14ac0d3285",
                  "name": "Expired",
                  "exit_uuid": "9c70eeca-3779-4b9c-b8d6-e23f5b923553"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "6e3b2559-ed9f-4a3e-aaee-160bcf245783"
            }
          },
          {
            "uuid": "7b7fcd57-998d-4a32-87ed-4cfba00941d0",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "a21cdc82-d3a7-4bcb-a997-9e74ce08cdaf"
                },
                "type": "enter_flow",
                "uuid": "7a18e8bf-8737-4bbc-a241-d923abc98564"
              }
            ],
            "exits": [
              {
                "uuid": "446045c5-657a-4346-80cb-75bdbe5267f2",
                "destination_uuid": "02b0ef5c-2f43-4406-ace1-614f91f37286"
              },
              {
                "uuid": "29bfe2fa-e6e3-49b2-b01f-e6f321b8a1d8",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "6855bca5-421a-4b5f-8c74-53fbd41e596b",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4292d29f-4030-4a99-b2ff-59ff929b4005"
                },
                {
                  "uuid": "e2c7129b-0362-43a6-bd0d-ad0718b2baf3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "5efea9c3-48c1-4c06-bbd3-a6df4e1294d3"
                }
              ],
              "categories": [
                {
                  "uuid": "4292d29f-4030-4a99-b2ff-59ff929b4005",
                  "name": "Complete",
                  "exit_uuid": "446045c5-657a-4346-80cb-75bdbe5267f2"
                },
                {
                  "uuid": "5efea9c3-48c1-4c06-bbd3-a6df4e1294d3",
                  "name": "Expired",
                  "exit_uuid": "29bfe2fa-e6e3-49b2-b01f-e6f321b8a1d8"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4292d29f-4030-4a99-b2ff-59ff929b4005"
            }
          },
          {
            "uuid": "bb3030b2-b31c-48a9-9657-08b8c2c6410b",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "00b2eda0-dd2d-4433-b4cd-a06e307b179c"
              }
            ],
            "exits": [
              {
                "uuid": "61fee8fd-1892-44e3-ab84-2c2bb82b460f",
                "destination_uuid": "4778c6ec-7cf2-4b14-908b-91e999beccc0"
              }
            ]
          },
          {
            "uuid": "4778c6ec-7cf2-4b14-908b-91e999beccc0",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "19087d8b-d84c-48bd-84b6-6c22d1c229d9"
                },
                "type": "enter_flow",
                "uuid": "b1a5d2c6-0ffa-479d-a0e9-84fe53f8ac06"
              }
            ],
            "exits": [
              {
                "uuid": "1f66b407-3060-4349-8412-dfeb1bfcad47",
                "destination_uuid": "815698a8-cf15-4979-a39d-f38e51766217"
              },
              {
                "uuid": "6f2355b9-6282-4da9-9522-ff3536e6abc2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "38dfb6c7-f485-4606-9dfa-2d281c9f3034",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "67f98a7e-e272-45a7-a602-48677aa3fe16"
                },
                {
                  "uuid": "7eca3597-7533-4472-b210-d89202ee0a54",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e62f38b1-a86f-4c1b-9a8c-c4a2f71a2a79"
                }
              ],
              "categories": [
                {
                  "uuid": "67f98a7e-e272-45a7-a602-48677aa3fe16",
                  "name": "Complete",
                  "exit_uuid": "1f66b407-3060-4349-8412-dfeb1bfcad47"
                },
                {
                  "uuid": "e62f38b1-a86f-4c1b-9a8c-c4a2f71a2a79",
                  "name": "Expired",
                  "exit_uuid": "6f2355b9-6282-4da9-9522-ff3536e6abc2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "67f98a7e-e272-45a7-a602-48677aa3fe16"
            }
          },
          {
            "uuid": "815698a8-cf15-4979-a39d-f38e51766217",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "b25ab14f-bda8-4d66-8a0f-5dcd53e0c9aa"
                },
                "type": "enter_flow",
                "uuid": "b49f546b-5e3f-4a4f-95a4-2a7963d8c6ab"
              }
            ],
            "exits": [
              {
                "uuid": "6020bc98-ae70-4e78-a12a-461f1aca876b",
                "destination_uuid": "02b0ef5c-2f43-4406-ace1-614f91f37286"
              },
              {
                "uuid": "648f00c8-6bd5-42ab-a744-f94355c7d291",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ef613ba5-df2c-4bbc-800a-f9bd95868b8a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7ef56c4b-bef3-4892-8c3b-9270db8556b0"
                },
                {
                  "uuid": "e67e3946-17f2-4a6e-9c08-8fefdff5731d",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "99c0f0a8-071c-4fd6-9225-7bfb48b8bb73"
                }
              ],
              "categories": [
                {
                  "uuid": "7ef56c4b-bef3-4892-8c3b-9270db8556b0",
                  "name": "Complete",
                  "exit_uuid": "6020bc98-ae70-4e78-a12a-461f1aca876b"
                },
                {
                  "uuid": "99c0f0a8-071c-4fd6-9225-7bfb48b8bb73",
                  "name": "Expired",
                  "exit_uuid": "648f00c8-6bd5-42ab-a744-f94355c7d291"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7ef56c4b-bef3-4892-8c3b-9270db8556b0"
            }
          },
          {
            "uuid": "02b0ef5c-2f43-4406-ace1-614f91f37286",
            "actions": [
              {
                "uuid": "cdabba60-b316-4401-b781-6549d0839fe0",
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
                "uuid": "8552c50e-f89b-48aa-8f6c-930c8e2f7eec",
                "destination_uuid": "28ed8e99-34cd-4e8d-94e3-5a80859eccfd"
              }
            ]
          },
          {
            "uuid": "28ed8e99-34cd-4e8d-94e3-5a80859eccfd",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "ea9dbf06-892f-40c9-ac81-bb2708feed31"
                },
                "type": "enter_flow",
                "uuid": "3b71aee5-704b-4b31-8008-ff13c6d63ece"
              }
            ],
            "exits": [
              {
                "uuid": "5e85a994-2342-4b7d-8e1f-7f67764518e3",
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
        "uuid": "b4e5ea22-f32d-48e5-95ae-add06f6115dd",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "74ce512d-b762-40f3-9690-0f765a887d95",
            "actions": [
              {
                "attachments": [],
                "text": "Which of my tips helped you?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Do it every day",
                  "Let your teen choose the activity",
                  "Follow your teen’s lead",
                  "Give your teen all of your attention",
                  "Show your teen you are really listening",
                  "Have fun!",
                  "None "
                ],
                "uuid": "579646c1-6667-4920-b580-9cf724992419"
              }
            ],
            "exits": [
              {
                "uuid": "aa4e234f-ec0f-4d84-9ea9-eeb903ec45ed",
                "destination_uuid": "bc66c0f9-af86-42b8-8812-11670838c79e"
              }
            ]
          },
          {
            "uuid": "bc66c0f9-af86-42b8-8812-11670838c79e",
            "actions": [],
            "exits": [
              {
                "uuid": "b85b8b0f-3a57-4d06-b556-3a3dd44ca65f",
                "destination_uuid": "8e9b41f9-5015-4ef1-8bb6-8ba46c327b08"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c0328e94-0d48-4a73-9f7a-9df467824039",
              "cases": [],
              "categories": [
                {
                  "uuid": "c0328e94-0d48-4a73-9f7a-9df467824039",
                  "name": "All Responses",
                  "exit_uuid": "b85b8b0f-3a57-4d06-b556-3a3dd44ca65f"
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
            "uuid": "8e9b41f9-5015-4ef1-8bb6-8ba46c327b08",
            "actions": [
              {
                "uuid": "9b20b548-11ea-448e-ae19-7a51d69689b3",
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
                "uuid": "8dc1a468-4dfa-4423-ae2d-b73cf392c461",
                "destination_uuid": "f5d08393-3fbb-4257-adeb-f635dd04b91e"
              }
            ]
          },
          {
            "uuid": "f5d08393-3fbb-4257-adeb-f635dd04b91e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a6bfb5e9-3d24-4da2-bbb4-17c1b2398f66",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "4e599e31-46ea-4da0-a5bf-7064709dedf7",
                  "type": "has_only_phrase",
                  "uuid": "df3c8deb-d87e-41b1-a5a1-9dc9fd297d79"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "ea3217c1-8d0c-4944-8adb-122edd956825",
                  "type": "has_only_phrase",
                  "uuid": "b184d9da-04b8-465d-9d9a-3e4c918226d3"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "fc7152c1-25ab-451e-888b-adb65ccf95e5",
                  "type": "has_only_phrase",
                  "uuid": "a69510c3-f484-42ea-bc22-cffdab0eb99f"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "7063d2c7-f8c5-4700-92be-457b946484d6",
                  "type": "has_only_phrase",
                  "uuid": "277737c6-dec3-4bba-bced-2940fffde4bc"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "4ad5035c-f93a-4333-8e26-8d804e7c5812",
                  "type": "has_only_phrase",
                  "uuid": "71c7e8d9-2a95-4f89-8010-d61b4c7b9b8e"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "adc7a31c-56eb-47df-a654-086854042da0",
                  "type": "has_only_phrase",
                  "uuid": "f11a6aee-b57f-4762-9e20-d98f20eeec36"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "3a5ad57c-42ad-470d-a91c-c80dbf82261d",
                  "type": "has_only_phrase",
                  "uuid": "1a79b880-8059-41ca-a45c-d0105f6333ae"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e272a4a5-9f9e-4ac4-91af-be51a440be0b",
                  "name": "All Responses",
                  "uuid": "a6bfb5e9-3d24-4da2-bbb4-17c1b2398f66"
                },
                {
                  "exit_uuid": "4d25bda5-33f4-484f-91fa-c9c549bf0506",
                  "name": "Do it every day",
                  "uuid": "4e599e31-46ea-4da0-a5bf-7064709dedf7"
                },
                {
                  "exit_uuid": "bbba9ca0-7eb2-4943-a0e5-154a5e719e8c",
                  "name": "Let your teen choose the activity",
                  "uuid": "ea3217c1-8d0c-4944-8adb-122edd956825"
                },
                {
                  "exit_uuid": "57964dd7-402b-4f4c-8247-90764a189e22",
                  "name": "Follow your teen’s lead",
                  "uuid": "fc7152c1-25ab-451e-888b-adb65ccf95e5"
                },
                {
                  "exit_uuid": "45b31ff3-e97b-43c3-b62d-dbb292d5776f",
                  "name": "Give your teen all of your attention",
                  "uuid": "7063d2c7-f8c5-4700-92be-457b946484d6"
                },
                {
                  "exit_uuid": "96650289-2613-4df6-bb20-f53587efbeda",
                  "name": "Show your teen you are really listening",
                  "uuid": "4ad5035c-f93a-4333-8e26-8d804e7c5812"
                },
                {
                  "exit_uuid": "9b584e66-64ba-4b03-b476-30d41c50fcd0",
                  "name": "Have fun!",
                  "uuid": "adc7a31c-56eb-47df-a654-086854042da0"
                },
                {
                  "exit_uuid": "be61a6bd-02e5-4f81-9abb-a6ba6e0dec81",
                  "name": "None ",
                  "uuid": "3a5ad57c-42ad-470d-a91c-c80dbf82261d"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "e272a4a5-9f9e-4ac4-91af-be51a440be0b",
                "destination_uuid": null
              },
              {
                "uuid": "4d25bda5-33f4-484f-91fa-c9c549bf0506",
                "destination_uuid": "31875772-92a8-415a-abc6-ab885e5ebf06"
              },
              {
                "uuid": "bbba9ca0-7eb2-4943-a0e5-154a5e719e8c",
                "destination_uuid": "ebcbcc05-53b8-49c8-ac49-8c6e18fbb2ca"
              },
              {
                "uuid": "57964dd7-402b-4f4c-8247-90764a189e22",
                "destination_uuid": "e34a2df6-7f2f-495b-af3c-31e6bdaa6156"
              },
              {
                "uuid": "45b31ff3-e97b-43c3-b62d-dbb292d5776f",
                "destination_uuid": "559417b8-fc5d-4464-8969-6fc302e1e7ac"
              },
              {
                "uuid": "96650289-2613-4df6-bb20-f53587efbeda",
                "destination_uuid": "bcf6304e-27dd-4c59-b077-0582b50cd61a"
              },
              {
                "uuid": "9b584e66-64ba-4b03-b476-30d41c50fcd0",
                "destination_uuid": "04cde899-0c55-4697-88fd-7e2767d2d52a"
              },
              {
                "uuid": "be61a6bd-02e5-4f81-9abb-a6ba6e0dec81",
                "destination_uuid": "fe160723-7556-4aa1-ae6d-2c5467b83005"
              }
            ]
          },
          {
            "uuid": "31875772-92a8-415a-abc6-ab885e5ebf06",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Having a specific time helps me remember ",
                  "With a routine my teen and I can both keep our schedule free",
                  "Spending time every day helps build trust with my teen "
                ],
                "uuid": "eb620610-623a-4b0c-b8e3-a31e09876345"
              }
            ],
            "exits": [
              {
                "uuid": "c7731244-e954-48d5-9b3f-281c39488b9a",
                "destination_uuid": "988f533f-3728-4c18-9f54-38a0dc6650bd"
              }
            ]
          },
          {
            "uuid": "988f533f-3728-4c18-9f54-38a0dc6650bd",
            "actions": [],
            "exits": [
              {
                "uuid": "a004a081-f6f0-402d-9b82-64ac6896bcbd",
                "destination_uuid": "9cb42dea-af6c-43d7-9ddf-3fd6cbaf082c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d1c75f01-e47e-4e23-bbaa-ab3254e8c85a",
              "cases": [],
              "categories": [
                {
                  "uuid": "d1c75f01-e47e-4e23-bbaa-ab3254e8c85a",
                  "name": "All Responses",
                  "exit_uuid": "a004a081-f6f0-402d-9b82-64ac6896bcbd"
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
            "uuid": "9cb42dea-af6c-43d7-9ddf-3fd6cbaf082c",
            "actions": [
              {
                "uuid": "f5244d7d-1d70-412f-9410-43ca51f9a9e8",
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
                "uuid": "24d17aed-82e6-426b-8c65-18562b6c8d76",
                "destination_uuid": "2d354e8f-edf3-4d6f-9a44-2ee124179a54"
              }
            ]
          },
          {
            "uuid": "2d354e8f-edf3-4d6f-9a44-2ee124179a54",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bd2d660a-4683-4344-9fbb-a1abe845eab1"
              }
            ],
            "exits": [
              {
                "uuid": "817bbed1-cd25-4813-b67e-fa70036520e3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ebcbcc05-53b8-49c8-ac49-8c6e18fbb2ca",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Letting my teen choose what to do builds their confidence",
                  "If my teen chooses, he/she is more likely to want to spend time together",
                  "Letting my teen choose shows that I care about his/her interests"
                ],
                "uuid": "625f0dc8-fcc1-4df0-9a92-6f881bfcbd59"
              }
            ],
            "exits": [
              {
                "uuid": "de24ab00-cc47-422f-bab4-a8e2afeb3e11",
                "destination_uuid": "8ce21283-14ff-45f8-8f05-2a1fed9b19c1"
              }
            ]
          },
          {
            "uuid": "8ce21283-14ff-45f8-8f05-2a1fed9b19c1",
            "actions": [],
            "exits": [
              {
                "uuid": "44b63014-a389-49d0-842f-a71d77bcdafd",
                "destination_uuid": "5944871f-4b07-404a-85fe-38e6b69ddf4c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "743e9d8c-8fd7-49bf-9874-6dc260fe4115",
              "cases": [],
              "categories": [
                {
                  "uuid": "743e9d8c-8fd7-49bf-9874-6dc260fe4115",
                  "name": "All Responses",
                  "exit_uuid": "44b63014-a389-49d0-842f-a71d77bcdafd"
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
            "uuid": "5944871f-4b07-404a-85fe-38e6b69ddf4c",
            "actions": [
              {
                "uuid": "d8168225-db63-4c7d-a83d-dedcb8abcccd",
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
                "uuid": "9d1cae6b-a934-4b8c-9403-f8c7e6a5cf7d",
                "destination_uuid": "862138ad-a7d9-4288-8569-024e025048de"
              }
            ]
          },
          {
            "uuid": "862138ad-a7d9-4288-8569-024e025048de",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0bd9c595-3770-4bdc-ae89-fa1e50691eb8"
              }
            ],
            "exits": [
              {
                "uuid": "b9051770-ffcf-4c9b-80e2-8467f54dfae5",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "e34a2df6-7f2f-495b-af3c-31e6bdaa6156",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "By accepting my teen’s suggestions, I show I listen to him/her",
                  "Saying something nice about my teen’s choice helps them feel valued",
                  "Doing what my teen likes to do will help them to open up to me"
                ],
                "uuid": "24b3b7d3-38eb-446a-9126-79e9330064f3"
              }
            ],
            "exits": [
              {
                "uuid": "f51ea946-d580-4fb6-a196-a04868582137",
                "destination_uuid": "448802da-4c64-4ad1-a023-867576415cad"
              }
            ]
          },
          {
            "uuid": "448802da-4c64-4ad1-a023-867576415cad",
            "actions": [],
            "exits": [
              {
                "uuid": "a5af1b7d-edb7-45bc-92f8-33dc9de8e256",
                "destination_uuid": "ca740084-c099-4392-8807-755c42e555bd"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d800b892-eecd-4be1-9f2c-83ef4ce08809",
              "cases": [],
              "categories": [
                {
                  "uuid": "d800b892-eecd-4be1-9f2c-83ef4ce08809",
                  "name": "All Responses",
                  "exit_uuid": "a5af1b7d-edb7-45bc-92f8-33dc9de8e256"
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
            "uuid": "ca740084-c099-4392-8807-755c42e555bd",
            "actions": [
              {
                "uuid": "fabfa057-77b4-423c-a127-a086347e5b89",
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
                "uuid": "e30c8473-a2bc-46e5-af02-0ae03e3a94fb",
                "destination_uuid": "d15461f1-5a79-49e3-9199-2d73fbaaceac"
              }
            ]
          },
          {
            "uuid": "d15461f1-5a79-49e3-9199-2d73fbaaceac",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3ae37d3a-b2ab-4410-b9fb-a3fec3cabc4c"
              }
            ],
            "exits": [
              {
                "uuid": "2fee47da-0bda-46ab-a931-17ba54623728",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "559417b8-fc5d-4464-8969-6fc302e1e7ac",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "By preventing interruptions, I show my teen they are most important",
                  "Even if I can't join my teen's activity, like sports, I can still cheer them on",
                  "When I pay attention, I can learn so much about my teen's interests, views and capabilities"
                ],
                "uuid": "4f6101bf-caa0-4891-b82c-084a07553d44"
              }
            ],
            "exits": [
              {
                "uuid": "58f4d900-1592-4bb0-b10f-9bb9dda7d798",
                "destination_uuid": "eb4faddf-6019-46c1-a93d-6187dc1254e6"
              }
            ]
          },
          {
            "uuid": "eb4faddf-6019-46c1-a93d-6187dc1254e6",
            "actions": [],
            "exits": [
              {
                "uuid": "343ebda3-3fb6-45e7-9969-491a1bbf69e0",
                "destination_uuid": "c50fd710-e01a-49f2-8459-12dfbd5ec93c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "92f450b0-174b-4cf7-bdaa-1885f11f902a",
              "cases": [],
              "categories": [
                {
                  "uuid": "92f450b0-174b-4cf7-bdaa-1885f11f902a",
                  "name": "All Responses",
                  "exit_uuid": "343ebda3-3fb6-45e7-9969-491a1bbf69e0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_high_5"
            }
          },
          {
            "uuid": "c50fd710-e01a-49f2-8459-12dfbd5ec93c",
            "actions": [
              {
                "uuid": "c92a0895-932f-40c1-b03c-90c59cc11e1f",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_high_5",
                  "name": "mod_1on1_high_5"
                },
                "value": "@results.mod_1on1_high_5"
              }
            ],
            "exits": [
              {
                "uuid": "e07ac164-ac16-4cea-ad26-d4be0f3c8044",
                "destination_uuid": "1687604f-1cb8-4676-9bf5-f8f1f963529f"
              }
            ]
          },
          {
            "uuid": "1687604f-1cb8-4676-9bf5-f8f1f963529f",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "50e111c3-0c8b-4d89-bfa3-f54fd7f1c208"
              }
            ],
            "exits": [
              {
                "uuid": "ea8d4f10-65af-4e4d-b931-0f84d166924a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "bcf6304e-27dd-4c59-b077-0582b50cd61a",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "By nodding and saying \"I see\" my teen feels heard and valued",
                  "By repeating parts of what my teen has said, I can make sure I understand him/her well",
                  "Listening with eye contact shows my teen I care about what they do and think"
                ],
                "uuid": "2d8adb9c-ca35-4ed0-9a55-aee33b8d2707"
              }
            ],
            "exits": [
              {
                "uuid": "884794bb-50fd-44b7-89cc-1ceb1928d720",
                "destination_uuid": "38d9c0e6-d88d-40c5-ab73-2391319ef46f"
              }
            ]
          },
          {
            "uuid": "38d9c0e6-d88d-40c5-ab73-2391319ef46f",
            "actions": [],
            "exits": [
              {
                "uuid": "b9d032bd-05de-4521-a35b-8f2bcb5145fd",
                "destination_uuid": "55a7f375-7d95-41fb-b81f-4e7b6a6de82f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "401226b6-ad54-4239-bb2f-37ae3e6d04d4",
              "cases": [],
              "categories": [
                {
                  "uuid": "401226b6-ad54-4239-bb2f-37ae3e6d04d4",
                  "name": "All Responses",
                  "exit_uuid": "b9d032bd-05de-4521-a35b-8f2bcb5145fd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_high_6"
            }
          },
          {
            "uuid": "55a7f375-7d95-41fb-b81f-4e7b6a6de82f",
            "actions": [
              {
                "uuid": "f8e486f8-8d09-4da6-8de1-9efa4d24e2f8",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_high_6",
                  "name": "mod_1on1_high_6"
                },
                "value": "@results.mod_1on1_high_6"
              }
            ],
            "exits": [
              {
                "uuid": "144f858b-d97c-45eb-a6f0-e3ea285ab188",
                "destination_uuid": "00ef6b8e-a71b-4031-a6d6-0cb1c3119886"
              }
            ]
          },
          {
            "uuid": "00ef6b8e-a71b-4031-a6d6-0cb1c3119886",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "33fb0ba7-0c10-482b-8f39-febd5580ac7b"
              }
            ],
            "exits": [
              {
                "uuid": "a49c2c9b-bdba-443d-90a7-10c1fe2229f7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "04cde899-0c55-4697-88fd-7e2767d2d52a",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "When I enjoy One-on-One Time, my teen is also more likely to enjoy it",
                  "Normally we often argue, so it was great to spend positive time together",
                  "One-on-One Time is an opportunity for me to show a calm and relaxed side of myself to my teens "
                ],
                "uuid": "7b1b410b-f356-4a45-8b44-db6a588dfc31"
              }
            ],
            "exits": [
              {
                "uuid": "5aa21adc-4164-4073-9edb-225bee792a12",
                "destination_uuid": "46650854-898d-455a-9803-ab7576287b89"
              }
            ]
          },
          {
            "uuid": "46650854-898d-455a-9803-ab7576287b89",
            "actions": [],
            "exits": [
              {
                "uuid": "c5cb96a6-185c-44b1-a0cc-cacad64297c0",
                "destination_uuid": "653af951-f442-4178-b1f6-16c4c4596093"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fd3e323d-468e-4a3e-9e8c-6bcb940c7d13",
              "cases": [],
              "categories": [
                {
                  "uuid": "fd3e323d-468e-4a3e-9e8c-6bcb940c7d13",
                  "name": "All Responses",
                  "exit_uuid": "c5cb96a6-185c-44b1-a0cc-cacad64297c0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "mod_1on1_high_7"
            }
          },
          {
            "uuid": "653af951-f442-4178-b1f6-16c4c4596093",
            "actions": [
              {
                "uuid": "b7adef39-0b1f-4b31-b1fc-c6ab493b398e",
                "type": "set_contact_field",
                "field": {
                  "key": "mod_1on1_high_7",
                  "name": "mod_1on1_high_7"
                },
                "value": "@results.mod_1on1_high_7"
              }
            ],
            "exits": [
              {
                "uuid": "e9a53188-ec80-4623-ae90-f20d2ec08f7c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "3626f7fc-f987-4400-99cc-26042175c6ad",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b46441d1-bda3-4390-ae44-01f1762d1822"
              }
            ],
            "exits": [
              {
                "uuid": "fda307da-bb9b-48d5-8bbb-7fa51790150e",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "fe160723-7556-4aa1-ae6d-2c5467b83005",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4465973e-f880-46ea-9e82-e7733749cfb7"
              }
            ],
            "exits": [
              {
                "uuid": "516a94d4-e2d5-4a99-b092-a3a7209c710b",
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
        "uuid": "cd863e8f-4728-4aab-bb78-80263603d0f7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "359dabb7-0977-466e-9ca8-49a0e48929fb",
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
                "uuid": "dcd5ed99-2092-4093-afbe-2e8b5943d761"
              }
            ],
            "exits": [
              {
                "uuid": "e6916b13-6974-4390-b1c3-cf326d72b45d",
                "destination_uuid": "feff3b28-3509-446f-a9fc-e3f03a93c984"
              }
            ]
          },
          {
            "uuid": "1394d10f-4948-4081-bf3d-03a5a4dfad23",
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
                "uuid": "650b6ee0-8b76-404b-b36f-1efa798ebf16"
              }
            ],
            "exits": [
              {
                "uuid": "6c857d07-c104-4675-b5ca-81fefb204382",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7bac8927-d863-420e-8cd6-50e3d8f0944b",
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
                "uuid": "cd7f622e-cb13-453c-a5d5-d334f3819fb8"
              }
            ],
            "exits": [
              {
                "uuid": "4f602a53-99e9-4ccf-bb99-2bdea3f885b0",
                "destination_uuid": "feff3b28-3509-446f-a9fc-e3f03a93c984"
              }
            ]
          },
          {
            "uuid": "feff3b28-3509-446f-a9fc-e3f03a93c984",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b27cbc3d-0994-478c-8f19-199761c89b04",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "d710c0ef-6c62-490d-861d-f2beb53afb0c",
                  "type": "has_only_phrase",
                  "uuid": "ce8e99b2-bd63-4446-ba3d-97caaa648d99"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "f49ed092-2e5d-4e80-bf43-85b3ac328e7a",
                  "type": "has_only_phrase",
                  "uuid": "3b011416-9777-4f97-b99b-43970943934c"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "035b6b9a-8bcf-4904-a940-efe67bf0df14",
                  "type": "has_only_phrase",
                  "uuid": "a1ea1119-82fb-46b4-ab2d-b67387fd4462"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "02408d0f-1cdd-47ee-8aeb-7144735c56d8",
                  "type": "has_only_phrase",
                  "uuid": "e4a4e832-a384-4efa-9bfb-390a85a87b43"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "f2268612-c1f0-46f4-8dbb-12f903af2782",
                  "type": "has_only_phrase",
                  "uuid": "9f1faee6-7bcb-4a6c-ab8f-6c91b90ea31e"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "d53d533d-e735-4b56-906f-e4036bcb877b",
                  "type": "has_only_phrase",
                  "uuid": "d937c188-b240-4c3b-ba89-ce0def74b802"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "c59e42c9-9137-4a37-917d-3b68c560420c",
                  "type": "has_only_phrase",
                  "uuid": "40faa90e-ad26-420a-a807-ba9af92407eb"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "6872a815-8abe-4c96-92e7-6fb85070b24d",
                  "type": "has_only_phrase",
                  "uuid": "8facd6c9-f506-46bc-a077-fec2b38d8035"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "8e83dddc-f207-4a35-a3b3-f7a61b1ed340",
                  "type": "has_only_phrase",
                  "uuid": "41bdafd6-93a4-46b3-80fc-5f40e8bee073"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "e71c4981-ed10-4450-b2f0-1d2720efb6cf",
                  "type": "has_only_phrase",
                  "uuid": "42f2ee8d-60d3-4eaf-8ef8-a8624549c6f2"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "3c35d3ca-c881-4bc2-95f0-bb7a3ca1927f",
                  "type": "has_only_phrase",
                  "uuid": "7f9e41ac-f42e-49b0-a672-9884d9755995"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "daf0785b-4a55-45a2-842b-d422250cedb5",
                  "type": "has_only_phrase",
                  "uuid": "236df812-065d-44fe-80fd-9be683a322db"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "886d010f-4766-41a4-a914-31adab378cb9",
                  "type": "has_only_phrase",
                  "uuid": "1ba118f4-82ef-4803-9a8d-7d3a5748f668"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "2963407a-05c7-40f9-8989-7deedc6afecb",
                  "type": "has_only_phrase",
                  "uuid": "82b685c2-5932-4e62-ac95-5a9bb561c764"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "ed644c9e-99c5-44b6-bd9c-b41d6562e688",
                  "type": "has_only_phrase",
                  "uuid": "d3750998-c875-4410-bdca-4d33a8828cd2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4a2acb82-c882-4125-9497-dd19bc084f29",
                  "name": "All Responses",
                  "uuid": "b27cbc3d-0994-478c-8f19-199761c89b04"
                },
                {
                  "exit_uuid": "2bad930e-3576-43fb-94f4-7f7535d859cf",
                  "name": "I don’t have enough time",
                  "uuid": "d710c0ef-6c62-490d-861d-f2beb53afb0c"
                },
                {
                  "exit_uuid": "ce319a80-5e87-4bea-b590-1d2788708655",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "f49ed092-2e5d-4e80-bf43-85b3ac328e7a"
                },
                {
                  "exit_uuid": "eac95bf5-841f-44ed-97fe-de9762566207",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "035b6b9a-8bcf-4904-a940-efe67bf0df14"
                },
                {
                  "exit_uuid": "28026be5-b349-46c1-afaa-85efceb33414",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "02408d0f-1cdd-47ee-8aeb-7144735c56d8"
                },
                {
                  "exit_uuid": "aab602bf-6d85-4eb0-a5d8-133f235a4f75",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "f2268612-c1f0-46f4-8dbb-12f903af2782"
                },
                {
                  "exit_uuid": "e0529aca-76be-4ea6-96d5-7ededcc93b23",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "d53d533d-e735-4b56-906f-e4036bcb877b"
                },
                {
                  "exit_uuid": "56b5ee32-b73e-4aa6-9d7f-42652981c3b3",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "c59e42c9-9137-4a37-917d-3b68c560420c"
                },
                {
                  "exit_uuid": "a349a650-a382-4e6f-8a68-a29d75a274e0",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "6872a815-8abe-4c96-92e7-6fb85070b24d"
                },
                {
                  "exit_uuid": "7df80521-6aeb-41f9-a7f8-3ba09d0a76f0",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "8e83dddc-f207-4a35-a3b3-f7a61b1ed340"
                },
                {
                  "exit_uuid": "aba70b00-cff8-41be-b283-f0a18d57c2a4",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "e71c4981-ed10-4450-b2f0-1d2720efb6cf"
                },
                {
                  "exit_uuid": "b0b5ac1b-2943-4b7d-b34c-6a552470cea3",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "3c35d3ca-c881-4bc2-95f0-bb7a3ca1927f"
                },
                {
                  "exit_uuid": "75e3406c-141e-4f15-b871-a24d48216ca4",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "daf0785b-4a55-45a2-842b-d422250cedb5"
                },
                {
                  "exit_uuid": "36aa618f-6bfd-49f0-a0ee-81a91b0fa181",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "886d010f-4766-41a4-a914-31adab378cb9"
                },
                {
                  "exit_uuid": "11fc4694-d2c4-4ac4-8b99-78cd1025ed76",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "2963407a-05c7-40f9-8989-7deedc6afecb"
                },
                {
                  "exit_uuid": "db620bb5-6599-4577-8847-a97d3b1c86f4",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "ed644c9e-99c5-44b6-bd9c-b41d6562e688"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4a2acb82-c882-4125-9497-dd19bc084f29",
                "destination_uuid": null
              },
              {
                "uuid": "2bad930e-3576-43fb-94f4-7f7535d859cf",
                "destination_uuid": "fc418950-e3cc-4c4d-b7c5-0d88ea32d975"
              },
              {
                "uuid": "ce319a80-5e87-4bea-b590-1d2788708655",
                "destination_uuid": "42c68631-9ebf-43d8-8fc5-b29eb8206b5a"
              },
              {
                "uuid": "eac95bf5-841f-44ed-97fe-de9762566207",
                "destination_uuid": "42c68631-9ebf-43d8-8fc5-b29eb8206b5a"
              },
              {
                "uuid": "28026be5-b349-46c1-afaa-85efceb33414",
                "destination_uuid": "66d1ed01-088d-446f-b3e6-0fb2bfe9f753"
              },
              {
                "uuid": "aab602bf-6d85-4eb0-a5d8-133f235a4f75",
                "destination_uuid": "66d1ed01-088d-446f-b3e6-0fb2bfe9f753"
              },
              {
                "uuid": "e0529aca-76be-4ea6-96d5-7ededcc93b23",
                "destination_uuid": "cdc9d941-f99e-4fc8-8986-2c66150d1845"
              },
              {
                "uuid": "56b5ee32-b73e-4aa6-9d7f-42652981c3b3",
                "destination_uuid": "cdc9d941-f99e-4fc8-8986-2c66150d1845"
              },
              {
                "uuid": "a349a650-a382-4e6f-8a68-a29d75a274e0",
                "destination_uuid": "4d12e2c1-ee23-4ade-ac2c-bceaa867f1a3"
              },
              {
                "uuid": "7df80521-6aeb-41f9-a7f8-3ba09d0a76f0",
                "destination_uuid": "4d12e2c1-ee23-4ade-ac2c-bceaa867f1a3"
              },
              {
                "uuid": "aba70b00-cff8-41be-b283-f0a18d57c2a4",
                "destination_uuid": "9476dcbc-87b3-40c4-862b-3a88cd2afd9f"
              },
              {
                "uuid": "b0b5ac1b-2943-4b7d-b34c-6a552470cea3",
                "destination_uuid": "9476dcbc-87b3-40c4-862b-3a88cd2afd9f"
              },
              {
                "uuid": "75e3406c-141e-4f15-b871-a24d48216ca4",
                "destination_uuid": "e33c36c2-7c53-4e9f-a9da-accf966db1da"
              },
              {
                "uuid": "36aa618f-6bfd-49f0-a0ee-81a91b0fa181",
                "destination_uuid": "e33c36c2-7c53-4e9f-a9da-accf966db1da"
              },
              {
                "uuid": "11fc4694-d2c4-4ac4-8b99-78cd1025ed76",
                "destination_uuid": "bc90c075-7e5e-40cc-a4c4-3147bbf33ffc"
              },
              {
                "uuid": "db620bb5-6599-4577-8847-a97d3b1c86f4",
                "destination_uuid": "bc90c075-7e5e-40cc-a4c4-3147bbf33ffc"
              }
            ]
          },
          {
            "uuid": "fc418950-e3cc-4c4d-b7c5-0d88ea32d975",
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
                "uuid": "17b0001e-5e2b-4eed-b198-c279e915429c"
              }
            ],
            "exits": [
              {
                "uuid": "b290f9ae-7071-4eab-84cd-903a4561f67d",
                "destination_uuid": "65a040fa-c11b-4382-b96a-0847d8224549"
              }
            ]
          },
          {
            "uuid": "65a040fa-c11b-4382-b96a-0847d8224549",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "87f8d0ff-f641-4332-99e7-717e1157a7a2",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "83ae68b9-f2a9-46c0-add8-28774080cdf9",
                  "type": "has_only_phrase",
                  "uuid": "5d920ec7-4742-455b-8c3b-24ff8bb97249"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "85de44b5-56b0-43b7-80f9-30b6f75c537a",
                  "type": "has_only_phrase",
                  "uuid": "75923c10-6114-4363-b16e-56ea82d1ca47"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "fefaabec-3e74-4ad6-b650-36418ce4a230",
                  "type": "has_only_phrase",
                  "uuid": "77204e0e-c8b3-44f7-9707-14cabb58f4d9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "13c3e9fe-0ba3-4bca-affd-ec4ada5b7f53",
                  "name": "All Responses",
                  "uuid": "87f8d0ff-f641-4332-99e7-717e1157a7a2"
                },
                {
                  "exit_uuid": "ff1cce62-f37a-4a37-a8d4-fa0e3ecec6da",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "83ae68b9-f2a9-46c0-add8-28774080cdf9"
                },
                {
                  "exit_uuid": "9a40b253-e597-4f71-8892-9ba71faa1a29",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "85de44b5-56b0-43b7-80f9-30b6f75c537a"
                },
                {
                  "exit_uuid": "6d739667-b712-419d-9f99-cfff91ddb3bf",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "fefaabec-3e74-4ad6-b650-36418ce4a230"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "13c3e9fe-0ba3-4bca-affd-ec4ada5b7f53",
                "destination_uuid": null
              },
              {
                "uuid": "ff1cce62-f37a-4a37-a8d4-fa0e3ecec6da",
                "destination_uuid": "a673c23b-b0f6-4fd2-ba56-8b351979fdd7"
              },
              {
                "uuid": "9a40b253-e597-4f71-8892-9ba71faa1a29",
                "destination_uuid": "b70f75a6-4149-4357-8b05-defc13e94c5e"
              },
              {
                "uuid": "6d739667-b712-419d-9f99-cfff91ddb3bf",
                "destination_uuid": "20d91867-7d06-418d-a765-69f55d245703"
              }
            ]
          },
          {
            "uuid": "a673c23b-b0f6-4fd2-ba56-8b351979fdd7",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8108fbd9-5a4b-488f-87df-f6898b35a808"
              }
            ],
            "exits": [
              {
                "uuid": "8a0ee8d2-d6b4-4214-9548-aaafd400f423",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "b70f75a6-4149-4357-8b05-defc13e94c5e",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "687d073f-f760-466e-8515-3c8d6fdb11f4"
              }
            ],
            "exits": [
              {
                "uuid": "2883dc38-fcb1-4bac-9545-a99cec0b2941",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "20d91867-7d06-418d-a765-69f55d245703",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bf25abe6-8ea1-440b-98b7-9e6bbb8fae72"
              }
            ],
            "exits": [
              {
                "uuid": "9d07ffd5-d5cf-46da-b86d-5b2f230aa6fd",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "42c68631-9ebf-43d8-8fc5-b29eb8206b5a",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry you struggled with that. It can make us feel bad if our children do not want to spend One-on-One Time us.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "Do something fun with the whole family. "
                ],
                "uuid": "f7f8d294-eeac-497f-9f81-98991024d2f0"
              }
            ],
            "exits": [
              {
                "uuid": "d38b967c-c4eb-4b1b-b76a-e52a11cb7bb6",
                "destination_uuid": "d6e10894-e2f4-406b-be73-df19eaf15345"
              }
            ]
          },
          {
            "uuid": "d6e10894-e2f4-406b-be73-df19eaf15345",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c8490f3b-e516-45a5-b9bc-e1991eeea701",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "2b775dcf-0722-4707-8eed-8af8748f58fb",
                  "type": "has_only_phrase",
                  "uuid": "be8fd7ad-22c0-47ea-93cc-244f8ab1cb1c"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "1ddaa8c7-35e3-4be8-9e43-63c6b9b8fbbc",
                  "type": "has_only_phrase",
                  "uuid": "bb043155-f5b2-4415-9763-9dc58bb2b349"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "513c1f02-6585-4431-9715-a2625dd958a0",
                  "type": "has_only_phrase",
                  "uuid": "28e70414-ad6b-4999-b3de-a063fbce50ed"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9ec3e72b-a021-44ad-b4c5-ab2f9256060a",
                  "name": "All Responses",
                  "uuid": "c8490f3b-e516-45a5-b9bc-e1991eeea701"
                },
                {
                  "exit_uuid": "58295010-0d20-4ca6-9586-0293ce9f89dc",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "2b775dcf-0722-4707-8eed-8af8748f58fb"
                },
                {
                  "exit_uuid": "20779a62-d8b7-4116-a193-e52c68cc1412",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "1ddaa8c7-35e3-4be8-9e43-63c6b9b8fbbc"
                },
                {
                  "exit_uuid": "5534d875-8049-42db-aa0f-e2380a3ce49a",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "513c1f02-6585-4431-9715-a2625dd958a0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9ec3e72b-a021-44ad-b4c5-ab2f9256060a",
                "destination_uuid": null
              },
              {
                "uuid": "58295010-0d20-4ca6-9586-0293ce9f89dc",
                "destination_uuid": "5f707edc-94f6-4fcd-85dd-3bdb576a165f"
              },
              {
                "uuid": "20779a62-d8b7-4116-a193-e52c68cc1412",
                "destination_uuid": "c108f5e8-83a7-4380-a3d5-450d4e6b47f7"
              },
              {
                "uuid": "5534d875-8049-42db-aa0f-e2380a3ce49a",
                "destination_uuid": "fb2183bf-ac92-45f3-ad46-8bd9c110ae09"
              }
            ]
          },
          {
            "uuid": "5f707edc-94f6-4fcd-85dd-3bdb576a165f",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "133aa4d2-8dc7-41e2-8d1d-4670ee5f5b96"
              }
            ],
            "exits": [
              {
                "uuid": "f5cea308-98cc-49f5-82bb-a4a22306bef3",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "c108f5e8-83a7-4380-a3d5-450d4e6b47f7",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a945e7d0-090c-42e5-8a1b-3e586d9adeb2"
              }
            ],
            "exits": [
              {
                "uuid": "a798fd7a-0b49-4737-84b8-87f11f400d9e",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "fb2183bf-ac92-45f3-ad46-8bd9c110ae09",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3c441b23-ec36-4bdf-823c-ce70f009b4cc"
              }
            ],
            "exits": [
              {
                "uuid": "3043580e-f365-4149-940e-d82644f5acf5",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "66d1ed01-088d-446f-b3e6-0fb2bfe9f753",
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
                "uuid": "041f2b46-c716-41a3-9a84-79bf14b8983d"
              }
            ],
            "exits": [
              {
                "uuid": "2b55e654-4137-41fb-a803-dc6ad124a044",
                "destination_uuid": "6725fd8d-d04f-48fa-8fe6-80e711092cea"
              }
            ]
          },
          {
            "uuid": "6725fd8d-d04f-48fa-8fe6-80e711092cea",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0df102fd-b5a1-4b46-b218-1ebdb441d90a",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "96a02e31-4309-4e82-86e7-d7f7a5c42e46",
                  "type": "has_only_phrase",
                  "uuid": "07e54a0e-84ed-4fd6-a046-d78a2e559b53"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "fd86d244-2fe5-44d8-b9e6-6fe09c564181",
                  "type": "has_only_phrase",
                  "uuid": "3dd64c0e-32cf-4c91-bb21-95681dc77011"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "28bab1bf-ef7f-4785-92aa-3ac3f5dba549",
                  "type": "has_only_phrase",
                  "uuid": "49183c57-5278-43af-94ee-f54bad175b73"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ebde4a05-ab7c-4531-8f73-b6a966d1dfd1",
                  "name": "All Responses",
                  "uuid": "0df102fd-b5a1-4b46-b218-1ebdb441d90a"
                },
                {
                  "exit_uuid": "49e5d101-1ac2-4aab-a901-2f64489ae89d",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "96a02e31-4309-4e82-86e7-d7f7a5c42e46"
                },
                {
                  "exit_uuid": "a1c62d1a-a88a-47b4-b0d9-a880037b1746",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "fd86d244-2fe5-44d8-b9e6-6fe09c564181"
                },
                {
                  "exit_uuid": "41e1b608-7144-4d18-b0b3-0ac697fe3ca8",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "28bab1bf-ef7f-4785-92aa-3ac3f5dba549"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ebde4a05-ab7c-4531-8f73-b6a966d1dfd1",
                "destination_uuid": null
              },
              {
                "uuid": "49e5d101-1ac2-4aab-a901-2f64489ae89d",
                "destination_uuid": "a61074bf-693c-4d9d-a803-b987cbe2da9d"
              },
              {
                "uuid": "a1c62d1a-a88a-47b4-b0d9-a880037b1746",
                "destination_uuid": "23a41b9e-bdc2-4c98-a250-23375cc36cb4"
              },
              {
                "uuid": "41e1b608-7144-4d18-b0b3-0ac697fe3ca8",
                "destination_uuid": "17cf9e7e-7987-4839-a4f1-d9eb61cdceef"
              }
            ]
          },
          {
            "uuid": "a61074bf-693c-4d9d-a803-b987cbe2da9d",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c8672a0d-0b07-4823-b243-9fa7c274df64"
              }
            ],
            "exits": [
              {
                "uuid": "a38ebdca-1e34-49b1-a8c6-d469068570e3",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "23a41b9e-bdc2-4c98-a250-23375cc36cb4",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d685ba76-b889-488e-953a-bec504b5862f"
              }
            ],
            "exits": [
              {
                "uuid": "21c3fac0-270f-4b29-bec5-0863148cd0bf",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "17cf9e7e-7987-4839-a4f1-d9eb61cdceef",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "922f0e40-7848-41ef-a4cb-c0fca0d1ad4c"
              }
            ],
            "exits": [
              {
                "uuid": "45dc2c54-4dee-40f3-9d1b-1e04d3d09eb1",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "cdc9d941-f99e-4fc8-8986-2c66150d1845",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "f5c7f2d4-3743-4436-b8a1-a96318dae3db"
              }
            ],
            "exits": [
              {
                "uuid": "830218e3-b1bf-41be-8191-4c88c6fa2823",
                "destination_uuid": "701bf699-bf8f-4ee9-8576-884f3ac93191"
              }
            ]
          },
          {
            "uuid": "701bf699-bf8f-4ee9-8576-884f3ac93191",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "154da29e-cd1b-4384-b262-9162d7cdf6e0",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "95e5b0b0-f1d1-494d-aa0c-eb77f3a0b28f",
                  "type": "has_only_phrase",
                  "uuid": "01ad5584-43dd-41cd-ba1e-86d14e9e72a4"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "5fa9e898-189f-4e64-ae41-9b145e960d40",
                  "type": "has_only_phrase",
                  "uuid": "993702b7-aed7-4347-bd9d-b39e2198a669"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e3416a51-4a8d-4c97-91c9-c783fd82a205",
                  "name": "All Responses",
                  "uuid": "154da29e-cd1b-4384-b262-9162d7cdf6e0"
                },
                {
                  "exit_uuid": "70b9c726-fdcb-41e5-8559-e371860c33ff",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "95e5b0b0-f1d1-494d-aa0c-eb77f3a0b28f"
                },
                {
                  "exit_uuid": "8118eeab-4d18-4d0b-b55d-354ee87c42ae",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "5fa9e898-189f-4e64-ae41-9b145e960d40"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e3416a51-4a8d-4c97-91c9-c783fd82a205",
                "destination_uuid": null
              },
              {
                "uuid": "70b9c726-fdcb-41e5-8559-e371860c33ff",
                "destination_uuid": "b8d1b69b-fcb0-4370-a2fd-8d7296a2be26"
              },
              {
                "uuid": "8118eeab-4d18-4d0b-b55d-354ee87c42ae",
                "destination_uuid": "be06f851-fca9-403d-aee1-9028fc1951a2"
              }
            ]
          },
          {
            "uuid": "b8d1b69b-fcb0-4370-a2fd-8d7296a2be26",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cc526794-7403-4524-892e-eb30eac0dc72"
              }
            ],
            "exits": [
              {
                "uuid": "0bdbe2ab-6098-440d-a59d-3c8cc5ce7d47",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "be06f851-fca9-403d-aee1-9028fc1951a2",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "29ad6623-8cb9-4126-937a-f8ad44fa77f6"
              }
            ],
            "exits": [
              {
                "uuid": "f1e55f69-25c6-49e5-bc1b-8221cfb31650",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "4d12e2c1-ee23-4ade-ac2c-bceaa867f1a3",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "e593c0cb-1a77-4918-bfd8-62002e1da931"
              }
            ],
            "exits": [
              {
                "uuid": "eee00d75-4dcf-446f-ab5d-6e5beeebf49d",
                "destination_uuid": "9a03e522-ccb4-48dc-b870-2981beefe4ba"
              }
            ]
          },
          {
            "uuid": "9a03e522-ccb4-48dc-b870-2981beefe4ba",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "51666b0d-6924-4d21-b1c4-428be57fe349",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "2d6f155b-a1d2-4c12-a63f-a959ec8d1f9b",
                  "type": "has_only_phrase",
                  "uuid": "8632ac7e-1702-4a77-97f6-a8a537c3e345"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "d8512466-d848-4790-9eb2-60cbe0b45f1c",
                  "type": "has_only_phrase",
                  "uuid": "8952c1a5-9d31-4e9d-9168-f53128f79eb8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "06ea0d96-1ff7-423d-ae28-6cde205deb1f",
                  "name": "All Responses",
                  "uuid": "51666b0d-6924-4d21-b1c4-428be57fe349"
                },
                {
                  "exit_uuid": "f74e427b-bb5e-45c9-8ea3-23f40acf4d0f",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "2d6f155b-a1d2-4c12-a63f-a959ec8d1f9b"
                },
                {
                  "exit_uuid": "e6fee326-a959-419a-9938-d633b362aa8f",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "d8512466-d848-4790-9eb2-60cbe0b45f1c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "06ea0d96-1ff7-423d-ae28-6cde205deb1f",
                "destination_uuid": null
              },
              {
                "uuid": "f74e427b-bb5e-45c9-8ea3-23f40acf4d0f",
                "destination_uuid": "03c7b5f0-84ea-43f7-a607-90618aec9f0f"
              },
              {
                "uuid": "e6fee326-a959-419a-9938-d633b362aa8f",
                "destination_uuid": "1edcc903-5b76-4502-b579-4c4e9f9dfb19"
              }
            ]
          },
          {
            "uuid": "03c7b5f0-84ea-43f7-a607-90618aec9f0f",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b4b19d56-84fd-487e-b77f-8ef3b61bf780"
              }
            ],
            "exits": [
              {
                "uuid": "5aa862c7-e040-4fee-8452-0779ba3f7d92",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "1edcc903-5b76-4502-b579-4c4e9f9dfb19",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c858c25e-5215-49fb-be2c-59d07e6ded81"
              }
            ],
            "exits": [
              {
                "uuid": "9c0a2df5-5854-4e74-b4b6-b8c8a2f13040",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "9476dcbc-87b3-40c4-862b-3a88cd2afd9f",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "f779a014-1913-4863-8d6f-021617e7a36b"
              }
            ],
            "exits": [
              {
                "uuid": "ab57045b-5228-4499-9be5-c66176833b67",
                "destination_uuid": "51b61781-bf06-4b15-b51e-7d3e69143cb9"
              }
            ]
          },
          {
            "uuid": "51b61781-bf06-4b15-b51e-7d3e69143cb9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c88edafd-cf7c-4274-bb61-537615189ba4",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "24a1e00f-8b0d-4bb5-baee-cdd2548ac532",
                  "type": "has_only_phrase",
                  "uuid": "5dbf750d-f0a8-4aff-9db7-9c0e484445d8"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "e5089804-4f9f-4bdd-aeea-af745aeb63ef",
                  "type": "has_only_phrase",
                  "uuid": "c8b9649d-d6f8-4fbf-9f76-22b1a8b994b2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "895b53ab-1d81-4863-99bc-f6444d823ae3",
                  "name": "All Responses",
                  "uuid": "c88edafd-cf7c-4274-bb61-537615189ba4"
                },
                {
                  "exit_uuid": "f34fb1f9-aaea-414a-b1e0-0529f6fef544",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "24a1e00f-8b0d-4bb5-baee-cdd2548ac532"
                },
                {
                  "exit_uuid": "6d04cc3b-2891-4f04-9c99-ea79d158816d",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "e5089804-4f9f-4bdd-aeea-af745aeb63ef"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "895b53ab-1d81-4863-99bc-f6444d823ae3",
                "destination_uuid": null
              },
              {
                "uuid": "f34fb1f9-aaea-414a-b1e0-0529f6fef544",
                "destination_uuid": "78952100-80d6-4d81-81e3-23f951a5f59c"
              },
              {
                "uuid": "6d04cc3b-2891-4f04-9c99-ea79d158816d",
                "destination_uuid": "8581428c-c82d-46b4-96df-57d12c1b7388"
              }
            ]
          },
          {
            "uuid": "78952100-80d6-4d81-81e3-23f951a5f59c",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "4f2d8746-84e2-4bf2-9af2-4569403dccdb"
              }
            ],
            "exits": [
              {
                "uuid": "665ff43b-2ee8-492e-8a85-5cc0aaed81e7",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "8581428c-c82d-46b4-96df-57d12c1b7388",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c85e2254-5df2-4e63-94fd-8296ef377e26"
              }
            ],
            "exits": [
              {
                "uuid": "898d912a-828a-49e5-8173-094d113de42e",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "e33c36c2-7c53-4e9f-a9da-accf966db1da",
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
                "uuid": "692065c7-eace-4382-b9ac-3d1c02680b56"
              }
            ],
            "exits": [
              {
                "uuid": "410ff210-1a90-49b8-9714-061cd31b959d",
                "destination_uuid": "2c3f8065-730c-453e-bc40-9c03b250d5d4"
              }
            ]
          },
          {
            "uuid": "2c3f8065-730c-453e-bc40-9c03b250d5d4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f5da193f-6f21-4538-9646-b9dfcfcbaa45",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "16c2b376-90e8-4b6c-9cef-699892568a66",
                  "type": "has_only_phrase",
                  "uuid": "eb50e51a-be26-4533-a11d-1112a4e2e808"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "ce06832b-634b-4fde-9e45-01868450e3a7",
                  "type": "has_only_phrase",
                  "uuid": "0813c63a-1e63-4756-b025-14ad67b85c7f"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "f96eb1c7-41c9-4faa-805e-fd3d1b9a9a6e",
                  "type": "has_only_phrase",
                  "uuid": "f4395c9c-1463-40c4-8f4c-91f29c2a5631"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d28855c2-b975-4649-8a65-27a32d4466dc",
                  "name": "All Responses",
                  "uuid": "f5da193f-6f21-4538-9646-b9dfcfcbaa45"
                },
                {
                  "exit_uuid": "d3b06265-c853-4d91-b442-e70b3ee34da2",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "16c2b376-90e8-4b6c-9cef-699892568a66"
                },
                {
                  "exit_uuid": "c84ffc26-d339-4a60-913b-50a14af04b4f",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "ce06832b-634b-4fde-9e45-01868450e3a7"
                },
                {
                  "exit_uuid": "7c473dc8-f6b2-48a5-a5f1-fe4570dc72a0",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "f96eb1c7-41c9-4faa-805e-fd3d1b9a9a6e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d28855c2-b975-4649-8a65-27a32d4466dc",
                "destination_uuid": null
              },
              {
                "uuid": "d3b06265-c853-4d91-b442-e70b3ee34da2",
                "destination_uuid": "2f4929b5-5bcc-47ea-a275-f5ae0f035193"
              },
              {
                "uuid": "c84ffc26-d339-4a60-913b-50a14af04b4f",
                "destination_uuid": "ffbdadba-7818-46fd-af89-0e098da4f09d"
              },
              {
                "uuid": "7c473dc8-f6b2-48a5-a5f1-fe4570dc72a0",
                "destination_uuid": "d4b676ea-b2b4-4faf-93d0-55bce80b4543"
              }
            ]
          },
          {
            "uuid": "2f4929b5-5bcc-47ea-a275-f5ae0f035193",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e7e2ac72-54d8-415e-adf8-aaa92fe17054"
              }
            ],
            "exits": [
              {
                "uuid": "8e77b41b-6281-4160-bc37-dfef174a1fdf",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "ffbdadba-7818-46fd-af89-0e098da4f09d",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "33f0d41c-6740-4556-af3a-9d1c324e2e99"
              }
            ],
            "exits": [
              {
                "uuid": "855324b3-5360-402b-8b10-96778dcad041",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "d4b676ea-b2b4-4faf-93d0-55bce80b4543",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "784aac45-3773-4d47-b6e1-bd2f3356f695"
              }
            ],
            "exits": [
              {
                "uuid": "be640c35-df6b-411f-996c-2eacadd5ad5a",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "bc90c075-7e5e-40cc-a4c4-3147bbf33ffc",
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
                "uuid": "e603b193-612f-401e-8932-23f6d713f4cb"
              }
            ],
            "exits": [
              {
                "uuid": "fb2cefa7-8b5a-45f7-ab37-4ee8a45c4b02",
                "destination_uuid": "e1e64c16-aa77-453f-a90a-41a9200488f5"
              }
            ]
          },
          {
            "uuid": "e1e64c16-aa77-453f-a90a-41a9200488f5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "76267dbd-8e9d-457e-96a3-a95627cabc77",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "de789d7d-1919-4928-aaec-128072eb9952",
                  "type": "has_only_phrase",
                  "uuid": "b1ba1ef8-23f1-45e2-a99b-bc4a4ac82bab"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "d3a1ba76-9277-481d-9ed9-bf3187a778c2",
                  "type": "has_only_phrase",
                  "uuid": "2aeb6cd7-99e8-4190-95e7-960681395f77"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "156a8ed3-1d40-41ac-83ed-3537d13debf1",
                  "type": "has_only_phrase",
                  "uuid": "1ef69b11-4d7b-4629-ab83-4ff1e08f3e50"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2947a770-4baf-4f4f-8462-eae54c47c851",
                  "name": "All Responses",
                  "uuid": "76267dbd-8e9d-457e-96a3-a95627cabc77"
                },
                {
                  "exit_uuid": "7cb4f8d0-f977-4fa9-8804-22a1077f825c",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "de789d7d-1919-4928-aaec-128072eb9952"
                },
                {
                  "exit_uuid": "8d1118d3-fcfc-450e-a1fd-b421f270e44b",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "d3a1ba76-9277-481d-9ed9-bf3187a778c2"
                },
                {
                  "exit_uuid": "2f03709d-ba45-48df-9794-68efe34655cc",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "156a8ed3-1d40-41ac-83ed-3537d13debf1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2947a770-4baf-4f4f-8462-eae54c47c851",
                "destination_uuid": null
              },
              {
                "uuid": "7cb4f8d0-f977-4fa9-8804-22a1077f825c",
                "destination_uuid": "93127175-13e4-48a0-b541-46940712ce87"
              },
              {
                "uuid": "8d1118d3-fcfc-450e-a1fd-b421f270e44b",
                "destination_uuid": "728cdad1-eb82-4769-82a6-149c7c4d80bd"
              },
              {
                "uuid": "2f03709d-ba45-48df-9794-68efe34655cc",
                "destination_uuid": "0c002eb0-00d1-4f66-831e-ff61ca7b446f"
              }
            ]
          },
          {
            "uuid": "93127175-13e4-48a0-b541-46940712ce87",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d861cfc2-bf9c-4c5b-9906-caf7dc65d115"
              }
            ],
            "exits": [
              {
                "uuid": "a0ae2cff-ae28-4727-b35c-37ee8b21be7c",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "728cdad1-eb82-4769-82a6-149c7c4d80bd",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bcfc3f52-b6cb-49dc-8bce-03cdb283bc1c"
              }
            ],
            "exits": [
              {
                "uuid": "fbc199fb-bade-4a04-ab66-16b915ee6b2b",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "0c002eb0-00d1-4f66-831e-ff61ca7b446f",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5e067854-a7b3-4633-8877-2e421bf2028c"
              }
            ],
            "exits": [
              {
                "uuid": "41d8eed0-2373-4169-b51e-e895de32f824",
                "destination_uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd"
              }
            ]
          },
          {
            "uuid": "28302ce3-ef0d-46e5-a54c-d975c018e2bd",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ef244e32-a0ae-4eec-a92e-f3449c9df022",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "51bfa1ea-4a2d-4ed6-a205-8fe409bae175",
                  "type": "has_only_phrase",
                  "uuid": "f43f7b27-60a8-4e9d-9b1e-9ed7ab33e917"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e7b6b8ee-5132-4bf4-b2b4-9e59983a6987",
                  "name": "All Responses",
                  "uuid": "ef244e32-a0ae-4eec-a92e-f3449c9df022"
                },
                {
                  "exit_uuid": "cbcad6a8-6f8c-4ea5-ac54-b5f0c4b39a97",
                  "name": "Next",
                  "uuid": "51bfa1ea-4a2d-4ed6-a205-8fe409bae175"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e7b6b8ee-5132-4bf4-b2b4-9e59983a6987",
                "destination_uuid": null
              },
              {
                "uuid": "cbcad6a8-6f8c-4ea5-ac54-b5f0c4b39a97",
                "destination_uuid": "40d6d85e-22f8-4b8c-a719-aa974c4ce501"
              }
            ]
          },
          {
            "uuid": "40d6d85e-22f8-4b8c-a719-aa974c4ce501",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "1c711ccf-9cc9-44f4-8fa9-39f96261767c"
              }
            ],
            "exits": [
              {
                "uuid": "c397f1f9-7622-401e-b84a-5446cad75342",
                "destination_uuid": "bde82e5f-cff9-4a99-8ecf-32aaf7d6313a"
              }
            ]
          },
          {
            "uuid": "bde82e5f-cff9-4a99-8ecf-32aaf7d6313a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9f9342df-4f21-475b-bf86-57e4c88e3d4a",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "8dd7d8b2-ea88-411c-86cf-7aeda73bd057",
                  "type": "has_only_phrase",
                  "uuid": "8c915d26-6134-4e34-8324-38ef916a094f"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "5fb0fa54-7689-442a-8f39-715fa249cb11",
                  "type": "has_only_phrase",
                  "uuid": "c2826aa1-64c6-44a4-89a0-f7148bacbc5d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "409a4a34-45d7-4763-b8e6-b6c4f560f937",
                  "name": "All Responses",
                  "uuid": "9f9342df-4f21-475b-bf86-57e4c88e3d4a"
                },
                {
                  "exit_uuid": "e62e9da2-c633-4bc5-b3fe-cef08de20137",
                  "name": "No",
                  "uuid": "8dd7d8b2-ea88-411c-86cf-7aeda73bd057"
                },
                {
                  "exit_uuid": "2c940004-728d-46f1-922b-fcb5f88f9502",
                  "name": "Yes",
                  "uuid": "5fb0fa54-7689-442a-8f39-715fa249cb11"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "409a4a34-45d7-4763-b8e6-b6c4f560f937",
                "destination_uuid": null
              },
              {
                "uuid": "e62e9da2-c633-4bc5-b3fe-cef08de20137",
                "destination_uuid": "9722acff-3144-4d8c-bfe2-dc0e670a7f8a"
              },
              {
                "uuid": "2c940004-728d-46f1-922b-fcb5f88f9502",
                "destination_uuid": "c5ee3f9b-a8d0-4228-8b23-045feb61cf72"
              }
            ]
          },
          {
            "uuid": "9722acff-3144-4d8c-bfe2-dc0e670a7f8a",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4b2cee75-9334-4125-9a48-012ac1b12d51"
              }
            ],
            "exits": [
              {
                "uuid": "ab6cabfd-caa3-45d0-a6e3-288cdc85e88a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "c5ee3f9b-a8d0-4228-8b23-045feb61cf72",
            "actions": [
              {
                "attachments": [],
                "text": "What other challenges did you have when trying to spend time with your teen? ",
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
                "uuid": "a3fb5ca3-2d5d-470a-a7b9-f188f6d11d79"
              }
            ],
            "exits": [
              {
                "uuid": "b5d18015-d201-4742-b686-b4d999fea7ae",
                "destination_uuid": "d6fddc3d-b20b-43e3-8221-42be87e620ab"
              }
            ]
          },
          {
            "uuid": "d6fddc3d-b20b-43e3-8221-42be87e620ab",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "86510b39-0007-4827-982b-c6131fc7ea1a",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "1a8ac45d-6863-4cbe-8869-528ee37f00e1",
                  "type": "has_only_phrase",
                  "uuid": "d6f366f5-7b92-4a0c-bd01-bc8a65701e0e"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "36a74c3c-8dd8-49b4-bee6-c6f3ba13a0d4",
                  "type": "has_only_phrase",
                  "uuid": "bde78f36-0192-47e5-a45c-b5fca220c8d4"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "bcdff90f-e339-40c4-9308-2826a5b8999b",
                  "type": "has_only_phrase",
                  "uuid": "917ee9ef-09e5-4234-90ba-60e016c624b8"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "4bcc8705-0857-41bf-894a-9a9ce8e94897",
                  "type": "has_only_phrase",
                  "uuid": "9030713b-c078-42ef-9ea2-21e25b2890a0"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "4dcad94a-ab47-4c9c-bdc6-37bcd363a8e3",
                  "type": "has_only_phrase",
                  "uuid": "3ae7037e-129a-49e7-9de1-dba32eb1caf5"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "0aede970-b1de-46fa-8816-23704f4af458",
                  "type": "has_only_phrase",
                  "uuid": "9a7aa033-4c4a-4215-9d7d-117db83f9708"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "79f64f18-e035-4a9e-a76a-4a408039a527",
                  "type": "has_only_phrase",
                  "uuid": "32ddb855-a25d-443c-aa9b-52981578b50d"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "bf603f57-8311-4df3-954f-a514c6f30744",
                  "type": "has_only_phrase",
                  "uuid": "826673ea-f24f-4bc2-84eb-6f20e0e61700"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dd851310-e486-4c01-a00c-1f6ffd4e8fb8",
                  "name": "All Responses",
                  "uuid": "86510b39-0007-4827-982b-c6131fc7ea1a"
                },
                {
                  "exit_uuid": "eecd0986-bc4a-4558-95c1-be8f4fb216a6",
                  "name": "I don’t have enough time",
                  "uuid": "1a8ac45d-6863-4cbe-8869-528ee37f00e1"
                },
                {
                  "exit_uuid": "744cd4a6-85aa-4a4a-a62c-595e6a8dc8b5",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "36a74c3c-8dd8-49b4-bee6-c6f3ba13a0d4"
                },
                {
                  "exit_uuid": "c89cbfc9-3920-43a5-a396-abcd2cd56e98",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "bcdff90f-e339-40c4-9308-2826a5b8999b"
                },
                {
                  "exit_uuid": "90353354-3718-4ecd-abcc-ffcb13904a7f",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "4bcc8705-0857-41bf-894a-9a9ce8e94897"
                },
                {
                  "exit_uuid": "5d0248d2-c372-4534-8323-e942b85680ff",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "4dcad94a-ab47-4c9c-bdc6-37bcd363a8e3"
                },
                {
                  "exit_uuid": "0c38b7de-1582-4680-ad88-4b211a6e24d0",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "0aede970-b1de-46fa-8816-23704f4af458"
                },
                {
                  "exit_uuid": "86a7cffb-285f-490e-a595-6d623a602191",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "79f64f18-e035-4a9e-a76a-4a408039a527"
                },
                {
                  "exit_uuid": "8bd60970-35d7-4c5d-83ac-7ba6f195717e",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "bf603f57-8311-4df3-954f-a514c6f30744"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "dd851310-e486-4c01-a00c-1f6ffd4e8fb8",
                "destination_uuid": null
              },
              {
                "uuid": "eecd0986-bc4a-4558-95c1-be8f4fb216a6",
                "destination_uuid": "fc418950-e3cc-4c4d-b7c5-0d88ea32d975"
              },
              {
                "uuid": "744cd4a6-85aa-4a4a-a62c-595e6a8dc8b5",
                "destination_uuid": "42c68631-9ebf-43d8-8fc5-b29eb8206b5a"
              },
              {
                "uuid": "c89cbfc9-3920-43a5-a396-abcd2cd56e98",
                "destination_uuid": "66d1ed01-088d-446f-b3e6-0fb2bfe9f753"
              },
              {
                "uuid": "90353354-3718-4ecd-abcc-ffcb13904a7f",
                "destination_uuid": "cdc9d941-f99e-4fc8-8986-2c66150d1845"
              },
              {
                "uuid": "5d0248d2-c372-4534-8323-e942b85680ff",
                "destination_uuid": "4d12e2c1-ee23-4ade-ac2c-bceaa867f1a3"
              },
              {
                "uuid": "0c38b7de-1582-4680-ad88-4b211a6e24d0",
                "destination_uuid": "9476dcbc-87b3-40c4-862b-3a88cd2afd9f"
              },
              {
                "uuid": "86a7cffb-285f-490e-a595-6d623a602191",
                "destination_uuid": "e33c36c2-7c53-4e9f-a9da-accf966db1da"
              },
              {
                "uuid": "8bd60970-35d7-4c5d-83ac-7ba6f195717e",
                "destination_uuid": "bc90c075-7e5e-40cc-a4c4-3147bbf33ffc"
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
        "uuid": "42e2d3fe-651f-4422-80ed-1628da33bada",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "db4a58b8-87b4-4799-97a5-cd142d9dfb52",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3b716937-c6fd-4e85-a661-9a02f6c769cf"
              }
            ],
            "exits": [
              {
                "uuid": "e7ce2565-e8fa-4723-b353-3a265937998b",
                "destination_uuid": "26352978-09cd-4d9c-8897-fa44d2509f01"
              }
            ]
          },
          {
            "uuid": "26352978-09cd-4d9c-8897-fa44d2509f01",
            "actions": [
              {
                "attachments": [],
                "text": "How does it make you feel when I say that?   https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "slight smile",
                  "moderate smile",
                  "big smile"
                ],
                "uuid": "fc7b5381-e4b5-4cc5-b54c-1f0039327ab1"
              }
            ],
            "exits": [
              {
                "uuid": "2034f0f1-4f6c-4444-906d-e4719dcf01f3",
                "destination_uuid": "1a01161e-cd93-435a-9252-9a891f80bf65"
              }
            ]
          },
          {
            "uuid": "1a01161e-cd93-435a-9252-9a891f80bf65",
            "actions": [],
            "exits": [
              {
                "uuid": "cfd30069-c139-4fa5-b13f-96070d6fa86e",
                "destination_uuid": "dae8967c-cc60-4e6b-a66f-2c6446a883aa"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "33cfafab-d2f3-40e1-8fb7-a58754200eb0",
              "cases": [],
              "categories": [
                {
                  "uuid": "33cfafab-d2f3-40e1-8fb7-a58754200eb0",
                  "name": "All Responses",
                  "exit_uuid": "cfd30069-c139-4fa5-b13f-96070d6fa86e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "smile_1"
            }
          },
          {
            "uuid": "dae8967c-cc60-4e6b-a66f-2c6446a883aa",
            "actions": [
              {
                "uuid": "353841e4-bcda-43a8-9ddc-bf5186bfce3e",
                "type": "set_contact_field",
                "field": {
                  "key": "smile_1",
                  "name": "smile_1"
                },
                "value": "@results.smile_1"
              }
            ],
            "exits": [
              {
                "uuid": "bf4d7a46-a9c2-4702-aa04-0e915dd769d9",
                "destination_uuid": "05f81d81-b134-446b-b670-14ee6d5c382b"
              }
            ]
          },
          {
            "uuid": "05f81d81-b134-446b-b670-14ee6d5c382b",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7e8a1ca8-b84b-4dfe-b7e1-86f29d1b2264"
              }
            ],
            "exits": [
              {
                "uuid": "b11a1501-0d8e-4eb6-a243-097ab0975258",
                "destination_uuid": "98e896b6-b905-4cf1-bb83-1b14d48f816c"
              }
            ]
          },
          {
            "uuid": "98e896b6-b905-4cf1-bb83-1b14d48f816c",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "794664f0-e88d-457f-a09b-ccf81ef73739"
              }
            ],
            "exits": [
              {
                "uuid": "883d6ccf-e6d9-4794-a94c-ad95a7aa60d9",
                "destination_uuid": "fb890ba3-3737-45e4-a6f7-683c56bc85be"
              }
            ]
          },
          {
            "uuid": "fb890ba3-3737-45e4-a6f7-683c56bc85be",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "75a14ef6-134a-4cde-ac32-efc3922a56dd"
              }
            ],
            "exits": [
              {
                "uuid": "8a796499-6d29-4360-896f-5e215776cee7",
                "destination_uuid": "85e29202-5840-4a86-8f6d-71b37484b833"
              }
            ]
          },
          {
            "uuid": "85e29202-5840-4a86-8f6d-71b37484b833",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "deb208fa-d622-4ec9-942d-8f7770d86c28"
              }
            ],
            "exits": [
              {
                "uuid": "c47dfb04-e6bb-4653-8c96-f326e1e974bb",
                "destination_uuid": "84edf6af-2674-4d54-896a-a505bc9ef4db"
              }
            ]
          },
          {
            "uuid": "84edf6af-2674-4d54-896a-a505bc9ef4db",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d9adb4bb-bd96-4a76-a955-6848d64af51a",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "5e18a89a-bf39-4912-b055-ffe0d2a1f4fe",
                  "type": "has_only_phrase",
                  "uuid": "0f6af24e-cd10-42fd-b203-435c5f08c33a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "beb5a521-9381-4a39-b340-d33e67d41f33",
                  "name": "All Responses",
                  "uuid": "d9adb4bb-bd96-4a76-a955-6848d64af51a"
                },
                {
                  "exit_uuid": "711ecb6d-382d-4468-8b8f-fda9e3acdf85",
                  "name": "Let me hear your story",
                  "uuid": "5e18a89a-bf39-4912-b055-ffe0d2a1f4fe"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "beb5a521-9381-4a39-b340-d33e67d41f33",
                "destination_uuid": null
              },
              {
                "uuid": "711ecb6d-382d-4468-8b8f-fda9e3acdf85",
                "destination_uuid": "bd7fe24d-7a4e-41a4-bd1f-71e80b907f4d"
              }
            ]
          },
          {
            "uuid": "bd7fe24d-7a4e-41a4-bd1f-71e80b907f4d",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Module2/Praise_IS01.svg"
                ],
                "text": "I was busy cooking and my one daughter @fields.neighbour_young_daughter was doing her homework. She was practicing reading her book out loud and her sister @fields.neighbour_teen_daughter was helping her:  https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "853a17a8-7173-44ff-84dc-54e98b5cc870"
              }
            ],
            "exits": [
              {
                "uuid": "940089de-5847-4d5c-be2d-a0579f93d4db",
                "destination_uuid": "9f21acd6-2ecd-4f8f-af8f-c0c839db66ca"
              }
            ]
          },
          {
            "uuid": "9f21acd6-2ecd-4f8f-af8f-c0c839db66ca",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Module2/Praise_IS01.svg"
                ],
                "text": "@fields.neighbour_young_daughter(struggling over a difficult word): \"The girl braw – broo – brought the ball to her brother\" https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "28c21f75-d6e7-4738-8c79-d9c2ac3ca9e7"
              }
            ],
            "exits": [
              {
                "uuid": "299b3fb9-a256-4933-929a-99ea415bf8f8",
                "destination_uuid": "17b2f7a8-ef5d-4ad8-b1ab-9b4ed3569dd1"
              }
            ]
          },
          {
            "uuid": "17b2f7a8-ef5d-4ad8-b1ab-9b4ed3569dd1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c0b7d745-099c-4027-a7c2-2c0891392a31",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "16a1cff3-b4bc-4f5d-8ea6-d905162dbc92",
                  "type": "has_only_phrase",
                  "uuid": "75a96084-de48-4ebe-a874-d0e4168ea772"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "4fc7286f-8992-46a6-94b5-11e5a5a3c79a",
                  "type": "has_only_phrase",
                  "uuid": "f10616a4-0759-4ae9-817f-4acb01cfec96"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1f9d79db-e50a-43d8-a14a-76928921d03f",
                  "name": "All Responses",
                  "uuid": "c0b7d745-099c-4027-a7c2-2c0891392a31"
                },
                {
                  "exit_uuid": "21aa0d86-ebc7-44bc-9f3b-0641c6e1b901",
                  "name": "Previous",
                  "uuid": "16a1cff3-b4bc-4f5d-8ea6-d905162dbc92"
                },
                {
                  "exit_uuid": "78d47ec6-b8af-4adb-88da-e86243bf6ea9",
                  "name": "Next",
                  "uuid": "4fc7286f-8992-46a6-94b5-11e5a5a3c79a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1f9d79db-e50a-43d8-a14a-76928921d03f",
                "destination_uuid": null
              },
              {
                "uuid": "21aa0d86-ebc7-44bc-9f3b-0641c6e1b901",
                "destination_uuid": "bd7fe24d-7a4e-41a4-bd1f-71e80b907f4d"
              },
              {
                "uuid": "78d47ec6-b8af-4adb-88da-e86243bf6ea9",
                "destination_uuid": "df36f4df-e23b-40e9-aa51-505eefd55fcd"
              }
            ]
          },
          {
            "uuid": "df36f4df-e23b-40e9-aa51-505eefd55fcd",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Module2/Praise_IS02.svg"
                ],
                "text": "@fields.neighbour_teen_daughter: \"@fields.neighbour_young_daughter! Well done! You read well! Keep reading! The more you practice the better you will get.\" https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "7a984fc8-5800-46d4-8935-a444d3ad3c8e"
              }
            ],
            "exits": [
              {
                "uuid": "a98d8bdb-f779-4668-b444-4efae134916b",
                "destination_uuid": "801b4426-365b-4d5b-b77b-4bd816b53fff"
              }
            ]
          },
          {
            "uuid": "801b4426-365b-4d5b-b77b-4bd816b53fff",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0ccaba05-b786-4290-ac5d-05abd2c1574c",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "9c633968-a84c-4e47-aa38-d821e527240c",
                  "type": "has_only_phrase",
                  "uuid": "e5817dad-fd57-44c7-b22d-8cd5983ced1c"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "abcb3693-bdfb-4f5a-9712-d6a79888e3bc",
                  "type": "has_only_phrase",
                  "uuid": "4d4e1dd1-b19d-4e49-bb16-da25b90a11b7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c9f09a5c-e18b-4b17-a093-fd45e9795ca0",
                  "name": "All Responses",
                  "uuid": "0ccaba05-b786-4290-ac5d-05abd2c1574c"
                },
                {
                  "exit_uuid": "abcc12ba-1143-4eb2-a67d-6025dd976997",
                  "name": "Previous",
                  "uuid": "9c633968-a84c-4e47-aa38-d821e527240c"
                },
                {
                  "exit_uuid": "4227041c-acce-41ca-9372-6244867bc01e",
                  "name": "Next",
                  "uuid": "abcb3693-bdfb-4f5a-9712-d6a79888e3bc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c9f09a5c-e18b-4b17-a093-fd45e9795ca0",
                "destination_uuid": null
              },
              {
                "uuid": "abcc12ba-1143-4eb2-a67d-6025dd976997",
                "destination_uuid": "9f21acd6-2ecd-4f8f-af8f-c0c839db66ca"
              },
              {
                "uuid": "4227041c-acce-41ca-9372-6244867bc01e",
                "destination_uuid": "334f7e50-527f-480b-b42d-9e860f7a926b"
              }
            ]
          },
          {
            "uuid": "334f7e50-527f-480b-b42d-9e860f7a926b",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Module2/Praise_IS03.svg"
                ],
                "text": "@fields.neighbour: \"I am very proud of my two daughters. @fields.neighbour_young_daughter , you are working so hard, I know reading is not easy. And thank you very much @fields.neighbour_teen_daughter for helping your sister so I can cook. You are a big help to me.\" https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "868acdd5-80c9-4625-8baa-dfb9bbbf891f"
              }
            ],
            "exits": [
              {
                "uuid": "bc3203f3-74f0-4111-9216-d2da36097852",
                "destination_uuid": "53290f3b-85ca-4030-a5d0-411568d4d56b"
              }
            ]
          },
          {
            "uuid": "53290f3b-85ca-4030-a5d0-411568d4d56b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "61019114-bf79-4ad2-8cb4-311c62a37a90",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "8fcc8888-c6f6-4494-a66d-9e9fc8fe8a86",
                  "type": "has_only_phrase",
                  "uuid": "164a389e-4371-44d3-8ac6-c6cd225d243e"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "e81c4fe3-5b1d-4953-885e-bd416536775e",
                  "type": "has_only_phrase",
                  "uuid": "8e797129-164a-42a1-aeb5-2443dd611786"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c15e5e7f-951e-471b-b4e9-0e25e1375db7",
                  "name": "All Responses",
                  "uuid": "61019114-bf79-4ad2-8cb4-311c62a37a90"
                },
                {
                  "exit_uuid": "0a39b3a3-1139-434d-86ac-644fba27bafb",
                  "name": "Previous",
                  "uuid": "8fcc8888-c6f6-4494-a66d-9e9fc8fe8a86"
                },
                {
                  "exit_uuid": "2a5f5dd3-29f7-4fd0-b59f-1ff1aae47830",
                  "name": "Next",
                  "uuid": "e81c4fe3-5b1d-4953-885e-bd416536775e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c15e5e7f-951e-471b-b4e9-0e25e1375db7",
                "destination_uuid": null
              },
              {
                "uuid": "0a39b3a3-1139-434d-86ac-644fba27bafb",
                "destination_uuid": "df36f4df-e23b-40e9-aa51-505eefd55fcd"
              },
              {
                "uuid": "2a5f5dd3-29f7-4fd0-b59f-1ff1aae47830",
                "destination_uuid": "fe08ce1d-e6d3-4bf3-9c6d-33f2ba3e0c1d"
              }
            ]
          },
          {
            "uuid": "fe08ce1d-e6d3-4bf3-9c6d-33f2ba3e0c1d",
            "actions": [
              {
                "attachments": [],
                "text": "That's great right? How do you think what I said  made both my daughters feel?  https://plh-demo1.idems.international/chat/msg-info?character=Neighbour&choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "slight smile",
                  "moderate smile",
                  "big smile"
                ],
                "uuid": "b9700930-37e5-432b-a4ec-4db930afe663"
              }
            ],
            "exits": [
              {
                "uuid": "e21013bf-2052-4f51-8064-af0f11993843",
                "destination_uuid": "41789409-60dd-40ae-9713-7f248e2b799f"
              }
            ]
          },
          {
            "uuid": "41789409-60dd-40ae-9713-7f248e2b799f",
            "actions": [],
            "exits": [
              {
                "uuid": "90437405-f625-46e9-9ab2-d234f3131f05",
                "destination_uuid": "4eb901d6-9640-4fc7-9fcd-d0cd69449642"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "183610f7-0504-402a-989c-88b69d0c53ff",
              "cases": [],
              "categories": [
                {
                  "uuid": "183610f7-0504-402a-989c-88b69d0c53ff",
                  "name": "All Responses",
                  "exit_uuid": "90437405-f625-46e9-9ab2-d234f3131f05"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "smile_2"
            }
          },
          {
            "uuid": "4eb901d6-9640-4fc7-9fcd-d0cd69449642",
            "actions": [
              {
                "uuid": "1c489c21-eb2c-42f3-bef7-cc336a9b632c",
                "type": "set_contact_field",
                "field": {
                  "key": "smile_2",
                  "name": "smile_2"
                },
                "value": "@results.smile_2"
              }
            ],
            "exits": [
              {
                "uuid": "f6546e2d-3681-4a27-b62c-d86bf6c3f56a",
                "destination_uuid": "e60f4d8b-2632-40de-8f95-c284eb6ba0cd"
              }
            ]
          },
          {
            "uuid": "e60f4d8b-2632-40de-8f95-c284eb6ba0cd",
            "actions": [
              {
                "attachments": [],
                "text": "Why do you think I told them that I appreciated \nwhat they were doing? https://plh-demo1.idems.international/chat/msg-info?chooseMulti=true",
                "type": "send_msg",
                "quick_replies": [
                  "To get them to do it more often",
                  "To help me finish my work",
                  "To make them feel good",
                  "To make me feel good"
                ],
                "uuid": "0436ce86-1bff-4786-9b14-c0b3705ce79c"
              }
            ],
            "exits": [
              {
                "uuid": "86b2ca53-74f7-4f28-be83-c54247656949",
                "destination_uuid": "7b18f05b-f3ee-4fa9-a70e-672ed67bf237"
              }
            ]
          },
          {
            "uuid": "7b18f05b-f3ee-4fa9-a70e-672ed67bf237",
            "actions": [],
            "exits": [
              {
                "uuid": "88a92afa-22aa-4823-962b-16616eb742c8",
                "destination_uuid": "8aac4efd-aa99-47de-afba-a0f3ee27c70c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8cc00c0b-2e6c-4527-ab4d-b8c9240e0e3b",
              "cases": [],
              "categories": [
                {
                  "uuid": "8cc00c0b-2e6c-4527-ab4d-b8c9240e0e3b",
                  "name": "All Responses",
                  "exit_uuid": "88a92afa-22aa-4823-962b-16616eb742c8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "appreciate"
            }
          },
          {
            "uuid": "8aac4efd-aa99-47de-afba-a0f3ee27c70c",
            "actions": [
              {
                "uuid": "dcc42769-0436-416a-83b5-4d7e5aae0e16",
                "type": "set_contact_field",
                "field": {
                  "key": "appreciate",
                  "name": "appreciate"
                },
                "value": "@results.appreciate"
              }
            ],
            "exits": [
              {
                "uuid": "db1cde18-5f55-49f1-86fd-52253be14bfb",
                "destination_uuid": "98a21914-f58e-4de9-b741-0b2a322d32fb"
              }
            ]
          },
          {
            "uuid": "98a21914-f58e-4de9-b741-0b2a322d32fb",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6a211d8e-706b-4896-a665-7daa27f7dc32"
              }
            ],
            "exits": [
              {
                "uuid": "2a34b64d-0ce8-45f4-aced-76b92c13e8cc",
                "destination_uuid": "7a192c93-31d3-427b-864f-79df960ab810"
              }
            ]
          },
          {
            "uuid": "7a192c93-31d3-427b-864f-79df960ab810",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "55d48390-2070-45f0-82be-646b80aba255"
              }
            ],
            "exits": [
              {
                "uuid": "ca1a63a0-5c59-483a-8643-39562b9d7e70",
                "destination_uuid": "254e48d9-6c3a-4446-a71f-ad878f00d43d"
              }
            ]
          },
          {
            "uuid": "254e48d9-6c3a-4446-a71f-ad878f00d43d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "85d9de22-5ead-4d37-bc41-926da3453e13",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "1f23a474-6e95-465c-8e80-91da0e9bf369",
                  "type": "has_only_phrase",
                  "uuid": "be105be4-be13-4752-b32e-a66ebff4b125"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "7f553e5a-1e95-488f-8579-fc9a336cf5a1",
                  "type": "has_only_phrase",
                  "uuid": "755b3cd9-e84a-450a-a5ed-b12f62ecd08d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "16c57a95-f5e4-4772-b4b9-66caac3c472a",
                  "name": "All Responses",
                  "uuid": "85d9de22-5ead-4d37-bc41-926da3453e13"
                },
                {
                  "exit_uuid": "5ab6a8ef-d916-426c-abaa-53433e8abcc7",
                  "name": "Take me to Tips",
                  "uuid": "1f23a474-6e95-465c-8e80-91da0e9bf369"
                },
                {
                  "exit_uuid": "8cfa9bbd-166a-476d-9393-c34f126cd78d",
                  "name": "Take me to Homescreen",
                  "uuid": "7f553e5a-1e95-488f-8579-fc9a336cf5a1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "16c57a95-f5e4-4772-b4b9-66caac3c472a",
                "destination_uuid": null
              },
              {
                "uuid": "5ab6a8ef-d916-426c-abaa-53433e8abcc7",
                "destination_uuid": "516f83fb-db8b-4538-bd29-5e731cd3f540"
              },
              {
                "uuid": "8cfa9bbd-166a-476d-9393-c34f126cd78d",
                "destination_uuid": "0913615a-2e4e-42dc-82b3-59a122857b29"
              }
            ]
          },
          {
            "uuid": "516f83fb-db8b-4538-bd29-5e731cd3f540",
            "actions": [
              {
                "uuid": "a04f0e5d-a4a8-42e7-b488-a0860e1741da",
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
                "uuid": "e941a2c8-0af9-481b-80af-0730be7c9d30",
                "destination_uuid": "4005d5da-83be-4d2e-ab22-d999a2b3809a"
              }
            ]
          },
          {
            "uuid": "4005d5da-83be-4d2e-ab22-d999a2b3809a",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "35a1d5e1-df10-4441-9c90-2ee2a4f8b358"
                },
                "type": "enter_flow",
                "uuid": "ff4e9887-a584-462c-805f-95c93d3b929c"
              }
            ],
            "exits": [
              {
                "uuid": "d6a88417-4e67-4441-8160-519a2787e846",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "0913615a-2e4e-42dc-82b3-59a122857b29",
            "actions": [
              {
                "uuid": "6877a050-6339-4452-8cec-a953f772d0d3",
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
                "uuid": "2e084f55-fd09-47c4-8a3c-79befedc3c9d",
                "destination_uuid": "d0ded4e7-23ae-4312-8e70-d3e2911b4b55"
              }
            ]
          },
          {
            "uuid": "d0ded4e7-23ae-4312-8e70-d3e2911b4b55",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "2b87ecb3-e02c-4e0a-a7ed-04b698f83833"
                },
                "type": "enter_flow",
                "uuid": "74000dd0-3ba4-4a2c-8570-ad9015cf55a7"
              }
            ],
            "exits": [
              {
                "uuid": "74cf06eb-ba47-403b-b4c0-4b24c7ac740c",
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
        "uuid": "984a64ad-2963-43f1-aae1-f522a35c834c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "fe3b0f6b-839d-4691-9668-565848cc1eb1",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c2739572-63f1-4040-b59e-1c90d6d4772f"
              }
            ],
            "exits": [
              {
                "uuid": "4457fd8b-a8ac-4307-a55b-13b609603e93",
                "destination_uuid": "d1e28ba2-f599-4813-afe0-0f2bd8eb5101"
              }
            ]
          },
          {
            "uuid": "d1e28ba2-f599-4813-afe0-0f2bd8eb5101",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "92ac33a1-6fc2-4b7c-ad09-f477af4a1416"
              }
            ],
            "exits": [
              {
                "uuid": "d365cd87-0e11-483f-99f2-de2581af5554",
                "destination_uuid": "ca804b15-5a3e-4043-839b-c9f2bb69bef4"
              }
            ]
          },
          {
            "uuid": "ca804b15-5a3e-4043-839b-c9f2bb69bef4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "dc609f5b-4b61-4c34-8403-28b57e46f93f",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "da893212-4113-46d9-b06b-53152a4fa1de",
                  "type": "has_only_phrase",
                  "uuid": "4118b3c1-1e3d-4d2d-8a52-cd73a168596b"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "fb534ce0-a448-48e2-947f-1fb38a866a82",
                  "type": "has_only_phrase",
                  "uuid": "d2b089b5-97d4-4fcc-9b7f-d72923bd920b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "363419fc-ea34-4395-b2a9-65fcd50acecf",
                  "name": "All Responses",
                  "uuid": "dc609f5b-4b61-4c34-8403-28b57e46f93f"
                },
                {
                  "exit_uuid": "644b59c3-b0c8-493e-9ec6-ca7313ec8baf",
                  "name": "Later",
                  "uuid": "da893212-4113-46d9-b06b-53152a4fa1de"
                },
                {
                  "exit_uuid": "acc5e287-606b-44cf-8e6a-841f45c804a4",
                  "name": "Yes",
                  "uuid": "fb534ce0-a448-48e2-947f-1fb38a866a82"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "363419fc-ea34-4395-b2a9-65fcd50acecf",
                "destination_uuid": null
              },
              {
                "uuid": "644b59c3-b0c8-493e-9ec6-ca7313ec8baf",
                "destination_uuid": "549feee2-b55a-4c32-b975-38de6e478bfd"
              },
              {
                "uuid": "acc5e287-606b-44cf-8e6a-841f45c804a4",
                "destination_uuid": "6a0d9a67-3170-44c6-8a56-3ae93cbb1d38"
              }
            ]
          },
          {
            "uuid": "549feee2-b55a-4c32-b975-38de6e478bfd",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "cf7cd2b4-4f1e-4a8e-a625-ffdb4009f796"
                },
                "type": "enter_flow",
                "uuid": "dae157fb-d013-4090-aa63-302e6ef5f117"
              }
            ],
            "exits": [
              {
                "uuid": "1e608b3c-6b1b-4ba1-9629-6171767b16ec",
                "destination_uuid": null
              },
              {
                "uuid": "6da75faf-3b0b-406d-9618-3bcc961d950a",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "16ee7f6e-7f4c-4fb6-bdf0-4a6d082795f5",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "33b242c9-3176-4a49-821b-f515374119f1"
                },
                {
                  "uuid": "aaf223bb-a51e-4dc1-86ca-5e6deb2ea68a",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "faba396f-000f-4646-84f5-b83b324654f9"
                }
              ],
              "categories": [
                {
                  "uuid": "33b242c9-3176-4a49-821b-f515374119f1",
                  "name": "Complete",
                  "exit_uuid": "1e608b3c-6b1b-4ba1-9629-6171767b16ec"
                },
                {
                  "uuid": "faba396f-000f-4646-84f5-b83b324654f9",
                  "name": "Expired",
                  "exit_uuid": "6da75faf-3b0b-406d-9618-3bcc961d950a"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "33b242c9-3176-4a49-821b-f515374119f1"
            }
          },
          {
            "uuid": "6a0d9a67-3170-44c6-8a56-3ae93cbb1d38",
            "actions": [
              {
                "attachments": [],
                "text": "Parent – Which of the following things does your teen do well?  https://plh-demo1.idems.international/chat/msg-info?chooseMulti=true",
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
                "uuid": "bef6b2bf-b6f7-48ad-bfaa-8d97681b1c71"
              }
            ],
            "exits": [
              {
                "uuid": "c74b35f8-0a1e-4d13-ae6a-34ee9f57f778",
                "destination_uuid": "bae4f0d8-f3a5-41c3-a6b5-38e52fbf13f3"
              }
            ]
          },
          {
            "uuid": "bae4f0d8-f3a5-41c3-a6b5-38e52fbf13f3",
            "actions": [],
            "exits": [
              {
                "uuid": "2259c2e9-efb3-4130-8a36-22e11b4b59e8",
                "destination_uuid": "a4e37c4c-774e-4db4-b04d-c1873f85f81e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "25446181-cfc3-4ba2-9f1a-8e21d57bc1cb",
              "cases": [],
              "categories": [
                {
                  "uuid": "25446181-cfc3-4ba2-9f1a-8e21d57bc1cb",
                  "name": "All Responses",
                  "exit_uuid": "2259c2e9-efb3-4130-8a36-22e11b4b59e8"
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
            "uuid": "a4e37c4c-774e-4db4-b04d-c1873f85f81e",
            "actions": [
              {
                "uuid": "76987988-8923-478e-8e97-f29b7f14ce96",
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
                "uuid": "ba8c6922-e124-4a8b-894a-4a42560f5c5d",
                "destination_uuid": "140ccefe-bcd4-418c-8cb0-484e2fcff237"
              }
            ]
          },
          {
            "uuid": "140ccefe-bcd4-418c-8cb0-484e2fcff237",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "dcd1edb2-8e2d-4d24-aa8c-394edd417a3b"
              }
            ],
            "exits": [
              {
                "uuid": "606afdf9-2a22-4fe6-9f57-5a194dd66e62",
                "destination_uuid": "6f76c818-6e4f-42ca-83e8-398beae28e9e"
              }
            ]
          },
          {
            "uuid": "6f76c818-6e4f-42ca-83e8-398beae28e9e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "00ecbed4-299e-4ca6-bfc7-cb60f0b42517",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "9c2daf2f-404e-491a-8688-3f0884247e21",
                  "type": "has_only_phrase",
                  "uuid": "9bf524f1-5ce5-4012-9eee-57faf810c695"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e9ffbc21-fc0a-4459-b0cf-9c63f8228d98",
                  "name": "All Responses",
                  "uuid": "00ecbed4-299e-4ca6-bfc7-cb60f0b42517"
                },
                {
                  "exit_uuid": "7bd99691-ef21-43e8-bdc8-4c0dcb3bacc9",
                  "name": "Click here when done",
                  "uuid": "9c2daf2f-404e-491a-8688-3f0884247e21"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e9ffbc21-fc0a-4459-b0cf-9c63f8228d98",
                "destination_uuid": null
              },
              {
                "uuid": "7bd99691-ef21-43e8-bdc8-4c0dcb3bacc9",
                "destination_uuid": "1c8c701f-1518-4791-9a56-c77e087e6019"
              }
            ]
          },
          {
            "uuid": "1c8c701f-1518-4791-9a56-c77e087e6019",
            "actions": [
              {
                "attachments": [],
                "text": "Now it's your teen's turn to praise you!\nTeen – which things do you like about your parent?  https://plh-demo1.idems.international/chat/msg-info?chooseMulti=true",
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
                "uuid": "40eaa42e-ed81-4f98-adc2-5be779afa914"
              }
            ],
            "exits": [
              {
                "uuid": "11700b8f-17ee-4bfc-aacd-0aadfebd1517",
                "destination_uuid": "8711ba11-4ff2-425f-bda7-53640c3e30fa"
              }
            ]
          },
          {
            "uuid": "8711ba11-4ff2-425f-bda7-53640c3e30fa",
            "actions": [],
            "exits": [
              {
                "uuid": "64dc4caf-c87a-4d96-adf4-5432b057ba38",
                "destination_uuid": "5f3fad11-558b-491d-8245-1262c490d8cc"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "466461d4-5999-4bdf-bc62-7c3a1ec48c6a",
              "cases": [],
              "categories": [
                {
                  "uuid": "466461d4-5999-4bdf-bc62-7c3a1ec48c6a",
                  "name": "All Responses",
                  "exit_uuid": "64dc4caf-c87a-4d96-adf4-5432b057ba38"
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
            "uuid": "5f3fad11-558b-491d-8245-1262c490d8cc",
            "actions": [
              {
                "uuid": "adaf322e-c3d7-44c1-b50a-348b578d30c5",
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
                "uuid": "1e3ab3cb-2771-48a3-bdef-3ddaa608ce12",
                "destination_uuid": "d8416173-74a0-4ab5-b9b5-ecf07ca91ef0"
              }
            ]
          },
          {
            "uuid": "d8416173-74a0-4ab5-b9b5-ecf07ca91ef0",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "73645bdc-e032-4988-b41f-2e26ebcc33c8"
              }
            ],
            "exits": [
              {
                "uuid": "ed4caceb-f3de-4d45-b49b-2e46e961e0c9",
                "destination_uuid": "b9c502c1-9ea3-407c-ae90-aa50c2c029a5"
              }
            ]
          },
          {
            "uuid": "b9c502c1-9ea3-407c-ae90-aa50c2c029a5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e23c6edf-fe52-4672-9a13-6b0a1ba6e953",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "3db535a8-2ae8-41fc-92f3-0e563c0c5928",
                  "type": "has_only_phrase",
                  "uuid": "6496aa1a-44a5-4412-89b5-8d527728a2d9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a3e22087-cde8-4fd4-92dd-d6b42570b374",
                  "name": "All Responses",
                  "uuid": "e23c6edf-fe52-4672-9a13-6b0a1ba6e953"
                },
                {
                  "exit_uuid": "f296325d-d706-4c77-ad1c-144416722178",
                  "name": "Click here when done",
                  "uuid": "3db535a8-2ae8-41fc-92f3-0e563c0c5928"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a3e22087-cde8-4fd4-92dd-d6b42570b374",
                "destination_uuid": null
              },
              {
                "uuid": "f296325d-d706-4c77-ad1c-144416722178",
                "destination_uuid": "cd80fd85-340b-4aca-962e-4f61ac0bb26e"
              }
            ]
          },
          {
            "uuid": "cd80fd85-340b-4aca-962e-4f61ac0bb26e",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "276cc7ad-f632-4c1f-ae4f-9dfb0ca7dc98"
              }
            ],
            "exits": [
              {
                "uuid": "bc058d16-6b71-4f2c-9041-39f2b0ce16c8",
                "destination_uuid": "f49801e3-ef11-4fde-8934-e665dd76dd9f"
              }
            ]
          },
          {
            "uuid": "f49801e3-ef11-4fde-8934-e665dd76dd9f",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "560a7a1f-b838-453c-bb12-45e7073d246c"
              }
            ],
            "exits": [
              {
                "uuid": "e135e907-c6c3-4879-ae09-28a0b92b449b",
                "destination_uuid": "118d295c-4891-4da3-9eee-aea39b65c901"
              }
            ]
          },
          {
            "uuid": "118d295c-4891-4da3-9eee-aea39b65c901",
            "actions": [
              {
                "attachments": [],
                "text": "Take a moment and think of one thing you have done recently that you have done well! Here are some ideas: \n\n\n",
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
                "uuid": "aeae4ab5-c4ef-471d-84f1-e16bf2532d86"
              }
            ],
            "exits": [
              {
                "uuid": "50919270-5f2a-4b5c-8e3d-f29333a87912",
                "destination_uuid": "9dda575f-4025-42a9-8d10-bbc1087117a4"
              }
            ]
          },
          {
            "uuid": "9dda575f-4025-42a9-8d10-bbc1087117a4",
            "actions": [],
            "exits": [
              {
                "uuid": "18b7b503-38f4-4e9e-a6cb-d1dca8e95768",
                "destination_uuid": "53ee10a3-cad0-4829-8310-e1b7786b6084"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9e5a0f6b-0b50-457b-bbbe-5439a7f8be07",
              "cases": [],
              "categories": [
                {
                  "uuid": "9e5a0f6b-0b50-457b-bbbe-5439a7f8be07",
                  "name": "All Responses",
                  "exit_uuid": "18b7b503-38f4-4e9e-a6cb-d1dca8e95768"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "self-praise"
            }
          },
          {
            "uuid": "53ee10a3-cad0-4829-8310-e1b7786b6084",
            "actions": [
              {
                "uuid": "d7e79562-1047-451d-90a4-1c7930f31834",
                "type": "set_contact_field",
                "field": {
                  "key": "self-praise",
                  "name": "self-praise"
                },
                "value": "@results.self-praise"
              }
            ],
            "exits": [
              {
                "uuid": "16ceca37-5250-4e0c-8be3-46cc97082de4",
                "destination_uuid": "7e35fc97-d483-44fc-8659-8c441343ff4e"
              }
            ]
          },
          {
            "uuid": "7e35fc97-d483-44fc-8659-8c441343ff4e",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "215d2a87-12e1-4b28-bb71-08991e0de17c"
              }
            ],
            "exits": [
              {
                "uuid": "eed97465-9a04-4e5d-b341-1274cef12ceb",
                "destination_uuid": "8b6a26b7-f47c-4d79-b9e0-5062613c394b"
              }
            ]
          },
          {
            "uuid": "8b6a26b7-f47c-4d79-b9e0-5062613c394b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9d04eca8-2669-4bb0-b91f-52f473160afc",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "c92b4c88-d28b-455e-9cb6-e5319ea5cfe8",
                  "type": "has_only_phrase",
                  "uuid": "d7b20723-9032-4787-af7a-6f7878dc8cfa"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "000cb452-d033-412a-8dc8-e25b57bf81e9",
                  "name": "All Responses",
                  "uuid": "9d04eca8-2669-4bb0-b91f-52f473160afc"
                },
                {
                  "exit_uuid": "7b4cc04e-5770-4c4e-b606-f025b608623d",
                  "name": "Take me to Homescreen",
                  "uuid": "c92b4c88-d28b-455e-9cb6-e5319ea5cfe8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "000cb452-d033-412a-8dc8-e25b57bf81e9",
                "destination_uuid": null
              },
              {
                "uuid": "7b4cc04e-5770-4c4e-b606-f025b608623d",
                "destination_uuid": "9bb51d99-99ca-4afa-875a-568ff6da06d9"
              }
            ]
          },
          {
            "uuid": "9bb51d99-99ca-4afa-875a-568ff6da06d9",
            "actions": [
              {
                "uuid": "0d4c0c8b-a560-4a2d-a2d7-45484a42fc0e",
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
                "uuid": "503d2e7e-ef0e-4fa7-928b-a05d9fb6ec98",
                "destination_uuid": "ba83f697-49d3-4565-af72-f6b2e1c634bf"
              }
            ]
          },
          {
            "uuid": "ba83f697-49d3-4565-af72-f6b2e1c634bf",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "14347629-beea-4696-9ff2-73a05faed0eb"
                },
                "type": "enter_flow",
                "uuid": "3ccb746f-d277-47e7-b3ee-d0d9af11e1db"
              }
            ],
            "exits": [
              {
                "uuid": "71662352-cbc0-4fa7-a437-42ff62566e5b",
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
        "uuid": "1236d441-0785-4c85-bdf4-a604d81ab553",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d90e9bda-09ef-4101-a56f-54108b734c98",
            "actions": [
              {
                "attachments": [],
                "text": "Your goal was to continue to spend time with your teen, and to PRAISE them when spending time together.  \n\nDid you manage to spend time with your teen this week? How did it go? https://plh-demo1.idems.international/chat/msg-info?character=Elder&choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "Great",
                  "Neutral",
                  "Bad"
                ],
                "uuid": "b592c72e-99b2-42e1-9aea-606780e85254"
              }
            ],
            "exits": [
              {
                "uuid": "1ae1f0d2-38ce-43eb-b5e8-4d71e278209b",
                "destination_uuid": "01d404a7-d6ce-4be4-baa4-2836e9f92ab5"
              }
            ]
          },
          {
            "uuid": "01d404a7-d6ce-4be4-baa4-2836e9f92ab5",
            "actions": [],
            "exits": [
              {
                "uuid": "52b19621-5116-44e9-a69e-4f5948fc357e",
                "destination_uuid": "8da96ca7-0277-46c2-ba3c-7701d1af45c5"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "1c35916f-cc56-4196-8c48-b42edb89de11",
              "cases": [],
              "categories": [
                {
                  "uuid": "1c35916f-cc56-4196-8c48-b42edb89de11",
                  "name": "All Responses",
                  "exit_uuid": "52b19621-5116-44e9-a69e-4f5948fc357e"
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
            "uuid": "8da96ca7-0277-46c2-ba3c-7701d1af45c5",
            "actions": [
              {
                "uuid": "e9f18e76-2a98-44e0-bfcf-a4bc844cc299",
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
                "uuid": "c3e36f75-e2ec-4186-b9a8-ce0481a192fc",
                "destination_uuid": "a2af88d2-577a-414f-bf14-33d962d635a2"
              }
            ]
          },
          {
            "uuid": "a2af88d2-577a-414f-bf14-33d962d635a2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5c90b556-07a6-496e-9388-cdd73288400e",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "86738f9d-39ba-4130-8e4c-3f3ccdc5aeb9",
                  "type": "has_only_phrase",
                  "uuid": "3be5cf9f-6ec8-4046-bcf2-3b1eb37bae66"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "ad411ce0-9466-42ee-8b89-5f5984d8ce20",
                  "type": "has_only_phrase",
                  "uuid": "5b3a370c-5f0a-4018-a832-b7c9abd57ee3"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "ad411ce0-9466-42ee-8b89-5f5984d8ce20",
                  "type": "has_only_phrase",
                  "uuid": "c5ab7891-9683-4f03-a219-f3043df73f79"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "bdf3444f-a0e5-4269-9290-980b30147682",
                  "name": "All Responses",
                  "uuid": "5c90b556-07a6-496e-9388-cdd73288400e"
                },
                {
                  "exit_uuid": "8398418d-55e0-463b-b7fd-470a7497ae83",
                  "name": "Great",
                  "uuid": "86738f9d-39ba-4130-8e4c-3f3ccdc5aeb9"
                },
                {
                  "exit_uuid": "265f111b-eb11-4715-9645-46d87bcbf8dd",
                  "name": "Neutral; Bad",
                  "uuid": "ad411ce0-9466-42ee-8b89-5f5984d8ce20"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "bdf3444f-a0e5-4269-9290-980b30147682",
                "destination_uuid": null
              },
              {
                "uuid": "8398418d-55e0-463b-b7fd-470a7497ae83",
                "destination_uuid": "8ccaeea9-05b5-48c4-ae75-f969ba88ceef"
              },
              {
                "uuid": "265f111b-eb11-4715-9645-46d87bcbf8dd",
                "destination_uuid": "981084fc-e5f3-49ab-8e0a-e1d65dd67b8b"
              }
            ]
          },
          {
            "uuid": "8ccaeea9-05b5-48c4-ae75-f969ba88ceef",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "19f45423-aafd-4fa4-a037-d6163cf2f2c9"
              }
            ],
            "exits": [
              {
                "uuid": "7d9aad84-15ef-42f7-9a98-cb8a06e3d80f",
                "destination_uuid": "3d75c0f6-40ff-47cb-b068-3deaa598c3d0"
              }
            ]
          },
          {
            "uuid": "981084fc-e5f3-49ab-8e0a-e1d65dd67b8b",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "29b772d6-ce97-45a4-a840-46de9dbd0714"
              }
            ],
            "exits": [
              {
                "uuid": "acd4af02-1993-47cd-b773-8b8be75077c9",
                "destination_uuid": "2927bcfc-a4e5-4b7a-a789-cf6f68653e23"
              }
            ]
          },
          {
            "uuid": "2927bcfc-a4e5-4b7a-a789-cf6f68653e23",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "135448b4-55eb-48f2-8824-e34c176486bf",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "dd9b9ce1-998b-4b62-a8a0-208cbc84aa61",
                  "type": "has_only_phrase",
                  "uuid": "e26d3adf-f920-4f90-ba47-32e52eea0fa2"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "8541944f-4016-4123-8a75-379865af6985",
                  "type": "has_only_phrase",
                  "uuid": "770e6522-867b-41fb-ab6e-bac470503382"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "69c8bf8f-89a1-41aa-b113-ffaf265e7d60",
                  "name": "All Responses",
                  "uuid": "135448b4-55eb-48f2-8824-e34c176486bf"
                },
                {
                  "exit_uuid": "cda5f442-14f6-49a8-956a-dda9870b88e9",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "dd9b9ce1-998b-4b62-a8a0-208cbc84aa61"
                },
                {
                  "exit_uuid": "af80bc53-e1b8-4ff5-8f77-95b8132efe12",
                  "name": "Continue",
                  "uuid": "8541944f-4016-4123-8a75-379865af6985"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "69c8bf8f-89a1-41aa-b113-ffaf265e7d60",
                "destination_uuid": null
              },
              {
                "uuid": "cda5f442-14f6-49a8-956a-dda9870b88e9",
                "destination_uuid": "7b79b878-4a5d-4f43-a7b9-b98cdb4718ce"
              },
              {
                "uuid": "af80bc53-e1b8-4ff5-8f77-95b8132efe12",
                "destination_uuid": "882836c7-de8b-40fd-ab48-57054e3cec9b"
              }
            ]
          },
          {
            "uuid": "7b79b878-4a5d-4f43-a7b9-b98cdb4718ce",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "e3b14c0b-12ff-4b14-94e3-86080ffc4e04"
                },
                "type": "enter_flow",
                "uuid": "bd0be52f-559c-4881-a594-d13d330d0b13"
              }
            ],
            "exits": [
              {
                "uuid": "222ad7f7-f42e-4800-a2c0-b1ae194606cb",
                "destination_uuid": "6087b88c-97a6-45c3-81dd-526c9db6c41a"
              },
              {
                "uuid": "ba4929a3-e384-483f-a3c1-6d1dc6579b3a",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e9233bd4-964c-4ab7-a9f5-da2b40cf7ed7",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "43b08ee5-21cc-4275-8c10-befbfccc3742"
                },
                {
                  "uuid": "c775f398-3002-4c97-9566-286c52be2e05",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d0da31d1-bcc5-4ed0-b1c8-7dbe7355e9c9"
                }
              ],
              "categories": [
                {
                  "uuid": "43b08ee5-21cc-4275-8c10-befbfccc3742",
                  "name": "Complete",
                  "exit_uuid": "222ad7f7-f42e-4800-a2c0-b1ae194606cb"
                },
                {
                  "uuid": "d0da31d1-bcc5-4ed0-b1c8-7dbe7355e9c9",
                  "name": "Expired",
                  "exit_uuid": "ba4929a3-e384-483f-a3c1-6d1dc6579b3a"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "43b08ee5-21cc-4275-8c10-befbfccc3742"
            }
          },
          {
            "uuid": "3d75c0f6-40ff-47cb-b068-3deaa598c3d0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d1aec1db-1ed9-4ebc-96a6-32992c98b1b7",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "920b425b-02c3-456c-ad3d-ece8634aec47",
                  "type": "has_only_phrase",
                  "uuid": "b2937f3f-e98d-4706-98c0-713db27fe38e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1ab9c6bd-68e8-4c27-ac97-904866efd8d8",
                  "name": "All Responses",
                  "uuid": "d1aec1db-1ed9-4ebc-96a6-32992c98b1b7"
                },
                {
                  "exit_uuid": "f559c9cc-ff55-45fa-a770-201e6bf48e40",
                  "name": "Go to Praise check-in",
                  "uuid": "920b425b-02c3-456c-ad3d-ece8634aec47"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1ab9c6bd-68e8-4c27-ac97-904866efd8d8",
                "destination_uuid": null
              },
              {
                "uuid": "f559c9cc-ff55-45fa-a770-201e6bf48e40",
                "destination_uuid": "ff9cc8b4-5787-46af-8801-54c46b677f72"
              }
            ]
          },
          {
            "uuid": "ff9cc8b4-5787-46af-8801-54c46b677f72",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "08e008bc-1981-471f-b0f5-7030a75299bd"
              }
            ],
            "exits": [
              {
                "uuid": "687e7a85-a2f4-44a3-9e93-f3c0a2c548b0",
                "destination_uuid": "64aaace7-bbb8-4055-9618-2f79656da9f1"
              }
            ]
          },
          {
            "uuid": "882836c7-de8b-40fd-ab48-57054e3cec9b",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "4314fc1c-1ed9-4b32-b5ba-f5659de0e0c4"
              }
            ],
            "exits": [
              {
                "uuid": "887a9266-b73a-4705-8c2e-b897825a869f",
                "destination_uuid": "64aaace7-bbb8-4055-9618-2f79656da9f1"
              }
            ]
          },
          {
            "uuid": "6087b88c-97a6-45c3-81dd-526c9db6c41a",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "b48150e4-3576-49a2-a641-cfe28401b894"
              }
            ],
            "exits": [
              {
                "uuid": "c88b81c4-a458-43a1-aa12-bea9d14620ea",
                "destination_uuid": "64aaace7-bbb8-4055-9618-2f79656da9f1"
              }
            ]
          },
          {
            "uuid": "64aaace7-bbb8-4055-9618-2f79656da9f1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8f11c320-e32d-42ee-95df-fb17e5095c5d",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "947791df-3809-4661-b891-9e03cf9c9a51",
                  "type": "has_only_phrase",
                  "uuid": "bc7d0db5-c624-41e4-af12-c48275bb47c5"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "ccb7faaa-eb9c-4e82-ac7d-bf13214577b3",
                  "type": "has_only_phrase",
                  "uuid": "4df9d342-c915-4cd1-ae86-1951423583d1"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "c8c469f1-9708-48f8-a408-fb225689760a",
                  "type": "has_only_phrase",
                  "uuid": "9e091061-972e-4e82-9f22-37d2743a42aa"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "b405930d-9b4b-4c35-99a0-010ce28eb838",
                  "type": "has_only_phrase",
                  "uuid": "daa8e138-51d0-442f-806a-c5f0ec749c60"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "af352f3c-b8df-4b47-a019-cf123b7fbaeb",
                  "name": "All Responses",
                  "uuid": "8f11c320-e32d-42ee-95df-fb17e5095c5d"
                },
                {
                  "exit_uuid": "081f2f11-7fab-4d49-aef2-19f621009573",
                  "name": "No",
                  "uuid": "947791df-3809-4661-b891-9e03cf9c9a51"
                },
                {
                  "exit_uuid": "f82998d6-3e4d-4d8c-a841-ac6bdb637504",
                  "name": "Yes",
                  "uuid": "ccb7faaa-eb9c-4e82-ac7d-bf13214577b3"
                },
                {
                  "exit_uuid": "231d0f71-2079-4691-bdcf-658cff757cf9",
                  "name": "Yes",
                  "uuid": "c8c469f1-9708-48f8-a408-fb225689760a"
                },
                {
                  "exit_uuid": "8a098bf3-334b-4c7d-b13b-370ec2f09e88",
                  "name": "Yes",
                  "uuid": "b405930d-9b4b-4c35-99a0-010ce28eb838"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "af352f3c-b8df-4b47-a019-cf123b7fbaeb",
                "destination_uuid": null
              },
              {
                "uuid": "081f2f11-7fab-4d49-aef2-19f621009573",
                "destination_uuid": "77055bff-96ce-4001-88d6-0a153850dedd"
              },
              {
                "uuid": "f82998d6-3e4d-4d8c-a841-ac6bdb637504",
                "destination_uuid": "cad3bc80-95ac-493e-8036-12dcfef7fa68"
              },
              {
                "uuid": "231d0f71-2079-4691-bdcf-658cff757cf9",
                "destination_uuid": "cad3bc80-95ac-493e-8036-12dcfef7fa68"
              },
              {
                "uuid": "8a098bf3-334b-4c7d-b13b-370ec2f09e88",
                "destination_uuid": "cad3bc80-95ac-493e-8036-12dcfef7fa68"
              }
            ]
          },
          {
            "uuid": "77055bff-96ce-4001-88d6-0a153850dedd",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2458d5c0-872e-4e17-b681-4cb3d0bbf926"
              }
            ],
            "exits": [
              {
                "uuid": "538ee7dd-0ca2-433e-87f1-acd65e700148",
                "destination_uuid": "c952fccc-1054-47ce-8291-fdac42779b49"
              }
            ]
          },
          {
            "uuid": "cad3bc80-95ac-493e-8036-12dcfef7fa68",
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
                "uuid": "9e6bc8cc-1417-45a2-b507-8882d0ef9826"
              }
            ],
            "exits": [
              {
                "uuid": "bafe1e7f-4b9d-4995-8a74-310da26a2264",
                "destination_uuid": "37415525-0bde-4361-a6e0-571200b2c9d4"
              }
            ]
          },
          {
            "uuid": "37415525-0bde-4361-a6e0-571200b2c9d4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c8135cde-fe41-431e-9a5e-5104dd2f87f4",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "a9eb6fd1-b1e7-4ebb-a74a-c6f6b915166d",
                  "type": "has_only_phrase",
                  "uuid": "e938a15a-7cae-499a-a6be-3eef785726ac"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "7d849e39-5d78-4676-91c9-e84d2e6d2216",
                  "type": "has_only_phrase",
                  "uuid": "0717c2f3-9bf0-43fb-af06-3e66e5b1fad5"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "db633db0-e77d-4405-8ee6-0823199e7914",
                  "type": "has_only_phrase",
                  "uuid": "abbd6146-1aaa-4db8-9931-9782ef4026c0"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "f4f2102b-a933-4163-8c30-7089ed47e476",
                  "type": "has_only_phrase",
                  "uuid": "c6015291-532e-426e-850b-511d5022e4f2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "58156d14-4f69-4d9c-b7af-4b089122ea4d",
                  "name": "All Responses",
                  "uuid": "c8135cde-fe41-431e-9a5e-5104dd2f87f4"
                },
                {
                  "exit_uuid": "bfceda55-de3f-41ef-a3f3-4aebaeee3335",
                  "name": "Surprised",
                  "uuid": "a9eb6fd1-b1e7-4ebb-a74a-c6f6b915166d"
                },
                {
                  "exit_uuid": "64c31dcb-7ede-49b5-9303-603aceda4ee3",
                  "name": "Happy",
                  "uuid": "7d849e39-5d78-4676-91c9-e84d2e6d2216"
                },
                {
                  "exit_uuid": "68eac93b-339e-4b74-b214-447362257490",
                  "name": "My teen did not like it",
                  "uuid": "db633db0-e77d-4405-8ee6-0823199e7914"
                },
                {
                  "exit_uuid": "37d7f2be-a7ec-4d88-878b-2080717a8ee8",
                  "name": "I don’t know",
                  "uuid": "f4f2102b-a933-4163-8c30-7089ed47e476"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "58156d14-4f69-4d9c-b7af-4b089122ea4d",
                "destination_uuid": null
              },
              {
                "uuid": "bfceda55-de3f-41ef-a3f3-4aebaeee3335",
                "destination_uuid": "2d04dd56-c3a9-41be-8f08-99121b8b1e8e"
              },
              {
                "uuid": "64c31dcb-7ede-49b5-9303-603aceda4ee3",
                "destination_uuid": "839400a6-7292-4f49-a7dd-71b7c7b72e54"
              },
              {
                "uuid": "68eac93b-339e-4b74-b214-447362257490",
                "destination_uuid": "07e84c76-d89f-4757-8b50-22a363255352"
              },
              {
                "uuid": "37d7f2be-a7ec-4d88-878b-2080717a8ee8",
                "destination_uuid": "307c9a0f-aebb-41c2-bdea-35fb1262749a"
              }
            ]
          },
          {
            "uuid": "2d04dd56-c3a9-41be-8f08-99121b8b1e8e",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7c1f6b74-4bae-4401-b2a3-73276b17136f"
              }
            ],
            "exits": [
              {
                "uuid": "56bb8e5b-a219-4d75-857b-67d407ed8fef",
                "destination_uuid": "c384dd18-c688-4255-8073-18522d79bd2f"
              }
            ]
          },
          {
            "uuid": "839400a6-7292-4f49-a7dd-71b7c7b72e54",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d1dbf656-be76-4383-9a8a-8db259aa75e4"
              }
            ],
            "exits": [
              {
                "uuid": "a18563b5-6b58-4418-8a4d-3fd915a40457",
                "destination_uuid": "c384dd18-c688-4255-8073-18522d79bd2f"
              }
            ]
          },
          {
            "uuid": "07e84c76-d89f-4757-8b50-22a363255352",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a1aaf72a-8836-4d8d-90ce-87aafd7eb64f"
              }
            ],
            "exits": [
              {
                "uuid": "b8ecd355-23bc-45a5-b865-1909d54cd567",
                "destination_uuid": "c384dd18-c688-4255-8073-18522d79bd2f"
              }
            ]
          },
          {
            "uuid": "307c9a0f-aebb-41c2-bdea-35fb1262749a",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fecf57aa-a6cb-40ef-a775-b103ef45e777"
              }
            ],
            "exits": [
              {
                "uuid": "300dcf9b-7605-4db6-8a7d-885d0647062f",
                "destination_uuid": "c384dd18-c688-4255-8073-18522d79bd2f"
              }
            ]
          },
          {
            "uuid": "c384dd18-c688-4255-8073-18522d79bd2f",
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
                "uuid": "760351ae-f123-4cd5-8ce1-f02e72d09896"
              }
            ],
            "exits": [
              {
                "uuid": "024aa259-8556-44f1-97ef-f05d332790c9",
                "destination_uuid": "094e3d22-792b-4663-80bf-b0e2cd36d01e"
              }
            ]
          },
          {
            "uuid": "094e3d22-792b-4663-80bf-b0e2cd36d01e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "28c597fa-5f9c-4dc3-90cd-d001c75587d9",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "d16664fd-82cb-4e35-85eb-bd4e26d93974",
                  "type": "has_only_phrase",
                  "uuid": "ab50648d-3d56-4f85-a5df-485c97a673a3"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "d16664fd-82cb-4e35-85eb-bd4e26d93974",
                  "type": "has_only_phrase",
                  "uuid": "4f4a137a-6877-42a9-9f9b-576df3f8c877"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "34487360-ad05-4504-933a-ad3891e807f1",
                  "type": "has_only_phrase",
                  "uuid": "e6760e9a-5e91-4c53-bbfd-aa4d7b53f255"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "34487360-ad05-4504-933a-ad3891e807f1",
                  "type": "has_only_phrase",
                  "uuid": "d520093a-fc1c-41ed-8783-32cad131e332"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a5d4c979-f12c-4892-8784-f91e5f836a97",
                  "name": "All Responses",
                  "uuid": "28c597fa-5f9c-4dc3-90cd-d001c75587d9"
                },
                {
                  "exit_uuid": "91d823c0-9a9a-47e9-90e2-70e00af22254",
                  "name": "Every day; Almost every day",
                  "uuid": "d16664fd-82cb-4e35-85eb-bd4e26d93974"
                },
                {
                  "exit_uuid": "7f85b532-7748-429d-b0db-1bb333fdf4ef",
                  "name": "A few days; Never",
                  "uuid": "34487360-ad05-4504-933a-ad3891e807f1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a5d4c979-f12c-4892-8784-f91e5f836a97",
                "destination_uuid": null
              },
              {
                "uuid": "91d823c0-9a9a-47e9-90e2-70e00af22254",
                "destination_uuid": "ce3c9465-2984-44b8-bc58-ae713e95d36c"
              },
              {
                "uuid": "7f85b532-7748-429d-b0db-1bb333fdf4ef",
                "destination_uuid": "ccdcfd32-285b-4b73-9007-edf89173a7a9"
              }
            ]
          },
          {
            "uuid": "ce3c9465-2984-44b8-bc58-ae713e95d36c",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "597ce4b8-d477-4917-8c84-52060f2319fc"
              }
            ],
            "exits": [
              {
                "uuid": "a48e4ff8-8ac1-4042-9230-69fcb87d2c62",
                "destination_uuid": "c952fccc-1054-47ce-8291-fdac42779b49"
              }
            ]
          },
          {
            "uuid": "ccdcfd32-285b-4b73-9007-edf89173a7a9",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1e10dda5-be82-48fe-b36c-ef867488abbb"
              }
            ],
            "exits": [
              {
                "uuid": "2b278db7-a9da-47ac-b567-fd2cbaca864e",
                "destination_uuid": "c952fccc-1054-47ce-8291-fdac42779b49"
              }
            ]
          },
          {
            "uuid": "c952fccc-1054-47ce-8291-fdac42779b49",
            "actions": [
              {
                "uuid": "7daf2e7f-55f8-45da-83d8-9f292778b95e",
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
                "uuid": "d0056a57-276a-4fd9-af0f-4ce4652336f4",
                "destination_uuid": "fa821ef8-6767-4350-9575-150f5fd53f68"
              }
            ]
          },
          {
            "uuid": "fa821ef8-6767-4350-9575-150f5fd53f68",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "47bcf7fa-31b5-44d3-8c00-ce8cf9b78fe8"
                },
                "type": "enter_flow",
                "uuid": "d05655b8-f4e2-476a-aac9-af5421402eeb"
              }
            ],
            "exits": [
              {
                "uuid": "ac45d640-ca2b-44d7-a484-060f504969d0",
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
        "uuid": "aab09a4e-b8c9-417b-bcbf-4947ed4258be",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "42eb99bd-4955-46c3-bf28-db83ee2dda32",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e877c6c8-94d5-4a38-9e86-06a1f42d4bef"
              }
            ],
            "exits": [
              {
                "uuid": "838278cb-8665-4f9e-9266-4384f3db48e7",
                "destination_uuid": "4df05f05-f2a2-4f34-acbc-1069e8c41cdc"
              }
            ]
          },
          {
            "uuid": "4df05f05-f2a2-4f34-acbc-1069e8c41cdc",
            "actions": [
              {
                "uuid": "84d7dcb4-8bf6-4637-a8d7-d380cf8dce16",
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
                "uuid": "95e64e6a-b02a-44c1-abf1-9eda16438183",
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
        "uuid": "3608b06e-fdd8-4980-be5a-5041ba5116cd",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f3983c8d-0b71-4c98-b2ae-1a4e408d0f1a",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "80a688b5-55ca-4f3c-8cad-415f8e18415c"
              }
            ],
            "exits": [
              {
                "uuid": "52843ddf-8fb4-4a81-82ad-7841e9259956",
                "destination_uuid": "21336ce8-6818-4de9-93b0-49452793b787"
              }
            ]
          },
          {
            "uuid": "21336ce8-6818-4de9-93b0-49452793b787",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "98c506a7-4f24-40ed-a646-fcbf2d30af6c"
              }
            ],
            "exits": [
              {
                "uuid": "b4577456-8418-4a40-829e-c8cb32c02f7d",
                "destination_uuid": "26e96691-e21e-4d5f-a8c4-76b0fe98afdf"
              }
            ]
          },
          {
            "uuid": "26e96691-e21e-4d5f-a8c4-76b0fe98afdf",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "81f6dfe1-ab4a-4969-accb-f231c93dffe3"
              }
            ],
            "exits": [
              {
                "uuid": "29c3ea2e-5031-46d3-bd5c-831822bc9da9",
                "destination_uuid": "0a09e1aa-ffae-4965-9c7f-37c132662e15"
              }
            ]
          },
          {
            "uuid": "0a09e1aa-ffae-4965-9c7f-37c132662e15",
            "actions": [
              {
                "uuid": "16b7461d-9e69-4635-8318-b31b2896e4e8",
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
                "uuid": "e0f75c37-f4a3-427c-a467-ca348ee6c211",
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
        "uuid": "d229df24-bb04-4a36-8d0a-b3b0a65ea547",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5e510049-7334-42bf-bc3d-c7b7168a0a69",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7b7c1545-d2e9-48a8-be9c-dcb056a4a700"
              }
            ],
            "exits": [
              {
                "uuid": "25d50bab-2f0a-4d51-afef-00c8acc50b59",
                "destination_uuid": "28332f0d-89c3-4481-b80a-6849a50aed37"
              }
            ]
          },
          {
            "uuid": "28332f0d-89c3-4481-b80a-6849a50aed37",
            "actions": [
              {
                "uuid": "81922aeb-bbf2-4ce7-bf9c-eed76f97413a",
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
                "uuid": "58f018d4-0d35-412b-a50f-581e918ae7d5",
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
        "uuid": "29eb3fb4-87ac-4484-9511-a3a63a77db64",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0d941bf9-3877-475c-80e6-acc70ee3a358",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "97bf0ce4-10b1-4173-aa3e-d3e44a8343f6"
              }
            ],
            "exits": [
              {
                "uuid": "f54bf085-36c1-4d75-961a-b0df10606037",
                "destination_uuid": "e7eba9f9-f04d-445d-8d8e-adf5e72dfd94"
              }
            ]
          },
          {
            "uuid": "e7eba9f9-f04d-445d-8d8e-adf5e72dfd94",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "aff6d09e-647d-42e7-a308-a2ab2c768596"
              }
            ],
            "exits": [
              {
                "uuid": "4abc159b-7fab-444e-8463-406c280aea23",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b766027c-f72b-46ed-a3cc-2093e4c18fdd",
            "actions": [
              {
                "uuid": "d9917166-9db6-471f-89e0-b2b2569bc5e5",
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
                "uuid": "5f966051-444c-46af-90e1-840bc2a3fb12",
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
        "uuid": "51884612-1b89-4738-9e5b-7228b9dd82f2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2859622b-ea0c-414a-b90b-1d73a1a9a597",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8676cf63-6cb8-4a37-bb94-8a030172c7b3"
              }
            ],
            "exits": [
              {
                "uuid": "74b6be45-b0ab-4ac5-a88c-8cae77485109",
                "destination_uuid": "ac0443ea-fd73-4d2d-904d-8f2caa24713e"
              }
            ]
          },
          {
            "uuid": "ac0443ea-fd73-4d2d-904d-8f2caa24713e",
            "actions": [
              {
                "uuid": "ac2bf914-5542-41a7-b862-9f863131cd87",
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
                "uuid": "694c1188-3eb4-403c-ab1f-a25a20d567b9",
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
        "uuid": "5c8604fd-b334-4c6e-94b1-2104ae513fc4",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "377a979a-9481-4ac4-a2ff-b612b2bb7078",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "5119dd32-215a-4646-9fee-6f21741bcbc2"
                },
                "type": "enter_flow",
                "uuid": "29e02ce2-a55b-4a00-87f8-540c4a9171fe"
              }
            ],
            "exits": [
              {
                "uuid": "60b918f3-7bd6-4a93-9212-60910067e4e8",
                "destination_uuid": "ad18e87d-e34b-47c4-9e1e-76adcfb70fa0"
              },
              {
                "uuid": "84a347da-b48f-4e34-8bd4-1b579b118ec9",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "364727ef-e67b-42c8-bbb8-4368dfce1f35",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "3f8ffca4-b38b-441d-9437-eaf242635cd4"
                },
                {
                  "uuid": "f0491ffb-72c0-41db-9f29-16e0c9bb9f3c",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "dd9ca295-fedb-4c62-9251-a1128ccdfd4f"
                }
              ],
              "categories": [
                {
                  "uuid": "3f8ffca4-b38b-441d-9437-eaf242635cd4",
                  "name": "Complete",
                  "exit_uuid": "60b918f3-7bd6-4a93-9212-60910067e4e8"
                },
                {
                  "uuid": "dd9ca295-fedb-4c62-9251-a1128ccdfd4f",
                  "name": "Expired",
                  "exit_uuid": "84a347da-b48f-4e34-8bd4-1b579b118ec9"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "3f8ffca4-b38b-441d-9437-eaf242635cd4"
            }
          },
          {
            "uuid": "ad18e87d-e34b-47c4-9e1e-76adcfb70fa0",
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
                "uuid": "dfc3c5f4-a2b3-48fe-9ac4-34570c3876fa"
              }
            ],
            "exits": [
              {
                "uuid": "cd52d704-1ef1-43dd-a79a-13e83f06498e",
                "destination_uuid": "45fbcb62-3727-4dae-bbf6-9c92cacc7ad3"
              }
            ]
          },
          {
            "uuid": "45fbcb62-3727-4dae-bbf6-9c92cacc7ad3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9d98525f-6292-4bab-b1f9-27eee7168507",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "67fac307-237a-4723-be6c-6d8a69e18bd7",
                  "type": "has_only_phrase",
                  "uuid": "e579cda1-b562-431a-804b-91c724b5b12e"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "253daddd-e959-4f3c-b854-2e25b7629f1a",
                  "type": "has_only_phrase",
                  "uuid": "de5f3346-17ed-41ce-b7bc-87d82293a9db"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "eb571b5b-fb39-4161-9701-5ce6378c1c80",
                  "type": "has_only_phrase",
                  "uuid": "becc1531-96c7-4d2f-9192-0606d7bd5aa9"
                },
                {
                  "arguments": [
                    "first app opening"
                  ],
                  "category_uuid": "0c718b93-1395-4fae-893b-c29529eaffe2",
                  "type": "has_only_phrase",
                  "uuid": "9a5545fb-81aa-4a89-9499-e218fb95baca"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1b43268a-7387-47d9-8f68-572ef928fc99",
                  "name": "All Responses",
                  "uuid": "9d98525f-6292-4bab-b1f9-27eee7168507"
                },
                {
                  "exit_uuid": "d6160095-2021-4dc3-ba0b-721663c084e7",
                  "name": "welcome",
                  "uuid": "67fac307-237a-4723-be6c-6d8a69e18bd7"
                },
                {
                  "exit_uuid": "72f54552-7737-46c6-a61c-e13dcf545a4d",
                  "name": "1on1",
                  "uuid": "253daddd-e959-4f3c-b854-2e25b7629f1a"
                },
                {
                  "exit_uuid": "c5e63702-4d7d-413e-8d3c-8a218dbd2366",
                  "name": "praise",
                  "uuid": "eb571b5b-fb39-4161-9701-5ce6378c1c80"
                },
                {
                  "exit_uuid": "2f354a44-7869-450c-b878-e05a03e6de35",
                  "name": "first app opening",
                  "uuid": "0c718b93-1395-4fae-893b-c29529eaffe2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1b43268a-7387-47d9-8f68-572ef928fc99",
                "destination_uuid": null
              },
              {
                "uuid": "d6160095-2021-4dc3-ba0b-721663c084e7",
                "destination_uuid": "9eadd808-07a4-446e-acb5-545e2ad3815b"
              },
              {
                "uuid": "72f54552-7737-46c6-a61c-e13dcf545a4d",
                "destination_uuid": "b3064907-83f2-486a-90cc-b9660ebc2b63"
              },
              {
                "uuid": "c5e63702-4d7d-413e-8d3c-8a218dbd2366",
                "destination_uuid": "2928e2e2-e47c-44fc-b83d-00c4f650f76d"
              },
              {
                "uuid": "2f354a44-7869-450c-b878-e05a03e6de35",
                "destination_uuid": "14687357-a058-43da-9d84-5d558e3bcc37"
              }
            ]
          },
          {
            "uuid": "9eadd808-07a4-446e-acb5-545e2ad3815b",
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
                "uuid": "6a4bc34e-71b4-4942-a6a5-631ce5b29ab2"
              }
            ],
            "exits": [
              {
                "uuid": "00c3bc53-a50a-4895-8f5c-f118d90a6849",
                "destination_uuid": "0624cd41-0c9b-4c03-b15b-54361014e157"
              }
            ]
          },
          {
            "uuid": "0624cd41-0c9b-4c03-b15b-54361014e157",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4f1185f2-e2d2-44f5-b4e4-f7a9386e904a",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "063414b6-8d79-4a7c-ba74-736976a1b60c",
                  "type": "has_only_phrase",
                  "uuid": "dc9f83b9-9ef1-4e81-985b-2547f4819c97"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "a612f00a-438d-4913-afdf-0952732a19ea",
                  "type": "has_only_phrase",
                  "uuid": "bfb85b10-e0e1-41cd-9ad1-71cae0d1addd"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "a75a2da8-8e94-4bf8-9697-94e34b639923",
                  "type": "has_only_phrase",
                  "uuid": "99849dce-4d6f-43dd-b171-8d2cd5f8c572"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "72542db1-ee70-402a-b452-3a3ff3b71376",
                  "type": "has_only_phrase",
                  "uuid": "35aa9fd9-7038-4ba4-9c29-efbea347bf41"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ea378022-3af7-4cc8-bece-2c17340d1bf6",
                  "name": "All Responses",
                  "uuid": "4f1185f2-e2d2-44f5-b4e4-f7a9386e904a"
                },
                {
                  "exit_uuid": "c1ccfd52-c80d-464c-8509-e188f07ad483",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "063414b6-8d79-4a7c-ba74-736976a1b60c"
                },
                {
                  "exit_uuid": "d4a6375c-0854-4ede-9b06-4358ec192575",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "a612f00a-438d-4913-afdf-0952732a19ea"
                },
                {
                  "exit_uuid": "65115f14-2efd-44e4-80ca-d0f9e99c8eda",
                  "name": "mod_welcome_survey",
                  "uuid": "a75a2da8-8e94-4bf8-9697-94e34b639923"
                },
                {
                  "exit_uuid": "2f6562ba-72ea-420e-b838-8a901ff01b1b",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "72542db1-ee70-402a-b452-3a3ff3b71376"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ea378022-3af7-4cc8-bece-2c17340d1bf6",
                "destination_uuid": null
              },
              {
                "uuid": "c1ccfd52-c80d-464c-8509-e188f07ad483",
                "destination_uuid": "12ec28b6-03f8-4557-9a8b-07fc7861ed28"
              },
              {
                "uuid": "d4a6375c-0854-4ede-9b06-4358ec192575",
                "destination_uuid": "d06d6d31-5da7-4d29-b6a1-d78ab580ce89"
              },
              {
                "uuid": "65115f14-2efd-44e4-80ca-d0f9e99c8eda",
                "destination_uuid": "cb29b508-144a-4876-aaaa-e27afc77973c"
              },
              {
                "uuid": "2f6562ba-72ea-420e-b838-8a901ff01b1b",
                "destination_uuid": "392b3c6e-7280-4c00-9f05-ab5476755fdf"
              }
            ]
          },
          {
            "uuid": "12ec28b6-03f8-4557-9a8b-07fc7861ed28",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "f0d84777-48c7-4945-968a-6b07bad181bc"
                },
                "type": "enter_flow",
                "uuid": "bd4a3943-8f88-4e20-ae25-dace55fb85c6"
              }
            ],
            "exits": [
              {
                "uuid": "c0c0c9a5-dde0-4918-9a15-1e8707b05b48",
                "destination_uuid": null
              },
              {
                "uuid": "929646a4-3cc7-4d5a-acef-a9d3b9f28bd7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "f3e69b59-5e99-49d9-94eb-40bd9776bfcf",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a5519a2f-8557-453c-aa7a-a8015314e12d"
                },
                {
                  "uuid": "2bcfc939-c9ee-4cfe-84cf-bb4867151edb",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "bd81a5f6-e987-4b1d-b268-2144bce80856"
                }
              ],
              "categories": [
                {
                  "uuid": "a5519a2f-8557-453c-aa7a-a8015314e12d",
                  "name": "Complete",
                  "exit_uuid": "c0c0c9a5-dde0-4918-9a15-1e8707b05b48"
                },
                {
                  "uuid": "bd81a5f6-e987-4b1d-b268-2144bce80856",
                  "name": "Expired",
                  "exit_uuid": "929646a4-3cc7-4d5a-acef-a9d3b9f28bd7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a5519a2f-8557-453c-aa7a-a8015314e12d"
            }
          },
          {
            "uuid": "d06d6d31-5da7-4d29-b6a1-d78ab580ce89",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "34ca3b99-5749-4781-9360-f36970e4a7e4"
                },
                "type": "enter_flow",
                "uuid": "86cf108d-f98b-4789-8d0b-321565972424"
              }
            ],
            "exits": [
              {
                "uuid": "d75fc846-b5af-4c57-a235-8849be6fa351",
                "destination_uuid": null
              },
              {
                "uuid": "eb24136d-10f4-45a3-a62c-b128b04c49a4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b23fd917-2ad5-4d89-92d5-91897a73f160",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "aae2db67-72a7-4e0f-9307-2fcd351a8e6f"
                },
                {
                  "uuid": "283f9159-79bd-417a-b7ca-f7a0bffa3834",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "ade98462-f9e5-40d9-8fd5-a562ebe1882b"
                }
              ],
              "categories": [
                {
                  "uuid": "aae2db67-72a7-4e0f-9307-2fcd351a8e6f",
                  "name": "Complete",
                  "exit_uuid": "d75fc846-b5af-4c57-a235-8849be6fa351"
                },
                {
                  "uuid": "ade98462-f9e5-40d9-8fd5-a562ebe1882b",
                  "name": "Expired",
                  "exit_uuid": "eb24136d-10f4-45a3-a62c-b128b04c49a4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "aae2db67-72a7-4e0f-9307-2fcd351a8e6f"
            }
          },
          {
            "uuid": "cb29b508-144a-4876-aaaa-e27afc77973c",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "0be95b34-8401-4e8f-b735-c04b42dcb9a6"
                },
                "type": "enter_flow",
                "uuid": "9bc6d7d8-27a5-467f-af44-90d103a5a497"
              }
            ],
            "exits": [
              {
                "uuid": "8d69a0ff-bf7d-4103-bf29-da5c6cb5b1b4",
                "destination_uuid": null
              },
              {
                "uuid": "fdcc22c4-2c72-4621-b3ed-0f00ad691550",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "4eda242a-78aa-434e-b310-347400a56020",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c9b36df2-fbce-4495-959f-cff9a905b920"
                },
                {
                  "uuid": "31004c07-228a-433c-995c-6f58595ecd6d",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "6890215f-c494-4304-a8a5-03bdb06db472"
                }
              ],
              "categories": [
                {
                  "uuid": "c9b36df2-fbce-4495-959f-cff9a905b920",
                  "name": "Complete",
                  "exit_uuid": "8d69a0ff-bf7d-4103-bf29-da5c6cb5b1b4"
                },
                {
                  "uuid": "6890215f-c494-4304-a8a5-03bdb06db472",
                  "name": "Expired",
                  "exit_uuid": "fdcc22c4-2c72-4621-b3ed-0f00ad691550"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c9b36df2-fbce-4495-959f-cff9a905b920"
            }
          },
          {
            "uuid": "392b3c6e-7280-4c00-9f05-ab5476755fdf",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "fa6e5667-4291-45f8-8109-cb9c7512105d"
                },
                "type": "enter_flow",
                "uuid": "e40d6c1a-c982-4e3f-8e89-50550c584ebc"
              }
            ],
            "exits": [
              {
                "uuid": "6e7bb79d-0f09-4355-ae3a-d3b10e9f7559",
                "destination_uuid": null
              },
              {
                "uuid": "68f667a4-bdce-408a-b819-6ca86941c1c4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1fa32438-4198-463a-8423-f273b580bb53",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "5e67957d-9544-4326-8f84-c9580b2bae88"
                },
                {
                  "uuid": "6dcc6f06-e234-459a-8a71-cc8d49ebfad1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b814c726-cf18-4a40-bc00-120d7a9056fb"
                }
              ],
              "categories": [
                {
                  "uuid": "5e67957d-9544-4326-8f84-c9580b2bae88",
                  "name": "Complete",
                  "exit_uuid": "6e7bb79d-0f09-4355-ae3a-d3b10e9f7559"
                },
                {
                  "uuid": "b814c726-cf18-4a40-bc00-120d7a9056fb",
                  "name": "Expired",
                  "exit_uuid": "68f667a4-bdce-408a-b819-6ca86941c1c4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "5e67957d-9544-4326-8f84-c9580b2bae88"
            }
          },
          {
            "uuid": "b3064907-83f2-486a-90cc-b9660ebc2b63",
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
                "uuid": "c45e4421-5c58-4984-be36-9466d9a66c59"
              }
            ],
            "exits": [
              {
                "uuid": "cc786d5c-21fc-4e54-8320-cb935b38425d",
                "destination_uuid": "02a9498d-cef5-46b3-ba24-2514724c0b6c"
              }
            ]
          },
          {
            "uuid": "02a9498d-cef5-46b3-ba24-2514724c0b6c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9931071b-f3bc-4d39-a949-9b8a3db6f3d3",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "0a256c3d-d8d3-4e05-99b9-e16e6e683338",
                  "type": "has_only_phrase",
                  "uuid": "4b5e603a-f064-4f53-86e4-b39b3c873ef4"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "002d1a83-aa97-4829-95b2-c56a5deb1dea",
                  "type": "has_only_phrase",
                  "uuid": "8bcb171a-c7cb-4b01-a95a-641e11ba3cd4"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "2b5b90f2-e2c5-464f-8a61-0ca7d7c79657",
                  "type": "has_only_phrase",
                  "uuid": "acfeaf33-6d86-414c-8ec9-05d606671205"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2226a86e-cf43-436a-a4f7-53fbc43fef16",
                  "name": "All Responses",
                  "uuid": "9931071b-f3bc-4d39-a949-9b8a3db6f3d3"
                },
                {
                  "exit_uuid": "1fbd132b-6ce8-4810-a876-7e9cd4d4e286",
                  "name": "mod_1on1_emo",
                  "uuid": "0a256c3d-d8d3-4e05-99b9-e16e6e683338"
                },
                {
                  "exit_uuid": "8e51a4a9-4c28-4f82-88c6-1623fa1ed9b1",
                  "name": "mod_1on1_activity",
                  "uuid": "002d1a83-aa97-4829-95b2-c56a5deb1dea"
                },
                {
                  "exit_uuid": "7faf9099-7171-4d25-94f7-d9dd1eadcf07",
                  "name": "mod_1on1_activity_review",
                  "uuid": "2b5b90f2-e2c5-464f-8a61-0ca7d7c79657"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2226a86e-cf43-436a-a4f7-53fbc43fef16",
                "destination_uuid": null
              },
              {
                "uuid": "1fbd132b-6ce8-4810-a876-7e9cd4d4e286",
                "destination_uuid": "0268d08f-948d-40b2-a328-462cacd1d893"
              },
              {
                "uuid": "8e51a4a9-4c28-4f82-88c6-1623fa1ed9b1",
                "destination_uuid": "508da5f2-4697-4d37-af84-e4497dce6f28"
              },
              {
                "uuid": "7faf9099-7171-4d25-94f7-d9dd1eadcf07",
                "destination_uuid": "90f0bc76-acda-49ea-9508-c9a3f1332706"
              }
            ]
          },
          {
            "uuid": "0268d08f-948d-40b2-a328-462cacd1d893",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "7ab247c2-638e-47bb-ade6-2e7b0a4e2934"
                },
                "type": "enter_flow",
                "uuid": "23571da5-2a2e-4816-9608-88a15e7edd96"
              }
            ],
            "exits": [
              {
                "uuid": "2a9c6c84-da54-4152-9a4d-93d96f0249fe",
                "destination_uuid": null
              },
              {
                "uuid": "7b26f962-654e-4e30-a206-8343b1bd40de",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1626870a-1a3e-4982-b14e-ed420d5d7868",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "6bb5c08e-8a1a-4aef-a304-58fb0a70c682"
                },
                {
                  "uuid": "827bca19-a30f-4b57-b0a7-c25fb50c81ad",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "422297e8-a8b1-4810-b4ad-74e8555de249"
                }
              ],
              "categories": [
                {
                  "uuid": "6bb5c08e-8a1a-4aef-a304-58fb0a70c682",
                  "name": "Complete",
                  "exit_uuid": "2a9c6c84-da54-4152-9a4d-93d96f0249fe"
                },
                {
                  "uuid": "422297e8-a8b1-4810-b4ad-74e8555de249",
                  "name": "Expired",
                  "exit_uuid": "7b26f962-654e-4e30-a206-8343b1bd40de"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "6bb5c08e-8a1a-4aef-a304-58fb0a70c682"
            }
          },
          {
            "uuid": "508da5f2-4697-4d37-af84-e4497dce6f28",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "ae732db9-c748-480b-8b8a-22acac1c3fe7"
                },
                "type": "enter_flow",
                "uuid": "2ef172a7-ea1c-4d6d-9572-c571ab4a05f2"
              }
            ],
            "exits": [
              {
                "uuid": "8a96a3ec-2a54-44cc-a652-fdb38afed9ef",
                "destination_uuid": null
              },
              {
                "uuid": "da38fcc3-6471-4fc4-ab9c-f95fb9b203ab",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c240ccfe-9f62-4949-8f26-468830fb3a20",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0032c357-2acb-404b-a573-fd6ddc3eeeb7"
                },
                {
                  "uuid": "ec9dbc96-76a0-44d0-82d7-04f9bd32e660",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d57aadf9-bf83-4497-b56c-ee5a9d288360"
                }
              ],
              "categories": [
                {
                  "uuid": "0032c357-2acb-404b-a573-fd6ddc3eeeb7",
                  "name": "Complete",
                  "exit_uuid": "8a96a3ec-2a54-44cc-a652-fdb38afed9ef"
                },
                {
                  "uuid": "d57aadf9-bf83-4497-b56c-ee5a9d288360",
                  "name": "Expired",
                  "exit_uuid": "da38fcc3-6471-4fc4-ab9c-f95fb9b203ab"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0032c357-2acb-404b-a573-fd6ddc3eeeb7"
            }
          },
          {
            "uuid": "90f0bc76-acda-49ea-9508-c9a3f1332706",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "e2f3262b-0eec-4ea9-b40f-8d14ba1c899c"
                },
                "type": "enter_flow",
                "uuid": "db0aa9d5-2aa7-4507-86f9-92c4b624809d"
              }
            ],
            "exits": [
              {
                "uuid": "623c7d18-a8e3-4b29-8dd2-6a6cc42e9176",
                "destination_uuid": null
              },
              {
                "uuid": "d45ad13f-ba24-41ee-96cf-ef82aeaaf59c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "721a05ae-b75d-457c-b8ed-902babf868ba",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c5fb1c39-65cb-4232-a87b-b18e8d4d583e"
                },
                {
                  "uuid": "31326542-27c4-494a-a106-63019c54a89f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "5f3eab07-3d48-4c14-a3d7-19ca656c877e"
                }
              ],
              "categories": [
                {
                  "uuid": "c5fb1c39-65cb-4232-a87b-b18e8d4d583e",
                  "name": "Complete",
                  "exit_uuid": "623c7d18-a8e3-4b29-8dd2-6a6cc42e9176"
                },
                {
                  "uuid": "5f3eab07-3d48-4c14-a3d7-19ca656c877e",
                  "name": "Expired",
                  "exit_uuid": "d45ad13f-ba24-41ee-96cf-ef82aeaaf59c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c5fb1c39-65cb-4232-a87b-b18e8d4d583e"
            }
          },
          {
            "uuid": "2928e2e2-e47c-44fc-b83d-00c4f650f76d",
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
                "uuid": "ce06ae2a-ed67-4d10-ac6a-44365737317e"
              }
            ],
            "exits": [
              {
                "uuid": "de2eb11c-9d8f-455f-b9de-4c69a65c1958",
                "destination_uuid": "490015bc-b461-4f50-860d-57d8d312d8c5"
              }
            ]
          },
          {
            "uuid": "490015bc-b461-4f50-860d-57d8d312d8c5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a6e50730-b488-483a-87c4-e0106066214e",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "e1bce061-82dd-4256-92b7-765f5fff4edd",
                  "type": "has_only_phrase",
                  "uuid": "a99b4f60-447e-4407-a838-6f86641ada30"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "2e1a91e3-409d-4a60-9e34-1913fcfca683",
                  "type": "has_only_phrase",
                  "uuid": "8e4d6e82-9ab5-48a8-8df1-22f0259f6f28"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "160cf132-bbc0-49f2-83d8-a5abebd47265",
                  "type": "has_only_phrase",
                  "uuid": "4f7890ab-803c-47f9-8f71-594ae269826c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7387b99a-51cc-4a60-844b-a6c91382a376",
                  "name": "All Responses",
                  "uuid": "a6e50730-b488-483a-87c4-e0106066214e"
                },
                {
                  "exit_uuid": "36681d1e-f7e3-42f1-9bb5-e0e0e94c1879",
                  "name": "mod_praise_intro",
                  "uuid": "e1bce061-82dd-4256-92b7-765f5fff4edd"
                },
                {
                  "exit_uuid": "6517cbe9-35bb-4734-9d2f-34bf9a0f2e4b",
                  "name": "mod_praise_activity",
                  "uuid": "2e1a91e3-409d-4a60-9e34-1913fcfca683"
                },
                {
                  "exit_uuid": "d1ddd701-ed90-44dd-be17-01d0235dc256",
                  "name": "mod_praise_activity_review",
                  "uuid": "160cf132-bbc0-49f2-83d8-a5abebd47265"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7387b99a-51cc-4a60-844b-a6c91382a376",
                "destination_uuid": null
              },
              {
                "uuid": "36681d1e-f7e3-42f1-9bb5-e0e0e94c1879",
                "destination_uuid": "927738f9-1984-476d-a28f-2c8fb6b95b6b"
              },
              {
                "uuid": "6517cbe9-35bb-4734-9d2f-34bf9a0f2e4b",
                "destination_uuid": "a071cc84-e0d9-4483-bbbf-184cfbd9d0b9"
              },
              {
                "uuid": "d1ddd701-ed90-44dd-be17-01d0235dc256",
                "destination_uuid": "193a4dcf-4fb0-4a75-8de4-4f0d8462bc88"
              }
            ]
          },
          {
            "uuid": "927738f9-1984-476d-a28f-2c8fb6b95b6b",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "14eb848e-fab3-446c-ae49-ecec36bd8177"
                },
                "type": "enter_flow",
                "uuid": "c7c9578b-7f17-44c3-999c-81e6349732aa"
              }
            ],
            "exits": [
              {
                "uuid": "ebc2d2c2-a477-49c8-b068-9c1ee15d3381",
                "destination_uuid": null
              },
              {
                "uuid": "ea66c8d3-8287-4721-9172-5b787ea1ab41",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1298a66b-1f03-4086-85bc-9010c295f1f5",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f4fcdd32-f6fb-4f54-9ec9-909af812664f"
                },
                {
                  "uuid": "73e424cf-7569-4ff5-a71b-2a4ef0fe6f83",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f4909799-3a57-45c2-af6b-e492771399ed"
                }
              ],
              "categories": [
                {
                  "uuid": "f4fcdd32-f6fb-4f54-9ec9-909af812664f",
                  "name": "Complete",
                  "exit_uuid": "ebc2d2c2-a477-49c8-b068-9c1ee15d3381"
                },
                {
                  "uuid": "f4909799-3a57-45c2-af6b-e492771399ed",
                  "name": "Expired",
                  "exit_uuid": "ea66c8d3-8287-4721-9172-5b787ea1ab41"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f4fcdd32-f6fb-4f54-9ec9-909af812664f"
            }
          },
          {
            "uuid": "a071cc84-e0d9-4483-bbbf-184cfbd9d0b9",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "6d931c67-45df-4fe5-89b6-5d17ee900d43"
                },
                "type": "enter_flow",
                "uuid": "bc688dc7-babc-4758-81a0-f73189d61f57"
              }
            ],
            "exits": [
              {
                "uuid": "17968500-dcef-45ae-a321-f5ae4c58b9c6",
                "destination_uuid": null
              },
              {
                "uuid": "02bdaa27-3184-456d-86f7-cbb90eef28ce",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2a5afb20-d021-4903-be36-21bbfe8c137e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "9b354a38-5c93-4993-ade5-725aee705750"
                },
                {
                  "uuid": "e7ef566b-b79b-48bb-9af2-a0f53235089a",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2abb4531-1284-477b-a381-3ec666184c20"
                }
              ],
              "categories": [
                {
                  "uuid": "9b354a38-5c93-4993-ade5-725aee705750",
                  "name": "Complete",
                  "exit_uuid": "17968500-dcef-45ae-a321-f5ae4c58b9c6"
                },
                {
                  "uuid": "2abb4531-1284-477b-a381-3ec666184c20",
                  "name": "Expired",
                  "exit_uuid": "02bdaa27-3184-456d-86f7-cbb90eef28ce"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "9b354a38-5c93-4993-ade5-725aee705750"
            }
          },
          {
            "uuid": "193a4dcf-4fb0-4a75-8de4-4f0d8462bc88",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "9c7c6b13-bb8b-4b3a-ad88-5a1851b1d72e"
                },
                "type": "enter_flow",
                "uuid": "8f8e7220-bc68-437b-b53a-98999af2cfb1"
              }
            ],
            "exits": [
              {
                "uuid": "cf0a7dae-8b6d-4777-a587-bd41a9f65d1e",
                "destination_uuid": null
              },
              {
                "uuid": "0d0826bb-449f-41a6-bfd7-0913427f0ceb",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b7a3c988-1022-4b44-bcf1-ffe73202ba1e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d596601e-d47d-43e1-9bd1-11b5316fb5e8"
                },
                {
                  "uuid": "403d9f59-f6f4-496e-9527-61acb2a2da35",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f4c8389e-2553-46b1-97ce-bb99df818e5f"
                }
              ],
              "categories": [
                {
                  "uuid": "d596601e-d47d-43e1-9bd1-11b5316fb5e8",
                  "name": "Complete",
                  "exit_uuid": "cf0a7dae-8b6d-4777-a587-bd41a9f65d1e"
                },
                {
                  "uuid": "f4c8389e-2553-46b1-97ce-bb99df818e5f",
                  "name": "Expired",
                  "exit_uuid": "0d0826bb-449f-41a6-bfd7-0913427f0ceb"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d596601e-d47d-43e1-9bd1-11b5316fb5e8"
            }
          },
          {
            "uuid": "14687357-a058-43da-9d84-5d558e3bcc37",
            "actions": [
              {
                "flow": {
                  "name": "first_app_opening",
                  "uuid": "79356d74-ac03-496c-8202-b5bbd7aa5555"
                },
                "type": "enter_flow",
                "uuid": "9377d4ef-1e07-487a-bd08-4e01cd0e6ce2"
              }
            ],
            "exits": [
              {
                "uuid": "85fc199d-301c-4f9f-9732-8d18d67c9dbd",
                "destination_uuid": null
              },
              {
                "uuid": "511e4eb2-8094-4ef9-b568-ff07733f0d0e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "d0275af2-a1a8-4177-b1c3-e48871d5f010",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "550b770c-d9d4-4d66-aa13-5fbefb9bb081"
                },
                {
                  "uuid": "c8559606-e490-41f2-b153-bf23d10b60dd",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a5d5187a-bdfb-45ce-b5f6-cebb4cef7e5e"
                }
              ],
              "categories": [
                {
                  "uuid": "550b770c-d9d4-4d66-aa13-5fbefb9bb081",
                  "name": "Complete",
                  "exit_uuid": "85fc199d-301c-4f9f-9732-8d18d67c9dbd"
                },
                {
                  "uuid": "a5d5187a-bdfb-45ce-b5f6-cebb4cef7e5e",
                  "name": "Expired",
                  "exit_uuid": "511e4eb2-8094-4ef9-b568-ff07733f0d0e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "550b770c-d9d4-4d66-aa13-5fbefb9bb081"
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
        "uuid": "33201159-b290-4d95-9c0d-601cbb1159b9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a87be652-a43e-4e40-9db9-b347028e2365",
            "actions": [
              {
                "uuid": "ee5a5c10-1881-46f8-a29e-acba52c7bdaa",
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
                "uuid": "ea8081f7-a5ef-415b-a878-a85da4c7d7ce",
                "destination_uuid": "ec486fa9-4858-4ddc-a988-9d5bfa51dd52"
              }
            ]
          },
          {
            "uuid": "ec486fa9-4858-4ddc-a988-9d5bfa51dd52",
            "actions": [
              {
                "uuid": "c5dcca60-db40-421c-a7d5-3f7c6ba1b6a4",
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
                "uuid": "db56c328-cbec-4488-b984-d97341d7d6f6",
                "destination_uuid": "5407c021-c189-4a15-9251-1991834f2ace"
              }
            ]
          },
          {
            "uuid": "5407c021-c189-4a15-9251-1991834f2ace",
            "actions": [
              {
                "uuid": "9a7f9540-0ae9-49fd-8857-bec84393bbb1",
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
                "uuid": "77a4be5d-4292-4b33-b381-fb8a9faf3735",
                "destination_uuid": "9aa31dee-5529-424f-9f04-4596e1c6a4e7"
              }
            ]
          },
          {
            "uuid": "9aa31dee-5529-424f-9f04-4596e1c6a4e7",
            "actions": [
              {
                "uuid": "e97f245a-9c71-4e6b-a7dd-aa9d8b08d7b9",
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
                "uuid": "af373c7a-1945-4e7e-ac38-090aa3cf0161",
                "destination_uuid": "be78637d-d8a3-4f1b-9856-c37d1a933a78"
              }
            ]
          },
          {
            "uuid": "be78637d-d8a3-4f1b-9856-c37d1a933a78",
            "actions": [
              {
                "uuid": "5d0c2d4a-ba26-4b93-aa20-7575dc024cf3",
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
                "uuid": "8a9acda8-5e93-4728-811f-5148fcd88dd5",
                "destination_uuid": "32c9df16-423f-49b9-9899-266574726b31"
              }
            ]
          },
          {
            "uuid": "32c9df16-423f-49b9-9899-266574726b31",
            "actions": [
              {
                "uuid": "ab31f236-34da-4b35-a874-6c723e6f4298",
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
                "uuid": "58ae60fd-e0f0-49c9-9ca1-f61662adecf8",
                "destination_uuid": "44b289b7-c61b-47ae-a6a6-46542979d96a"
              }
            ]
          },
          {
            "uuid": "44b289b7-c61b-47ae-a6a6-46542979d96a",
            "actions": [
              {
                "uuid": "09fceead-7927-4827-8615-40fdca3cf951",
                "type": "set_contact_field",
                "field": {
                  "key": "guide_daughter",
                  "name": "guide_daughter"
                },
                "value": "Amina"
              }
            ],
            "exits": [
              {
                "uuid": "b3b11787-3e7c-45e9-adb8-6802949e1640",
                "destination_uuid": "bd80beef-397b-49d4-9388-5d37ff226258"
              }
            ]
          },
          {
            "uuid": "bd80beef-397b-49d4-9388-5d37ff226258",
            "actions": [
              {
                "uuid": "4c9a6200-2b28-444b-b464-e3ab5dbf74a5",
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
                "uuid": "412322f2-f549-4535-bc67-4fbfbc5d0d52",
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
        "uuid": "edd8e570-bb1c-4adc-b1f9-1ca9675920eb",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "de4414ba-505e-4c24-8bd1-8da8a0369b0a",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a58429b6-7070-4524-80c5-043aa9946b81"
              }
            ],
            "exits": [
              {
                "uuid": "b1984555-0d4c-4d2d-8436-3d9eb5da131c",
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
        "uuid": "f93609a8-4de1-4845-95be-6611b5f02bc6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "35b24fb1-3816-4720-b990-5f1301162fa9",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "75384c96-4a6b-4123-8fad-f92cff0b7bd4"
              }
            ],
            "exits": [
              {
                "uuid": "180ec261-ef92-4cbb-aabd-ef5625ec0928",
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
        "uuid": "2ea08606-56fe-4c8f-b904-46fe7426dec4",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d5482e5d-84df-415a-b712-77a02d444c15",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b72f13d2-8bde-4a28-b04a-d14ced45b13b"
              }
            ],
            "exits": [
              {
                "uuid": "cd29799c-6359-4084-be65-a16af9d66239",
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
        "uuid": "1d913fdf-b453-4313-9cfb-dfabe4473af0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "87c490c1-a831-4ce3-9c2f-90aa6ad0946b",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b916bb7f-fc45-4a05-b0ad-f14ea3f3f93c"
              }
            ],
            "exits": [
              {
                "uuid": "d6754a40-a6f1-4133-9071-504dfe58027b",
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
        "uuid": "e2a77230-6a17-4727-88a4-acf9084f9ed3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c32c68de-fa53-43ff-b5ac-a47f33482ea9",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8d3c2f82-83ee-4080-914d-4c8ea083920e"
              }
            ],
            "exits": [
              {
                "uuid": "9833f7c1-522d-41fd-bbdd-b2c2dc40f736",
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
        "uuid": "64aa9815-c8ca-44ba-a21d-e69a4000068a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "850391b6-8fca-4e20-a67d-7c1b868c5c5c",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e2a54893-706d-4f81-837e-efb1327a572f"
              }
            ],
            "exits": [
              {
                "uuid": "b07d45d1-4c27-4c20-aef1-a1a99b7846e0",
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
        "uuid": "0eb562ca-042a-4f07-94ea-804e95ccd989",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "68fa8aa4-5261-4b3a-a0a8-87c608da1092",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "82862c3b-a791-46a0-a997-d7b2850fec8d"
              }
            ],
            "exits": [
              {
                "uuid": "629221ce-2a93-4ae4-8f41-f1e730361c26",
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
        "uuid": "845e4c27-f55f-44a8-bf83-d49ca1daaf48",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2a12aca3-9a3f-44cd-b4ee-f4dd0e5433c0",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6294c60d-6e7e-4cc7-af09-1a65db38f8e5"
              }
            ],
            "exits": [
              {
                "uuid": "489e0c78-a18b-44be-8553-f105f5cc2fb5",
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
        "uuid": "0185639e-79f0-48bb-855c-923fe6cb7359",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "03fc7dfa-7296-4d0d-af98-39c90ae8d457",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "08e9f3a6-5080-4b96-8a18-19e89cba039e"
              }
            ],
            "exits": [
              {
                "uuid": "101da576-d103-47b0-9eb8-2f690ede7588",
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
        "uuid": "f0252dc1-1cc7-48cc-b0d6-5e0caaa7557a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7a4737af-836c-4564-9af7-2a715026a91e",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "900b5fb4-b6b7-404b-a266-5b90902e1292"
              }
            ],
            "exits": [
              {
                "uuid": "1b32768f-079d-40a4-934f-9d02ec8b56e0",
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
        "uuid": "fef03d19-c296-47df-9edc-527da711a382",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9b04a0ec-c832-43b2-a009-31f8dc619dc9",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f5f1507a-771e-42b8-956a-824bf537f816"
              }
            ],
            "exits": [
              {
                "uuid": "6526c383-4b1d-4d76-9622-fdc3f4d469eb",
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
        "uuid": "89cf8ae4-6458-4541-910a-28aef63c1c83",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "eb217837-7688-4486-9b30-cd6b46866ccf",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6604b178-78fa-424e-bb53-1279e543bc9f"
              }
            ],
            "exits": [
              {
                "uuid": "fe2de24e-480f-4682-a8ea-825a7aba40a6",
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
        "uuid": "c66908ab-de4f-4bd1-af52-18cbd33852ec",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f467f2e1-8068-44f0-b88e-c0eb3c938375",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "200daaaf-adcd-4f03-af5d-e8ff8a6027f3"
              }
            ],
            "exits": [
              {
                "uuid": "0ff34d0e-9def-4db5-be85-bce2e77f7c0b",
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
        "uuid": "96639542-164b-4111-ad95-9770059fbfae",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "bbfef59a-d5d1-48e7-b88a-d994f16de9d0",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "78f22dc4-60d1-4023-9275-5fd528861297"
              }
            ],
            "exits": [
              {
                "uuid": "009879b4-eb8c-43ac-821d-c4becc7506f2",
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