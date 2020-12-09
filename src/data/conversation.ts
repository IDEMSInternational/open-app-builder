/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const conversation: FlowTypes.Conversation[] = [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "e90be9b6-f92f-4b38-a77e-4532adc46969",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "47e364ea-df15-409a-9984-cd69e5badc02",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "181664fe-3f79-4ab3-89e0-b154e333839f"
              }
            ],
            "exits": [
              {
                "uuid": "1b8f84c9-63d3-4e3b-9b1c-73af841084c4",
                "destination_uuid": "9c85a174-3762-4d94-b2be-0f3a911a6629"
              }
            ]
          },
          {
            "uuid": "9c85a174-3762-4d94-b2be-0f3a911a6629",
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
                "uuid": "e7250dc4-27fe-4e5e-98e5-924f4ae03e06"
              }
            ],
            "exits": [
              {
                "uuid": "7182b027-f326-4bcc-a5f7-adb74de9fd98",
                "destination_uuid": "8da12c93-042e-40e5-984e-5710411fbc0c"
              }
            ]
          },
          {
            "uuid": "8da12c93-042e-40e5-984e-5710411fbc0c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2b4c8186-d674-4184-88d0-5430e418b425",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "bc58ad0c-d452-432e-b359-aacc9da5bfde",
                  "type": "has_only_phrase",
                  "uuid": "27163f0e-4276-45e4-a6db-103affc37916"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "5f7b7bde-cf6a-4f0f-88e7-bd9e04922ae2",
                  "type": "has_only_phrase",
                  "uuid": "c66519c5-3e6d-441e-94e9-f3b28cb25264"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "a6995497-da84-4d75-bbb3-a5250a6122da",
                  "type": "has_only_phrase",
                  "uuid": "4005bb5f-c213-4db6-92c9-45de43fbf8cb"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "66e170f0-560b-49cb-b48e-3bcb590ba4b7",
                  "type": "has_only_phrase",
                  "uuid": "a9473c9d-292f-42bb-9178-213906bee1db"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "9f54992a-b6bd-4a9b-a109-133321187420",
                  "type": "has_only_phrase",
                  "uuid": "a8176c66-19ba-462b-b668-08b43ae4bc68"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "02d81d7a-0c84-410a-adb9-49f12de068fc",
                  "name": "All Responses",
                  "uuid": "2b4c8186-d674-4184-88d0-5430e418b425"
                },
                {
                  "exit_uuid": "53e95ae8-229d-45a6-a1fe-d88ab7f9bd1b",
                  "name": "First option: launch example_media flow",
                  "uuid": "bc58ad0c-d452-432e-b359-aacc9da5bfde"
                },
                {
                  "exit_uuid": "da0e5421-e07a-43f5-a676-ba74923f4f34",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "5f7b7bde-cf6a-4f0f-88e7-bd9e04922ae2"
                },
                {
                  "exit_uuid": "41c91c4c-6ec8-4e78-b2e6-b643d3b2bc47",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "a6995497-da84-4d75-bbb3-a5250a6122da"
                },
                {
                  "exit_uuid": "184274e1-ae6d-4a73-862b-6881a8f8a1b2",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "66e170f0-560b-49cb-b48e-3bcb590ba4b7"
                },
                {
                  "exit_uuid": "02d494be-c1d0-46d3-8f95-dffe90d667ee",
                  "name": "Stay in this flow.",
                  "uuid": "9f54992a-b6bd-4a9b-a109-133321187420"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "02d81d7a-0c84-410a-adb9-49f12de068fc",
                "destination_uuid": null
              },
              {
                "uuid": "53e95ae8-229d-45a6-a1fe-d88ab7f9bd1b",
                "destination_uuid": "5a287ee1-debc-447e-8449-b22712772516"
              },
              {
                "uuid": "da0e5421-e07a-43f5-a676-ba74923f4f34",
                "destination_uuid": "0ae9d481-7696-469f-ae45-b2d283fe436e"
              },
              {
                "uuid": "41c91c4c-6ec8-4e78-b2e6-b643d3b2bc47",
                "destination_uuid": "21769ba7-d35a-4b18-a9ad-75e4695df6a1"
              },
              {
                "uuid": "184274e1-ae6d-4a73-862b-6881a8f8a1b2",
                "destination_uuid": "804486e4-0a0d-4bc1-b94e-4dcd126974cb"
              },
              {
                "uuid": "02d494be-c1d0-46d3-8f95-dffe90d667ee",
                "destination_uuid": "366f1ae9-9c0e-4e48-80eb-47c516e10883"
              }
            ]
          },
          {
            "uuid": "5a287ee1-debc-447e-8449-b22712772516",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "61e1b81f-8281-4cd6-8033-5b4ceff54985"
                },
                "type": "enter_flow",
                "uuid": "852e9703-9dc5-4a9c-a5f8-62e225899616"
              }
            ],
            "exits": [
              {
                "uuid": "0b8d0534-00f6-4228-ab51-beef6d815df7",
                "destination_uuid": "991a1a4e-06d4-46ec-a528-b805f31fab31"
              },
              {
                "uuid": "3074a08a-f7c4-415c-9a61-0916e9f4991f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c9be9a75-0354-4a5e-9e57-9a3c01e1e9eb",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f2decf49-fb36-4981-82b2-e4eb38dc4463"
                },
                {
                  "uuid": "1949d945-99cf-4e50-b6cf-cab62adec84e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "981a1624-08d5-4dfb-a971-9c48c7bb3a62"
                }
              ],
              "categories": [
                {
                  "uuid": "f2decf49-fb36-4981-82b2-e4eb38dc4463",
                  "name": "Complete",
                  "exit_uuid": "0b8d0534-00f6-4228-ab51-beef6d815df7"
                },
                {
                  "uuid": "981a1624-08d5-4dfb-a971-9c48c7bb3a62",
                  "name": "Expired",
                  "exit_uuid": "3074a08a-f7c4-415c-9a61-0916e9f4991f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f2decf49-fb36-4981-82b2-e4eb38dc4463"
            }
          },
          {
            "uuid": "0ae9d481-7696-469f-ae45-b2d283fe436e",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "45b8108b-c8ff-4b47-9706-8d287de5728b"
                },
                "type": "enter_flow",
                "uuid": "11c64b0a-04a5-4b44-b474-c6f76d454275"
              }
            ],
            "exits": [
              {
                "uuid": "c95e3155-8e6c-48d8-b761-c083fd7f3fae",
                "destination_uuid": "991a1a4e-06d4-46ec-a528-b805f31fab31"
              },
              {
                "uuid": "ed2f53a5-10c7-4bf5-b972-5d506fe30e95",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ed28cd21-a9b2-48b2-a406-66f03cae04bf",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "cf47a63e-dc3d-4676-b100-6b0f59e39387"
                },
                {
                  "uuid": "0f5ab62a-689f-483d-a4b5-97cd5c1aca01",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c38d3808-92a0-4b5d-a114-e83f3f4757bf"
                }
              ],
              "categories": [
                {
                  "uuid": "cf47a63e-dc3d-4676-b100-6b0f59e39387",
                  "name": "Complete",
                  "exit_uuid": "c95e3155-8e6c-48d8-b761-c083fd7f3fae"
                },
                {
                  "uuid": "c38d3808-92a0-4b5d-a114-e83f3f4757bf",
                  "name": "Expired",
                  "exit_uuid": "ed2f53a5-10c7-4bf5-b972-5d506fe30e95"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "cf47a63e-dc3d-4676-b100-6b0f59e39387"
            }
          },
          {
            "uuid": "21769ba7-d35a-4b18-a9ad-75e4695df6a1",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "11a0158b-c804-4cc2-b253-8dc39b683199"
                },
                "type": "enter_flow",
                "uuid": "4cf878e1-a686-4d78-adf1-68c6c050ad3f"
              }
            ],
            "exits": [
              {
                "uuid": "1ff6a583-9d72-4f7b-b1c9-22ad1ff28812",
                "destination_uuid": "991a1a4e-06d4-46ec-a528-b805f31fab31"
              },
              {
                "uuid": "16f4dac3-932e-417e-b03e-1ef68c4cb725",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1cf202a4-7e4d-4cf7-8794-e4d0c047c6d8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "587e660b-0551-4d1a-a5fb-8f5d46096085"
                },
                {
                  "uuid": "ac486e14-4116-4bc1-99e7-f13961925777",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a99ba557-d0a7-49d8-b4c3-43b9ca72af6c"
                }
              ],
              "categories": [
                {
                  "uuid": "587e660b-0551-4d1a-a5fb-8f5d46096085",
                  "name": "Complete",
                  "exit_uuid": "1ff6a583-9d72-4f7b-b1c9-22ad1ff28812"
                },
                {
                  "uuid": "a99ba557-d0a7-49d8-b4c3-43b9ca72af6c",
                  "name": "Expired",
                  "exit_uuid": "16f4dac3-932e-417e-b03e-1ef68c4cb725"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "587e660b-0551-4d1a-a5fb-8f5d46096085"
            }
          },
          {
            "uuid": "804486e4-0a0d-4bc1-b94e-4dcd126974cb",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "2bfdbae7-62a7-4327-a053-7427a24b3bca"
                },
                "type": "enter_flow",
                "uuid": "e9c76ea9-0329-41ed-a4ea-ebda6b570875"
              }
            ],
            "exits": [
              {
                "uuid": "5785010b-5c76-4edc-9f0f-176c671d001b",
                "destination_uuid": "991a1a4e-06d4-46ec-a528-b805f31fab31"
              },
              {
                "uuid": "05566040-727e-4514-b5b8-9ff741de440c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "4166f50d-e38d-4ea8-aedb-bbc6748b52de",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c01d0ce2-5741-4d3e-be5d-ab08a2c1228e"
                },
                {
                  "uuid": "a80d4138-9d04-4070-bdc6-4853c71bf00b",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "8420eb75-7e7f-4c9c-b8f8-6e9b5cea8743"
                }
              ],
              "categories": [
                {
                  "uuid": "c01d0ce2-5741-4d3e-be5d-ab08a2c1228e",
                  "name": "Complete",
                  "exit_uuid": "5785010b-5c76-4edc-9f0f-176c671d001b"
                },
                {
                  "uuid": "8420eb75-7e7f-4c9c-b8f8-6e9b5cea8743",
                  "name": "Expired",
                  "exit_uuid": "05566040-727e-4514-b5b8-9ff741de440c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c01d0ce2-5741-4d3e-be5d-ab08a2c1228e"
            }
          },
          {
            "uuid": "366f1ae9-9c0e-4e48-80eb-47c516e10883",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "56c8f60d-fe53-470a-8ce3-999469084a5a"
              }
            ],
            "exits": [
              {
                "uuid": "6594ad55-a69b-4a5b-a37d-184ecd31ddb4",
                "destination_uuid": "4cfdc5d0-86a9-4f73-ab77-8c1e36bfcc87"
              }
            ]
          },
          {
            "uuid": "991a1a4e-06d4-46ec-a528-b805f31fab31",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cef4083a-e107-409d-ba8d-390aa230813a"
              }
            ],
            "exits": [
              {
                "uuid": "47e72662-c18d-4169-b6be-d1feddf84cfa",
                "destination_uuid": "4cfdc5d0-86a9-4f73-ab77-8c1e36bfcc87"
              }
            ]
          },
          {
            "uuid": "4cfdc5d0-86a9-4f73-ab77-8c1e36bfcc87",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "837c936e-dec5-4cc2-87c7-6e93be76310f"
              }
            ],
            "exits": [
              {
                "uuid": "f95d4561-081e-49b4-a127-4cbcede238c1",
                "destination_uuid": "6e5a928e-ab4f-474b-8bb1-669321870f49"
              }
            ]
          },
          {
            "uuid": "6e5a928e-ab4f-474b-8bb1-669321870f49",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "39dc4a2a-a23c-42eb-873c-3058246f8aca",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "09e6d533-0217-481c-a845-a619fb82e895",
                  "type": "has_only_phrase",
                  "uuid": "d6f1277d-4cb5-4f3c-b111-bd54d5cec9dc"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "01053bad-74b2-4096-89bd-c026d315854e",
                  "type": "has_only_phrase",
                  "uuid": "1f524319-35fe-4b05-80a3-dade8706ef88"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5f73bfbf-8b10-4a5f-9d8a-059ef726ac77",
                  "name": "All Responses",
                  "uuid": "39dc4a2a-a23c-42eb-873c-3058246f8aca"
                },
                {
                  "exit_uuid": "b2ce9b36-2b7b-4007-9b26-acbc8a67e486",
                  "name": "Yes",
                  "uuid": "09e6d533-0217-481c-a845-a619fb82e895"
                },
                {
                  "exit_uuid": "592f33e2-8929-4e67-9ebd-3d13f2180425",
                  "name": "No",
                  "uuid": "01053bad-74b2-4096-89bd-c026d315854e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5f73bfbf-8b10-4a5f-9d8a-059ef726ac77",
                "destination_uuid": null
              },
              {
                "uuid": "b2ce9b36-2b7b-4007-9b26-acbc8a67e486",
                "destination_uuid": "9c85a174-3762-4d94-b2be-0f3a911a6629"
              },
              {
                "uuid": "592f33e2-8929-4e67-9ebd-3d13f2180425",
                "destination_uuid": "ddfe0d48-c8ee-4687-b151-a4f1822c8766"
              }
            ]
          },
          {
            "uuid": "ddfe0d48-c8ee-4687-b151-a4f1822c8766",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c3d61567-2029-4d61-aec8-f5c3f065a719"
              }
            ],
            "exits": [
              {
                "uuid": "ca9f9b50-c001-4c1a-b6af-ff2b765c05f4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "cc7c508c-10e6-4074-9725-430b792cc110",
            "actions": [
              {
                "uuid": "339fb3c9-969d-491b-b4ca-78986f8717d5",
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
                "uuid": "4a6fbf47-9611-4f29-bbb8-eb72e009c9ef",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8b823cc7-6984-4722-b007-77e4dd6b394c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "be17177c-35e9-4d74-a512-e2fb8c8b5512",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e5a47d55-2435-4fcf-b8df-3560d8b24c9e"
              }
            ],
            "exits": [
              {
                "uuid": "05fa9f98-5916-4995-a366-06520436273b",
                "destination_uuid": "f6dc1662-9b59-4fe2-b6f7-06784505bc2d"
              }
            ]
          },
          {
            "uuid": "eccc9222-11ea-44ce-8318-574188d0d67b",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b35a96d0-dedb-4e9c-9cc7-21cbff29827d"
              }
            ],
            "exits": [
              {
                "uuid": "cc6dd296-32b0-4825-918b-20beacae8197",
                "destination_uuid": "18e3a19c-142b-4620-9eca-68828bf24a72"
              }
            ]
          },
          {
            "uuid": "18e3a19c-142b-4620-9eca-68828bf24a72",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "c1725752-013d-4c9a-87ce-9b1cc16e5ac6"
              }
            ],
            "exits": [
              {
                "uuid": "e0b03252-eae3-413e-a522-80b51eed14a1",
                "destination_uuid": "dda3329f-6f7b-4426-88df-0ac117fd1aa1"
              }
            ]
          },
          {
            "uuid": "dda3329f-6f7b-4426-88df-0ac117fd1aa1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a1a22a60-b880-435f-bac6-0163debe1d50",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "72926485-4ed4-477a-a447-b98e8287dcb2",
                  "type": "has_only_phrase",
                  "uuid": "719d11b1-1a09-4807-aff7-95d624a9d096"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "72926485-4ed4-477a-a447-b98e8287dcb2",
                  "type": "has_only_phrase",
                  "uuid": "dde711eb-9229-4138-b62f-6778a1db2e99"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5e8ec608-4d18-4e3f-98e7-f5ca97fbeff5",
                  "name": "All Responses",
                  "uuid": "a1a22a60-b880-435f-bac6-0163debe1d50"
                },
                {
                  "exit_uuid": "cc85af42-ad17-4d79-b855-b7214330aa3a",
                  "name": "image1; image2",
                  "uuid": "72926485-4ed4-477a-a447-b98e8287dcb2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5e8ec608-4d18-4e3f-98e7-f5ca97fbeff5",
                "destination_uuid": null
              },
              {
                "uuid": "cc85af42-ad17-4d79-b855-b7214330aa3a",
                "destination_uuid": "f6990f04-b5b7-48fb-9564-eb686d68f343"
              }
            ]
          },
          {
            "uuid": "f6990f04-b5b7-48fb-9564-eb686d68f343",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "3169b2ed-a139-4d9f-a8cd-6958c41be8ad"
              }
            ],
            "exits": [
              {
                "uuid": "88bb62ea-3f5d-4278-8c35-ee86ba784c64",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f6dc1662-9b59-4fe2-b6f7-06784505bc2d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2dd26932-9fda-4bf1-ad7a-6aafde2df330",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "8247d582-1370-4ac4-bbcc-fff7041404ee",
                  "type": "has_only_phrase",
                  "uuid": "cfb040d5-087d-4294-a167-cfab28f947ff"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "8247d582-1370-4ac4-bbcc-fff7041404ee",
                  "type": "has_only_phrase",
                  "uuid": "73effcdf-daa1-4909-ae60-59d42c7414b4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cc9ad2ef-3449-4c60-a40c-0cf82a2d35db",
                  "name": "All Responses",
                  "uuid": "2dd26932-9fda-4bf1-ad7a-6aafde2df330"
                },
                {
                  "exit_uuid": "0761f019-f251-4fd5-9b1f-d0355f23bdbc",
                  "name": "image1; image2",
                  "uuid": "8247d582-1370-4ac4-bbcc-fff7041404ee"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cc9ad2ef-3449-4c60-a40c-0cf82a2d35db",
                "destination_uuid": "eccc9222-11ea-44ce-8318-574188d0d67b"
              },
              {
                "uuid": "0761f019-f251-4fd5-9b1f-d0355f23bdbc",
                "destination_uuid": "41368c2c-1d25-45c6-bc5e-25d769344761"
              }
            ]
          },
          {
            "uuid": "41368c2c-1d25-45c6-bc5e-25d769344761",
            "actions": [
              {
                "uuid": "37ef49d4-7f46-482e-8868-1b1e0ab5541d",
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
                "uuid": "7941b0e7-39df-4e0d-8287-19bcca8b0968",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "42c315d1-8772-4627-b2b0-3f066c4416ae",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "43584dd8-ddbe-4577-96b2-1834094509b7",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "c7a5cea4-144d-48f0-99c5-fab768ac0805"
              }
            ],
            "exits": [
              {
                "uuid": "7c86d47d-abc1-41f0-b4be-54953a93a2b5",
                "destination_uuid": "7a8a383b-ae09-426a-8394-8bb1f8db794f"
              }
            ]
          },
          {
            "uuid": "7a8a383b-ae09-426a-8394-8bb1f8db794f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7ff12cf4-7337-42fc-83a3-34f78a5c374f",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "603ca373-2a66-4e07-a521-55d01cfddbb7",
                  "type": "has_only_phrase",
                  "uuid": "c9278f0a-2dac-44b8-9b26-201e287eacf7"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "60938088-4bbb-4683-9afe-f9a8c72a8254",
                  "type": "has_only_phrase",
                  "uuid": "f7db8c2d-7b8f-4735-9e25-db9f8171b546"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "554ca383-54a7-4e89-95d2-1db1f0ac3d28",
                  "name": "All Responses",
                  "uuid": "7ff12cf4-7337-42fc-83a3-34f78a5c374f"
                },
                {
                  "exit_uuid": "216deee5-0328-4cf9-aad1-e2f22f465d80",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "603ca373-2a66-4e07-a521-55d01cfddbb7"
                },
                {
                  "exit_uuid": "fbfbf94e-778f-438e-98cb-97cb7b65a6e7",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "60938088-4bbb-4683-9afe-f9a8c72a8254"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "554ca383-54a7-4e89-95d2-1db1f0ac3d28",
                "destination_uuid": null
              },
              {
                "uuid": "216deee5-0328-4cf9-aad1-e2f22f465d80",
                "destination_uuid": "4bfd0b3f-7573-4b81-951f-0e225207adbf"
              },
              {
                "uuid": "fbfbf94e-778f-438e-98cb-97cb7b65a6e7",
                "destination_uuid": "6a1a3102-bca2-4922-a47c-4f5eceec9fbf"
              }
            ]
          },
          {
            "uuid": "4bfd0b3f-7573-4b81-951f-0e225207adbf",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "6208ecef-edce-40e7-b377-9c5a5afa4060"
              }
            ],
            "exits": [
              {
                "uuid": "22e293c8-0b81-4919-99ea-2e80e3bcb285",
                "destination_uuid": "e4964b6e-688a-4b42-bed5-6df8b7b8ac5b"
              }
            ]
          },
          {
            "uuid": "6a1a3102-bca2-4922-a47c-4f5eceec9fbf",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "86882293-b2f7-41d1-bac0-d16695254a6d"
              }
            ],
            "exits": [
              {
                "uuid": "0d0129b2-59d8-4a96-aadc-c6737aeaf2ae",
                "destination_uuid": "e4964b6e-688a-4b42-bed5-6df8b7b8ac5b"
              }
            ]
          },
          {
            "uuid": "e4964b6e-688a-4b42-bed5-6df8b7b8ac5b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "506ea572-0bdb-46ed-b966-850de3175ced",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "c90d5419-0578-41e3-a02d-69defd41782a",
                  "type": "has_only_phrase",
                  "uuid": "3bfb796e-5519-408d-bada-fbe4c1bd4b8b"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "a1cc7233-0c1a-4efe-bf65-f76c6ae940bb",
                  "type": "has_only_phrase",
                  "uuid": "f6418d69-eda7-4c94-a708-cd0739dc92e9"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "38ba99c6-eebf-4628-b7bc-f0c81583b4e9",
                  "type": "has_only_phrase",
                  "uuid": "0af32c53-e134-44c0-b501-2b3dde786a75"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7d0bdaef-1a75-4efa-a491-130c9293771e",
                  "name": "All Responses",
                  "uuid": "506ea572-0bdb-46ed-b966-850de3175ced"
                },
                {
                  "exit_uuid": "411ff763-e335-41ed-b809-d902d0700bcf",
                  "name": "Hello",
                  "uuid": "c90d5419-0578-41e3-a02d-69defd41782a"
                },
                {
                  "exit_uuid": "39aa65ee-e884-40f5-b086-b1a4a505e734",
                  "name": "Goodbye",
                  "uuid": "a1cc7233-0c1a-4efe-bf65-f76c6ae940bb"
                },
                {
                  "exit_uuid": "6aa93efd-cc69-42db-abe3-37eeccd4dba7",
                  "name": "Goodbye",
                  "uuid": "38ba99c6-eebf-4628-b7bc-f0c81583b4e9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7d0bdaef-1a75-4efa-a491-130c9293771e",
                "destination_uuid": null
              },
              {
                "uuid": "411ff763-e335-41ed-b809-d902d0700bcf",
                "destination_uuid": "14686170-9ead-40f4-bc69-4fc2cf77a0f1"
              },
              {
                "uuid": "39aa65ee-e884-40f5-b086-b1a4a505e734",
                "destination_uuid": "c6a376ad-a557-44c1-a586-d96b17e5b199"
              },
              {
                "uuid": "6aa93efd-cc69-42db-abe3-37eeccd4dba7",
                "destination_uuid": "c6a376ad-a557-44c1-a586-d96b17e5b199"
              }
            ]
          },
          {
            "uuid": "14686170-9ead-40f4-bc69-4fc2cf77a0f1",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3135676c-6a55-43ed-a248-3860497828aa"
              }
            ],
            "exits": [
              {
                "uuid": "b5972aa3-4dd8-422d-a989-56c6091fe6eb",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "c6a376ad-a557-44c1-a586-d96b17e5b199",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d92d27c5-994c-4e4b-a610-8a56d6d106a1"
              }
            ],
            "exits": [
              {
                "uuid": "7d322aee-5675-4000-bdd5-b68f719b5b6b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "6d87fb09-22da-4553-b73e-a521b7f1f86f",
            "actions": [
              {
                "uuid": "718ab976-e21a-4555-a162-03479453f987",
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
                "uuid": "5a0795cd-61e3-4175-8bae-19c99f472153",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "942d70db-db38-42fd-9435-8b8c3c0a9505",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3b1ac0f1-7585-4e27-817f-63bebc15800c",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fdd171e7-079c-4df5-a13f-39fecab398b2"
              }
            ],
            "exits": [
              {
                "uuid": "e69c00e8-6ccc-4e38-bdef-2916d49e4a1e",
                "destination_uuid": "ac3dacd3-2e93-4bec-85c3-a5d50df2a029"
              }
            ]
          },
          {
            "uuid": "ac3dacd3-2e93-4bec-85c3-a5d50df2a029",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "78b027cd-12e5-4a58-902c-654362d42992"
              }
            ],
            "exits": [
              {
                "uuid": "76d983b5-b469-4726-9cfc-0e0aea61b176",
                "destination_uuid": "487b6c17-90c7-4ce9-a59a-24fcc4965000"
              }
            ]
          },
          {
            "uuid": "487b6c17-90c7-4ce9-a59a-24fcc4965000",
            "actions": [],
            "exits": [
              {
                "uuid": "c34fbd91-eb36-4413-a209-a5fc2dd67bb5",
                "destination_uuid": "58c50dbb-bbc7-49be-9cfa-e2155363b036"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a6c2d2f2-8bec-407e-87cc-66249c6a3d99",
              "cases": [],
              "categories": [
                {
                  "uuid": "a6c2d2f2-8bec-407e-87cc-66249c6a3d99",
                  "name": "All Responses",
                  "exit_uuid": "c34fbd91-eb36-4413-a209-a5fc2dd67bb5"
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
            "uuid": "58c50dbb-bbc7-49be-9cfa-e2155363b036",
            "actions": [
              {
                "uuid": "b79131d8-2068-411d-8771-f6e1115e1916",
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
                "uuid": "1b5d52a2-51b7-4756-acfa-d40ad0ccb39f",
                "destination_uuid": "b4d3cc34-619c-4869-acf1-0ab0288cee93"
              }
            ]
          },
          {
            "uuid": "b4d3cc34-619c-4869-acf1-0ab0288cee93",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8e3d30c3-3bb9-4086-b7e0-83d91b37c726",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "06d77b14-1512-4c33-a40e-7d8bc6533c36",
                  "type": "has_only_phrase",
                  "uuid": "c5205317-985c-4848-8559-e657474b3c25"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "d43e0dd9-de42-4ce5-9a6c-8d948523aa65",
                  "type": "has_only_phrase",
                  "uuid": "60766308-0fe8-4c48-a012-006af9751fad"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "77b6a2a4-7ca7-4dd6-9d23-5b452527b262",
                  "name": "All Responses",
                  "uuid": "8e3d30c3-3bb9-4086-b7e0-83d91b37c726"
                },
                {
                  "exit_uuid": "92f1fa75-0959-4bb6-92a8-239d0ce0310a",
                  "name": "1",
                  "uuid": "06d77b14-1512-4c33-a40e-7d8bc6533c36"
                },
                {
                  "exit_uuid": "8788505c-cc55-4a09-8574-3cc4f6cc0840",
                  "name": "2",
                  "uuid": "d43e0dd9-de42-4ce5-9a6c-8d948523aa65"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "77b6a2a4-7ca7-4dd6-9d23-5b452527b262",
                "destination_uuid": "6dc061bc-bb8a-4a1a-814e-a06722d8e1f1"
              },
              {
                "uuid": "92f1fa75-0959-4bb6-92a8-239d0ce0310a",
                "destination_uuid": "5d8b0d2c-bd70-4706-a404-718363042d48"
              },
              {
                "uuid": "8788505c-cc55-4a09-8574-3cc4f6cc0840",
                "destination_uuid": "3bcf8dd6-158c-4658-9635-671cf82b8791"
              }
            ]
          },
          {
            "uuid": "5d8b0d2c-bd70-4706-a404-718363042d48",
            "actions": [
              {
                "uuid": "2dffb039-67cc-47dc-8acf-3e28c1bd5385",
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
                "uuid": "de3b616a-5057-4d4d-bc4a-82136985fe3e",
                "destination_uuid": "ba29a58d-c08f-47ac-b74e-d21839d94aab"
              }
            ]
          },
          {
            "uuid": "3bcf8dd6-158c-4658-9635-671cf82b8791",
            "actions": [
              {
                "uuid": "df702cfe-ab10-4927-975b-7180ffd49f2d",
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
                "uuid": "107057b8-5bde-4dc3-9a25-db0b6b44f140",
                "destination_uuid": "b53497a5-cb26-4d7b-ab81-5ff7c876343a"
              }
            ]
          },
          {
            "uuid": "6dc061bc-bb8a-4a1a-814e-a06722d8e1f1",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ab18617e-9fda-4457-b9cd-0aa0c5792a12"
              }
            ],
            "exits": [
              {
                "uuid": "e1472298-25a8-4cee-bafd-b544a8726cfb",
                "destination_uuid": "ec070ad3-5593-4a35-bfe5-118b6d4affc8"
              }
            ]
          },
          {
            "uuid": "ec070ad3-5593-4a35-bfe5-118b6d4affc8",
            "actions": [],
            "exits": [
              {
                "uuid": "2453cbf5-66d9-462e-ab65-a068e29fbdd4",
                "destination_uuid": "4e3873de-c340-4469-84c6-2b7a6e8610c6"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "78461a48-7949-4d12-8f93-8daf9f0b076e",
              "cases": [],
              "categories": [
                {
                  "uuid": "78461a48-7949-4d12-8f93-8daf9f0b076e",
                  "name": "All Responses",
                  "exit_uuid": "2453cbf5-66d9-462e-ab65-a068e29fbdd4"
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
            "uuid": "4e3873de-c340-4469-84c6-2b7a6e8610c6",
            "actions": [
              {
                "uuid": "0c2413cd-7b8f-4dd7-8fb4-088bced5b597",
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
                "uuid": "7c36c0a4-a03b-4e67-a978-1cc83bbbb1c5",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ba29a58d-c08f-47ac-b74e-d21839d94aab",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "be3b181f-9aa0-444d-8a61-a19479b4939e"
              }
            ],
            "exits": [
              {
                "uuid": "ac0f703e-98ae-4ebd-ac34-a872ea42d5fe",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b53497a5-cb26-4d7b-ab81-5ff7c876343a",
            "actions": [
              {
                "uuid": "238c44fd-8069-4d4c-9982-eee0319c0cec",
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
                "uuid": "63ffcee7-577f-4fb0-b995-5facc52702d0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4acd11e3-23c4-4d7b-bd6a-ab7b1bf17c0e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "19780e6d-634c-4f1d-9cb8-50362fea8f85",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "9b1c6c37-847a-4f87-a9f5-be5c4a538667"
              }
            ],
            "exits": [
              {
                "uuid": "d195f420-b304-4b66-aad2-9fd6c93f6110",
                "destination_uuid": "ce026c9a-90ad-4b68-9136-98b98a7b548e"
              }
            ]
          },
          {
            "uuid": "ce026c9a-90ad-4b68-9136-98b98a7b548e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "aa1190f6-c37f-437f-a190-8a4b364fd2b4",
              "cases": [
                {
                  "arguments": [
                    "Go to the story"
                  ],
                  "category_uuid": "39c32180-934a-4ab6-b578-3f66378103ee",
                  "type": "has_only_phrase",
                  "uuid": "93a4c0a6-601a-4ffb-ab35-cea3de6a720b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "25cf45a0-ddfd-4339-88c0-08f3fab27a17",
                  "name": "All Responses",
                  "uuid": "aa1190f6-c37f-437f-a190-8a4b364fd2b4"
                },
                {
                  "exit_uuid": "e6df5e8d-67b8-43ab-8c8e-4eb15afdfa25",
                  "name": "Go to the story",
                  "uuid": "39c32180-934a-4ab6-b578-3f66378103ee"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "25cf45a0-ddfd-4339-88c0-08f3fab27a17",
                "destination_uuid": null
              },
              {
                "uuid": "e6df5e8d-67b8-43ab-8c8e-4eb15afdfa25",
                "destination_uuid": "10f38c3f-6fc3-4da3-82d9-ef093ad567c6"
              }
            ]
          },
          {
            "uuid": "10f38c3f-6fc3-4da3-82d9-ef093ad567c6",
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
                "uuid": "7efbf6d1-3017-45db-bc52-ab389de8b4d4"
              }
            ],
            "exits": [
              {
                "uuid": "8fe54617-d44e-4759-a819-db682305a81e",
                "destination_uuid": "434469f7-7af8-462f-aa2d-7ed4d7e6886a"
              }
            ]
          },
          {
            "uuid": "434469f7-7af8-462f-aa2d-7ed4d7e6886a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a37e0012-1f91-45e0-80d5-4fa6ec0e1981",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9ce149ce-c962-4b5c-9732-dc332ea4d19a",
                  "type": "has_only_phrase",
                  "uuid": "3da89aab-e96a-4523-8716-8954047552b4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0a362082-845e-4308-9e95-d5ef2fcafe8d",
                  "name": "All Responses",
                  "uuid": "a37e0012-1f91-45e0-80d5-4fa6ec0e1981"
                },
                {
                  "exit_uuid": "256c6261-b20e-4e98-8227-711d4a828c8e",
                  "name": "Next",
                  "uuid": "9ce149ce-c962-4b5c-9732-dc332ea4d19a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0a362082-845e-4308-9e95-d5ef2fcafe8d",
                "destination_uuid": null
              },
              {
                "uuid": "256c6261-b20e-4e98-8227-711d4a828c8e",
                "destination_uuid": "c59a0ce9-3597-4c64-b1d6-4b109dfce678"
              }
            ]
          },
          {
            "uuid": "c59a0ce9-3597-4c64-b1d6-4b109dfce678",
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
                "uuid": "028e288e-1dc3-4536-9594-0c046c1417b0"
              }
            ],
            "exits": [
              {
                "uuid": "4cddfca3-cdfe-4a11-adb4-7691960801e6",
                "destination_uuid": "bf837513-bb8c-4f06-890e-c749a2dc3475"
              }
            ]
          },
          {
            "uuid": "bf837513-bb8c-4f06-890e-c749a2dc3475",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3187e2d2-8322-432f-bfcc-c1678f86ae65",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "30b65a79-cceb-4154-b537-68f1d018053d",
                  "type": "has_only_phrase",
                  "uuid": "61875de3-6b77-42ab-834b-e8f8d08cf28d"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "0ef9d7d8-c393-4d5c-bb32-1e8d06e92274",
                  "type": "has_only_phrase",
                  "uuid": "53ceae2e-fa96-446e-b454-1dc8c2e31960"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ef1527d1-9bc4-4300-851f-7b63077ae33d",
                  "name": "All Responses",
                  "uuid": "3187e2d2-8322-432f-bfcc-c1678f86ae65"
                },
                {
                  "exit_uuid": "3612d331-e419-4ad9-8fa1-9b52d5d52d1f",
                  "name": "Previous",
                  "uuid": "30b65a79-cceb-4154-b537-68f1d018053d"
                },
                {
                  "exit_uuid": "41c071a4-849d-4720-aa37-95cf19bc3e6e",
                  "name": "Next",
                  "uuid": "0ef9d7d8-c393-4d5c-bb32-1e8d06e92274"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ef1527d1-9bc4-4300-851f-7b63077ae33d",
                "destination_uuid": null
              },
              {
                "uuid": "3612d331-e419-4ad9-8fa1-9b52d5d52d1f",
                "destination_uuid": "10f38c3f-6fc3-4da3-82d9-ef093ad567c6"
              },
              {
                "uuid": "41c071a4-849d-4720-aa37-95cf19bc3e6e",
                "destination_uuid": "24371061-6ae0-44a1-98f7-3d33884afa5a"
              }
            ]
          },
          {
            "uuid": "24371061-6ae0-44a1-98f7-3d33884afa5a",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4ffc30fd-0144-4453-a586-70b91077885a"
              }
            ],
            "exits": [
              {
                "uuid": "24ec8fb2-d533-4db8-9a4c-2d8563593bfd",
                "destination_uuid": "7bf529b6-a00a-4f5a-9427-9d9442917ea0"
              }
            ]
          },
          {
            "uuid": "7bf529b6-a00a-4f5a-9427-9d9442917ea0",
            "actions": [
              {
                "uuid": "abe62924-8b5d-4647-a279-8088c3dabe23",
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
                "uuid": "cd175b3b-8e07-4b0e-bcfc-525eed4b76d4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "474d1152-791c-400f-9b50-d841d61fa938",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c5520833-00e0-4b71-8675-21e89960c54a",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "23bbf328-f2e5-4648-9c5a-c5ea4060a58b"
              }
            ],
            "exits": [
              {
                "uuid": "72384e03-9844-49e8-8632-4fecf8b67d5a",
                "destination_uuid": "0c2fa90a-3b07-4a97-ada6-fc1e85930a8c"
              }
            ]
          },
          {
            "uuid": "0c2fa90a-3b07-4a97-ada6-fc1e85930a8c",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "b65dd97b-9aba-4021-a80b-95bf77cd6e8c"
              }
            ],
            "exits": [
              {
                "uuid": "dd88128c-56a5-42e9-ad7c-4288a82ce471",
                "destination_uuid": "405ce07e-9fc9-4421-b223-ee24005930b9"
              }
            ]
          },
          {
            "uuid": "405ce07e-9fc9-4421-b223-ee24005930b9",
            "actions": [],
            "exits": [
              {
                "uuid": "61a97a7a-d0d4-4a32-836f-6d52d3e46c09",
                "destination_uuid": "982f723b-7146-4fa9-ab51-ad5bf5c7c53c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0643633f-e4fc-449a-914a-8150c151bc09",
              "cases": [],
              "categories": [
                {
                  "uuid": "0643633f-e4fc-449a-914a-8150c151bc09",
                  "name": "All Responses",
                  "exit_uuid": "61a97a7a-d0d4-4a32-836f-6d52d3e46c09"
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
            "uuid": "982f723b-7146-4fa9-ab51-ad5bf5c7c53c",
            "actions": [
              {
                "uuid": "1fbde9e7-da75-4cff-9df6-c2ce1672e230",
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
                "uuid": "2a495d52-bc82-4e81-ba38-802cfe833327",
                "destination_uuid": "b29027d1-a5b8-4311-b903-a3abb3a94be9"
              }
            ]
          },
          {
            "uuid": "b29027d1-a5b8-4311-b903-a3abb3a94be9",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "600ceeae-338f-4ccc-962c-6cb2afbb5ba6"
                },
                "type": "enter_flow",
                "uuid": "b5fc70e5-7a0b-4aae-90f1-8512a2e69cad"
              }
            ],
            "exits": [
              {
                "uuid": "781b93ed-93ba-44da-aecf-dd621246d95f",
                "destination_uuid": "24cd945a-2f25-4750-9763-92f9f0148a01"
              },
              {
                "uuid": "a8a6f200-5522-4b67-bb1e-0229d9a6382b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "432a11d5-e56b-4f31-863e-d116cd0801b8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "5728f386-5c2b-42ad-8385-be91a9499b88"
                },
                {
                  "uuid": "df65e906-335b-46ff-b01f-5c4c586e7c6f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c065b863-1d74-4a24-81f1-67e7677099fa"
                }
              ],
              "categories": [
                {
                  "uuid": "5728f386-5c2b-42ad-8385-be91a9499b88",
                  "name": "Complete",
                  "exit_uuid": "781b93ed-93ba-44da-aecf-dd621246d95f"
                },
                {
                  "uuid": "c065b863-1d74-4a24-81f1-67e7677099fa",
                  "name": "Expired",
                  "exit_uuid": "a8a6f200-5522-4b67-bb1e-0229d9a6382b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "5728f386-5c2b-42ad-8385-be91a9499b88"
            }
          },
          {
            "uuid": "24cd945a-2f25-4750-9763-92f9f0148a01",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "0f3fa0c6-2315-432d-a47a-816a3324afd2"
              }
            ],
            "exits": [
              {
                "uuid": "2bb386e4-ebd1-4da2-8ab1-ab66ba304836",
                "destination_uuid": "4ca266b3-0829-4458-ad05-4595cd9be795"
              }
            ]
          },
          {
            "uuid": "4ca266b3-0829-4458-ad05-4595cd9be795",
            "actions": [],
            "exits": [
              {
                "uuid": "152a8b03-e46c-4370-b684-1a946478ab46",
                "destination_uuid": "f254b695-f06d-4147-b153-bba54abf856b"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3cc9453e-068d-4994-aec3-03fd5799f21c",
              "cases": [],
              "categories": [
                {
                  "uuid": "3cc9453e-068d-4994-aec3-03fd5799f21c",
                  "name": "All Responses",
                  "exit_uuid": "152a8b03-e46c-4370-b684-1a946478ab46"
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
            "uuid": "f254b695-f06d-4147-b153-bba54abf856b",
            "actions": [
              {
                "uuid": "1413a86e-0004-4457-aa26-a09a749e8024",
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
                "uuid": "11ff3997-78bc-45bf-b329-3d48eea149f1",
                "destination_uuid": "8fd8952e-c73d-4a16-9221-b53ed86d97fd"
              }
            ]
          },
          {
            "uuid": "8fd8952e-c73d-4a16-9221-b53ed86d97fd",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a3ed3e22-a377-4dc0-9cb8-b9892fe7d30b",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "54e8ce7e-b6c7-4d2f-83b9-c03248d72b7d",
                  "type": "has_only_phrase",
                  "uuid": "657120f0-ab2e-4fc4-97c4-58ed0ab457d9"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "f6bd3348-cdd5-4dc1-b356-deffb819c581",
                  "type": "has_only_phrase",
                  "uuid": "f09af01c-d336-4a08-909c-7a01e334ee0c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f17fac11-1c92-42bb-94e4-21da03b5b560",
                  "name": "All Responses",
                  "uuid": "a3ed3e22-a377-4dc0-9cb8-b9892fe7d30b"
                },
                {
                  "exit_uuid": "7c8b35f2-eac1-49dc-a03d-219adba4e3f7",
                  "name": "guide1",
                  "uuid": "54e8ce7e-b6c7-4d2f-83b9-c03248d72b7d"
                },
                {
                  "exit_uuid": "1714be57-74d6-487a-9e55-7197a8ba0478",
                  "name": "guide2",
                  "uuid": "f6bd3348-cdd5-4dc1-b356-deffb819c581"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "f17fac11-1c92-42bb-94e4-21da03b5b560",
                "destination_uuid": null
              },
              {
                "uuid": "7c8b35f2-eac1-49dc-a03d-219adba4e3f7",
                "destination_uuid": "9f68eda5-13c0-4e91-b089-eb8b659d25e4"
              },
              {
                "uuid": "1714be57-74d6-487a-9e55-7197a8ba0478",
                "destination_uuid": "9f2ca5bb-74d8-4dcd-8056-bb85f9a7a41b"
              }
            ]
          },
          {
            "uuid": "9f68eda5-13c0-4e91-b089-eb8b659d25e4",
            "actions": [
              {
                "uuid": "86f10b26-7195-4b70-a03e-ec6f716c64c3",
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
                "uuid": "ca43180e-42c9-499c-91b5-648537b76169",
                "destination_uuid": "0c3d0e3a-93fe-49bb-b564-60274357990d"
              }
            ]
          },
          {
            "uuid": "9f2ca5bb-74d8-4dcd-8056-bb85f9a7a41b",
            "actions": [
              {
                "uuid": "eb5b44b6-8f25-4b43-b5e9-c0241ff11939",
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
                "uuid": "6ee70486-e8a8-4e5c-aaa6-8343af90173d",
                "destination_uuid": "0c3d0e3a-93fe-49bb-b564-60274357990d"
              }
            ]
          },
          {
            "uuid": "0c3d0e3a-93fe-49bb-b564-60274357990d",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "83e93d61-b9ed-4f91-978b-074fd8684624"
              }
            ],
            "exits": [
              {
                "uuid": "f8abe292-5f18-436e-9f53-afc924eddef4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "41fcad34-87d8-4157-8496-90b989546da9",
            "actions": [
              {
                "uuid": "baf4d9a0-f225-4615-9440-a128feb75c94",
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
                "uuid": "85ac9a79-9307-450e-a736-339812ae242f",
                "destination_uuid": "7ab63f69-278b-44b8-8301-bb212aabf0bd"
              }
            ]
          },
          {
            "uuid": "7ab63f69-278b-44b8-8301-bb212aabf0bd",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "baa2efb7-788e-4272-98e6-3ad119f32dde"
                },
                "type": "enter_flow",
                "uuid": "afffa9a8-37ac-4f5f-ab58-12082f718b91"
              }
            ],
            "exits": [
              {
                "uuid": "4a0a27bc-81de-4878-a248-dce4415efa8a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ee04d32d-e016-45d6-a22c-d6ffcced8691",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "cf5366a9-43c1-47a7-bd3d-5b37929a63a7",
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
                "uuid": "cbb4cab1-6d41-4376-9425-c7d591b15fd7"
              }
            ],
            "exits": [
              {
                "uuid": "13c3e608-2cb5-46eb-af90-eb0cdbda422f",
                "destination_uuid": "4c4f41c2-2b92-4cd4-b0e9-9a0d0317d10e"
              }
            ]
          },
          {
            "uuid": "4c4f41c2-2b92-4cd4-b0e9-9a0d0317d10e",
            "actions": [],
            "exits": [
              {
                "uuid": "b0dcc5d3-502c-4982-aa26-1c651b62d2e2",
                "destination_uuid": "d8ccbc0c-3a37-4e00-985c-1f87730352d9"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "1283e882-c426-43db-827f-bd5941e382bc",
              "cases": [],
              "categories": [
                {
                  "uuid": "1283e882-c426-43db-827f-bd5941e382bc",
                  "name": "All Responses",
                  "exit_uuid": "b0dcc5d3-502c-4982-aa26-1c651b62d2e2"
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
            "uuid": "d8ccbc0c-3a37-4e00-985c-1f87730352d9",
            "actions": [
              {
                "uuid": "f8b6825f-ebd0-44e2-8006-52f3a12e34f1",
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
                "uuid": "992cedd6-990a-429d-a91d-d44c6e952738",
                "destination_uuid": "af47576f-3b61-4154-84b7-bbe0919ef509"
              }
            ]
          },
          {
            "uuid": "af47576f-3b61-4154-84b7-bbe0919ef509",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "946ba48d-cd4b-43b7-8e23-2af88b726f4c"
              }
            ],
            "exits": [
              {
                "uuid": "5471a504-972c-4b16-be44-7d18ce08f110",
                "destination_uuid": "b4276b3a-b670-4007-a45a-fe8f70bb7d5a"
              }
            ]
          },
          {
            "uuid": "b4276b3a-b670-4007-a45a-fe8f70bb7d5a",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b53a65a6-1673-4ff3-9828-0c01443a3d0b"
              }
            ],
            "exits": [
              {
                "uuid": "68917483-361e-4272-b3e0-cdd67f0612d0",
                "destination_uuid": "76547d60-74b9-4ff9-88db-e7583332baa0"
              }
            ]
          },
          {
            "uuid": "76547d60-74b9-4ff9-88db-e7583332baa0",
            "actions": [
              {
                "flow": {
                  "name": "calm_5",
                  "uuid": "7fbe3538-fdf8-4a90-b620-ae2ecb4e6f68"
                },
                "type": "enter_flow",
                "uuid": "1182fbad-2026-4341-92ab-432d45b66612"
              }
            ],
            "exits": [
              {
                "uuid": "4bd5f408-8e77-459c-9d46-bde6fd3d54e2",
                "destination_uuid": "40e9033b-1bc1-452e-ba40-0b1a5359ab73"
              },
              {
                "uuid": "02bf0312-86b1-422c-918c-e051d04a417b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "0f73c080-7caa-43b8-ab1c-1d229943d103",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f221af97-397d-409f-acc9-4e20a2dc81de"
                },
                {
                  "uuid": "374845f9-fd92-4c46-a1e6-1a94e5eb59b0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "752adc25-d52d-4cbe-b167-f4f6878a8fa5"
                }
              ],
              "categories": [
                {
                  "uuid": "f221af97-397d-409f-acc9-4e20a2dc81de",
                  "name": "Complete",
                  "exit_uuid": "4bd5f408-8e77-459c-9d46-bde6fd3d54e2"
                },
                {
                  "uuid": "752adc25-d52d-4cbe-b167-f4f6878a8fa5",
                  "name": "Expired",
                  "exit_uuid": "02bf0312-86b1-422c-918c-e051d04a417b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f221af97-397d-409f-acc9-4e20a2dc81de"
            }
          },
          {
            "uuid": "40e9033b-1bc1-452e-ba40-0b1a5359ab73",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "420d6144-67c0-4546-bcb1-09f3bf4bd131"
              }
            ],
            "exits": [
              {
                "uuid": "041a48e3-b626-4163-b690-fd04d99ce5c2",
                "destination_uuid": "f599b815-1307-41f2-88a7-c065204d0bad"
              }
            ]
          },
          {
            "uuid": "f599b815-1307-41f2-88a7-c065204d0bad",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "8efea5a8-aa51-4829-9d3b-f558db9b1bb2"
              }
            ],
            "exits": [
              {
                "uuid": "5ab87e5f-5011-408d-ae72-8d3f88aed802",
                "destination_uuid": "572cab57-5002-4038-baad-6f0954813cb1"
              }
            ]
          },
          {
            "uuid": "572cab57-5002-4038-baad-6f0954813cb1",
            "actions": [],
            "exits": [
              {
                "uuid": "d5aa526a-5433-4526-85e7-c7baf8d51432",
                "destination_uuid": "cbda9a7f-ece6-4d2b-b655-2ed6bdabcabe"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e5054348-4a9d-48a4-91c8-56201b11130e",
              "cases": [],
              "categories": [
                {
                  "uuid": "e5054348-4a9d-48a4-91c8-56201b11130e",
                  "name": "All Responses",
                  "exit_uuid": "d5aa526a-5433-4526-85e7-c7baf8d51432"
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
            "uuid": "cbda9a7f-ece6-4d2b-b655-2ed6bdabcabe",
            "actions": [
              {
                "uuid": "7d9b7527-2fc6-4f83-b357-3ea70975dd60",
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
                "uuid": "3582a74f-12a3-4309-9151-5b3fc459657d",
                "destination_uuid": "14a27072-4215-48a5-a466-334563a89e8d"
              }
            ]
          },
          {
            "uuid": "14a27072-4215-48a5-a466-334563a89e8d",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0d79f46b-00a5-4805-9359-88026c70b879"
              }
            ],
            "exits": [
              {
                "uuid": "50c09a25-591c-4035-a809-d59ad4a8a5e3",
                "destination_uuid": "48d39759-c2fc-4491-bf06-9e3c04bc920e"
              }
            ]
          },
          {
            "uuid": "48d39759-c2fc-4491-bf06-9e3c04bc920e",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6526eb6a-6ba3-4a14-9981-a7ccf4374464"
              }
            ],
            "exits": [
              {
                "uuid": "4f76d6ba-c7b9-44ba-bcfc-cfe117a20a61",
                "destination_uuid": "63347193-ef98-4983-8c91-5a96324050ff"
              }
            ]
          },
          {
            "uuid": "63347193-ef98-4983-8c91-5a96324050ff",
            "actions": [
              {
                "uuid": "6255b6b5-6cc4-4bd8-91ad-f2ec7b63ecd3",
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
                "uuid": "b412fa77-e1d6-4a1a-a3cd-c00054b9eb8f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "aecb2f88-37c1-405d-ad58-fb10278cf087",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "978bd4d6-c66d-4e21-83ad-6bc030bb8015",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "906bd9d3-4a56-432d-8968-c056bae32a0b"
              }
            ],
            "exits": [
              {
                "uuid": "f6c13afb-b532-4aa4-8116-187a00385120",
                "destination_uuid": "f35ec1b3-3743-4926-ab67-2bfaf54e03bf"
              }
            ]
          },
          {
            "uuid": "f35ec1b3-3743-4926-ab67-2bfaf54e03bf",
            "actions": [
              {
                "uuid": "ed70e49e-46ec-4cf7-91f4-cbdfcebd103c",
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
                "uuid": "86c16511-2454-421d-b266-f3205bc5bc30",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "87165861-d783-430e-8ff4-e0bcec61e998",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9f2cdb0d-1fa0-44bb-a6a3-28962934a7a7",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c7eed4e1-9a09-4292-a089-ce00de5178a0"
              }
            ],
            "exits": [
              {
                "uuid": "34289e8e-608e-4b0d-9b05-4a074f0a3a65",
                "destination_uuid": "1461d576-e43b-437f-8bdd-b97cb20233a4"
              }
            ]
          },
          {
            "uuid": "1461d576-e43b-437f-8bdd-b97cb20233a4",
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
                "uuid": "b3fafb67-44e2-4d3c-ad6c-1a27ea407531"
              }
            ],
            "exits": [
              {
                "uuid": "44823c95-b5c3-4cf5-b82d-1bead6f9be6e",
                "destination_uuid": "43035811-dba1-402f-9c0c-4a6c37836034"
              }
            ]
          },
          {
            "uuid": "43035811-dba1-402f-9c0c-4a6c37836034",
            "actions": [],
            "exits": [
              {
                "uuid": "8e0f6cc3-2ba2-4514-9c12-8a4cf0e4cf9b",
                "destination_uuid": "a4929e34-3754-4d4c-807a-6c1128121635"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "82b1cc1d-e593-4b5d-8b5b-48a99948d01d",
              "cases": [],
              "categories": [
                {
                  "uuid": "82b1cc1d-e593-4b5d-8b5b-48a99948d01d",
                  "name": "All Responses",
                  "exit_uuid": "8e0f6cc3-2ba2-4514-9c12-8a4cf0e4cf9b"
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
            "uuid": "a4929e34-3754-4d4c-807a-6c1128121635",
            "actions": [
              {
                "uuid": "38a36dad-4910-4668-bc49-6854315d2bd3",
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
                "uuid": "0bbd73e9-8afa-4022-b662-7c9d23c1b3a9",
                "destination_uuid": "5304214e-f728-43d5-8e7f-367c379d3d59"
              }
            ]
          },
          {
            "uuid": "5304214e-f728-43d5-8e7f-367c379d3d59",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8eec0fc5-c7be-4aa0-94d7-4c5e66c61c13",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "274dcf4e-71e8-40c8-a2b9-59101565ae5d",
                  "type": "has_only_phrase",
                  "uuid": "461a0126-e371-4071-9451-a3693c48ba65"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "274dcf4e-71e8-40c8-a2b9-59101565ae5d",
                  "type": "has_only_phrase",
                  "uuid": "837310c3-f42e-475b-81ed-37518b30fa3b"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "274dcf4e-71e8-40c8-a2b9-59101565ae5d",
                  "type": "has_only_phrase",
                  "uuid": "e7c48add-c7e3-4cd7-b2be-f084da8992ac"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "274dcf4e-71e8-40c8-a2b9-59101565ae5d",
                  "type": "has_only_phrase",
                  "uuid": "2bbddcd9-3f05-4d36-9661-b1f85c76df03"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "65a7eae5-ae49-46c0-9a74-737326afe2d2",
                  "type": "has_only_phrase",
                  "uuid": "e3b6d937-10f5-4cb2-a066-a21f8aa6ae26"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "65a7eae5-ae49-46c0-9a74-737326afe2d2",
                  "type": "has_only_phrase",
                  "uuid": "60035575-54dd-41d3-a932-01ae25b5b1bc"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "65a7eae5-ae49-46c0-9a74-737326afe2d2",
                  "type": "has_only_phrase",
                  "uuid": "edc4e61e-c9a3-4e3a-90d3-54a08d31f04d"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "65a7eae5-ae49-46c0-9a74-737326afe2d2",
                  "type": "has_only_phrase",
                  "uuid": "71baa15b-9f75-44ff-97b9-4649e5cbfd84"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "da63756a-ed12-41de-9af9-0f435044263b",
                  "name": "All Responses",
                  "uuid": "8eec0fc5-c7be-4aa0-94d7-4c5e66c61c13"
                },
                {
                  "exit_uuid": "b923bf0b-c011-4461-ba4a-330d737d2d70",
                  "name": "0;1;2;3",
                  "uuid": "274dcf4e-71e8-40c8-a2b9-59101565ae5d"
                },
                {
                  "exit_uuid": "904a51f9-545d-4014-820c-9e6fb7c85f4c",
                  "name": "4;5;6;7",
                  "uuid": "65a7eae5-ae49-46c0-9a74-737326afe2d2"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "da63756a-ed12-41de-9af9-0f435044263b",
                "destination_uuid": null
              },
              {
                "uuid": "b923bf0b-c011-4461-ba4a-330d737d2d70",
                "destination_uuid": "c1d6e3de-d7f3-4de7-9e9d-ea5b264c0f94"
              },
              {
                "uuid": "904a51f9-545d-4014-820c-9e6fb7c85f4c",
                "destination_uuid": "39ad83ca-fe26-4a13-92d2-e604d1831714"
              }
            ]
          },
          {
            "uuid": "c1d6e3de-d7f3-4de7-9e9d-ea5b264c0f94",
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
                "uuid": "77cd6cc4-0645-4b78-8675-4b2bee393f5a"
              }
            ],
            "exits": [
              {
                "uuid": "4dba6b32-9aab-44b0-bc8b-417540d4d5fe",
                "destination_uuid": "e7a0298c-ac9c-45e4-b6df-4138e7185173"
              }
            ]
          },
          {
            "uuid": "39ad83ca-fe26-4a13-92d2-e604d1831714",
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
                "uuid": "d908cb35-0424-4e08-b424-389dc152a16f"
              }
            ],
            "exits": [
              {
                "uuid": "8344ccda-9d23-4e70-a7e9-2e61cfd14ec2",
                "destination_uuid": "e7a0298c-ac9c-45e4-b6df-4138e7185173"
              }
            ]
          },
          {
            "uuid": "e7a0298c-ac9c-45e4-b6df-4138e7185173",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ddd4b201-a059-4af8-9d42-2230f48d1db9",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "0341f089-6185-4df6-a7dd-5fa1eeb3b926",
                  "type": "has_only_phrase",
                  "uuid": "05cbd7c0-60b3-43ee-9cc8-6a18d5e5335e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "32c734fc-1776-4e92-bd24-bf0c244da2d7",
                  "name": "All Responses",
                  "uuid": "ddd4b201-a059-4af8-9d42-2230f48d1db9"
                },
                {
                  "exit_uuid": "aa8c2752-1160-411a-8dfd-4b6b303f7132",
                  "name": "Next",
                  "uuid": "0341f089-6185-4df6-a7dd-5fa1eeb3b926"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "32c734fc-1776-4e92-bd24-bf0c244da2d7",
                "destination_uuid": null
              },
              {
                "uuid": "aa8c2752-1160-411a-8dfd-4b6b303f7132",
                "destination_uuid": "e8246d26-09cb-4dd6-b9e9-1e0d0b9efc6e"
              }
            ]
          },
          {
            "uuid": "e8246d26-09cb-4dd6-b9e9-1e0d0b9efc6e",
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
                "uuid": "85f99ee5-aec3-43c2-a686-95a4c9fb148f"
              }
            ],
            "exits": [
              {
                "uuid": "dee546f3-45d4-44ff-a0e8-29723286080e",
                "destination_uuid": "869aaa8f-8dc1-4062-af7b-89e49d4bb32c"
              }
            ]
          },
          {
            "uuid": "869aaa8f-8dc1-4062-af7b-89e49d4bb32c",
            "actions": [],
            "exits": [
              {
                "uuid": "20f2472b-62a6-48fc-86aa-7903d1cfd71b",
                "destination_uuid": "0214c6da-44d4-4715-8470-277fb9961f7f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "75168176-0bd5-45f6-8f4b-4767e016212b",
              "cases": [],
              "categories": [
                {
                  "uuid": "75168176-0bd5-45f6-8f4b-4767e016212b",
                  "name": "All Responses",
                  "exit_uuid": "20f2472b-62a6-48fc-86aa-7903d1cfd71b"
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
            "uuid": "0214c6da-44d4-4715-8470-277fb9961f7f",
            "actions": [
              {
                "uuid": "4506a579-a4b6-4848-896d-8d0fcc28e07f",
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
                "uuid": "80ff54f4-5c19-4646-8451-12e9d7107e44",
                "destination_uuid": "6211d219-e53b-4f92-a52c-3764c3c2b06e"
              }
            ]
          },
          {
            "uuid": "6211d219-e53b-4f92-a52c-3764c3c2b06e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "da2d3aae-ce71-42be-b7bb-cc0c025bb97f",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "f83f446a-b6c2-4266-a5b0-4bf3c3eea6b9",
                  "type": "has_only_phrase",
                  "uuid": "7075cee3-735b-4867-b5a9-aeb3c0f5f2fb"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "f83f446a-b6c2-4266-a5b0-4bf3c3eea6b9",
                  "type": "has_only_phrase",
                  "uuid": "216651bf-aeff-4ffa-bfd7-ea647eaa92f6"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "f83f446a-b6c2-4266-a5b0-4bf3c3eea6b9",
                  "type": "has_only_phrase",
                  "uuid": "f1b55916-3173-40fc-89b1-24acd7a5a8e3"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "f83f446a-b6c2-4266-a5b0-4bf3c3eea6b9",
                  "type": "has_only_phrase",
                  "uuid": "43677e03-201b-4e0f-ba5a-cac3a5e1aa94"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "f83f446a-b6c2-4266-a5b0-4bf3c3eea6b9",
                  "type": "has_only_phrase",
                  "uuid": "870fe7ec-ca0b-45e6-aea1-1c86dcf10bf7"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "0da3ea41-e915-4cb7-852f-e69f063d193a",
                  "type": "has_only_phrase",
                  "uuid": "53cd8585-6dcc-45b3-8d7e-55de1ebd49b5"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "0da3ea41-e915-4cb7-852f-e69f063d193a",
                  "type": "has_only_phrase",
                  "uuid": "22977f52-4ac0-4cb9-a090-75c6f04beec0"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "0da3ea41-e915-4cb7-852f-e69f063d193a",
                  "type": "has_only_phrase",
                  "uuid": "0dcaed8a-2aba-417b-bbda-ef7d2cb5782e"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "0da3ea41-e915-4cb7-852f-e69f063d193a",
                  "type": "has_only_phrase",
                  "uuid": "a0da0dfb-77af-4d81-817e-c1e7024004e0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "21c84863-b362-4659-988a-411b93f87f45",
                  "name": "All Responses",
                  "uuid": "da2d3aae-ce71-42be-b7bb-cc0c025bb97f"
                },
                {
                  "exit_uuid": "528fc583-82a0-44c2-80c9-7da2c4184aba",
                  "name": "0;1;2;3;4",
                  "uuid": "f83f446a-b6c2-4266-a5b0-4bf3c3eea6b9"
                },
                {
                  "exit_uuid": "42f5ac1e-df65-4df7-8198-1cf7cb28d542",
                  "name": "5;6;7;8",
                  "uuid": "0da3ea41-e915-4cb7-852f-e69f063d193a"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "21c84863-b362-4659-988a-411b93f87f45",
                "destination_uuid": null
              },
              {
                "uuid": "528fc583-82a0-44c2-80c9-7da2c4184aba",
                "destination_uuid": "06b99a91-f832-4914-8540-6a90e73ca1a0"
              },
              {
                "uuid": "42f5ac1e-df65-4df7-8198-1cf7cb28d542",
                "destination_uuid": "fa0a4401-550d-4c1e-b05a-cb63d82413fd"
              }
            ]
          },
          {
            "uuid": "06b99a91-f832-4914-8540-6a90e73ca1a0",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "3ddaf385-1297-4a84-9e7a-db2e9c689a05"
              }
            ],
            "exits": [
              {
                "uuid": "1d357ecc-c50d-4c5e-b35a-a2e49ab05db5",
                "destination_uuid": "b075d957-af1b-4f57-9520-c160628d9b6d"
              }
            ]
          },
          {
            "uuid": "fa0a4401-550d-4c1e-b05a-cb63d82413fd",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "63d00e24-291d-4893-8533-b1666a0a0f4e"
              }
            ],
            "exits": [
              {
                "uuid": "9b94cd18-a6bc-4d40-adce-464ec748ad5a",
                "destination_uuid": "b075d957-af1b-4f57-9520-c160628d9b6d"
              }
            ]
          },
          {
            "uuid": "b075d957-af1b-4f57-9520-c160628d9b6d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e451f707-8cc9-45b8-a804-a8c8dfc20156",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9b7867a0-72b3-4f95-ab73-7c4edfaafdc7",
                  "type": "has_only_phrase",
                  "uuid": "3112d5f6-50ba-4651-beb4-b43d6d3c0dcb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "322d8a8b-8b23-4b0a-a491-facb6b4f0bf9",
                  "name": "All Responses",
                  "uuid": "e451f707-8cc9-45b8-a804-a8c8dfc20156"
                },
                {
                  "exit_uuid": "27983b84-4a96-4db1-9b75-9f8ec989f7be",
                  "name": "Next",
                  "uuid": "9b7867a0-72b3-4f95-ab73-7c4edfaafdc7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "322d8a8b-8b23-4b0a-a491-facb6b4f0bf9",
                "destination_uuid": null
              },
              {
                "uuid": "27983b84-4a96-4db1-9b75-9f8ec989f7be",
                "destination_uuid": "fe17c0b3-ada5-4816-8193-4f259e9fc66c"
              }
            ]
          },
          {
            "uuid": "fe17c0b3-ada5-4816-8193-4f259e9fc66c",
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
                "uuid": "b0598c6d-307b-4f2a-a10e-d4635cbd33a9"
              }
            ],
            "exits": [
              {
                "uuid": "a64b8cf8-17f4-427c-a028-68469cc39bf8",
                "destination_uuid": "6cedae20-5139-4cbc-a851-0e758ac2a78e"
              }
            ]
          },
          {
            "uuid": "6cedae20-5139-4cbc-a851-0e758ac2a78e",
            "actions": [],
            "exits": [
              {
                "uuid": "a4bcdadd-3d06-4f1c-a50a-d070b761df74",
                "destination_uuid": "0d3150d7-3e3b-4ae6-ab67-73b501194250"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "066f76e0-2b4f-463d-9cb5-42b6f0b4f702",
              "cases": [],
              "categories": [
                {
                  "uuid": "066f76e0-2b4f-463d-9cb5-42b6f0b4f702",
                  "name": "All Responses",
                  "exit_uuid": "a4bcdadd-3d06-4f1c-a50a-d070b761df74"
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
            "uuid": "0d3150d7-3e3b-4ae6-ab67-73b501194250",
            "actions": [
              {
                "uuid": "cb8c7308-5a00-44f3-a90c-3dec3dfa871d",
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
                "uuid": "c15215af-e09d-4daa-8492-f9383d6895fd",
                "destination_uuid": "703d4e70-b755-45a8-b8e5-d28c19847b99"
              }
            ]
          },
          {
            "uuid": "703d4e70-b755-45a8-b8e5-d28c19847b99",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "51780e72-da88-455d-8e79-48546d72edde",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "ce96aa4a-89e8-41e2-a71b-2824e1b36ffe",
                  "type": "has_only_phrase",
                  "uuid": "26a8b6c9-4fa3-41c7-be91-483ba9dc33e1"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "ce96aa4a-89e8-41e2-a71b-2824e1b36ffe",
                  "type": "has_only_phrase",
                  "uuid": "1bb53d3a-3bcd-4f1a-bc16-b67f7279faa6"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "ce96aa4a-89e8-41e2-a71b-2824e1b36ffe",
                  "type": "has_only_phrase",
                  "uuid": "e442fe7c-81a1-4e37-a2cb-7b8cd14d35bf"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "9490cb9f-2c3f-41a3-9af5-bf29a2b3e767",
                  "type": "has_only_phrase",
                  "uuid": "34c003d1-a01a-4cd7-a748-8a17bfa212cc"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "9490cb9f-2c3f-41a3-9af5-bf29a2b3e767",
                  "type": "has_only_phrase",
                  "uuid": "67c5d6b7-851b-4c6d-889d-0b61ea2e5398"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "9490cb9f-2c3f-41a3-9af5-bf29a2b3e767",
                  "type": "has_only_phrase",
                  "uuid": "6ce3edd2-21d1-444e-b6c3-d4fab5a61a77"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "9490cb9f-2c3f-41a3-9af5-bf29a2b3e767",
                  "type": "has_only_phrase",
                  "uuid": "57385767-12bb-4ce9-ba17-1b7895f840ea"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "9490cb9f-2c3f-41a3-9af5-bf29a2b3e767",
                  "type": "has_only_phrase",
                  "uuid": "cdf945da-d59a-4fc5-90af-516519c1ec73"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1b9334c2-0841-4c8c-948d-f7f955d4dd3e",
                  "name": "All Responses",
                  "uuid": "51780e72-da88-455d-8e79-48546d72edde"
                },
                {
                  "exit_uuid": "39732943-4fe1-4594-8757-42ebd02e56e4",
                  "name": "0;1;2",
                  "uuid": "ce96aa4a-89e8-41e2-a71b-2824e1b36ffe"
                },
                {
                  "exit_uuid": "3c8b1416-48fa-467d-a32f-8a7e16c1537e",
                  "name": "3;4;5;6;7",
                  "uuid": "9490cb9f-2c3f-41a3-9af5-bf29a2b3e767"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "1b9334c2-0841-4c8c-948d-f7f955d4dd3e",
                "destination_uuid": null
              },
              {
                "uuid": "39732943-4fe1-4594-8757-42ebd02e56e4",
                "destination_uuid": "45ce795c-85d5-4271-8175-1d29125bf3f7"
              },
              {
                "uuid": "3c8b1416-48fa-467d-a32f-8a7e16c1537e",
                "destination_uuid": "f0bc843f-09ea-43bc-ad1f-0b49ad676df7"
              }
            ]
          },
          {
            "uuid": "45ce795c-85d5-4271-8175-1d29125bf3f7",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "fd26cf0f-8ece-4b69-b0e5-75d2922acfdd"
              }
            ],
            "exits": [
              {
                "uuid": "ce1caaf1-0044-4be7-9ce9-6f74ff63ecef",
                "destination_uuid": "faa84733-8e05-44a4-a7d3-d57737edca93"
              }
            ]
          },
          {
            "uuid": "f0bc843f-09ea-43bc-ad1f-0b49ad676df7",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "0f2cc68b-404c-463d-a398-a36b7232a925"
              }
            ],
            "exits": [
              {
                "uuid": "a059be48-dc22-4521-82c7-b6bd38c003b7",
                "destination_uuid": "faa84733-8e05-44a4-a7d3-d57737edca93"
              }
            ]
          },
          {
            "uuid": "faa84733-8e05-44a4-a7d3-d57737edca93",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3a9be654-291b-4ccd-a32c-0bb5b46496c1",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "378aa8f8-c3f0-47c2-a8b8-808998251304",
                  "type": "has_only_phrase",
                  "uuid": "04a42b17-c2c1-45ac-89a8-7d09e209b595"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6f282ad5-5bc6-41d6-a00a-fcc290f66103",
                  "name": "All Responses",
                  "uuid": "3a9be654-291b-4ccd-a32c-0bb5b46496c1"
                },
                {
                  "exit_uuid": "3bb4ef68-8c2c-409b-8e19-5f6512f2bfed",
                  "name": "Next",
                  "uuid": "378aa8f8-c3f0-47c2-a8b8-808998251304"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6f282ad5-5bc6-41d6-a00a-fcc290f66103",
                "destination_uuid": null
              },
              {
                "uuid": "3bb4ef68-8c2c-409b-8e19-5f6512f2bfed",
                "destination_uuid": "067670bf-5438-4765-aa43-e27e997226a1"
              }
            ]
          },
          {
            "uuid": "067670bf-5438-4765-aa43-e27e997226a1",
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
                "uuid": "5651bc00-5302-4f50-8a74-a31d82f1e0b7"
              }
            ],
            "exits": [
              {
                "uuid": "e1f3d5f4-1b34-4943-ae4b-f64219ea3e27",
                "destination_uuid": "555b33fa-a906-4277-aed7-a04da5bd6894"
              }
            ]
          },
          {
            "uuid": "555b33fa-a906-4277-aed7-a04da5bd6894",
            "actions": [],
            "exits": [
              {
                "uuid": "adbe3959-95b1-4847-8c9c-4df2313a5746",
                "destination_uuid": "59632fa7-8fa5-49a0-924d-b4dfd088ce96"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ce9e5c7d-9e98-4e9b-ab70-a7e84e4d29d2",
              "cases": [],
              "categories": [
                {
                  "uuid": "ce9e5c7d-9e98-4e9b-ab70-a7e84e4d29d2",
                  "name": "All Responses",
                  "exit_uuid": "adbe3959-95b1-4847-8c9c-4df2313a5746"
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
            "uuid": "59632fa7-8fa5-49a0-924d-b4dfd088ce96",
            "actions": [
              {
                "uuid": "f4452c67-2303-4bc5-9b10-c909c3432355",
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
                "uuid": "131a1f41-a5fa-49bc-b0b2-cf3aee3d1657",
                "destination_uuid": "2af9e64a-ddc4-476a-9cd3-f4d212f40a3f"
              }
            ]
          },
          {
            "uuid": "2af9e64a-ddc4-476a-9cd3-f4d212f40a3f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "59aa91f7-b275-49b7-8fd0-29596f463193",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "14e160ed-1a25-4474-a5f0-490d582fca85",
                  "type": "has_only_phrase",
                  "uuid": "72db2cae-ff13-40bb-a6f0-73c6f17f1eeb"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "14e160ed-1a25-4474-a5f0-490d582fca85",
                  "type": "has_only_phrase",
                  "uuid": "62f03287-c307-46ca-b082-f053232cfd4b"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "a3c23daa-bcba-4b45-9691-8665b8364a8b",
                  "type": "has_only_phrase",
                  "uuid": "581621e6-2df7-4e78-8efd-5a9ecd552d65"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "a3c23daa-bcba-4b45-9691-8665b8364a8b",
                  "type": "has_only_phrase",
                  "uuid": "881ad2ac-bbb0-407c-b6d4-0e903cc915c5"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "a3c23daa-bcba-4b45-9691-8665b8364a8b",
                  "type": "has_only_phrase",
                  "uuid": "9abf5316-cc78-451f-8260-263b87814fc7"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "a3c23daa-bcba-4b45-9691-8665b8364a8b",
                  "type": "has_only_phrase",
                  "uuid": "2c162dac-0659-4eb7-89f8-cf57e0644858"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "a3c23daa-bcba-4b45-9691-8665b8364a8b",
                  "type": "has_only_phrase",
                  "uuid": "f44f8ca4-3e38-40a3-ad5f-1782a67fde41"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "a3c23daa-bcba-4b45-9691-8665b8364a8b",
                  "type": "has_only_phrase",
                  "uuid": "dcc9c68a-3860-413f-8790-133485deac76"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dac52c9e-de87-4394-a548-cf9b6408da3d",
                  "name": "All Responses",
                  "uuid": "59aa91f7-b275-49b7-8fd0-29596f463193"
                },
                {
                  "exit_uuid": "31e565b5-d6e0-42f5-81dd-a56f7f8997e8",
                  "name": "0;1",
                  "uuid": "14e160ed-1a25-4474-a5f0-490d582fca85"
                },
                {
                  "exit_uuid": "1b86a51e-8bd1-40f9-826d-6955df37abfb",
                  "name": "2;3;4;5;6;7",
                  "uuid": "a3c23daa-bcba-4b45-9691-8665b8364a8b"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "dac52c9e-de87-4394-a548-cf9b6408da3d",
                "destination_uuid": null
              },
              {
                "uuid": "31e565b5-d6e0-42f5-81dd-a56f7f8997e8",
                "destination_uuid": "72e926f2-1ee3-4b5f-abef-c4afe87c9d9d"
              },
              {
                "uuid": "1b86a51e-8bd1-40f9-826d-6955df37abfb",
                "destination_uuid": "8707b767-ded8-4828-9831-20e402195cc5"
              }
            ]
          },
          {
            "uuid": "72e926f2-1ee3-4b5f-abef-c4afe87c9d9d",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "18329366-065e-4327-8f0d-6c1f843a1538"
              }
            ],
            "exits": [
              {
                "uuid": "0796de82-3ffe-4fe0-8a5d-15affbf5f83a",
                "destination_uuid": "85b0e031-c261-4513-8843-18bba703194a"
              }
            ]
          },
          {
            "uuid": "8707b767-ded8-4828-9831-20e402195cc5",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "64f6ee4f-b6ca-4490-a448-0d91320bd877"
              }
            ],
            "exits": [
              {
                "uuid": "6d7b64ca-f196-40ac-8149-2e158dcf5faa",
                "destination_uuid": "85b0e031-c261-4513-8843-18bba703194a"
              }
            ]
          },
          {
            "uuid": "85b0e031-c261-4513-8843-18bba703194a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "62ef4ec6-c669-4181-80f6-bc854e2429a4",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "841f82ea-1694-49c1-9064-941fa695b9f8",
                  "type": "has_only_phrase",
                  "uuid": "97ae671e-1203-4654-a1ac-3eeed53f8f15"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "68c1c6a1-d655-4e81-a4be-9ff1b314a87e",
                  "name": "All Responses",
                  "uuid": "62ef4ec6-c669-4181-80f6-bc854e2429a4"
                },
                {
                  "exit_uuid": "77a2968f-c544-4f91-a054-d845a8fa3124",
                  "name": "Next",
                  "uuid": "841f82ea-1694-49c1-9064-941fa695b9f8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "68c1c6a1-d655-4e81-a4be-9ff1b314a87e",
                "destination_uuid": null
              },
              {
                "uuid": "77a2968f-c544-4f91-a054-d845a8fa3124",
                "destination_uuid": "72444379-d0d0-431e-8c45-74cf798dce40"
              }
            ]
          },
          {
            "uuid": "72444379-d0d0-431e-8c45-74cf798dce40",
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
                "uuid": "7c87c16f-2d33-4e32-86f9-9a79b11d998e"
              }
            ],
            "exits": [
              {
                "uuid": "292de938-cdb4-4c12-843c-d781f0836fd9",
                "destination_uuid": "74f2ece1-e41f-458b-8e78-1d3d045e3a3d"
              }
            ]
          },
          {
            "uuid": "74f2ece1-e41f-458b-8e78-1d3d045e3a3d",
            "actions": [],
            "exits": [
              {
                "uuid": "60e42e54-4a19-41fc-bb3a-d614336cebf7",
                "destination_uuid": "4cd59ad0-4298-4e81-9a1e-6f52f9f2c34b"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7101e0d2-2f1e-4538-8c9a-ed3f166979ac",
              "cases": [],
              "categories": [
                {
                  "uuid": "7101e0d2-2f1e-4538-8c9a-ed3f166979ac",
                  "name": "All Responses",
                  "exit_uuid": "60e42e54-4a19-41fc-bb3a-d614336cebf7"
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
            "uuid": "4cd59ad0-4298-4e81-9a1e-6f52f9f2c34b",
            "actions": [
              {
                "uuid": "89f49a8d-64e1-424d-851f-55a322d86b9a",
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
                "uuid": "4b7a46bf-5063-478b-985f-e1bb2e1fe2d3",
                "destination_uuid": "be51556f-da9c-4486-bbb8-cad6a06fa8c3"
              }
            ]
          },
          {
            "uuid": "994feee3-7cd0-48e5-878f-cdcfead380ac",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "737951a3-5382-46a0-8fb5-f38e4c7578d3"
              }
            ],
            "exits": [
              {
                "uuid": "13bed478-cff4-4c7c-bc32-c1c15f043525",
                "destination_uuid": "fbab1e03-e17e-4dd1-8f98-6c2496824669"
              }
            ]
          },
          {
            "uuid": "be51556f-da9c-4486-bbb8-cad6a06fa8c3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b1b6fe09-f8f8-426b-8a25-e3bc4b882878",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "d7c01c6d-6131-4fd2-9d23-47ffc2317b1f",
                  "type": "has_only_phrase",
                  "uuid": "f39c48d0-84be-40bf-a08b-3df3088a1340"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "d7c01c6d-6131-4fd2-9d23-47ffc2317b1f",
                  "type": "has_only_phrase",
                  "uuid": "924644d8-b298-4ea9-91ca-abdcd688995f"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "d7c01c6d-6131-4fd2-9d23-47ffc2317b1f",
                  "type": "has_only_phrase",
                  "uuid": "b8c045a3-e838-4f6b-bd69-c2e482f49348"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "d7c01c6d-6131-4fd2-9d23-47ffc2317b1f",
                  "type": "has_only_phrase",
                  "uuid": "a4baabec-4c3f-4e2d-8044-a2679553e9a4"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "d7c01c6d-6131-4fd2-9d23-47ffc2317b1f",
                  "type": "has_only_phrase",
                  "uuid": "78fa7713-2db6-44a0-aacf-c8f3437b6f79"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "d7c01c6d-6131-4fd2-9d23-47ffc2317b1f",
                  "type": "has_only_phrase",
                  "uuid": "8be5f107-5e54-496f-a9a0-279cfdca6e1b"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "d7c01c6d-6131-4fd2-9d23-47ffc2317b1f",
                  "type": "has_only_phrase",
                  "uuid": "57c98533-297c-4318-8c01-ec4cf9a885b7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "66d6d53f-09e9-4aa9-aab5-0aa95ef1a9f8",
                  "name": "All Responses",
                  "uuid": "b1b6fe09-f8f8-426b-8a25-e3bc4b882878"
                },
                {
                  "exit_uuid": "aef305a3-5341-4018-9e50-003469e5bf5e",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "d7c01c6d-6131-4fd2-9d23-47ffc2317b1f"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "66d6d53f-09e9-4aa9-aab5-0aa95ef1a9f8",
                "destination_uuid": "994feee3-7cd0-48e5-878f-cdcfead380ac"
              },
              {
                "uuid": "aef305a3-5341-4018-9e50-003469e5bf5e",
                "destination_uuid": "1df859b8-253b-4c82-a31a-e27e757daad1"
              }
            ]
          },
          {
            "uuid": "1df859b8-253b-4c82-a31a-e27e757daad1",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "3f979518-3fa2-4b20-a7fa-39803e4ea3aa"
              }
            ],
            "exits": [
              {
                "uuid": "56aa6592-3e38-4a44-8a6a-029f18103170",
                "destination_uuid": "fbab1e03-e17e-4dd1-8f98-6c2496824669"
              }
            ]
          },
          {
            "uuid": "fbab1e03-e17e-4dd1-8f98-6c2496824669",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e89cd700-6ece-4ae9-8c4a-e6c203e8529d",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b49d8356-f288-4a91-a94b-6d0b2e0c4734",
                  "type": "has_only_phrase",
                  "uuid": "07b967d5-02f8-4e6e-82f9-ac30899f1a7b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a81656e5-0ed6-4868-80f1-295d24bc094c",
                  "name": "All Responses",
                  "uuid": "e89cd700-6ece-4ae9-8c4a-e6c203e8529d"
                },
                {
                  "exit_uuid": "e891692d-0d71-4625-bb4d-f68c6578ddee",
                  "name": "Next",
                  "uuid": "b49d8356-f288-4a91-a94b-6d0b2e0c4734"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a81656e5-0ed6-4868-80f1-295d24bc094c",
                "destination_uuid": null
              },
              {
                "uuid": "e891692d-0d71-4625-bb4d-f68c6578ddee",
                "destination_uuid": "534ac0f6-d279-40cc-be92-6ab9018a0cad"
              }
            ]
          },
          {
            "uuid": "534ac0f6-d279-40cc-be92-6ab9018a0cad",
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
                "uuid": "73359a07-fa24-48df-9e0b-6a4cdafa02d3"
              }
            ],
            "exits": [
              {
                "uuid": "9766706b-6b3c-4a8a-b46a-17b32c6dfc7f",
                "destination_uuid": "8b8c35fe-6729-4bb2-bdd0-74e883f8e91b"
              }
            ]
          },
          {
            "uuid": "8b8c35fe-6729-4bb2-bdd0-74e883f8e91b",
            "actions": [],
            "exits": [
              {
                "uuid": "50457443-4ba1-4f23-9185-ce01e33d1fce",
                "destination_uuid": "4a3e2c3e-6772-4088-9894-b136f5382a46"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e54c3b00-7c8d-4bd9-83a1-ac1ffc3a93b3",
              "cases": [],
              "categories": [
                {
                  "uuid": "e54c3b00-7c8d-4bd9-83a1-ac1ffc3a93b3",
                  "name": "All Responses",
                  "exit_uuid": "50457443-4ba1-4f23-9185-ce01e33d1fce"
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
            "uuid": "4a3e2c3e-6772-4088-9894-b136f5382a46",
            "actions": [
              {
                "uuid": "6f2a1558-5a16-4469-951f-1ae371715417",
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
                "uuid": "0907df4d-b0a0-45f6-b169-8c755bcbdc71",
                "destination_uuid": "f7e67185-b4d4-47bc-b033-3772f972e308"
              }
            ]
          },
          {
            "uuid": "f7e67185-b4d4-47bc-b033-3772f972e308",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d0c05995-1e2c-4e07-ab2b-934c22b380fd",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "03a2aaad-eb9a-4778-91af-6920b8ab2d13",
                  "type": "has_only_phrase",
                  "uuid": "61f9da81-ec44-42ae-967c-5e3ef88a9567"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "03a2aaad-eb9a-4778-91af-6920b8ab2d13",
                  "type": "has_only_phrase",
                  "uuid": "64228436-4cfc-404a-8df3-f7603a46bbfa"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "03a2aaad-eb9a-4778-91af-6920b8ab2d13",
                  "type": "has_only_phrase",
                  "uuid": "8f2fe654-49f4-4c6f-a9ea-38319d1522e4"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "03a2aaad-eb9a-4778-91af-6920b8ab2d13",
                  "type": "has_only_phrase",
                  "uuid": "4ff45582-4539-469b-955b-adda62356b8d"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "03a2aaad-eb9a-4778-91af-6920b8ab2d13",
                  "type": "has_only_phrase",
                  "uuid": "8326687e-8e5f-4835-ba31-6584e80e91bc"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "5ac9fb2e-f7b1-4fb9-ad8d-29c5518c1d5b",
                  "type": "has_only_phrase",
                  "uuid": "f314f8d6-acc6-47c1-975d-a9fc8d87cc94"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "5ac9fb2e-f7b1-4fb9-ad8d-29c5518c1d5b",
                  "type": "has_only_phrase",
                  "uuid": "7c3ce59d-d0ca-4e61-84ab-268eba6d846f"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "5ac9fb2e-f7b1-4fb9-ad8d-29c5518c1d5b",
                  "type": "has_only_phrase",
                  "uuid": "a9ee538f-f139-43d8-b84e-745915576b69"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "5ac9fb2e-f7b1-4fb9-ad8d-29c5518c1d5b",
                  "type": "has_only_phrase",
                  "uuid": "9dc015ff-de07-4869-b472-d1f6045e7873"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "617a719d-7a9a-4089-8199-d1b6a1276607",
                  "name": "All Responses",
                  "uuid": "d0c05995-1e2c-4e07-ab2b-934c22b380fd"
                },
                {
                  "exit_uuid": "51de0d4a-224a-4601-a65f-3c4deb4e0649",
                  "name": "0;1;2;3;4",
                  "uuid": "03a2aaad-eb9a-4778-91af-6920b8ab2d13"
                },
                {
                  "exit_uuid": "f749c0cf-e34d-4484-b83e-2912ea4b39b7",
                  "name": "5;6;7;8",
                  "uuid": "5ac9fb2e-f7b1-4fb9-ad8d-29c5518c1d5b"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "617a719d-7a9a-4089-8199-d1b6a1276607",
                "destination_uuid": null
              },
              {
                "uuid": "51de0d4a-224a-4601-a65f-3c4deb4e0649",
                "destination_uuid": "2804a5b2-2090-4e09-9aa5-fafe0a7291ca"
              },
              {
                "uuid": "f749c0cf-e34d-4484-b83e-2912ea4b39b7",
                "destination_uuid": "5a67a918-abf6-4031-846d-22095a188f63"
              }
            ]
          },
          {
            "uuid": "2804a5b2-2090-4e09-9aa5-fafe0a7291ca",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6bf22448-a117-40a9-86fd-85b5e9c124c0"
              }
            ],
            "exits": [
              {
                "uuid": "20b320c5-281c-4dc6-bef3-4f39fb8cd404",
                "destination_uuid": "19031ccd-9276-416c-81f4-94ae962b1b90"
              }
            ]
          },
          {
            "uuid": "5a67a918-abf6-4031-846d-22095a188f63",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "5b6718ef-16ae-4ac0-ba6c-c519245edd52"
              }
            ],
            "exits": [
              {
                "uuid": "b6bf56e2-beb8-4818-9929-f0fb593344bc",
                "destination_uuid": "19031ccd-9276-416c-81f4-94ae962b1b90"
              }
            ]
          },
          {
            "uuid": "19031ccd-9276-416c-81f4-94ae962b1b90",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e69922ac-911c-46da-b6d2-94b6a40ee3a4",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "bd16aaa9-e9c9-47a4-8d2a-73dea7a5af89",
                  "type": "has_only_phrase",
                  "uuid": "034180f1-aca2-49d5-95b6-5d32e748c708"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "15054dee-90b8-40db-a053-6f66d3937c39",
                  "name": "All Responses",
                  "uuid": "e69922ac-911c-46da-b6d2-94b6a40ee3a4"
                },
                {
                  "exit_uuid": "a14e7d56-8ec7-4915-a116-7dd410432367",
                  "name": "Next",
                  "uuid": "bd16aaa9-e9c9-47a4-8d2a-73dea7a5af89"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "15054dee-90b8-40db-a053-6f66d3937c39",
                "destination_uuid": null
              },
              {
                "uuid": "a14e7d56-8ec7-4915-a116-7dd410432367",
                "destination_uuid": "091de442-8d9d-46d6-b9b4-2f0e52dfa7c4"
              }
            ]
          },
          {
            "uuid": "091de442-8d9d-46d6-b9b4-2f0e52dfa7c4",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "2a9eca83-6d15-42e8-8116-71f861b93424"
              }
            ],
            "exits": [
              {
                "uuid": "f881b774-ccf7-4812-b68d-a7b7a2b9b1d4",
                "destination_uuid": "a48b4223-3e04-45dc-adf9-cd5a04326462"
              }
            ]
          },
          {
            "uuid": "a48b4223-3e04-45dc-adf9-cd5a04326462",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9d32e74a-310b-4fe6-9bb9-73d0fdbf324c",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "fecaa255-be76-4450-a7d8-eb97765f227d",
                  "type": "has_only_phrase",
                  "uuid": "94c6e477-2263-4b4e-b4ac-3ca16a49e69d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8ea4a000-ac92-4730-87f8-bc31ea7399d1",
                  "name": "All Responses",
                  "uuid": "9d32e74a-310b-4fe6-9bb9-73d0fdbf324c"
                },
                {
                  "exit_uuid": "d75ecb60-b9c0-4673-afc3-be87178b686e",
                  "name": "Next",
                  "uuid": "fecaa255-be76-4450-a7d8-eb97765f227d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8ea4a000-ac92-4730-87f8-bc31ea7399d1",
                "destination_uuid": null
              },
              {
                "uuid": "d75ecb60-b9c0-4673-afc3-be87178b686e",
                "destination_uuid": "d780c17b-22b4-4717-a4b9-0a6019d49db1"
              }
            ]
          },
          {
            "uuid": "d780c17b-22b4-4717-a4b9-0a6019d49db1",
            "actions": [
              {
                "uuid": "5c6b4656-f1d7-4672-8ff9-05991113d736",
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
                "uuid": "94bdcae6-03f3-48dc-9089-cc1259ed58e9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "46c02c4f-4c34-44dd-9709-ba84a3e0e570",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "035320b6-7067-443f-bc3d-052e3af34f3e",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "aecef413-cf89-4729-b24e-0086c2be8441"
              }
            ],
            "exits": [
              {
                "uuid": "276aea9c-f27b-4dfe-b01a-7f8d9aa7d505",
                "destination_uuid": "dee20d03-0cdc-4fcb-b2b7-10db4ddd3f07"
              }
            ]
          },
          {
            "uuid": "dee20d03-0cdc-4fcb-b2b7-10db4ddd3f07",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "dace1793-a4f9-4db0-ace9-0c38111b6b00",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "c9b8cb90-140e-4ae8-ad87-a07936a8752b",
                  "type": "has_only_phrase",
                  "uuid": "bf17ff65-2ddd-43b5-9aef-37affb30807f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1e1568f9-453c-4f98-943d-97b4bb61c5a2",
                  "name": "All Responses",
                  "uuid": "dace1793-a4f9-4db0-ace9-0c38111b6b00"
                },
                {
                  "exit_uuid": "48c4d7ae-ef66-4f2f-89a2-e1ac10ac1dfd",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "c9b8cb90-140e-4ae8-ad87-a07936a8752b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1e1568f9-453c-4f98-943d-97b4bb61c5a2",
                "destination_uuid": null
              },
              {
                "uuid": "48c4d7ae-ef66-4f2f-89a2-e1ac10ac1dfd",
                "destination_uuid": "4d29f115-d3fb-4716-817f-9bb9d48e8fbf"
              }
            ]
          },
          {
            "uuid": "4d29f115-d3fb-4716-817f-9bb9d48e8fbf",
            "actions": [
              {
                "uuid": "ecca95ae-e70d-41cb-87f5-389f58cbda39",
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
                "uuid": "e7fe993e-1331-422a-bf09-9b5c76858924",
                "destination_uuid": "affd3e38-0219-4b0e-b553-ff14a1e16713"
              }
            ]
          },
          {
            "uuid": "affd3e38-0219-4b0e-b553-ff14a1e16713",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "35f6cd93-4347-4614-a875-72e88ceb628f"
                },
                "type": "enter_flow",
                "uuid": "952154cc-bf59-47b4-ada2-8f3d505ed8f1"
              }
            ],
            "exits": [
              {
                "uuid": "1a3c001c-337b-4b0f-b7af-942ccd6007dd",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "4af5649f-e996-42ac-ba49-a3c399bbec1f",
            "actions": [
              {
                "uuid": "40c6b43a-3273-4222-8f78-e12701ada10d",
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
                "uuid": "6c51217f-28a0-4414-94e3-e672f9fa7a63",
                "destination_uuid": "7811c2cc-4fec-4cba-bbb6-e105638650fb"
              }
            ]
          },
          {
            "uuid": "7811c2cc-4fec-4cba-bbb6-e105638650fb",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "bf663c19-87d7-41b0-ae6e-3069c224ce9b"
                },
                "type": "enter_flow",
                "uuid": "cfc485d3-0b9e-425f-824b-8a20ff87d1c6"
              }
            ],
            "exits": [
              {
                "uuid": "f706bb2a-c540-47c9-ba5b-c08f96c9875c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "68759416-df4a-4828-a451-f90f9469c285",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "711c3e86-665c-47c7-92b3-cd0effd6a42b",
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
                "uuid": "55dc9500-15d0-4e29-aaa9-2d82b634ac5c"
              }
            ],
            "exits": [
              {
                "uuid": "d6959f5c-87eb-4da2-a8de-f098e34c11b4",
                "destination_uuid": "7da9ae04-6926-446c-a010-18382787e6cb"
              }
            ]
          },
          {
            "uuid": "7da9ae04-6926-446c-a010-18382787e6cb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0d0c625a-33ab-4a65-b355-d8c89e0730f1",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "51afc6a3-e806-41e9-a8c6-b6926c798a2d",
                  "type": "has_only_phrase",
                  "uuid": "60b1e46f-f04b-43de-b1a4-2ee3c0f03a85"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "cb82763e-fd40-4584-b680-7b2ee4d5880e",
                  "type": "has_only_phrase",
                  "uuid": "ebe0c58f-739e-41bf-9032-238aef784692"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "cb82763e-fd40-4584-b680-7b2ee4d5880e",
                  "type": "has_only_phrase",
                  "uuid": "9ab81fee-d427-4aca-87e4-47ac0d476a07"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "43d7aa3f-d876-455c-8797-9aded97a3a0e",
                  "name": "All Responses",
                  "uuid": "0d0c625a-33ab-4a65-b355-d8c89e0730f1"
                },
                {
                  "exit_uuid": "57d35590-67e8-4a93-a7a4-d2d00c195852",
                  "name": "Happy",
                  "uuid": "51afc6a3-e806-41e9-a8c6-b6926c798a2d"
                },
                {
                  "exit_uuid": "07b6560a-757c-45d1-9b13-86f058a158f4",
                  "name": "Neutral; Sad",
                  "uuid": "cb82763e-fd40-4584-b680-7b2ee4d5880e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "43d7aa3f-d876-455c-8797-9aded97a3a0e",
                "destination_uuid": null
              },
              {
                "uuid": "57d35590-67e8-4a93-a7a4-d2d00c195852",
                "destination_uuid": "71e7decb-56bd-4b75-940b-cdea0cdc6298"
              },
              {
                "uuid": "07b6560a-757c-45d1-9b13-86f058a158f4",
                "destination_uuid": "0fe2e633-3d04-4537-a713-0791be1d77ae"
              }
            ]
          },
          {
            "uuid": "71e7decb-56bd-4b75-940b-cdea0cdc6298",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "9173b480-426c-451b-9d64-49df3a7d204a"
              }
            ],
            "exits": [
              {
                "uuid": "e67931d8-cfa1-4447-a857-7e1d3567460d",
                "destination_uuid": "55005e3c-f419-4e46-b346-11ce8e5dd50c"
              }
            ]
          },
          {
            "uuid": "0fe2e633-3d04-4537-a713-0791be1d77ae",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9459feba-524a-43dd-92e1-bee243545740"
              }
            ],
            "exits": [
              {
                "uuid": "7d7b0bcd-a668-447d-8dc3-64016d1db0ca",
                "destination_uuid": "b2ff52b6-77f5-45bd-96bc-593b74e5812b"
              }
            ]
          },
          {
            "uuid": "b2ff52b6-77f5-45bd-96bc-593b74e5812b",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c8348318-d119-4103-80cc-9339d95f910d"
              }
            ],
            "exits": [
              {
                "uuid": "134cf654-bda9-4904-b728-d93e54b09ea4",
                "destination_uuid": "c4bb1fa4-24fa-49b8-aa23-703b8194d27b"
              }
            ]
          },
          {
            "uuid": "c4bb1fa4-24fa-49b8-aa23-703b8194d27b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a4649abe-0833-4c60-9b5c-030347b42dae",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "4d964b78-9e29-4d2c-aaac-cd960be0e28b",
                  "type": "has_only_phrase",
                  "uuid": "686008f5-181e-4cb4-91dc-41b577f1dd84"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "5319ea16-c7af-4fb9-b811-c3bc2e033636",
                  "type": "has_only_phrase",
                  "uuid": "83fd74e7-cece-4728-826c-4bbebb811bf7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0aa10baa-1b28-4137-8d1e-f4cdeb14c326",
                  "name": "All Responses",
                  "uuid": "a4649abe-0833-4c60-9b5c-030347b42dae"
                },
                {
                  "exit_uuid": "280c4515-1348-48c9-8e9c-0b45a14dc05c",
                  "name": "Yes",
                  "uuid": "4d964b78-9e29-4d2c-aaac-cd960be0e28b"
                },
                {
                  "exit_uuid": "69b19055-9c40-44b1-b0d5-333471ebf5fa",
                  "name": "No",
                  "uuid": "5319ea16-c7af-4fb9-b811-c3bc2e033636"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0aa10baa-1b28-4137-8d1e-f4cdeb14c326",
                "destination_uuid": null
              },
              {
                "uuid": "280c4515-1348-48c9-8e9c-0b45a14dc05c",
                "destination_uuid": "d1ad4e47-981f-4df7-974e-0d4743085308"
              },
              {
                "uuid": "69b19055-9c40-44b1-b0d5-333471ebf5fa",
                "destination_uuid": "90858dc8-8e00-41b7-9ab5-f0bebf420a9a"
              }
            ]
          },
          {
            "uuid": "d1ad4e47-981f-4df7-974e-0d4743085308",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "cacd5c12-d8eb-46e0-8f5a-f4c0090fb7cf"
                },
                "type": "enter_flow",
                "uuid": "855ccf77-dd4a-47d3-9b45-12a6878b0505"
              }
            ],
            "exits": [
              {
                "uuid": "162a02d1-a7ee-4454-a941-0b453972cec8",
                "destination_uuid": "0cc29607-a9a5-43c8-b713-ddff958c0efb"
              },
              {
                "uuid": "c4b3ee12-7b91-4567-972b-8b193ab36919",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8a7b187b-9bdb-44b3-9f2d-b60dba8834a1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "2d8503dd-a188-4101-99aa-a69b1dd7bd8d"
                },
                {
                  "uuid": "584e6bc4-cff2-4f55-b24a-2b4aaf4141fc",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "866cf67c-e971-4d20-9e7d-b48bb81e9d82"
                }
              ],
              "categories": [
                {
                  "uuid": "2d8503dd-a188-4101-99aa-a69b1dd7bd8d",
                  "name": "Complete",
                  "exit_uuid": "162a02d1-a7ee-4454-a941-0b453972cec8"
                },
                {
                  "uuid": "866cf67c-e971-4d20-9e7d-b48bb81e9d82",
                  "name": "Expired",
                  "exit_uuid": "c4b3ee12-7b91-4567-972b-8b193ab36919"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "2d8503dd-a188-4101-99aa-a69b1dd7bd8d"
            }
          },
          {
            "uuid": "0cc29607-a9a5-43c8-b713-ddff958c0efb",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c287bb01-5f38-4191-9035-c111df3a1115"
              }
            ],
            "exits": [
              {
                "uuid": "cc6620fb-e8ac-4363-8679-152d19e3d503",
                "destination_uuid": "c8a22175-6701-49c0-987a-d0e58330f370"
              }
            ]
          },
          {
            "uuid": "c8a22175-6701-49c0-987a-d0e58330f370",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "e06625fa-9458-4c6f-bf01-607b3d04732d"
              }
            ],
            "exits": [
              {
                "uuid": "70766c55-04e3-42ec-a234-81c63aeafcc4",
                "destination_uuid": "55005e3c-f419-4e46-b346-11ce8e5dd50c"
              }
            ]
          },
          {
            "uuid": "90858dc8-8e00-41b7-9ab5-f0bebf420a9a",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "46698902-de1b-4814-9ec9-c5baad8daf79"
              }
            ],
            "exits": [
              {
                "uuid": "cd390599-39eb-40e3-921e-8bc486ace128",
                "destination_uuid": "55005e3c-f419-4e46-b346-11ce8e5dd50c"
              }
            ]
          },
          {
            "uuid": "55005e3c-f419-4e46-b346-11ce8e5dd50c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d1ffc2a8-0ca4-4bd6-851b-0296e8e660c7",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "16cb0c5b-ba3a-4c10-ba34-c46589f93762",
                  "type": "has_only_phrase",
                  "uuid": "5e928083-5ee6-48b1-bc4e-306fc387a5a3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ee24248b-6ec6-4a8a-8a67-0191cec1dcfb",
                  "name": "All Responses",
                  "uuid": "d1ffc2a8-0ca4-4bd6-851b-0296e8e660c7"
                },
                {
                  "exit_uuid": "c5e49780-8602-4abf-ba23-662556313963",
                  "name": "Chat to @fields.elder",
                  "uuid": "16cb0c5b-ba3a-4c10-ba34-c46589f93762"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ee24248b-6ec6-4a8a-8a67-0191cec1dcfb",
                "destination_uuid": null
              },
              {
                "uuid": "c5e49780-8602-4abf-ba23-662556313963",
                "destination_uuid": "17db8beb-8b15-4cf1-85f1-c6c2fb331281"
              }
            ]
          },
          {
            "uuid": "17db8beb-8b15-4cf1-85f1-c6c2fb331281",
            "actions": [
              {
                "uuid": "ac9035b0-5f1e-463f-b199-3884be2bb2cf",
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
                "uuid": "191de36d-4010-4fa5-894f-fe7e747eba8b",
                "destination_uuid": "8a90cc43-5207-4e6d-9cd4-726e1dddc8b6"
              }
            ]
          },
          {
            "uuid": "8a90cc43-5207-4e6d-9cd4-726e1dddc8b6",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "290b0f42-615c-40ca-bae7-e0e377887932"
                },
                "type": "enter_flow",
                "uuid": "6dabbd4c-c5b0-4fc8-adc5-f78e7998b55b"
              }
            ],
            "exits": [
              {
                "uuid": "8c41b7a0-f992-4a22-9472-5fd9b7dfb9bb",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "eec7043a-c338-45de-ab96-fbf60c4fbc16",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "bdbc335b-a6bb-4a8b-8b1d-edc9a85a414b",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7b9c5a32-7ea3-45ae-a79b-1f73b6016463"
              }
            ],
            "exits": [
              {
                "uuid": "cb64c6c4-133f-4b3e-a798-dcd53c458f0a",
                "destination_uuid": "553ee28e-bf34-4ceb-85ab-9e007dd8b804"
              }
            ]
          },
          {
            "uuid": "553ee28e-bf34-4ceb-85ab-9e007dd8b804",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "261f9258-7fd7-4a76-9943-b42d46abf3f6"
              }
            ],
            "exits": [
              {
                "uuid": "fb2ceca3-fca5-4e7f-bc35-b18ff2aeff81",
                "destination_uuid": "aaaaac93-a5eb-4a42-ae11-867a1872d098"
              }
            ]
          },
          {
            "uuid": "aaaaac93-a5eb-4a42-ae11-867a1872d098",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "a9dec91b-eaba-4c55-be81-f747bd3de7ee"
              }
            ],
            "exits": [
              {
                "uuid": "9449c024-b184-40eb-915f-7490417db42e",
                "destination_uuid": "ce016004-e8d4-4165-9d5c-1266b3093bdc"
              }
            ]
          },
          {
            "uuid": "ce016004-e8d4-4165-9d5c-1266b3093bdc",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "16b8b01f-14e7-4833-9a9c-2ad10f32c073",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "60b4a6cf-59b7-4310-8fb0-bb67631439a0",
                  "type": "has_only_phrase",
                  "uuid": "f8227eca-43fc-4995-b203-bb44d7a17e3c"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "8ad94df2-9d0b-425a-b9c8-27c078320ae1",
                  "type": "has_only_phrase",
                  "uuid": "fc0d3577-7067-4c01-8ad0-5783e90ec1db"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "31acdbde-40ed-4c72-a3de-a479b36cbf55",
                  "name": "All Responses",
                  "uuid": "16b8b01f-14e7-4833-9a9c-2ad10f32c073"
                },
                {
                  "exit_uuid": "ea8cb7ba-08d7-427a-8bc4-483f7c08e745",
                  "name": "Yes",
                  "uuid": "60b4a6cf-59b7-4310-8fb0-bb67631439a0"
                },
                {
                  "exit_uuid": "2409494e-1d53-45f4-867e-1f691d1dced4",
                  "name": "No",
                  "uuid": "8ad94df2-9d0b-425a-b9c8-27c078320ae1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "31acdbde-40ed-4c72-a3de-a479b36cbf55",
                "destination_uuid": null
              },
              {
                "uuid": "ea8cb7ba-08d7-427a-8bc4-483f7c08e745",
                "destination_uuid": "8f28f9a6-7c32-42ab-bc7d-5874af011f77"
              },
              {
                "uuid": "2409494e-1d53-45f4-867e-1f691d1dced4",
                "destination_uuid": "8518a96a-05b2-4606-97b9-eedfda7481ba"
              }
            ]
          },
          {
            "uuid": "8f28f9a6-7c32-42ab-bc7d-5874af011f77",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "667e0629-9b49-448e-9799-ea42f915eb6f"
              }
            ],
            "exits": [
              {
                "uuid": "c9365865-fb8c-4d89-a642-aa1a177a2611",
                "destination_uuid": "c8178203-6d97-4fb8-8e96-610c16ceab85"
              }
            ]
          },
          {
            "uuid": "8518a96a-05b2-4606-97b9-eedfda7481ba",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9fc15165-beda-4b61-b49c-2ec6740ce75b"
              }
            ],
            "exits": [
              {
                "uuid": "f4677d68-d5a6-48ef-890a-6dd42cc5a3c6",
                "destination_uuid": "c8178203-6d97-4fb8-8e96-610c16ceab85"
              }
            ]
          },
          {
            "uuid": "c8178203-6d97-4fb8-8e96-610c16ceab85",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8bb199f0-64da-4cbb-9449-8a5139a61a9f"
              }
            ],
            "exits": [
              {
                "uuid": "8c51561c-56b6-4f79-b7c3-31ecfd34fc51",
                "destination_uuid": "dfc2a2fa-9bb6-498e-adc6-80a968d7f36c"
              }
            ]
          },
          {
            "uuid": "dfc2a2fa-9bb6-498e-adc6-80a968d7f36c",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "55ac1856-d749-4dd2-9acd-be5b51539400"
              }
            ],
            "exits": [
              {
                "uuid": "33fa4ba5-022b-4d24-a8ad-2a24828ea3a3",
                "destination_uuid": "9e7f9a50-a2e8-473e-9078-7cd45140f50d"
              }
            ]
          },
          {
            "uuid": "9e7f9a50-a2e8-473e-9078-7cd45140f50d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2d9c38b2-c549-4ab3-9156-02a30d83b85d",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "0cf00d01-9af8-4667-a5e7-064d461f39e3",
                  "type": "has_only_phrase",
                  "uuid": "97d04a1a-76ad-456c-9c62-ac78d027bfdd"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "97d7558e-35ac-4273-a20f-0ee32d273e60",
                  "type": "has_only_phrase",
                  "uuid": "3b006525-0054-4008-b98b-deacd7ea5c98"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e2d54483-353e-4e93-8c4f-c0dedf9391cc",
                  "name": "All Responses",
                  "uuid": "2d9c38b2-c549-4ab3-9156-02a30d83b85d"
                },
                {
                  "exit_uuid": "92125e48-2992-4794-8b71-95c7c74be7f8",
                  "name": "Yes",
                  "uuid": "0cf00d01-9af8-4667-a5e7-064d461f39e3"
                },
                {
                  "exit_uuid": "268b2fb5-8336-4d65-bd63-5518a79f346b",
                  "name": "Later",
                  "uuid": "97d7558e-35ac-4273-a20f-0ee32d273e60"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e2d54483-353e-4e93-8c4f-c0dedf9391cc",
                "destination_uuid": null
              },
              {
                "uuid": "92125e48-2992-4794-8b71-95c7c74be7f8",
                "destination_uuid": "6c6defcd-3dc2-4eff-ab42-f616b28639d4"
              },
              {
                "uuid": "268b2fb5-8336-4d65-bd63-5518a79f346b",
                "destination_uuid": "4f6278d1-fbb2-40c0-9382-d6032970f5b1"
              }
            ]
          },
          {
            "uuid": "6c6defcd-3dc2-4eff-ab42-f616b28639d4",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "ab87563b-630f-4675-96c4-b444349804c3"
              }
            ],
            "exits": [
              {
                "uuid": "0047be01-4f24-4f09-a981-8514909ded7a",
                "destination_uuid": "ceeee16b-e385-48a9-bf91-7586884f183f"
              }
            ]
          },
          {
            "uuid": "ceeee16b-e385-48a9-bf91-7586884f183f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f2c6bda4-3cf9-464b-9d0b-668ea2a56556",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "ce4a4c0b-7f7e-4aeb-8db0-7e096eeeb8a7",
                  "type": "has_only_phrase",
                  "uuid": "b3644bee-c5e1-438a-abc5-200939341ac5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b21f662d-6b29-4dc9-add3-ed703657afca",
                  "name": "All Responses",
                  "uuid": "f2c6bda4-3cf9-464b-9d0b-668ea2a56556"
                },
                {
                  "exit_uuid": "e6c67e37-b268-453e-89a4-f96154cf5497",
                  "name": "Take me to Tips",
                  "uuid": "ce4a4c0b-7f7e-4aeb-8db0-7e096eeeb8a7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b21f662d-6b29-4dc9-add3-ed703657afca",
                "destination_uuid": null
              },
              {
                "uuid": "e6c67e37-b268-453e-89a4-f96154cf5497",
                "destination_uuid": "c4126ba9-34af-417d-9ad3-9b4e206feee2"
              }
            ]
          },
          {
            "uuid": "c4126ba9-34af-417d-9ad3-9b4e206feee2",
            "actions": [
              {
                "uuid": "965e33eb-9d1b-4eb2-a2e1-553600ec402e",
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
                "uuid": "afa573d7-3952-40bc-b7c0-4a0c3a915a9b",
                "destination_uuid": "45033ba8-5e66-4e54-b44a-e8d9c5e4fe33"
              }
            ]
          },
          {
            "uuid": "45033ba8-5e66-4e54-b44a-e8d9c5e4fe33",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "e6c5df3d-b13f-41e0-a5ed-ee9c320f8509"
                },
                "type": "enter_flow",
                "uuid": "a6695bb5-184b-4ec3-bf1e-f039581a9483"
              }
            ],
            "exits": [
              {
                "uuid": "ee9da9cd-f8d7-4e57-8a15-ea7aa119c005",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "4f6278d1-fbb2-40c0-9382-d6032970f5b1",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "0df16947-45cf-4386-a8da-5fce10072347"
              }
            ],
            "exits": [
              {
                "uuid": "63bc2839-7502-4ddd-92ab-09d82aa58832",
                "destination_uuid": "1aa3dcdb-b3bc-4b4c-bfd3-ab5bd1c79aab"
              }
            ]
          },
          {
            "uuid": "1aa3dcdb-b3bc-4b4c-bfd3-ab5bd1c79aab",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "67c94fc0-5478-461e-a882-879d5910df32",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "935606a0-6c5e-4a08-ad3d-e65d77180cb4",
                  "type": "has_only_phrase",
                  "uuid": "04e0dfe1-695a-492f-ae79-7be252c03bee"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7a520d78-a6df-49b9-ba1d-79c30aed932e",
                  "name": "All Responses",
                  "uuid": "67c94fc0-5478-461e-a882-879d5910df32"
                },
                {
                  "exit_uuid": "fadb5165-7339-4e5e-b7e6-cd7312b6fe9b",
                  "name": "Take me to the home screen",
                  "uuid": "935606a0-6c5e-4a08-ad3d-e65d77180cb4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7a520d78-a6df-49b9-ba1d-79c30aed932e",
                "destination_uuid": null
              },
              {
                "uuid": "fadb5165-7339-4e5e-b7e6-cd7312b6fe9b",
                "destination_uuid": "6e2096a8-1825-4efe-82d4-d9e4807f214e"
              }
            ]
          },
          {
            "uuid": "6e2096a8-1825-4efe-82d4-d9e4807f214e",
            "actions": [
              {
                "uuid": "75155d5a-036b-4be4-b008-751ce0b97df7",
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
                "uuid": "d67f7a41-a490-4bc3-b08e-1817283ac126",
                "destination_uuid": "dca93a19-83fc-44a5-a7bf-14e9e05fe9aa"
              }
            ]
          },
          {
            "uuid": "dca93a19-83fc-44a5-a7bf-14e9e05fe9aa",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "746adf17-3b32-46b0-b753-9774cf7f73d1"
                },
                "type": "enter_flow",
                "uuid": "b61339f8-adcc-41fb-88f0-9ad17a87b83e"
              }
            ],
            "exits": [
              {
                "uuid": "45d75b24-ef64-4714-ab5d-1ba9b292b059",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a0c59b83-de7e-47f5-8186-7c88c2c4ff7b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "49ea8362-124d-4a34-bfa7-5267742339a9",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "45a48cab-bd06-4527-89f8-5838f4664376"
              }
            ],
            "exits": [
              {
                "uuid": "6ec2c783-ccbb-4348-8fdd-bb04c3b0561f",
                "destination_uuid": "cff149e3-a7c7-459b-9bd6-6a1dc5ad9d84"
              }
            ]
          },
          {
            "uuid": "cff149e3-a7c7-459b-9bd6-6a1dc5ad9d84",
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
                "uuid": "7fdc0b2a-f88b-4b38-a191-2145ae324e52"
              }
            ],
            "exits": [
              {
                "uuid": "43441b51-94d6-4180-a950-8eaee81b1610",
                "destination_uuid": "7aa980d9-03dd-4772-aefe-de61ff28f4ee"
              }
            ]
          },
          {
            "uuid": "7aa980d9-03dd-4772-aefe-de61ff28f4ee",
            "actions": [],
            "exits": [
              {
                "uuid": "b5316b05-7cf3-4d1c-a0df-e426b865cb39",
                "destination_uuid": "53645cb6-ab44-4359-befa-271a10a5abc7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b477e2bb-e835-4f5a-b739-72869e53867c",
              "cases": [],
              "categories": [
                {
                  "uuid": "b477e2bb-e835-4f5a-b739-72869e53867c",
                  "name": "All Responses",
                  "exit_uuid": "b5316b05-7cf3-4d1c-a0df-e426b865cb39"
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
            "uuid": "53645cb6-ab44-4359-befa-271a10a5abc7",
            "actions": [
              {
                "uuid": "d5394682-a056-4c9a-a50a-f579d2549b22",
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
                "uuid": "505df6e8-4ed7-4079-8638-54f4c3a9d21c",
                "destination_uuid": "6469e31c-b61d-425c-875c-27e7b7a9be39"
              }
            ]
          },
          {
            "uuid": "6469e31c-b61d-425c-875c-27e7b7a9be39",
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
                "uuid": "e3f6f487-5d13-41bc-98a9-a3e8356cb953"
              }
            ],
            "exits": [
              {
                "uuid": "64946657-eed3-4687-8cb7-2ed9e60f4d0e",
                "destination_uuid": "8b80777a-b36c-4173-b0fa-af5f1da2a881"
              }
            ]
          },
          {
            "uuid": "8b80777a-b36c-4173-b0fa-af5f1da2a881",
            "actions": [],
            "exits": [
              {
                "uuid": "1dec5dd0-0eb3-44b2-ba39-dfd8ac10403d",
                "destination_uuid": "6ecd776e-cf0b-4464-8588-c064488eceb1"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "87512e19-15ba-4192-bf90-89b74f0c5aa3",
              "cases": [],
              "categories": [
                {
                  "uuid": "87512e19-15ba-4192-bf90-89b74f0c5aa3",
                  "name": "All Responses",
                  "exit_uuid": "1dec5dd0-0eb3-44b2-ba39-dfd8ac10403d"
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
            "uuid": "6ecd776e-cf0b-4464-8588-c064488eceb1",
            "actions": [
              {
                "uuid": "774d4760-d503-4012-b351-a1f84381f673",
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
                "uuid": "2c71f2ed-87cf-4dd4-97db-c894bee79049",
                "destination_uuid": "11077fa4-24a8-4429-99db-4b0b99c6b841"
              }
            ]
          },
          {
            "uuid": "11077fa4-24a8-4429-99db-4b0b99c6b841",
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
                "uuid": "9bbaa752-6697-48d4-8a03-9484a5a23ce3"
              }
            ],
            "exits": [
              {
                "uuid": "de5985f6-41d6-4980-aaff-d5a34f7ea191",
                "destination_uuid": "43329a86-e546-42d0-b6f8-537eda28220d"
              }
            ]
          },
          {
            "uuid": "43329a86-e546-42d0-b6f8-537eda28220d",
            "actions": [],
            "exits": [
              {
                "uuid": "8b0fc612-019e-44f1-8733-7dad447ad7df",
                "destination_uuid": "c753145f-d903-4ca0-b2a0-44e9f48daad3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b72fed5b-b9ce-49e2-a6db-89c8f57e3f5a",
              "cases": [],
              "categories": [
                {
                  "uuid": "b72fed5b-b9ce-49e2-a6db-89c8f57e3f5a",
                  "name": "All Responses",
                  "exit_uuid": "8b0fc612-019e-44f1-8733-7dad447ad7df"
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
            "uuid": "c753145f-d903-4ca0-b2a0-44e9f48daad3",
            "actions": [
              {
                "uuid": "a1ad85ef-ff9e-4408-9c16-eb0dc5411cea",
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
                "uuid": "ed008bbb-5a5a-4811-85f3-cf9269ea8e2a",
                "destination_uuid": "d1d14b63-ac42-43cf-bd98-a727b4ce1f7f"
              }
            ]
          },
          {
            "uuid": "d1d14b63-ac42-43cf-bd98-a727b4ce1f7f",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "ec521927-69ea-428a-9afe-ef8c003c0dc9"
              }
            ],
            "exits": [
              {
                "uuid": "3094369e-2bff-485c-93e9-f5d9733f7e89",
                "destination_uuid": "1c1ed886-dbae-4d57-ac24-3af6a9b307d6"
              }
            ]
          },
          {
            "uuid": "1c1ed886-dbae-4d57-ac24-3af6a9b307d6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4e758d48-8648-4e73-a3cc-b82726512423",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "c161aad4-35ae-4144-8588-5ad5eae1d9e8",
                  "type": "has_only_phrase",
                  "uuid": "e8fdb943-ef17-43c1-b6d6-87e8f0ede15a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "889e3ecf-b56a-49ce-b700-d1d8249b9d17",
                  "name": "All Responses",
                  "uuid": "4e758d48-8648-4e73-a3cc-b82726512423"
                },
                {
                  "exit_uuid": "e8652a81-3975-483b-8efc-3c5d07855e96",
                  "name": "Take me to Homescreen",
                  "uuid": "c161aad4-35ae-4144-8588-5ad5eae1d9e8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "889e3ecf-b56a-49ce-b700-d1d8249b9d17",
                "destination_uuid": null
              },
              {
                "uuid": "e8652a81-3975-483b-8efc-3c5d07855e96",
                "destination_uuid": "a4cd036a-2afd-4ff7-850f-efeb3dbc8267"
              }
            ]
          },
          {
            "uuid": "a4cd036a-2afd-4ff7-850f-efeb3dbc8267",
            "actions": [
              {
                "uuid": "693d2f75-6161-4e9d-8376-25a5fddda5a9",
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
                "uuid": "ed1aef0a-5164-4015-8ada-4964b3a9e099",
                "destination_uuid": "227f0f5e-3fea-4cfb-a84c-dcc10b603e0b"
              }
            ]
          },
          {
            "uuid": "227f0f5e-3fea-4cfb-a84c-dcc10b603e0b",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "34c2a4bc-cf84-417d-9427-52f8efba8bb1"
                },
                "type": "enter_flow",
                "uuid": "0cba11f3-7a4f-4984-b218-7b3a356b2253"
              }
            ],
            "exits": [
              {
                "uuid": "66c29d40-3cc5-476d-b901-04ae4b47bdaf",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ac310d45-e5fe-4b73-84b1-67b59d5cfacf",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ef402560-4029-44f5-822b-08971a0f83c5",
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
                "uuid": "17987773-8e14-4782-94dc-e54ca713f3ed"
              }
            ],
            "exits": [
              {
                "uuid": "1e15203e-5cde-4dd5-9aa0-b647f29a03cc",
                "destination_uuid": "439a0843-a879-4e97-9eda-c7956d519774"
              }
            ]
          },
          {
            "uuid": "439a0843-a879-4e97-9eda-c7956d519774",
            "actions": [],
            "exits": [
              {
                "uuid": "d17c8a54-bd59-4ec9-a4e6-6f13b08b87e3",
                "destination_uuid": "d0909d55-11e7-479d-ab66-831c8a1cea05"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7567171a-f2fe-4bee-983d-57bd0d90f247",
              "cases": [],
              "categories": [
                {
                  "uuid": "7567171a-f2fe-4bee-983d-57bd0d90f247",
                  "name": "All Responses",
                  "exit_uuid": "d17c8a54-bd59-4ec9-a4e6-6f13b08b87e3"
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
            "uuid": "d0909d55-11e7-479d-ab66-831c8a1cea05",
            "actions": [
              {
                "uuid": "cb9f83f3-96f9-4d51-beaa-07a58d7d4462",
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
                "uuid": "b9174b31-7feb-4b31-9adc-3df028cb191d",
                "destination_uuid": "dc59bd0c-caca-4aa4-ae95-005f6e9dc1d8"
              }
            ]
          },
          {
            "uuid": "dc59bd0c-caca-4aa4-ae95-005f6e9dc1d8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fa989b43-5aad-4baf-8413-2fe1be0cc757",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "43b333f6-1609-448f-ac38-f238fdddb3a7",
                  "type": "has_only_phrase",
                  "uuid": "f7d4f0d0-927c-4446-8ca8-0cc21da17ec1"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "786bc2c6-6731-4080-b069-2fce3394d5ff",
                  "type": "has_only_phrase",
                  "uuid": "cb8a993b-b228-4682-9121-54d456ad21b8"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "4e05664e-c740-4353-886d-d5a1ed595cf0",
                  "type": "has_only_phrase",
                  "uuid": "29daa278-e3d2-43e5-9978-c0ab43102aad"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8b16cf0f-d5f9-4117-9867-3a31d5149bc1",
                  "name": "All Responses",
                  "uuid": "fa989b43-5aad-4baf-8413-2fe1be0cc757"
                },
                {
                  "exit_uuid": "d4806667-dac6-407a-ae89-f7e24899865f",
                  "name": "Great",
                  "uuid": "43b333f6-1609-448f-ac38-f238fdddb3a7"
                },
                {
                  "exit_uuid": "1985691f-dd66-46d5-837b-6a0ce6f73ad8",
                  "name": "Neutral",
                  "uuid": "786bc2c6-6731-4080-b069-2fce3394d5ff"
                },
                {
                  "exit_uuid": "edb99cec-4177-47db-a6d2-81c87e5ebac2",
                  "name": "Bad",
                  "uuid": "4e05664e-c740-4353-886d-d5a1ed595cf0"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "8b16cf0f-d5f9-4117-9867-3a31d5149bc1",
                "destination_uuid": null
              },
              {
                "uuid": "d4806667-dac6-407a-ae89-f7e24899865f",
                "destination_uuid": "93ab9b92-8460-4597-b718-2f7183b8aebb"
              },
              {
                "uuid": "1985691f-dd66-46d5-837b-6a0ce6f73ad8",
                "destination_uuid": "f60f2c7a-30a4-435d-b6a2-1a2a6ce97c49"
              },
              {
                "uuid": "edb99cec-4177-47db-a6d2-81c87e5ebac2",
                "destination_uuid": "19432f35-8d02-43f1-88f8-906736b4315a"
              }
            ]
          },
          {
            "uuid": "93ab9b92-8460-4597-b718-2f7183b8aebb",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d7e0196a-f7d0-4d76-be25-8738d17f5d59"
              }
            ],
            "exits": [
              {
                "uuid": "cbe14a13-1f6b-48a8-80e1-8657c04ada3c",
                "destination_uuid": "6d17d36d-62fa-46e9-b191-1105f23ceb23"
              }
            ]
          },
          {
            "uuid": "f60f2c7a-30a4-435d-b6a2-1a2a6ce97c49",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b187d4d6-6e93-4746-bf45-b62c7f8269a8"
              }
            ],
            "exits": [
              {
                "uuid": "12a11192-4917-4652-9c6e-d28f1420fcc1",
                "destination_uuid": "6d17d36d-62fa-46e9-b191-1105f23ceb23"
              }
            ]
          },
          {
            "uuid": "6d17d36d-62fa-46e9-b191-1105f23ceb23",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "3784c532-d71c-4761-b46a-266e75651704"
                },
                "type": "enter_flow",
                "uuid": "1d1f4ced-166d-4232-a15f-2e1f1b05fd98"
              }
            ],
            "exits": [
              {
                "uuid": "4776a8aa-05fd-440e-9906-4bf72221f478",
                "destination_uuid": "9ffb4f74-9ca8-4611-afcf-b3eb1d5b284f"
              },
              {
                "uuid": "ed611581-e3ef-4377-bc52-61153271d7f5",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "83ef1272-3407-4010-84a7-498129b1b838",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "db4e017b-a605-4d81-bcc3-c6e7af396357"
                },
                {
                  "uuid": "c3d930f4-5f41-4e34-aab3-18c6cb58e377",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "8542053c-d6fd-4988-b300-c141fb322de4"
                }
              ],
              "categories": [
                {
                  "uuid": "db4e017b-a605-4d81-bcc3-c6e7af396357",
                  "name": "Complete",
                  "exit_uuid": "4776a8aa-05fd-440e-9906-4bf72221f478"
                },
                {
                  "uuid": "8542053c-d6fd-4988-b300-c141fb322de4",
                  "name": "Expired",
                  "exit_uuid": "ed611581-e3ef-4377-bc52-61153271d7f5"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "db4e017b-a605-4d81-bcc3-c6e7af396357"
            }
          },
          {
            "uuid": "9ffb4f74-9ca8-4611-afcf-b3eb1d5b284f",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "cf953fa6-a0b7-433e-b29e-847d7a71a21d"
                },
                "type": "enter_flow",
                "uuid": "342ddbe5-f158-4939-9ec1-745f8ff61324"
              }
            ],
            "exits": [
              {
                "uuid": "b4b98993-75f4-4c95-83f2-ca52c6167d70",
                "destination_uuid": "1bde1f9a-6bd6-4dd9-9d15-9c8ce39f510c"
              },
              {
                "uuid": "6f24e1c9-3b1d-42e6-94fe-3e690b65c6a7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c3fe9545-dfb3-47d3-8c31-b479ff7e4687",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a9d026ea-061a-4e9f-9db7-c3835d821521"
                },
                {
                  "uuid": "7526bf65-f6c5-4bf7-91ad-790ad3efa230",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "5961535d-2733-4401-83f6-a90386d0a4fa"
                }
              ],
              "categories": [
                {
                  "uuid": "a9d026ea-061a-4e9f-9db7-c3835d821521",
                  "name": "Complete",
                  "exit_uuid": "b4b98993-75f4-4c95-83f2-ca52c6167d70"
                },
                {
                  "uuid": "5961535d-2733-4401-83f6-a90386d0a4fa",
                  "name": "Expired",
                  "exit_uuid": "6f24e1c9-3b1d-42e6-94fe-3e690b65c6a7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a9d026ea-061a-4e9f-9db7-c3835d821521"
            }
          },
          {
            "uuid": "19432f35-8d02-43f1-88f8-906736b4315a",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e057d0a6-99da-4a50-96a6-f82ca3dc0a64"
              }
            ],
            "exits": [
              {
                "uuid": "5bad492d-3994-4565-af2a-087a0b09a45d",
                "destination_uuid": "7021e9f2-09de-4cb3-97f8-e21823449016"
              }
            ]
          },
          {
            "uuid": "7021e9f2-09de-4cb3-97f8-e21823449016",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "eaf48057-4889-4f15-9452-583f025dd76a"
                },
                "type": "enter_flow",
                "uuid": "8a79cb37-2eea-4a5e-8464-4075aef5a311"
              }
            ],
            "exits": [
              {
                "uuid": "5516d7e1-7840-4f00-9ea5-2345be4a47b1",
                "destination_uuid": "02495a08-6abc-4011-bff3-ef27a5be70ef"
              },
              {
                "uuid": "b08fb83a-cc77-4a08-9334-96f2b06f6b82",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "80c109b3-a7d6-4a89-848f-63565bbc87e1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "6674edad-506b-4a44-a4d4-b9bd1ed35860"
                },
                {
                  "uuid": "42d9a552-a8d8-4d9a-b294-6fb04e595037",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b6ffb309-5052-41ef-9bc8-e8084b67c29f"
                }
              ],
              "categories": [
                {
                  "uuid": "6674edad-506b-4a44-a4d4-b9bd1ed35860",
                  "name": "Complete",
                  "exit_uuid": "5516d7e1-7840-4f00-9ea5-2345be4a47b1"
                },
                {
                  "uuid": "b6ffb309-5052-41ef-9bc8-e8084b67c29f",
                  "name": "Expired",
                  "exit_uuid": "b08fb83a-cc77-4a08-9334-96f2b06f6b82"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "6674edad-506b-4a44-a4d4-b9bd1ed35860"
            }
          },
          {
            "uuid": "02495a08-6abc-4011-bff3-ef27a5be70ef",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "8bcf9eec-b531-49b3-b049-a709fbd6047c"
                },
                "type": "enter_flow",
                "uuid": "e64aab16-8d3a-42c7-a393-d0b42ef9ab11"
              }
            ],
            "exits": [
              {
                "uuid": "95b4764f-8832-41dc-ae6a-99d0981d66e0",
                "destination_uuid": "1bde1f9a-6bd6-4dd9-9d15-9c8ce39f510c"
              },
              {
                "uuid": "27f2f8f7-216b-4464-8711-d72a5e7ae0b0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "30504daf-db71-4fff-8ce7-a143a0c50527",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7fd0e776-eb27-401f-9bfe-5114b42b6495"
                },
                {
                  "uuid": "961a60a8-ec0b-4952-921b-bc0faa2a5cdc",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "59bf782e-7121-439c-9359-c64bc26950c2"
                }
              ],
              "categories": [
                {
                  "uuid": "7fd0e776-eb27-401f-9bfe-5114b42b6495",
                  "name": "Complete",
                  "exit_uuid": "95b4764f-8832-41dc-ae6a-99d0981d66e0"
                },
                {
                  "uuid": "59bf782e-7121-439c-9359-c64bc26950c2",
                  "name": "Expired",
                  "exit_uuid": "27f2f8f7-216b-4464-8711-d72a5e7ae0b0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7fd0e776-eb27-401f-9bfe-5114b42b6495"
            }
          },
          {
            "uuid": "1bde1f9a-6bd6-4dd9-9d15-9c8ce39f510c",
            "actions": [
              {
                "uuid": "d8790a78-36c0-4c0f-aa44-26f15b33a981",
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
                "uuid": "7075cca0-a963-44d8-88a4-defbf2bb784c",
                "destination_uuid": "86bb863c-55af-4198-8e03-d15e75343017"
              }
            ]
          },
          {
            "uuid": "86bb863c-55af-4198-8e03-d15e75343017",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "075b7618-9c8e-4a5c-ba61-e7ef4adabb8b"
                },
                "type": "enter_flow",
                "uuid": "dfd24916-c1d9-4019-88c1-cd687f12457e"
              }
            ],
            "exits": [
              {
                "uuid": "8cc88f50-89e2-4dc6-be5b-3c4f84c978e8",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "7a6a38fd-82b8-4442-9cd3-088b9934c5c2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f41f3502-6f65-4a1a-9ce5-786924072c99",
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
                "uuid": "e5879939-4fd1-48fc-9cde-de33ff6de0ea"
              }
            ],
            "exits": [
              {
                "uuid": "e8e0d568-9fd9-464e-bcc6-fde4d8b4cc18",
                "destination_uuid": "ab10219f-ac1b-45d4-8e23-0447c2e0c60c"
              }
            ]
          },
          {
            "uuid": "ab10219f-ac1b-45d4-8e23-0447c2e0c60c",
            "actions": [],
            "exits": [
              {
                "uuid": "fd5a832b-acf4-424d-b0c7-76e2b75b74e4",
                "destination_uuid": "67971c3d-6fbd-478b-babb-81bd88f2110c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a66edfd6-8ccb-4a9d-a98f-3e90ffb95c4a",
              "cases": [],
              "categories": [
                {
                  "uuid": "a66edfd6-8ccb-4a9d-a98f-3e90ffb95c4a",
                  "name": "All Responses",
                  "exit_uuid": "fd5a832b-acf4-424d-b0c7-76e2b75b74e4"
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
            "uuid": "67971c3d-6fbd-478b-babb-81bd88f2110c",
            "actions": [
              {
                "uuid": "72b480c0-4cea-4074-8548-b0f42fabcb00",
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
                "uuid": "3a517f1b-cc4d-4205-8cc2-05ac6cce3f08",
                "destination_uuid": "c5de5a22-abba-4077-a323-44acf5c337d1"
              }
            ]
          },
          {
            "uuid": "c5de5a22-abba-4077-a323-44acf5c337d1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0cac127e-0d2e-4c37-8d3c-dc5586b053ab",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "1c226cde-d10d-4eaf-9028-76521f5dc919",
                  "type": "has_only_phrase",
                  "uuid": "8dbad6c0-6abb-47ca-b49c-a1be8dc1e201"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "48ab7704-41e0-488c-b2c5-72ba51790eeb",
                  "type": "has_only_phrase",
                  "uuid": "2b1db601-9ef8-4f09-94d5-8c6203b95ce6"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "2d8fe2cf-7f93-4ae4-bcd5-f45a4449937a",
                  "type": "has_only_phrase",
                  "uuid": "a870c18f-089a-4d9b-8ce2-6b103372bbc5"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "a597b7a5-35d8-49c8-9d7a-df9886dd3d27",
                  "type": "has_only_phrase",
                  "uuid": "c2bfc228-dd5e-4f7c-8cb4-7881f3e37968"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "3b7db4b8-ddbb-4443-b331-7c1f327dfe9a",
                  "type": "has_only_phrase",
                  "uuid": "03a22c37-3f00-4b11-b1b8-27589cd4bf47"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "6b5a82d8-9783-431c-8de3-78f82c169cf3",
                  "type": "has_only_phrase",
                  "uuid": "6587d452-c3da-4fff-b039-e504e3282087"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "fa3b3357-ae23-4199-8fad-d5a004227a28",
                  "type": "has_only_phrase",
                  "uuid": "86577b7e-f07f-4315-9161-41732cb15435"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f069d582-b4fc-4054-9c26-b2ccbe1899c2",
                  "name": "All Responses",
                  "uuid": "0cac127e-0d2e-4c37-8d3c-dc5586b053ab"
                },
                {
                  "exit_uuid": "01f32785-4452-4378-9264-7b8e19001702",
                  "name": "Do it every day",
                  "uuid": "1c226cde-d10d-4eaf-9028-76521f5dc919"
                },
                {
                  "exit_uuid": "b4153557-794a-4743-bbf0-e5d6d2abd522",
                  "name": "Let your teen choose the activity",
                  "uuid": "48ab7704-41e0-488c-b2c5-72ba51790eeb"
                },
                {
                  "exit_uuid": "9ace6d97-a940-46c6-b37d-ca97bcea53ed",
                  "name": "Follow your teen’s lead",
                  "uuid": "2d8fe2cf-7f93-4ae4-bcd5-f45a4449937a"
                },
                {
                  "exit_uuid": "68d9d5d5-5e46-4790-9f6a-1da6bec21fdb",
                  "name": "Give your teen all of your attention",
                  "uuid": "a597b7a5-35d8-49c8-9d7a-df9886dd3d27"
                },
                {
                  "exit_uuid": "2843e351-5c20-43b2-a7cc-e10b0eab3da9",
                  "name": "Show your teen you are really listening",
                  "uuid": "3b7db4b8-ddbb-4443-b331-7c1f327dfe9a"
                },
                {
                  "exit_uuid": "8951f115-603b-4422-8896-30b48304e4e5",
                  "name": "Have fun!",
                  "uuid": "6b5a82d8-9783-431c-8de3-78f82c169cf3"
                },
                {
                  "exit_uuid": "ac918d28-427c-4324-8d95-6466877ae428",
                  "name": "None ",
                  "uuid": "fa3b3357-ae23-4199-8fad-d5a004227a28"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "f069d582-b4fc-4054-9c26-b2ccbe1899c2",
                "destination_uuid": null
              },
              {
                "uuid": "01f32785-4452-4378-9264-7b8e19001702",
                "destination_uuid": "50893bd2-e144-4429-9a85-fc2789b681b5"
              },
              {
                "uuid": "b4153557-794a-4743-bbf0-e5d6d2abd522",
                "destination_uuid": "8294cf9e-58cf-4781-bba5-678ee2f3e880"
              },
              {
                "uuid": "9ace6d97-a940-46c6-b37d-ca97bcea53ed",
                "destination_uuid": "dead4878-b506-4e6a-a2b5-f0be9171e85e"
              },
              {
                "uuid": "68d9d5d5-5e46-4790-9f6a-1da6bec21fdb",
                "destination_uuid": "6d1b2897-0d85-4364-b171-08e711f96d41"
              },
              {
                "uuid": "2843e351-5c20-43b2-a7cc-e10b0eab3da9",
                "destination_uuid": "7328661d-ce18-4587-82cb-c11be6d280ff"
              },
              {
                "uuid": "8951f115-603b-4422-8896-30b48304e4e5",
                "destination_uuid": "f4c5f42e-0abf-422b-9ea5-ca20df3c13d1"
              },
              {
                "uuid": "ac918d28-427c-4324-8d95-6466877ae428",
                "destination_uuid": "8b651808-eff2-43c9-856a-e32e144d19df"
              }
            ]
          },
          {
            "uuid": "50893bd2-e144-4429-9a85-fc2789b681b5",
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
                "uuid": "0cd54746-e88d-4ce3-8399-7b886da6c79e"
              }
            ],
            "exits": [
              {
                "uuid": "bd0ffe61-f5d5-423b-bbc4-76f3082944a0",
                "destination_uuid": "94cffdbe-fba1-4b02-936d-1638d9b33eb1"
              }
            ]
          },
          {
            "uuid": "94cffdbe-fba1-4b02-936d-1638d9b33eb1",
            "actions": [],
            "exits": [
              {
                "uuid": "f0655de0-c20f-4509-8cee-a3a25c16e111",
                "destination_uuid": "84458379-d0ce-4514-8a7e-39fcbaaa658f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "af88ae70-e0c8-4296-964a-e5245259a426",
              "cases": [],
              "categories": [
                {
                  "uuid": "af88ae70-e0c8-4296-964a-e5245259a426",
                  "name": "All Responses",
                  "exit_uuid": "f0655de0-c20f-4509-8cee-a3a25c16e111"
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
            "uuid": "84458379-d0ce-4514-8a7e-39fcbaaa658f",
            "actions": [
              {
                "uuid": "3c63a7d3-cb9d-45f9-afba-cf83e7481b70",
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
                "uuid": "4a68371a-c9df-4060-83a3-a15c5c4d4173",
                "destination_uuid": "ddec255c-d9b6-411d-82b9-495179cfed9e"
              }
            ]
          },
          {
            "uuid": "ddec255c-d9b6-411d-82b9-495179cfed9e",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bd8d8b8d-ea68-46c3-85dc-00f9d84632fc"
              }
            ],
            "exits": [
              {
                "uuid": "353def48-205f-4f49-a84e-83eae92d5a47",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "8294cf9e-58cf-4781-bba5-678ee2f3e880",
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
                "uuid": "18ed2136-b6b8-48e0-8b90-5b12f8fde2be"
              }
            ],
            "exits": [
              {
                "uuid": "da3ba295-ca08-4e1e-9f1c-0b00fdaffbd3",
                "destination_uuid": "ba14eae1-74b3-49f1-88c3-22a98d65c4d1"
              }
            ]
          },
          {
            "uuid": "ba14eae1-74b3-49f1-88c3-22a98d65c4d1",
            "actions": [],
            "exits": [
              {
                "uuid": "5ee7162e-ad1e-4496-a6ce-4a49233eab0b",
                "destination_uuid": "00a17e55-577d-42af-83a4-29fbd1414c00"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "eeac0a78-9a77-4656-9bdb-292e0b374cdf",
              "cases": [],
              "categories": [
                {
                  "uuid": "eeac0a78-9a77-4656-9bdb-292e0b374cdf",
                  "name": "All Responses",
                  "exit_uuid": "5ee7162e-ad1e-4496-a6ce-4a49233eab0b"
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
            "uuid": "00a17e55-577d-42af-83a4-29fbd1414c00",
            "actions": [
              {
                "uuid": "c25ecef1-66c1-4664-bdc7-3596c63f0afc",
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
                "uuid": "a6d85289-d85a-45ba-85a3-1f2d66eaaac8",
                "destination_uuid": "ac17eb4b-c6d2-4c75-8b88-00d0da0f9973"
              }
            ]
          },
          {
            "uuid": "ac17eb4b-c6d2-4c75-8b88-00d0da0f9973",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "71b717ae-fadb-4cab-a66c-b2184c78e769"
              }
            ],
            "exits": [
              {
                "uuid": "f525bf3e-e3b1-49a7-ba9d-6e908337d03f",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "dead4878-b506-4e6a-a2b5-f0be9171e85e",
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
                "uuid": "2dbee65e-ba8d-495d-9c8a-fea06b53c84a"
              }
            ],
            "exits": [
              {
                "uuid": "0570c11e-5996-4cc8-82b3-9f89102efc55",
                "destination_uuid": "a115527f-b119-4b98-8098-8f33106b1b3e"
              }
            ]
          },
          {
            "uuid": "a115527f-b119-4b98-8098-8f33106b1b3e",
            "actions": [],
            "exits": [
              {
                "uuid": "ebd8e44c-5ffa-44f8-99cc-81a3b4716227",
                "destination_uuid": "aae1efd1-f6af-4944-9d7a-f8a45e5c09bf"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3dbc2637-5096-4e51-af83-339bff780e14",
              "cases": [],
              "categories": [
                {
                  "uuid": "3dbc2637-5096-4e51-af83-339bff780e14",
                  "name": "All Responses",
                  "exit_uuid": "ebd8e44c-5ffa-44f8-99cc-81a3b4716227"
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
            "uuid": "aae1efd1-f6af-4944-9d7a-f8a45e5c09bf",
            "actions": [
              {
                "uuid": "76fcd34c-687e-49a5-9cbb-c6b7063a52fa",
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
                "uuid": "69fb9126-6983-4a0c-b1ae-aacd870c719e",
                "destination_uuid": "ad204266-9adb-4958-aa3a-3cd87e25d84d"
              }
            ]
          },
          {
            "uuid": "ad204266-9adb-4958-aa3a-3cd87e25d84d",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cf081a14-75e2-4909-84db-fba12591747e"
              }
            ],
            "exits": [
              {
                "uuid": "708103dc-acfd-4a19-966c-17fa8ad309d5",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "6d1b2897-0d85-4364-b171-08e711f96d41",
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
                "uuid": "a35cd759-0240-481c-a503-6100f04e89b1"
              }
            ],
            "exits": [
              {
                "uuid": "1b8b89ad-da7b-4b7e-82b7-966d323b58e2",
                "destination_uuid": "4d2fb50f-66b0-4b35-9300-97eefd51d439"
              }
            ]
          },
          {
            "uuid": "4d2fb50f-66b0-4b35-9300-97eefd51d439",
            "actions": [],
            "exits": [
              {
                "uuid": "542b2ec2-bf6e-482a-b686-1fb8713ad22a",
                "destination_uuid": "df600a42-859f-4fbd-9452-104325cbf98a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3afeb4bf-3c73-48d5-b9e7-29f640ac46ab",
              "cases": [],
              "categories": [
                {
                  "uuid": "3afeb4bf-3c73-48d5-b9e7-29f640ac46ab",
                  "name": "All Responses",
                  "exit_uuid": "542b2ec2-bf6e-482a-b686-1fb8713ad22a"
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
            "uuid": "df600a42-859f-4fbd-9452-104325cbf98a",
            "actions": [
              {
                "uuid": "4d3ee400-f639-47d4-9fad-bb5d2d066bcf",
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
                "uuid": "c1994da8-540c-4e97-ab63-82499b56e078",
                "destination_uuid": "c8d073c0-3295-4145-8a68-5c317dbe98a0"
              }
            ]
          },
          {
            "uuid": "c8d073c0-3295-4145-8a68-5c317dbe98a0",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d35c20bb-4fa1-46f6-9b78-79048bde6bed"
              }
            ],
            "exits": [
              {
                "uuid": "d5881ace-f271-435f-ac4c-4bc1591bdcb4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7328661d-ce18-4587-82cb-c11be6d280ff",
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
                "uuid": "0bf84f33-0e37-4121-a31d-708059db82ff"
              }
            ],
            "exits": [
              {
                "uuid": "16b99dd0-8ed1-49e9-b36b-5f4c81853e0b",
                "destination_uuid": "db50536c-05b2-41f4-bdef-d50200b370ac"
              }
            ]
          },
          {
            "uuid": "db50536c-05b2-41f4-bdef-d50200b370ac",
            "actions": [],
            "exits": [
              {
                "uuid": "149fe76c-0afd-48cd-941e-04c63b65cb24",
                "destination_uuid": "d3b7e52b-f603-4385-8776-7bf5b6c45a1c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fede8da2-78d6-4b39-8f46-f63729c0e031",
              "cases": [],
              "categories": [
                {
                  "uuid": "fede8da2-78d6-4b39-8f46-f63729c0e031",
                  "name": "All Responses",
                  "exit_uuid": "149fe76c-0afd-48cd-941e-04c63b65cb24"
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
            "uuid": "d3b7e52b-f603-4385-8776-7bf5b6c45a1c",
            "actions": [
              {
                "uuid": "4bda35f0-9711-427f-b234-146f45cf1b65",
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
                "uuid": "8fd647fb-9d75-4831-a09a-1b12e486a693",
                "destination_uuid": "671081c0-bb52-4429-af59-2137d2794ad1"
              }
            ]
          },
          {
            "uuid": "671081c0-bb52-4429-af59-2137d2794ad1",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e2860184-c6d7-4d55-a3d3-757113aeb734"
              }
            ],
            "exits": [
              {
                "uuid": "39775b02-037b-49c8-8987-809224cf1b5b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f4c5f42e-0abf-422b-9ea5-ca20df3c13d1",
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
                "uuid": "7824c647-4bb6-4c4d-9005-bfdf52892136"
              }
            ],
            "exits": [
              {
                "uuid": "bbe6d7a6-ea8d-464d-bf1c-e6456b3b7c15",
                "destination_uuid": "a30d5133-7d4a-41e9-bab0-c1d24339f76a"
              }
            ]
          },
          {
            "uuid": "a30d5133-7d4a-41e9-bab0-c1d24339f76a",
            "actions": [],
            "exits": [
              {
                "uuid": "bbf66a08-ce1f-4850-8735-17b219a48912",
                "destination_uuid": "06f5a84b-82c6-4be7-b55a-e0fb9e189f16"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6640eba0-88d8-4794-a5df-76553deafffa",
              "cases": [],
              "categories": [
                {
                  "uuid": "6640eba0-88d8-4794-a5df-76553deafffa",
                  "name": "All Responses",
                  "exit_uuid": "bbf66a08-ce1f-4850-8735-17b219a48912"
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
            "uuid": "06f5a84b-82c6-4be7-b55a-e0fb9e189f16",
            "actions": [
              {
                "uuid": "ef07862d-3881-46a7-bd89-86f57455cd46",
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
                "uuid": "e381e92a-b1fc-4053-a955-9d25076f90c9",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "11d0cc91-d609-4f32-8998-ca324ce8db29",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fe7f1d88-a42b-4a94-a599-e9bd6271b15d"
              }
            ],
            "exits": [
              {
                "uuid": "3a085890-8195-42e5-9edb-072e32706410",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "8b651808-eff2-43c9-856a-e32e144d19df",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9f4a4a72-84a9-4215-adc9-a8da21356c67"
              }
            ],
            "exits": [
              {
                "uuid": "62a2b5c4-fd62-4fee-8dad-30fc9cd758a8",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ee9a3201-bfb0-4c42-8f6e-ea849f0d414f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "cbd862f8-4995-498b-9740-373f92f6be6e",
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
                "uuid": "e9b50e57-a0b7-4895-9d2a-5fe987fe14ee"
              }
            ],
            "exits": [
              {
                "uuid": "90d22b5b-c5fa-44d2-ae9c-fff126ad6050",
                "destination_uuid": "a479b29d-2c77-41f5-9e1d-1ca963801be0"
              }
            ]
          },
          {
            "uuid": "9c7981ce-25ac-4dc1-bfb5-86a8b55b0834",
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
                "uuid": "3a3ee4cb-3e6c-4d10-96bf-05c9412cd2d1"
              }
            ],
            "exits": [
              {
                "uuid": "dfa27393-f5f1-445b-9492-99ead006691a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "9a5c21a8-71b9-43cb-90ba-728cf018cc4f",
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
                "uuid": "4c3f78f4-8882-4df9-9ec8-cbaeca9388e4"
              }
            ],
            "exits": [
              {
                "uuid": "db7f4ec4-067d-4125-a7c7-e30131f036c0",
                "destination_uuid": "a479b29d-2c77-41f5-9e1d-1ca963801be0"
              }
            ]
          },
          {
            "uuid": "a479b29d-2c77-41f5-9e1d-1ca963801be0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9d30e9e0-50ca-4afd-93dd-06a712e21400",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "2c2c2d68-434c-4290-a6a9-9b7a1b1eb25b",
                  "type": "has_only_phrase",
                  "uuid": "5870d9ac-2512-4d4a-99d2-df347bc4acdd"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "c10e47d8-b7b2-4fa5-b6ef-3694410a9e0b",
                  "type": "has_only_phrase",
                  "uuid": "cf12b348-c4f5-4810-8b1e-a130a0f9b966"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "bf6e2ce4-2685-4bd6-a15c-4077a15fdb61",
                  "type": "has_only_phrase",
                  "uuid": "29c02977-4397-4b7d-afb4-5df7c1d82ba0"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "37b4e998-1c2b-4764-bc5b-85ae9dd18a39",
                  "type": "has_only_phrase",
                  "uuid": "d2a795ff-99a9-4c1a-9809-93a41ebeb833"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "5ff84a06-a4d0-432c-b36e-15600e1ae25c",
                  "type": "has_only_phrase",
                  "uuid": "80cf9b6d-d0c5-4e79-af88-0f975e6519ba"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "97f9714a-6900-4b0e-b3a6-fe1009926dea",
                  "type": "has_only_phrase",
                  "uuid": "eb132996-1352-44b4-9163-8352f9ad66c7"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "4eb53ba9-c274-4646-a672-f042b891b952",
                  "type": "has_only_phrase",
                  "uuid": "466fe87c-9450-41a5-8a19-88e03b731712"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "25b9ddb1-997f-4f4f-85e5-39afe1fc4faf",
                  "type": "has_only_phrase",
                  "uuid": "2305e187-7c7e-41e3-ba26-e01db43b1e74"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "c555ced6-7685-4b53-ad99-cba970c34112",
                  "type": "has_only_phrase",
                  "uuid": "cd083ef4-3616-4e4f-9116-60f7b8df76f5"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "5879d038-2659-4a39-87d4-8cd80f2cff44",
                  "type": "has_only_phrase",
                  "uuid": "d732f9ff-eafc-4698-8811-bd640bf6027e"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "6ebd99dd-6ae6-4987-84e7-3d85ba4e503f",
                  "type": "has_only_phrase",
                  "uuid": "ac095296-ef7c-4abe-a9fc-210d2340b8b6"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "bd55afe0-a131-4f13-8be0-14c7ba9a6181",
                  "type": "has_only_phrase",
                  "uuid": "2ec96ab3-6d1d-421a-8dca-b8d0c743e4bd"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "37bcb770-281f-4839-a493-2e4532075ae2",
                  "type": "has_only_phrase",
                  "uuid": "e8fa7247-be86-45a6-b789-964165b6a81a"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "6f5cb9f8-0633-487a-93f0-837d359e1206",
                  "type": "has_only_phrase",
                  "uuid": "69f4d64d-aff7-4a3b-807d-06d339affa8d"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "a92e1f93-7463-4a8a-9005-603a1fecf821",
                  "type": "has_only_phrase",
                  "uuid": "777f00ae-ea9b-43c0-a50d-d44cf2378498"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "327f19ea-9b2e-447a-b7f7-fc29b1be6528",
                  "name": "All Responses",
                  "uuid": "9d30e9e0-50ca-4afd-93dd-06a712e21400"
                },
                {
                  "exit_uuid": "18d2502b-cbc4-4be7-8254-a2eb91f7b062",
                  "name": "I don’t have enough time",
                  "uuid": "2c2c2d68-434c-4290-a6a9-9b7a1b1eb25b"
                },
                {
                  "exit_uuid": "258b990b-2cce-478d-989e-9f3f81256eb0",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "c10e47d8-b7b2-4fa5-b6ef-3694410a9e0b"
                },
                {
                  "exit_uuid": "16be07f7-d822-4d22-9605-a9df916dfecb",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "bf6e2ce4-2685-4bd6-a15c-4077a15fdb61"
                },
                {
                  "exit_uuid": "b3c5ccb5-ab20-473e-89e5-6d495de0b373",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "37b4e998-1c2b-4764-bc5b-85ae9dd18a39"
                },
                {
                  "exit_uuid": "f7172de3-484c-4efc-abef-103b6f10d937",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "5ff84a06-a4d0-432c-b36e-15600e1ae25c"
                },
                {
                  "exit_uuid": "7a9b6aa8-e89c-4b66-87a4-e5115f2e8055",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "97f9714a-6900-4b0e-b3a6-fe1009926dea"
                },
                {
                  "exit_uuid": "15dd32cf-645e-425d-92d7-fbd8c4421981",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "4eb53ba9-c274-4646-a672-f042b891b952"
                },
                {
                  "exit_uuid": "2192f9bf-91e1-4808-a2ad-765d7e3a64e4",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "25b9ddb1-997f-4f4f-85e5-39afe1fc4faf"
                },
                {
                  "exit_uuid": "273df0a6-deb4-4536-833a-3b399576aff5",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "c555ced6-7685-4b53-ad99-cba970c34112"
                },
                {
                  "exit_uuid": "ae8295b1-5233-4d52-8c2d-a70eedde5571",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "5879d038-2659-4a39-87d4-8cd80f2cff44"
                },
                {
                  "exit_uuid": "922e34c4-be97-4e03-bf22-92a1a468ae24",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "6ebd99dd-6ae6-4987-84e7-3d85ba4e503f"
                },
                {
                  "exit_uuid": "e9f6dbb1-c424-4de1-8e2e-d356633efc97",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "bd55afe0-a131-4f13-8be0-14c7ba9a6181"
                },
                {
                  "exit_uuid": "6b70e4fc-bc11-452b-a15a-cfbac087d32e",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "37bcb770-281f-4839-a493-2e4532075ae2"
                },
                {
                  "exit_uuid": "69c3b247-5256-4a27-a00f-6dea04504280",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "6f5cb9f8-0633-487a-93f0-837d359e1206"
                },
                {
                  "exit_uuid": "52884349-e561-4552-8e92-e4cb0f02dfd7",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "a92e1f93-7463-4a8a-9005-603a1fecf821"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "327f19ea-9b2e-447a-b7f7-fc29b1be6528",
                "destination_uuid": null
              },
              {
                "uuid": "18d2502b-cbc4-4be7-8254-a2eb91f7b062",
                "destination_uuid": "4a04a711-c837-46ae-a862-87f5ab247e08"
              },
              {
                "uuid": "258b990b-2cce-478d-989e-9f3f81256eb0",
                "destination_uuid": "ebdc6081-11fb-4364-a000-57831da49bd1"
              },
              {
                "uuid": "16be07f7-d822-4d22-9605-a9df916dfecb",
                "destination_uuid": "ebdc6081-11fb-4364-a000-57831da49bd1"
              },
              {
                "uuid": "b3c5ccb5-ab20-473e-89e5-6d495de0b373",
                "destination_uuid": "278e8fa1-a1bd-4e8a-b4b0-96d6fbdc423c"
              },
              {
                "uuid": "f7172de3-484c-4efc-abef-103b6f10d937",
                "destination_uuid": "278e8fa1-a1bd-4e8a-b4b0-96d6fbdc423c"
              },
              {
                "uuid": "7a9b6aa8-e89c-4b66-87a4-e5115f2e8055",
                "destination_uuid": "899f55a5-3a36-456b-bd0d-1aa3f30d9c86"
              },
              {
                "uuid": "15dd32cf-645e-425d-92d7-fbd8c4421981",
                "destination_uuid": "899f55a5-3a36-456b-bd0d-1aa3f30d9c86"
              },
              {
                "uuid": "2192f9bf-91e1-4808-a2ad-765d7e3a64e4",
                "destination_uuid": "da0da9e7-fadf-45f2-a532-a34f1a635413"
              },
              {
                "uuid": "273df0a6-deb4-4536-833a-3b399576aff5",
                "destination_uuid": "da0da9e7-fadf-45f2-a532-a34f1a635413"
              },
              {
                "uuid": "ae8295b1-5233-4d52-8c2d-a70eedde5571",
                "destination_uuid": "911b7762-d3ec-4ae0-8777-e4c57603c2e0"
              },
              {
                "uuid": "922e34c4-be97-4e03-bf22-92a1a468ae24",
                "destination_uuid": "911b7762-d3ec-4ae0-8777-e4c57603c2e0"
              },
              {
                "uuid": "e9f6dbb1-c424-4de1-8e2e-d356633efc97",
                "destination_uuid": "27da6240-ad4a-44f0-b969-be4b7711472f"
              },
              {
                "uuid": "6b70e4fc-bc11-452b-a15a-cfbac087d32e",
                "destination_uuid": "27da6240-ad4a-44f0-b969-be4b7711472f"
              },
              {
                "uuid": "69c3b247-5256-4a27-a00f-6dea04504280",
                "destination_uuid": "2ea32a60-7958-4e90-bc4e-7499e5ae7c7c"
              },
              {
                "uuid": "52884349-e561-4552-8e92-e4cb0f02dfd7",
                "destination_uuid": "2ea32a60-7958-4e90-bc4e-7499e5ae7c7c"
              }
            ]
          },
          {
            "uuid": "4a04a711-c837-46ae-a862-87f5ab247e08",
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
                "uuid": "57f1e4d9-dbd7-42fe-9701-416cde8f5cc4"
              }
            ],
            "exits": [
              {
                "uuid": "f48f2b88-267d-4835-8aa4-7be6207f4c14",
                "destination_uuid": "e79fa1ff-05b2-444f-8921-43927856bf51"
              }
            ]
          },
          {
            "uuid": "e79fa1ff-05b2-444f-8921-43927856bf51",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9ad7f3b8-fa70-42b5-ba62-d3d4d9f4e929",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "9c4bc6a9-38cc-4db2-8313-b3c7c770f9c6",
                  "type": "has_only_phrase",
                  "uuid": "396ccbf8-b978-414c-8d3f-b59022bddcf6"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "ec96fe3e-2ca7-4ade-b82e-e1d545e71485",
                  "type": "has_only_phrase",
                  "uuid": "5659fbc4-06a2-4441-bcd3-ab3304ad2976"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "c409ba79-4f6f-4e0b-b99d-90b1ec44d15a",
                  "type": "has_only_phrase",
                  "uuid": "2a86ee5b-9202-43fb-a9b0-0f5b483e535c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "37177df0-60e5-4bc7-bfdb-2f007c020160",
                  "name": "All Responses",
                  "uuid": "9ad7f3b8-fa70-42b5-ba62-d3d4d9f4e929"
                },
                {
                  "exit_uuid": "02a9f1f3-5bd2-4189-a55b-9da67163b5cf",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "9c4bc6a9-38cc-4db2-8313-b3c7c770f9c6"
                },
                {
                  "exit_uuid": "b5522ac2-7883-415f-846e-c64fcd01c11c",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "ec96fe3e-2ca7-4ade-b82e-e1d545e71485"
                },
                {
                  "exit_uuid": "5cfef19f-8d21-4b78-a9db-718c670fdb85",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "c409ba79-4f6f-4e0b-b99d-90b1ec44d15a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "37177df0-60e5-4bc7-bfdb-2f007c020160",
                "destination_uuid": null
              },
              {
                "uuid": "02a9f1f3-5bd2-4189-a55b-9da67163b5cf",
                "destination_uuid": "cee0513e-a9ec-4238-99cf-43ed1a3564a6"
              },
              {
                "uuid": "b5522ac2-7883-415f-846e-c64fcd01c11c",
                "destination_uuid": "53c03ca0-d797-4e48-b638-ba1376b40fa2"
              },
              {
                "uuid": "5cfef19f-8d21-4b78-a9db-718c670fdb85",
                "destination_uuid": "9398f264-2c7c-4855-90e0-c11952059142"
              }
            ]
          },
          {
            "uuid": "cee0513e-a9ec-4238-99cf-43ed1a3564a6",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c48194f7-c8a1-4212-aa64-bbe6872e7b77"
              }
            ],
            "exits": [
              {
                "uuid": "380a740a-31ab-422d-87e0-617975818ef3",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "53c03ca0-d797-4e48-b638-ba1376b40fa2",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "72d3740a-740d-448d-9de9-ce1831d0d941"
              }
            ],
            "exits": [
              {
                "uuid": "51342c97-3042-4248-8c06-7c184bd7af8c",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "9398f264-2c7c-4855-90e0-c11952059142",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "312edbc0-7b2f-4518-aee5-2425e57ca4ad"
              }
            ],
            "exits": [
              {
                "uuid": "e642c5ec-2bb3-4fa3-8732-3e3120589dfe",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "ebdc6081-11fb-4364-a000-57831da49bd1",
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
                "uuid": "2985c167-e1a7-40d1-96a6-a94bd72c1897"
              }
            ],
            "exits": [
              {
                "uuid": "53825467-395f-46cd-8ebb-31717ccf45f9",
                "destination_uuid": "d82f82cc-da4f-4f19-8328-d247784638ac"
              }
            ]
          },
          {
            "uuid": "d82f82cc-da4f-4f19-8328-d247784638ac",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "036d533c-2ee3-4e1f-a1d9-ad62e0ade51b",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "e764fa71-8063-4c1b-91f3-2813a16715fc",
                  "type": "has_only_phrase",
                  "uuid": "65280ad8-cb91-412f-9eb8-3cc37eede6bc"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "c45ba13b-a254-46b2-8097-e89fbfbc4f59",
                  "type": "has_only_phrase",
                  "uuid": "9ceb723d-ff0b-4b1d-933a-ac5ffe0d9027"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "b014533d-431b-4e85-89e9-4f651b79b680",
                  "type": "has_only_phrase",
                  "uuid": "716a6cd9-a47f-4a8c-9473-2b5eb6187279"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a86b64bd-cf07-40fa-bba7-931c2c2562d3",
                  "name": "All Responses",
                  "uuid": "036d533c-2ee3-4e1f-a1d9-ad62e0ade51b"
                },
                {
                  "exit_uuid": "8d0e4507-825a-4959-b724-86c23b268513",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "e764fa71-8063-4c1b-91f3-2813a16715fc"
                },
                {
                  "exit_uuid": "4cac9bc3-6dcd-457a-afdc-a78eb3cd5fa1",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "c45ba13b-a254-46b2-8097-e89fbfbc4f59"
                },
                {
                  "exit_uuid": "cff54ac5-5292-4069-8e51-7b800f559aed",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "b014533d-431b-4e85-89e9-4f651b79b680"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a86b64bd-cf07-40fa-bba7-931c2c2562d3",
                "destination_uuid": null
              },
              {
                "uuid": "8d0e4507-825a-4959-b724-86c23b268513",
                "destination_uuid": "783ccb51-8a43-49e9-bf78-666adfab62ef"
              },
              {
                "uuid": "4cac9bc3-6dcd-457a-afdc-a78eb3cd5fa1",
                "destination_uuid": "a8624c0f-502f-4353-a61b-ba76d31e5cc2"
              },
              {
                "uuid": "cff54ac5-5292-4069-8e51-7b800f559aed",
                "destination_uuid": "e77a1caf-c59c-4e2a-bad0-6eb8bd1e9231"
              }
            ]
          },
          {
            "uuid": "783ccb51-8a43-49e9-bf78-666adfab62ef",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a69d750d-6d2a-43e5-b2fc-2227e444dcbb"
              }
            ],
            "exits": [
              {
                "uuid": "73f252a3-0a17-434f-a1b5-1fce439d63c4",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "a8624c0f-502f-4353-a61b-ba76d31e5cc2",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9ba79f57-0e69-431e-928b-f1fcf4307a65"
              }
            ],
            "exits": [
              {
                "uuid": "b5151fcb-ef4c-4e54-8b60-f2196f5cf202",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "e77a1caf-c59c-4e2a-bad0-6eb8bd1e9231",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6e0ad921-2fa4-45bd-9daa-2dc851303dd6"
              }
            ],
            "exits": [
              {
                "uuid": "ad2c80c0-4529-405e-a028-e14c1a5313d7",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "278e8fa1-a1bd-4e8a-b4b0-96d6fbdc423c",
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
                "uuid": "8440ad58-b32d-4985-82ff-73a6badac263"
              }
            ],
            "exits": [
              {
                "uuid": "16130430-4a74-4ded-a61d-004f05696262",
                "destination_uuid": "e79738fa-b9c8-4a71-bfe4-2a2e56d672e3"
              }
            ]
          },
          {
            "uuid": "e79738fa-b9c8-4a71-bfe4-2a2e56d672e3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0e289668-1aee-4b03-b502-2fc82c0fbbe5",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "dc39fd6e-f13a-4788-b622-ed7d0771b7d8",
                  "type": "has_only_phrase",
                  "uuid": "97179216-0f06-43ef-bec7-22ca15b7fc7c"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "0ccbbc56-44e7-48d5-8d11-ab944df5123a",
                  "type": "has_only_phrase",
                  "uuid": "eb8cf9ee-dd34-4177-95b2-89eb90bf9b48"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "2ade2e22-173b-42d0-ae03-fb50e9cac6eb",
                  "type": "has_only_phrase",
                  "uuid": "970160a0-5118-42a1-aaec-e76925459e75"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1c596b06-bab0-4efc-9b67-f20f72a2bbdc",
                  "name": "All Responses",
                  "uuid": "0e289668-1aee-4b03-b502-2fc82c0fbbe5"
                },
                {
                  "exit_uuid": "bac62213-f189-42f2-b635-e7c57e4ab9c2",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "dc39fd6e-f13a-4788-b622-ed7d0771b7d8"
                },
                {
                  "exit_uuid": "631869a0-ebc0-43ae-8500-737f487eb753",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "0ccbbc56-44e7-48d5-8d11-ab944df5123a"
                },
                {
                  "exit_uuid": "453b36f6-e058-4e20-a330-b0e3755f82e3",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "2ade2e22-173b-42d0-ae03-fb50e9cac6eb"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1c596b06-bab0-4efc-9b67-f20f72a2bbdc",
                "destination_uuid": null
              },
              {
                "uuid": "bac62213-f189-42f2-b635-e7c57e4ab9c2",
                "destination_uuid": "b6f1ae56-230a-4465-aef9-f2c41843e969"
              },
              {
                "uuid": "631869a0-ebc0-43ae-8500-737f487eb753",
                "destination_uuid": "2be5b05e-02fa-4721-a03f-ed655c2fd62e"
              },
              {
                "uuid": "453b36f6-e058-4e20-a330-b0e3755f82e3",
                "destination_uuid": "1c4b2270-be05-4d50-b37c-fa974eb7b49c"
              }
            ]
          },
          {
            "uuid": "b6f1ae56-230a-4465-aef9-f2c41843e969",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "56b08550-9b79-4c66-8ed4-4f1bb1e969ec"
              }
            ],
            "exits": [
              {
                "uuid": "9b9b5e02-aa99-4b7e-ab23-f223712a2637",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "2be5b05e-02fa-4721-a03f-ed655c2fd62e",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "173ee934-411f-47d6-9476-1bc72839248d"
              }
            ],
            "exits": [
              {
                "uuid": "81695f67-4a32-423a-8b92-44da84727ace",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "1c4b2270-be05-4d50-b37c-fa974eb7b49c",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3d23c86b-d075-4e5a-856d-990a09f09a28"
              }
            ],
            "exits": [
              {
                "uuid": "0892c200-564d-4d51-9aa4-36835f77351d",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "899f55a5-3a36-456b-bd0d-1aa3f30d9c86",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "c0c2fd19-c11d-40f0-b58a-87af8032a5cd"
              }
            ],
            "exits": [
              {
                "uuid": "7a879590-f103-4b67-9dd2-f9541dae6270",
                "destination_uuid": "75b1a474-2330-41fe-99cb-eabe08c46c11"
              }
            ]
          },
          {
            "uuid": "75b1a474-2330-41fe-99cb-eabe08c46c11",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4d6032c3-3c1d-4456-8a92-e8a31590ded3",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "22780187-318d-4904-bd7d-7e20da78df6c",
                  "type": "has_only_phrase",
                  "uuid": "80bf82d1-0000-4b5c-8ea6-cb864b243381"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "d3c7ed67-0601-4031-b79c-49c1cb2e9c93",
                  "type": "has_only_phrase",
                  "uuid": "e8ac1f06-71ef-4bbc-bc6e-defa38b8e3b5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "12b2859f-205b-4909-95bd-26b95836212f",
                  "name": "All Responses",
                  "uuid": "4d6032c3-3c1d-4456-8a92-e8a31590ded3"
                },
                {
                  "exit_uuid": "2c4b8bab-77fb-4ee5-9ac5-77f633ac50b1",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "22780187-318d-4904-bd7d-7e20da78df6c"
                },
                {
                  "exit_uuid": "2f31a5e2-3244-4e59-903d-a9274589b8ea",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "d3c7ed67-0601-4031-b79c-49c1cb2e9c93"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "12b2859f-205b-4909-95bd-26b95836212f",
                "destination_uuid": null
              },
              {
                "uuid": "2c4b8bab-77fb-4ee5-9ac5-77f633ac50b1",
                "destination_uuid": "64ebf7b0-8ed5-4c46-bcd2-2108c59b97dd"
              },
              {
                "uuid": "2f31a5e2-3244-4e59-903d-a9274589b8ea",
                "destination_uuid": "586922c6-5cb0-4c23-acdb-9fa9b282cae7"
              }
            ]
          },
          {
            "uuid": "64ebf7b0-8ed5-4c46-bcd2-2108c59b97dd",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2600980a-a1c5-421e-b4a0-1d9bff47c25e"
              }
            ],
            "exits": [
              {
                "uuid": "04282e82-89f8-4d70-b2dd-c2bf89188ae6",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "586922c6-5cb0-4c23-acdb-9fa9b282cae7",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c62318a2-2d57-4d3d-a76e-d2586bf07df1"
              }
            ],
            "exits": [
              {
                "uuid": "df9f25bd-1d5a-4685-b789-0bcbc6855093",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "da0da9e7-fadf-45f2-a532-a34f1a635413",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "e5501d92-36f4-4dfa-815f-72592881ca35"
              }
            ],
            "exits": [
              {
                "uuid": "0985f8fd-5584-41e8-bc3b-d95b614e5967",
                "destination_uuid": "1a8fb693-8c9d-4167-a5f0-b9d3bbb1c360"
              }
            ]
          },
          {
            "uuid": "1a8fb693-8c9d-4167-a5f0-b9d3bbb1c360",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "89e86c2c-7664-4dca-9c3b-0b1bce8e7dbc",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "4259b14d-1dbe-4ae1-9f4e-2d683a1008ef",
                  "type": "has_only_phrase",
                  "uuid": "62a1eb05-c3c2-4358-81dd-469d3d098831"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "dbb0a63c-491f-46bc-adf1-2f82833a3491",
                  "type": "has_only_phrase",
                  "uuid": "6fa0e5e7-738a-412d-85be-e885ff46d8f5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "862640df-45ed-4762-b6e5-ab158cfd60be",
                  "name": "All Responses",
                  "uuid": "89e86c2c-7664-4dca-9c3b-0b1bce8e7dbc"
                },
                {
                  "exit_uuid": "0f69469a-efac-4c3c-8e01-e3cda4fcb9e6",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "4259b14d-1dbe-4ae1-9f4e-2d683a1008ef"
                },
                {
                  "exit_uuid": "4768f6ce-433b-4616-813f-cdc4e8ed7c56",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "dbb0a63c-491f-46bc-adf1-2f82833a3491"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "862640df-45ed-4762-b6e5-ab158cfd60be",
                "destination_uuid": null
              },
              {
                "uuid": "0f69469a-efac-4c3c-8e01-e3cda4fcb9e6",
                "destination_uuid": "f0d2bf1e-7ae8-4e39-a9d9-6e1d3fac2b60"
              },
              {
                "uuid": "4768f6ce-433b-4616-813f-cdc4e8ed7c56",
                "destination_uuid": "fec99b00-6dc5-4354-b34a-0c1a36efb910"
              }
            ]
          },
          {
            "uuid": "f0d2bf1e-7ae8-4e39-a9d9-6e1d3fac2b60",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4558d82c-5bb8-424e-ab8f-1a4ca8691fe1"
              }
            ],
            "exits": [
              {
                "uuid": "eec74b4f-2f58-4f90-ac36-690aac7bf435",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "fec99b00-6dc5-4354-b34a-0c1a36efb910",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "876ef031-af79-40ce-b923-3aa4d381be32"
              }
            ],
            "exits": [
              {
                "uuid": "2383bcac-50ee-40a2-af19-0086243cba41",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "911b7762-d3ec-4ae0-8777-e4c57603c2e0",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "facdf6a0-3134-4cea-bcd4-b20a6f3e383a"
              }
            ],
            "exits": [
              {
                "uuid": "814f8656-2a55-4334-80bc-f911e133fe41",
                "destination_uuid": "033dfe1d-c072-4b00-aeb3-8d8cc068c1ce"
              }
            ]
          },
          {
            "uuid": "033dfe1d-c072-4b00-aeb3-8d8cc068c1ce",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f64da320-a54a-42b5-90da-f044d944e9e4",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "4721b4b5-2698-43b1-8bdf-061cd3407049",
                  "type": "has_only_phrase",
                  "uuid": "be85d94e-b377-45a8-932d-2026027abb71"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "03ed33fc-5109-4bb3-afdd-fa50b55220c1",
                  "type": "has_only_phrase",
                  "uuid": "261f9760-04ab-4a09-84e0-d08541823ab3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a9dd4224-37d1-49f5-b157-e1e0960d0965",
                  "name": "All Responses",
                  "uuid": "f64da320-a54a-42b5-90da-f044d944e9e4"
                },
                {
                  "exit_uuid": "a9dbb47a-38e4-46c1-858a-691514553ccf",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "4721b4b5-2698-43b1-8bdf-061cd3407049"
                },
                {
                  "exit_uuid": "63cc0b96-408d-4ec5-8832-d9f835695a99",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "03ed33fc-5109-4bb3-afdd-fa50b55220c1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a9dd4224-37d1-49f5-b157-e1e0960d0965",
                "destination_uuid": null
              },
              {
                "uuid": "a9dbb47a-38e4-46c1-858a-691514553ccf",
                "destination_uuid": "e7b8d339-e7d7-4aa3-b10b-b9c7cc1082d5"
              },
              {
                "uuid": "63cc0b96-408d-4ec5-8832-d9f835695a99",
                "destination_uuid": "00169385-ddef-47d6-8885-f3946feb706b"
              }
            ]
          },
          {
            "uuid": "e7b8d339-e7d7-4aa3-b10b-b9c7cc1082d5",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "50a75357-5d05-44c9-9c3a-56c53cfe87c1"
              }
            ],
            "exits": [
              {
                "uuid": "e258de10-7bca-4bcb-b0b8-a6b1ac907b00",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "00169385-ddef-47d6-8885-f3946feb706b",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "78892e25-07f2-4491-a46f-1c28e9d9cbaf"
              }
            ],
            "exits": [
              {
                "uuid": "8f1df9c7-3206-4e16-b7e0-c01d2986b736",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "27da6240-ad4a-44f0-b969-be4b7711472f",
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
                "uuid": "04c00f4b-bb45-42d5-88dc-46b05928744d"
              }
            ],
            "exits": [
              {
                "uuid": "f9d5b5d4-d6cd-4ead-90f7-5a34bff08675",
                "destination_uuid": "f53493a9-18a0-402d-9fb2-d723d1456aab"
              }
            ]
          },
          {
            "uuid": "f53493a9-18a0-402d-9fb2-d723d1456aab",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "68a57807-b0a0-4152-93c2-3f76be7c8476",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "8380779f-a723-40ab-b641-ae662e59494f",
                  "type": "has_only_phrase",
                  "uuid": "ff5a8ddb-62b5-496e-82eb-989d675bba9e"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "c2343722-21b2-4fce-b190-200e8f012de3",
                  "type": "has_only_phrase",
                  "uuid": "39a71ed2-099e-481b-b502-acd037d9d52e"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "0eb11735-abef-498d-a6d3-09245f3fbdab",
                  "type": "has_only_phrase",
                  "uuid": "6fa8cbe1-3dc7-4791-876f-bf9536deb537"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "06048df3-9786-4465-b555-16dfdf9d4c19",
                  "name": "All Responses",
                  "uuid": "68a57807-b0a0-4152-93c2-3f76be7c8476"
                },
                {
                  "exit_uuid": "302df1d8-9752-4576-8a7f-0f406a602e7e",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "8380779f-a723-40ab-b641-ae662e59494f"
                },
                {
                  "exit_uuid": "2edbec45-37f4-41fe-bff1-06aa1909f8f4",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "c2343722-21b2-4fce-b190-200e8f012de3"
                },
                {
                  "exit_uuid": "6e32f358-089b-4e7b-8b0d-ea338692c3d3",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "0eb11735-abef-498d-a6d3-09245f3fbdab"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "06048df3-9786-4465-b555-16dfdf9d4c19",
                "destination_uuid": null
              },
              {
                "uuid": "302df1d8-9752-4576-8a7f-0f406a602e7e",
                "destination_uuid": "c81ea2bb-e6b7-467e-8c8f-c35bb83ab488"
              },
              {
                "uuid": "2edbec45-37f4-41fe-bff1-06aa1909f8f4",
                "destination_uuid": "e8e5934a-65fb-454d-82cf-036ff81a25d9"
              },
              {
                "uuid": "6e32f358-089b-4e7b-8b0d-ea338692c3d3",
                "destination_uuid": "b7969aa2-0367-43fb-9466-d725086d84aa"
              }
            ]
          },
          {
            "uuid": "c81ea2bb-e6b7-467e-8c8f-c35bb83ab488",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2e897f04-a017-40fe-a179-943316f4e160"
              }
            ],
            "exits": [
              {
                "uuid": "c71c084f-595b-4da7-9bf5-628ebcc27bb6",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "e8e5934a-65fb-454d-82cf-036ff81a25d9",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "de870586-6192-4426-9d9b-dfebe8987da4"
              }
            ],
            "exits": [
              {
                "uuid": "3735a360-cc56-4136-a8a2-104c8a905abc",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "b7969aa2-0367-43fb-9466-d725086d84aa",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3959bef9-8401-425d-924b-0ca2922241cd"
              }
            ],
            "exits": [
              {
                "uuid": "2b8cc609-a6bf-4469-9ac4-3564ff817c2b",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "2ea32a60-7958-4e90-bc4e-7499e5ae7c7c",
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
                "uuid": "e270cf20-745c-4342-86e0-2d3a89b218da"
              }
            ],
            "exits": [
              {
                "uuid": "238810e7-55a9-4957-9498-77d26c851f92",
                "destination_uuid": "5ed62f76-ad76-4566-9edf-011190502dce"
              }
            ]
          },
          {
            "uuid": "5ed62f76-ad76-4566-9edf-011190502dce",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5a678c70-eb20-4918-8cf9-fd60910fc12b",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "5f6dd6b8-98cd-40ee-acb7-a8abbb615a52",
                  "type": "has_only_phrase",
                  "uuid": "903de12c-022c-4c38-8f8c-cb97abccc4a0"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "955b2d0f-eaac-455e-b6d3-f01a89a7e519",
                  "type": "has_only_phrase",
                  "uuid": "7fef6ebf-7264-4e45-8528-8ff852c94630"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "ff20c177-f073-4125-9a56-a8af6d65d4a9",
                  "type": "has_only_phrase",
                  "uuid": "042a1c81-ef1b-45a6-860f-a55c987d4bff"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f25936c5-b8db-4036-a18b-6fad769ab5b2",
                  "name": "All Responses",
                  "uuid": "5a678c70-eb20-4918-8cf9-fd60910fc12b"
                },
                {
                  "exit_uuid": "c3d65dcf-b57a-4516-92dc-8295bdf08fd1",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "5f6dd6b8-98cd-40ee-acb7-a8abbb615a52"
                },
                {
                  "exit_uuid": "9b4299db-beb4-487b-8c91-60c2278c716c",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "955b2d0f-eaac-455e-b6d3-f01a89a7e519"
                },
                {
                  "exit_uuid": "d7133d9f-5b14-4dde-a631-7935ead1a5d9",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "ff20c177-f073-4125-9a56-a8af6d65d4a9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f25936c5-b8db-4036-a18b-6fad769ab5b2",
                "destination_uuid": null
              },
              {
                "uuid": "c3d65dcf-b57a-4516-92dc-8295bdf08fd1",
                "destination_uuid": "e3d45ba7-256c-47ba-b262-3fb0fa694442"
              },
              {
                "uuid": "9b4299db-beb4-487b-8c91-60c2278c716c",
                "destination_uuid": "c2c12ad6-36c0-46df-954c-c000b70a00f7"
              },
              {
                "uuid": "d7133d9f-5b14-4dde-a631-7935ead1a5d9",
                "destination_uuid": "1f7223c9-c612-4631-af87-0b5ca2a8b8cf"
              }
            ]
          },
          {
            "uuid": "e3d45ba7-256c-47ba-b262-3fb0fa694442",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "73eb26f5-07d0-4286-b285-47683e934552"
              }
            ],
            "exits": [
              {
                "uuid": "24893ef2-46f9-4f46-b513-a4864fcb2811",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "c2c12ad6-36c0-46df-954c-c000b70a00f7",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "794f4833-6139-43e5-bca0-c1c322540e08"
              }
            ],
            "exits": [
              {
                "uuid": "5c386ca4-4a29-48c5-9bed-b588ffdf5142",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "1f7223c9-c612-4631-af87-0b5ca2a8b8cf",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "87293605-7d6b-45e3-87e4-5ac8d85e3f43"
              }
            ],
            "exits": [
              {
                "uuid": "b7157819-886f-49df-abfa-97f3cf4418fe",
                "destination_uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401"
              }
            ]
          },
          {
            "uuid": "0e458a93-a3a2-44d8-b7e4-e11bdb94f401",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b2ececf1-6564-47d9-96fe-8238d6169434",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "da3106d7-c2a2-4137-985a-4e2d85d5816c",
                  "type": "has_only_phrase",
                  "uuid": "8f7543ea-28c8-42e5-8174-db0ae5e70d94"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "070c7bd2-6b6a-4d89-97e8-534c8d5f6ff7",
                  "name": "All Responses",
                  "uuid": "b2ececf1-6564-47d9-96fe-8238d6169434"
                },
                {
                  "exit_uuid": "0cc5f480-3894-43da-bc68-0d45aa409f82",
                  "name": "Next",
                  "uuid": "da3106d7-c2a2-4137-985a-4e2d85d5816c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "070c7bd2-6b6a-4d89-97e8-534c8d5f6ff7",
                "destination_uuid": null
              },
              {
                "uuid": "0cc5f480-3894-43da-bc68-0d45aa409f82",
                "destination_uuid": "cb651213-8aa9-434e-8fd8-095d0cf593f3"
              }
            ]
          },
          {
            "uuid": "cb651213-8aa9-434e-8fd8-095d0cf593f3",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "dfecb461-947b-4402-aabd-2c360ac9d628"
              }
            ],
            "exits": [
              {
                "uuid": "d97778f9-6cbf-4b5f-90f5-8761174b064d",
                "destination_uuid": "1c176608-6f8c-437e-b423-d02113d235b9"
              }
            ]
          },
          {
            "uuid": "1c176608-6f8c-437e-b423-d02113d235b9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4f72c695-987b-4552-a218-8623307ff306",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "f01bceb0-67cc-4633-bc8f-f5d9ad62bda7",
                  "type": "has_only_phrase",
                  "uuid": "2a75ea0f-d7fa-4905-ac07-57facb2271d4"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "b2099eb1-68fb-4982-a110-3ad1c00aaf08",
                  "type": "has_only_phrase",
                  "uuid": "0d462d62-382e-46b1-b828-626bff46b640"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b40daef7-301f-4cf9-bd97-5a7a9729b36b",
                  "name": "All Responses",
                  "uuid": "4f72c695-987b-4552-a218-8623307ff306"
                },
                {
                  "exit_uuid": "0ac56280-f6b4-414c-a665-2df50a8f5528",
                  "name": "No",
                  "uuid": "f01bceb0-67cc-4633-bc8f-f5d9ad62bda7"
                },
                {
                  "exit_uuid": "300a0248-fe4a-4832-936c-9176f36160a0",
                  "name": "Yes",
                  "uuid": "b2099eb1-68fb-4982-a110-3ad1c00aaf08"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b40daef7-301f-4cf9-bd97-5a7a9729b36b",
                "destination_uuid": null
              },
              {
                "uuid": "0ac56280-f6b4-414c-a665-2df50a8f5528",
                "destination_uuid": "d13f256b-c622-4c74-ab7e-3272b7d9b286"
              },
              {
                "uuid": "300a0248-fe4a-4832-936c-9176f36160a0",
                "destination_uuid": "5e1fed10-f0c2-419d-b87b-deb94323fd70"
              }
            ]
          },
          {
            "uuid": "d13f256b-c622-4c74-ab7e-3272b7d9b286",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a60f2363-5161-41e1-bea7-00f1bb96af3d"
              }
            ],
            "exits": [
              {
                "uuid": "37f693c8-b61a-448e-83fc-e0c37b9d6707",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "5e1fed10-f0c2-419d-b87b-deb94323fd70",
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
                "uuid": "099f9dbe-66cb-4b2c-8782-95621c0232f3"
              }
            ],
            "exits": [
              {
                "uuid": "7c5e49e7-8433-4a60-bfd8-176266a23ec5",
                "destination_uuid": "1ea9e672-f93a-4300-a71e-d10d15dcc087"
              }
            ]
          },
          {
            "uuid": "1ea9e672-f93a-4300-a71e-d10d15dcc087",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "28a8e385-434c-407a-b105-d1ed56c0af30",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "72bba1d0-c58e-4cd9-9f1e-62cb33d6bef1",
                  "type": "has_only_phrase",
                  "uuid": "b22e5857-757b-44c0-a697-cc5e78b10fe2"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "590f6d2c-d3e8-4881-9199-4106311662b3",
                  "type": "has_only_phrase",
                  "uuid": "182c2f90-18b8-4a48-9d97-40aebe01485c"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "a9c64f6a-3a5f-42e7-953c-ce35c3afb8bb",
                  "type": "has_only_phrase",
                  "uuid": "5fad09a7-9dee-4e3d-bcdf-63ddd121d524"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "75d50256-3b04-4794-95d8-7f3100778c2b",
                  "type": "has_only_phrase",
                  "uuid": "123f37ac-d032-4c1e-822f-132b64fb6d47"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "6b8d5c5c-e759-4e21-a61f-e5223440dd9d",
                  "type": "has_only_phrase",
                  "uuid": "2fea274b-3c3a-4e61-9be3-e41f308ed447"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "1f263b86-ca3c-489b-9593-2bb60ea44adf",
                  "type": "has_only_phrase",
                  "uuid": "79827130-e3f8-43da-a957-aabdf67e61a0"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "144ae1ed-1ed9-47c3-838f-21e01d80f82c",
                  "type": "has_only_phrase",
                  "uuid": "af94acec-613d-468f-b034-9cc3cf8bbdd6"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "fbcd52f8-f242-4729-a4fe-98511a04e931",
                  "type": "has_only_phrase",
                  "uuid": "df50082d-375f-4ec3-bcbf-b8d72f02b9c2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "bae51240-fb77-49d9-a3cb-eae8fbc3148f",
                  "name": "All Responses",
                  "uuid": "28a8e385-434c-407a-b105-d1ed56c0af30"
                },
                {
                  "exit_uuid": "4b3a97bd-1304-482d-8e82-5408afdaae81",
                  "name": "I don’t have enough time",
                  "uuid": "72bba1d0-c58e-4cd9-9f1e-62cb33d6bef1"
                },
                {
                  "exit_uuid": "7b69f92b-9691-45e7-98bd-4e224ab81c68",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "590f6d2c-d3e8-4881-9199-4106311662b3"
                },
                {
                  "exit_uuid": "c66cfb34-458f-4518-870d-bbedf6a3310e",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "a9c64f6a-3a5f-42e7-953c-ce35c3afb8bb"
                },
                {
                  "exit_uuid": "cd1006e6-324a-4bfc-a94f-7f0cada9d670",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "75d50256-3b04-4794-95d8-7f3100778c2b"
                },
                {
                  "exit_uuid": "f2b4c95d-0eba-4b19-b085-f9b7f32de7d0",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "6b8d5c5c-e759-4e21-a61f-e5223440dd9d"
                },
                {
                  "exit_uuid": "01618c11-0335-48e8-81e8-b86cbfbffbda",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "1f263b86-ca3c-489b-9593-2bb60ea44adf"
                },
                {
                  "exit_uuid": "096e85cd-cb23-4ad2-8082-562266605a8f",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "144ae1ed-1ed9-47c3-838f-21e01d80f82c"
                },
                {
                  "exit_uuid": "938d4a07-9560-410a-8ba5-9eb52f73af6f",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "fbcd52f8-f242-4729-a4fe-98511a04e931"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "bae51240-fb77-49d9-a3cb-eae8fbc3148f",
                "destination_uuid": null
              },
              {
                "uuid": "4b3a97bd-1304-482d-8e82-5408afdaae81",
                "destination_uuid": "4a04a711-c837-46ae-a862-87f5ab247e08"
              },
              {
                "uuid": "7b69f92b-9691-45e7-98bd-4e224ab81c68",
                "destination_uuid": "ebdc6081-11fb-4364-a000-57831da49bd1"
              },
              {
                "uuid": "c66cfb34-458f-4518-870d-bbedf6a3310e",
                "destination_uuid": "278e8fa1-a1bd-4e8a-b4b0-96d6fbdc423c"
              },
              {
                "uuid": "cd1006e6-324a-4bfc-a94f-7f0cada9d670",
                "destination_uuid": "899f55a5-3a36-456b-bd0d-1aa3f30d9c86"
              },
              {
                "uuid": "f2b4c95d-0eba-4b19-b085-f9b7f32de7d0",
                "destination_uuid": "da0da9e7-fadf-45f2-a532-a34f1a635413"
              },
              {
                "uuid": "01618c11-0335-48e8-81e8-b86cbfbffbda",
                "destination_uuid": "911b7762-d3ec-4ae0-8777-e4c57603c2e0"
              },
              {
                "uuid": "096e85cd-cb23-4ad2-8082-562266605a8f",
                "destination_uuid": "27da6240-ad4a-44f0-b969-be4b7711472f"
              },
              {
                "uuid": "938d4a07-9560-410a-8ba5-9eb52f73af6f",
                "destination_uuid": "2ea32a60-7958-4e90-bc4e-7499e5ae7c7c"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d44aedaa-e190-4ddf-bebb-f3b0628cbc3e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8dd934e2-8292-4340-8c6c-7ac613fdab0b",
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
                "uuid": "62237eb9-7864-4a21-870e-8a4a23d3f6d9"
              }
            ],
            "exits": [
              {
                "uuid": "3a0ec34e-542c-4998-9179-3d164de55366",
                "destination_uuid": "5aa4c43e-f542-4598-94e6-9c36000b38c7"
              }
            ]
          },
          {
            "uuid": "5aa4c43e-f542-4598-94e6-9c36000b38c7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "767de4ff-878d-450a-9372-45fca2e40d2a",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "8a6ef241-7a34-4ec4-b72b-7b6a4a9b7cb0",
                  "type": "has_only_phrase",
                  "uuid": "d844eb3c-4fef-440a-9045-61bbdbe0d8af"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "fbc8990d-1819-4f9a-bc3e-e6cdac24aed0",
                  "type": "has_only_phrase",
                  "uuid": "493fa0fc-7af0-487e-aca7-3f9df59a42e5"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "6f5be095-e544-443f-976f-13d4c440a3cd",
                  "type": "has_only_phrase",
                  "uuid": "87450bd7-2da2-4af8-b1b4-b61398fc31c0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d371dfa2-f1ce-4943-a36e-d9b3bae6a3e6",
                  "name": "All Responses",
                  "uuid": "767de4ff-878d-450a-9372-45fca2e40d2a"
                },
                {
                  "exit_uuid": "ada0b8ad-653f-4e87-8be2-84012f98adf0",
                  "name": "Great",
                  "uuid": "8a6ef241-7a34-4ec4-b72b-7b6a4a9b7cb0"
                },
                {
                  "exit_uuid": "8d5cbf9f-e74a-442d-85d1-cd0253c4e067",
                  "name": "Neutral",
                  "uuid": "fbc8990d-1819-4f9a-bc3e-e6cdac24aed0"
                },
                {
                  "exit_uuid": "c1efb724-459e-4315-baf8-38fe78642c70",
                  "name": "Bad",
                  "uuid": "6f5be095-e544-443f-976f-13d4c440a3cd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d371dfa2-f1ce-4943-a36e-d9b3bae6a3e6",
                "destination_uuid": null
              },
              {
                "uuid": "ada0b8ad-653f-4e87-8be2-84012f98adf0",
                "destination_uuid": "56b6dec5-801d-4c64-b497-75653560fd3f"
              },
              {
                "uuid": "8d5cbf9f-e74a-442d-85d1-cd0253c4e067",
                "destination_uuid": "f63e7ca6-6c7a-4d0e-ac1b-34a03149f136"
              },
              {
                "uuid": "c1efb724-459e-4315-baf8-38fe78642c70",
                "destination_uuid": "733ba073-ab42-4d4c-bb08-e84b9bae46bb"
              }
            ]
          },
          {
            "uuid": "56b6dec5-801d-4c64-b497-75653560fd3f",
            "actions": [
              {
                "attachments": [],
                "text": "So good to hear that you and your children are in a good space today. What a wonderful feeling!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "0cb17488-48cf-4a8b-a461-467aec102b82"
              }
            ],
            "exits": [
              {
                "uuid": "94809cc5-7f93-4310-832b-9e3127e53461",
                "destination_uuid": "f190eded-58fd-4f17-b290-26ffb8f1a893"
              }
            ]
          },
          {
            "uuid": "f63e7ca6-6c7a-4d0e-ac1b-34a03149f136",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes things go great. Sometimes they don’t. And sometimes we don't quite know what to think...and that's totally okay! Remember that you are not alone.",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "5b8bcb17-a25f-41b2-a8e5-460ff8e24a38"
              }
            ],
            "exits": [
              {
                "uuid": "ac946d02-5399-4d59-a9f4-07f89237a922",
                "destination_uuid": "f190eded-58fd-4f17-b290-26ffb8f1a893"
              }
            ]
          },
          {
            "uuid": "733ba073-ab42-4d4c-bb08-e84b9bae46bb",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that things are difficult with your children now. It is completely normal to struggle sometimes. Remember that you are not alone!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "24b5f12e-853a-4d2c-a6d1-0972dec79eab"
              }
            ],
            "exits": [
              {
                "uuid": "cc2a2beb-2041-43af-ab0e-646d6b34c367",
                "destination_uuid": "0ba88082-69b8-49bb-aff5-e3fd4101ca5e"
              }
            ]
          },
          {
            "uuid": "f190eded-58fd-4f17-b290-26ffb8f1a893",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0c7a1d21-d838-459b-b8b4-913e274e8541",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "45dba49e-c114-493d-aa3b-2041e911c9c4",
                  "type": "has_only_phrase",
                  "uuid": "fe3940b4-fd54-4e1a-b26b-9970f9170d3d"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "34a8c329-d677-4484-a63e-8016f7defe02",
                  "type": "has_only_phrase",
                  "uuid": "9325a762-2b65-4eb6-a025-fd74322d6872"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "45e1612b-4402-476d-ac4c-3a2f198d76e5",
                  "name": "All Responses",
                  "uuid": "0c7a1d21-d838-459b-b8b4-913e274e8541"
                },
                {
                  "exit_uuid": "21d62e29-d7de-4433-9457-4048f5c8aa69",
                  "name": "More tips",
                  "uuid": "45dba49e-c114-493d-aa3b-2041e911c9c4"
                },
                {
                  "exit_uuid": "57d9770d-631a-43f7-83fb-b06ff543a22c",
                  "name": "Activity to help you relax",
                  "uuid": "34a8c329-d677-4484-a63e-8016f7defe02"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "45e1612b-4402-476d-ac4c-3a2f198d76e5",
                "destination_uuid": null
              },
              {
                "uuid": "21d62e29-d7de-4433-9457-4048f5c8aa69",
                "destination_uuid": "67aad40d-31c7-4d35-b686-da3d158deb90"
              },
              {
                "uuid": "57d9770d-631a-43f7-83fb-b06ff543a22c",
                "destination_uuid": "4d88c2f6-b35a-4cf1-810a-ab3d50fd015b"
              }
            ]
          },
          {
            "uuid": "67aad40d-31c7-4d35-b686-da3d158deb90",
            "actions": [
              {
                "uuid": "4774b9e5-507f-44f6-9fcc-f55dcf85fd45",
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
                "uuid": "00534a4c-fd6e-4327-8df5-de8d66d7186e",
                "destination_uuid": "af2bc996-d191-43a8-9e54-44c56589e7d7"
              }
            ]
          },
          {
            "uuid": "af2bc996-d191-43a8-9e54-44c56589e7d7",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "70ac52a1-74f6-46bb-b58b-ae958a6d0cc4"
                },
                "type": "enter_flow",
                "uuid": "ada3cfd6-98fa-407f-b38b-df8b96dd30c6"
              }
            ],
            "exits": [
              {
                "uuid": "aa3ca805-d9a8-44a8-a1fa-2245c6f3b832",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "0ba88082-69b8-49bb-aff5-e3fd4101ca5e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5509b27a-8b54-4cc1-8ef1-3e96b2430347",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "89ca2beb-d700-4009-bdc2-7b72eff3477a",
                  "type": "has_only_phrase",
                  "uuid": "b040f621-8aca-42b6-a28b-13d6a25f0627"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ae0e1a1e-a935-4a73-9955-5707e202849d",
                  "name": "All Responses",
                  "uuid": "5509b27a-8b54-4cc1-8ef1-3e96b2430347"
                },
                {
                  "exit_uuid": "763fc5a9-0ef7-476f-b967-3f7ae97d7879",
                  "name": "Activity to help you relax",
                  "uuid": "89ca2beb-d700-4009-bdc2-7b72eff3477a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ae0e1a1e-a935-4a73-9955-5707e202849d",
                "destination_uuid": null
              },
              {
                "uuid": "763fc5a9-0ef7-476f-b967-3f7ae97d7879",
                "destination_uuid": "4d88c2f6-b35a-4cf1-810a-ab3d50fd015b"
              }
            ]
          },
          {
            "uuid": "4d88c2f6-b35a-4cf1-810a-ab3d50fd015b",
            "actions": [
              {
                "uuid": "71727de5-5946-4302-9d24-4393a7c54d71",
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
                "uuid": "36055916-1c88-40bc-b09d-35cffa403e69",
                "destination_uuid": "b33ed06d-91b6-4b2a-8b58-13577d42bb07"
              }
            ]
          },
          {
            "uuid": "b33ed06d-91b6-4b2a-8b58-13577d42bb07",
            "actions": [
              {
                "flow": {
                  "name": "calm_2",
                  "uuid": "140ca68e-5a63-49e8-bff9-5cb31decd80e"
                },
                "type": "enter_flow",
                "uuid": "9521d2c9-8666-4cef-9f5d-45435815c116"
              }
            ],
            "exits": [
              {
                "uuid": "62ec082f-42dc-4fd9-9e04-177c31a3efb2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6a69c4d8-3c02-4cd3-bc63-489250a5283f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "201a9a37-7055-4d9a-8fae-adb7662d21f0",
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
                "uuid": "e11f9554-6877-4581-82f0-6fdd78b80b53"
              }
            ],
            "exits": [
              {
                "uuid": "8c0a0409-87cd-4072-a353-badf06412d07",
                "destination_uuid": "f14f1e8b-cd44-408b-882c-878a49e126a1"
              }
            ]
          },
          {
            "uuid": "f14f1e8b-cd44-408b-882c-878a49e126a1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7d6db9a5-3eee-4f66-a45c-9285bc2ef7da",
              "cases": [
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "95bdb765-df41-470b-b3a6-c6a8ab0fa4b1",
                  "type": "has_only_phrase",
                  "uuid": "249a6796-dc20-4fa4-aff5-1cb36085acc1"
                },
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "50832e88-b0d5-4a7f-b32e-8b7163ef459e",
                  "type": "has_only_phrase",
                  "uuid": "ce1262ed-d14c-474d-a301-896c90ea5bd5"
                },
                {
                  "arguments": [
                    "Pop stars"
                  ],
                  "category_uuid": "8fb4806d-1a71-4484-8e9f-6015316793d4",
                  "type": "has_only_phrase",
                  "uuid": "896e2ca3-a531-4a0d-a0b1-8a660da6809b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "17dbdbc3-b61e-45fa-8cf7-f4fa700fa400",
                  "name": "All Responses",
                  "uuid": "7d6db9a5-3eee-4f66-a45c-9285bc2ef7da"
                },
                {
                  "exit_uuid": "9f27ad6c-f894-4961-91a6-b18136960139",
                  "name": "Get active",
                  "uuid": "95bdb765-df41-470b-b3a6-c6a8ab0fa4b1"
                },
                {
                  "exit_uuid": "c269d9e4-da32-4c99-9a9c-309753932a96",
                  "name": "Chat together",
                  "uuid": "50832e88-b0d5-4a7f-b32e-8b7163ef459e"
                },
                {
                  "exit_uuid": "ba800267-a20f-46fc-8245-975ed3aee453",
                  "name": "Pop stars",
                  "uuid": "8fb4806d-1a71-4484-8e9f-6015316793d4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "17dbdbc3-b61e-45fa-8cf7-f4fa700fa400",
                "destination_uuid": null
              },
              {
                "uuid": "9f27ad6c-f894-4961-91a6-b18136960139",
                "destination_uuid": "141daf8e-9a29-43d0-8480-ab6f897d40c1"
              },
              {
                "uuid": "c269d9e4-da32-4c99-9a9c-309753932a96",
                "destination_uuid": "4d9b6597-0094-45f6-8881-b78cf6b84176"
              },
              {
                "uuid": "ba800267-a20f-46fc-8245-975ed3aee453",
                "destination_uuid": "eac26d82-d672-4b01-a33b-24125e77b134"
              }
            ]
          },
          {
            "uuid": "141daf8e-9a29-43d0-8480-ab6f897d40c1",
            "actions": [
              {
                "attachments": [],
                "text": "Co-chef\n- Ask your teen what kind of meal they would like to eat. \n- Prepare it together! \n- Let them have a turn at being the head chef – they lead and you follow their instructions \n- You can even help them make a budget for ingredients!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8923c311-af10-4950-908b-7cef38d1dbf0"
              }
            ],
            "exits": [
              {
                "uuid": "3307f7eb-d2df-49a1-838e-fc5b14e849db",
                "destination_uuid": "26da8a81-12d6-42c5-b55c-a286160ee5d7"
              }
            ]
          },
          {
            "uuid": "4d9b6597-0094-45f6-8881-b78cf6b84176",
            "actions": [
              {
                "attachments": [],
                "text": "Just a friendly chat \n- Have a conversation with your teen about something they like \n- It can be about anything they choose to talk about: sports, friends, music, celebrities… \n- Try to listen to your teen and give them space to talk ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2a9be881-afd4-4232-8419-0e9bc3ed4200"
              }
            ],
            "exits": [
              {
                "uuid": "07e26a7f-9959-46d9-9740-092c2e9b4c9d",
                "destination_uuid": "26da8a81-12d6-42c5-b55c-a286160ee5d7"
              }
            ]
          },
          {
            "uuid": "eac26d82-d672-4b01-a33b-24125e77b134",
            "actions": [
              {
                "attachments": [],
                "text": "- Ask your teen to choose their favourite song \n- Try to sing it together – do your best pop star impression!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "914be506-5596-479f-8930-11c5ab1cb5d7"
              }
            ],
            "exits": [
              {
                "uuid": "d5764868-e496-4d7d-8dcd-e77d6466db6b",
                "destination_uuid": "26da8a81-12d6-42c5-b55c-a286160ee5d7"
              }
            ]
          },
          {
            "uuid": "26da8a81-12d6-42c5-b55c-a286160ee5d7",
            "actions": [
              {
                "attachments": [],
                "text": "Every time you do one-on-one time mark your STAR to track your success",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ff7cf7b0-86ef-423e-8c07-a139f1730b5b"
              }
            ],
            "exits": [
              {
                "uuid": "da287a81-1855-458f-b9a2-f4df3f2f94af",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1f63a454-743d-4cc5-a008-f3999ed655df",
            "actions": [
              {
                "uuid": "25817c51-29bc-4306-82fe-63ae3806e38f",
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
                "uuid": "414955f8-6fe2-43f0-9603-9cb8e918cb25",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "665060db-9b02-498b-ab8a-6d14d33b2c91",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "57e95c29-4009-47a6-ae85-a1668535576f",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9feccd50-67af-482a-8426-7ca519027b14"
              }
            ],
            "exits": [
              {
                "uuid": "43863ba7-7959-4793-b0d3-73e4be1ce38c",
                "destination_uuid": "f1613c7d-ad22-4343-b03a-00d5af5a0151"
              }
            ]
          },
          {
            "uuid": "f1613c7d-ad22-4343-b03a-00d5af5a0151",
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
                "uuid": "76a0fc39-2ee4-41ac-893e-8a307dc90241"
              }
            ],
            "exits": [
              {
                "uuid": "b0b86196-73f3-4b2f-ae45-d7437dcec13d",
                "destination_uuid": "5b045a6d-c821-4c32-bbe5-fe08349a83fe"
              }
            ]
          },
          {
            "uuid": "5b045a6d-c821-4c32-bbe5-fe08349a83fe",
            "actions": [],
            "exits": [
              {
                "uuid": "ed008d29-9543-4e08-8e33-e661778719d6",
                "destination_uuid": "540d1792-b1d6-41a5-8dd1-331456dad96a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d73ef97e-c3f6-4d98-a09a-71f89d8aa7e3",
              "cases": [],
              "categories": [
                {
                  "uuid": "d73ef97e-c3f6-4d98-a09a-71f89d8aa7e3",
                  "name": "All Responses",
                  "exit_uuid": "ed008d29-9543-4e08-8e33-e661778719d6"
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
            "uuid": "540d1792-b1d6-41a5-8dd1-331456dad96a",
            "actions": [
              {
                "uuid": "c189f24a-efa9-4c94-a8ce-bdf81a95b5dd",
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
                "uuid": "8ca0104b-7ed5-4297-9f72-405a94b29c48",
                "destination_uuid": "57947415-6848-4ca2-a7f6-4d139503fc7f"
              }
            ]
          },
          {
            "uuid": "57947415-6848-4ca2-a7f6-4d139503fc7f",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b3d06ae8-712a-435c-9298-66c21ff9e2db"
              }
            ],
            "exits": [
              {
                "uuid": "cf549484-0043-4198-b08e-537dd5dbcc94",
                "destination_uuid": "0fb3a03e-b993-4218-ab87-4f9116e1b86f"
              }
            ]
          },
          {
            "uuid": "0fb3a03e-b993-4218-ab87-4f9116e1b86f",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bbe91c31-7f70-4006-ae24-9b44a6149cbc"
              }
            ],
            "exits": [
              {
                "uuid": "a182604f-5974-46d8-8d6a-565f31b3eb0f",
                "destination_uuid": "7adab9f2-22ba-4189-bb2e-b880e09e697f"
              }
            ]
          },
          {
            "uuid": "7adab9f2-22ba-4189-bb2e-b880e09e697f",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6d4f7939-daf5-46ad-8451-35503ecadc46"
              }
            ],
            "exits": [
              {
                "uuid": "cc9d6ad5-080b-4549-a394-c334ea5233a1",
                "destination_uuid": "08ef8432-a041-42a9-b70d-c650eaf49b86"
              }
            ]
          },
          {
            "uuid": "08ef8432-a041-42a9-b70d-c650eaf49b86",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "1a095fbe-37dc-48ad-b81e-2a90393fe733"
              }
            ],
            "exits": [
              {
                "uuid": "63445c2b-85cf-43d2-909f-9009bc2b922a",
                "destination_uuid": "d1b1f30b-933d-465d-94d0-295399b6ce4b"
              }
            ]
          },
          {
            "uuid": "d1b1f30b-933d-465d-94d0-295399b6ce4b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f9d6e800-4402-4eee-ac05-75a327b4a7f5",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "79cf5edd-de37-4257-bf7b-2b14929d7a82",
                  "type": "has_only_phrase",
                  "uuid": "82417d1b-50fa-47e4-a350-54e88feaa2da"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "eca72d9f-c9e4-4264-85f3-5c135fc91999",
                  "name": "All Responses",
                  "uuid": "f9d6e800-4402-4eee-ac05-75a327b4a7f5"
                },
                {
                  "exit_uuid": "4378fa59-d1c3-4cb6-8160-58d9eadc7d08",
                  "name": "Let me hear your story",
                  "uuid": "79cf5edd-de37-4257-bf7b-2b14929d7a82"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "eca72d9f-c9e4-4264-85f3-5c135fc91999",
                "destination_uuid": null
              },
              {
                "uuid": "4378fa59-d1c3-4cb6-8160-58d9eadc7d08",
                "destination_uuid": "075fe384-571f-4d46-a56a-9cd0cd0ee061"
              }
            ]
          },
          {
            "uuid": "075fe384-571f-4d46-a56a-9cd0cd0ee061",
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
                "uuid": "ae45fc3e-b372-4dee-ab4f-0405bd1f1f09"
              }
            ],
            "exits": [
              {
                "uuid": "ecd580db-0136-4838-b6c7-0daad2fff315",
                "destination_uuid": "de808c84-779d-4f74-9744-66e7f6b6d8b5"
              }
            ]
          },
          {
            "uuid": "de808c84-779d-4f74-9744-66e7f6b6d8b5",
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
                "uuid": "0ed1c246-6c3c-4a3d-9318-9f2a73e6eda9"
              }
            ],
            "exits": [
              {
                "uuid": "bf9461ae-18fd-4169-9596-29730f15268b",
                "destination_uuid": "61ff8ac9-8761-4b89-ba44-d98221ef27d7"
              }
            ]
          },
          {
            "uuid": "61ff8ac9-8761-4b89-ba44-d98221ef27d7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1c80c7dc-ce93-4733-aa70-bd6c55965577",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "8f4779a0-7553-4deb-8960-3f4083310ca7",
                  "type": "has_only_phrase",
                  "uuid": "44adafb5-1d93-4b42-9d8d-582358043245"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b29c338d-d4af-4421-b70e-e055cd35aebe",
                  "type": "has_only_phrase",
                  "uuid": "ca127015-7530-4fe7-b714-00402e9e01f2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "bb60db11-5eb8-4a1e-a413-949012b2c828",
                  "name": "All Responses",
                  "uuid": "1c80c7dc-ce93-4733-aa70-bd6c55965577"
                },
                {
                  "exit_uuid": "60e51b46-69b9-4843-884c-24f87afd384b",
                  "name": "Previous",
                  "uuid": "8f4779a0-7553-4deb-8960-3f4083310ca7"
                },
                {
                  "exit_uuid": "61c9b15f-bc50-4fbb-a580-c9b372954032",
                  "name": "Next",
                  "uuid": "b29c338d-d4af-4421-b70e-e055cd35aebe"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "bb60db11-5eb8-4a1e-a413-949012b2c828",
                "destination_uuid": null
              },
              {
                "uuid": "60e51b46-69b9-4843-884c-24f87afd384b",
                "destination_uuid": "075fe384-571f-4d46-a56a-9cd0cd0ee061"
              },
              {
                "uuid": "61c9b15f-bc50-4fbb-a580-c9b372954032",
                "destination_uuid": "2a072662-30fc-4ca5-81e3-41e54cc73226"
              }
            ]
          },
          {
            "uuid": "2a072662-30fc-4ca5-81e3-41e54cc73226",
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
                "uuid": "8f057ee7-2861-4010-9057-28e80371bcd4"
              }
            ],
            "exits": [
              {
                "uuid": "98ec6aee-4f39-48da-ad84-e2726c1b985f",
                "destination_uuid": "e42e3cce-ffcc-4d2b-a117-b519c65b9db1"
              }
            ]
          },
          {
            "uuid": "e42e3cce-ffcc-4d2b-a117-b519c65b9db1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9bb56a58-9266-4e4e-884c-68e9f6184403",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "2561c861-965a-4470-8dcf-fa241b8ce4ae",
                  "type": "has_only_phrase",
                  "uuid": "e2aded9d-bc4b-4ce2-bcd7-712e76002148"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "10a07d5f-99bb-47d3-9e1a-c28a9e2b2c49",
                  "type": "has_only_phrase",
                  "uuid": "56deaabb-15bb-4de5-9363-02a5aae779c5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "029b0008-3114-4b45-b01e-fa96651238f7",
                  "name": "All Responses",
                  "uuid": "9bb56a58-9266-4e4e-884c-68e9f6184403"
                },
                {
                  "exit_uuid": "b1f50281-fcc7-49e8-964f-0c0fba887c60",
                  "name": "Previous",
                  "uuid": "2561c861-965a-4470-8dcf-fa241b8ce4ae"
                },
                {
                  "exit_uuid": "a79914cc-8d95-46b2-a55c-e1c3d32a84e2",
                  "name": "Next",
                  "uuid": "10a07d5f-99bb-47d3-9e1a-c28a9e2b2c49"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "029b0008-3114-4b45-b01e-fa96651238f7",
                "destination_uuid": null
              },
              {
                "uuid": "b1f50281-fcc7-49e8-964f-0c0fba887c60",
                "destination_uuid": "de808c84-779d-4f74-9744-66e7f6b6d8b5"
              },
              {
                "uuid": "a79914cc-8d95-46b2-a55c-e1c3d32a84e2",
                "destination_uuid": "46384649-a3eb-479a-8db9-8779c39a5abc"
              }
            ]
          },
          {
            "uuid": "46384649-a3eb-479a-8db9-8779c39a5abc",
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
                "uuid": "1adf47e0-c560-4db8-9b8b-5fe463b8bccd"
              }
            ],
            "exits": [
              {
                "uuid": "56a966d6-e9b9-4b20-8f32-09ab4aaf52b3",
                "destination_uuid": "0ec50f8d-e298-4815-93df-198497f130de"
              }
            ]
          },
          {
            "uuid": "0ec50f8d-e298-4815-93df-198497f130de",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fa96ff75-a54f-480c-bd4e-7190ed8b076d",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "2b96b009-34c8-4692-ba42-edd231dea5e1",
                  "type": "has_only_phrase",
                  "uuid": "70c7b37e-95e3-4a4b-a314-a07a401e7468"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9d6f9417-da44-4e94-826a-60cd349c6347",
                  "type": "has_only_phrase",
                  "uuid": "65196833-aa70-4741-be78-a3248f31d21b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0bb68983-26cd-4869-953c-64575ed9b2ce",
                  "name": "All Responses",
                  "uuid": "fa96ff75-a54f-480c-bd4e-7190ed8b076d"
                },
                {
                  "exit_uuid": "b17f25a2-ee76-4522-b924-f9eac65dcccc",
                  "name": "Previous",
                  "uuid": "2b96b009-34c8-4692-ba42-edd231dea5e1"
                },
                {
                  "exit_uuid": "11746735-14c3-4557-9f95-652e094680ae",
                  "name": "Next",
                  "uuid": "9d6f9417-da44-4e94-826a-60cd349c6347"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0bb68983-26cd-4869-953c-64575ed9b2ce",
                "destination_uuid": null
              },
              {
                "uuid": "b17f25a2-ee76-4522-b924-f9eac65dcccc",
                "destination_uuid": "2a072662-30fc-4ca5-81e3-41e54cc73226"
              },
              {
                "uuid": "11746735-14c3-4557-9f95-652e094680ae",
                "destination_uuid": "c7ae78c2-3a7b-4c34-8e27-d978bda922dd"
              }
            ]
          },
          {
            "uuid": "c7ae78c2-3a7b-4c34-8e27-d978bda922dd",
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
                "uuid": "872e5053-527c-4e0c-b171-abe0d96e520d"
              }
            ],
            "exits": [
              {
                "uuid": "c002cd70-f363-4dfb-b9a7-565505344f89",
                "destination_uuid": "bf0a74ca-31c4-4385-a7b8-9993f240a811"
              }
            ]
          },
          {
            "uuid": "bf0a74ca-31c4-4385-a7b8-9993f240a811",
            "actions": [],
            "exits": [
              {
                "uuid": "2ae2b80e-51ce-4fec-a12b-4f14c99d66a7",
                "destination_uuid": "4fbd9d41-9e70-4f80-b5d9-4996d5208470"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3946e1bb-ea9c-44bf-967d-9789bc733f92",
              "cases": [],
              "categories": [
                {
                  "uuid": "3946e1bb-ea9c-44bf-967d-9789bc733f92",
                  "name": "All Responses",
                  "exit_uuid": "2ae2b80e-51ce-4fec-a12b-4f14c99d66a7"
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
            "uuid": "4fbd9d41-9e70-4f80-b5d9-4996d5208470",
            "actions": [
              {
                "uuid": "0a2a6e39-9f9c-4bce-a2bb-48b023992a68",
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
                "uuid": "cc753f44-83cc-4bd3-a5a8-9b6f308f83a8",
                "destination_uuid": "01ec67ec-1d78-4aba-8ec1-0d253f08f7af"
              }
            ]
          },
          {
            "uuid": "01ec67ec-1d78-4aba-8ec1-0d253f08f7af",
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
                "uuid": "0d743664-d740-450c-bcb0-9a0d9eba9bb2"
              }
            ],
            "exits": [
              {
                "uuid": "177c76dd-7502-40ba-8a2b-291068ab7737",
                "destination_uuid": "1fc34482-c78c-42ad-88fb-627f56c70476"
              }
            ]
          },
          {
            "uuid": "1fc34482-c78c-42ad-88fb-627f56c70476",
            "actions": [],
            "exits": [
              {
                "uuid": "a3837c7f-f7a2-47f1-b91b-f85566ddfba7",
                "destination_uuid": "0b93d07b-f114-4382-8b56-d3e68b0f3594"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "89894923-5200-4b6a-a11b-5b13fd6e026b",
              "cases": [],
              "categories": [
                {
                  "uuid": "89894923-5200-4b6a-a11b-5b13fd6e026b",
                  "name": "All Responses",
                  "exit_uuid": "a3837c7f-f7a2-47f1-b91b-f85566ddfba7"
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
            "uuid": "0b93d07b-f114-4382-8b56-d3e68b0f3594",
            "actions": [
              {
                "uuid": "14e78490-4d7d-4e17-8705-e3c8061121b6",
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
                "uuid": "b0327896-f4c1-44bc-bd8c-c15de2c6d3ca",
                "destination_uuid": "aa79a0e8-c472-4c3a-97a3-2b4537ba3a58"
              }
            ]
          },
          {
            "uuid": "aa79a0e8-c472-4c3a-97a3-2b4537ba3a58",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "271206a0-f6ec-4351-aa58-7165bda0c613"
              }
            ],
            "exits": [
              {
                "uuid": "bf607f85-8886-45e7-baf2-2d5701615285",
                "destination_uuid": "baeb8ad3-766c-4fde-a29e-5e3361eb01de"
              }
            ]
          },
          {
            "uuid": "baeb8ad3-766c-4fde-a29e-5e3361eb01de",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "11e94095-b99a-4f7c-86b0-6b332b9a3197"
              }
            ],
            "exits": [
              {
                "uuid": "48a21930-04c2-4940-a06e-bf67524d273c",
                "destination_uuid": "76814f8c-c4a4-4a34-b733-211258942987"
              }
            ]
          },
          {
            "uuid": "76814f8c-c4a4-4a34-b733-211258942987",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f815644a-1389-48cb-8222-62f3692c2933",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "15c3529c-5690-4ad6-8352-fdc3956220e5",
                  "type": "has_only_phrase",
                  "uuid": "d4b43e4a-4028-4c7a-af2d-58935b1d4230"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "21a6a0d1-556b-4c6e-ab4c-4e1eb27b4b74",
                  "type": "has_only_phrase",
                  "uuid": "9187302f-6e90-44a6-8cb2-d4e3136f1728"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "341b6da3-084c-4cd5-9ffa-5e14a5b9909e",
                  "name": "All Responses",
                  "uuid": "f815644a-1389-48cb-8222-62f3692c2933"
                },
                {
                  "exit_uuid": "3d07c85c-f787-492a-8f4b-0e6079b6bd31",
                  "name": "Take me to Tips",
                  "uuid": "15c3529c-5690-4ad6-8352-fdc3956220e5"
                },
                {
                  "exit_uuid": "58fb9b2b-466e-4304-8e19-4df5bc7bd436",
                  "name": "Take me to Homescreen",
                  "uuid": "21a6a0d1-556b-4c6e-ab4c-4e1eb27b4b74"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "341b6da3-084c-4cd5-9ffa-5e14a5b9909e",
                "destination_uuid": null
              },
              {
                "uuid": "3d07c85c-f787-492a-8f4b-0e6079b6bd31",
                "destination_uuid": "1bd573bf-d386-4a66-b772-b5f740d842e2"
              },
              {
                "uuid": "58fb9b2b-466e-4304-8e19-4df5bc7bd436",
                "destination_uuid": "d9ec3bc7-57a3-4349-98a2-81321b13989d"
              }
            ]
          },
          {
            "uuid": "1bd573bf-d386-4a66-b772-b5f740d842e2",
            "actions": [
              {
                "uuid": "65eafd08-3291-443e-9eeb-d83255929753",
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
                "uuid": "193fed09-921e-482a-a144-b2e15ea45e78",
                "destination_uuid": "def92e24-0a03-41bd-9826-8111d9b7b2f6"
              }
            ]
          },
          {
            "uuid": "def92e24-0a03-41bd-9826-8111d9b7b2f6",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "d2a57458-f41a-4f7f-a22c-7587ab91431a"
                },
                "type": "enter_flow",
                "uuid": "4d762ee5-5c5d-4d58-9efa-618bc60c4b59"
              }
            ],
            "exits": [
              {
                "uuid": "c7d223c6-74c0-438c-add3-c76c92069eb3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "d9ec3bc7-57a3-4349-98a2-81321b13989d",
            "actions": [
              {
                "uuid": "f104b2cc-4ef9-46e7-8ce4-b1697ac73357",
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
                "uuid": "4b878fa1-dd15-47bd-99c6-515bbcdfab88",
                "destination_uuid": "fda1cb9a-0aed-4315-b268-5733e823bb1b"
              }
            ]
          },
          {
            "uuid": "fda1cb9a-0aed-4315-b268-5733e823bb1b",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "0cd54174-57da-404d-be36-dfdf00fe0782"
                },
                "type": "enter_flow",
                "uuid": "7dbbb75a-cd9b-4946-b105-6a731ab404c0"
              }
            ],
            "exits": [
              {
                "uuid": "e275bd8d-52ed-4629-a548-fd9220bfab50",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "753e36a2-8923-4d78-99b4-32c04cc66cb4",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9d6b6118-33d2-4143-ac22-ea398ac50df6",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "73bb4026-dbfc-4377-b4a1-bd2b5e19ffd7"
              }
            ],
            "exits": [
              {
                "uuid": "1c4a696f-5677-4459-ac09-296ad151b42c",
                "destination_uuid": "00d4cba1-7025-4486-be7c-1b0a43971867"
              }
            ]
          },
          {
            "uuid": "00d4cba1-7025-4486-be7c-1b0a43971867",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "852d4a93-52c1-456b-9cdc-8c43b293760e"
              }
            ],
            "exits": [
              {
                "uuid": "017e0215-1c6a-4176-b756-73e862dc5715",
                "destination_uuid": "e82670df-bf63-43f8-8593-88e0aba5ce54"
              }
            ]
          },
          {
            "uuid": "e82670df-bf63-43f8-8593-88e0aba5ce54",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "76112c8a-1fb8-47a9-831b-513a10572256",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "819e4e11-08c3-4fa1-b0b9-e03fe545f12a",
                  "type": "has_only_phrase",
                  "uuid": "aa271bf3-2321-4c32-959c-3106862017b5"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "f2483a4e-95f3-4ff2-893f-10074f7ebe2e",
                  "type": "has_only_phrase",
                  "uuid": "e97dcb29-df57-46b9-9ac1-958705aa7a04"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b4657c8b-f841-4c3d-bea8-bd79f6250944",
                  "name": "All Responses",
                  "uuid": "76112c8a-1fb8-47a9-831b-513a10572256"
                },
                {
                  "exit_uuid": "0f80e5f0-cdae-493b-9b5c-80a6bbdbe9d2",
                  "name": "Later",
                  "uuid": "819e4e11-08c3-4fa1-b0b9-e03fe545f12a"
                },
                {
                  "exit_uuid": "bb21550a-164f-48ca-b8b3-b52f577c3bcc",
                  "name": "Yes",
                  "uuid": "f2483a4e-95f3-4ff2-893f-10074f7ebe2e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b4657c8b-f841-4c3d-bea8-bd79f6250944",
                "destination_uuid": null
              },
              {
                "uuid": "0f80e5f0-cdae-493b-9b5c-80a6bbdbe9d2",
                "destination_uuid": "fe14fa66-a4b2-430c-92ae-d89d26ba4f16"
              },
              {
                "uuid": "bb21550a-164f-48ca-b8b3-b52f577c3bcc",
                "destination_uuid": "ed117504-e817-4869-9305-326817917012"
              }
            ]
          },
          {
            "uuid": "fe14fa66-a4b2-430c-92ae-d89d26ba4f16",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "d80877f5-48ec-40ae-b1b5-871e05fe0248"
                },
                "type": "enter_flow",
                "uuid": "ee1e3fa8-2f94-437b-ac7e-b59ee7bc71cb"
              }
            ],
            "exits": [
              {
                "uuid": "bb784be5-3eea-4940-b5dd-5dd322c19d6b",
                "destination_uuid": null
              },
              {
                "uuid": "3a6e797c-01cb-4af3-ae6d-6191ac541d75",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "57babe7b-8b0e-41cd-8727-aa90cffda62f",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "83e937a6-2600-4fe1-9b96-e58151dcc7fd"
                },
                {
                  "uuid": "8b7149e2-6973-48bb-835f-a57fd88b8c64",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "01c5c573-7ee9-4681-be4f-8a7b8d4cb068"
                }
              ],
              "categories": [
                {
                  "uuid": "83e937a6-2600-4fe1-9b96-e58151dcc7fd",
                  "name": "Complete",
                  "exit_uuid": "bb784be5-3eea-4940-b5dd-5dd322c19d6b"
                },
                {
                  "uuid": "01c5c573-7ee9-4681-be4f-8a7b8d4cb068",
                  "name": "Expired",
                  "exit_uuid": "3a6e797c-01cb-4af3-ae6d-6191ac541d75"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "83e937a6-2600-4fe1-9b96-e58151dcc7fd"
            }
          },
          {
            "uuid": "ed117504-e817-4869-9305-326817917012",
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
                "uuid": "dc6dee85-e3b6-409a-8fe2-238c426b8a69"
              }
            ],
            "exits": [
              {
                "uuid": "372cab5e-f7cd-48ad-98f9-7964fac95534",
                "destination_uuid": "d68d166f-8659-45f8-bb13-478368f214e1"
              }
            ]
          },
          {
            "uuid": "d68d166f-8659-45f8-bb13-478368f214e1",
            "actions": [],
            "exits": [
              {
                "uuid": "d31f4179-408c-4c15-9663-ef5563c32211",
                "destination_uuid": "f789204b-5e08-4934-85d4-402e008c095d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0616c701-1125-4719-8c5a-be2e91c2ddf4",
              "cases": [],
              "categories": [
                {
                  "uuid": "0616c701-1125-4719-8c5a-be2e91c2ddf4",
                  "name": "All Responses",
                  "exit_uuid": "d31f4179-408c-4c15-9663-ef5563c32211"
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
            "uuid": "f789204b-5e08-4934-85d4-402e008c095d",
            "actions": [
              {
                "uuid": "9a577ba6-c242-4390-8f63-468618bf0495",
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
                "uuid": "32856bb5-710f-4f9a-b6f4-fe7b7acb4f28",
                "destination_uuid": "753910a4-44d6-419e-b4b5-332e8d1e5f1b"
              }
            ]
          },
          {
            "uuid": "753910a4-44d6-419e-b4b5-332e8d1e5f1b",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "b72ee468-098e-4dd7-8bd1-83d0150f130c"
              }
            ],
            "exits": [
              {
                "uuid": "34a4b87e-a30c-4403-99a5-348406f67dd1",
                "destination_uuid": "e7446481-a54b-4552-bfb0-14b9c102f0b4"
              }
            ]
          },
          {
            "uuid": "e7446481-a54b-4552-bfb0-14b9c102f0b4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ec186abc-a71a-44d2-9434-64ee9a8580c0",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "bada5cc8-dae4-455c-936c-4560219bd293",
                  "type": "has_only_phrase",
                  "uuid": "c85417d8-dcdd-4616-aec1-f2121136db71"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ff7a8b1d-c8a8-4c25-8222-597f9a0f969e",
                  "name": "All Responses",
                  "uuid": "ec186abc-a71a-44d2-9434-64ee9a8580c0"
                },
                {
                  "exit_uuid": "fc5f1f00-f622-4c97-a992-07d7c71f1c5c",
                  "name": "Click here when done",
                  "uuid": "bada5cc8-dae4-455c-936c-4560219bd293"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ff7a8b1d-c8a8-4c25-8222-597f9a0f969e",
                "destination_uuid": null
              },
              {
                "uuid": "fc5f1f00-f622-4c97-a992-07d7c71f1c5c",
                "destination_uuid": "6e922765-39ab-43d3-87e7-ce0f61d2913f"
              }
            ]
          },
          {
            "uuid": "6e922765-39ab-43d3-87e7-ce0f61d2913f",
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
                "uuid": "099221af-8abb-4e1b-881f-986848f51ba3"
              }
            ],
            "exits": [
              {
                "uuid": "c0578340-f01d-41bc-a28a-f6924acbbb08",
                "destination_uuid": "5bda6d3c-f041-48d3-8be4-761e78b9c45d"
              }
            ]
          },
          {
            "uuid": "5bda6d3c-f041-48d3-8be4-761e78b9c45d",
            "actions": [],
            "exits": [
              {
                "uuid": "b9f1f262-a271-48fa-8122-598181344a7a",
                "destination_uuid": "81e99ba9-5594-4dce-83f2-17ba359d3670"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "812b73a8-d5b8-4590-a529-8d444215fac8",
              "cases": [],
              "categories": [
                {
                  "uuid": "812b73a8-d5b8-4590-a529-8d444215fac8",
                  "name": "All Responses",
                  "exit_uuid": "b9f1f262-a271-48fa-8122-598181344a7a"
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
            "uuid": "81e99ba9-5594-4dce-83f2-17ba359d3670",
            "actions": [
              {
                "uuid": "467de743-c505-457c-a36f-125885f765bb",
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
                "uuid": "c23f2c75-dd16-4e2f-b4a2-4062c3acfe42",
                "destination_uuid": "d6d6e0c5-8d79-4006-b668-7fa5fffcd30a"
              }
            ]
          },
          {
            "uuid": "d6d6e0c5-8d79-4006-b668-7fa5fffcd30a",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "d2c09f4d-955d-4f3b-8f14-7029c9f83c1c"
              }
            ],
            "exits": [
              {
                "uuid": "0f1adea3-b336-4952-b41c-c1e6c48d165a",
                "destination_uuid": "76280cb1-3cd7-4163-a8dd-fb9fc8f8d438"
              }
            ]
          },
          {
            "uuid": "76280cb1-3cd7-4163-a8dd-fb9fc8f8d438",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b24c778b-db5a-4024-85a2-eb686bdfcde3",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "e2c67f2d-2c0c-4f55-909b-64b36b6372ac",
                  "type": "has_only_phrase",
                  "uuid": "ffe984dd-f539-44dc-832e-8ca33f829395"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "31ca796b-26cc-4be0-b4d6-fdff9c3303f2",
                  "name": "All Responses",
                  "uuid": "b24c778b-db5a-4024-85a2-eb686bdfcde3"
                },
                {
                  "exit_uuid": "882ca09f-046a-4a57-b06f-06997f1353e5",
                  "name": "Click here when done",
                  "uuid": "e2c67f2d-2c0c-4f55-909b-64b36b6372ac"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "31ca796b-26cc-4be0-b4d6-fdff9c3303f2",
                "destination_uuid": null
              },
              {
                "uuid": "882ca09f-046a-4a57-b06f-06997f1353e5",
                "destination_uuid": "e557bb00-fd65-49d3-a596-6b07e028b646"
              }
            ]
          },
          {
            "uuid": "e557bb00-fd65-49d3-a596-6b07e028b646",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5b3e0c66-ae3a-4028-bc91-928ea30145b9"
              }
            ],
            "exits": [
              {
                "uuid": "c33b4960-8ee3-480a-a07c-64fad91e7b3b",
                "destination_uuid": "290f1cd2-cafa-46b6-a6ce-f9f698ceb6e4"
              }
            ]
          },
          {
            "uuid": "290f1cd2-cafa-46b6-a6ce-f9f698ceb6e4",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3fcb07c6-b268-467a-95a9-fa0213633b35"
              }
            ],
            "exits": [
              {
                "uuid": "0d715af4-d3d1-4b3f-942a-81225840ae70",
                "destination_uuid": "2d8814a4-cc7e-4ad4-b9d1-9532a4908e70"
              }
            ]
          },
          {
            "uuid": "2d8814a4-cc7e-4ad4-b9d1-9532a4908e70",
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
                "uuid": "d0ce0ada-646f-4f92-8fc8-22f3faf8ecc6"
              }
            ],
            "exits": [
              {
                "uuid": "ea3f9d63-daea-492b-bdba-10147cbf4e8b",
                "destination_uuid": "bc2cbbe6-b5fa-4873-a682-31391ac7bc65"
              }
            ]
          },
          {
            "uuid": "bc2cbbe6-b5fa-4873-a682-31391ac7bc65",
            "actions": [],
            "exits": [
              {
                "uuid": "e9b52491-b135-4fa0-aeaf-2a2255322ad4",
                "destination_uuid": "21d0a55a-ffe4-428f-913c-e4f3f2de3b9f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "4783b622-6e14-4da4-bf4d-3eaf1153d5ed",
              "cases": [],
              "categories": [
                {
                  "uuid": "4783b622-6e14-4da4-bf4d-3eaf1153d5ed",
                  "name": "All Responses",
                  "exit_uuid": "e9b52491-b135-4fa0-aeaf-2a2255322ad4"
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
            "uuid": "21d0a55a-ffe4-428f-913c-e4f3f2de3b9f",
            "actions": [
              {
                "uuid": "0c3e8feb-6326-499e-b7f2-8fd15980ca0c",
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
                "uuid": "b42c0dc7-e113-42c7-8506-fe810ea3a06e",
                "destination_uuid": "0e5b5a9d-d0ff-4467-b1d5-93f9857a33b2"
              }
            ]
          },
          {
            "uuid": "0e5b5a9d-d0ff-4467-b1d5-93f9857a33b2",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "78388b62-de5c-499f-a0e6-7c726e02a24f"
              }
            ],
            "exits": [
              {
                "uuid": "a74868f8-2327-4cf7-ac42-3d001bf5e7c1",
                "destination_uuid": "1cdba738-8726-417a-8937-d1371fe1f75d"
              }
            ]
          },
          {
            "uuid": "1cdba738-8726-417a-8937-d1371fe1f75d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a5a5e918-4ff4-43be-8d8d-cbbeee821534",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "022e7ef7-9c4f-4431-b854-930b1be77b07",
                  "type": "has_only_phrase",
                  "uuid": "4b656e52-05fc-4264-8e7e-2081106cfa27"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "43a8d631-b499-476b-b413-3065cd06383a",
                  "name": "All Responses",
                  "uuid": "a5a5e918-4ff4-43be-8d8d-cbbeee821534"
                },
                {
                  "exit_uuid": "c2f39027-ed52-4b50-87d4-17ad75af510d",
                  "name": "Take me to Homescreen",
                  "uuid": "022e7ef7-9c4f-4431-b854-930b1be77b07"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "43a8d631-b499-476b-b413-3065cd06383a",
                "destination_uuid": null
              },
              {
                "uuid": "c2f39027-ed52-4b50-87d4-17ad75af510d",
                "destination_uuid": "788ef29d-506b-46cd-94bd-8ec77ca5afd4"
              }
            ]
          },
          {
            "uuid": "788ef29d-506b-46cd-94bd-8ec77ca5afd4",
            "actions": [
              {
                "uuid": "1674470d-d897-4b6b-9c6c-f882ea0731bf",
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
                "uuid": "36126d43-0798-4b2f-843b-6c8f89dc1a12",
                "destination_uuid": "192e90f4-f0c5-4416-bf64-67ad94f42786"
              }
            ]
          },
          {
            "uuid": "192e90f4-f0c5-4416-bf64-67ad94f42786",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "0845e2ec-c3aa-473c-88d4-ffe12de769cf"
                },
                "type": "enter_flow",
                "uuid": "eb319f1e-3207-4662-97a5-68c2473f5fb0"
              }
            ],
            "exits": [
              {
                "uuid": "864052ce-29c1-46d8-b281-fb7d282c7c70",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8c92a593-a1f0-4eca-978d-75453a541e94",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "46b96ed4-9eb9-4016-aadc-a6d1f9cb1e55",
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
                "uuid": "d369ae94-1249-46c4-b866-741733d6cd4f"
              }
            ],
            "exits": [
              {
                "uuid": "ddbd78ba-273b-4b64-9175-47af58cfd44b",
                "destination_uuid": "6b30e067-8e77-45c0-a430-29cb8eb3ecdb"
              }
            ]
          },
          {
            "uuid": "6b30e067-8e77-45c0-a430-29cb8eb3ecdb",
            "actions": [],
            "exits": [
              {
                "uuid": "14d0ea0d-2963-4eb5-a10c-14dc9a5395af",
                "destination_uuid": "fd17cb7f-975c-4c2f-bfbc-29c63af1b1e1"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b4d72f80-1cac-4a2d-a650-ab3e5b4a95d5",
              "cases": [],
              "categories": [
                {
                  "uuid": "b4d72f80-1cac-4a2d-a650-ab3e5b4a95d5",
                  "name": "All Responses",
                  "exit_uuid": "14d0ea0d-2963-4eb5-a10c-14dc9a5395af"
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
            "uuid": "fd17cb7f-975c-4c2f-bfbc-29c63af1b1e1",
            "actions": [
              {
                "uuid": "b58e0b3b-07b5-40cd-b306-03933f36cef0",
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
                "uuid": "cd42ad9e-71d1-412f-a00d-5c6a13b1acb3",
                "destination_uuid": "588bb98b-b9cb-4a93-a649-08aa4e7512a7"
              }
            ]
          },
          {
            "uuid": "588bb98b-b9cb-4a93-a649-08aa4e7512a7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6e6abc9c-ffbe-4986-9244-7e09d82319cd",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "de8b9cff-54cb-4742-8f0b-55276de9f235",
                  "type": "has_only_phrase",
                  "uuid": "e55b6249-ff5c-4c69-8c01-caed40b6a76b"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "a950925e-8d9b-4040-a4ae-b6f5543fa256",
                  "type": "has_only_phrase",
                  "uuid": "56b7261d-6161-4160-89f4-d206c5976113"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "a950925e-8d9b-4040-a4ae-b6f5543fa256",
                  "type": "has_only_phrase",
                  "uuid": "68717e65-8a95-4e2b-ab3d-478bf39970e0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "28e3eab9-ca7d-4a97-8b6d-e41c544a7b9b",
                  "name": "All Responses",
                  "uuid": "6e6abc9c-ffbe-4986-9244-7e09d82319cd"
                },
                {
                  "exit_uuid": "bb23bfd1-d23c-4408-ae7a-31a324ec51cc",
                  "name": "Great",
                  "uuid": "de8b9cff-54cb-4742-8f0b-55276de9f235"
                },
                {
                  "exit_uuid": "a7b45b88-0e87-4f86-b6de-f87adb41bb8f",
                  "name": "Neutral; Bad",
                  "uuid": "a950925e-8d9b-4040-a4ae-b6f5543fa256"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "28e3eab9-ca7d-4a97-8b6d-e41c544a7b9b",
                "destination_uuid": null
              },
              {
                "uuid": "bb23bfd1-d23c-4408-ae7a-31a324ec51cc",
                "destination_uuid": "9758400d-93db-4c74-bd61-b10fb937b45f"
              },
              {
                "uuid": "a7b45b88-0e87-4f86-b6de-f87adb41bb8f",
                "destination_uuid": "2977e105-1fd6-4449-ba01-bdf1fdeb9130"
              }
            ]
          },
          {
            "uuid": "9758400d-93db-4c74-bd61-b10fb937b45f",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "a3e66099-b372-4feb-bc5c-0b00db6eba53"
              }
            ],
            "exits": [
              {
                "uuid": "4b2abddd-2fb1-4d15-bf4c-78f77d736fa6",
                "destination_uuid": "5d180ae6-9979-4465-baf6-ee3163524597"
              }
            ]
          },
          {
            "uuid": "2977e105-1fd6-4449-ba01-bdf1fdeb9130",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "b2fcda99-3cc1-46f0-87c9-3526641b75bf"
              }
            ],
            "exits": [
              {
                "uuid": "a3565081-c0e9-42af-a677-50d3ef4c3ecf",
                "destination_uuid": "f7526d4d-a826-49c1-874e-25e8a38ddf36"
              }
            ]
          },
          {
            "uuid": "f7526d4d-a826-49c1-874e-25e8a38ddf36",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f0e3b318-2f24-4ef0-9143-6ce79fb8c1b0",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "9221cab5-376e-4c22-9741-c1c4fe67b18b",
                  "type": "has_only_phrase",
                  "uuid": "76262b56-c548-4baa-8d30-c8d7c75c58e4"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "1e9dd872-2af0-4447-ae20-120aa55de5d3",
                  "type": "has_only_phrase",
                  "uuid": "da38c2b8-7f80-4131-a028-25022822f575"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "27c4ff32-3ae9-41b6-9288-21484e3a5d02",
                  "name": "All Responses",
                  "uuid": "f0e3b318-2f24-4ef0-9143-6ce79fb8c1b0"
                },
                {
                  "exit_uuid": "54d8bd41-401c-4003-94c9-c11901b8cae7",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "9221cab5-376e-4c22-9741-c1c4fe67b18b"
                },
                {
                  "exit_uuid": "df27fb87-3ad6-46b1-b6a2-98941c59316c",
                  "name": "Continue",
                  "uuid": "1e9dd872-2af0-4447-ae20-120aa55de5d3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "27c4ff32-3ae9-41b6-9288-21484e3a5d02",
                "destination_uuid": null
              },
              {
                "uuid": "54d8bd41-401c-4003-94c9-c11901b8cae7",
                "destination_uuid": "bbe70e30-35c5-4c3f-8d5b-099986eeaa17"
              },
              {
                "uuid": "df27fb87-3ad6-46b1-b6a2-98941c59316c",
                "destination_uuid": "8168451b-9d62-46f7-9a18-12f1cb819a2b"
              }
            ]
          },
          {
            "uuid": "bbe70e30-35c5-4c3f-8d5b-099986eeaa17",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "e2927f70-c720-4294-b886-aee8de921cfb"
                },
                "type": "enter_flow",
                "uuid": "18e52009-ae21-4a46-a7b1-6a4713f80e09"
              }
            ],
            "exits": [
              {
                "uuid": "674f2aaf-0dad-460f-97db-f33238837198",
                "destination_uuid": "f23c811d-eafa-4204-9def-072fb0e2e8ba"
              },
              {
                "uuid": "2c84995c-a312-4427-8b6f-e5180fb6ff05",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "56a9e5de-8e63-4d5d-8bd7-7a6fc7107262",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7a8eb4a5-068d-4e5c-bd5f-6d7b258fa57f"
                },
                {
                  "uuid": "9dfa74e4-0a5b-48da-84fb-632893581dee",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "461b813f-c120-443a-8bc8-bedb3735ddcc"
                }
              ],
              "categories": [
                {
                  "uuid": "7a8eb4a5-068d-4e5c-bd5f-6d7b258fa57f",
                  "name": "Complete",
                  "exit_uuid": "674f2aaf-0dad-460f-97db-f33238837198"
                },
                {
                  "uuid": "461b813f-c120-443a-8bc8-bedb3735ddcc",
                  "name": "Expired",
                  "exit_uuid": "2c84995c-a312-4427-8b6f-e5180fb6ff05"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7a8eb4a5-068d-4e5c-bd5f-6d7b258fa57f"
            }
          },
          {
            "uuid": "5d180ae6-9979-4465-baf6-ee3163524597",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "aa90a7f7-f3c3-40eb-a48b-784644ae62df",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "9d8aab95-4763-42cd-81e4-8cbfbdad44a2",
                  "type": "has_only_phrase",
                  "uuid": "06f15f4d-27e0-468f-91cb-c91d8819d53f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f6fb3acd-2414-4717-81b1-2764523cf80a",
                  "name": "All Responses",
                  "uuid": "aa90a7f7-f3c3-40eb-a48b-784644ae62df"
                },
                {
                  "exit_uuid": "11db23aa-fa91-4446-a7e5-5c97b18433cd",
                  "name": "Go to Praise check-in",
                  "uuid": "9d8aab95-4763-42cd-81e4-8cbfbdad44a2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f6fb3acd-2414-4717-81b1-2764523cf80a",
                "destination_uuid": null
              },
              {
                "uuid": "11db23aa-fa91-4446-a7e5-5c97b18433cd",
                "destination_uuid": "a7aa1eaa-3999-4ec5-8976-ce0442b4d887"
              }
            ]
          },
          {
            "uuid": "a7aa1eaa-3999-4ec5-8976-ce0442b4d887",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "53235382-9a82-4f53-a218-ff8cad731454"
              }
            ],
            "exits": [
              {
                "uuid": "2a86a88a-6702-4d60-bbde-74b93c4dc031",
                "destination_uuid": "8fc11c06-0a2c-4868-9eaf-8d910f0a787d"
              }
            ]
          },
          {
            "uuid": "8168451b-9d62-46f7-9a18-12f1cb819a2b",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "3de8748c-e16a-40a5-b729-7008545ab0e6"
              }
            ],
            "exits": [
              {
                "uuid": "d03f998a-feb1-4961-803c-213f0c7b3fe0",
                "destination_uuid": "8fc11c06-0a2c-4868-9eaf-8d910f0a787d"
              }
            ]
          },
          {
            "uuid": "f23c811d-eafa-4204-9def-072fb0e2e8ba",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "4b75e562-2205-4605-91c4-5b37aca663cc"
              }
            ],
            "exits": [
              {
                "uuid": "0b631c97-5eb1-4f6a-9986-de646b7da021",
                "destination_uuid": "8fc11c06-0a2c-4868-9eaf-8d910f0a787d"
              }
            ]
          },
          {
            "uuid": "8fc11c06-0a2c-4868-9eaf-8d910f0a787d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c36b4b17-af5a-4476-b0a0-5fd0bbaae224",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "3fec121d-e13e-4e95-8369-15c6ab6ec4ad",
                  "type": "has_only_phrase",
                  "uuid": "77d50129-0925-41d9-9c2a-1cdcca56fa06"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "5535f933-cdb6-4e76-8984-0054ac811d54",
                  "type": "has_only_phrase",
                  "uuid": "47e8244c-67e2-44a5-abc6-b0d69730c36c"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "a638a493-8cfb-439b-8a0f-b888c27f07b4",
                  "type": "has_only_phrase",
                  "uuid": "d174afc5-e9da-4df3-a359-af8fdf5c0670"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "994d10c8-d1c9-4147-8eef-48ebbdbe19b6",
                  "type": "has_only_phrase",
                  "uuid": "8ab7d794-927a-4096-b10c-ff5a67bad8f6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a2ad0b6d-081d-41d0-af8f-584b24e7c259",
                  "name": "All Responses",
                  "uuid": "c36b4b17-af5a-4476-b0a0-5fd0bbaae224"
                },
                {
                  "exit_uuid": "1820f4be-3c84-4c20-bbb2-2178761e64bd",
                  "name": "No",
                  "uuid": "3fec121d-e13e-4e95-8369-15c6ab6ec4ad"
                },
                {
                  "exit_uuid": "0f8b1616-3341-4e08-93a8-bcf61087b101",
                  "name": "Yes",
                  "uuid": "5535f933-cdb6-4e76-8984-0054ac811d54"
                },
                {
                  "exit_uuid": "08dd5ddd-7eb3-46f5-8acf-da009116082c",
                  "name": "Yes",
                  "uuid": "a638a493-8cfb-439b-8a0f-b888c27f07b4"
                },
                {
                  "exit_uuid": "ff418bed-b5f0-4a69-9578-21ba1e18e201",
                  "name": "Yes",
                  "uuid": "994d10c8-d1c9-4147-8eef-48ebbdbe19b6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a2ad0b6d-081d-41d0-af8f-584b24e7c259",
                "destination_uuid": null
              },
              {
                "uuid": "1820f4be-3c84-4c20-bbb2-2178761e64bd",
                "destination_uuid": "f697e4ed-c8f0-4a5a-913a-a1a6c7737b12"
              },
              {
                "uuid": "0f8b1616-3341-4e08-93a8-bcf61087b101",
                "destination_uuid": "f3b291d3-1165-48f2-a014-2d923f69b038"
              },
              {
                "uuid": "08dd5ddd-7eb3-46f5-8acf-da009116082c",
                "destination_uuid": "f3b291d3-1165-48f2-a014-2d923f69b038"
              },
              {
                "uuid": "ff418bed-b5f0-4a69-9578-21ba1e18e201",
                "destination_uuid": "f3b291d3-1165-48f2-a014-2d923f69b038"
              }
            ]
          },
          {
            "uuid": "f697e4ed-c8f0-4a5a-913a-a1a6c7737b12",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "18a1b689-8220-4b27-8937-8d844293ea94"
              }
            ],
            "exits": [
              {
                "uuid": "99cc271d-3c6e-4ba0-a249-84c76ab18c65",
                "destination_uuid": "e07a5143-76b6-4bed-9b54-d4ec4759623a"
              }
            ]
          },
          {
            "uuid": "f3b291d3-1165-48f2-a014-2d923f69b038",
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
                "uuid": "15a5ac42-b3e9-4fc8-9610-c1b761a78800"
              }
            ],
            "exits": [
              {
                "uuid": "733c5b3b-537a-4225-a4d1-ee3496b735d0",
                "destination_uuid": "43049ecd-349b-441b-adcf-da38f62e9c22"
              }
            ]
          },
          {
            "uuid": "43049ecd-349b-441b-adcf-da38f62e9c22",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "355df603-445e-458a-81f3-3bea6a3f05f8",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "6a16b7a9-158f-4734-94bf-716824b8aa1f",
                  "type": "has_only_phrase",
                  "uuid": "5c0ae984-641c-425d-87c5-a49701feaecc"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "77de9383-31fd-45f6-9ac6-f4d10ffe4c20",
                  "type": "has_only_phrase",
                  "uuid": "5dffdc1f-c7d5-43ab-a947-49c1ff70e610"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "369838ed-6731-435b-98ee-b387cf252527",
                  "type": "has_only_phrase",
                  "uuid": "edd02132-9b67-4099-9b7a-c9f515a8e8a7"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "4a77536a-4c88-4f03-8295-a3f528fccfe2",
                  "type": "has_only_phrase",
                  "uuid": "5f5bec36-baab-4ea9-8547-ac6a4e9a8864"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e3947114-712d-48e7-8ca1-8f826b24374e",
                  "name": "All Responses",
                  "uuid": "355df603-445e-458a-81f3-3bea6a3f05f8"
                },
                {
                  "exit_uuid": "d5865006-bc2c-440b-8c2c-1c6ad2bae271",
                  "name": "Surprised",
                  "uuid": "6a16b7a9-158f-4734-94bf-716824b8aa1f"
                },
                {
                  "exit_uuid": "8e73369d-8fda-4e9b-85e8-51f9bcc6b7a9",
                  "name": "Happy",
                  "uuid": "77de9383-31fd-45f6-9ac6-f4d10ffe4c20"
                },
                {
                  "exit_uuid": "ee04ccbb-c4a0-44cd-99be-a307437f63bd",
                  "name": "My teen did not like it",
                  "uuid": "369838ed-6731-435b-98ee-b387cf252527"
                },
                {
                  "exit_uuid": "9f061b72-7f59-4b81-8412-fdd8af9e2796",
                  "name": "I don’t know",
                  "uuid": "4a77536a-4c88-4f03-8295-a3f528fccfe2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e3947114-712d-48e7-8ca1-8f826b24374e",
                "destination_uuid": null
              },
              {
                "uuid": "d5865006-bc2c-440b-8c2c-1c6ad2bae271",
                "destination_uuid": "abd5a4cb-39ce-4258-9fa8-2b76fc04e56b"
              },
              {
                "uuid": "8e73369d-8fda-4e9b-85e8-51f9bcc6b7a9",
                "destination_uuid": "1e4fa648-42eb-4f9c-8827-a9db3dbb79d3"
              },
              {
                "uuid": "ee04ccbb-c4a0-44cd-99be-a307437f63bd",
                "destination_uuid": "05ab513a-a153-4974-8003-4fc9ce6adf11"
              },
              {
                "uuid": "9f061b72-7f59-4b81-8412-fdd8af9e2796",
                "destination_uuid": "d10c74c0-bade-40fb-9645-fb1ccd303a94"
              }
            ]
          },
          {
            "uuid": "abd5a4cb-39ce-4258-9fa8-2b76fc04e56b",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7fab74a6-4fe2-4525-a9af-ad5ee596d05d"
              }
            ],
            "exits": [
              {
                "uuid": "da135bff-fc5d-4f56-9969-a8db24ca9049",
                "destination_uuid": "fb0a1906-1385-42df-ba73-74fd5e3ca48e"
              }
            ]
          },
          {
            "uuid": "1e4fa648-42eb-4f9c-8827-a9db3dbb79d3",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "608cf020-6c12-4088-81db-c3b00813e67a"
              }
            ],
            "exits": [
              {
                "uuid": "1db8d266-e91b-4b7e-b453-73dcf9d29e8e",
                "destination_uuid": "fb0a1906-1385-42df-ba73-74fd5e3ca48e"
              }
            ]
          },
          {
            "uuid": "05ab513a-a153-4974-8003-4fc9ce6adf11",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b815452e-146e-422a-8ce4-4957223890df"
              }
            ],
            "exits": [
              {
                "uuid": "51ac90e4-41f2-4e76-909e-2cf89f0c41f1",
                "destination_uuid": "fb0a1906-1385-42df-ba73-74fd5e3ca48e"
              }
            ]
          },
          {
            "uuid": "d10c74c0-bade-40fb-9645-fb1ccd303a94",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "13083c60-92c5-4a0a-aab9-ea7d294a0d0a"
              }
            ],
            "exits": [
              {
                "uuid": "146996c4-cb61-403b-9c1c-8dbaf3269118",
                "destination_uuid": "fb0a1906-1385-42df-ba73-74fd5e3ca48e"
              }
            ]
          },
          {
            "uuid": "fb0a1906-1385-42df-ba73-74fd5e3ca48e",
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
                "uuid": "38f693b3-59bb-48a2-bbca-401a2bd7c283"
              }
            ],
            "exits": [
              {
                "uuid": "bbcdecc5-5d53-4325-827c-0a121d523479",
                "destination_uuid": "bf626e42-0257-47f2-921c-aad503ce1085"
              }
            ]
          },
          {
            "uuid": "bf626e42-0257-47f2-921c-aad503ce1085",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "454b0c4c-86f8-407a-b609-360be2fc0d95",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "8002219e-1f55-4605-8121-4559a5b5a148",
                  "type": "has_only_phrase",
                  "uuid": "3682e41e-8d7b-416a-8357-48d8a992b823"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "8002219e-1f55-4605-8121-4559a5b5a148",
                  "type": "has_only_phrase",
                  "uuid": "6511b396-af08-45f5-b644-950b0d083387"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "8bd2d3b0-f6a2-47de-b235-44d4706e1e71",
                  "type": "has_only_phrase",
                  "uuid": "702b60e2-e44a-447c-964e-ba73ab11e0e3"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "8bd2d3b0-f6a2-47de-b235-44d4706e1e71",
                  "type": "has_only_phrase",
                  "uuid": "a212be0f-4b4a-468c-bbf6-33694f63c50d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0ab70826-7883-48df-b56a-07858561da29",
                  "name": "All Responses",
                  "uuid": "454b0c4c-86f8-407a-b609-360be2fc0d95"
                },
                {
                  "exit_uuid": "502af593-7659-4213-9728-1a0828217619",
                  "name": "Every day; Almost every day",
                  "uuid": "8002219e-1f55-4605-8121-4559a5b5a148"
                },
                {
                  "exit_uuid": "14e5205d-2006-47d7-b20d-4151375c7929",
                  "name": "A few days; Never",
                  "uuid": "8bd2d3b0-f6a2-47de-b235-44d4706e1e71"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0ab70826-7883-48df-b56a-07858561da29",
                "destination_uuid": null
              },
              {
                "uuid": "502af593-7659-4213-9728-1a0828217619",
                "destination_uuid": "90489c9d-bac7-443a-9a2a-321dddbbccac"
              },
              {
                "uuid": "14e5205d-2006-47d7-b20d-4151375c7929",
                "destination_uuid": "545da523-5f21-43a2-b83d-3226722b63dd"
              }
            ]
          },
          {
            "uuid": "90489c9d-bac7-443a-9a2a-321dddbbccac",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7b3435fa-dd1a-4460-9ebc-638a0ab40565"
              }
            ],
            "exits": [
              {
                "uuid": "db1ff39f-4aaa-43e0-a18c-6358385f71af",
                "destination_uuid": "e07a5143-76b6-4bed-9b54-d4ec4759623a"
              }
            ]
          },
          {
            "uuid": "545da523-5f21-43a2-b83d-3226722b63dd",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ec121437-c6e2-4ec9-9802-5f8f8cce7ac0"
              }
            ],
            "exits": [
              {
                "uuid": "22ecda89-c19c-43cd-a67c-519c350b9e99",
                "destination_uuid": "e07a5143-76b6-4bed-9b54-d4ec4759623a"
              }
            ]
          },
          {
            "uuid": "e07a5143-76b6-4bed-9b54-d4ec4759623a",
            "actions": [
              {
                "uuid": "2f907c9e-f463-43e9-8f01-065a73dade07",
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
                "uuid": "3947a69d-4c2d-49b3-ae42-06ccbef92e55",
                "destination_uuid": "656e3226-80ce-401c-8490-c14f4beec3ff"
              }
            ]
          },
          {
            "uuid": "656e3226-80ce-401c-8490-c14f4beec3ff",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "22777085-5f3e-43c5-a52c-892c7fe338d6"
                },
                "type": "enter_flow",
                "uuid": "0f973e06-0381-4cec-b4c5-ba2bcccea211"
              }
            ],
            "exits": [
              {
                "uuid": "c9ea47f2-6179-4cd7-82eb-2307c24bc872",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f72725b3-140e-41ce-a6e5-e795eb10c624",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "cb49da88-6b7e-4387-854e-98696322f186",
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
                "uuid": "d1810c96-56a9-44c5-9668-cf89b7575741"
              }
            ],
            "exits": [
              {
                "uuid": "522dea51-6f50-4d8e-a183-eeafafc1ec38",
                "destination_uuid": "d604021c-5cf0-485a-bc55-302c46c26a1f"
              }
            ]
          },
          {
            "uuid": "d604021c-5cf0-485a-bc55-302c46c26a1f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "808c5e2b-b4ad-458e-b92d-9fba4430639b",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "dfbd2aad-199e-42d7-b271-16a169c77ae8",
                  "type": "has_only_phrase",
                  "uuid": "ba604664-d869-4ec6-9278-c1eb2e8994bc"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "739c2975-8e51-4c90-a16c-e4233eb0ef68",
                  "type": "has_only_phrase",
                  "uuid": "14624bc9-ce90-4b2e-9a7e-247f2dfcdf6d"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "f2aafaa2-6184-4f1a-808f-0bbde6de8383",
                  "type": "has_only_phrase",
                  "uuid": "e01852d5-f215-4912-8212-2935b5e0b949"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "34ac72f1-0116-429b-968c-bbc200325fee",
                  "name": "All Responses",
                  "uuid": "808c5e2b-b4ad-458e-b92d-9fba4430639b"
                },
                {
                  "exit_uuid": "16794682-ec39-4e11-840d-2aa2aac35734",
                  "name": "Happy",
                  "uuid": "dfbd2aad-199e-42d7-b271-16a169c77ae8"
                },
                {
                  "exit_uuid": "1cd13ee6-e108-4550-9ab8-9b3e2413b71f",
                  "name": "Neutral",
                  "uuid": "739c2975-8e51-4c90-a16c-e4233eb0ef68"
                },
                {
                  "exit_uuid": "7680deaf-af9f-485c-9e42-fd2a594c6127",
                  "name": "Sad",
                  "uuid": "f2aafaa2-6184-4f1a-808f-0bbde6de8383"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "34ac72f1-0116-429b-968c-bbc200325fee",
                "destination_uuid": null
              },
              {
                "uuid": "16794682-ec39-4e11-840d-2aa2aac35734",
                "destination_uuid": "98d51cb5-65a8-46a1-8a8e-dae2d9b7afb5"
              },
              {
                "uuid": "1cd13ee6-e108-4550-9ab8-9b3e2413b71f",
                "destination_uuid": "96e1595e-0e10-4b41-860c-869bec42f22f"
              },
              {
                "uuid": "7680deaf-af9f-485c-9e42-fd2a594c6127",
                "destination_uuid": "1ec0484e-0018-49dc-af1d-42ca7bca4c7d"
              }
            ]
          },
          {
            "uuid": "98d51cb5-65a8-46a1-8a8e-dae2d9b7afb5",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that you are doing well. You are a wonderful parent!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "f2d4c540-2138-445e-b6d4-3f44c99f1b59"
              }
            ],
            "exits": [
              {
                "uuid": "6a2d2365-9ab2-4240-a22a-184c6ffd65f5",
                "destination_uuid": "427b5024-2829-499a-ade3-12c34fa3ac8b"
              }
            ]
          },
          {
            "uuid": "96e1595e-0e10-4b41-860c-869bec42f22f",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that you are not having the best day. Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "2051703d-3672-4840-b8ab-71119ab54f6d"
              }
            ],
            "exits": [
              {
                "uuid": "3348908f-9937-4208-a641-19400f544bbd",
                "destination_uuid": "427b5024-2829-499a-ade3-12c34fa3ac8b"
              }
            ]
          },
          {
            "uuid": "1ec0484e-0018-49dc-af1d-42ca7bca4c7d",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that you are not having a good day. Well done for getting up every morning and trying again, even when you are tired. That is real courage and dedication!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "21c416b6-44d9-423d-a78e-5c201b5463ce"
              }
            ],
            "exits": [
              {
                "uuid": "8f9fd672-01ea-48bb-bc66-c9b56b669503",
                "destination_uuid": "7c7aebad-12a2-4f79-a903-3465bdc5a7a6"
              }
            ]
          },
          {
            "uuid": "427b5024-2829-499a-ade3-12c34fa3ac8b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9a55c4e0-ccaf-4234-bfc6-a0354c2e04c4",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "c0dbffd7-0827-4d88-818c-c8352bf0a24f",
                  "type": "has_only_phrase",
                  "uuid": "2871a35e-3d64-45e5-8e0e-41e20d7c69ae"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "fe067080-4e0d-4428-a5c8-e589a97dd9a9",
                  "type": "has_only_phrase",
                  "uuid": "8767ab1f-c214-4cc6-b179-c95b3cca6cb8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "93f7c5f3-7d3a-4d47-ad91-0c91dac50157",
                  "name": "All Responses",
                  "uuid": "9a55c4e0-ccaf-4234-bfc6-a0354c2e04c4"
                },
                {
                  "exit_uuid": "7cc827ea-7bd7-4581-bef5-877fd6b6d4bf",
                  "name": "More tips",
                  "uuid": "c0dbffd7-0827-4d88-818c-c8352bf0a24f"
                },
                {
                  "exit_uuid": "eab795d0-2621-4795-ab9f-bd7c8e36e425",
                  "name": "Activity to help you relax",
                  "uuid": "fe067080-4e0d-4428-a5c8-e589a97dd9a9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "93f7c5f3-7d3a-4d47-ad91-0c91dac50157",
                "destination_uuid": null
              },
              {
                "uuid": "7cc827ea-7bd7-4581-bef5-877fd6b6d4bf",
                "destination_uuid": "a83d9a3f-1f2b-4cd7-862f-d94759b147ca"
              },
              {
                "uuid": "eab795d0-2621-4795-ab9f-bd7c8e36e425",
                "destination_uuid": "e04112c6-d777-4225-9094-58cad20a1310"
              }
            ]
          },
          {
            "uuid": "a83d9a3f-1f2b-4cd7-862f-d94759b147ca",
            "actions": [
              {
                "uuid": "ef92c5da-2f5f-46ec-8400-9029938f2eb9",
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
                "uuid": "0202b2f4-dbc2-47c6-a509-a70c19075dba",
                "destination_uuid": "f097e4d1-343f-4652-98fe-bb9814ec0809"
              }
            ]
          },
          {
            "uuid": "f097e4d1-343f-4652-98fe-bb9814ec0809",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "dcc10e8c-4f4c-4593-81a6-c9c45ec025fe"
                },
                "type": "enter_flow",
                "uuid": "897dee9a-e32a-4fb9-877d-66b3bab8a7eb"
              }
            ],
            "exits": [
              {
                "uuid": "aa724d5c-5b74-4833-b0cb-62125165fccc",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7c7aebad-12a2-4f79-a903-3465bdc5a7a6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c8023ba9-8635-4ad3-b99d-efdeff1f6db0",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "b3e9dc97-602a-4fde-bc45-56127a1a1b19",
                  "type": "has_only_phrase",
                  "uuid": "f7b56a18-b9b9-47a1-b3a9-9f41da9a358c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "94b9aaf6-ae03-4911-815b-95ccafc9a1e5",
                  "name": "All Responses",
                  "uuid": "c8023ba9-8635-4ad3-b99d-efdeff1f6db0"
                },
                {
                  "exit_uuid": "554d0d37-8f85-4263-97f3-babbe3938c9b",
                  "name": "Activity to help you relax",
                  "uuid": "b3e9dc97-602a-4fde-bc45-56127a1a1b19"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "94b9aaf6-ae03-4911-815b-95ccafc9a1e5",
                "destination_uuid": null
              },
              {
                "uuid": "554d0d37-8f85-4263-97f3-babbe3938c9b",
                "destination_uuid": "e04112c6-d777-4225-9094-58cad20a1310"
              }
            ]
          },
          {
            "uuid": "e04112c6-d777-4225-9094-58cad20a1310",
            "actions": [
              {
                "uuid": "712b0f22-cc03-4383-953e-27d80d33b5f0",
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
                "uuid": "2c646ac4-d517-4b8c-a7a5-feab60666c17",
                "destination_uuid": "df893ef5-9e1f-4fbd-9e3f-d328ad1a20b1"
              }
            ]
          },
          {
            "uuid": "df893ef5-9e1f-4fbd-9e3f-d328ad1a20b1",
            "actions": [
              {
                "flow": {
                  "name": "calm_3",
                  "uuid": "b3c4d203-4182-4d7e-aad9-1dd31ca1a79c"
                },
                "type": "enter_flow",
                "uuid": "acc3b860-e3cd-4cd7-a5fa-28fc671c097b"
              }
            ],
            "exits": [
              {
                "uuid": "7eefc487-b511-402e-a97d-7c1c095c319c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bc748f57-e294-4747-8405-e67218251454",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "83b49c93-5f84-40f7-a653-078191bb8bd3",
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
                "uuid": "0631a270-30d8-47c1-a8d3-83c2ba820acb"
              }
            ],
            "exits": [
              {
                "uuid": "e0f7c826-71cc-4301-8b09-d5c3c11955c9",
                "destination_uuid": "924e6187-302c-4ad6-b8c6-d61a18849388"
              }
            ]
          },
          {
            "uuid": "924e6187-302c-4ad6-b8c6-d61a18849388",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d3e28f6a-2174-4628-bf0e-2f47c3aa827d",
              "cases": [
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "9362cb3f-3a83-4260-8d2b-031373a4e4c6",
                  "type": "has_only_phrase",
                  "uuid": "f4c936bb-787a-4781-bbb7-ebb04fdbb3d7"
                },
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "3fff35da-2114-43a9-a4d9-dd0cafb5e541",
                  "type": "has_only_phrase",
                  "uuid": "925c1912-a82e-42be-ab8f-07869f7cb30a"
                },
                {
                  "arguments": [
                    "Watch & sing"
                  ],
                  "category_uuid": "2b12f3ca-6f00-469c-8d90-950804c6f64a",
                  "type": "has_only_phrase",
                  "uuid": "800e64a2-90ec-4885-8046-e8da5ac7bc59"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6aa54423-517f-4a45-8892-69c20e8493a8",
                  "name": "All Responses",
                  "uuid": "d3e28f6a-2174-4628-bf0e-2f47c3aa827d"
                },
                {
                  "exit_uuid": "d537fd16-4716-4cd4-8b19-55a22b8de678",
                  "name": "Chat together",
                  "uuid": "9362cb3f-3a83-4260-8d2b-031373a4e4c6"
                },
                {
                  "exit_uuid": "0e4e9451-186e-4fd5-a61f-acafefe808de",
                  "name": "Get active",
                  "uuid": "3fff35da-2114-43a9-a4d9-dd0cafb5e541"
                },
                {
                  "exit_uuid": "56480b58-03b8-48cf-99c7-2d1967692507",
                  "name": "Watch & sing",
                  "uuid": "2b12f3ca-6f00-469c-8d90-950804c6f64a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6aa54423-517f-4a45-8892-69c20e8493a8",
                "destination_uuid": null
              },
              {
                "uuid": "d537fd16-4716-4cd4-8b19-55a22b8de678",
                "destination_uuid": "858fb1d6-1e8b-43eb-8a0e-e39710a05495"
              },
              {
                "uuid": "0e4e9451-186e-4fd5-a61f-acafefe808de",
                "destination_uuid": "e8d86edc-edac-4610-bfd7-05c77a0d5c97"
              },
              {
                "uuid": "56480b58-03b8-48cf-99c7-2d1967692507",
                "destination_uuid": "ff73d2d3-1d19-457d-9303-a262adacbef8"
              }
            ]
          },
          {
            "uuid": "858fb1d6-1e8b-43eb-8a0e-e39710a05495",
            "actions": [
              {
                "attachments": [],
                "text": "At the End of the Day\n- At the end of each day, take a minute to think about the day.\n- Talk your child about one positive or fun thing they did.\n- Praise yourself for one thing you did well today.\n- Think of one thing that you are grateful for.\n- You are a star!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9b01add2-11e7-4016-a895-a9436c336128"
              }
            ],
            "exits": [
              {
                "uuid": "4d4c2a82-1b61-499e-8272-caae7b74b8ef",
                "destination_uuid": "1bf5c3a9-cc43-4f46-bab3-bec6dc66d921"
              }
            ]
          },
          {
            "uuid": "e8d86edc-edac-4610-bfd7-05c77a0d5c97",
            "actions": [
              {
                "attachments": [],
                "text": "What's new?\n- Think of a new skill you could learn together with your teen. For example, keeping a ball in the air or your foot, juggling, making soup?\n- Take turns in trying the new skill out.\n- Make sure to praise each other, and try to learn and play together!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "90e40e60-8855-4654-b4dc-3d94fbeb959b"
              }
            ],
            "exits": [
              {
                "uuid": "f8c97c33-3d26-49bb-b300-fe1bd8259ca8",
                "destination_uuid": "1bf5c3a9-cc43-4f46-bab3-bec6dc66d921"
              }
            ]
          },
          {
            "uuid": "ff73d2d3-1d19-457d-9303-a262adacbef8",
            "actions": [
              {
                "attachments": [],
                "text": "Song...",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9e1350e8-8a67-4089-bdb6-c0f6fdfdb1eb"
              }
            ],
            "exits": [
              {
                "uuid": "a9b08749-86e3-4981-8d63-ae525cc798ef",
                "destination_uuid": "1bf5c3a9-cc43-4f46-bab3-bec6dc66d921"
              }
            ]
          },
          {
            "uuid": "1bf5c3a9-cc43-4f46-bab3-bec6dc66d921",
            "actions": [
              {
                "uuid": "07d155de-cba5-451e-8a00-ee202236ea9b",
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
                "uuid": "e2096e37-bfaa-4188-84fb-3a2d1948baa5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bf6ca1f9-bda2-4d18-9623-9c04c087acac",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "24128f6c-7592-47ea-975a-1bd472e3a7b7",
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
                "uuid": "4a01d7db-1ccb-4e3d-a626-951876094d34"
              }
            ],
            "exits": [
              {
                "uuid": "100bcb5a-6c47-4532-939a-7386574dc92b",
                "destination_uuid": "bf4199a9-1351-4344-9e01-0566697d4930"
              }
            ]
          },
          {
            "uuid": "bf4199a9-1351-4344-9e01-0566697d4930",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "637c2fd6-9d41-42bf-880e-6edfc6a9b8d7",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "2224a740-15e3-4af6-a613-0073a70b82b9",
                  "type": "has_only_phrase",
                  "uuid": "bf6c65b2-fd28-4195-b0cd-9c9df1ac2dea"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "e661e450-8f64-48c9-8876-df74d9cd5e8b",
                  "type": "has_only_phrase",
                  "uuid": "ebfff0cf-6d8e-48ed-a7b9-686aeccc1e9a"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "54484d6d-6bca-4d5b-9486-a52193a929e2",
                  "type": "has_only_phrase",
                  "uuid": "964c1221-e9e8-4f65-b5ef-33715a56b0fc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dc46b54a-ca0d-4f9c-a0de-8323ab4bde2c",
                  "name": "All Responses",
                  "uuid": "637c2fd6-9d41-42bf-880e-6edfc6a9b8d7"
                },
                {
                  "exit_uuid": "501c651f-f5d7-425e-8ba2-c6d780ae430c",
                  "name": "Happy",
                  "uuid": "2224a740-15e3-4af6-a613-0073a70b82b9"
                },
                {
                  "exit_uuid": "42a18254-332c-4d5e-9753-7b18fbf411a7",
                  "name": "Neutral",
                  "uuid": "e661e450-8f64-48c9-8876-df74d9cd5e8b"
                },
                {
                  "exit_uuid": "c3383d4a-fbb9-42bc-a41f-3c58eeb61430",
                  "name": "Sad",
                  "uuid": "54484d6d-6bca-4d5b-9486-a52193a929e2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "dc46b54a-ca0d-4f9c-a0de-8323ab4bde2c",
                "destination_uuid": null
              },
              {
                "uuid": "501c651f-f5d7-425e-8ba2-c6d780ae430c",
                "destination_uuid": "afe66a2c-a472-4959-a47d-f0a776d05673"
              },
              {
                "uuid": "42a18254-332c-4d5e-9753-7b18fbf411a7",
                "destination_uuid": "039ac955-eade-4081-b942-ff54754d835e"
              },
              {
                "uuid": "c3383d4a-fbb9-42bc-a41f-3c58eeb61430",
                "destination_uuid": "39c486f7-ce26-4fa5-8f05-689ab5913ece"
              }
            ]
          },
          {
            "uuid": "afe66a2c-a472-4959-a47d-f0a776d05673",
            "actions": [
              {
                "attachments": [],
                "text": "So good to hear you are feeling well today. You are incredible!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "e0aa84b1-0c3c-4817-a8c6-006011b90d45"
              }
            ],
            "exits": [
              {
                "uuid": "17580ee3-14ee-4215-aed4-c2dfe2a77b73",
                "destination_uuid": "ec6f85b6-a854-472a-9773-51a40042a1fd"
              }
            ]
          },
          {
            "uuid": "039ac955-eade-4081-b942-ff54754d835e",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes we are up, sometimes we are down – it’s okay. Remember it’s the small things that make the difference and I am here for you!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "5954b511-8e60-434d-92ba-c956eb2f11c3"
              }
            ],
            "exits": [
              {
                "uuid": "e011ce66-d3cc-4237-813f-617b8bfd7252",
                "destination_uuid": "ec6f85b6-a854-472a-9773-51a40042a1fd"
              }
            ]
          },
          {
            "uuid": "39c486f7-ce26-4fa5-8f05-689ab5913ece",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that things are difficult right now. Take a deep breath and know that you are valued. We are here to help!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "01648c9f-0b17-46d0-b1f1-a1fb065faf52"
              }
            ],
            "exits": [
              {
                "uuid": "4a483f30-0cef-4451-afa0-97eac4448ead",
                "destination_uuid": "babdff48-8ae2-44d9-adac-c87c78f94d88"
              }
            ]
          },
          {
            "uuid": "ec6f85b6-a854-472a-9773-51a40042a1fd",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "13936cb4-c5cb-41c9-937c-84053556fc6f",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "4bdf0a8f-d09e-4940-b58c-407a8a4905db",
                  "type": "has_only_phrase",
                  "uuid": "97e04e0f-0af0-4ac4-929f-0acd741c037c"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "fc85b1d2-acb2-4972-bf0b-c8507184896e",
                  "type": "has_only_phrase",
                  "uuid": "4304820b-2110-4fb7-b7ee-d03316a4ea2a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "de8a0244-8da1-4b70-a93f-bfe261bbf6c2",
                  "name": "All Responses",
                  "uuid": "13936cb4-c5cb-41c9-937c-84053556fc6f"
                },
                {
                  "exit_uuid": "a78ea26d-5e1e-4586-a994-96c75af7aaf7",
                  "name": "More tips",
                  "uuid": "4bdf0a8f-d09e-4940-b58c-407a8a4905db"
                },
                {
                  "exit_uuid": "015fedc5-2d5c-4b4a-8bff-0539e78603a9",
                  "name": "Activity to help you relax",
                  "uuid": "fc85b1d2-acb2-4972-bf0b-c8507184896e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "de8a0244-8da1-4b70-a93f-bfe261bbf6c2",
                "destination_uuid": null
              },
              {
                "uuid": "a78ea26d-5e1e-4586-a994-96c75af7aaf7",
                "destination_uuid": "80a9cdbd-0bd2-4cdf-b264-cce8a624085d"
              },
              {
                "uuid": "015fedc5-2d5c-4b4a-8bff-0539e78603a9",
                "destination_uuid": "af52005a-6e47-4830-89f3-f99bd1fb62fe"
              }
            ]
          },
          {
            "uuid": "80a9cdbd-0bd2-4cdf-b264-cce8a624085d",
            "actions": [
              {
                "uuid": "4b7bc328-534b-4433-bf4b-b8448b9ecaa3",
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
                "uuid": "0afbcfa5-af43-4566-b682-88c187525a2e",
                "destination_uuid": "4a2b6417-0331-4702-a7b2-e029566a6f5e"
              }
            ]
          },
          {
            "uuid": "4a2b6417-0331-4702-a7b2-e029566a6f5e",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "c174e5d9-a775-4eef-b1b0-7bea9e015673"
                },
                "type": "enter_flow",
                "uuid": "5e3e285b-24da-4af3-af6b-c78b264f0996"
              }
            ],
            "exits": [
              {
                "uuid": "0937a9f3-ca92-4ef2-aa19-b961c4fa512b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "babdff48-8ae2-44d9-adac-c87c78f94d88",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "46c650ac-5a7d-4adb-aa17-92ea641622f5",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "7e52def5-04a1-440a-96e4-80522128315a",
                  "type": "has_only_phrase",
                  "uuid": "c09ca61d-5078-4212-890b-bea4ea988fd0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a1cb95a8-0abe-4e92-9803-9ca95ebfbf50",
                  "name": "All Responses",
                  "uuid": "46c650ac-5a7d-4adb-aa17-92ea641622f5"
                },
                {
                  "exit_uuid": "2d542490-c217-4ebc-bcfb-aca82739a30c",
                  "name": "Activity to help you relax",
                  "uuid": "7e52def5-04a1-440a-96e4-80522128315a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a1cb95a8-0abe-4e92-9803-9ca95ebfbf50",
                "destination_uuid": null
              },
              {
                "uuid": "2d542490-c217-4ebc-bcfb-aca82739a30c",
                "destination_uuid": "af52005a-6e47-4830-89f3-f99bd1fb62fe"
              }
            ]
          },
          {
            "uuid": "af52005a-6e47-4830-89f3-f99bd1fb62fe",
            "actions": [
              {
                "uuid": "0af91d51-a90c-48f6-90aa-0555b3154178",
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
                "uuid": "d8e6fa88-9b77-4e8c-8c88-ac737cd06975",
                "destination_uuid": "645fc6f1-801b-4579-971a-90e81f3472e9"
              }
            ]
          },
          {
            "uuid": "645fc6f1-801b-4579-971a-90e81f3472e9",
            "actions": [
              {
                "flow": {
                  "name": "calm_6",
                  "uuid": "d493eb60-7815-4f98-b5c1-bbf36705ddf7"
                },
                "type": "enter_flow",
                "uuid": "4210b55d-ad3a-4e7e-9e1b-ea7e00187362"
              }
            ],
            "exits": [
              {
                "uuid": "853bded5-cce8-4fb0-9112-bfc7a8d65842",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "dd72c44d-c24e-4363-bfdf-acd6a821a3a9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "fdd6de68-2fc4-4db5-887b-1ce2e61df4ea",
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
                "uuid": "b274b4bf-c13d-4930-94c1-d5e786e1cf46"
              }
            ],
            "exits": [
              {
                "uuid": "31003862-bafd-4a11-9bfa-3f661519b483",
                "destination_uuid": "473ae3e9-aec3-4868-8f87-e402dbde6f05"
              }
            ]
          },
          {
            "uuid": "473ae3e9-aec3-4868-8f87-e402dbde6f05",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c9b4a939-95eb-477b-8547-9075bda2651f",
              "cases": [
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "b58fed54-a7f5-4910-a703-d82711e8aa0e",
                  "type": "has_only_phrase",
                  "uuid": "bf182566-edec-44b9-aada-38b44496c1e1"
                },
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "01cb146f-6360-45b2-847f-7ecb68dac314",
                  "type": "has_only_phrase",
                  "uuid": "8c5047c9-4aab-4c51-9f31-c2001a08be9e"
                },
                {
                  "arguments": [
                    "Watch & sing"
                  ],
                  "category_uuid": "453ee419-b956-43b8-adf6-15f204747ba5",
                  "type": "has_only_phrase",
                  "uuid": "ae16ecbf-14fa-4144-8b9d-e065120f20e7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d4ddce18-567a-45d6-98bd-9cd8bd222cf1",
                  "name": "All Responses",
                  "uuid": "c9b4a939-95eb-477b-8547-9075bda2651f"
                },
                {
                  "exit_uuid": "4cf52411-b4df-405f-b490-794809a4c228",
                  "name": "Chat together",
                  "uuid": "b58fed54-a7f5-4910-a703-d82711e8aa0e"
                },
                {
                  "exit_uuid": "bfb6a56f-343d-4335-96a9-9ac36af29225",
                  "name": "Get active",
                  "uuid": "01cb146f-6360-45b2-847f-7ecb68dac314"
                },
                {
                  "exit_uuid": "9858b30d-ec1f-4605-bc68-34f7170bb903",
                  "name": "Watch & sing",
                  "uuid": "453ee419-b956-43b8-adf6-15f204747ba5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d4ddce18-567a-45d6-98bd-9cd8bd222cf1",
                "destination_uuid": null
              },
              {
                "uuid": "4cf52411-b4df-405f-b490-794809a4c228",
                "destination_uuid": "697d91e5-4315-4f18-957f-d54bee9d9fcf"
              },
              {
                "uuid": "bfb6a56f-343d-4335-96a9-9ac36af29225",
                "destination_uuid": "1a340454-950c-4568-ad07-da37e903f437"
              },
              {
                "uuid": "9858b30d-ec1f-4605-bc68-34f7170bb903",
                "destination_uuid": "a393d050-645d-420f-addb-472e99cf155e"
              }
            ]
          },
          {
            "uuid": "697d91e5-4315-4f18-957f-d54bee9d9fcf",
            "actions": [
              {
                "attachments": [],
                "text": "Dream Travel \n- You can’t always travel but you can always dream! Ask your teen these questions.\n- Where do you want to travel? How long will you be away? What will you pack? What will you do? What will you see? \n- Look at a map together if you have one. \n- Choose a country that they’ve never heard of and find out about it.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e779b773-11a4-4bde-a854-b174781cb29a"
              }
            ],
            "exits": [
              {
                "uuid": "e02aaa51-890e-4d36-8e0b-9d3bf7e76de4",
                "destination_uuid": "b6dc601d-b16a-4fcd-aa1e-7305131d278f"
              }
            ]
          },
          {
            "uuid": "1a340454-950c-4568-ad07-da37e903f437",
            "actions": [
              {
                "attachments": [],
                "text": "Dance moves \n- Create a set of dance moves to your teen's favourite songs.\n- First person does a dance move and everyone else copies.\n- Everyone takes turns being the leader.\n- Perform it for the household!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "385ee099-0152-4e9f-b8ad-51076a7d3020"
              }
            ],
            "exits": [
              {
                "uuid": "499d9e2b-43c5-47cf-abb0-e60d7a73316a",
                "destination_uuid": "b6dc601d-b16a-4fcd-aa1e-7305131d278f"
              }
            ]
          },
          {
            "uuid": "a393d050-645d-420f-addb-472e99cf155e",
            "actions": [
              {
                "attachments": [],
                "text": "Song...",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "49807486-91be-494e-9726-270e1b37c94f"
              }
            ],
            "exits": [
              {
                "uuid": "c69fc270-7a6d-4138-a324-426137b6f219",
                "destination_uuid": "b6dc601d-b16a-4fcd-aa1e-7305131d278f"
              }
            ]
          },
          {
            "uuid": "b6dc601d-b16a-4fcd-aa1e-7305131d278f",
            "actions": [
              {
                "uuid": "e1175bed-a9b9-4842-9cf9-0a8db712d5f3",
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
                "uuid": "ac84651d-8546-4ead-b148-06f42e0a7123",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5674a1fa-365b-45d8-909c-24374e3b0003",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9eaecfb8-56bc-4937-9384-cb308bdb2f61",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8c8e4696-5ffd-4f19-bb08-4e80a1256fdf"
              }
            ],
            "exits": [
              {
                "uuid": "448caea6-00d5-406e-aac1-f4bf5a7b52fd",
                "destination_uuid": "85b7fa50-d081-4b19-9b5a-09688080c43f"
              }
            ]
          },
          {
            "uuid": "85b7fa50-d081-4b19-9b5a-09688080c43f",
            "actions": [
              {
                "uuid": "ab4061f4-7305-435a-a01a-cf2966bf67d1",
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
                "uuid": "c84f0773-18ed-4ac1-ab86-4c9c0b6e0e09",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "390cb13e-48ec-46d2-a0a6-c8804db96cd6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a5aaef61-5f21-46d5-9d72-4d585cb7ab1e",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6599a115-5ea9-464c-b36f-86a1fc8a87a4"
              }
            ],
            "exits": [
              {
                "uuid": "b224388f-b288-40ac-999f-ef3edd50b269",
                "destination_uuid": "89c82d0e-79ad-4dd1-b87d-77c83bd86c7b"
              }
            ]
          },
          {
            "uuid": "89c82d0e-79ad-4dd1-b87d-77c83bd86c7b",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "00844783-4caf-404c-8c4c-232026436cf3"
              }
            ],
            "exits": [
              {
                "uuid": "74c9b23b-8e88-45d2-bee2-a5d0707b5da4",
                "destination_uuid": "20bc8988-399f-4ffb-bcb9-e6c41a76884f"
              }
            ]
          },
          {
            "uuid": "20bc8988-399f-4ffb-bcb9-e6c41a76884f",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1157aa71-e443-4903-b3e3-3f9727e3e4f6"
              }
            ],
            "exits": [
              {
                "uuid": "79eef2cb-05ce-4f89-b7dd-849941ad465b",
                "destination_uuid": "bb0963e1-ee22-4f2c-a0d6-2cca3f985320"
              }
            ]
          },
          {
            "uuid": "bb0963e1-ee22-4f2c-a0d6-2cca3f985320",
            "actions": [
              {
                "uuid": "67bf1969-f5d9-4771-97f0-35c0ce39de7e",
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
                "uuid": "f3f57ea8-bf02-408c-a9f5-1f7f609c80d4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "58ebf91b-9bdc-4acc-b1aa-1d0ccad27db0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "60cf336a-2d41-455a-ad95-2227c3b7d60a",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "de29a345-3c49-4b93-a130-4e0a0bd4250c"
              }
            ],
            "exits": [
              {
                "uuid": "5895ca68-ffe2-47e8-8a7a-ad1b316e59d7",
                "destination_uuid": "440ac822-cce4-4b38-83c6-fc63d989bc0d"
              }
            ]
          },
          {
            "uuid": "440ac822-cce4-4b38-83c6-fc63d989bc0d",
            "actions": [
              {
                "uuid": "e28fa3c0-5594-4766-bbe7-723f7cc77d04",
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
                "uuid": "d68bd89f-256b-4428-a63b-785ec38d6bb9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "959bf3c0-95d5-4e9f-afd9-626155111dd1",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ec22a922-30d3-444f-85d5-159070daf1d4",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7872106e-18bd-429a-bcb8-782d29f43f7c"
              }
            ],
            "exits": [
              {
                "uuid": "c6b53ac3-8d4d-4f97-8101-1e18a51155a8",
                "destination_uuid": "529281e9-8239-4c84-ad9a-54f6d05b45ec"
              }
            ]
          },
          {
            "uuid": "529281e9-8239-4c84-ad9a-54f6d05b45ec",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e72507ec-1176-469e-8bbb-58d126d0c2d7"
              }
            ],
            "exits": [
              {
                "uuid": "7103586c-91a4-4ef3-a053-5d54cc4af121",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "bee8a641-5596-4e9b-ba6b-bf67e9a46fe0",
            "actions": [
              {
                "uuid": "6d90faee-432d-444e-832b-4666a238e1b4",
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
                "uuid": "78517ade-f5f5-4a3b-bdd1-e6b87ed3a568",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "fa137749-8259-4539-8278-100590c27f54",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "80085e5d-0545-44c3-942f-a0e6900ef74a",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c7baff72-8c02-4e42-a0ba-1dad49d70be4"
              }
            ],
            "exits": [
              {
                "uuid": "8caab1e9-8e8d-4e60-b4b1-add16be6ccb2",
                "destination_uuid": "e03b14dc-76f0-484d-be0b-47d3df6b13f0"
              }
            ]
          },
          {
            "uuid": "e03b14dc-76f0-484d-be0b-47d3df6b13f0",
            "actions": [
              {
                "uuid": "6edfba3f-fa96-46a7-ab1b-1b86ce696c45",
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
                "uuid": "ea152a33-d9db-45a7-8fdb-a35f697fea08",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b50a2365-3b2c-4402-a36c-f40b7845b0ad",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e246eb08-1b1e-4411-931d-a3a52f8f97ae",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "c35ee43a-0802-4a8d-b22f-bdf5840ffd7d"
                },
                "type": "enter_flow",
                "uuid": "4ac799ab-a325-45bb-93a2-044685fd8b3a"
              }
            ],
            "exits": [
              {
                "uuid": "7d3c9a1d-c400-4ef8-ac80-d78ad2f5266c",
                "destination_uuid": "5c5a2bec-de61-44ab-bc1f-4c6977c36c93"
              },
              {
                "uuid": "afab0473-74c3-416a-aff9-1058bda8fa41",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "93cf0dc9-b9a5-4d41-b6c9-322a68c65027",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7d4842b1-0735-4c13-9d89-7afdf3bc21d1"
                },
                {
                  "uuid": "0d950d5e-2796-4f53-b48c-5e310250a67d",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "64387997-788f-4056-94ca-2387c136e3d8"
                }
              ],
              "categories": [
                {
                  "uuid": "7d4842b1-0735-4c13-9d89-7afdf3bc21d1",
                  "name": "Complete",
                  "exit_uuid": "7d3c9a1d-c400-4ef8-ac80-d78ad2f5266c"
                },
                {
                  "uuid": "64387997-788f-4056-94ca-2387c136e3d8",
                  "name": "Expired",
                  "exit_uuid": "afab0473-74c3-416a-aff9-1058bda8fa41"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7d4842b1-0735-4c13-9d89-7afdf3bc21d1"
            }
          },
          {
            "uuid": "5c5a2bec-de61-44ab-bc1f-4c6977c36c93",
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
                "uuid": "2da2a7cd-5aba-4d3c-bdb1-837a21a6a5fb"
              }
            ],
            "exits": [
              {
                "uuid": "f39b5454-0d9d-45f3-a8ab-71c803d21a59",
                "destination_uuid": "8127bf1b-be2c-42ad-b816-7c236c2d8410"
              }
            ]
          },
          {
            "uuid": "8127bf1b-be2c-42ad-b816-7c236c2d8410",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5605dcb9-664b-45e0-a270-892e3d9c6e0d",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "182f3747-7693-4431-9cf7-992c46d5cdd5",
                  "type": "has_only_phrase",
                  "uuid": "102cc942-c1fe-44a2-b8a8-63d51e5937c5"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "4aca719f-eb12-43bb-9b7d-f6f92ca9fd93",
                  "type": "has_only_phrase",
                  "uuid": "4c25bed8-be2c-41d0-8070-9dc0b3bbd663"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "3281ae6d-9d0e-4538-b768-9f0245baddeb",
                  "type": "has_only_phrase",
                  "uuid": "63689577-000a-4a6c-a415-0bfd3e915196"
                },
                {
                  "arguments": [
                    "first app opening"
                  ],
                  "category_uuid": "8ca10a52-38f6-4105-aad4-b8a63dd0b1d1",
                  "type": "has_only_phrase",
                  "uuid": "669ee4c5-ff85-4c15-bf5b-5fa57a97e0a0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "10f38eeb-cb7c-4839-83b6-4b1bf5646e22",
                  "name": "All Responses",
                  "uuid": "5605dcb9-664b-45e0-a270-892e3d9c6e0d"
                },
                {
                  "exit_uuid": "c6914d43-7a8d-437d-8f91-4ab19c478ecc",
                  "name": "welcome",
                  "uuid": "182f3747-7693-4431-9cf7-992c46d5cdd5"
                },
                {
                  "exit_uuid": "5a20caaa-0664-463f-9a0d-fd65d6069e50",
                  "name": "1on1",
                  "uuid": "4aca719f-eb12-43bb-9b7d-f6f92ca9fd93"
                },
                {
                  "exit_uuid": "ae0d6527-b0ef-47e9-920f-64cd1edc246c",
                  "name": "praise",
                  "uuid": "3281ae6d-9d0e-4538-b768-9f0245baddeb"
                },
                {
                  "exit_uuid": "ba48b7cb-cbc7-4e1e-b0f8-339dd6c5ad5e",
                  "name": "first app opening",
                  "uuid": "8ca10a52-38f6-4105-aad4-b8a63dd0b1d1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "10f38eeb-cb7c-4839-83b6-4b1bf5646e22",
                "destination_uuid": null
              },
              {
                "uuid": "c6914d43-7a8d-437d-8f91-4ab19c478ecc",
                "destination_uuid": "498d6fa8-6afa-4a99-b9ee-393fa867305d"
              },
              {
                "uuid": "5a20caaa-0664-463f-9a0d-fd65d6069e50",
                "destination_uuid": "271bd558-e6d5-4206-bc5d-2ca6893eab0f"
              },
              {
                "uuid": "ae0d6527-b0ef-47e9-920f-64cd1edc246c",
                "destination_uuid": "b38e1806-9aad-405b-9432-0bc4e2a5f5d4"
              },
              {
                "uuid": "ba48b7cb-cbc7-4e1e-b0f8-339dd6c5ad5e",
                "destination_uuid": "53530415-e84f-4fc0-b225-457243aca7f6"
              }
            ]
          },
          {
            "uuid": "498d6fa8-6afa-4a99-b9ee-393fa867305d",
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
                "uuid": "edb2060d-1195-46e8-af54-785f387e4fc3"
              }
            ],
            "exits": [
              {
                "uuid": "b5f78472-4f2f-46ad-a75e-bd6e0a927072",
                "destination_uuid": "c5ed34b7-85be-43ce-8ffa-7cc32e10a367"
              }
            ]
          },
          {
            "uuid": "c5ed34b7-85be-43ce-8ffa-7cc32e10a367",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c9b2b3e2-d449-4be4-a8a3-51f0df41577a",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "8de9a00a-9524-450d-83f3-14f76b051d58",
                  "type": "has_only_phrase",
                  "uuid": "93c18cb9-e341-478c-9e9b-f20e4e8e7829"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "01841353-3c34-4295-9b09-9891984d1e08",
                  "type": "has_only_phrase",
                  "uuid": "eee1ef7f-268b-4dae-b846-a36efc6ba86a"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "75767891-9d79-4582-92b7-b8f02d57d5fc",
                  "type": "has_only_phrase",
                  "uuid": "14343afb-b559-40ae-9fb1-06440040aecd"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "11c49a81-8faa-40db-ba03-32140253a172",
                  "type": "has_only_phrase",
                  "uuid": "e519f611-de8b-4320-b28e-3399655b8249"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0d40b327-2097-41f0-972f-78ed583217b3",
                  "name": "All Responses",
                  "uuid": "c9b2b3e2-d449-4be4-a8a3-51f0df41577a"
                },
                {
                  "exit_uuid": "e3a9e0e6-8bfb-4e71-916a-3c2953b2ebab",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "8de9a00a-9524-450d-83f3-14f76b051d58"
                },
                {
                  "exit_uuid": "9b7f2f00-a7f6-48bf-975d-e44630320d51",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "01841353-3c34-4295-9b09-9891984d1e08"
                },
                {
                  "exit_uuid": "39a9a9e9-65da-459a-b8e4-ce37a09a7e32",
                  "name": "mod_welcome_survey",
                  "uuid": "75767891-9d79-4582-92b7-b8f02d57d5fc"
                },
                {
                  "exit_uuid": "3a91cda3-2654-4086-a448-425f34de8d14",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "11c49a81-8faa-40db-ba03-32140253a172"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0d40b327-2097-41f0-972f-78ed583217b3",
                "destination_uuid": null
              },
              {
                "uuid": "e3a9e0e6-8bfb-4e71-916a-3c2953b2ebab",
                "destination_uuid": "6382407e-9104-434d-8637-aa7c3035191c"
              },
              {
                "uuid": "9b7f2f00-a7f6-48bf-975d-e44630320d51",
                "destination_uuid": "846165f9-7cbc-499e-8e1c-01e0e88c4d78"
              },
              {
                "uuid": "39a9a9e9-65da-459a-b8e4-ce37a09a7e32",
                "destination_uuid": "1e228221-1149-4da0-9546-a4a1fbd2a853"
              },
              {
                "uuid": "3a91cda3-2654-4086-a448-425f34de8d14",
                "destination_uuid": "b9c67521-1be0-4180-b475-a8b0d040c68f"
              }
            ]
          },
          {
            "uuid": "6382407e-9104-434d-8637-aa7c3035191c",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "88aa126b-9f62-4209-a954-005ceb4f2791"
                },
                "type": "enter_flow",
                "uuid": "f542f89e-8a2a-4ed7-8e53-1a8df1074af1"
              }
            ],
            "exits": [
              {
                "uuid": "5e80f61e-d4d7-4d2c-8ef3-a5fd04dd41a1",
                "destination_uuid": null
              },
              {
                "uuid": "4fa8a7b4-e42a-440d-92e2-a7a701fc7bb0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "04430978-c9fb-49db-a2a3-a570af373147",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "bf2240ce-f319-4c67-8ee1-633f5acf0c72"
                },
                {
                  "uuid": "4c44bf04-a264-4dbf-ad54-ec90b523908a",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "505445e1-d585-4b40-81ce-5b06ed3eb82b"
                }
              ],
              "categories": [
                {
                  "uuid": "bf2240ce-f319-4c67-8ee1-633f5acf0c72",
                  "name": "Complete",
                  "exit_uuid": "5e80f61e-d4d7-4d2c-8ef3-a5fd04dd41a1"
                },
                {
                  "uuid": "505445e1-d585-4b40-81ce-5b06ed3eb82b",
                  "name": "Expired",
                  "exit_uuid": "4fa8a7b4-e42a-440d-92e2-a7a701fc7bb0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "bf2240ce-f319-4c67-8ee1-633f5acf0c72"
            }
          },
          {
            "uuid": "846165f9-7cbc-499e-8e1c-01e0e88c4d78",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "ae6dfa82-8cad-475b-ab99-c394815e5bcc"
                },
                "type": "enter_flow",
                "uuid": "3ff3452c-6d43-41b5-acad-58dc146accb9"
              }
            ],
            "exits": [
              {
                "uuid": "93c0f22e-a2c8-4241-bf83-2cd82791842f",
                "destination_uuid": null
              },
              {
                "uuid": "59b052a8-be73-4ef3-89f2-71ab089e8420",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "84b0331f-7647-42e9-9ca6-70f459c94d78",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "00853c5c-d1ba-448b-a4b3-d1d29d97397a"
                },
                {
                  "uuid": "e7d55240-aefc-44c9-acc2-78f9c8e0b06f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0a60741a-b429-4fb0-ad7f-fdd2a411add7"
                }
              ],
              "categories": [
                {
                  "uuid": "00853c5c-d1ba-448b-a4b3-d1d29d97397a",
                  "name": "Complete",
                  "exit_uuid": "93c0f22e-a2c8-4241-bf83-2cd82791842f"
                },
                {
                  "uuid": "0a60741a-b429-4fb0-ad7f-fdd2a411add7",
                  "name": "Expired",
                  "exit_uuid": "59b052a8-be73-4ef3-89f2-71ab089e8420"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "00853c5c-d1ba-448b-a4b3-d1d29d97397a"
            }
          },
          {
            "uuid": "1e228221-1149-4da0-9546-a4a1fbd2a853",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "c21b11de-75fc-48a6-9b09-c9a8e3b09050"
                },
                "type": "enter_flow",
                "uuid": "29eacfd2-6546-4049-b1e2-063181d97d6e"
              }
            ],
            "exits": [
              {
                "uuid": "3288336c-d38d-473b-9c5a-df6f5fdc1bf8",
                "destination_uuid": null
              },
              {
                "uuid": "d44a8509-3dac-48ab-a0dd-f5fe43c91c87",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5f9e9abd-2c61-4084-9c25-2d8c7412ddef",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4382a74b-4277-406f-9114-b31c1dda4a36"
                },
                {
                  "uuid": "01a842d3-b610-48ee-b038-9cb172732ea3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a0bef410-e483-4c9e-9d10-ac2589dd5704"
                }
              ],
              "categories": [
                {
                  "uuid": "4382a74b-4277-406f-9114-b31c1dda4a36",
                  "name": "Complete",
                  "exit_uuid": "3288336c-d38d-473b-9c5a-df6f5fdc1bf8"
                },
                {
                  "uuid": "a0bef410-e483-4c9e-9d10-ac2589dd5704",
                  "name": "Expired",
                  "exit_uuid": "d44a8509-3dac-48ab-a0dd-f5fe43c91c87"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4382a74b-4277-406f-9114-b31c1dda4a36"
            }
          },
          {
            "uuid": "b9c67521-1be0-4180-b475-a8b0d040c68f",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "57536476-de60-4636-9506-753b3467c18e"
                },
                "type": "enter_flow",
                "uuid": "d4d64cb9-7cb5-48a3-bd7a-09ae7721aba4"
              }
            ],
            "exits": [
              {
                "uuid": "d06610ea-3c7e-4714-9b58-7327b5d0b7e9",
                "destination_uuid": null
              },
              {
                "uuid": "c12f74f9-e7ed-4ae6-bf79-d98ca55c2a3d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "f3632ed5-7f38-4306-9d48-7fec7cf6847d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "6c8d1887-1c7a-46d8-a0c7-bd5e43ea13f8"
                },
                {
                  "uuid": "2bcf88c8-6e36-45e6-9ca2-79289f299bfd",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "015b3f83-fb81-46a9-8d32-76c33086e115"
                }
              ],
              "categories": [
                {
                  "uuid": "6c8d1887-1c7a-46d8-a0c7-bd5e43ea13f8",
                  "name": "Complete",
                  "exit_uuid": "d06610ea-3c7e-4714-9b58-7327b5d0b7e9"
                },
                {
                  "uuid": "015b3f83-fb81-46a9-8d32-76c33086e115",
                  "name": "Expired",
                  "exit_uuid": "c12f74f9-e7ed-4ae6-bf79-d98ca55c2a3d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "6c8d1887-1c7a-46d8-a0c7-bd5e43ea13f8"
            }
          },
          {
            "uuid": "271bd558-e6d5-4206-bc5d-2ca6893eab0f",
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
                "uuid": "baed9de0-96c5-4cd5-9690-b68614773cd5"
              }
            ],
            "exits": [
              {
                "uuid": "a0eac54b-e738-4aaf-9ce8-da28fce7f223",
                "destination_uuid": "758ae62b-01be-4f00-b2a1-625cb579bb54"
              }
            ]
          },
          {
            "uuid": "758ae62b-01be-4f00-b2a1-625cb579bb54",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "99362bce-40ff-4b01-9648-5b9e45fc97fb",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "b891ef17-7bee-4e9a-a572-19dd24723feb",
                  "type": "has_only_phrase",
                  "uuid": "d5e783e2-e3e1-41e8-839c-342bc30ac351"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "bffc86c5-11ee-4191-b595-1ac9f724881f",
                  "type": "has_only_phrase",
                  "uuid": "b75e8be2-3bf2-4039-ba05-1870eb415e36"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "9d13c347-b2c3-4731-ab61-0ec068c3400f",
                  "type": "has_only_phrase",
                  "uuid": "ec0602c1-1d59-4a7f-b5d7-7c2a402e63b8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a1ff971e-a604-4566-98cd-c2f1501ed82b",
                  "name": "All Responses",
                  "uuid": "99362bce-40ff-4b01-9648-5b9e45fc97fb"
                },
                {
                  "exit_uuid": "eb3431f6-588a-42c6-8603-b43706668f30",
                  "name": "mod_1on1_emo",
                  "uuid": "b891ef17-7bee-4e9a-a572-19dd24723feb"
                },
                {
                  "exit_uuid": "25aa93ea-1670-4608-8151-a2412d47393d",
                  "name": "mod_1on1_activity",
                  "uuid": "bffc86c5-11ee-4191-b595-1ac9f724881f"
                },
                {
                  "exit_uuid": "ea7da7f8-670b-45d0-b154-d8a1c7d34d51",
                  "name": "mod_1on1_activity_review",
                  "uuid": "9d13c347-b2c3-4731-ab61-0ec068c3400f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a1ff971e-a604-4566-98cd-c2f1501ed82b",
                "destination_uuid": null
              },
              {
                "uuid": "eb3431f6-588a-42c6-8603-b43706668f30",
                "destination_uuid": "5ddc96a1-e4fc-4194-acaa-ba025e21dccb"
              },
              {
                "uuid": "25aa93ea-1670-4608-8151-a2412d47393d",
                "destination_uuid": "3ef59290-01b0-410e-880b-3467c56b30b4"
              },
              {
                "uuid": "ea7da7f8-670b-45d0-b154-d8a1c7d34d51",
                "destination_uuid": "048abc7f-2886-48be-9db9-f0c25d14d844"
              }
            ]
          },
          {
            "uuid": "5ddc96a1-e4fc-4194-acaa-ba025e21dccb",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "a33caef6-2228-4bc7-9bca-fb438adb065a"
                },
                "type": "enter_flow",
                "uuid": "2f66fc00-7b5c-4493-87f4-ba3a5cebe358"
              }
            ],
            "exits": [
              {
                "uuid": "9adce35c-f6bb-42ab-a169-e6df3facceb9",
                "destination_uuid": null
              },
              {
                "uuid": "bd13495b-a65d-41df-afd8-0496d83b204f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "296d7c64-94ad-40d8-8a37-6acb8fea9f1e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "18a3da0a-52b3-417d-8156-c36a688e5075"
                },
                {
                  "uuid": "0cc277c5-1ab8-4f80-a5b5-273380a9bf07",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0d7e56a7-26d5-4c60-81fe-6c674d384a09"
                }
              ],
              "categories": [
                {
                  "uuid": "18a3da0a-52b3-417d-8156-c36a688e5075",
                  "name": "Complete",
                  "exit_uuid": "9adce35c-f6bb-42ab-a169-e6df3facceb9"
                },
                {
                  "uuid": "0d7e56a7-26d5-4c60-81fe-6c674d384a09",
                  "name": "Expired",
                  "exit_uuid": "bd13495b-a65d-41df-afd8-0496d83b204f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "18a3da0a-52b3-417d-8156-c36a688e5075"
            }
          },
          {
            "uuid": "3ef59290-01b0-410e-880b-3467c56b30b4",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "501a66d9-f7fe-4823-bd38-989f93f211b1"
                },
                "type": "enter_flow",
                "uuid": "b677b79a-2105-49f7-aae5-7dac481ae144"
              }
            ],
            "exits": [
              {
                "uuid": "77b86bcb-4eac-4bdf-977b-a85ab919f022",
                "destination_uuid": null
              },
              {
                "uuid": "25e09e3e-9202-48bf-8906-002fcd63afe5",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "a3e37896-93c8-418a-9b9a-d5719ca3f4a7",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8f6f25e0-d5e6-411b-8f42-6a1b81056d14"
                },
                {
                  "uuid": "231b70f4-a334-4411-9ca2-b21b6b31593c",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "1328edce-7636-4d91-a62b-f049eeef0762"
                }
              ],
              "categories": [
                {
                  "uuid": "8f6f25e0-d5e6-411b-8f42-6a1b81056d14",
                  "name": "Complete",
                  "exit_uuid": "77b86bcb-4eac-4bdf-977b-a85ab919f022"
                },
                {
                  "uuid": "1328edce-7636-4d91-a62b-f049eeef0762",
                  "name": "Expired",
                  "exit_uuid": "25e09e3e-9202-48bf-8906-002fcd63afe5"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8f6f25e0-d5e6-411b-8f42-6a1b81056d14"
            }
          },
          {
            "uuid": "048abc7f-2886-48be-9db9-f0c25d14d844",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "1caed5f2-8673-48fe-88d1-e881358aabce"
                },
                "type": "enter_flow",
                "uuid": "6f4257a5-0f2b-4372-b97d-706993d93d78"
              }
            ],
            "exits": [
              {
                "uuid": "d2a33b16-0c45-423c-823a-77ace0d2969c",
                "destination_uuid": null
              },
              {
                "uuid": "76954598-d07b-4bb3-9e67-9a9eced7585c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "33afdc44-63a6-4128-ad08-9d7acedaff6c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "dcba09db-3c82-4def-b4e7-a7090a822bf9"
                },
                {
                  "uuid": "3b720c8c-0794-4f3f-9a4d-720c3b1056ad",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "17b4ad4f-8157-4e3d-a986-3bc66fac48ed"
                }
              ],
              "categories": [
                {
                  "uuid": "dcba09db-3c82-4def-b4e7-a7090a822bf9",
                  "name": "Complete",
                  "exit_uuid": "d2a33b16-0c45-423c-823a-77ace0d2969c"
                },
                {
                  "uuid": "17b4ad4f-8157-4e3d-a986-3bc66fac48ed",
                  "name": "Expired",
                  "exit_uuid": "76954598-d07b-4bb3-9e67-9a9eced7585c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "dcba09db-3c82-4def-b4e7-a7090a822bf9"
            }
          },
          {
            "uuid": "b38e1806-9aad-405b-9432-0bc4e2a5f5d4",
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
                "uuid": "e742d431-45a2-4238-9deb-5ff388509756"
              }
            ],
            "exits": [
              {
                "uuid": "ce1ad2e9-8a79-4469-891f-59c90f844f6c",
                "destination_uuid": "d88a1b32-4b50-457b-bd6c-907447acde7b"
              }
            ]
          },
          {
            "uuid": "d88a1b32-4b50-457b-bd6c-907447acde7b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fed1c9be-0668-4111-baea-61a1670da224",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "38ac30e5-d461-41dc-80d6-620cc367512b",
                  "type": "has_only_phrase",
                  "uuid": "bac4f9b9-3e00-42ec-9922-8b8ecf3bf7df"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "e53ef39a-583d-45be-8700-778386e19888",
                  "type": "has_only_phrase",
                  "uuid": "c4e907e8-90f6-411d-986d-461e0c12a695"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "bcce7451-ea26-47ac-865a-795c2ddb48a6",
                  "type": "has_only_phrase",
                  "uuid": "a7685a32-077d-4e31-a079-89b963a49c38"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "47df2a8e-dd0c-4aeb-a118-042227f2c03c",
                  "name": "All Responses",
                  "uuid": "fed1c9be-0668-4111-baea-61a1670da224"
                },
                {
                  "exit_uuid": "0094a146-a04e-4117-8366-b21dc7d9966a",
                  "name": "mod_praise_intro",
                  "uuid": "38ac30e5-d461-41dc-80d6-620cc367512b"
                },
                {
                  "exit_uuid": "ceecd51a-0d96-40f4-9b89-51feba8774b2",
                  "name": "mod_praise_activity",
                  "uuid": "e53ef39a-583d-45be-8700-778386e19888"
                },
                {
                  "exit_uuid": "c09274ed-9885-4553-bca4-878d0c5d2abf",
                  "name": "mod_praise_activity_review",
                  "uuid": "bcce7451-ea26-47ac-865a-795c2ddb48a6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "47df2a8e-dd0c-4aeb-a118-042227f2c03c",
                "destination_uuid": null
              },
              {
                "uuid": "0094a146-a04e-4117-8366-b21dc7d9966a",
                "destination_uuid": "1a9e8590-700d-4858-8acf-b32558e11af2"
              },
              {
                "uuid": "ceecd51a-0d96-40f4-9b89-51feba8774b2",
                "destination_uuid": "3dec51f1-2154-41b1-934f-f6d35f85ae44"
              },
              {
                "uuid": "c09274ed-9885-4553-bca4-878d0c5d2abf",
                "destination_uuid": "5f6521d5-be95-4b69-8b5f-2497293234a5"
              }
            ]
          },
          {
            "uuid": "1a9e8590-700d-4858-8acf-b32558e11af2",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "c61dd8db-a416-444b-822e-7d29f7445b60"
                },
                "type": "enter_flow",
                "uuid": "86a02b58-b2c0-400a-8a25-9965fad8ec14"
              }
            ],
            "exits": [
              {
                "uuid": "ccb6bc62-bc53-4319-a539-c67678e8f317",
                "destination_uuid": null
              },
              {
                "uuid": "ae81e5d6-9699-4a0c-b638-c8bcf424f885",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7f4c2955-5690-49dc-b323-e67e450666cc",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "55b5f26d-8862-408e-b4b2-f724a79a2384"
                },
                {
                  "uuid": "e3500679-e4ab-4b5b-a9b5-8d383aac908c",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f753c8ab-273f-4ab3-8023-526dd7826d48"
                }
              ],
              "categories": [
                {
                  "uuid": "55b5f26d-8862-408e-b4b2-f724a79a2384",
                  "name": "Complete",
                  "exit_uuid": "ccb6bc62-bc53-4319-a539-c67678e8f317"
                },
                {
                  "uuid": "f753c8ab-273f-4ab3-8023-526dd7826d48",
                  "name": "Expired",
                  "exit_uuid": "ae81e5d6-9699-4a0c-b638-c8bcf424f885"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "55b5f26d-8862-408e-b4b2-f724a79a2384"
            }
          },
          {
            "uuid": "3dec51f1-2154-41b1-934f-f6d35f85ae44",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "8dd90ac8-b8a0-4483-8ff6-7531157cdf4f"
                },
                "type": "enter_flow",
                "uuid": "e3b52069-ede1-4050-ace1-f25068e9bbd4"
              }
            ],
            "exits": [
              {
                "uuid": "078d0ba0-2d99-45d4-a10f-ec1bddc34a7b",
                "destination_uuid": null
              },
              {
                "uuid": "7a8fbb88-dfca-49ff-8e67-59e88fc03782",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8c5e6e14-8656-4ba6-9fd3-f36bb505f49a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "069983df-a525-430e-98a1-f669cc43da5b"
                },
                {
                  "uuid": "14614b27-24f8-4b32-929d-db9472d99457",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "4dab0f85-c225-4fc5-82b0-12aecc9b7f55"
                }
              ],
              "categories": [
                {
                  "uuid": "069983df-a525-430e-98a1-f669cc43da5b",
                  "name": "Complete",
                  "exit_uuid": "078d0ba0-2d99-45d4-a10f-ec1bddc34a7b"
                },
                {
                  "uuid": "4dab0f85-c225-4fc5-82b0-12aecc9b7f55",
                  "name": "Expired",
                  "exit_uuid": "7a8fbb88-dfca-49ff-8e67-59e88fc03782"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "069983df-a525-430e-98a1-f669cc43da5b"
            }
          },
          {
            "uuid": "5f6521d5-be95-4b69-8b5f-2497293234a5",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "7b5442dd-eef1-42da-84a8-abdfca164268"
                },
                "type": "enter_flow",
                "uuid": "257e564c-8944-4680-ad00-53a9f741d1a0"
              }
            ],
            "exits": [
              {
                "uuid": "088666c7-f491-4c75-ac78-b0168f8b1c5f",
                "destination_uuid": null
              },
              {
                "uuid": "a7f6967c-a2c2-4575-9fb3-23dac579f24e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "af5652c6-4ea5-4e2a-9851-06bdef432359",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c115d0dd-9c99-438e-bf27-75d1c25f440e"
                },
                {
                  "uuid": "d588c1c0-a3db-4716-96b7-e49d10833aad",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "7681dff2-be00-4360-baa7-b325c53fa13e"
                }
              ],
              "categories": [
                {
                  "uuid": "c115d0dd-9c99-438e-bf27-75d1c25f440e",
                  "name": "Complete",
                  "exit_uuid": "088666c7-f491-4c75-ac78-b0168f8b1c5f"
                },
                {
                  "uuid": "7681dff2-be00-4360-baa7-b325c53fa13e",
                  "name": "Expired",
                  "exit_uuid": "a7f6967c-a2c2-4575-9fb3-23dac579f24e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c115d0dd-9c99-438e-bf27-75d1c25f440e"
            }
          },
          {
            "uuid": "53530415-e84f-4fc0-b225-457243aca7f6",
            "actions": [
              {
                "flow": {
                  "name": "first_app_opening",
                  "uuid": "16d54aad-b8e1-4aaa-82b6-677049d3ddb3"
                },
                "type": "enter_flow",
                "uuid": "af4399a2-3744-4168-8eef-3df24ce7b37b"
              }
            ],
            "exits": [
              {
                "uuid": "744daa0c-c1b6-4831-9b25-5696343ea4d7",
                "destination_uuid": null
              },
              {
                "uuid": "a9820fb2-5cf1-4dfa-bbcf-d3b0583c3d84",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "82fe831a-4120-4953-8c8b-968bec9dc4c1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b5a4e570-b9c1-411f-a794-39e3d470a9e3"
                },
                {
                  "uuid": "c87ee230-04a2-4883-9129-3c94a05321f3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "82b7b0e8-e386-49d2-b525-6a61489d9653"
                }
              ],
              "categories": [
                {
                  "uuid": "b5a4e570-b9c1-411f-a794-39e3d470a9e3",
                  "name": "Complete",
                  "exit_uuid": "744daa0c-c1b6-4831-9b25-5696343ea4d7"
                },
                {
                  "uuid": "82b7b0e8-e386-49d2-b525-6a61489d9653",
                  "name": "Expired",
                  "exit_uuid": "a9820fb2-5cf1-4dfa-bbcf-d3b0583c3d84"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b5a4e570-b9c1-411f-a794-39e3d470a9e3"
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
        "uuid": "57565713-a5d9-4842-bd9f-c14969cbfa31",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "76ebfde4-d41d-4ed3-b293-b3e34124acf3",
            "actions": [
              {
                "uuid": "a8cef460-7a89-47b3-840e-24846d646810",
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
                "uuid": "8f1141e7-3b88-4bd4-ad7a-54957da66aa4",
                "destination_uuid": "d14ac4db-86c0-47eb-8a02-e03d91e93c96"
              }
            ]
          },
          {
            "uuid": "d14ac4db-86c0-47eb-8a02-e03d91e93c96",
            "actions": [
              {
                "uuid": "935dddd8-3163-45fe-8f8f-83c41287759c",
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
                "uuid": "6b616abe-317d-433d-b0c8-28802611a90e",
                "destination_uuid": "6aadcc13-dc06-4331-bfbb-b7eca953478f"
              }
            ]
          },
          {
            "uuid": "6aadcc13-dc06-4331-bfbb-b7eca953478f",
            "actions": [
              {
                "uuid": "b3cf5a45-b904-4123-a1c3-75efc9531b85",
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
                "uuid": "ab200dcf-9a36-4322-9752-0b3dde43496c",
                "destination_uuid": "ebb081b5-d56f-4f09-84b9-f13c8f5d7c80"
              }
            ]
          },
          {
            "uuid": "ebb081b5-d56f-4f09-84b9-f13c8f5d7c80",
            "actions": [
              {
                "uuid": "da74f9f2-1b07-437b-9f91-e2d34507e10e",
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
                "uuid": "5f83faef-b360-48c7-b3d1-7690d164ca72",
                "destination_uuid": "1703fd1f-3499-463b-81f4-624e74b71332"
              }
            ]
          },
          {
            "uuid": "1703fd1f-3499-463b-81f4-624e74b71332",
            "actions": [
              {
                "uuid": "8ff28247-4652-46a6-9e86-5058df7c4fc5",
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
                "uuid": "6ce46c44-86ed-4a3e-9cd9-3edd8fffdfa8",
                "destination_uuid": "dbfc6c0e-245d-40f4-bbbb-8f2c529c359a"
              }
            ]
          },
          {
            "uuid": "dbfc6c0e-245d-40f4-bbbb-8f2c529c359a",
            "actions": [
              {
                "uuid": "f7de2ddf-4d4c-48b9-8d3d-7fed2c6441f6",
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
                "uuid": "89938aa1-6581-4a4f-b1e5-eb32e1e77586",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f19b27ac-041a-4117-9c87-4f47c8b74df4",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9ea4ff80-0e44-45a3-bbf3-ccd18a07cc76",
            "actions": [
              {
                "uuid": "5f0bf9a6-1d02-4bcc-a5ee-308d99e7b21a",
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
                "uuid": "29b99471-cebb-4099-be57-ac06e6c53bc7",
                "destination_uuid": "5c1f25d4-2b79-4264-baa2-246ba42088b3"
              }
            ]
          },
          {
            "uuid": "5c1f25d4-2b79-4264-baa2-246ba42088b3",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/home",
                  "uuid": "1b8ebf35-b8f0-4937-ba02-b8b688731d77"
                },
                "type": "enter_flow",
                "uuid": "7e1b0932-f987-499f-8579-b4419def6f1d"
              }
            ],
            "exits": [
              {
                "uuid": "05c97aaa-1c22-4404-8ab6-a72d8f795029",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "882a6bcb-9106-4487-886d-c26428f3f4eb",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ce06dc70-513d-48e1-91b8-1e31e67f326a",
            "actions": [
              {
                "uuid": "ddf655ef-0e21-48a6-a207-502fb82293e8",
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
                "uuid": "9f7068b1-434b-44fe-8b47-4465d7fe2951",
                "destination_uuid": "b4030100-69db-4bc5-a190-4b4e8db1583c"
              }
            ]
          },
          {
            "uuid": "b4030100-69db-4bc5-a190-4b4e8db1583c",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/chat",
                  "uuid": "3ee3c7dc-b077-4626-9f16-b26dd02d5174"
                },
                "type": "enter_flow",
                "uuid": "19277709-d03e-42d8-a989-80da787c7427"
              }
            ],
            "exits": [
              {
                "uuid": "bb06937f-fdde-4adf-8af6-7ab22fb924f8",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "34f40e35-7d3f-4e04-8c8b-92d66aa9c1cc",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0b56f10b-ac12-44a0-bd1a-e066d2c86590",
            "actions": [
              {
                "uuid": "c91d917b-4f45-4eea-a69f-ff7804dc0652",
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
                "uuid": "c6b0ce97-858a-43d1-9877-05333c7c9b2f",
                "destination_uuid": "2be4212e-e628-4e77-9833-45901994af94"
              }
            ]
          },
          {
            "uuid": "2be4212e-e628-4e77-9833-45901994af94",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox",
                  "uuid": "b0bc47f0-dc4b-4c6e-8de3-dafdd39c81aa"
                },
                "type": "enter_flow",
                "uuid": "73730d46-9e14-409c-acfb-66ef5ce21d5c"
              }
            ],
            "exits": [
              {
                "uuid": "443a3111-84ad-4eeb-be77-989f99bed888",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "34a56c9d-3a3f-4209-866d-1fe3bb2acd46",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ab508ecd-216f-4789-a1ba-8f832c37b659",
            "actions": [
              {
                "uuid": "9d542246-a040-4c8f-8491-475effe89ef8",
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
                "uuid": "51a9e45c-cd43-4c7a-b1b0-d865bd4857f6",
                "destination_uuid": "4da42af3-2647-4e49-9a20-80420d581f27"
              }
            ]
          },
          {
            "uuid": "4da42af3-2647-4e49-9a20-80420d581f27",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                  "uuid": "884d32dd-a9ea-42a7-8e56-6d11c5b0c2c7"
                },
                "type": "enter_flow",
                "uuid": "f96a2bea-5c6f-4104-a519-d3ce9f285946"
              }
            ],
            "exits": [
              {
                "uuid": "e4f4ccbc-b948-4e5f-9c0e-0158577a8270",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d648bd91-bb67-4624-9ce5-19e67e24dbf5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2b1db123-76d5-49b0-97ba-444d7a571dc1",
            "actions": [
              {
                "uuid": "f04ec974-d795-42fd-a7aa-e8465a4de6ca",
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
                "uuid": "8a8e087f-056c-4c45-a1f0-44f693bc3d3b",
                "destination_uuid": "15abe366-0ee8-418a-b4ca-023cdbc7b1e8"
              }
            ]
          },
          {
            "uuid": "15abe366-0ee8-418a-b4ca-023cdbc7b1e8",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                  "uuid": "b12f443e-0150-4ab9-aa23-0815d7ba7862"
                },
                "type": "enter_flow",
                "uuid": "d68f593e-ff40-4f1d-8b1d-f9fbcdc7fde1"
              }
            ],
            "exits": [
              {
                "uuid": "5c7ace1a-4ecd-46e3-bd56-14958f49f397",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b227a49f-efb7-41b1-88c7-4e86806ff45c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a3d6a473-2b5b-490b-a454-84d049909799",
            "actions": [
              {
                "uuid": "f39e16b4-ba70-478d-81a3-874a2cc5df49",
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
                "uuid": "d6eb68ac-067a-4ecf-b14c-72e270bd0ba5",
                "destination_uuid": "2a14979b-1225-4652-bb87-9581192379d9"
              }
            ]
          },
          {
            "uuid": "2a14979b-1225-4652-bb87-9581192379d9",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                  "uuid": "93b9c6bf-ba85-4a2d-8838-687186aa9143"
                },
                "type": "enter_flow",
                "uuid": "9fe820e3-2769-41d6-826c-a9e4be812e80"
              }
            ],
            "exits": [
              {
                "uuid": "de2733ff-2bc9-4bd4-bc8e-6fe0e92c6336",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "366eacc3-16fb-4d6d-a8c1-80418107dc44",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "025bd327-4875-4fd0-a1f7-619629cc150c",
            "actions": [
              {
                "uuid": "ba29c528-1770-49ee-a307-de82b6fea725",
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
                "uuid": "7e553b4c-bf2c-4b3d-97c5-bebd6b68c865",
                "destination_uuid": "fa44c50a-58db-42a3-8dc3-a745cb24dbfe"
              }
            ]
          },
          {
            "uuid": "fa44c50a-58db-42a3-8dc3-a745cb24dbfe",
            "actions": [
              {
                "flow": {
                  "name": "https://plh-demo1.idems.international/gallery",
                  "uuid": "9d9c31ec-509d-4107-a616-375a73a49be0"
                },
                "type": "enter_flow",
                "uuid": "4fbc5bc4-ac2e-4f36-93be-0e9a5e865e0e"
              }
            ],
            "exits": [
              {
                "uuid": "8c53da19-25ec-4b2e-a4d0-8ae90e46ecbf",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "28a81cca-f5de-4b3a-814b-99149a1d3f9d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "56f83725-f27e-4c3f-bcbd-2c42110b808d",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3cd5c813-5451-44a3-b6b1-fe74971df972"
              }
            ],
            "exits": [
              {
                "uuid": "de76e53f-6762-480f-8b18-d704c70999e6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4058106a-c708-41fb-b95b-74d01a64adf9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ab183901-1e03-4a2b-b970-0591281ef93f",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1852bd96-b5c3-4a2f-a061-d648caa68a28"
              }
            ],
            "exits": [
              {
                "uuid": "e0143da0-9f0e-4b3e-b368-7aabcb221aa1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ff2280e0-9c29-4815-bfc9-e3b56a81b182",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9595d29a-23b0-4752-a0ce-29e93af722d8",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e400bfcb-3531-44a9-bf3e-cc3e04f9f301"
              }
            ],
            "exits": [
              {
                "uuid": "08d45408-7012-4392-9397-3c26a0369345",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "65e3edfa-1975-4ffe-a019-c302478af89e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "21c25f5a-3a5f-419d-8a21-e143be22b6d3",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "76dfa887-fba3-4c30-8c87-0797cc6cbfe5"
              }
            ],
            "exits": [
              {
                "uuid": "1b3be106-0f87-4733-b08e-3c0a7cd62297",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ccd3c5ac-19d8-4678-aefb-5c865f5daac8",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "67b1d816-17b5-4f86-9a7c-4df7ab298c1c",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "331c51b6-0c99-4e08-b338-0cb1f51f1ea6"
              }
            ],
            "exits": [
              {
                "uuid": "82fe29e3-d382-4d2b-8d79-7ec1c7d93e89",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "0bcac030-a8bb-40f4-ad9f-e88b1b1d0c1c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7f893a8a-5f27-4f69-9c04-18d1b7aa8ff5",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "028cb047-ce46-4f04-806b-afc0efb36f40"
              }
            ],
            "exits": [
              {
                "uuid": "a5137dfb-0a96-43a1-9e2a-1ce414d5020f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c76a80ae-8e9d-43e6-972c-bb4cf00cd1ff",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8396656b-b8a6-4559-851a-5154db9306af",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b263aa7c-59d5-4cd1-9213-34af30b1acf7"
              }
            ],
            "exits": [
              {
                "uuid": "d19a61e5-a9e9-4400-9e56-68d338e31751",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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