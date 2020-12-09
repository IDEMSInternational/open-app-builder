/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const conversation: FlowTypes.Conversation[] = [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "555feb8f-148a-4cc2-b552-6bfc4a8b5e81",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c839e296-24ff-496e-b0cd-7d87c2170d08",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cf0e52da-930b-46ec-8977-eadbd5721a07"
              }
            ],
            "exits": [
              {
                "uuid": "454a791e-6bc2-4707-9b1d-c9cdb42d8ede",
                "destination_uuid": "eea75a0a-d14c-4869-af87-ce13d25e82ec"
              }
            ]
          },
          {
            "uuid": "eea75a0a-d14c-4869-af87-ce13d25e82ec",
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
                "uuid": "9e061fb4-d925-4ff3-9351-d3a4af1f9855"
              }
            ],
            "exits": [
              {
                "uuid": "54cc3df6-d37b-417c-911a-a1bfdd75cbd2",
                "destination_uuid": "b828784c-c673-4990-b013-94edd2b14eb9"
              }
            ]
          },
          {
            "uuid": "b828784c-c673-4990-b013-94edd2b14eb9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "324a534b-3cde-4a44-9d94-9c1ac90807d1",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "6f85532a-eb71-4a1e-9cae-dd5ac1944599",
                  "type": "has_only_phrase",
                  "uuid": "c965ac4a-56b3-4a32-91e9-5f06959d0837"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "47a5feb7-896b-44b7-98e5-0d6f322df1fd",
                  "type": "has_only_phrase",
                  "uuid": "a2b159a8-2493-4964-8ad0-1abf4e79c537"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "7fd152e3-6528-4c53-af5b-89e1469d391a",
                  "type": "has_only_phrase",
                  "uuid": "1fe1d76c-1f34-40a8-8130-cf37f40c3a79"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "c89e21ae-863b-4f74-ba98-3249cd992fc9",
                  "type": "has_only_phrase",
                  "uuid": "31cb61f4-c5ab-4e25-bb41-8c6480c533a9"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "1ca006f0-874b-49b7-949b-bc50c221fa38",
                  "type": "has_only_phrase",
                  "uuid": "e7cbbdee-8271-494c-bf29-b046028b3941"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "073481f2-38df-445b-816a-fdc2a8846242",
                  "name": "All Responses",
                  "uuid": "324a534b-3cde-4a44-9d94-9c1ac90807d1"
                },
                {
                  "exit_uuid": "eda04e2d-6b29-41cf-b9af-bf455681d47a",
                  "name": "First option: launch example_media flow",
                  "uuid": "6f85532a-eb71-4a1e-9cae-dd5ac1944599"
                },
                {
                  "exit_uuid": "41eda2cd-67c2-4a32-b78b-43fcaacc381e",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "47a5feb7-896b-44b7-98e5-0d6f322df1fd"
                },
                {
                  "exit_uuid": "fd5ca37c-e532-4091-8a88-89aac8c6c601",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "7fd152e3-6528-4c53-af5b-89e1469d391a"
                },
                {
                  "exit_uuid": "99849beb-989d-401d-a4c3-419c4bbf4cf4",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "c89e21ae-863b-4f74-ba98-3249cd992fc9"
                },
                {
                  "exit_uuid": "18a44ba1-2d10-49c6-abcc-0d1ad182ffb0",
                  "name": "Stay in this flow.",
                  "uuid": "1ca006f0-874b-49b7-949b-bc50c221fa38"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "073481f2-38df-445b-816a-fdc2a8846242",
                "destination_uuid": null
              },
              {
                "uuid": "eda04e2d-6b29-41cf-b9af-bf455681d47a",
                "destination_uuid": "261cee32-101b-4b21-880d-b899ee235a50"
              },
              {
                "uuid": "41eda2cd-67c2-4a32-b78b-43fcaacc381e",
                "destination_uuid": "3c6b85e6-460d-4d18-8dcf-578be4d15e83"
              },
              {
                "uuid": "fd5ca37c-e532-4091-8a88-89aac8c6c601",
                "destination_uuid": "b80c9940-95c2-4b9f-a92c-3e7f038cd36c"
              },
              {
                "uuid": "99849beb-989d-401d-a4c3-419c4bbf4cf4",
                "destination_uuid": "ab1c00f3-4d93-4ffc-bfdd-19edbc77d68d"
              },
              {
                "uuid": "18a44ba1-2d10-49c6-abcc-0d1ad182ffb0",
                "destination_uuid": "32502365-1219-4ff5-93fc-e9738c373181"
              }
            ]
          },
          {
            "uuid": "261cee32-101b-4b21-880d-b899ee235a50",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "b2c6d836-001e-4ee5-babf-2ddf7d3774a7"
                },
                "type": "enter_flow",
                "uuid": "da5de5a1-569f-433e-8756-b3e0d68ba008"
              }
            ],
            "exits": [
              {
                "uuid": "1b795a4d-f41f-448d-bc1f-78e3f4e29afb",
                "destination_uuid": "1701732d-51dc-4c93-9974-5614f35f81e1"
              },
              {
                "uuid": "2f0dd05b-16d0-4ec3-a406-d52e9c928307",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "506f8acc-c3ab-4084-8c01-1a1aafa18d4e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "077c5155-fa9c-4dab-942d-3c57be8f8882"
                },
                {
                  "uuid": "9690163f-662d-49f5-9f6d-00ac67d4b70e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b04df5b2-8209-4906-9d8d-d7e099f46e66"
                }
              ],
              "categories": [
                {
                  "uuid": "077c5155-fa9c-4dab-942d-3c57be8f8882",
                  "name": "Complete",
                  "exit_uuid": "1b795a4d-f41f-448d-bc1f-78e3f4e29afb"
                },
                {
                  "uuid": "b04df5b2-8209-4906-9d8d-d7e099f46e66",
                  "name": "Expired",
                  "exit_uuid": "2f0dd05b-16d0-4ec3-a406-d52e9c928307"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "077c5155-fa9c-4dab-942d-3c57be8f8882"
            }
          },
          {
            "uuid": "3c6b85e6-460d-4d18-8dcf-578be4d15e83",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "64bb61b5-1ef7-4d88-9a9a-4926abbc8a14"
                },
                "type": "enter_flow",
                "uuid": "586d7665-91b9-4447-bcc7-344fd72b9d19"
              }
            ],
            "exits": [
              {
                "uuid": "a7614dc0-456d-4613-beda-a58215c16ac6",
                "destination_uuid": "1701732d-51dc-4c93-9974-5614f35f81e1"
              },
              {
                "uuid": "42f0535a-dcc3-44e6-a8ec-91f966b5b189",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "15655f35-c026-4d4a-80f1-83ae66ac6079",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "32775c2b-96c7-476f-89c8-1c76f48a41e0"
                },
                {
                  "uuid": "d2ce54a1-b11e-426d-9c34-5902de6ddad8",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "9da9fd5b-5232-4395-a410-0d0968797b91"
                }
              ],
              "categories": [
                {
                  "uuid": "32775c2b-96c7-476f-89c8-1c76f48a41e0",
                  "name": "Complete",
                  "exit_uuid": "a7614dc0-456d-4613-beda-a58215c16ac6"
                },
                {
                  "uuid": "9da9fd5b-5232-4395-a410-0d0968797b91",
                  "name": "Expired",
                  "exit_uuid": "42f0535a-dcc3-44e6-a8ec-91f966b5b189"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "32775c2b-96c7-476f-89c8-1c76f48a41e0"
            }
          },
          {
            "uuid": "b80c9940-95c2-4b9f-a92c-3e7f038cd36c",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "f76f7d04-89f7-449e-8ebb-d00995cb6330"
                },
                "type": "enter_flow",
                "uuid": "257bc7d0-70ed-4b98-a18d-dac2c602a656"
              }
            ],
            "exits": [
              {
                "uuid": "a861285c-d170-4780-b293-f54e0272510b",
                "destination_uuid": "1701732d-51dc-4c93-9974-5614f35f81e1"
              },
              {
                "uuid": "f23710ec-0332-4996-bed0-758565482bb0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "0cd33e8e-7910-4122-956f-9b68c1dbbadf",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8e1d427a-40f8-4a73-a9a6-a25825bd9a75"
                },
                {
                  "uuid": "14a00872-e2cd-4bd4-aae5-717715993a24",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "4885e55a-b463-41d6-bc16-bcf53ccef6eb"
                }
              ],
              "categories": [
                {
                  "uuid": "8e1d427a-40f8-4a73-a9a6-a25825bd9a75",
                  "name": "Complete",
                  "exit_uuid": "a861285c-d170-4780-b293-f54e0272510b"
                },
                {
                  "uuid": "4885e55a-b463-41d6-bc16-bcf53ccef6eb",
                  "name": "Expired",
                  "exit_uuid": "f23710ec-0332-4996-bed0-758565482bb0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8e1d427a-40f8-4a73-a9a6-a25825bd9a75"
            }
          },
          {
            "uuid": "ab1c00f3-4d93-4ffc-bfdd-19edbc77d68d",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "8fd2d339-66af-47ae-b992-5d0b1e738f18"
                },
                "type": "enter_flow",
                "uuid": "20588ff2-3805-4588-9740-9edcbc9f822e"
              }
            ],
            "exits": [
              {
                "uuid": "669b6ee5-7c23-4a6f-9123-407a77a11019",
                "destination_uuid": "1701732d-51dc-4c93-9974-5614f35f81e1"
              },
              {
                "uuid": "920733be-b91e-414c-95c0-1abf1e2cf12e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "58dfbf31-7376-4123-a6dd-bacf2cf983ed",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "96f2d068-03e6-4996-a473-af357ee1e03b"
                },
                {
                  "uuid": "d73c87a4-d63f-43fa-bbe9-2584249d6eb6",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "77ca2e4f-b0a6-4e36-b600-28c35c0c8e46"
                }
              ],
              "categories": [
                {
                  "uuid": "96f2d068-03e6-4996-a473-af357ee1e03b",
                  "name": "Complete",
                  "exit_uuid": "669b6ee5-7c23-4a6f-9123-407a77a11019"
                },
                {
                  "uuid": "77ca2e4f-b0a6-4e36-b600-28c35c0c8e46",
                  "name": "Expired",
                  "exit_uuid": "920733be-b91e-414c-95c0-1abf1e2cf12e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "96f2d068-03e6-4996-a473-af357ee1e03b"
            }
          },
          {
            "uuid": "32502365-1219-4ff5-93fc-e9738c373181",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8e299081-991d-481f-b2e6-4d0b1cf81e5b"
              }
            ],
            "exits": [
              {
                "uuid": "9af22a37-3d9b-480b-be9d-5eeead3fad49",
                "destination_uuid": "91180cd8-21f3-40b1-ab56-6b89ed574bb0"
              }
            ]
          },
          {
            "uuid": "1701732d-51dc-4c93-9974-5614f35f81e1",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5be3a447-f61f-40b8-9a0e-386f7451d7ea"
              }
            ],
            "exits": [
              {
                "uuid": "5217d67b-8961-4860-9c2a-3ad763352553",
                "destination_uuid": "91180cd8-21f3-40b1-ab56-6b89ed574bb0"
              }
            ]
          },
          {
            "uuid": "91180cd8-21f3-40b1-ab56-6b89ed574bb0",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "4bd087a6-5932-4dfc-b31a-b48324da4a26"
              }
            ],
            "exits": [
              {
                "uuid": "5aad7264-ec39-4358-8f2e-f63e5ad5d969",
                "destination_uuid": "6f101e96-f405-483a-8a2c-4cf87e9c5b47"
              }
            ]
          },
          {
            "uuid": "6f101e96-f405-483a-8a2c-4cf87e9c5b47",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "dd9e42d0-a90d-432f-be76-42de84d3c205",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "f1cd9cb6-6555-4378-ae87-f22fa90c3587",
                  "type": "has_only_phrase",
                  "uuid": "f9129e6d-a4bf-4e93-9385-59b6663e70d9"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "43cd1bd6-387c-447a-a21b-90f4b99315c1",
                  "type": "has_only_phrase",
                  "uuid": "9641b4ce-8608-40bd-81d9-45d12d520c59"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7df34e53-32b0-43ea-9ddc-e938150b826a",
                  "name": "All Responses",
                  "uuid": "dd9e42d0-a90d-432f-be76-42de84d3c205"
                },
                {
                  "exit_uuid": "294bc775-79c7-4e5a-8bc7-4c7a85d462a1",
                  "name": "Yes",
                  "uuid": "f1cd9cb6-6555-4378-ae87-f22fa90c3587"
                },
                {
                  "exit_uuid": "61905147-eed1-4206-a2d8-8cf79702b38c",
                  "name": "No",
                  "uuid": "43cd1bd6-387c-447a-a21b-90f4b99315c1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7df34e53-32b0-43ea-9ddc-e938150b826a",
                "destination_uuid": null
              },
              {
                "uuid": "294bc775-79c7-4e5a-8bc7-4c7a85d462a1",
                "destination_uuid": "eea75a0a-d14c-4869-af87-ce13d25e82ec"
              },
              {
                "uuid": "61905147-eed1-4206-a2d8-8cf79702b38c",
                "destination_uuid": "8e0b3bac-eb54-4b0b-8ee4-6b9b2a6cbfdd"
              }
            ]
          },
          {
            "uuid": "8e0b3bac-eb54-4b0b-8ee4-6b9b2a6cbfdd",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "24c4a3bb-ef0b-453f-bb87-4d9a96f2d63a"
              }
            ],
            "exits": [
              {
                "uuid": "7b28fc4b-89b7-41a6-bbf8-befd519d1b77",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "0b91ceec-5bc2-46a5-a0e1-087c32b37b7f",
            "actions": [
              {
                "uuid": "aa55829e-d8be-426c-9551-7915d025b476",
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
                "uuid": "ba5b013c-c83d-4972-ba25-617321a86eb9",
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
        "uuid": "da211154-f929-4cc5-bae0-36a8a2825ff1",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "17adcc2c-2154-4567-9c60-889ad1f2cc4e",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "06a015eb-fd6a-4686-9b0f-88ba9dbb84fa"
              }
            ],
            "exits": [
              {
                "uuid": "5b21eeb4-701c-4234-ba2a-b29744d506ca",
                "destination_uuid": "4f2f82e5-0f6f-4948-b367-633ea74b2092"
              }
            ]
          },
          {
            "uuid": "8d780833-395f-4b79-8f3b-eb4e9855b364",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fb0c6116-50f8-42c9-ac43-0c21fe6501e6"
              }
            ],
            "exits": [
              {
                "uuid": "1ca00186-70f4-40e2-9ba8-17318be1f29b",
                "destination_uuid": "b7503b57-e728-4aa7-9baa-d35517ecf501"
              }
            ]
          },
          {
            "uuid": "b7503b57-e728-4aa7-9baa-d35517ecf501",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "54ae9ac5-38fd-486b-ad66-211943ecacf1"
              }
            ],
            "exits": [
              {
                "uuid": "519588a0-2cdf-4fbc-bad8-1b92349723b6",
                "destination_uuid": "8afe894c-e25b-4f15-b44d-7ce30cba2264"
              }
            ]
          },
          {
            "uuid": "8afe894c-e25b-4f15-b44d-7ce30cba2264",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d7322cdc-b01f-4536-8056-953fc9cc0f99",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "5e7a5bbe-56b3-437a-a503-fcd59c2255d7",
                  "type": "has_only_phrase",
                  "uuid": "8825818f-37e9-4eb7-bb50-c7775b61c4a0"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "5e7a5bbe-56b3-437a-a503-fcd59c2255d7",
                  "type": "has_only_phrase",
                  "uuid": "1c6b64d0-638a-4101-bc6f-af941a98f209"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a2f08833-0682-42f1-a501-7a5ab6b2b762",
                  "name": "All Responses",
                  "uuid": "d7322cdc-b01f-4536-8056-953fc9cc0f99"
                },
                {
                  "exit_uuid": "6116b018-1ef1-474d-9ed2-64413fa1b117",
                  "name": "image1; image2",
                  "uuid": "5e7a5bbe-56b3-437a-a503-fcd59c2255d7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a2f08833-0682-42f1-a501-7a5ab6b2b762",
                "destination_uuid": null
              },
              {
                "uuid": "6116b018-1ef1-474d-9ed2-64413fa1b117",
                "destination_uuid": "1c5629f4-7fa9-4b9a-b144-8977636d38f8"
              }
            ]
          },
          {
            "uuid": "1c5629f4-7fa9-4b9a-b144-8977636d38f8",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "132f000d-75ef-4d96-b7e9-a0306dddace0"
              }
            ],
            "exits": [
              {
                "uuid": "c3dc13ad-30e3-4b18-a2e6-806227e9fac4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "4f2f82e5-0f6f-4948-b367-633ea74b2092",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "de38c0d6-f667-494f-8fac-24403d22f2bc",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "5fe7f99e-a4ef-47f0-939e-a0cf9a5b7eb6",
                  "type": "has_only_phrase",
                  "uuid": "bbec05ba-5a3f-4475-8f3d-fd8b943a5115"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "5fe7f99e-a4ef-47f0-939e-a0cf9a5b7eb6",
                  "type": "has_only_phrase",
                  "uuid": "0a9b8375-9f52-495b-bd3d-077e4af07f1e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1fec35ef-e7f6-42ec-b9eb-9ecba6280183",
                  "name": "All Responses",
                  "uuid": "de38c0d6-f667-494f-8fac-24403d22f2bc"
                },
                {
                  "exit_uuid": "b6de6c36-b663-4da5-928d-943c02045728",
                  "name": "image1; image2",
                  "uuid": "5fe7f99e-a4ef-47f0-939e-a0cf9a5b7eb6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1fec35ef-e7f6-42ec-b9eb-9ecba6280183",
                "destination_uuid": "8d780833-395f-4b79-8f3b-eb4e9855b364"
              },
              {
                "uuid": "b6de6c36-b663-4da5-928d-943c02045728",
                "destination_uuid": "3e70f10a-fcaa-4dfa-90c9-ca6958cfc4af"
              }
            ]
          },
          {
            "uuid": "3e70f10a-fcaa-4dfa-90c9-ca6958cfc4af",
            "actions": [
              {
                "uuid": "d830f797-30a1-486b-a083-fc6066bc2fa3",
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
                "uuid": "3f458856-d3da-4308-a126-adbdbc10c06f",
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
        "uuid": "f1e1253c-ef12-4e90-8a0b-2b405c6bd844",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1c261e5f-0cc4-4f56-a071-09204bc62203",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "0a3874c3-5e0a-4c0a-b6cb-5f2710d2c7e4"
              }
            ],
            "exits": [
              {
                "uuid": "ec16b6df-864e-4cac-a8a4-bf085ae41c73",
                "destination_uuid": "db739ab7-5911-4f08-a239-714c904bb9b2"
              }
            ]
          },
          {
            "uuid": "db739ab7-5911-4f08-a239-714c904bb9b2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3471b701-c807-4fba-b31d-e6fa132a45a6",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "315d0681-b506-4b6a-a6a8-77fbe1ed93aa",
                  "type": "has_only_phrase",
                  "uuid": "51e7ce7d-abc0-4f6e-88b0-23ff6d20a088"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "08e02e33-3fe5-4f21-88d9-73fe8a710321",
                  "type": "has_only_phrase",
                  "uuid": "40f987e6-d4de-4ff5-bfc0-8b7e2b6dd562"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "00cdccdf-28a5-48b7-b89e-e1caef9beb21",
                  "name": "All Responses",
                  "uuid": "3471b701-c807-4fba-b31d-e6fa132a45a6"
                },
                {
                  "exit_uuid": "1af22648-c37e-4c48-8607-1803a94e785a",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "315d0681-b506-4b6a-a6a8-77fbe1ed93aa"
                },
                {
                  "exit_uuid": "043653dd-f148-4e80-96e9-f815f05ae506",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "08e02e33-3fe5-4f21-88d9-73fe8a710321"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "00cdccdf-28a5-48b7-b89e-e1caef9beb21",
                "destination_uuid": null
              },
              {
                "uuid": "1af22648-c37e-4c48-8607-1803a94e785a",
                "destination_uuid": "e2f2f768-dbc4-4bbf-a649-e38ea4031c80"
              },
              {
                "uuid": "043653dd-f148-4e80-96e9-f815f05ae506",
                "destination_uuid": "6b1bce44-ac1d-4a36-b430-6552ed2c9598"
              }
            ]
          },
          {
            "uuid": "e2f2f768-dbc4-4bbf-a649-e38ea4031c80",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "4abc4392-d630-4256-b504-1c659d55983a"
              }
            ],
            "exits": [
              {
                "uuid": "d7355d9b-b3f7-45e8-b3af-510c3e7ef1ae",
                "destination_uuid": "f513aeb0-a5df-4837-9b68-efe18517f11b"
              }
            ]
          },
          {
            "uuid": "6b1bce44-ac1d-4a36-b430-6552ed2c9598",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "6bcc28e4-cb50-453e-9c45-9bcc6d6a32ca"
              }
            ],
            "exits": [
              {
                "uuid": "5001ed2e-5211-4e3c-ab19-13e42cb9ee74",
                "destination_uuid": "f513aeb0-a5df-4837-9b68-efe18517f11b"
              }
            ]
          },
          {
            "uuid": "f513aeb0-a5df-4837-9b68-efe18517f11b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "65d5ffe6-7844-4465-bf23-eaf80018b906",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "408f0dc2-4272-4323-b57d-da02cc580e80",
                  "type": "has_only_phrase",
                  "uuid": "9774116d-b40e-45ad-b79d-8f68370da119"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "8004e0db-dd59-485a-9bce-70a0d420dce0",
                  "type": "has_only_phrase",
                  "uuid": "515b854f-2b05-4b88-a594-d8822d501d20"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "eef0f45a-2a5e-4d21-8eb5-abddc75b1620",
                  "type": "has_only_phrase",
                  "uuid": "7fb8fa40-5f0a-4a4f-8f30-936b77def005"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c243b370-a775-43f0-bd2a-568c5a6e2258",
                  "name": "All Responses",
                  "uuid": "65d5ffe6-7844-4465-bf23-eaf80018b906"
                },
                {
                  "exit_uuid": "fbd941a0-4fb3-4a08-871d-a55345ad5dbb",
                  "name": "Hello",
                  "uuid": "408f0dc2-4272-4323-b57d-da02cc580e80"
                },
                {
                  "exit_uuid": "4cb4729e-1ea2-408e-93d0-d673fcbb7b55",
                  "name": "Goodbye",
                  "uuid": "8004e0db-dd59-485a-9bce-70a0d420dce0"
                },
                {
                  "exit_uuid": "87cd1df4-98cb-4f2e-acfb-076b779dd9df",
                  "name": "Goodbye",
                  "uuid": "eef0f45a-2a5e-4d21-8eb5-abddc75b1620"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c243b370-a775-43f0-bd2a-568c5a6e2258",
                "destination_uuid": null
              },
              {
                "uuid": "fbd941a0-4fb3-4a08-871d-a55345ad5dbb",
                "destination_uuid": "d7c0cc03-2655-426a-a55c-520ce3532ed8"
              },
              {
                "uuid": "4cb4729e-1ea2-408e-93d0-d673fcbb7b55",
                "destination_uuid": "63594867-105d-4933-9693-b63ccddc72a2"
              },
              {
                "uuid": "87cd1df4-98cb-4f2e-acfb-076b779dd9df",
                "destination_uuid": "63594867-105d-4933-9693-b63ccddc72a2"
              }
            ]
          },
          {
            "uuid": "d7c0cc03-2655-426a-a55c-520ce3532ed8",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "656f907b-d818-4fe4-81c4-a54cc58e9d6f"
              }
            ],
            "exits": [
              {
                "uuid": "bb6718fc-708e-4fef-882b-e5e0d03ebc71",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "63594867-105d-4933-9693-b63ccddc72a2",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a5206977-b8b7-4e42-bde2-9652a65219be"
              }
            ],
            "exits": [
              {
                "uuid": "446d473a-1dbf-4cc4-984d-f4da171f60d3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "4e97bc63-e0c6-48dc-a645-21f124aab54c",
            "actions": [
              {
                "uuid": "bce71acf-1e16-4e22-9189-619df1d66f43",
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
                "uuid": "8cc1320f-8ab8-4307-9116-1d82d135eaa9",
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
        "uuid": "bd0d4c35-29fc-4b91-a9c8-a437f56dcb56",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0fec1535-226b-4526-88a6-9d4fc7431c35",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e6bbcfd8-820a-4a23-b644-0d93b2b4e726"
              }
            ],
            "exits": [
              {
                "uuid": "fff85c34-0bbb-44a8-a3f3-712147a693dc",
                "destination_uuid": "b850946a-eaa7-41ff-a0f3-37ef8765989a"
              }
            ]
          },
          {
            "uuid": "b850946a-eaa7-41ff-a0f3-37ef8765989a",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "a131fa78-2069-4844-9af2-cc48efae74f4"
              }
            ],
            "exits": [
              {
                "uuid": "94c3b37c-8776-4ad4-9fd1-aa626df36291",
                "destination_uuid": "51c43ac8-9b8c-4ac5-bd7c-d2f3323018cb"
              }
            ]
          },
          {
            "uuid": "51c43ac8-9b8c-4ac5-bd7c-d2f3323018cb",
            "actions": [],
            "exits": [
              {
                "uuid": "67260f12-011d-414b-8cff-685bb1a7d697",
                "destination_uuid": "779e00d3-ff61-41a3-8148-3e6fbf6b7f59"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "436087c3-bb42-42df-b675-6ac20de7d3fa",
              "cases": [],
              "categories": [
                {
                  "uuid": "436087c3-bb42-42df-b675-6ac20de7d3fa",
                  "name": "All Responses",
                  "exit_uuid": "67260f12-011d-414b-8cff-685bb1a7d697"
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
            "uuid": "779e00d3-ff61-41a3-8148-3e6fbf6b7f59",
            "actions": [
              {
                "uuid": "1aea8bbe-d969-4cc9-9db7-bb66385e6efb",
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
                "uuid": "bd5cebb5-9dc1-4932-b25e-f5a23e059dda",
                "destination_uuid": "7e8d225b-81bb-4c8f-9fe4-750e044b20b2"
              }
            ]
          },
          {
            "uuid": "7e8d225b-81bb-4c8f-9fe4-750e044b20b2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d9d2c5ea-8089-4b23-a552-df88c83bc1e7",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "c0260b1f-a071-48fb-9c73-023a7a25eedb",
                  "type": "has_only_phrase",
                  "uuid": "eed6ab98-6b4e-4504-8d91-495aa4dcb5cc"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "ff34b792-c43e-4a1a-88c7-f99e913d5be2",
                  "type": "has_only_phrase",
                  "uuid": "1af7b171-abee-40cc-a3c1-20c5fb4a9f20"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e3cf11e7-9323-4284-bbdb-f488a1c4d0ab",
                  "name": "All Responses",
                  "uuid": "d9d2c5ea-8089-4b23-a552-df88c83bc1e7"
                },
                {
                  "exit_uuid": "bba33145-b39a-4d9f-963a-8f5caf19b53f",
                  "name": "1",
                  "uuid": "c0260b1f-a071-48fb-9c73-023a7a25eedb"
                },
                {
                  "exit_uuid": "ec956254-d232-4026-b51e-fc0817345202",
                  "name": "2",
                  "uuid": "ff34b792-c43e-4a1a-88c7-f99e913d5be2"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "e3cf11e7-9323-4284-bbdb-f488a1c4d0ab",
                "destination_uuid": "668e487c-3a49-4fe2-b16f-1126da3b8ccc"
              },
              {
                "uuid": "bba33145-b39a-4d9f-963a-8f5caf19b53f",
                "destination_uuid": "233e2a0e-db14-43cd-b523-2092baa9555a"
              },
              {
                "uuid": "ec956254-d232-4026-b51e-fc0817345202",
                "destination_uuid": "d662d332-677d-4d6c-9985-3fb529e0e332"
              }
            ]
          },
          {
            "uuid": "233e2a0e-db14-43cd-b523-2092baa9555a",
            "actions": [
              {
                "uuid": "9ffa87ed-8641-4dd9-ab26-cad560f36552",
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
                "uuid": "a2150946-1aac-4e8f-9155-3ddad3d3184d",
                "destination_uuid": "76322391-5c90-4ea0-b6ce-c3ae8a3ad103"
              }
            ]
          },
          {
            "uuid": "d662d332-677d-4d6c-9985-3fb529e0e332",
            "actions": [
              {
                "uuid": "d842a39a-1f0c-4073-9d30-548a8491dde1",
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
                "uuid": "f799abe1-4fef-43ef-a864-9812bdfde658",
                "destination_uuid": "88b9dc97-28fa-4c8d-95fe-993146f0d7b1"
              }
            ]
          },
          {
            "uuid": "668e487c-3a49-4fe2-b16f-1126da3b8ccc",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "17935a71-701d-4cf8-bd11-7e10e4e90fcd"
              }
            ],
            "exits": [
              {
                "uuid": "681f4785-c8ad-4a08-b001-61636d0dfcd9",
                "destination_uuid": "7983e44a-2c54-4b86-a714-e2dda06d1f74"
              }
            ]
          },
          {
            "uuid": "7983e44a-2c54-4b86-a714-e2dda06d1f74",
            "actions": [],
            "exits": [
              {
                "uuid": "051a98cc-f416-4a14-911e-995cae406e3c",
                "destination_uuid": "6ac3df22-f05f-480f-b9b7-c24f1e11cb84"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "39fdfa50-3c8a-4c64-bdc5-9a393fd70664",
              "cases": [],
              "categories": [
                {
                  "uuid": "39fdfa50-3c8a-4c64-bdc5-9a393fd70664",
                  "name": "All Responses",
                  "exit_uuid": "051a98cc-f416-4a14-911e-995cae406e3c"
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
            "uuid": "6ac3df22-f05f-480f-b9b7-c24f1e11cb84",
            "actions": [
              {
                "uuid": "afeaca48-1bc3-40d3-ad62-9ecf94df34a1",
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
                "uuid": "a0df5ae9-6cde-4432-a26d-42e48557c340",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "76322391-5c90-4ea0-b6ce-c3ae8a3ad103",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7f81f325-fc79-4182-b6b4-204e2b5dba4a"
              }
            ],
            "exits": [
              {
                "uuid": "b14ecb4e-3804-4294-a0a0-9e9482b59b5c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "88b9dc97-28fa-4c8d-95fe-993146f0d7b1",
            "actions": [
              {
                "uuid": "60f96fe5-da93-4cbb-a5ab-d6b1aab5d1c3",
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
                "uuid": "18c38605-02c0-437e-81d6-a2fb2e029997",
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
        "uuid": "9d05c226-6b83-4c16-8181-278e24249eaf",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "dd1fec2b-7846-4548-b486-ac516148be22",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "0c184b97-e5df-4052-9fdb-31e5da07c3e6"
              }
            ],
            "exits": [
              {
                "uuid": "46bf5fc2-9b3a-4f92-a01a-8ad7e7e03101",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f1404ba5-b226-4e7b-831e-e7b8287342f9",
            "actions": [
              {
                "attachments": [],
                "text": "This text appears below the image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "72a31883-51a2-457f-aaea-a39fb6844502"
              }
            ],
            "exits": [
              {
                "uuid": "e8ca53ea-2b7a-46d1-ae8b-1190b3eddd24",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "8691ae7f-84f6-49ea-ac71-918109c679d5",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/conversations/mod_welcome/guide1/welcome01.jpg"
                ],
                "text": "This text appears above the image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4197e3d8-4699-4e4f-97cd-90a65f944fe6"
              }
            ],
            "exits": [
              {
                "uuid": "1bd7bff1-f063-4171-87f2-a6e4ad0925a2",
                "destination_uuid": "b121bbd3-7c93-421e-a09e-e1d5f066f2b7"
              }
            ]
          },
          {
            "uuid": "b121bbd3-7c93-421e-a09e-e1d5f066f2b7",
            "actions": [
              {
                "attachments": [],
                "text": "This text appears below the image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "010f6bff-41ba-4efc-8735-2b25ca3d8228"
              }
            ],
            "exits": [
              {
                "uuid": "79049aca-6877-4580-ae6e-cbddbf4973ee",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "07a81d18-3f32-434a-8ee3-b789b3603762",
            "actions": [
              {
                "attachments": [],
                "text": "This is descriptive text.  https://plh-demo1.idems.international/chat/msg-info?character=description",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "88b7c804-a4af-4a5b-bb96-5459e8e1782b"
              }
            ],
            "exits": [
              {
                "uuid": "6200fb60-e371-4535-82e6-e13b161a235c",
                "destination_uuid": "4154667b-bd6c-4b8b-95a3-2d5debf45f8c"
              }
            ]
          },
          {
            "uuid": "4154667b-bd6c-4b8b-95a3-2d5debf45f8c",
            "actions": [
              {
                "attachments": [],
                "text": "This text is said by @fields.guide. https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "712afe85-5ad1-4f8d-8cba-abd70281b1de"
              }
            ],
            "exits": [
              {
                "uuid": "59dc200d-886f-41a0-88b3-bb6acf60bf68",
                "destination_uuid": "1743b7d3-43da-49a0-a553-0f9c847b45bc"
              }
            ]
          },
          {
            "uuid": "1743b7d3-43da-49a0-a553-0f9c847b45bc",
            "actions": [
              {
                "attachments": [],
                "text": "This text is said by @fields.neighbour. https://plh-demo1.idems.international/chat/msg-info?character=neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "98310b92-100c-4dce-9012-566597b4dda2"
              }
            ],
            "exits": [
              {
                "uuid": "f7024f50-25f0-41d7-b4e1-e156fa2585a0",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1ea0329d-a7d8-4b70-acba-4bbb16060931",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e567d196-001e-48a1-b6bc-4ab6ddedc05c"
              }
            ],
            "exits": [
              {
                "uuid": "b2b0af36-c51b-4d4a-abb8-7fdb75437254",
                "destination_uuid": "9c86af2d-3a46-4aa4-8956-d4dbeb722221"
              }
            ]
          },
          {
            "uuid": "9c86af2d-3a46-4aa4-8956-d4dbeb722221",
            "actions": [
              {
                "uuid": "d2ff9f74-a993-4e9d-85a1-760811929205",
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
                "uuid": "fd03115e-f485-4cd1-a2d1-551df80a8882",
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
        "uuid": "f8a64166-96b4-4bdb-891c-6d42d34b03c1",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f32c268e-b7a1-4046-b496-220ef0da99f1",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3a8316a0-abec-4c1d-9c98-4227506474e2"
              }
            ],
            "exits": [
              {
                "uuid": "af5873d5-e324-4383-8c6b-0bd4cd1ed113",
                "destination_uuid": "76e3740f-4726-4223-8ab3-1a594a0a5b8a"
              }
            ]
          },
          {
            "uuid": "76e3740f-4726-4223-8ab3-1a594a0a5b8a",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "ff5fb95e-7f3a-4d95-8d06-5aa7bfc72073"
              }
            ],
            "exits": [
              {
                "uuid": "02e40361-4e9e-49e2-8a22-140f32a34a49",
                "destination_uuid": "3b75186e-935d-4f2d-987e-2269ca60f099"
              }
            ]
          },
          {
            "uuid": "3b75186e-935d-4f2d-987e-2269ca60f099",
            "actions": [],
            "exits": [
              {
                "uuid": "a777bc8e-d5e8-4918-b73d-6ef214fb2df6",
                "destination_uuid": "e8a7809a-357c-4ade-b193-a29599c5e26d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f9be425a-33bf-48b8-84e3-253a7d8b5471",
              "cases": [],
              "categories": [
                {
                  "uuid": "f9be425a-33bf-48b8-84e3-253a7d8b5471",
                  "name": "All Responses",
                  "exit_uuid": "a777bc8e-d5e8-4918-b73d-6ef214fb2df6"
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
            "uuid": "e8a7809a-357c-4ade-b193-a29599c5e26d",
            "actions": [
              {
                "uuid": "1ba9b9f4-0aa2-4c3a-a18b-346b94d97018",
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
                "uuid": "501aa63e-a148-4b89-9ffb-40e2e6455539",
                "destination_uuid": "23fabda0-c6a0-4b72-b9a8-4cebb52a8c3d"
              }
            ]
          },
          {
            "uuid": "23fabda0-c6a0-4b72-b9a8-4cebb52a8c3d",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "5f19887a-af17-4247-b5d8-cc518792e3d4"
                },
                "type": "enter_flow",
                "uuid": "90353cd0-09f2-4ef6-ae31-52a06b08f6b6"
              }
            ],
            "exits": [
              {
                "uuid": "42e579a9-e4c4-433e-85f3-cf1670478b43",
                "destination_uuid": "31e89c2c-99f8-42b4-9c5f-717babd086da"
              },
              {
                "uuid": "e5f56b8b-5059-47ae-873f-116471e1c199",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "f42f00e0-f05e-483c-baec-b3efafc47437",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "07bfdcdf-7f9a-4039-bda9-58dd5ad87b1c"
                },
                {
                  "uuid": "fa417322-9fd2-4241-9a72-a5e9c96c25bc",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "90d9b770-7068-4052-90d9-b83dd72df848"
                }
              ],
              "categories": [
                {
                  "uuid": "07bfdcdf-7f9a-4039-bda9-58dd5ad87b1c",
                  "name": "Complete",
                  "exit_uuid": "42e579a9-e4c4-433e-85f3-cf1670478b43"
                },
                {
                  "uuid": "90d9b770-7068-4052-90d9-b83dd72df848",
                  "name": "Expired",
                  "exit_uuid": "e5f56b8b-5059-47ae-873f-116471e1c199"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "07bfdcdf-7f9a-4039-bda9-58dd5ad87b1c"
            }
          },
          {
            "uuid": "31e89c2c-99f8-42b4-9c5f-717babd086da",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "6b7c8c94-5cd9-4596-b7ae-5ddfd1d76c0b"
              }
            ],
            "exits": [
              {
                "uuid": "5159e125-e267-430d-902e-bd160b9342a0",
                "destination_uuid": "9102644d-7d08-4f36-b974-2c3608019ecd"
              }
            ]
          },
          {
            "uuid": "9102644d-7d08-4f36-b974-2c3608019ecd",
            "actions": [],
            "exits": [
              {
                "uuid": "88d0747c-da7f-4d9b-b170-db4f312660e1",
                "destination_uuid": "f8230f7b-6ca5-4701-a473-a9358ad8503a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2664a2c1-0c43-4999-9dba-8f47c4a5dc51",
              "cases": [],
              "categories": [
                {
                  "uuid": "2664a2c1-0c43-4999-9dba-8f47c4a5dc51",
                  "name": "All Responses",
                  "exit_uuid": "88d0747c-da7f-4d9b-b170-db4f312660e1"
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
            "uuid": "f8230f7b-6ca5-4701-a473-a9358ad8503a",
            "actions": [
              {
                "uuid": "32cbb408-1f25-4d0f-8d54-67095b5975c0",
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
                "uuid": "74af07db-fbdf-40cf-bc92-84b8dc982407",
                "destination_uuid": "21f3056d-df3f-4493-b18f-ce3619c4a020"
              }
            ]
          },
          {
            "uuid": "21f3056d-df3f-4493-b18f-ce3619c4a020",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e0bd576e-58f4-4510-a62c-2fdb3f88ce21",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "c3cc025b-684a-46bb-892f-48e34affdfcb",
                  "type": "has_only_phrase",
                  "uuid": "688c836e-8850-4a73-873d-37842461dd7e"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "9033b9d5-ae0a-49c5-920c-fff50a4ecdb2",
                  "type": "has_only_phrase",
                  "uuid": "7e414299-e83b-4bdd-b506-7d8cb0c33bd6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "52e1d63e-914d-4525-9e80-0cdbf3d026b1",
                  "name": "All Responses",
                  "uuid": "e0bd576e-58f4-4510-a62c-2fdb3f88ce21"
                },
                {
                  "exit_uuid": "01da0ea6-5904-4ede-b8f7-68695d61bffa",
                  "name": "guide1",
                  "uuid": "c3cc025b-684a-46bb-892f-48e34affdfcb"
                },
                {
                  "exit_uuid": "5d8134b2-1dc6-4651-90d7-cdfb4ecda92f",
                  "name": "guide2",
                  "uuid": "9033b9d5-ae0a-49c5-920c-fff50a4ecdb2"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "52e1d63e-914d-4525-9e80-0cdbf3d026b1",
                "destination_uuid": null
              },
              {
                "uuid": "01da0ea6-5904-4ede-b8f7-68695d61bffa",
                "destination_uuid": "ccedbf1b-71d9-46a9-8231-01dded38c4c5"
              },
              {
                "uuid": "5d8134b2-1dc6-4651-90d7-cdfb4ecda92f",
                "destination_uuid": "b3311ee4-8703-4dcc-a8ad-b910682907ab"
              }
            ]
          },
          {
            "uuid": "ccedbf1b-71d9-46a9-8231-01dded38c4c5",
            "actions": [
              {
                "uuid": "d24abb87-cbe6-4b32-8810-80ede7087f47",
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
                "uuid": "c040de00-9a62-4a76-a2fe-660da6a8ec59",
                "destination_uuid": "68f99be6-1087-4399-9493-28c8ac1de2fc"
              }
            ]
          },
          {
            "uuid": "b3311ee4-8703-4dcc-a8ad-b910682907ab",
            "actions": [
              {
                "uuid": "6491966c-97ff-4322-8fd1-e73590e41a0f",
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
                "uuid": "db2e49a6-8d68-4f13-bff9-2fdf417b326b",
                "destination_uuid": "68f99be6-1087-4399-9493-28c8ac1de2fc"
              }
            ]
          },
          {
            "uuid": "68f99be6-1087-4399-9493-28c8ac1de2fc",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/conversations/mod_welcome/@fields.guidenumber/welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success   https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "604f305d-5a5f-48cc-a6ad-7237579e817f"
              }
            ],
            "exits": [
              {
                "uuid": "f9e4f8c9-8a11-41aa-8073-b0090aa346cb",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "855f16a4-d02b-4049-8a3a-16457a11c21a",
            "actions": [
              {
                "uuid": "910a45fb-4139-4dcc-bc4f-2ddaf48cb121",
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
                "uuid": "f6610075-ab6e-4885-9d93-9be7d5b48a73",
                "destination_uuid": "57fa68e6-9f99-4714-a1b7-c931767b53fc"
              }
            ]
          },
          {
            "uuid": "57fa68e6-9f99-4714-a1b7-c931767b53fc",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "01da970e-dee9-43a9-921b-5c0a1c5ff0dc"
                },
                "type": "enter_flow",
                "uuid": "d2e6499e-e2d9-43d2-853e-cbd38bf8e992"
              }
            ],
            "exits": [
              {
                "uuid": "37c29a0b-4050-49e0-8215-941aa69ca3f8",
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
        "uuid": "fefc3461-6fb9-494f-99f1-38c635f57f8e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b5777d11-37ab-4330-9ac1-7eaec749ccc1",
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
                "uuid": "dc4ebc7c-075e-4479-9b1f-9c3be1db1c02"
              }
            ],
            "exits": [
              {
                "uuid": "0360b1d0-55fc-4206-af4a-8d4fdf658ae2",
                "destination_uuid": "1da8351c-55e8-4bb3-9947-ab70294d7af7"
              }
            ]
          },
          {
            "uuid": "1da8351c-55e8-4bb3-9947-ab70294d7af7",
            "actions": [],
            "exits": [
              {
                "uuid": "ed681629-d5ab-455a-8199-f39c840fdbcd",
                "destination_uuid": "90ed9725-e0be-4dc0-9022-da8c73d8275d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8822b494-12ee-4978-ac37-e2cddd363db2",
              "cases": [],
              "categories": [
                {
                  "uuid": "8822b494-12ee-4978-ac37-e2cddd363db2",
                  "name": "All Responses",
                  "exit_uuid": "ed681629-d5ab-455a-8199-f39c840fdbcd"
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
            "uuid": "90ed9725-e0be-4dc0-9022-da8c73d8275d",
            "actions": [
              {
                "uuid": "600d12c2-8c60-4ea2-b989-eb5c67b2d456",
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
                "uuid": "f5f3861b-c542-4aa6-9015-8995b9ae3937",
                "destination_uuid": "1d7e4391-6f95-42f4-9aa0-f4b0a178ba12"
              }
            ]
          },
          {
            "uuid": "1d7e4391-6f95-42f4-9aa0-f4b0a178ba12",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9dc8d35b-4131-4637-a510-165ea7ef2107"
              }
            ],
            "exits": [
              {
                "uuid": "dbd6554b-312f-4712-91ee-cf2e0522eb0b",
                "destination_uuid": "46713ec8-7959-4710-a05f-9663cf32812e"
              }
            ]
          },
          {
            "uuid": "46713ec8-7959-4710-a05f-9663cf32812e",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/conversations/mod_welcome/@fields.guidenumber/welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f27d6fea-ab6c-4158-9038-da9f610a9a92"
              }
            ],
            "exits": [
              {
                "uuid": "51188d31-2612-4d99-b490-3c53611f086d",
                "destination_uuid": "0d125686-ca8e-41e4-89bf-8c591bf93c19"
              }
            ]
          },
          {
            "uuid": "0d125686-ca8e-41e4-89bf-8c591bf93c19",
            "actions": [
              {
                "flow": {
                  "name": "calm_5",
                  "uuid": "8172cf2e-b1a9-434d-a1c3-d07b6ac864cd"
                },
                "type": "enter_flow",
                "uuid": "174c19fb-7fa1-4405-99c7-781e1ef36f13"
              }
            ],
            "exits": [
              {
                "uuid": "d4022b01-efa9-481e-92ab-fd3108bf22a8",
                "destination_uuid": "3e794224-8710-4ac1-a7b9-b1b517ecda96"
              },
              {
                "uuid": "2c49546a-ed3f-4cb9-811d-ec60791f561b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ccc25bfd-723a-4ec8-842d-598efd28c120",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "5d58c06a-829c-4a03-bf2e-a86a0b10fc0a"
                },
                {
                  "uuid": "f5b36905-fdf0-4b0f-947b-2a2ce094f05d",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d460751c-d019-4e28-8df9-50b99fab894c"
                }
              ],
              "categories": [
                {
                  "uuid": "5d58c06a-829c-4a03-bf2e-a86a0b10fc0a",
                  "name": "Complete",
                  "exit_uuid": "d4022b01-efa9-481e-92ab-fd3108bf22a8"
                },
                {
                  "uuid": "d460751c-d019-4e28-8df9-50b99fab894c",
                  "name": "Expired",
                  "exit_uuid": "2c49546a-ed3f-4cb9-811d-ec60791f561b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "5d58c06a-829c-4a03-bf2e-a86a0b10fc0a"
            }
          },
          {
            "uuid": "3e794224-8710-4ac1-a7b9-b1b517ecda96",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a312c556-0c32-46f7-997f-498531567503"
              }
            ],
            "exits": [
              {
                "uuid": "51d3bf6a-c7eb-4ccd-a08c-c074619411c8",
                "destination_uuid": "20e1a98c-6524-4a22-92c2-2d3d6b4bff7c"
              }
            ]
          },
          {
            "uuid": "20e1a98c-6524-4a22-92c2-2d3d6b4bff7c",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c034a4ca-0e46-46b3-855b-b4efa70de08e"
              }
            ],
            "exits": [
              {
                "uuid": "ff105d5d-70e8-4df1-a3eb-28858570825d",
                "destination_uuid": "103176ad-5b1b-412b-84a8-d3f3035145ea"
              }
            ]
          },
          {
            "uuid": "103176ad-5b1b-412b-84a8-d3f3035145ea",
            "actions": [],
            "exits": [
              {
                "uuid": "e463f939-f43e-487e-a9fc-1d9baacceefe",
                "destination_uuid": "db3f2d76-7b92-4b88-8893-2809a37a4ca3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7738a3d3-9189-4e45-93af-de3cae0c33a5",
              "cases": [],
              "categories": [
                {
                  "uuid": "7738a3d3-9189-4e45-93af-de3cae0c33a5",
                  "name": "All Responses",
                  "exit_uuid": "e463f939-f43e-487e-a9fc-1d9baacceefe"
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
            "uuid": "db3f2d76-7b92-4b88-8893-2809a37a4ca3",
            "actions": [
              {
                "uuid": "bf555bac-6ae5-4d30-afe6-36e60d77e481",
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
                "uuid": "785d8103-9a7d-4ba5-866a-112a5f37144a",
                "destination_uuid": "b1c860e3-2184-47cd-9d95-13f6c732e064"
              }
            ]
          },
          {
            "uuid": "b1c860e3-2184-47cd-9d95-13f6c732e064",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "43267b6b-3c17-4275-aa6c-e438cedf4b0c"
              }
            ],
            "exits": [
              {
                "uuid": "e142c6f2-419e-4ead-9dae-172745fdb9a4",
                "destination_uuid": "f2ab0d75-0bf5-4b6a-80f5-eeda621518af"
              }
            ]
          },
          {
            "uuid": "f2ab0d75-0bf5-4b6a-80f5-eeda621518af",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0fff67ed-3e73-425f-b42e-983acb55a9b1"
              }
            ],
            "exits": [
              {
                "uuid": "d0ba0158-8abc-46fa-b01a-5132a65decf8",
                "destination_uuid": "c3bef875-2faf-4059-a940-ffbe6c9a20e2"
              }
            ]
          },
          {
            "uuid": "c3bef875-2faf-4059-a940-ffbe6c9a20e2",
            "actions": [
              {
                "uuid": "a693edae-fc7e-4c1f-9ab7-bf1f066b0ebd",
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
                "uuid": "b6ff5b53-39a2-4d75-b17f-e4ae47061dbe",
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
        "uuid": "0bc48b7e-d0fd-4fcf-b850-b76b8649fd9e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "106cbfec-d47f-4b37-844b-bbb220c47686",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/conversations/mod_welcome/@fields.guidenumber/welcome03.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b961f396-4824-452f-b5d2-8a75a729aa01"
              }
            ],
            "exits": [
              {
                "uuid": "a183611f-b9da-41d6-81e6-ea218fc5c0f7",
                "destination_uuid": "94ae1993-7bdb-44c6-9260-6cbda1d0f277"
              }
            ]
          },
          {
            "uuid": "94ae1993-7bdb-44c6-9260-6cbda1d0f277",
            "actions": [
              {
                "uuid": "2936a5e3-0f62-45a6-9a77-9d957a41ff69",
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
                "uuid": "63097fab-df83-4f22-9116-42c2ea244b8b",
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
        "uuid": "8436b72f-ad64-4a78-9678-3cd4a0af99f0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "fe122b73-8b10-4928-b9ed-16526c1ddc69",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5dd74a38-55ed-4bdb-8b78-e5ed9c433fbc"
              }
            ],
            "exits": [
              {
                "uuid": "aac89985-d54d-434d-94e3-d52463c9be7a",
                "destination_uuid": "42a44b67-5cb8-40c0-b2d2-24c5eacef69c"
              }
            ]
          },
          {
            "uuid": "42a44b67-5cb8-40c0-b2d2-24c5eacef69c",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/conversations/mod_welcome/@fields.guidenumber/welcome05.jpg"
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
                "uuid": "60fac78e-74bf-4cdc-acc6-6856fc93ab01"
              }
            ],
            "exits": [
              {
                "uuid": "fe10e2be-fef4-46c8-b8ed-c7d0ebc26c2a",
                "destination_uuid": "65c5ca91-caf7-4517-9c64-a022fcce0e20"
              }
            ]
          },
          {
            "uuid": "65c5ca91-caf7-4517-9c64-a022fcce0e20",
            "actions": [],
            "exits": [
              {
                "uuid": "4709480e-fcd4-404d-906e-83de77367822",
                "destination_uuid": "10aa094a-caed-486c-bf0e-ecbd3714ed6f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ae385b98-23dd-45cb-a1f5-8a5d2f01c52c",
              "cases": [],
              "categories": [
                {
                  "uuid": "ae385b98-23dd-45cb-a1f5-8a5d2f01c52c",
                  "name": "All Responses",
                  "exit_uuid": "4709480e-fcd4-404d-906e-83de77367822"
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
            "uuid": "10aa094a-caed-486c-bf0e-ecbd3714ed6f",
            "actions": [
              {
                "uuid": "9d783ed3-e100-497c-8248-e79c9c08d816",
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
                "uuid": "b53c16d9-9bb4-4f5c-916b-56ed5dfaf66f",
                "destination_uuid": "6fab7580-9107-4a4d-9d5d-501eebd587fe"
              }
            ]
          },
          {
            "uuid": "6fab7580-9107-4a4d-9d5d-501eebd587fe",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ac072f16-2f3f-4c19-bc54-b65d8036902b",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "e1f177db-1df6-4ad5-b350-a7029a7a744a",
                  "type": "has_only_phrase",
                  "uuid": "54740de7-c073-4026-871d-b27969156054"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "e1f177db-1df6-4ad5-b350-a7029a7a744a",
                  "type": "has_only_phrase",
                  "uuid": "260e68ed-9bb8-4020-bee0-3f4e93128246"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "e1f177db-1df6-4ad5-b350-a7029a7a744a",
                  "type": "has_only_phrase",
                  "uuid": "a9023675-7c43-4341-b962-6db3f0625a78"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "e1f177db-1df6-4ad5-b350-a7029a7a744a",
                  "type": "has_only_phrase",
                  "uuid": "872b752b-b175-43a3-8539-113ea6e85cc8"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "1cbce0a2-b14d-468e-be86-cb252d8b02cd",
                  "type": "has_only_phrase",
                  "uuid": "0987916f-81f7-4a57-9cec-410eb7628fa3"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "1cbce0a2-b14d-468e-be86-cb252d8b02cd",
                  "type": "has_only_phrase",
                  "uuid": "a6cf0ae1-9103-4a66-a19f-816018934bfb"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "1cbce0a2-b14d-468e-be86-cb252d8b02cd",
                  "type": "has_only_phrase",
                  "uuid": "78243c09-b6e3-4d49-b060-1acc3fef915a"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "1cbce0a2-b14d-468e-be86-cb252d8b02cd",
                  "type": "has_only_phrase",
                  "uuid": "00d01275-0455-4599-8665-1d9c2952f241"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1d4223b9-a9c7-4d99-b63c-2ca4e32bbe3b",
                  "name": "All Responses",
                  "uuid": "ac072f16-2f3f-4c19-bc54-b65d8036902b"
                },
                {
                  "exit_uuid": "e25bef7d-4d99-48ac-9b74-5da5de97ea00",
                  "name": "0;1;2;3",
                  "uuid": "e1f177db-1df6-4ad5-b350-a7029a7a744a"
                },
                {
                  "exit_uuid": "147c954e-9afd-43b8-aaa4-4a06a2cbe67e",
                  "name": "4;5;6;7",
                  "uuid": "1cbce0a2-b14d-468e-be86-cb252d8b02cd"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "1d4223b9-a9c7-4d99-b63c-2ca4e32bbe3b",
                "destination_uuid": null
              },
              {
                "uuid": "e25bef7d-4d99-48ac-9b74-5da5de97ea00",
                "destination_uuid": "77590c52-c353-4b65-989c-a6aa3def4a48"
              },
              {
                "uuid": "147c954e-9afd-43b8-aaa4-4a06a2cbe67e",
                "destination_uuid": "010c70f9-094e-41f7-b1f0-31457e7f74ac"
              }
            ]
          },
          {
            "uuid": "77590c52-c353-4b65-989c-a6aa3def4a48",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/conversations/mod_welcome/@fields.guidenumber/welcome06.jpg"
                ],
                "text": "We know it is hard to find time in our busy lives. Well done for trying your best!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "39ac5973-6616-494e-ba63-9a823a5994f1"
              }
            ],
            "exits": [
              {
                "uuid": "611e47c2-2d06-46af-b5dd-cd604e840684",
                "destination_uuid": "349d8065-7d8a-41cd-a10f-e6eb644f55cb"
              }
            ]
          },
          {
            "uuid": "010c70f9-094e-41f7-b1f0-31457e7f74ac",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/stickers/sticker01.jpg"
                ],
                "text": "Well done for spending time with your teen, it makes all the difference!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "8caa7a5a-a0ee-4c5c-854b-194aafc2c274"
              }
            ],
            "exits": [
              {
                "uuid": "6823f2fe-a335-4862-becb-acf9f086a375",
                "destination_uuid": "349d8065-7d8a-41cd-a10f-e6eb644f55cb"
              }
            ]
          },
          {
            "uuid": "349d8065-7d8a-41cd-a10f-e6eb644f55cb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e484b0a8-dea8-41d5-9e4c-ac74479e7e17",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "15be366b-a7ac-4f87-b32f-3b436b479731",
                  "type": "has_only_phrase",
                  "uuid": "658db0b3-285f-401c-9ca8-30277e02daa0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c8a7aae7-4799-40ee-8c08-e75b16490fab",
                  "name": "All Responses",
                  "uuid": "e484b0a8-dea8-41d5-9e4c-ac74479e7e17"
                },
                {
                  "exit_uuid": "4eda7241-fe50-4f69-a419-7ad20f06db39",
                  "name": "Next",
                  "uuid": "15be366b-a7ac-4f87-b32f-3b436b479731"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c8a7aae7-4799-40ee-8c08-e75b16490fab",
                "destination_uuid": null
              },
              {
                "uuid": "4eda7241-fe50-4f69-a419-7ad20f06db39",
                "destination_uuid": "c965104c-95a2-4f57-ae04-e1f6da656f9d"
              }
            ]
          },
          {
            "uuid": "c965104c-95a2-4f57-ae04-e1f6da656f9d",
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
                "uuid": "c2e0ec2e-50f0-4d6c-b721-3211ff54ddbf"
              }
            ],
            "exits": [
              {
                "uuid": "2aaa4859-affd-499c-8801-ff66faa1f91b",
                "destination_uuid": "7392c967-1b05-4894-954d-8eb868925c9a"
              }
            ]
          },
          {
            "uuid": "7392c967-1b05-4894-954d-8eb868925c9a",
            "actions": [],
            "exits": [
              {
                "uuid": "b947acc1-631c-4f1e-8611-506f4eaff060",
                "destination_uuid": "153afbc4-1964-4d60-a95f-952caff9f427"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6dff4cc6-6d03-4010-bf7d-b52d2b711be1",
              "cases": [],
              "categories": [
                {
                  "uuid": "6dff4cc6-6d03-4010-bf7d-b52d2b711be1",
                  "name": "All Responses",
                  "exit_uuid": "b947acc1-631c-4f1e-8611-506f4eaff060"
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
            "uuid": "153afbc4-1964-4d60-a95f-952caff9f427",
            "actions": [
              {
                "uuid": "a82d7dca-70d4-474f-986b-04828df98698",
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
                "uuid": "afe1e595-2bce-4eeb-92f8-50f824f55e41",
                "destination_uuid": "08cfa5ac-3efd-4365-ab2e-888b8d7b347c"
              }
            ]
          },
          {
            "uuid": "08cfa5ac-3efd-4365-ab2e-888b8d7b347c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d59c75d8-7056-4100-8814-92699f0e7d7d",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "8ce1d873-24f1-458a-9f66-da73b847b0b1",
                  "type": "has_only_phrase",
                  "uuid": "93fe8957-e419-46eb-937d-953f466de735"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "8ce1d873-24f1-458a-9f66-da73b847b0b1",
                  "type": "has_only_phrase",
                  "uuid": "8491c960-0580-4a0b-8ae1-bc8ce67cb3f9"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "8ce1d873-24f1-458a-9f66-da73b847b0b1",
                  "type": "has_only_phrase",
                  "uuid": "2354de9e-441a-4383-a20d-0fb1382143e9"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "8ce1d873-24f1-458a-9f66-da73b847b0b1",
                  "type": "has_only_phrase",
                  "uuid": "728bed41-8c48-46e4-9349-5bbfc9bb64e7"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "8ce1d873-24f1-458a-9f66-da73b847b0b1",
                  "type": "has_only_phrase",
                  "uuid": "8c65e4f4-5953-44c6-89a0-d25ce89c7a8d"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "d382f475-ac4a-4185-befb-8b8a14f7aab0",
                  "type": "has_only_phrase",
                  "uuid": "eeddc4bb-8bb9-49b5-b002-f972d6847244"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "d382f475-ac4a-4185-befb-8b8a14f7aab0",
                  "type": "has_only_phrase",
                  "uuid": "e54ff368-6cdd-4439-98f0-136359432506"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "d382f475-ac4a-4185-befb-8b8a14f7aab0",
                  "type": "has_only_phrase",
                  "uuid": "0d69a663-f980-4e29-8c54-c9a347b825ce"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "d382f475-ac4a-4185-befb-8b8a14f7aab0",
                  "type": "has_only_phrase",
                  "uuid": "b55b64e5-b6c7-473a-9981-1ffe05850919"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cdf7e142-9619-43c6-8773-f64467ae2fd5",
                  "name": "All Responses",
                  "uuid": "d59c75d8-7056-4100-8814-92699f0e7d7d"
                },
                {
                  "exit_uuid": "1352d2c8-e0c9-41ba-8a72-dafe2a5df202",
                  "name": "0;1;2;3;4",
                  "uuid": "8ce1d873-24f1-458a-9f66-da73b847b0b1"
                },
                {
                  "exit_uuid": "56a6fd76-3dc0-46a8-a70e-1e6944424189",
                  "name": "5;6;7;8",
                  "uuid": "d382f475-ac4a-4185-befb-8b8a14f7aab0"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "cdf7e142-9619-43c6-8773-f64467ae2fd5",
                "destination_uuid": null
              },
              {
                "uuid": "1352d2c8-e0c9-41ba-8a72-dafe2a5df202",
                "destination_uuid": "41897ec1-a390-458c-89f0-02673914d4b1"
              },
              {
                "uuid": "56a6fd76-3dc0-46a8-a70e-1e6944424189",
                "destination_uuid": "55621da7-4fcc-4201-b5d3-8454ec83f39a"
              }
            ]
          },
          {
            "uuid": "41897ec1-a390-458c-89f0-02673914d4b1",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "3d3ea6b6-cfba-4feb-9390-ec7e432f488e"
              }
            ],
            "exits": [
              {
                "uuid": "8554798a-f8f9-4b64-b470-d9a8a5f19fa8",
                "destination_uuid": "9c667404-9ff9-4f99-a5e5-445c805a9138"
              }
            ]
          },
          {
            "uuid": "55621da7-4fcc-4201-b5d3-8454ec83f39a",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "8d7ceb82-72e3-41ad-b235-4b5c3220f840"
              }
            ],
            "exits": [
              {
                "uuid": "46903b2b-9a0e-41be-a282-e078ef3e4f29",
                "destination_uuid": "9c667404-9ff9-4f99-a5e5-445c805a9138"
              }
            ]
          },
          {
            "uuid": "9c667404-9ff9-4f99-a5e5-445c805a9138",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ec3a0d38-bd4c-4389-86a3-bb7a2ba77be1",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "30549704-216e-42d3-b651-f34eadb144c4",
                  "type": "has_only_phrase",
                  "uuid": "4cefa007-fdbd-4ffa-b382-080ef3a3ee89"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4089901a-310e-4695-8f6a-f6c6093c7df1",
                  "name": "All Responses",
                  "uuid": "ec3a0d38-bd4c-4389-86a3-bb7a2ba77be1"
                },
                {
                  "exit_uuid": "1a9b0c4f-4893-46e6-95b3-abf3f9d3c6ba",
                  "name": "Next",
                  "uuid": "30549704-216e-42d3-b651-f34eadb144c4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4089901a-310e-4695-8f6a-f6c6093c7df1",
                "destination_uuid": null
              },
              {
                "uuid": "1a9b0c4f-4893-46e6-95b3-abf3f9d3c6ba",
                "destination_uuid": "98c65a37-5b0e-43bd-9f2b-9f0010cb9bef"
              }
            ]
          },
          {
            "uuid": "98c65a37-5b0e-43bd-9f2b-9f0010cb9bef",
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
                "uuid": "7996cfb0-fae5-4a7c-aa4d-83522699c8e8"
              }
            ],
            "exits": [
              {
                "uuid": "ba755130-4a82-4595-b69e-8a761b4a56c3",
                "destination_uuid": "65115d62-8382-4341-8574-2cc8bf133cd9"
              }
            ]
          },
          {
            "uuid": "65115d62-8382-4341-8574-2cc8bf133cd9",
            "actions": [],
            "exits": [
              {
                "uuid": "9736d3b7-f373-41e2-968d-8732751af52a",
                "destination_uuid": "1060a991-17bf-43ae-87ce-8635adc990f7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "eb337626-c7c5-4f72-8442-ef7c240635d9",
              "cases": [],
              "categories": [
                {
                  "uuid": "eb337626-c7c5-4f72-8442-ef7c240635d9",
                  "name": "All Responses",
                  "exit_uuid": "9736d3b7-f373-41e2-968d-8732751af52a"
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
            "uuid": "1060a991-17bf-43ae-87ce-8635adc990f7",
            "actions": [
              {
                "uuid": "dbf95284-2949-4c3b-9761-0ae4a84a5922",
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
                "uuid": "82810c24-0ed6-4744-acd3-6aad689e2839",
                "destination_uuid": "cc83cd38-0c6b-41b5-ab82-66abb1c608b4"
              }
            ]
          },
          {
            "uuid": "cc83cd38-0c6b-41b5-ab82-66abb1c608b4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "53c99ce7-c96d-4d86-af66-37e6d23273da",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "a370a98a-1f31-49de-94f4-d51d57114cb4",
                  "type": "has_only_phrase",
                  "uuid": "02b2c914-63f3-4877-a3ed-f2e3601107d1"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "a370a98a-1f31-49de-94f4-d51d57114cb4",
                  "type": "has_only_phrase",
                  "uuid": "5be5a4a3-2e45-45de-96da-97cfbc1a9af6"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "a370a98a-1f31-49de-94f4-d51d57114cb4",
                  "type": "has_only_phrase",
                  "uuid": "bd4e4c29-84a9-48b5-a90b-30b5ee20b9ec"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "c114ced6-1206-4019-bed3-ec4500086fc9",
                  "type": "has_only_phrase",
                  "uuid": "946d41cb-8fe0-4fb7-8a54-f99f1eef463a"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "c114ced6-1206-4019-bed3-ec4500086fc9",
                  "type": "has_only_phrase",
                  "uuid": "477156e1-f0eb-4e6b-8457-ecb473480cfc"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "c114ced6-1206-4019-bed3-ec4500086fc9",
                  "type": "has_only_phrase",
                  "uuid": "a93c1a8d-b0b4-4dac-9af7-8316f9bfcee6"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "c114ced6-1206-4019-bed3-ec4500086fc9",
                  "type": "has_only_phrase",
                  "uuid": "3ddd445f-f775-418b-9a35-baa399045e7c"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "c114ced6-1206-4019-bed3-ec4500086fc9",
                  "type": "has_only_phrase",
                  "uuid": "67e504ac-290e-47c7-bf2f-acf58217f3f3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7556fbe0-3400-462d-a629-de9f3a0ea45a",
                  "name": "All Responses",
                  "uuid": "53c99ce7-c96d-4d86-af66-37e6d23273da"
                },
                {
                  "exit_uuid": "fc605c65-32c9-4abf-aa7a-65034643989b",
                  "name": "0;1;2",
                  "uuid": "a370a98a-1f31-49de-94f4-d51d57114cb4"
                },
                {
                  "exit_uuid": "a32c6f95-3b21-4d04-a8fa-d07724b811b8",
                  "name": "3;4;5;6;7",
                  "uuid": "c114ced6-1206-4019-bed3-ec4500086fc9"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "7556fbe0-3400-462d-a629-de9f3a0ea45a",
                "destination_uuid": null
              },
              {
                "uuid": "fc605c65-32c9-4abf-aa7a-65034643989b",
                "destination_uuid": "fd2498be-929e-4f5c-9a80-c93cec3ce6d6"
              },
              {
                "uuid": "a32c6f95-3b21-4d04-a8fa-d07724b811b8",
                "destination_uuid": "4f827c58-a972-4d68-a4ca-33fa59421bac"
              }
            ]
          },
          {
            "uuid": "fd2498be-929e-4f5c-9a80-c93cec3ce6d6",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "a17cfe34-8cc4-4d21-829d-2b3d5b5ee750"
              }
            ],
            "exits": [
              {
                "uuid": "d6de523a-402d-4852-a335-98e1d2050e08",
                "destination_uuid": "98dd5e31-f2b1-4d93-867b-ebaade0cf287"
              }
            ]
          },
          {
            "uuid": "4f827c58-a972-4d68-a4ca-33fa59421bac",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "7aba66a2-4d71-492c-bded-da7336e7d09a"
              }
            ],
            "exits": [
              {
                "uuid": "ca9fe140-bea4-4936-ae6a-1c5ad5666582",
                "destination_uuid": "98dd5e31-f2b1-4d93-867b-ebaade0cf287"
              }
            ]
          },
          {
            "uuid": "98dd5e31-f2b1-4d93-867b-ebaade0cf287",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e873a0af-17c1-4a04-ab1c-9260eba6d45a",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "2245aa09-1436-4813-bb29-9ec77ecff35a",
                  "type": "has_only_phrase",
                  "uuid": "b34922d8-5e96-468e-a2a7-730035b1fdf8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2803f8bd-4fe6-4686-9095-3207e30a9723",
                  "name": "All Responses",
                  "uuid": "e873a0af-17c1-4a04-ab1c-9260eba6d45a"
                },
                {
                  "exit_uuid": "bc9fa986-4ede-4e80-9054-2b9a8650e319",
                  "name": "Next",
                  "uuid": "2245aa09-1436-4813-bb29-9ec77ecff35a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2803f8bd-4fe6-4686-9095-3207e30a9723",
                "destination_uuid": null
              },
              {
                "uuid": "bc9fa986-4ede-4e80-9054-2b9a8650e319",
                "destination_uuid": "0f7014a4-0028-45bd-b1cc-722de81624a7"
              }
            ]
          },
          {
            "uuid": "0f7014a4-0028-45bd-b1cc-722de81624a7",
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
                "uuid": "a5e1822e-b597-4d4e-8210-9e7cc99a6496"
              }
            ],
            "exits": [
              {
                "uuid": "3374e889-c776-4b75-950c-f8fa305da848",
                "destination_uuid": "85a5f3f3-386a-47dc-a6ed-b4ed69c3c392"
              }
            ]
          },
          {
            "uuid": "85a5f3f3-386a-47dc-a6ed-b4ed69c3c392",
            "actions": [],
            "exits": [
              {
                "uuid": "3847e0c0-d7a5-493e-bb7b-920d9fc39951",
                "destination_uuid": "e4c36256-63e1-40a8-8347-22a16f3bcd73"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "bad0e285-4aa4-4b64-9cd0-e03178ead1ff",
              "cases": [],
              "categories": [
                {
                  "uuid": "bad0e285-4aa4-4b64-9cd0-e03178ead1ff",
                  "name": "All Responses",
                  "exit_uuid": "3847e0c0-d7a5-493e-bb7b-920d9fc39951"
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
            "uuid": "e4c36256-63e1-40a8-8347-22a16f3bcd73",
            "actions": [
              {
                "uuid": "917c6ff4-c3c3-4a37-896f-e571fb40d0e1",
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
                "uuid": "22637e22-6ed4-4856-ab18-5699809e7525",
                "destination_uuid": "09c6f5d2-2924-4a2e-b620-e2f081c72532"
              }
            ]
          },
          {
            "uuid": "09c6f5d2-2924-4a2e-b620-e2f081c72532",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ccf2203b-60a9-4d38-af30-491d869a806d",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "66e83572-65d2-41fe-8f08-bd6ed089bb22",
                  "type": "has_only_phrase",
                  "uuid": "1b7cfa31-a19b-4f38-8f36-f893ec364b98"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "66e83572-65d2-41fe-8f08-bd6ed089bb22",
                  "type": "has_only_phrase",
                  "uuid": "e9a04fab-8c2d-4171-8fa3-0044b08a37af"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "dfd11dee-fae7-48ab-8339-0f07dba8cf7f",
                  "type": "has_only_phrase",
                  "uuid": "dac342c0-f9d6-4353-aa1f-1e7f1ed83952"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "dfd11dee-fae7-48ab-8339-0f07dba8cf7f",
                  "type": "has_only_phrase",
                  "uuid": "0c487f60-d7bd-4b8c-bb70-5031e92dd348"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "dfd11dee-fae7-48ab-8339-0f07dba8cf7f",
                  "type": "has_only_phrase",
                  "uuid": "9de1b965-dd45-4795-bb35-b25abad17a12"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "dfd11dee-fae7-48ab-8339-0f07dba8cf7f",
                  "type": "has_only_phrase",
                  "uuid": "88c145b5-8885-4bda-b160-bb7d7bb6f1f4"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "dfd11dee-fae7-48ab-8339-0f07dba8cf7f",
                  "type": "has_only_phrase",
                  "uuid": "a7697e2d-dd93-4d0c-b382-ef48fbf67018"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "dfd11dee-fae7-48ab-8339-0f07dba8cf7f",
                  "type": "has_only_phrase",
                  "uuid": "777b3649-119e-4f5f-ad7a-38f1b923e918"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6e1c83ed-4519-4f22-8fb6-61445580d87b",
                  "name": "All Responses",
                  "uuid": "ccf2203b-60a9-4d38-af30-491d869a806d"
                },
                {
                  "exit_uuid": "811467dc-daf5-4d23-b6d6-c7537672ceb8",
                  "name": "0;1",
                  "uuid": "66e83572-65d2-41fe-8f08-bd6ed089bb22"
                },
                {
                  "exit_uuid": "a3ca3887-5796-42bf-a71c-9a1bc3329784",
                  "name": "2;3;4;5;6;7",
                  "uuid": "dfd11dee-fae7-48ab-8339-0f07dba8cf7f"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "6e1c83ed-4519-4f22-8fb6-61445580d87b",
                "destination_uuid": null
              },
              {
                "uuid": "811467dc-daf5-4d23-b6d6-c7537672ceb8",
                "destination_uuid": "b0a5e639-a853-4f3c-ba53-375aa2648e0e"
              },
              {
                "uuid": "a3ca3887-5796-42bf-a71c-9a1bc3329784",
                "destination_uuid": "7bc5331d-f9d6-45c7-b856-f0c2175d825c"
              }
            ]
          },
          {
            "uuid": "b0a5e639-a853-4f3c-ba53-375aa2648e0e",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "84cc0f04-6902-4920-afe3-f5f7fae88016"
              }
            ],
            "exits": [
              {
                "uuid": "193e4556-c35b-4551-a46d-1e3aee6499ef",
                "destination_uuid": "9a2ed5a1-275a-4918-8c43-ffe2e6140751"
              }
            ]
          },
          {
            "uuid": "7bc5331d-f9d6-45c7-b856-f0c2175d825c",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "7d6b2493-8fec-4f95-987c-3484e82a8013"
              }
            ],
            "exits": [
              {
                "uuid": "9a42908f-d243-4f04-ad73-e5e667f720cb",
                "destination_uuid": "9a2ed5a1-275a-4918-8c43-ffe2e6140751"
              }
            ]
          },
          {
            "uuid": "9a2ed5a1-275a-4918-8c43-ffe2e6140751",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7a8bfff5-9500-44b2-ba16-91b1f5137fcb",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "46998c55-451f-4a95-9ed7-84cf8b11186f",
                  "type": "has_only_phrase",
                  "uuid": "93741212-4934-42a5-aa38-5946c5fc4600"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "84f52763-02d6-484b-b227-2c7ead88cb9a",
                  "name": "All Responses",
                  "uuid": "7a8bfff5-9500-44b2-ba16-91b1f5137fcb"
                },
                {
                  "exit_uuid": "54b61d3a-ea17-43e8-b487-8956d588412c",
                  "name": "Next",
                  "uuid": "46998c55-451f-4a95-9ed7-84cf8b11186f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "84f52763-02d6-484b-b227-2c7ead88cb9a",
                "destination_uuid": null
              },
              {
                "uuid": "54b61d3a-ea17-43e8-b487-8956d588412c",
                "destination_uuid": "8bf46e27-ce46-4f5d-be36-a2a7c74cb25c"
              }
            ]
          },
          {
            "uuid": "8bf46e27-ce46-4f5d-be36-a2a7c74cb25c",
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
                "uuid": "59eab1b1-1449-4729-9359-c91056945e4d"
              }
            ],
            "exits": [
              {
                "uuid": "c0ce0f02-b89c-4b51-aa47-1e0b004ffac1",
                "destination_uuid": "ba525f30-1e26-472a-bd22-9bd0323bf438"
              }
            ]
          },
          {
            "uuid": "ba525f30-1e26-472a-bd22-9bd0323bf438",
            "actions": [],
            "exits": [
              {
                "uuid": "26acb964-9027-4b05-bfb7-9e65ec46ea97",
                "destination_uuid": "03b1d35f-3237-4d19-bfdf-d2f5b3073f01"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c4e03a4d-ed45-415b-840d-148cf4ecbef2",
              "cases": [],
              "categories": [
                {
                  "uuid": "c4e03a4d-ed45-415b-840d-148cf4ecbef2",
                  "name": "All Responses",
                  "exit_uuid": "26acb964-9027-4b05-bfb7-9e65ec46ea97"
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
            "uuid": "03b1d35f-3237-4d19-bfdf-d2f5b3073f01",
            "actions": [
              {
                "uuid": "fece9adf-d2c4-43ed-86fe-3915782a61e0",
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
                "uuid": "ce0a5807-bff1-4e8c-bea9-12d99860f350",
                "destination_uuid": "44ed3d19-0f75-405a-a37f-a5965be87f3c"
              }
            ]
          },
          {
            "uuid": "3b58c19d-04f4-4924-8a34-27ba708cdb17",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "a57e4099-7ecd-4e9f-8233-98375e809446"
              }
            ],
            "exits": [
              {
                "uuid": "0753ccaa-b8ed-4ce6-8306-3b8eb3c019bd",
                "destination_uuid": "8018c2e9-7d43-4e4c-b415-616891024dcb"
              }
            ]
          },
          {
            "uuid": "44ed3d19-0f75-405a-a37f-a5965be87f3c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c69bf7c0-312a-4579-a35e-8550fe1b575f",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "71ab4808-98f1-43ce-8a14-3cb14e1684e7",
                  "type": "has_only_phrase",
                  "uuid": "120166e2-958c-4104-83a2-1ce1128aae5d"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "71ab4808-98f1-43ce-8a14-3cb14e1684e7",
                  "type": "has_only_phrase",
                  "uuid": "c16219a6-8e81-425f-9a19-cdc742385b41"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "71ab4808-98f1-43ce-8a14-3cb14e1684e7",
                  "type": "has_only_phrase",
                  "uuid": "f8073f96-63eb-40a8-88d1-c1d520a58905"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "71ab4808-98f1-43ce-8a14-3cb14e1684e7",
                  "type": "has_only_phrase",
                  "uuid": "532f6e2a-c024-4a0b-aedb-8274bc0b398c"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "71ab4808-98f1-43ce-8a14-3cb14e1684e7",
                  "type": "has_only_phrase",
                  "uuid": "231c9325-0d6d-49de-aea5-8af1f88efed9"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "71ab4808-98f1-43ce-8a14-3cb14e1684e7",
                  "type": "has_only_phrase",
                  "uuid": "24883b07-d50c-42b4-9636-9bd0bf92919e"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "71ab4808-98f1-43ce-8a14-3cb14e1684e7",
                  "type": "has_only_phrase",
                  "uuid": "93df11de-135d-4367-99ca-be8fb2269f00"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "46dabdf2-b19b-4194-893f-d59ca24e0d06",
                  "name": "All Responses",
                  "uuid": "c69bf7c0-312a-4579-a35e-8550fe1b575f"
                },
                {
                  "exit_uuid": "4fa4c406-b43a-4f03-8739-775c5736b193",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "71ab4808-98f1-43ce-8a14-3cb14e1684e7"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "46dabdf2-b19b-4194-893f-d59ca24e0d06",
                "destination_uuid": "3b58c19d-04f4-4924-8a34-27ba708cdb17"
              },
              {
                "uuid": "4fa4c406-b43a-4f03-8739-775c5736b193",
                "destination_uuid": "3d89ee82-a787-4038-9a4f-5ffeed08de85"
              }
            ]
          },
          {
            "uuid": "3d89ee82-a787-4038-9a4f-5ffeed08de85",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "60c378b9-076b-48ad-9840-df369732a27d"
              }
            ],
            "exits": [
              {
                "uuid": "051089ff-75a6-4859-b379-69e7d3c51272",
                "destination_uuid": "8018c2e9-7d43-4e4c-b415-616891024dcb"
              }
            ]
          },
          {
            "uuid": "8018c2e9-7d43-4e4c-b415-616891024dcb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5bee65be-dffd-46a9-b8e0-a6d5ce321918",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "6febe954-7d39-48a2-ab2c-28e5ced15367",
                  "type": "has_only_phrase",
                  "uuid": "9f8fb34d-41ca-415a-bb92-de07d2eca659"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "84cfa3be-efe6-4208-8195-1bbde666664d",
                  "name": "All Responses",
                  "uuid": "5bee65be-dffd-46a9-b8e0-a6d5ce321918"
                },
                {
                  "exit_uuid": "9dfd0790-5956-422b-8d21-ac469ab9de19",
                  "name": "Next",
                  "uuid": "6febe954-7d39-48a2-ab2c-28e5ced15367"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "84cfa3be-efe6-4208-8195-1bbde666664d",
                "destination_uuid": null
              },
              {
                "uuid": "9dfd0790-5956-422b-8d21-ac469ab9de19",
                "destination_uuid": "f3ca7d39-cd71-4bc4-99ee-4eafd24d2aed"
              }
            ]
          },
          {
            "uuid": "f3ca7d39-cd71-4bc4-99ee-4eafd24d2aed",
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
                "uuid": "f5a07d01-dac9-4098-8fb6-6bd2c631722d"
              }
            ],
            "exits": [
              {
                "uuid": "a27ed7c3-4fdc-47a9-a48f-ea21de7775a0",
                "destination_uuid": "b9502a7e-a6d4-411b-9fa3-f3cbe8e60651"
              }
            ]
          },
          {
            "uuid": "b9502a7e-a6d4-411b-9fa3-f3cbe8e60651",
            "actions": [],
            "exits": [
              {
                "uuid": "e9b150f0-750b-425b-a209-667268cce171",
                "destination_uuid": "3c0aba17-0549-4d49-b6fd-12e02825c0f5"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d45d437a-b1ef-4e74-a002-d8fec06bfc0a",
              "cases": [],
              "categories": [
                {
                  "uuid": "d45d437a-b1ef-4e74-a002-d8fec06bfc0a",
                  "name": "All Responses",
                  "exit_uuid": "e9b150f0-750b-425b-a209-667268cce171"
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
            "uuid": "3c0aba17-0549-4d49-b6fd-12e02825c0f5",
            "actions": [
              {
                "uuid": "e96b2998-0847-4b0b-8e65-e4cb3747a800",
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
                "uuid": "06502471-6add-4603-8c14-f688d51ed74a",
                "destination_uuid": "58cfb23f-231d-4a13-8c9f-40195df70c16"
              }
            ]
          },
          {
            "uuid": "58cfb23f-231d-4a13-8c9f-40195df70c16",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "aed10a04-7177-4165-b725-fa09f83cc4b2",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "7328ba9d-3ea9-4e48-866e-2b0f34422e93",
                  "type": "has_only_phrase",
                  "uuid": "8d20fe9a-1216-48f4-9b5f-6a091cf289cc"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "7328ba9d-3ea9-4e48-866e-2b0f34422e93",
                  "type": "has_only_phrase",
                  "uuid": "b829eebb-f579-418c-bc65-684829b7cb41"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "7328ba9d-3ea9-4e48-866e-2b0f34422e93",
                  "type": "has_only_phrase",
                  "uuid": "5f362069-667c-43eb-a5ec-1587ab0d71db"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "7328ba9d-3ea9-4e48-866e-2b0f34422e93",
                  "type": "has_only_phrase",
                  "uuid": "2421483a-1e8a-4f21-be31-e3d26b9609e4"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "7328ba9d-3ea9-4e48-866e-2b0f34422e93",
                  "type": "has_only_phrase",
                  "uuid": "c6b680b9-9062-4fe8-af50-681cd807239f"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "0dd3a6a4-6bad-4fdc-9b11-bb86ce5b44d9",
                  "type": "has_only_phrase",
                  "uuid": "817d02b9-e2c8-4e04-8419-930a33dddea9"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "0dd3a6a4-6bad-4fdc-9b11-bb86ce5b44d9",
                  "type": "has_only_phrase",
                  "uuid": "cfb29dc2-ccf6-4e38-8085-bf253182ac3a"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "0dd3a6a4-6bad-4fdc-9b11-bb86ce5b44d9",
                  "type": "has_only_phrase",
                  "uuid": "526d1d29-53ab-4c32-92f1-78e21037f971"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "0dd3a6a4-6bad-4fdc-9b11-bb86ce5b44d9",
                  "type": "has_only_phrase",
                  "uuid": "339aaafc-c2c1-405d-aa87-19421f641eb3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "eb683c3e-fafd-4dd3-bfc6-d3d86362085d",
                  "name": "All Responses",
                  "uuid": "aed10a04-7177-4165-b725-fa09f83cc4b2"
                },
                {
                  "exit_uuid": "bf2bd042-8f86-4578-aa3c-281eaa0120e1",
                  "name": "0;1;2;3;4",
                  "uuid": "7328ba9d-3ea9-4e48-866e-2b0f34422e93"
                },
                {
                  "exit_uuid": "39891320-9d4e-4b74-91b5-4733044673b6",
                  "name": "5;6;7;8",
                  "uuid": "0dd3a6a4-6bad-4fdc-9b11-bb86ce5b44d9"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "eb683c3e-fafd-4dd3-bfc6-d3d86362085d",
                "destination_uuid": null
              },
              {
                "uuid": "bf2bd042-8f86-4578-aa3c-281eaa0120e1",
                "destination_uuid": "16cf1577-59b4-46fc-93a3-6b5e1d09150e"
              },
              {
                "uuid": "39891320-9d4e-4b74-91b5-4733044673b6",
                "destination_uuid": "0ee8392a-e746-4b9f-b778-384e34c55ae6"
              }
            ]
          },
          {
            "uuid": "16cf1577-59b4-46fc-93a3-6b5e1d09150e",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "adacd7a8-2f54-40fa-bdf4-5ae0ba400a04"
              }
            ],
            "exits": [
              {
                "uuid": "df99b708-e875-4baf-b8d5-c3fd94360548",
                "destination_uuid": "21ca86ff-a7ee-4e17-92ac-e5a852c06261"
              }
            ]
          },
          {
            "uuid": "0ee8392a-e746-4b9f-b778-384e34c55ae6",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "f9c44764-b27e-4a57-9f49-51df2b2b439a"
              }
            ],
            "exits": [
              {
                "uuid": "bfdca7a4-c992-4ad3-beb1-8ab6aca90c49",
                "destination_uuid": "21ca86ff-a7ee-4e17-92ac-e5a852c06261"
              }
            ]
          },
          {
            "uuid": "21ca86ff-a7ee-4e17-92ac-e5a852c06261",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e37a09ac-597f-43a8-bc4b-2bbf10cdee71",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "f66726ea-83bf-4e07-92d5-ac2ed6c73ad7",
                  "type": "has_only_phrase",
                  "uuid": "bf97fc2b-1726-41f3-b73f-d4f128f5f00e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c534382c-c70a-4302-9e97-1721a371157a",
                  "name": "All Responses",
                  "uuid": "e37a09ac-597f-43a8-bc4b-2bbf10cdee71"
                },
                {
                  "exit_uuid": "5b4d20f8-a210-4e4a-a31c-eec2690ada0b",
                  "name": "Next",
                  "uuid": "f66726ea-83bf-4e07-92d5-ac2ed6c73ad7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c534382c-c70a-4302-9e97-1721a371157a",
                "destination_uuid": null
              },
              {
                "uuid": "5b4d20f8-a210-4e4a-a31c-eec2690ada0b",
                "destination_uuid": "697ef1e1-df89-4b6b-8209-2976f0b630ad"
              }
            ]
          },
          {
            "uuid": "697ef1e1-df89-4b6b-8209-2976f0b630ad",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "ff5db06b-a5f2-4e88-b921-73209565185d"
              }
            ],
            "exits": [
              {
                "uuid": "038befa4-d2c3-423d-8333-763a62ce2fcb",
                "destination_uuid": "1b2b44a7-68f5-49bb-a69e-f9d5a27bca65"
              }
            ]
          },
          {
            "uuid": "1b2b44a7-68f5-49bb-a69e-f9d5a27bca65",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5b430fc8-aea4-4ed9-aced-1f431bfb417b",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "038af1d9-4a8c-4cbc-a584-151ea495eb39",
                  "type": "has_only_phrase",
                  "uuid": "918623fd-2718-4ade-b0a7-41e80251d28d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0d904135-6d06-42a8-a652-802ebebfed4c",
                  "name": "All Responses",
                  "uuid": "5b430fc8-aea4-4ed9-aced-1f431bfb417b"
                },
                {
                  "exit_uuid": "6d48e9a3-ed8d-424c-a7f2-3dffb7a06cf7",
                  "name": "Next",
                  "uuid": "038af1d9-4a8c-4cbc-a584-151ea495eb39"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0d904135-6d06-42a8-a652-802ebebfed4c",
                "destination_uuid": null
              },
              {
                "uuid": "6d48e9a3-ed8d-424c-a7f2-3dffb7a06cf7",
                "destination_uuid": "8b7b02f1-7217-40d9-a9d3-8892b80e7cbc"
              }
            ]
          },
          {
            "uuid": "8b7b02f1-7217-40d9-a9d3-8892b80e7cbc",
            "actions": [
              {
                "uuid": "6d5f8e8b-4b43-4b2a-9ab9-9be35dbf9a1b",
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
                "uuid": "a7d6e2a4-7240-4f39-a8a7-380c1f3c4995",
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
        "uuid": "975ce874-8471-4b1b-8878-a7867ce2cb4a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9b078a1b-9536-4a80-9cf3-bbe81559114f",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "c0477ae4-66cc-4ef3-9d01-b252fea98641"
              }
            ],
            "exits": [
              {
                "uuid": "44a69069-602f-4721-94b2-5543209b6b72",
                "destination_uuid": "557da492-27f1-4ded-83cc-623062a986f2"
              }
            ]
          },
          {
            "uuid": "557da492-27f1-4ded-83cc-623062a986f2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "13c2b2f2-0239-4017-8585-866e52809d39",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "fa858771-fd12-4061-aaa0-a1c6832a454e",
                  "type": "has_only_phrase",
                  "uuid": "8ea5c7e1-3b9a-42a5-8f74-a1331b64e297"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9f24e232-c459-4308-8b16-a7170d9f838e",
                  "name": "All Responses",
                  "uuid": "13c2b2f2-0239-4017-8585-866e52809d39"
                },
                {
                  "exit_uuid": "a7aa71cb-9f72-4ec2-8ff1-346ebfc75f13",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "fa858771-fd12-4061-aaa0-a1c6832a454e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9f24e232-c459-4308-8b16-a7170d9f838e",
                "destination_uuid": null
              },
              {
                "uuid": "a7aa71cb-9f72-4ec2-8ff1-346ebfc75f13",
                "destination_uuid": "4468a22b-ec0d-4566-9037-c071b2282e9c"
              }
            ]
          },
          {
            "uuid": "4468a22b-ec0d-4566-9037-c071b2282e9c",
            "actions": [
              {
                "uuid": "63d962f3-f0b6-42a3-986d-067be8c6a978",
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
                "uuid": "aecf7a17-6448-4355-920b-3dd4b1a6777b",
                "destination_uuid": "6dd14c27-e206-4dc9-af8f-17983f2d58ca"
              }
            ]
          },
          {
            "uuid": "6dd14c27-e206-4dc9-af8f-17983f2d58ca",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "b78f70f1-6c7a-4156-8fd8-51040e7e67e6"
                },
                "type": "enter_flow",
                "uuid": "8dc33c55-fde6-47b9-ba81-2047a4f02786"
              }
            ],
            "exits": [
              {
                "uuid": "f1666dd2-1e48-4efe-9f1d-f3e5dc214f0f",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "6ba5000c-bbdc-4948-8e60-616964fba66b",
            "actions": [
              {
                "uuid": "430e2b2a-454c-4cc8-b810-77aaa07f056b",
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
                "uuid": "d5b34a0f-568c-4293-b64b-f33b8c5e70f4",
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
        "uuid": "2c753b87-732c-43f5-b4cd-f80c0b034852",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "74b1646d-da2c-4c6b-a5d7-169afaa52971",
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
                "uuid": "0ca316bc-f519-4998-a013-8ee8083b7ee7"
              }
            ],
            "exits": [
              {
                "uuid": "e988cc32-f4a5-4ec6-935d-8a6b2f772b2c",
                "destination_uuid": "0fa4e5de-efa1-4d2d-91e7-ccc68b826861"
              }
            ]
          },
          {
            "uuid": "0fa4e5de-efa1-4d2d-91e7-ccc68b826861",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1f1a77f8-e3a0-40d1-b0e7-8a997efb7692",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "a51b5e1e-c62d-4bbb-97d1-6bd375a08cc9",
                  "type": "has_only_phrase",
                  "uuid": "a805512c-6e49-43c1-95b7-c59c4eedd008"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "01476d33-e8e5-4ec6-958f-9fe7bd3ac785",
                  "type": "has_only_phrase",
                  "uuid": "40a8f79b-8b99-4df5-8e70-f70931aa5c4d"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "01476d33-e8e5-4ec6-958f-9fe7bd3ac785",
                  "type": "has_only_phrase",
                  "uuid": "0783b335-5952-4c42-8bc2-2416e31e2e3e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "020c8ed8-9d08-428f-aec7-13c38417f4f9",
                  "name": "All Responses",
                  "uuid": "1f1a77f8-e3a0-40d1-b0e7-8a997efb7692"
                },
                {
                  "exit_uuid": "a50a5933-5651-4533-b249-4faaa681c1ae",
                  "name": "Happy",
                  "uuid": "a51b5e1e-c62d-4bbb-97d1-6bd375a08cc9"
                },
                {
                  "exit_uuid": "4e722a81-3190-4882-8a6f-81eaa18220ac",
                  "name": "Neutral; Sad",
                  "uuid": "01476d33-e8e5-4ec6-958f-9fe7bd3ac785"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "020c8ed8-9d08-428f-aec7-13c38417f4f9",
                "destination_uuid": null
              },
              {
                "uuid": "a50a5933-5651-4533-b249-4faaa681c1ae",
                "destination_uuid": "f0802bb7-ad92-43ae-bddd-48b881928caf"
              },
              {
                "uuid": "4e722a81-3190-4882-8a6f-81eaa18220ac",
                "destination_uuid": "2f8097b1-5743-4ecb-bfd7-2e449e38c34d"
              }
            ]
          },
          {
            "uuid": "f0802bb7-ad92-43ae-bddd-48b881928caf",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "4ac4b306-d5f5-48e1-8ef2-55c1fc4b762a"
              }
            ],
            "exits": [
              {
                "uuid": "29c60017-ab13-4f6b-8037-fc24568bbf3d",
                "destination_uuid": "ecb71aa2-55b0-4118-876a-f15955b1aa14"
              }
            ]
          },
          {
            "uuid": "2f8097b1-5743-4ecb-bfd7-2e449e38c34d",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f11bf8e1-269a-4624-862a-b36270da9b0e"
              }
            ],
            "exits": [
              {
                "uuid": "9faf0a7a-c91c-484a-a894-80a125ff2108",
                "destination_uuid": "81849850-6ae8-4d7d-a70a-41c6fe6dfb33"
              }
            ]
          },
          {
            "uuid": "81849850-6ae8-4d7d-a70a-41c6fe6dfb33",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "4ce36b57-2e9e-4300-939f-efb5bdc26fa7"
              }
            ],
            "exits": [
              {
                "uuid": "301dae16-e697-4c2b-baa0-7468c6c945d4",
                "destination_uuid": "3b284c96-52fa-44cf-bcdd-81c250cd1b6e"
              }
            ]
          },
          {
            "uuid": "3b284c96-52fa-44cf-bcdd-81c250cd1b6e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b4dd00f3-5c44-47e3-9195-e8dc9a705e6c",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "4a113d6f-a4c8-444a-b7ce-7594f10af267",
                  "type": "has_only_phrase",
                  "uuid": "0f1651fd-418b-483e-9292-7ac8c0af541c"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "7e9f97f1-eec7-46a3-9e44-fa491866ac2c",
                  "type": "has_only_phrase",
                  "uuid": "7feddf75-e64b-4c6a-b060-40324adeb16b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "93db17a9-1ea1-4ec3-9060-f92d351417b9",
                  "name": "All Responses",
                  "uuid": "b4dd00f3-5c44-47e3-9195-e8dc9a705e6c"
                },
                {
                  "exit_uuid": "082b84c8-5d43-43b6-95d9-d23e745baddc",
                  "name": "Yes",
                  "uuid": "4a113d6f-a4c8-444a-b7ce-7594f10af267"
                },
                {
                  "exit_uuid": "01451462-0a94-4023-97b8-656631a9a127",
                  "name": "No",
                  "uuid": "7e9f97f1-eec7-46a3-9e44-fa491866ac2c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "93db17a9-1ea1-4ec3-9060-f92d351417b9",
                "destination_uuid": null
              },
              {
                "uuid": "082b84c8-5d43-43b6-95d9-d23e745baddc",
                "destination_uuid": "b74f478f-de58-4177-9dde-9be44b835147"
              },
              {
                "uuid": "01451462-0a94-4023-97b8-656631a9a127",
                "destination_uuid": "877808c7-50d6-469e-945a-b42f0229978f"
              }
            ]
          },
          {
            "uuid": "b74f478f-de58-4177-9dde-9be44b835147",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "37bd31c9-0310-474f-83c1-c7683c2af2d9"
                },
                "type": "enter_flow",
                "uuid": "2d95ea07-0cac-49f9-89c6-9b504c36c645"
              }
            ],
            "exits": [
              {
                "uuid": "1b2432e8-df24-4b7f-b4b7-2ee316253cbd",
                "destination_uuid": "690245ee-6e75-453d-881a-7ded5e4d0aa3"
              },
              {
                "uuid": "5b7bd9da-2dc1-4709-966b-64e29bc843ab",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1713806e-2592-4ab1-9bec-0d7cb72f4b94",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "62ef7c76-a2b7-4ce6-aed6-6cccada2b6a6"
                },
                {
                  "uuid": "810c721c-2515-4221-94d0-f0afb23f15ec",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "739d2f8f-2818-4ae3-ad0f-805643b43e1a"
                }
              ],
              "categories": [
                {
                  "uuid": "62ef7c76-a2b7-4ce6-aed6-6cccada2b6a6",
                  "name": "Complete",
                  "exit_uuid": "1b2432e8-df24-4b7f-b4b7-2ee316253cbd"
                },
                {
                  "uuid": "739d2f8f-2818-4ae3-ad0f-805643b43e1a",
                  "name": "Expired",
                  "exit_uuid": "5b7bd9da-2dc1-4709-966b-64e29bc843ab"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "62ef7c76-a2b7-4ce6-aed6-6cccada2b6a6"
            }
          },
          {
            "uuid": "690245ee-6e75-453d-881a-7ded5e4d0aa3",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4564b10f-0457-4d4b-9db2-4a4d574ff891"
              }
            ],
            "exits": [
              {
                "uuid": "3192666f-52ec-44fc-a3ef-6bdefc97ad63",
                "destination_uuid": "3dc43e74-c478-42a5-bba4-7c81f9836393"
              }
            ]
          },
          {
            "uuid": "3dc43e74-c478-42a5-bba4-7c81f9836393",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "db2627b5-8182-42c3-976a-d1b6ac7ced69"
              }
            ],
            "exits": [
              {
                "uuid": "5d97ec03-0b29-4e08-a2a7-8a0d43485e23",
                "destination_uuid": "ecb71aa2-55b0-4118-876a-f15955b1aa14"
              }
            ]
          },
          {
            "uuid": "877808c7-50d6-469e-945a-b42f0229978f",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "8c35abcf-7f14-4ce9-b273-d1382d10a331"
              }
            ],
            "exits": [
              {
                "uuid": "f8382573-6913-4f9c-a585-475bc746e0e7",
                "destination_uuid": "ecb71aa2-55b0-4118-876a-f15955b1aa14"
              }
            ]
          },
          {
            "uuid": "ecb71aa2-55b0-4118-876a-f15955b1aa14",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bebebbcb-c39f-4c18-9690-053a3277f34c",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "72e97cac-25fc-4fb2-9345-32a5fb538e79",
                  "type": "has_only_phrase",
                  "uuid": "732b514f-0c06-4ac1-9bf3-f156b19950d2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1bfcb227-6e8a-461a-bd7b-9ddb072b5860",
                  "name": "All Responses",
                  "uuid": "bebebbcb-c39f-4c18-9690-053a3277f34c"
                },
                {
                  "exit_uuid": "20433294-a2f2-40e2-92a3-aa58ccaa2756",
                  "name": "Chat to @fields.elder",
                  "uuid": "72e97cac-25fc-4fb2-9345-32a5fb538e79"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1bfcb227-6e8a-461a-bd7b-9ddb072b5860",
                "destination_uuid": null
              },
              {
                "uuid": "20433294-a2f2-40e2-92a3-aa58ccaa2756",
                "destination_uuid": "f62441d6-9666-4a28-aeac-3c66051738b8"
              }
            ]
          },
          {
            "uuid": "f62441d6-9666-4a28-aeac-3c66051738b8",
            "actions": [
              {
                "uuid": "73acb5ee-a32f-4489-b082-7f36d7db121b",
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
                "uuid": "75727a4a-59b4-46e4-acfa-cb45e897c5dc",
                "destination_uuid": "7f57c677-5cab-4a78-83dc-13c05ff5cb25"
              }
            ]
          },
          {
            "uuid": "7f57c677-5cab-4a78-83dc-13c05ff5cb25",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "f0a6e14a-a28f-4b25-937d-c000377e3b01"
                },
                "type": "enter_flow",
                "uuid": "a937b926-f6e5-4a5b-b8b1-92460fbab3ec"
              }
            ],
            "exits": [
              {
                "uuid": "40316a50-d461-4621-a522-16bcc22d8930",
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
        "uuid": "81f121fa-7e82-460d-902f-406e7c0076fb",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "296dbeee-afad-4cf9-a8e3-e1da7d82819b",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "63842b55-456a-4865-8dee-2ca00a35c417"
              }
            ],
            "exits": [
              {
                "uuid": "00bdabab-a9ef-4dcd-9315-2988f3fe1190",
                "destination_uuid": "1c35d3cb-0ab9-475a-a586-e34a9214e10e"
              }
            ]
          },
          {
            "uuid": "1c35d3cb-0ab9-475a-a586-e34a9214e10e",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a3f72f7c-9741-47e3-b851-a9314668783b"
              }
            ],
            "exits": [
              {
                "uuid": "c3bd59a1-8787-4c75-91c4-f321aa1544f6",
                "destination_uuid": "945adb46-7789-4cdf-8e53-138723e1f966"
              }
            ]
          },
          {
            "uuid": "945adb46-7789-4cdf-8e53-138723e1f966",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "29fa6667-340b-40b8-b705-b5938f6a0186"
              }
            ],
            "exits": [
              {
                "uuid": "b9103465-5744-45b9-8cc0-d52546770853",
                "destination_uuid": "1831cbfb-581f-4241-b11b-adbacfacd737"
              }
            ]
          },
          {
            "uuid": "1831cbfb-581f-4241-b11b-adbacfacd737",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "799dbcd4-4de9-426f-aac2-1905e699f8e5",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "d87ec357-f57c-4d76-b6ae-0488a1cfa68b",
                  "type": "has_only_phrase",
                  "uuid": "11a9f896-e1e4-4648-a1e5-1a6eaa51e195"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "25c8cf85-db85-4c51-9d7f-006480ba628b",
                  "type": "has_only_phrase",
                  "uuid": "8e8214c8-a409-4ab9-ad35-32873370567d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2e35a569-b0ff-4a84-b9bc-36d19282f585",
                  "name": "All Responses",
                  "uuid": "799dbcd4-4de9-426f-aac2-1905e699f8e5"
                },
                {
                  "exit_uuid": "a6ac782d-bd32-4359-bbdc-69ea5539023c",
                  "name": "Yes",
                  "uuid": "d87ec357-f57c-4d76-b6ae-0488a1cfa68b"
                },
                {
                  "exit_uuid": "e7addd03-fb4e-4fe3-8fdf-7e7f5f600e4f",
                  "name": "No",
                  "uuid": "25c8cf85-db85-4c51-9d7f-006480ba628b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2e35a569-b0ff-4a84-b9bc-36d19282f585",
                "destination_uuid": null
              },
              {
                "uuid": "a6ac782d-bd32-4359-bbdc-69ea5539023c",
                "destination_uuid": "c495be7b-2d38-4859-a5e2-b6bcf746181e"
              },
              {
                "uuid": "e7addd03-fb4e-4fe3-8fdf-7e7f5f600e4f",
                "destination_uuid": "e9fc0c64-ba7b-425c-b29c-5af1987fbdf7"
              }
            ]
          },
          {
            "uuid": "c495be7b-2d38-4859-a5e2-b6bcf746181e",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fa36b8f8-b4cf-4263-a6fe-e6340c4862e7"
              }
            ],
            "exits": [
              {
                "uuid": "6a2a3624-627d-4d63-a371-ed928a307bd3",
                "destination_uuid": "aef95106-ac08-4797-857a-6eca212715ad"
              }
            ]
          },
          {
            "uuid": "e9fc0c64-ba7b-425c-b29c-5af1987fbdf7",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4897712f-e850-4c6e-9b92-834c7e0df55f"
              }
            ],
            "exits": [
              {
                "uuid": "1ee4ef3c-897b-4bb6-8e31-1423cd46825d",
                "destination_uuid": "aef95106-ac08-4797-857a-6eca212715ad"
              }
            ]
          },
          {
            "uuid": "aef95106-ac08-4797-857a-6eca212715ad",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dd2395b4-db61-4e91-8f81-a2be94685118"
              }
            ],
            "exits": [
              {
                "uuid": "5836896f-23e4-4f9d-b68c-6bd3df3e1453",
                "destination_uuid": "5f4c7e0b-225f-4d14-b6dc-96f3abd6062c"
              }
            ]
          },
          {
            "uuid": "5f4c7e0b-225f-4d14-b6dc-96f3abd6062c",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "1de79f0f-4774-4fb1-b67a-9f4ef64d2e84"
              }
            ],
            "exits": [
              {
                "uuid": "3123b335-3afa-48a4-855e-6336d2ff61f5",
                "destination_uuid": "9de7b5d8-12df-4004-9ec1-da0af37b0efc"
              }
            ]
          },
          {
            "uuid": "9de7b5d8-12df-4004-9ec1-da0af37b0efc",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0f29f390-83ca-474d-bbb5-5bfbcdd908f1",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "d3fb8356-a0d2-44bd-84a7-28b2266ffbc7",
                  "type": "has_only_phrase",
                  "uuid": "cb656afc-8dae-4198-85d0-53d2e43943bd"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "876b694f-da3b-486d-95f2-3b89e08846d7",
                  "type": "has_only_phrase",
                  "uuid": "3fe986b3-c373-4881-a3f3-ff2977b4cd03"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3ddb06a1-6972-44d1-a2fc-98c62337370c",
                  "name": "All Responses",
                  "uuid": "0f29f390-83ca-474d-bbb5-5bfbcdd908f1"
                },
                {
                  "exit_uuid": "5253af08-f106-45c4-9434-c590e4664bbc",
                  "name": "Yes",
                  "uuid": "d3fb8356-a0d2-44bd-84a7-28b2266ffbc7"
                },
                {
                  "exit_uuid": "cf234143-8b25-4a5b-9842-92c877dc199c",
                  "name": "Later",
                  "uuid": "876b694f-da3b-486d-95f2-3b89e08846d7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3ddb06a1-6972-44d1-a2fc-98c62337370c",
                "destination_uuid": null
              },
              {
                "uuid": "5253af08-f106-45c4-9434-c590e4664bbc",
                "destination_uuid": "6e9309a3-31db-459f-80bc-48789ea4fcb5"
              },
              {
                "uuid": "cf234143-8b25-4a5b-9842-92c877dc199c",
                "destination_uuid": "761ebaa3-0e1e-4d08-802a-6dcf47552511"
              }
            ]
          },
          {
            "uuid": "6e9309a3-31db-459f-80bc-48789ea4fcb5",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "3c791469-a732-4a12-a99c-ce2f200b6f67"
              }
            ],
            "exits": [
              {
                "uuid": "adc46652-e7ef-404d-89fc-659303e5dbf9",
                "destination_uuid": "3bdfd914-f3ac-4b55-911b-41c30bfa0552"
              }
            ]
          },
          {
            "uuid": "3bdfd914-f3ac-4b55-911b-41c30bfa0552",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "eb4fe1c0-e139-44a7-ba47-2777aa0c4e47",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "34465392-bb6e-46b5-bda7-870745bd8b7e",
                  "type": "has_only_phrase",
                  "uuid": "58686689-9547-4c04-abe9-3d1f4975c44d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7e534348-ba8b-4365-b348-df27c30c55b2",
                  "name": "All Responses",
                  "uuid": "eb4fe1c0-e139-44a7-ba47-2777aa0c4e47"
                },
                {
                  "exit_uuid": "10f4e6bf-e278-4888-864d-0f5893757290",
                  "name": "Take me to Tips",
                  "uuid": "34465392-bb6e-46b5-bda7-870745bd8b7e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7e534348-ba8b-4365-b348-df27c30c55b2",
                "destination_uuid": null
              },
              {
                "uuid": "10f4e6bf-e278-4888-864d-0f5893757290",
                "destination_uuid": "812ec5ba-507c-4ef5-afe1-b3c3161dadfd"
              }
            ]
          },
          {
            "uuid": "812ec5ba-507c-4ef5-afe1-b3c3161dadfd",
            "actions": [
              {
                "uuid": "d9b59849-a21f-414a-af1a-e5a98de589a4",
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
                "uuid": "e837d3b1-6519-4a0f-8a3f-8ab448cc7fc0",
                "destination_uuid": "505ce031-73c2-4d0c-8e68-987916daed6d"
              }
            ]
          },
          {
            "uuid": "505ce031-73c2-4d0c-8e68-987916daed6d",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "2915f917-a69a-4a84-a049-9914f793b5b7"
                },
                "type": "enter_flow",
                "uuid": "b4f4045d-c1bb-4270-b6e8-b4d92c158845"
              }
            ],
            "exits": [
              {
                "uuid": "8478d913-ed98-43a5-be16-9c8c51a0f6e4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "761ebaa3-0e1e-4d08-802a-6dcf47552511",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "46f85deb-3a00-4a44-be0a-06fb75b9d43c"
              }
            ],
            "exits": [
              {
                "uuid": "3ec3f9c6-26f5-4e33-9512-b3e9b0a7c36c",
                "destination_uuid": "fc2f3a31-c79d-4213-8af1-6f7d35da788d"
              }
            ]
          },
          {
            "uuid": "fc2f3a31-c79d-4213-8af1-6f7d35da788d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f3dacb3a-39ec-4491-a037-32a338e419f2",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "68c75ae7-e8e9-4305-af4d-b16dce0ff1de",
                  "type": "has_only_phrase",
                  "uuid": "406fb4b5-650e-439d-90e0-2d4d71fc3d3a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8b7f0934-8cf1-48a6-9dff-3fd07c60047a",
                  "name": "All Responses",
                  "uuid": "f3dacb3a-39ec-4491-a037-32a338e419f2"
                },
                {
                  "exit_uuid": "5b9aab3b-d473-4698-86b4-b9a79556b2a0",
                  "name": "Take me to the home screen",
                  "uuid": "68c75ae7-e8e9-4305-af4d-b16dce0ff1de"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8b7f0934-8cf1-48a6-9dff-3fd07c60047a",
                "destination_uuid": null
              },
              {
                "uuid": "5b9aab3b-d473-4698-86b4-b9a79556b2a0",
                "destination_uuid": "e0a51068-8ace-4980-a708-4f1418518360"
              }
            ]
          },
          {
            "uuid": "e0a51068-8ace-4980-a708-4f1418518360",
            "actions": [
              {
                "uuid": "8989f884-c44a-4efc-af1d-c94855701c59",
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
                "uuid": "25217675-a6f0-4f68-abc2-46fa1e15126f",
                "destination_uuid": "90df80c9-5615-4731-b4a2-90c3503fc9b4"
              }
            ]
          },
          {
            "uuid": "90df80c9-5615-4731-b4a2-90c3503fc9b4",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "f6a5bf72-b61f-4ff6-9a87-01a890cb177c"
                },
                "type": "enter_flow",
                "uuid": "9ff52d87-7ea0-4691-a2f8-eefcbf3a5054"
              }
            ],
            "exits": [
              {
                "uuid": "3c64b42f-e917-4e12-8f4e-c6edf939527d",
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
        "uuid": "584388d5-ee6c-42db-9833-4ead7800e324",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "91735056-e767-449a-8452-555c94d77119",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "516805ee-3de9-44e8-9e60-12e8752c8e38"
              }
            ],
            "exits": [
              {
                "uuid": "354f534a-b879-4c1b-b0f6-c7e9b6dc5ffa",
                "destination_uuid": "3a85db59-bbd7-41cb-97d9-0e358041babd"
              }
            ]
          },
          {
            "uuid": "3a85db59-bbd7-41cb-97d9-0e358041babd",
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
                "uuid": "d440ac1a-6fd3-44da-8458-6e0f11136219"
              }
            ],
            "exits": [
              {
                "uuid": "2facb8cb-60b1-4ef6-a497-a3c6c9c69001",
                "destination_uuid": "40e90da2-fcac-4395-9f85-264a1fe1edac"
              }
            ]
          },
          {
            "uuid": "40e90da2-fcac-4395-9f85-264a1fe1edac",
            "actions": [],
            "exits": [
              {
                "uuid": "cfbdb772-9b12-4acc-8737-c2faf9d2f4c1",
                "destination_uuid": "0d5ca125-6214-4554-94be-b2a99e8655fe"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "81071420-cd1f-4e4c-953f-6e880e1a119e",
              "cases": [],
              "categories": [
                {
                  "uuid": "81071420-cd1f-4e4c-953f-6e880e1a119e",
                  "name": "All Responses",
                  "exit_uuid": "cfbdb772-9b12-4acc-8737-c2faf9d2f4c1"
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
            "uuid": "0d5ca125-6214-4554-94be-b2a99e8655fe",
            "actions": [
              {
                "uuid": "b3cb4489-cbfe-49c0-9170-762844d6ac78",
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
                "uuid": "23365c51-c331-40a7-8058-94acfac1c1ff",
                "destination_uuid": "50ceee7d-e608-4699-9e7d-023da78fa98e"
              }
            ]
          },
          {
            "uuid": "50ceee7d-e608-4699-9e7d-023da78fa98e",
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
                "uuid": "73bd401b-daf0-4dcc-ae37-d9658d949a4e"
              }
            ],
            "exits": [
              {
                "uuid": "c06c1c73-b09f-4eeb-b9a1-8574a9cc1b65",
                "destination_uuid": "68860f47-40b6-44f5-803b-08de601c83bf"
              }
            ]
          },
          {
            "uuid": "68860f47-40b6-44f5-803b-08de601c83bf",
            "actions": [],
            "exits": [
              {
                "uuid": "8f7ea9ec-583d-4adf-8620-10a572c2866c",
                "destination_uuid": "398be753-d529-4264-9992-a8d85d662d52"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "32d72228-727d-4d92-b361-a43727696623",
              "cases": [],
              "categories": [
                {
                  "uuid": "32d72228-727d-4d92-b361-a43727696623",
                  "name": "All Responses",
                  "exit_uuid": "8f7ea9ec-583d-4adf-8620-10a572c2866c"
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
            "uuid": "398be753-d529-4264-9992-a8d85d662d52",
            "actions": [
              {
                "uuid": "f8993240-00b6-4001-ba71-04c41020d8eb",
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
                "uuid": "8feded75-2b55-4109-8d73-dcd9c420ac6c",
                "destination_uuid": "1e60273f-4c17-4595-9deb-5c4155f95960"
              }
            ]
          },
          {
            "uuid": "1e60273f-4c17-4595-9deb-5c4155f95960",
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
                "uuid": "9288f60a-7e63-4815-8c42-77669e2f381a"
              }
            ],
            "exits": [
              {
                "uuid": "24680342-307d-4ee6-bf11-e80b4e133511",
                "destination_uuid": "9e11c23f-1f55-4071-bf47-d866914bd334"
              }
            ]
          },
          {
            "uuid": "9e11c23f-1f55-4071-bf47-d866914bd334",
            "actions": [],
            "exits": [
              {
                "uuid": "ca6938b2-f6c6-42c7-af81-991e9ded7945",
                "destination_uuid": "47dd9296-cca4-4e22-b21b-9e2b9df066bd"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "66e3a076-27ab-41ea-a584-15d4911a275f",
              "cases": [],
              "categories": [
                {
                  "uuid": "66e3a076-27ab-41ea-a584-15d4911a275f",
                  "name": "All Responses",
                  "exit_uuid": "ca6938b2-f6c6-42c7-af81-991e9ded7945"
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
            "uuid": "47dd9296-cca4-4e22-b21b-9e2b9df066bd",
            "actions": [
              {
                "uuid": "af2ab9f4-d375-4e2f-ab12-4744fd63c921",
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
                "uuid": "6105b51e-e0e9-451d-bca0-5e31bfaa0072",
                "destination_uuid": "37b9a776-07fd-4ad8-9d26-fee0b08cc957"
              }
            ]
          },
          {
            "uuid": "37b9a776-07fd-4ad8-9d26-fee0b08cc957",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "616be049-9e4c-449e-a824-471a23712b60"
              }
            ],
            "exits": [
              {
                "uuid": "ff640c44-c4a8-4e60-85b1-a0797b7c6188",
                "destination_uuid": "02b85a41-83ee-4b77-b674-2ac56823e525"
              }
            ]
          },
          {
            "uuid": "02b85a41-83ee-4b77-b674-2ac56823e525",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2519bb2e-3e08-4807-8755-6cbdc85ec0ba",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "5b7a7244-0871-42ca-bad5-59ee3428c4fe",
                  "type": "has_only_phrase",
                  "uuid": "594a8aa4-814b-41d0-ac9c-3188d6d6fbe7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a629db2b-e3f8-46f6-b17a-7520e68af607",
                  "name": "All Responses",
                  "uuid": "2519bb2e-3e08-4807-8755-6cbdc85ec0ba"
                },
                {
                  "exit_uuid": "d44c3a74-992a-4721-9e11-31d783963bf8",
                  "name": "Take me to Homescreen",
                  "uuid": "5b7a7244-0871-42ca-bad5-59ee3428c4fe"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a629db2b-e3f8-46f6-b17a-7520e68af607",
                "destination_uuid": null
              },
              {
                "uuid": "d44c3a74-992a-4721-9e11-31d783963bf8",
                "destination_uuid": "a193d95e-fd24-456e-927c-f5a38039e8c3"
              }
            ]
          },
          {
            "uuid": "a193d95e-fd24-456e-927c-f5a38039e8c3",
            "actions": [
              {
                "uuid": "b4384c3f-a84e-4eff-bde6-870fb5313183",
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
                "uuid": "bb7072b6-4289-4bfd-b837-a5fa19d7fef2",
                "destination_uuid": "a3cd0c39-2fb2-42aa-ae19-8b3129b5c91c"
              }
            ]
          },
          {
            "uuid": "a3cd0c39-2fb2-42aa-ae19-8b3129b5c91c",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "038623ad-064d-426a-9123-9a026fb5ce65"
                },
                "type": "enter_flow",
                "uuid": "6165de2a-33cb-47bc-9d14-b5b3e0caafd0"
              }
            ],
            "exits": [
              {
                "uuid": "e355c80d-d169-44a0-8d6b-8c554fca72a0",
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
        "uuid": "c012047b-3269-4607-a92c-28027fbb3432",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c2e58c18-b4f7-41f9-99a9-495653b81616",
            "actions": [
              {
                "attachments": [],
                "text": "Your goal for One-on-One Time was to @fields.mod_1on1_chooseact with your teen.\nHow did it go?  https://plh-demo1.idems.international/chat/msg-info?character=elder&choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "Great",
                  "Neutral",
                  "Bad"
                ],
                "uuid": "c0fdbfe7-2deb-44e2-aa70-2206132765d7"
              }
            ],
            "exits": [
              {
                "uuid": "06869859-b816-46f4-9213-c8538807fedf",
                "destination_uuid": "5ea18568-af93-4a45-975d-165ffb2a8f59"
              }
            ]
          },
          {
            "uuid": "5ea18568-af93-4a45-975d-165ffb2a8f59",
            "actions": [],
            "exits": [
              {
                "uuid": "9d93cc60-c704-47e1-9e06-876390353ad4",
                "destination_uuid": "0743cb03-db0d-44ac-ad5e-c7f70b95ebaf"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b2132700-4388-48aa-a28d-3762a7a42380",
              "cases": [],
              "categories": [
                {
                  "uuid": "b2132700-4388-48aa-a28d-3762a7a42380",
                  "name": "All Responses",
                  "exit_uuid": "9d93cc60-c704-47e1-9e06-876390353ad4"
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
            "uuid": "0743cb03-db0d-44ac-ad5e-c7f70b95ebaf",
            "actions": [
              {
                "uuid": "56c98ccd-2bc5-4ba0-b219-2bc3c6794a19",
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
                "uuid": "b26cb32d-efc4-4ca0-b8b0-dba92fa5f1c4",
                "destination_uuid": "dd3363eb-317f-4f67-823f-666cd5a05280"
              }
            ]
          },
          {
            "uuid": "dd3363eb-317f-4f67-823f-666cd5a05280",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "73c161f6-0e99-46b3-ab9f-ce695c244ad9",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "fa898197-bf88-48fb-b06b-0f97e3e1f583",
                  "type": "has_only_phrase",
                  "uuid": "a8acf48a-b67b-441e-828a-94035067f30b"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "1f46f502-d935-4c40-894e-5cf798a755d0",
                  "type": "has_only_phrase",
                  "uuid": "081c429b-8c3a-4d9b-ba74-1aef455a5411"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "07b323c7-01aa-4f6d-a61b-730fe14a346f",
                  "type": "has_only_phrase",
                  "uuid": "6a15344d-e157-4b34-8f46-c870f07256bf"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "bcececf9-6246-432d-8084-56ed87f3bb75",
                  "name": "All Responses",
                  "uuid": "73c161f6-0e99-46b3-ab9f-ce695c244ad9"
                },
                {
                  "exit_uuid": "5397bd6c-d933-4fa8-a83b-d098112d2e83",
                  "name": "Great",
                  "uuid": "fa898197-bf88-48fb-b06b-0f97e3e1f583"
                },
                {
                  "exit_uuid": "891035c5-2b7c-4b52-b61d-c6c4756c8275",
                  "name": "Neutral",
                  "uuid": "1f46f502-d935-4c40-894e-5cf798a755d0"
                },
                {
                  "exit_uuid": "fb699774-b5c7-4f0e-b0b9-647ae3b4a21d",
                  "name": "Bad",
                  "uuid": "07b323c7-01aa-4f6d-a61b-730fe14a346f"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "bcececf9-6246-432d-8084-56ed87f3bb75",
                "destination_uuid": null
              },
              {
                "uuid": "5397bd6c-d933-4fa8-a83b-d098112d2e83",
                "destination_uuid": "9b0ddd31-22d0-4733-9ac7-bb7e9c6c3218"
              },
              {
                "uuid": "891035c5-2b7c-4b52-b61d-c6c4756c8275",
                "destination_uuid": "a4035fc0-45f7-4a17-8b72-ea5a6b2effca"
              },
              {
                "uuid": "fb699774-b5c7-4f0e-b0b9-647ae3b4a21d",
                "destination_uuid": "380cdbdc-c580-4af8-b297-5cee37eb5d71"
              }
            ]
          },
          {
            "uuid": "9b0ddd31-22d0-4733-9ac7-bb7e9c6c3218",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "800b2c9a-df73-4aa0-81d3-76c99ef6f64e"
              }
            ],
            "exits": [
              {
                "uuid": "4433a7e3-471e-4cf8-b4dd-06c8796a4ba3",
                "destination_uuid": "292e4ae2-b04c-46c2-882d-0cd5685ee51e"
              }
            ]
          },
          {
            "uuid": "a4035fc0-45f7-4a17-8b72-ea5a6b2effca",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c45ad585-a264-49a3-b213-70cf6b733119"
              }
            ],
            "exits": [
              {
                "uuid": "3cb637d9-40da-4c4c-8d26-75ddd43b5313",
                "destination_uuid": "292e4ae2-b04c-46c2-882d-0cd5685ee51e"
              }
            ]
          },
          {
            "uuid": "292e4ae2-b04c-46c2-882d-0cd5685ee51e",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "4827c06b-5a1e-40c0-bd36-ccf3ce1c2f74"
                },
                "type": "enter_flow",
                "uuid": "bc4f48ac-b677-4dee-ad1e-87b9f04f4f29"
              }
            ],
            "exits": [
              {
                "uuid": "c5dcaff9-38bf-4343-a516-50b80c640629",
                "destination_uuid": "98575f72-5b0f-48a4-9f25-99946e449aa7"
              },
              {
                "uuid": "f9833e87-ce6c-40fa-acce-698baea8c225",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "6efe9b43-2629-4fd2-af71-57bc5bd692c1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a6cab03b-1970-4b03-b6f0-e07a76a66b16"
                },
                {
                  "uuid": "505024be-77b6-4bbd-9637-546395cd1bb1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d1b3fccf-eb4c-4986-8fad-78b700aaadee"
                }
              ],
              "categories": [
                {
                  "uuid": "a6cab03b-1970-4b03-b6f0-e07a76a66b16",
                  "name": "Complete",
                  "exit_uuid": "c5dcaff9-38bf-4343-a516-50b80c640629"
                },
                {
                  "uuid": "d1b3fccf-eb4c-4986-8fad-78b700aaadee",
                  "name": "Expired",
                  "exit_uuid": "f9833e87-ce6c-40fa-acce-698baea8c225"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a6cab03b-1970-4b03-b6f0-e07a76a66b16"
            }
          },
          {
            "uuid": "98575f72-5b0f-48a4-9f25-99946e449aa7",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "63fcf3d3-a835-49c6-a044-08d930a9df78"
                },
                "type": "enter_flow",
                "uuid": "625c23a6-61cb-4089-89ea-74d76ee59358"
              }
            ],
            "exits": [
              {
                "uuid": "c65fafb0-8ff2-4dab-b076-8aee5c17d2f1",
                "destination_uuid": "5ba35c80-a0b4-4ff5-808e-2325601e58b0"
              },
              {
                "uuid": "1d870e83-51c2-4136-9282-9e02147eebcf",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "acf1cec2-195a-4081-af87-317f68009a49",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d355d47e-dba3-49dc-baf9-ccadab459290"
                },
                {
                  "uuid": "d0161d23-1bb2-4a30-8d1f-00e3c459b6b5",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "cafde2fe-4666-4e6b-abf3-5097a19fdea8"
                }
              ],
              "categories": [
                {
                  "uuid": "d355d47e-dba3-49dc-baf9-ccadab459290",
                  "name": "Complete",
                  "exit_uuid": "c65fafb0-8ff2-4dab-b076-8aee5c17d2f1"
                },
                {
                  "uuid": "cafde2fe-4666-4e6b-abf3-5097a19fdea8",
                  "name": "Expired",
                  "exit_uuid": "1d870e83-51c2-4136-9282-9e02147eebcf"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d355d47e-dba3-49dc-baf9-ccadab459290"
            }
          },
          {
            "uuid": "380cdbdc-c580-4af8-b297-5cee37eb5d71",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7056e81f-86ad-4735-8ec3-7b7f5d93a5c3"
              }
            ],
            "exits": [
              {
                "uuid": "9a7212ff-1e9e-4096-8c15-ad6a253ae317",
                "destination_uuid": "bf090ecd-046d-40ed-8ad6-fd5a294d96b6"
              }
            ]
          },
          {
            "uuid": "bf090ecd-046d-40ed-8ad6-fd5a294d96b6",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "4ba5993e-2104-4ea2-aaf4-c5161a03153b"
                },
                "type": "enter_flow",
                "uuid": "fef9799d-f38e-4b2b-bc48-e0fdfccae66e"
              }
            ],
            "exits": [
              {
                "uuid": "c6ca46f3-208f-43c5-a957-35d283ac651d",
                "destination_uuid": "04dbb6ad-b1b4-48fa-b81e-f3ecd561e1bb"
              },
              {
                "uuid": "4db4e50d-dff3-4bb3-971c-65f53890d502",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "55418335-2073-4b4d-b2fb-5cd6a8781db3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "834a485d-e0f1-4d62-b033-9d4ace6026f4"
                },
                {
                  "uuid": "92cf1dab-717d-4c81-b13c-979044ae4f31",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "71a1c4a3-5587-4f6b-915f-bca63ef3f5c3"
                }
              ],
              "categories": [
                {
                  "uuid": "834a485d-e0f1-4d62-b033-9d4ace6026f4",
                  "name": "Complete",
                  "exit_uuid": "c6ca46f3-208f-43c5-a957-35d283ac651d"
                },
                {
                  "uuid": "71a1c4a3-5587-4f6b-915f-bca63ef3f5c3",
                  "name": "Expired",
                  "exit_uuid": "4db4e50d-dff3-4bb3-971c-65f53890d502"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "834a485d-e0f1-4d62-b033-9d4ace6026f4"
            }
          },
          {
            "uuid": "04dbb6ad-b1b4-48fa-b81e-f3ecd561e1bb",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "d54c11fd-1a00-4b66-bc9c-bba9116f8d70"
                },
                "type": "enter_flow",
                "uuid": "bdb541ff-27f5-4143-9587-0a62783fd208"
              }
            ],
            "exits": [
              {
                "uuid": "429ecb20-a817-49ad-b518-48247687a766",
                "destination_uuid": "5ba35c80-a0b4-4ff5-808e-2325601e58b0"
              },
              {
                "uuid": "53750826-6eb6-4e73-82a0-fb80fe322156",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8dea6666-1068-431f-beb2-8a133a70b1af",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d770d25c-7087-4c79-b7a0-3c3e08402b84"
                },
                {
                  "uuid": "95c0f140-17ae-4135-836d-0fa72a548584",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "5beb765a-b1a9-4193-897d-deca4dc59865"
                }
              ],
              "categories": [
                {
                  "uuid": "d770d25c-7087-4c79-b7a0-3c3e08402b84",
                  "name": "Complete",
                  "exit_uuid": "429ecb20-a817-49ad-b518-48247687a766"
                },
                {
                  "uuid": "5beb765a-b1a9-4193-897d-deca4dc59865",
                  "name": "Expired",
                  "exit_uuid": "53750826-6eb6-4e73-82a0-fb80fe322156"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d770d25c-7087-4c79-b7a0-3c3e08402b84"
            }
          },
          {
            "uuid": "5ba35c80-a0b4-4ff5-808e-2325601e58b0",
            "actions": [
              {
                "uuid": "3430609b-712b-4356-af4f-806a4c51c701",
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
                "uuid": "7cb4c865-e612-4484-8f22-820a035a2bbc",
                "destination_uuid": "65b626e8-3ee6-4654-8c9e-a6d986433f90"
              }
            ]
          },
          {
            "uuid": "65b626e8-3ee6-4654-8c9e-a6d986433f90",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "5ad29288-95be-46c1-92c5-a461074c0b25"
                },
                "type": "enter_flow",
                "uuid": "31a3673f-b665-4531-b70a-8a066b0bd5ef"
              }
            ],
            "exits": [
              {
                "uuid": "c2dce894-8e5e-47e4-b169-35db4a8b82bf",
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
        "uuid": "e00c5841-654b-4cb2-8deb-8ced32bb5983",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e16777ca-f5b5-495e-a4cf-ab3f11f9aeb1",
            "actions": [
              {
                "attachments": [],
                "text": "Which of my tips helped you?  https://plh-demo1.idems.international/chat/msg-info?character=elder",
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
                "uuid": "2a824c98-f4fc-4cae-b861-ca10b065c407"
              }
            ],
            "exits": [
              {
                "uuid": "6ae53be0-3b98-4761-a6a5-649bd550de07",
                "destination_uuid": "bc48bf81-fd4f-4653-bac1-64877dc11fbc"
              }
            ]
          },
          {
            "uuid": "bc48bf81-fd4f-4653-bac1-64877dc11fbc",
            "actions": [],
            "exits": [
              {
                "uuid": "9f34f5c8-a748-4401-a924-cf3686170b21",
                "destination_uuid": "f788d75c-c30b-4787-b7d6-5f0e182ea43a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b982524d-c618-4c93-9f66-6fa637d8db98",
              "cases": [],
              "categories": [
                {
                  "uuid": "b982524d-c618-4c93-9f66-6fa637d8db98",
                  "name": "All Responses",
                  "exit_uuid": "9f34f5c8-a748-4401-a924-cf3686170b21"
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
            "uuid": "f788d75c-c30b-4787-b7d6-5f0e182ea43a",
            "actions": [
              {
                "uuid": "0f79676c-2536-4d2e-9ba7-91a9363cb378",
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
                "uuid": "5e00611c-bccd-45b4-8b03-5f4426603fde",
                "destination_uuid": "7fd62d62-bf12-403f-90d4-63743f8d7df1"
              }
            ]
          },
          {
            "uuid": "7fd62d62-bf12-403f-90d4-63743f8d7df1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0279dd8d-d17b-4d42-b66e-ec8c91f957b9",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "78a8f672-113c-416d-9fc0-6936a75a9f6a",
                  "type": "has_only_phrase",
                  "uuid": "9e9350dd-edb3-4a16-ba75-55d7a34a49bc"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "8ec44808-b9e9-49b2-b181-e1d94aa18c4f",
                  "type": "has_only_phrase",
                  "uuid": "c3f38a3f-e8ac-4a8b-aecb-f242d4eea699"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "b69fac47-d0ac-4884-b9a8-ae856fca37da",
                  "type": "has_only_phrase",
                  "uuid": "a11e2eb7-43aa-4c2c-b59f-2caa1b520c1d"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "2353ad76-0b15-4f5d-b9fb-24628ff4f105",
                  "type": "has_only_phrase",
                  "uuid": "cce43c39-20fc-4a78-ab50-2e0e2ea7bd60"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "5fb29c36-e654-4bc6-8bf0-6f07ec493bb2",
                  "type": "has_only_phrase",
                  "uuid": "36a5e4f8-b21b-45b8-91b3-99090e57743e"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "c686c151-2e30-4b71-8128-5426afe75337",
                  "type": "has_only_phrase",
                  "uuid": "a744b2e5-6bdf-47aa-8391-e58b2219c169"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "a0b2b7ec-4124-41ed-8acc-5194dee853e3",
                  "type": "has_only_phrase",
                  "uuid": "fe91e350-ae7d-493d-9653-548ebbb33fb8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "224250b3-d357-4390-90f0-52dce7697610",
                  "name": "All Responses",
                  "uuid": "0279dd8d-d17b-4d42-b66e-ec8c91f957b9"
                },
                {
                  "exit_uuid": "c79e6425-6cd5-4195-a7e4-b77872f61904",
                  "name": "Do it every day",
                  "uuid": "78a8f672-113c-416d-9fc0-6936a75a9f6a"
                },
                {
                  "exit_uuid": "7d64fd8f-c3bc-4b7b-b5f8-dfbfe5e72b00",
                  "name": "Let your teen choose the activity",
                  "uuid": "8ec44808-b9e9-49b2-b181-e1d94aa18c4f"
                },
                {
                  "exit_uuid": "fb3bb600-cd35-4a17-a4dd-7d995d6db301",
                  "name": "Follow your teen’s lead",
                  "uuid": "b69fac47-d0ac-4884-b9a8-ae856fca37da"
                },
                {
                  "exit_uuid": "280c34ad-f58c-4f1c-bb5d-9a6bcf40c119",
                  "name": "Give your teen all of your attention",
                  "uuid": "2353ad76-0b15-4f5d-b9fb-24628ff4f105"
                },
                {
                  "exit_uuid": "8a3001f9-77ce-4d62-81fd-79da4335def9",
                  "name": "Show your teen you are really listening",
                  "uuid": "5fb29c36-e654-4bc6-8bf0-6f07ec493bb2"
                },
                {
                  "exit_uuid": "24f36c29-47ca-469e-8148-e97389d1f2bb",
                  "name": "Have fun!",
                  "uuid": "c686c151-2e30-4b71-8128-5426afe75337"
                },
                {
                  "exit_uuid": "a6cb2348-eca3-47a7-90dd-be4a09d7facf",
                  "name": "None ",
                  "uuid": "a0b2b7ec-4124-41ed-8acc-5194dee853e3"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "224250b3-d357-4390-90f0-52dce7697610",
                "destination_uuid": null
              },
              {
                "uuid": "c79e6425-6cd5-4195-a7e4-b77872f61904",
                "destination_uuid": "7c5edd19-d840-4a76-985e-c885a5c3cbed"
              },
              {
                "uuid": "7d64fd8f-c3bc-4b7b-b5f8-dfbfe5e72b00",
                "destination_uuid": "03c472b3-c52a-4f9b-93ac-99908a327a73"
              },
              {
                "uuid": "fb3bb600-cd35-4a17-a4dd-7d995d6db301",
                "destination_uuid": "af7e1573-2f76-49bf-8432-647da9e03d8a"
              },
              {
                "uuid": "280c34ad-f58c-4f1c-bb5d-9a6bcf40c119",
                "destination_uuid": "2461d358-7597-438f-998c-ca3f85c8e920"
              },
              {
                "uuid": "8a3001f9-77ce-4d62-81fd-79da4335def9",
                "destination_uuid": "2110aa3e-196b-4857-98b4-3fc14bdef416"
              },
              {
                "uuid": "24f36c29-47ca-469e-8148-e97389d1f2bb",
                "destination_uuid": "433ce07f-654a-4406-8769-b8e4f11307f3"
              },
              {
                "uuid": "a6cb2348-eca3-47a7-90dd-be4a09d7facf",
                "destination_uuid": "c0f75d54-34d6-4e98-b0e9-60a08c692c56"
              }
            ]
          },
          {
            "uuid": "7c5edd19-d840-4a76-985e-c885a5c3cbed",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "Having a specific time helps me remember ",
                  "With a routine my teen and I can both keep our schedule free",
                  "Spending time every day helps build trust with my teen "
                ],
                "uuid": "3b3f0866-30b4-42e3-aa53-31caae1b52ef"
              }
            ],
            "exits": [
              {
                "uuid": "1d182f70-03da-4d9f-8d6a-9b9f214806ce",
                "destination_uuid": "2fc5bfb3-cae3-4cf7-8ce5-b040a79893f7"
              }
            ]
          },
          {
            "uuid": "2fc5bfb3-cae3-4cf7-8ce5-b040a79893f7",
            "actions": [],
            "exits": [
              {
                "uuid": "867077e3-7f06-4264-b336-cea30f6dea6f",
                "destination_uuid": "1188999b-b95a-4ecc-bdbb-df68b28dbbd9"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3adc11f6-9d98-449e-b108-8fd3b27c83d7",
              "cases": [],
              "categories": [
                {
                  "uuid": "3adc11f6-9d98-449e-b108-8fd3b27c83d7",
                  "name": "All Responses",
                  "exit_uuid": "867077e3-7f06-4264-b336-cea30f6dea6f"
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
            "uuid": "1188999b-b95a-4ecc-bdbb-df68b28dbbd9",
            "actions": [
              {
                "uuid": "7dc971ee-a239-4bb0-ba5b-e891b8b7f60d",
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
                "uuid": "1748d987-74d0-4a34-9036-bc162fd6895b",
                "destination_uuid": "0f21264d-875a-4876-9243-8fa54ebcea2e"
              }
            ]
          },
          {
            "uuid": "0f21264d-875a-4876-9243-8fa54ebcea2e",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "79dccc28-beda-4157-b09d-3e78fda7f560"
              }
            ],
            "exits": [
              {
                "uuid": "3e174d52-75f7-4c13-9c5c-2d1f33c44de6",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "03c472b3-c52a-4f9b-93ac-99908a327a73",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "Letting my teen choose what to do builds their confidence",
                  "If my teen chooses, he/she is more likely to want to spend time together",
                  "Letting my teen choose shows that I care about his/her interests"
                ],
                "uuid": "d14d6c2c-ccaa-4055-92b1-afa20421391a"
              }
            ],
            "exits": [
              {
                "uuid": "60728a31-69cc-44c9-b9a5-91f3d242896e",
                "destination_uuid": "fad1b5e9-3ed4-4022-b9a4-1a40c8950bea"
              }
            ]
          },
          {
            "uuid": "fad1b5e9-3ed4-4022-b9a4-1a40c8950bea",
            "actions": [],
            "exits": [
              {
                "uuid": "a6ee435f-b7cd-4126-9579-b5fbc2f7211e",
                "destination_uuid": "46094e9e-0f5c-454f-87b5-a704c13b342b"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3b72ae2d-9a96-4b35-a150-c3f5f6b15c5b",
              "cases": [],
              "categories": [
                {
                  "uuid": "3b72ae2d-9a96-4b35-a150-c3f5f6b15c5b",
                  "name": "All Responses",
                  "exit_uuid": "a6ee435f-b7cd-4126-9579-b5fbc2f7211e"
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
            "uuid": "46094e9e-0f5c-454f-87b5-a704c13b342b",
            "actions": [
              {
                "uuid": "e7b22dc7-36e0-4226-be43-d9058cbcbd05",
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
                "uuid": "094cbd53-fabd-49f1-b720-51ef00d8f37c",
                "destination_uuid": "6bdc08ea-bf86-4f7b-9584-1345babe98bf"
              }
            ]
          },
          {
            "uuid": "6bdc08ea-bf86-4f7b-9584-1345babe98bf",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cd827c39-0918-43aa-887a-375cb62513ec"
              }
            ],
            "exits": [
              {
                "uuid": "7f12f21b-be4e-4dcf-b292-c4fa38c2f8d3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "af7e1573-2f76-49bf-8432-647da9e03d8a",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "By accepting my teen’s suggestions, I show I listen to him/her",
                  "Saying something nice about my teen’s choice helps them feel valued",
                  "Doing what my teen likes to do will help them to open up to me"
                ],
                "uuid": "8a3ecfae-fa39-473a-a648-b7706dd75bbb"
              }
            ],
            "exits": [
              {
                "uuid": "67b3d272-af96-42d8-ab86-315980a6c0f8",
                "destination_uuid": "ae9355ba-68fa-4da6-92a4-f081f66a26e5"
              }
            ]
          },
          {
            "uuid": "ae9355ba-68fa-4da6-92a4-f081f66a26e5",
            "actions": [],
            "exits": [
              {
                "uuid": "0dc10ac3-da8b-4315-b625-4d24092f4712",
                "destination_uuid": "e72a56fe-7373-4fb0-a185-88f15d5f2cdd"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6fa106d9-04cf-4528-b239-a56ddb154e37",
              "cases": [],
              "categories": [
                {
                  "uuid": "6fa106d9-04cf-4528-b239-a56ddb154e37",
                  "name": "All Responses",
                  "exit_uuid": "0dc10ac3-da8b-4315-b625-4d24092f4712"
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
            "uuid": "e72a56fe-7373-4fb0-a185-88f15d5f2cdd",
            "actions": [
              {
                "uuid": "df11a1b2-6d29-48af-8ae7-834f039032d6",
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
                "uuid": "11c48764-bb1d-499b-bc0c-90baa791cb83",
                "destination_uuid": "8cde7ccd-b3d1-4631-9b14-7e5bfa90a2b0"
              }
            ]
          },
          {
            "uuid": "8cde7ccd-b3d1-4631-9b14-7e5bfa90a2b0",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "549065d2-4cd7-4bc4-9f26-db8c8d0a4641"
              }
            ],
            "exits": [
              {
                "uuid": "7ccb0328-686c-4e68-b20e-8adb41c205d3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "2461d358-7597-438f-998c-ca3f85c8e920",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "By preventing interruptions, I show my teen they are most important",
                  "Even if I can't join my teen's activity, like sports, I can still cheer them on",
                  "When I pay attention, I can learn so much about my teen's interests, views and capabilities"
                ],
                "uuid": "5da1af86-90f2-4a73-9649-e7981d9f9114"
              }
            ],
            "exits": [
              {
                "uuid": "bfbb1d7d-0854-44d3-80ed-c2f059076565",
                "destination_uuid": "bb55b821-295e-4bdb-84cd-331fb721efea"
              }
            ]
          },
          {
            "uuid": "bb55b821-295e-4bdb-84cd-331fb721efea",
            "actions": [],
            "exits": [
              {
                "uuid": "2287da52-d1f6-4db3-8ddb-dd143ec656e7",
                "destination_uuid": "e9740995-4158-4267-b63e-93f7865811c7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "dfcf5709-c6a4-4a03-91c0-7e85e4b8562a",
              "cases": [],
              "categories": [
                {
                  "uuid": "dfcf5709-c6a4-4a03-91c0-7e85e4b8562a",
                  "name": "All Responses",
                  "exit_uuid": "2287da52-d1f6-4db3-8ddb-dd143ec656e7"
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
            "uuid": "e9740995-4158-4267-b63e-93f7865811c7",
            "actions": [
              {
                "uuid": "ad85fadb-389f-4b77-9efb-3b20169e5b3b",
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
                "uuid": "95eb1a0b-7a08-4ea5-badf-41cd61a0b8ad",
                "destination_uuid": "95217b4c-8d62-40ff-83bf-ff8d23f6b49e"
              }
            ]
          },
          {
            "uuid": "95217b4c-8d62-40ff-83bf-ff8d23f6b49e",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f4b9c342-f2a7-4658-b6fc-a7428f037b36"
              }
            ],
            "exits": [
              {
                "uuid": "4154a163-6734-4bf8-907a-1b34c9dac358",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "2110aa3e-196b-4857-98b4-3fc14bdef416",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "By nodding and saying \"I see\" my teen feels heard and valued",
                  "By repeating parts of what my teen has said, I can make sure I understand him/her well",
                  "Listening with eye contact shows my teen I care about what they do and think"
                ],
                "uuid": "48a3f594-4ddb-40a8-a47f-8eb2ffd24814"
              }
            ],
            "exits": [
              {
                "uuid": "602517cf-b547-440c-bc7d-f32d3565e353",
                "destination_uuid": "56882f09-cf9f-4139-841c-7703899eab7d"
              }
            ]
          },
          {
            "uuid": "56882f09-cf9f-4139-841c-7703899eab7d",
            "actions": [],
            "exits": [
              {
                "uuid": "82513f9b-a71c-41cb-b017-00fa89f62b63",
                "destination_uuid": "77757180-1674-464a-8732-cf7db84461e0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f534964e-36d9-4c39-8481-51eac2d7d41d",
              "cases": [],
              "categories": [
                {
                  "uuid": "f534964e-36d9-4c39-8481-51eac2d7d41d",
                  "name": "All Responses",
                  "exit_uuid": "82513f9b-a71c-41cb-b017-00fa89f62b63"
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
            "uuid": "77757180-1674-464a-8732-cf7db84461e0",
            "actions": [
              {
                "uuid": "83a35f54-94de-4719-8b41-a328a4b6e238",
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
                "uuid": "7962bb71-61f5-488a-bb9e-457e1589cee6",
                "destination_uuid": "a2b42bd6-b05d-4f2c-8475-4ddf086469ae"
              }
            ]
          },
          {
            "uuid": "a2b42bd6-b05d-4f2c-8475-4ddf086469ae",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a7d1caa4-d44a-46b6-bc97-1d43896fabb5"
              }
            ],
            "exits": [
              {
                "uuid": "d617410d-0ffc-450f-b643-8c0752beba2e",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "433ce07f-654a-4406-8769-b8e4f11307f3",
            "actions": [
              {
                "attachments": [],
                "text": "Why was this tip helpful for you?  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [
                  "When I enjoy One-on-One Time, my teen is also more likely to enjoy it",
                  "Normally we often argue, so it was great to spend positive time together",
                  "One-on-One Time is an opportunity for me to show a calm and relaxed side of myself to my teens "
                ],
                "uuid": "821f4635-697d-4a92-b099-7a273c44750f"
              }
            ],
            "exits": [
              {
                "uuid": "71889b60-c491-4e24-9626-4b96f908e3ee",
                "destination_uuid": "9cc896f8-b1ea-4a39-bf41-cae1921470ef"
              }
            ]
          },
          {
            "uuid": "9cc896f8-b1ea-4a39-bf41-cae1921470ef",
            "actions": [],
            "exits": [
              {
                "uuid": "a6400660-5cfd-43ec-ab0b-b082b52e6617",
                "destination_uuid": "2acbb261-0a6a-46ea-bd21-2471b6ab6b88"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d652e6de-7502-4ea2-bc93-78c42ea1579f",
              "cases": [],
              "categories": [
                {
                  "uuid": "d652e6de-7502-4ea2-bc93-78c42ea1579f",
                  "name": "All Responses",
                  "exit_uuid": "a6400660-5cfd-43ec-ab0b-b082b52e6617"
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
            "uuid": "2acbb261-0a6a-46ea-bd21-2471b6ab6b88",
            "actions": [
              {
                "uuid": "2019368d-b14c-4d0a-bf1e-fee905869909",
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
                "uuid": "db59a993-3d35-4a92-b7ca-825934d676a7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "47db8d21-b4cd-47c5-a7c7-5a6d8a2ef6c7",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6432df65-524b-4435-bd6f-059b4f1cc77d"
              }
            ],
            "exits": [
              {
                "uuid": "4bc8eebb-9039-4957-ae29-528769e8f17e",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "c0f75d54-34d6-4e98-b0e9-60a08c692c56",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2be84282-8b96-4a00-97bf-b3709e5716a7"
              }
            ],
            "exits": [
              {
                "uuid": "77db3c27-bf0e-4b27-942a-f74cb3104816",
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
        "uuid": "6f2d828e-9b20-4f30-80b6-50e0813147ad",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d28f51b0-9ff9-4763-b8e7-7255e4534762",
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
                "uuid": "3954b4ac-4589-4b33-9d96-0ae7ec398c1e"
              }
            ],
            "exits": [
              {
                "uuid": "5ea2dbb9-5667-4767-9991-52909d804349",
                "destination_uuid": "413048ec-863d-4d7a-a8f8-aaf13459f504"
              }
            ]
          },
          {
            "uuid": "396ff27e-74d0-49b8-9100-cd14dc704502",
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
                "uuid": "17005504-dde9-469e-b645-703b2765919a"
              }
            ],
            "exits": [
              {
                "uuid": "0d17d64a-bc22-4320-a316-2ed4255c91ac",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "8bf905aa-4695-463b-ad51-b69fa1722413",
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
                "uuid": "90f00ead-3dbc-463c-9e1b-e5fa419a7e78"
              }
            ],
            "exits": [
              {
                "uuid": "5c41c14a-4c0d-40da-b9fa-1e1f21278a86",
                "destination_uuid": "413048ec-863d-4d7a-a8f8-aaf13459f504"
              }
            ]
          },
          {
            "uuid": "413048ec-863d-4d7a-a8f8-aaf13459f504",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3ae3c2a2-6be1-4ba8-8c16-603bd83f48b3",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "fa2b34d8-71bf-4320-b6ab-2798cbad02c0",
                  "type": "has_only_phrase",
                  "uuid": "944493c8-1135-4a5f-8a57-dea893fd3e63"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "afabe934-5622-4f5d-b3cf-8323f0e52a0b",
                  "type": "has_only_phrase",
                  "uuid": "512b9dd5-c175-47d8-b8cb-c28355d1b200"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "2e5f67f2-b104-4e88-9540-fde14e4a4d02",
                  "type": "has_only_phrase",
                  "uuid": "e5ba860f-b02c-46ba-a94f-3b2c2c229063"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "044bc24c-3254-40fc-b5bf-dbef5ebdeea2",
                  "type": "has_only_phrase",
                  "uuid": "17ebecc5-d2e9-4a1f-8775-e4afe5035614"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "e064440b-5bd2-41f5-bd8a-797d4394776b",
                  "type": "has_only_phrase",
                  "uuid": "60f91756-9c25-4a56-9d46-9b2ecda5c1da"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "393e39db-875b-472e-b6bb-4ea45e9a370b",
                  "type": "has_only_phrase",
                  "uuid": "45bd92d6-3b86-4a96-b4ac-3294b1ac3392"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "e14d218c-3169-4937-9b64-e4a0fd7eb0b3",
                  "type": "has_only_phrase",
                  "uuid": "e2b9d50a-d4cb-40b0-b5a3-2d768c15c7af"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "7138bd95-edd9-4fd9-ab19-74679015accb",
                  "type": "has_only_phrase",
                  "uuid": "39278845-52b8-4f2d-b635-6fe1afece916"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "099ba1f3-d5d5-43c7-a573-e722bcf0fa88",
                  "type": "has_only_phrase",
                  "uuid": "20d5fa71-e593-48ad-86ab-f3f59bf7fe1d"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "ddce780f-f2ec-4182-85f4-7496d6830d91",
                  "type": "has_only_phrase",
                  "uuid": "91ead297-79c5-4691-ab4d-e38c99837bb0"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "52ed6fcf-c9b8-48f6-b697-714b40807d27",
                  "type": "has_only_phrase",
                  "uuid": "8debc5e1-feac-4727-96d3-1849dd4f91a9"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "82a0c1ca-3f40-4a84-9b1c-ef8fbcfc5bb2",
                  "type": "has_only_phrase",
                  "uuid": "7466f8a7-8765-450b-a9b5-9299e8cebeda"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "0416ea88-6721-4686-91bd-fcbc36dcf350",
                  "type": "has_only_phrase",
                  "uuid": "62460112-1eaa-42d6-a460-00ca5dd46f6c"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "4e73f209-2ed2-45c3-8fca-5df9c67a948e",
                  "type": "has_only_phrase",
                  "uuid": "3c7e4774-6b51-4da6-ae97-e1255deadf14"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "e52f5e14-4257-40f6-b423-52e6a74a5faf",
                  "type": "has_only_phrase",
                  "uuid": "bf29c3b9-4989-457c-82de-8297405c95e9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f4a09607-c488-4685-9c40-3cace868c95e",
                  "name": "All Responses",
                  "uuid": "3ae3c2a2-6be1-4ba8-8c16-603bd83f48b3"
                },
                {
                  "exit_uuid": "7be9452d-5164-4771-8762-950a7a84431c",
                  "name": "I don’t have enough time",
                  "uuid": "fa2b34d8-71bf-4320-b6ab-2798cbad02c0"
                },
                {
                  "exit_uuid": "c8bb7454-1352-426f-b186-d87160a4e133",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "afabe934-5622-4f5d-b3cf-8323f0e52a0b"
                },
                {
                  "exit_uuid": "5ba795e0-70fd-4cce-9c78-cf30586b2c97",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "2e5f67f2-b104-4e88-9540-fde14e4a4d02"
                },
                {
                  "exit_uuid": "46909e26-a2f4-4183-a7b6-23a00001f8a6",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "044bc24c-3254-40fc-b5bf-dbef5ebdeea2"
                },
                {
                  "exit_uuid": "18de8487-8049-478a-8782-27bbf4ba5166",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "e064440b-5bd2-41f5-bd8a-797d4394776b"
                },
                {
                  "exit_uuid": "a1581269-51b7-406c-b44e-0b527439c4cd",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "393e39db-875b-472e-b6bb-4ea45e9a370b"
                },
                {
                  "exit_uuid": "8ad6088e-066c-426c-9379-181c284c0a37",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "e14d218c-3169-4937-9b64-e4a0fd7eb0b3"
                },
                {
                  "exit_uuid": "d9d64f2a-107c-4aef-9099-b56be56c82e8",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "7138bd95-edd9-4fd9-ab19-74679015accb"
                },
                {
                  "exit_uuid": "c8db5960-a123-4677-b6bf-08a1b3f60060",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "099ba1f3-d5d5-43c7-a573-e722bcf0fa88"
                },
                {
                  "exit_uuid": "b7e4aa40-1479-420f-ba27-a667c3b8e2eb",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "ddce780f-f2ec-4182-85f4-7496d6830d91"
                },
                {
                  "exit_uuid": "ae4b5faa-85fc-4538-9161-5e7910f72cd3",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "52ed6fcf-c9b8-48f6-b697-714b40807d27"
                },
                {
                  "exit_uuid": "9c3d8354-5ded-4d7e-978e-6b75e91a3b50",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "82a0c1ca-3f40-4a84-9b1c-ef8fbcfc5bb2"
                },
                {
                  "exit_uuid": "b5f921af-b417-4a98-ab9e-85160a7d6336",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "0416ea88-6721-4686-91bd-fcbc36dcf350"
                },
                {
                  "exit_uuid": "9b8f787f-4223-49db-9c41-604cf5df7bb6",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "4e73f209-2ed2-45c3-8fca-5df9c67a948e"
                },
                {
                  "exit_uuid": "6080ef61-8a2a-4368-a380-d86bc071e39b",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "e52f5e14-4257-40f6-b423-52e6a74a5faf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f4a09607-c488-4685-9c40-3cace868c95e",
                "destination_uuid": null
              },
              {
                "uuid": "7be9452d-5164-4771-8762-950a7a84431c",
                "destination_uuid": "c30ae018-3943-4b59-b878-c26150a577e0"
              },
              {
                "uuid": "c8bb7454-1352-426f-b186-d87160a4e133",
                "destination_uuid": "2dbef4b2-b3b5-45b9-a5b7-6674d58f2b4c"
              },
              {
                "uuid": "5ba795e0-70fd-4cce-9c78-cf30586b2c97",
                "destination_uuid": "2dbef4b2-b3b5-45b9-a5b7-6674d58f2b4c"
              },
              {
                "uuid": "46909e26-a2f4-4183-a7b6-23a00001f8a6",
                "destination_uuid": "26f0b631-b2a5-49cc-8453-9c40807e2c8a"
              },
              {
                "uuid": "18de8487-8049-478a-8782-27bbf4ba5166",
                "destination_uuid": "26f0b631-b2a5-49cc-8453-9c40807e2c8a"
              },
              {
                "uuid": "a1581269-51b7-406c-b44e-0b527439c4cd",
                "destination_uuid": "b28cc494-e69f-4a2c-a425-ead6282fac61"
              },
              {
                "uuid": "8ad6088e-066c-426c-9379-181c284c0a37",
                "destination_uuid": "b28cc494-e69f-4a2c-a425-ead6282fac61"
              },
              {
                "uuid": "d9d64f2a-107c-4aef-9099-b56be56c82e8",
                "destination_uuid": "2f9254bb-8fcc-4adc-9a3d-43006e13f162"
              },
              {
                "uuid": "c8db5960-a123-4677-b6bf-08a1b3f60060",
                "destination_uuid": "2f9254bb-8fcc-4adc-9a3d-43006e13f162"
              },
              {
                "uuid": "b7e4aa40-1479-420f-ba27-a667c3b8e2eb",
                "destination_uuid": "37e16f76-75c4-41ed-8fd2-7b81597c2bb8"
              },
              {
                "uuid": "ae4b5faa-85fc-4538-9161-5e7910f72cd3",
                "destination_uuid": "37e16f76-75c4-41ed-8fd2-7b81597c2bb8"
              },
              {
                "uuid": "9c3d8354-5ded-4d7e-978e-6b75e91a3b50",
                "destination_uuid": "c05a8c85-1b7a-4407-bf98-6725ff439922"
              },
              {
                "uuid": "b5f921af-b417-4a98-ab9e-85160a7d6336",
                "destination_uuid": "c05a8c85-1b7a-4407-bf98-6725ff439922"
              },
              {
                "uuid": "9b8f787f-4223-49db-9c41-604cf5df7bb6",
                "destination_uuid": "f909dcf8-dff4-4b8f-abee-a3014780e985"
              },
              {
                "uuid": "6080ef61-8a2a-4368-a380-d86bc071e39b",
                "destination_uuid": "f909dcf8-dff4-4b8f-abee-a3014780e985"
              }
            ]
          },
          {
            "uuid": "c30ae018-3943-4b59-b878-c26150a577e0",
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
                "uuid": "29177a5d-63f4-468c-b81b-4966808c2186"
              }
            ],
            "exits": [
              {
                "uuid": "c0d67036-cf38-435b-9fdb-923033f26c10",
                "destination_uuid": "75266d75-7dcc-492b-adaa-3b14e7122aa2"
              }
            ]
          },
          {
            "uuid": "75266d75-7dcc-492b-adaa-3b14e7122aa2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "861f18bf-d364-4567-ad6c-df9f2925afc4",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "732d181d-e66b-4704-b320-9bfed28f8540",
                  "type": "has_only_phrase",
                  "uuid": "36270dbc-1b35-4174-94a3-b862c6420462"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "a2efd752-b9db-4182-b072-19c6600e6f0d",
                  "type": "has_only_phrase",
                  "uuid": "36bcea6a-23db-49e3-a984-6aab403b729a"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "eef7fce8-b68e-4d59-9d1d-8cb06af9b5a9",
                  "type": "has_only_phrase",
                  "uuid": "1c9ad4ae-6316-4cc9-a274-ab4cf217a020"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "83944462-521c-4bab-9720-386bc9a1149a",
                  "name": "All Responses",
                  "uuid": "861f18bf-d364-4567-ad6c-df9f2925afc4"
                },
                {
                  "exit_uuid": "f3038b0d-5449-4c2d-9996-265b65c301b1",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "732d181d-e66b-4704-b320-9bfed28f8540"
                },
                {
                  "exit_uuid": "b5cf5d9f-2685-4cc4-81d2-f7e69f1c4b89",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "a2efd752-b9db-4182-b072-19c6600e6f0d"
                },
                {
                  "exit_uuid": "2380f109-2955-425f-a264-8b319908626e",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "eef7fce8-b68e-4d59-9d1d-8cb06af9b5a9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "83944462-521c-4bab-9720-386bc9a1149a",
                "destination_uuid": null
              },
              {
                "uuid": "f3038b0d-5449-4c2d-9996-265b65c301b1",
                "destination_uuid": "ad9273a0-9c62-4605-aed0-6d17185a008e"
              },
              {
                "uuid": "b5cf5d9f-2685-4cc4-81d2-f7e69f1c4b89",
                "destination_uuid": "6fce3c61-d2bf-44ce-90d8-f3fb8b07a3ba"
              },
              {
                "uuid": "2380f109-2955-425f-a264-8b319908626e",
                "destination_uuid": "93c97765-27ba-4d1f-8360-a6d686e5b376"
              }
            ]
          },
          {
            "uuid": "ad9273a0-9c62-4605-aed0-6d17185a008e",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f209fcb2-4377-4787-8472-dcf093c25030"
              }
            ],
            "exits": [
              {
                "uuid": "af4424f3-d2ac-438d-96c2-5c9d157587be",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "6fce3c61-d2bf-44ce-90d8-f3fb8b07a3ba",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8140e894-f585-4c9f-9c7c-1dcd5f7ecf39"
              }
            ],
            "exits": [
              {
                "uuid": "53bb0b36-5877-4ab8-a83d-f5066beb10a0",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "93c97765-27ba-4d1f-8360-a6d686e5b376",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f9d726bf-4e89-40ea-b05b-870cd5e7f675"
              }
            ],
            "exits": [
              {
                "uuid": "31b7255a-c85a-49f2-a5f1-4cbff8289440",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "2dbef4b2-b3b5-45b9-a5b7-6674d58f2b4c",
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
                "uuid": "418f63ee-d692-4ae2-8756-1c608fa29409"
              }
            ],
            "exits": [
              {
                "uuid": "c7863a4f-0a60-4b9d-8102-0b453d17ee65",
                "destination_uuid": "f8d8dd9d-0713-4186-96e6-c41c07bea10f"
              }
            ]
          },
          {
            "uuid": "f8d8dd9d-0713-4186-96e6-c41c07bea10f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "232217c8-09de-4525-9084-b07a138e92b9",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "20fcd24e-69a2-4546-85b7-cc392f7ef676",
                  "type": "has_only_phrase",
                  "uuid": "20dae105-ba41-49a4-b783-fad5f0f44447"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "309b9663-5371-404a-bf85-0f300bd56dc9",
                  "type": "has_only_phrase",
                  "uuid": "95ccce17-9d76-4065-bed4-5f09d632b3c0"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "f13fa2bd-f148-49ee-9ce3-73de4959d5a3",
                  "type": "has_only_phrase",
                  "uuid": "c8f13299-3599-47dd-8987-a209aa136eb0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6eced25f-20dc-4987-9715-b10a197b2452",
                  "name": "All Responses",
                  "uuid": "232217c8-09de-4525-9084-b07a138e92b9"
                },
                {
                  "exit_uuid": "46d944b1-bbeb-43fb-b959-1296b237ee71",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "20fcd24e-69a2-4546-85b7-cc392f7ef676"
                },
                {
                  "exit_uuid": "2360d98c-c328-42ff-be12-5a3c37948fc2",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "309b9663-5371-404a-bf85-0f300bd56dc9"
                },
                {
                  "exit_uuid": "2c2f4472-f7d0-44e6-8adc-e550c2771157",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "f13fa2bd-f148-49ee-9ce3-73de4959d5a3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6eced25f-20dc-4987-9715-b10a197b2452",
                "destination_uuid": null
              },
              {
                "uuid": "46d944b1-bbeb-43fb-b959-1296b237ee71",
                "destination_uuid": "acb4786b-422c-4425-8c2f-e33b676f6ae7"
              },
              {
                "uuid": "2360d98c-c328-42ff-be12-5a3c37948fc2",
                "destination_uuid": "c1f2a156-eacf-42ff-8c42-418c8a64a5e7"
              },
              {
                "uuid": "2c2f4472-f7d0-44e6-8adc-e550c2771157",
                "destination_uuid": "fde2ab12-6ee0-478b-8458-45630f80d279"
              }
            ]
          },
          {
            "uuid": "acb4786b-422c-4425-8c2f-e33b676f6ae7",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fb83d3ec-3426-4d1e-bd97-1db2708bea83"
              }
            ],
            "exits": [
              {
                "uuid": "99ca9ca8-9e50-4d97-b4f8-e973fff4db02",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "c1f2a156-eacf-42ff-8c42-418c8a64a5e7",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ab19aa62-564c-4568-a20f-e8ac863cf6e9"
              }
            ],
            "exits": [
              {
                "uuid": "4be770a3-240e-4ae7-b705-c3f83c956e1d",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "fde2ab12-6ee0-478b-8458-45630f80d279",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8d513d43-98e9-415e-86f7-4667143062be"
              }
            ],
            "exits": [
              {
                "uuid": "e2a3c00b-3e18-4a78-9e03-aa379cbe6dc2",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "26f0b631-b2a5-49cc-8453-9c40807e2c8a",
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
                "uuid": "bf6f66f3-a15c-44bd-a997-708d1ebdf191"
              }
            ],
            "exits": [
              {
                "uuid": "73adb05e-ec38-4c21-8296-2b7b64f483f1",
                "destination_uuid": "b8741cee-787b-496a-869d-2d9eeec24200"
              }
            ]
          },
          {
            "uuid": "b8741cee-787b-496a-869d-2d9eeec24200",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d42e037b-1d88-4e65-917c-e804bddea9d0",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "5f2380a9-4f1f-42f2-9d55-1ce30c5e9715",
                  "type": "has_only_phrase",
                  "uuid": "f7168a5d-d6cd-4c7b-bf43-9e21716a9a8e"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "de74ce8c-9f52-4cdd-b0f8-bdd500490148",
                  "type": "has_only_phrase",
                  "uuid": "84f0505d-8a16-4e83-8049-de49715f22c2"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "4f4c9557-a8a4-4918-abef-491bc8938b62",
                  "type": "has_only_phrase",
                  "uuid": "066d7df4-f628-46db-aaea-dd84b757c393"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "30887d2d-0a54-45f1-8592-8ae63c8e8805",
                  "name": "All Responses",
                  "uuid": "d42e037b-1d88-4e65-917c-e804bddea9d0"
                },
                {
                  "exit_uuid": "b7b0c0d2-f95b-40e5-89be-437b5ac274b3",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "5f2380a9-4f1f-42f2-9d55-1ce30c5e9715"
                },
                {
                  "exit_uuid": "ba6a24e9-9ba8-4db3-988e-dae9f99452fd",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "de74ce8c-9f52-4cdd-b0f8-bdd500490148"
                },
                {
                  "exit_uuid": "ad63c714-4013-4bdb-b92b-b4cd14d0c501",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "4f4c9557-a8a4-4918-abef-491bc8938b62"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "30887d2d-0a54-45f1-8592-8ae63c8e8805",
                "destination_uuid": null
              },
              {
                "uuid": "b7b0c0d2-f95b-40e5-89be-437b5ac274b3",
                "destination_uuid": "466dfc78-970b-4d80-a9cd-1772ed261219"
              },
              {
                "uuid": "ba6a24e9-9ba8-4db3-988e-dae9f99452fd",
                "destination_uuid": "4f7ab70c-0fbe-4e4e-a11e-76942d9fa3a6"
              },
              {
                "uuid": "ad63c714-4013-4bdb-b92b-b4cd14d0c501",
                "destination_uuid": "39dcb66b-4037-4b19-991f-4153c1a8f094"
              }
            ]
          },
          {
            "uuid": "466dfc78-970b-4d80-a9cd-1772ed261219",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "428465e3-403d-4a37-a729-28f87d1e581d"
              }
            ],
            "exits": [
              {
                "uuid": "1e205bc7-08a6-4304-9637-6a80c39c7714",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "4f7ab70c-0fbe-4e4e-a11e-76942d9fa3a6",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7d955c0c-813a-4d83-81bb-db97f108c858"
              }
            ],
            "exits": [
              {
                "uuid": "52c25752-b04c-414f-9bc0-efca8562a1a9",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "39dcb66b-4037-4b19-991f-4153c1a8f094",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a75f476e-ca8f-4835-b7fc-d2058f5b93a8"
              }
            ],
            "exits": [
              {
                "uuid": "0da942d1-2faa-4a62-8dd0-48e4dc6f6bd9",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "b28cc494-e69f-4a2c-a425-ead6282fac61",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "13061d19-6db2-4b4b-868e-2bf418b5a672"
              }
            ],
            "exits": [
              {
                "uuid": "84c1829c-f68d-4b83-aa4a-29e292b9bd89",
                "destination_uuid": "1cb514be-1097-4918-b738-a09668a56aa4"
              }
            ]
          },
          {
            "uuid": "1cb514be-1097-4918-b738-a09668a56aa4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3017aac8-b0ed-4c4e-a4f1-312047a8db3e",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "8deb0cc4-b2f3-46fc-b0a2-fb5b6d74d807",
                  "type": "has_only_phrase",
                  "uuid": "a80f8a90-a674-4c8d-80be-34d120bd8f24"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "4e80dd54-7356-4e6d-bffe-3d1c209354b3",
                  "type": "has_only_phrase",
                  "uuid": "11aba83b-9c7b-427c-b305-8911939777f6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f599d7cf-8723-4865-b09c-804debbf52d7",
                  "name": "All Responses",
                  "uuid": "3017aac8-b0ed-4c4e-a4f1-312047a8db3e"
                },
                {
                  "exit_uuid": "2fe6d0a0-5024-4edd-8d50-818d654a01c8",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "8deb0cc4-b2f3-46fc-b0a2-fb5b6d74d807"
                },
                {
                  "exit_uuid": "bf824221-67b4-4ea0-8632-5f09e418a182",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "4e80dd54-7356-4e6d-bffe-3d1c209354b3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f599d7cf-8723-4865-b09c-804debbf52d7",
                "destination_uuid": null
              },
              {
                "uuid": "2fe6d0a0-5024-4edd-8d50-818d654a01c8",
                "destination_uuid": "50b63428-f7bf-4998-9398-3d1865a446de"
              },
              {
                "uuid": "bf824221-67b4-4ea0-8632-5f09e418a182",
                "destination_uuid": "aa411ed1-ef17-4584-83c2-884df7d63b5e"
              }
            ]
          },
          {
            "uuid": "50b63428-f7bf-4998-9398-3d1865a446de",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a797ac35-46fb-43be-b65c-42e8ba5e6235"
              }
            ],
            "exits": [
              {
                "uuid": "ee678151-996a-4366-8836-3fbf4daaaa5e",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "aa411ed1-ef17-4584-83c2-884df7d63b5e",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4d67739c-af9f-4926-9bbd-cd30aaa0b795"
              }
            ],
            "exits": [
              {
                "uuid": "8474a399-d09e-43f8-80f0-9ce7dc58d5a9",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "2f9254bb-8fcc-4adc-9a3d-43006e13f162",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "377869d0-bf74-4c61-a5fc-4bfda1b04ff2"
              }
            ],
            "exits": [
              {
                "uuid": "e6187523-7eae-4f1d-b2a7-930377e68ef0",
                "destination_uuid": "e616f034-f0d0-4e23-8f1e-1ef2ec6da05c"
              }
            ]
          },
          {
            "uuid": "e616f034-f0d0-4e23-8f1e-1ef2ec6da05c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "46c4f982-8827-4ceb-b98d-a2e02a4dd821",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "7affc6da-1fb0-4a20-ae4c-71efc8f8a168",
                  "type": "has_only_phrase",
                  "uuid": "ae34b21f-f52a-44f2-9724-b94381da8b73"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "72a03842-911f-4cbf-a2a4-290f6a44b0ac",
                  "type": "has_only_phrase",
                  "uuid": "0f414565-1577-4e82-9171-37efa044ec1f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "42290b92-c337-4306-9053-d8b9b1a7a9ad",
                  "name": "All Responses",
                  "uuid": "46c4f982-8827-4ceb-b98d-a2e02a4dd821"
                },
                {
                  "exit_uuid": "4a84126a-64d5-4b64-ab66-944d0a6ce2ad",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "7affc6da-1fb0-4a20-ae4c-71efc8f8a168"
                },
                {
                  "exit_uuid": "c68a5976-e429-46ce-8613-2bb76d0ede99",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "72a03842-911f-4cbf-a2a4-290f6a44b0ac"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "42290b92-c337-4306-9053-d8b9b1a7a9ad",
                "destination_uuid": null
              },
              {
                "uuid": "4a84126a-64d5-4b64-ab66-944d0a6ce2ad",
                "destination_uuid": "0a19444a-ec82-4fd8-a25c-c58effc27a81"
              },
              {
                "uuid": "c68a5976-e429-46ce-8613-2bb76d0ede99",
                "destination_uuid": "d648cc53-a100-41e8-bd7d-8147785369f6"
              }
            ]
          },
          {
            "uuid": "0a19444a-ec82-4fd8-a25c-c58effc27a81",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bcda8dc7-89ec-4583-9406-ab0037a1434e"
              }
            ],
            "exits": [
              {
                "uuid": "ffb1037c-387c-426f-918c-ae3bfd090f35",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "d648cc53-a100-41e8-bd7d-8147785369f6",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "af091d7e-1d99-4a92-b3b7-f44fd4544339"
              }
            ],
            "exits": [
              {
                "uuid": "99d860f5-b6cb-4609-8f6e-e957a2d6b60f",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "37e16f76-75c4-41ed-8fd2-7b81597c2bb8",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "5a532cee-7348-40b2-bf19-c9fe107e7e7d"
              }
            ],
            "exits": [
              {
                "uuid": "2d5b2dae-1c3d-47a0-a33a-be720489d9fc",
                "destination_uuid": "8cc1bbb9-9de6-4b2b-b52e-4f1030976d13"
              }
            ]
          },
          {
            "uuid": "8cc1bbb9-9de6-4b2b-b52e-4f1030976d13",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fa49e4e3-1c92-417d-99f1-820f276744c8",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "d9ce2f2c-9452-489f-a946-133a0d298c40",
                  "type": "has_only_phrase",
                  "uuid": "6152942e-6832-4e94-ba86-eab9d73ed2b3"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "b6b5e7e8-3e26-455d-aea2-fa4e750c9b03",
                  "type": "has_only_phrase",
                  "uuid": "402d1c67-5ca6-4bce-a780-8ba612fa62c4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cf06af53-7818-4c00-9a80-1b9427d78177",
                  "name": "All Responses",
                  "uuid": "fa49e4e3-1c92-417d-99f1-820f276744c8"
                },
                {
                  "exit_uuid": "b1e825cd-1594-4e68-80fe-66436b13e9bd",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "d9ce2f2c-9452-489f-a946-133a0d298c40"
                },
                {
                  "exit_uuid": "0bd4ea68-cda0-4f91-b4b2-5a9334182242",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "b6b5e7e8-3e26-455d-aea2-fa4e750c9b03"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cf06af53-7818-4c00-9a80-1b9427d78177",
                "destination_uuid": null
              },
              {
                "uuid": "b1e825cd-1594-4e68-80fe-66436b13e9bd",
                "destination_uuid": "e3f1df0e-f606-4544-8b73-ad986297f108"
              },
              {
                "uuid": "0bd4ea68-cda0-4f91-b4b2-5a9334182242",
                "destination_uuid": "779d6e54-af0e-4ee9-a81c-269186a4f1bc"
              }
            ]
          },
          {
            "uuid": "e3f1df0e-f606-4544-8b73-ad986297f108",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c15f1944-57d8-4214-839b-046ec82e74bf"
              }
            ],
            "exits": [
              {
                "uuid": "13b66b03-5b1d-4b7e-95d2-d19626a20a82",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "779d6e54-af0e-4ee9-a81c-269186a4f1bc",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "8629e248-6ef4-4c7e-8149-da940d14eec9"
              }
            ],
            "exits": [
              {
                "uuid": "bd054cdd-1839-4c36-8e3c-4c3858517c6c",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "c05a8c85-1b7a-4407-bf98-6725ff439922",
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
                "uuid": "6b4412e0-632a-4a08-8f88-fc944ba8239d"
              }
            ],
            "exits": [
              {
                "uuid": "11c65fb9-ef23-48bd-b03f-524f154177f1",
                "destination_uuid": "5ae2f927-94a7-4a34-b46c-1e6a9522cc9b"
              }
            ]
          },
          {
            "uuid": "5ae2f927-94a7-4a34-b46c-1e6a9522cc9b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a1864ec2-49c2-42bf-9ea2-99dedcc0aa34",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "aa2dbb19-1b00-4868-be9e-0c648829aeb7",
                  "type": "has_only_phrase",
                  "uuid": "050db1a5-0525-4fc5-912d-01c0bea7ca05"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "08b1b08a-6252-4f1b-9858-ac238e442968",
                  "type": "has_only_phrase",
                  "uuid": "6f209f57-25c0-42d9-b0fa-0ae0594c07dd"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "f106feb1-44e2-4308-885a-fcf53134ecb8",
                  "type": "has_only_phrase",
                  "uuid": "e031799b-4b41-49d5-bab5-aeb0d860277f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6cf9f7f4-1c48-4fc4-8d97-d55ba87feefc",
                  "name": "All Responses",
                  "uuid": "a1864ec2-49c2-42bf-9ea2-99dedcc0aa34"
                },
                {
                  "exit_uuid": "a7fb9bc1-c006-45ef-b1b9-bc787b47982e",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "aa2dbb19-1b00-4868-be9e-0c648829aeb7"
                },
                {
                  "exit_uuid": "9a94f598-029d-402b-b8e7-890656ce1456",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "08b1b08a-6252-4f1b-9858-ac238e442968"
                },
                {
                  "exit_uuid": "e5341d9b-6cc9-49ef-8f45-efe8ecd7ee3c",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "f106feb1-44e2-4308-885a-fcf53134ecb8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6cf9f7f4-1c48-4fc4-8d97-d55ba87feefc",
                "destination_uuid": null
              },
              {
                "uuid": "a7fb9bc1-c006-45ef-b1b9-bc787b47982e",
                "destination_uuid": "0a057e96-5880-4bdd-af74-e64825bce1fd"
              },
              {
                "uuid": "9a94f598-029d-402b-b8e7-890656ce1456",
                "destination_uuid": "5fef7179-a4bd-42ff-926c-eccb48cd8d51"
              },
              {
                "uuid": "e5341d9b-6cc9-49ef-8f45-efe8ecd7ee3c",
                "destination_uuid": "5dbedbba-4de5-4a90-af31-98c677571ff5"
              }
            ]
          },
          {
            "uuid": "0a057e96-5880-4bdd-af74-e64825bce1fd",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "932a67c6-bc11-432d-9d87-2dcb47842ce7"
              }
            ],
            "exits": [
              {
                "uuid": "82038d10-e797-4f4a-bd84-757fc9de6dbc",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "5fef7179-a4bd-42ff-926c-eccb48cd8d51",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "973337cc-d05e-49a8-ae75-e1b584adb9b0"
              }
            ],
            "exits": [
              {
                "uuid": "8b3be53f-d41b-4b9d-bd95-f6abfc7807bb",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "5dbedbba-4de5-4a90-af31-98c677571ff5",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "37b33d1d-5a7a-4840-8b4e-4f21a3b56dca"
              }
            ],
            "exits": [
              {
                "uuid": "76068def-604f-4944-9550-952206b5f9a0",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "f909dcf8-dff4-4b8f-abee-a3014780e985",
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
                "uuid": "4b677652-9b64-46b3-9dd4-56f2145cdef8"
              }
            ],
            "exits": [
              {
                "uuid": "b8503281-cf77-449f-b6c4-e1ab3e22d4bb",
                "destination_uuid": "53b1fa87-e04c-4f10-9061-9e42cd440733"
              }
            ]
          },
          {
            "uuid": "53b1fa87-e04c-4f10-9061-9e42cd440733",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e05aac1d-046f-4d49-b423-925d605e2aea",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "86dc5a40-d6df-421b-b4f5-609fa7ac91bc",
                  "type": "has_only_phrase",
                  "uuid": "880ce9ea-503a-4ab1-8c65-17cbded529d4"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "86eb8766-5d89-4545-bb53-f5a81330ece0",
                  "type": "has_only_phrase",
                  "uuid": "217a9473-d141-40ad-9685-fc1fb79028a3"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "f24369fe-021d-48b5-a541-58cc1069e73e",
                  "type": "has_only_phrase",
                  "uuid": "b249bb3d-bc65-47ee-8201-27af23b3779e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "68fe8708-44a2-4901-8b5d-43886178bdcc",
                  "name": "All Responses",
                  "uuid": "e05aac1d-046f-4d49-b423-925d605e2aea"
                },
                {
                  "exit_uuid": "da700835-32fb-41a1-9e07-e24a9c52bf66",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "86dc5a40-d6df-421b-b4f5-609fa7ac91bc"
                },
                {
                  "exit_uuid": "9550bd2d-ebae-4b41-b661-fa939226fe69",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "86eb8766-5d89-4545-bb53-f5a81330ece0"
                },
                {
                  "exit_uuid": "f1258bad-40f5-41d4-823d-895ad3c3afdb",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "f24369fe-021d-48b5-a541-58cc1069e73e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "68fe8708-44a2-4901-8b5d-43886178bdcc",
                "destination_uuid": null
              },
              {
                "uuid": "da700835-32fb-41a1-9e07-e24a9c52bf66",
                "destination_uuid": "183af37d-011b-4e28-b75d-aab3279e0884"
              },
              {
                "uuid": "9550bd2d-ebae-4b41-b661-fa939226fe69",
                "destination_uuid": "45ff3829-5d8f-4498-9b5c-646848efc833"
              },
              {
                "uuid": "f1258bad-40f5-41d4-823d-895ad3c3afdb",
                "destination_uuid": "742186bc-218b-477d-97a2-265ba6795d83"
              }
            ]
          },
          {
            "uuid": "183af37d-011b-4e28-b75d-aab3279e0884",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2025d67c-b69b-411a-a8db-9ab1629f0641"
              }
            ],
            "exits": [
              {
                "uuid": "2227b308-b6f1-44e5-954c-5a89ad858dfc",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "45ff3829-5d8f-4498-9b5c-646848efc833",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "29b436f8-c665-4a5e-9f40-3a77c4d0ee3b"
              }
            ],
            "exits": [
              {
                "uuid": "d742ceab-233f-49d0-b67e-329ffcee2ed8",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "742186bc-218b-477d-97a2-265ba6795d83",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "84007511-cdbe-4587-aba5-d96965f60e51"
              }
            ],
            "exits": [
              {
                "uuid": "f6b7f528-9894-4ffd-95b2-67bd38770eb4",
                "destination_uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85"
              }
            ]
          },
          {
            "uuid": "f50fc3e3-21a2-4ea7-85b8-00ca37300d85",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "12711f74-9ddd-41c1-888f-21bdd132b84f",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b90feb37-29de-42d0-97de-fe7ace8d46ee",
                  "type": "has_only_phrase",
                  "uuid": "b03cce3e-bbeb-4ad3-bf31-1e859671832e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dc52c250-5ea3-41b8-b8b5-1cd1149e8a75",
                  "name": "All Responses",
                  "uuid": "12711f74-9ddd-41c1-888f-21bdd132b84f"
                },
                {
                  "exit_uuid": "bca7c89f-2e4f-4083-b2a3-5ffaac36c5b3",
                  "name": "Next",
                  "uuid": "b90feb37-29de-42d0-97de-fe7ace8d46ee"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "dc52c250-5ea3-41b8-b8b5-1cd1149e8a75",
                "destination_uuid": null
              },
              {
                "uuid": "bca7c89f-2e4f-4083-b2a3-5ffaac36c5b3",
                "destination_uuid": "424b051a-3922-461f-b43b-397f49a81f3d"
              }
            ]
          },
          {
            "uuid": "424b051a-3922-461f-b43b-397f49a81f3d",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "41fb3f85-2202-44f4-a1fb-81bef677db33"
              }
            ],
            "exits": [
              {
                "uuid": "8e8716d1-a7b7-45de-aada-e80875f4b154",
                "destination_uuid": "76b483b4-5a8b-45da-9bf7-0193386dea6d"
              }
            ]
          },
          {
            "uuid": "76b483b4-5a8b-45da-9bf7-0193386dea6d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6179968f-450e-48a2-ab9b-5e7db4c6e8c4",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "a4b0b80d-dcce-4e35-9157-433678443ce1",
                  "type": "has_only_phrase",
                  "uuid": "83d7263c-1754-48d3-8e14-a000698b9de7"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "59c7926f-2003-40c0-9342-d0e2a4b37fdc",
                  "type": "has_only_phrase",
                  "uuid": "64da5a64-9b5b-4de1-966e-87370982eb6d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "71dfaf07-0062-40d8-a6ff-504877eac297",
                  "name": "All Responses",
                  "uuid": "6179968f-450e-48a2-ab9b-5e7db4c6e8c4"
                },
                {
                  "exit_uuid": "2caff605-fb16-4bf7-91ec-90537c2c0f2a",
                  "name": "No",
                  "uuid": "a4b0b80d-dcce-4e35-9157-433678443ce1"
                },
                {
                  "exit_uuid": "ae530810-b427-4ed4-9cb0-49a108182d3c",
                  "name": "Yes",
                  "uuid": "59c7926f-2003-40c0-9342-d0e2a4b37fdc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "71dfaf07-0062-40d8-a6ff-504877eac297",
                "destination_uuid": null
              },
              {
                "uuid": "2caff605-fb16-4bf7-91ec-90537c2c0f2a",
                "destination_uuid": "6a3a8e78-339a-4a06-b086-00d31dc842fb"
              },
              {
                "uuid": "ae530810-b427-4ed4-9cb0-49a108182d3c",
                "destination_uuid": "07328663-6a80-4d68-be97-3d54d66dd57b"
              }
            ]
          },
          {
            "uuid": "6a3a8e78-339a-4a06-b086-00d31dc842fb",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5b366bb4-f621-4728-bdd2-a22d5d57e8ec"
              }
            ],
            "exits": [
              {
                "uuid": "aeb442ae-1c60-412d-a08a-9cbe3f547ea2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "07328663-6a80-4d68-be97-3d54d66dd57b",
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
                "uuid": "fb5a65d3-cbcb-4088-b47b-d6a121f8fe91"
              }
            ],
            "exits": [
              {
                "uuid": "2aa63c46-829c-4d59-9ad2-19c149ab5098",
                "destination_uuid": "70f10def-b3ef-482e-869b-4afbe62887d1"
              }
            ]
          },
          {
            "uuid": "70f10def-b3ef-482e-869b-4afbe62887d1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9c3eb6b4-e300-4b14-b24f-016d23a390cf",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "cec8ea12-32e7-444e-a9b9-ab828e52721e",
                  "type": "has_only_phrase",
                  "uuid": "2e344831-4aa1-42bb-9788-7d6ae876f30f"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "0f622400-58a6-4569-9f1f-a3e40d50684a",
                  "type": "has_only_phrase",
                  "uuid": "84912500-27b5-46f8-b47d-3ef5a54bc96b"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "872f61c1-9982-4a7f-aea8-8209bd91f8be",
                  "type": "has_only_phrase",
                  "uuid": "bb45d53e-82f4-42b8-b87b-32554214a2ae"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "f5979b1a-5409-41ec-93b7-95da0f3dc56b",
                  "type": "has_only_phrase",
                  "uuid": "16e2a3ed-f676-44ea-b563-b2c7c0e2e894"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "ca67ca28-897a-4f7c-bb35-9fd5559f2601",
                  "type": "has_only_phrase",
                  "uuid": "d16557e5-a5d2-45bf-aea8-c3984505cf7f"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "397ec74d-86b2-48de-8ee6-9f34dd38cbe0",
                  "type": "has_only_phrase",
                  "uuid": "9ebaab74-13f9-466b-8cf1-a86b6d0dae08"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "08007655-140b-42e1-a7c5-c8a69b5225e8",
                  "type": "has_only_phrase",
                  "uuid": "d888c0d0-2912-4c3f-8987-9d9771d8fce7"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "8a3ed831-46ab-4e22-8e83-ec604c6d2af2",
                  "type": "has_only_phrase",
                  "uuid": "e24b945c-535d-4422-9413-9d38d2f0ea6b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e4b414f7-00cb-4596-bdd3-77502c36299f",
                  "name": "All Responses",
                  "uuid": "9c3eb6b4-e300-4b14-b24f-016d23a390cf"
                },
                {
                  "exit_uuid": "9f9006d9-328e-437e-bf1b-82e597c9d39c",
                  "name": "I don’t have enough time",
                  "uuid": "cec8ea12-32e7-444e-a9b9-ab828e52721e"
                },
                {
                  "exit_uuid": "e5c18c05-863a-450c-9360-a132797a20a4",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "0f622400-58a6-4569-9f1f-a3e40d50684a"
                },
                {
                  "exit_uuid": "a043d92b-1f41-423e-b0d4-317ba7a29893",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "872f61c1-9982-4a7f-aea8-8209bd91f8be"
                },
                {
                  "exit_uuid": "a8a13000-0ad4-45aa-b8ea-c473f3207738",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "f5979b1a-5409-41ec-93b7-95da0f3dc56b"
                },
                {
                  "exit_uuid": "92ff0e43-0c6a-4b0c-a712-2c1bd224f49a",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "ca67ca28-897a-4f7c-bb35-9fd5559f2601"
                },
                {
                  "exit_uuid": "480f1e08-9224-4871-aa54-ab2d3dc7f2ea",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "397ec74d-86b2-48de-8ee6-9f34dd38cbe0"
                },
                {
                  "exit_uuid": "83889e69-2d96-4be6-8f2f-4e68c80652c9",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "08007655-140b-42e1-a7c5-c8a69b5225e8"
                },
                {
                  "exit_uuid": "401e569e-3840-4786-a84d-21b1d3f101f7",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "8a3ed831-46ab-4e22-8e83-ec604c6d2af2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e4b414f7-00cb-4596-bdd3-77502c36299f",
                "destination_uuid": null
              },
              {
                "uuid": "9f9006d9-328e-437e-bf1b-82e597c9d39c",
                "destination_uuid": "c30ae018-3943-4b59-b878-c26150a577e0"
              },
              {
                "uuid": "e5c18c05-863a-450c-9360-a132797a20a4",
                "destination_uuid": "2dbef4b2-b3b5-45b9-a5b7-6674d58f2b4c"
              },
              {
                "uuid": "a043d92b-1f41-423e-b0d4-317ba7a29893",
                "destination_uuid": "26f0b631-b2a5-49cc-8453-9c40807e2c8a"
              },
              {
                "uuid": "a8a13000-0ad4-45aa-b8ea-c473f3207738",
                "destination_uuid": "b28cc494-e69f-4a2c-a425-ead6282fac61"
              },
              {
                "uuid": "92ff0e43-0c6a-4b0c-a712-2c1bd224f49a",
                "destination_uuid": "2f9254bb-8fcc-4adc-9a3d-43006e13f162"
              },
              {
                "uuid": "480f1e08-9224-4871-aa54-ab2d3dc7f2ea",
                "destination_uuid": "37e16f76-75c4-41ed-8fd2-7b81597c2bb8"
              },
              {
                "uuid": "83889e69-2d96-4be6-8f2f-4e68c80652c9",
                "destination_uuid": "c05a8c85-1b7a-4407-bf98-6725ff439922"
              },
              {
                "uuid": "401e569e-3840-4786-a84d-21b1d3f101f7",
                "destination_uuid": "f909dcf8-dff4-4b8f-abee-a3014780e985"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6550c9bf-fd0a-4799-88fb-cab5714ac933",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "56307baa-cdc6-4ca0-99f1-45ae8b27a262",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! How is your parenting going today?",
                "type": "send_msg",
                "quick_replies": [
                  "Great",
                  "Neutral",
                  "Bad"
                ],
                "uuid": "33630d2b-c39f-46b2-8157-e1cde54ff43c"
              }
            ],
            "exits": [
              {
                "uuid": "e03d7615-093a-4b3c-bc5a-1b43539ee54e",
                "destination_uuid": "2ffe318d-bfc8-4454-a870-3f2d70a93392"
              }
            ]
          },
          {
            "uuid": "2ffe318d-bfc8-4454-a870-3f2d70a93392",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e3386a76-b7bf-4291-a752-0e63139fd860",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "19e760a0-0550-4f29-ad03-b9cc7b6f87a0",
                  "type": "has_only_phrase",
                  "uuid": "598cb43c-e778-4828-b2fb-623c3be2b91b"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "a79597f6-0fc8-4f69-81a5-a3c2463ce816",
                  "type": "has_only_phrase",
                  "uuid": "ac4e0a9b-1994-46ef-ad47-0b536bb957b0"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "b19c9032-0c10-42d3-a730-795477b6d021",
                  "type": "has_only_phrase",
                  "uuid": "66d47cd0-acb1-4912-8561-8fed3e11a2d8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ff8284a2-e17a-47f0-ba1d-8cf376115077",
                  "name": "All Responses",
                  "uuid": "e3386a76-b7bf-4291-a752-0e63139fd860"
                },
                {
                  "exit_uuid": "b072b2e1-cd71-4c23-b243-fc6e51125399",
                  "name": "Great",
                  "uuid": "19e760a0-0550-4f29-ad03-b9cc7b6f87a0"
                },
                {
                  "exit_uuid": "a97b4785-b151-4c66-8f80-e0a42ebfd2f2",
                  "name": "Neutral",
                  "uuid": "a79597f6-0fc8-4f69-81a5-a3c2463ce816"
                },
                {
                  "exit_uuid": "4548c117-0b49-4734-be63-46729d43e781",
                  "name": "Bad",
                  "uuid": "b19c9032-0c10-42d3-a730-795477b6d021"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ff8284a2-e17a-47f0-ba1d-8cf376115077",
                "destination_uuid": null
              },
              {
                "uuid": "b072b2e1-cd71-4c23-b243-fc6e51125399",
                "destination_uuid": "0b8933d2-dad8-4f43-9a06-a2e6675ff8d9"
              },
              {
                "uuid": "a97b4785-b151-4c66-8f80-e0a42ebfd2f2",
                "destination_uuid": "aaa9393f-22fb-45c7-bcd3-94464233c357"
              },
              {
                "uuid": "4548c117-0b49-4734-be63-46729d43e781",
                "destination_uuid": "44464ebb-e655-4f6f-b1c5-6904610cabd4"
              }
            ]
          },
          {
            "uuid": "0b8933d2-dad8-4f43-9a06-a2e6675ff8d9",
            "actions": [
              {
                "attachments": [],
                "text": "So good to hear that you and your children are in a good space today. What a wonderful feeling!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "fd086fb7-502d-4dee-8d9d-8f0c8467b2de"
              }
            ],
            "exits": [
              {
                "uuid": "1230cde2-fc76-40dc-876e-a2bd1a7a6ee1",
                "destination_uuid": "83e1dbbd-5258-406c-9fbc-4859015bdc31"
              }
            ]
          },
          {
            "uuid": "aaa9393f-22fb-45c7-bcd3-94464233c357",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes things go great. Sometimes they don’t. And sometimes we don't quite know what to think...and that's totally okay! Remember that you are not alone.",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "56282824-97d4-4570-b7e9-a49a079d9021"
              }
            ],
            "exits": [
              {
                "uuid": "03c4f4bc-a291-41d0-8f10-283d7a85694c",
                "destination_uuid": "83e1dbbd-5258-406c-9fbc-4859015bdc31"
              }
            ]
          },
          {
            "uuid": "44464ebb-e655-4f6f-b1c5-6904610cabd4",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that things are difficult with your children now. It is completely normal to struggle sometimes. Remember that you are not alone!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "3de74542-2a6d-4292-a9e4-ddf716b67ad8"
              }
            ],
            "exits": [
              {
                "uuid": "40794917-1c42-4344-af01-3fbda3c62920",
                "destination_uuid": "0a041fca-3f70-4188-9060-6409406d9102"
              }
            ]
          },
          {
            "uuid": "83e1dbbd-5258-406c-9fbc-4859015bdc31",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2cb47d52-f96f-49a6-9d19-42f3e527e162",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "b9954859-f22b-422d-9d2c-6f602f5e2d86",
                  "type": "has_only_phrase",
                  "uuid": "1acc4fd7-e34b-4b80-a26c-215b5a72ac11"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "70c265e8-4ce1-45f5-ba09-ca1771e5672d",
                  "type": "has_only_phrase",
                  "uuid": "c70585a4-e951-4d9f-b440-8134cb0e45fd"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0dcb5dca-4d14-4671-a144-fe87d9be7e45",
                  "name": "All Responses",
                  "uuid": "2cb47d52-f96f-49a6-9d19-42f3e527e162"
                },
                {
                  "exit_uuid": "c099de01-d62c-4ade-844b-cabbc67927f0",
                  "name": "More tips",
                  "uuid": "b9954859-f22b-422d-9d2c-6f602f5e2d86"
                },
                {
                  "exit_uuid": "2e10d018-c715-4f53-90de-b447148cc71c",
                  "name": "Activity to help you relax",
                  "uuid": "70c265e8-4ce1-45f5-ba09-ca1771e5672d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0dcb5dca-4d14-4671-a144-fe87d9be7e45",
                "destination_uuid": null
              },
              {
                "uuid": "c099de01-d62c-4ade-844b-cabbc67927f0",
                "destination_uuid": "4484cea0-ff57-44b6-a9d8-2db2f2535ab4"
              },
              {
                "uuid": "2e10d018-c715-4f53-90de-b447148cc71c",
                "destination_uuid": "793dd59c-3dd0-43da-8584-c445b74477f8"
              }
            ]
          },
          {
            "uuid": "4484cea0-ff57-44b6-a9d8-2db2f2535ab4",
            "actions": [
              {
                "uuid": "8800b561-1b89-4cd7-85c9-fe8b53512e3f",
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
                "uuid": "7522e90b-6c17-4389-9298-1e32b220c22d",
                "destination_uuid": "415aef92-b2dc-4d3f-a1d8-687650f02efb"
              }
            ]
          },
          {
            "uuid": "415aef92-b2dc-4d3f-a1d8-687650f02efb",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "5a807e7d-d372-4d46-ad74-b1add77564fe"
                },
                "type": "enter_flow",
                "uuid": "1623c4fb-2dcb-4865-bae4-692fd3f3db34"
              }
            ],
            "exits": [
              {
                "uuid": "4761c018-18de-4bdc-b936-b26cfe530e20",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "0a041fca-3f70-4188-9060-6409406d9102",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7570e74e-5328-4f13-985b-50acacf9d087",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "f4f015b4-ee53-4bc6-8a0c-f1f33e8bab61",
                  "type": "has_only_phrase",
                  "uuid": "2b2ef949-3b70-47a2-a517-f4ba3f4c8fa7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a9a61b39-8b3e-47b7-91cf-73bda775354c",
                  "name": "All Responses",
                  "uuid": "7570e74e-5328-4f13-985b-50acacf9d087"
                },
                {
                  "exit_uuid": "6526d021-e455-479d-81ab-50ecf20ebdce",
                  "name": "Activity to help you relax",
                  "uuid": "f4f015b4-ee53-4bc6-8a0c-f1f33e8bab61"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a9a61b39-8b3e-47b7-91cf-73bda775354c",
                "destination_uuid": null
              },
              {
                "uuid": "6526d021-e455-479d-81ab-50ecf20ebdce",
                "destination_uuid": "793dd59c-3dd0-43da-8584-c445b74477f8"
              }
            ]
          },
          {
            "uuid": "793dd59c-3dd0-43da-8584-c445b74477f8",
            "actions": [
              {
                "uuid": "cba91194-f556-49fc-ae2e-8ea74881a9ef",
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
                "uuid": "c56eedd9-3692-4776-a808-9139ed34644c",
                "destination_uuid": "aee446f2-7a52-41c4-90a4-ee6227a0d767"
              }
            ]
          },
          {
            "uuid": "aee446f2-7a52-41c4-90a4-ee6227a0d767",
            "actions": [
              {
                "flow": {
                  "name": "calm_2",
                  "uuid": "72813e51-f6d3-480d-886f-aa7dc16d6467"
                },
                "type": "enter_flow",
                "uuid": "48ad2ab3-410d-4bec-9193-b5d926fc44f1"
              }
            ],
            "exits": [
              {
                "uuid": "a33dc04f-6bbd-4a5e-85a9-a6a03405bd3a",
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
        "uuid": "3eaeb57c-dde3-4ec8-a548-58d115129283",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "93a0d3ea-1998-4028-a729-a6343c7789f9",
            "actions": [
              {
                "attachments": [],
                "text": "Hi awesome parent! Here is something fun you can do with your teen:",
                "type": "send_msg",
                "quick_replies": [
                  "Get active",
                  "Chat together",
                  "Pop stars"
                ],
                "uuid": "9251ec3b-d54a-4b43-87b5-11ee194f6989"
              }
            ],
            "exits": [
              {
                "uuid": "cd079859-7ac5-4376-b235-7baa082e04f6",
                "destination_uuid": "b111a873-86f5-4853-adc2-b3069d9fea89"
              }
            ]
          },
          {
            "uuid": "b111a873-86f5-4853-adc2-b3069d9fea89",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "572b9464-1765-4408-a5c9-dd6f2508455a",
              "cases": [
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "393cec56-be8f-4e92-bd6a-25aee8c22914",
                  "type": "has_only_phrase",
                  "uuid": "d29f0d7d-0a3b-4676-88a5-39ce34cfdb76"
                },
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "5bd15074-0d5e-4063-81d4-d0d62bc51650",
                  "type": "has_only_phrase",
                  "uuid": "48fc9fa8-b4be-475d-8ac2-5aa298b52293"
                },
                {
                  "arguments": [
                    "Pop stars"
                  ],
                  "category_uuid": "7b9c8c34-1d0e-497e-ba89-3f34a54c91f8",
                  "type": "has_only_phrase",
                  "uuid": "7d82dbd9-3005-4dad-86a3-bc9c89e4e52f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7363c925-083a-4c89-b73c-82856754e72d",
                  "name": "All Responses",
                  "uuid": "572b9464-1765-4408-a5c9-dd6f2508455a"
                },
                {
                  "exit_uuid": "b1294d86-bb2c-4324-b8ec-ad53b2ae3997",
                  "name": "Get active",
                  "uuid": "393cec56-be8f-4e92-bd6a-25aee8c22914"
                },
                {
                  "exit_uuid": "604a5dc3-e701-47f3-a606-8a8f70dad11b",
                  "name": "Chat together",
                  "uuid": "5bd15074-0d5e-4063-81d4-d0d62bc51650"
                },
                {
                  "exit_uuid": "66689054-6d15-4017-b860-89cc8a5ee607",
                  "name": "Pop stars",
                  "uuid": "7b9c8c34-1d0e-497e-ba89-3f34a54c91f8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7363c925-083a-4c89-b73c-82856754e72d",
                "destination_uuid": null
              },
              {
                "uuid": "b1294d86-bb2c-4324-b8ec-ad53b2ae3997",
                "destination_uuid": "8652f814-9e19-4039-b886-92fddbe6ca6b"
              },
              {
                "uuid": "604a5dc3-e701-47f3-a606-8a8f70dad11b",
                "destination_uuid": "22f11032-1bce-43bc-bf96-14bdbd417974"
              },
              {
                "uuid": "66689054-6d15-4017-b860-89cc8a5ee607",
                "destination_uuid": "a9a4ccaf-dd6a-4064-85f1-fb2396f44b3d"
              }
            ]
          },
          {
            "uuid": "8652f814-9e19-4039-b886-92fddbe6ca6b",
            "actions": [
              {
                "attachments": [],
                "text": "Co-chef\n- Ask your teen what kind of meal they would like to eat. \n- Prepare it together! \n- Let them have a turn at being the head chef – they lead and you follow their instructions \n- You can even help them make a budget for ingredients!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cb19bcb6-6d73-4e08-908e-3d3c21408b75"
              }
            ],
            "exits": [
              {
                "uuid": "d3f52bb7-f463-4b7c-a32b-b21a522e0f0e",
                "destination_uuid": "940ed596-a786-4dd1-9310-ea85c9539d50"
              }
            ]
          },
          {
            "uuid": "22f11032-1bce-43bc-bf96-14bdbd417974",
            "actions": [
              {
                "attachments": [],
                "text": "Just a friendly chat \n- Have a conversation with your teen about something they like \n- It can be about anything they choose to talk about: sports, friends, music, celebrities… \n- Try to listen to your teen and give them space to talk ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0af44653-9a51-424f-b02a-f6a727dba6ae"
              }
            ],
            "exits": [
              {
                "uuid": "2f71b06c-76e6-489f-9049-c7cc7f4c7c96",
                "destination_uuid": "940ed596-a786-4dd1-9310-ea85c9539d50"
              }
            ]
          },
          {
            "uuid": "a9a4ccaf-dd6a-4064-85f1-fb2396f44b3d",
            "actions": [
              {
                "attachments": [],
                "text": "- Ask your teen to choose their favourite song \n- Try to sing it together – do your best pop star impression!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3334b9e9-3688-4858-acf3-c1dfd37b1bcb"
              }
            ],
            "exits": [
              {
                "uuid": "ef117197-4bd2-4da5-9bae-fb4fe4ff46ec",
                "destination_uuid": "940ed596-a786-4dd1-9310-ea85c9539d50"
              }
            ]
          },
          {
            "uuid": "940ed596-a786-4dd1-9310-ea85c9539d50",
            "actions": [
              {
                "attachments": [],
                "text": "Every time you do one-on-one time mark your STAR to track your success",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e67507bd-0bd1-4b42-add4-a1fb970dabde"
              }
            ],
            "exits": [
              {
                "uuid": "a33e7d6e-3888-4bd8-92fc-67d69d3c20c8",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "0015c82e-f38f-4bb8-91a8-4cd9ec34cef3",
            "actions": [
              {
                "uuid": "56b2c0db-891f-4c82-a599-a0177561d7b9",
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
                "uuid": "70a6905c-fed1-454f-a5d3-345dc7842619",
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
        "uuid": "69135473-20ec-4c6f-a641-b226c6a5b35e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "aeb0a5a7-24be-442c-a9b2-843810892e45",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8893948d-da68-44d4-8feb-d344521d0852"
              }
            ],
            "exits": [
              {
                "uuid": "e0d93fc8-46d1-4a31-864a-fd5732212967",
                "destination_uuid": "d4017c8a-8e9f-4812-89c6-1ed1d962b0f1"
              }
            ]
          },
          {
            "uuid": "d4017c8a-8e9f-4812-89c6-1ed1d962b0f1",
            "actions": [
              {
                "attachments": [],
                "text": "How does it make you feel when I say that?   https://plh-demo1.idems.international/chat/msg-info?character=guide&choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "slight smile",
                  "moderate smile",
                  "big smile"
                ],
                "uuid": "4026cd25-200d-491f-81e0-ff73ae781caa"
              }
            ],
            "exits": [
              {
                "uuid": "33dbad04-0eca-43da-afa5-47b72347373f",
                "destination_uuid": "c212ee3a-c4d1-41af-bf11-6e17f6331dc9"
              }
            ]
          },
          {
            "uuid": "c212ee3a-c4d1-41af-bf11-6e17f6331dc9",
            "actions": [],
            "exits": [
              {
                "uuid": "abc7d10c-a658-4c18-99b5-8221c402e6a5",
                "destination_uuid": "1894bd80-7a96-48c6-bbde-f4bfbf69f776"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d6ef4c80-5ff3-4506-99ee-5123bc262728",
              "cases": [],
              "categories": [
                {
                  "uuid": "d6ef4c80-5ff3-4506-99ee-5123bc262728",
                  "name": "All Responses",
                  "exit_uuid": "abc7d10c-a658-4c18-99b5-8221c402e6a5"
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
            "uuid": "1894bd80-7a96-48c6-bbde-f4bfbf69f776",
            "actions": [
              {
                "uuid": "ce885233-7f3d-4d03-858d-1b0b63a99a52",
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
                "uuid": "65771645-2520-412d-bd76-d15512bfd86a",
                "destination_uuid": "65657396-09ff-43d8-a098-e0a466777e9c"
              }
            ]
          },
          {
            "uuid": "65657396-09ff-43d8-a098-e0a466777e9c",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5d9920a9-8dcb-4884-81ed-8e14b685a801"
              }
            ],
            "exits": [
              {
                "uuid": "ff974fb8-64ac-476e-8f20-850e27fa33a9",
                "destination_uuid": "068b3dbb-7613-4ec2-ae32-271d0989d875"
              }
            ]
          },
          {
            "uuid": "068b3dbb-7613-4ec2-ae32-271d0989d875",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5323e321-64f2-4303-a819-3d3814f92d85"
              }
            ],
            "exits": [
              {
                "uuid": "30f4942f-dc43-4b61-82a3-dd2bf7a837b0",
                "destination_uuid": "a486c43d-0d4e-4036-b437-729e15bc96b7"
              }
            ]
          },
          {
            "uuid": "a486c43d-0d4e-4036-b437-729e15bc96b7",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6fbcc639-712c-4c40-bccb-d875cb5964fc"
              }
            ],
            "exits": [
              {
                "uuid": "d9b2dea7-7212-427d-a246-9b7f34746007",
                "destination_uuid": "ec1a33fc-b60d-4b37-89a5-4e93bee482d3"
              }
            ]
          },
          {
            "uuid": "ec1a33fc-b60d-4b37-89a5-4e93bee482d3",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "05692d2a-2bdf-454c-baa9-f7c73aebeaa8"
              }
            ],
            "exits": [
              {
                "uuid": "374f46ca-16f5-46fa-8161-98cdb769947e",
                "destination_uuid": "a0e1760a-41c8-4901-9fcb-3f11073ddea7"
              }
            ]
          },
          {
            "uuid": "a0e1760a-41c8-4901-9fcb-3f11073ddea7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "76351b35-bd4e-4c14-879e-681d4f9486f0",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "f474cdab-a198-4ecd-b6d5-63b44a171bcf",
                  "type": "has_only_phrase",
                  "uuid": "54c960a2-f8e6-4745-a4ba-415763b28f96"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e4e41a73-7429-4e9a-a5b2-eee94725161a",
                  "name": "All Responses",
                  "uuid": "76351b35-bd4e-4c14-879e-681d4f9486f0"
                },
                {
                  "exit_uuid": "7b16ac05-7566-48f5-a5e5-1f23f10fe568",
                  "name": "Let me hear your story",
                  "uuid": "f474cdab-a198-4ecd-b6d5-63b44a171bcf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e4e41a73-7429-4e9a-a5b2-eee94725161a",
                "destination_uuid": null
              },
              {
                "uuid": "7b16ac05-7566-48f5-a5e5-1f23f10fe568",
                "destination_uuid": "97731740-03a0-40af-8d3e-8f1e146de397"
              }
            ]
          },
          {
            "uuid": "97731740-03a0-40af-8d3e-8f1e146de397",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/conversations/mod_praise/praise_is01.svg"
                ],
                "text": "I was busy cooking and my one daughter @fields.neighbour_young_daughter was doing her homework. She was practicing reading her book out loud and her sister @fields.neighbour_teen_daughter was helping her:  https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6c60cc96-33d9-4ae1-8267-abd9af00f8fb"
              }
            ],
            "exits": [
              {
                "uuid": "d1bd94ea-555c-4e01-907c-9248632ec00d",
                "destination_uuid": "7e8c953c-d654-4228-ac40-172e4399a668"
              }
            ]
          },
          {
            "uuid": "7e8c953c-d654-4228-ac40-172e4399a668",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/conversations/mod_praise/praise_is01.svg"
                ],
                "text": "@fields.neighbour_young_daughter(struggling over a difficult word): \"The girl braw – broo – brought the ball to her brother\" https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "5e766deb-ce17-48ed-ae08-0927afd7944a"
              }
            ],
            "exits": [
              {
                "uuid": "97992561-8853-4215-9480-602dacd9b568",
                "destination_uuid": "617a16a4-8264-4c33-92ee-c82ab3042c6a"
              }
            ]
          },
          {
            "uuid": "617a16a4-8264-4c33-92ee-c82ab3042c6a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3ceca385-1a9e-43e3-afbe-021e96f322ee",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "3d5595f7-801d-4b62-b12d-ed867d4c7271",
                  "type": "has_only_phrase",
                  "uuid": "1ce3ba06-3bb0-4e58-bfc3-11305829b60a"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "492b29d4-2459-45cb-84d6-62208759548e",
                  "type": "has_only_phrase",
                  "uuid": "d97dd638-32a2-4b3d-96fb-c28db1c62c2b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4af705ca-4cf8-4af9-9a4d-9e92af09a0c8",
                  "name": "All Responses",
                  "uuid": "3ceca385-1a9e-43e3-afbe-021e96f322ee"
                },
                {
                  "exit_uuid": "348417ef-e5c3-4d69-b2b4-e6d93be5e019",
                  "name": "Previous",
                  "uuid": "3d5595f7-801d-4b62-b12d-ed867d4c7271"
                },
                {
                  "exit_uuid": "64cada6c-d288-449b-8096-54f72448f54d",
                  "name": "Next",
                  "uuid": "492b29d4-2459-45cb-84d6-62208759548e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4af705ca-4cf8-4af9-9a4d-9e92af09a0c8",
                "destination_uuid": null
              },
              {
                "uuid": "348417ef-e5c3-4d69-b2b4-e6d93be5e019",
                "destination_uuid": "97731740-03a0-40af-8d3e-8f1e146de397"
              },
              {
                "uuid": "64cada6c-d288-449b-8096-54f72448f54d",
                "destination_uuid": "cca70e18-d552-4d80-a383-c8e76618473e"
              }
            ]
          },
          {
            "uuid": "cca70e18-d552-4d80-a383-c8e76618473e",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/conversations/mod_praise/praise_is02.svg"
                ],
                "text": "@fields.neighbour_teen_daughter: \"@fields.neighbour_young_daughter! Well done! You read well! Keep reading! The more you practice the better you will get.\" https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "11b107e0-57de-4af5-9024-7304cae7a1d6"
              }
            ],
            "exits": [
              {
                "uuid": "7dd82e11-9eb9-4a46-8252-f78908171f5e",
                "destination_uuid": "56e94a9d-15eb-49de-9aaf-1ac51e58da09"
              }
            ]
          },
          {
            "uuid": "56e94a9d-15eb-49de-9aaf-1ac51e58da09",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d5ca7645-b7c8-493e-92a5-413d14483daf",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "4ae537c9-1110-4101-8c12-d1b96471c69b",
                  "type": "has_only_phrase",
                  "uuid": "4e8c5ec2-1faf-40da-9e3b-00c719252c3d"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "56782ee7-2aad-4289-8ff7-375e2a6bc3e8",
                  "type": "has_only_phrase",
                  "uuid": "9a6bff50-af8b-4787-a1e1-4f3799baf40a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6b60f075-fc29-4d3b-ba89-6683a0ba7dfd",
                  "name": "All Responses",
                  "uuid": "d5ca7645-b7c8-493e-92a5-413d14483daf"
                },
                {
                  "exit_uuid": "9e094a3a-4871-40bf-9be5-68a7dc20bef7",
                  "name": "Previous",
                  "uuid": "4ae537c9-1110-4101-8c12-d1b96471c69b"
                },
                {
                  "exit_uuid": "d3642b07-02c4-44e0-bf25-ac9b4f697cd2",
                  "name": "Next",
                  "uuid": "56782ee7-2aad-4289-8ff7-375e2a6bc3e8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6b60f075-fc29-4d3b-ba89-6683a0ba7dfd",
                "destination_uuid": null
              },
              {
                "uuid": "9e094a3a-4871-40bf-9be5-68a7dc20bef7",
                "destination_uuid": "7e8c953c-d654-4228-ac40-172e4399a668"
              },
              {
                "uuid": "d3642b07-02c4-44e0-bf25-ac9b4f697cd2",
                "destination_uuid": "41313c36-0415-401d-88df-78cebbd6f038"
              }
            ]
          },
          {
            "uuid": "41313c36-0415-401d-88df-78cebbd6f038",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/conversations/mod_praise/praise_is03.svg"
                ],
                "text": "@fields.neighbour: \"I am very proud of my two daughters. @fields.neighbour_young_daughter , you are working so hard, I know reading is not easy. And thank you very much @fields.neighbour_teen_daughter for helping your sister so I can cook. You are a big help to me.\" https://plh-demo1.idems.international/chat/msg-info?isStory=true",
                "type": "send_msg",
                "quick_replies": [
                  "Next",
                  "Previous"
                ],
                "uuid": "aed7d3f9-4feb-4bc8-8cb0-e0d9765f0534"
              }
            ],
            "exits": [
              {
                "uuid": "f563e6c1-c40b-4635-a1ba-6cab8f2ae6a7",
                "destination_uuid": "e2e969c7-89cd-4e1a-808e-730aa85a8823"
              }
            ]
          },
          {
            "uuid": "e2e969c7-89cd-4e1a-808e-730aa85a8823",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d7771ec7-e99c-4933-a765-92eb5f53667d",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "c830b925-0a2a-4794-bcba-38acf19de594",
                  "type": "has_only_phrase",
                  "uuid": "b61b4e9b-c343-459f-8083-a924d09d4505"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "a8917998-d25b-40f3-ac96-2c77b8149891",
                  "type": "has_only_phrase",
                  "uuid": "74fc7be5-4cf4-4ca2-ad1f-b3fe7f9b8368"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2be9890e-f4fd-44dd-98ae-7b13a412b6b6",
                  "name": "All Responses",
                  "uuid": "d7771ec7-e99c-4933-a765-92eb5f53667d"
                },
                {
                  "exit_uuid": "0f92f3a7-cd97-4bb3-b488-1f302bd49a6b",
                  "name": "Previous",
                  "uuid": "c830b925-0a2a-4794-bcba-38acf19de594"
                },
                {
                  "exit_uuid": "dc6b7b7d-cb88-4644-bc1b-b790fdfb69a2",
                  "name": "Next",
                  "uuid": "a8917998-d25b-40f3-ac96-2c77b8149891"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2be9890e-f4fd-44dd-98ae-7b13a412b6b6",
                "destination_uuid": null
              },
              {
                "uuid": "0f92f3a7-cd97-4bb3-b488-1f302bd49a6b",
                "destination_uuid": "cca70e18-d552-4d80-a383-c8e76618473e"
              },
              {
                "uuid": "dc6b7b7d-cb88-4644-bc1b-b790fdfb69a2",
                "destination_uuid": "4b641e2a-0d43-482b-ad17-54e26bffd174"
              }
            ]
          },
          {
            "uuid": "4b641e2a-0d43-482b-ad17-54e26bffd174",
            "actions": [
              {
                "attachments": [],
                "text": "That's great right? How do you think what I said  made both my daughters feel?  https://plh-demo1.idems.international/chat/msg-info?character=neighbour&choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "slight smile",
                  "moderate smile",
                  "big smile"
                ],
                "uuid": "2aa57865-02ac-46c5-8d3a-8443866681c0"
              }
            ],
            "exits": [
              {
                "uuid": "144c7367-99d3-4165-bf1b-9e9edba5be2c",
                "destination_uuid": "8b89a6e3-ce3e-4af7-9f96-ff56c67b1dec"
              }
            ]
          },
          {
            "uuid": "8b89a6e3-ce3e-4af7-9f96-ff56c67b1dec",
            "actions": [],
            "exits": [
              {
                "uuid": "6668ddb5-0729-4eea-a72f-cdb6f4ab8cbc",
                "destination_uuid": "3e3ef562-64a0-48de-851c-8fee2961f9cf"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "55e2428e-dd13-4d50-94e4-ca296aacbe66",
              "cases": [],
              "categories": [
                {
                  "uuid": "55e2428e-dd13-4d50-94e4-ca296aacbe66",
                  "name": "All Responses",
                  "exit_uuid": "6668ddb5-0729-4eea-a72f-cdb6f4ab8cbc"
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
            "uuid": "3e3ef562-64a0-48de-851c-8fee2961f9cf",
            "actions": [
              {
                "uuid": "0d2b66e6-5fa6-4767-ac3f-901e6a3aadf0",
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
                "uuid": "eb3ca4c5-e043-4726-b0f6-341568c1747d",
                "destination_uuid": "1086c566-fccc-4dcf-b81e-9ad850a2824c"
              }
            ]
          },
          {
            "uuid": "1086c566-fccc-4dcf-b81e-9ad850a2824c",
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
                "uuid": "2d32a49a-63cc-4c50-ad18-f457f3b3ae24"
              }
            ],
            "exits": [
              {
                "uuid": "dffcea6d-a4f2-454d-a52c-1ca1f59cea8d",
                "destination_uuid": "933c11b7-6623-4d7d-98c6-8ac6f10de7ed"
              }
            ]
          },
          {
            "uuid": "933c11b7-6623-4d7d-98c6-8ac6f10de7ed",
            "actions": [],
            "exits": [
              {
                "uuid": "cfda1e2c-c3c3-45ff-8605-3ecb30b24e76",
                "destination_uuid": "c827b1ee-b2c1-46c4-98c4-302404b93555"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fe7b7e3f-628e-4e39-967d-84e8fb5bfff2",
              "cases": [],
              "categories": [
                {
                  "uuid": "fe7b7e3f-628e-4e39-967d-84e8fb5bfff2",
                  "name": "All Responses",
                  "exit_uuid": "cfda1e2c-c3c3-45ff-8605-3ecb30b24e76"
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
            "uuid": "c827b1ee-b2c1-46c4-98c4-302404b93555",
            "actions": [
              {
                "uuid": "76be1563-8be5-4641-aaae-8e097272f107",
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
                "uuid": "27d757f3-42a5-4d42-b576-1e85fe1fa786",
                "destination_uuid": "8e0360cf-b0e0-4e21-9683-93701c11166f"
              }
            ]
          },
          {
            "uuid": "8e0360cf-b0e0-4e21-9683-93701c11166f",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6a381975-72b6-4525-bd0a-3e1718b2f343"
              }
            ],
            "exits": [
              {
                "uuid": "c1194da6-8b19-43f3-8b16-90be16b58566",
                "destination_uuid": "7b6f347a-41f0-4537-a310-232084400c9e"
              }
            ]
          },
          {
            "uuid": "7b6f347a-41f0-4537-a310-232084400c9e",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "fb12e69d-6c65-4852-8aed-d120158e4903"
              }
            ],
            "exits": [
              {
                "uuid": "d78f8c85-d4eb-46d1-bfdf-39aa4f167382",
                "destination_uuid": "6ce06f48-c53d-4959-ad00-ac5036e181d8"
              }
            ]
          },
          {
            "uuid": "6ce06f48-c53d-4959-ad00-ac5036e181d8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6e1af675-b2c1-4f18-a0de-0970ea0db74c",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "8d77eaf6-680f-4b95-bbc2-2db610c2a039",
                  "type": "has_only_phrase",
                  "uuid": "9abc6406-12fb-4522-8cc0-d40cf5f90166"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "975f3c9f-bce2-49a3-9771-cf76df7819c1",
                  "type": "has_only_phrase",
                  "uuid": "d7afad2b-40a0-49ed-820f-3e4ab570d95b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e4c15880-e723-4a90-b4db-2718b9666a7c",
                  "name": "All Responses",
                  "uuid": "6e1af675-b2c1-4f18-a0de-0970ea0db74c"
                },
                {
                  "exit_uuid": "94613cfc-ca99-44e7-ac34-92deb35493d8",
                  "name": "Take me to Tips",
                  "uuid": "8d77eaf6-680f-4b95-bbc2-2db610c2a039"
                },
                {
                  "exit_uuid": "6b780757-4929-4219-9c79-d460da1c9615",
                  "name": "Take me to Homescreen",
                  "uuid": "975f3c9f-bce2-49a3-9771-cf76df7819c1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e4c15880-e723-4a90-b4db-2718b9666a7c",
                "destination_uuid": null
              },
              {
                "uuid": "94613cfc-ca99-44e7-ac34-92deb35493d8",
                "destination_uuid": "61e1b3da-c9dc-424c-b27e-b93844c81f4a"
              },
              {
                "uuid": "6b780757-4929-4219-9c79-d460da1c9615",
                "destination_uuid": "6c944f12-a38f-4ce4-9ef4-a9ff26e1a236"
              }
            ]
          },
          {
            "uuid": "61e1b3da-c9dc-424c-b27e-b93844c81f4a",
            "actions": [
              {
                "uuid": "59e0cd0f-f457-4f16-a59a-ed9e780ac704",
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
                "uuid": "6bc3476c-d6e0-4af8-ab1f-1cb822e10a2c",
                "destination_uuid": "862cb370-c82f-4bb3-9674-149f3664142b"
              }
            ]
          },
          {
            "uuid": "862cb370-c82f-4bb3-9674-149f3664142b",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "774f6b38-a511-4cd0-b5f9-30b032c8d700"
                },
                "type": "enter_flow",
                "uuid": "177ad727-efbb-4c96-b318-839d4ba4fcd3"
              }
            ],
            "exits": [
              {
                "uuid": "ea466540-3a4a-445f-8a8a-375266b916e7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "6c944f12-a38f-4ce4-9ef4-a9ff26e1a236",
            "actions": [
              {
                "uuid": "c13d5e41-8b07-41fa-a51a-85975919989a",
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
                "uuid": "af38f7e2-7fe4-4817-b760-81e06192a1c7",
                "destination_uuid": "5bc425be-8b87-4f31-9e34-bf53d65efe65"
              }
            ]
          },
          {
            "uuid": "5bc425be-8b87-4f31-9e34-bf53d65efe65",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "548d1842-0b9e-460d-85a0-758a23f53c3b"
                },
                "type": "enter_flow",
                "uuid": "1a8729eb-7ccd-4025-b540-71f17c350d43"
              }
            ],
            "exits": [
              {
                "uuid": "f03bf673-0e7b-418b-bde4-186213061a80",
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
        "uuid": "1f58b352-4649-443f-baea-42673e069675",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7b23ee85-389c-4df4-932f-7e1b61a4a914",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "30d447b6-f913-459e-bd7d-184fe82a93bf"
              }
            ],
            "exits": [
              {
                "uuid": "bdfab51c-8cad-4cc0-bca3-3f23f65beab7",
                "destination_uuid": "86ffa091-3bd7-4732-938d-12fca78f68b4"
              }
            ]
          },
          {
            "uuid": "86ffa091-3bd7-4732-938d-12fca78f68b4",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "9600d5ce-bf19-4008-8060-f14b9363cfa9"
              }
            ],
            "exits": [
              {
                "uuid": "767cc4d1-fc7d-492f-acc5-b18a59b7ebe6",
                "destination_uuid": "d0e16528-1e12-47d1-940f-adc030e2306e"
              }
            ]
          },
          {
            "uuid": "d0e16528-1e12-47d1-940f-adc030e2306e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f71b529c-a961-44a6-bf6a-833d53c91b12",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "0d05dfb9-0d19-4c4d-9c82-93805b6b46da",
                  "type": "has_only_phrase",
                  "uuid": "db960c8c-d7b7-48b0-aa5e-a1df4471313b"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "f53eec7a-acd4-4527-af2b-8a50f89e6854",
                  "type": "has_only_phrase",
                  "uuid": "94b81c46-6839-4c6a-9baa-3947affa5632"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "13746bb5-3254-4b83-9148-f00e7b77b36f",
                  "name": "All Responses",
                  "uuid": "f71b529c-a961-44a6-bf6a-833d53c91b12"
                },
                {
                  "exit_uuid": "935f03d5-1fc0-4a20-862d-8ec9a777390f",
                  "name": "Later",
                  "uuid": "0d05dfb9-0d19-4c4d-9c82-93805b6b46da"
                },
                {
                  "exit_uuid": "789fcdd9-88cd-4823-917b-cb4d5bff3ed4",
                  "name": "Yes",
                  "uuid": "f53eec7a-acd4-4527-af2b-8a50f89e6854"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "13746bb5-3254-4b83-9148-f00e7b77b36f",
                "destination_uuid": null
              },
              {
                "uuid": "935f03d5-1fc0-4a20-862d-8ec9a777390f",
                "destination_uuid": "34891947-c204-40cd-a49d-b36e53e853a1"
              },
              {
                "uuid": "789fcdd9-88cd-4823-917b-cb4d5bff3ed4",
                "destination_uuid": "fad72845-0027-44f3-a947-64f3b7c78319"
              }
            ]
          },
          {
            "uuid": "34891947-c204-40cd-a49d-b36e53e853a1",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "1191f89d-1393-4856-a844-9ad4636254fb"
                },
                "type": "enter_flow",
                "uuid": "b90a7cbd-eab8-4591-a4fc-5a753294c479"
              }
            ],
            "exits": [
              {
                "uuid": "4dcc5df7-fc73-4d04-8919-0864cd918b98",
                "destination_uuid": null
              },
              {
                "uuid": "e6f80112-3ee9-40ba-ba29-23753d12c65c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "290b14b9-b4a7-4e2f-b873-d46848058383",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "e1ad66f2-1abd-4c33-ab50-9b4162e81937"
                },
                {
                  "uuid": "216ea43d-5052-483f-8701-59569ba8c8e2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "cf99edc3-a0b5-4593-b77a-04ff0694b6e3"
                }
              ],
              "categories": [
                {
                  "uuid": "e1ad66f2-1abd-4c33-ab50-9b4162e81937",
                  "name": "Complete",
                  "exit_uuid": "4dcc5df7-fc73-4d04-8919-0864cd918b98"
                },
                {
                  "uuid": "cf99edc3-a0b5-4593-b77a-04ff0694b6e3",
                  "name": "Expired",
                  "exit_uuid": "e6f80112-3ee9-40ba-ba29-23753d12c65c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "e1ad66f2-1abd-4c33-ab50-9b4162e81937"
            }
          },
          {
            "uuid": "fad72845-0027-44f3-a947-64f3b7c78319",
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
                "uuid": "b8b89126-4453-45f3-81d8-902a33d20450"
              }
            ],
            "exits": [
              {
                "uuid": "9c67bb27-44c7-44b4-9af6-e429eea333c6",
                "destination_uuid": "f6adcc8f-5523-4dc9-8215-97dad7fa6814"
              }
            ]
          },
          {
            "uuid": "f6adcc8f-5523-4dc9-8215-97dad7fa6814",
            "actions": [],
            "exits": [
              {
                "uuid": "8147bcfa-ed70-4e65-adb6-9bb5a0ab80d7",
                "destination_uuid": "fcf74953-a214-47c1-a043-854f16bd5cb9"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "efcb2b4b-9227-4767-87ad-db43bb4b2944",
              "cases": [],
              "categories": [
                {
                  "uuid": "efcb2b4b-9227-4767-87ad-db43bb4b2944",
                  "name": "All Responses",
                  "exit_uuid": "8147bcfa-ed70-4e65-adb6-9bb5a0ab80d7"
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
            "uuid": "fcf74953-a214-47c1-a043-854f16bd5cb9",
            "actions": [
              {
                "uuid": "9bd4c04e-7f00-4aa5-b86e-38dc2697bf1c",
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
                "uuid": "3252979f-0efc-4821-a771-57f73c108abe",
                "destination_uuid": "6cb209f3-ab6d-4ba2-a837-7602164533d8"
              }
            ]
          },
          {
            "uuid": "6cb209f3-ab6d-4ba2-a837-7602164533d8",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "420704e5-b1b6-49bb-bad7-9b47053378fe"
              }
            ],
            "exits": [
              {
                "uuid": "4ebedd46-6478-4d13-8167-4212bfc870a0",
                "destination_uuid": "bf058c93-3920-464f-adac-854051e09b6a"
              }
            ]
          },
          {
            "uuid": "bf058c93-3920-464f-adac-854051e09b6a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "42c42d3d-9353-4596-bcae-8d48a52d3f5d",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "94671817-42bc-445d-b529-d7652bf23c59",
                  "type": "has_only_phrase",
                  "uuid": "39202f20-7c8e-458e-a29d-47ce616c5e4d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6d226a50-b386-4c23-8d10-c9b58585f623",
                  "name": "All Responses",
                  "uuid": "42c42d3d-9353-4596-bcae-8d48a52d3f5d"
                },
                {
                  "exit_uuid": "4ce10653-1c5d-48fc-b620-8a3ea65c050f",
                  "name": "Click here when done",
                  "uuid": "94671817-42bc-445d-b529-d7652bf23c59"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6d226a50-b386-4c23-8d10-c9b58585f623",
                "destination_uuid": null
              },
              {
                "uuid": "4ce10653-1c5d-48fc-b620-8a3ea65c050f",
                "destination_uuid": "d24a99d5-71ad-49f2-8659-9086b3a66a88"
              }
            ]
          },
          {
            "uuid": "d24a99d5-71ad-49f2-8659-9086b3a66a88",
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
                "uuid": "9d3cb140-41ec-4569-a785-ffbfc41134ca"
              }
            ],
            "exits": [
              {
                "uuid": "ec599ca4-5d6d-459a-9c08-83249ae90ec8",
                "destination_uuid": "4ee04fc4-b22e-417d-835f-7c6d5aef4c99"
              }
            ]
          },
          {
            "uuid": "4ee04fc4-b22e-417d-835f-7c6d5aef4c99",
            "actions": [],
            "exits": [
              {
                "uuid": "a17f6a9d-30d4-4d14-9169-7ff9491bc4ca",
                "destination_uuid": "fd3a56d9-5a0d-4501-a7f3-f62459d443ad"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "04d6e688-cb5c-403e-b7ef-715b3f71290d",
              "cases": [],
              "categories": [
                {
                  "uuid": "04d6e688-cb5c-403e-b7ef-715b3f71290d",
                  "name": "All Responses",
                  "exit_uuid": "a17f6a9d-30d4-4d14-9169-7ff9491bc4ca"
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
            "uuid": "fd3a56d9-5a0d-4501-a7f3-f62459d443ad",
            "actions": [
              {
                "uuid": "4b29cdf4-2bef-4e77-b4ae-15e11429dfcf",
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
                "uuid": "63a71b56-cd32-414a-9f9b-767cf9c11e52",
                "destination_uuid": "53428508-b986-4136-a49c-2c3ab84fcd2a"
              }
            ]
          },
          {
            "uuid": "53428508-b986-4136-a49c-2c3ab84fcd2a",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "e6de5dce-18d8-456f-b5e9-f6047523adde"
              }
            ],
            "exits": [
              {
                "uuid": "bb259c80-4dab-432d-a49e-881948d0745a",
                "destination_uuid": "ff8fd272-1a8e-489a-a743-80fba3835db7"
              }
            ]
          },
          {
            "uuid": "ff8fd272-1a8e-489a-a743-80fba3835db7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "725c9684-dbb7-47e4-9c1d-c011baa461af",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "37c2d543-5afb-43dd-aec9-cd8a2fda1226",
                  "type": "has_only_phrase",
                  "uuid": "8326ea32-f527-42a1-90e4-11af5425de7e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "78c294a6-dc83-40d6-b9ee-31a83c3e6a7e",
                  "name": "All Responses",
                  "uuid": "725c9684-dbb7-47e4-9c1d-c011baa461af"
                },
                {
                  "exit_uuid": "5a3a5e4e-385f-4766-b31a-d1df817d617d",
                  "name": "Click here when done",
                  "uuid": "37c2d543-5afb-43dd-aec9-cd8a2fda1226"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "78c294a6-dc83-40d6-b9ee-31a83c3e6a7e",
                "destination_uuid": null
              },
              {
                "uuid": "5a3a5e4e-385f-4766-b31a-d1df817d617d",
                "destination_uuid": "e218c784-6de6-4250-a1fe-febc3ab87e9b"
              }
            ]
          },
          {
            "uuid": "e218c784-6de6-4250-a1fe-febc3ab87e9b",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "58706a77-3f0d-43b1-b332-52fb49776f7e"
              }
            ],
            "exits": [
              {
                "uuid": "0dda10d4-0685-432d-bad5-1b313ca1e29a",
                "destination_uuid": "c24d22e1-7229-4ca9-87ed-756803c447ff"
              }
            ]
          },
          {
            "uuid": "c24d22e1-7229-4ca9-87ed-756803c447ff",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "270c42e5-fdcb-4071-a8b0-8f57085f8f3e"
              }
            ],
            "exits": [
              {
                "uuid": "1c9d4e0f-4d8b-442b-8fcf-4beb987e1cff",
                "destination_uuid": "cefdc661-14c2-42fe-b94f-785640a8e446"
              }
            ]
          },
          {
            "uuid": "cefdc661-14c2-42fe-b94f-785640a8e446",
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
                "uuid": "bbc5398c-998b-411e-a37c-ee8e6fb36cd7"
              }
            ],
            "exits": [
              {
                "uuid": "f3b21e86-02c2-441f-b22f-6c6c3959be9a",
                "destination_uuid": "d6e93172-1974-4a88-8c84-b61de8020ce5"
              }
            ]
          },
          {
            "uuid": "d6e93172-1974-4a88-8c84-b61de8020ce5",
            "actions": [],
            "exits": [
              {
                "uuid": "4ac5e942-056b-4d71-a516-1d167df824a5",
                "destination_uuid": "c983ab8f-8668-4060-ad43-083f71880bfe"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "07834faa-cc86-4d7d-8e1f-2a49d3722a30",
              "cases": [],
              "categories": [
                {
                  "uuid": "07834faa-cc86-4d7d-8e1f-2a49d3722a30",
                  "name": "All Responses",
                  "exit_uuid": "4ac5e942-056b-4d71-a516-1d167df824a5"
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
            "uuid": "c983ab8f-8668-4060-ad43-083f71880bfe",
            "actions": [
              {
                "uuid": "f707ded3-0d24-4eb2-9aad-8b3be4e761f8",
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
                "uuid": "e7a7e76d-62a2-4869-8a4f-ac78601d4ad6",
                "destination_uuid": "eee5301c-0a8d-435f-894d-6b2a3dfa309f"
              }
            ]
          },
          {
            "uuid": "eee5301c-0a8d-435f-894d-6b2a3dfa309f",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/plh_assets/plh_images/stickers/sticker01.jpg"
                ],
                "text": "Try to say it out loud: \"Well done for @fields.self_praise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "1b1d64d7-1d1f-4590-9063-a1f8b73a0ea4"
              }
            ],
            "exits": [
              {
                "uuid": "c68332ce-3ee5-422d-8862-b9d1b2c3d54d",
                "destination_uuid": "817984c5-d75e-4992-be0b-44c9aad1a6fa"
              }
            ]
          },
          {
            "uuid": "817984c5-d75e-4992-be0b-44c9aad1a6fa",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e81ba2fe-08c8-413f-b337-3440e326a376",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "885e898f-2bb7-4e7f-8c76-e948b7cdc41d",
                  "type": "has_only_phrase",
                  "uuid": "b173a814-f336-498f-8627-6c01b1576ee9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1fbb695b-1ed4-4ee5-b762-18e32a951ee9",
                  "name": "All Responses",
                  "uuid": "e81ba2fe-08c8-413f-b337-3440e326a376"
                },
                {
                  "exit_uuid": "c6497df6-2df0-4d59-99a1-bde08e0fdb21",
                  "name": "Take me to Homescreen",
                  "uuid": "885e898f-2bb7-4e7f-8c76-e948b7cdc41d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1fbb695b-1ed4-4ee5-b762-18e32a951ee9",
                "destination_uuid": null
              },
              {
                "uuid": "c6497df6-2df0-4d59-99a1-bde08e0fdb21",
                "destination_uuid": "56a30feb-656a-468e-bb28-d1d1b455cebe"
              }
            ]
          },
          {
            "uuid": "56a30feb-656a-468e-bb28-d1d1b455cebe",
            "actions": [
              {
                "uuid": "3c9a3b9f-63ef-4b42-912f-ee9581ea2481",
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
                "uuid": "c5b8ca71-fd97-4b3f-9d20-2dd0848431f1",
                "destination_uuid": "ed0e4642-84dd-48da-9871-e537518818e8"
              }
            ]
          },
          {
            "uuid": "ed0e4642-84dd-48da-9871-e537518818e8",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "d568ac09-faec-4b14-99f2-6b31ff88fd83"
                },
                "type": "enter_flow",
                "uuid": "9140cb0b-1697-4e06-80d6-a4c99552ccb5"
              }
            ],
            "exits": [
              {
                "uuid": "8ad2c1f7-7a12-4844-930b-067d914c613d",
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
        "uuid": "4c98dc2d-700f-43ad-a303-55a9a03892c0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9f8c5fda-bf30-4da8-828c-463be596f3f6",
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
                "uuid": "60cbb77f-8c81-4a96-a08f-caa86847da73"
              }
            ],
            "exits": [
              {
                "uuid": "b4d717a3-226c-4cb7-8758-d1bf638700e7",
                "destination_uuid": "9e8b5c0b-f7ec-4260-9d60-d8f68134858b"
              }
            ]
          },
          {
            "uuid": "9e8b5c0b-f7ec-4260-9d60-d8f68134858b",
            "actions": [],
            "exits": [
              {
                "uuid": "a6036b75-8bfa-4474-bd2c-26fc010467f4",
                "destination_uuid": "ac3fc913-ba3d-4e13-9d3b-0aa761f917f3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a0c77b55-03f2-40a6-b7e5-2d4d46022566",
              "cases": [],
              "categories": [
                {
                  "uuid": "a0c77b55-03f2-40a6-b7e5-2d4d46022566",
                  "name": "All Responses",
                  "exit_uuid": "a6036b75-8bfa-4474-bd2c-26fc010467f4"
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
            "uuid": "ac3fc913-ba3d-4e13-9d3b-0aa761f917f3",
            "actions": [
              {
                "uuid": "973047c0-6eff-4447-8d9c-dd8d7233b2cf",
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
                "uuid": "52e24fbe-9556-4401-9f2a-c7bcc771c8b3",
                "destination_uuid": "07b96177-0a35-4500-9489-971912429c00"
              }
            ]
          },
          {
            "uuid": "07b96177-0a35-4500-9489-971912429c00",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b6664a83-6d32-4541-81ed-8929915445dd",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "fb1721db-0c81-4061-bda6-27ec1940cefd",
                  "type": "has_only_phrase",
                  "uuid": "13c5d01c-afa3-49e7-b24d-eb0caa7eca98"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "31940a81-1106-41a7-8096-ff62e2c5914d",
                  "type": "has_only_phrase",
                  "uuid": "5b508fd4-278e-46c6-aefb-a6dda3a65efc"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "31940a81-1106-41a7-8096-ff62e2c5914d",
                  "type": "has_only_phrase",
                  "uuid": "500e3a50-67b3-47ee-a6d4-d0f2b37ed07b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2761fb5e-e40e-48b6-bd03-338de95bfcac",
                  "name": "All Responses",
                  "uuid": "b6664a83-6d32-4541-81ed-8929915445dd"
                },
                {
                  "exit_uuid": "f01fa2c1-2559-497e-b97e-021631b2a920",
                  "name": "Great",
                  "uuid": "fb1721db-0c81-4061-bda6-27ec1940cefd"
                },
                {
                  "exit_uuid": "eb0c4e99-17ad-4388-9b71-4d3bd0cea58e",
                  "name": "Neutral; Bad",
                  "uuid": "31940a81-1106-41a7-8096-ff62e2c5914d"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "2761fb5e-e40e-48b6-bd03-338de95bfcac",
                "destination_uuid": null
              },
              {
                "uuid": "f01fa2c1-2559-497e-b97e-021631b2a920",
                "destination_uuid": "c17abaae-5d0a-42d3-9fbb-e35a03746a4e"
              },
              {
                "uuid": "eb0c4e99-17ad-4388-9b71-4d3bd0cea58e",
                "destination_uuid": "223d5536-1243-4361-a760-0d93ca22f667"
              }
            ]
          },
          {
            "uuid": "c17abaae-5d0a-42d3-9fbb-e35a03746a4e",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "da5f87bb-d0e0-4e65-80f6-8ed4da9abe82"
              }
            ],
            "exits": [
              {
                "uuid": "456fb71f-2960-4602-a460-7ab9811782e8",
                "destination_uuid": "7277e481-6331-4c12-bf59-a31d80105a00"
              }
            ]
          },
          {
            "uuid": "223d5536-1243-4361-a760-0d93ca22f667",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "cfede700-adb6-40b9-bb04-b2251fe637b1"
              }
            ],
            "exits": [
              {
                "uuid": "f4d5e834-c469-4d1f-ac57-d02051d29894",
                "destination_uuid": "f88cbc96-e43c-4c76-b85f-4b5ed576edb2"
              }
            ]
          },
          {
            "uuid": "f88cbc96-e43c-4c76-b85f-4b5ed576edb2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "20357c54-6cfa-476a-8460-969443d47786",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "2a12ff3b-52d9-450c-92cf-30a7312571b8",
                  "type": "has_only_phrase",
                  "uuid": "83d7a78f-12ed-4cf8-a5cf-802002091245"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "27bdd552-6f82-46c6-ad53-6dd84aaed1c7",
                  "type": "has_only_phrase",
                  "uuid": "8f1b9f55-4e11-459b-af20-e13960ae621a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e1be7e96-88df-450d-976c-70ab4002d425",
                  "name": "All Responses",
                  "uuid": "20357c54-6cfa-476a-8460-969443d47786"
                },
                {
                  "exit_uuid": "a137d305-9175-487d-94d5-f214cb70590d",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "2a12ff3b-52d9-450c-92cf-30a7312571b8"
                },
                {
                  "exit_uuid": "59ad13bd-a4f6-45f5-b060-3223015e4aeb",
                  "name": "Continue",
                  "uuid": "27bdd552-6f82-46c6-ad53-6dd84aaed1c7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e1be7e96-88df-450d-976c-70ab4002d425",
                "destination_uuid": null
              },
              {
                "uuid": "a137d305-9175-487d-94d5-f214cb70590d",
                "destination_uuid": "92cadb87-c5dc-47ba-94c0-051c333a82ff"
              },
              {
                "uuid": "59ad13bd-a4f6-45f5-b060-3223015e4aeb",
                "destination_uuid": "49f5c7e2-6a84-4acd-ab43-75b6c2376b6f"
              }
            ]
          },
          {
            "uuid": "92cadb87-c5dc-47ba-94c0-051c333a82ff",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "7a4250ad-f3fa-4007-8e96-457a62bca783"
                },
                "type": "enter_flow",
                "uuid": "21ce0642-e1d5-483d-8bfa-e66301c06e16"
              }
            ],
            "exits": [
              {
                "uuid": "3a5f77fd-880c-4a0c-94e4-d26f8ddaa166",
                "destination_uuid": "d50d9690-edfb-4f04-9245-63f6b1bb28b9"
              },
              {
                "uuid": "5baa882e-fdbe-4a6e-a58e-074deef77a9b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7fb7991e-67f5-484e-b5f0-87d8891451e4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7583385c-997e-4cfc-90e1-2f132105ef1b"
                },
                {
                  "uuid": "bc1b1c05-018b-4f25-ad41-08e922967b4d",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "39a5600a-cbff-49e6-bfad-c53a44bb298d"
                }
              ],
              "categories": [
                {
                  "uuid": "7583385c-997e-4cfc-90e1-2f132105ef1b",
                  "name": "Complete",
                  "exit_uuid": "3a5f77fd-880c-4a0c-94e4-d26f8ddaa166"
                },
                {
                  "uuid": "39a5600a-cbff-49e6-bfad-c53a44bb298d",
                  "name": "Expired",
                  "exit_uuid": "5baa882e-fdbe-4a6e-a58e-074deef77a9b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7583385c-997e-4cfc-90e1-2f132105ef1b"
            }
          },
          {
            "uuid": "7277e481-6331-4c12-bf59-a31d80105a00",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "60354346-3b68-47ea-8e59-a696c0d0f26d",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "a8ea25a7-8c0a-40bb-a857-87e996003c00",
                  "type": "has_only_phrase",
                  "uuid": "435b193e-2d95-47f1-a5ef-55a45045d2e4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "671e5da1-3b37-4f3d-b797-3e9a89b72acc",
                  "name": "All Responses",
                  "uuid": "60354346-3b68-47ea-8e59-a696c0d0f26d"
                },
                {
                  "exit_uuid": "937c36d5-94b6-4f6b-9f86-e8da3e9be12f",
                  "name": "Go to Praise check-in",
                  "uuid": "a8ea25a7-8c0a-40bb-a857-87e996003c00"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "671e5da1-3b37-4f3d-b797-3e9a89b72acc",
                "destination_uuid": null
              },
              {
                "uuid": "937c36d5-94b6-4f6b-9f86-e8da3e9be12f",
                "destination_uuid": "6b28502c-63fe-48b9-8e65-6e02b3d2f871"
              }
            ]
          },
          {
            "uuid": "6b28502c-63fe-48b9-8e65-6e02b3d2f871",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "0ee7735a-6909-486f-9a6a-e6e2f737861b"
              }
            ],
            "exits": [
              {
                "uuid": "50361a8a-19c7-4925-bafb-b2fa581f0f88",
                "destination_uuid": "53572cca-291d-4310-9995-57d121c57d1b"
              }
            ]
          },
          {
            "uuid": "49f5c7e2-6a84-4acd-ab43-75b6c2376b6f",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "7b41dd41-11d3-4896-afde-8baba1c615c4"
              }
            ],
            "exits": [
              {
                "uuid": "651f864d-9089-4cbf-9b44-9d0874352ef6",
                "destination_uuid": "53572cca-291d-4310-9995-57d121c57d1b"
              }
            ]
          },
          {
            "uuid": "d50d9690-edfb-4f04-9245-63f6b1bb28b9",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "9e88a02b-b015-4f1a-aa50-6633e6833199"
              }
            ],
            "exits": [
              {
                "uuid": "e0c4b443-748e-4061-8c58-a972ca0ff27b",
                "destination_uuid": "53572cca-291d-4310-9995-57d121c57d1b"
              }
            ]
          },
          {
            "uuid": "53572cca-291d-4310-9995-57d121c57d1b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8ef78d09-bd6e-4e7e-b86b-168df3de722c",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "54322280-0180-44cf-8c1a-7b2f42d64f41",
                  "type": "has_only_phrase",
                  "uuid": "583b0e47-9584-4967-8e0c-2232bb34c95c"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "612a78d9-e071-4e95-a209-296e6e690eae",
                  "type": "has_only_phrase",
                  "uuid": "b27420f5-517a-4975-9f34-ac6a5584fada"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "4cab0336-2e42-497d-9854-df3ee69e0541",
                  "type": "has_only_phrase",
                  "uuid": "16426186-09d5-47b0-8a03-df51f5edf974"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "3cbdcd3c-b987-4c5c-ac47-ffcb37b8a371",
                  "type": "has_only_phrase",
                  "uuid": "ed7394c2-f8fe-42e2-92e0-53165eee2ecc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "72fc4a81-3df2-488b-bbf0-fdc1e38c2a8e",
                  "name": "All Responses",
                  "uuid": "8ef78d09-bd6e-4e7e-b86b-168df3de722c"
                },
                {
                  "exit_uuid": "69cabe06-0577-4401-9bf9-0bd022192206",
                  "name": "No",
                  "uuid": "54322280-0180-44cf-8c1a-7b2f42d64f41"
                },
                {
                  "exit_uuid": "0866f452-36c4-48fd-be28-1a7b8f41d476",
                  "name": "Yes",
                  "uuid": "612a78d9-e071-4e95-a209-296e6e690eae"
                },
                {
                  "exit_uuid": "29142821-4a32-40ce-a4ab-e41bacb370aa",
                  "name": "Yes",
                  "uuid": "4cab0336-2e42-497d-9854-df3ee69e0541"
                },
                {
                  "exit_uuid": "c04a878e-df0e-455a-8d9d-8aa66f5109d2",
                  "name": "Yes",
                  "uuid": "3cbdcd3c-b987-4c5c-ac47-ffcb37b8a371"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "72fc4a81-3df2-488b-bbf0-fdc1e38c2a8e",
                "destination_uuid": null
              },
              {
                "uuid": "69cabe06-0577-4401-9bf9-0bd022192206",
                "destination_uuid": "47538249-1227-49a5-8ae0-0f45daca006d"
              },
              {
                "uuid": "0866f452-36c4-48fd-be28-1a7b8f41d476",
                "destination_uuid": "985946c8-e073-46de-9ac2-8135aeff9e7b"
              },
              {
                "uuid": "29142821-4a32-40ce-a4ab-e41bacb370aa",
                "destination_uuid": "985946c8-e073-46de-9ac2-8135aeff9e7b"
              },
              {
                "uuid": "c04a878e-df0e-455a-8d9d-8aa66f5109d2",
                "destination_uuid": "985946c8-e073-46de-9ac2-8135aeff9e7b"
              }
            ]
          },
          {
            "uuid": "47538249-1227-49a5-8ae0-0f45daca006d",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cf9cdee6-a3d0-41dd-94e6-722fa68689b9"
              }
            ],
            "exits": [
              {
                "uuid": "b6d6a57e-9130-4ed6-99c7-0615f7bfc799",
                "destination_uuid": "0c592a64-f6e8-4ff5-8611-f1e62e0ecf75"
              }
            ]
          },
          {
            "uuid": "985946c8-e073-46de-9ac2-8135aeff9e7b",
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
                "uuid": "319a5fcc-3584-4605-9617-ebc922987a3c"
              }
            ],
            "exits": [
              {
                "uuid": "4963ce14-838d-4f76-adfc-c198a839f3ee",
                "destination_uuid": "01c4bd45-a0db-4ff6-848c-f02ebd628715"
              }
            ]
          },
          {
            "uuid": "01c4bd45-a0db-4ff6-848c-f02ebd628715",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1e141a86-ebac-4c91-9e27-4c3b45aa0967",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "b6415372-1b04-4d85-b7fe-1bed01379438",
                  "type": "has_only_phrase",
                  "uuid": "aec5c9a2-0cf5-4b94-89e9-f0192a7ed9c7"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "e4b54fc2-a6a3-4075-8ea3-98b4803bef7a",
                  "type": "has_only_phrase",
                  "uuid": "4ce8fbf8-0b32-4cd9-ab0c-f6dc3093e4ea"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "76dc2993-e4e3-4d46-b166-35496a9f8c0a",
                  "type": "has_only_phrase",
                  "uuid": "6a3fcda3-12a3-4c8d-86d4-5504317b2678"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "ba3ce8cc-5b39-4099-80cd-f0b2b22b4d4d",
                  "type": "has_only_phrase",
                  "uuid": "c1df6fe4-0f87-4d85-91e5-53ea207cbfc4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "abae8221-3eb7-43b8-812c-7023da194af4",
                  "name": "All Responses",
                  "uuid": "1e141a86-ebac-4c91-9e27-4c3b45aa0967"
                },
                {
                  "exit_uuid": "6c901ad1-23b4-40d5-ba78-58e0cf34c408",
                  "name": "Surprised",
                  "uuid": "b6415372-1b04-4d85-b7fe-1bed01379438"
                },
                {
                  "exit_uuid": "cb1609fd-89c9-481f-8b4f-e1cb6de12a37",
                  "name": "Happy",
                  "uuid": "e4b54fc2-a6a3-4075-8ea3-98b4803bef7a"
                },
                {
                  "exit_uuid": "9f7329b0-9f37-46cf-8607-70596669cd39",
                  "name": "My teen did not like it",
                  "uuid": "76dc2993-e4e3-4d46-b166-35496a9f8c0a"
                },
                {
                  "exit_uuid": "c98d70c1-6a66-488f-95a3-5d49f26ed2d7",
                  "name": "I don’t know",
                  "uuid": "ba3ce8cc-5b39-4099-80cd-f0b2b22b4d4d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "abae8221-3eb7-43b8-812c-7023da194af4",
                "destination_uuid": null
              },
              {
                "uuid": "6c901ad1-23b4-40d5-ba78-58e0cf34c408",
                "destination_uuid": "b7443f73-03dd-44c3-9eba-6f7233c5dc65"
              },
              {
                "uuid": "cb1609fd-89c9-481f-8b4f-e1cb6de12a37",
                "destination_uuid": "f018e9b9-0d71-44e8-ba47-e0e24f8f6fe2"
              },
              {
                "uuid": "9f7329b0-9f37-46cf-8607-70596669cd39",
                "destination_uuid": "87e18dec-fcf8-4e0d-9eb3-b0af21633889"
              },
              {
                "uuid": "c98d70c1-6a66-488f-95a3-5d49f26ed2d7",
                "destination_uuid": "78f504f2-dcc7-4f07-857c-1ffcc6dc9a4b"
              }
            ]
          },
          {
            "uuid": "b7443f73-03dd-44c3-9eba-6f7233c5dc65",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "60e01286-1582-49ca-a46d-b2aa30e204f1"
              }
            ],
            "exits": [
              {
                "uuid": "cd8023a3-b254-4047-85c9-233b9e45c62c",
                "destination_uuid": "63d37dc8-27eb-4f72-b506-6d60389fb793"
              }
            ]
          },
          {
            "uuid": "f018e9b9-0d71-44e8-ba47-e0e24f8f6fe2",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9c0af306-0440-470d-a925-eb922eb82709"
              }
            ],
            "exits": [
              {
                "uuid": "929bbefa-182e-4881-a838-ea8795ad3b19",
                "destination_uuid": "63d37dc8-27eb-4f72-b506-6d60389fb793"
              }
            ]
          },
          {
            "uuid": "87e18dec-fcf8-4e0d-9eb3-b0af21633889",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "33170ca7-0f0e-4e4c-9b2b-da845362401f"
              }
            ],
            "exits": [
              {
                "uuid": "912e11ab-423a-4f75-b76d-b9bbd3864653",
                "destination_uuid": "63d37dc8-27eb-4f72-b506-6d60389fb793"
              }
            ]
          },
          {
            "uuid": "78f504f2-dcc7-4f07-857c-1ffcc6dc9a4b",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3a0e29f4-abea-4e09-93c3-96b894a59f6e"
              }
            ],
            "exits": [
              {
                "uuid": "9a04b1ff-61ca-4c4d-9ec8-6a104d959857",
                "destination_uuid": "63d37dc8-27eb-4f72-b506-6d60389fb793"
              }
            ]
          },
          {
            "uuid": "63d37dc8-27eb-4f72-b506-6d60389fb793",
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
                "uuid": "047a693d-2489-4791-8e48-e24a9221388b"
              }
            ],
            "exits": [
              {
                "uuid": "483169df-a443-4aea-aae9-465d9d8d7aaa",
                "destination_uuid": "b3252308-dff5-4738-a8f5-b9fca6274a03"
              }
            ]
          },
          {
            "uuid": "b3252308-dff5-4738-a8f5-b9fca6274a03",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6d1c3d50-902d-4ad1-83ce-186ac42f7342",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "4311dff8-b766-4ff2-b36e-de2a58c9059f",
                  "type": "has_only_phrase",
                  "uuid": "9fcf7465-6860-4064-8ef1-2d9505948976"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "4311dff8-b766-4ff2-b36e-de2a58c9059f",
                  "type": "has_only_phrase",
                  "uuid": "60700288-ac50-492e-b665-6ccee02e58fd"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "598f920d-38d8-4f69-bd14-0144d7b29a46",
                  "type": "has_only_phrase",
                  "uuid": "3aa81f85-ff4c-4b45-889d-937d30ad49e4"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "598f920d-38d8-4f69-bd14-0144d7b29a46",
                  "type": "has_only_phrase",
                  "uuid": "f32caade-5b49-4e29-a952-4480f1200654"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "92c7278d-6c99-4d9e-bc9f-ae5fb5b8cb77",
                  "name": "All Responses",
                  "uuid": "6d1c3d50-902d-4ad1-83ce-186ac42f7342"
                },
                {
                  "exit_uuid": "2511620c-2e9d-4894-a5b9-31f11ea3783b",
                  "name": "Every day; Almost every day",
                  "uuid": "4311dff8-b766-4ff2-b36e-de2a58c9059f"
                },
                {
                  "exit_uuid": "dbc9791e-c6a0-437f-b5e8-33b707417517",
                  "name": "A few days; Never",
                  "uuid": "598f920d-38d8-4f69-bd14-0144d7b29a46"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "92c7278d-6c99-4d9e-bc9f-ae5fb5b8cb77",
                "destination_uuid": null
              },
              {
                "uuid": "2511620c-2e9d-4894-a5b9-31f11ea3783b",
                "destination_uuid": "9634f72e-4a51-4f3e-bb08-78d9a6093ac8"
              },
              {
                "uuid": "dbc9791e-c6a0-437f-b5e8-33b707417517",
                "destination_uuid": "759de2c6-71f1-4999-bebe-9637132487f0"
              }
            ]
          },
          {
            "uuid": "9634f72e-4a51-4f3e-bb08-78d9a6093ac8",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "345d7448-5460-461f-aec1-17e1806e4492"
              }
            ],
            "exits": [
              {
                "uuid": "0239d311-fddd-45a0-8a4e-247b4a45517f",
                "destination_uuid": "0c592a64-f6e8-4ff5-8611-f1e62e0ecf75"
              }
            ]
          },
          {
            "uuid": "759de2c6-71f1-4999-bebe-9637132487f0",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "323c2d18-ead3-43d3-a994-8f52ed50d61e"
              }
            ],
            "exits": [
              {
                "uuid": "f82e4891-6560-4efd-8265-d40a20dc9262",
                "destination_uuid": "0c592a64-f6e8-4ff5-8611-f1e62e0ecf75"
              }
            ]
          },
          {
            "uuid": "0c592a64-f6e8-4ff5-8611-f1e62e0ecf75",
            "actions": [
              {
                "uuid": "d9d3f04f-6e43-4cab-bc05-a39fa4145b33",
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
                "uuid": "19b637e5-d795-4285-83ba-4dd474dcfc00",
                "destination_uuid": "bd6c6757-0322-4abf-9e75-8d7a817c9aae"
              }
            ]
          },
          {
            "uuid": "bd6c6757-0322-4abf-9e75-8d7a817c9aae",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "8bc99b70-1c94-470c-89b4-8f5154ee2bf9"
                },
                "type": "enter_flow",
                "uuid": "9ec40f7d-969e-4810-a4bd-d9f315feb0ba"
              }
            ],
            "exits": [
              {
                "uuid": "da1dbb6f-8a75-47f2-9ebe-151f8373fe09",
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
        "uuid": "7aeb8058-f4cc-4ce4-a0f0-b324dc2635bf",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "11e2103a-0d6c-4833-937a-a98d781e45bd",
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
                "uuid": "5ed7cd7f-1c02-4cee-b4c0-83c9b7daa274"
              }
            ],
            "exits": [
              {
                "uuid": "a1a1b0a7-4721-4d1a-9e63-4134d7ab5827",
                "destination_uuid": "abb5a3ca-9419-44d5-bdf0-96a188243e76"
              }
            ]
          },
          {
            "uuid": "abb5a3ca-9419-44d5-bdf0-96a188243e76",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c914e40b-b2e7-438f-a1b4-6edef9513d04",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "03684683-984d-4899-bae3-53b129c1fb85",
                  "type": "has_only_phrase",
                  "uuid": "24605a72-2438-4660-bceb-6c59859e18da"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "9b9e781c-104a-4130-b929-abe0a732298d",
                  "type": "has_only_phrase",
                  "uuid": "69ee98bc-cdfb-4d37-be62-3351bcaf79d5"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "a0dc6273-3bfa-41ae-8c11-07e77e57b844",
                  "type": "has_only_phrase",
                  "uuid": "2bd39534-281f-4628-a988-db746aefa9e5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "42473b12-1bae-4d11-b9c6-9a77f8d59846",
                  "name": "All Responses",
                  "uuid": "c914e40b-b2e7-438f-a1b4-6edef9513d04"
                },
                {
                  "exit_uuid": "193ff258-b811-4a43-a589-66aed4b82bb4",
                  "name": "Happy",
                  "uuid": "03684683-984d-4899-bae3-53b129c1fb85"
                },
                {
                  "exit_uuid": "4ced33fe-a409-4398-bd00-0d65f2bd5202",
                  "name": "Neutral",
                  "uuid": "9b9e781c-104a-4130-b929-abe0a732298d"
                },
                {
                  "exit_uuid": "c4816434-b9b0-4736-ba1b-1b9118ab162d",
                  "name": "Sad",
                  "uuid": "a0dc6273-3bfa-41ae-8c11-07e77e57b844"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "42473b12-1bae-4d11-b9c6-9a77f8d59846",
                "destination_uuid": null
              },
              {
                "uuid": "193ff258-b811-4a43-a589-66aed4b82bb4",
                "destination_uuid": "3effd810-bda3-47eb-9056-78799f0d790b"
              },
              {
                "uuid": "4ced33fe-a409-4398-bd00-0d65f2bd5202",
                "destination_uuid": "077217ce-3cc6-42a7-bca0-050d5dbd9073"
              },
              {
                "uuid": "c4816434-b9b0-4736-ba1b-1b9118ab162d",
                "destination_uuid": "fed47ab1-0d5b-4949-a940-65dec912963a"
              }
            ]
          },
          {
            "uuid": "3effd810-bda3-47eb-9056-78799f0d790b",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that you are doing well. You are a wonderful parent!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "08af71a9-5c6e-425a-b58c-be72a3c5ba25"
              }
            ],
            "exits": [
              {
                "uuid": "130fd0cf-43d5-47f1-a2ba-49a35350dccb",
                "destination_uuid": "bf6e82cb-00d2-45ac-8117-4b179419f31d"
              }
            ]
          },
          {
            "uuid": "077217ce-3cc6-42a7-bca0-050d5dbd9073",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that you are not having the best day. Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "a9d02402-fde3-4444-99e3-71ee79977509"
              }
            ],
            "exits": [
              {
                "uuid": "9a42a5eb-22c4-463a-9d3f-d9f978740865",
                "destination_uuid": "bf6e82cb-00d2-45ac-8117-4b179419f31d"
              }
            ]
          },
          {
            "uuid": "fed47ab1-0d5b-4949-a940-65dec912963a",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that you are not having a good day. Well done for getting up every morning and trying again, even when you are tired. That is real courage and dedication!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "cb4f1a82-2c73-437a-b99a-41474c29ed05"
              }
            ],
            "exits": [
              {
                "uuid": "f1b30241-cf32-4942-b5b0-29ed256bae65",
                "destination_uuid": "506bd4a3-6036-4449-a21d-46df946f3c01"
              }
            ]
          },
          {
            "uuid": "bf6e82cb-00d2-45ac-8117-4b179419f31d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "aaa67477-47f5-4c45-9364-cb3111013314",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "b1654b02-5fd6-46d9-88b1-ba13928a0d87",
                  "type": "has_only_phrase",
                  "uuid": "728260b4-ed03-43a4-877e-8d6adf034e88"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "b73d2850-ed5c-48a5-8251-8d0396397051",
                  "type": "has_only_phrase",
                  "uuid": "e4dffb73-d711-4cf3-b473-261ee5755d3b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8136d8fe-b376-43a4-8560-c8effa4459fd",
                  "name": "All Responses",
                  "uuid": "aaa67477-47f5-4c45-9364-cb3111013314"
                },
                {
                  "exit_uuid": "ea8aa7eb-e040-4f21-8682-07120651644b",
                  "name": "More tips",
                  "uuid": "b1654b02-5fd6-46d9-88b1-ba13928a0d87"
                },
                {
                  "exit_uuid": "d2da40b8-95ba-4b92-9fd7-82fd1197913d",
                  "name": "Activity to help you relax",
                  "uuid": "b73d2850-ed5c-48a5-8251-8d0396397051"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8136d8fe-b376-43a4-8560-c8effa4459fd",
                "destination_uuid": null
              },
              {
                "uuid": "ea8aa7eb-e040-4f21-8682-07120651644b",
                "destination_uuid": "26ffd1c6-3673-48f8-8cf3-574c108d6891"
              },
              {
                "uuid": "d2da40b8-95ba-4b92-9fd7-82fd1197913d",
                "destination_uuid": "ce2545c7-3142-4df0-ab6c-18735b8dacfe"
              }
            ]
          },
          {
            "uuid": "26ffd1c6-3673-48f8-8cf3-574c108d6891",
            "actions": [
              {
                "uuid": "221645ca-d521-4435-84bb-eab855ec84eb",
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
                "uuid": "c988e478-8be8-40a1-938f-bbadc6b232d0",
                "destination_uuid": "27f7e140-1e70-431f-9367-e31a86ce3f39"
              }
            ]
          },
          {
            "uuid": "27f7e140-1e70-431f-9367-e31a86ce3f39",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "6245257d-418f-47f0-8695-90739a862dbb"
                },
                "type": "enter_flow",
                "uuid": "1f783e57-1fa2-45c8-9f1b-c5ae431100eb"
              }
            ],
            "exits": [
              {
                "uuid": "b11f17fa-840c-49eb-8f8a-2e555816eef7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "506bd4a3-6036-4449-a21d-46df946f3c01",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b2c2c40d-a002-4fd9-8a1d-d4f6940c6187",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "8758825a-ea45-4512-9cc6-01d0e59d4518",
                  "type": "has_only_phrase",
                  "uuid": "ea7cd37e-a21b-44ee-ac85-2a5f53cfa22c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cbfaf7e6-87bd-4ff8-a270-1a64b1e68cef",
                  "name": "All Responses",
                  "uuid": "b2c2c40d-a002-4fd9-8a1d-d4f6940c6187"
                },
                {
                  "exit_uuid": "8975d385-e40b-426c-8317-b8dd5d9ea7cd",
                  "name": "Activity to help you relax",
                  "uuid": "8758825a-ea45-4512-9cc6-01d0e59d4518"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cbfaf7e6-87bd-4ff8-a270-1a64b1e68cef",
                "destination_uuid": null
              },
              {
                "uuid": "8975d385-e40b-426c-8317-b8dd5d9ea7cd",
                "destination_uuid": "ce2545c7-3142-4df0-ab6c-18735b8dacfe"
              }
            ]
          },
          {
            "uuid": "ce2545c7-3142-4df0-ab6c-18735b8dacfe",
            "actions": [
              {
                "uuid": "1b0c2df8-960d-44ba-aa7c-3a4713f90d68",
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
                "uuid": "abacac9d-64e5-48c3-9330-a43ad3b79410",
                "destination_uuid": "c130de09-fa20-4e78-af04-f52c5958a9a3"
              }
            ]
          },
          {
            "uuid": "c130de09-fa20-4e78-af04-f52c5958a9a3",
            "actions": [
              {
                "flow": {
                  "name": "calm_3",
                  "uuid": "a05bc45a-e3c9-47cf-b337-0c0e37533fcc"
                },
                "type": "enter_flow",
                "uuid": "5c6526e4-3251-4a01-acfd-b4440978e9f2"
              }
            ],
            "exits": [
              {
                "uuid": "79047fa6-57eb-4294-8125-40ca945fb5ca",
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
        "uuid": "6dee494d-0206-4c35-b757-92ac877c325a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0533dbee-a23b-4aac-96d5-23d24e4e1be7",
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
                "uuid": "0d6abbb0-c3a6-4443-8020-ee08f7073541"
              }
            ],
            "exits": [
              {
                "uuid": "cf41d8d5-9cdb-439b-a357-02ea238d4d24",
                "destination_uuid": "d9994ba3-8947-4e2a-bf39-3b971bdcb2cc"
              }
            ]
          },
          {
            "uuid": "d9994ba3-8947-4e2a-bf39-3b971bdcb2cc",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0b95666f-6e02-4b90-bd18-271914589d28",
              "cases": [
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "8f006ccb-06e7-4627-ade1-2de36f049e7a",
                  "type": "has_only_phrase",
                  "uuid": "b16d5067-e08a-4014-8bc4-3217dd286536"
                },
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "b10c4452-3e35-415b-a05e-c8ace2f786c7",
                  "type": "has_only_phrase",
                  "uuid": "9fac8b4b-4238-4435-81cf-ba530866b4f1"
                },
                {
                  "arguments": [
                    "Watch & sing"
                  ],
                  "category_uuid": "0c5fe14a-5ae7-4636-b498-306a58499473",
                  "type": "has_only_phrase",
                  "uuid": "c14884b7-3567-40af-9c0d-18d1c18e7e2e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1d53a00a-f91e-4938-9d57-d66f5cc83fb8",
                  "name": "All Responses",
                  "uuid": "0b95666f-6e02-4b90-bd18-271914589d28"
                },
                {
                  "exit_uuid": "c9a65765-0b9e-447b-a9b2-78cca56d26fe",
                  "name": "Chat together",
                  "uuid": "8f006ccb-06e7-4627-ade1-2de36f049e7a"
                },
                {
                  "exit_uuid": "0aa633b5-34ba-432e-b544-1fe2c23a9ffb",
                  "name": "Get active",
                  "uuid": "b10c4452-3e35-415b-a05e-c8ace2f786c7"
                },
                {
                  "exit_uuid": "75e868d8-b135-463b-88b9-1799cc232ba6",
                  "name": "Watch & sing",
                  "uuid": "0c5fe14a-5ae7-4636-b498-306a58499473"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1d53a00a-f91e-4938-9d57-d66f5cc83fb8",
                "destination_uuid": null
              },
              {
                "uuid": "c9a65765-0b9e-447b-a9b2-78cca56d26fe",
                "destination_uuid": "a8815818-4001-4710-a91f-ad18ea755cc0"
              },
              {
                "uuid": "0aa633b5-34ba-432e-b544-1fe2c23a9ffb",
                "destination_uuid": "7b65d9ac-7c30-4d3a-b635-ebcca7afdeb4"
              },
              {
                "uuid": "75e868d8-b135-463b-88b9-1799cc232ba6",
                "destination_uuid": "d3c98267-1fa6-4083-b26c-1ed1b92d83d1"
              }
            ]
          },
          {
            "uuid": "a8815818-4001-4710-a91f-ad18ea755cc0",
            "actions": [
              {
                "attachments": [],
                "text": "At the End of the Day\n- At the end of each day, take a minute to think about the day.\n- Talk your child about one positive or fun thing they did.\n- Praise yourself for one thing you did well today.\n- Think of one thing that you are grateful for.\n- You are a star!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a517f6fe-a60a-4947-b26b-089f2207552f"
              }
            ],
            "exits": [
              {
                "uuid": "1204c126-fc45-492d-8c15-a1d50f46a697",
                "destination_uuid": "adc6cd5e-c062-4bb8-95f7-01306793b956"
              }
            ]
          },
          {
            "uuid": "7b65d9ac-7c30-4d3a-b635-ebcca7afdeb4",
            "actions": [
              {
                "attachments": [],
                "text": "What's new?\n- Think of a new skill you could learn together with your teen. For example, keeping a ball in the air or your foot, juggling, making soup?\n- Take turns in trying the new skill out.\n- Make sure to praise each other, and try to learn and play together!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9e8088ac-da38-44ff-af1f-d8893df913a2"
              }
            ],
            "exits": [
              {
                "uuid": "f947b117-5f27-41de-a3c3-33ba2cf2620a",
                "destination_uuid": "adc6cd5e-c062-4bb8-95f7-01306793b956"
              }
            ]
          },
          {
            "uuid": "d3c98267-1fa6-4083-b26c-1ed1b92d83d1",
            "actions": [
              {
                "attachments": [],
                "text": "Song...",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b9655076-0b26-4962-bc5f-c8fff7ad6198"
              }
            ],
            "exits": [
              {
                "uuid": "1ee3980f-f0e7-4e48-a187-84ac41003930",
                "destination_uuid": "adc6cd5e-c062-4bb8-95f7-01306793b956"
              }
            ]
          },
          {
            "uuid": "adc6cd5e-c062-4bb8-95f7-01306793b956",
            "actions": [
              {
                "uuid": "64e1b86e-2d40-4db8-bdda-d0884dbe0993",
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
                "uuid": "7f3af2ca-2c17-44e4-9a2f-60dc6a8c1228",
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
        "name": "mod_instructions_emo",
        "uuid": "81aface0-a3ae-4feb-b97e-5b1fb7ed1f0d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "22bb039d-5822-442e-a6ec-950423330ac5",
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
                "uuid": "a9562ed6-bae6-4fbf-a5d3-5360403044b2"
              }
            ],
            "exits": [
              {
                "uuid": "b452756f-aded-41ea-9e03-626360d8f41d",
                "destination_uuid": "c523bc61-e1e5-4df7-acb1-b50d61bf0382"
              }
            ]
          },
          {
            "uuid": "c523bc61-e1e5-4df7-acb1-b50d61bf0382",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b12bdd82-2ab8-4215-b2f4-e4828ef57b13",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "6569466f-0c1e-4ab9-9501-d24e5a7f5f30",
                  "type": "has_only_phrase",
                  "uuid": "c453579d-1a1b-4953-9a05-d34ff106e1d2"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "a5d70333-170c-4c58-81bf-a889ebb905a4",
                  "type": "has_only_phrase",
                  "uuid": "62be3ed6-783a-4700-af6f-87bfecce150a"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "f119091b-f825-4add-b2fb-211f4aeba30c",
                  "type": "has_only_phrase",
                  "uuid": "e9481f48-86ba-4674-9b3a-d0ae5f69336d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2d41a588-6f1b-402a-81e7-494543d70ab3",
                  "name": "All Responses",
                  "uuid": "b12bdd82-2ab8-4215-b2f4-e4828ef57b13"
                },
                {
                  "exit_uuid": "d2ab46e1-e83b-4490-a0a8-8b259c82eebe",
                  "name": "Happy",
                  "uuid": "6569466f-0c1e-4ab9-9501-d24e5a7f5f30"
                },
                {
                  "exit_uuid": "57c73ff0-20ed-42fe-afab-d45ad0707167",
                  "name": "Neutral",
                  "uuid": "a5d70333-170c-4c58-81bf-a889ebb905a4"
                },
                {
                  "exit_uuid": "24958273-4e06-4f56-8b2c-c8b74d3fbb82",
                  "name": "Sad",
                  "uuid": "f119091b-f825-4add-b2fb-211f4aeba30c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2d41a588-6f1b-402a-81e7-494543d70ab3",
                "destination_uuid": null
              },
              {
                "uuid": "d2ab46e1-e83b-4490-a0a8-8b259c82eebe",
                "destination_uuid": "b1262977-27c2-417e-bc6c-f27fc2464154"
              },
              {
                "uuid": "57c73ff0-20ed-42fe-afab-d45ad0707167",
                "destination_uuid": "92ea655d-b871-4809-be36-ded10717fc4f"
              },
              {
                "uuid": "24958273-4e06-4f56-8b2c-c8b74d3fbb82",
                "destination_uuid": "abd75125-1255-405f-a1cf-2d784e6ae92c"
              }
            ]
          },
          {
            "uuid": "b1262977-27c2-417e-bc6c-f27fc2464154",
            "actions": [
              {
                "attachments": [],
                "text": "So good to hear you are feeling well today. You are incredible!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "eaa6b6c7-db1f-40b9-9830-cde243853a5d"
              }
            ],
            "exits": [
              {
                "uuid": "2838ef4c-2c44-40ca-86ad-596d6a3e347f",
                "destination_uuid": "f7350564-01f8-4c4c-a28b-13fb72d7222d"
              }
            ]
          },
          {
            "uuid": "92ea655d-b871-4809-be36-ded10717fc4f",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes we are up, sometimes we are down – it’s okay. Remember it’s the small things that make the difference and I am here for you!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "fe86453f-4ab7-46bd-8ae8-8ba2af9d0968"
              }
            ],
            "exits": [
              {
                "uuid": "9cc1606d-70d1-4f7d-8054-4e6582625cd9",
                "destination_uuid": "f7350564-01f8-4c4c-a28b-13fb72d7222d"
              }
            ]
          },
          {
            "uuid": "abd75125-1255-405f-a1cf-2d784e6ae92c",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that things are difficult right now. Take a deep breath and know that you are valued. We are here to help!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "d9051127-059a-4216-bdcd-1cd68a40abce"
              }
            ],
            "exits": [
              {
                "uuid": "e256c990-d5da-45f9-8dd7-73ba22733f9b",
                "destination_uuid": "738b4732-1f1b-47ae-91a3-163520298ec3"
              }
            ]
          },
          {
            "uuid": "f7350564-01f8-4c4c-a28b-13fb72d7222d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3cea6922-c108-4d05-af94-8a01a5775c5c",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "f99524e9-5463-4d80-9765-60d4c14b8686",
                  "type": "has_only_phrase",
                  "uuid": "d127820d-fabd-4b9a-8272-207c03aca00e"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "f92d4a8b-5ff1-4a10-b9c2-ff6b8567822c",
                  "type": "has_only_phrase",
                  "uuid": "de338112-076c-4507-9c4a-302f991a6e4b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d71055af-a33a-4334-9618-9cea99e65e0d",
                  "name": "All Responses",
                  "uuid": "3cea6922-c108-4d05-af94-8a01a5775c5c"
                },
                {
                  "exit_uuid": "4bb9ddf9-2c09-4e1c-987a-d81daed6fe72",
                  "name": "More tips",
                  "uuid": "f99524e9-5463-4d80-9765-60d4c14b8686"
                },
                {
                  "exit_uuid": "0b5e1d52-05d2-4c77-9262-83fd7af47849",
                  "name": "Activity to help you relax",
                  "uuid": "f92d4a8b-5ff1-4a10-b9c2-ff6b8567822c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d71055af-a33a-4334-9618-9cea99e65e0d",
                "destination_uuid": null
              },
              {
                "uuid": "4bb9ddf9-2c09-4e1c-987a-d81daed6fe72",
                "destination_uuid": "c15b2dda-8a16-4e18-8e63-d3247af2287d"
              },
              {
                "uuid": "0b5e1d52-05d2-4c77-9262-83fd7af47849",
                "destination_uuid": "e128f19f-4dff-420e-b284-a46dbe5e201e"
              }
            ]
          },
          {
            "uuid": "c15b2dda-8a16-4e18-8e63-d3247af2287d",
            "actions": [
              {
                "uuid": "694b386d-ac3e-427c-93ae-b547c664a859",
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
                "uuid": "d3b290ec-7a95-4975-8eca-98f4d9e4d788",
                "destination_uuid": "706817fb-e141-4f7f-9428-79aebb59cae6"
              }
            ]
          },
          {
            "uuid": "706817fb-e141-4f7f-9428-79aebb59cae6",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "ed940650-53ee-458d-b3af-8815ce875cdd"
                },
                "type": "enter_flow",
                "uuid": "c12b114a-597a-4d59-b5dc-302db495eeaa"
              }
            ],
            "exits": [
              {
                "uuid": "5f6f98ea-274d-48f8-b115-d8fa7859d4ee",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "738b4732-1f1b-47ae-91a3-163520298ec3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a74ce8f4-038b-46bf-8234-531094c4f1ec",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "a0208a7e-d6f9-45d0-9674-db08e48fcb96",
                  "type": "has_only_phrase",
                  "uuid": "495f6b64-ff8c-4bad-bfa6-1ffc656e0b75"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "759947f9-ab04-4c65-a157-64992a95405a",
                  "name": "All Responses",
                  "uuid": "a74ce8f4-038b-46bf-8234-531094c4f1ec"
                },
                {
                  "exit_uuid": "4786788f-a47c-4a52-b0c3-a45aa082446b",
                  "name": "Activity to help you relax",
                  "uuid": "a0208a7e-d6f9-45d0-9674-db08e48fcb96"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "759947f9-ab04-4c65-a157-64992a95405a",
                "destination_uuid": null
              },
              {
                "uuid": "4786788f-a47c-4a52-b0c3-a45aa082446b",
                "destination_uuid": "e128f19f-4dff-420e-b284-a46dbe5e201e"
              }
            ]
          },
          {
            "uuid": "e128f19f-4dff-420e-b284-a46dbe5e201e",
            "actions": [
              {
                "uuid": "6edc80a2-0671-4da5-a7bc-d13ffe1e8228",
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
                "uuid": "a0c963c6-c4e4-453c-ade8-5d5ea32df242",
                "destination_uuid": "b644b5b3-c39c-4cd5-a00f-97c4a7b183d3"
              }
            ]
          },
          {
            "uuid": "b644b5b3-c39c-4cd5-a00f-97c4a7b183d3",
            "actions": [
              {
                "flow": {
                  "name": "calm_6",
                  "uuid": "2f3e36ea-72a6-43ea-bac1-bdf6f72461df"
                },
                "type": "enter_flow",
                "uuid": "1a1c9814-ecc8-4fc3-8c9c-7de0125351c4"
              }
            ],
            "exits": [
              {
                "uuid": "e699ce5f-4b5d-4184-bf2a-274b1398e605",
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
        "uuid": "41480844-c87e-4374-916b-e1de627d7143",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b4df5245-0f04-4593-a16f-7e1a6cf36027",
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
                "uuid": "ef2123a5-ed8e-4495-a301-569845867dff"
              }
            ],
            "exits": [
              {
                "uuid": "fb8b4e6b-7221-4c4f-87c9-6c7e6b70a443",
                "destination_uuid": "9b877a09-1ec2-4250-9066-21c3d9bd15c7"
              }
            ]
          },
          {
            "uuid": "9b877a09-1ec2-4250-9066-21c3d9bd15c7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3bcc9fed-62c7-4c15-a3a3-e7c3193ff36c",
              "cases": [
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "225fa9b6-a05d-4878-a826-fb1843642976",
                  "type": "has_only_phrase",
                  "uuid": "5bf51c7e-0a5c-4f6e-9012-30622ca3ecd6"
                },
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "6862927c-250e-49aa-b8d3-439e3d49d29c",
                  "type": "has_only_phrase",
                  "uuid": "3cc9b800-29d3-482b-b9b8-28fb50d17321"
                },
                {
                  "arguments": [
                    "Watch & sing"
                  ],
                  "category_uuid": "b2e728cb-1772-4cf1-be30-c8c4deedf0df",
                  "type": "has_only_phrase",
                  "uuid": "25d5aeb2-c6e2-4fc6-8f21-059c89027031"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1b82624a-bfd7-4376-af5b-67c0646c5ddb",
                  "name": "All Responses",
                  "uuid": "3bcc9fed-62c7-4c15-a3a3-e7c3193ff36c"
                },
                {
                  "exit_uuid": "bacc41ef-224d-491a-9a25-068708e1c08f",
                  "name": "Chat together",
                  "uuid": "225fa9b6-a05d-4878-a826-fb1843642976"
                },
                {
                  "exit_uuid": "aeb13d59-67bc-4ce8-a7d8-4b53afb65439",
                  "name": "Get active",
                  "uuid": "6862927c-250e-49aa-b8d3-439e3d49d29c"
                },
                {
                  "exit_uuid": "6ea2f684-b229-4cff-a899-8d7474df1202",
                  "name": "Watch & sing",
                  "uuid": "b2e728cb-1772-4cf1-be30-c8c4deedf0df"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1b82624a-bfd7-4376-af5b-67c0646c5ddb",
                "destination_uuid": null
              },
              {
                "uuid": "bacc41ef-224d-491a-9a25-068708e1c08f",
                "destination_uuid": "58fbc889-a2bd-4b0a-9388-e25997dbf56e"
              },
              {
                "uuid": "aeb13d59-67bc-4ce8-a7d8-4b53afb65439",
                "destination_uuid": "780f11cc-25d6-4cbb-bf5a-33327988e2fd"
              },
              {
                "uuid": "6ea2f684-b229-4cff-a899-8d7474df1202",
                "destination_uuid": "457a554c-6c7e-46d4-a970-33b5380bc410"
              }
            ]
          },
          {
            "uuid": "58fbc889-a2bd-4b0a-9388-e25997dbf56e",
            "actions": [
              {
                "attachments": [],
                "text": "Dream Travel \n- You can’t always travel but you can always dream! Ask your teen these questions.\n- Where do you want to travel? How long will you be away? What will you pack? What will you do? What will you see? \n- Look at a map together if you have one. \n- Choose a country that they’ve never heard of and find out about it.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "144b8962-cead-4a17-93e4-81dd91d734a0"
              }
            ],
            "exits": [
              {
                "uuid": "0c29282b-4339-442b-b391-37d377b1cc11",
                "destination_uuid": "19c64c90-7da9-40ba-a3ce-76f54be35ca6"
              }
            ]
          },
          {
            "uuid": "780f11cc-25d6-4cbb-bf5a-33327988e2fd",
            "actions": [
              {
                "attachments": [],
                "text": "Dance moves \n- Create a set of dance moves to your teen's favourite songs.\n- First person does a dance move and everyone else copies.\n- Everyone takes turns being the leader.\n- Perform it for the household!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a7627b1a-be41-411f-8ee9-5bbe44f836ed"
              }
            ],
            "exits": [
              {
                "uuid": "42d479e0-3a84-4112-a22e-86569f176fa9",
                "destination_uuid": "19c64c90-7da9-40ba-a3ce-76f54be35ca6"
              }
            ]
          },
          {
            "uuid": "457a554c-6c7e-46d4-a970-33b5380bc410",
            "actions": [
              {
                "attachments": [],
                "text": "Song...",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "98bc18c6-3b13-4b55-b13b-1e145745e9d8"
              }
            ],
            "exits": [
              {
                "uuid": "5e66981e-f741-4315-a730-60b0d12b11ea",
                "destination_uuid": "19c64c90-7da9-40ba-a3ce-76f54be35ca6"
              }
            ]
          },
          {
            "uuid": "19c64c90-7da9-40ba-a3ce-76f54be35ca6",
            "actions": [
              {
                "uuid": "37764e97-15db-497b-9f8f-9d0d596ce232",
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
                "uuid": "7ae52478-f1e5-4fe7-a28a-f175211d8263",
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
        "uuid": "cef959cc-cc73-41e0-8409-02abaacab011",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1ec29bf4-31a0-4ea7-bff8-d44136c8d2a5",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "be855380-1ba4-4287-8cde-4ede8ddd8f3d"
              }
            ],
            "exits": [
              {
                "uuid": "66162a53-bd27-4b3f-a9b1-10b04d8fabca",
                "destination_uuid": "8337a3f2-112e-4ad5-9910-8ce23e7dbafa"
              }
            ]
          },
          {
            "uuid": "8337a3f2-112e-4ad5-9910-8ce23e7dbafa",
            "actions": [
              {
                "uuid": "7f72b26f-60c7-46a4-8038-dbd6d55b0611",
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
                "uuid": "145300e7-426f-4cd3-9c45-e0fb0b276626",
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
        "uuid": "081f53d7-46d0-4279-ad21-e23c39d014d0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0c79fba1-cf4e-414b-8123-a15f22c7bec7",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e36f8856-61ce-4fc4-af89-64bd0881c009"
              }
            ],
            "exits": [
              {
                "uuid": "241c2a1d-f8d5-4410-bf3e-56d09bb75181",
                "destination_uuid": "9e3bcd00-9c07-426a-a6c1-9763abe8b2c6"
              }
            ]
          },
          {
            "uuid": "9e3bcd00-9c07-426a-a6c1-9763abe8b2c6",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c3dcb042-f462-43cd-b936-a813575d6155"
              }
            ],
            "exits": [
              {
                "uuid": "deb55be4-ec48-4af7-9de1-1ea7076573d3",
                "destination_uuid": "b973cda1-2cb7-4a6f-92ef-113935da8be6"
              }
            ]
          },
          {
            "uuid": "b973cda1-2cb7-4a6f-92ef-113935da8be6",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2a734a4e-c446-4e7b-a95d-a81a80f2a86a"
              }
            ],
            "exits": [
              {
                "uuid": "d07cbd76-22ab-4f69-bf68-11550b7c65d2",
                "destination_uuid": "92a012ba-2910-4f89-a65f-b0418e5a8a36"
              }
            ]
          },
          {
            "uuid": "92a012ba-2910-4f89-a65f-b0418e5a8a36",
            "actions": [
              {
                "uuid": "d17c7c9c-597b-46b7-99e5-cac6c7979bc6",
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
                "uuid": "226525c4-4a24-4245-a78b-1c1a6a0c808c",
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
        "uuid": "f4207cf4-4976-4a80-ab53-e5aa60e42f0f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "718b3274-3914-4543-b294-f162b85ae873",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a5d3fa6b-9653-469a-9439-abe0d120d2da"
              }
            ],
            "exits": [
              {
                "uuid": "c2436b4c-188c-466e-b8e4-fcdfaf2709d6",
                "destination_uuid": "8469492d-e56f-48d4-b365-6da595461bf8"
              }
            ]
          },
          {
            "uuid": "8469492d-e56f-48d4-b365-6da595461bf8",
            "actions": [
              {
                "uuid": "2eb3a1ef-befb-4a3f-9160-2cf4d7d1ccdf",
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
                "uuid": "decee180-61a2-477e-9c39-3b92705090ea",
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
        "uuid": "4dbe51c5-a1c7-41ab-b932-c984e7ebad36",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3c682365-6ad6-42f8-ad96-8ebfdef04d6d",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a1d5adb0-cbca-476b-9a17-c541f57af2b6"
              }
            ],
            "exits": [
              {
                "uuid": "1b6c984a-10b3-4252-a3fe-53ff1e315b79",
                "destination_uuid": "92bf8848-4df3-48d9-a1a7-8eca98979fab"
              }
            ]
          },
          {
            "uuid": "92bf8848-4df3-48d9-a1a7-8eca98979fab",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "67d2c53d-77d1-4ea5-98ef-ca2994d1181f"
              }
            ],
            "exits": [
              {
                "uuid": "0e154bdf-31f8-427f-8ef1-087350f7a499",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b6bd101b-107d-4863-856e-ff6e9fb8da3a",
            "actions": [
              {
                "uuid": "7871d5e8-3dfd-4c4f-840d-184648505dee",
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
                "uuid": "9c23bccb-4748-4624-ac1e-1ea3960cb6a2",
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
        "uuid": "1b677390-a1f2-49cd-a66c-954e2695384a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b02b3ac5-e0f6-4ef3-988a-f08fb4c4590a",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f33bfd7e-32f1-4a57-9da3-b72b1460ebc8"
              }
            ],
            "exits": [
              {
                "uuid": "46ec0878-a8ad-4f5a-97ff-c159461b89c6",
                "destination_uuid": "5688e22a-af1e-4f68-98ee-ecfc8f6c438d"
              }
            ]
          },
          {
            "uuid": "5688e22a-af1e-4f68-98ee-ecfc8f6c438d",
            "actions": [
              {
                "uuid": "e64e7341-2f27-4171-84d1-cc3026885583",
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
                "uuid": "2fbc0165-ce2e-4dd6-a467-c8eedb3e486e",
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
        "uuid": "ae651d70-a0d0-4214-8b21-0675f2928200",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2567b654-cb22-4a9f-bd18-054d4597dfe7",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "f502be78-a402-4b9a-8cf7-e991791ae4f8"
                },
                "type": "enter_flow",
                "uuid": "2bc95506-12d4-4ec8-a265-f220cf013546"
              }
            ],
            "exits": [
              {
                "uuid": "6c39f731-950c-48d9-bb54-2c24221d67cd",
                "destination_uuid": "b132511e-dc42-4ac0-a315-dea41beb1f81"
              },
              {
                "uuid": "b9ef8fc8-6da7-4501-89af-6e8b5f822b88",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b43380cf-7f68-4785-9494-3472407bc752",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "6d2d9ce3-3924-4088-86fa-b3682c7a7cf5"
                },
                {
                  "uuid": "8b1fc31c-8cf4-44ce-b620-c898e90baa29",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2280e3b0-d3de-4ead-9770-7359ea3aaf77"
                }
              ],
              "categories": [
                {
                  "uuid": "6d2d9ce3-3924-4088-86fa-b3682c7a7cf5",
                  "name": "Complete",
                  "exit_uuid": "6c39f731-950c-48d9-bb54-2c24221d67cd"
                },
                {
                  "uuid": "2280e3b0-d3de-4ead-9770-7359ea3aaf77",
                  "name": "Expired",
                  "exit_uuid": "b9ef8fc8-6da7-4501-89af-6e8b5f822b88"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "6d2d9ce3-3924-4088-86fa-b3682c7a7cf5"
            }
          },
          {
            "uuid": "b132511e-dc42-4ac0-a315-dea41beb1f81",
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
                "uuid": "6660dc12-a54a-4088-9043-58186c21dea9"
              }
            ],
            "exits": [
              {
                "uuid": "1cbe1a2a-1ee8-4589-8e31-5e2c5207701b",
                "destination_uuid": "1c9dcbb1-7cca-4a1e-8e23-28348bc91754"
              }
            ]
          },
          {
            "uuid": "1c9dcbb1-7cca-4a1e-8e23-28348bc91754",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a54e76fa-62aa-4147-90f5-bc2fab1fb5dc",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "211bece2-8739-4743-a45f-03e1bfe57afc",
                  "type": "has_only_phrase",
                  "uuid": "7faf2e03-7e31-4c32-bb5c-584ecaf5cc73"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "27f940ac-a985-4831-85d9-18751b3a86da",
                  "type": "has_only_phrase",
                  "uuid": "058b813f-af78-4124-88e0-c3cf269eb66d"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "fdd5a568-a8d0-4936-b396-2453b7cc3b93",
                  "type": "has_only_phrase",
                  "uuid": "88d3c57b-82f2-48b1-9f0f-1716db95c7d5"
                },
                {
                  "arguments": [
                    "first app opening"
                  ],
                  "category_uuid": "6e9cbf39-9283-420b-8dea-29db0e8ed634",
                  "type": "has_only_phrase",
                  "uuid": "644b298f-9059-40bd-886f-19c8bfac930d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "22b0da37-6685-4ae5-8d78-ee6093aa3851",
                  "name": "All Responses",
                  "uuid": "a54e76fa-62aa-4147-90f5-bc2fab1fb5dc"
                },
                {
                  "exit_uuid": "a4d847d0-fdff-4f61-a70a-fb353722627a",
                  "name": "welcome",
                  "uuid": "211bece2-8739-4743-a45f-03e1bfe57afc"
                },
                {
                  "exit_uuid": "331e3871-fae3-4712-9587-c18b11df4b68",
                  "name": "1on1",
                  "uuid": "27f940ac-a985-4831-85d9-18751b3a86da"
                },
                {
                  "exit_uuid": "d4aac4e8-6634-4088-ab4f-0a279cb8983f",
                  "name": "praise",
                  "uuid": "fdd5a568-a8d0-4936-b396-2453b7cc3b93"
                },
                {
                  "exit_uuid": "ccbbf0a1-26bb-4817-a8e8-340581591e2a",
                  "name": "first app opening",
                  "uuid": "6e9cbf39-9283-420b-8dea-29db0e8ed634"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "22b0da37-6685-4ae5-8d78-ee6093aa3851",
                "destination_uuid": null
              },
              {
                "uuid": "a4d847d0-fdff-4f61-a70a-fb353722627a",
                "destination_uuid": "ca2928d0-b5dd-42cd-ac87-25932d512c97"
              },
              {
                "uuid": "331e3871-fae3-4712-9587-c18b11df4b68",
                "destination_uuid": "5b9bfba3-6832-4126-9565-839fc7e20738"
              },
              {
                "uuid": "d4aac4e8-6634-4088-ab4f-0a279cb8983f",
                "destination_uuid": "97dd6faa-4893-45a2-9f07-c79b6b90b0c2"
              },
              {
                "uuid": "ccbbf0a1-26bb-4817-a8e8-340581591e2a",
                "destination_uuid": "0c49b58a-7159-460f-8474-5d0e4a86326d"
              }
            ]
          },
          {
            "uuid": "ca2928d0-b5dd-42cd-ac87-25932d512c97",
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
                "uuid": "b59b4f7f-8026-4654-9346-a5c83632368a"
              }
            ],
            "exits": [
              {
                "uuid": "542ad8a5-a9f3-4905-9d3d-80f6d629adec",
                "destination_uuid": "509d40c9-9825-40ad-b51f-de258a2af1d5"
              }
            ]
          },
          {
            "uuid": "509d40c9-9825-40ad-b51f-de258a2af1d5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c8e29dcb-91f9-4add-80af-d2792da5f0e1",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "940959ad-2b07-4203-92c4-9ba7b8945564",
                  "type": "has_only_phrase",
                  "uuid": "5ca59fff-de1f-44c2-87c2-a5f4adf9fe21"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "721ade4f-1a9d-4981-8472-6582d3eba848",
                  "type": "has_only_phrase",
                  "uuid": "9a9e88a0-9106-4403-8b0d-19a4d04d7130"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "5a4a26df-101d-4ccb-9d3e-088a989926dc",
                  "type": "has_only_phrase",
                  "uuid": "89cfe4f4-7489-4cab-bddd-e70933afa032"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "bdc454f5-7d2d-4c31-90ea-a4737cf1a1b3",
                  "type": "has_only_phrase",
                  "uuid": "664b87a7-c6c9-4fd3-a923-1c0707ba049a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2711b117-cd40-4c7f-aa58-189c54491d7e",
                  "name": "All Responses",
                  "uuid": "c8e29dcb-91f9-4add-80af-d2792da5f0e1"
                },
                {
                  "exit_uuid": "e401ecca-aa4d-4ed8-a922-539db6eeeb61",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "940959ad-2b07-4203-92c4-9ba7b8945564"
                },
                {
                  "exit_uuid": "334eb203-2857-4a13-865f-57eab385547c",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "721ade4f-1a9d-4981-8472-6582d3eba848"
                },
                {
                  "exit_uuid": "4a024eea-46ac-455a-ac32-1e7ba202a089",
                  "name": "mod_welcome_survey",
                  "uuid": "5a4a26df-101d-4ccb-9d3e-088a989926dc"
                },
                {
                  "exit_uuid": "854bb56a-2263-44e2-9df2-9e3c4a04e83c",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "bdc454f5-7d2d-4c31-90ea-a4737cf1a1b3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2711b117-cd40-4c7f-aa58-189c54491d7e",
                "destination_uuid": null
              },
              {
                "uuid": "e401ecca-aa4d-4ed8-a922-539db6eeeb61",
                "destination_uuid": "a1232243-017e-46b8-ad96-5fbfd8c025de"
              },
              {
                "uuid": "334eb203-2857-4a13-865f-57eab385547c",
                "destination_uuid": "dcad59f2-c799-4057-88eb-5e3a8d308e40"
              },
              {
                "uuid": "4a024eea-46ac-455a-ac32-1e7ba202a089",
                "destination_uuid": "9899f5e8-5ece-41fe-ac62-3d9947de2e02"
              },
              {
                "uuid": "854bb56a-2263-44e2-9df2-9e3c4a04e83c",
                "destination_uuid": "95007e68-f862-4c18-9202-4c28e0c6c02a"
              }
            ]
          },
          {
            "uuid": "a1232243-017e-46b8-ad96-5fbfd8c025de",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "d0e6eaec-a5dc-49d2-aa82-58d2115dc53e"
                },
                "type": "enter_flow",
                "uuid": "55d8eca3-94a4-4d29-8bc4-bec6eb9a009b"
              }
            ],
            "exits": [
              {
                "uuid": "7a79f5c9-90b9-4aa8-8be5-eb4d4e9aa75f",
                "destination_uuid": null
              },
              {
                "uuid": "cebaf50b-57f2-415e-a771-495a45f2d143",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "cac3492e-1b8f-4959-850b-859d7b2e761b",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8ad66ec4-e66e-4bd3-895f-e6d278ed4160"
                },
                {
                  "uuid": "058e3613-96b3-4400-b4d9-0b000bd41f85",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "751a0359-dca7-441f-8c77-93de7dbe6482"
                }
              ],
              "categories": [
                {
                  "uuid": "8ad66ec4-e66e-4bd3-895f-e6d278ed4160",
                  "name": "Complete",
                  "exit_uuid": "7a79f5c9-90b9-4aa8-8be5-eb4d4e9aa75f"
                },
                {
                  "uuid": "751a0359-dca7-441f-8c77-93de7dbe6482",
                  "name": "Expired",
                  "exit_uuid": "cebaf50b-57f2-415e-a771-495a45f2d143"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8ad66ec4-e66e-4bd3-895f-e6d278ed4160"
            }
          },
          {
            "uuid": "dcad59f2-c799-4057-88eb-5e3a8d308e40",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "c25b36a5-d528-4b4f-af33-c52905fee417"
                },
                "type": "enter_flow",
                "uuid": "9c80f23f-98b5-4d9b-a1f0-00938b71853c"
              }
            ],
            "exits": [
              {
                "uuid": "85727471-fc50-49d1-b6ec-f294ced1a355",
                "destination_uuid": null
              },
              {
                "uuid": "84a2f352-2ce8-4ee7-9686-30a95536fbbd",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1000eb73-88bf-4d22-bf03-62e471ad08db",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "e8a0eb14-9c95-4ae2-86a2-b92499a48c1a"
                },
                {
                  "uuid": "58f1d8a5-49da-4b2c-bdc0-d14b5cf2a719",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a9e690b4-e4c2-49a7-bfd7-9d551ecd5f5e"
                }
              ],
              "categories": [
                {
                  "uuid": "e8a0eb14-9c95-4ae2-86a2-b92499a48c1a",
                  "name": "Complete",
                  "exit_uuid": "85727471-fc50-49d1-b6ec-f294ced1a355"
                },
                {
                  "uuid": "a9e690b4-e4c2-49a7-bfd7-9d551ecd5f5e",
                  "name": "Expired",
                  "exit_uuid": "84a2f352-2ce8-4ee7-9686-30a95536fbbd"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "e8a0eb14-9c95-4ae2-86a2-b92499a48c1a"
            }
          },
          {
            "uuid": "9899f5e8-5ece-41fe-ac62-3d9947de2e02",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "e5ba9aeb-c49e-4489-84ec-301500b5b4e6"
                },
                "type": "enter_flow",
                "uuid": "a0678587-4e75-46ce-a40e-ac8020335a84"
              }
            ],
            "exits": [
              {
                "uuid": "d280b45f-67a4-4032-a750-9ac43a9d2568",
                "destination_uuid": null
              },
              {
                "uuid": "8d44c426-5682-4eac-9281-1843dec0e906",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "31933cad-c6b7-4f32-9b11-438bc8b57c3b",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ab5ddd64-6e55-43c2-b0bb-8e17b5644603"
                },
                {
                  "uuid": "3f0e5a7a-2525-4b94-824c-d422eea84733",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "7b2d99fc-67d7-4c8b-bb91-dff880e41fec"
                }
              ],
              "categories": [
                {
                  "uuid": "ab5ddd64-6e55-43c2-b0bb-8e17b5644603",
                  "name": "Complete",
                  "exit_uuid": "d280b45f-67a4-4032-a750-9ac43a9d2568"
                },
                {
                  "uuid": "7b2d99fc-67d7-4c8b-bb91-dff880e41fec",
                  "name": "Expired",
                  "exit_uuid": "8d44c426-5682-4eac-9281-1843dec0e906"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ab5ddd64-6e55-43c2-b0bb-8e17b5644603"
            }
          },
          {
            "uuid": "95007e68-f862-4c18-9202-4c28e0c6c02a",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "98689bfa-9c99-46a1-a57e-ab1c0ec2dc44"
                },
                "type": "enter_flow",
                "uuid": "5c49433e-e671-41fc-ad2a-49d96cb2df7b"
              }
            ],
            "exits": [
              {
                "uuid": "fe43b8bf-5a73-4ce5-a539-5b192c6e7d18",
                "destination_uuid": null
              },
              {
                "uuid": "ed8ad062-a9ba-4c8f-92ca-a7891f9bb8d8",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "dc73d7fe-6e47-43b5-a3a6-a2c8989fea8d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "9e84e0a6-5847-4274-9788-5d5cbdfe086f"
                },
                {
                  "uuid": "ff03023e-dbb0-44f5-a7d7-4a95fbfdc7bb",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "63b9dbf2-f2ba-4e7a-bf03-f2331bf6bb85"
                }
              ],
              "categories": [
                {
                  "uuid": "9e84e0a6-5847-4274-9788-5d5cbdfe086f",
                  "name": "Complete",
                  "exit_uuid": "fe43b8bf-5a73-4ce5-a539-5b192c6e7d18"
                },
                {
                  "uuid": "63b9dbf2-f2ba-4e7a-bf03-f2331bf6bb85",
                  "name": "Expired",
                  "exit_uuid": "ed8ad062-a9ba-4c8f-92ca-a7891f9bb8d8"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "9e84e0a6-5847-4274-9788-5d5cbdfe086f"
            }
          },
          {
            "uuid": "5b9bfba3-6832-4126-9565-839fc7e20738",
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
                "uuid": "ed164ada-cc39-499c-9b3a-8da68bf850f9"
              }
            ],
            "exits": [
              {
                "uuid": "ef21c803-a0bc-4d39-956c-df7a8cf22835",
                "destination_uuid": "3417799c-83f2-4b3b-a3f2-9bb18fc443e9"
              }
            ]
          },
          {
            "uuid": "3417799c-83f2-4b3b-a3f2-9bb18fc443e9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "517f1d5f-703d-487a-b263-7239f09cbd48",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "db0ed4e5-9bdf-4c1d-8540-792d98c3c9a6",
                  "type": "has_only_phrase",
                  "uuid": "845dce4b-1818-4638-9945-2f3ef2c909dd"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "1e05b111-6113-47b4-8e69-612a1de2a77b",
                  "type": "has_only_phrase",
                  "uuid": "7ab22795-5bc2-4c9d-9f15-7c1de713f1f9"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "8f00f5e2-99de-49fa-9d33-670a6a023d1c",
                  "type": "has_only_phrase",
                  "uuid": "7957dc6a-8864-448f-861b-666cd2c5fb6a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c56cc841-f863-4768-8902-ed6d5005477f",
                  "name": "All Responses",
                  "uuid": "517f1d5f-703d-487a-b263-7239f09cbd48"
                },
                {
                  "exit_uuid": "d5ab4ff4-6009-43fe-8e42-03b4aa341cd6",
                  "name": "mod_1on1_emo",
                  "uuid": "db0ed4e5-9bdf-4c1d-8540-792d98c3c9a6"
                },
                {
                  "exit_uuid": "f6976047-f2bb-425c-a181-ca007b85c1a1",
                  "name": "mod_1on1_activity",
                  "uuid": "1e05b111-6113-47b4-8e69-612a1de2a77b"
                },
                {
                  "exit_uuid": "558e12fa-0e10-4153-bdd3-46bc31cd67f0",
                  "name": "mod_1on1_activity_review",
                  "uuid": "8f00f5e2-99de-49fa-9d33-670a6a023d1c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c56cc841-f863-4768-8902-ed6d5005477f",
                "destination_uuid": null
              },
              {
                "uuid": "d5ab4ff4-6009-43fe-8e42-03b4aa341cd6",
                "destination_uuid": "81df082e-f144-48bd-a4c0-1ecf5c03f1fe"
              },
              {
                "uuid": "f6976047-f2bb-425c-a181-ca007b85c1a1",
                "destination_uuid": "f2fec4ae-4c90-4415-9330-430ec4131c5e"
              },
              {
                "uuid": "558e12fa-0e10-4153-bdd3-46bc31cd67f0",
                "destination_uuid": "22d76cdb-7128-4f45-a521-b678d570f5fe"
              }
            ]
          },
          {
            "uuid": "81df082e-f144-48bd-a4c0-1ecf5c03f1fe",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "ffde6186-c3b2-4cee-835a-83ae5c205bef"
                },
                "type": "enter_flow",
                "uuid": "ffb2188f-239c-4941-a4fe-f6fc8fc2813e"
              }
            ],
            "exits": [
              {
                "uuid": "ea2bbca3-1ee6-4076-9346-dcae94c65b0b",
                "destination_uuid": null
              },
              {
                "uuid": "2772386b-511f-48f9-8d2f-f18e5212bd96",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "9b878461-ab50-4b64-882b-22a16071370a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d3e0e761-dde1-4a05-ad2b-17efc49510d3"
                },
                {
                  "uuid": "8c2e6df0-fdaf-4689-9885-34e34ff12b15",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "4922cd2d-83d2-46fb-b770-84c1b6ea4dc5"
                }
              ],
              "categories": [
                {
                  "uuid": "d3e0e761-dde1-4a05-ad2b-17efc49510d3",
                  "name": "Complete",
                  "exit_uuid": "ea2bbca3-1ee6-4076-9346-dcae94c65b0b"
                },
                {
                  "uuid": "4922cd2d-83d2-46fb-b770-84c1b6ea4dc5",
                  "name": "Expired",
                  "exit_uuid": "2772386b-511f-48f9-8d2f-f18e5212bd96"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d3e0e761-dde1-4a05-ad2b-17efc49510d3"
            }
          },
          {
            "uuid": "f2fec4ae-4c90-4415-9330-430ec4131c5e",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "065db26b-8fee-485d-bec0-14b3f64a6c46"
                },
                "type": "enter_flow",
                "uuid": "e8e43417-9cad-41b4-bdbe-8331209f68e3"
              }
            ],
            "exits": [
              {
                "uuid": "43c82a5f-191d-4b23-930f-f7fe3688ea9d",
                "destination_uuid": null
              },
              {
                "uuid": "1cafeaa9-1347-4b93-a2c6-f6c53078cb0c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "893417b9-4510-4916-9c15-2aead668f9bd",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "aeb56cad-47fe-4321-a5f7-40e8a7efe523"
                },
                {
                  "uuid": "85583eae-619f-47bd-9a14-c5657ec24bf8",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "9d515c21-3caf-4c11-8a89-db242b11cde4"
                }
              ],
              "categories": [
                {
                  "uuid": "aeb56cad-47fe-4321-a5f7-40e8a7efe523",
                  "name": "Complete",
                  "exit_uuid": "43c82a5f-191d-4b23-930f-f7fe3688ea9d"
                },
                {
                  "uuid": "9d515c21-3caf-4c11-8a89-db242b11cde4",
                  "name": "Expired",
                  "exit_uuid": "1cafeaa9-1347-4b93-a2c6-f6c53078cb0c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "aeb56cad-47fe-4321-a5f7-40e8a7efe523"
            }
          },
          {
            "uuid": "22d76cdb-7128-4f45-a521-b678d570f5fe",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "1805d98a-745c-4bfd-a1c0-d8f243090626"
                },
                "type": "enter_flow",
                "uuid": "d16b8b4f-c7df-4db9-9244-8cc7d6cee52a"
              }
            ],
            "exits": [
              {
                "uuid": "cb592a97-6ff9-4c59-8a50-20d553e9b8ff",
                "destination_uuid": null
              },
              {
                "uuid": "95bd93a8-ebdb-418f-8fa3-fdf3ad69b390",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "10baa93e-bc5d-440d-a91d-fb0dd1809889",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "264fbf7a-1525-4300-8498-c45c5300b8a3"
                },
                {
                  "uuid": "0d376ef1-4a87-41df-ba4a-2e1322ce8823",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "babcbe9c-0702-4938-8ce1-48554c2d52db"
                }
              ],
              "categories": [
                {
                  "uuid": "264fbf7a-1525-4300-8498-c45c5300b8a3",
                  "name": "Complete",
                  "exit_uuid": "cb592a97-6ff9-4c59-8a50-20d553e9b8ff"
                },
                {
                  "uuid": "babcbe9c-0702-4938-8ce1-48554c2d52db",
                  "name": "Expired",
                  "exit_uuid": "95bd93a8-ebdb-418f-8fa3-fdf3ad69b390"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "264fbf7a-1525-4300-8498-c45c5300b8a3"
            }
          },
          {
            "uuid": "97dd6faa-4893-45a2-9f07-c79b6b90b0c2",
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
                "uuid": "11ec0a0c-7cf4-4c75-8eb7-fb5b4f659e35"
              }
            ],
            "exits": [
              {
                "uuid": "8c1e9181-4718-4391-b340-56b6c28f58e8",
                "destination_uuid": "345ae671-c85d-406b-9ed6-6584e200fc46"
              }
            ]
          },
          {
            "uuid": "345ae671-c85d-406b-9ed6-6584e200fc46",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3096c5f7-4a36-4041-b441-982391e63cb6",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "572777c2-e27b-4c50-8738-a44b8f09fc79",
                  "type": "has_only_phrase",
                  "uuid": "6651a267-b821-4a5b-8133-81085fd8df9b"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "d0daf81d-f6bf-4228-a07e-1d4ab6be7eee",
                  "type": "has_only_phrase",
                  "uuid": "100de889-5339-48c2-82d0-576fe01fd3f0"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "31fd7929-2185-4c14-af2b-662e5a1f2a68",
                  "type": "has_only_phrase",
                  "uuid": "75b7e8e3-7828-4d55-971b-447126c21627"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a4b65194-0d64-4a20-9daa-c9316d5685fc",
                  "name": "All Responses",
                  "uuid": "3096c5f7-4a36-4041-b441-982391e63cb6"
                },
                {
                  "exit_uuid": "b5daed0a-12ca-425b-9c5b-cdb1c41a3fc5",
                  "name": "mod_praise_intro",
                  "uuid": "572777c2-e27b-4c50-8738-a44b8f09fc79"
                },
                {
                  "exit_uuid": "6d7ff600-fb44-48c0-b70a-79c1c2a804a0",
                  "name": "mod_praise_activity",
                  "uuid": "d0daf81d-f6bf-4228-a07e-1d4ab6be7eee"
                },
                {
                  "exit_uuid": "9949fb80-949a-408b-85e6-0a573dcd65e9",
                  "name": "mod_praise_activity_review",
                  "uuid": "31fd7929-2185-4c14-af2b-662e5a1f2a68"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a4b65194-0d64-4a20-9daa-c9316d5685fc",
                "destination_uuid": null
              },
              {
                "uuid": "b5daed0a-12ca-425b-9c5b-cdb1c41a3fc5",
                "destination_uuid": "b09568fb-b20f-4945-a276-6ea40a23abcc"
              },
              {
                "uuid": "6d7ff600-fb44-48c0-b70a-79c1c2a804a0",
                "destination_uuid": "5f66298f-a7ce-41e6-9212-e32b16bc1f8e"
              },
              {
                "uuid": "9949fb80-949a-408b-85e6-0a573dcd65e9",
                "destination_uuid": "fbf3edd7-50bb-4e0f-86c4-7fc04c880727"
              }
            ]
          },
          {
            "uuid": "b09568fb-b20f-4945-a276-6ea40a23abcc",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "f4b5f599-d551-4bd6-90a4-23947edf37ca"
                },
                "type": "enter_flow",
                "uuid": "f7375a09-c447-42bb-8f18-e35da0d268cb"
              }
            ],
            "exits": [
              {
                "uuid": "eaa44363-9a3b-42e9-bce4-d40c5d0b89e3",
                "destination_uuid": null
              },
              {
                "uuid": "ac5aff61-2fed-4218-a410-b315b648b23c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "0d319d8c-ef55-4b00-81eb-b893e2f55616",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d09e261c-ec31-4481-879b-0154973592d5"
                },
                {
                  "uuid": "8c37ce46-e5f3-4976-abe8-d31426746d8b",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0411dbcd-1339-4158-b92d-c5ffbd9d8064"
                }
              ],
              "categories": [
                {
                  "uuid": "d09e261c-ec31-4481-879b-0154973592d5",
                  "name": "Complete",
                  "exit_uuid": "eaa44363-9a3b-42e9-bce4-d40c5d0b89e3"
                },
                {
                  "uuid": "0411dbcd-1339-4158-b92d-c5ffbd9d8064",
                  "name": "Expired",
                  "exit_uuid": "ac5aff61-2fed-4218-a410-b315b648b23c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d09e261c-ec31-4481-879b-0154973592d5"
            }
          },
          {
            "uuid": "5f66298f-a7ce-41e6-9212-e32b16bc1f8e",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "f12d72e2-c239-4273-9d55-3ffb51773f92"
                },
                "type": "enter_flow",
                "uuid": "e4a2b9c8-7712-4df7-9906-0f64b9a4b200"
              }
            ],
            "exits": [
              {
                "uuid": "e0108361-1e73-4d9f-a668-ba7d04993d15",
                "destination_uuid": null
              },
              {
                "uuid": "f6e208fd-7dab-4615-adfa-8062c7aaff68",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b799b588-bd27-46fd-84ec-ccd35a2ad9ad",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "cc229e81-ceec-49df-a551-ef026bec80f6"
                },
                {
                  "uuid": "6e48d782-7cf5-4e2b-b2b5-30dffd00c3f0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "3ab3183a-7840-48a3-89d0-3d88c579b732"
                }
              ],
              "categories": [
                {
                  "uuid": "cc229e81-ceec-49df-a551-ef026bec80f6",
                  "name": "Complete",
                  "exit_uuid": "e0108361-1e73-4d9f-a668-ba7d04993d15"
                },
                {
                  "uuid": "3ab3183a-7840-48a3-89d0-3d88c579b732",
                  "name": "Expired",
                  "exit_uuid": "f6e208fd-7dab-4615-adfa-8062c7aaff68"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "cc229e81-ceec-49df-a551-ef026bec80f6"
            }
          },
          {
            "uuid": "fbf3edd7-50bb-4e0f-86c4-7fc04c880727",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "cfeae042-e079-42d8-af9e-8106d0942129"
                },
                "type": "enter_flow",
                "uuid": "8ca1cea3-b989-43cb-b198-d0703f52d84e"
              }
            ],
            "exits": [
              {
                "uuid": "fa979090-f205-4da9-9db6-d07e7f522891",
                "destination_uuid": null
              },
              {
                "uuid": "ccb1294f-3093-45fa-9253-7ba1528fb907",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "d8fbaabe-6752-4268-a648-e5e4a4ab6cd2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "40aaa3a0-c4ae-4738-be99-103bb1e1dd69"
                },
                {
                  "uuid": "f83ed273-c3cc-4f03-8f26-64d1d40312c2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "5f918c52-c52c-4316-a839-57e735e9edaa"
                }
              ],
              "categories": [
                {
                  "uuid": "40aaa3a0-c4ae-4738-be99-103bb1e1dd69",
                  "name": "Complete",
                  "exit_uuid": "fa979090-f205-4da9-9db6-d07e7f522891"
                },
                {
                  "uuid": "5f918c52-c52c-4316-a839-57e735e9edaa",
                  "name": "Expired",
                  "exit_uuid": "ccb1294f-3093-45fa-9253-7ba1528fb907"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "40aaa3a0-c4ae-4738-be99-103bb1e1dd69"
            }
          },
          {
            "uuid": "0c49b58a-7159-460f-8474-5d0e4a86326d",
            "actions": [
              {
                "flow": {
                  "name": "first_app_opening",
                  "uuid": "54110b07-883f-4362-b927-decf1381f875"
                },
                "type": "enter_flow",
                "uuid": "9a3fea01-201f-4f5c-9861-d19d8484665d"
              }
            ],
            "exits": [
              {
                "uuid": "7d490d16-b6e3-49f1-ad41-0c6b50223014",
                "destination_uuid": null
              },
              {
                "uuid": "8a31cfe9-ab12-40b6-91fd-de9575eb7aef",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e4cbd4f0-8de9-4c32-974e-635bdd5d159b",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "e7d27dfd-89af-46d0-a4c0-dc0bb7a29505"
                },
                {
                  "uuid": "0d0d13fd-970c-4147-8651-1e4742266a1f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "3b3c92c9-0474-4ee2-89d3-83de890fbb34"
                }
              ],
              "categories": [
                {
                  "uuid": "e7d27dfd-89af-46d0-a4c0-dc0bb7a29505",
                  "name": "Complete",
                  "exit_uuid": "7d490d16-b6e3-49f1-ad41-0c6b50223014"
                },
                {
                  "uuid": "3b3c92c9-0474-4ee2-89d3-83de890fbb34",
                  "name": "Expired",
                  "exit_uuid": "8a31cfe9-ab12-40b6-91fd-de9575eb7aef"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "e7d27dfd-89af-46d0-a4c0-dc0bb7a29505"
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
        "uuid": "c0c1fd5b-8f3c-4f8e-b338-879af6d35d11",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "663f6cfb-cec7-4432-a859-0912750c9d51",
            "actions": [
              {
                "uuid": "7f94c593-0491-42b7-ab94-430522598237",
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
                "uuid": "d9bd4b51-0111-4ab7-a578-e44c4239b799",
                "destination_uuid": "8cbd156f-63a3-4753-9ac6-3b805f3d40c2"
              }
            ]
          },
          {
            "uuid": "8cbd156f-63a3-4753-9ac6-3b805f3d40c2",
            "actions": [
              {
                "uuid": "27fbe22b-3a87-4fce-98bd-b5efc22261f8",
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
                "uuid": "6b340b51-bc57-4a7d-8e6c-52a62aeb0ac1",
                "destination_uuid": "5fcb7279-ba06-4f96-b7d6-1a442af09540"
              }
            ]
          },
          {
            "uuid": "5fcb7279-ba06-4f96-b7d6-1a442af09540",
            "actions": [
              {
                "uuid": "25982071-d23c-4852-85ff-19148745dd7d",
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
                "uuid": "0866b760-dcfe-4b47-8398-8eb9ffff67c9",
                "destination_uuid": "78670e53-409e-4f95-895d-d258ef850da3"
              }
            ]
          },
          {
            "uuid": "78670e53-409e-4f95-895d-d258ef850da3",
            "actions": [
              {
                "uuid": "8f5c24e7-3b69-440d-ab62-b557c2a00323",
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
                "uuid": "ec756ec5-930b-4142-b9a9-a4d1c104c985",
                "destination_uuid": "8d07ebff-0e67-41a4-88c3-bafeb324645c"
              }
            ]
          },
          {
            "uuid": "8d07ebff-0e67-41a4-88c3-bafeb324645c",
            "actions": [
              {
                "uuid": "51e4cdb6-30f0-4aaa-918b-fc8d195b36cb",
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
                "uuid": "50109a4a-e4a4-4a60-9131-d4894f3e9393",
                "destination_uuid": "9801453f-d805-441f-8528-3cca43dbeb92"
              }
            ]
          },
          {
            "uuid": "9801453f-d805-441f-8528-3cca43dbeb92",
            "actions": [
              {
                "uuid": "a2ea3197-e69c-47ea-894e-1ae8a1047fd9",
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
                "uuid": "c8143032-58e5-4085-bc4e-f65099821981",
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
        "uuid": "773b5ecc-c1cd-4b0d-bbde-3379e6f1a953",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "87cf838e-a2ee-458d-9d62-c810cfc792b4",
            "actions": [
              {
                "uuid": "787e645f-31e3-4247-8a83-0eb1152dfbbb",
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
                "uuid": "d2277ca2-b04d-435e-aad1-d5927a695f2b",
                "destination_uuid": "4a789028-5b1d-4c9c-a762-c14d9087ad11"
              }
            ]
          },
          {
            "uuid": "4a789028-5b1d-4c9c-a762-c14d9087ad11",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/home",
                  "uuid": "b0acf2d6-cea3-476f-b19e-1d35806bf06f"
                },
                "type": "enter_flow",
                "uuid": "b439245f-d1a4-4e96-9174-df987b50c249"
              }
            ],
            "exits": [
              {
                "uuid": "55f28ac0-a86a-41b3-939b-489168e0dd51",
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
        "uuid": "59fbc379-0750-4cf0-a122-8e8673ba4ee0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2e0041ba-4563-46d5-ab98-02164acc87bb",
            "actions": [
              {
                "uuid": "d8596ce3-61cc-475b-b1ac-fa3f79b617cc",
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
                "uuid": "0436ea93-24f7-4944-b848-9ade2d6cce62",
                "destination_uuid": "acd460c6-df84-47b1-9cf4-9db95f62fd27"
              }
            ]
          },
          {
            "uuid": "acd460c6-df84-47b1-9cf4-9db95f62fd27",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/chat",
                  "uuid": "3ab74ccd-e6ad-423a-8f3a-d23e4428f434"
                },
                "type": "enter_flow",
                "uuid": "3bf95f5c-6cd1-4bed-9790-3ac4f928c0b3"
              }
            ],
            "exits": [
              {
                "uuid": "646b92c9-8680-4aa2-906b-0ef55cfaa219",
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
        "uuid": "b01568a9-9ede-49c7-9ce4-a1cb27150edb",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2b0cb42d-3153-429a-b514-e7c33de48333",
            "actions": [
              {
                "uuid": "ca63e57e-2362-4eb6-a1c0-7abf5f64747f",
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
                "uuid": "23f4ddbc-8dfa-42d2-8386-038f11c3ac37",
                "destination_uuid": "b55476e7-12c2-4059-880a-f2e78602ff89"
              }
            ]
          },
          {
            "uuid": "b55476e7-12c2-4059-880a-f2e78602ff89",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox",
                  "uuid": "75c88210-98e5-48df-9ffa-018b84faeb4d"
                },
                "type": "enter_flow",
                "uuid": "bb0b7c45-20ff-430e-990a-ad7d098b4a50"
              }
            ],
            "exits": [
              {
                "uuid": "17c2ba30-16dd-4a66-92bf-087bb388b423",
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
        "uuid": "7f6f2fb3-d2da-4a51-8bf3-6dcc60524749",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e1d00420-b563-4d20-9c67-6f4de35bb7b1",
            "actions": [
              {
                "uuid": "551c3f79-fa42-471b-84d6-3cc724bc5f64",
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
                "uuid": "ca3d9116-c3cc-458f-9e21-2a05c0e4889f",
                "destination_uuid": "2cce8503-95c3-47bb-9139-1c11ef35e44e"
              }
            ]
          },
          {
            "uuid": "2cce8503-95c3-47bb-9139-1c11ef35e44e",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                  "uuid": "8b38260b-c663-46c9-999f-2b7e4bb40961"
                },
                "type": "enter_flow",
                "uuid": "1e08d96d-3b04-4023-8ecf-a37b22f16f11"
              }
            ],
            "exits": [
              {
                "uuid": "5b42b062-a556-42d9-afb5-948794bb2f1a",
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
        "uuid": "fab73ef1-bec8-4b2c-93d2-5f36ff29ea29",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "baefcd47-fd04-4552-b279-8c3b3068b5b2",
            "actions": [
              {
                "uuid": "e67291ff-3d7e-419f-a5c0-643d340014a2",
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
                "uuid": "05b09fb5-37cb-4ff0-8d71-849db4ff9795",
                "destination_uuid": "e145edbf-11be-4c36-b164-bbbb495d8117"
              }
            ]
          },
          {
            "uuid": "e145edbf-11be-4c36-b164-bbbb495d8117",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                  "uuid": "06eca0b6-0878-459e-a01a-afe2bf4294df"
                },
                "type": "enter_flow",
                "uuid": "b667ce7d-cbd5-48b7-b03a-f4cd1f3e183f"
              }
            ],
            "exits": [
              {
                "uuid": "ccf7b0f4-cec5-447a-82a4-88ba2c9aadfd",
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
        "uuid": "9d1b9381-f468-4363-b400-111806ad3691",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "474b43e4-5896-46db-b060-0e4b62b67b9f",
            "actions": [
              {
                "uuid": "6ee594a5-49ec-4fbe-b6bb-87f84794d586",
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
                "uuid": "c0fe4200-a7a6-4d96-b76b-0a2a0dae5fff",
                "destination_uuid": "89a696b9-36f0-4898-bb6b-4919f7d5562b"
              }
            ]
          },
          {
            "uuid": "89a696b9-36f0-4898-bb6b-4919f7d5562b",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                  "uuid": "56b16c99-af31-4cea-addb-1da8ea534b8f"
                },
                "type": "enter_flow",
                "uuid": "f160da1c-011b-4870-b8dc-f57e68a8c74c"
              }
            ],
            "exits": [
              {
                "uuid": "1e330c08-53ca-457d-9cbd-15b8a5f43d06",
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
        "uuid": "9a34bb39-7da7-499e-960b-ff3527658705",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "01de8ab9-261a-4005-8625-5abb0d42e790",
            "actions": [
              {
                "uuid": "a3329b35-adf8-4cc5-8679-6fe47ef3f7e3",
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
                "uuid": "6c9c31f3-9bbf-4cd5-b7e7-4368b1ecec3e",
                "destination_uuid": "22e16068-1e57-43b0-b9e0-fff371d4d025"
              }
            ]
          },
          {
            "uuid": "22e16068-1e57-43b0-b9e0-fff371d4d025",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/gallery",
                  "uuid": "7ba1cc53-6857-455a-b627-2b2db935057e"
                },
                "type": "enter_flow",
                "uuid": "061486be-7f3c-4441-8152-30a440496580"
              }
            ],
            "exits": [
              {
                "uuid": "65e2ff46-de3d-452b-89bc-10655dd8171e",
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
        "uuid": "7eb156da-238f-4ac9-8509-fc35ad3cd9a0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "40465e8a-12a6-40f6-a2db-44be37c6c11f",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "20ed048f-554a-4eaa-a048-b314b25d732b"
              }
            ],
            "exits": [
              {
                "uuid": "a0823e98-7190-43b4-8b31-47e02c13af20",
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
        "uuid": "cba3c256-844c-4e85-9725-3459956e48fa",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7153b55f-b85a-45ad-a4b4-9c7856e58f6f",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dce31b53-5ba0-4942-b025-c8bb59facf02"
              }
            ],
            "exits": [
              {
                "uuid": "5887a588-f75c-4f37-b385-089ff113a787",
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
        "uuid": "2c093904-03e7-45a9-978c-762c49ff50b9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c32822d9-d9d6-4ec6-8bd8-30d8a9adafcb",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2aedf153-b966-4256-9453-a90519985d8d"
              }
            ],
            "exits": [
              {
                "uuid": "769009fe-e119-443f-9c80-b6ce988d0143",
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
        "uuid": "461151eb-56fc-4ed3-bf00-ca7fc518e22a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1428564e-732a-47fd-afb0-597f91ef00f5",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ce033368-d8dd-4c97-a8f3-34b3651d227b"
              }
            ],
            "exits": [
              {
                "uuid": "323b1911-6fa6-48cd-90b9-d5d10dd85ce0",
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
        "uuid": "1a316e79-4bc2-4bb6-9c9c-18ee8c8c6280",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3fc7b4e7-f910-4b83-b202-aecabd79ea41",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a991eb4e-6fde-4845-8472-506f5459ae60"
              }
            ],
            "exits": [
              {
                "uuid": "7f98fcb7-3ffe-4fc4-ab12-30f8c57742af",
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
        "uuid": "eaf18809-3a2e-4a47-9aad-76425b6bd845",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2c325283-9970-4ffb-acb3-1b8f38e39f6f",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5fe9485e-416c-48c6-bc42-11328106ba7d"
              }
            ],
            "exits": [
              {
                "uuid": "75198374-0f29-4701-af2a-b82bcd9531c5",
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
        "uuid": "6b2d9fc4-e1f0-4d73-b841-ce504dfefdd3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "fd11bc8e-7923-45ef-8659-a2caa0ec11b8",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "acb07e51-9e2c-4be6-bfb4-3ed17a0bb86b"
              }
            ],
            "exits": [
              {
                "uuid": "a5441534-11e1-4e9f-acb3-7a3e58a520ed",
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